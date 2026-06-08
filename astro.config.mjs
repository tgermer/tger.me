// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import { readFileSync, readdirSync } from "node:fs";

import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
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

  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "IBM Plex Sans",
      cssVariable: "--font-ibm-plex-sans",
      weights: [400, 500, 600, 700],
    },
    {
      provider: fontProviders.fontsource(),
      name: "IBM Plex Mono",
      cssVariable: "--font-ibm-plex-mono",
      weights: [400],
    },
  ],

  vite: {
      plugins: [tailwindcss()],
  },

  integrations: [
    mdx(),
    sitemap({
      filter: (page) => {
        const path = new URL(page).pathname;
        if (
          path === "/c/" ||
          path.startsWith("/c/") ||
          path === "/connect/" ||
          path.startsWith("/connect/") ||
          path.includes("/apply/") ||
          path.includes("/cv-print/")
        ) return false;
        return !unlistedSlugs.has(path);
      },
    }),
    icon(),
  ],
});
