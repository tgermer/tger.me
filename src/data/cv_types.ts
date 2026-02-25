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
