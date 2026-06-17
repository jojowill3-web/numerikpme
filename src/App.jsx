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
    mission: {
      label: "Notre Mission",
      title: "Démocratiser la transformation numérique des PME de Gatineau-Ottawa.",
      point1pre: "", point1bold: "5 minutes", point1post: " pour diagnostiquer.",
      point2pre: "", point2bold: "275 000 $", point2post: " de subventions à identifier.",
      point3pre: "", point3bold: "Un plan", point3post: " d'action concret sur 12 mois.",
      tagline: "Bilingue · Local · Intelligent",
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
        { q: "Quel est votre projet prioritaire pour les 12 prochains mois?", options: ["Créer ou refaire mon site web","Lancer une boutique en ligne (e-commerce)","Implanter un ERP/CRM","Automatiser mes processus","Intégrer l'intelligence artificielle","Améliorer ma cybersécurité","Démarrer mon entreprise","Moderniser ma production (manufacturier)"] },
      ],
      estimationTitle: "Financement potentiel identifié",
      estimationSub: "Selon votre profil et votre projet, voici une estimation du financement auquel vous pourriez être admissible.",
      estimationUpTo: "Jusqu'à",
      estimationFoot: "Montant indicatif basé sur les programmes correspondant à votre profil. Le montant final dépend de votre admissibilité et de votre projet.",
      estimationPrograms: "programmes correspondent à votre profil",
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
    inscription: {
      title: "Recevez votre rapport personnalisé",
      subtitle: "Recevez par email votre diagnostic complet, les subventions adaptées à votre profil et votre plan d'action sur 12 mois.",
      email: "Votre email professionnel",
      nom: "Votre nom",
      entreprise: "Nom de votre entreprise (optionnel)",
      submit: "Recevoir mon rapport",
      submitting: "Envoi en cours...",
      success: "✅ Inscription réussie ! Vous recevrez votre rapport sous peu.",
      error: "❌ Une erreur est survenue. Veuillez réessayer.",
      privacy: "Vos données sont protégées (Loi 25). Aucun spam, désinscription en 1 clic.",
      benefits: ["📊 Rapport PDF personnalisé", "💰 Subventions adaptées à votre profil", "📋 Plan d'action 12 mois", "🤖 Conseils IA prioritaires"],
      skip: "Continuer sans inscription",
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
      supportLabel: "Type d'aide:",
      supportTypes: { subvention: "Subvention", pret: "Prêt", credit: "Crédit d'impôt" },
      statusOpen: "Ouvert en continu", statusDeadline: "Échéance", statusSoon: "Bientôt fermé",
      programs: [
        { name: "Offensive Tr@ns Num", org: "ADRIQ – Gouvernement du Québec", amount: "Jusqu'à 25 000$", coverage: "50% des coûts", type: "quebec", support: "subvention", amountMax: 25000, deadline: null, needs: ["erp","cyber","automation","web"], tags: ["ERP","CRM","Automatisation","Cybersécurité"], desc: "Accompagnement complet dans votre virage numérique: diagnostic, implantation et formation.", url: "https://adriq.com" },
        { name: "Programme ESSOR", org: "Investissement Québec", amount: "Jusqu'à 50 000$", coverage: "50% des coûts", type: "quebec", support: "subvention", amountMax: 50000, deadline: "2027-03-31", needs: ["web","ia","rd","ecommerce","manuf"], tags: ["Étude faisabilité","Plan numérique","Innovation"], desc: "Financement pour études préalables et plans d'investissement numérique.", url: "https://investquebec.com" },
        { name: "CRIC – Crédit Impôt R&D", org: "Gouvernement du Québec", amount: "Variable (remboursable)", coverage: "Crédits sur dépenses R&D", type: "quebec", support: "credit", amountMax: null, deadline: null, needs: ["rd","ia"], tags: ["R&D","Innovation","IA","Commercialisation"], desc: "Nouveau programme 2025-2026 remplaçant 8 anciens crédits d'impôt. Applicable dès 2026.", url: "https://revenuquebec.ca" },
        { name: "Plan PME 2025-2028", org: "Réseau Accès PME – Québec", amount: "Enveloppe de 500M$", coverage: "Accompagnement + financement", type: "quebec", support: "subvention", amountMax: null, deadline: null, needs: ["demarrage","erp","web"], tags: ["Démarrage","Croissance","Relève","Numérique"], desc: "Accompagnement personnalisé par 500+ professionnels partout au Québec.", url: "https://quebec.ca" },
        { name: "BDC – Prêt Technologie", org: "Banque de Développement du Canada", amount: "Prêt à 0% intérêt", coverage: "90% du plan numérique", type: "federal", support: "pret", amountMax: 15000, deadline: null, needs: ["web","erp","ecommerce"], tags: ["Prêt 0%","Plan numérique","Conseiller"], desc: "Subvention jusqu'à 15 000$ pour un conseiller numérique + prêt sans intérêt pour l'acquisition.", url: "https://bdc.ca" },
        { name: "SIPEM – PROMPT", org: "PROMPT – Gouvernement fédéral", amount: "Jusqu'à 200 000$", coverage: "50% des honoraires", type: "federal", support: "subvention", amountMax: 200000, deadline: null, needs: ["manuf","ia","automation"], tags: ["Manufacturier","4.0","Robotique","IA"], desc: "Programme spécial pour PME manufacturières. Volet 1: 10 000$, Volet 2: jusqu'à 200 000$.", url: "https://promptinnovation.ca" },
        { name: "PARI – CNRC", org: "Conseil National de Recherches Canada", amount: "Variable", coverage: "Financement + conseils experts", type: "federal", support: "subvention", amountMax: null, deadline: null, needs: ["rd","ia"], tags: ["Innovation","R&D","Technologie","Conseil"], desc: "Programme fédéral avec conseillers en technologie industrielle et financement R&D.", url: "https://nrc-cnrc.gc.ca" },
        { name: "Futurpreneur Canada", org: "Futurpreneur – Gouvernement fédéral", amount: "Prêt jusqu'à 60 000$", coverage: "Prêt + mentorat 2 ans", type: "federal", support: "pret", amountMax: 60000, deadline: null, needs: ["demarrage","web","ecommerce"], tags: ["Démarrage","18-39 ans","Mentorat"], desc: "Financement et mentorat pour les entrepreneurs de 18 à 39 ans qui démarrent ou rachètent une entreprise.", url: "https://futurpreneur.ca" },
        { name: "MicroEntreprendre", org: "Réseau MicroEntreprendre – Québec", amount: "Microcrédit jusqu'à 50 000$", coverage: "Prêt + accompagnement", type: "quebec", support: "pret", amountMax: 50000, deadline: null, needs: ["demarrage","web"], tags: ["Microcrédit","Démarrage","Accompagnement"], desc: "Microcrédit et accompagnement pour les entrepreneurs ayant un accès limité au financement traditionnel.", url: "https://microentreprendre.ca" },
      ],
    },
    plan: {
      title: "Plan d'Action Personnalisé", subtitle: "Votre feuille de route numérique sur 12 mois",
      phases: [
        { phase: "Phase 1", period: "Mois 1–2", title: "Diagnostic & Planification", color: "#635BFF", icon: "🔍", actions: ["Contacter le Réseau Accès PME (gratuit)","Réaliser un diagnostic numérique complet","Identifier vos priorités technologiques","Cartographier vos processus actuels"] },
        { phase: "Phase 2", period: "Mois 3–4", title: "Demandes de Subventions", color: "#635BFF", icon: "💰", actions: ["Appliquer au programme ESSOR (plan numérique)","S'inscrire à l'Offensive Tr@ns Num","Contacter BDC pour prêt à 0%","Consulter un conseiller PARI-CNRC"] },
        { phase: "Phase 3", period: "Mois 5–8", title: "Implantation Technologique", color: "#635BFF", icon: "⚡", actions: ["Choisir et implanter ERP/CRM adapté","Migrer vers l'infonuagique (Cloud)","Former vos employés aux nouveaux outils","Automatiser 3 processus répétitifs"] },
        { phase: "Phase 4", period: "Mois 9–12", title: "IA & Optimisation", color: "#635BFF", icon: "🤖", actions: ["Intégrer des outils IA dans vos opérations","Mesurer le ROI de vos investissements","Réclamer crédits CRIC dans déclaration 2026","Planifier la phase d'expansion"] },
      ],
      impact: "Impact attendu",
      impacts: [{ label: "Hausse productivité", value: "+22%", icon: "📈" },{ label: "Prime de valorisation", value: "+30%", icon: "💎" },{ label: "Réduction coûts opérationnels", value: "-15%", icon: "💰" },{ label: "Temps économisé / semaine", value: "8h", icon: "⏱️" }],
    },
    howItWorks: {
      label: "Comment ça marche",
      title: "Votre transformation numérique en 3 étapes simples",
      subtitle: "Aucune expertise technique requise. En quelques minutes, vous savez exactement par où commencer.",
      steps: [
        { icon: "🔍", title: "1. Faites le diagnostic", desc: "Répondez à 7 questions en 5 minutes. Notre IA évalue la maturité numérique de votre PME." },
        { icon: "🎯", title: "2. Recevez vos recommandations", desc: "Forces, faiblesses, priorités et subventions gouvernementales adaptées à votre profil." },
        { icon: "🚀", title: "3. Passez à l'action", desc: "Suivez votre plan personnalisé sur 12 mois, épaulé par l'assistant IA disponible 24/7." },
      ],
      cta: "Commencer maintenant",
    },
    why: {
      label: "Pourquoi NuMérik PME",
      title: "Conçu pour les PME d'ici",
      items: [
        { icon: "📍", title: "100 % local", desc: "Pensé pour la réalité des PME de Gatineau, d'Ottawa et de l'Outaouais." },
        { icon: "🇨🇦", title: "Bilingue", desc: "Une expérience complète en français et en anglais, comme votre région." },
        { icon: "🔒", title: "Conforme Loi 25", desc: "Vos données sont protégées et ne sont jamais vendues à des tiers." },
        { icon: "⚡", title: "Propulsé par l'IA", desc: "Des analyses et recommandations générées par l'IA Claude d'Anthropic." },
        { icon: "🏛️", title: "Programmes officiels", desc: "Basé sur les vrais programmes BDC, ESSOR, ADRIQ, IRAP-CNRC et PROMPT." },
        { icon: "🎁", title: "Diagnostic gratuit", desc: "Aucun frais, aucun engagement pour évaluer votre maturité numérique." },
      ],
    },
    faq: {
      label: "Questions fréquentes",
      title: "Vos questions, nos réponses",
      items: [
        { q: "Le diagnostic numérique est-il vraiment gratuit ?", a: "Oui, entièrement gratuit et sans engagement. En 5 minutes, vous obtenez un score, vos forces et faiblesses, des priorités et les subventions adaptées à votre PME." },
        { q: "Quelles subventions sont disponibles pour ma PME à Gatineau ou Ottawa ?", a: "Plusieurs programmes québécois et fédéraux sont actifs en 2026 : Offensive Tr@ns Num, ESSOR, crédit d'impôt CRIC, Plan PME 2025-2028, prêt technologie BDC à 0 %, SIPEM-PROMPT et PARI-CNRC. Nous identifions ceux qui correspondent à votre profil." },
        { q: "Combien de temps prend le diagnostic ?", a: "Environ 5 minutes. Sept questions sur votre secteur, votre taille, vos outils et votre budget suffisent à générer un rapport personnalisé par IA." },
        { q: "Pour quelles entreprises NuMérik PME est-il conçu ?", a: "Pour les PME de la région de Gatineau, d'Ottawa et de l'Outaouais, dans tous les secteurs : commerce, services, manufacturier, construction, restauration, technologie et santé." },
        { q: "Mes données sont-elles protégées ?", a: "Oui. Nous respectons la Loi 25 du Québec et la LPRPDE du Canada. Vos données ne sont jamais vendues et servent uniquement à générer votre diagnostic et vos recommandations." },
      ],
    },
    finalCta: {
      title: "Prêt à propulser votre PME ?",
      subtitle: "Obtenez gratuitement votre diagnostic numérique et découvrez les subventions auxquelles vous avez droit.",
      cta: "Faire mon diagnostic gratuit",
      cta2: "Nous contacter",
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
    appTitle: "NuMérik PME", appSubtitle: "Your AI assistant for digital transformation", region: "Gatineau · Ottawa",
    nav: { diagnostic: "Assessment", assistant: "AI Assistant", subventions: "Grants", plan: "Action Plan" },
    hero: { title: "Power your SME\ninto the digital age", subtitle: "Smart Diagnostic · Government Grants · Personalized Action Plan · 24/7 AI Assistant", cta: "Start Diagnostic", cta2: "Talk to Assistant", badge: "Gatineau · Ottawa · 2026" },
    mission: {
      label: "Our Mission",
      title: "Democratizing the digital transformation of SMEs in Gatineau-Ottawa.",
      point1pre: "", point1bold: "5 minutes", point1post: " to diagnose.",
      point2pre: "", point2bold: "$275,000", point2post: " in grants to identify.",
      point3pre: "", point3bold: "A concrete plan", point3post: " over 12 months.",
      tagline: "Bilingual · Local · Intelligent",
    },
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
        { q: "What is your priority project for the next 12 months?", options: ["Create or rebuild my website","Launch an online store (e-commerce)","Implement an ERP/CRM","Automate my processes","Integrate artificial intelligence","Improve my cybersecurity","Start my business","Modernize my production (manufacturing)"] },
      ],
      estimationTitle: "Potential funding identified",
      estimationSub: "Based on your profile and project, here is an estimate of the funding you could be eligible for.",
      estimationUpTo: "Up to",
      estimationFoot: "Indicative amount based on the programs matching your profile. The final amount depends on your eligibility and your project.",
      estimationPrograms: "programs match your profile",
      resultTitle: "Your digital maturity score",
      levels: ["Beginner","Developing","Intermediate","Advanced"],
      levelDesc: ["Your business has great digital growth potential. Significant grants are available to help you get started.","You've laid the groundwork. It's time to accelerate with more powerful tools and automations.","Good progress! Focus on AI and system integration to maximize your productivity.","You're a digital leader! Explore emerging technologies (generative AI, autonomous agents) to maintain your edge."],
      viewPlan: "See my action plan", viewGrants: "See my grants",
    },
    inscription: {
      title: "Get your personalized report",
      subtitle: "Receive by email your complete diagnostic, grants adapted to your profile and your 12-month action plan.",
      email: "Your business email",
      nom: "Your name",
      entreprise: "Your company name (optional)",
      submit: "Get my report",
      submitting: "Sending...",
      success: "✅ Registration successful! You will receive your report shortly.",
      error: "❌ An error occurred. Please try again.",
      privacy: "Your data is protected (Law 25). No spam, 1-click unsubscribe.",
      benefits: ["📊 Personalized PDF report", "💰 Grants adapted to your profile", "📋 12-month action plan", "🤖 Priority AI advice"],
      skip: "Continue without registration",
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
      supportLabel: "Support type:",
      supportTypes: { subvention: "Grant", pret: "Loan", credit: "Tax credit" },
      statusOpen: "Open (rolling)", statusDeadline: "Deadline", statusSoon: "Closing soon",
      programs: [
        { name: "Offensive Tr@ns Num", org: "ADRIQ – Government of Québec", amount: "Up to $25,000", coverage: "50% of costs", type: "quebec", support: "subvention", amountMax: 25000, deadline: null, needs: ["erp","cyber","automation","web"], tags: ["ERP","CRM","Automation","Cybersecurity"], desc: "Complete support in your digital transformation: diagnostic, implementation and training.", url: "https://adriq.com" },
        { name: "ESSOR Program", org: "Investissement Québec", amount: "Up to $50,000", coverage: "50% of costs", type: "quebec", support: "subvention", amountMax: 50000, deadline: "2027-03-31", needs: ["web","ia","rd","ecommerce","manuf"], tags: ["Feasibility Study","Digital Plan","Innovation"], desc: "Funding for preliminary studies and digital investment plans.", url: "https://investquebec.com" },
        { name: "CRIC – R&D Tax Credit", org: "Government of Québec", amount: "Variable (refundable)", coverage: "Credits on R&D expenses", type: "quebec", support: "credit", amountMax: null, deadline: null, needs: ["rd","ia"], tags: ["R&D","Innovation","AI","Commercialization"], desc: "New 2025-2026 program replacing 8 old tax credits. Applicable from 2026.", url: "https://revenuquebec.ca" },
        { name: "SME Plan 2025-2028", org: "Réseau Accès PME – Québec", amount: "$500M envelope", coverage: "Guidance + funding", type: "quebec", support: "subvention", amountMax: null, deadline: null, needs: ["demarrage","erp","web"], tags: ["Startup","Growth","Succession","Digital"], desc: "Personalized support by 500+ professionals across Québec.", url: "https://quebec.ca" },
        { name: "BDC – Technology Loan", org: "Business Development Bank of Canada", amount: "0% interest loan", coverage: "90% of digital plan", type: "federal", support: "pret", amountMax: 15000, deadline: null, needs: ["web","erp","ecommerce"], tags: ["0% Loan","Digital Plan","Advisor"], desc: "Grant up to $15,000 for a digital advisor + interest-free loan for acquisition.", url: "https://bdc.ca" },
        { name: "SIPEM – PROMPT", org: "PROMPT – Federal Government", amount: "Up to $200,000", coverage: "50% of fees", type: "federal", support: "subvention", amountMax: 200000, deadline: null, needs: ["manuf","ia","automation"], tags: ["Manufacturing","4.0","Robotics","AI"], desc: "Special program for manufacturing SMEs. Stream 1: $10,000, Stream 2: up to $200,000.", url: "https://promptinnovation.ca" },
        { name: "IRAP – NRC", org: "National Research Council Canada", amount: "Variable", coverage: "Funding + expert advice", type: "federal", support: "subvention", amountMax: null, deadline: null, needs: ["rd","ia"], tags: ["Innovation","R&D","Technology","Advisory"], desc: "Federal program with industrial technology advisors and R&D funding.", url: "https://nrc-cnrc.gc.ca" },
        { name: "Futurpreneur Canada", org: "Futurpreneur – Federal Government", amount: "Loan up to $60,000", coverage: "Loan + 2-year mentorship", type: "federal", support: "pret", amountMax: 60000, deadline: null, needs: ["demarrage","web","ecommerce"], tags: ["Startup","Ages 18-39","Mentorship"], desc: "Funding and mentorship for entrepreneurs aged 18 to 39 starting or buying a business.", url: "https://futurpreneur.ca" },
        { name: "MicroEntreprendre", org: "Réseau MicroEntreprendre – Québec", amount: "Microloan up to $50,000", coverage: "Loan + guidance", type: "quebec", support: "pret", amountMax: 50000, deadline: null, needs: ["demarrage","web"], tags: ["Microloan","Startup","Guidance"], desc: "Microcredit and guidance for entrepreneurs with limited access to traditional financing.", url: "https://microentreprendre.ca" },
      ],
    },
    plan: {
      title: "Personalized Action Plan", subtitle: "Your 12-month digital roadmap",
      phases: [
        { phase: "Phase 1", period: "Month 1–2", title: "Diagnostic & Planning", color: "#635BFF", icon: "🔍", actions: ["Contact Réseau Accès PME (free)","Complete a full digital diagnostic","Identify your technology priorities","Map your current processes"] },
        { phase: "Phase 2", period: "Month 3–4", title: "Grant Applications", color: "#635BFF", icon: "💰", actions: ["Apply to ESSOR program (digital plan)","Register for Offensive Tr@ns Num","Contact BDC for 0% loan","Consult a IRAP-NRC advisor"] },
        { phase: "Phase 3", period: "Month 5–8", title: "Technology Implementation", color: "#635BFF", icon: "⚡", actions: ["Choose and implement adapted ERP/CRM","Migrate to cloud infrastructure","Train employees on new tools","Automate 3 repetitive processes"] },
        { phase: "Phase 4", period: "Month 9–12", title: "AI & Optimization", color: "#635BFF", icon: "🤖", actions: ["Integrate AI tools in your operations","Measure ROI of your investments","Claim CRIC credits in 2026 return","Plan expansion phase"] },
      ],
      impact: "Expected Impact",
      impacts: [{ label: "Productivity increase", value: "+22%", icon: "📈" },{ label: "Valuation premium", value: "+30%", icon: "💎" },{ label: "Operating cost reduction", value: "-15%", icon: "💰" },{ label: "Time saved / week", value: "8h", icon: "⏱️" }],
    },
    howItWorks: {
      label: "How it works",
      title: "Your digital transformation in 3 simple steps",
      subtitle: "No technical expertise required. In minutes, you know exactly where to start.",
      steps: [
        { icon: "🔍", title: "1. Take the diagnostic", desc: "Answer 7 questions in 5 minutes. Our AI assesses your SME's digital maturity." },
        { icon: "🎯", title: "2. Get your recommendations", desc: "Strengths, weaknesses, priorities and government grants matched to your profile." },
        { icon: "🚀", title: "3. Take action", desc: "Follow your personalized 12-month plan, backed by the 24/7 AI assistant." },
      ],
      cta: "Start now",
    },
    why: {
      label: "Why NuMérik PME",
      title: "Built for local SMEs",
      items: [
        { icon: "📍", title: "100% local", desc: "Designed for the reality of SMEs in Gatineau, Ottawa and the Outaouais." },
        { icon: "🇨🇦", title: "Bilingual", desc: "A full experience in French and English, just like your region." },
        { icon: "🔒", title: "Law 25 compliant", desc: "Your data is protected and never sold to third parties." },
        { icon: "⚡", title: "AI-powered", desc: "Analysis and recommendations generated by Anthropic's Claude AI." },
        { icon: "🏛️", title: "Official programs", desc: "Based on the real BDC, ESSOR, ADRIQ, IRAP-NRC and PROMPT programs." },
        { icon: "🎁", title: "Free diagnostic", desc: "No cost, no commitment to assess your digital maturity." },
      ],
    },
    faq: {
      label: "Frequently asked questions",
      title: "Your questions, answered",
      items: [
        { q: "Is the digital diagnostic really free?", a: "Yes, completely free and with no commitment. In 5 minutes you get a score, your strengths and weaknesses, priorities and the grants matched to your SME." },
        { q: "What grants are available for my SME in Gatineau or Ottawa?", a: "Several Quebec and federal programs are active in 2026: Offensive Tr@ns Num, ESSOR, CRIC tax credit, SME Plan 2025-2028, BDC 0% technology loan, SIPEM-PROMPT and IRAP-NRC. We identify the ones that fit your profile." },
        { q: "How long does the diagnostic take?", a: "About 5 minutes. Seven questions about your sector, size, tools and budget are enough to generate an AI-personalized report." },
        { q: "Who is NuMérik PME designed for?", a: "For SMEs in the Gatineau, Ottawa and Outaouais region, across all sectors: retail, services, manufacturing, construction, food, technology and healthcare." },
        { q: "Is my data protected?", a: "Yes. We comply with Quebec's Law 25 and Canada's PIPEDA. Your data is never sold and is used only to generate your diagnostic and recommendations." },
      ],
    },
    finalCta: {
      title: "Ready to power up your SME?",
      subtitle: "Get your digital diagnostic for free and discover the grants you're entitled to.",
      cta: "Get my free diagnostic",
      cta2: "Contact us",
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

export default function App() {
  const [lang, setLang] = useState("fr");
  const [activeTab, setActiveTab] = useState("home");
  const [diagStep, setDiagStep] = useState(0);
  const [diagAnswers, setDiagAnswers] = useState([]);
  const [diagResult, setDiagResult] = useState(null);
  const [diagAnalyzing, setDiagAnalyzing] = useState(false);
  const [messages, setMessages] = useState(() => [{ role: "assistant", content: translations.fr.assistant.welcome }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [grantFilter, setGrantFilter] = useState("all");
  const [supportFilter, setSupportFilter] = useState("all");
  const [openFaq, setOpenFaq] = useState(0);
  const [showInscription, setShowInscription] = useState(false);
  const [inscEmail, setInscEmail] = useState("");
  const [inscNom, setInscNom] = useState("");
  const [inscEntreprise, setInscEntreprise] = useState("");
  const [inscLoading, setInscLoading] = useState(false);
  const [inscStatus, setInscStatus] = useState(null); // null | "success" | "error"
  const [showContact, setShowContact] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactStatus, setContactStatus] = useState(null);
  const [contactLoading, setContactLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const langMountRef = useRef(false);
  const t = translations[lang];

  // Reyajiste mesaj akèy la sèlman lè lang lan chanje (pa nan premye rann nan —
  // mesaj inisyal la deja mete via useState lazy init pou evite yon flash vid).
  useEffect(() => {
    if (!langMountRef.current) { langMountRef.current = true; return; }
    setMessages([{ role: "assistant", content: t.assistant.welcome }]);
  }, [lang, t.assistant.welcome]);

  // Sync <html lang> ak lang aktyèl (a11y + SEO)
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang === "fr" ? "fr-CA" : "en-CA";
    }
  }, [lang]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const switchLang = () => setLang(lang === "fr" ? "en" : "fr");

  // Fallback local scoring (si AI echwe)
  const computeLocalResult = (answers) => {
    // La dernière question (« projet prioritaire ») est un choix, pas une échelle
    // de maturité : on l'exclut du score ordinal.
    const scored = t.diagnostic.questions.slice(0, t.diagnostic.questions.length - 1);
    const score = scored.reduce((acc, q, i) => acc + q.options.indexOf(answers[i]), 0);
    const max = scored.reduce((acc, q) => acc + q.options.length - 1, 0);
    const pct = Math.round((score / max) * 100);
    return { score: pct, level: pct < 25 ? 0 : pct < 50 ? 1 : pct < 75 ? 2 : 3, ai: false };
  };

  // Analiz AI pèsonalize via /api/chat
  const analyzeWithAI = async (answers) => {
    const isEN = lang === "en";
    const qa = answers.map((a, i) => `${i + 1}. ${t.diagnostic.questions[i].q} → ${a}`).join("\n");

    const prompt = isEN
      ? `You are an expert digital maturity consultant for SMEs in Quebec-Canada (Gatineau-Ottawa region).

Here is a completed digital diagnostic:
${qa}

Analyze these responses and return ONLY a valid JSON object (no markdown fences, no explanation text, just the JSON):
{
  "score": <integer 0-100 reflecting true digital maturity>,
  "summary": "<2-3 sentences personalized to their sector and size>",
  "strengths": ["<short bullet>", "<short bullet>", "<short bullet>"],
  "weaknesses": ["<short bullet>", "<short bullet>", "<short bullet>"],
  "priorities": [
    {"title": "<short title>", "description": "<1-2 sentence actionable description tailored to their sector>", "impact": "high|medium|low"},
    {"title": "<short title>", "description": "<...>", "impact": "high|medium|low"},
    {"title": "<short title>", "description": "<...>", "impact": "high|medium|low"}
  ],
  "recommended_grants": ["<grant name 1>", "<grant name 2>", "<grant name 3>"],
  "next_action": "<one specific actionable next step they should take this week>",
  "action_plan": [
    {"phase": "Phase 1", "period": "Months 1-2", "title": "<phase title adapted to their context>", "icon": "🔍", "actions": ["<specific action 1>", "<specific action 2>", "<specific action 3>", "<specific action 4>"]},
    {"phase": "Phase 2", "period": "Months 3-4", "title": "<phase title>", "icon": "💰", "actions": ["<specific action 1>", "<specific action 2>", "<specific action 3>", "<specific action 4>"]},
    {"phase": "Phase 3", "period": "Months 5-8", "title": "<phase title>", "icon": "⚡", "actions": ["<specific action 1>", "<specific action 2>", "<specific action 3>", "<specific action 4>"]},
    {"phase": "Phase 4", "period": "Months 9-12", "title": "<phase title>", "icon": "🤖", "actions": ["<specific action 1>", "<specific action 2>", "<specific action 3>", "<specific action 4>"]}
  ]
}

Available grant programs to recommend from: Offensive Tr@ns Num, Programme ESSOR, CRIC, Plan PME 2025-2028, BDC - Prêt Technologie, SIPEM-PROMPT (manufacturing), PARI-CNRC.

For the action_plan: each phase's actions MUST be specific to their sector, employee count, current tools, and budget level. Avoid generic advice. Reference real tools (e.g., "Implement Shopify for X" not "Implement an e-commerce platform"). Reference real grant programs by name when relevant. Reference their actual budget level for feasibility.

All text in English. Be specific to their actual responses — no generic advice.`
      : `Tu es un consultant expert en maturité numérique pour les PME du Québec-Canada (région Gatineau-Ottawa).

Voici un diagnostic numérique complété :
${qa}

Analyse ces réponses et retourne UNIQUEMENT un objet JSON valide (sans balises markdown, sans texte explicatif, juste le JSON) :
{
  "score": <entier 0-100 reflétant la vraie maturité numérique>,
  "summary": "<2-3 phrases personnalisées selon leur secteur et taille>",
  "strengths": ["<point court>", "<point court>", "<point court>"],
  "weaknesses": ["<point court>", "<point court>", "<point court>"],
  "priorities": [
    {"title": "<titre court>", "description": "<1-2 phrases d'action concrète adaptées à leur secteur>", "impact": "high|medium|low"},
    {"title": "<titre court>", "description": "<...>", "impact": "high|medium|low"},
    {"title": "<titre court>", "description": "<...>", "impact": "high|medium|low"}
  ],
  "recommended_grants": ["<nom subvention 1>", "<nom subvention 2>", "<nom subvention 3>"],
  "next_action": "<une étape concrète et spécifique à faire cette semaine>",
  "action_plan": [
    {"phase": "Phase 1", "period": "Mois 1-2", "title": "<titre adapté à leur contexte>", "icon": "🔍", "actions": ["<action spécifique 1>", "<action spécifique 2>", "<action spécifique 3>", "<action spécifique 4>"]},
    {"phase": "Phase 2", "period": "Mois 3-4", "title": "<titre>", "icon": "💰", "actions": ["<action spécifique 1>", "<action spécifique 2>", "<action spécifique 3>", "<action spécifique 4>"]},
    {"phase": "Phase 3", "period": "Mois 5-8", "title": "<titre>", "icon": "⚡", "actions": ["<action spécifique 1>", "<action spécifique 2>", "<action spécifique 3>", "<action spécifique 4>"]},
    {"phase": "Phase 4", "period": "Mois 9-12", "title": "<titre>", "icon": "🤖", "actions": ["<action spécifique 1>", "<action spécifique 2>", "<action spécifique 3>", "<action spécifique 4>"]}
  ]
}

Programmes de subvention disponibles à recommander : Offensive Tr@ns Num, Programme ESSOR, CRIC, Plan PME 2025-2028, BDC - Prêt Technologie, SIPEM-PROMPT (manufacturier), PARI-CNRC.

Pour action_plan : chaque action DOIT être spécifique à leur secteur, nombre d'employés, outils actuels et budget. Évite les conseils génériques. Réfère-toi à de vrais outils (ex: "Implanter Shopify pour X" pas "Implanter une plateforme e-commerce"). Cite les vrais programmes de subvention par nom quand pertinent. Tiens compte de leur niveau de budget réel pour la faisabilité.

Tout le texte en français. Sois spécifique aux réponses données — pas de conseils génériques.`;

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [{ role: "user", content: prompt }] }),
    });
    if (!res.ok) throw new Error("API non disponible");
    const data = await res.json();
    const reply = data.reply || "";
    // Extract JSON object (Claude may add surrounding text despite instructions)
    const match = reply.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("JSON introuvable");
    const parsed = JSON.parse(match[0]);
    const score = Math.min(100, Math.max(0, parseInt(parsed.score, 10) || 0));
    const level = score < 25 ? 0 : score < 50 ? 1 : score < 75 ? 2 : 3;
    // Normalize action_plan (4 phases with title, period, icon, actions)
    let actionPlan = [];
    if (Array.isArray(parsed.action_plan)) {
      actionPlan = parsed.action_plan.slice(0, 4).map((p, i) => ({
        phase: p.phase || `Phase ${i + 1}`,
        period: p.period || "",
        title: p.title || "",
        icon: p.icon || ["🔍", "💰", "⚡", "🤖"][i] || "📌",
        color: "#635BFF",
        actions: Array.isArray(p.actions) ? p.actions.slice(0, 6) : [],
      }));
    }

    return {
      score,
      level,
      ai: true,
      summary: parsed.summary || "",
      strengths: Array.isArray(parsed.strengths) ? parsed.strengths.slice(0, 5) : [],
      weaknesses: Array.isArray(parsed.weaknesses) ? parsed.weaknesses.slice(0, 5) : [],
      priorities: Array.isArray(parsed.priorities) ? parsed.priorities.slice(0, 5) : [],
      recommended_grants: Array.isArray(parsed.recommended_grants) ? parsed.recommended_grants : [],
      next_action: parsed.next_action || "",
      action_plan: actionPlan,
    };
  };

  const handleDiagAnswer = async (answer) => {
    const newAnswers = [...diagAnswers, answer];
    setDiagAnswers(newAnswers);
    if (diagStep < t.diagnostic.questions.length - 1) {
      setDiagStep(diagStep + 1);
      return;
    }
    // Dènye repons — lanse analiz AI
    setDiagAnalyzing(true);
    try {
      const aiResult = await analyzeWithAI(newAnswers);
      setDiagResult(aiResult);
    } catch {
      // Fallback: scoring local si AI echwe
      setDiagResult(computeLocalResult(newAnswers));
    } finally {
      setDiagAnalyzing(false);
    }
  };

  const resetDiag = () => { setDiagStep(0); setDiagAnswers([]); setDiagResult(null); setDiagAnalyzing(false); };

  const submitContact = async () => {
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
      setContactStatus("error");
      return;
    }
    setContactLoading(true);
    setContactStatus(null);
    try {
      const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxkjq5nN5wWtYOX4iYNOr6DwkIuTT2qg8EIQO7FltXUBrcgN5FHfSpPE8RatM0rig/exec";
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          type: "contact",
          email: contactEmail,
          nom: contactName,
          message: contactMessage,
          langue: lang.toUpperCase(),
        }),
      });
      setContactStatus("success");
      setTimeout(() => {
        setShowContact(false);
        setContactName(""); setContactEmail(""); setContactMessage("");
        setContactStatus(null);
      }, 2500);
    } catch {
      setContactStatus("error");
    }
    setContactLoading(false);
  };

  const submitInscription = async () => {
    if (!inscEmail.trim() || !inscNom.trim()) {
      setInscStatus("error");
      return;
    }
    setInscLoading(true);
    setInscStatus(null);
    try {
      // Get profile from diagnostic answers
      const _profile = getDiagProfile(diagAnswers) || {};
      const secteur = _profile.secteur || diagAnswers[0] || "";
      const taille = _profile.taille || "";
      const niveau = diagResult ? t.diagnostic.levels[diagResult.level] : "";
      const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxkjq5nN5wWtYOX4iYNOr6DwkIuTT2qg8EIQO7FltXUBrcgN5FHfSpPE8RatM0rig/exec";

      // Apps Script needs no-cors mode (returns opaque response but request still sent)
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          email: inscEmail,
          nom: inscNom,
          entreprise: inscEntreprise,
          secteur: secteur,
          score: diagResult ? diagResult.score + "%" : "",
          langue: lang.toUpperCase(),
          // Personalized AI analysis (when available)
          ai: !!(diagResult && diagResult.ai),
          summary: diagResult && diagResult.summary ? diagResult.summary : "",
          strengths: diagResult && diagResult.strengths ? diagResult.strengths : [],
          weaknesses: diagResult && diagResult.weaknesses ? diagResult.weaknesses : [],
          priorities: diagResult && diagResult.priorities ? diagResult.priorities : [],
          next_action: diagResult && diagResult.next_action ? diagResult.next_action : "",
          taille: taille,
          niveau: niveau,
          recommended_grants: diagResult && diagResult.recommended_grants ? diagResult.recommended_grants : [],
          action_plan: diagResult && diagResult.action_plan ? diagResult.action_plan : [],
          level_label: niveau,
          // Full Q&A for context
          answers: diagAnswers.map((a, i) => ({
            q: t.diagnostic.questions[i] ? t.diagnostic.questions[i].q : "",
            a: a
          })),
        }),
      });
      setInscStatus("success");
      setTimeout(() => setShowInscription(false), 2500);
    } catch {
      setInscStatus("error");
    }
    setInscLoading(false);
  };

  // Client-side rate limit: 15 mesaj pa sesyon
  const MAX_MESSAGES_PER_SESSION = 15;
  const getMessageCount = () => {
    try {
      const stored = localStorage.getItem("numerikpme_msg_count");
      const data = stored ? JSON.parse(stored) : { count: 0, date: new Date().toDateString() };
      if (data.date !== new Date().toDateString()) {
        return { count: 0, date: new Date().toDateString() };
      }
      return data;
    } catch {
      return { count: 0, date: new Date().toDateString() };
    }
  };
  const incrementMessageCount = () => {
    try {
      const data = getMessageCount();
      data.count++;
      localStorage.setItem("numerikpme_msg_count", JSON.stringify(data));
      return data.count;
    } catch {
      return 0;
    }
  };

  const sendMessage = async (text) => {
    const userText = text || input;
    if (!userText.trim()) return;

    // Verifye limit kliyan
    const usage = getMessageCount();
    if (usage.count >= MAX_MESSAGES_PER_SESSION) {
      setMessages([...messages, { role: "user", content: userText }, { role: "assistant", content: lang === "fr"
        ? `⏳ Vous avez atteint la limite de ${MAX_MESSAGES_PER_SESSION} messages par jour. Revenez demain pour continuer la conversation !`
        : `⏳ You have reached the limit of ${MAX_MESSAGES_PER_SESSION} messages per day. Come back tomorrow to continue!` }]);
      setInput("");
      return;
    }

    // Verifye longè mesaj
    if (userText.length > 2000) {
      setMessages([...messages, { role: "assistant", content: lang === "fr"
        ? "⚠️ Message trop long (max 2000 caractères). Veuillez raccourcir votre question."
        : "⚠️ Message too long (max 2000 characters). Please shorten your question." }]);
      return;
    }

    const newMessages = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      // Apèl sou backend sekirize nou (pa dirèkteman Anthropic)
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        let errMsg = "";
        if (res.status === 429 || data.error === "rate_limit") {
          errMsg = lang === "fr"
            ? `⏳ ${data.message || "Trop de demandes. Veuillez réessayer plus tard."}`
            : `⏳ ${data.message || "Too many requests. Please try again later."}`;
        } else {
          errMsg = lang === "fr"
            ? `❌ Erreur: ${data.message || data.error || res.status}`
            : `❌ Error: ${data.message || data.error || res.status}`;
        }
        setMessages([...newMessages, { role: "assistant", content: errMsg }]);
        setLoading(false);
        return;
      }

      // Enkremante kont mesaj kliyan apre siksè
      incrementMessageCount();

      const reply = data.reply || (lang === "fr" ? "Réponse vide reçue." : "Empty response received.");
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch {
      setMessages([...newMessages, { role: "assistant", content: lang === "fr"
        ? `❌ Erreur de connexion. Vérifiez votre connexion internet.`
        : `❌ Connection error. Check your internet connection.` }]);
    }
    setLoading(false);
  };

  // ═══════════════════════════════════════════════════════════════
  // PWOFIL + MATCHING SUBVANSYON (rule-based, baze sou repons dyagnostik)
  // ═══════════════════════════════════════════════════════════════
  // Konvèti diagAnswers (array nan lòd kesyon) an objè estriktire — pa nouvo state
  const getDiagProfile = (answers) => {
    if (!answers || answers.length < 8) return null;
    return {
      secteur: answers[0],         // ex: "Commerce de détail" / "Manufacturier"
      taille: answers[1],          // ex: "1–4 (Micro)"
      erp: answers[2],             // ex: "Non, tout est manuel"
      presenceWeb: answers[3],     // ex: "Page Facebook seulement"
      donneesClients: answers[4],  // ex: "Cahiers / papier"
      ia: answers[5],              // ex: "Pas du tout"
      budget: answers[6],          // ex: "Moins de 5 000$"
      projet: answers[7],          // ex: "Lancer une boutique en ligne (e-commerce)"
    };
  };

  // Convertit le « projet prioritaire » (Q8) en clé de besoin pour le matching.
  // L'index de l'option choisie correspond à une clé fixe (ordre des options FR/EN).
  const getProjectNeed = (projet) => {
    if (!projet) return null;
    const idx = t.diagnostic.questions[7]?.options.indexOf(projet);
    return ["web","ecommerce","erp","automation","ia","cyber","demarrage","manuf"][idx] ?? null;
  };

  // Detekte si yon repons sektè se manifaktire (bileng FR/EN)
  const isManufacturier = (s) => {
    if (!s) return false;
    const x = s.toLowerCase();
    return x.indexOf("manuf") >= 0;
  };

  // Detekte nivo bidjè (0=<5K, 1=5-15K, 2=15-50K, 3=>50K)
  const getBudgetLevel = (b) => {
    if (!b) return 0;
    const x = b.toLowerCase();
    if (x.indexOf("plus") >= 0 || x.indexOf("more") >= 0 || x.indexOf("50 000") >= 0 && x.indexOf("plus") >= 0) return 3;
    if (x.indexOf("15 000") >= 0 && x.indexOf("50 000") >= 0) return 2;
    if (x.indexOf("5 000") >= 0 && x.indexOf("15 000") >= 0) return 1;
    if (x.indexOf("moins") >= 0 || x.indexOf("less") >= 0) return 0;
    return 0;
  };

  // Detekte si gen ERP entegre
  const hasFullERP = (e) => {
    if (!e) return false;
    const x = e.toLowerCase();
    return x.indexOf("intégré") >= 0 || x.indexOf("integrated") >= 0;
  };

  // Detekte si IA byen entegre
  const hasFullAI = (a) => {
    if (!a) return false;
    const x = a.toLowerCase();
    return x.indexOf("intégrée dans") >= 0 || x.indexOf("integrated into") >= 0;
  };

  // Filtraj + priyorite + rezon pou chak subvansyon
  const getMatchingGrants = (profile, allGrants, isFR) => {
    if (!profile) return allGrants.map(g => ({ ...g, priorite: 2, raison: "" }));

    const isManuf = isManufacturier(profile.secteur);
    const budgetLvl = getBudgetLevel(profile.budget);
    const erpOK = hasFullERP(profile.erp);
    const aiOK = hasFullAI(profile.ia);
    const score = (diagResult && diagResult.score) || 0;
    const projectNeed = getProjectNeed(profile.projet); // matching par projet (façon helloDarwin)

    const matches = [];
    for (const g of allGrants) {
      const name = g.name.toLowerCase();
      let admissible = false;
      let priorite = 2; // default = mwayen
      let raison = "";

      // Plan PME 2025-2028 — toujou admisib
      if (name.indexOf("plan pme") >= 0) {
        admissible = true;
        priorite = 1;
        raison = isFR
          ? "Accompagnement gratuit disponible pour toutes les PME du Québec"
          : "Free guidance available for all SMEs in Québec";
      }
      // SIPEM-PROMPT — sèlman manifaktire
      else if (name.indexOf("sipem") >= 0 || name.indexOf("prompt") >= 0) {
        if (isManuf) {
          admissible = true;
          priorite = 1;
          raison = isFR
            ? "Programme dédié aux PME manufacturières (votre secteur)"
            : "Program dedicated to manufacturing SMEs (your sector)";
        }
      }
      // BDC — pa pou bidjè twò ba
      else if (name.indexOf("bdc") >= 0) {
        if (budgetLvl >= 1) {
          admissible = true;
          priorite = budgetLvl >= 2 ? 1 : 2;
          raison = isFR
            ? "Prêt 0% adapté à votre niveau de budget"
            : "0% loan adapted to your budget level";
        }
      }
      // Offensive Tr@ns Num / ADRIQ — pou PME san ERP entegre
      else if (name.indexOf("offensive") >= 0 || name.indexOf("adriq") >= 0 || name.indexOf("tr@ns num") >= 0) {
        if (!erpOK) {
          admissible = true;
          priorite = (score < 50) ? 1 : 2;
          raison = isFR
            ? "Accompagnement complet pour implanter ERP/CRM (pertinent pour votre niveau actuel)"
            : "Complete guidance to implement ERP/CRM (relevant to your current level)";
        }
      }
      // ESSOR — pou PME ki bezwen plan numerik (skò < 75)
      else if (name.indexOf("essor") >= 0) {
        if (score < 75 || score === 0) {
          admissible = true;
          priorite = (score < 50 || score === 0) ? 1 : 2;
          raison = isFR
            ? "Financement pour planifier votre stratégie numérique"
            : "Funding to plan your digital strategy";
        }
      }
      // CRIC — pou bidjè wo (R&D)
      else if (name.indexOf("cric") >= 0) {
        if (budgetLvl >= 2) {
          admissible = true;
          priorite = budgetLvl === 3 ? 1 : 2;
          raison = isFR
            ? "Crédit d'impôt R&D adapté à votre budget significatif"
            : "R&D tax credit suited to your significant budget";
        }
      }
      // PARI-CNRC / IRAP — pou inovasyon (pa pou sa ki gen IA entegre deja)
      else if (name.indexOf("pari") >= 0 || name.indexOf("irap") >= 0) {
        if (!aiOK) {
          admissible = true;
          priorite = 2;
          raison = isFR
            ? "Conseil expert pour intégrer innovation et IA dans vos opérations"
            : "Expert advice to integrate innovation and AI into your operations";
        }
      }
      // Default: si pa gen règ espesifik, admisib
      else {
        admissible = true;
        priorite = 2;
      }

      // Boost selon le projet prioritaire : si le programme couvre le besoin
      // correspondant au projet choisi, on le remonte en priorité 1.
      if (admissible && projectNeed && Array.isArray(g.needs) && g.needs.includes(projectNeed)) {
        priorite = 1;
        raison = isFR
          ? `Pertinent pour votre projet : ${profile.projet}`
          : `Relevant to your project: ${profile.projet}`;
      }

      if (admissible) matches.push({ ...g, priorite, raison });
    }
    // Trie: priyorite 1 anvan, apre type filter respekte
    return matches.sort((a, b) => a.priorite - b.priorite);
  };

  // Estimation du financement potentiel : somme des montants max des programmes
  // correspondant au profil (matching). « Jusqu'à » = plafond indicatif.
  const estimateFunding = (grantsList) => {
    if (!grantsList) return 0;
    return grantsList.reduce((sum, g) => sum + (typeof g.amountMax === "number" ? g.amountMax : 0), 0);
  };

  const diagProfile = getDiagProfile(diagAnswers);
  const personalizedGrants = diagProfile
    ? getMatchingGrants(diagProfile, t.grants.programs, lang === "fr")
    : null;
  const baseGrantsList = personalizedGrants || t.grants.programs.map(g => ({ ...g, priorite: 2, raison: "" }));
  const filteredGrants = baseGrantsList.filter((p) =>
    (grantFilter === "all" || p.type === grantFilter) &&
    (supportFilter === "all" || p.support === supportFilter)
  );
  // Estimation du financement potentiel (programmes correspondant au profil)
  const fundingEstimate = personalizedGrants ? estimateFunding(personalizedGrants) : 0;
  const renderMarkdown = (text) =>
    text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\n\n/g, "</p><p>").replace(/\n/g, "<br/>")
        .replace(/^/, "<p>").replace(/$/, "</p>");

  const scoreColor = diagResult
    ? diagResult.score < 25 ? "#E25C5C" : diagResult.score < 50 ? "#FF8A4C" : diagResult.score < 75 ? "#635BFF" : "#00A865"
    : "#635BFF";

  // Statut d'un programme (badge) : échéance proche, échéance datée, ou en continu.
  const getGrantStatus = (g) => {
    const fr = lang === "fr";
    if (g.deadline) {
      const days = Math.round((new Date(g.deadline) - new Date()) / 86400000);
      if (days >= 0 && days <= 60) {
        return { label: t.grants.statusSoon, color: "#D63B3B", bg: "rgba(226,92,92,0.10)", bd: "rgba(226,92,92,0.25)" };
      }
      const dateLbl = new Date(g.deadline + "T00:00:00").toLocaleDateString(fr ? "fr-CA" : "en-CA", { month: "long", year: "numeric" });
      return { label: `${t.grants.statusDeadline} · ${dateLbl}`, color: "#B26A00", bg: "rgba(255,170,0,0.10)", bd: "rgba(255,170,0,0.30)" };
    }
    return { label: t.grants.statusOpen, color: "#00A865", bg: "rgba(0,168,101,0.10)", bd: "rgba(0,168,101,0.25)" };
  };

  // Couleur du badge « type d'aide ».
  const supportColor = (s) =>
    s === "pret" ? { color: "#B26A00", bg: "rgba(255,170,0,0.10)", bd: "rgba(255,170,0,0.30)" }
    : s === "credit" ? { color: "#7A52CC", bg: "rgba(122,82,204,0.10)", bd: "rgba(122,82,204,0.28)" }
    : { color: "#00A865", bg: "rgba(0,168,101,0.10)", bd: "rgba(0,168,101,0.25)" };

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", background: "#FFFFFF", minHeight: "100vh", color: "#0A2540" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:10px;height:10px}
        ::-webkit-scrollbar-track{background:#F6F9FC}
        ::-webkit-scrollbar-thumb{background:#C1C9D2;border-radius:6px}
        ::-webkit-scrollbar-thumb:hover{background:#8898AA}
        input,button,textarea{outline:none;font-family:inherit}
        a{color:inherit;text-decoration:none}

        @keyframes blink{0%,100%{opacity:1}50%{opacity:0.4}}
        @keyframes bounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-4px)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes meshShift{0%,100%{transform:translate(0,0) rotate(0deg)}33%{transform:translate(30px,-20px) rotate(2deg)}66%{transform:translate(-20px,30px) rotate(-2deg)}}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        .fade-up{animation:fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) forwards}

        /* ── LOGO 3D (premium) ── */
        @keyframes logoFloat{0%,100%{transform:perspective(180px) rotateX(0) rotateY(0)}50%{transform:perspective(180px) rotateX(-3deg) rotateY(4deg)}}
        .logo-mark{width:40px;height:40px;border-radius:11px;display:flex;align-items:center;justify-content:center;flex-shrink:0;position:relative;background:linear-gradient(160deg,#7A73FF 0%,#635BFF 35%,#5046E5 70%,#3D34C2 100%);box-shadow:0 1px 0 rgba(255,255,255,0.25) inset,0 -3px 6px rgba(0,0,0,0.18) inset,0 0 0 0.5px rgba(99,91,255,0.50),0 4px 8px rgba(50,50,93,0.18),0 12px 24px -6px rgba(99,91,255,0.40),0 18px 32px -10px rgba(80,70,229,0.25);transform-style:preserve-3d;transition:transform 0.45s cubic-bezier(0.16,1,0.3,1);will-change:transform}
        .logo-mark:hover{transform:perspective(220px) rotateX(-8deg) rotateY(10deg) scale(1.04)}
        /* Top glossy reflection (curved highlight) */
        .logo-mark::before{content:'';position:absolute;top:2px;left:4px;right:4px;height:42%;background:linear-gradient(180deg,rgba(255,255,255,0.55) 0%,rgba(255,255,255,0.18) 50%,rgba(255,255,255,0) 100%);border-radius:9px 9px 80% 80%/9px 9px 100% 100%;pointer-events:none;z-index:2;mix-blend-mode:overlay}
        /* Soft ambient glow inside */
        .logo-mark::after{content:'';position:absolute;inset:0;border-radius:11px;background:radial-gradient(circle at 28% 22%,rgba(255,255,255,0.45) 0%,transparent 45%),radial-gradient(circle at 80% 90%,rgba(160,150,255,0.55) 0%,transparent 50%);pointer-events:none;z-index:1}
        .logo-svg{width:62%;height:62%;position:relative;z-index:3;display:block;filter:drop-shadow(0 1.5px 1.5px rgba(0,0,0,0.30)) drop-shadow(0 0 0.5px rgba(255,255,255,0.4))}
        .logo-accent{filter:drop-shadow(0 0 4px rgba(255,200,80,0.7))}

        /* ── NAV TOP ── */
        .nav{position:sticky;top:0;z-index:100;background:rgba(255,255,255,0.85);backdrop-filter:saturate(180%) blur(20px);border-bottom:1px solid rgba(0,0,0,0.04);padding:0 32px;display:flex;align-items:center;justify-content:space-between;height:68px}
        .nav-tab{padding:8px 14px;border-radius:8px;font-size:14px;font-weight:500;cursor:pointer;border:none;background:transparent;color:#425466;transition:all 0.15s ease;font-family:'Inter',sans-serif;white-space:nowrap}
        .nav-tab:hover{color:#0A2540;background:rgba(99,91,255,0.06)}
        .nav-tab.active{color:#635BFF;background:rgba(99,91,255,0.08)}
        .nav-lang{padding:8px 16px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;border:1px solid #E6EBF1;background:#FFFFFF;color:#425466;transition:all 0.15s ease;font-family:'Inter',sans-serif;display:inline-flex;align-items:center;gap:6px;text-decoration:none}
        .nav-lang:hover{border-color:#635BFF;color:#635BFF;box-shadow:0 1px 3px rgba(99,91,255,0.12)}
        @media(max-width:560px){.contact-lbl{display:none}}

        /* ── MAIN ── */
        .main{max-width:1180px;margin:0 auto;padding:0 32px 80px}

        /* ── HERO with mesh gradient ── */
        .hero{padding:96px 0 80px;text-align:center;position:relative}
        .hero-glow{position:absolute;top:-100px;left:50%;transform:translateX(-50%);width:1200px;height:700px;pointer-events:none;z-index:-1;background:radial-gradient(circle at 30% 30%,rgba(99,91,255,0.18) 0%,transparent 45%),radial-gradient(circle at 70% 40%,rgba(255,90,160,0.12) 0%,transparent 50%),radial-gradient(circle at 50% 80%,rgba(0,210,255,0.10) 0%,transparent 50%);filter:blur(40px);animation:meshShift 18s ease-in-out infinite}
        .hero-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(99,91,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(99,91,255,0.05) 1px,transparent 1px);background-size:48px 48px;mask-image:radial-gradient(ellipse 70% 50% at 50% 30%,black 0%,transparent 70%);-webkit-mask-image:radial-gradient(ellipse 70% 50% at 50% 30%,black 0%,transparent 70%);pointer-events:none;z-index:-1}
        .hero-badge{display:inline-flex;align-items:center;gap:8px;padding:6px 14px;border-radius:100px;background:rgba(99,91,255,0.08);border:1px solid rgba(99,91,255,0.2);font-size:12px;font-weight:600;letter-spacing:0.02em;color:#635BFF;text-transform:uppercase;margin-bottom:24px}
        .badge-dot{width:6px;height:6px;border-radius:50%;background:#635BFF;animation:blink 2s infinite;box-shadow:0 0 8px rgba(99,91,255,0.6)}
        .hero-title{font-family:'Inter',sans-serif;font-size:clamp(36px,5.5vw,64px);font-weight:700;line-height:1.1;letter-spacing:-0.025em;margin-bottom:20px;color:#0A2540;background:linear-gradient(135deg,#0A2540 0%,#635BFF 100%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
        .hero-sub{color:#425466;font-size:18px;line-height:1.55;max-width:620px;margin:0 auto 36px;font-weight:400}
        .hero-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-bottom:64px}

        /* ── BUTTONS ── */
        .btn-p{padding:13px 26px;border-radius:8px;background:linear-gradient(135deg,#635BFF 0%,#5046E5 100%);color:#FFFFFF;border:none;cursor:pointer;font-family:'Inter',sans-serif;font-size:15px;font-weight:600;transition:all 0.18s ease;box-shadow:0 1px 3px rgba(99,91,255,0.3),0 4px 12px rgba(99,91,255,0.18);display:inline-flex;align-items:center;gap:8px}
        .btn-p:hover{transform:translateY(-1px);box-shadow:0 2px 6px rgba(99,91,255,0.35),0 8px 24px rgba(99,91,255,0.25)}
        .btn-p:disabled{opacity:0.55;cursor:not-allowed;transform:none}
        .btn-s{padding:13px 26px;border-radius:8px;background:#FFFFFF;color:#0A2540;border:1px solid #E6EBF1;cursor:pointer;font-family:'Inter',sans-serif;font-size:15px;font-weight:600;transition:all 0.18s ease;box-shadow:0 1px 3px rgba(0,0,0,0.04);display:inline-flex;align-items:center;gap:8px}
        .btn-s:hover{border-color:#635BFF;color:#635BFF;transform:translateY(-1px);box-shadow:0 2px 6px rgba(99,91,255,0.12)}

        /* ── HERO DASHBOARD MOCKUP ── */
        .hero-mock{max-width:920px;margin:0 auto;border-radius:16px;background:#FFFFFF;border:1px solid #E6EBF1;box-shadow:0 50px 100px -20px rgba(50,50,93,0.18),0 30px 60px -30px rgba(0,0,0,0.3);overflow:hidden;animation:float 6s ease-in-out infinite}
        .mock-bar{display:flex;align-items:center;gap:6px;padding:12px 16px;background:#F6F9FC;border-bottom:1px solid #E6EBF1}
        .mock-dot{width:11px;height:11px;border-radius:50%}
        .mock-dot.r{background:#FF5F57}.mock-dot.y{background:#FEBC2E}.mock-dot.g{background:#28C840}
        .mock-url{margin-left:14px;background:#FFFFFF;border:1px solid #E6EBF1;border-radius:6px;padding:4px 12px;font-size:11px;color:#697386;font-family:'Inter',sans-serif}
        .mock-body{padding:24px;display:grid;grid-template-columns:repeat(4,1fr);gap:14px;background:linear-gradient(180deg,#FAFBFD 0%,#FFFFFF 100%)}
        .mock-stat{padding:14px;border:1px solid #E6EBF1;border-radius:10px;background:#FFFFFF;text-align:left}
        .mock-stat-lbl{font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#8898AA;margin-bottom:6px}
        .mock-stat-val{font-size:20px;font-weight:700;color:#0A2540;letter-spacing:-0.02em}
        .mock-stat-bar{height:4px;background:#F0F4F8;border-radius:2px;margin-top:10px;overflow:hidden}
        .mock-stat-fill{height:100%;border-radius:2px;background:linear-gradient(90deg,#635BFF 0%,#7A73FF 100%)}
        .mock-chart{grid-column:1/-1;height:120px;border:1px solid #E6EBF1;border-radius:10px;padding:14px;background:#FFFFFF;display:flex;align-items:flex-end;gap:8px}
        .mock-chart-bar{flex:1;background:linear-gradient(180deg,#635BFF 0%,#7A73FF 100%);border-radius:4px 4px 0 0;opacity:0.85;transition:opacity 0.2s ease}
        .mock-chart-bar:hover{opacity:1}

        /* ── TRUST BAND ── */
        .trust-band{padding:48px 0 40px;text-align:center;border-top:1px solid #E6EBF1;border-bottom:1px solid #E6EBF1;margin:24px 0 80px;background:#FAFBFD;border-radius:16px}
        .trust-lbl{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#8898AA;margin-bottom:24px}
        .trust-logos{display:flex;justify-content:center;align-items:center;gap:48px;flex-wrap:wrap;padding:0 24px}
        .trust-item{font-family:'Inter',sans-serif;font-weight:700;font-size:15px;color:#697386;letter-spacing:-0.01em;opacity:0.85;transition:opacity 0.2s ease;display:inline-flex;align-items:center;gap:6px}
        .trust-item:hover{opacity:1;color:#0A2540}

        /* ── FEATURE CARDS ── */
        .feat-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;margin-bottom:80px}
        .feat-card{background:#FFFFFF;border:1px solid #E6EBF1;border-radius:14px;padding:32px;cursor:pointer;transition:all 0.2s ease;position:relative;text-align:left;box-shadow:0 1px 3px rgba(50,50,93,0.04)}
        .feat-card::after{display:none}
        .feat-card:hover{border-color:#635BFF;transform:translateY(-3px);box-shadow:0 12px 30px rgba(99,91,255,0.12),0 4px 8px rgba(50,50,93,0.06)}
        .feat-icon{width:48px;height:48px;border-radius:10px;background:linear-gradient(135deg,rgba(99,91,255,0.12) 0%,rgba(122,115,255,0.06) 100%);display:flex;align-items:center;justify-content:center;font-size:24px;margin-bottom:18px;border:1px solid rgba(99,91,255,0.15)}

        /* ── STATS ── */
        .stats-row{display:grid;grid-template-columns:repeat(4,1fr);gap:0;background:#FFFFFF;border:1px solid #E6EBF1;border-radius:14px;padding:28px 0;box-shadow:0 1px 3px rgba(50,50,93,0.04)}
        .stat-c{text-align:center;background:transparent;border:none;border-right:1px solid #E6EBF1;padding:8px 16px}
        .stat-c:last-child{border-right:none}

        /* ── SECTION HEADING ── */
        .sec-head{text-align:center;margin-bottom:48px;padding-top:64px}
        .sec-title{font-family:'Inter',sans-serif;font-size:clamp(30px,4vw,46px);font-weight:700;letter-spacing:-0.025em;color:#0A2540;margin-bottom:12px;line-height:1.15}
        .sec-sub{color:#425466;font-size:16px;font-weight:400;max-width:600px;margin:0 auto}

        /* ── DIAGNOSTIC ── */
        .diag-card{max-width:680px;margin:0 auto;background:#FFFFFF;border:1px solid #E6EBF1;border-radius:16px;padding:40px;box-shadow:0 4px 12px rgba(50,50,93,0.06)}
        .diag-opt{width:100%;text-align:left;padding:16px 20px;background:#FFFFFF;border:1px solid #E6EBF1;border-radius:10px;color:#0A2540;cursor:pointer;font-family:'Inter',sans-serif;font-size:14.5px;font-weight:500;transition:all 0.15s ease;margin-bottom:10px;display:block}
        .diag-opt:hover{border-color:#635BFF;background:rgba(99,91,255,0.04);color:#0A2540;transform:translateX(2px)}
        .score-ring{transition:stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1)}

        /* ── CHAT / ASSISTANT ── */
        .chat-box{background:#FAFBFD;border:1px solid #E6EBF1;border-radius:14px;padding:24px;height:480px;overflow-y:auto;display:flex;flex-direction:column;gap:14px;margin-bottom:14px;box-shadow:inset 0 1px 3px rgba(50,50,93,0.04)}
        .ai-av{width:34px;height:34px;border-radius:9px;flex-shrink:0;background:linear-gradient(135deg,#635BFF 0%,#7A73FF 100%);display:flex;align-items:center;justify-content:center;font-size:15px;color:#FFFFFF;margin-top:2px;box-shadow:0 2px 6px rgba(99,91,255,0.3)}
        .bub-u{background:linear-gradient(135deg,#635BFF 0%,#5046E5 100%);color:#FFFFFF;padding:13px 17px;border-radius:14px 14px 4px 14px;max-width:75%;font-size:14px;line-height:1.55;box-shadow:0 2px 8px rgba(99,91,255,0.18)}
        .bub-a{background:#FFFFFF;border:1px solid #E6EBF1;color:#0A2540;padding:13px 17px;border-radius:14px 14px 14px 4px;max-width:75%;font-size:14px;line-height:1.55;box-shadow:0 1px 3px rgba(50,50,93,0.04)}
        .tdot{width:6px;height:6px;border-radius:50%;background:#635BFF;display:inline-block;margin:0 2px}
        .tdot:nth-child(1){animation:bounce 1.2s infinite 0s}
        .tdot:nth-child(2){animation:bounce 1.2s infinite 0.2s}
        .tdot:nth-child(3){animation:bounce 1.2s infinite 0.4s}
        .sug-pill{background:#FFFFFF;border:1px solid #E6EBF1;color:#425466;padding:7px 14px;border-radius:100px;font-size:12.5px;font-weight:500;cursor:pointer;font-family:'Inter',sans-serif;transition:all 0.15s ease;white-space:nowrap;box-shadow:0 1px 2px rgba(50,50,93,0.04)}
        .sug-pill:hover{border-color:#635BFF;color:#635BFF;background:rgba(99,91,255,0.04)}
        .chat-in{flex:1;background:#FFFFFF;border:1px solid #E6EBF1;border-radius:10px;padding:13px 16px;color:#0A2540;font-size:14.5px;font-family:'Inter',sans-serif;transition:all 0.15s ease;box-shadow:inset 0 1px 2px rgba(50,50,93,0.04)}
        .chat-in:focus{border-color:#635BFF;box-shadow:0 0 0 3px rgba(99,91,255,0.12)}
        .chat-in::placeholder{color:#8898AA}
        .send-btn{padding:13px 22px;border-radius:10px;background:linear-gradient(135deg,#635BFF 0%,#5046E5 100%);color:#FFFFFF;border:none;cursor:pointer;font-family:'Inter',sans-serif;font-size:14px;font-weight:600;transition:all 0.18s ease;flex-shrink:0;box-shadow:0 2px 6px rgba(99,91,255,0.25)}
        .send-btn:hover{transform:translateY(-1px);box-shadow:0 4px 12px rgba(99,91,255,0.35)}
        .send-btn:disabled{opacity:0.55;cursor:not-allowed;transform:none}

        /* ── GRANTS ── */
        .grants-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:20px}
        .grant-card{background:#FFFFFF;border:1px solid #E6EBF1;border-radius:14px;padding:28px;transition:all 0.2s ease;box-shadow:0 1px 3px rgba(50,50,93,0.04);display:flex;flex-direction:column}
        .grant-card:hover{border-color:#635BFF;transform:translateY(-3px);box-shadow:0 12px 30px rgba(99,91,255,0.10),0 4px 8px rgba(50,50,93,0.05)}
        .filter-row{display:flex;gap:8px;justify-content:center;margin-bottom:40px;flex-wrap:wrap}
        .fpill{padding:9px 20px;border-radius:100px;font-size:13px;font-weight:600;cursor:pointer;border:1px solid #E6EBF1;background:#FFFFFF;color:#425466;font-family:'Inter',sans-serif;transition:all 0.15s ease;box-shadow:0 1px 2px rgba(50,50,93,0.04)}
        .fpill.active{background:linear-gradient(135deg,#635BFF 0%,#5046E5 100%);color:#FFFFFF;border-color:transparent;box-shadow:0 2px 6px rgba(99,91,255,0.25)}
        .fpill:not(.active):hover{border-color:#635BFF;color:#635BFF}
        .chip{display:inline-block;background:#F6F9FC;border:1px solid #E6EBF1;color:#697386;font-size:11px;font-weight:500;padding:3px 10px;border-radius:6px}
        .grant-lnk{display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:11px 18px;background:#FFFFFF;color:#635BFF;border:1px solid #635BFF;border-radius:8px;text-decoration:none;font-size:13.5px;font-weight:600;transition:all 0.15s ease;margin-top:auto}
        .grant-lnk:hover{background:linear-gradient(135deg,#635BFF 0%,#5046E5 100%);color:#FFFFFF;box-shadow:0 4px 12px rgba(99,91,255,0.25);transform:translateY(-1px)}

        /* ── PLAN ── */
        .phase-block{border-left:none;padding:28px 32px;background:#FFFFFF;border:1px solid #E6EBF1;border-radius:14px;margin-bottom:14px;transition:all 0.2s ease;box-shadow:0 1px 3px rgba(50,50,93,0.04);position:relative;overflow:hidden}
        .phase-block::before{content:'';position:absolute;top:0;left:0;bottom:0;width:4px;background:linear-gradient(180deg,#635BFF 0%,#7A73FF 100%)}
        .phase-block:hover{border-color:#635BFF;transform:translateX(4px);box-shadow:0 6px 16px rgba(99,91,255,0.10)}
        .impact-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:0;margin-top:48px;background:#FFFFFF;border:1px solid #E6EBF1;border-radius:14px;padding:28px 0;box-shadow:0 1px 3px rgba(50,50,93,0.04)}
        .impact-card{text-align:center;background:transparent;border:none;border-right:1px solid #E6EBF1;padding:8px 16px}
        .impact-card:last-child{border-right:none}

        /* ── MOBILE BOTTOM NAV ── */
        .mob-nav{display:none;position:fixed;bottom:0;left:0;right:0;z-index:200;background:rgba(255,255,255,0.96);backdrop-filter:saturate(180%) blur(20px);border-top:1px solid #E6EBF1;padding:8px 0 env(safe-area-inset-bottom,8px);box-shadow:0 -2px 16px rgba(50,50,93,0.06)}
        .mob-nav-inner{display:flex;justify-content:space-around;align-items:center}
        .mob-tab{display:flex;flex-direction:column;align-items:center;gap:3px;padding:6px 12px;border:none;background:transparent;cursor:pointer;transition:all 0.15s ease;border-radius:8px;min-width:54px}
        .mob-tab-icon{font-size:19px;line-height:1;opacity:0.55;transition:all 0.15s ease}
        .mob-tab-lbl{font-size:10px;font-weight:600;letter-spacing:0.02em;color:#8898AA;font-family:'Inter',sans-serif;transition:color 0.15s ease}
        .mob-tab.active .mob-tab-lbl{color:#635BFF}
        .mob-tab.active .mob-tab-icon{opacity:1;transform:scale(1.05)}

        /* ── LEGAL ── */
        .legal-wrap{max-width:840px;margin:0 auto;padding:64px 0 48px}
        .legal-back{display:inline-flex;align-items:center;gap:6px;padding:9px 16px;border-radius:8px;background:#FFFFFF;border:1px solid #E6EBF1;color:#425466;font-size:13px;font-weight:500;cursor:pointer;font-family:'Inter',sans-serif;transition:all 0.15s ease;margin-bottom:32px;box-shadow:0 1px 3px rgba(50,50,93,0.04)}
        .legal-back:hover{border-color:#635BFF;color:#635BFF}
        .legal-title{font-family:'Inter',sans-serif;font-size:clamp(32px,5vw,48px);font-weight:700;letter-spacing:-0.025em;color:#0A2540;margin-bottom:8px;line-height:1.15}
        .legal-date{font-size:13px;color:#8898AA;margin-bottom:36px;font-weight:500}
        .legal-section{background:#FFFFFF;border:1px solid #E6EBF1;border-radius:12px;padding:28px 32px;margin-bottom:14px;box-shadow:0 1px 3px rgba(50,50,93,0.04)}
        .legal-h{font-family:'Inter',sans-serif;font-size:16px;font-weight:700;color:#0A2540;margin-bottom:10px;letter-spacing:-0.01em}
        .legal-p{font-size:14.5px;color:#425466;line-height:1.7}

        /* ── FOOTER ── */
        .footer{background:#0A2540;color:#A3ACBA;border-top:none;padding:72px 32px 36px;margin-top:120px}
        .footer-inner{max-width:1180px;margin:0 auto;display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:48px}
        .footer-brand{display:flex;flex-direction:column;gap:14px}
        .footer-brand .logo-mark{background:linear-gradient(135deg,#635BFF 0%,#7A73FF 100%)}
        .footer-logo{display:flex;align-items:center;gap:12px}
        .footer-tag{color:#8898AA;font-size:13.5px;line-height:1.65;max-width:300px}
        .footer-social{display:flex;gap:8px;margin-top:8px}
        .footer-icon{width:36px;height:36px;border-radius:8px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.10);display:flex;align-items:center;justify-content:center;color:#A3ACBA;text-decoration:none;transition:all 0.15s ease;font-size:13px}
        .footer-icon:hover{background:#635BFF;color:#FFFFFF;border-color:#635BFF;transform:translateY(-1px)}
        .footer-col h4{font-family:'Inter',sans-serif;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#FFFFFF;margin-bottom:18px}
        .footer-col ul{list-style:none;display:flex;flex-direction:column;gap:10px;padding:0}
        .footer-col a,.footer-col li{font-size:13.5px;color:#A3ACBA;text-decoration:none;transition:color 0.15s ease;cursor:pointer}
        .footer-link{font-family:inherit;font-size:13.5px;color:#A3ACBA;background:none;border:none;padding:0;cursor:pointer;text-align:left;transition:color 0.15s ease}
        .footer-link:hover,.footer-link:focus-visible{color:#FFFFFF;outline:none}
        .footer-link:focus-visible{text-decoration:underline;text-underline-offset:3px}
        .footer-col a:hover{color:#FFFFFF}
        .footer-contact{font-size:13.5px;color:#A3ACBA;line-height:1.75}
        .footer-contact strong{color:#FFFFFF;font-weight:600}
        .footer-bottom{max-width:1180px;margin:48px auto 0;padding-top:28px;border-top:1px solid rgba(255,255,255,0.08);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px}
        .footer-copy{font-size:12.5px;color:#8898AA}
        .footer-legal{display:flex;gap:20px;font-size:12.5px}
        .footer-legal a,.footer-legal .footer-link{color:#8898AA;text-decoration:none;transition:color 0.15s ease;font-size:12.5px}
        .footer-legal a:hover,.footer-legal .footer-link:hover,.footer-legal .footer-link:focus-visible{color:#FFFFFF}

        /* ── MEDIA QUERIES ── */
        @media(max-width:1024px){
          .hero-mock{max-width:100%}
          .mock-body{padding:18px;gap:10px}
        }
        @media(max-width:768px){
          .nav{padding:0 16px;height:60px}
          .nav nav{display:none}
          .nav-lang{padding:7px 12px;font-size:12px}
          .mob-nav{display:block}
          .main{padding:0 16px 96px}
          .hero{padding:48px 0 40px}
          .hero-glow{width:100%;height:500px;top:-60px}
          .hero-badge{font-size:10.5px;padding:5px 12px}
          .hero-sub{font-size:15.5px;max-width:100%;margin-bottom:28px}
          .hero-btns{flex-direction:column;align-items:stretch;width:100%;max-width:340px;margin:0 auto 40px}
          .btn-p,.btn-s{width:100%;justify-content:center;padding:14px 20px;font-size:14.5px}
          .hero-mock{border-radius:12px}
          .mock-bar{padding:9px 12px}
          .mock-dot{width:9px;height:9px}
          .mock-url{font-size:10px;padding:3px 10px}
          .mock-body{padding:14px;grid-template-columns:repeat(2,1fr);gap:8px}
          .mock-stat{padding:10px}
          .mock-stat-val{font-size:16px}
          .mock-chart{height:80px;padding:10px}
          .trust-band{padding:32px 0 28px;margin:24px 0 56px;border-radius:12px}
          .trust-lbl{font-size:10px;margin-bottom:18px}
          .trust-logos{gap:24px}
          .trust-item{font-size:13px}
          .feat-grid{grid-template-columns:1fr;gap:14px;margin-bottom:56px}
          .feat-card{padding:24px}
          .feat-icon{width:42px;height:42px;font-size:20px;margin-bottom:14px}
          .stats-row{grid-template-columns:repeat(2,1fr);padding:18px 0;border-radius:12px}
          .stat-c{border-right:none;padding:14px 12px;border-bottom:1px solid #E6EBF1}
          .stat-c:nth-child(2n){border-right:none}
          .stat-c:nth-last-child(-n+2){border-bottom:none}
          .sec-head{padding-top:48px;margin-bottom:36px}
          .sec-title{font-size:clamp(26px,7vw,36px)}
          .sec-sub{font-size:14.5px}
          .diag-card{padding:28px 22px;border-radius:12px}
          .diag-opt{padding:14px 16px;font-size:14px}
          .chat-box{height:56vh;padding:18px;border-radius:12px}
          .bub-u,.bub-a{max-width:88%;font-size:13.5px;padding:11px 14px}
          .sug-pill{font-size:11.5px;padding:6px 12px}
          .chat-in{font-size:14px;padding:12px 14px}
          .send-btn{padding:12px 16px;font-size:13px}
          .grants-grid{grid-template-columns:1fr;gap:14px}
          .grant-card{padding:24px}
          .filter-row{flex-wrap:wrap;margin-bottom:28px}
          .phase-block{padding:22px 24px;border-radius:12px}
          .phase-block:hover{transform:none}
          .impact-grid{grid-template-columns:repeat(2,1fr);padding:18px 0;border-radius:12px;margin-top:32px}
          .impact-card{border-right:none;border-bottom:1px solid #E6EBF1;padding:14px 12px}
          .impact-card:nth-child(2n){border-right:none}
          .impact-card:nth-last-child(-n+2){border-bottom:none}
          .legal-wrap{padding:40px 0 32px}
          .legal-section{padding:22px 22px;border-radius:12px}
          .footer{padding:48px 20px 28px;margin-top:64px}
          .footer-inner{grid-template-columns:1fr;gap:32px}
          .footer-bottom{flex-direction:column;text-align:center;gap:10px}
          .footer-legal{flex-wrap:wrap;justify-content:center;gap:14px}
        }
        @media(max-width:480px){
          .hero-title{font-size:clamp(28px,9vw,40px)}
          .hero{padding:36px 0 32px}
          .nav{padding:0 14px}
          .main{padding:0 14px 96px}
        }
        @supports(padding:env(safe-area-inset-bottom)){
          .mob-nav{padding-bottom:calc(8px + env(safe-area-inset-bottom))}
        }

        /* ── BODY BACKGROUND (subtle global) ── */
        body{background:#FAFBFD}
        body::before{content:'';position:fixed;inset:0;pointer-events:none;z-index:-1;background:radial-gradient(ellipse 80% 50% at 50% 0%,rgba(99,91,255,0.06) 0%,transparent 60%),radial-gradient(ellipse 50% 40% at 100% 30%,rgba(255,90,160,0.04) 0%,transparent 60%),radial-gradient(ellipse 50% 40% at 0% 60%,rgba(0,180,255,0.04) 0%,transparent 60%)}

        /* ── HERO VISUAL (photo + dashboard mockup overlay) ── */
        .hero-visual{position:relative;max-width:1080px;margin:0 auto;border-radius:24px;overflow:visible}
        .hero-photo-wrap{position:relative;border-radius:24px;overflow:hidden;aspect-ratio:21/9;box-shadow:0 30px 80px -20px rgba(50,50,93,0.25),0 18px 36px -18px rgba(0,0,0,0.20);background:#0A2540}
        .hero-photo{width:100%;height:100%;object-fit:cover;display:block;transform:scale(1.02);transition:transform 0.6s ease}
        .hero-photo-wrap:hover .hero-photo{transform:scale(1.06)}
        .hero-photo-overlay{position:absolute;inset:0;background:linear-gradient(135deg,rgba(99,91,255,0.20) 0%,rgba(10,37,64,0.45) 100%);pointer-events:none}
        .hero-mock{position:relative;max-width:780px;margin:-90px auto 0;background:#FFFFFF;border:1px solid #E6EBF1;border-radius:14px;box-shadow:0 30px 60px -15px rgba(50,50,93,0.30),0 12px 30px -10px rgba(0,0,0,0.18);overflow:hidden;animation:float 6s ease-in-out infinite;z-index:2}

        /* ── SECTION HERO IMAGE ── */
        .section-hero{position:relative;width:100%;max-width:1080px;margin:0 auto 0;border-radius:20px;overflow:hidden;aspect-ratio:32/9;background:#0A2540;box-shadow:0 18px 50px -18px rgba(50,50,93,0.20)}
        .section-hero img{width:100%;height:100%;object-fit:cover;display:block;transition:transform 0.6s ease}
        .section-hero:hover img{transform:scale(1.04)}
        .section-hero-overlay{position:absolute;inset:0;background:linear-gradient(135deg,rgba(99,91,255,0.55) 0%,rgba(10,37,64,0.75) 100%);display:flex;align-items:center;padding:0 56px}
        .section-hero-tag{font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.85);margin-bottom:10px}
        .section-hero-title{font-family:'Inter',sans-serif;font-size:clamp(28px,4vw,44px);font-weight:700;letter-spacing:-0.025em;color:#FFFFFF;line-height:1.1;max-width:600px}

        /* ── ALTERNATING SECTION BACKGROUND ── */
        .sec-band{background:#FFFFFF;border:1px solid #E6EBF1;border-radius:20px;padding:48px 40px;margin-top:24px;box-shadow:0 1px 3px rgba(50,50,93,0.04)}

        /* Mobile imagery */
        @media(max-width:768px){
          .hero-photo-wrap{aspect-ratio:16/10;border-radius:14px}
          .hero-mock{margin-top:-50px;max-width:calc(100% - 24px);border-radius:10px}
          .section-hero{aspect-ratio:5/3;border-radius:14px}
          .section-hero-overlay{padding:0 24px}
          .section-hero-title{font-size:clamp(20px,5vw,28px)}
          .section-hero-tag{font-size:10px;margin-bottom:6px}
          .sec-band{padding:32px 22px;border-radius:14px}
        }


        /* ── AI DIAGNOSTIC — LOADING ── */
        @keyframes pulseRing{0%{transform:scale(0.7);opacity:0.8}100%{transform:scale(1.6);opacity:0}}
        @keyframes stepFade{0%,40%{opacity:0.35;transform:translateX(-4px)}50%,90%{opacity:1;transform:translateX(0)}100%{opacity:0.35;transform:translateX(-4px)}}
        .diag-analyzing{max-width:560px;margin:0 auto;background:#FFFFFF;border:1px solid #E6EBF1;border-radius:20px;padding:56px 40px;text-align:center;box-shadow:0 4px 12px rgba(50,50,93,0.06)}
        .ai-pulse{position:relative;width:80px;height:80px;margin:0 auto 24px;display:flex;align-items:center;justify-content:center}
        .ai-pulse-ring{position:absolute;inset:0;border-radius:50%;background:radial-gradient(circle,rgba(99,91,255,0.35) 0%,rgba(99,91,255,0) 70%);animation:pulseRing 2.2s ease-out infinite}
        .ai-pulse-ring.d2{animation-delay:1.1s}
        .ai-pulse-core{width:56px;height:56px;border-radius:14px;background:linear-gradient(135deg,#635BFF 0%,#5046E5 100%);display:flex;align-items:center;justify-content:center;font-size:24px;box-shadow:0 8px 24px rgba(99,91,255,0.45),0 0 0 1px rgba(255,255,255,0.15) inset;position:relative;z-index:1}
        .analyzing-title{font-family:'Inter',sans-serif;font-size:20px;font-weight:700;color:#0A2540;letter-spacing:-0.02em;margin-bottom:10px}
        .analyzing-sub{color:#697386;font-size:14px;line-height:1.6;max-width:420px;margin:0 auto 28px}
        .analyzing-steps{display:flex;flex-direction:column;gap:10px;max-width:280px;margin:0 auto;text-align:left}
        .analyzing-step{font-size:13px;color:#425466;font-weight:500;display:flex;align-items:center;gap:10px;animation:stepFade 2s ease-in-out infinite}
        .analyzing-dot{width:6px;height:6px;border-radius:50%;background:#635BFF;flex-shrink:0;box-shadow:0 0 6px rgba(99,91,255,0.5)}

        /* ── AI BADGE ── */
        .ai-badge{display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border-radius:100px;background:linear-gradient(135deg,rgba(99,91,255,0.10) 0%,rgba(122,115,255,0.05) 100%);border:1px solid rgba(99,91,255,0.20);font-size:11px;font-weight:700;color:#635BFF;letter-spacing:0.05em;text-transform:uppercase}

        /* ── AI STRENGTHS / WEAKNESSES GRID ── */
        .ai-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:24px}
        .ai-card{background:#FFFFFF;border:1px solid #E6EBF1;border-radius:16px;padding:24px;box-shadow:0 1px 3px rgba(50,50,93,0.04);text-align:left}
        .ai-card-head{display:flex;align-items:center;gap:10px;margin-bottom:14px}
        .ai-card-icon{width:28px;height:28px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:800;flex-shrink:0}
        .ai-card h4{font-family:'Inter',sans-serif;font-size:14px;font-weight:700;color:#0A2540;letter-spacing:-0.01em;margin:0}
        .ai-card ul{list-style:none;padding:0;display:flex;flex-direction:column;gap:8px}
        .ai-card li{font-size:13.5px;color:#425466;line-height:1.55;padding-left:14px;position:relative}
        .ai-card-strength li::before{content:'';position:absolute;left:0;top:9px;width:6px;height:6px;border-radius:50%;background:#00A865}
        .ai-card-weakness li::before{content:'';position:absolute;left:0;top:9px;width:6px;height:6px;border-radius:50%;background:#FF6B2C}

        /* ── AI PRIORITIES ── */
        /* ── GRANT RECO BADGE + REASON ── */
        .grant-reco-badge{display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border-radius:100px;background:linear-gradient(135deg,#635BFF 0%,#5046E5 100%);color:#FFFFFF;font-size:10.5px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;margin-bottom:12px;box-shadow:0 3px 10px rgba(99,91,255,0.30);align-self:flex-start}
        .grant-reason{display:flex;align-items:flex-start;gap:8px;padding:10px 12px;background:rgba(99,91,255,0.05);border:1px solid rgba(99,91,255,0.18);border-radius:8px;margin-bottom:14px;font-size:12px;color:#0A2540;line-height:1.5}
        .grant-reason-icon{color:#635BFF;font-weight:800;flex-shrink:0;margin-top:1px}
        .grant-reason strong{color:#635BFF;font-weight:700}

        /* ── AI PLAN BANNER ── */
        .ai-plan-banner{display:flex;align-items:center;gap:14px;padding:16px 20px;margin-bottom:20px;background:linear-gradient(135deg,rgba(99,91,255,0.08) 0%,rgba(122,115,255,0.04) 100%);border:1px solid rgba(99,91,255,0.18);border-radius:12px;box-shadow:0 1px 3px rgba(99,91,255,0.06)}
        .ai-plan-banner-icon{width:38px;height:38px;border-radius:10px;background:linear-gradient(135deg,#635BFF,#5046E5);color:#FFFFFF;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;box-shadow:0 4px 12px rgba(99,91,255,0.30)}
        .ai-plan-banner-text{flex:1}
        .ai-plan-banner-title{font-family:'Inter',sans-serif;font-size:14.5px;font-weight:700;color:#0A2540;letter-spacing:-0.01em;margin-bottom:2px}
        .ai-plan-banner-sub{font-size:12.5px;color:#697386;line-height:1.4}
        @media(max-width:600px){.ai-plan-banner{padding:14px;gap:12px}.ai-plan-banner-icon{width:32px;height:32px;font-size:16px}.ai-plan-banner-title{font-size:13.5px}.ai-plan-banner-sub{font-size:12px}}
        .ai-priorities{margin-top:24px;background:#FFFFFF;border:1px solid #E6EBF1;border-radius:16px;padding:32px;box-shadow:0 1px 3px rgba(50,50,93,0.04)}
        .ai-section-title{font-family:'Inter',sans-serif;font-size:18px;font-weight:700;color:#0A2540;letter-spacing:-0.02em;margin-bottom:20px;text-align:left}
        .ai-priorities-list{display:flex;flex-direction:column;gap:14px}
        .ai-priority{display:flex;gap:14px;align-items:flex-start;padding:18px;background:#FAFBFD;border:1px solid #E6EBF1;border-radius:12px;text-align:left;transition:all 0.18s ease}
        .ai-priority:hover{border-color:#635BFF;background:#FFFFFF;box-shadow:0 4px 12px rgba(99,91,255,0.08)}
        .ai-priority-num{width:32px;height:32px;border-radius:8px;background:linear-gradient(135deg,#635BFF,#5046E5);color:#FFFFFF;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;flex-shrink:0;box-shadow:0 2px 6px rgba(99,91,255,0.25)}
        .ai-priority-head{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:6px;flex-wrap:wrap}
        .ai-priority h5{font-family:'Inter',sans-serif;font-size:14.5px;font-weight:700;color:#0A2540;letter-spacing:-0.01em;margin:0}
        .ai-priority p{font-size:13px;color:#425466;line-height:1.6;margin:0}
        .ai-impact{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;padding:3px 9px;border-radius:100px;flex-shrink:0}
        .ai-impact-high{background:rgba(226,92,92,0.10);color:#D63B3B;border:1px solid rgba(226,92,92,0.25)}
        .ai-impact-medium{background:rgba(255,138,76,0.10);color:#FF6B2C;border:1px solid rgba(255,138,76,0.25)}
        .ai-impact-low{background:rgba(0,168,101,0.10);color:#00A865;border:1px solid rgba(0,168,101,0.25)}

        /* ── AI NEXT ACTION ── */
        .ai-next{margin-top:24px;background:linear-gradient(135deg,#635BFF 0%,#5046E5 100%);border-radius:16px;padding:28px 32px;color:#FFFFFF;text-align:left;box-shadow:0 8px 24px rgba(99,91,255,0.25);position:relative;overflow:hidden}
        .ai-next::before{content:'';position:absolute;top:-40%;right:-10%;width:200px;height:200px;background:radial-gradient(circle,rgba(255,255,255,0.18) 0%,transparent 60%);pointer-events:none}
        .ai-next-tag{font-size:11px;font-weight:700;letter-spacing:0.10em;text-transform:uppercase;color:rgba(255,255,255,0.85);margin-bottom:8px}
        .ai-next p{font-size:15px;line-height:1.6;color:#FFFFFF;margin:0;font-weight:500;position:relative;z-index:1}

        /* Mobile */
        @media(max-width:768px){
          .diag-analyzing{padding:40px 24px}
          .analyzing-title{font-size:17px}
          .analyzing-sub{font-size:13px}
          .ai-grid{grid-template-columns:1fr;gap:12px}
          .ai-card{padding:20px}
          .ai-priorities{padding:24px 20px}
          .ai-priority{padding:16px;flex-direction:column;gap:10px}
          .ai-priority-num{width:28px;height:28px;font-size:13px}
          .ai-next{padding:22px 22px}
          .ai-next p{font-size:14px}
        }


        /* ── MISSION SECTION ── */
        .mission-section{padding:96px 0 64px;text-align:center;border-top:1px solid #E6EBF1;margin-top:32px;position:relative}
        .mission-section::before{content:'';position:absolute;top:0;left:50%;transform:translateX(-50%);width:60px;height:1px;background:linear-gradient(90deg,transparent,#635BFF,transparent)}
        .mission-label{font-family:'Plus Jakarta Sans','Inter',sans-serif;font-size:11.5px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#635BFF;margin-bottom:20px;display:inline-flex;align-items:center;gap:8px}
        .mission-label::before,.mission-label::after{content:'';width:18px;height:1px;background:rgba(99,91,255,0.4)}
        .mission-title{font-family:'Plus Jakarta Sans','Inter',sans-serif;font-size:clamp(28px,4.5vw,44px);font-weight:700;line-height:1.2;letter-spacing:-0.025em;color:#0A2540;max-width:780px;margin:0 auto 44px;background:linear-gradient(135deg,#0A2540 0%,#635BFF 100%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
        .mission-points{display:flex;flex-direction:column;gap:14px;margin-bottom:36px;max-width:640px;margin-left:auto;margin-right:auto}
        .mission-point{font-family:'Inter',sans-serif;font-size:clamp(17px,2.5vw,22px);font-weight:500;color:#425466;letter-spacing:-0.015em;line-height:1.45}
        .mission-point span{background:linear-gradient(135deg,#635BFF 0%,#5046E5 100%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;font-weight:800}
        .mission-tagline{font-family:'Plus Jakarta Sans','Inter',sans-serif;font-size:12px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#697386;display:inline-block;padding:9px 22px;background:#FFFFFF;border:1px solid #E6EBF1;border-radius:100px;margin-top:8px;box-shadow:0 1px 3px rgba(50,50,93,0.04)}
        @media(max-width:768px){
          .mission-section{padding:56px 0 40px;margin-top:24px}
          .mission-title{margin-bottom:28px}
          .mission-points{gap:10px;margin-bottom:24px}
          .mission-tagline{font-size:11px;padding:8px 18px;letter-spacing:0.14em}
        }

        /* ── HOW IT WORKS ── */
        .hiw-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:8px}
        .hiw-card{position:relative;background:#FFFFFF;border:1px solid #E6EBF1;border-radius:16px;padding:32px 28px;text-align:left;box-shadow:0 1px 3px rgba(50,50,93,0.04);transition:all 0.2s ease}
        .hiw-card:hover{transform:translateY(-3px);box-shadow:0 12px 30px rgba(99,91,255,0.10)}
        .hiw-icon{width:52px;height:52px;border-radius:14px;background:linear-gradient(135deg,rgba(99,91,255,0.12) 0%,rgba(122,115,255,0.06) 100%);border:1px solid rgba(99,91,255,0.15);display:flex;align-items:center;justify-content:center;font-size:26px;margin-bottom:18px}
        .hiw-card h3{font-family:'Inter',sans-serif;font-size:17px;font-weight:700;color:#0A2540;letter-spacing:-0.01em;margin-bottom:8px}
        .hiw-card p{font-size:14px;color:#425466;line-height:1.6}
        .hiw-arrow{display:none}

        /* ── WHY (trust values) ── */
        .why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:8px}
        .why-card{display:flex;gap:14px;align-items:flex-start;background:#FFFFFF;border:1px solid #E6EBF1;border-radius:14px;padding:22px 24px;box-shadow:0 1px 3px rgba(50,50,93,0.04);transition:all 0.2s ease}
        .why-card:hover{border-color:#635BFF;box-shadow:0 8px 20px rgba(99,91,255,0.08)}
        .why-ic{font-size:24px;flex-shrink:0;line-height:1.2}
        .why-card h3{font-family:'Inter',sans-serif;font-size:15px;font-weight:700;color:#0A2540;letter-spacing:-0.01em;margin-bottom:4px}
        .why-card p{font-size:13px;color:#425466;line-height:1.55}

        /* ── FAQ ── */
        .faq-wrap{max-width:780px;margin:0 auto}
        .faq-item{background:#FFFFFF;border:1px solid #E6EBF1;border-radius:12px;margin-bottom:12px;overflow:hidden;transition:all 0.2s ease;box-shadow:0 1px 3px rgba(50,50,93,0.04)}
        .faq-item.open{border-color:#635BFF;box-shadow:0 6px 16px rgba(99,91,255,0.08)}
        .faq-q{width:100%;display:flex;justify-content:space-between;align-items:center;gap:16px;padding:20px 24px;background:transparent;border:none;cursor:pointer;text-align:left;font-family:'Inter',sans-serif;font-size:15.5px;font-weight:600;color:#0A2540;line-height:1.45}
        .faq-q:hover{color:#635BFF}
        .faq-icon{flex-shrink:0;width:24px;height:24px;border-radius:50%;background:rgba(99,91,255,0.08);color:#635BFF;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;transition:transform 0.25s ease}
        .faq-item.open .faq-icon{transform:rotate(45deg)}
        .faq-a{max-height:0;overflow:hidden;transition:max-height 0.3s ease,padding 0.3s ease;padding:0 24px}
        .faq-item.open .faq-a{max-height:320px;padding:0 24px 22px}
        .faq-a p{font-size:14px;color:#425466;line-height:1.7}

        /* ── FINAL CTA ── */
        .final-cta{margin-top:96px;background:linear-gradient(135deg,#635BFF 0%,#5046E5 100%);border-radius:24px;padding:64px 48px;text-align:center;position:relative;overflow:hidden;box-shadow:0 24px 60px -20px rgba(99,91,255,0.45)}
        .final-cta::before{content:'';position:absolute;top:-50%;right:-5%;width:380px;height:380px;background:radial-gradient(circle,rgba(255,255,255,0.16) 0%,transparent 60%);pointer-events:none}
        .final-cta::after{content:'';position:absolute;bottom:-60%;left:-5%;width:380px;height:380px;background:radial-gradient(circle,rgba(255,255,255,0.10) 0%,transparent 60%);pointer-events:none}
        .final-cta h2{font-family:'Inter',sans-serif;font-size:clamp(26px,4vw,40px);font-weight:700;color:#FFFFFF;letter-spacing:-0.025em;margin-bottom:14px;position:relative;z-index:1}
        .final-cta p{font-size:16px;color:rgba(255,255,255,0.9);line-height:1.6;max-width:560px;margin:0 auto 32px;position:relative;z-index:1}
        .final-cta-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;position:relative;z-index:1}
        .btn-w{padding:14px 30px;border-radius:8px;background:#FFFFFF;color:#5046E5;border:none;cursor:pointer;font-family:'Inter',sans-serif;font-size:15px;font-weight:700;transition:all 0.18s ease;box-shadow:0 4px 14px rgba(0,0,0,0.12)}
        .btn-w:hover{transform:translateY(-2px);box-shadow:0 8px 22px rgba(0,0,0,0.18)}
        .btn-ghost{padding:14px 30px;border-radius:8px;background:rgba(255,255,255,0.10);color:#FFFFFF;border:1px solid rgba(255,255,255,0.35);cursor:pointer;font-family:'Inter',sans-serif;font-size:15px;font-weight:600;transition:all 0.18s ease}
        .btn-ghost:hover{background:rgba(255,255,255,0.18);transform:translateY(-2px)}

        @media(max-width:768px){
          .hiw-grid{grid-template-columns:1fr;gap:14px}
          .hiw-card{padding:24px 22px}
          .why-grid{grid-template-columns:1fr;gap:12px}
          .faq-q{font-size:14.5px;padding:16px 18px}
          .faq-item.open .faq-a{max-height:420px}
          .final-cta{margin-top:64px;padding:44px 24px;border-radius:18px}
          .final-cta-btns{flex-direction:column;align-items:stretch;max-width:320px;margin:0 auto}
          .btn-w,.btn-ghost{width:100%}
        }

      `}</style>

      {/* NAV */}
      <header className="nav">
        <div
          style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
          onClick={() => setActiveTab("home")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActiveTab("home"); } }}
          aria-label={lang === "fr" ? "Aller à l'accueil" : "Go to home"}
        >
          <div className="logo-mark" aria-label="NuMérik PME">
            <svg className="logo-svg" viewBox="0 0 24 24" fill="none">
              <defs>
                <linearGradient id="nGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="55%" stopColor="#F5F3FF" />
                  <stop offset="100%" stopColor="#D9D2FF" />
                </linearGradient>
                <linearGradient id="dotGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FFE680" />
                  <stop offset="100%" stopColor="#FFB347" />
                </linearGradient>
              </defs>
              {/* Bold filled "N" with diagonal — premium geometry */}
              <path
                d="M4 21 L4 3 L7.6 3 L16.4 14.5 L16.4 3 L20 3 L20 21 L16.4 21 L7.6 9.5 L7.6 21 Z"
                fill="url(#nGrad)"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="0.3"
                strokeLinejoin="round"
              />
              {/* Ascending accent dot (data point / growth) */}
              <circle className="logo-accent" cx="20" cy="3" r="2.1" fill="url(#dotGrad)" />
              <circle cx="19.4" cy="2.4" r="0.6" fill="#FFFFFF" opacity="0.85" />
            </svg>
          </div>
          <div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: "-0.022em", lineHeight: 1.1, display: "flex", alignItems: "baseline", gap: 4 }}>
              <span style={{ color: "#0A2540" }}>NuMérik</span>
              <span style={{ background: "linear-gradient(135deg,#635BFF 0%,#5046E5 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontWeight: 800 }}>PME</span>
            </div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontSize: 9.5, color: "#697386", letterSpacing: "0.18em", textTransform: "uppercase", marginTop: 2, fontWeight: 600 }}>{t.region}</div>
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
          <button className="nav-lang" onClick={() => { setShowContact(true); setContactStatus(null); }}>
            ✉️ <span className="contact-lbl">{lang === "fr" ? "Contact" : "Contact"}</span>
          </button>
          <button className="nav-lang" onClick={switchLang}>🌐 {t.lang}</button>
        </div>
      </header>

      {/* MOBILE BOTTOM NAV */}
      <nav className="mob-nav">
        <div className="mob-nav-inner">
          {[
            { key: "home",       icon: "🏠", label: lang === "fr" ? "Accueil"    : "Home" },
            { key: "diagnostic", icon: "🔍", label: lang === "fr" ? "Diagnostic" : "Assess" },
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
                <button className="btn-p" onClick={() => setActiveTab("diagnostic")}>{t.hero.cta} →</button>
                <button className="btn-s" onClick={() => setActiveTab("assistant")}>{t.hero.cta2}</button>
              </div>

              {/* HERO IMAGE + DASHBOARD MOCKUP */}
              <div className="hero-visual">
                <div className="hero-photo-wrap">
                  <img
                    className="hero-photo"
                    src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1600&q=80"
                    alt={lang === "fr" ? "Équipe PME en réunion de travail" : "SME team working together"}
                    loading="eager"
                  />
                  <div className="hero-photo-overlay" />
                </div>
                <div className="hero-mock">
                  <div className="mock-bar">
                    <span className="mock-dot r" /><span className="mock-dot y" /><span className="mock-dot g" />
                    <div className="mock-url">numerikpme.ca/dashboard</div>
                  </div>
                  <div className="mock-body">
                    {[
                      { lbl: lang === "fr" ? "Maturité" : "Maturity", val: "78%", w: "78%" },
                      { lbl: lang === "fr" ? "Subventions" : "Grants", val: "$125K", w: "62%" },
                      { lbl: lang === "fr" ? "Productivité" : "Productivity", val: "+22%", w: "84%" },
                      { lbl: "ROI", val: "3.2x", w: "70%" },
                    ].map((m) => (
                      <div key={m.lbl} className="mock-stat">
                        <div className="mock-stat-lbl">{m.lbl}</div>
                        <div className="mock-stat-val">{m.val}</div>
                        <div className="mock-stat-bar"><div className="mock-stat-fill" style={{ width: m.w }} /></div>
                      </div>
                    ))}
                    <div className="mock-chart">
                      {[42, 58, 51, 73, 68, 82, 79, 91, 85, 96, 88, 100].map((h, i) => (
                        <div key={i} className="mock-chart-bar" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* MISSION SECTION */}
            <section className="mission-section">
              <span className="mission-label">{t.mission.label}</span>
              <h2 className="mission-title">{t.mission.title}</h2>
              <div className="mission-points">
                <div className="mission-point"><span>{t.mission.point1bold}</span>{t.mission.point1post}</div>
                <div className="mission-point"><span>{t.mission.point2bold}</span>{t.mission.point2post}</div>
                <div className="mission-point"><span>{t.mission.point3bold}</span>{t.mission.point3post}</div>
              </div>
              <div className="mission-tagline">{t.mission.tagline}</div>
            </section>

            {/* TRUST BAND */}
            <div className="trust-band">
              <div className="trust-lbl">
                {lang === "fr" ? "Programmes officiels supportés" : "Official programs supported"}
              </div>
              <div className="trust-logos">
                {["BDC", "ESSOR", "ADRIQ", "IRAP-NRC", "PROMPT", "Réseau PME"].map((name) => (
                  <span key={name} className="trust-item">{name}</span>
                ))}
              </div>
            </div>

            <div className="feat-grid">
              {[
                { key: "diagnostic", icon: "🔍", ac: "#635BFF", title: t.nav.diagnostic, desc: lang === "fr" ? "Évaluez votre niveau numérique en 5 minutes chrono" : "Assess your digital level in 5 minutes" },
                { key: "assistant",  icon: "🤖", ac: "#635BFF", title: t.nav.assistant,  desc: lang === "fr" ? "Posez vos questions 24h/24 à notre IA spécialisée" : "Ask 24/7 questions to our specialized AI" },
                { key: "grants",     icon: "💰", ac: "#635BFF", title: t.nav.subventions, desc: lang === "fr" ? "7 programmes gouvernementaux actifs en 2026" : "7 active government programs in 2026" },
                { key: "plan",       icon: "📋", ac: "#635BFF", title: t.nav.plan,        desc: lang === "fr" ? "Votre feuille de route personnalisée sur 12 mois" : "Your personalized 12-month roadmap" },
              ].map((f) => (
                <div key={f.key} className="feat-card" style={{ "--ac": f.ac }} onClick={() => setActiveTab(f.key)}>
                  <div className="feat-icon">{f.icon}</div>
                  <div style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 17, color: "#0A2540", marginBottom: 8, letterSpacing: "-0.01em" }}>{f.title}</div>
                  <div style={{ fontSize: 14, color: "#425466", lineHeight: 1.55 }}>{f.desc}</div>
                  <div style={{ marginTop: 16, fontSize: 13, fontWeight: 600, color: "#635BFF", display: "inline-flex", alignItems: "center", gap: 4 }}>
                    {lang === "fr" ? "Découvrir" : "Discover"} →
                  </div>
                </div>
              ))}
            </div>

            <div className="stats-row">
              {[
                { v: "+22%", l: lang === "fr" ? "Productivité" : "Productivity", c: "#635BFF" },
                { v: "7",    l: lang === "fr" ? "Programmes actifs" : "Active programs", c: "#635BFF" },
                { v: "500M$",l: lang === "fr" ? "Budget PME Québec" : "Québec SME Budget", c: "#635BFF" },
                { v: "+30%", l: lang === "fr" ? "Prime valorisation" : "Valuation premium", c: "#635BFF" },
              ].map((s) => (
                <div key={s.l} className="stat-c">
                  <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 32, fontWeight: 700, background: "linear-gradient(135deg,#635BFF 0%,#0A2540 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", letterSpacing: "-0.025em" }}>{s.v}</div>
                  <div style={{ fontSize: 12, color: "#697386", marginTop: 6, lineHeight: 1.4, fontWeight: 500 }}>{s.l}</div>
                </div>
              ))}
            </div>

            {/* COMMENT ÇA MARCHE */}
            <section>
              <div className="sec-head">
                <span className="mission-label">{t.howItWorks.label}</span>
                <h2 className="sec-title">{t.howItWorks.title}</h2>
                <p className="sec-sub">{t.howItWorks.subtitle}</p>
              </div>
              <div className="hiw-grid">
                {t.howItWorks.steps.map((s) => (
                  <div key={s.title} className="hiw-card">
                    <div className="hiw-icon">{s.icon}</div>
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: "center", marginTop: 32 }}>
                <button className="btn-p" onClick={() => setActiveTab("diagnostic")}>{t.howItWorks.cta} →</button>
              </div>
            </section>

            {/* POURQUOI NUMÉRIK */}
            <section>
              <div className="sec-head">
                <span className="mission-label">{t.why.label}</span>
                <h2 className="sec-title">{t.why.title}</h2>
              </div>
              <div className="why-grid">
                {t.why.items.map((it) => (
                  <div key={it.title} className="why-card">
                    <span className="why-ic">{it.icon}</span>
                    <div>
                      <h3>{it.title}</h3>
                      <p>{it.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section>
              <div className="sec-head">
                <span className="mission-label">{t.faq.label}</span>
                <h2 className="sec-title">{t.faq.title}</h2>
              </div>
              <div className="faq-wrap">
                {t.faq.items.map((item, i) => (
                  <div key={i} className={`faq-item${openFaq === i ? " open" : ""}`}>
                    <button
                      className="faq-q"
                      onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                      aria-expanded={openFaq === i}
                    >
                      <span>{item.q}</span>
                      <span className="faq-icon">+</span>
                    </button>
                    <div className="faq-a"><p>{item.a}</p></div>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA FINAL */}
            <section className="final-cta">
              <h2>{t.finalCta.title}</h2>
              <p>{t.finalCta.subtitle}</p>
              <div className="final-cta-btns">
                <button className="btn-w" onClick={() => setActiveTab("diagnostic")}>🔍 {t.finalCta.cta}</button>
                <button className="btn-ghost" onClick={() => { setShowContact(true); setContactStatus(null); }}>{t.finalCta.cta2}</button>
              </div>
            </section>
          </div>
        )}

        {/* DIAGNOSTIC */}
        {activeTab === "diagnostic" && (
          <div className="fade-up">
            <div className="section-hero" style={{ marginTop: 32 }}>
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80" alt={lang === "fr" ? "Analyse de données et tableaux de bord" : "Data analysis dashboard"} loading="lazy" />
              <div className="section-hero-overlay">
                <div>
                  <div className="section-hero-tag">{lang === "fr" ? "Évaluation gratuite" : "Free assessment"}</div>
                  <div className="section-hero-title">{lang === "fr" ? "Mesurez votre maturité numérique en 5 minutes" : "Measure your digital maturity in 5 minutes"}</div>
                </div>
              </div>
            </div>
            <div className="sec-head">
              <h2 className="sec-title">{t.diagnostic.title}</h2>
              <p className="sec-sub">{t.diagnostic.subtitle}</p>
            </div>

            {diagAnalyzing ? (
              <div className="diag-analyzing">
                <div className="ai-pulse">
                  <div className="ai-pulse-ring" />
                  <div className="ai-pulse-ring d2" />
                  <div className="ai-pulse-core">⚡</div>
                </div>
                <h3 className="analyzing-title">
                  {lang === "fr" ? "Analyse personnalisée en cours" : "Personalized analysis in progress"}
                </h3>
                <p className="analyzing-sub">
                  {lang === "fr"
                    ? "Notre IA Claude analyse vos réponses pour générer un rapport adapté à votre PME…"
                    : "Our Claude AI is analyzing your responses to generate a report tailored to your SME…"}
                </p>
                <div className="analyzing-steps">
                  {(lang === "fr"
                    ? ["Évaluation de la maturité", "Identification des forces", "Recommandations sur mesure", "Sélection des subventions"]
                    : ["Maturity assessment", "Strengths identification", "Tailored recommendations", "Grant selection"]
                  ).map((s, i) => (
                    <div key={s} className="analyzing-step" style={{ animationDelay: `${i * 0.3}s` }}>
                      <span className="analyzing-dot" />{s}
                    </div>
                  ))}
                </div>
              </div>
            ) : !diagResult ? (
              <div className="diag-card">
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ color: "#697386", fontSize: 12 }}>{t.diagnostic.step} {diagStep + 1} {t.diagnostic.of} {t.diagnostic.questions.length}</span>
                  <span style={{ color: "#635BFF", fontSize: 12, fontWeight: 600 }}>{Math.round(((diagStep + 1) / t.diagnostic.questions.length) * 100)}%</span>
                </div>
                <div style={{ display: "flex", gap: 5, marginBottom: 24 }}>
                  {t.diagnostic.questions.map((_, i) => (
                    <div key={i} style={{ height: 4, flex: 1, borderRadius: 2, background: i <= diagStep ? "linear-gradient(90deg,#635BFF,#7A73FF)" : "#E6EBF1", transition: "background 0.3s" }} />
                  ))}
                </div>
                <h3 style={{ fontFamily: "'Inter',sans-serif", fontSize: 17, fontWeight: 600, lineHeight: 1.45, marginBottom: 22 }}>{t.diagnostic.questions[diagStep].q}</h3>
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
              <div style={{ maxWidth: 820, margin: "0 auto" }}>
                {/* SCORE BLOCK */}
                <div style={{ background: "#FFFFFF", border: "1px solid #E6EBF1", borderRadius: 20, padding: 40, textAlign: "center", boxShadow: "0 4px 12px rgba(50,50,93,0.06)" }}>
                  {diagResult.ai && (
                    <div className="ai-badge">
                      <span>⚡</span> {lang === "fr" ? "Analyse IA personnalisée" : "Personalized AI analysis"}
                    </div>
                  )}
                  <p style={{ color: "#697386", fontSize: 13, marginBottom: 16, marginTop: diagResult.ai ? 12 : 0 }}>{t.diagnostic.resultTitle}</p>
                  <svg width="160" height="160" viewBox="0 0 160 160" style={{ margin: "0 auto 20px", display: "block" }}>
                    <circle cx="80" cy="80" r="65" fill="none" stroke="#E6EBF1" strokeWidth="10" />
                    <circle cx="80" cy="80" r="65" fill="none" stroke={scoreColor} strokeWidth="10"
                      strokeDasharray={`${2 * Math.PI * 65}`}
                      strokeDashoffset={`${2 * Math.PI * 65 * (1 - diagResult.score / 100)}`}
                      strokeLinecap="round" transform="rotate(-90 80 80)" className="score-ring"
                      style={{ filter: `drop-shadow(0 4px 8px ${scoreColor}33)` }} />
                    <text x="80" y="76" textAnchor="middle" fill="#0A2540" fontSize="30" fontWeight="700" fontFamily="Inter">{diagResult.score}%</text>
                    <text x="80" y="96" textAnchor="middle" fill="#697386" fontSize="11" fontFamily="Inter">{t.diagnostic.levels[diagResult.level]}</text>
                  </svg>
                  <p style={{ color: "#425466", fontSize: 14.5, lineHeight: 1.65, maxWidth: 560, margin: "0 auto 28px" }}>
                    {diagResult.ai && diagResult.summary ? diagResult.summary : t.diagnostic.levelDesc[diagResult.level]}
                  </p>
                  <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                    <button className="btn-p" style={{ fontSize: 13, background: "linear-gradient(135deg,#FF8A4C 0%,#FF5F3D 100%)" }} onClick={() => { setShowInscription(true); setInscStatus(null); }}>
                      📧 {lang === "fr" ? "Recevoir mon rapport complet" : "Get my full report"}
                    </button>
                  </div>
                </div>

                {/* ESTIMATION DU FINANCEMENT POTENTIEL */}
                {personalizedGrants && fundingEstimate > 0 && (
                  <div style={{
                    marginTop: 24, borderRadius: 20, padding: "32px 36px", textAlign: "center",
                    background: "linear-gradient(135deg,#00A865 0%,#00875A 100%)", color: "#FFFFFF",
                    boxShadow: "0 12px 30px -10px rgba(0,168,101,0.45)", position: "relative", overflow: "hidden"
                  }}>
                    <div style={{ position: "absolute", top: "-40%", right: "-5%", width: 240, height: 240, background: "radial-gradient(circle,rgba(255,255,255,0.16) 0%,transparent 60%)", pointerEvents: "none" }} />
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)", marginBottom: 10, position: "relative" }}>
                      💰 {t.diagnostic.estimationTitle}
                    </div>
                    <div style={{ fontFamily: "'Inter',sans-serif", fontWeight: 800, letterSpacing: "-0.03em", fontSize: "clamp(34px,6vw,52px)", lineHeight: 1.05, marginBottom: 8, position: "relative" }}>
                      {t.diagnostic.estimationUpTo}{" "}
                      {lang === "fr"
                        ? `${fundingEstimate.toLocaleString("fr-CA")} $`
                        : `$${fundingEstimate.toLocaleString("en-CA")}`}
                    </div>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.92)", lineHeight: 1.55, maxWidth: 480, margin: "0 auto 18px", position: "relative" }}>
                      {t.diagnostic.estimationSub}
                    </p>
                    <button className="btn-w" style={{ color: "#00875A", position: "relative" }} onClick={() => setActiveTab("grants")}>
                      💰 {t.diagnostic.viewGrants} →
                    </button>
                    <p style={{ fontSize: 10.5, color: "rgba(255,255,255,0.75)", lineHeight: 1.5, maxWidth: 460, margin: "14px auto 0", position: "relative" }}>
                      {t.diagnostic.estimationFoot}
                    </p>
                  </div>
                )}

                {/* AI: Strengths + Weaknesses */}
                {diagResult.ai && (diagResult.strengths.length > 0 || diagResult.weaknesses.length > 0) && (
                  <div className="ai-grid">
                    {diagResult.strengths.length > 0 && (
                      <div className="ai-card ai-card-strength">
                        <div className="ai-card-head">
                          <span className="ai-card-icon" style={{ background: "rgba(0,168,101,0.10)", color: "#00A865" }}>✓</span>
                          <h4>{lang === "fr" ? "Vos forces" : "Your strengths"}</h4>
                        </div>
                        <ul>
                          {diagResult.strengths.map((s, i) => <li key={i}>{s}</li>)}
                        </ul>
                      </div>
                    )}
                    {diagResult.weaknesses.length > 0 && (
                      <div className="ai-card ai-card-weakness">
                        <div className="ai-card-head">
                          <span className="ai-card-icon" style={{ background: "rgba(255,138,76,0.12)", color: "#FF6B2C" }}>!</span>
                          <h4>{lang === "fr" ? "Axes d'amélioration" : "Areas to improve"}</h4>
                        </div>
                        <ul>
                          {diagResult.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* AI: Priorities */}
                {diagResult.ai && diagResult.priorities.length > 0 && (
                  <div className="ai-priorities">
                    <h3 className="ai-section-title">
                      🎯 {lang === "fr" ? "Vos priorités recommandées" : "Your recommended priorities"}
                    </h3>
                    <div className="ai-priorities-list">
                      {diagResult.priorities.map((p, i) => (
                        <div key={i} className="ai-priority">
                          <div className="ai-priority-num">{i + 1}</div>
                          <div style={{ flex: 1 }}>
                            <div className="ai-priority-head">
                              <h5>{p.title}</h5>
                              <span className={`ai-impact ai-impact-${(p.impact || "medium").toLowerCase()}`}>
                                {(p.impact || "").toLowerCase() === "high" ? (lang === "fr" ? "Impact élevé" : "High impact")
                                  : (p.impact || "").toLowerCase() === "low" ? (lang === "fr" ? "Impact faible" : "Low impact")
                                  : (lang === "fr" ? "Impact moyen" : "Medium impact")}
                              </span>
                            </div>
                            <p>{p.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* AI: Next action */}
                {diagResult.ai && diagResult.next_action && (
                  <div className="ai-next">
                    <div className="ai-next-tag">
                      ⚡ {lang === "fr" ? "Action immédiate" : "Immediate action"}
                    </div>
                    <p>{diagResult.next_action}</p>
                  </div>
                )}

                {/* CTA buttons */}
                <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginTop: 32 }}>
                  <button className="btn-p" style={{ fontSize: 13 }} onClick={() => setActiveTab("plan")}>📋 {t.diagnostic.viewPlan}</button>
                  <button className="btn-p" style={{ fontSize: 13, background: "linear-gradient(135deg,#00D27A 0%,#00A865 100%)" }} onClick={() => setActiveTab("grants")}>💰 {t.diagnostic.viewGrants}</button>
                  <button className="btn-s" style={{ fontSize: 13 }} onClick={resetDiag}>↺ {lang === "fr" ? "Recommencer" : "Restart"}</button>
                </div>

                {/* INSCRIPTION MODAL */}
                {showInscription && (
                  <div style={{
                    position: "fixed", inset: 0, background: "rgba(10,37,64,0.55)",
                    backdropFilter: "saturate(180%) blur(8px)", zIndex: 1000,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    padding: 20, animation: "fadeUp 0.25s ease"
                  }} onClick={(e) => { if (e.target === e.currentTarget) setShowInscription(false); }}>
                    <div style={{
                      background: "#FFFFFF", border: "1px solid #E6EBF1",
                      borderRadius: 20, padding: 36, maxWidth: 500, width: "100%",
                      maxHeight: "90vh", overflowY: "auto",
                      boxShadow: "0 24px 60px rgba(50,50,93,0.18), 0 8px 24px rgba(50,50,93,0.10)"
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                        <h3 style={{ fontFamily: "'Inter',sans-serif", fontSize: 22, fontWeight: 700, letterSpacing: "-0.5px" }}>
                          {t.inscription.title}
                        </h3>
                        <button onClick={() => setShowInscription(false)} style={{
                          background: "#F6F9FC", border: "1px solid #E6EBF1",
                          color: "#425466", width: 30, height: 30, borderRadius: 8,
                          cursor: "pointer", fontSize: 16, fontFamily: "inherit"
                        }}>✕</button>
                      </div>
                      <p style={{ color: "#425466", fontSize: 13, lineHeight: 1.6, marginBottom: 20 }}>
                        {t.inscription.subtitle}
                      </p>

                      <ul style={{ listStyle: "none", padding: 0, marginBottom: 24, display: "flex", flexDirection: "column", gap: 8 }}>
                        {t.inscription.benefits.map((b, i) => (
                          <li key={i} style={{ fontSize: 13, color: "#425466", display: "flex", alignItems: "center", gap: 8 }}>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>

                      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
                        <input className="chat-in" type="email" placeholder={t.inscription.email}
                          value={inscEmail} onChange={(e) => setInscEmail(e.target.value)} required />
                        <input className="chat-in" type="text" placeholder={t.inscription.nom}
                          value={inscNom} onChange={(e) => setInscNom(e.target.value)} required />
                        <input className="chat-in" type="text" placeholder={t.inscription.entreprise}
                          value={inscEntreprise} onChange={(e) => setInscEntreprise(e.target.value)} />
                      </div>

                      {inscStatus === "success" && (
                        <div style={{ background: "rgba(0,168,101,0.08)", border: "1px solid rgba(0,168,101,0.3)",
                          borderRadius: 10, padding: 12, marginBottom: 14, fontSize: 13, color: "#00A865" }}>
                          {t.inscription.success}
                        </div>
                      )}
                      {inscStatus === "error" && (
                        <div style={{ background: "rgba(255,90,90,0.08)", border: "1px solid rgba(255,90,90,0.3)",
                          borderRadius: 10, padding: 12, marginBottom: 14, fontSize: 13, color: "#E25C5C" }}>
                          {t.inscription.error}
                        </div>
                      )}

                      <button className="btn-p" style={{ width: "100%", padding: "13px", fontSize: 14, marginBottom: 12 }}
                        onClick={submitInscription} disabled={inscLoading}>
                        {inscLoading ? t.inscription.submitting : `✉️ ${t.inscription.submit}`}
                      </button>

                      <p style={{ fontSize: 11, color: "#697386", textAlign: "center", lineHeight: 1.5 }}>
                        🔒 {t.inscription.privacy}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ASSISTANT */}
        {activeTab === "assistant" && (
          <div className="fade-up">
            <div className="section-hero" style={{ marginTop: 32 }}>
              <img src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=1600&q=80" alt={lang === "fr" ? "Intelligence artificielle conversationnelle" : "Conversational AI"} loading="lazy" />
              <div className="section-hero-overlay">
                <div>
                  <div className="section-hero-tag">{lang === "fr" ? "Disponible 24/7" : "Available 24/7"}</div>
                  <div className="section-hero-title">{lang === "fr" ? "Conseils intelligents propulsés par l'IA Claude" : "Intelligent advice powered by Claude AI"}</div>
                </div>
              </div>
            </div>
            <div className="sec-head">
              <h2 className="sec-title">{t.assistant.title}</h2>
              <p className="sec-sub">{t.assistant.subtitle}</p>
            </div>
            <div style={{ maxWidth: 720, margin: "0 auto" }}>
              {/* Status */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, padding: "8px 14px", background: "#FFFFFF", border: "1px solid #E6EBF1", borderRadius: 10 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#00A865", boxShadow: "none" }} />
                <span style={{ fontSize: 11.5, color: "#697386", fontWeight: 500 }}>
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
            <div className="section-hero" style={{ marginTop: 32 }}>
              <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80" alt={lang === "fr" ? "Financement et subventions gouvernementales" : "Government funding and grants"} loading="lazy" />
              <div className="section-hero-overlay">
                <div>
                  <div className="section-hero-tag">{lang === "fr" ? "Programmes 2026" : "2026 Programs"}</div>
                  <div className="section-hero-title">{lang === "fr" ? "Jusqu'à 200 000$ en aide gouvernementale" : "Up to $200,000 in government assistance"}</div>
                </div>
              </div>
            </div>
            <div className="sec-head">
              <h2 className="sec-title">
                {personalizedGrants
                  ? (lang === "fr" ? "Vos subventions personnalisées" : "Your personalized grants")
                  : t.grants.title}
              </h2>
              <p className="sec-sub">
                {personalizedGrants
                  ? (lang === "fr"
                      ? `${personalizedGrants.length} programme${personalizedGrants.length > 1 ? "s" : ""} adapté${personalizedGrants.length > 1 ? "s" : ""} à votre profil PME`
                      : `${personalizedGrants.length} program${personalizedGrants.length > 1 ? "s" : ""} matched to your SME profile`)
                  : t.grants.subtitle}
              </p>
            </div>

            {/* CTA banner if no diagnostic done yet */}
            {!personalizedGrants && (
              <div className="ai-plan-banner" style={{ maxWidth: 720, margin: "0 auto 32px" }}>
                <div className="ai-plan-banner-icon">🔍</div>
                <div className="ai-plan-banner-text">
                  <div className="ai-plan-banner-title">
                    {lang === "fr" ? "Voir uniquement les subventions adaptées à votre PME" : "See only the grants adapted to your SME"}
                  </div>
                  <div className="ai-plan-banner-sub">
                    {lang === "fr"
                      ? "Faites le diagnostic en 5 minutes pour filtrer automatiquement"
                      : "Take the 5-minute diagnostic to filter automatically"}
                  </div>
                </div>
                <button className="btn-p" style={{ fontSize: 12.5, padding: "10px 18px" }} onClick={() => setActiveTab("diagnostic")}>
                  {lang === "fr" ? "Commencer" : "Start"} →
                </button>
              </div>
            )}

            <div className="filter-row">
              {["all","quebec","federal"].map((f) => (
                <button key={f} className={`fpill${grantFilter === f ? " active" : ""}`} onClick={() => setGrantFilter(f)}>
                  {f === "all" ? t.grants.all : f === "quebec" ? `🔵 ${t.grants.quebec}` : `🔴 ${t.grants.federal}`}
                </button>
              ))}
            </div>
            <div className="filter-row" style={{ marginTop: -20 }}>
              {["all","subvention","pret","credit"].map((f) => (
                <button key={f} className={`fpill${supportFilter === f ? " active" : ""}`} onClick={() => setSupportFilter(f)}>
                  {f === "all" ? t.grants.all : t.grants.supportTypes[f]}
                </button>
              ))}
            </div>
            <div className="grants-grid">
              {filteredGrants.map((g) => (
                <div key={g.name} className="grant-card" style={g.priorite === 1 && personalizedGrants ? { borderColor: "#635BFF", boxShadow: "0 4px 14px rgba(99,91,255,0.12)" } : {}}>
                  {g.priorite === 1 && personalizedGrants && (
                    <div className="grant-reco-badge">
                      ⭐ {lang === "fr" ? "Recommandé pour vous" : "Recommended for you"}
                    </div>
                  )}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <h3 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 15, lineHeight: 1.3, flex: 1 }}>{g.name}</h3>
                    <span style={{ marginLeft: 10, flexShrink: 0, padding: "3px 10px", borderRadius: 6, fontSize: 10, fontWeight: 700,
                      background: g.type === "quebec" ? "rgba(99,91,255,0.10)" : "rgba(255,90,90,0.10)",
                      color: g.type === "quebec" ? "#5046E5" : "#D63B3B",
                      border: `1px solid ${g.type === "quebec" ? "rgba(99,91,255,0.25)" : "rgba(255,90,90,0.25)"}` }}>
                      {g.type === "quebec" ? "QC" : "CA"}
                    </span>
                  </div>
                  <p style={{ color: "#697386", fontSize: 11.5, marginBottom: 12 }}>{g.org}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                    {g.support && (() => { const c = supportColor(g.support); return (
                      <span style={{ padding: "3px 10px", borderRadius: 100, fontSize: 10.5, fontWeight: 700, color: c.color, background: c.bg, border: `1px solid ${c.bd}` }}>
                        {t.grants.supportTypes[g.support]}
                      </span>
                    ); })()}
                    {(() => { const s = getGrantStatus(g); return (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 100, fontSize: 10.5, fontWeight: 700, color: s.color, background: s.bg, border: `1px solid ${s.bd}` }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.color }} />{s.label}
                      </span>
                    ); })()}
                  </div>
                  <div style={{ background: "#F6F9FC", borderRadius: 10, padding: "12px 14px", marginBottom: 14 }}>
                    <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 20, fontWeight: 700, color: "#635BFF", letterSpacing: "-0.02em" }}>{g.amount}</div>
                    <div style={{ fontSize: 10.5, color: "#697386", marginTop: 2 }}>{g.coverage}</div>
                  </div>
                  <p style={{ color: "#425466", fontSize: 12.5, lineHeight: 1.65, marginBottom: 14 }}>{g.desc}</p>
                  {g.raison && personalizedGrants && (
                    <div className="grant-reason">
                      <span className="grant-reason-icon">✓</span>
                      <span><strong>{lang === "fr" ? "Pourquoi : " : "Why: "}</strong>{g.raison}</span>
                    </div>
                  )}
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
            <div className="section-hero" style={{ marginTop: 32 }}>
              <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80" alt={lang === "fr" ? "Équipe en planification stratégique" : "Team strategic planning"} loading="lazy" />
              <div className="section-hero-overlay">
                <div>
                  <div className="section-hero-tag">{lang === "fr" ? "Feuille de route 12 mois" : "12-month roadmap"}</div>
                  <div className="section-hero-title">{lang === "fr" ? "Votre transformation, étape par étape" : "Your transformation, step by step"}</div>
                </div>
              </div>
            </div>
            <div className="sec-head">
              <h2 className="sec-title">{t.plan.title}</h2>
              <p className="sec-sub">{t.plan.subtitle}</p>
            </div>
            <div style={{ maxWidth: 700, margin: "0 auto" }}>
              {/* Personalized plan banner if AI diagnostic done */}
              {diagResult && diagResult.ai && diagResult.action_plan && diagResult.action_plan.length > 0 && (
                <div className="ai-plan-banner">
                  <div className="ai-plan-banner-icon">⚡</div>
                  <div className="ai-plan-banner-text">
                    <div className="ai-plan-banner-title">
                      {lang === "fr" ? "Plan personnalisé pour votre PME" : "Personalized plan for your SME"}
                    </div>
                    <div className="ai-plan-banner-sub">
                      {lang === "fr"
                        ? "Généré par IA selon vos réponses au diagnostic"
                        : "AI-generated based on your diagnostic responses"}
                    </div>
                  </div>
                </div>
              )}
              {/* Show AI plan if available, else static plan */}
              {(diagResult && diagResult.ai && diagResult.action_plan && diagResult.action_plan.length > 0
                ? diagResult.action_plan
                : t.plan.phases
              ).map((ph) => (
                <div key={ph.phase} className="phase-block" style={{ borderLeftColor: ph.color || "#635BFF" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                    <span style={{ fontSize: 26 }}>{ph.icon}</span>
                    <div>
                      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: ph.color || "#635BFF" }}>{ph.phase}</span>
                        <span style={{ fontSize: 10.5, color: "#697386", background: "#F6F9FC", padding: "2px 8px", borderRadius: 4 }}>{ph.period}</span>
                      </div>
                      <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, fontWeight: 600, marginTop: 3 }}>{ph.title}</div>
                    </div>
                  </div>
                  {(ph.actions || []).map((a, ai) => (
                    <div key={typeof a === "string" ? a + ai : ai} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: "#425466", padding: "4px 0" }}>
                      <span style={{ color: ph.color || "#635BFF", flexShrink: 0, marginTop: 1 }}>✓</span>
                      <span>{a}</span>
                    </div>
                  ))}
                </div>
              ))}
              {/* CTA if no diagnostic done */}
              {!(diagResult && diagResult.ai) && (
                <div style={{ textAlign: "center", marginTop: 20, padding: 20, background: "#F6F9FC", border: "1px solid #E6EBF1", borderRadius: 12 }}>
                  <p style={{ color: "#425466", fontSize: 13.5, marginBottom: 14 }}>
                    {lang === "fr"
                      ? "💡 Faites le diagnostic pour obtenir un plan 100% personnalisé selon votre PME."
                      : "💡 Take the diagnostic to get a 100% personalized plan for your SME."}
                  </p>
                  <button className="btn-p" style={{ fontSize: 13 }} onClick={() => setActiveTab("diagnostic")}>
                    🔍 {lang === "fr" ? "Commencer le diagnostic" : "Start diagnostic"}
                  </button>
                </div>
              )}
              <div className="impact-grid">
                {t.plan.impacts.map((imp) => (
                  <div key={imp.label} className="impact-card">
                    <div style={{ fontSize: 26 }}>{imp.icon}</div>
                    <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 24, fontWeight: 700, color: "#635BFF", letterSpacing: "-0.5px", margin: "10px 0 4px" }}>{imp.value}</div>
                    <div style={{ fontSize: 10.5, color: "#697386" }}>{imp.label}</div>
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

      {/* CONTACT MODAL */}
      {showContact && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(10,37,64,0.55)",
          backdropFilter: "saturate(180%) blur(8px)", zIndex: 1000,
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 20, animation: "fadeUp 0.25s ease"
        }} onClick={(e) => { if (e.target === e.currentTarget) setShowContact(false); }}>
          <div style={{
            background: "#FFFFFF", border: "1px solid #E6EBF1",
            borderRadius: 20, padding: 36, maxWidth: 500, width: "100%",
            maxHeight: "90vh", overflowY: "auto",
            boxShadow: "0 24px 60px rgba(50,50,93,0.18), 0 8px 24px rgba(50,50,93,0.10)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <h3 style={{ fontFamily: "'Inter',sans-serif", fontSize: 22, fontWeight: 700, letterSpacing: "-0.5px" }}>
                {lang === "fr" ? "Contactez-nous" : "Contact us"}
              </h3>
              <button onClick={() => setShowContact(false)} style={{
                background: "#F6F9FC", border: "1px solid #E6EBF1",
                color: "#425466", width: 30, height: 30, borderRadius: 8,
                cursor: "pointer", fontSize: 16, fontFamily: "inherit"
              }}>✕</button>
            </div>
            <p style={{ color: "#425466", fontSize: 13, lineHeight: 1.6, marginBottom: 20 }}>
              {lang === "fr"
                ? "Une question? Un partenariat? Envoyez-nous un message et nous reviendrons vers vous rapidement."
                : "A question? A partnership? Send us a message and we will get back to you quickly."}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
              <input className="chat-in" type="text"
                placeholder={lang === "fr" ? "Votre nom" : "Your name"}
                value={contactName} onChange={(e) => setContactName(e.target.value)} required />
              <input className="chat-in" type="email"
                placeholder={lang === "fr" ? "Votre email" : "Your email"}
                value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} required />
              <textarea className="chat-in"
                placeholder={lang === "fr" ? "Votre message..." : "Your message..."}
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                rows={4}
                style={{ resize: "vertical", minHeight: 100, fontFamily: "'Inter',sans-serif" }} />
            </div>

            {contactStatus === "success" && (
              <div style={{ background: "rgba(0,168,101,0.08)", border: "1px solid rgba(0,168,101,0.3)",
                borderRadius: 10, padding: 12, marginBottom: 14, fontSize: 13, color: "#00A865" }}>
                {lang === "fr"
                  ? "✅ Message envoyé! Nous vous répondrons rapidement."
                  : "✅ Message sent! We will reply quickly."}
              </div>
            )}
            {contactStatus === "error" && (
              <div style={{ background: "rgba(255,90,90,0.08)", border: "1px solid rgba(255,90,90,0.3)",
                borderRadius: 10, padding: 12, marginBottom: 14, fontSize: 13, color: "#E25C5C" }}>
                {lang === "fr"
                  ? "❌ Veuillez remplir tous les champs."
                  : "❌ Please fill in all fields."}
              </div>
            )}

            <button className="btn-p" style={{ width: "100%", padding: "13px", fontSize: 14, marginBottom: 12 }}
              onClick={submitContact} disabled={contactLoading}>
              {contactLoading
                ? (lang === "fr" ? "Envoi en cours..." : "Sending...")
                : `✉️ ${lang === "fr" ? "Envoyer le message" : "Send message"}`}
            </button>

            <p style={{ fontSize: 11, color: "#697386", textAlign: "center", lineHeight: 1.5 }}>
              {lang === "fr" ? "Ou écrivez-nous directement à " : "Or write to us directly at "}
              <a href="mailto:contact@numerikpme.ca" style={{ color: "#635BFF", textDecoration: "none" }}>
                contact@numerikpme.ca
              </a>
            </p>
          </div>
        </div>
      )}

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="logo-mark" style={{ width: 34, height: 34 }} aria-label="NuMérik PME">
                <svg className="logo-svg" viewBox="0 0 24 24" fill="none">
                  <defs>
                    <linearGradient id="nGradF" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="55%" stopColor="#F5F3FF" />
                      <stop offset="100%" stopColor="#D9D2FF" />
                    </linearGradient>
                    <linearGradient id="dotGradF" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#FFE680" />
                      <stop offset="100%" stopColor="#FFB347" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M4 21 L4 3 L7.6 3 L16.4 14.5 L16.4 3 L20 3 L20 21 L16.4 21 L7.6 9.5 L7.6 21 Z"
                    fill="url(#nGradF)"
                    stroke="rgba(255,255,255,0.35)"
                    strokeWidth="0.3"
                    strokeLinejoin="round"
                  />
                  <circle className="logo-accent" cx="20" cy="3" r="2.1" fill="url(#dotGradF)" />
                  <circle cx="19.4" cy="2.4" r="0.6" fill="#FFFFFF" opacity="0.85" />
                </svg>
              </div>
              <span style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontWeight: 700, fontSize: 17, letterSpacing: "-0.022em", display: "inline-flex", alignItems: "baseline", gap: 4 }}>
                <span style={{ color: "#FFFFFF" }}>NuMérik</span>
                <span style={{ background: "linear-gradient(135deg,#7A73FF 0%,#A89FFF 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontWeight: 800 }}>PME</span>
              </span>
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
              <li><button type="button" className="footer-link" onClick={() => setActiveTab("diagnostic")}>{t.nav.diagnostic}</button></li>
              <li><button type="button" className="footer-link" onClick={() => setActiveTab("assistant")}>{t.nav.assistant}</button></li>
              <li><button type="button" className="footer-link" onClick={() => setActiveTab("grants")}>{t.nav.subventions}</button></li>
              <li><button type="button" className="footer-link" onClick={() => setActiveTab("plan")}>{t.nav.plan}</button></li>
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
            <button type="button" className="footer-link" onClick={() => setActiveTab("legal")}>{lang === "fr" ? "Confidentialité" : "Privacy"}</button>
            <span style={{ color: "#FFFFFF", fontWeight: 500 }}>🇨🇦 {lang === "fr" ? "Fait au Canada" : "Made in Canada"}</span>
          </div>
        </div>
      </footer>

      {/* Vercel Analytics */}
      <Analytics />
    </div>
  );
}
