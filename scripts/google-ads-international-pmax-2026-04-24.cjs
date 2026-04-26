#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("fs");

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const API_VERSION = "v22";
const CUSTOMER_ID = "5484989676";
const SHARED_ENV_PATH = process.env.MERRYSAILS_SHARED_ENV_PATH || "";
const MICROS_PER_UNIT = 1_000_000n;

const LIVE = process.argv.includes("--live");
const CAMPAIGN_NAME = "PMax | INTL | MerrySails | Controlled Travel Planners";
const BUDGET_NAME = "Budget | INTL | PMax Controlled | 200 TL";
const DAILY_BUDGET_TL = "200";
const CALL_ASSET_RESOURCE = "customers/5484989676/assets/352858363039";

const URLS = [
  "https://merrysails.com/",
  "https://merrysails.com/reservation",
  "https://merrysails.com/cruises/bosphorus-sunset-cruise",
  "https://merrysails.com/istanbul-dinner-cruise",
];

const GEO_TARGETS = [
  { label: "Germany", id: "2276" },
  { label: "France", id: "2250" },
  { label: "Netherlands", id: "2528" },
  { label: "United Kingdom", id: "2826" },
  { label: "China", id: "2156" },
];

const LANGUAGE_TARGETS = [
  "1000", // English
  "1001", // German
  "1002", // French
  "1010", // Dutch
  "1017", // Chinese
];

const SEARCH_THEMES = [
  "bosphorus sunset cruise",
  "istanbul sunset cruise",
  "bosphorus dinner cruise",
  "istanbul dinner cruise",
  "istanbul cruise with dinner",
  "bosphorus cruise from europe",
  "istanbul trip planning",
  "book istanbul cruise",
];

const DAYS = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

const HEADLINES = [
  "Bosphorus Cruise Istanbul",
  "Sunset Cruise From EUR 34",
  "Dinner Cruise From EUR 30",
  "Book Direct With MerrySails",
  "Call To Plan Your Cruise",
  "TURSAB Licensed Operator",
  "Istanbul Dinner Cruise",
  "Bosphorus Sunset Cruise",
  "Plan Before You Arrive",
  "Fast Cruise Availability",
];

const LONG_HEADLINES = [
  "Book Your Istanbul Bosphorus Sunset Or Dinner Cruise Direct With MerrySails",
  "Plan Your Bosphorus Cruise Before You Arrive In Istanbul",
  "Ask Availability By Phone For Sunset And Dinner Cruise Packages",
];

const DESCRIPTIONS = [
  "Sunset from EUR 34 and dinner from EUR 30. Book direct with MerrySails.",
  "Planning Istanbul from abroad? Call us for cruise availability and package details.",
  "TURSAB licensed travel operation with clear Bosphorus cruise packages.",
  "Dinner cruise pickup support and direct reservation flow for Istanbul travelers.",
];

const ASSETS = {
  landscape: {
    path: "public/images/ads/pmax-landscape.jpg",
    fieldType: "MARKETING_IMAGE",
    name: "MerrySails PMax Landscape 1200x628",
  },
  square: {
    path: "public/images/ads/pmax-square.jpg",
    fieldType: "SQUARE_MARKETING_IMAGE",
    name: "MerrySails PMax Square 1200x1200",
  },
  logo: {
    path: "public/images/ads/logo.svg.png",
    fieldType: "LOGO",
    name: "MerrySails Logo Square",
  },
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

function toMicros(rawTl) {
  if (!/^\d+(\.\d{1,2})?$/.test(rawTl)) {
    throw new Error(`Invalid TL amount: ${rawTl}`);
  }
  const [whole, fraction = ""] = rawTl.split(".");
  const micros = BigInt(whole) * MICROS_PER_UNIT + BigInt(fraction.padEnd(6, "0"));
  const minimum = 50n * MICROS_PER_UNIT;
  if (micros < minimum) {
    throw new Error(`Refusing suspicious budget below 50 TL: ${rawTl}`);
  }
  return micros.toString();
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

async function assertCampaignDoesNotExist(accessToken) {
  const rows = await search(
    accessToken,
    `SELECT campaign.resource_name, campaign.status
     FROM campaign
     WHERE campaign.name = '${CAMPAIGN_NAME}'
       AND campaign.status != 'REMOVED'`
  );

  if (rows.length > 0) {
    throw new Error(`Campaign already exists and was not touched: ${CAMPAIGN_NAME}`);
  }
}

function assetResource(id) {
  return `customers/${CUSTOMER_ID}/assets/${id}`;
}

function campaignResource(id) {
  return `customers/${CUSTOMER_ID}/campaigns/${id}`;
}

function budgetResource(id) {
  return `customers/${CUSTOMER_ID}/campaignBudgets/${id}`;
}

function assetGroupResource(id) {
  return `customers/${CUSTOMER_ID}/assetGroups/${id}`;
}

function createTextAssetOperation(id, text) {
  return {
    assetOperation: {
      create: {
        resourceName: assetResource(id),
        textAsset: { text },
      },
    },
  };
}

function createImageAssetOperation(id, asset) {
  return {
    assetOperation: {
      create: {
        resourceName: assetResource(id),
        name: `${asset.name} | ${Date.now()}`,
        imageAsset: {
          data: fs.readFileSync(asset.path).toString("base64"),
        },
      },
    },
  };
}

function linkAssetGroupAssetOperation(assetGroupId, assetId, fieldType) {
  return {
    assetGroupAssetOperation: {
      create: {
        assetGroup: assetGroupResource(assetGroupId),
        asset: assetResource(assetId),
        fieldType,
      },
    },
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Kept as a one-shot create fallback for manual Ads recovery.
function buildOperations() {
  const budgetId = -500;
  const campaignId = -501;
  const assetGroupId = -502;
  let nextAssetId = -600;
  const ops = [];

  ops.push({
    campaignBudgetOperation: {
      create: {
        resourceName: budgetResource(budgetId),
        name: `${BUDGET_NAME} | ${Date.now()}`,
        amountMicros: toMicros(DAILY_BUDGET_TL),
        deliveryMethod: "STANDARD",
        explicitlyShared: false,
      },
    },
  });

  ops.push({
    campaignOperation: {
      create: {
        resourceName: campaignResource(campaignId),
        name: CAMPAIGN_NAME,
        status: LIVE ? "ENABLED" : "PAUSED",
        advertisingChannelType: "PERFORMANCE_MAX",
        campaignBudget: budgetResource(budgetId),
        containsEuPoliticalAdvertising: "DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING",
        maximizeConversions: {},
        brandGuidelinesEnabled: false,
        assetAutomationSettings: [
          {
            assetAutomationType: "FINAL_URL_EXPANSION_TEXT_ASSET_AUTOMATION",
            assetAutomationStatus: "OPTED_OUT",
          },
          {
            assetAutomationType: "TEXT_ASSET_AUTOMATION",
            assetAutomationStatus: "OPTED_OUT",
          },
          {
            assetAutomationType: "GENERATE_IMAGE_EXTRACTION",
            assetAutomationStatus: "OPTED_OUT",
          },
          {
            assetAutomationType: "GENERATE_IMAGE_ENHANCEMENT",
            assetAutomationStatus: "OPTED_OUT",
          },
        ],
        geoTargetTypeSetting: {
          positiveGeoTargetType: "PRESENCE",
        },
        trackingUrlTemplate:
          "{lpurl}?utm_source=google&utm_medium=cpc&utm_campaign=intl_pmax_controlled&utm_content={creative}",
      },
    },
  });

  for (const geo of GEO_TARGETS) {
    ops.push({
      campaignCriterionOperation: {
        create: {
          campaign: campaignResource(campaignId),
          location: { geoTargetConstant: `geoTargetConstants/${geo.id}` },
        },
      },
    });
  }

  for (const languageId of LANGUAGE_TARGETS) {
    ops.push({
      campaignCriterionOperation: {
        create: {
          campaign: campaignResource(campaignId),
          language: { languageConstant: `languageConstants/${languageId}` },
        },
      },
    });
  }

  for (const day of DAYS) {
    for (const schedule of [
      { startHour: 0, endHour: 1 },
      { startHour: 9, endHour: 24 },
    ]) {
      ops.push({
        campaignCriterionOperation: {
          create: {
            campaign: campaignResource(campaignId),
            adSchedule: {
              dayOfWeek: day,
              startHour: schedule.startHour,
              startMinute: "ZERO",
              endHour: schedule.endHour,
              endMinute: "ZERO",
            },
          },
        },
      });
    }
  }

  ops.push({
    assetGroupOperation: {
      create: {
        resourceName: assetGroupResource(assetGroupId),
        campaign: campaignResource(campaignId),
        name: "Sunset + Dinner Controlled URLs",
        finalUrls: URLS,
        finalMobileUrls: URLS,
        status: "PAUSED",
      },
    },
  });

  for (const text of HEADLINES) {
    const id = nextAssetId--;
    ops.push(createTextAssetOperation(id, text));
    ops.push(linkAssetGroupAssetOperation(assetGroupId, id, "HEADLINE"));
  }

  for (const text of LONG_HEADLINES) {
    const id = nextAssetId--;
    ops.push(createTextAssetOperation(id, text));
    ops.push(linkAssetGroupAssetOperation(assetGroupId, id, "LONG_HEADLINE"));
  }

  for (const text of DESCRIPTIONS) {
    const id = nextAssetId--;
    ops.push(createTextAssetOperation(id, text));
    ops.push(linkAssetGroupAssetOperation(assetGroupId, id, "DESCRIPTION"));
  }

  const businessNameId = nextAssetId--;
  ops.push(createTextAssetOperation(businessNameId, "MerrySails"));
  ops.push(linkAssetGroupAssetOperation(assetGroupId, businessNameId, "BUSINESS_NAME"));

  for (const asset of Object.values(ASSETS)) {
    const id = nextAssetId--;
    ops.push(createImageAssetOperation(id, asset));
    ops.push(linkAssetGroupAssetOperation(assetGroupId, id, asset.fieldType));
  }

  for (const theme of SEARCH_THEMES) {
    ops.push({
      assetGroupSignalOperation: {
        create: {
          assetGroup: assetGroupResource(assetGroupId),
          searchTheme: { text: theme },
        },
      },
    });
  }

  ops.push({
    campaignAssetOperation: {
      create: {
        campaign: campaignResource(campaignId),
        asset: CALL_ASSET_RESOURCE,
        fieldType: "CALL",
      },
    },
  });

  ops.push({
    assetGroupOperation: {
      update: {
        resourceName: assetGroupResource(assetGroupId),
        status: LIVE ? "ENABLED" : "PAUSED",
      },
      updateMask: "status",
    },
  });

  return ops;
}

function buildAssetCreateOperations() {
  let nextAssetId = -700;
  const operations = [];
  const links = [];

  function addText(text, fieldType) {
    const id = nextAssetId--;
    operations.push(createTextAssetOperation(id, text));
    links.push({ asset: assetResource(id), fieldType });
  }

  function addImage(asset) {
    const id = nextAssetId--;
    operations.push(createImageAssetOperation(id, asset));
    links.push({ asset: assetResource(id), fieldType: asset.fieldType });
  }

  for (const text of HEADLINES) addText(text, "HEADLINE");
  for (const text of LONG_HEADLINES) addText(text, "LONG_HEADLINE");
  for (const text of DESCRIPTIONS) addText(text, "DESCRIPTION");
  addText("MerrySails", "BUSINESS_NAME");

  for (const asset of Object.values(ASSETS)) addImage(asset);

  return { operations, links };
}

function buildCampaignOperationsWithExistingAssets(assetLinks) {
  const budgetId = -800;
  const campaignId = -801;
  const assetGroupId = -802;
  const operations = [];

  operations.push({
    campaignBudgetOperation: {
      create: {
        resourceName: budgetResource(budgetId),
        name: `${BUDGET_NAME} | ${Date.now()}`,
        amountMicros: toMicros(DAILY_BUDGET_TL),
        deliveryMethod: "STANDARD",
        explicitlyShared: false,
      },
    },
  });

  operations.push({
    campaignOperation: {
      create: {
        resourceName: campaignResource(campaignId),
        name: CAMPAIGN_NAME,
        status: LIVE ? "ENABLED" : "PAUSED",
        advertisingChannelType: "PERFORMANCE_MAX",
        campaignBudget: budgetResource(budgetId),
        containsEuPoliticalAdvertising: "DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING",
        maximizeConversions: {},
        brandGuidelinesEnabled: false,
        assetAutomationSettings: [
          {
            assetAutomationType: "FINAL_URL_EXPANSION_TEXT_ASSET_AUTOMATION",
            assetAutomationStatus: "OPTED_OUT",
          },
          {
            assetAutomationType: "TEXT_ASSET_AUTOMATION",
            assetAutomationStatus: "OPTED_OUT",
          },
          {
            assetAutomationType: "GENERATE_IMAGE_EXTRACTION",
            assetAutomationStatus: "OPTED_OUT",
          },
          {
            assetAutomationType: "GENERATE_IMAGE_ENHANCEMENT",
            assetAutomationStatus: "OPTED_OUT",
          },
        ],
        geoTargetTypeSetting: {
          positiveGeoTargetType: "PRESENCE",
        },
        trackingUrlTemplate:
          "{lpurl}?utm_source=google&utm_medium=cpc&utm_campaign=intl_pmax_controlled&utm_content={creative}",
      },
    },
  });

  for (const geo of GEO_TARGETS) {
    operations.push({
      campaignCriterionOperation: {
        create: {
          campaign: campaignResource(campaignId),
          location: { geoTargetConstant: `geoTargetConstants/${geo.id}` },
        },
      },
    });
  }

  for (const languageId of LANGUAGE_TARGETS) {
    operations.push({
      campaignCriterionOperation: {
        create: {
          campaign: campaignResource(campaignId),
          language: { languageConstant: `languageConstants/${languageId}` },
        },
      },
    });
  }

  for (const day of DAYS) {
    for (const schedule of [
      { startHour: 0, endHour: 1 },
      { startHour: 9, endHour: 24 },
    ]) {
      operations.push({
        campaignCriterionOperation: {
          create: {
            campaign: campaignResource(campaignId),
            adSchedule: {
              dayOfWeek: day,
              startHour: schedule.startHour,
              startMinute: "ZERO",
              endHour: schedule.endHour,
              endMinute: "ZERO",
            },
          },
        },
      });
    }
  }

  operations.push({
    assetGroupOperation: {
      create: {
        resourceName: assetGroupResource(assetGroupId),
        campaign: campaignResource(campaignId),
        name: "Sunset + Dinner Controlled URLs",
        finalUrls: URLS,
        finalMobileUrls: URLS,
        status: "ENABLED",
      },
    },
  });

  for (const link of assetLinks) {
    operations.push({
      assetGroupAssetOperation: {
        create: {
          assetGroup: assetGroupResource(assetGroupId),
          asset: link.asset,
          fieldType: link.fieldType,
        },
      },
    });
  }

  for (const theme of SEARCH_THEMES) {
    operations.push({
      assetGroupSignalOperation: {
        create: {
          assetGroup: assetGroupResource(assetGroupId),
          searchTheme: { text: theme },
        },
      },
    });
  }

  operations.push({
    campaignAssetOperation: {
      create: {
        campaign: campaignResource(campaignId),
        asset: CALL_ASSET_RESOURCE,
        fieldType: "CALL",
      },
    },
  });

  return operations;
}

async function main() {
  if (SHARED_ENV_PATH) loadSharedEnv(SHARED_ENV_PATH);
  const accessToken = await getAccessToken();
  await assertCampaignDoesNotExist(accessToken);

  console.log("MerrySails controlled international PMax");
  console.log(`Mode: ${LIVE ? "LIVE" : "validate-only"}`);
  console.log(`Budget: ${DAILY_BUDGET_TL} TL`);
  console.log("Final URL expansion: opted out");

  let result;
  let operationCount;

  if (LIVE) {
    const { operations: assetOperations, links } = buildAssetCreateOperations();
    const assetResult = await mutate(accessToken, assetOperations, false);
    const createdAssets = assetResult.mutateOperationResponses.map(
      (response, index) => ({
        asset: response.assetResult.resourceName,
        fieldType: links[index].fieldType,
      })
    );
    const campaignOperations = buildCampaignOperationsWithExistingAssets(createdAssets);
    operationCount = assetOperations.length + campaignOperations.length;
    result = await mutate(accessToken, campaignOperations, false);
  } else {
    const { operations: assetOperations } = buildAssetCreateOperations();
    result = await mutate(accessToken, assetOperations, true);
    operationCount = assetOperations.length;
  }

  console.log(
    JSON.stringify(
      {
        mode: LIVE ? "live" : "validate-only",
        operationCount,
        resultCount: result?.mutateOperationResponses?.length ?? 0,
        dailyBudgetTl: Number(DAILY_BUDGET_TL),
        campaignName: CAMPAIGN_NAME,
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
