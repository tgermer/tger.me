import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import sharp from "sharp";
import { existsSync, readFileSync } from "node:fs";
import { pages as staticPages } from "../../data/pages";
import { t } from "../../data/i18n";

const fontRegular = readFileSync("./node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-400-normal.woff");
const fontBold = readFileSync("./node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-700-normal.woff");

const photoBuffer = readFileSync("./src/assets/og/og-image-part.jpg");
const photoDataUri = `data:image/jpeg;base64,${photoBuffer.toString("base64")}`;

// --- Page definitions ---

const blogPosts = await getCollection("blog");
const portfolioProjects = await getCollection("portfolio");
const applications = await getCollection("apply");

interface OGPage {
    title: string;
    description?: string;
    icon?: string; // data URI for icon overlay
}

const ogPages: Record<string, OGPage> = {
    // Static pages – from centralized pages.ts
    ...Object.fromEntries(Object.entries(staticPages).map(([key, meta]) => [key, { title: meta.title, description: meta.description }])),

    // i18n pages – from centralized i18n.ts
    "de/about": { title: t("de").aboutPageTitle, description: t("de").aboutPageDescription },
    "en/about": { title: t("en").aboutPageTitle, description: t("en").aboutPageDescription },
    "de/cv": { title: t("de").cvPageTitle, description: t("de").cvPageDescription },
    "en/cv": { title: t("en").cvPageTitle, description: t("en").cvPageDescription },

    // Blog posts – from content collection
    ...Object.fromEntries(blogPosts.map((post) => [`blog/${post.slug}`, { title: post.data.title, description: post.data.description }])),

    // Portfolio projects – from content collection
    ...Object.fromEntries(
        portfolioProjects.map((project) => {
            const entry: OGPage = { title: project.data.title, description: project.data.description };
            const iconPath = project.data.icon;
            if (iconPath) {
                const filePath = `./public${iconPath}`;
                if (existsSync(filePath)) {
                    const svgContent = readFileSync(filePath);
                    entry.icon = `data:image/svg+xml;base64,${svgContent.toString("base64")}`;
                }
            }
            return [`portfolio/${project.slug}`, entry];
        }),
    ),

    // Applications – dynamically generated
    ...Object.fromEntries(
        applications.map((app) => {
            const isDE = app.data.lang === "de";
            const { initiative, position, company } = app.data;
            const label = isDE ? "Bewerbung als" : "Application for";
            const initLabel = isDE ? "Initiativbewerbung" : "Speculative Application";

            let title: string;
            if (initiative) {
                title = position ? (isDE ? `${initLabel} als ${position}` : `${initLabel} for ${position}`) : initLabel;
            } else {
                title = position ? `${label} ${position}` : company;
            }

            return [`apply/${app.slug}`, { title, description: company }];
        }),
    ),
};

// --- Text helpers ---

function truncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    const cut = text.substring(0, maxLength);
    const lastSpace = cut.lastIndexOf(" ");
    return (lastSpace > maxLength * 0.6 ? cut.substring(0, lastSpace) : cut) + "\u2026";
}

// --- OG image rendering ---

function renderOgImage(page: OGPage) {
    const showAuthor = page.title !== "Tristan Germer";
    const title = truncate(page.title, 80);
    // Hide description when title is long to prevent overlap
    const showDescription = page.description && title.length <= 55;

    return {
        type: "div",
        props: {
            style: {
                display: "flex",
                width: "100%",
                height: "100%",
                background: "linear-gradient(135deg, #0f43c2, #1e90ed)",
            },
            children: [
                // Left accent border
                {
                    type: "div",
                    props: {
                        style: {
                            position: "absolute",
                            left: 0,
                            top: 0,
                            bottom: 0,
                            width: 10,
                            background: "rgb(199, 232, 255)",
                        },
                    },
                },
                // Text content
                {
                    type: "div",
                    props: {
                        style: {
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-end",
                            flex: 1,
                            padding: "60px 40px 80px 60px",
                            overflow: "hidden",
                        },
                        children: [
                            ...(showAuthor
                                ? [
                                      {
                                          type: "p",
                                          props: {
                                              style: {
                                                  color: "rgb(199, 232, 255)",
                                                  fontSize: 34,
                                                  margin: 0,
                                                  marginBottom: 12,
                                              },
                                              children: "Tristan Germer",
                                          },
                                      },
                                  ]
                                : []),
                            {
                                type: "h1",
                                props: {
                                    style: {
                                        color: "white",
                                        fontSize: 62,
                                        fontWeight: 700,
                                        lineHeight: 1.2,
                                        margin: 0,
                                        overflowWrap: "break-word",
                                    },
                                    children: title,
                                },
                            },
                            ...(showDescription
                                ? [
                                      {
                                          type: "p",
                                          props: {
                                              style: {
                                                  color: "rgb(199, 232, 255)",
                                                  fontSize: 46,
                                                  lineHeight: 1.4,
                                                  margin: 0,
                                                  marginTop: 16,
                                              },
                                              children: truncate(page.description!, 100),
                                          },
                                      },
                                  ]
                                : []),
                        ],
                    },
                },
                // Photo on the right
                {
                    type: "div",
                    props: {
                        style: {
                            display: "flex",
                            position: "relative",
                            width: 350,
                            height: "100%",
                            overflow: "hidden",
                        },
                        children: [
                            {
                                type: "img",
                                props: {
                                    src: photoDataUri,
                                    width: 350,
                                    height: 630,
                                    style: {
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    },
                                },
                            },
                            // Icon overlay (portfolio projects)
                            ...(page.icon
                                ? [
                                      {
                                          type: "img",
                                          props: {
                                              src: page.icon,
                                              width: 100,
                                              height: 100,
                                              style: {
                                                  position: "absolute",
                                                  bottom: 80,
                                                  right: 40,
                                                  width: 100,
                                                  height: 100,
                                                  borderRadius: 20,
                                                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                                              },
                                          },
                                      },
                                  ]
                                : []),
                        ],
                    },
                },
            ],
        },
    };
}

// --- Astro endpoint ---

export const getStaticPaths: GetStaticPaths = () => {
    return Object.keys(ogPages).map((slug) => ({
        params: { slug: `${slug}.jpg` },
    }));
};

export const GET: APIRoute = async ({ params }) => {
    const slug = (params.slug as string).replace(/\.jpg$/, "");
    const page = ogPages[slug];
    if (!page) return new Response("Not found", { status: 404 });

    const svg = await satori(renderOgImage(page), {
        width: 1200,
        height: 630,
        fonts: [
            {
                name: "IBM Plex Sans",
                data: fontRegular,
                weight: 400,
                style: "normal" as const,
            },
            {
                name: "IBM Plex Sans",
                data: fontBold,
                weight: 700,
                style: "normal" as const,
            },
        ],
    });

    const resvg = new Resvg(svg, {
        fitTo: { mode: "width", value: 1200 },
    });
    const pngData = resvg.render().asPng();
    const jpegData = await sharp(pngData).jpeg({ quality: 80 }).toBuffer();

    return new Response(new Uint8Array(jpegData), {
        headers: {
            "Content-Type": "image/jpeg",
            "Cache-Control": "public, max-age=31536000, immutable",
        },
    });
};
