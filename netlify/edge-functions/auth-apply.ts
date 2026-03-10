import type { Context } from "https://edge.netlify.com";

// ── Helpers ──────────────────────────────────────────────────────────────────

const COOKIE_NAME = "apply_session";
const COOKIE_TTL = 60 * 60 * 24; // 24 hours
const encoder = new TextEncoder();

async function hmac(secret: string, data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(data));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function sha256(input: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(input));
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function parseCookies(header: string | null): Record<string, string> {
  if (!header) return {};
  const cookies: Record<string, string> = {};
  for (const pair of header.split(";")) {
    const [k, ...v] = pair.split("=");
    if (k) cookies[k.trim()] = v.join("=").trim();
  }
  return cookies;
}

async function verifySession(request: Request, secret: string): Promise<boolean> {
  const cookies = parseCookies(request.headers.get("cookie"));
  const value = cookies[COOKIE_NAME];
  if (!value) return false;
  const [expiry, sig] = value.split(".");
  if (!expiry || !sig) return false;
  const expiryNum = parseInt(expiry, 10);
  if (isNaN(expiryNum) || Date.now() > expiryNum) return false;
  const expected = await hmac(secret, expiry);
  return sig === expected;
}

function sessionCookie(secret: string): Promise<string> {
  const expiry = (Date.now() + COOKIE_TTL * 1000).toString();
  return hmac(secret, expiry).then(
    (sig) =>
      `${COOKIE_NAME}=${expiry}.${sig}; Path=/apply; Max-Age=${COOKIE_TTL}; HttpOnly; Secure; SameSite=Lax`,
  );
}

function clearCookie(): string {
  return `${COOKIE_NAME}=; Path=/apply; Max-Age=0; HttpOnly; Secure; SameSite=Lax`;
}

/** Extract the application slug from the URL path. Returns null for overview / non-slug paths. */
function extractSlug(path: string): string | null {
  // Matches /apply/<slug>, /apply/<slug>.pdf, /apply/<slug>-letter.pdf, /apply/<slug>-job.pdf
  const m = path.match(/^\/apply\/([a-z0-9]{4,12})(?:(?:-(?:letter|job))?\.pdf)?(?:\/)?$/);
  return m ? m[1] : null;
}

// ── Token cache ──────────────────────────────────────────────────────────────

let tokenCache: Record<string, string | null> | null = null;
let tokenCacheTime = 0;
const TOKEN_CACHE_TTL = 60_000; // 1 minute

async function getTokens(siteUrl: string): Promise<Record<string, string | null>> {
  if (tokenCache && Date.now() - tokenCacheTime < TOKEN_CACHE_TTL) return tokenCache;
  try {
    const res = await fetch(new URL("/api/apply-tokens.json", siteUrl));
    if (res.ok) {
      tokenCache = await res.json();
      tokenCacheTime = Date.now();
      return tokenCache!;
    }
  } catch {
    // fall through
  }
  return tokenCache ?? {};
}

// ── Login page HTML ──────────────────────────────────────────────────────────

function loginPage(error = false): Response {
  const html = `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex, nofollow">
<title>Bewerbungen – Login</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #2563eb 100%); background-size: 200% 200%; animation: gradient 8s ease infinite; position: relative; overflow: hidden; }
  @keyframes gradient { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
  body::before, body::after { content: ''; position: absolute; width: 24rem; height: 24rem; border-radius: 9999px; background: rgba(255,255,255,0.05); filter: blur(48px); }
  body::before { top: -8rem; right: -8rem; }
  body::after { bottom: -8rem; left: -8rem; }
  .card { position: relative; z-index: 1; background: #fff; padding: 2rem; border-radius: 1rem; box-shadow: 0 20px 25px -5px rgba(0,0,0,.1); max-width: 24rem; width: 100%; margin: 0 1rem; }
  .header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
  .icon { width: 2.5rem; height: 2.5rem; border-radius: 0.75rem; background: #eff6ff; display: flex; align-items: center; justify-content: center; }
  .icon svg { width: 1.25rem; height: 1.25rem; color: #2563eb; }
  h1 { font-size: 1.125rem; font-weight: 700; color: #111827; }
  p.desc { font-size: 0.875rem; color: #6b7280; margin-bottom: 1rem; }
  form { display: flex; gap: 0.5rem; }
  input { flex: 1; padding: 0.5rem 0.75rem; border: 1px solid #d1d5db; border-radius: 0.5rem; font-size: 0.875rem; outline: none; }
  input:focus { border-color: #2563eb; box-shadow: 0 0 0 2px rgba(37,99,235,0.2); }
  button { padding: 0.5rem 1rem; background: #2563eb; color: #fff; font-size: 0.875rem; border: none; border-radius: 0.5rem; cursor: pointer; }
  button:hover { background: #1d4ed8; }
  .error { font-size: 0.875rem; color: #ef4444; margin-top: 0.5rem; ${error ? "" : "display:none;"} }
</style>
</head>
<body>
<div class="card">
  <div class="header">
    <div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg></div>
    <h1>Bewerbungen</h1>
  </div>
  <p class="desc">Bitte Passwort eingeben, um die Übersicht anzuzeigen.</p>
  <form method="POST" action="/apply">
    <label for="pw" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);">Passwort</label>
    <input id="pw" name="password" type="password" placeholder="Passwort" autocomplete="off" autofocus />
    <button type="submit">Login</button>
  </form>
  <p class="error">Falsches Passwort.</p>
</div>
</body>
</html>`;
  return new Response(html, {
    status: error ? 401 : 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

function unauthorizedPage(slug: string, request: Request): Response {
  const acceptLang = request.headers.get("accept-language") ?? "";
  const isEN = !acceptLang.match(/^de/i);
  const l = isEN
    ? {
        lang: "en",
        title: "Application – Access Restricted",
        heading: "Access Restricted",
        desc: "You are trying to access a job application by <strong>Tristan Germer</strong>. This page is not publicly available.",
        prompt: "If you have received an access token, you can enter it below:",
        label: "Token",
        placeholder: "e.g. Ab3xYz",
        button: "Open",
      }
    : {
        lang: "de",
        title: "Bewerbung – Zugriff eingeschränkt",
        heading: "Zugriff eingeschränkt",
        desc: "Sie versuchen, auf eine Bewerbung von <strong>Tristan Germer</strong> zuzugreifen. Diese Seite ist nicht öffentlich zugänglich.",
        prompt: "Falls Sie einen Zugangstoken erhalten haben, können Sie ihn hier eingeben:",
        label: "Token",
        placeholder: "z.B. Ab3xYz",
        button: "Öffnen",
      };
  const html = `<!DOCTYPE html>
<html lang="${l.lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex, nofollow">
<title>${l.title}</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #2563eb 100%); background-size: 200% 200%; animation: gradient 8s ease infinite; position: relative; overflow: hidden; }
  @keyframes gradient { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
  body::before, body::after { content: ''; position: absolute; width: 24rem; height: 24rem; border-radius: 9999px; background: rgba(255,255,255,0.05); filter: blur(48px); }
  body::before { top: -8rem; right: -8rem; }
  body::after { bottom: -8rem; left: -8rem; }
  .card { position: relative; z-index: 1; background: #fff; padding: 2rem; border-radius: 1rem; box-shadow: 0 20px 25px -5px rgba(0,0,0,.1); max-width: 28rem; width: 100%; margin: 0 1rem; }
  .header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
  .icon { width: 2.5rem; height: 2.5rem; border-radius: 0.75rem; background: #fef2f2; display: flex; align-items: center; justify-content: center; }
  .icon svg { width: 1.25rem; height: 1.25rem; color: #dc2626; }
  h1 { font-size: 1.125rem; font-weight: 700; color: #111827; }
  p { font-size: 0.875rem; color: #6b7280; margin-bottom: 0.75rem; line-height: 1.5; }
  .divider { border: none; border-top: 1px solid #e5e7eb; margin: 1rem 0; }
  .token-label { font-size: 0.75rem; font-weight: 600; color: #374151; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem; }
  form { display: flex; gap: 0.5rem; }
  input { flex: 1; padding: 0.5rem 0.75rem; border: 1px solid #d1d5db; border-radius: 0.5rem; font-size: 0.875rem; text-align: center; letter-spacing: 0.1em; outline: none; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
  input:focus { border-color: #2563eb; box-shadow: 0 0 0 2px rgba(37,99,235,0.2); }
  button { padding: 0.5rem 1rem; background: #2563eb; color: #fff; font-size: 0.875rem; border: none; border-radius: 0.5rem; cursor: pointer; white-space: nowrap; }
  button:hover { background: #1d4ed8; }
</style>
</head>
<body>
<div class="card">
  <div class="header">
    <div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg></div>
    <h1>${l.heading}</h1>
  </div>
  <p>${l.desc}</p>
  <p>${l.prompt}</p>
  <hr class="divider" />
  <p class="token-label">${l.label}</p>
  <form method="GET" action="/apply/${slug}/">
    <label for="tk" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);">${l.label}</label>
    <input id="tk" name="t" type="text" placeholder="${l.placeholder}" autocomplete="off" autofocus />
    <button type="submit">${l.button}</button>
  </form>
</div>
</body>
</html>`;
  return new Response(html, {
    status: 401,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

// ── Main handler ─────────────────────────────────────────────────────────────

export default async function (request: Request, context: Context) {
  const url = new URL(request.url);
  const path = url.pathname;

  const secret = Deno.env.get("APPLY_SESSION_SECRET");
  if (!secret) {
    console.error("APPLY_SESSION_SECRET not configured");
    return context.next();
  }

  // Logout: clear cookie and redirect
  if (path === "/apply/_logout" || path === "/apply/_logout/") {
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/apply",
        "Set-Cookie": clearCookie(),
      },
    });
  }

  const hasSession = await verifySession(request, secret);

  // Handle POST /apply (password login)
  if (request.method === "POST" && (path === "/apply" || path === "/apply/")) {
    try {
      const formData = await request.formData();
      const password = formData.get("password");
      if (!password || typeof password !== "string") {
        return loginPage(true);
      }

      const inputHash = await sha256(password);
      const hashes = [
        Deno.env.get("APPLY_PASSWORD_HASH"),
        Deno.env.get("APPLY_PASSWORD_HASH_SHARED"),
      ].filter(Boolean);

      if (hashes.includes(inputHash)) {
        const cookie = await sessionCookie(secret);
        return new Response(null, {
          status: 303,
          headers: {
            Location: "/apply",
            "Set-Cookie": cookie,
          },
        });
      }
      return loginPage(true);
    } catch {
      return loginPage(true);
    }
  }

  // Overview page (/apply or /apply/)
  if (path === "/apply" || path === "/apply/" || path === "/apply/index.html") {
    if (hasSession) return context.next();
    return loginPage();
  }

  // Individual application pages and PDFs
  const slug = extractSlug(path);
  if (slug) {
    if (hasSession) return context.next();

    // Check per-application token
    const token = url.searchParams.get("t");
    if (token) {
      const tokens = await getTokens(url.origin);
      if (tokens[slug] && tokens[slug] === token) {
        // Valid token — set a session cookie so PDF downloads etc. also work
        const cookie = await sessionCookie(secret);
        // If this is a page (not PDF), redirect to strip token from URL
        if (!path.endsWith(".pdf")) {
          return new Response(null, {
            status: 303,
            headers: {
              Location: `/apply/${slug}/`,
              "Set-Cookie": cookie,
            },
          });
        }
        // For PDFs, serve directly with cookie set
        const response = await context.next();
        const newResponse = new Response(response.body, response);
        newResponse.headers.set("Set-Cookie", cookie);
        return newResponse;
      }
    }

    return unauthorizedPage(slug, request);
  }

  // Anything else under /apply/* — pass through (e.g. OG images)
  return context.next();
}

export const config = { path: ["/apply", "/apply/*"] };
