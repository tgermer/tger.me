import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async () => {
  const resumes = await getCollection("apply");
  const tokens: Record<string, string | null> = {};
  for (const r of resumes) {
    tokens[r.slug] = r.data.token ?? null;
  }
  return new Response(JSON.stringify(tokens), {
    headers: { "Content-Type": "application/json" },
  });
};
