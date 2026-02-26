import type { Lang } from "./i18n";

export function getNavigation(lang: Lang = "de") {
  return [
    { name: "Blog", link: "/blog" },
    { name: "Portfolio", link: "/portfolio" },
    { name: lang === "de" ? "Lebenslauf" : "CV", link: `/${lang}/cv` },
    { name: "CV-Übersicht", link: "/apply", devOnly: true },
    { name: lang === "de" ? "Referenzen" : "References", link: "/references" },
    { name: lang === "de" ? "Über mich" : "About me", link: `/${lang}/about` },
  ];
}

// Backward-compatible default export
export const navigation = getNavigation("de");
