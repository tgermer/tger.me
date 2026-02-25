export interface ExperienceItem {
  company: string;
  companyUrl?: string;
  location: string;
  typeOfEmployment: string;
  position?: string[];
  description?: { list?: string[] };
  startDate: string;
  endDate: string;
}

export interface EducationItem {
  school: string;
  schoolUrl?: string;
  location: string;
  startDate: string;
  endDate: string;
  fieldOfStudy: string;
  majorFieldOfStudy?: string;
  degree: string;
  grade?: number | string;
  certificateUrl?: string;
  thesis?: { title?: string; fullTextUrl?: string; grade?: number | string };
}

export interface FurtherEducationItem {
  school: string;
  schoolUrl?: string;
  location: string;
  startDate: string;
  endDate: string;
  fieldOfStudy: string;
  degree?: string;
  certificateUrl?: string;
}

export interface SkillCategory {
  catagorie: string;
  items: string[];
}

export interface Reference {
  name: string;
  company: string;
  department?: string;
  position: string;
  email: string;
}

export interface ProjectItem {
  title: string;
  url?: string;
  githubUrl?: string;
  description?: { list?: string[] };
  date: string;
}

export interface PersonalData {
  name: string;
  tagline: string;
  photo: string;
  birthdate: string;
  address: string;
  phone: string;
  email: string;
  location: string;
  languageValues: string;
  url?: string;
  linkedinUrl?: string;
}

export const personal: PersonalData = {
  name: 'Tristan Germer',
  tagline: 'Digitalisierung & Automatisierung | System- & Prozesssteuerung',
  photo: '/assets/2025-09-02 Google Gemini 2.5 Flash.JPG',
  birthdate: '19.10.1981',
  address: 'Petrarcastraße 32, 80933 München',
  phone: '+49 151 22651857',
  email: 'hello@tger.me',
  location: 'München',
  languageValues: 'Deutsch (Muttersprache), Englisch (fließend)',
  url: 'tger.me',
  linkedinUrl: 'linkedin.com/in/tgermer',
};

export const experience: ExperienceItem[] = [
  {
    company: 'Karriereübergang – Digitalisierung & Systemsteuerung',
    location: '',
    typeOfEmployment: 'Berufliche Neuorientierung',
    description: {
      list: [
        'Bewusste berufliche Übergangsphase zur fachlichen Vertiefung und strategischen Neupositionierung.',
        'Schwerpunkt auf Digitalisierung, Automatisierung und Systemsteuerung in Querschnitts- und Stabsfunktionen.',
        'Übertragung technischer Automatisierungs- und Steuerungslogiken auf organisatorische Kontexte.',
      ],
    },
    startDate: '2025-10-01',
    endDate: '',
  },
  {
    company: 'akdb.digitalfabriX GmbH',
    location: 'München',
    typeOfEmployment: 'Angestellter',
    position: ['Senior Softwareberater DMS'],
    description: {
      list: [
        'Projektleitung DMS-Einführung',
        'Anforderungsanalyse & Prozessberatung',
        'Kundenschulungen & Workshops',
        'Systemkonfiguration & Berechtigungskonzepte',
        'Release- und Update-Management',
      ],
    },
    startDate: '2025-03-01',
    endDate: '2025-09-30',
  },
  {
    company: 'Bayerische Verwaltungsschule (BVS)',
    companyUrl: 'www.bvs.de',
    location: 'München',
    typeOfEmployment: 'Angestellter',
    position: ['Referent Qualitätsmanagement, Controlling und zentrale Steuerungsunterstützung'],
    description: {
      list: [
        'Weiterentwicklung des zentralen Controllings.',
        'Überarbeitung des Evaluationssystems, inklusive Integration von Automatisierungen und Effizienzsteigerung des Feedbackprozesses.',
        'Entwicklung, didaktische Aufbereitung und Durchführung von Schulungsprogrammen (z. B. Confluence, MS Office, evasys).',
      ],
    },
    startDate: '2022-10-01',
    endDate: '2024-12-31',
  },
  {
    company: 'Hochschule München (HM)',
    companyUrl: 'www.hm.edu',
    location: 'München',
    typeOfEmployment: 'Angestellter',
    position: ['Projektleiter und Produktmanager'],
    description: {
      list: [
        'Leitung und erfolgreiche Einführung eines DMS (d.velop d3) zur Digitalisierung von Bewerbungs- und Verwaltungsprozessen.',
        'Gestaltung und Implementierung organisationsweiter Workflows für 14 Fakultäten (>200.000 Dokumente/Jahr) mit Reduktion der Bearbeitungszeit um ca. 30 %.',
        'Sicherstellung von Compliance durch revisionssichere Archivierung sowie Integration angrenzender Fachverfahren.',
        'Konzeption von Schulungen, Nutzerunterstützung und Entwicklung von KPI-Dashboards für Steuerung und Transparenz.',
      ],
    },
    startDate: '2013-09-15',
    endDate: '2022-09-30',
  },
  {
    company: 'weku münchen',
    location: 'Hebertshausen',
    typeOfEmployment: 'Selbstständiger Verkäufer',
    startDate: '2008-03-01',
    endDate: '2008-12-31',
  },
  {
    company: 'Vorwerk Deutschland Stiftung & Co. KG',
    companyUrl: 'kobold.vorwerk.de',
    location: 'München',
    typeOfEmployment: 'Selbstständiger Verkäufer',
    position: ['Berater und Verkäufer'],
    startDate: '2004-05-01',
    endDate: '2008-06-30',
  },
  {
    company: 'LIDL Vertriebs GmbH & Co. KG',
    companyUrl: 'www.lidl.de',
    location: 'München',
    typeOfEmployment: 'Angestellter',
    position: ['Filialleiter-Anwärter/Stellvertreter'],
    startDate: '2003-05-01',
    endDate: '2004-06-30',
  },
];

export const education: EducationItem[] = [
  {
    school: 'Donau-Universität Krems',
    schoolUrl: 'www.donau-uni.ac.at',
    location: 'Krems, Österreich',
    startDate: '2016-05-01',
    endDate: '2018-04-30',
    fieldOfStudy: 'Technische Kommunikation',
    degree: 'Master of Science (MSc)',
    thesis: {
      title: 'Methoden der Technischen Dokumentation, angewendet in der Verwaltung von Hochschulen für angewandte Wissenschaften',
      fullTextUrl: 'https://permalink.obvsg.at/duk/YC00347036',
    },
  },
  {
    school: 'Hochschule München',
    schoolUrl: 'www.hm.edu',
    location: 'München, Deutschland',
    startDate: '2009-03-01',
    endDate: '2013-08-31',
    fieldOfStudy: 'Betriebswirtschaft',
    majorFieldOfStudy: 'Projektberatung und Projektmanagement',
    degree: 'Bachelor of Arts (BA)',
    grade: 2.6,
    thesis: {
      title: 'BLENDED LEARNING MIT DEM APPLE IPAD. Einsatzmöglichkeiten und einfache Umsetzungen am Beispiel eines Präsentationstrainings',
      grade: 1.7,
    },
  },
];

export const furtherEducation: FurtherEducationItem[] = [
  {
    school: 'UDACITY',
    schoolUrl: 'www.udacity.com',
    location: 'Online',
    startDate: '2024-10-01',
    endDate: '2024-12-04',
    fieldOfStudy: 'iOS Development with SwiftUI and SwiftData',
    degree: 'Nanodegree',
    certificateUrl: 'https://www.udacity.com/certificate/e/50931af6-7ccf-11ef-9b58-8fbb3f4ca5b3',
  },
  {
    school: 'Scrum.org',
    schoolUrl: 'www.scrum.org',
    location: 'Online',
    startDate: '2024-08-03',
    endDate: '2024-08-03',
    fieldOfStudy: 'Professioneller Scrum Product Owner (PSPO I)',
    certificateUrl: 'https://www.scrum.org/certificates/1127252',
  },
  {
    school: 'Scrum.org',
    schoolUrl: 'www.scrum.org',
    location: 'Online',
    startDate: '2024-07-07',
    endDate: '2024-07-07',
    fieldOfStudy: 'Professioneller Scrum Master (PSM I)',
    certificateUrl: 'https://www.scrum.org/certificates/1118704',
  },
  {
    school: 'B-SCT',
    location: '',
    startDate: '2015-07-01',
    endDate: '2015-07-31',
    fieldOfStudy: 'Projekte leiten',
  },
  {
    school: 'B-SCT',
    location: '',
    startDate: '2015-06-01',
    endDate: '2015-06-30',
    fieldOfStudy: 'Projekte managen',
  },
];

export const skills: SkillCategory[] = [
  { catagorie: 'Office', items: ['Word', 'Excel', 'PowerPoint', 'Visio', 'DMS d.velop d3', 'komXwork'] },
  { catagorie: 'Programmierung', items: ['Swift', 'JavaScript', 'TypeScript'] },
  { catagorie: 'Datenanalyse', items: ['SQL', 'Excel (Fortgeschritten)', 'MS Power BI'] },
  { catagorie: 'Design', items: ['Adobe Creative Suite (Photoshop, Illustrator, InDesign)', 'Affinity Suite (Designer, Photo, Publisher)', 'Final Cut Pro X', 'Motion'] },
  { catagorie: 'AI & Tools', items: ['Claude Code', 'GitHub Copilot', 'Prompt Engineering'] },
  { catagorie: 'Sprachen', items: ['Deutsch (Muttersprache)', 'Englisch (fließend)'] },
  { catagorie: 'Interessen', items: ['CODING Analytisch & Detailorientiert', 'TECHNOLOGIE Innovativ & Lernbereit', 'FITNESS Teamfähigkeit & Ehrgeiz', 'REISEN Flexibilität & Neugier'] },
];

export const projects: ProjectItem[] = [
  {
    title: 'ClearControl.de – Klarheit für Smart-Home-Steuerungen',
    url: 'clearcontrol.de',
    githubUrl: 'github.com/tgermer/ha-remote-designer',
    description: {
      list: [
        'Web-App zum Erstellen professioneller Beschriftungen für Schalter und Fernbedienungen von Smart-Home-Systemen.',
        'Eigenständige Konzeption und Umsetzung eines produktiven Web-Tools zur Lösung eines konkreten Anwenderproblems.',
        'Fokus auf UX, Systemlogik, Automatisierung und funktionierende End-to-End-Lösung.',
      ],
    },
    date: '2026-01-01',
  },
];

export const references: Reference[] = [
  { name: 'Pia Hetzel', company: 'Hochschule München', department: 'Beratung und Immatrikulation', position: 'Leitung', email: 'pia.hetzel@hm.edu' },
  { name: 'Prof. Dr. Angela Poech', company: 'Hochschule München', department: 'Fakultät für Betriebswirtschaft', position: 'Professor für Entrepreneurship', email: 'poech@hm.edu' },
  { name: 'Aria Djamschidi', company: 'Apple', position: 'Senior Distribution Manager', email: 'djamschidi.a@euro.apple.com' },
];
