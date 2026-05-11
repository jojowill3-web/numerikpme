import { useState, useEffect, useRef } from "react";

const translations = {
  fr: {
    appTitle: "NuMérik PME",
    appSubtitle: "Votre assistant IA pour la transformation numérique",
    region: "Gatineau · Ottawa",
    nav: { diagnostic: "Diagnostic", assistant: "Assistant IA", subventions: "Subventions", plan: "Plan d'action" },
    hero: {
      title: "Propulsez votre PME à l'ère numérique",
      subtitle: "Diagnostic intelligent · Subventions gouvernementales · Plan d'action personnalisé · Assistant IA 24/7",
      cta: "Commencer le diagnostic",
      cta2: "Parler à l'assistant",
    },
    diagnostic: {
      title: "Diagnostic Numérique",
      subtitle: "Évaluez votre maturité numérique en 5 minutes",
      step: "Étape",
      of: "sur",
      next: "Suivant",
      prev: "Précédent",
      submit: "Voir mes résultats",
      questions: [
        {
          q: "Quel est votre secteur d'activité?",
          options: ["Commerce de détail", "Services professionnels", "Manufacturier", "Construction", "Restauration/Tourisme", "Technologie", "Santé", "Autre"],
        },
        {
          q: "Combien d'employés compte votre entreprise?",
          options: ["1–4 (Micro)", "5–19 (Petite)", "20–99 (Petite+)", "100–499 (Moyenne)"],
        },
        {
          q: "Utilisez-vous un logiciel de gestion (ERP/CRM)?",
          options: ["Non, tout est manuel", "Excel / Google Sheets seulement", "Logiciel de base (comptabilité)", "ERP/CRM intégré"],
        },
        {
          q: "Quelle est votre présence en ligne?",
          options: ["Aucune présence", "Page Facebook seulement", "Site web basique", "Site web + e-commerce + réseaux sociaux"],
        },
        {
          q: "Comment gérez-vous vos données clients?",
          options: ["Cahiers / papier", "Fichiers Excel", "Logiciel CRM basique", "CRM avancé avec automatisation"],
        },
        {
          q: "Utilisez-vous l'intelligence artificielle dans vos opérations?",
          options: ["Pas du tout", "ChatGPT occasionnellement", "Outils IA spécifiques (1-2)", "IA intégrée dans nos processus"],
        },
        {
          q: "Quel est votre budget annuel pour le numérique?",
          options: ["Moins de 5 000$", "5 000$ – 15 000$", "15 000$ – 50 000$", "Plus de 50 000$"],
        },
      ],
      resultTitle: "Votre score de maturité numérique",
      levels: ["Débutant", "En développement", "Intermédiaire", "Avancé"],
      levelDesc: [
        "Votre entreprise a un grand potentiel de croissance numérique. Des subventions importantes sont disponibles pour vous aider à démarrer.",
        "Vous avez posé les bases. Il est temps d'accélérer avec des outils plus puissants et des automatisations.",
        "Bonne progression! Concentrez-vous sur l'IA et l'intégration de vos systèmes pour maximiser votre productivité.",
        "Vous êtes un leader numérique! Explorez les technologies émergentes (IA générative, agents autonomes) pour garder votre avance.",
      ],
      viewPlan: "Voir mon plan d'action",
      viewGrants: "Voir mes subventions",
    },
    assistant: {
      title: "Assistant IA PME",
      subtitle: "Posez vos questions sur la transformation numérique, les subventions et la croissance de votre entreprise",
      placeholder: "Ex: Quelles subventions sont disponibles pour digitaliser ma PME à Gatineau?",
      send: "Envoyer",
      thinking: "L'assistant réfléchit...",
      suggestions: [
        "Quels programmes de subventions sont disponibles en 2026?",
        "Comment commencer ma transformation numérique?",
        "Quel logiciel CRM me recommandez-vous?",
        "Comment l'IA peut-elle réduire mes coûts?",
      ],
      welcome: "Bonjour! Je suis votre assistant spécialisé pour les PME de Gatineau-Ottawa. Je peux vous aider avec:\n\n• 💰 **Subventions et financement** disponibles en 2026\n• 🖥️ **Transformation numérique** adaptée à votre secteur\n• 🤖 **Intelligence artificielle** et automatisation\n• 📊 **Outils et logiciels** recommandés pour votre PME\n\nComment puis-je vous aider aujourd'hui?",
    },
    grants: {
      title: "Programmes de Subventions",
      subtitle: "Programmes gouvernementaux actifs en 2026 pour votre région",
      filter: "Filtrer par:",
      all: "Tous",
      quebec: "Québec",
      federal: "Fédéral",
      apply: "En savoir plus",
      programs: [
        {
          name: "Offensive Tr@ns Num",
          org: "ADRIQ – Gouvernement du Québec",
          amount: "Jusqu'à 25 000$",
          coverage: "50% des coûts",
          type: "quebec",
          color: "#0066CC",
          tags: ["ERP", "CRM", "Automatisation", "Cybersécurité"],
          desc: "Accompagnement complet dans votre virage numérique: diagnostic, implantation et formation.",
          url: "https://adriq.com",
        },
        {
          name: "Programme ESSOR",
          org: "Investissement Québec",
          amount: "Jusqu'à 50 000$",
          coverage: "50% des coûts",
          type: "quebec",
          color: "#0066CC",
          tags: ["Étude faisabilité", "Plan numérique", "Innovation"],
          desc: "Financement pour études préalables et plans d'investissement numérique.",
          url: "https://investquebec.com",
        },
        {
          name: "CRIC – Crédit Impôt R&D",
          org: "Gouvernement du Québec",
          amount: "Variable (remboursable)",
          coverage: "Crédits sur dépenses R&D",
          type: "quebec",
          color: "#0066CC",
          tags: ["R&D", "Innovation", "IA", "Commercialisation"],
          desc: "Nouveau programme 2025-2026 remplaçant 8 anciens crédits d'impôt. Applicable dès 2026.",
          url: "https://revenuquebec.ca",
        },
        {
          name: "Plan PME 2025-2028",
          org: "Réseau Accès PME – Québec",
          amount: "Enveloppe de 500M$",
          coverage: "Accompagnement + financement",
          type: "quebec",
          color: "#0066CC",
          tags: ["Démarrage", "Croissance", "Relève", "Numérique"],
          desc: "Accompagnement personnalisé par 500+ professionnels partout au Québec.",
          url: "https://quebec.ca",
        },
        {
          name: "BDC – Prêt Technologie",
          org: "Banque de Développement du Canada",
          amount: "Prêt à 0% intérêt",
          coverage: "90% du plan numérique",
          type: "federal",
          color: "#CC0000",
          tags: ["Prêt 0%", "Plan numérique", "Conseiller"],
          desc: "Subvention jusqu'à 15 000$ pour un conseiller numérique + prêt sans intérêt pour l'acquisition.",
          url: "https://bdc.ca",
        },
        {
          name: "SIPEM – PROMPT",
          org: "PROMPT – Gouvernement fédéral",
          amount: "Jusqu'à 200 000$",
          coverage: "50% des honoraires",
          type: "federal",
          color: "#CC0000",
          tags: ["Manufacturier", "4.0", "Robotique", "IA"],
          desc: "Programme spécial pour PME manufacturières. Volet 1: 10 000$, Volet 2: jusqu'à 200 000$.",
          url: "https://promptinnovation.ca",
        },
        {
          name: "PARI – CNRC",
          org: "Conseil National de Recherches Canada",
          amount: "Variable",
          coverage: "Financement + conseils experts",
          type: "federal",
          color: "#CC0000",
          tags: ["Innovation", "R&D", "Technologie", "Conseil"],
          desc: "Programme fédéral avec conseillers en technologie industrielle et financement R&D.",
          url: "https://nrc-cnrc.gc.ca",
        },
      ],
    },
    plan: {
      title: "Plan d'Action Personnalisé",
      subtitle: "Votre feuille de route numérique sur 12 mois",
      phases: [
        {
          phase: "Phase 1",
          period: "Mois 1–2",
          title: "Diagnostic & Planification",
          color: "#3B82F6",
          icon: "🔍",
          actions: [
            "Contacter le Réseau Accès PME (gratuit)",
            "Réaliser un diagnostic numérique complet",
            "Identifier vos priorités technologiques",
            "Cartographier vos processus actuels",
          ],
        },
        {
          phase: "Phase 2",
          period: "Mois 3–4",
          title: "Demandes de Subventions",
          color: "#10B981",
          icon: "💰",
          actions: [
            "Appliquer au programme ESSOR (plan numérique)",
            "S'inscrire à l'Offensive Tr@ns Num",
            "Contacter BDC pour prêt à 0%",
            "Consulter un conseiller PARI-CNRC",
          ],
        },
        {
          phase: "Phase 3",
          period: "Mois 5–8",
          title: "Implantation Technologique",
          color: "#8B5CF6",
          icon: "⚡",
          actions: [
            "Choisir et implanter ERP/CRM adapté",
            "Migrer vers l'infonuagique (Cloud)",
            "Former vos employés aux nouveaux outils",
            "Automatiser 3 processus répétitifs",
          ],
        },
        {
          phase: "Phase 4",
          period: "Mois 9–12",
          title: "IA & Optimisation",
          color: "#F59E0B",
          icon: "🤖",
          actions: [
            "Intégrer des outils IA dans vos opérations",
            "Mesurer le ROI de vos investissements",
            "Réclamer crédits CRIC dans déclaration 2026",
            "Planifier la phase d'expansion",
          ],
        },
      ],
      impact: "Impact attendu",
      impacts: [
        { label: "Hausse productivité", value: "+22%", icon: "📈" },
        { label: "Prime de valorisation", value: "+30%", icon: "💎" },
        { label: "Réduction coûts opérationnels", value: "-15%", icon: "💰" },
        { label: "Temps économisé / semaine", value: "8h", icon: "⏱️" },
      ],
    },
    lang: "EN",
  },
  en: {
    appTitle: "DigiSME",
    appSubtitle: "Your AI assistant for digital transformation",
    region: "Gatineau · Ottawa",
    nav: { diagnostic: "Diagnostic", assistant: "AI Assistant", subventions: "Grants", plan: "Action Plan" },
    hero: {
      title: "Power your SME into the digital age",
      subtitle: "Smart Diagnostic · Government Grants · Personalized Action Plan · 24/7 AI Assistant",
      cta: "Start Diagnostic",
      cta2: "Talk to Assistant",
    },
    diagnostic: {
      title: "Digital Diagnostic",
      subtitle: "Assess your digital maturity in 5 minutes",
      step: "Step",
      of: "of",
      next: "Next",
      prev: "Previous",
      submit: "See my results",
      questions: [
        {
          q: "What is your industry sector?",
          options: ["Retail", "Professional Services", "Manufacturing", "Construction", "Food/Tourism", "Technology", "Healthcare", "Other"],
        },
        {
          q: "How many employees does your business have?",
          options: ["1–4 (Micro)", "5–19 (Small)", "20–99 (Small+)", "100–499 (Medium)"],
        },
        {
          q: "Do you use a management software (ERP/CRM)?",
          options: ["No, everything is manual", "Excel / Google Sheets only", "Basic software (accounting)", "Integrated ERP/CRM"],
        },
        {
          q: "What is your online presence?",
          options: ["No presence", "Facebook page only", "Basic website", "Website + e-commerce + social media"],
        },
        {
          q: "How do you manage your customer data?",
          options: ["Paper / notebooks", "Excel files", "Basic CRM software", "Advanced CRM with automation"],
        },
        {
          q: "Do you use artificial intelligence in your operations?",
          options: ["Not at all", "ChatGPT occasionally", "Specific AI tools (1-2)", "AI integrated into our processes"],
        },
        {
          q: "What is your annual digital budget?",
          options: ["Less than $5,000", "$5,000 – $15,000", "$15,000 – $50,000", "More than $50,000"],
        },
      ],
      resultTitle: "Your digital maturity score",
      levels: ["Beginner", "Developing", "Intermediate", "Advanced"],
      levelDesc: [
        "Your business has great digital growth potential. Significant grants are available to help you get started.",
        "You've laid the groundwork. It's time to accelerate with more powerful tools and automations.",
        "Good progress! Focus on AI and system integration to maximize your productivity.",
        "You're a digital leader! Explore emerging technologies (generative AI, autonomous agents) to maintain your edge.",
      ],
      viewPlan: "See my action plan",
      viewGrants: "See my grants",
    },
    assistant: {
      title: "SME AI Assistant",
      subtitle: "Ask your questions about digital transformation, grants and business growth",
      placeholder: "Ex: What grants are available to digitize my SME in Gatineau?",
      send: "Send",
      thinking: "Assistant is thinking...",
      suggestions: [
        "What grant programs are available in 2026?",
        "How do I start my digital transformation?",
        "What CRM software do you recommend?",
        "How can AI reduce my operating costs?",
      ],
      welcome: "Hello! I'm your specialized assistant for SMEs in the Gatineau-Ottawa region. I can help you with:\n\n• 💰 **Grants and funding** available in 2026\n• 🖥️ **Digital transformation** tailored to your sector\n• 🤖 **Artificial intelligence** and automation\n• 📊 **Tools and software** recommended for your SME\n\nHow can I help you today?",
    },
    grants: {
      title: "Grant Programs",
      subtitle: "Active government programs in 2026 for your region",
      filter: "Filter by:",
      all: "All",
      quebec: "Québec",
      federal: "Federal",
      apply: "Learn more",
      programs: [
        {
          name: "Offensive Tr@ns Num",
          org: "ADRIQ – Government of Québec",
          amount: "Up to $25,000",
          coverage: "50% of costs",
          type: "quebec",
          color: "#0066CC",
          tags: ["ERP", "CRM", "Automation", "Cybersecurity"],
          desc: "Complete support in your digital transformation: diagnostic, implementation and training.",
          url: "https://adriq.com",
        },
        {
          name: "ESSOR Program",
          org: "Investissement Québec",
          amount: "Up to $50,000",
          coverage: "50% of costs",
          type: "quebec",
          color: "#0066CC",
          tags: ["Feasibility Study", "Digital Plan", "Innovation"],
          desc: "Funding for preliminary studies and digital investment plans.",
          url: "https://investquebec.com",
        },
        {
          name: "CRIC – R&D Tax Credit",
          org: "Government of Québec",
          amount: "Variable (refundable)",
          coverage: "Credits on R&D expenses",
          type: "quebec",
          color: "#0066CC",
          tags: ["R&D", "Innovation", "AI", "Commercialization"],
          desc: "New 2025-2026 program replacing 8 old tax credits. Applicable from 2026.",
          url: "https://revenuquebec.ca",
        },
        {
          name: "SME Plan 2025-2028",
          org: "Réseau Accès PME – Québec",
          amount: "$500M envelope",
          coverage: "Guidance + funding",
          type: "quebec",
          color: "#0066CC",
          tags: ["Startup", "Growth", "Succession", "Digital"],
          desc: "Personalized support by 500+ professionals across Québec.",
          url: "https://quebec.ca",
        },
        {
          name: "BDC – Technology Loan",
          org: "Business Development Bank of Canada",
          amount: "0% interest loan",
          coverage: "90% of digital plan",
          type: "federal",
          color: "#CC0000",
          tags: ["0% Loan", "Digital Plan", "Advisor"],
          desc: "Grant up to $15,000 for a digital advisor + interest-free loan for acquisition.",
          url: "https://bdc.ca",
        },
        {
          name: "SIPEM – PROMPT",
          org: "PROMPT – Federal Government",
          amount: "Up to $200,000",
          coverage: "50% of fees",
          type: "federal",
          color: "#CC0000",
          tags: ["Manufacturing", "4.0", "Robotics", "AI"],
          desc: "Special program for manufacturing SMEs. Stream 1: $10,000, Stream 2: up to $200,000.",
          url: "https://promptinnovation.ca",
        },
        {
          name: "IRAP – NRC",
          org: "National Research Council Canada",
          amount: "Variable",
          coverage: "Funding + expert advice",
          type: "federal",
          color: "#CC0000",
          tags: ["Innovation", "R&D", "Technology", "Advisory"],
          desc: "Federal program with industrial technology advisors and R&D funding.",
          url: "https://nrc-cnrc.gc.ca",
        },
      ],
    },
    plan: {
      title: "Personalized Action Plan",
      subtitle: "Your 12-month digital roadmap",
      phases: [
        {
          phase: "Phase 1",
          period: "Month 1–2",
          title: "Diagnostic & Planning",
          color: "#3B82F6",
          icon: "🔍",
          actions: [
            "Contact Réseau Accès PME (free)",
            "Complete a full digital diagnostic",
            "Identify your technology priorities",
            "Map your current processes",
          ],
        },
        {
          phase: "Phase 2",
          period: "Month 3–4",
          title: "Grant Applications",
          color: "#10B981",
          icon: "💰",
          actions: [
            "Apply to ESSOR program (digital plan)",
            "Register for Offensive Tr@ns Num",
            "Contact BDC for 0% loan",
            "Consult a IRAP-NRC advisor",
          ],
        },
        {
          phase: "Phase 3",
          period: "Month 5–8",
          title: "Technology Implementation",
          color: "#8B5CF6",
          icon: "⚡",
          actions: [
            "Choose and implement adapted ERP/CRM",
            "Migrate to cloud infrastructure",
            "Train employees on new tools",
            "Automate 3 repetitive processes",
          ],
        },
        {
          phase: "Phase 4",
          period: "Month 9–12",
          title: "AI & Optimization",
          color: "#F59E0B",
          icon: "🤖",
          actions: [
            "Integrate AI tools in your operations",
            "Measure ROI of your investments",
            "Claim CRIC credits in 2026 return",
            "Plan expansion phase",
          ],
        },
      ],
      impact: "Expected Impact",
      impacts: [
        { label: "Productivity increase", value: "+22%", icon: "📈" },
        { label: "Valuation premium", value: "+30%", icon: "💎" },
        { label: "Operating cost reduction", value: "-15%", icon: "💰" },
        { label: "Time saved / week", value: "8h", icon: "⏱️" },
      ],
    },
    lang: "FR",
  },
};

const SYSTEM_PROMPT = `You are a specialized AI assistant for SMEs (Small and Medium Enterprises) in the Gatineau-Ottawa region of Canada. You have deep expertise in:

1. Digital transformation strategies for SMEs
2. Canadian and Québec government grant programs (2025-2026 active programs):
   - Offensive Tr@ns Num (ADRIQ) - up to $25,000
   - Programme ESSOR (Investissement Québec) - up to $50,000
   - CRIC tax credit (new 2026)
   - Plan PME 2025-2028 ($500M envelope)
   - BDC 0% technology loan - up to $15,000
   - SIPEM-PROMPT for manufacturers - up to $200,000
   - PARI-CNRC federal program
3. AI and automation tools for SMEs
4. ERP/CRM software recommendations
5. Productivity improvement strategies
6. Digital marketing and e-commerce

The user is in the Gatineau-Ottawa region. Always give practical, actionable advice. When mentioning grants, be specific about amounts and eligibility. Respond in the same language as the user (French or English). Be warm, professional, and encouraging. Keep responses concise but comprehensive.`;

export default function App() {
  const [lang, setLang] = useState("fr");
  const [activeTab, setActiveTab] = useState("home");
  const [diagStep, setDiagStep] = useState(0);
  const [diagAnswers, setDiagAnswers] = useState([]);
  const [diagResult, setDiagResult] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [grantFilter, setGrantFilter] = useState("all");
  const [animIn, setAnimIn] = useState(true);
  const messagesEndRef = useRef(null);
  const t = translations[lang];

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ role: "assistant", content: t.assistant.welcome }]);
    }
  }, [lang]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const switchLang = () => {
    const newLang = lang === "fr" ? "en" : "fr";
    setLang(newLang);
    setMessages([{ role: "assistant", content: translations[newLang].assistant.welcome }]);
  };

  const handleDiagAnswer = (answer) => {
    const newAnswers = [...diagAnswers, answer];
    setDiagAnswers(newAnswers);
    if (diagStep < t.diagnostic.questions.length - 1) {
      setDiagStep(diagStep + 1);
    } else {
      const score = newAnswers.reduce((acc, ans, i) => {
        const q = t.diagnostic.questions[i];
        return acc + q.options.indexOf(ans);
      }, 0);
      const max = t.diagnostic.questions.reduce((acc, q) => acc + q.options.length - 1, 0);
      const pct = Math.round((score / max) * 100);
      const lvl = pct < 25 ? 0 : pct < 50 ? 1 : pct < 75 ? 2 : 3;
      setDiagResult({ score: pct, level: lvl });
    }
  };

  const resetDiag = () => {
    setDiagStep(0);
    setDiagAnswers([]);
    setDiagResult(null);
  };

  const sendMessage = async (text) => {
    const userText = text || input;
    if (!userText.trim()) return;
    const newMessages = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "Je suis désolé, je n'ai pas pu générer une réponse.";
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch {
      setMessages([...newMessages, { role: "assistant", content: lang === "fr" ? "Erreur de connexion. Veuillez réessayer." : "Connection error. Please try again." }]);
    }
    setLoading(false);
  };

  const filteredGrants = t.grants.programs.filter(
    (p) => grantFilter === "all" || p.type === grantFilter
  );

  const renderMarkdown = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n\n/g, "</p><p>")
      .replace(/\n/g, "<br/>")
      .replace(/^/, "<p>")
      .replace(/$/, "</p>");
  };

  const scoreColor = diagResult
    ? diagResult.score < 25 ? "#EF4444" : diagResult.score < 50 ? "#F59E0B" : diagResult.score < 75 ? "#3B82F6" : "#10B981"
    : "#3B82F6";

  return (
    <div style={{ fontFamily: "'Sora', 'DM Sans', sans-serif", background: "#0B0F1A", minHeight: "100vh", color: "#E8EAF0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0B0F1A; }
        ::-webkit-scrollbar-thumb { background: #2A3050; border-radius: 3px; }
        .tab-btn { cursor: pointer; transition: all 0.2s; }
        .tab-btn:hover { opacity: 0.85; }
        .card { background: #131828; border: 1px solid #1E2640; border-radius: 16px; transition: all 0.25s; }
        .card:hover { border-color: #2E4080; transform: translateY(-2px); box-shadow: 0 8px 32px rgba(60,100,255,0.08); }
        .btn-primary { background: linear-gradient(135deg, #3B82F6, #6366F1); color: white; border: none; border-radius: 10px; cursor: pointer; font-family: inherit; font-weight: 600; transition: all 0.2s; }
        .btn-primary:hover { opacity: 0.9; transform: translateY(-1px); box-shadow: 0 4px 20px rgba(99,102,241,0.4); }
        .btn-secondary { background: transparent; color: #94A3B8; border: 1px solid #1E2640; border-radius: 10px; cursor: pointer; font-family: inherit; transition: all 0.2s; }
        .btn-secondary:hover { border-color: #3B82F6; color: #3B82F6; }
        .chip { display: inline-block; background: #1E2640; color: #7C93C3; font-size: 11px; padding: 3px 10px; border-radius: 20px; font-weight: 500; }
        .msg-bubble { max-width: 80%; padding: 12px 16px; border-radius: 16px; line-height: 1.6; font-size: 14px; }
        .msg-user { background: linear-gradient(135deg, #3B82F6, #6366F1); color: white; margin-left: auto; border-radius: 16px 16px 4px 16px; }
        .msg-ai { background: #131828; border: 1px solid #1E2640; color: #CBD5E1; border-radius: 16px 16px 16px 4px; }
        .score-ring { transition: stroke-dashoffset 1s ease; }
        .phase-card { border-left: 3px solid; padding: 20px; border-radius: 0 12px 12px 0; background: #131828; margin-bottom: 12px; }
        .impact-card { text-align: center; background: #131828; border: 1px solid #1E2640; border-radius: 12px; padding: 20px 16px; }
        .nav-item { padding: 10px 20px; border-radius: 10px; cursor: pointer; font-weight: 600; font-size: 13px; transition: all 0.2s; white-space: nowrap; }
        .nav-item.active { background: linear-gradient(135deg, #3B82F6, #6366F1); color: white; }
        .nav-item:not(.active) { color: #64748B; }
        .nav-item:not(.active):hover { color: #94A3B8; background: #131828; }
        .diag-option { width: 100%; text-align: left; padding: 14px 18px; background: #131828; border: 1px solid #1E2640; border-radius: 10px; color: #CBD5E1; cursor: pointer; font-family: inherit; font-size: 14px; transition: all 0.2s; margin-bottom: 8px; }
        .diag-option:hover { border-color: #3B82F6; color: white; background: #1A2035; }
        .suggestion-chip { background: #131828; border: 1px solid #1E2640; color: #7C93C3; padding: 8px 14px; border-radius: 20px; cursor: pointer; font-size: 12px; font-family: inherit; transition: all 0.2s; white-space: nowrap; }
        .suggestion-chip:hover { border-color: #3B82F6; color: #93C5FD; }
        .grant-badge-quebec { background: rgba(0,102,204,0.15); color: #60A5FA; border: 1px solid rgba(0,102,204,0.3); }
        .grant-badge-federal { background: rgba(204,0,0,0.12); color: #FCA5A5; border: 1px solid rgba(204,0,0,0.25); }
        .pulse { animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100% { opacity:1 } 50% { opacity:0.5 } }
        input, textarea { outline: none; }
        .hero-glow { position: absolute; top: -100px; left: 50%; transform: translateX(-50%); width: 600px; height: 400px; background: radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 70%); pointer-events: none; }
      `}</style>

      {/* HEADER */}
      <header style={{ background: "rgba(11,15,26,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid #1E2640", padding: "0 24px", position: "sticky", top: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, background: "linear-gradient(135deg,#3B82F6,#6366F1)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>⚡</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 16, letterSpacing: "-0.5px" }}>{t.appTitle}</div>
            <div style={{ fontSize: 10, color: "#4B5563", letterSpacing: 2, textTransform: "uppercase" }}>{t.region}</div>
          </div>
        </div>
        <nav style={{ display: "flex", gap: 4 }}>
          {["home", "diagnostic", "assistant", "grants", "plan"].map((tab) => {
            const labels = { home: "🏠", diagnostic: t.nav.diagnostic, assistant: t.nav.assistant, grants: t.nav.subventions, plan: t.nav.plan };
            return (
              <button key={tab} className={`nav-item${activeTab === tab ? " active" : ""}`} onClick={() => setActiveTab(tab)}>
                {labels[tab]}
              </button>
            );
          })}
        </nav>
        <button onClick={switchLang} className="btn-secondary" style={{ padding: "8px 16px", fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
          🌐 {t.lang}
        </button>
      </header>

      <main style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px 60px" }}>

        {/* HOME */}
        {activeTab === "home" && (
          <div>
            <div style={{ position: "relative", textAlign: "center", padding: "80px 0 60px", overflow: "hidden" }}>
              <div className="hero-glow" />
              <div style={{ fontSize: 11, letterSpacing: 3, color: "#3B82F6", textTransform: "uppercase", marginBottom: 20, fontWeight: 600 }}>
                ✦ Gatineau · Ottawa · 2026 ✦
              </div>
              <h1 style={{ fontSize: "clamp(28px,5vw,52px)", fontWeight: 800, lineHeight: 1.15, letterSpacing: "-1.5px", marginBottom: 20, background: "linear-gradient(135deg,#E8EAF0 30%,#6366F1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {t.hero.title}
              </h1>
              <p style={{ color: "#64748B", fontSize: 15, marginBottom: 36, maxWidth: 520, margin: "0 auto 36px" }}>
                {t.hero.subtitle}
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <button className="btn-primary" style={{ padding: "14px 28px", fontSize: 15 }} onClick={() => setActiveTab("diagnostic")}>
                  🔍 {t.hero.cta}
                </button>
                <button className="btn-secondary" style={{ padding: "14px 28px", fontSize: 15 }} onClick={() => setActiveTab("assistant")}>
                  🤖 {t.hero.cta2}
                </button>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 32 }}>
              {[
                { icon: "🔍", label: t.nav.diagnostic, desc: lang === "fr" ? "Évaluez votre niveau numérique en 5 min" : "Assess your digital level in 5 min", tab: "diagnostic", color: "#3B82F6" },
                { icon: "🤖", label: t.nav.assistant, desc: lang === "fr" ? "Questions 24/7 sur vos défis numériques" : "24/7 questions on your digital challenges", tab: "assistant", color: "#6366F1" },
                { icon: "💰", label: t.nav.subventions, desc: lang === "fr" ? "7 programmes actifs en 2026" : "7 active programs in 2026", tab: "grants", color: "#10B981" },
                { icon: "📋", label: t.nav.plan, desc: lang === "fr" ? "Feuille de route sur 12 mois" : "12-month roadmap", tab: "plan", color: "#F59E0B" },
              ].map((c) => (
                <div key={c.tab} className="card" style={{ padding: 24, cursor: "pointer" }} onClick={() => setActiveTab(c.tab)}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>{c.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: c.color, marginBottom: 6 }}>{c.label}</div>
                  <div style={{ color: "#64748B", fontSize: 13 }}>{c.desc}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
              {[
                { v: "+22%", l: lang === "fr" ? "Productivité" : "Productivity", c: "#10B981" },
                { v: "7", l: lang === "fr" ? "Programmes actifs" : "Active programs", c: "#3B82F6" },
                { v: "$500M", l: lang === "fr" ? "Budget PME Québec" : "Québec SME Budget", c: "#6366F1" },
                { v: "+30%", l: lang === "fr" ? "Prime valorisation" : "Valuation premium", c: "#F59E0B" },
              ].map((s) => (
                <div key={s.l} style={{ background: "#131828", border: "1px solid #1E2640", borderRadius: 12, padding: "20px 16px", textAlign: "center" }}>
                  <div style={{ fontSize: 26, fontWeight: 800, color: s.c, letterSpacing: "-1px" }}>{s.v}</div>
                  <div style={{ fontSize: 11, color: "#4B5563", marginTop: 4 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DIAGNOSTIC */}
        {activeTab === "diagnostic" && (
          <div style={{ paddingTop: 40 }}>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 8 }}>{t.diagnostic.title}</h2>
              <p style={{ color: "#64748B" }}>{t.diagnostic.subtitle}</p>
            </div>

            {!diagResult ? (
              <div className="card" style={{ maxWidth: 600, margin: "0 auto", padding: 36 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
                  <span style={{ color: "#64748B", fontSize: 13 }}>{t.diagnostic.step} {diagStep + 1} {t.diagnostic.of} {t.diagnostic.questions.length}</span>
                  <div style={{ display: "flex", gap: 4 }}>
                    {t.diagnostic.questions.map((_, i) => (
                      <div key={i} style={{ width: 28, height: 4, borderRadius: 2, background: i <= diagStep ? "#3B82F6" : "#1E2640", transition: "background 0.3s" }} />
                    ))}
                  </div>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 24, lineHeight: 1.4 }}>{t.diagnostic.questions[diagStep].q}</h3>
                <div>
                  {t.diagnostic.questions[diagStep].options.map((opt) => (
                    <button key={opt} className="diag-option" onClick={() => handleDiagAnswer(opt)}>{opt}</button>
                  ))}
                </div>
                {diagStep > 0 && (
                  <button className="btn-secondary" style={{ marginTop: 16, padding: "8px 16px", fontSize: 13 }} onClick={() => { setDiagStep(diagStep - 1); setDiagAnswers(diagAnswers.slice(0, -1)); }}>
                    ← {t.diagnostic.prev}
                  </button>
                )}
              </div>
            ) : (
              <div style={{ maxWidth: 600, margin: "0 auto" }}>
                <div className="card" style={{ padding: 40, textAlign: "center", marginBottom: 20 }}>
                  <p style={{ color: "#64748B", marginBottom: 20, fontSize: 14 }}>{t.diagnostic.resultTitle}</p>
                  <svg width="160" height="160" viewBox="0 0 160 160" style={{ margin: "0 auto 20px" }}>
                    <circle cx="80" cy="80" r="65" fill="none" stroke="#1E2640" strokeWidth="10" />
                    <circle cx="80" cy="80" r="65" fill="none" stroke={scoreColor} strokeWidth="10"
                      strokeDasharray={`${2 * Math.PI * 65}`}
                      strokeDashoffset={`${2 * Math.PI * 65 * (1 - diagResult.score / 100)}`}
                      strokeLinecap="round" transform="rotate(-90 80 80)" className="score-ring" />
                    <text x="80" y="75" textAnchor="middle" fill="#E8EAF0" fontSize="32" fontWeight="800" fontFamily="Sora">{diagResult.score}%</text>
                    <text x="80" y="98" textAnchor="middle" fill="#64748B" fontSize="12" fontFamily="DM Sans">{t.diagnostic.levels[diagResult.level]}</text>
                  </svg>
                  <p style={{ color: "#94A3B8", fontSize: 14, lineHeight: 1.7, marginBottom: 28 }}>{t.diagnostic.levelDesc[diagResult.level]}</p>
                  <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                    <button className="btn-primary" style={{ padding: "12px 22px", fontSize: 14 }} onClick={() => setActiveTab("plan")}>📋 {t.diagnostic.viewPlan}</button>
                    <button className="btn-primary" style={{ padding: "12px 22px", fontSize: 14, background: "linear-gradient(135deg,#10B981,#059669)" }} onClick={() => setActiveTab("grants")}>💰 {t.diagnostic.viewGrants}</button>
                    <button className="btn-secondary" style={{ padding: "12px 22px", fontSize: 14 }} onClick={resetDiag}>↺ Recommencer</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ASSISTANT */}
        {activeTab === "assistant" && (
          <div style={{ paddingTop: 40 }}>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 8 }}>{t.assistant.title}</h2>
              <p style={{ color: "#64748B", fontSize: 14 }}>{t.assistant.subtitle}</p>
            </div>

            <div style={{ maxWidth: 700, margin: "0 auto" }}>
              <div style={{ background: "#131828", border: "1px solid #1E2640", borderRadius: 16, padding: 20, height: 420, overflowY: "auto", marginBottom: 16, display: "flex", flexDirection: "column", gap: 12 }}>
                {messages.map((m, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                    {m.role === "assistant" && (
                      <div style={{ width: 28, height: 28, background: "linear-gradient(135deg,#3B82F6,#6366F1)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, marginRight: 8, flexShrink: 0, marginTop: 4 }}>⚡</div>
                    )}
                    <div className={`msg-bubble ${m.role === "user" ? "msg-user" : "msg-ai"}`}
                      dangerouslySetInnerHTML={{ __html: renderMarkdown(m.content) }} />
                  </div>
                ))}
                {loading && (
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 28, height: 28, background: "linear-gradient(135deg,#3B82F6,#6366F1)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>⚡</div>
                    <div className="msg-bubble msg-ai pulse" style={{ color: "#64748B", fontSize: 13 }}>{t.assistant.thinking}</div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
                {t.assistant.suggestions.map((s) => (
                  <button key={s} className="suggestion-chip" onClick={() => sendMessage(s)}>{s}</button>
                ))}
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <input value={input} onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                  placeholder={t.assistant.placeholder}
                  style={{ flex: 1, background: "#131828", border: "1px solid #1E2640", borderRadius: 12, padding: "14px 18px", color: "#E8EAF0", fontSize: 14, fontFamily: "inherit" }} />
                <button className="btn-primary" style={{ padding: "14px 22px", fontSize: 14, flexShrink: 0 }} onClick={() => sendMessage()} disabled={loading}>
                  {t.assistant.send} →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* GRANTS */}
        {activeTab === "grants" && (
          <div style={{ paddingTop: 40 }}>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 8 }}>{t.grants.title}</h2>
              <p style={{ color: "#64748B" }}>{t.grants.subtitle}</p>
            </div>

            <div style={{ display: "flex", gap: 8, marginBottom: 28, justifyContent: "center" }}>
              {["all", "quebec", "federal"].map((f) => (
                <button key={f} onClick={() => setGrantFilter(f)}
                  className={grantFilter === f ? "btn-primary" : "btn-secondary"}
                  style={{ padding: "8px 20px", fontSize: 13 }}>
                  {f === "all" ? t.grants.all : f === "quebec" ? `🔵 ${t.grants.quebec}` : `🔴 ${t.grants.federal}`}
                </button>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 16 }}>
              {filteredGrants.map((g) => (
                <div key={g.name} className="card" style={{ padding: 24 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                    <h3 style={{ fontWeight: 700, fontSize: 16, lineHeight: 1.3 }}>{g.name}</h3>
                    <span className={`chip grant-badge-${g.type}`} style={{ marginLeft: 8, flexShrink: 0, padding: "4px 10px", borderRadius: 6 }}>
                      {g.type === "quebec" ? "QC" : "CA"}
                    </span>
                  </div>
                  <p style={{ color: "#64748B", fontSize: 12, marginBottom: 14 }}>{g.org}</p>
                  <div style={{ background: "#0B0F1A", borderRadius: 10, padding: "12px 16px", marginBottom: 14 }}>
                    <div style={{ color: "#10B981", fontWeight: 700, fontSize: 18, letterSpacing: "-0.5px" }}>{g.amount}</div>
                    <div style={{ color: "#4B5563", fontSize: 11, marginTop: 2 }}>{g.coverage}</div>
                  </div>
                  <p style={{ color: "#94A3B8", fontSize: 13, lineHeight: 1.6, marginBottom: 14 }}>{g.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                    {g.tags.map((tag) => <span key={tag} className="chip">{tag}</span>)}
                  </div>
                  <a href={g.url} target="_blank" rel="noopener noreferrer"
                    style={{ display: "block", textAlign: "center", padding: "10px", background: "linear-gradient(135deg,#3B82F6,#6366F1)", color: "white", borderRadius: 8, textDecoration: "none", fontSize: 13, fontWeight: 600 }}>
                    {t.grants.apply} →
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PLAN */}
        {activeTab === "plan" && (
          <div style={{ paddingTop: 40 }}>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 8 }}>{t.plan.title}</h2>
              <p style={{ color: "#64748B" }}>{t.plan.subtitle}</p>
            </div>

            <div style={{ maxWidth: 700, margin: "0 auto" }}>
              {t.plan.phases.map((ph) => (
                <div key={ph.phase} className="phase-card" style={{ borderLeftColor: ph.color }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                    <span style={{ fontSize: 28 }}>{ph.icon}</span>
                    <div>
                      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: ph.color, textTransform: "uppercase", letterSpacing: 1 }}>{ph.phase}</span>
                        <span style={{ fontSize: 11, color: "#4B5563", background: "#0B0F1A", padding: "2px 8px", borderRadius: 4 }}>{ph.period}</span>
                      </div>
                      <div style={{ fontWeight: 700, fontSize: 16, marginTop: 2 }}>{ph.title}</div>
                    </div>
                  </div>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                    {ph.actions.map((a) => (
                      <li key={a} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "#94A3B8" }}>
                        <span style={{ color: ph.color, marginTop: 1, flexShrink: 0 }}>✓</span>{a}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div style={{ marginTop: 40 }}>
                <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 20, textAlign: "center" }}>{t.plan.impact}</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
                  {t.plan.impacts.map((imp) => (
                    <div key={imp.label} className="impact-card">
                      <div style={{ fontSize: 28, marginBottom: 8 }}>{imp.icon}</div>
                      <div style={{ fontSize: 22, fontWeight: 800, color: "#3B82F6", letterSpacing: "-0.5px" }}>{imp.value}</div>
                      <div style={{ fontSize: 11, color: "#4B5563", marginTop: 4 }}>{imp.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
