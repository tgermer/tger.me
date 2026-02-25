const { createHash } = require("node:crypto");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  const hashes = [
    process.env.APPLY_PASSWORD_HASH,
    process.env.APPLY_PASSWORD_HASH_SHARED,
  ].filter(Boolean);

  if (hashes.length === 0) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: false, error: "not configured" }),
    };
  }

  let password;
  try {
    const body = JSON.parse(event.body);
    password = body.password;
  } catch {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: false }),
    };
  }

  if (!password || typeof password !== "string") {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: false }),
    };
  }

  const inputHash = createHash("sha256").update(password).digest("hex");

  if (hashes.includes(inputHash)) {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: true }),
    };
  }

  return {
    statusCode: 401,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ok: false }),
  };
};
