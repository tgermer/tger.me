import type { ExperienceItem, EducationItem, FurtherEducationItem, SkillCategory, Reference, ProjectItem, PersonalData, Language } from "./cv_types";

export const personal: PersonalData = {
    name: "Tristan Germer",
    tagline: "Digitalisierung & Automatisierung | System- & Prozesssteuerung",
    photo: "2025-09-02-portrait.jpg",
    birthdate: "19.10.1981",
    address: "Petrarcastraße 32, 80933 München",
    phone: "+49 151 22651857",
    email: "hello@tger.me",
    location: "München",
    url: "tger.me",
    profiles: [
        { network: "LinkedIn", url: "linkedin.com/in/tgermer" },
        { network: "GitHub", url: "github.com/tgermer" },
    ],
};

export const experience: ExperienceItem[] = [
    {
        name: "Karriereübergang – Digitalisierung & Systemsteuerung",
        location: "",
        typeOfEmployment: "Berufliche Neuorientierung",
        highlights: ["Bewusste berufliche Übergangsphase zur fachlichen Vertiefung und strategischen Neupositionierung.", "Schwerpunkt auf Digitalisierung, Automatisierung und Systemsteuerung in Querschnitts- und Stabsfunktionen.", "Übertragung technischer Automatisierungs- und Steuerungslogiken auf organisatorische Kontexte."],
        startDate: "2025-10-01",
        endDate: "",
    },
    {
        name: "akdb.digitalfabriX GmbH",
        location: "München",
        typeOfEmployment: "Angestellter",
        position: ["Senior Softwareberater DMS"],
        highlights: ["Projektleitung DMS-Einführung", "Anforderungsanalyse & Prozessberatung", "Kundenschulungen & Workshops", "Systemkonfiguration & Berechtigungskonzepte", "Release- und Update-Management"],
        startDate: "2025-03-01",
        endDate: "2025-09-30",
    },
    {
        name: "Bayerische Verwaltungsschule (BVS)",
        url: "www.bvs.de",
        location: "München",
        typeOfEmployment: "Angestellter",
        position: ["Referent Qualitätsmanagement, Controlling und zentrale Steuerungsunterstützung"],
        highlights: ["Weiterentwicklung des zentralen Controllings.", "Überarbeitung des Evaluationssystems, inklusive Integration von Automatisierungen und Effizienzsteigerung des Feedbackprozesses.", "Entwicklung, didaktische Aufbereitung und Durchführung von Schulungsprogrammen (z. B. Confluence, MS Office, evasys)."],
        startDate: "2022-10-01",
        endDate: "2024-12-31",
    },
    {
        name: "Hochschule München (HM)",
        url: "www.hm.edu",
        location: "München",
        typeOfEmployment: "Angestellter",
        position: ["Projektleiter und Produktmanager"],
        highlights: ["Leitung und erfolgreiche Einführung eines DMS (d.velop d3) zur Digitalisierung von Bewerbungs- und Verwaltungsprozessen.", "Gestaltung und Implementierung organisationsweiter Workflows für 14 Fakultäten (>200.000 Dokumente/Jahr) mit Reduktion der Bearbeitungszeit um ca. 30 %.", "Sicherstellung von Compliance durch revisionssichere Archivierung sowie Integration angrenzender Fachverfahren.", "Konzeption von Schulungen, Nutzerunterstützung und Entwicklung von KPI-Dashboards für Steuerung und Transparenz."],
        startDate: "2013-09-15",
        endDate: "2022-09-30",
    },
    {
        name: "weku münchen",
        location: "Hebertshausen",
        typeOfEmployment: "Selbstständiger Verkäufer",
        startDate: "2008-03-01",
        endDate: "2008-12-31",
    },
    {
        name: "Vorwerk Deutschland Stiftung & Co. KG",
        url: "kobold.vorwerk.de",
        location: "München",
        typeOfEmployment: "Selbstständiger Verkäufer",
        position: ["Berater und Verkäufer"],
        startDate: "2004-05-01",
        endDate: "2008-06-30",
    },
    {
        name: "LIDL Vertriebs GmbH & Co. KG",
        url: "www.lidl.de",
        location: "München",
        typeOfEmployment: "Angestellter",
        position: ["Filialleiter-Anwärter/Stellvertreter"],
        startDate: "2003-05-01",
        endDate: "2004-06-30",
    }
];

export const education: EducationItem[] = [
    {
        institution: "Donau-Universität Krems",
        url: "www.donau-uni.ac.at",
        location: "Krems, Österreich",
        startDate: "2016-05-01",
        endDate: "2018-04-30",
        fieldOfStudy: "Technische Kommunikation",
        degree: "Master of Science (MSc)",
        thesis: {
            title: "Methoden der Technischen Dokumentation, angewendet in der Verwaltung von Hochschulen für angewandte Wissenschaften",
            fullTextUrl: "https://permalink.obvsg.at/duk/YC00347036",
        },
    },
    {
        institution: "Hochschule München",
        url: "www.hm.edu",
        location: "München, Deutschland",
        startDate: "2009-03-01",
        endDate: "2013-08-31",
        fieldOfStudy: "Betriebswirtschaft",
        majorFieldOfStudy: "Projektberatung und Projektmanagement",
        degree: "Bachelor of Arts (BA)",
        grade: 2.6,
        thesis: {
            title: "BLENDED LEARNING MIT DEM APPLE IPAD. Einsatzmöglichkeiten und einfache Umsetzungen am Beispiel eines Präsentationstrainings",
            grade: 1.7,
        },
    }
];

export const furtherEducation: FurtherEducationItem[] = [
    {
        institution: "UDACITY",
        url: "www.udacity.com",
        location: "Online",
        startDate: "2024-10-01",
        endDate: "2024-12-04",
        fieldOfStudy: "iOS Development with SwiftUI and SwiftData",
        degree: "Nanodegree",
        certificateUrl: "https://www.udacity.com/certificate/e/50931af6-7ccf-11ef-9b58-8fbb3f4ca5b3",
    },
    {
        institution: "Scrum.org",
        url: "www.scrum.org",
        location: "Online",
        startDate: "2024-08-03",
        endDate: "2024-08-03",
        fieldOfStudy: "Professioneller Scrum Product Owner (PSPO I)",
        certificateUrl: "https://www.scrum.org/certificates/1127252",
    },
    {
        institution: "Scrum.org",
        url: "www.scrum.org",
        location: "Online",
        startDate: "2024-07-07",
        endDate: "2024-07-07",
        fieldOfStudy: "Professioneller Scrum Master (PSM I)",
        certificateUrl: "https://www.scrum.org/certificates/1118704",
    },
    {
        institution: "B-SCT",
        location: "",
        startDate: "2015-07-01",
        endDate: "2015-07-31",
        fieldOfStudy: "Projekte leiten",
    },
    {
        institution: "B-SCT",
        location: "",
        startDate: "2015-06-01",
        endDate: "2015-06-30",
        fieldOfStudy: "Projekte managen",
    }
];

// export const skills: SkillCategory[] = [
//     { category: "Office", items: ["Word", "Excel", "PowerPoint", "Visio", "DMS d.velop d3", "komXwork"] },
//     { category: "Programmierung", items: ["Swift", "JavaScript", "TypeScript"] },
//     { category: "Datenanalyse", items: ["SQL", "Excel (Fortgeschritten)", "MS Power BI"] },
//     { category: "Design", items: ["Adobe Creative Suite (Photoshop, Illustrator, InDesign)", "Affinity Suite (Designer, Photo, Publisher)", "Final Cut Pro X", "Motion"] },
//     { category: "AI & Tools", items: ["Claude Code", "GitHub Copilot", "Prompt Engineering"] },
//,
//,
// ];

export const languages: Language[] = [
    { language: "Deutsch", fluency: "Muttersprache" },
    { language: "Englisch", fluency: "fließend" },
];

export const interests: string[] = [
    "CODING Analytisch & Detailorientiert",
    "TECHNOLOGIE Innovativ & Lernbereit",
    "FITNESS Teamfähigkeit & Ehrgeiz",
    "REISEN Flexibilität & Neugier",
];

export const projects: ProjectItem[] = [
    {
        name: "ClearControl.de – Klarheit für Smart-Home-Steuerungen",
        url: "clearcontrol.de",
        githubUrl: "github.com/tgermer/ha-remote-designer",
        highlights: ["Web-App zum Erstellen professioneller Beschriftungen für Schalter und Fernbedienungen von Smart-Home-Systemen.", "Eigenständige Konzeption und Umsetzung eines produktiven Web-Tools zur Lösung eines konkreten Anwenderproblems.", "Fokus auf UX, Systemlogik, Automatisierung und funktionierende End-to-End-Lösung."],
        date: "2026-01-01",
    }
];

// export const references: Reference[] = [
//     { name: "Pia Hetzel", company: "Hochschule München", department: "Beratung und Immatrikulation", position: "Leitung", email: "pia.hetzel@hm.edu" },
//     { name: "Prof. Dr. Angela Poech", company: "Hochschule München", department: "Fakultät für Betriebswirtschaft", position: "Professor für Entrepreneurship", email: "poech@hm.edu" },
//     { name: "Aria Djamschidi", company: "Apple", position: "Senior Distribution Manager", email: "djamschidi.a@euro.apple.com" },
// ];
