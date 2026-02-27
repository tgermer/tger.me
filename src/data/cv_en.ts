import type { Work, Education, Certificate, Skill, Reference, Project, Basics, Language, Interest } from "./cv_types";

// IMPORTANT: This file contains intentional non-breaking spaces (U+00A0) for typographic correctness.
// They prevent line breaks at "&", "PSPO I", "PSM I", etc.
// Do NOT replace them with regular spaces. Verify with: grep -n $'\xc2\xa0' src/data/cv_en.ts

export const basics: Basics = {
    name: "Tristan Germer",
    label: "Digitalization & Automation | System & Process Control",
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
        name: "Career Transition – Digitalization & System Control",
        location: "",
        typeOfEmployment: "Career Reorientation",
        highlights: ["Deliberate professional transition phase for deepening expertise and strategic repositioning.", "Focus on digitalization, automation, and system control in cross-functional and staff roles.", "Transfer of technical automation and control logic to organizational contexts."],
        startDate: "2025-10-01",
        endDate: "",
    },
    {
        name: "akdb.digitalfabriX GmbH",
        location: "Munich",
        typeOfEmployment: "Employee",
        position: ["Senior Software Consultant DMS"],
        highlights: ["Project management for DMS implementation", "Requirements analysis & process consulting", "Customer training & workshops", "System configuration & authorization concepts", "Release and update management"],
        startDate: "2025-03-01",
        endDate: "2025-09-30",
    },
    {
        name: "Bayerische Verwaltungsschule (BVS)",
        url: "www.bvs.de",
        location: "Munich",
        typeOfEmployment: "Employee",
        position: ["Consultant for Quality Management, Controlling, and Central Steering Support"],
        highlights: ["Advancement of central controlling.", "Revision of the evaluation system, including the integration of automation and increased efficiency of the feedback process.", "Development, didactic preparation, and delivery of training programs (e.g., Confluence, MS Office, evasys)."],
        startDate: "2022-10-01",
        endDate: "2024-12-31",
    },
    {
        name: "Munich University of Applied Sciences (HM)",
        url: "www.hm.edu",
        location: "Munich",
        typeOfEmployment: "Employee",
        position: ["Project Manager and Product Manager"],
        highlights: ["Management and successful implementation of a DMS (d.velop d3) for digitizing application and administrative processes.", "Design and implementation of organization-wide workflows for 14 faculties (>200,000 documents/year), reducing processing time by approx. 30%.", "Ensuring compliance through audit-proof archiving and integration of adjacent specialized procedures.", "Conception of training programs, user support, and development of KPI dashboards for management and transparency."],
        startDate: "2013-09-15",
        endDate: "2022-09-30",
    },
    {
        name: "weku münchen",
        location: "Hebertshausen",
        typeOfEmployment: "Self-employed Salesman",
        startDate: "2008-03-01",
        endDate: "2008-12-31",
    },
    {
        name: "Vorwerk Deutschland Stiftung & Co. KG",
        url: "kobold.vorwerk.de",
        location: "Munich",
        typeOfEmployment: "Self-employed Salesman",
        position: ["Consultant and Seller"],
        startDate: "2004-05-01",
        endDate: "2008-06-30",
    },
    {
        name: "LIDL Vertriebs GmbH & Co. KG",
        url: "www.lidl.de",
        location: "Munich",
        typeOfEmployment: "Employee",
        position: ["Trainee Branch Manager / Deputy"],
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
    { name: "Office", keywords: ["Word", "Excel", "PowerPoint", "Visio", "DMS d.velop d3", "komXwork"] },
    { name: "Programming", keywords: ["Swift", "JavaScript", "TypeScript"] },
    { name: "Data Analysis", keywords: ["SQL", "Excel (Advanced)", "MS Power BI"] },
    { name: "Design", keywords: ["Adobe Creative Suite (Photoshop, Illustrator, InDesign)", "Affinity Suite (Designer, Photo, Publisher)", "Final Cut Pro X", "Motion"] },
    { name: "AI & Tools", keywords: ["Claude Code", "GitHub Copilot", "Prompt Engineering"] },
];

export const languages: Language[] = [
    { language: "German", fluency: "Native" },
    { language: "English", fluency: "Fluent" },
];

export const interests: Interest[] = [
    { name: "Coding", keywords: ["Analytical", "Detail-Oriented"] },
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
    { name: "Pia Hetzel", company: "Munich University of Applied Sciences", department: "Consulting and Enrollment", position: "Head", email: "pia.hetzel@hm.edu" },
    { name: "Prof. Dr. Angela Poech", company: "Munich University of Applied Sciences", department: "Faculty of Business Administration", position: "Professor for Entrepreneurship", email: "poech@hm.edu" },
    { name: "Aria Djamschidi", company: "Apple", position: "Senior Distribution Manager", email: "djamschidi.a@euro.apple.com" },
];
