#!/usr/bin/env node
/**
 * GA4 Admin API — mark conversion events as Key Events for merrysails.com.
 *
 * GA4 only counts an event as a conversion if it is flagged as a "Key Event".
 * The site fires whatsapp_click / phone_click / begin_checkout / generate_lead /
 * contact_us / form_submit, but only `purchase` is marked — so conversion
 * reporting + Google Ads optimisation run on incomplete data. This script marks
 * the rest via the GA4 Admin API.
 *
 * Needs GA4_EDIT_TOKEN in .env.local (run: node scripts/ga4-oauth.mjs auth-url edit
 * → authorize → exchange) plus shared GSC_CLIENT_ID / GSC_CLIENT_SECRET.
 *
 * Usage:  node scripts/ga4-keyevents.mjs          # list + create missing
 *         node scripts/ga4-keyevents.mjs --dry    # list only, no writes
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");
const PROPERTY_ID = "534226524";
const DRY = process.argv.includes("--dry");

// Events that should count as conversions (key events) for this brand.
const KEY_EVENTS = [
  "whatsapp_click",
  "phone_click",
  "begin_checkout",
  "generate_lead",
  "contact_us",
  "form_submit",
  "purchase",
];

loadEnv(path.join(rootDir, ".env.local"));
function loadEnv(file) {
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i === -1) continue;
    const k = t.slice(0, i).trim();
    const v = t.slice(i + 1).trim().replace(/^['"]|['"]$/g, "");
    if (!process.env[k]) process.env[k] = v;
  }
}

const clientId = process.env.GSC_CLIENT_ID;
const clientSecret = process.env.GSC_CLIENT_SECRET;
const editToken = process.env.GA4_EDIT_TOKEN;
if (!clientId || !clientSecret || !editToken) {
  console.error("Missing GSC_CLIENT_ID / GSC_CLIENT_SECRET / GA4_EDIT_TOKEN in .env.local");
  console.error("Run: node scripts/ga4-oauth.mjs auth-url edit   → authorize → exchange");
  process.exit(1);
}

async function accessToken() {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: editToken,
      grant_type: "refresh_token",
    }),
  });
  const json = await res.json();
  if (!res.ok || !json.access_token) throw new Error("Token refresh failed: " + JSON.stringify(json));
  return json.access_token;
}

const base = `https://analyticsadmin.googleapis.com/v1alpha/properties/${PROPERTY_ID}/keyEvents`;
const token = await accessToken();

// List existing key events
const listRes = await fetch(base, { headers: { Authorization: `Bearer ${token}` } });
const listJson = await listRes.json();
if (!listRes.ok) throw new Error("List failed: " + JSON.stringify(listJson));
const existing = new Set((listJson.keyEvents ?? []).map((k) => k.eventName));
console.log(`\nExisting key events: ${[...existing].join(", ") || "(none)"}`);

const missing = KEY_EVENTS.filter((e) => !existing.has(e));
if (missing.length === 0) {
  console.log("✅ All target events already marked as Key Events. Nothing to do.\n");
  process.exit(0);
}
console.log(`Missing → will create: ${missing.join(", ")}`);
if (DRY) {
  console.log("\n--dry: no writes performed.\n");
  process.exit(0);
}

for (const eventName of missing) {
  const res = await fetch(base, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ eventName, countingMethod: "ONCE_PER_EVENT" }),
  });
  const json = await res.json();
  if (res.ok) {
    console.log(`  ✅ ${eventName} → Key Event created`);
  } else {
    console.log(`  ❌ ${eventName} → ${JSON.stringify(json)}`);
  }
}
console.log("");
