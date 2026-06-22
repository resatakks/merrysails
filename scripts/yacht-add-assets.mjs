#!/usr/bin/env node
/**
 * Add conversion ASSETS to the live MerrySails yacht Search campaign:
 * Call + Sitelinks (incl. WhatsApp) + Callouts + Structured Snippet + Lead Form.
 * The account+campaign currently have ZERO assets — this restores the
 * conversion surface (more SERP space, one-tap call, WhatsApp, lead submit).
 * Idempotent-ish: run once (re-running creates duplicates).
 */
import fs from "fs";
import path from "path";

const root = path.dirname(new URL(import.meta.url).pathname).replace(/\/scripts$/, "");
const env = {};
for (const line of fs.readFileSync(path.join(root, ".env.local"), "utf8").split("\n")) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/); if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}
const cid = env.GOOGLE_ADS_CUSTOMER_ID.replace(/-/g, "");
let TKN;
const token = async () => {
  const r = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ client_id: env.GOOGLE_ADS_CLIENT_ID, client_secret: env.GOOGLE_ADS_CLIENT_SECRET, refresh_token: env.GOOGLE_ADS_REFRESH_TOKEN, grant_type: "refresh_token" }) });
  return (await r.json()).access_token;
};
const H = () => ({ Authorization: `Bearer ${TKN}`, "developer-token": env.GOOGLE_ADS_DEVELOPER_TOKEN, "Content-Type": "application/json" });
const mutate = async (resource, operations) => {
  const r = await fetch(`https://googleads.googleapis.com/v21/customers/${cid}/${resource}:mutate`, { method: "POST", headers: H(), body: JSON.stringify({ operations }) });
  const t = await r.text(); if (!r.ok) throw new Error(`${resource} ${r.status}: ${t}`); return JSON.parse(t);
};
const search = async (query) => {
  const r = await fetch(`https://googleads.googleapis.com/v21/customers/${cid}/googleAds:search`, { method: "POST", headers: H(), body: JSON.stringify({ query }) });
  return (await r.json());
};

const SITELINKS = [
  { linkText: "WhatsApp a Quote", url: "https://wa.me/905448989812?text=Hi%2C%20I%27d%20like%20a%20yacht%20charter%20quote", d1: "Instant yacht quote", d2: "We reply in minutes" },
  { linkText: "Yacht Fleet & Prices", url: "https://merrysails.com/yacht-charter-istanbul", d1: "6 vessels from €220", d2: "Whole boat, direct" },
  { linkText: "Sunset Yacht for Two", url: "https://merrysails.com/cruises/bosphorus-sunset-cruise", d1: "Golden-hour Bosphorus", d2: "Private & romantic" },
  { linkText: "Proposal & Birthday", url: "https://merrysails.com/yacht-charter-istanbul", d1: "Custom on-board setup", d2: "Photographer add-on" },
];
const CALLOUTS = ["No Concierge Markup", "Captain & Crew Included", "TURSAB Licensed", "50,000+ Guests", "Free Cancellation"];

(async () => {
  TKN = await token();
  const c = await search(`SELECT campaign.resource_name FROM campaign WHERE campaign.name = 'MS — Yacht Charter — Search — Intent' AND campaign.status != 'REMOVED'`);
  const campaignRN = c.results?.[0]?.campaign?.resourceName;
  if (!campaignRN) { console.error("Campaign not found"); process.exit(1); }
  console.log("Campaign:", campaignRN);

  // 1. Call asset
  try {
    const a = await mutate("assets", [{ create: { callAsset: { countryCode: "TR", phoneNumber: "544 898 98 12", callConversionReportingState: "USE_ACCOUNT_LEVEL_CALL_CONVERSION_ACTION" } } }]);
    await mutate("campaignAssets", [{ create: { campaign: campaignRN, asset: a.results[0].resourceName, fieldType: "CALL" } }]);
    console.log("✅ Call asset (+90 544 898 98 12)");
  } catch (e) { console.log("✗ CALL:", e.message.slice(0, 220)); }

  // 2. Sitelinks
  for (const s of SITELINKS) {
    try {
      const a = await mutate("assets", [{ create: { finalUrls: [s.url], sitelinkAsset: { linkText: s.linkText, description1: s.d1, description2: s.d2 } } }]);
      await mutate("campaignAssets", [{ create: { campaign: campaignRN, asset: a.results[0].resourceName, fieldType: "SITELINK" } }]);
      console.log("✅ Sitelink:", s.linkText);
    } catch (e) { console.log("✗ SITELINK", s.linkText, ":", e.message.slice(0, 160)); }
  }

  // 3. Callouts
  for (const txt of CALLOUTS) {
    try {
      const a = await mutate("assets", [{ create: { calloutAsset: { calloutText: txt } } }]);
      await mutate("campaignAssets", [{ create: { campaign: campaignRN, asset: a.results[0].resourceName, fieldType: "CALLOUT" } }]);
      console.log("✅ Callout:", txt);
    } catch (e) { console.log("✗ CALLOUT", txt, ":", e.message.slice(0, 140)); }
  }

  // 4. Structured snippet
  try {
    const a = await mutate("assets", [{ create: { structuredSnippetAsset: { header: "Types", values: ["Sunset Cruise", "Dinner Cruise", "Private Charter", "Corporate Events", "Proposals"] } } }]);
    await mutate("campaignAssets", [{ create: { campaign: campaignRN, asset: a.results[0].resourceName, fieldType: "STRUCTURED_SNIPPET" } }]);
    console.log("✅ Structured snippet (Types)");
  } catch (e) { console.log("✗ SNIPPET:", e.message.slice(0, 160)); }

  // 5. Lead form (the "submit" — best-effort; needs privacy URL + account eligibility)
  try {
    const lf = await mutate("assets", [{ create: { finalUrls: ["https://merrysails.com/yacht-charter-istanbul"], leadFormAsset: {
      businessName: "MerrySails", callToActionType: "GET_QUOTE", callToActionDescription: "Get a yacht quote",
      headline: "Private Yacht Charter Istanbul", description: "Tell us your date and group size — we will send a quote on WhatsApp.",
      fields: [{ inputType: "FULL_NAME" }, { inputType: "PHONE_NUMBER" }, { inputType: "EMAIL" }],
      privacyPolicyUrl: "https://merrysails.com/privacy-policy",
      postSubmitHeadline: "Thanks — we will be in touch", postSubmitDescription: "Our team will WhatsApp you a yacht quote shortly.",
    } } }]);
    await mutate("campaignAssets", [{ create: { campaign: campaignRN, asset: lf.results[0].resourceName, fieldType: "LEAD_FORM" } }]);
    console.log("✅ Lead form (name+phone+email → GoogleAdsLead)");
  } catch (e) { console.log("✗ LEAD-FORM (privacy/eligibility):", e.message.slice(0, 300)); }

  console.log("=== ASSETS DONE ===");
})().catch(e => { console.error("FATAL:", e.message); process.exit(1); });
