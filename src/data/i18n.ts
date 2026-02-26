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
    aboutPageDescription:
      "Erfahre mehr über Tristan Germer – Digitalisierung, Prozessgestaltung und Technik-Enthusiast aus München.",
    aboutDegreeLabel: "M.Sc. Technische Kommunikation",
    aboutLocationLabel: "München, Deutschland",
    aboutWhoAmITitle: "Wer bin ich?",
    aboutWhoAmITexts: [
      "Technik hat mich schon immer fasziniert – von den ersten Gehversuchen am Computer bis heute. Was als kindliche Neugier begann, ist über die Jahre zu einer beruflichen Leidenschaft geworden: Ich begleite seit über zehn Jahren Digitalisierungs-, Organisations- und Automatisierungsvorhaben in Verwaltung und Bildung.",
      "Mein Schwerpunkt liegt auf Querschnitts- und Stabsfunktionen, in denen Gestaltung, Analyse und Umsetzung zusammenkommen. Mit einem Master of Science in Technischer Kommunikation und einem Background in Betriebswirtschaft bringe ich eine Kombination aus technischem Verständnis, analytischem Denken und strategischer Perspektive mit.",
      "Abseits des Berufs experimentiere ich gerne mit neuen Technologien – ob Smart Home, Gebäudeautomation oder Vibe Coding. Gerade die Möglichkeit, durch KI-gestützte Entwicklung eigene Ideen umzusetzen, die zuvor schlicht nicht realisierbar waren, begeistert mich.",
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
      "Mich motivieren Gestaltungsfreiheit, systemisches Denken und das gezielte Ausprobieren neuer Lösungsansätze. Aktuell vertiefe ich insbesondere Themen rund um Automatisierung, Systemsteuerung und Gebäudeautomation – mit dem Ziel, technische Steuerungs- und Regelungslogiken auf organisatorische Kontexte zu übertragen.",
    aboutDrivesQuote:
      "Wie lassen sich komplexe Systeme so strukturieren, dass sie verständlich, steuerbar und wirksam werden?",
    aboutWorkStyleTitle: "Arbeitsweise",
    aboutWorkStyleText:
      "Analytisch, strukturiert und nutzerorientiert. Veränderungen begleite ich aktiv durch klare Kommunikation, Schulung und praxisnahe Umsetzung.",
    aboutToolsTitle: "Tools & Zertifizierungen",
    aboutCertificationsLabel: "Zertifizierungen",
    aboutToolsLabel: "Tools & Technologien",
    aboutMottoTitle: "Motto",
    aboutCtaProjects: "Meine Projekte ansehen",
    aboutCtaCv: "Lebenslauf",
  },
  en: {
    // ── CV web page ──
    cvPageTitle: "Curriculum Vitae",
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
    aboutPageDescription:
      "Learn more about Tristan Germer – digitalization, process design and tech enthusiast from Munich.",
    aboutDegreeLabel: "M.Sc. Technical Communication",
    aboutLocationLabel: "Munich, Germany",
    aboutWhoAmITitle: "Who am I?",
    aboutWhoAmITexts: [
      "Technology has always fascinated me — from my very first steps on a computer to this day. What began as childhood curiosity has grown into a professional passion over the years: for more than a decade, I have been driving digitalization, organizational development and automation initiatives in public administration and higher education.",
      "My focus is on cross-functional and staff roles where design, analysis and implementation come together. With a Master of Science in Technical Communication and a background in Business Administration, I bring a combination of technical understanding, analytical thinking and strategic perspective.",
      "Outside of work, I enjoy experimenting with new technologies — whether smart home, building automation or vibe coding. I'm particularly excited by the possibility of turning my own ideas into reality through AI-assisted development — ideas that simply weren't feasible before.",
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
      "I'm motivated by creative freedom, systems thinking and the deliberate exploration of new approaches. Currently, I'm particularly interested in automation, system control and building automation — with the goal of transferring technical control and regulation logic to organizational contexts.",
    aboutDrivesQuote:
      "How can complex systems be structured so that they become understandable, controllable and effective?",
    aboutWorkStyleTitle: "Work style",
    aboutWorkStyleText:
      "Analytical, structured and user-oriented. I actively support change through clear communication, training and hands-on implementation.",
    aboutToolsTitle: "Tools & certifications",
    aboutCertificationsLabel: "Certifications",
    aboutToolsLabel: "Tools & technologies",
    aboutMottoTitle: "Motto",
    aboutCtaProjects: "View my projects",
    aboutCtaCv: "Curriculum Vitae",
  },
} as const;

export function t(lang: Lang) {
  return translations[lang];
}
