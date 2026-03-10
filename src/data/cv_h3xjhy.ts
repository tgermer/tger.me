import type { Work, Education, Certificate, Skill, Reference, Project, Basics, Language, Interest } from "./cv_types";

// IMPORTANT: This file contains intentional non-breaking spaces (U+00A0) for typographic correctness.
// They prevent line breaks at "&", "PSPO I", "PSM I", etc.
// Do NOT replace them with regular spaces. Verify with: grep -n $'\xc2\xa0' src/data/cv_h3xjhy.ts

export const basics: Basics = {
    name: "Tristan Germer",
    label: "Business Development & Partner Management | Project Execution",
    image: "2025-09-02-landscape.jpg",
    birthdate: "19.10.1981",
    location: {
        address: "Petrarcastraße 32",
        postalCode: "80933",
        city: "Munich",
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
        name: "Career Transition – Business Development & Partner Focus",
        location: "",
        typeOfEmployment: "Career Reorientation",
        highlights: ["Strategic repositioning towards business development, partner management, and commercially focused roles.", "Deepening expertise in cross-functional execution, stakeholder alignment, and scalable business processes.", "Combining technical understanding with commercial acumen for partner-facing environments."],
        startDate: "2025-10-01",
        endDate: "",
    },
    {
        name: "akdb.digitalfabriX GmbH",
        location: "Munich",
        typeOfEmployment: "Employee",
        position: ["Senior Software Consultant DMS"],
        highlights: ["Led end-to-end DMS implementation projects for enterprise and public-sector clients, managing the full project lifecycle from requirements to go-live.", "Conducted stakeholder workshops and requirements analysis to align business needs with scalable solutions.", "Delivered customer training sessions to drive adoption, ensuring long-term value realisation.", "Managed release coordination and system updates across multi-stakeholder environments."],
        startDate: "2025-03-01",
        endDate: "2025-09-30",
    },
    {
        name: "Bayerische Verwaltungsschule (BVS)",
        url: "www.bvs.de",
        location: "Munich",
        typeOfEmployment: "Employee",
        position: ["Consultant for Quality Management, Controlling, and Central Steering Support"],
        highlights: ["Developed and implemented central controlling structures, improving data-driven decision-making for senior leadership.", "Automated evaluation and feedback workflows, increasing process efficiency and reporting accuracy.", "Designed and delivered training programs for internal stakeholders on digital tools and collaboration platforms."],
        startDate: "2022-10-01",
        endDate: "2024-12-31",
    },
    {
        name: "Munich University of Applied Sciences (HM)",
        url: "www.hm.edu",
        location: "Munich",
        typeOfEmployment: "Employee",
        position: ["Project Manager and Product Manager"],
        highlights: ["Led cross-functional digital transformation project across 14 faculties, managing complex stakeholder alignment and coordinating diverse organisational interests.", "Designed and deployed organisation-wide workflows processing >200,000 documents/year, achieving approximately 30 % reduction in processing time.", "Developed KPI dashboards for senior leadership, enabling transparent performance tracking and data-driven decisions.", "Delivered training and enablement programs for 60+ staff members and 80+ professors, driving adoption and user satisfaction."],
        startDate: "2013-09-15",
        endDate: "2022-09-30",
    },
    {
        name: "weku münchen",
        location: "Hebertshausen",
        typeOfEmployment: "Self-employed Salesman",
        highlights: ["Direct sales and customer acquisition in a self-managed business environment."],
        startDate: "2008-03-01",
        endDate: "2008-12-31",
    },
    {
        name: "Vorwerk Deutschland Stiftung & Co. KG",
        url: "kobold.vorwerk.de",
        location: "Munich",
        typeOfEmployment: "Self-employed Salesman",
        position: ["Consultant and Seller"],
        highlights: ["Consultative selling of premium products, building long-term customer relationships through needs-based advice.", "Revenue generation and customer portfolio management in a direct sales model."],
        startDate: "2004-05-01",
        endDate: "2008-06-30",
    },
    {
        name: "LIDL Vertriebs GmbH & Co. KG",
        url: "www.lidl.de",
        location: "Munich",
        typeOfEmployment: "Employee",
        position: ["Trainee Branch Manager / Deputy"],
        highlights: ["Retail operations management and team coordination in a high-volume environment."],
        startDate: "2003-05-01",
        endDate: "2004-06-30",
    },
];

export const education: Education[] = [
    {
        institution: "Danube University Krems",
        url: "www.donau-uni.ac.at",
        location: "Krems, Austria",
        startDate: "2016-05-01",
        endDate: "2018-04-30",
        area: "Technical Communication",
        studyType: "Master of Science (MSc)",
        thesis: {
            title: "Methods of technical documentation applied in the administration within universities of applied sciences",
            fullTextUrl: "https://permalink.obvsg.at/duk/YC00347036",
        },
    },
    {
        institution: "Munich University of Applied Sciences",
        url: "www.hm.edu",
        location: "Munich, Germany",
        startDate: "2009-03-01",
        endDate: "2013-08-31",
        area: "Business Administration",
        majorFieldOfStudy: "Project Consulting and Project Management",
        studyType: "Bachelor of Arts (BA)",
        score: 2.6,
        thesis: {
            title: "BLENDED LEARNING WITH THE APPLE IPAD. Possible applications and simple implementations using the example of presentation training",
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
        name: "Professional Scrum Product Owner (PSPO I)",
        url: "https://www.scrum.org/certificates/1127252",
    },
    {
        issuer: "Scrum.org",
        issuerUrl: "www.scrum.org",
        location: "Online",
        startDate: "2024-07-07",
        endDate: "2024-07-07",
        name: "Professional Scrum Master (PSM I)",
        url: "https://www.scrum.org/certificates/1118704",
    },
    {
        issuer: "B-SCT",
        location: "",
        startDate: "2015-07-01",
        endDate: "2015-07-31",
        name: "Leading Projects",
    },
    {
        issuer: "B-SCT",
        location: "",
        startDate: "2015-06-01",
        endDate: "2015-06-30",
        name: "Managing Projects",
    },
];

export const skills: Skill[] = [
    { name: "Stakeholder & Partner Management", keywords: ["Cross-Functional Coordination", "Requirements Analysis", "Workshop Facilitation", "Training & Enablement", "Change Management"] },
    { name: "Project & Business Execution", keywords: ["Project Leadership", "Agile (PSM I, PSPO I)", "KPI Dashboarding", "Process Optimisation", "Power BI"] },
    { name: "Technical & Development", keywords: ["Swift", "SwiftUI", "JavaScript", "TypeScript", "SQL", "iOS Development"] },
    { name: "Business Tools", keywords: ["MS Office Suite", "Confluence", "DMS (d.velop d3)", "Adobe Creative Suite", "Final Cut Pro"] },
];

export const languages: Language[] = [
    { language: "German", fluency: "Native" },
    { language: "English", fluency: "Fluent" },
];

export const interests: Interest[] = [
    { name: "Apple Ecosystem", keywords: ["iOS Development", "Lifelong User"] },
    { name: "Technology", keywords: ["Innovative", "Eager to Learn"] },
    { name: "Fitness", keywords: ["Team Player", "Ambitious"] },
    { name: "Travel", keywords: ["Flexible", "Curious"] },
];

export const projects: Project[] = [
    {
        name: "ClearControl.de – Clarity for Smart Home Controls",
        urls: [
            { network: "Website", url: "clearcontrol.de" },
            { network: "GitHub", url: "github.com/tgermer/ha-remote-designer" },
        ],
        highlights: ["Web app for creating professional labels for switches and remote controls of smart home systems.", "Independent conception and implementation of a productive web tool to solve a concrete user problem.", "Focus on UX, system logic, automation, and a functioning end-to-end solution."],
        startDate: "2026-01-01",
    },
];

export const references: Reference[] = [
    {
        name: "Aria Djamschidi",
        company: "Apple",
        position: "Senior Distribution Manager",
        date: "2022-06-05",
        email: "djamschidi.a@euro.apple.com",
        profiles: [{ network: "LinkedIn", url: "https://www.linkedin.com/in/ariadjamschidi/" }],
        reference: "Tristan verfügt über Fähigkeiten und Talente, die stets sein Gegenüber verblüfft bzw. in Erstaunen versetzt.\n\n– Tristan verfügt über eine außergewöhnliche Empathiefähigkeit, die dazu führt, dass stets in seiner Gegenwart eine einladende Atmosphäre vorherrscht.\n– Eine weitere Fähigkeit ist seine Kreativität gepaart mit seinem tiefen Wissen. Ein Wissen, dass er sich – auch notfalls in kürzeste Zeit – in einer imponierenden Tiefe aneignet.\n– Eine Eigenschaft, die ich ebenfalls hervorheben möchte, ist Tristans nachhaltige wie auch ehrgeizige, fleißige Art, ein Projekt zielführend zum Abschluss zu bringen.\n\nTristan wäre ein Gewinn für jedes Unternehmen oder Projekt.\nViel Erfolg und Freude wünsche ich Dir für Deine Zukunft.",
    },
    { name: "Peter Burgner", company: "Apple", position: "AR/VR Engineering Manager (Vision Products Group)", profiles: [{ network: "LinkedIn", url: "https://www.linkedin.com/in/peter-burgner/" }] },
    {
        name: "Prof. Dr. Steffen Steinicke",
        company: "Munich University of Applied Sciences",
        department: "Faculty of Business Administration",
        position: "Professor",
        date: "2022-06-04",
        profiles: [{ network: "LinkedIn", url: "https://www.linkedin.com/in/steffen-steinicke-42239b54/" }],
        reference:
            "Ich habe Tristan als Student in meinen Lehrveranstaltungen kennengelernt, ihn im Rahmen seiner Bachelorarbeit betreut und später als Mitarbeiter an der Hochschule München sehr schätzen gelernt.\n\nVon der ersten Minute an, fiel mir seine professionelle Haltung auf. Schon in meinen Lehrveranstaltungen zeigte er ein überdurchschnittliches Verständnis für Kunden und eine starke Lösungsorientierung, wovon ich erst vor kurzem im Rahmen seiner Tätigkeit an der Hochschule in eigener Sache als \u201Einterner Kunde\u201C profitieren konnte.\n\nIm Rahmen seiner Bachelorarbeit, die er bereits im Jahr 2012 über \u201EBlended Learning mit dem Apple iPad\u201C schrieb, zeigte er eindrucksvoll seine Liebe zu digitalen Lösungen, seine Kreativität und Umsetzungsstärke, da er nicht nur ein theoretisches Konzept beschrieb, sondern dies auch praktisch realisierte.\n\nDarüber hinaus genießt Tristan ein hohes Ansehen an unserer Fakultät, weil er zum Beispiel bei der Einführung der E-Akte stets darauf achtete, dass die User auch wirklich einen Nutzen aus dem neuen IT-System ziehen. Darüber hinaus schätze ich seine Initiativen. So kann ich dank ihm als Leiter eines berufsbegleitenden Studiengangs die aktuellen Bewerberzahlen online einsehen und darauf unsere Social Media Aktivitäten anpassen.",
    },
    {
        name: "Oliver Holan",
        company: "Bayerische Verwaltungsschule",
        department: "IT Department",
        position: "Head",
        date: "2025-01-21",
        profiles: [{ network: "LinkedIn", url: "https://www.linkedin.com/in/holan-oliver-b89014a6/" }],
        reference:
            "Ich durfte von 2022 – 2024 mit Tristan zusammenarbeiten und habe während dieser Zeit seine fachlichen und persönlichen Qualitäten schätzen gelernt.\n\nTristan zeichnet sich durch einen von Respekt geprägten Umgang mit Kollegen und Kolleginnen aus. Sein empathischer und kommunikativer Stil trägt maßgeblich zu einem positiven Arbeitsklima bei und fördert ein produktives Teamwork. Besonders beeindruckt hat mich sein Engagement, Menschen mit unterschiedlichen Hintergründen zu integrieren und gemeinsame Ziele erfolgreich zu erreichen.\n\nEin weiterer Aspekt, der ihn hervorhebt, ist sein großes Interesse daran, Dinge zu gestalten und aktiv zu verbessern. Mit einem ausgeprägten Sinn für Innovation und Optimierung widmet er sich stets der Umsetzung neuer Ideen, die Prozesse vereinfachen und verbessern. Diese Eigenschaft macht ihn zu einer wertvollen Kraft, die nicht nur ad hoc Probleme löst, sondern auch langfristige Verbesserungen initiiert.\n\nDarüber hinaus verfügt Tristan über die Fähigkeit komplexe Sachverhalte schnell zu erfassen und passende Lösungen vorzuschlagen. Seine analytischen und strategischen Fähigkeiten haben entscheidend dazu beigetragen, Herausforderungen effizient zu bewältigen. Dabei hilft ihm sein breites Wissen, das weit über den direkten Arbeitsalltag hinausgeht.\n\nIn seinen Projekten hat Tristan immer einen starken Fokus auf den User, insbesondere in den Bereichen UI und UX. Mit einer klaren Anwenderperspektive gelingt es ihm, intuitive und ansprechende Lösungen zu entwickeln, die nicht nur funktional, sondern auch benutzerfreundlich und innovativ sind.\n\nVielen Dank für die schöne Zeit und die gute Zusammenarbeit.\nDer gemeinsame Weg war mir eine Freude.\nOliver Holan",
    },
    { name: "Pia Hetzel", company: "Munich University of Applied Sciences", department: "Consulting and Enrollment", position: "Head", email: "pia.hetzel@hm.edu" },
    // { name: "Prof. Dr. Angela Poech", company: "Munich University of Applied Sciences", department: "Faculty of Business Administration", position: "Professor for Entrepreneurship", email: "poech@hm.edu" },
];
