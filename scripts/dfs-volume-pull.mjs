#!/usr/bin/env node
/**
 * One-off DataForSEO Google Ads Search Volume pull.
 * Usage: node --env-file=.env.local scripts/dfs-volume-pull.mjs <location_code> <kw1> <kw2> ...
 * Locations: 2826=UK, 2840=US, 2276=DE, 2792=TR, 2250=FR, 2528=NL
 * Pricing: ~$0.05 per 100 keywords (Google Ads endpoint)
 */

const login = process.env.DATAFORSEO_LOGIN;
const password = process.env.DATAFORSEO_PASSWORD;
if (!login || !password) {
  console.error("DATAFORSEO_LOGIN / DATAFORSEO_PASSWORD not set");
  process.exit(1);
}

const auth = "Basic " + Buffer.from(`${login}:${password}`).toString("base64");
const args = process.argv.slice(2);
const locationCode = parseInt(args[0], 10);
const keywords = args.slice(1);

if (!locationCode || keywords.length === 0) {
  console.error("Usage: dfs-volume-pull.mjs <location_code> <kw1> <kw2> ...");
  process.exit(1);
}

const body = [
  {
    keywords,
    location_code: locationCode,
    language_code: locationCode === 2792 ? "tr" : locationCode === 2276 ? "de" : locationCode === 2250 ? "fr" : locationCode === 2528 ? "nl" : "en",
    date_from: "2025-05-01",
  },
];

const res = await fetch(
  "https://api.dataforseo.com/v3/keywords_data/google_ads/search_volume/live",
  {
    method: "POST",
    headers: { Authorization: auth, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }
);

const data = await res.json();
const task = data.tasks?.[0];

if (task?.status_code !== 20000) {
  console.error("Task error:", task?.status_message);
  process.exit(1);
}

const cost = data.cost ?? "n/a";
const items = task.result ?? [];

// Sort by volume desc
items.sort((a, b) => (b.search_volume ?? 0) - (a.search_volume ?? 0));

console.log(`\n📊 Volume pull — location ${locationCode} — cost $${cost}\n`);
console.log("Keyword | Vol/mo | CPC | Competition");
console.log("---|---:|---:|---");
for (const it of items) {
  const cpc = it.cpc != null ? `$${it.cpc.toFixed(2)}` : "—";
  const comp = it.competition_index != null ? `${it.competition_index} (${it.competition ?? "?"})` : "—";
  console.log(`${it.keyword} | ${it.search_volume ?? 0} | ${cpc} | ${comp}`);
}

const total = items.reduce((sum, it) => sum + (it.search_volume ?? 0), 0);
console.log(`\n**Total addressable (sum)**: ${total} vol/mo`);
console.log(`**Cost**: $${cost}`);
