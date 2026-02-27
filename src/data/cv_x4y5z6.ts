import type { ExperienceItem, EducationItem, FurtherEducationItem, SkillCategory, Reference, ProjectItem, PersonalData, Language } from "./cv_types";

export const personal: PersonalData = {
    name: "Tristan Germer",
    tagline: "Digitalization & Automation | System & Process Control",
    photo: "2025-09-02-portrait.jpg",
    birthdate: "19.10.1981",
    address: "Petrarcastraße 32, 80933 München",
    phone: "+49 151 22651857",
    email: "hello@tger.me",
    location: "Munich",
    profiles: [
    ],
};

export const experience: ExperienceItem[] = [
    {
        name: "Career Transition – Digitalization & System Control",
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
        highlights: ["Project management for DMS implementation", "Requirements analysis & process consulting", "Customer training & workshops", "System configuration & authorization concepts", "Release and update management"],
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
        name: "Vorwerk Deutschland Stiftung & Co. KG",
        url: "kobold.vorwerk.de",
        location: "Munich",
        typeOfEmployment: "Self-employed Salesman",
        position: ["Consultant and Seller"],
        startDate: "2004-05-01",
        endDate: "2008-06-30",
    },
    {
        name: "LIDL Vertriebs GmbH & Co. KG",
        url: "www.lidl.de",
        location: "Munich",
        typeOfEmployment: "Employee",
        position: ["Trainee Branch Manager / Deputy"],
        startDate: "2003-05-01",
        endDate: "2004-06-30",
    }
];

export const education: EducationItem[] = [
    {
        institution: "Danube University Krems",
        url: "www.donau-uni.ac.at",
        location: "Krems, Austria",
        startDate: "2016-05-01",
        endDate: "2018-04-30",
        fieldOfStudy: "Technical Communication",
        degree: "Master of Science (MSc)",
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
        fieldOfStudy: "Business Administration",
        majorFieldOfStudy: "Project Consulting and Project Management",
        degree: "Bachelor of Arts (BA)",
        grade: 2.6,
        thesis: {
            title: "BLENDED LEARNING WITH THE APPLE IPAD. Possible applications and simple implementations using the example of presentation training",
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
        fieldOfStudy: "Professional Scrum Product Owner (PSPO I)",
        certificateUrl: "https://www.scrum.org/certificates/1127252",
    },
    {
        institution: "Scrum.org",
        url: "www.scrum.org",
        location: "Online",
        startDate: "2024-07-07",
        endDate: "2024-07-07",
        fieldOfStudy: "Professional Scrum Master (PSM I)",
        certificateUrl: "https://www.scrum.org/certificates/1118704",
    },
    {
        institution: "B-SCT",
        location: "",
        startDate: "2015-07-01",
        endDate: "2015-07-31",
        fieldOfStudy: "Leading Projects",
    },
    {
        institution: "B-SCT",
        location: "",
        startDate: "2015-06-01",
        endDate: "2015-06-30",
        fieldOfStudy: "Managing Projects",
    }
];

export const skills: SkillCategory[] = [
    { category: "Office", items: ["Word", "Excel", "PowerPoint", "Visio", "DMS d.velop d3", "komXwork"] },
    { category: "Programming", items: ["Swift", "JavaScript", "TypeScript"] },
    { category: "Data Analysis", items: ["SQL", "Excel (Advanced)", "MS Power BI"] },
    { category: "Design", items: ["Adobe Creative Suite (Photoshop, Illustrator, InDesign)", "Affinity Suite (Designer, Photo, Publisher)", "Final Cut Pro X", "Motion"] },
    { category: "AI & Tools", items: ["Claude Code", "GitHub Copilot", "Prompt Engineering"] }
];

export const languages: Language[] = [
    { language: "German", fluency: "Native" },
    { language: "English", fluency: "Fluent" },
];

export const interests: string[] = [
    "CODING Analytical & Detail-Oriented",
    "TECHNOLOGY Innovative & Eager to Learn",
    "FITNESS Team Player & Ambitious",
    "TRAVEL Flexible & Curious",
];

export const projects: ProjectItem[] = [
    {
        name: "ClearControl.de – Clarity for Smart Home Controls",
        url: "clearcontrol.de",
        githubUrl: "github.com/tgermer/ha-remote-designer",
        highlights: ["Web app for creating professional labels for switches and remote controls of smart home systems.", "Independent conception and implementation of a productive web tool to solve a concrete user problem.", "Focus on UX, system logic, automation, and a functioning end-to-end solution."],
        date: "2026-01-01",
    }
];

export const references: Reference[] = [
    { name: "Pia Hetzel", company: "Munich University of Applied Sciences", department: "Consulting and Enrollment", position: "Head", email: "pia.hetzel@hm.edu" },
    { name: "Prof. Dr. Angela Poech", company: "Munich University of Applied Sciences", department: "Faculty of Business Administration", position: "Professor for Entrepreneurship", email: "poech@hm.edu" },
    { name: "Aria Djamschidi", company: "Apple", position: "Senior Distribution Manager", email: "djamschidi.a@euro.apple.com" }
];
