#!/usr/bin/env node
/**
 * READ-ONLY MerrySails yacht campaign performance + conversion-measurement audit.
 * No mutations. Answers: did we spend? did we get clicks/conv? is WhatsApp-click
 * conversion actually counting? what are people searching (search terms)?
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
  if (!r.ok) throw new Error("OAuth " + r.status + " " + (await r.text()).slice(0,200)); return (await r.json()).access_token;
}
const H = () => ({ Authorization: `Bearer ${TKN}`, "developer-token": creds.developerToken, "Content-Type": "application/json" });
async function search(query) {
  const r = await fetch(`https://googleads.googleapis.com/${API}/customers/${customerId}/googleAds:search`, { method: "POST", headers: H(), body: JSON.stringify({ query }) });
  const t = await r.text(); if (!r.ok) throw new Error(`search ${r.status}: ${t.slice(0,300)}`); return JSON.parse(t);
}
const TRY = (micros) => (Number(micros||0)/1e6).toFixed(2);

(async () => {
  TKN = await token();

  console.log("===== ALL enabled campaigns — last 7 days =====");
  const camps = await search(`SELECT campaign.name, campaign.status, campaign.advertising_channel_type, metrics.cost_micros, metrics.clicks, metrics.impressions, metrics.conversions, metrics.conversions_value, metrics.ctr, metrics.average_cpc FROM campaign WHERE segments.date DURING LAST_7_DAYS AND campaign.status = 'ENABLED' ORDER BY metrics.cost_micros DESC`);
  for (const r of (camps.results||[])) {
    const m = r.metrics||{}; const c = r.campaign||{};
    console.log(`• ${c.name} [${c.status}/${c.advertisingChannelType}] — cost ₺${TRY(m.costMicros)} | clicks ${m.clicks||0} | impr ${m.impressions||0} | CTR ${((m.ctr||0)*100).toFixed(1)}% | avgCPC ₺${TRY(m.averageCpc)} | conv ${Number(m.conversions||0).toFixed(1)} | convVal ${Number(m.conversionsValue||0).toFixed(0)}`);
  }

  console.log("\n===== Yacht campaign — ad group breakdown (last 7d) =====");
  const ag = await search(`SELECT ad_group.name, metrics.cost_micros, metrics.clicks, metrics.impressions, metrics.conversions FROM ad_group WHERE segments.date DURING LAST_7_DAYS AND campaign.name = 'MS — Yacht Charter — Search — Intent' AND metrics.impressions > 0 ORDER BY metrics.cost_micros DESC`);
  for (const r of (ag.results||[])) { const m=r.metrics||{}; console.log(`  - ${r.adGroup.name}: ₺${TRY(m.costMicros)} | ${m.clicks||0} clk | ${m.impressions||0} imp | ${Number(m.conversions||0).toFixed(1)} conv`); }
  if (!(ag.results||[]).length) console.log("  (no impressions yet in any yacht ad group)");

  console.log("\n===== Search terms (what people typed) last 7d, yacht campaign =====");
  const st = await search(`SELECT search_term_view.search_term, metrics.clicks, metrics.cost_micros, metrics.conversions, metrics.impressions FROM search_term_view WHERE segments.date DURING LAST_7_DAYS AND campaign.name = 'MS — Yacht Charter — Search — Intent' AND metrics.impressions > 0 ORDER BY metrics.cost_micros DESC LIMIT 40`);
  for (const r of (st.results||[])) { const m=r.metrics||{}; console.log(`  "${r.searchTermView.searchTerm}" — ${m.clicks||0} clk ₺${TRY(m.costMicros)} ${m.impressions||0} imp ${Number(m.conversions||0).toFixed(1)} conv`); }
  if (!(st.results||[]).length) console.log("  (no search terms with impressions yet)");

  console.log("\n===== Conversion actions (MEASUREMENT audit) =====");
  const ca = await search(`SELECT conversion_action.name, conversion_action.type, conversion_action.status, conversion_action.primary_for_goal, conversion_action.counting_type FROM conversion_action WHERE conversion_action.status != 'REMOVED' ORDER BY conversion_action.name`);
  for (const r of (ca.results||[])) { const a=r.conversionAction||{}; console.log(`  • ${a.name} [${a.type}] status=${a.status} primaryForGoal=${a.primaryForGoal} counting=${a.countingType}`); }

  console.log("\n===== Conversions BY ACTION last 7d (is WhatsApp/Call counting?) =====");
  const cba = await search(`SELECT segments.conversion_action_name, metrics.all_conversions, metrics.conversions FROM customer WHERE segments.date DURING LAST_7_DAYS`);
  for (const r of (cba.results||[])) { const s=r.segments||{}; const m=r.metrics||{}; console.log(`  • ${s.conversionActionName||"(none)"}: conv ${Number(m.conversions||0).toFixed(1)} | allConv ${Number(m.allConversions||0).toFixed(1)}`); }
})().catch(e => { console.error("ERR:", e.message); process.exit(1); });
