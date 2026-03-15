// @ts-check
import { defineConfig } from "astro/config";
import { readFileSync, readdirSync } from "node:fs";

import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

// Read unlisted blog slugs from frontmatter (astro:content not available in config)
const unlistedSlugs = new Set(
  readdirSync("src/content/blog")
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .filter((f) => {
      const content = readFileSync(`src/content/blog/${f}`, "utf-8");
      const match = content.match(/^---\n([\s\S]*?)\n---/);
      return match && /^unlisted:\s*true$/m.test(match[1]);
    })
    .map((f) => `/blog/${f.replace(/\.mdx?$/, "")}/`),
);

// https://astro.build/config
export default defineConfig({
  site: "https://tger.me",

  vite: {
      plugins: [tailwindcss()],
  },

  integrations: [
    sitemap({
      filter: (page) => {
        if (page.includes("/apply/") || page.includes("/cv-print/")) return false;
        const path = new URL(page).pathname;
        return !unlistedSlugs.has(path);
      },
    }),
    icon(),
  ],
});