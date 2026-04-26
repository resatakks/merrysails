#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("fs");

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const API_VERSION = "v22";
const CUSTOMER_ID = "5484989676";
const SHARED_ENV_PATH = process.env.MERRYSAILS_SHARED_ENV_PATH || "";
const LIVE = process.argv.includes("--live");

const CPC_CEILING_TL = 120;
const CPC_CEILING_MICROS = CPC_CEILING_TL * 1_000_000;

const SEARCH_CAMPAIGNS = [
  "Search | INTL | Sunset | Travel Planners",
  "Search | INTL | Dinner | Travel Planners",
];

const ENGLISH_EXPANSION = {
  "Germany | Sunset Travel Planners": [
    "bosphorus cruise",
    "istanbul bosphorus cruise",
    "bosphorus boat tour",
    "istanbul boat tour",
    "bosphorus cruise tickets",
    "bosphorus cruise price",
    "best bosphorus cruise",
    "istanbul cruise tickets",
    "istanbul cruise price",
    "istanbul sunset tour",
    "bosphorus sunset tour",
    "sunset boat trip istanbul",
    "evening bosphorus cruise",
  ],
  "France | Sunset Travel Planners": [
    "bosphorus cruise",
    "istanbul bosphorus cruise",
    "bosphorus boat tour",
    "istanbul boat tour",
    "bosphorus cruise tickets",
    "bosphorus cruise price",
    "best bosphorus cruise",
    "istanbul cruise tickets",
    "istanbul cruise price",
    "istanbul sunset tour",
    "bosphorus sunset tour",
    "sunset boat trip istanbul",
    "evening bosphorus cruise",
  ],
  "Netherlands | Sunset Travel Planners": [
    "bosphorus cruise",
    "istanbul bosphorus cruise",
    "bosphorus boat tour",
    "istanbul boat tour",
    "bosphorus cruise tickets",
    "bosphorus cruise price",
    "best bosphorus cruise",
    "istanbul cruise tickets",
    "istanbul cruise price",
    "istanbul sunset tour",
    "bosphorus sunset tour",
    "sunset boat trip istanbul",
    "evening bosphorus cruise",
  ],
  "UK | Sunset Travel Planners": [
    "bosphorus cruise",
    "istanbul bosphorus cruise",
    "bosphorus boat tour",
    "istanbul boat tour",
    "bosphorus cruise tickets",
    "bosphorus cruise price",
    "best bosphorus cruise",
    "istanbul cruise tickets",
    "istanbul cruise price",
    "istanbul sunset tour",
    "bosphorus sunset tour",
    "sunset boat trip istanbul",
    "evening bosphorus cruise",
  ],
  "China | Sunset Travel Planners": [
    "bosphorus cruise",
    "istanbul bosphorus cruise",
    "bosphorus boat tour",
    "istanbul boat tour",
    "bosphorus cruise tickets",
    "bosphorus cruise price",
    "best bosphorus cruise",
    "istanbul cruise tickets",
    "istanbul cruise price",
    "istanbul sunset tour",
    "bosphorus sunset tour",
    "sunset boat trip istanbul",
    "evening bosphorus cruise",
  ],
  "Germany | Dinner Travel Planners": [
    "istanbul night cruise",
    "bosphorus night cruise",
    "bosphorus cruise dinner",
    "istanbul cruise dinner",
    "dinner on bosphorus",
    "turkish night cruise",
    "istanbul boat dinner",
    "bosphorus dinner show",
    "dinner cruise turkey",
    "istanbul evening cruise",
    "istanbul night boat tour",
    "bosphorus dinner cruise price",
    "dinner cruise with hotel pickup",
  ],
  "France | Dinner Travel Planners": [
    "istanbul night cruise",
    "bosphorus night cruise",
    "bosphorus cruise dinner",
    "istanbul cruise dinner",
    "dinner on bosphorus",
    "turkish night cruise",
    "istanbul boat dinner",
    "bosphorus dinner show",
    "dinner cruise turkey",
    "istanbul evening cruise",
    "istanbul night boat tour",
    "bosphorus dinner cruise price",
    "dinner cruise with hotel pickup",
  ],
  "Netherlands | Dinner Travel Planners": [
    "istanbul night cruise",
    "bosphorus night cruise",
    "bosphorus cruise dinner",
    "istanbul cruise dinner",
    "dinner on bosphorus",
    "turkish night cruise",
    "istanbul boat dinner",
    "bosphorus dinner show",
    "dinner cruise turkey",
    "istanbul evening cruise",
    "istanbul night boat tour",
    "bosphorus dinner cruise price",
    "dinner cruise with hotel pickup",
  ],
  "UK | Dinner Travel Planners": [
    "istanbul night cruise",
    "bosphorus night cruise",
    "bosphorus cruise dinner",
    "istanbul cruise dinner",
    "dinner on bosphorus",
    "turkish night cruise",
    "istanbul boat dinner",
    "bosphorus dinner show",
    "dinner cruise turkey",
    "istanbul evening cruise",
    "istanbul night boat tour",
    "bosphorus dinner cruise price",
    "dinner cruise with hotel pickup",
  ],
  "China | Dinner Travel Planners": [
    "istanbul night cruise",
    "bosphorus night cruise",
    "bosphorus cruise dinner",
    "istanbul cruise dinner",
    "dinner on bosphorus",
    "turkish night cruise",
    "istanbul boat dinner",
    "bosphorus dinner show",
    "dinner cruise turkey",
    "istanbul evening cruise",
    "istanbul night boat tour",
    "bosphorus dinner cruise price",
    "dinner cruise with hotel pickup",
  ],
};

const NON_ENGLISH_MARKERS = [
  "abendessen",
  "boeken",
  "bootsfahrt",
  "bootstour",
  "buchen",
  "croisiere",
  "diner cruise",
  "reserver",
  "schiff",
  "sonnenuntergang",
  "游船",
  "博斯普鲁斯",
  "伊斯坦布尔",
  "预订",
  "价格",
  "日落",
  "晚餐",
];

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
  return values.map((value) => `'${value.replace(/'/g, "\\'")}'`).join(",");
}

function isNonEnglishKeyword(text) {
  const lower = text.toLowerCase();
  return NON_ENGLISH_MARKERS.some((marker) => lower.includes(marker));
}

function keywordKey(text, matchType) {
  return `${text.toLowerCase()}|${matchType}`;
}

function createKeywordOperation(adGroup, text, matchType) {
  return {
    adGroupCriterionOperation: {
      create: {
        adGroup,
        status: "ENABLED",
        keyword: {
          text,
          matchType,
        },
      },
    },
  };
}

async function main() {
  if (SHARED_ENV_PATH) loadSharedEnv(SHARED_ENV_PATH);
  const accessToken = await getAccessToken();

  const campaignRows = await search(
    accessToken,
    `SELECT campaign.name, campaign.resource_name, campaign.bidding_strategy_type
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
    `SELECT campaign.name, ad_group.name, ad_group.resource_name, ad_group_criterion.resource_name, ad_group_criterion.status, ad_group_criterion.keyword.text, ad_group_criterion.keyword.match_type
     FROM keyword_view
     WHERE campaign.name IN (${quoteList(SEARCH_CAMPAIGNS)})
       AND ad_group_criterion.status != 'REMOVED'`
  );

  const operations = [];

  for (const row of campaignRows) {
    operations.push({
      campaignOperation: {
        update: {
          resourceName: row.campaign.resourceName,
          targetSpend: {
            cpcBidCeilingMicros: CPC_CEILING_MICROS,
          },
        },
        updateMask: "target_spend.cpc_bid_ceiling_micros",
      },
    });
  }

  const pausedKeywords = [];
  for (const row of keywordRows) {
    const text = row.adGroupCriterion.keyword.text;
    if (row.adGroupCriterion.status === "ENABLED" && isNonEnglishKeyword(text)) {
      pausedKeywords.push({
        campaign: row.campaign.name,
        adGroup: row.adGroup.name,
        text,
        matchType: row.adGroupCriterion.keyword.matchType,
      });
      operations.push({
        adGroupCriterionOperation: {
          update: {
            resourceName: row.adGroupCriterion.resourceName,
            status: "PAUSED",
          },
          updateMask: "status",
        },
      });
    }
  }

  const adGroups = new Map(adGroupRows.map((row) => [row.adGroup.name, row.adGroup.resourceName]));
  const existingByAdGroup = new Map();
  for (const row of keywordRows) {
    const current = existingByAdGroup.get(row.adGroup.name) || new Set();
    current.add(keywordKey(row.adGroupCriterion.keyword.text, row.adGroupCriterion.keyword.matchType));
    existingByAdGroup.set(row.adGroup.name, current);
  }

  const addedKeywords = [];
  for (const [adGroupName, keywords] of Object.entries(ENGLISH_EXPANSION)) {
    const adGroup = adGroups.get(adGroupName);
    if (!adGroup) throw new Error(`Missing ad group: ${adGroupName}`);

    const existing = existingByAdGroup.get(adGroupName) || new Set();
    for (const text of keywords) {
      for (const matchType of ["PHRASE", "EXACT"]) {
        const key = keywordKey(text, matchType);
        if (existing.has(key)) continue;
        existing.add(key);
        addedKeywords.push({ adGroup: adGroupName, text, matchType });
        operations.push(createKeywordOperation(adGroup, text, matchType));
      }
    }
  }

  console.log(
    JSON.stringify(
      {
        mode: LIVE ? "LIVE" : "validate-only",
        searchCampaigns: campaignRows.map((row) => ({
          name: row.campaign.name,
          fromBidding: row.campaign.biddingStrategyType,
          toBidding: "MAXIMIZE_CLICKS",
          cpcCeilingTL: CPC_CEILING_TL,
        })),
        pausedNonEnglishKeywords: pausedKeywords,
        addedEnglishKeywordsCount: addedKeywords.length,
        addedEnglishKeywordsSample: addedKeywords.slice(0, 30),
        operations: operations.length,
      },
      null,
      2
    )
  );

  await mutate(accessToken, operations, !LIVE);
  console.log(LIVE ? "Live update OK." : "Validation OK. Re-run with --live to apply.");
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
