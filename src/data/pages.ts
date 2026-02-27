export interface PageMeta {
  title: string;
  description: string;
}

export const pages: Record<string, PageMeta> = {
  index: {
    title: "Tristan Germer",
    description:
      "Persönliche Website von Tristan Germer – Digitalisierung, Prozessgestaltung und Automatisierung. Projekte, Blog und Lebenslauf.",
  },
  portfolio: {
    title: "Portfolio",
    description:
      "Projekte von Tristan Germer – iOS-Apps, Web-Anwendungen, Daten-Visualisierungen und Automatisierungstools im Überblick.",
  },
  blog: {
    title: "Blog",
    description:
      "Artikel über Vibe Coding, Digitalisierung und Automatisierung – Einblicke und Erfahrungen von Tristan Germer.",
  },
  references: {
    title: "Referenzen",
    description:
      "Referenzen und Empfehlungen von Führungskräften und Teamkollegen – persönliche Einblicke in die Zusammenarbeit mit Tristan Germer.",
  },
  tools: {
    title: "Tools",
    description:
      "Entwicklungstools und Ressourcen, die Tristan Germer für Web-Entwicklung, Automatisierung und Produktivität einsetzt.",
  },
};
