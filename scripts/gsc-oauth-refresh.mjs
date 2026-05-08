#!/usr/bin/env node
/**
 * GSC OAuth Refresh Token Generator
 *
 * Usage:
 *   1. node scripts/gsc-oauth-refresh.mjs auth-url
 *      → prints a Google consent URL. Open it in browser, approve, copy the
 *        full redirect URL (starts with http://127.0.0.1/?code=...)
 *
 *   2. node scripts/gsc-oauth-refresh.mjs exchange "<paste-redirect-url-or-code>"
 *      → exchanges the code for a refresh token, prints it, and you paste
 *        it into Vercel env GSC_REFRESH_TOKEN (Production+Preview+Dev) and
 *        local .env.local. Then redeploy.
 *
 * Requires GSC_CLIENT_ID + GSC_CLIENT_SECRET in .env.local (already set).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");
const redirectUri = "http://127.0.0.1";
const scopes = ["https://www.googleapis.com/auth/webmasters.readonly"];

loadEnv(path.join(rootDir, ".env.local"));

function loadEnv(file) {
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const i = trimmed.indexOf("=");
    if (i === -1) continue;
    const key = trimmed.slice(0, i).trim();
    const value = trimmed.slice(i + 1).trim().replace(/^['"]|['"]$/g, "");
    if (!process.env[key]) process.env[key] = value;
  }
}

const clientId = process.env.GSC_CLIENT_ID;
const clientSecret = process.env.GSC_CLIENT_SECRET;
if (!clientId || !clientSecret) {
  console.error("Missing GSC_CLIENT_ID / GSC_CLIENT_SECRET in .env.local");
  process.exit(1);
}

const cmd = process.argv[2];

if (cmd === "auth-url") {
  const url = `https://accounts.google.com/o/oauth2/v2/auth?${new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    access_type: "offline",
    prompt: "consent",
    scope: scopes.join(" "),
  }).toString()}`;
  console.log("\nOpen this URL in your browser, approve, then COPY the full redirect URL:\n");
  console.log(url);
  console.log("\nThe page won't load — copy the address bar URL (starts with http://127.0.0.1/?code=...)\n");
  console.log("Then run:  node scripts/gsc-oauth-refresh.mjs exchange \"<paste-here>\"\n");
} else if (cmd === "exchange") {
  const input = process.argv[3];
  if (!input) {
    console.error("Provide the redirect URL or code as 2nd arg");
    process.exit(1);
  }
  let code = input;
  if (input.startsWith("http")) {
    code = new URL(input).searchParams.get("code");
    if (!code) {
      console.error("No ?code= in URL");
      process.exit(1);
    }
  }
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      grant_type: "authorization_code",
      redirect_uri: redirectUri,
    }),
  });
  const json = await res.json();
  if (!res.ok || !json.refresh_token) {
    console.error("Exchange failed:", json);
    process.exit(1);
  }
  console.log("\n✅ NEW REFRESH TOKEN (paste into Vercel env GSC_REFRESH_TOKEN + local .env.local):\n");
  console.log(json.refresh_token);
  console.log("\nAlso update local .env.local then run:");
  console.log("  vercel env rm GSC_REFRESH_TOKEN production --yes");
  console.log("  vercel env add GSC_REFRESH_TOKEN production  # paste token");
  console.log("  vercel --prod --force                        # redeploy with new env\n");
} else {
  console.log("Usage:");
  console.log("  node scripts/gsc-oauth-refresh.mjs auth-url");
  console.log("  node scripts/gsc-oauth-refresh.mjs exchange \"<redirect-url>\"");
}
