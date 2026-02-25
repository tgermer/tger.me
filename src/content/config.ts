import { defineCollection, z } from 'astro:content';

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
  }),
});

export const collections = { portfolio, blog, resume };
