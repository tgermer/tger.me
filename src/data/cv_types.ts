export interface Profile {
  network: string;
  url: string;
}

export interface Language {
  language: string;
  fluency: string;
}

export interface ExperienceItem {
  name: string;
  url?: string;
  location: string;
  typeOfEmployment: string;
  position?: string[];
  highlights?: string[];
  startDate: string;
  endDate: string;
}

export interface EducationItem {
  institution: string;
  url?: string;
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
  institution: string;
  url?: string;
  location: string;
  startDate: string;
  endDate: string;
  fieldOfStudy: string;
  degree?: string;
  certificateUrl?: string;
}

export interface SkillCategory {
  category: string;
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
  name: string;
  url?: string;
  githubUrl?: string;
  highlights?: string[];
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
  url?: string;
  profiles?: Profile[];
}
