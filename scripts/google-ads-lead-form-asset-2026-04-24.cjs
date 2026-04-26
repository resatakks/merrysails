#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("fs");

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const API_VERSION = "v22";
const CUSTOMER_ID = "5484989676";
const SHARED_ENV_PATH = process.env.MERRYSAILS_SHARED_ENV_PATH || "";

const LIVE = process.argv.includes("--live");

const CAMPAIGNS = [
  "Search | INTL | Sunset | Travel Planners",
  "Search | INTL | Dinner | Travel Planners",
  "PMax | INTL | MerrySails | Controlled Travel Planners",
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
    throw new Error(`Mutate failed: ${JSON.stringify(json)}`);
  }

  return json;
}

async function findCampaigns(accessToken) {
  const rows = await search(
    accessToken,
    `SELECT campaign.name, campaign.resource_name
     FROM campaign
     WHERE campaign.name IN (${CAMPAIGNS.map((name) => `'${name}'`).join(",")})
       AND campaign.status != 'REMOVED'`
  );

  const map = new Map(rows.map((row) => [row.campaign.name, row.campaign.resourceName]));
  for (const campaignName of CAMPAIGNS) {
    if (!map.has(campaignName)) throw new Error(`Missing campaign: ${campaignName}`);
  }
  return [...map.values()];
}

function buildLeadFormCreateOperation() {
  return {
    assetOperation: {
      create: {
        name: `MerrySails Intl Cruise Lead Form | ${Date.now()}`,
        leadFormAsset: {
          callToActionType: "BOOK_NOW",
          callToActionDescription: "Get cruise availability",
          businessName: "MerrySails",
          headline: "Ask MerrySails Availability",
          description:
            "Share your contact details and our team will reply about Sunset or Dinner cruise availability.",
          privacyPolicyUrl: "https://merrysails.com/privacy-policy",
          desiredIntent: "HIGH_INTENT",
          fields: [
            { inputType: "FULL_NAME" },
            { inputType: "EMAIL" },
            { inputType: "PHONE_NUMBER" },
            {
              inputType: "PREFERRED_CONTACT_TIME",
              singleChoiceAnswers: {
                answers: ["Morning", "Afternoon", "Evening"],
              },
            },
          ],
          postSubmitHeadline: "Thanks",
          postSubmitDescription:
            "We will contact you about cruise availability, prices, and booking details.",
          postSubmitCallToActionType: "VISIT_SITE",
        },
        finalUrls: ["https://merrysails.com/reservation"],
      },
    },
  };
}

function buildCampaignAssetOps(campaignResourceNames, assetResourceName) {
  return campaignResourceNames.map((campaign) => ({
    campaignAssetOperation: {
      create: {
        campaign,
        asset: assetResourceName,
        fieldType: "LEAD_FORM",
      },
    },
  }));
}

async function main() {
  if (SHARED_ENV_PATH) loadSharedEnv(SHARED_ENV_PATH);
  const accessToken = await getAccessToken();
  const campaignResourceNames = await findCampaigns(accessToken);

  console.log("MerrySails lead form asset");
  console.log(`Mode: ${LIVE ? "LIVE" : "validate-only"}`);
  console.log(`Campaigns: ${campaignResourceNames.length}`);

  const leadFormCreate = buildLeadFormCreateOperation();
  const assetResult = await mutate(accessToken, [leadFormCreate], !LIVE);
  let assetResourceName = "validate-only";

  if (LIVE) {
    assetResourceName = assetResult.mutateOperationResponses?.[0]?.assetResult?.resourceName;
    if (!assetResourceName) throw new Error("Lead form create did not return asset resource name.");
    await mutate(accessToken, buildCampaignAssetOps(campaignResourceNames, assetResourceName), false);
  }

  console.log(
    JSON.stringify(
      {
        mode: LIVE ? "live" : "validate-only",
        assetResourceName,
        attachedCampaigns: LIVE ? campaignResourceNames.length : 0,
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
