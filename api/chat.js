// api/chat.js
// Vercel Edge Function — secure server-side proxy to Anthropic API
// La cle API rete sou Vercel, jamais ekspoze nan navigator

export const config = {
  runtime: "edge",
};

const SYSTEM_PROMPT = `You are a specialized AI assistant for SMEs (Small and Medium Enterprises) in the Gatineau–Ottawa / Outaouais region of Canada with deep expertise in:

1. Digital transformation strategies for SMEs
2. Government grant programs active in 2026 (keep this list in sync with the website's "Subventions" page):
   QUÉBEC / OUTAOUAIS:
   - Offensive Tr@ns Num (ADRIQ) — up to $25,000, 50% of costs
   - Programme ESSOR (Investissement Québec) — up to $50,000 (deadline March 31, 2027)
   - CRIC R&D tax credit (new 2026, refundable)
   - Plan PME 2025-2028 (Réseau Accès PME, $500M envelope, free guidance)
   - MicroEntreprendre — microloan up to $50,000
   - ID Gatineau – Fonds Soutien aux entreprises — up to $25,000 (Gatineau only)
   - Réseau SADC/CAE Outaouais — loan $5,000 to $300,000
   FEDERAL (apply in both Québec and Ontario):
   - BDC technology loan — grant up to $15,000 for a digital advisor + 0% loan
   - IRAP/PARI-CNRC — variable funding + expert advice
   - Futurpreneur Canada — loan up to $60,000 + mentorship (ages 18-39)
   - SIPEM-PROMPT — up to $200,000 for manufacturing SMEs
3. AI and automation tools for SMEs
4. ERP/CRM software recommendations
5. Productivity improvement strategies
6. Digital marketing and e-commerce

IMPORTANT eligibility nuance: most Québec programs (ESSOR, ADRIQ, CRIC, Plan PME, MicroEntreprendre, ID Gatineau, SADC) apply ONLY to businesses on the Québec side (Gatineau/Outaouais). For Ottawa (Ontario) businesses, only the federal programs apply. Always clarify this when the user's location matters.

Always give practical, actionable advice. When mentioning grants, be specific about amounts and eligibility, and tell the user to verify exact criteria on the official program website. Respond in the same language as the user (French or English). Be warm, professional, and encouraging. Keep responses concise but comprehensive.`;

// Simple in-memory rate limit by IP (per Edge Function instance)
const rateLimits = new Map();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 èdtan
const RATE_LIMIT_MAX = 30; // 30 mesaj pa èdtan pa IP

function checkRateLimit(ip) {
  const now = Date.now();
  const record = rateLimits.get(ip);

  if (!record || now - record.start > RATE_LIMIT_WINDOW) {
    rateLimits.set(ip, { count: 1, start: now });
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1 };
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0, resetIn: RATE_LIMIT_WINDOW - (now - record.start) };
  }

  record.count++;
  return { allowed: true, remaining: RATE_LIMIT_MAX - record.count };
}

export default async function handler(req) {
  // CORS pou aksè domèn ou
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  // Preflight OPTIONS
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  // ── Rate limit pa IP ─────────────────────────────────────────────
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
             req.headers.get("x-real-ip") ||
             "unknown";
  const limit = checkRateLimit(ip);

  if (!limit.allowed) {
    const minutesLeft = Math.ceil((limit.resetIn || 0) / 60000);
    return new Response(
      JSON.stringify({
        error: "rate_limit",
        message: `Trop de demandes. Reessayez dans ${minutesLeft} minutes.`,
      }),
      {
        status: 429,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }

  // ── Validate body ────────────────────────────────────────────────
  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  const { messages } = body;
  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response(JSON.stringify({ error: "messages array required" }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  // Limit konvèsasyon a 20 mesaj total
  if (messages.length > 20) {
    return new Response(
      JSON.stringify({ error: "Conversation too long. Please refresh." }),
      { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  // Limit chak mesaj a 2000 karaktè
  for (const m of messages) {
    if (typeof m.content !== "string" || m.content.length > 2000) {
      return new Response(
        JSON.stringify({ error: "Message too long (max 2000 characters)" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
  }

  // ── Verify API key sou sèvè ─────────────────────────────────────
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "Server configuration error" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  // ── Pwoxi ak Anthropic ──────────────────────────────────────────
  try {
    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1000,
        system: SYSTEM_PROMPT,
        messages: messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    const data = await anthropicRes.json();

    if (!anthropicRes.ok) {
      return new Response(
        JSON.stringify({
          error: data.error?.type || "api_error",
          message: data.error?.message || "API error",
        }),
        {
          status: anthropicRes.status,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Retounen sèlman tèks la (pa metadata)
    const reply = data.content?.[0]?.text || "";
    return new Response(
      JSON.stringify({
        reply,
        remaining: limit.remaining,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch {
    return new Response(
      JSON.stringify({ error: "Failed to reach AI service" }),
      { status: 502, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
}
