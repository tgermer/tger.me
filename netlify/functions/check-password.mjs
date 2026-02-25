import { createHash } from "node:crypto";

export default async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const hash = process.env.APPLY_PASSWORD_HASH;
  if (!hash) {
    return Response.json({ ok: false, error: "not configured" }, { status: 500 });
  }

  let password;
  try {
    const body = await req.json();
    password = body.password;
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  if (!password || typeof password !== "string") {
    return Response.json({ ok: false }, { status: 400 });
  }

  const inputHash = createHash("sha256").update(password).digest("hex");

  if (inputHash === hash) {
    return Response.json({ ok: true });
  }

  return Response.json({ ok: false }, { status: 401 });
};

export const config = {
  path: "/.netlify/functions/check-password",
};
