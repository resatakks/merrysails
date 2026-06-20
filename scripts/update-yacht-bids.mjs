#!/usr/bin/env node
/**
 * FIX: ad-group max-CPC bids were set in EUR-equivalent micros (₺0.70–1.80) — far below
 * the TRY auction floor (~₺40) so zero impressions. Reset to real TRY bids (₺40–100 range,
 * operator-confirmed). cpcBidMicros = TRY × 1,000,000 (account currency = TRY).
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
async function search(query) { const r = await fetch(`https://googleads.googleapis.com/${API}/customers/${customerId}/googleAds:search`, { method: "POST", headers: H(), body: JSON.stringify({ query }) }); const t = await r.text(); if (!r.ok) throw new Error(`search ${r.status}: ${t}`); return JSON.parse(t).results || []; }

// TRY bid per ad-group theme (operator range ₺40–100). Cheap long-tails low, competitive high.
function bidFor(name) {
  const n = name.toLowerCase();
  if (n.includes("luxury") || n.includes("hotel-capture")) return 90;
  if (n.includes("private charter")) return 85;
  if (n.includes("rent/hire")) return 80;
  if (n.includes("corporate")) return 75;
  if (n.includes("head")) return 70;
  if (n.includes("proposal")) return 65;
  if (n.includes("couples")) return 60;
  if (n.includes("anniversary") || n.includes("honeymoon")) return 55;
  if (n.includes("german")) return 55;
  if (n.includes("birthday")) return 48;
  if (n.includes("bachelorette") || n.includes("russian")) return 45;
  if (n.includes("day/photo")) return 42;
  return 55;
}

(async () => {
  TKN = await token();
  const ags = await search(`SELECT ad_group.resource_name, ad_group.name, ad_group.cpc_bid_micros FROM ad_group WHERE campaign.id = 23959940309 AND ad_group.status != 'REMOVED'`);
  const ops = ags.map(a => {
    const bidTry = bidFor(a.adGroup.name);
    console.log(`  ${a.adGroup.name.padEnd(40)} ₺${Number(a.adGroup.cpcBidMicros) / 1e6} → ₺${bidTry}`);
    return { update: { resourceName: a.adGroup.resourceName, cpcBidMicros: String(bidTry * 1_000_000) }, updateMask: "cpcBidMicros" };
  });
  await mutate("adGroups", ops);
  console.log(`\n✅ Updated ${ops.length} ad-group max-CPC bids to ₺40–100 (TRY). Campaign can now win auctions.`);
})().catch(e => { console.error("FATAL:", e.message); process.exit(1); });
