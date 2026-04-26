#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("fs");

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const API_VERSION = "v22";
const CUSTOMER_ID = "5484989676";
const SHARED_ENV_PATH = process.env.MERRYSAILS_SHARED_ENV_PATH || "";

const CAMPAIGNS = [
  "Search | EN | Sunset | Istanbul Presence",
  "Search | EN | Dinner | Istanbul Presence",
  "Search | EN | Generic Cruise | Istanbul Presence",
  "Search | EN | Private Yacht | Istanbul Presence",
  "PMax | EN | MerrySails | Istanbul Cruise Intent",
];

const ASSET_NAMES_TO_PAUSE = [
  "Search | EN | Sunset | Istanbul Presence | Sitelink | Contact MerrySails",
  "Search | EN | Dinner | Istanbul Presence | Sitelink | Contact MerrySails",
  "Search | EN | Generic Cruise | Istanbul Presence | Sitelink | Compare Cruise Options",
  "Search | EN | Generic Cruise | Istanbul Presence | Sitelink | Dinner Cruise From EUR 30",
  "Search | EN | Generic Cruise | Istanbul Presence | Sitelink | Sunset Cruise From EUR 34",
  "Search | EN | Generic Cruise | Istanbul Presence | Sitelink | Yacht Charter EUR 280",
];

const BIDDING_UPDATES = [
  {
    resourceName: "customers/5484989676/campaigns/23786355995",
    targetCpaMicros: "300000000",
  },
  {
    resourceName: "customers/5484989676/campaigns/23790970534",
    targetCpaMicros: "300000000",
  },
  {
    resourceName: "customers/5484989676/campaigns/23781846453",
    targetCpaMicros: "250000000",
  },
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
  const json = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(`Search failed: ${JSON.stringify(json)}`);
  }

  const rows = [];
  for (const chunk of json || []) {
    if (chunk.results) rows.push(...chunk.results);
  }

  return rows;
}

async function mutate(accessToken, mutateOperations, validateOnly = false) {
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
    throw new Error(`Mutate failed: ${JSON.stringify(json)}`);
  }

  return json;
}

async function main() {
  if (SHARED_ENV_PATH) loadSharedEnv(SHARED_ENV_PATH);

  const accessToken = await getAccessToken();
  const validateOnly = process.argv.includes("--validate-only");

  const campaignRows = await search(
    accessToken,
    `SELECT campaign.name, campaign.resource_name
     FROM campaign
     WHERE campaign.name IN (${CAMPAIGNS.map((name) => `'${name}'`).join(",")})`
  );

  const campaignMap = new Map(
    campaignRows.map((row) => [row.campaign.name, row.campaign.resourceName])
  );

  const scheduleRows = await search(
    accessToken,
    `SELECT campaign_criterion.resource_name
     FROM campaign_criterion
     WHERE campaign.name IN (${CAMPAIGNS.map((name) => `'${name}'`).join(",")})
       AND campaign_criterion.type = 'AD_SCHEDULE'`
  );

  const assetRows = await search(
    accessToken,
    `SELECT campaign_asset.resource_name, asset.name
     FROM campaign_asset
     WHERE asset.name IN (${ASSET_NAMES_TO_PAUSE.map((name) => `'${name}'`).join(",")})
       AND campaign_asset.status = 'ENABLED'`
  );

  const removeScheduleOps = scheduleRows.map((row) => ({
    campaignCriterionOperation: {
      remove: row.campaignCriterion.resourceName,
    },
  }));

  const createScheduleOps = [];
  const days = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ];

  for (const campaignName of CAMPAIGNS) {
    const campaign = campaignMap.get(campaignName);
    if (!campaign) throw new Error(`Missing campaign resource: ${campaignName}`);

    for (const day of days) {
      createScheduleOps.push({
        campaignCriterionOperation: {
          create: {
            campaign,
            adSchedule: {
              dayOfWeek: day,
              startHour: 9,
              startMinute: "ZERO",
              endHour: 22,
              endMinute: "ZERO",
            },
          },
        },
      });
    }
  }

  const assetOps = assetRows.map((row) => ({
    campaignAssetOperation: {
      update: {
        resourceName: row.campaignAsset.resourceName,
        status: "PAUSED",
      },
      updateMask: "status",
    },
  }));

  const bidOps = BIDDING_UPDATES.map((update) => ({
    campaignOperation: {
      update: {
        resourceName: update.resourceName,
        maximizeConversions: {
          targetCpaMicros: update.targetCpaMicros,
        },
      },
      updateMask: "maximize_conversions.target_cpa_micros",
    },
  }));

  const operations = [
    ...removeScheduleOps,
    ...createScheduleOps,
    ...assetOps,
    ...bidOps,
  ];

  await mutate(accessToken, operations, validateOnly);

  console.log(
    JSON.stringify(
      {
        mode: validateOnly ? "validate-only" : "live",
        removedSchedules: removeScheduleOps.length,
        createdSchedules: createScheduleOps.length,
        pausedAssets: assetOps.length,
        biddingUpdates: bidOps.length,
      },
      null,
      2
    )
  );
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
