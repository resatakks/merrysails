#!/usr/bin/env node
/**
 * P0 FIX on live campaign 23959940309:
 *  (1) Link call + WhatsApp sitelink + sitelinks + callouts (currently ZERO assets —
 *      prior links went to a since-removed duplicate campaign).
 *  (2) Lower hotel-zone location bid modifiers 1.25 -> 1.10 so effective max-CPC stays
 *      <= ~TRY99 (operator hard ceiling: CPC must not exceed TRY90-100).
 * Idempotent: skips asset types already present.
 */
import fs from "fs";
import path from "path";
const API = "v21";
const CAMPAIGN_ID = "23959940309";
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

const SITELINKS = [
  { linkText: "WhatsApp a Quote", url: "https://wa.me/905448989812?text=Hi%2C%20I%27d%20like%20a%20yacht%20charter%20quote", d1: "Instant yacht quote", d2: "We reply in minutes" },
  { linkText: "Yacht Fleet & Prices", url: "https://merrysails.com/yacht-charter-istanbul", d1: "6 vessels from €220", d2: "Whole boat, direct" },
  { linkText: "Sunset Yacht for Two", url: "https://merrysails.com/cruises/bosphorus-sunset-cruise", d1: "Golden-hour Bosphorus", d2: "Private & romantic" },
  { linkText: "Proposal & Birthday", url: "https://merrysails.com/yacht-charter-istanbul", d1: "Custom on-board setup", d2: "Photographer add-on" },
];
const CALLOUTS = ["No Concierge Markup", "Captain & Crew Included", "TURSAB Licensed", "50,000+ Guests", "Free Cancellation"];

(async () => {
  TKN = await token();
  const campaignRN = `customers/${customerId}/campaigns/${CAMPAIGN_ID}`;

  // --- which asset field types already present? ---
  const have = new Set();
  for (const a of await search(`SELECT campaign.id,campaign_asset.field_type FROM campaign_asset WHERE campaign.id=${CAMPAIGN_ID} AND campaign_asset.status!='REMOVED'`)) have.add(a.campaignAsset.fieldType);
  console.log("Already linked:", [...have].join(", ") || "(none)");

  // --- CALL ---
  if (!have.has("CALL")) {
    try { const a = await mutate("assets", [{ create: { callAsset: { countryCode: "TR", phoneNumber: "544 898 98 12", callConversionReportingState: "USE_ACCOUNT_LEVEL_CALL_CONVERSION_ACTION" } } }]); await mutate("campaignAssets", [{ create: { campaign: campaignRN, asset: a.results[0].resourceName, fieldType: "CALL" } }]); console.log("✓ Call asset linked (+90 544 898 98 12)"); } catch (e) { console.log("✗ call FAIL:", e.message.slice(0, 200)); }
  }
  // --- SITELINKS ---
  if (!have.has("SITELINK")) {
    for (const s of SITELINKS) { try { const a = await mutate("assets", [{ create: { finalUrls: [s.url], sitelinkAsset: { linkText: s.linkText, description1: s.d1, description2: s.d2 } } }]); await mutate("campaignAssets", [{ create: { campaign: campaignRN, asset: a.results[0].resourceName, fieldType: "SITELINK" } }]); console.log("✓ Sitelink:", s.linkText); } catch (e) { console.log("✗ sitelink FAIL", s.linkText, e.message.slice(0, 140)); } }
  }
  // --- CALLOUTS ---
  if (!have.has("CALLOUT")) {
    for (const txt of CALLOUTS) { try { const a = await mutate("assets", [{ create: { calloutAsset: { calloutText: txt } } }]); await mutate("campaignAssets", [{ create: { campaign: campaignRN, asset: a.results[0].resourceName, fieldType: "CALLOUT" } }]); console.log("✓ Callout:", txt); } catch (e) { console.log("✗ callout FAIL", txt, e.message.slice(0, 140)); } }
  }

  // --- lower hotel-zone bid modifiers 1.25 -> 1.10 ---
  const locs = await search(`SELECT campaign.id,campaign_criterion.resource_name,campaign_criterion.bid_modifier,campaign_criterion.location.geo_target_constant FROM campaign_criterion WHERE campaign.id=${CAMPAIGN_ID} AND campaign_criterion.type='LOCATION' AND campaign_criterion.bid_modifier IS NOT NULL`);
  const ops = locs.filter(l => Number(l.campaignCriterion.bidModifier) > 1.10001).map(l => ({ update: { resourceName: l.campaignCriterion.resourceName, bidModifier: 1.10 }, updateMask: "bid_modifier" }));
  if (ops.length) { await mutate("campaignCriteria", ops); console.log(`✓ Lowered ${ops.length} hotel-zone modifiers 1.25 -> 1.10 (effective max-CPC now <= ~TRY99)`); }
  else console.log("Hotel-zone modifiers already <= 1.10");

  console.log("\n=== DONE — re-verify assets + modifiers below ===");
})().catch(e => { console.error("FATAL:", e.message); process.exit(1); });
