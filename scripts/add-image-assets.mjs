#!/usr/bin/env node
/**
 * Upload + link yacht image assets (landscape MARKETING_IMAGE + square SQUARE_MARKETING_IMAGE)
 * to the live campaign. Reads pre-cropped /tmp/ad-landscape.jpg + /tmp/ad-square.jpg.
 */
import fs from "fs";
import path from "path";
const API = "v21";
const root = path.dirname(new URL(import.meta.url).pathname).replace(/\/scripts$/, "");
const env = {};
for (const line of fs.readFileSync(path.join(root, ".env.local"), "utf8").split("\n")) { const m = line.match(/^([A-Z0-9_]+)=(.*)$/); if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, ""); }
const customerId = env.GOOGLE_ADS_CUSTOMER_ID?.replace(/-/g, "");
const creds = { clientId: env.GOOGLE_ADS_CLIENT_ID, clientSecret: env.GOOGLE_ADS_CLIENT_SECRET, refreshToken: env.GOOGLE_ADS_REFRESH_TOKEN, developerToken: env.GOOGLE_ADS_DEVELOPER_TOKEN };
let TKN;
async function token() { const r = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ client_id: creds.clientId, client_secret: creds.clientSecret, refresh_token: creds.refreshToken, grant_type: "refresh_token" }) }); if (!r.ok) throw new Error("OAuth " + r.status); return (await r.json()).access_token; }
const H = () => ({ Authorization: `Bearer ${TKN}`, "developer-token": creds.developerToken, "Content-Type": "application/json" });
async function mutate(resource, operations) { const r = await fetch(`https://googleads.googleapis.com/${API}/customers/${customerId}/${resource}:mutate`, { method: "POST", headers: H(), body: JSON.stringify({ operations }) }); const t = await r.text(); if (!r.ok) throw new Error(`${resource} ${r.status}: ${t}`); return JSON.parse(t); }

(async () => {
  TKN = await token();
  const campaignRN = `customers/${customerId}/campaigns/23959940309`;
  const items = [
    { file: "/tmp/ad-landscape.jpg", name: "MS Yacht Landscape", field: "MARKETING_IMAGE" },
    { file: "/tmp/ad-square.jpg", name: "MS Yacht Square", field: "SQUARE_MARKETING_IMAGE" },
  ];
  for (const it of items) {
    try {
      const data = fs.readFileSync(it.file).toString("base64");
      const a = await mutate("assets", [{ create: { name: it.name, type: "IMAGE", imageAsset: { data } } }]);
      await mutate("campaignAssets", [{ create: { campaign: campaignRN, asset: a.results[0].resourceName, fieldType: it.field } }]);
      console.log(`✓ ${it.field}: ${it.name} (${Math.round(fs.statSync(it.file).size / 1024)}KB)`);
    } catch (e) { console.log(`✗ ${it.field} FAIL:`, e.message.slice(0, 300)); }
  }
  console.log("Image assets done.");
})().catch(e => { console.error("FATAL:", e.message); process.exit(1); });
