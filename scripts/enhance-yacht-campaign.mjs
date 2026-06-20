#!/usr/bin/env node
/**
 * Enhance the existing PAUSED MerrySails yacht campaign:
 * hotel-zone bid modifiers + ZH language + grown negatives + call/WhatsApp/sitelink/callout/lead-form assets.
 * Idempotent-ish (re-running adds duplicates for negatives/assets; run once). Campaign stays PAUSED.
 */
import fs from "fs";
import path from "path";

const API = "v21";
const root = path.dirname(new URL(import.meta.url).pathname).replace(/\/scripts$/, "");
const env = {};
for (const line of fs.readFileSync(path.join(root, ".env.local"), "utf8").split("\n")) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/); if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}
const customerId = env.GOOGLE_ADS_CUSTOMER_ID?.replace(/-/g, "");
const creds = { clientId: env.GOOGLE_ADS_CLIENT_ID, clientSecret: env.GOOGLE_ADS_CLIENT_SECRET, refreshToken: env.GOOGLE_ADS_REFRESH_TOKEN, developerToken: env.GOOGLE_ADS_DEVELOPER_TOKEN };

let TKN;
async function token() {
  const r = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ client_id: creds.clientId, client_secret: creds.clientSecret, refresh_token: creds.refreshToken, grant_type: "refresh_token" }) });
  if (!r.ok) throw new Error("OAuth " + r.status); return (await r.json()).access_token;
}
const H = () => ({ Authorization: `Bearer ${TKN}`, "developer-token": creds.developerToken, "Content-Type": "application/json" });
async function mutate(resource, operations) {
  const r = await fetch(`https://googleads.googleapis.com/${API}/customers/${customerId}/${resource}:mutate`, { method: "POST", headers: H(), body: JSON.stringify({ operations }) });
  const t = await r.text(); if (!r.ok) throw new Error(`${resource} ${r.status}: ${t}`); return JSON.parse(t);
}
async function search(query) {
  const r = await fetch(`https://googleads.googleapis.com/${API}/customers/${customerId}/googleAds:search`, { method: "POST", headers: H(), body: JSON.stringify({ query }) });
  const t = await r.text(); if (!r.ok) throw new Error(`search ${r.status}: ${t}`); return JSON.parse(t);
}
async function resolveGeo(name) {
  const sg = await fetch(`https://googleads.googleapis.com/${API}/geoTargetConstants:suggest`, { method: "POST", headers: H(), body: JSON.stringify({ locale: "en", countryCode: "TR", locationNames: { names: [name] } }) });
  if (!sg.ok) return null;
  const j = await sg.json();
  const hit = (j.geoTargetConstantSuggestions || []).find(s => (s.geoTargetConstant?.canonicalName || "").includes("Istanbul")) || (j.geoTargetConstantSuggestions || [])[0];
  return hit ? { id: Number(hit.geoTargetConstant.id), name: hit.geoTargetConstant.canonicalName } : null;
}

const CAMPAIGN_NAME = "MS — Yacht Charter — Search — Intent";
const HOTEL_ZONES = ["Besiktas", "Beyoglu", "Fatih", "Sariyer"];
const MORE_NEG = ["yacht for sale","used yacht","second hand yacht","buy a yacht","yacht to buy","sailing course","skipper license","yacht crew jobs","deckhand","marina berth","boat insurance","model boat","rc boat","fishing charter","jet ski rental","parasailing tour","ferry timetable","greece yacht","croatia yacht","bodrum yacht","marmaris yacht","gocek yacht","yacht week","boat show","sailboat for sale","catamaran for sale","student discount","cheapest yacht","free cruise","public ferry"];
const SITELINKS = [
  { linkText: "WhatsApp a Quote", url: "https://wa.me/905448989812?text=Hi%2C%20I%27d%20like%20a%20yacht%20charter%20quote", d1: "Instant yacht quote", d2: "We reply in minutes" },
  { linkText: "Yacht Fleet & Prices", url: "https://merrysails.com/yacht-charter-istanbul", d1: "6 vessels from €220", d2: "Whole boat, direct" },
  { linkText: "Sunset Yacht for Two", url: "https://merrysails.com/cruises/bosphorus-sunset-cruise", d1: "Golden-hour Bosphorus", d2: "Private & romantic" },
  { linkText: "Proposal & Birthday", url: "https://merrysails.com/yacht-charter-istanbul", d1: "Custom on-board setup", d2: "Photographer add-on" },
];
const CALLOUTS = ["No Concierge Markup", "Captain & Crew Included", "TURSAB Licensed", "50,000+ Guests", "Free Cancellation"];

(async () => {
  TKN = await token();
  const c = await search(`SELECT campaign.resource_name FROM campaign WHERE campaign.name = '${CAMPAIGN_NAME}' AND campaign.status != 'REMOVED'`);
  const campaignRN = c.results?.[0]?.campaign?.resourceName;
  if (!campaignRN) { console.error("Campaign not found by name"); process.exit(1); }
  console.log("Campaign:", campaignRN);

  // 1. hotel-zone bid modifiers (+25%)
  try {
    const ops = [];
    for (const z of HOTEL_ZONES) { const g = await resolveGeo(z); if (g) { ops.push({ create: { campaign: campaignRN, location: { geoTargetConstant: `geoTargetConstants/${g.id}` }, bidModifier: 1.25 } }); console.log("  zone", z, "→", g.id, g.name); } }
    if (ops.length) { await mutate("campaignCriteria", ops); console.log("Hotel-zone bid modifiers (+25%):", ops.length); }
  } catch (e) { console.log("HOTEL-ZONE FAIL:", e.message.slice(0, 220)); }

  // 2. ZH language
  try { await mutate("campaignCriteria", [{ create: { campaign: campaignRN, type: "LANGUAGE", language: { languageConstant: "languageConstants/1017" } } }]); console.log("ZH (Chinese) language added"); } catch (e) { console.log("ZH FAIL:", e.message.slice(0, 150)); }

  // 3. grown negatives
  try { await mutate("campaignCriteria", MORE_NEG.map(k => ({ create: { campaign: campaignRN, negative: true, keyword: { text: k, matchType: "BROAD" } } }))); console.log("Grown negatives added:", MORE_NEG.length); } catch (e) { console.log("NEG FAIL:", e.message.slice(0, 220)); }

  // 4. call asset
  try {
    const a = await mutate("assets", [{ create: { callAsset: { countryCode: "TR", phoneNumber: "544 898 98 12", callConversionReportingState: "USE_ACCOUNT_LEVEL_CALL_CONVERSION_ACTION" } } }]);
    await mutate("campaignAssets", [{ create: { campaign: campaignRN, asset: a.results[0].resourceName, fieldType: "CALL" } }]);
    console.log("Call asset linked (+90 544 898 98 12)");
  } catch (e) { console.log("CALL FAIL:", e.message.slice(0, 260)); }

  // 5. sitelinks (incl. WhatsApp)
  for (const s of SITELINKS) {
    try {
      const a = await mutate("assets", [{ create: { finalUrls: [s.url], sitelinkAsset: { linkText: s.linkText, description1: s.d1, description2: s.d2 } } }]);
      await mutate("campaignAssets", [{ create: { campaign: campaignRN, asset: a.results[0].resourceName, fieldType: "SITELINK" } }]);
      console.log("Sitelink:", s.linkText);
    } catch (e) { console.log("SITELINK FAIL", s.linkText, ":", e.message.slice(0, 180)); }
  }

  // 6. callouts
  for (const txt of CALLOUTS) {
    try {
      const a = await mutate("assets", [{ create: { calloutAsset: { calloutText: txt } } }]);
      await mutate("campaignAssets", [{ create: { campaign: campaignRN, asset: a.results[0].resourceName, fieldType: "CALLOUT" } }]);
      console.log("Callout:", txt);
    } catch (e) { console.log("CALLOUT FAIL", txt, ":", e.message.slice(0, 150)); }
  }

  // 7. lead form (best-effort — needs a valid privacy policy URL + account eligibility)
  try {
    const lf = await mutate("assets", [{ create: { finalUrls: ["https://merrysails.com/yacht-charter-istanbul"], leadFormAsset: {
      businessName: "MerrySails",
      callToActionType: "GET_QUOTE",
      callToActionDescription: "Get a yacht quote",
      headline: "Private Yacht Charter Istanbul",
      description: "Tell us your date and group size — we will send a quote on WhatsApp.",
      fields: [{ inputType: "FULL_NAME" }, { inputType: "PHONE_NUMBER" }, { inputType: "EMAIL" }],
      privacyPolicyUrl: "https://merrysails.com/privacy-policy",
      postSubmitHeadline: "Thanks — we will be in touch",
      postSubmitDescription: "Our team will WhatsApp you a yacht quote shortly.",
    } } }]);
    await mutate("campaignAssets", [{ create: { campaign: campaignRN, asset: lf.results[0].resourceName, fieldType: "LEAD_FORM" } }]);
    console.log("Lead form linked (name + phone + email)");
  } catch (e) { console.log("LEAD-FORM FAIL (privacy URL / eligibility):", e.message.slice(0, 320)); }

  console.log("=== ENHANCE DONE (campaign still PAUSED) ===");
})().catch(e => { console.error("FATAL:", e.message); process.exit(1); });
