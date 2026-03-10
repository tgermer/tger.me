import type { Work, Education, Certificate, Skill, Reference, Project, Basics, Language, Interest } from "./cv_types";

// IMPORTANT: This file contains intentional non-breaking spaces (U+00A0) for typographic correctness.
// They prevent line breaks at "&", "z. B.", "30 %", "PSM I", etc.
// Do NOT replace them with regular spaces. Verify with: grep -n $'\xc2\xa0' src/data/cv_de.ts

export const basics: Basics = {
    name: "Tristan Germer",
    label: "Digitalisierung & Automatisierung | System- & Prozesssteuerung",
    image: "2025-09-02-landscape.jpg",
    birthdate: "19.10.1981",
    location: {
        address: "Petrarcastraße 32",
        postalCode: "80933",
        city: "München",
    },
    phone: "+49 151 22651857",
    email: "hello@tger.me",
    url: "tger.me",
    profiles: [
        { network: "LinkedIn", url: "linkedin.com/in/tgermer" },
        { network: "GitHub", url: "github.com/tgermer" },
    ],
};

export const work: Work[] = [
    {
        name: "Karriereübergang – Digitalisierung & Systemsteuerung",
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
        highlights: ["Projektleitung DMS-Einführung", "Anforderungsanalyse & Prozessberatung", "Kundenschulungen & Workshops", "Systemkonfiguration & Berechtigungskonzepte", "Release- und Update-Management"],
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
        highlights: ["Leitung und erfolgreiche Einführung eines DMS (d.velop d3) zur Digitalisierung von Bewerbungs- und Verwaltungsprozessen.", "Gestaltung und Implementierung organisationsweiter Workflows für 14 Fakultäten (>200.000 Dokumente/Jahr) mit Reduktion der Bearbeitungszeit um ca. 30 %.", "Sicherstellung von Compliance durch revisionssichere Archivierung sowie Integration angrenzender Fachverfahren.", "Konzeption von Schulungen, Nutzerunterstützung und Entwicklung von KPI-Dashboards für Steuerung und Transparenz."],
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
        name: "Vorwerk Deutschland Stiftung & Co. KG",
        url: "kobold.vorwerk.de",
        location: "München",
        typeOfEmployment: "Selbstständiger Verkäufer",
        position: ["Berater und Verkäufer"],
        startDate: "2004-05-01",
        endDate: "2008-06-30",
    },
    {
        name: "LIDL Vertriebs GmbH & Co. KG",
        url: "www.lidl.de",
        location: "München",
        typeOfEmployment: "Angestellter",
        position: ["Filialleiter-Anwärter/Stellvertreter"],
        startDate: "2003-05-01",
        endDate: "2004-06-30",
    },
];

export const education: Education[] = [
    {
        institution: "Donau-Universität Krems",
        url: "www.donau-uni.ac.at",
        location: "Krems, Österreich",
        startDate: "2016-05-01",
        endDate: "2018-04-30",
        area: "Technische Kommunikation",
        studyType: "Master of Science (MSc)",
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
        area: "Betriebswirtschaft",
        majorFieldOfStudy: "Projektberatung und Projektmanagement",
        studyType: "Bachelor of Arts (BA)",
        score: 2.6,
        thesis: {
            title: "BLENDED LEARNING MIT DEM APPLE IPAD. Einsatzmöglichkeiten und einfache Umsetzungen am Beispiel eines Präsentationstrainings",
            grade: 1.7,
        },
    },
];

export const certificates: Certificate[] = [
    {
        issuer: "UDACITY",
        issuerUrl: "www.udacity.com",
        location: "Online",
        startDate: "2024-10-01",
        endDate: "2024-12-04",
        name: "iOS Development with SwiftUI and SwiftData",
        degree: "Nanodegree",
        url: "https://www.udacity.com/certificate/e/50931af6-7ccf-11ef-9b58-8fbb3f4ca5b3",
    },
    {
        issuer: "Scrum.org",
        issuerUrl: "www.scrum.org",
        location: "Online",
        startDate: "2024-08-03",
        endDate: "2024-08-03",
        name: "Professioneller Scrum Product Owner (PSPO I)",
        url: "https://www.scrum.org/certificates/1127252",
    },
    {
        issuer: "Scrum.org",
        issuerUrl: "www.scrum.org",
        location: "Online",
        startDate: "2024-07-07",
        endDate: "2024-07-07",
        name: "Professioneller Scrum Master (PSM I)",
        url: "https://www.scrum.org/certificates/1118704",
    },
    {
        issuer: "B-SCT",
        location: "",
        startDate: "2015-07-01",
        endDate: "2015-07-31",
        name: "Projekte leiten",
    },
    {
        issuer: "B-SCT",
        location: "",
        startDate: "2015-06-01",
        endDate: "2015-06-30",
        name: "Projekte managen",
    },
];

export const skills: Skill[] = [
    { name: "Office", keywords: ["Word", "Excel", "PowerPoint", "Visio", "DMS d.velop d3", "komXwork"] },
    { name: "Programmierung", keywords: ["Swift", "JavaScript", "TypeScript"] },
    { name: "Datenanalyse", keywords: ["SQL", "Excel (Fortgeschritten)", "MS Power BI"] },
    { name: "Design", keywords: ["Adobe Creative Suite (Photoshop, Illustrator, InDesign)", "Affinity Suite (Designer, Photo, Publisher)", "Final Cut Pro X", "Motion"] },
    { name: "AI & Tools", keywords: ["Claude Code", "GitHub Copilot", "Prompt Engineering"] },
];

export const languages: Language[] = [
    { language: "Deutsch", fluency: "Muttersprache" },
    { language: "Englisch", fluency: "fließend" },
];

export const interests: Interest[] = [
    { name: "Coding", keywords: ["Analytisch", "Detailorientiert"] },
    { name: "Technologie", keywords: ["Innovativ", "Lernbereit"] },
    { name: "Fitness", keywords: ["Teamfähigkeit", "Ehrgeiz"] },
    { name: "Reisen", keywords: ["Flexibilität", "Neugier"] },
];

export const projects: Project[] = [
    {
        name: "ClearControl.de – Klarheit für Smart-Home-Steuerungen",
        urls: [
            { network: "Website", url: "clearcontrol.de" },
            { network: "GitHub", url: "github.com/tgermer/ha-remote-designer" },
        ],
        highlights: ["Web-App zum Erstellen professioneller Beschriftungen für Schalter und Fernbedienungen von Smart-Home-Systemen.", "Eigenständige Konzeption und Umsetzung eines produktiven Web-Tools zur Lösung eines konkreten Anwenderproblems.", "Fokus auf UX, Systemlogik, Automatisierung und funktionierende End-to-End-Lösung."],
        startDate: "2026-01-01",
    },
];

export const references: Reference[] = [
    {
        name: "Oliver Holan",
        company: "Bayerische Verwaltungsschule",
        department: "Fachbereich IT",
        position: "Leiter",
        date: "2025-01-21",
        profiles: [{ network: "LinkedIn", url: "https://www.linkedin.com/in/holan-oliver-b89014a6/" }],
        reference:
            "Ich durfte von 2022 – 2024 mit Tristan zusammenarbeiten und habe während dieser Zeit seine fachlichen und persönlichen Qualitäten schätzen gelernt.\n\nTristan zeichnet sich durch einen von Respekt geprägten Umgang mit Kollegen und Kolleginnen aus. Sein empathischer und kommunikativer Stil trägt maßgeblich zu einem positiven Arbeitsklima bei und fördert ein produktives Teamwork. Besonders beeindruckt hat mich sein Engagement, Menschen mit unterschiedlichen Hintergründen zu integrieren und gemeinsame Ziele erfolgreich zu erreichen.\n\nEin weiterer Aspekt, der ihn hervorhebt, ist sein großes Interesse daran, Dinge zu gestalten und aktiv zu verbessern. Mit einem ausgeprägten Sinn für Innovation und Optimierung widmet er sich stets der Umsetzung neuer Ideen, die Prozesse vereinfachen und verbessern. Diese Eigenschaft macht ihn zu einer wertvollen Kraft, die nicht nur ad hoc Probleme löst, sondern auch langfristige Verbesserungen initiiert.\n\nDarüber hinaus verfügt Tristan über die Fähigkeit komplexe Sachverhalte schnell zu erfassen und passende Lösungen vorzuschlagen. Seine analytischen und strategischen Fähigkeiten haben entscheidend dazu beigetragen, Herausforderungen effizient zu bewältigen. Dabei hilft ihm sein breites Wissen, das weit über den direkten Arbeitsalltag hinausgeht.\n\nIn seinen Projekten hat Tristan immer einen starken Fokus auf den User, insbesondere in den Bereichen UI und UX. Mit einer klaren Anwenderperspektive gelingt es ihm, intuitive und ansprechende Lösungen zu entwickeln, die nicht nur funktional, sondern auch benutzerfreundlich und innovativ sind.\n\nVielen Dank für die schöne Zeit und die gute Zusammenarbeit.\nDer gemeinsame Weg war mir eine Freude.\nOliver Holan",
    },
    {
        name: "Dr. Kathrin Müller",
        company: "Bayerische Verwaltungsschule",
        position: "Dialoggestalterin und Markenstimme",
        date: "2025-01-17",
        image: "linkedInKm.png",
        profiles: [{ network: "LinkedIn", url: "https://www.linkedin.com/in/dr-kathrin-müller-24b73b35/" }],
        reference:
            'Es gibt Menschen, die eine Bereicherung für jedes Team und jedes Projekt sind – Tristan Germer gehört definitiv dazu!\n\nSeine außergewöhnliche Kreativität kombiniert er mit einem tiefen technischen Verständnis und der bemerkenswerten Fähigkeit, sich blitzschnell und eigenständig in völlig neue Themenfelder einzuarbeiten. Unbekanntes Terrain? Für Tristan kein Problem, sondern eine willkommene Herausforderung, die er mit Neugier, Mut und einem "Hands-on"-Ansatz angeht.\n\nWas Tristan Germer besonders auszeichnet, ist nicht nur seine fachliche Kompetenz, sondern auch seine zwischenmenschliche Stärke. Er ist stets hilfsbereit, freundlich und gut gelaunt – seine positive Ausstrahlung wirkt ansteckend und motivierend. Gleichzeitig beeindruckt er durch seinen klugen Weitblick und seine visionäre Denkweise, die innovative Impulse liefert und Projekte auf ein neues Niveau hebt.\n\nEs war mir eine große Freude und eine Bereicherung mit Tristan Germer zusammenzuarbeiten – ein Kollege, der nicht nur Ergebnisse liefert, sondern dabei auch das Umfeld positiv prägt.',
    },
    {
        name: "Caroline Bluhm",
        company: "Hochschule München",
        department: "Zentrale IT",
        position: "Stellvertretende Abteilungsleiterin",
        date: "2022-06-27",
        profiles: [{ network: "LinkedIn", url: "https://www.linkedin.com/in/caroline-bluhm/" }],
        reference: "Tristan ist im Bereich Web ein kreativer und innovativer Kopf, in technischer Sicht immer up to date und dabei sehr strukturiert. Die Zusammenarbeit ist immer äußerst konstruktiv und dabei respekt- und humorvoll. Einer meiner Lieblingskollegen, denn man kommt inhaltlich voran, hat stets das gemeinsames Ziel vor Augen und kann sich auf ihn verlassen - so kommt der Spaß an der Arbeit dabei nicht zu kurz.",
    },
    {
        name: "Aria Djamschidi",
        company: "Apple",
        position: "Senior Distribution Manager",
        date: "2022-06-05",
        email: "djamschidi.a@euro.apple.com",
        profiles: [{ network: "LinkedIn", url: "https://www.linkedin.com/in/ariadjamschidi/" }],
        reference: "Tristan verfügt über Fähigkeiten und Talente, die stets sein Gegenüber verblüfft bzw. in Erstaunen versetzt.\n\n– Tristan verfügt über eine außergewöhnliche Empathiefähigkeit, die dazu führt, dass stets in seiner Gegenwart eine einladende Atmosphäre vorherrscht.\n– Eine weitere Fähigkeit ist seine Kreativität gepaart mit seinem tiefen Wissen. Ein Wissen, dass er sich – auch notfalls in kürzeste Zeit – in einer imponierenden Tiefe aneignet.\n– Eine Eigenschaft, die ich ebenfalls hervorheben möchte, ist Tristans nachhaltige wie auch ehrgeizige, fleißige Art, ein Projekt zielführend zum Abschluss zu bringen.\n\nTristan wäre ein Gewinn für jedes Unternehmen oder Projekt.\nViel Erfolg und Freude wünsche ich Dir für Deine Zukunft.",
    },
    {
        name: "Prof. Dr. Steffen Steinicke",
        company: "Hochschule München",
        department: "Fakultät für Betriebswirtschaft",
        position: "Professor",
        date: "2022-06-04",
        profiles: [{ network: "LinkedIn", url: "https://www.linkedin.com/in/steffen-steinicke-42239b54/" }],
        reference:
            "Ich habe Tristan als Student in meinen Lehrveranstaltungen kennengelernt, ihn im Rahmen seiner Bachelorarbeit betreut und später als Mitarbeiter an der Hochschule München sehr schätzen gelernt.\n\nVon der ersten Minute an, fiel mir seine professionelle Haltung auf. Schon in meinen Lehrveranstaltungen zeigte er ein überdurchschnittliches Verständnis für Kunden und eine starke Lösungsorientierung, wovon ich erst vor kurzem im Rahmen seiner Tätigkeit an der Hochschule in eigener Sache als \u201Einterner Kunde\u201C profitieren konnte.\n\nIm Rahmen seiner Bachelorarbeit, die er bereits im Jahr 2012 über \u201EBlended Learning mit dem Apple iPad\u201C schrieb, zeigte er eindrucksvoll seine Liebe zu digitalen Lösungen, seine Kreativität und Umsetzungsstärke, da er nicht nur ein theoretisches Konzept beschrieb, sondern dies auch praktisch realisierte.\n\nDarüber hinaus genießt Tristan ein hohes Ansehen an unserer Fakultät, weil er zum Beispiel bei der Einführung der E-Akte stets darauf achtete, dass die User auch wirklich einen Nutzen aus dem neuen IT-System ziehen. Darüber hinaus schätze ich seine Initiativen. So kann ich dank ihm als Leiter eines berufsbegleitenden Studiengangs die aktuellen Bewerberzahlen online einsehen und darauf unsere Social Media Aktivitäten anpassen.",
    },
    { name: "Pia Hetzel", company: "Hochschule München", department: "Beratung und Immatrikulation", position: "Leitung", email: "pia.hetzel@hm.edu" },
    { name: "Prof. Dr. Angela Poech", company: "Hochschule München", department: "Fakultät für Betriebswirtschaft", position: "Professor für Entrepreneurship", email: "poech@hm.edu" },
];
