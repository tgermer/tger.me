export interface PageMeta {
  title: string;
  description: string;
}

export const pages: Record<string, PageMeta> = {
  index: {
    title: "Tristan Germer",
    description:
      "Digitale Systeme, Automatisierung und KI-gestützte Prototypen von Tristan Germer – aus echten Problemen gebaut.",
  },
  portfolio: {
    title: "Portfolio",
    description:
      "Projekte von Tristan Germer – iOS-Apps, Web-Anwendungen, Daten-Visualisierungen und Automatisierungstools im Überblick.",
  },
  blog: {
    title: "Blog",
    description:
      "Notizen über KI-gestütztes Bauen, Digitalisierung, berufliche Neuorientierung und Systeme, die echte Probleme lösen.",
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
