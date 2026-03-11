// Central document registry for application attachments.
// Each entry maps to a PDF file in public/apply/docs/.
// Referenced by ID in application frontmatter: documents: [id1, id2, ...]

export interface DocumentEntry {
    /** Unique identifier, referenced in application frontmatter */
    id: string;
    /** Filename in public/apply/docs/ (German version) */
    filename: string;
    /** Filename of the English version in public/apply/docs/ (optional, falls back to filename) */
    filenameEn?: string;
    /** Display name (German) */
    name: string;
    /** Display name in English (optional, falls back to name) */
    nameEn?: string;
    /** Category for grouping in UI */
    category: "arbeitszeugnis" | "hochschulausbildung" | "zertifikat" | "sonstiges";
    /** ISO date string for sorting (YYYY-MM-DD or YYYY-MM) */
    date: string;
    /** Issuing organization in German (optional) */
    issuer?: string;
    /** Issuing organization in English (optional, falls back to issuer) */
    issuerEn?: string;
}

export type DocumentCategory = DocumentEntry["category"];

export const documentCategories: Record<DocumentCategory, { label: string; labelEn: string; order: number }> = {
    arbeitszeugnis: { label: "Arbeitszeugnisse", labelEn: "Work References", order: 1 },
    hochschulausbildung: { label: "Hochschulausbildung", labelEn: "University Education", order: 2 },
    zertifikat: { label: "Zertifikate", labelEn: "Certificates", order: 3 },
    sonstiges: { label: "Sonstiges", labelEn: "Other", order: 4 },
} as const;

export const documents: DocumentEntry[] = [
    // Add entries here as you collect documents. Example:
    // {
    //   id: 'az-example-2024',
    //   filename: 'YYYY-MM-DD--az-example.pdf',
    //   filenameEn: 'YYYY-MM-DD--work-ref-example.pdf', // optional
    //   name: 'Arbeitszeugnis Example GmbH',
    //   nameEn: 'Work Reference Example GmbH', // optional
    //   category: 'arbeitszeugnis',
    //   date: 'YYYY-MM-DD',
    //   issuer: 'Example GmbH',
    //   issuerEn: 'Example GmbH', // optional
    // },
    {
        id: "msc-urkunde",
        filename: "2018-04-19--msc-urkunde-de.pdf",
        filenameEn: "2018-04-19--msc-urkunde-en.pdf",
        name: "Masterurkunde Professional MSc, Vertiefung: Technische Kommunikation",
        nameEn: "Master's Certificate (MSc), Technical Communication",
        category: "hochschulausbildung",
        date: "2018-04-19",
        issuer: "Donau-Universität Krems",
        issuerEn: "Danube University Krems",
    },
    {
        id: "msc-zeugnis",
        filename: "2018-04-19--msc-abschlusspruefungszeugnis-de.pdf",
        filenameEn: "2018-04-19--msc-abschlusspruefungszeugnis-en.pdf",
        name: "Abschlussprüfungszeugnis Professional MSc, Vertiefung: Technische Kommunikation",
        nameEn: "Master's Examination Certificate (MSc), Technical Communication",
        category: "hochschulausbildung",
        date: "2018-04-19",
        issuer: "Donau-Universität Krems",
        issuerEn: "Danube University Krems",
    },
    {
        id: "ba-urkunde",
        filename: "2013-08-30--ba-urkunde.pdf",
        name: "Bachelorurkunde Betriebswirtschaft B.A.",
        nameEn: "Bachelor's Degree Certificate Business Administration B.A.",
        category: "hochschulausbildung",
        date: "2013-08-30",
        issuer: "Hochschule München (HM)",
        issuerEn: "Munich University of Applied Sciences",
    },
    {
        id: "ba-zeugnis",
        filename: "2013-08-30--ba-zeugnis.pdf",
        name: "Bachelorprüfungszeugnis Betriebswirtschaft B.A.",
        nameEn: "Bachelor's Examination Certificate Business Administration B.A.",
        category: "hochschulausbildung",
        date: "2013-08-30",
        issuer: "Hochschule München (HM)",
        issuerEn: "Munich University of Applied Sciences",
    },
    {
        id: "az-bvs",
        filename: "2024-12-31--az-bvs.pdf",
        name: "Arbeitszeugnis",
        category: "arbeitszeugnis",
        date: "2024-12-31",
        issuer: "Bayerische Verwaltungsschule (BVS)",
    },
    {
        id: "az-hm",
        filename: "2022-09-30--az-hm.pdf",
        name: "Arbeitszeugnis",
        category: "arbeitszeugnis",
        date: "2022-09-30",
        issuer: "Hochschule München (HM)",
        issuerEn: "Munich University of Applied Sciences (HM)",
    },
    {
        id: "ios-nanodegree",
        filename: "2024-12-04--ios-nanodegree.pdf",
        name: "iOS Development with SwiftUI and SwiftData, Nanodegree",
        category: "zertifikat",
        date: "2024-12-04",
        issuer: "UDACITY",
    },
    {
        id: "pspo-1",
        filename: "2024-08-03--pspo-1.pdf",
        name: "Professional Scrum Product Owner I (PSPO I)",
        category: "zertifikat",
        date: "2024-08-03",
        issuer: "Scrum.org",
    },
    {
        id: "psm-1",
        filename: "2024-07-07--psm-1.pdf",
        name: "Professional Scrum Master I (PSM I)",
        category: "zertifikat",
        date: "2024-07-07",
        issuer: "Scrum.org",
    },
    {
        id: "projekte-leiten",
        filename: "2015-07-15--projekte-leiten.pdf",
        name: "Projekte leiten",
        nameEn: "Leading Projects",
        category: "zertifikat",
        date: "2015-07-15",
        issuer: "B-SCT",
    },
    {
        id: "projekte-managen",
        filename: "2015-06-24--projekte-managen.pdf",
        name: "Projekte managen",
        nameEn: "Managing Projects",
        category: "zertifikat",
        date: "2015-06-24",
        issuer: "B-SCT",
    },
    {
        id: "decs-basic",
        filename: "2018-10-24--decs-flow-forms-basic.pdf",
        name: "d.ecs flow + forms Customizing (Basic)",
        category: "zertifikat",
        date: "2018-10-24",
        issuer: "d.evelop academy",
    },
    {
        id: "decs-advanced",
        filename: "2018-11-28--decs-flow-forms-advanced.pdf",
        name: "d.ecs flow + forms Customizing (Advanced)",
        category: "zertifikat",
        date: "2018-11-28",
        issuer: "d.evelop academy",
    },
];
