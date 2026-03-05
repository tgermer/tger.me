export type Lang = "de" | "en";

// Focus area card styling (shared between languages)
export const focusAreaStyles = [
  {
    icon: "tabler:settings-automation",
    cardClass: "bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800",
    iconBoxClass: "bg-blue-100 dark:bg-blue-900/60",
    iconClass: "text-blue-600 dark:text-blue-400",
  },
  {
    icon: "tabler:sitemap",
    cardClass: "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800",
    iconBoxClass: "bg-indigo-100 dark:bg-indigo-900/60",
    iconClass: "text-indigo-600 dark:text-indigo-400",
  },
  {
    icon: "tabler:chart-bar",
    cardClass: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800",
    iconBoxClass: "bg-emerald-100 dark:bg-emerald-900/60",
    iconClass: "text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: "tabler:shield-check",
    cardClass: "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800",
    iconBoxClass: "bg-amber-100 dark:bg-amber-900/60",
    iconClass: "text-amber-600 dark:text-amber-400",
  },
  {
    icon: "tabler:device-desktop",
    cardClass: "bg-violet-50 dark:bg-violet-950/40 border-violet-200 dark:border-violet-800",
    iconBoxClass: "bg-violet-100 dark:bg-violet-900/60",
    iconClass: "text-violet-600 dark:text-violet-400",
  },
];

const translations = {
  de: {
    // ── CV web page ──
    cvPageTitle: "Lebenslauf",
    cvPageSubtitle: "Berufserfahrung, Ausbildung und Kenntnisse",
    cvPageDescription:
      "Lebenslauf von Tristan Germer – Berufserfahrung, Ausbildung und Kenntnisse.",
    cvPdfHref: "/apply/cv-de.pdf",
    cvExperienceHeading: "Beruflicher Werdegang",
    cvSince: "Seit",
    cvEducationHeading: "Hochschulausbildung",
    cvMajorLabel: "Schwerpunkt:",
    cvFurtherEducationHeading: "Zusatzqualifikationen",
    cvViewCertificate: "Zertifikat ansehen",
    cvProjectsHeading: "Projekte",
    cvSkillsHeading: "Kenntnisse",
    cvReferencesHeading: "Referenzen",

    // ── CV print page ──
    cvPrintPageTitle: "Lebenslauf – Tristan Germer",
    cvPrintPageDescription:
      "Lebenslauf von Tristan Germer – Berufserfahrung, Ausbildung und Kenntnisse.",
    cvPrintBackLabel: "Zurück zum Lebenslauf",
    cvPrintLangSwitchLabel: "English",
    cvPrintPdfHref: "/apply/cv-de.pdf",
    cvPrintDownloadLabel: "PDF herunterladen",
    cvPrintCoverTitle: "Lebenslauf",
    cvPrintBirthdayLabel: "Geburtstag",
    cvPrintLanguagesLabel: "Arbeitssprachen",
    cvPrintResidenceLabel: "Wohnort",
    cvPrintContactLabel: "Kontakt",
    cvPrintOnlineLabel: "Online",
    cvPrintPageHeader: "Tristan Germer | Lebenslauf",
    cvPrintExperienceHeading: "Beruflicher Werdegang",
    cvPrintSince: "Seit",
    cvPrintEducationHeading: "Hochschulausbildung",
    cvPrintMajorLabel: "Schwerpunkt:",
    cvPrintFurtherEducationHeading: "Zusatzqualifikationen",
    cvPrintProjectsHeading: "Projekte",
    cvPrintSkillsHeading: "Kenntnisse",
    cvPrintDateLocale: "de-DE" as const,
    cvPrintLocationPrefix: "München",

    // ── About page ──
    aboutPageTitle: "Über mich",
    aboutPageSubtitle: "Digitalisierung, KI-gestützte Entwicklung und Technik",
    aboutPageDescription:
      "Erfahre mehr über Tristan Germer – Digitalisierung, KI-gestützte Entwicklung und Technik-Enthusiast aus München.",
    aboutDegreeLabel: "M.Sc. Technische Kommunikation\nB.A. Betriebswirtschaftslehre",
    aboutLocationLabel: "München, Deutschland",
    aboutWhoAmITitle: "Wer bin ich?",
    aboutWhoAmITexts: [
      "Technik hat mich schon immer fasziniert – von den ersten Gehversuchen am Computer bis heute. Was als kindliche Neugier begann, ist über die Jahre zu einer beruflichen Leidenschaft geworden: Ich begleite seit über zehn Jahren Digitalisierungs-, Organisations- und Automatisierungsvorhaben in Verwaltung und Bildung.",
      "Mein Schwerpunkt liegt auf Querschnitts- und Stabsfunktionen, in denen Gestaltung, Analyse und Umsetzung zusammenkommen. Mit einem Master of Science in Technischer Kommunikation und einem Background in Betriebswirtschaft bringe ich eine Kombination aus technischem Verständnis, analytischem Denken und strategischer Perspektive mit.",
      "Ich bin ein leidenschaftlicher Problemlöser: Komplexe Herausforderungen systematisch zu durchdringen und pragmatische Lösungen zu finden, treibt mich an. Dabei denke ich immer von der Schnittstelle Produkt und Mensch her – Technik muss für Menschen funktionieren, nicht umgekehrt.",
      "Abseits des Berufs experimentiere ich gerne mit neuen Technologien – ob eigene Web-Apps, Automatisierungen oder Smart-Home-Projekte. Dabei nutze ich KI-gestützte Entwicklung mit Tools wie Claude Code oder ChatGPT Codex, um Ideen schnell greifbar zu machen und durch Prototypen zu validieren – nicht als Ersatz für Fachwissen, sondern als Werkzeug, das mir als Nicht-Programmierer ermöglicht, eigene Konzepte eigenständig umzusetzen.",
    ],
    aboutFocusAreasTitle: "Schwerpunkte",
    aboutFocusAreas: [
      {
        title: "Prozessgestaltung & Automatisierung",
        desc: "Analyse, Einführung und Weiterentwicklung von Workflows und Steuerungslogiken.",
      },
      {
        title: "Querschnitts- & Stabsarbeit",
        desc: "Projektleitung, Koordination, Berechtigungskonzepte, Stakeholder-Management.",
      },
      {
        title: "Transparenz & Steuerung",
        desc: "KPI-Dashboards, Reporting, Datenaufbereitung für Entscheider.",
      },
      {
        title: "Compliance & Qualität",
        desc: "Revisionssichere Archivierung, Qualitätsmanagement.",
      },
      {
        title: "Digitale Systeme etablieren",
        desc: "Release- & Update-Management, Schulungen, Tool-Einführungen.",
      },
    ],
    aboutDrivesTitle: "Mein Antrieb",
    aboutDrivesText:
      "Mich motivieren Gestaltungsfreiheit, systemisches Denken und der Impuls, Ideen schnell greifbar zu machen – durch Prototypen validieren statt endlos planen. Ich bin ein Impulsgeber, der andere gerne mit einbezieht und begeistert. Aktuell fasziniert mich, wie KI-gestützte Entwicklungstools wie Claude Code oder ChatGPT Codex die Art verändern, wie Software entsteht – und mir als Nicht-Programmierer ermöglichen, eigene Ideen eigenständig umzusetzen.",
    aboutDrivesQuote:
      "Die beste Idee nützt nichts, wenn sie im Kopf bleibt – also baue ich sie.",
    aboutWorkStyleTitle: "Arbeitsweise",
    aboutWorkStyleText:
      "Analytisch, strukturiert und nutzerorientiert. Ich brauche den bewussten Wechsel zwischen kreativer Konzeptarbeit und strukturierter Umsetzung – beides braucht seinen Raum, damit gute Ergebnisse entstehen. Veränderungen begleite ich aktiv durch klare Kommunikation, Schulung und praxisnahe Umsetzung.",
    aboutToolsTitle: "Tools & Zertifizierungen",
    aboutCertificationsLabel: "Zertifizierungen",
    aboutToolsLabel: "Berufliche Tools",
    aboutAiToolsLabel: "KI-gestützte Projektarbeit",
    aboutMottoTitle: "Motto",
    aboutCtaProjects: "Meine Projekte ansehen",
    aboutCtaCv: "Lebenslauf",
  },
  en: {
    // ── CV web page ──
    cvPageTitle: "Curriculum Vitae",
    cvPageSubtitle: "Work experience, education and skills",
    cvPageDescription:
      "CV of Tristan Germer – Work experience, education and skills.",
    cvPdfHref: "/apply/cv-en.pdf",
    cvExperienceHeading: "Work Experience",
    cvSince: "Since",
    cvEducationHeading: "Education",
    cvMajorLabel: "Focus:",
    cvFurtherEducationHeading: "Further Education",
    cvViewCertificate: "View certificate",
    cvProjectsHeading: "Projects",
    cvSkillsHeading: "Skills",
    cvReferencesHeading: "References",

    // ── CV print page ──
    cvPrintPageTitle: "CV – Tristan Germer",
    cvPrintPageDescription:
      "Curriculum Vitae of Tristan Germer – Experience, Education, and Skills.",
    cvPrintBackLabel: "Back to CV",
    cvPrintLangSwitchLabel: "Deutsch",
    cvPrintPdfHref: "/apply/cv-en.pdf",
    cvPrintDownloadLabel: "Download PDF",
    cvPrintCoverTitle: "Curriculum Vitae",
    cvPrintBirthdayLabel: "Date of Birth",
    cvPrintLanguagesLabel: "Working Languages",
    cvPrintResidenceLabel: "Residence",
    cvPrintContactLabel: "Contact",
    cvPrintOnlineLabel: "Online",
    cvPrintPageHeader: "Tristan Germer | CV",
    cvPrintExperienceHeading: "Professional Experience",
    cvPrintSince: "Since",
    cvPrintEducationHeading: "University Education",
    cvPrintMajorLabel: "Major:",
    cvPrintFurtherEducationHeading: "Additional Qualifications",
    cvPrintProjectsHeading: "Projects",
    cvPrintSkillsHeading: "Skills",
    cvPrintDateLocale: "en-US" as const,
    cvPrintLocationPrefix: "Munich",

    // ── About page ──
    aboutPageTitle: "About me",
    aboutPageSubtitle: "Digitalization, AI-assisted development and technology",
    aboutPageDescription:
      "Learn more about Tristan Germer – digitalization, AI-assisted development and tech enthusiast from Munich.",
    aboutDegreeLabel: "M.Sc. Technical Communication\nB.A. Business Administration",
    aboutLocationLabel: "Munich, Germany",
    aboutWhoAmITitle: "Who am I?",
    aboutWhoAmITexts: [
      "Technology has always fascinated me — from my very first steps on a computer to this day. What began as childhood curiosity has grown into a professional passion over the years: for more than a decade, I have been driving digitalization, organizational development and automation initiatives in public administration and higher education.",
      "My focus is on cross-functional and staff roles where design, analysis and implementation come together. With a Master of Science in Technical Communication and a background in Business Administration, I bring a combination of technical understanding, analytical thinking and strategic perspective.",
      "I'm a passionate problem solver: I thrive on systematically breaking down complex challenges and finding pragmatic solutions. I always think from the product–human interface — technology should work for people, not the other way around.",
      "Outside of work, I enjoy experimenting with new technologies — whether my own web apps, automations or smart home projects. I use AI-assisted development with tools like Claude Code or ChatGPT Codex to quickly make ideas tangible and validate them through prototypes — not as a substitute for expertise, but as a tool that enables me as a non-programmer to independently bring my own concepts to life.",
    ],
    aboutFocusAreasTitle: "Focus areas",
    aboutFocusAreas: [
      {
        title: "Process design & automation",
        desc: "Analysis, implementation and continuous improvement of workflows and control logic.",
      },
      {
        title: "Cross-functional & staff roles",
        desc: "Project management, coordination, authorization concepts, stakeholder management.",
      },
      {
        title: "Transparency & governance",
        desc: "KPI dashboards, reporting, data preparation for decision-makers.",
      },
      {
        title: "Compliance & quality",
        desc: "Audit-proof archiving, quality management.",
      },
      {
        title: "Establishing digital systems",
        desc: "Release & update management, training, tool rollouts.",
      },
    ],
    aboutDrivesTitle: "What drives me",
    aboutDrivesText:
      "I'm motivated by creative freedom, systems thinking and the urge to make ideas tangible quickly — validate through prototypes rather than plan endlessly. I enjoy inspiring others and bringing them along on the journey. What fascinates me right now is how AI-powered development tools like Claude Code or ChatGPT Codex are changing the way software is built — and how they enable me as a non-programmer to independently turn my own ideas into reality.",
    aboutDrivesQuote:
      "The best idea is worthless if it stays in your head — so I build it.",
    aboutWorkStyleTitle: "Work style",
    aboutWorkStyleText:
      "Analytical, structured and user-oriented. I need the deliberate balance between creative conceptual work and structured execution — both need their space for great results to emerge. I actively support change through clear communication, training and hands-on implementation.",
    aboutToolsTitle: "Tools & certifications",
    aboutCertificationsLabel: "Certifications",
    aboutToolsLabel: "Professional tools",
    aboutAiToolsLabel: "AI-assisted project work",
    aboutMottoTitle: "Motto",
    aboutCtaProjects: "View my projects",
    aboutCtaCv: "Curriculum Vitae",
  },
} as const;

export function t(lang: Lang) {
  return translations[lang];
}
