#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("fs");

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const API_VERSION = "v22";
const CUSTOMER_ID = "5484989676";
const SHARED_ENV_PATH = process.env.MERRYSAILS_SHARED_ENV_PATH || "";
const MICROS_PER_UNIT = 1_000_000n;

const LIVE = process.argv.includes("--live");
const INCLUDE_MESSAGE_ASSET = process.argv.includes("--include-message-asset");

const PHONE_COUNTRY = "TR";
const PHONE_NUMBER = "5370406822";

const DAILY_BUDGETS_TL = {
  sunset: "400",
  dinner: "400",
  pmaxReserve: "200",
};

const URLS = {
  sunset: "https://merrysails.com/cruises/bosphorus-sunset-cruise?utm_source=google&utm_medium=cpc&utm_campaign=intl_sunset_search&utm_content={creative}&utm_term={keyword}",
  dinner: "https://merrysails.com/istanbul-dinner-cruise?utm_source=google&utm_medium=cpc&utm_campaign=intl_dinner_search&utm_content={creative}&utm_term={keyword}",
  home: "https://merrysails.com/?utm_source=google&utm_medium=cpc&utm_campaign=intl_pmax_controlled",
  reservation: "https://merrysails.com/reservation?utm_source=google&utm_medium=cpc&utm_campaign=intl_pmax_controlled",
};

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

const DAYS = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

const CAMPAIGNS = {
  sunset: {
    name: "Search | INTL | Sunset | Travel Planners",
    budgetName: "Budget | INTL | Sunset | 400 TL",
    budgetTl: DAILY_BUDGETS_TL.sunset,
    landingUrl: URLS.sunset,
    targetCpaTl: "350",
    headlines: [
      "Bosphorus Sunset Cruise",
      "Sunset Cruise Istanbul",
      "From EUR 34 Per Person",
      "Book Direct With MerrySails",
      "TURSAB Licensed Operator",
      "Golden Hour On Bosphorus",
      "Central Meeting Point",
      "Reserve Your Sunset Cruise",
      "Istanbul Cruise From EUR 34",
      "Call Or Message To Book",
    ],
    descriptions: [
      "Book a 2-hour Bosphorus sunset cruise from EUR 34. Direct support by WhatsApp or phone.",
      "Golden-hour Bosphorus route with snacks and drinks. Reserve direct with MerrySails.",
      "Planning Istanbul from abroad? Ask availability by call or WhatsApp before you arrive.",
      "TURSAB licensed travel operation. Clear packages, direct booking, fast confirmation.",
    ],
    adGroups: [
      {
        name: "Germany | Sunset Travel Planners",
        keywords: [
          "bosphorus sunset cruise",
          "istanbul sunset cruise",
          "sunset cruise istanbul",
          "bosporus sonnenuntergangsfahrt",
          "istanbul bootsfahrt sonnenuntergang",
        ],
      },
      {
        name: "France | Sunset Travel Planners",
        keywords: [
          "bosphorus sunset cruise",
          "istanbul sunset cruise",
          "croisiere bosphore coucher de soleil",
          "croisiere coucher de soleil istanbul",
        ],
      },
      {
        name: "Netherlands | Sunset Travel Planners",
        keywords: [
          "bosphorus sunset cruise",
          "istanbul sunset cruise",
          "bosporus cruise zonsondergang",
          "istanbul boottocht zonsondergang",
        ],
      },
      {
        name: "UK | Sunset Travel Planners",
        keywords: [
          "bosphorus sunset cruise",
          "istanbul sunset cruise",
          "sunset cruise istanbul",
          "bosphorus sunset boat tour",
          "best sunset cruise istanbul",
        ],
      },
      {
        name: "China | Sunset Travel Planners",
        keywords: [
          "bosphorus sunset cruise",
          "istanbul sunset cruise",
          "伊斯坦布尔 博斯普鲁斯 日落 游船",
          "伊斯坦布尔 日落 游船",
        ],
      },
    ],
    negativeKeywords: [
      "dinner",
      "night show",
      "belly dance",
      "private yacht",
      "yacht charter",
      "boat rental",
      "free ferry",
      "public ferry",
      "timetable",
      "schedule",
      "map",
      "weather",
      "cheap ferry",
      "sehir hatlari",
      "turyol",
      "dentur",
    ],
  },
  dinner: {
    name: "Search | INTL | Dinner | Travel Planners",
    budgetName: "Budget | INTL | Dinner | 400 TL",
    budgetTl: DAILY_BUDGETS_TL.dinner,
    landingUrl: URLS.dinner,
    targetCpaTl: "350",
    headlines: [
      "Istanbul Dinner Cruise",
      "Bosphorus Dinner Cruise",
      "From EUR 30 Per Person",
      "Turkish Night Dinner",
      "Hotel Pickup Support",
      "Book Direct With MerrySails",
      "TURSAB Licensed Operator",
      "Call Or Message To Book",
      "Dinner Cruise From EUR 30",
      "Reserve Your Dinner Cruise",
    ],
    descriptions: [
      "Book a Bosphorus dinner cruise from EUR 30. Dinner, entertainment and package options.",
      "Hotel pickup support for central European-side zones. Confirm by WhatsApp or phone.",
      "Planning Istanbul before arrival? Ask availability and package details direct.",
      "TURSAB licensed operation. Clear dinner packages from EUR 30 to EUR 90.",
    ],
    adGroups: [
      {
        name: "Germany | Dinner Travel Planners",
        keywords: [
          "istanbul dinner cruise",
          "bosphorus dinner cruise",
          "dinner cruise istanbul",
          "istanbul dinner show cruise",
          "bosporus dinner cruise",
          "istanbul abendessen bootsfahrt",
        ],
      },
      {
        name: "France | Dinner Travel Planners",
        keywords: [
          "istanbul dinner cruise",
          "bosphorus dinner cruise",
          "diner croisiere bosphore",
          "croisiere diner istanbul",
        ],
      },
      {
        name: "Netherlands | Dinner Travel Planners",
        keywords: [
          "istanbul dinner cruise",
          "bosphorus dinner cruise",
          "diner cruise istanbul",
          "bosporus diner cruise",
        ],
      },
      {
        name: "UK | Dinner Travel Planners",
        keywords: [
          "istanbul dinner cruise",
          "bosphorus dinner cruise",
          "dinner cruise istanbul",
          "bosphorus dinner cruise with show",
          "istanbul dinner cruise with pickup",
        ],
      },
      {
        name: "China | Dinner Travel Planners",
        keywords: [
          "istanbul dinner cruise",
          "bosphorus dinner cruise",
          "伊斯坦布尔 晚餐 游船",
          "博斯普鲁斯 晚餐 游船",
        ],
      },
    ],
    negativeKeywords: [
      "sunset only",
      "private yacht",
      "yacht charter",
      "boat rental",
      "free ferry",
      "public ferry",
      "timetable",
      "schedule",
      "map",
      "weather",
      "sehir hatlari",
      "turyol",
      "dentur",
      "jobs",
      "recipe",
    ],
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

function adTextAssets(texts) {
  return texts.map((text) => ({ text }));
}

function responsiveSearchAd(campaignKey, adGroupTempId, assetTempIds) {
  void assetTempIds;
  const campaign = CAMPAIGNS[campaignKey];
  return {
    adGroupAdOperation: {
      create: {
        adGroup: `customers/${CUSTOMER_ID}/adGroups/${adGroupTempId}`,
        status: "ENABLED",
        ad: {
          finalUrls: [campaign.landingUrl],
          responsiveSearchAd: {
            headlines: adTextAssets(campaign.headlines),
            descriptions: adTextAssets(campaign.descriptions),
            path1: campaignKey === "sunset" ? "sunset-cruise" : "dinner-cruise",
            path2: "istanbul",
          },
        },
      },
    },
  };
}

function campaignScheduleOps(campaignTempId) {
  const ops = [];
  for (const day of DAYS) {
    ops.push({
      campaignCriterionOperation: {
        create: {
          campaign: `customers/${CUSTOMER_ID}/campaigns/${campaignTempId}`,
          adSchedule: {
            dayOfWeek: day,
            startHour: 0,
            startMinute: "ZERO",
            endHour: 1,
            endMinute: "ZERO",
          },
        },
      },
    });
    ops.push({
      campaignCriterionOperation: {
        create: {
          campaign: `customers/${CUSTOMER_ID}/campaigns/${campaignTempId}`,
          adSchedule: {
            dayOfWeek: day,
            startHour: 9,
            startMinute: "ZERO",
            endHour: 24,
            endMinute: "ZERO",
          },
        },
      },
    });
  }
  return ops;
}

function buildSearchCampaignOps(campaignKey, ids) {
  const campaign = CAMPAIGNS[campaignKey];
  const ops = [];

  ops.push({
    campaignBudgetOperation: {
      create: {
        resourceName: `customers/${CUSTOMER_ID}/campaignBudgets/${ids.budget}`,
        name: `${campaign.budgetName} | ${Date.now()}`,
        amountMicros: toMicros(campaign.budgetTl),
        deliveryMethod: "STANDARD",
        explicitlyShared: false,
      },
    },
  });

  ops.push({
    campaignOperation: {
      create: {
        resourceName: `customers/${CUSTOMER_ID}/campaigns/${ids.campaign}`,
        name: campaign.name,
        status: LIVE ? "ENABLED" : "PAUSED",
        advertisingChannelType: "SEARCH",
        campaignBudget: `customers/${CUSTOMER_ID}/campaignBudgets/${ids.budget}`,
        containsEuPoliticalAdvertising: "DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING",
        networkSettings: {
          targetGoogleSearch: true,
          targetSearchNetwork: false,
          targetPartnerSearchNetwork: false,
          targetContentNetwork: false,
        },
        geoTargetTypeSetting: {
          positiveGeoTargetType: "PRESENCE",
        },
        maximizeConversions: {
          targetCpaMicros: toMicros(campaign.targetCpaTl),
        },
      },
    },
  });

  for (const geo of GEO_TARGETS) {
    ops.push({
      campaignCriterionOperation: {
        create: {
          campaign: `customers/${CUSTOMER_ID}/campaigns/${ids.campaign}`,
          location: { geoTargetConstant: `geoTargetConstants/${geo.id}` },
        },
      },
    });
  }

  for (const languageId of LANGUAGE_TARGETS) {
    ops.push({
      campaignCriterionOperation: {
        create: {
          campaign: `customers/${CUSTOMER_ID}/campaigns/${ids.campaign}`,
          language: { languageConstant: `languageConstants/${languageId}` },
        },
      },
    });
  }

  ops.push(...campaignScheduleOps(ids.campaign));

  for (const negative of campaign.negativeKeywords) {
    ops.push({
      campaignCriterionOperation: {
        create: {
          campaign: `customers/${CUSTOMER_ID}/campaigns/${ids.campaign}`,
          negative: true,
          keyword: {
            text: negative,
            matchType: "BROAD",
          },
        },
      },
    });
  }

  campaign.adGroups.forEach((adGroup, index) => {
    const adGroupTempId = ids.adGroups[index];
    ops.push({
      adGroupOperation: {
        create: {
          resourceName: `customers/${CUSTOMER_ID}/adGroups/${adGroupTempId}`,
          campaign: `customers/${CUSTOMER_ID}/campaigns/${ids.campaign}`,
          name: adGroup.name,
          status: "ENABLED",
          type: "SEARCH_STANDARD",
        },
      },
    });

    for (const keyword of adGroup.keywords) {
      for (const matchType of ["PHRASE", "EXACT"]) {
        ops.push({
          adGroupCriterionOperation: {
            create: {
              adGroup: `customers/${CUSTOMER_ID}/adGroups/${adGroupTempId}`,
              status: "ENABLED",
              keyword: {
                text: keyword,
                matchType,
              },
            },
          },
        });
      }
    }

    ops.push(responsiveSearchAd(campaignKey, adGroupTempId, ids.assets));
  });

  return ops;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Kept for manual shared-asset recovery without rebuilding campaigns.
function buildSharedAssetOps(assetIds, campaignIds) {
  const ops = [
    {
      assetOperation: {
        create: {
          name: `MerrySails Intl Call Asset | ${Date.now()}`,
          callAsset: {
            countryCode: PHONE_COUNTRY,
            phoneNumber: PHONE_NUMBER,
            callConversionReportingState: "USE_ACCOUNT_LEVEL_CALL_CONVERSION_ACTION",
            adScheduleTargets: DAYS.flatMap((day) => [
              {
                dayOfWeek: day,
                startHour: 0,
                startMinute: "ZERO",
                endHour: 1,
                endMinute: "ZERO",
              },
              {
                dayOfWeek: day,
                startHour: 9,
                startMinute: "ZERO",
                endHour: 24,
                endMinute: "ZERO",
              },
            ]),
          },
        },
      },
    },
  ];

  if (INCLUDE_MESSAGE_ASSET) {
    ops.push({
      assetOperation: {
        create: {
          name: `MerrySails Intl WhatsApp Message Asset | ${Date.now()}`,
          businessMessageAsset: {
            messageProvider: "WHATSAPP",
            starterMessage:
              "Hi MerrySails, I am planning Istanbul and want cruise availability, prices, and pickup details.",
            callToAction: {
              callToActionSelection: "CONTACT_US",
              callToActionDescription: "Message us",
            },
            whatsappInfo: {
              countryCode: PHONE_COUNTRY,
              phoneNumber: PHONE_NUMBER,
            },
          },
        },
      },
    });
  }

  for (const campaignId of Object.values(campaignIds)) {
    ops.push({
      campaignAssetOperation: {
        create: {
          campaign: `customers/${CUSTOMER_ID}/campaigns/${campaignId}`,
          asset: `customers/${CUSTOMER_ID}/assets/${assetIds.call}`,
          fieldType: "CALL",
        },
      },
    });

    if (INCLUDE_MESSAGE_ASSET) {
      ops.push({
        campaignAssetOperation: {
          create: {
            campaign: `customers/${CUSTOMER_ID}/campaigns/${campaignId}`,
            asset: `customers/${CUSTOMER_ID}/assets/${assetIds.message}`,
            fieldType: "BUSINESS_MESSAGE",
          },
        },
      });
    }
  }

  return ops;
}

function buildOperations() {
  const ids = {
    assets: { call: -100, message: -101 },
    campaigns: { sunset: -201, dinner: -301 },
    sunset: {
      budget: -200,
      campaign: -201,
      adGroups: [-210, -211, -212, -213, -214],
      assets: [],
    },
    dinner: {
      budget: -300,
      campaign: -301,
      adGroups: [-310, -311, -312, -313, -314],
      assets: [],
    },
  };

  return [
    ...buildSearchCampaignOps("sunset", ids.sunset),
    ...buildSearchCampaignOps("dinner", ids.dinner),
  ];
}

function buildCallAssetCreateOperation() {
  return {
    assetOperation: {
      create: {
        name: `MerrySails Intl Call Asset | ${Date.now()}`,
        callAsset: {
          countryCode: PHONE_COUNTRY,
          phoneNumber: PHONE_NUMBER,
          callConversionReportingState: "USE_ACCOUNT_LEVEL_CALL_CONVERSION_ACTION",
          adScheduleTargets: DAYS.flatMap((day) => [
            {
              dayOfWeek: day,
              startHour: 0,
              startMinute: "ZERO",
              endHour: 1,
              endMinute: "ZERO",
            },
            {
              dayOfWeek: day,
              startHour: 9,
              startMinute: "ZERO",
              endHour: 24,
              endMinute: "ZERO",
            },
          ]),
        },
      },
    },
  };
}

function buildMessageAssetCreateOperation() {
  return {
    assetOperation: {
      create: {
        name: `MerrySails Intl WhatsApp Message Asset | ${Date.now()}`,
        businessMessageAsset: {
          messageProvider: "WHATSAPP",
          starterMessage:
            "Hi MerrySails, I am planning Istanbul and want cruise availability, prices, and pickup details.",
          callToAction: {
            callToActionSelection: "CONTACT_US",
            callToActionDescription: "Message us",
          },
          whatsappInfo: {
            countryCode: PHONE_COUNTRY,
            phoneNumber: PHONE_NUMBER,
          },
        },
      },
    },
  };
}

function campaignAssetLinkOps(campaignResourceNames, assetResourceName, fieldType) {
  return campaignResourceNames.map((campaign) => ({
    campaignAssetOperation: {
      create: {
        campaign,
        asset: assetResourceName,
        fieldType,
      },
    },
  }));
}

async function findCampaigns(accessToken) {
  const names = Object.values(CAMPAIGNS).map((campaign) => campaign.name);
  const rows = await search(
    accessToken,
    `SELECT campaign.name, campaign.resource_name
     FROM campaign
     WHERE campaign.name IN (${names.map((name) => `'${name}'`).join(",")})
       AND campaign.status != 'REMOVED'`
  );

  return new Map(rows.map((row) => [row.campaign.name, row.campaign.resourceName]));
}

async function main() {
  if (SHARED_ENV_PATH) loadSharedEnv(SHARED_ENV_PATH);

  console.log("MerrySails international reset");
  console.log(`Mode: ${LIVE ? "LIVE" : "validate-only/paused"}`);
  console.log(`Budgets: sunset ${DAILY_BUDGETS_TL.sunset} TL, dinner ${DAILY_BUDGETS_TL.dinner} TL`);
  console.log(`Message asset: ${INCLUDE_MESSAGE_ASSET ? "attempt API beta WhatsApp asset" : "skipped"}`);

  const accessToken = await getAccessToken();
  const operations = buildOperations();
  const result = await mutate(accessToken, operations, !LIVE);

  const assetSummary = {
    callAsset: "not-run",
    messageAsset: "not-run",
  };

  if (LIVE) {
    const campaignMap = await findCampaigns(accessToken);
    const campaignResourceNames = Object.values(CAMPAIGNS).map((campaign) => {
      const resourceName = campaignMap.get(campaign.name);
      if (!resourceName) throw new Error(`Created campaign not found: ${campaign.name}`);
      return resourceName;
    });

    const callAssetResult = await mutate(accessToken, [buildCallAssetCreateOperation()], false);
    const callAssetResourceName =
      callAssetResult?.mutateOperationResponses?.[0]?.assetResult?.resourceName;
    if (!callAssetResourceName) throw new Error("Call asset create did not return a resource name.");

    await mutate(
      accessToken,
      campaignAssetLinkOps(campaignResourceNames, callAssetResourceName, "CALL"),
      false
    );
    assetSummary.callAsset = callAssetResourceName;

    if (INCLUDE_MESSAGE_ASSET) {
      try {
        const messageAssetResult = await mutate(
          accessToken,
          [buildMessageAssetCreateOperation()],
          false
        );
        const messageAssetResourceName =
          messageAssetResult?.mutateOperationResponses?.[0]?.assetResult?.resourceName;
        if (!messageAssetResourceName) {
          throw new Error("Message asset create did not return a resource name.");
        }
        await mutate(
          accessToken,
          campaignAssetLinkOps(campaignResourceNames, messageAssetResourceName, "BUSINESS_MESSAGE"),
          false
        );
        assetSummary.messageAsset = messageAssetResourceName;
      } catch (error) {
        assetSummary.messageAsset = `failed: ${error.message || error}`;
      }
    }
  }

  console.log(
    JSON.stringify(
      {
        mode: LIVE ? "live" : "validate-only",
        operationCount: operations.length,
        resultCount: result?.mutateOperationResponses?.length ?? 0,
        createdEnabled: LIVE,
        totalDailyBudgetTl: Number(DAILY_BUDGETS_TL.sunset) + Number(DAILY_BUDGETS_TL.dinner),
        assetSummary,
        note: "PMax intentionally not created here; keep PMax manual/paused until asset group, URL expansion, and placement safety are verified.",
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
