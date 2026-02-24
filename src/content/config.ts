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

export const collections = { portfolio, blog };
