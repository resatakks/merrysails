#!/usr/bin/env node
/**
 * GA4 Data API — OAuth refresh-token bootstrap for merrysails.com.
 *
 * Reuses the existing OAuth client (GSC_CLIENT_ID / GSC_CLIENT_SECRET) but
 * requests the analytics.readonly scope and stores a SEPARATE refresh token
 * (GA4_REFRESH_TOKEN) — so the working GSC token is never touched.
 *
 * PREREQUISITE (one-time, in Google Cloud Console for the project that owns
 * GSC_CLIENT_ID): enable "Google Analytics Data API".
 *   → https://console.cloud.google.com/apis/library/analyticsdata.googleapis.com
 *
 * Usage:
 *   1. node scripts/ga4-oauth.mjs auth-url
 *      → open the URL, approve, copy the http://127.0.0.1/?code=... redirect
 *   2. node scripts/ga4-oauth.mjs exchange "<paste redirect URL>"
 *      → prints GA4_REFRESH_TOKEN — paste into .env.local + Vercel env
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");
const redirectUri = "http://127.0.0.1";
const scopes = ["https://www.googleapis.com/auth/analytics.readonly"];

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
  console.log("\nOpen this URL, approve GA4 read access, then COPY the full redirect URL:\n");
  console.log(url);
  console.log("\nThe page won't load — copy the address bar URL (http://127.0.0.1/?code=...)\n");
  console.log('Then run:  node scripts/ga4-oauth.mjs exchange "<paste-here>"\n');
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
  console.log("\n✅ GA4_REFRESH_TOKEN — paste into .env.local AND Vercel env:\n");
  console.log(json.refresh_token);
  console.log("\nLocal:  add line  GA4_REFRESH_TOKEN=\"<token>\"  to .env.local");
  console.log("Vercel: vercel env add GA4_REFRESH_TOKEN production   # paste token\n");
} else {
  console.log("Usage: node scripts/ga4-oauth.mjs auth-url | exchange \"<url>\"");
}
