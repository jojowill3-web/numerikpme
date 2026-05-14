import { useState, useEffect, useRef } from "react";
import { Analytics } from "@vercel/analytics/react";

const translations = {
  fr: {
    appTitle: "NuMérik PME",
    appSubtitle: "Votre assistant IA pour la transformation numérique",
    region: "Gatineau · Ottawa",
    nav: { diagnostic: "Diagnostic", assistant: "Assistant IA", subventions: "Subventions", plan: "Plan d'action" },
    hero: {
      title: "Propulsez votre PME\nà l'ère numérique",
      subtitle: "Diagnostic intelligent · Subventions gouvernementales · Plan d'action personnalisé · Assistant IA 24/7",
      cta: "Commencer le diagnostic",
      cta2: "Parler à l'assistant",
      badge: "Gatineau · Ottawa · 2026",
    },
    diagnostic: {
      title: "Diagnostic Numérique",
      subtitle: "Évaluez votre maturité numérique en 5 minutes",
      step: "Étape", of: "sur", next: "Suivant", prev: "Précédent", submit: "Voir mes résultats",
      questions: [
        { q: "Quel est votre secteur d'activité?", options: ["Commerce de détail","Services professionnels","Manufacturier","Construction","Restauration/Tourisme","Technologie","Santé","Autre"] },
        { q: "Combien d'employés compte votre entreprise?", options: ["1–4 (Micro)","5–19 (Petite)","20–99 (Petite+)","100–499 (Moyenne)"] },
        { q: "Utilisez-vous un logiciel de gestion (ERP/CRM)?", options: ["Non, tout est manuel","Excel / Google Sheets seulement","Logiciel de base (comptabilité)","ERP/CRM intégré"] },
        { q: "Quelle est votre présence en ligne?", options: ["Aucune présence","Page Facebook seulement","Site web basique","Site web + e-commerce + réseaux sociaux"] },
        { q: "Comment gérez-vous vos données clients?", options: ["Cahiers / papier","Fichiers Excel","Logiciel CRM basique","CRM avancé avec automatisation"] },
        { q: "Utilisez-vous l'intelligence artificielle dans vos opérations?", options: ["Pas du tout","ChatGPT occasionnellement","Outils IA spécifiques (1-2)","IA intégrée dans nos processus"] },
        { q: "Quel est votre budget annuel pour le numérique?", options: ["Moins de 5 000$","5 000$ – 15 000$","15 000$ – 50 000$","Plus de 50 000$"] },
      ],
      resultTitle: "Votre score de maturité numérique",
      levels: ["Débutant","En développement","Intermédiaire","Avancé"],
      levelDesc: [
        "Votre entreprise a un grand potentiel de croissance numérique. Des subventions importantes sont disponibles pour vous aider à démarrer.",
        "Vous avez posé les bases. Il est temps d'accélérer avec des outils plus puissants et des automatisations.",
        "Bonne progression! Concentrez-vous sur l'IA et l'intégration de vos systèmes pour maximiser votre productivité.",
        "Vous êtes un leader numérique! Explorez les technologies émergentes (IA générative, agents autonomes) pour garder votre avance.",
      ],
      viewPlan: "Voir mon plan d'action", viewGrants: "Voir mes subventions",
    },
    assistant: {
      title: "Assistant IA PME",
      subtitle: "Posez vos questions sur la transformation numérique, les subventions et la croissance de votre entreprise",
      placeholder: "Ex: Quelles subventions sont disponibles pour digitaliser ma PME à Gatineau?",
      send: "Envoyer", thinking: "L'assistant réfléchit...",
      suggestions: ["Quels programmes de subventions sont disponibles en 2026?","Comment commencer ma transformation numérique?","Quel logiciel CRM me recommandez-vous?","Comment l'IA peut-elle réduire mes coûts?"],
      welcome: "Bonjour! Je suis votre assistant spécialisé pour les PME de Gatineau-Ottawa. Je peux vous aider avec:\n\n• 💰 **Subventions et financement** disponibles en 2026\n• 🖥️ **Transformation numérique** adaptée à votre secteur\n• 🤖 **Intelligence artificielle** et automatisation\n• 📊 **Outils et logiciels** recommandés pour votre PME\n\nComment puis-je vous aider aujourd'hui?",
    },
    grants: {
      title: "Programmes de Subventions", subtitle: "Programmes gouvernementaux actifs en 2026 pour votre région",
      filter: "Filtrer par:", all: "Tous", quebec: "Québec", federal: "Fédéral", apply: "En savoir plus",
      programs: [
        { name: "Offensive Tr@ns Num", org: "ADRIQ – Gouvernement du Québec", amount: "Jusqu'à 25 000$", coverage: "50% des coûts", type: "quebec", tags: ["ERP","CRM","Automatisation","Cybersécurité"], desc: "Accompagnement complet dans votre virage numérique: diagnostic, implantation et formation.", url: "https://adriq.com" },
        { name: "Programme ESSOR", org: "Investissement Québec", amount: "Jusqu'à 50 000$", coverage: "50% des coûts", type: "quebec", tags: ["Étude faisabilité","Plan numérique","Innovation"], desc: "Financement pour études préalables et plans d'investissement numérique.", url: "https://investquebec.com" },
        { name: "CRIC – Crédit Impôt R&D", org: "Gouvernement du Québec", amount: "Variable (remboursable)", coverage: "Crédits sur dépenses R&D", type: "quebec", tags: ["R&D","Innovation","IA","Commercialisation"], desc: "Nouveau programme 2025-2026 remplaçant 8 anciens crédits d'impôt. Applicable dès 2026.", url: "https://revenuquebec.ca" },
        { name: "Plan PME 2025-2028", org: "Réseau Accès PME – Québec", amount: "Enveloppe de 500M$", coverage: "Accompagnement + financement", type: "quebec", tags: ["Démarrage","Croissance","Relève","Numérique"], desc: "Accompagnement personnalisé par 500+ professionnels partout au Québec.", url: "https://quebec.ca" },
        { name: "BDC – Prêt Technologie", org: "Banque de Développement du Canada", amount: "Prêt à 0% intérêt", coverage: "90% du plan numérique", type: "federal", tags: ["Prêt 0%","Plan numérique","Conseiller"], desc: "Subvention jusqu'à 15 000$ pour un conseiller numérique + prêt sans intérêt pour l'acquisition.", url: "https://bdc.ca" },
        { name: "SIPEM – PROMPT", org: "PROMPT – Gouvernement fédéral", amount: "Jusqu'à 200 000$", coverage: "50% des honoraires", type: "federal", tags: ["Manufacturier","4.0","Robotique","IA"], desc: "Programme spécial pour PME manufacturières. Volet 1: 10 000$, Volet 2: jusqu'à 200 000$.", url: "https://promptinnovation.ca" },
        { name: "PARI – CNRC", org: "Conseil National de Recherches Canada", amount: "Variable", coverage: "Financement + conseils experts", type: "federal", tags: ["Innovation","R&D","Technologie","Conseil"], desc: "Programme fédéral avec conseillers en technologie industrielle et financement R&D.", url: "https://nrc-cnrc.gc.ca" },
      ],
    },
    plan: {
      title: "Plan d'Action Personnalisé", subtitle: "Votre feuille de route numérique sur 12 mois",
      phases: [
        { phase: "Phase 1", period: "Mois 1–2", title: "Diagnostic & Planification", color: "#4F8EF7", icon: "🔍", actions: ["Contacter le Réseau Accès PME (gratuit)","Réaliser un diagnostic numérique complet","Identifier vos priorités technologiques","Cartographier vos processus actuels"] },
        { phase: "Phase 2", period: "Mois 3–4", title: "Demandes de Subventions", color: "#10B981", icon: "💰", actions: ["Appliquer au programme ESSOR (plan numérique)","S'inscrire à l'Offensive Tr@ns Num","Contacter BDC pour prêt à 0%","Consulter un conseiller PARI-CNRC"] },
        { phase: "Phase 3", period: "Mois 5–8", title: "Implantation Technologique", color: "#8B5CF6", icon: "⚡", actions: ["Choisir et implanter ERP/CRM adapté","Migrer vers l'infonuagique (Cloud)","Former vos employés aux nouveaux outils","Automatiser 3 processus répétitifs"] },
        { phase: "Phase 4", period: "Mois 9–12", title: "IA & Optimisation", color: "#F59E0B", icon: "🤖", actions: ["Intégrer des outils IA dans vos opérations","Mesurer le ROI de vos investissements","Réclamer crédits CRIC dans déclaration 2026","Planifier la phase d'expansion"] },
      ],
      impact: "Impact attendu",
      impacts: [{ label: "Hausse productivité", value: "+22%", icon: "📈" },{ label: "Prime de valorisation", value: "+30%", icon: "💎" },{ label: "Réduction coûts opérationnels", value: "-15%", icon: "💰" },{ label: "Temps économisé / semaine", value: "8h", icon: "⏱️" }],
    },
    lang: "EN",
    legal: {
      title: "Politique de Confidentialité",
      lastUpdate: "Dernière mise à jour : 12 mai 2026",
      back: "← Retour",
      sections: [
        { h: "1. Introduction", p: "NuMérik PME respecte votre vie privée et s'engage à protéger vos renseignements personnels. Cette politique explique comment nous collectons, utilisons et protégeons vos informations conformément à la Loi 25 du Québec et à la LPRPDE du Canada." },
        { h: "2. Renseignements collectés", p: "Nous collectons uniquement les informations que vous nous fournissez volontairement lors du diagnostic numérique (secteur d'activité, nombre d'employés, niveau technologique) et les questions posées à notre assistant IA. Nous ne collectons aucune donnée nominative sans votre consentement explicite." },
        { h: "3. Utilisation des données", p: "Vos données sont utilisées exclusivement pour : générer votre diagnostic personnalisé, recommander des subventions adaptées à votre profil, améliorer notre service. Nous ne vendons jamais vos données à des tiers." },
        { h: "4. Hébergement et sécurité", p: "Vos données sont hébergées sur des serveurs Vercel (infrastructure cloud sécurisée). L'assistant IA utilise la technologie Claude d'Anthropic. Les communications sont chiffrées en HTTPS. Nous appliquons les meilleures pratiques de sécurité de l'industrie." },
        { h: "5. Cookies et analytique", p: "Nous utilisons Vercel Analytics pour mesurer le trafic du site de manière anonyme. Aucun cookie publicitaire ni de pistage tiers n'est utilisé. Vous pouvez désactiver le suivi via les paramètres de votre navigateur." },
        { h: "6. Vos droits (Loi 25)", p: "Vous avez le droit d'accéder à vos renseignements personnels, de les corriger, de les supprimer, et de retirer votre consentement à tout moment. Pour exercer ces droits, contactez-nous à : contact@numerikpme.ca" },
        { h: "7. Responsable de la protection", p: "Conformément à la Loi 25, notre responsable de la protection des renseignements personnels peut être contacté à : contact@numerikpme.ca" },
        { h: "8. Modifications", p: "Cette politique peut être mise à jour. La date de dernière mise à jour est indiquée en haut de la page. Les changements importants vous seront communiqués." },
        { h: "9. Contact", p: "Pour toute question concernant cette politique ou vos données personnelles : contact@numerikpme.ca · NuMérik PME, Gatineau, Québec, Canada." },
      ],
    },
  },
  en: {
    appTitle: "DigiSME", appSubtitle: "Your AI assistant for digital transformation", region: "Gatineau · Ottawa",
    nav: { diagnostic: "Diagnostic", assistant: "AI Assistant", subventions: "Grants", plan: "Action Plan" },
    hero: { title: "Power your SME\ninto the digital age", subtitle: "Smart Diagnostic · Government Grants · Personalized Action Plan · 24/7 AI Assistant", cta: "Start Diagnostic", cta2: "Talk to Assistant", badge: "Gatineau · Ottawa · 2026" },
    diagnostic: {
      title: "Digital Diagnostic", subtitle: "Assess your digital maturity in 5 minutes",
      step: "Step", of: "of", next: "Next", prev: "Previous", submit: "See my results",
      questions: [
        { q: "What is your industry sector?", options: ["Retail","Professional Services","Manufacturing","Construction","Food/Tourism","Technology","Healthcare","Other"] },
        { q: "How many employees does your business have?", options: ["1–4 (Micro)","5–19 (Small)","20–99 (Small+)","100–499 (Medium)"] },
        { q: "Do you use a management software (ERP/CRM)?", options: ["No, everything is manual","Excel / Google Sheets only","Basic software (accounting)","Integrated ERP/CRM"] },
        { q: "What is your online presence?", options: ["No presence","Facebook page only","Basic website","Website + e-commerce + social media"] },
        { q: "How do you manage your customer data?", options: ["Paper / notebooks","Excel files","Basic CRM software","Advanced CRM with automation"] },
        { q: "Do you use artificial intelligence in your operations?", options: ["Not at all","ChatGPT occasionally","Specific AI tools (1-2)","AI integrated into our processes"] },
        { q: "What is your annual digital budget?", options: ["Less than $5,000","$5,000 – $15,000","$15,000 – $50,000","More than $50,000"] },
      ],
      resultTitle: "Your digital maturity score",
      levels: ["Beginner","Developing","Intermediate","Advanced"],
      levelDesc: ["Your business has great digital growth potential. Significant grants are available to help you get started.","You've laid the groundwork. It's time to accelerate with more powerful tools and automations.","Good progress! Focus on AI and system integration to maximize your productivity.","You're a digital leader! Explore emerging technologies (generative AI, autonomous agents) to maintain your edge."],
      viewPlan: "See my action plan", viewGrants: "See my grants",
    },
    assistant: {
      title: "SME AI Assistant", subtitle: "Ask your questions about digital transformation, grants and business growth",
      placeholder: "Ex: What grants are available to digitize my SME in Gatineau?",
      send: "Send", thinking: "Assistant is thinking...",
      suggestions: ["What grant programs are available in 2026?","How do I start my digital transformation?","What CRM software do you recommend?","How can AI reduce my operating costs?"],
      welcome: "Hello! I'm your specialized assistant for SMEs in the Gatineau-Ottawa region. I can help you with:\n\n• 💰 **Grants and funding** available in 2026\n• 🖥️ **Digital transformation** tailored to your sector\n• 🤖 **Artificial intelligence** and automation\n• 📊 **Tools and software** recommended for your SME\n\nHow can I help you today?",
    },
    grants: {
      title: "Grant Programs", subtitle: "Active government programs in 2026 for your region",
      filter: "Filter by:", all: "All", quebec: "Québec", federal: "Federal", apply: "Learn more",
      programs: [
        { name: "Offensive Tr@ns Num", org: "ADRIQ – Government of Québec", amount: "Up to $25,000", coverage: "50% of costs", type: "quebec", tags: ["ERP","CRM","Automation","Cybersecurity"], desc: "Complete support in your digital transformation: diagnostic, implementation and training.", url: "https://adriq.com" },
        { name: "ESSOR Program", org: "Investissement Québec", amount: "Up to $50,000", coverage: "50% of costs", type: "quebec", tags: ["Feasibility Study","Digital Plan","Innovation"], desc: "Funding for preliminary studies and digital investment plans.", url: "https://investquebec.com" },
        { name: "CRIC – R&D Tax Credit", org: "Government of Québec", amount: "Variable (refundable)", coverage: "Credits on R&D expenses", type: "quebec", tags: ["R&D","Innovation","AI","Commercialization"], desc: "New 2025-2026 program replacing 8 old tax credits. Applicable from 2026.", url: "https://revenuquebec.ca" },
        { name: "SME Plan 2025-2028", org: "Réseau Accès PME – Québec", amount: "$500M envelope", coverage: "Guidance + funding", type: "quebec", tags: ["Startup","Growth","Succession","Digital"], desc: "Personalized support by 500+ professionals across Québec.", url: "https://quebec.ca" },
        { name: "BDC – Technology Loan", org: "Business Development Bank of Canada", amount: "0% interest loan", coverage: "90% of digital plan", type: "federal", tags: ["0% Loan","Digital Plan","Advisor"], desc: "Grant up to $15,000 for a digital advisor + interest-free loan for acquisition.", url: "https://bdc.ca" },
        { name: "SIPEM – PROMPT", org: "PROMPT – Federal Government", amount: "Up to $200,000", coverage: "50% of fees", type: "federal", tags: ["Manufacturing","4.0","Robotics","AI"], desc: "Special program for manufacturing SMEs. Stream 1: $10,000, Stream 2: up to $200,000.", url: "https://promptinnovation.ca" },
        { name: "IRAP – NRC", org: "National Research Council Canada", amount: "Variable", coverage: "Funding + expert advice", type: "federal", tags: ["Innovation","R&D","Technology","Advisory"], desc: "Federal program with industrial technology advisors and R&D funding.", url: "https://nrc-cnrc.gc.ca" },
      ],
    },
    plan: {
      title: "Personalized Action Plan", subtitle: "Your 12-month digital roadmap",
      phases: [
        { phase: "Phase 1", period: "Month 1–2", title: "Diagnostic & Planning", color: "#4F8EF7", icon: "🔍", actions: ["Contact Réseau Accès PME (free)","Complete a full digital diagnostic","Identify your technology priorities","Map your current processes"] },
        { phase: "Phase 2", period: "Month 3–4", title: "Grant Applications", color: "#10B981", icon: "💰", actions: ["Apply to ESSOR program (digital plan)","Register for Offensive Tr@ns Num","Contact BDC for 0% loan","Consult a IRAP-NRC advisor"] },
        { phase: "Phase 3", period: "Month 5–8", title: "Technology Implementation", color: "#8B5CF6", icon: "⚡", actions: ["Choose and implement adapted ERP/CRM","Migrate to cloud infrastructure","Train employees on new tools","Automate 3 repetitive processes"] },
        { phase: "Phase 4", period: "Month 9–12", title: "AI & Optimization", color: "#F59E0B", icon: "🤖", actions: ["Integrate AI tools in your operations","Measure ROI of your investments","Claim CRIC credits in 2026 return","Plan expansion phase"] },
      ],
      impact: "Expected Impact",
      impacts: [{ label: "Productivity increase", value: "+22%", icon: "📈" },{ label: "Valuation premium", value: "+30%", icon: "💎" },{ label: "Operating cost reduction", value: "-15%", icon: "💰" },{ label: "Time saved / week", value: "8h", icon: "⏱️" }],
    },
    lang: "FR",
    legal: {
      title: "Privacy Policy",
      lastUpdate: "Last updated: May 12, 2026",
      back: "← Back",
      sections: [
        { h: "1. Introduction", p: "NuMerik PME respects your privacy and is committed to protecting your personal information. This policy explains how we collect, use, and protect your information in accordance with Quebec Law 25 and Canada PIPEDA." },
        { h: "2. Information collected", p: "We collect only the information you voluntarily provide during the digital diagnostic (business sector, number of employees, technology level) and questions asked to our AI assistant. We do not collect any personal identifying data without your explicit consent." },
        { h: "3. Use of data", p: "Your data is used exclusively to: generate your personalized diagnostic, recommend grants adapted to your profile, improve our service. We never sell your data to third parties." },
        { h: "4. Hosting and security", p: "Your data is hosted on Vercel servers (secure cloud infrastructure). The AI assistant uses Anthropic Claude technology. Communications are encrypted via HTTPS. We apply industry best security practices." },
        { h: "5. Cookies and analytics", p: "We use Vercel Analytics to measure site traffic anonymously. No advertising cookies or third-party tracking is used. You can disable tracking via your browser settings." },
        { h: "6. Your rights (Law 25)", p: "You have the right to access your personal information, correct it, delete it, and withdraw your consent at any time. To exercise these rights, contact us at: contact@numerikpme.ca" },
        { h: "7. Privacy officer", p: "In accordance with Law 25, our privacy officer can be contacted at: contact@numerikpme.ca" },
        { h: "8. Changes", p: "This policy may be updated. The last update date is indicated at the top of the page. Significant changes will be communicated to you." },
        { h: "9. Contact", p: "For any questions regarding this policy or your personal data: contact@numerikpme.ca · NuMerik PME, Gatineau, Quebec, Canada." },
      ],
    },
  },
};

const SYSTEM_PROMPT = `You are a specialized AI assistant for SMEs in the Gatineau-Ottawa region of Canada with deep expertise in digital transformation, government grants (2025-2026), AI tools, ERP/CRM recommendations, and productivity strategies. Always give practical, actionable advice. Respond in the same language as the user (French or English). Be warm, professional, and encouraging.`;

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
  const messagesEndRef = useRef(null);
  const t = translations[lang];

  useEffect(() => {
    setMessages([{ role: "assistant", content: t.assistant.welcome }]);
  }, [lang]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const switchLang = () => setLang(lang === "fr" ? "en" : "fr");

  const handleDiagAnswer = (answer) => {
    const newAnswers = [...diagAnswers, answer];
    setDiagAnswers(newAnswers);
    if (diagStep < t.diagnostic.questions.length - 1) {
      setDiagStep(diagStep + 1);
    } else {
      const score = newAnswers.reduce((acc, ans, i) => acc + t.diagnostic.questions[i].options.indexOf(ans), 0);
      const max = t.diagnostic.questions.reduce((acc, q) => acc + q.options.length - 1, 0);
      const pct = Math.round((score / max) * 100);
      setDiagResult({ score: pct, level: pct < 25 ? 0 : pct < 50 ? 1 : pct < 75 ? 2 : 3 });
    }
  };

  const resetDiag = () => { setDiagStep(0); setDiagAnswers([]); setDiagResult(null); };

  const sendMessage = async (text) => {
    const userText = text || input;
    if (!userText.trim()) return;
    const newMessages = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;

      // Verifye si kle a la
      if (!apiKey) {
        setMessages([...newMessages, { role: "assistant", content: lang === "fr"
          ? "❌ Clé API manquante. Ajoutez VITE_ANTHROPIC_API_KEY dans Vercel → Settings → Environment Variables."
          : "❌ API key missing. Add VITE_ANTHROPIC_API_KEY in Vercel → Settings → Environment Variables." }]);
        setLoading(false);
        return;
      }

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-5",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();

      // Si API retounen yon erè
      if (!res.ok || data.error) {
        const errType = data.error?.type || "";
        let errMsg = "";
        if (errType === "authentication_error") {
          errMsg = lang === "fr"
            ? "❌ Clé API invalide (401). Créez une nouvelle clé sur console.anthropic.com et mettez-la à jour sur Vercel."
            : "❌ Invalid API key (401). Create a new key at console.anthropic.com and update it on Vercel.";
        } else if (errType === "permission_error") {
          errMsg = lang === "fr"
            ? "❌ Accès refusé (403). Vérifiez les permissions de votre clé API."
            : "❌ Access denied (403). Check your API key permissions.";
        } else if (errType === "rate_limit_error") {
          errMsg = lang === "fr"
            ? "⏳ Trop de requêtes. Veuillez attendre quelques secondes et réessayer."
            : "⏳ Too many requests. Please wait a few seconds and try again.";
        } else {
          errMsg = lang === "fr"
            ? `❌ Erreur API: ${data.error?.message || res.status}`
            : `❌ API Error: ${data.error?.message || res.status}`;
        }
        setMessages([...newMessages, { role: "assistant", content: errMsg }]);
        setLoading(false);
        return;
      }

      const reply = data.content?.[0]?.text || (lang === "fr" ? "Réponse vide reçue." : "Empty response received.");
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (err) {
      setMessages([...newMessages, { role: "assistant", content: lang === "fr"
        ? `❌ Erreur de connexion: ${err.message}. Vérifiez votre connexion internet.`
        : `❌ Connection error: ${err.message}. Check your internet connection.` }]);
    }
    setLoading(false);
  };

  const filteredGrants = t.grants.programs.filter((p) => grantFilter === "all" || p.type === grantFilter);
  const renderMarkdown = (text) =>
    text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\n\n/g, "</p><p>").replace(/\n/g, "<br/>")
        .replace(/^/, "<p>").replace(/$/, "</p>");

  const scoreColor = diagResult
    ? diagResult.score < 25 ? "#EF4444" : diagResult.score < 50 ? "#F59E0B" : diagResult.score < 75 ? "#4F8EF7" : "#10B981"
    : "#4F8EF7";

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: "#060A14", minHeight: "100vh", color: "#E8EBF4" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:#060A14}::-webkit-scrollbar-thumb{background:#121E35;border-radius:4px}
        input,button{outline:none}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0.3}}
        @keyframes bounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-6px)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        .fade-up{animation:fadeUp 0.45s ease forwards}
        .logo-mark{width:38px;height:38px;background:linear-gradient(135deg,#4F8EF7,#6366F1);border-radius:10px;display:flex;align-items:center;justify-content:center;box-shadow:0 0 20px rgba(79,142,247,0.35);flex-shrink:0;position:relative;overflow:hidden}
        .logo-mark::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,0.18) 0%,transparent 55%)}
        .logo-bars{display:flex;gap:2.5px;align-items:flex-end;z-index:1}
        .logo-bar{width:4px;border-radius:2px;background:white}
        .nav{position:sticky;top:0;z-index:100;background:rgba(6,10,20,0.88);backdrop-filter:blur(16px);border-bottom:1px solid rgba(255,255,255,0.07);padding:0 24px;display:flex;align-items:center;justify-content:space-between;height:60px}
        .nav-tab{padding:7px 15px;border-radius:8px;font-size:13px;font-weight:500;cursor:pointer;border:none;background:transparent;color:#4B5A7A;transition:all 0.18s;font-family:'DM Sans',sans-serif;white-space:nowrap}
        .nav-tab:hover{color:#8B97B4;background:rgba(255,255,255,0.04)}
        .nav-tab.active{background:rgba(79,142,247,0.12);color:#4F8EF7;border:1px solid rgba(79,142,247,0.2)}
        .nav-lang{padding:7px 14px;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;border:1px solid rgba(255,255,255,0.12);background:#0D1526;color:#8B97B4;transition:all 0.18s;font-family:'DM Sans',sans-serif;display:flex;align-items:center;gap:6px}
        .nav-lang:hover{border-color:#4F8EF7;color:#4F8EF7}
        @media(max-width:500px){.contact-lbl{display:none}}
        .main{max-width:960px;margin:0 auto;padding:0 24px 80px}
        .hero{padding:88px 0 68px;text-align:center;position:relative}
        .hero-glow{position:absolute;top:0;left:50%;transform:translateX(-50%);width:700px;height:480px;background:radial-gradient(ellipse at 50% 30%,rgba(79,142,247,0.1) 0%,rgba(99,102,241,0.05) 40%,transparent 70%);pointer-events:none}
        .hero-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(79,142,247,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(79,142,247,0.04) 1px,transparent 1px);background-size:40px 40px;mask-image:radial-gradient(ellipse 80% 60% at 50% 30%,black 0%,transparent 100%);pointer-events:none}
        .hero-badge{display:inline-flex;align-items:center;gap:8px;padding:6px 14px;border-radius:100px;background:rgba(79,142,247,0.08);border:1px solid rgba(79,142,247,0.2);font-size:10.5px;font-weight:600;letter-spacing:2px;color:#4F8EF7;text-transform:uppercase;margin-bottom:28px}
        .badge-dot{width:5px;height:5px;border-radius:50%;background:#4F8EF7;animation:blink 2s infinite}
        .hero-title{font-family:'Space Grotesk',sans-serif;font-size:clamp(30px,5.5vw,54px);font-weight:700;line-height:1.1;letter-spacing:-1.5px;margin-bottom:22px;background:linear-gradient(160deg,#E8EBF4 35%,#8B97B4 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .hero-sub{color:#4B5A7A;font-size:14px;line-height:1.75;max-width:460px;margin:0 auto 40px}
        .hero-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
        .btn-p{padding:13px 26px;border-radius:10px;background:linear-gradient(135deg,#4F8EF7,#6366F1);color:white;border:none;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:600;transition:all 0.2s;box-shadow:0 4px 20px rgba(79,142,247,0.28)}
        .btn-p:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(79,142,247,0.4)}
        .btn-s{padding:13px 26px;border-radius:10px;background:rgba(255,255,255,0.04);color:#8B97B4;border:1px solid rgba(255,255,255,0.12);cursor:pointer;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;transition:all 0.2s}
        .btn-s:hover{border-color:#4F8EF7;color:#4F8EF7;background:rgba(79,142,247,0.06)}
        .feat-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-bottom:28px}
        .feat-card{background:#0D1526;border:1px solid rgba(255,255,255,0.07);border-radius:14px;padding:24px;cursor:pointer;transition:all 0.22s;position:relative;overflow:hidden}
        .feat-card::after{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--ac,#4F8EF7),transparent);opacity:0;transition:opacity 0.3s}
        .feat-card:hover::after{opacity:1}
        .feat-card:hover{border-color:rgba(255,255,255,0.12);transform:translateY(-3px);box-shadow:0 16px 48px rgba(0,0,0,0.3)}
        .stats-row{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
        .stat-c{background:#0D1526;border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:18px 14px;text-align:center;transition:border-color 0.2s}
        .stat-c:hover{border-color:rgba(255,255,255,0.12)}
        .sec-head{text-align:center;margin-bottom:36px;padding-top:48px}
        .sec-title{font-family:'Space Grotesk',sans-serif;font-size:26px;font-weight:700;letter-spacing:-0.5px;margin-bottom:8px}
        .sec-sub{color:#4B5A7A;font-size:13.5px}
        .diag-card{max-width:600px;margin:0 auto;background:#0D1526;border:1px solid rgba(255,255,255,0.07);border-radius:20px;padding:36px}
        .diag-opt{width:100%;text-align:left;padding:13px 18px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.07);border-radius:10px;color:#8B97B4;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:13.5px;transition:all 0.18s;margin-bottom:8px;display:block}
        .diag-opt:hover{border-color:#4F8EF7;color:#E8EBF4;background:rgba(79,142,247,0.06)}
        .score-ring{transition:stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1)}
        .chat-box{background:#0D1526;border:1px solid rgba(255,255,255,0.07);border-radius:18px;padding:20px;height:440px;overflow-y:auto;display:flex;flex-direction:column;gap:14px;margin-bottom:14px}
        .ai-av{width:30px;height:30px;border-radius:9px;flex-shrink:0;background:linear-gradient(135deg,#4F8EF7,#6366F1);display:flex;align-items:center;justify-content:center;font-size:13px;margin-top:2px;box-shadow:0 0 12px rgba(79,142,247,0.3)}
        .bub-u{background:linear-gradient(135deg,#4F8EF7,#6366F1);color:white;padding:11px 16px;border-radius:16px 16px 4px 16px;max-width:75%;font-size:13.5px;line-height:1.6}
        .bub-a{background:#121E35;border:1px solid rgba(255,255,255,0.07);color:#8B97B4;padding:11px 16px;border-radius:16px 16px 16px 4px;max-width:75%;font-size:13.5px;line-height:1.6}
        .tdot{width:6px;height:6px;border-radius:50%;background:#4F8EF7;display:inline-block;margin:0 2px}
        .tdot:nth-child(1){animation:bounce 1.2s infinite 0s}.tdot:nth-child(2){animation:bounce 1.2s infinite 0.2s}.tdot:nth-child(3){animation:bounce 1.2s infinite 0.4s}
        .sug-pill{background:#0D1526;border:1px solid rgba(255,255,255,0.07);color:#4B5A7A;padding:7px 13px;border-radius:100px;font-size:11.5px;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.18s;white-space:nowrap}
        .sug-pill:hover{border-color:#4F8EF7;color:#4F8EF7}
        .chat-in{flex:1;background:#0D1526;border:1px solid rgba(255,255,255,0.12);border-radius:12px;padding:13px 18px;color:#E8EBF4;font-size:13.5px;font-family:'DM Sans',sans-serif;transition:border-color 0.18s}
        .chat-in:focus{border-color:#4F8EF7}
        .chat-in::placeholder{color:#4B5A7A}
        .send-btn{padding:13px 22px;border-radius:12px;background:linear-gradient(135deg,#4F8EF7,#6366F1);color:white;border:none;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:13.5px;font-weight:600;transition:all 0.2s;flex-shrink:0;box-shadow:0 2px 12px rgba(79,142,247,0.25)}
        .send-btn:hover{transform:translateY(-1px);box-shadow:0 4px 20px rgba(79,142,247,0.4)}
        .send-btn:disabled{opacity:0.5;cursor:not-allowed;transform:none}
        .grants-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px}
        .grant-card{background:#0D1526;border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:22px;transition:all 0.22s}
        .grant-card:hover{border-color:rgba(255,255,255,0.12);transform:translateY(-2px);box-shadow:0 12px 36px rgba(0,0,0,0.3)}
        .filter-row{display:flex;gap:8px;justify-content:center;margin-bottom:28px}
        .fpill{padding:8px 20px;border-radius:100px;font-size:12.5px;font-weight:500;cursor:pointer;border:1px solid rgba(255,255,255,0.12);background:transparent;color:#4B5A7A;font-family:'DM Sans',sans-serif;transition:all 0.18s}
        .fpill.active{background:linear-gradient(135deg,#4F8EF7,#6366F1);color:white;border-color:transparent}
        .fpill:not(.active):hover{border-color:#4F8EF7;color:#4F8EF7}
        .chip{display:inline-block;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);color:#4B5A7A;font-size:10.5px;padding:2px 9px;border-radius:100px}
        .grant-lnk{display:block;text-align:center;padding:10px;background:linear-gradient(135deg,#4F8EF7,#6366F1);color:white;border-radius:9px;text-decoration:none;font-size:12.5px;font-weight:600;transition:opacity 0.2s}
        .grant-lnk:hover{opacity:0.88}
        .phase-block{border-left:3px solid;padding:20px 22px;background:#0D1526;border-radius:0 14px 14px 0;margin-bottom:10px;transition:background 0.2s}
        .phase-block:hover{background:#121E35}
        .impact-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:36px}
        .impact-card{text-align:center;background:#0D1526;border:1px solid rgba(255,255,255,0.07);border-radius:14px;padding:22px 14px}

        /* ── MOBILE NAV BOTTOM BAR ── */
        .mob-nav{display:none;position:fixed;bottom:0;left:0;right:0;z-index:200;background:rgba(6,10,20,0.96);backdrop-filter:blur(20px);border-top:1px solid rgba(255,255,255,0.08);padding:8px 0 env(safe-area-inset-bottom,8px)}
        .mob-nav-inner{display:flex;justify-content:space-around;align-items:center}
        .mob-tab{display:flex;flex-direction:column;align-items:center;gap:3px;padding:6px 12px;border:none;background:transparent;cursor:pointer;transition:all 0.18s;border-radius:10px;min-width:52px}
        .mob-tab-icon{font-size:20px;line-height:1}
        .mob-tab-lbl{font-size:9px;font-weight:600;letter-spacing:0.3px;color:#4B5A7A;font-family:'DM Sans',sans-serif;transition:color 0.18s}
        .mob-tab.active .mob-tab-lbl{color:#4F8EF7}
        .mob-tab.active .mob-tab-icon{filter:drop-shadow(0 0 6px #4F8EF7)}

        /* ── MEDIA QUERIES ── */
        @media(max-width:768px){
          .nav{padding:0 16px;height:56px}
          .nav nav{display:none}
          .nav-lang{padding:6px 10px;font-size:11px}
          .mob-nav{display:block}
          .main{padding:0 16px 90px}
          .hero{padding:48px 0 40px}
          .hero-glow{width:100%;height:300px}
          .hero-badge{font-size:9px;letter-spacing:1.5px;padding:5px 12px}
          .hero-sub{font-size:13px;max-width:100%}
          .hero-btns{flex-direction:column;align-items:center}
          .btn-p,.btn-s{width:100%;max-width:320px;text-align:center;padding:14px 20px;font-size:15px}
          .feat-grid{grid-template-columns:1fr}
          .feat-card{padding:20px}
          .stats-row{grid-template-columns:repeat(2,1fr)}
          .sec-head{padding-top:28px;margin-bottom:24px}
          .sec-title{font-size:22px}
          .diag-card{padding:24px 20px;border-radius:16px}
          .diag-opt{padding:14px 16px;font-size:14px}
          .chat-box{height:52vh;padding:16px;border-radius:14px}
          .bub-u,.bub-a{max-width:88%;font-size:13px}
          .sug-pill{font-size:11px;padding:6px 11px}
          .chat-in{font-size:14px;padding:12px 14px}
          .send-btn{padding:12px 16px;font-size:13px}
          .grants-grid{grid-template-columns:1fr}
          .filter-row{flex-wrap:wrap}
          .phase-block{padding:16px 18px}
          .impact-grid{grid-template-columns:repeat(2,1fr)}
        }
        @media(max-width:400px){
          .stats-row{grid-template-columns:repeat(2,1fr)}
          .impact-grid{grid-template-columns:repeat(2,1fr)}
        }
        /* ── LEGAL PAGE ── */
        .legal-wrap{max-width:760px;margin:0 auto;padding:48px 0 32px}
        .legal-back{display:inline-flex;align-items:center;gap:6px;padding:7px 14px;border-radius:8px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);color:#8B97B4;font-size:12.5px;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.18s;margin-bottom:28px}
        .legal-back:hover{border-color:#4F8EF7;color:#4F8EF7}
        .legal-title{font-family:'Space Grotesk',sans-serif;font-size:32px;font-weight:700;letter-spacing:-0.8px;margin-bottom:8px}
        .legal-date{font-size:12.5px;color:#4B5A7A;margin-bottom:36px}
        .legal-section{background:#0D1526;border:1px solid rgba(255,255,255,0.07);border-radius:14px;padding:22px 24px;margin-bottom:12px}
        .legal-h{font-family:'Space Grotesk',sans-serif;font-size:15px;font-weight:600;color:#E8EBF4;margin-bottom:8px}
        .legal-p{font-size:13.5px;color:#8B97B4;line-height:1.7}

        /* ── FOOTER ── */
        .footer{background:#0A0F1C;border-top:1px solid rgba(255,255,255,0.07);padding:48px 24px 32px;margin-top:80px}
        .footer-inner{max-width:960px;margin:0 auto;display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:32px}
        .footer-brand{display:flex;flex-direction:column;gap:12px}
        .footer-logo{display:flex;align-items:center;gap:10px}
        .footer-tag{color:#4B5A7A;font-size:12.5px;line-height:1.65;max-width:280px}
        .footer-social{display:flex;gap:8px;margin-top:6px}
        .footer-icon{width:32px;height:32px;border-radius:8px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);display:flex;align-items:center;justify-content:center;color:#8B97B4;text-decoration:none;transition:all 0.18s;font-size:13px}
        .footer-icon:hover{border-color:#4F8EF7;color:#4F8EF7;background:rgba(79,142,247,0.06)}
        .footer-col h4{font-family:'Space Grotesk',sans-serif;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#E8EBF4;margin-bottom:14px}
        .footer-col ul{list-style:none;display:flex;flex-direction:column;gap:8px}
        .footer-col a,.footer-col li{font-size:12.5px;color:#4B5A7A;text-decoration:none;transition:color 0.18s;cursor:pointer}
        .footer-col a:hover{color:#4F8EF7}
        .footer-contact{font-size:12.5px;color:#4B5A7A;line-height:1.7}
        .footer-contact strong{color:#8B97B4;font-weight:500}
        .footer-bottom{max-width:960px;margin:32px auto 0;padding-top:24px;border-top:1px solid rgba(255,255,255,0.05);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px}
        .footer-copy{font-size:11.5px;color:#4B5A7A}
        .footer-legal{display:flex;gap:18px;font-size:11.5px}
        .footer-legal a{color:#4B5A7A;text-decoration:none;transition:color 0.18s}
        .footer-legal a:hover{color:#8B97B4}
        @media(max-width:768px){
          .footer{padding:36px 16px 100px}
          .footer-inner{grid-template-columns:1fr;gap:28px}
          .footer-bottom{flex-direction:column;text-align:center;gap:10px}
          .footer-legal{flex-wrap:wrap;justify-content:center}
        }

        @supports(padding:env(safe-area-inset-bottom)){
          .mob-nav{padding-bottom:calc(8px + env(safe-area-inset-bottom))}
        }
      `}</style>

      {/* NAV */}
      <header className="nav">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div className="logo-mark">
            <div className="logo-bars">
              {[6,10,14,9].map((h,i) => <div key={i} className="logo-bar" style={{ height: h }} />)}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 17, letterSpacing: "-0.3px" }}>{t.appTitle}</div>
            <div style={{ fontSize: 9, color: "#4B5A7A", letterSpacing: "2.5px", textTransform: "uppercase", marginTop: 1 }}>{t.region}</div>
          </div>
        </div>

        <nav style={{ display: "flex", gap: 2 }}>
          {[
            { key: "home", label: lang === "fr" ? "Accueil" : "Home" },
            { key: "diagnostic", label: t.nav.diagnostic },
            { key: "assistant", label: t.nav.assistant },
            { key: "grants", label: t.nav.subventions },
            { key: "plan", label: t.nav.plan },
          ].map(({ key, label }) => (
            <button key={key} className={`nav-tab${activeTab === key ? " active" : ""}`} onClick={() => setActiveTab(key)}>{label}</button>
          ))}
        </nav>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <a href="mailto:contact@numerikpme.ca" className="nav-lang" style={{ textDecoration: "none" }}>
            ✉️ <span className="contact-lbl">{lang === "fr" ? "Contact" : "Contact"}</span>
          </a>
          <button className="nav-lang" onClick={switchLang}>🌐 {t.lang}</button>
        </div>
      </header>

      {/* MOBILE BOTTOM NAV */}
      <nav className="mob-nav">
        <div className="mob-nav-inner">
          {[
            { key: "home",       icon: "🏠", label: lang === "fr" ? "Accueil"    : "Home" },
            { key: "diagnostic", icon: "🔍", label: lang === "fr" ? "Diagnostic" : "Diagnostic" },
            { key: "assistant",  icon: "🤖", label: lang === "fr" ? "Assistant"  : "Assistant" },
            { key: "grants",     icon: "💰", label: lang === "fr" ? "Aides"      : "Grants" },
            { key: "plan",       icon: "📋", label: lang === "fr" ? "Plan"       : "Plan" },
          ].map(({ key, icon, label }) => (
            <button key={key} className={`mob-tab${activeTab === key ? " active" : ""}`} onClick={() => setActiveTab(key)}>
              <span className="mob-tab-icon">{icon}</span>
              <span className="mob-tab-lbl">{label}</span>
            </button>
          ))}
        </div>
      </nav>

      <main className="main">

        {/* HOME */}
        {activeTab === "home" && (
          <div className="fade-up">
            <div className="hero">
              <div className="hero-glow" />
              <div className="hero-grid" />
              <div className="hero-badge">
                <div className="badge-dot" />
                {t.hero.badge}
              </div>
              <h1 className="hero-title">
                {t.hero.title.split("\n").map((l, i) => <span key={i}>{l}{i === 0 && <br />}</span>)}
              </h1>
              <p className="hero-sub">{t.hero.subtitle}</p>
              <div className="hero-btns">
                <button className="btn-p" onClick={() => setActiveTab("diagnostic")}>🔍 {t.hero.cta}</button>
                <button className="btn-s" onClick={() => setActiveTab("assistant")}>🤖 {t.hero.cta2}</button>
              </div>
            </div>

            <div className="feat-grid">
              {[
                { key: "diagnostic", icon: "🔍", ac: "#4F8EF7", title: t.nav.diagnostic, desc: lang === "fr" ? "Évaluez votre niveau numérique en 5 minutes chrono" : "Assess your digital level in 5 minutes" },
                { key: "assistant",  icon: "🤖", ac: "#6366F1", title: t.nav.assistant,  desc: lang === "fr" ? "Posez vos questions 24h/24 à notre IA spécialisée" : "Ask 24/7 questions to our specialized AI" },
                { key: "grants",     icon: "💰", ac: "#10B981", title: t.nav.subventions, desc: lang === "fr" ? "7 programmes gouvernementaux actifs en 2026" : "7 active government programs in 2026" },
                { key: "plan",       icon: "📋", ac: "#F59E0B", title: t.nav.plan,        desc: lang === "fr" ? "Votre feuille de route personnalisée sur 12 mois" : "Your personalized 12-month roadmap" },
              ].map((f) => (
                <div key={f.key} className="feat-card" style={{ "--ac": f.ac }} onClick={() => setActiveTab(f.key)}>
                  <div style={{ fontSize: 28, marginBottom: 14 }}>{f.icon}</div>
                  <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 15, color: f.ac, marginBottom: 6 }}>{f.title}</div>
                  <div style={{ fontSize: 12.5, color: "#4B5A7A", lineHeight: 1.6 }}>{f.desc}</div>
                </div>
              ))}
            </div>

            <div className="stats-row">
              {[
                { v: "+22%", l: lang === "fr" ? "Productivité" : "Productivity", c: "#10B981" },
                { v: "7",    l: lang === "fr" ? "Programmes actifs" : "Active programs", c: "#4F8EF7" },
                { v: "500M$",l: lang === "fr" ? "Budget PME Québec" : "Québec SME Budget", c: "#6366F1" },
                { v: "+30%", l: lang === "fr" ? "Prime valorisation" : "Valuation premium", c: "#F59E0B" },
              ].map((s) => (
                <div key={s.l} className="stat-c">
                  <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 24, fontWeight: 700, color: s.c, letterSpacing: "-0.5px" }}>{s.v}</div>
                  <div style={{ fontSize: 10, color: "#4B5A7A", marginTop: 4, lineHeight: 1.4 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DIAGNOSTIC */}
        {activeTab === "diagnostic" && (
          <div className="fade-up">
            <div className="sec-head">
              <h2 className="sec-title">{t.diagnostic.title}</h2>
              <p className="sec-sub">{t.diagnostic.subtitle}</p>
            </div>

            {!diagResult ? (
              <div className="diag-card">
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ color: "#4B5A7A", fontSize: 12 }}>{t.diagnostic.step} {diagStep + 1} {t.diagnostic.of} {t.diagnostic.questions.length}</span>
                  <span style={{ color: "#4F8EF7", fontSize: 12, fontWeight: 600 }}>{Math.round(((diagStep + 1) / t.diagnostic.questions.length) * 100)}%</span>
                </div>
                <div style={{ display: "flex", gap: 5, marginBottom: 24 }}>
                  {t.diagnostic.questions.map((_, i) => (
                    <div key={i} style={{ height: 4, flex: 1, borderRadius: 2, background: i <= diagStep ? "#4F8EF7" : "rgba(255,255,255,0.07)", transition: "background 0.3s" }} />
                  ))}
                </div>
                <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 17, fontWeight: 600, lineHeight: 1.45, marginBottom: 22 }}>{t.diagnostic.questions[diagStep].q}</h3>
                {t.diagnostic.questions[diagStep].options.map((opt) => (
                  <button key={opt} className="diag-opt" onClick={() => handleDiagAnswer(opt)}>{opt}</button>
                ))}
                {diagStep > 0 && (
                  <button className="btn-s" style={{ marginTop: 16, padding: "8px 16px", fontSize: 12 }}
                    onClick={() => { setDiagStep(diagStep - 1); setDiagAnswers(diagAnswers.slice(0, -1)); }}>
                    ← {t.diagnostic.prev}
                  </button>
                )}
              </div>
            ) : (
              <div style={{ maxWidth: 560, margin: "0 auto", background: "#0D1526", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: 40, textAlign: "center" }}>
                <p style={{ color: "#4B5A7A", fontSize: 13, marginBottom: 24 }}>{t.diagnostic.resultTitle}</p>
                <svg width="160" height="160" viewBox="0 0 160 160" style={{ margin: "0 auto 20px", display: "block" }}>
                  <circle cx="80" cy="80" r="65" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
                  <circle cx="80" cy="80" r="65" fill="none" stroke={scoreColor} strokeWidth="10"
                    strokeDasharray={`${2 * Math.PI * 65}`}
                    strokeDashoffset={`${2 * Math.PI * 65 * (1 - diagResult.score / 100)}`}
                    strokeLinecap="round" transform="rotate(-90 80 80)" className="score-ring"
                    style={{ filter: `drop-shadow(0 0 8px ${scoreColor}55)` }} />
                  <text x="80" y="76" textAnchor="middle" fill="#E8EBF4" fontSize="30" fontWeight="700" fontFamily="Space Grotesk">{diagResult.score}%</text>
                  <text x="80" y="96" textAnchor="middle" fill="#4B5A7A" fontSize="11" fontFamily="DM Sans">{t.diagnostic.levels[diagResult.level]}</text>
                </svg>
                <p style={{ color: "#8B97B4", fontSize: 13.5, lineHeight: 1.7, marginBottom: 28 }}>{t.diagnostic.levelDesc[diagResult.level]}</p>
                <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                  <button className="btn-p" style={{ fontSize: 13 }} onClick={() => setActiveTab("plan")}>📋 {t.diagnostic.viewPlan}</button>
                  <button className="btn-p" style={{ fontSize: 13, background: "linear-gradient(135deg,#10B981,#059669)" }} onClick={() => setActiveTab("grants")}>💰 {t.diagnostic.viewGrants}</button>
                  <button className="btn-s" style={{ fontSize: 13 }} onClick={resetDiag}>↺ Recommencer</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ASSISTANT */}
        {activeTab === "assistant" && (
          <div className="fade-up">
            <div className="sec-head">
              <h2 className="sec-title">{t.assistant.title}</h2>
              <p className="sec-sub">{t.assistant.subtitle}</p>
            </div>
            <div style={{ maxWidth: 720, margin: "0 auto" }}>
              {/* Status */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, padding: "8px 14px", background: "#0D1526", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#10B981", boxShadow: "0 0 6px #10B981" }} />
                <span style={{ fontSize: 11.5, color: "#4B5A7A", fontWeight: 500 }}>
                  {lang === "fr" ? "Assistant IA · Spécialisé PME Gatineau-Ottawa · En ligne" : "AI Assistant · Specialized SME Gatineau-Ottawa · Online"}
                </span>
              </div>

              <div className="chat-box">
                {messages.map((m, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", alignItems: "flex-start", gap: 10 }}>
                    {m.role === "assistant" && <div className="ai-av">⚡</div>}
                    <div className={m.role === "user" ? "bub-u" : "bub-a"}
                      dangerouslySetInnerHTML={{ __html: renderMarkdown(m.content) }} />
                  </div>
                ))}
                {loading && (
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <div className="ai-av">⚡</div>
                    <div className="bub-a" style={{ padding: "14px 18px" }}>
                      <span className="tdot"/><span className="tdot"/><span className="tdot"/>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
                {t.assistant.suggestions.map((s) => (
                  <button key={s} className="sug-pill" onClick={() => sendMessage(s)}>{s}</button>
                ))}
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <input className="chat-in" value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                  placeholder={t.assistant.placeholder} />
                <button className="send-btn" onClick={() => sendMessage()} disabled={loading}>
                  {t.assistant.send} →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* GRANTS */}
        {activeTab === "grants" && (
          <div className="fade-up">
            <div className="sec-head">
              <h2 className="sec-title">{t.grants.title}</h2>
              <p className="sec-sub">{t.grants.subtitle}</p>
            </div>
            <div className="filter-row">
              {["all","quebec","federal"].map((f) => (
                <button key={f} className={`fpill${grantFilter === f ? " active" : ""}`} onClick={() => setGrantFilter(f)}>
                  {f === "all" ? t.grants.all : f === "quebec" ? `🔵 ${t.grants.quebec}` : `🔴 ${t.grants.federal}`}
                </button>
              ))}
            </div>
            <div className="grants-grid">
              {filteredGrants.map((g) => (
                <div key={g.name} className="grant-card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 15, lineHeight: 1.3, flex: 1 }}>{g.name}</h3>
                    <span style={{ marginLeft: 10, flexShrink: 0, padding: "3px 10px", borderRadius: 6, fontSize: 10, fontWeight: 700,
                      background: g.type === "quebec" ? "rgba(37,99,235,0.12)" : "rgba(239,68,68,0.1)",
                      color: g.type === "quebec" ? "#60A5FA" : "#FCA5A5",
                      border: `1px solid ${g.type === "quebec" ? "rgba(37,99,235,0.25)" : "rgba(239,68,68,0.2)"}` }}>
                      {g.type === "quebec" ? "QC" : "CA"}
                    </span>
                  </div>
                  <p style={{ color: "#4B5A7A", fontSize: 11.5, marginBottom: 14 }}>{g.org}</p>
                  <div style={{ background: "rgba(0,0,0,0.2)", borderRadius: 10, padding: "12px 14px", marginBottom: 14 }}>
                    <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 20, fontWeight: 700, color: "#10B981", letterSpacing: "-0.5px" }}>{g.amount}</div>
                    <div style={{ fontSize: 10.5, color: "#4B5A7A", marginTop: 2 }}>{g.coverage}</div>
                  </div>
                  <p style={{ color: "#8B97B4", fontSize: 12.5, lineHeight: 1.65, marginBottom: 14 }}>{g.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 16 }}>
                    {g.tags.map((tag) => <span key={tag} className="chip">{tag}</span>)}
                  </div>
                  <a href={g.url} target="_blank" rel="noopener noreferrer" className="grant-lnk">{t.grants.apply} →</a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PLAN */}
        {activeTab === "plan" && (
          <div className="fade-up">
            <div className="sec-head">
              <h2 className="sec-title">{t.plan.title}</h2>
              <p className="sec-sub">{t.plan.subtitle}</p>
            </div>
            <div style={{ maxWidth: 700, margin: "0 auto" }}>
              {t.plan.phases.map((ph) => (
                <div key={ph.phase} className="phase-block" style={{ borderLeftColor: ph.color }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                    <span style={{ fontSize: 26 }}>{ph.icon}</span>
                    <div>
                      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: ph.color }}>{ph.phase}</span>
                        <span style={{ fontSize: 10.5, color: "#4B5A7A", background: "rgba(255,255,255,0.04)", padding: "2px 8px", borderRadius: 4 }}>{ph.period}</span>
                      </div>
                      <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 16, fontWeight: 600, marginTop: 3 }}>{ph.title}</div>
                    </div>
                  </div>
                  {ph.actions.map((a) => (
                    <div key={a} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: "#8B97B4", padding: "4px 0" }}>
                      <span style={{ color: ph.color, flexShrink: 0, marginTop: 1 }}>✓</span>
                      <span>{a}</span>
                    </div>
                  ))}
                </div>
              ))}
              <div className="impact-grid">
                {t.plan.impacts.map((imp) => (
                  <div key={imp.label} className="impact-card">
                    <div style={{ fontSize: 26 }}>{imp.icon}</div>
                    <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 24, fontWeight: 700, color: "#4F8EF7", letterSpacing: "-0.5px", margin: "10px 0 4px" }}>{imp.value}</div>
                    <div style={{ fontSize: 10.5, color: "#4B5A7A" }}>{imp.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* LEGAL / PRIVACY PAGE */}
        {activeTab === "legal" && (
          <div className="fade-up legal-wrap">
            <button className="legal-back" onClick={() => setActiveTab("home")}>
              {t.legal.back}
            </button>
            <h1 className="legal-title">{t.legal.title}</h1>
            <p className="legal-date">{t.legal.lastUpdate}</p>
            {t.legal.sections.map((s, i) => (
              <div key={i} className="legal-section">
                <h3 className="legal-h">{s.h}</h3>
                <p className="legal-p">{s.p}</p>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="logo-mark" style={{ width: 32, height: 32 }}>
                <div className="logo-bars">
                  {[5, 8, 11, 7].map((h, i) => <div key={i} className="logo-bar" style={{ height: h, width: 3 }} />)}
                </div>
              </div>
              <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 16, color: "#E8EBF4" }}>NuMérik PME</span>
            </div>
            <p className="footer-tag">
              {lang === "fr"
                ? "Plateforme bilingue d'accélération numérique pour les PME de la région Gatineau-Ottawa."
                : "Bilingual digital acceleration platform for SMEs in the Gatineau-Ottawa region."}
            </p>
            <div className="footer-social">
              <a href="mailto:contact@numerikpme.ca" className="footer-icon" title="Email">✉️</a>
            </div>
          </div>

          <div className="footer-col">
            <h4>{lang === "fr" ? "Produit" : "Product"}</h4>
            <ul>
              <li><a onClick={() => setActiveTab("diagnostic")}>{t.nav.diagnostic}</a></li>
              <li><a onClick={() => setActiveTab("assistant")}>{t.nav.assistant}</a></li>
              <li><a onClick={() => setActiveTab("grants")}>{t.nav.subventions}</a></li>
              <li><a onClick={() => setActiveTab("plan")}>{t.nav.plan}</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>{lang === "fr" ? "Ressources" : "Resources"}</h4>
            <ul>
              <li><a href="https://quebec.ca/plan-pme" target="_blank" rel="noopener noreferrer">Plan PME 2025-2028</a></li>
              <li><a href="https://futurpreneur.ca" target="_blank" rel="noopener noreferrer">Futurpreneur Canada</a></li>
              <li><a href="https://bdc.ca" target="_blank" rel="noopener noreferrer">BDC</a></li>
              <li><a href="https://cldgatineau.com" target="_blank" rel="noopener noreferrer">CLD Gatineau</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>{lang === "fr" ? "Contact" : "Contact"}</h4>
            <div className="footer-contact">
              <strong>contact@numerikpme.ca</strong><br />
              Gatineau, QC<br />
              Outaouais, Canada<br /><br />
              <strong>{lang === "fr" ? "Service" : "Service"}:</strong><br />
              {lang === "fr" ? "Lun-Ven · 9h-17h" : "Mon-Fri · 9am-5pm"}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copy">
            © 2026 NuMérik PME. {lang === "fr" ? "Tous droits réservés." : "All rights reserved."}
          </div>
          <div className="footer-legal">
            <a onClick={() => setActiveTab("legal")}>{lang === "fr" ? "Confidentialité" : "Privacy"}</a>
            <span style={{ color: "#4F8EF7" }}>🇨🇦 {lang === "fr" ? "Fait au Canada" : "Made in Canada"}</span>
          </div>
        </div>
      </footer>

      {/* Vercel Analytics */}
      <Analytics />
    </div>
  );
}
