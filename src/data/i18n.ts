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
    cvPageSubtitle: "Digitale Systeme, Automatisierung und KI-gestützte Prototypen",
    cvPageDescription:
      "Lebenslauf von Tristan Germer – digitale Systeme, Automatisierung, Prozessgestaltung und KI-gestützte Prototypen.",
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
    cvOverviewNote: "Dies ist ein kompakter Überblick meines beruflichen Werdegangs. Für eine ausführliche Version {contactLink}.",
    cvOverviewNoteLink: "kontaktieren Sie mich gerne",

    // ── CV print page ──
    cvPrintPageTitle: "Lebenslauf – Tristan Germer",
    cvPrintPageDescription:
      "Lebenslauf von Tristan Germer – digitale Systeme, Automatisierung, Prozessgestaltung und KI-gestützte Prototypen.",
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
    cvPrintInterestsHeading: "Interessen",
    cvPrintDateLocale: "de-DE" as const,
    cvPrintLocationPrefix: "München",

    // ── About page ──
    aboutPageTitle: "Über mich",
    aboutPageSubtitle: "Digitale Systeme, Automatisierung und KI-gestützte Prototypen",
    aboutPageDescription:
      "Erfahre mehr über Tristan Germer – digitale Systeme, Automatisierung, Prozessgestaltung und KI-gestützte Prototypen.",
    aboutDegreeLabel: "M.Sc. Technische Kommunikation\nB.A. Betriebswirtschaftslehre",
    aboutLocationLabel: "München, Deutschland",
    aboutWhoAmITitle: "Wer bin ich?",
    aboutWhoAmITexts: [
      "Ich übersetze unklare Prozesse, Ideen und technische Möglichkeiten in funktionierende digitale Systeme. Was als frühe Technikbegeisterung begann, ist über die Jahre zu einer Arbeitsweise geworden: verstehen, strukturieren, greifbar machen und so lange verbessern, bis eine Lösung im Alltag funktioniert.",
      "Seit über zehn Jahren begleite ich Digitalisierungs-, Organisations- und Automatisierungsvorhaben in Verwaltung und Bildung. Mein Schwerpunkt liegt auf Querschnitts- und Stabsfunktionen, in denen Analyse, Kommunikation, Daten, Prozesse und Umsetzung zusammenkommen.",
      "Mit einem Master of Science in Technischer Kommunikation und einem Background in Betriebswirtschaft bringe ich eine Kombination aus technischem Verständnis, analytischem Denken und strategischer Perspektive mit. Ich denke gern von der Schnittstelle Produkt und Mensch her: Technik muss verständlich, nützlich und anschlussfähig sein.",
      "Aktuell nutze ich KI-gestützte Entwicklung mit Tools wie ChatGPT Codex und Claude Code, um Ideen schnell in Prototypen zu verwandeln. Für mich ersetzt KI kein Fachwissen. Sie senkt die Schwelle, aus echten Problemen eigene Werkzeuge zu bauen – vom Bewerbungs-OS über ClearControl bis zu LIFE-EQ.",
    ],
    aboutFocusAreasTitle: "Schwerpunkte",
    aboutFocusAreas: [
      {
        title: "Prozess- & Systemgestaltung",
        desc: "Unklare Abläufe analysieren, strukturieren und in nutzbare digitale Systeme übersetzen.",
      },
      {
        title: "Automatisierung & Workflows",
        desc: "Wiederkehrende Aufgaben, Dokumente und Steuerungslogiken pragmatisch vereinfachen.",
      },
      {
        title: "Daten & Transparenz",
        desc: "Kennzahlen, Reporting und Dashboards so aufbereiten, dass Entscheidungen leichter werden.",
      },
      {
        title: "Qualität & Anschlussfähigkeit",
        desc: "Lösungen so gestalten, dass sie dokumentiert, nachvollziehbar und im Alltag tragfähig sind.",
      },
      {
        title: "KI-gestützte Prototypen",
        desc: "Ideen schnell greifbar machen, testen und aus Rückmeldungen weiterentwickeln.",
      },
    ],
    aboutDrivesTitle: "Mein Antrieb",
    aboutDrivesText:
      "Mich motivieren Gestaltungsfreiheit, systemisches Denken und der Impuls, Ideen schnell greifbar zu machen. Ich arbeite gern dort, wo ein Problem noch unscharf ist, aber genug Reibung erzeugt, dass sich eine bessere Lösung lohnt. Prototypen helfen mir, Annahmen sichtbar zu machen und Gespräche konkreter zu führen.",
    aboutDrivesQuote:
      "Die beste Idee nützt nichts, wenn sie im Kopf bleibt – also baue ich sie.",
    aboutWorkStyleTitle: "Arbeitsweise",
    aboutWorkStyleText:
      "Analytisch, strukturiert und nutzerorientiert. Ich brauche den bewussten Wechsel zwischen kreativer Konzeptarbeit und konzentrierter Umsetzung. Veränderungen begleite ich durch klare Kommunikation, verständliche Dokumentation, Schulung und praxisnahe Einführung.",
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
    cvPageSubtitle: "Digital systems, automation and AI-assisted prototypes",
    cvPageDescription:
      "CV of Tristan Germer – digital systems, automation, process design and AI-assisted prototypes.",
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
    cvOverviewNote: "This is a compact overview of my professional background. For a detailed version, {contactLink}.",
    cvOverviewNoteLink: "feel free to get in touch",

    // ── CV print page ──
    cvPrintPageTitle: "CV – Tristan Germer",
    cvPrintPageDescription:
      "Curriculum Vitae of Tristan Germer – digital systems, automation, process design and AI-assisted prototypes.",
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
    cvPrintInterestsHeading: "Interests",
    cvPrintDateLocale: "en-US" as const,
    cvPrintLocationPrefix: "Munich",

    // ── About page ──
    aboutPageTitle: "About me",
    aboutPageSubtitle: "Digital systems, automation and AI-assisted prototypes",
    aboutPageDescription:
      "Learn more about Tristan Germer – digital systems, automation, process design and AI-assisted prototypes.",
    aboutDegreeLabel: "M.Sc. Technical Communication\nB.A. Business Administration",
    aboutLocationLabel: "Munich, Germany",
    aboutWhoAmITitle: "Who am I?",
    aboutWhoAmITexts: [
      "I translate unclear processes, ideas and technical possibilities into working digital systems. What started as an early fascination with technology has become a way of working: understand, structure, make tangible and keep improving until a solution works in practice.",
      "For more than ten years, I have worked on digitalization, organizational development and automation initiatives in administration and higher education. My focus is on cross-functional and staff roles where analysis, communication, data, processes and implementation come together.",
      "With a Master of Science in Technical Communication and a background in Business Administration, I bring a combination of technical understanding, analytical thinking and strategic perspective. I like to think from the product-human interface: technology needs to be understandable, useful and easy to adopt.",
      "Today I use AI-assisted development with tools such as ChatGPT Codex and Claude Code to turn ideas into prototypes quickly. For me, AI does not replace expertise. It lowers the threshold for building practical tools from real problems, from my application OS to ClearControl and LIFE-EQ.",
    ],
    aboutFocusAreasTitle: "Focus areas",
    aboutFocusAreas: [
      {
        title: "Process & system design",
        desc: "Analyzing unclear workflows, structuring them and translating them into usable digital systems.",
      },
      {
        title: "Automation & workflows",
        desc: "Simplifying recurring tasks, documents and control logic in a pragmatic way.",
      },
      {
        title: "Data & transparency",
        desc: "Preparing metrics, reporting and dashboards so decisions become easier.",
      },
      {
        title: "Quality & adoption",
        desc: "Designing solutions that are documented, traceable and sustainable in everyday use.",
      },
      {
        title: "AI-assisted prototypes",
        desc: "Making ideas tangible quickly, testing them and improving them from feedback.",
      },
    ],
    aboutDrivesTitle: "What drives me",
    aboutDrivesText:
      "I'm motivated by creative freedom, systems thinking and the urge to make ideas tangible quickly. I enjoy working where a problem is still unclear but creates enough friction to make a better solution worthwhile. Prototypes help me make assumptions visible and conversations more concrete.",
    aboutDrivesQuote:
      "The best idea is worthless if it stays in your head — so I build it.",
    aboutWorkStyleTitle: "Work style",
    aboutWorkStyleText:
      "Analytical, structured and user-oriented. I need the deliberate balance between creative conceptual work and focused implementation. I support change through clear communication, understandable documentation, training and hands-on rollout.",
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
