// --- JSON Resume-alignierte Typen ---
// Felder sind mit [JR] (JSON Resume Standard) oder [Custom] (eigene Erweiterung) markiert.

export interface Profile {
  network: string;   // [JR] Netzwerk (z. B. "LinkedIn", "GitHub", "Website")
  url: string;       // [JR] URL
  username?: string; // [JR] Benutzername im Netzwerk
}

export interface Location {
  address: string;      // [JR] Straße und Hausnummer
  postalCode?: string;  // [JR] Postleitzahl
  city: string;         // [JR] Stadt (wird auch für Datumszeile im Anschreiben genutzt)
  countryCode?: string; // [JR] Ländercode nach ISO 3166-1 (z. B. "DE")
  region?: string;      // [JR] Bundesland oder Region
}

export interface Language {
  language: string; // [JR] Sprache (z. B. "Deutsch")
  fluency: string;  // [JR] Niveau (z. B. "Muttersprache", "fließend")
}

export interface Interest {
  name: string;       // [JR] Interessengebiet (z. B. "Coding")
  keywords?: string[]; // [JR] Stichworte (z. B. ["Analytisch", "Detailorientiert"])
}

export interface Basics {
  name: string;        // [JR] Vollständiger Name
  label: string;       // [JR] Kurzbeschreibung / Tagline
  image: string;       // [JR] Dateiname des Profilbilds
  birthdate: string;   // [Custom] Geburtsdatum
  location: Location;  // [JR] Wohnort (Adresse, PLZ, Stadt)
  phone: string;       // [JR] Telefonnummer
  email: string;       // [JR] E-Mail-Adresse
  url?: string;        // [JR] Persönliche Website
  summary?: string;    // [JR] Kurzbiografie (2-3 Sätze)
  profiles?: Profile[]; // [JR] Social-Media-Profile
}

export interface Work {
  name: string;             // [JR] Firmenname
  url?: string;             // [JR] Firmenwebsite
  location: string;         // [JR] Arbeitsort
  typeOfEmployment: string; // [Custom] Beschäftigungsart (z. B. "Angestellter", "Selbstständig")
  position?: string[];      // [JR*] Jobtitel (Array statt String wie in JR, da mehrere möglich)
  summary?: string;         // [JR] Rollenbeschreibung
  highlights?: string[];    // [JR] Stichpunkte / Erfolge
  startDate: string;        // [JR] Startdatum (ISO 8601)
  endDate: string;          // [JR] Enddatum (ISO 8601, leer = aktuell)
}

export interface Education {
  institution: string;       // [JR] Name der Hochschule / Universität
  url?: string;              // [JR] Website der Einrichtung
  location: string;          // [Custom] Standort
  startDate: string;         // [JR] Startdatum (ISO 8601)
  endDate: string;           // [JR] Enddatum (ISO 8601)
  area: string;              // [JR] Fachbereich / Studiengang
  majorFieldOfStudy?: string; // [Custom] Schwerpunkt / Vertiefung
  studyType: string;         // [JR] Abschlussart (z. B. "Master of Science")
  score?: number | string;   // [JR] Note
  thesis?: {                 // [Custom] Abschlussarbeit
    title?: string;         //   Titel der Abschlussarbeit
    fullTextUrl?: string;   //   Link zum Volltext
    grade?: number | string; //   Note der Arbeit
  };
}

export interface Certificate {
  name: string;        // [JR] Bezeichnung des Zertifikats / der Weiterbildung
  issuer: string;      // [JR] Aussteller / Institution
  issuerUrl?: string;  // [Custom] Website des Ausstellers
  url?: string;        // [JR] Link zum Zertifikat / Nachweis
  location: string;    // [Custom] Ort (z. B. "Online")
  startDate: string;   // [Custom] Startdatum (ISO 8601)
  endDate: string;     // [Custom] Enddatum (ISO 8601, in JR nur "date")
  degree?: string;     // [Custom] Abschlussbezeichnung (z. B. "Nanodegree")
}

export interface Skill {
  name: string;       // [JR] Kategoriename (z. B. "Programmierung")
  keywords: string[]; // [JR] Einzelne Skills (z. B. ["TypeScript", "Swift"])
}

export interface Reference {
  name: string;         // [JR] Name der Referenzperson
  reference?: string;   // [JR] Referenztext / Empfehlung (Freitext)
  company: string;      // [Custom] Unternehmen
  department?: string;  // [Custom] Abteilung
  position: string;     // [Custom] Position
  date?: string;        // [Custom] Datum der Empfehlung (ISO 8601)
  email?: string;       // [Custom] E-Mail-Adresse
  profiles?: Profile[]; // [Custom] Links (z. B. LinkedIn, Website – nutzt Profile-Interface)
  image?: string;       // [Custom] Dateiname des Profilbilds in src/assets/references/ (z. B. "name.jpg")
}

export interface Project {
  name: string;         // [JR] Projektname
  urls?: Profile[];     // [Custom] Links (z. B. Website, GitHub – nutzt Profile-Interface; JR hat nur "url")
  highlights?: string[]; // [JR] Stichpunkte / Beschreibung
  startDate: string;    // [JR] Startdatum (ISO 8601)
  endDate?: string;     // [JR] Enddatum (ISO 8601)
}

// --- Typen für zukünftige Nutzung (aktuell keine Daten) ---

export interface Award {
  title: string;    // [JR] Titel der Auszeichnung
  date: string;     // [JR] Datum (ISO 8601)
  awarder: string;  // [JR] Verleihende Organisation
  summary?: string; // [JR] Beschreibung
}

export interface Volunteer {
  organization: string;  // [JR] Name der Organisation
  position: string;      // [JR] Rolle / Funktion
  url?: string;          // [JR] Website der Organisation
  startDate: string;     // [JR] Startdatum (ISO 8601)
  endDate: string;       // [JR] Enddatum (ISO 8601)
  summary?: string;      // [JR] Beschreibung
  highlights?: string[]; // [JR] Stichpunkte
}

export interface Publication {
  name: string;        // [JR] Titel der Publikation
  publisher: string;   // [JR] Verlag / Herausgeber
  releaseDate: string; // [JR] Veröffentlichungsdatum (ISO 8601)
  url?: string;        // [JR] Link zur Publikation
  summary?: string;    // [JR] Zusammenfassung
}
