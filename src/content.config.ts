import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Treats empty or blank frontmatter values as undefined so optional fields can be left empty.
const emptyToUndefined = (v: unknown) => (v === null || v === undefined || v === "" ? undefined : v);
const optionalString = z.preprocess(emptyToUndefined, z.string().optional());
const optionalConnectDate = z.preprocess(emptyToUndefined, z.union([z.date(), z.string()]).optional());
const optionalUrl = z.preprocess(emptyToUndefined, z.url().optional());
const optionalEmail = z.preprocess(emptyToUndefined, z.email().optional());

const portfolio = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/portfolio" }),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            description: z.string(),
            featured: z.boolean().default(false),
            technologies: z.string(),
            date: z.date(),
            updatedDate: z.date().optional(),
            image: image(),
            imageBackgroundColor: z.string().optional(),
            imageFit: z.enum(["contain", "cover"]).default("contain"),
            icon: z.string().optional(),
            iconBackgroundColor: z.string().optional(),
            type: z.string(),
            linkGithub: z.string().optional(),
            linkWebsite: z.string().optional(),
            screenshotsAvailable: z.boolean().default(false),
            screenshotsPath: z.string().optional(),
            screenshotsFiles: z.array(z.string()).optional(),
            aiBuilt: z.boolean().default(false),
        }),
});

const blog = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            date: z.date(),
            description: z.string().optional(),
            image: image().optional(),
            imagePosition: z.string().default("center"),
            showContact: z.boolean().default(true),
            unlisted: z.boolean().default(false),
        }),
});

const connect = defineCollection({
    loader: glob({ pattern: "**/*.mdx", base: "./src/content/connect" }),
    schema: z.object({
        title: z.string(),
        intro: z.string(),
        event: optionalString,
        date: optionalConnectDate,
        location: optionalString,
        variant: z.enum(["general", "event"]).default("general"),
        showMapply: z.boolean().default(false),
        showClearControl: z.boolean().default(false),
        showSignatureAssistant: z.boolean().default(false),
        showVCard: z.boolean().default(true),
        vcardHref: z.string().default("/tristan-germer.vcf"),
        vcardLabel: z.string().default("Kontakt speichern"),
        ctaLabel: z.string().optional(),
        ctaHref: z.string().optional(),
        noindex: z.boolean().default(true),
    }),
});

const applicationStatus = z.enum(["gespeichert", "beworben", "eingangsbestätigung", "einladung", "vorstellungsgespräch", "zweitgespräch", "assessment", "angebot", "zusage", "absage", "zurückgezogen", "talentpool"]);

const statusEntry = z.object({
    status: applicationStatus,
    date: z.date(),
    info: optionalString,
});

const apply = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/apply" }),
    schema: z.object({
        // Speculative/unsolicited application (Initiativbewerbung).
        // true + position empty → "Initiativbewerbung" / "Speculative Application"
        // true + position set   → "Initiativbewerbung als {position}" / "Speculative Application for {position}"
        initiative: z.boolean().default(false),
        // Job title being applied for. Optional for speculative applications (initiative: true).
        position: optionalString,
        // Optional job reference number (e.g. "200645736"). Displayed on cover page and letter subject.
        refNumber: optionalString,
        company: z.string(),
        lang: z.enum(["de", "en"]).default("de"),
        date: z.date(),
        // Optional: name of a custom CV data file in src/data/ (without .ts extension).
        // Example: "cv_ey_de" → loads src/data/cv_ey_de.ts instead of cv_de.ts.
        cvData: z.string().optional(),
        // Show handwritten signature below date footer (print/PDF only).
        signature: z.boolean().default(false),
        // Show photo on cover page. Set to false for photo-free CVs.
        photo: z.boolean().default(true),
        // Cover letter salutation (e.g. "Sehr geehrter Herr Eger,")
        salutation: optionalString,
        // Application tracking fields (empty strings are treated as unset)
        jobUrl: optionalUrl,
        jobUrlArchived: optionalUrl,
        portalUrl: optionalUrl,
        contact: optionalString,
        companyAddress: optionalString,
        contactEmail: optionalEmail,
        salary: optionalString,
        source: optionalString,
        location: optionalString,
        notes: optionalString,
        // Auth token for direct access without password (e.g. ?t=<token> in shared links)
        token: optionalString,
        // === Attachments ===
        // Document IDs from src/data/documents.ts to attach to this application
        documents: z.array(z.string()).default([]),
        statusHistory: z.array(statusEntry).default([]),
    }),
});

export const collections = { portfolio, blog, connect, apply };
