import { defineCollection, z } from 'astro:content';

// Treats empty strings as undefined so optional fields can use "" as placeholder in frontmatter
const optionalString = z.preprocess((v) => (v === '' ? undefined : v), z.string().optional());
const optionalUrl = z.preprocess((v) => (v === '' ? undefined : v), z.string().url().optional());

const portfolio = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    featured: z.boolean().default(false),
    technologies: z.string(),
    date: z.date(),
    image: z.string(),
    imageBg: z.string().optional(),
    icon: z.string().optional(),
    iconBg: z.string().optional(),
    type: z.string(),
    linkGithub: z.string().url().optional(),
    linkWebsite: z.string().url().optional(),
    screenshotsAvailable: z.boolean().default(false),
    screenshotsPath: z.string().optional(),
    screenshotsFiles: z.array(z.string()).optional(),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    excerpt: z.string().optional(),
  }),
});

const applicationStatus = z.enum([
  'beworben',
  'eingangsbestätigung',
  'vorstellungsgespräch',
  'zweitgespräch',
  'assessment',
  'angebot',
  'zusage',
  'absage',
  'zurückgezogen',
]);

const statusEntry = z.object({
  status: applicationStatus,
  date: z.date(),
});

const resume = defineCollection({
  type: 'content',
  schema: z.object({
    position: z.string(),
    company: z.string(),
    lang: z.enum(['de', 'en']).default('de'),
    date: z.date(),
    // Optional: name of a custom CV data file in src/data/ (without .ts extension).
    // Example: "cv_ey_de" → loads src/data/cv_ey_de.ts instead of cv_de.ts.
    cvData: z.string().optional(),
    // Show handwritten signature below date footer (print/PDF only).
    signature: z.boolean().default(false),
    // Application tracking fields (empty strings are treated as unset)
    jobUrl: optionalUrl,
    contact: optionalString,
    salary: optionalString,
    source: optionalString,
    location: optionalString,
    notes: optionalString,
    statusHistory: z.array(statusEntry).default([]),
  }),
});

export const collections = { portfolio, blog, resume };
