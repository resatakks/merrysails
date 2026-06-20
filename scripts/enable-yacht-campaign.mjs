#!/usr/bin/env node
/**
 * Finalize + ENABLE the MerrySails yacht campaign: ensure campaign assets are linked
 * (call/WhatsApp/sitelinks/callouts/lead-form — re-link only if missing), then flip
 * status PAUSED → ENABLED. Operator authorized ₺1000/day spend (2026-06-20).
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

const SITELINKS = [
  { linkText: "WhatsApp a Quote", url: "https://wa.me/905448989812?text=Hi%2C%20I%27d%20like%20a%20yacht%20charter%20quote", d1: "Instant yacht quote", d2: "We reply in minutes" },
  { linkText: "Yacht Fleet & Prices", url: "https://merrysails.com/yacht-charter-istanbul", d1: "6 vessels from €220", d2: "Whole boat, direct" },
  { linkText: "Sunset Yacht for Two", url: "https://merrysails.com/cruises/bosphorus-sunset-cruise", d1: "Golden-hour Bosphorus", d2: "Private & romantic" },
  { linkText: "Proposal & Birthday", url: "https://merrysails.com/yacht-charter-istanbul", d1: "Custom on-board setup", d2: "Photographer add-on" },
];
const CALLOUTS = ["No Concierge Markup", "Captain & Crew Included", "TURSAB Licensed", "50,000+ Guests", "Free Cancellation"];

(async () => {
  TKN = await token();
  const c = await search(`SELECT campaign.resource_name, campaign.id, campaign.status FROM campaign WHERE campaign.name = 'MS — Yacht Charter — Search — Intent' AND campaign.status != 'REMOVED'`);
  if (!c.length) { console.error("Campaign not found"); process.exit(1); }
  const campaignRN = c[0].campaign.resourceName, campaignId = c[0].campaign.id;
  console.log("Campaign:", campaignRN, "status:", c[0].campaign.status);

  // check assets
  let assetCount = 0;
  try { assetCount = (await search(`SELECT campaign_asset.field_type FROM campaign_asset WHERE campaign.id = ${campaignId} AND campaign_asset.status != 'REMOVED'`)).length; } catch (e) { console.log("asset check err (will link):", e.message.slice(0, 80)); }
  console.log("Existing campaign assets:", assetCount);

  if (assetCount < 3) {
    console.log("Linking assets...");
    try { const a = await mutate("assets", [{ create: { callAsset: { countryCode: "TR", phoneNumber: "544 898 98 12", callConversionReportingState: "USE_ACCOUNT_LEVEL_CALL_CONVERSION_ACTION" } } }]); await mutate("campaignAssets", [{ create: { campaign: campaignRN, asset: a.results[0].resourceName, fieldType: "CALL" } }]); console.log("  Call ✓"); } catch (e) { console.log("  call FAIL:", e.message.slice(0, 180)); }
    for (const s of SITELINKS) { try { const a = await mutate("assets", [{ create: { finalUrls: [s.url], sitelinkAsset: { linkText: s.linkText, description1: s.d1, description2: s.d2 } } }]); await mutate("campaignAssets", [{ create: { campaign: campaignRN, asset: a.results[0].resourceName, fieldType: "SITELINK" } }]); console.log("  Sitelink ✓", s.linkText); } catch (e) { console.log("  sitelink FAIL", s.linkText, e.message.slice(0, 120)); } }
    for (const txt of CALLOUTS) { try { const a = await mutate("assets", [{ create: { calloutAsset: { calloutText: txt } } }]); await mutate("campaignAssets", [{ create: { campaign: campaignRN, asset: a.results[0].resourceName, fieldType: "CALLOUT" } }]); console.log("  Callout ✓", txt); } catch (e) { console.log("  callout FAIL", txt, e.message.slice(0, 120)); } }
    try { const lf = await mutate("assets", [{ create: { finalUrls: ["https://merrysails.com/yacht-charter-istanbul"], leadFormAsset: { businessName: "MerrySails", callToActionType: "GET_QUOTE", callToActionDescription: "Get a yacht quote", headline: "Private Yacht Charter Istanbul", description: "Tell us your date and group size — we will send a quote on WhatsApp.", fields: [{ inputType: "FULL_NAME" }, { inputType: "PHONE_NUMBER" }, { inputType: "EMAIL" }], privacyPolicyUrl: "https://merrysails.com/privacy-policy", postSubmitHeadline: "Thanks — we will be in touch", postSubmitDescription: "Our team will WhatsApp you a yacht quote shortly." } } }]); await mutate("campaignAssets", [{ create: { campaign: campaignRN, asset: lf.results[0].resourceName, fieldType: "LEAD_FORM" } }]); console.log("  Lead form ✓"); } catch (e) { console.log("  lead-form FAIL:", e.message.slice(0, 200)); }
  } else { console.log("Assets already present — skipping re-link."); }

  // ENABLE
  await mutate("campaigns", [{ update: { resourceName: campaignRN, status: "ENABLED" }, updateMask: "status" }]);
  console.log("\n🚀 CAMPAIGN ENABLED — now LIVE, spending up to ₺1000/day. Monitor + kill any ad group >€350 CPA.");
})().catch(e => { console.error("FATAL:", e.message); process.exit(1); });
