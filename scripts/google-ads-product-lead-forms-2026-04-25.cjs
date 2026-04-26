#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("fs");

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const API_VERSION = "v22";
const CUSTOMER_ID = "5484989676";
const SHARED_ENV_PATH = process.env.MERRYSAILS_SHARED_ENV_PATH || "";

const LIVE = process.argv.includes("--live");

const FORMS = [
  {
    campaignName: "Search | INTL | Sunset | Travel Planners",
    tempAssetId: -9101,
    namePrefix: "MerrySails Sunset Lead Form",
    headline: "Ask Sunset Cruise Availability",
    description:
      "Share your details and our team will reply about Bosphorus Sunset Cruise availability and prices.",
    callToActionDescription: "Get sunset availability",
    finalUrl: "https://merrysails.com/cruises/bosphorus-sunset-cruise",
    postSubmitDescription:
      "We will contact you about Sunset Cruise availability, prices, and booking details.",
  },
  {
    campaignName: "Search | INTL | Dinner | Travel Planners",
    tempAssetId: -9102,
    namePrefix: "MerrySails Dinner Lead Form",
    headline: "Ask Dinner Cruise Availability",
    description:
      "Share your details and our team will reply about Bosphorus Dinner Cruise availability and package options.",
    callToActionDescription: "Get dinner availability",
    finalUrl: "https://merrysails.com/istanbul-dinner-cruise",
    postSubmitDescription:
      "We will contact you about Dinner Cruise availability, package options, and booking details.",
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

function leadFields() {
  return [
    { inputType: "FULL_NAME" },
    { inputType: "EMAIL" },
    { inputType: "PHONE_NUMBER" },
    { inputType: "COUNTRY" },
    { inputType: "CITY" },
    {
      inputType: "PREFERRED_CONTACT_TIME",
      singleChoiceAnswers: {
        answers: ["Morning", "Afternoon", "Evening"],
      },
    },
  ];
}

function leadFormCreateOperation(form) {
  const assetResource = `customers/${CUSTOMER_ID}/assets/${form.tempAssetId}`;

  return {
    assetOperation: {
      create: {
        resourceName: assetResource,
        name: `${form.namePrefix} | ${Date.now()}`,
        finalUrls: [form.finalUrl],
        leadFormAsset: {
          callToActionType: "BOOK_NOW",
          callToActionDescription: form.callToActionDescription,
          businessName: "MerrySails",
          headline: form.headline,
          description: form.description,
          privacyPolicyUrl: "https://merrysails.com/privacy-policy",
          desiredIntent: "HIGH_INTENT",
          fields: leadFields(),
          postSubmitHeadline: "Thanks",
          postSubmitDescription: form.postSubmitDescription,
          postSubmitCallToActionType: "VISIT_SITE",
        },
      },
    },
  };
}

function quoteList(values) {
  return values.map((value) => `'${value}'`).join(",");
}

async function main() {
  if (SHARED_ENV_PATH) loadSharedEnv(SHARED_ENV_PATH);
  const accessToken = await getAccessToken();
  const campaignNames = FORMS.map((form) => form.campaignName);

  const campaignRows = await search(
    accessToken,
    `SELECT campaign.name, campaign.resource_name
     FROM campaign
     WHERE campaign.name IN (${quoteList(campaignNames)})
       AND campaign.status != 'REMOVED'`
  );

  const campaigns = new Map(campaignRows.map((row) => [row.campaign.name, row.campaign.resourceName]));
  for (const form of FORMS) {
    if (!campaigns.has(form.campaignName)) throw new Error(`Missing campaign: ${form.campaignName}`);
  }

  const existingLeadFormRows = await search(
    accessToken,
    `SELECT campaign.name, campaign_asset.resource_name, campaign_asset.field_type, campaign_asset.status, asset.resource_name, asset.name
     FROM campaign_asset
     WHERE campaign.name IN (${quoteList(campaignNames)})
       AND campaign_asset.field_type = 'LEAD_FORM'
       AND campaign_asset.status != 'REMOVED'`
  );

  const operations = [];

  for (const row of existingLeadFormRows) {
    operations.push({
      campaignAssetOperation: {
        remove: row.campaignAsset.resourceName,
      },
    });
  }

  for (const form of FORMS) {
    const campaign = campaigns.get(form.campaignName);
    const asset = `customers/${CUSTOMER_ID}/assets/${form.tempAssetId}`;
    operations.push(leadFormCreateOperation(form));
    operations.push({
      campaignAssetOperation: {
        create: {
          campaign,
          asset,
          fieldType: "LEAD_FORM",
        },
      },
    });
  }

  console.log(
    JSON.stringify(
      {
        mode: LIVE ? "LIVE" : "validate-only",
        existingLeadFormsToRemove: existingLeadFormRows.map((row) => ({
          campaign: row.campaign.name,
          asset: row.asset.resourceName,
          name: row.asset.name,
        })),
        formsToCreate: FORMS.map((form) => ({
          campaign: form.campaignName,
          headline: form.headline,
          finalUrl: form.finalUrl,
        })),
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
