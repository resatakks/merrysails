#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("fs");

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const API_VERSION = "v22";
const CUSTOMER_ID = "5484989676";
const SHARED_ENV_PATH = process.env.MERRYSAILS_SHARED_ENV_PATH || "";

const LIVE = process.argv.includes("--live");

const SEARCH_CAMPAIGNS = [
  "Search | INTL | Sunset | Travel Planners",
  "Search | INTL | Dinner | Travel Planners",
];

const KEYWORD_EXPANSION = {
  "Germany | Sunset Travel Planners": [
    "book bosphorus sunset cruise",
    "book sunset cruise istanbul",
    "istanbul bosphorus cruise sunset",
    "sunset bosphorus boat tour",
    "istanbul boat tour sunset",
    "bosphorus cruise tickets sunset",
    "istanbul sunset boat tour",
    "bosporus bootsfahrt buchen",
    "istanbul bosporus bootstour sonnenuntergang",
  ],
  "France | Sunset Travel Planners": [
    "book bosphorus sunset cruise",
    "book sunset cruise istanbul",
    "istanbul bosphorus cruise sunset",
    "sunset bosphorus boat tour",
    "istanbul boat tour sunset",
    "bosphorus cruise tickets sunset",
    "istanbul sunset boat tour",
    "reserver croisiere bosphore",
    "croisiere bosphore istanbul prix",
  ],
  "Netherlands | Sunset Travel Planners": [
    "book bosphorus sunset cruise",
    "book sunset cruise istanbul",
    "istanbul bosphorus cruise sunset",
    "sunset bosphorus boat tour",
    "istanbul boat tour sunset",
    "bosphorus cruise tickets sunset",
    "istanbul sunset boat tour",
    "bosporus cruise boeken",
    "istanbul boottocht boeken",
  ],
  "UK | Sunset Travel Planners": [
    "book bosphorus sunset cruise",
    "book sunset cruise istanbul",
    "istanbul bosphorus cruise sunset",
    "sunset bosphorus boat tour",
    "istanbul boat tour sunset",
    "bosphorus cruise tickets sunset",
    "istanbul sunset boat tour",
    "best bosphorus sunset cruise",
    "istanbul sunset cruise tickets",
  ],
  "China | Sunset Travel Planners": [
    "book bosphorus sunset cruise",
    "book sunset cruise istanbul",
    "istanbul bosphorus cruise sunset",
    "sunset bosphorus boat tour",
    "istanbul boat tour sunset",
    "bosphorus cruise tickets sunset",
    "istanbul sunset boat tour",
    "伊斯坦布尔 博斯普鲁斯 游船 预订",
    "伊斯坦布尔 日落 游船 价格",
  ],
  "Germany | Dinner Travel Planners": [
    "book bosphorus dinner cruise",
    "book dinner cruise istanbul",
    "istanbul bosphorus dinner cruise",
    "bosphorus dinner cruise tickets",
    "istanbul dinner cruise price",
    "bosphorus cruise dinner show",
    "turkish night cruise istanbul",
    "istanbul dinner cruise with pickup",
    "bosporus dinner cruise buchen",
    "istanbul abendessen schiff buchen",
  ],
  "France | Dinner Travel Planners": [
    "book bosphorus dinner cruise",
    "book dinner cruise istanbul",
    "istanbul bosphorus dinner cruise",
    "bosphorus dinner cruise tickets",
    "istanbul dinner cruise price",
    "bosphorus cruise dinner show",
    "turkish night cruise istanbul",
    "istanbul dinner cruise with pickup",
    "reserver diner croisiere istanbul",
    "croisiere diner bosphore prix",
  ],
  "Netherlands | Dinner Travel Planners": [
    "book bosphorus dinner cruise",
    "book dinner cruise istanbul",
    "istanbul bosphorus dinner cruise",
    "bosphorus dinner cruise tickets",
    "istanbul dinner cruise price",
    "bosphorus cruise dinner show",
    "turkish night cruise istanbul",
    "istanbul dinner cruise with pickup",
    "diner cruise istanbul boeken",
    "bosporus diner cruise boeken",
  ],
  "UK | Dinner Travel Planners": [
    "book bosphorus dinner cruise",
    "book dinner cruise istanbul",
    "istanbul bosphorus dinner cruise",
    "bosphorus dinner cruise tickets",
    "istanbul dinner cruise price",
    "bosphorus cruise dinner show",
    "turkish night cruise istanbul",
    "istanbul dinner cruise with pickup",
    "best bosphorus dinner cruise",
    "istanbul dinner cruise tickets",
  ],
  "China | Dinner Travel Planners": [
    "book bosphorus dinner cruise",
    "book dinner cruise istanbul",
    "istanbul bosphorus dinner cruise",
    "bosphorus dinner cruise tickets",
    "istanbul dinner cruise price",
    "bosphorus cruise dinner show",
    "turkish night cruise istanbul",
    "istanbul dinner cruise with pickup",
    "伊斯坦布尔 晚餐 游船 预订",
    "博斯普鲁斯 晚餐 游船 价格",
  ],
};

function loadSharedEnv(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const index = trimmed.indexOf("=");
    if (index === -1) continue;
    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

function requireEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env: ${name}`);
  return value;
}

function headers(accessToken) {
  return {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
    "developer-token": requireEnv("GOOGLE_ADS_DEVELOPER_TOKEN"),
  };
}

async function getAccessToken() {
  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: requireEnv("GOOGLE_ADS_CLIENT_ID"),
      client_secret: requireEnv("GOOGLE_ADS_CLIENT_SECRET"),
      refresh_token: requireEnv("GOOGLE_ADS_REFRESH_TOKEN"),
      grant_type: "refresh_token",
    }),
  });

  const json = await response.json();
  if (!response.ok || !json.access_token) {
    throw new Error(`Token refresh failed: ${JSON.stringify(json)}`);
  }

  return json.access_token;
}

async function search(accessToken, query) {
  const response = await fetch(
    `https://googleads.googleapis.com/${API_VERSION}/customers/${CUSTOMER_ID}/googleAds:searchStream`,
    {
      method: "POST",
      headers: headers(accessToken),
      body: JSON.stringify({ query }),
    }
  );

  const text = await response.text();
  const json = text ? JSON.parse(text) : [];

  if (!response.ok) {
    throw new Error(`Search failed: ${JSON.stringify(json, null, 2)}`);
  }

  return (json || []).flatMap((chunk) => chunk.results || []);
}

async function mutate(accessToken, mutateOperations, validateOnly) {
  const response = await fetch(
    `https://googleads.googleapis.com/${API_VERSION}/customers/${CUSTOMER_ID}/googleAds:mutate`,
    {
      method: "POST",
      headers: headers(accessToken),
      body: JSON.stringify({
        mutateOperations,
        partialFailure: false,
        validateOnly,
      }),
    }
  );

  const text = await response.text();
  const json = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(`Mutate failed: ${JSON.stringify(json, null, 2)}`);
  }

  return json;
}

function quoteList(values) {
  return values.map((value) => `'${value}'`).join(",");
}

async function main() {
  if (SHARED_ENV_PATH) loadSharedEnv(SHARED_ENV_PATH);
  const accessToken = await getAccessToken();

  const campaignRows = await search(
    accessToken,
    `SELECT campaign.name, campaign.resource_name
     FROM campaign
     WHERE campaign.name IN (${quoteList(SEARCH_CAMPAIGNS)})
       AND campaign.status != 'REMOVED'`
  );

  const adGroupRows = await search(
    accessToken,
    `SELECT campaign.name, ad_group.name, ad_group.resource_name
     FROM ad_group
     WHERE campaign.name IN (${quoteList(SEARCH_CAMPAIGNS)})
       AND ad_group.status != 'REMOVED'`
  );

  const keywordRows = await search(
    accessToken,
    `SELECT ad_group.name, ad_group_criterion.keyword.text, ad_group_criterion.keyword.match_type
     FROM keyword_view
     WHERE campaign.name IN (${quoteList(SEARCH_CAMPAIGNS)})`
  );

  const existingKeywords = new Set(
    keywordRows.map((row) =>
      [
        row.adGroup?.name,
        (row.adGroupCriterion?.keyword?.text || "").toLowerCase(),
        row.adGroupCriterion?.keyword?.matchType,
      ].join("|||")
    )
  );

  const operations = [];

  for (const row of campaignRows) {
    operations.push({
      campaignOperation: {
        update: {
          resourceName: row.campaign.resourceName,
          maximizeConversions: {},
        },
        updateMask: "maximize_conversions.target_cpa_micros",
      },
    });
  }

  for (const row of adGroupRows) {
    const keywords = KEYWORD_EXPANSION[row.adGroup.name] || [];
    for (const text of keywords) {
      for (const matchType of ["PHRASE", "EXACT"]) {
        const key = [row.adGroup.name, text.toLowerCase(), matchType].join("|||");
        if (existingKeywords.has(key)) continue;
        operations.push({
          adGroupCriterionOperation: {
            create: {
              adGroup: row.adGroup.resourceName,
              status: "ENABLED",
              keyword: { text, matchType },
            },
          },
        });
      }
    }
  }

  console.log(
    JSON.stringify(
      {
        mode: LIVE ? "LIVE" : "validate-only",
        campaigns: campaignRows.map((row) => row.campaign.name),
        adGroups: adGroupRows.length,
        operations: operations.length,
        changes: [
          "Clear Search target CPA constraint while keeping Maximize Conversions",
          "Add booking/ticket/price long-tail keywords as phrase + exact",
          "No budget changes",
          "No ad copy changes",
        ],
      },
      null,
      2
    )
  );

  if (operations.length === 0) return;

  await mutate(accessToken, operations, !LIVE);

  if (!LIVE) {
    console.log("Validation OK. Re-run with --live after quota is available.");
    return;
  }

  console.log("Live update OK.");
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
