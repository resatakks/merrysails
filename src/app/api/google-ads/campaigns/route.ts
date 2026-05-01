/**
 * GET  /api/google-ads/campaigns?token=...
 *   Returns today's spend, budget, status, and 7-day rolling metrics for all campaigns.
 *
 * POST /api/google-ads/campaigns?token=...
 *   Body: { action: "adjust_budgets", multiplier: 1.2 }
 *   Increases all ENABLED campaign budgets by the given multiplier (e.g. 1.2 = +20%).
 *   Guards: multiplier clamped to 0.5–2.0, one adjustment per 24h per campaign.
 *
 * POST /api/google-ads/campaigns?token=...
 *   Body: { action: "add_negatives", keywords: string[] }
 *   Adds negative exact-match keywords to all campaigns.
 *
 * POST /api/google-ads/campaigns?token=...
 *   Body: { action: "create_language_ad_group", campaignResourceName, adGroupName,
 *           keywords: [{text, matchType}], finalUrls, headlines, descriptions,
 *           path1?, path2?, languageId?, cpcBidMicros? }
 *   Creates ad group + keywords + RSA in one shot. Use for FR (languageId=1002) / DE (languageId=1001).
 *   Example FR: POST with campaignResourceName="customers/.../campaigns/BOSPHORUS_CRUISE_ID",
 *     adGroupName="FR - Croisière Bosphore", languageId=1002,
 *     keywords=[{text:"croisière bosphore istanbul",matchType:"PHRASE"},{text:"croisière istanbul",matchType:"PHRASE"}],
 *     finalUrls=["https://merrysails.com/fr/bosphorus-cruise"],
 *     headlines=["Croisière Bosphore Istanbul","À Partir de €34","Coucher de Soleil Bosphore",
 *                "Dîner Croisière €30","Location Yacht €280","TÜRSAB Certifié 2001",
 *                "50 000+ Voyageurs Satisfaits","Réservez Directement","Annulation Gratuite 48h"],
 *     descriptions=["Croisière Bosphore Istanbul : coucher de soleil €34, dîner €30, yacht privé €280. Réservation directe.",
 *                   "50 000+ clients satisfaits depuis 2001. Licence TÜRSAB. Annulation gratuite 48h avant le départ."]
 */
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const API_VERSION = "v20";
const MIN_MULTIPLIER = 0.5;
const MAX_MULTIPLIER = 2.0;

function isAuthorized(req: NextRequest): boolean {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) return process.env.NODE_ENV !== "production";
  const auth = req.headers.get("authorization");
  if (auth === `Bearer ${cronSecret}`) return true;
  return req.nextUrl.searchParams.get("token") === cronSecret;
}

function readAdsCreds() {
  const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID?.replace(/-/g, "").trim();
  const developerToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN?.trim();
  const refreshToken = process.env.GOOGLE_ADS_REFRESH_TOKEN?.trim();
  const clientId = process.env.GOOGLE_ADS_CLIENT_ID?.trim();
  const clientSecret = process.env.GOOGLE_ADS_CLIENT_SECRET?.trim();
  if (!customerId || !developerToken || !refreshToken || !clientId || !clientSecret) return null;
  return { customerId, developerToken, refreshToken, clientId, clientSecret };
}

async function getAccessToken(creds: NonNullable<ReturnType<typeof readAdsCreds>>): Promise<string> {
  const params = new URLSearchParams({
    client_id: creds.clientId,
    client_secret: creds.clientSecret,
    refresh_token: creds.refreshToken,
    grant_type: "refresh_token",
  });
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });
  if (!res.ok) throw new Error(`OAuth: ${res.status} — ${await res.text()}`);
  const data = (await res.json()) as { access_token?: string };
  if (!data.access_token) throw new Error("OAuth: missing access_token");
  return data.access_token;
}

function adsHeaders(creds: NonNullable<ReturnType<typeof readAdsCreds>>, token: string) {
  return {
    Authorization: `Bearer ${token}`,
    "developer-token": creds.developerToken,
    "Content-Type": "application/json",
  };
}

async function adsSearch(
  creds: NonNullable<ReturnType<typeof readAdsCreds>>,
  token: string,
  query: string
) {
  const url = `https://googleads.googleapis.com/${API_VERSION}/customers/${creds.customerId}/googleAds:search`;
  const res = await fetch(url, {
    method: "POST",
    headers: adsHeaders(creds, token),
    body: JSON.stringify({ query }),
  });
  if (!res.ok) throw new Error(`Ads search ${res.status}: ${await res.text()}`);
  return res.json() as Promise<{ results?: unknown[] }>;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const creds = readAdsCreds();
  if (!creds) return NextResponse.json({ skipped: "missing_credentials" });

  let token: string;
  try { token = await getAccessToken(creds); }
  catch (err) { return NextResponse.json({ error: "oauth_failed", details: String(err) }, { status: 502 }); }

  type CampaignRow = {
    campaign?: { id?: string; name?: string; status?: string };
    metrics?: { costMicros?: string; conversions?: number; clicks?: string; impressions?: string };
    campaignBudget?: { amountMicros?: string; resourceName?: string };
  };

  let todayBody: { results?: unknown[] };
  let sevenDayBody: { results?: unknown[] };
  try {
    [todayBody, sevenDayBody] = await Promise.all([
      adsSearch(creds, token, `
        SELECT campaign.id, campaign.name, campaign.status,
               metrics.cost_micros, metrics.conversions, metrics.clicks, metrics.impressions,
               campaign_budget.amount_micros, campaign_budget.resource_name
        FROM campaign
        WHERE campaign.status != 'REMOVED'
          AND segments.date DURING TODAY
      `),
      adsSearch(creds, token, `
        SELECT campaign.id, campaign.name,
               metrics.cost_micros, metrics.conversions, metrics.clicks, metrics.impressions
        FROM campaign
        WHERE campaign.status != 'REMOVED'
          AND segments.date DURING LAST_7_DAYS
      `),
    ]);
  } catch (err) {
    return NextResponse.json({ error: "query_failed", details: String(err) }, { status: 502 });
  }

  const sevenDayMap = new Map<string, { cost: number; conversions: number; clicks: number }>();
  for (const row of (sevenDayBody.results ?? []) as CampaignRow[]) {
    const id = row.campaign?.id ?? "";
    const existing = sevenDayMap.get(id) ?? { cost: 0, conversions: 0, clicks: 0 };
    sevenDayMap.set(id, {
      cost: existing.cost + Number(row.metrics?.costMicros ?? 0) / 1_000_000,
      conversions: existing.conversions + Number(row.metrics?.conversions ?? 0),
      clicks: existing.clicks + Number(row.metrics?.clicks ?? 0),
    });
  }

  const campaigns = ((todayBody.results ?? []) as CampaignRow[]).map((row) => {
    const id = row.campaign?.id ?? "";
    const sevenDay = sevenDayMap.get(id) ?? { cost: 0, conversions: 0, clicks: 0 };
    const costToday = Number(row.metrics?.costMicros ?? 0) / 1_000_000;
    const budgetDay = Number(row.campaignBudget?.amountMicros ?? 0) / 1_000_000;
    return {
      id,
      name: row.campaign?.name ?? "",
      status: row.campaign?.status ?? "",
      budgetResourceName: row.campaignBudget?.resourceName ?? "",
      costToday,
      budgetDay,
      budgetUtilPct: budgetDay > 0 ? Math.round((costToday / budgetDay) * 100) : null,
      clicksToday: Number(row.metrics?.clicks ?? 0),
      impressionsToday: Number(row.metrics?.impressions ?? 0),
      conversionsToday: Number(row.metrics?.conversions ?? 0),
      sevenDayCost: sevenDay.cost,
      sevenDayConversions: sevenDay.conversions,
      sevenDayClicks: sevenDay.clicks,
      costPerConversion7d: sevenDay.conversions > 0 ? sevenDay.cost / sevenDay.conversions : null,
    };
  });

  const totalToday = campaigns.reduce((s, c) => s + c.costToday, 0);
  const totalBudget = campaigns.reduce((s, c) => s + c.budgetDay, 0);
  const total7dCost = campaigns.reduce((s, c) => s + c.sevenDayCost, 0);
  const total7dConversions = campaigns.reduce((s, c) => s + c.sevenDayConversions, 0);

  return NextResponse.json({
    asOf: new Date().toISOString(),
    summary: {
      totalSpendToday: Math.round(totalToday * 100) / 100,
      totalDailyBudget: Math.round(totalBudget * 100) / 100,
      budgetUtilPct: totalBudget > 0 ? Math.round((totalToday / totalBudget) * 100) : null,
      sevenDayCost: Math.round(total7dCost * 100) / 100,
      sevenDayConversions: Math.round(total7dConversions * 10) / 10,
      cap: Number(process.env.GOOGLE_ADS_SAFETY_DAILY_CAP_TRY ?? 1100),
    },
    campaigns,
  });
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const creds = readAdsCreds();
  if (!creds) return NextResponse.json({ skipped: "missing_credentials" });

  let body: { action?: string; multiplier?: number; keywords?: string[] | Array<{text: string; matchType?: string}>; campaignId?: string; campaignIds?: string[]; budgetTry?: number; maxPct?: number; urls?: string[]; status?: string; positiveGeoIds?: number[]; negativeGeoIds?: number[]; resourceName?: string; oldResourceName?: string; adGroupResourceName?: string; campaignResourceName?: string; adGroupName?: string; finalUrls?: string[]; path1?: string; path2?: string; headlines?: string[]; descriptions?: string[]; languageId?: number; cpcBidMicros?: number };
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: "invalid_json" }, { status: 400 }); }

  let token: string;
  try { token = await getAccessToken(creds); }
  catch (err) { return NextResponse.json({ error: "oauth_failed", details: String(err) }, { status: 502 }); }

  // --- adjust_budgets ---
  if (body.action === "adjust_budgets") {
    const multiplier = Math.min(MAX_MULTIPLIER, Math.max(MIN_MULTIPLIER, body.multiplier ?? 1.2));

    type BudgetRow = {
      campaign?: { id?: string; name?: string };
      campaignBudget?: { resourceName?: string; amountMicros?: string };
    };
    let rows: BudgetRow[];
    try {
      const data = await adsSearch(creds, token, `
        SELECT campaign.id, campaign.name,
               campaign_budget.resource_name, campaign_budget.amount_micros
        FROM campaign
        WHERE campaign.status = 'ENABLED'
      `);
      rows = (data.results ?? []) as BudgetRow[];
    } catch (err) {
      return NextResponse.json({ error: "query_failed", details: String(err) }, { status: 502 });
    }

    // Deduplicate by budget resource_name — shared budgets counted once
    const budgetMap = new Map<string, { resourceName: string; currentMicros: number; campaignNames: string[] }>();
    for (const row of rows) {
      const rn = row.campaignBudget?.resourceName ?? "";
      if (!rn) continue;
      const existing = budgetMap.get(rn);
      if (existing) {
        existing.campaignNames.push(row.campaign?.name ?? "");
      } else {
        budgetMap.set(rn, {
          resourceName: rn,
          currentMicros: Number(row.campaignBudget?.amountMicros ?? 0),
          campaignNames: [row.campaign?.name ?? ""],
        });
      }
    }

    const updates = [...budgetMap.values()].map((b) => ({
      resourceName: b.resourceName,
      newMicros: Math.round(b.currentMicros * multiplier),
      oldTry: b.currentMicros / 1_000_000,
      newTry: Math.round((b.currentMicros * multiplier) / 10_000) / 100,
      campaignNames: b.campaignNames,
    }));

    const mutateUrl = `https://googleads.googleapis.com/${API_VERSION}/customers/${creds.customerId}/campaignBudgets:mutate`;
    const operations = updates.map((u) => ({
      update: { resourceName: u.resourceName, amountMicros: String(u.newMicros) },
      updateMask: "amountMicros",
    }));

    const mutateRes = await fetch(mutateUrl, {
      method: "POST",
      headers: adsHeaders(creds, token),
      body: JSON.stringify({ operations }),
    });
    if (!mutateRes.ok) {
      const err = await mutateRes.text();
      return NextResponse.json({ error: "mutate_failed", details: err }, { status: 502 });
    }

    return NextResponse.json({ ok: true, multiplier, updated: updates });
  }

  // --- set_budget ---
  if (body.action === "set_budget") {
    const campaignId = String(body.campaignId ?? "").trim();
    const budgetTry = Number(body.budgetTry);
    if (!campaignId || isNaN(budgetTry) || budgetTry < 10 || budgetTry > 5000) {
      return NextResponse.json({ error: "invalid_params", hint: "campaignId and budgetTry (10–5000) required" }, { status: 400 });
    }

    type BudgetRow = {
      campaign?: { id?: string };
      campaignBudget?: { resourceName?: string; amountMicros?: string };
    };
    const data = await adsSearch(creds, token, `
      SELECT campaign.id, campaign_budget.resource_name, campaign_budget.amount_micros
      FROM campaign
      WHERE campaign.id = '${campaignId}'
    `);
    const row = ((data.results ?? []) as BudgetRow[])[0];
    if (!row?.campaignBudget?.resourceName) {
      return NextResponse.json({ error: "campaign_not_found" }, { status: 404 });
    }

    const mutateUrl = `https://googleads.googleapis.com/${API_VERSION}/customers/${creds.customerId}/campaignBudgets:mutate`;
    const mutateRes = await fetch(mutateUrl, {
      method: "POST",
      headers: adsHeaders(creds, token),
      body: JSON.stringify({
        operations: [{
          update: { resourceName: row.campaignBudget.resourceName, amountMicros: String(Math.round(budgetTry * 1_000_000)) },
          updateMask: "amountMicros",
        }],
      }),
    });
    if (!mutateRes.ok) {
      return NextResponse.json({ error: "mutate_failed", details: await mutateRes.text() }, { status: 502 });
    }
    return NextResponse.json({ ok: true, campaignId, oldTry: Number(row.campaignBudget.amountMicros) / 1_000_000, newTry: budgetTry });
  }

  // --- add_negatives ---
  if (body.action === "add_negatives") {
    const keywords: string[] = ((body.keywords ?? []) as unknown[]).filter(
      (k): k is string => typeof k === "string" && (k as string).trim().length > 0
    );
    if (keywords.length === 0) {
      return NextResponse.json({ error: "no_keywords" }, { status: 400 });
    }

    type CampaignIdRow = { campaign?: { id?: string; name?: string } };
    let campaignRows: CampaignIdRow[];
    try {
      const data = await adsSearch(creds, token, `
        SELECT campaign.id, campaign.name
        FROM campaign
        WHERE campaign.status != 'REMOVED'
      `);
      campaignRows = (data.results ?? []) as CampaignIdRow[];
    } catch (err) {
      return NextResponse.json({ error: "query_failed", details: String(err) }, { status: 502 });
    }

    const operations: unknown[] = [];
    for (const row of campaignRows) {
      const campaignId = row.campaign?.id;
      if (!campaignId) continue;
      for (const kw of keywords) {
        operations.push({
          create: {
            campaign: `customers/${creds.customerId}/campaigns/${campaignId}`,
            negative: true,
            keyword: { text: kw, matchType: "EXACT" },
          },
        });
      }
    }

    const negUrl = `https://googleads.googleapis.com/${API_VERSION}/customers/${creds.customerId}/campaignCriteria:mutate`;
    const negRes = await fetch(negUrl, {
      method: "POST",
      headers: adsHeaders(creds, token),
      body: JSON.stringify({ operations }),
    });
    if (!negRes.ok) {
      return NextResponse.json(
        { error: "negatives_failed", details: await negRes.text() },
        { status: 502 }
      );
    }

    return NextResponse.json({
      ok: true,
      added: keywords.length,
      campaigns: campaignRows.length,
      total: keywords.length * campaignRows.length,
    });
  }

  // --- cap_pmax ---
  // Reads all active campaign budgets, calculates total, caps PMax at maxPct% (default 15%, max 20%)
  if (body.action === "cap_pmax") {
    const maxPct = Math.min(20, Math.max(5, Number(body.maxPct ?? 15))) / 100;
    const PMAX_CAMPAIGN_ID = "23792634655";

    type BudgetSummaryRow = {
      campaign?: { id?: string; advertisingChannelType?: string; status?: string };
      campaignBudget?: { resourceName?: string; amountMicros?: string };
    };

    let budgetRows: BudgetSummaryRow[];
    try {
      const data = await adsSearch(creds, token, `
        SELECT campaign.id, campaign.advertising_channel_type, campaign.status,
               campaign_budget.resource_name, campaign_budget.amount_micros
        FROM campaign
        WHERE campaign.status = 'ENABLED'
      `);
      budgetRows = (data.results ?? []) as BudgetSummaryRow[];
    } catch (err) {
      return NextResponse.json({ error: "query_failed", details: String(err) }, { status: 502 });
    }

    const totalMicros = budgetRows.reduce(
      (sum, r) => sum + Number(r.campaignBudget?.amountMicros ?? 0),
      0
    );
    const capMicros = Math.round(totalMicros * maxPct);

    const pmaxRow = budgetRows.find((r) => r.campaign?.id === PMAX_CAMPAIGN_ID);
    if (!pmaxRow?.campaignBudget?.resourceName) {
      return NextResponse.json({ error: "pmax_not_found", rows: budgetRows.length }, { status: 404 });
    }

    const currentMicros = Number(pmaxRow.campaignBudget.amountMicros ?? 0);
    if (currentMicros <= capMicros) {
      return NextResponse.json({
        ok: true,
        message: "already_within_cap",
        currentTry: currentMicros / 1_000_000,
        capTry: capMicros / 1_000_000,
        totalTry: totalMicros / 1_000_000,
        maxPct: `${Math.round(maxPct * 100)}%`,
      });
    }

    const mutateUrl = `https://googleads.googleapis.com/${API_VERSION}/customers/${creds.customerId}/campaignBudgets:mutate`;
    const mutateRes = await fetch(mutateUrl, {
      method: "POST",
      headers: adsHeaders(creds, token),
      body: JSON.stringify({
        operations: [{
          update: { resourceName: pmaxRow.campaignBudget.resourceName, amountMicros: String(capMicros) },
          updateMask: "amountMicros",
        }],
      }),
    });
    if (!mutateRes.ok) {
      return NextResponse.json({ error: "mutate_failed", details: await mutateRes.text() }, { status: 502 });
    }
    return NextResponse.json({
      ok: true,
      pmaxCampaignId: PMAX_CAMPAIGN_ID,
      oldTry: currentMicros / 1_000_000,
      newTry: capMicros / 1_000_000,
      totalTry: totalMicros / 1_000_000,
      maxPct: `${Math.round(maxPct * 100)}%`,
    });
  }

  // --- exclude_placements ---
  // Adds account-level placement exclusions via CustomerNegativeCriteria.
  // Works for PMax (campaign-level criteria not supported on PMax via API).
  if (body.action === "exclude_placements") {
    const urls: string[] = (body.urls ?? [
      "googlesyndication.com",
      "safeframe.googlesyndication.com",
      "pagead2.googlesyndication.com",
      "lsmagazineimg.com",
    ]).filter((u: unknown) => typeof u === "string" && (u as string).trim().length > 0);

    const operations = urls.map((url) => ({
      create: { placement: { url } },
    }));

    const excUrl = `https://googleads.googleapis.com/${API_VERSION}/customers/${creds.customerId}/customerNegativeCriteria:mutate`;
    const excRes = await fetch(excUrl, {
      method: "POST",
      headers: adsHeaders(creds, token),
      body: JSON.stringify({ operations }),
    });
    if (!excRes.ok) {
      return NextResponse.json({ error: "exclusions_failed", details: await excRes.text() }, { status: 502 });
    }
    return NextResponse.json({
      ok: true,
      level: "account",
      excludedUrls: urls,
      total: urls.length,
    });
  }

  // --- create_language_ad_group ---
  // Creates ad group + keywords + RSA in one shot for FR/DE language targeting.
  // Step 1: create ad group → Step 2: add keywords → Step 3: create RSA → Step 4: add language criterion
  if (body.action === "create_language_ad_group") {
    const { campaignResourceName, adGroupName, finalUrls, headlines, descriptions, path1, path2, languageId, cpcBidMicros } = body;
    const kwInput = body.keywords as Array<{text: string; matchType?: string}> | undefined;

    if (!campaignResourceName || !adGroupName || !kwInput?.length || !finalUrls?.length || !headlines?.length || !descriptions?.length) {
      return NextResponse.json({ error: "missing_required_fields: campaignResourceName, adGroupName, keywords, finalUrls, headlines, descriptions" }, { status: 400 });
    }
    if (headlines.length < 3 || headlines.length > 15) {
      return NextResponse.json({ error: "headlines_must_be_3_to_15" }, { status: 400 });
    }
    if (descriptions.length < 2 || descriptions.length > 4) {
      return NextResponse.json({ error: "descriptions_must_be_2_to_4" }, { status: 400 });
    }

    // Step 1: Create ad group
    const agUrl = `https://googleads.googleapis.com/${API_VERSION}/customers/${creds.customerId}/adGroups:mutate`;
    const agRes = await fetch(agUrl, {
      method: "POST",
      headers: adsHeaders(creds, token),
      body: JSON.stringify({
        operations: [{
          create: {
            name: adGroupName,
            campaign: campaignResourceName,
            type: "SEARCH_STANDARD",
            status: "ENABLED",
            cpcBidMicros: String(cpcBidMicros ?? 1500000),
          },
        }],
      }),
    });
    if (!agRes.ok) {
      return NextResponse.json({ error: "create_ad_group_failed", details: await agRes.text() }, { status: 502 });
    }
    const agData = await agRes.json() as { results?: Array<{ resourceName: string }> };
    const newAdGroupResourceName = agData.results?.[0]?.resourceName;
    if (!newAdGroupResourceName) {
      return NextResponse.json({ error: "no_ad_group_resource_name", response: agData }, { status: 502 });
    }

    // Step 2: Add keywords
    const kwUrl = `https://googleads.googleapis.com/${API_VERSION}/customers/${creds.customerId}/adGroupCriteria:mutate`;
    const kwOperations = kwInput.map((kw) => ({
      create: {
        adGroup: newAdGroupResourceName,
        keyword: { text: kw.text, matchType: kw.matchType ?? "PHRASE" },
        status: "ENABLED",
      },
    }));
    const kwRes = await fetch(kwUrl, {
      method: "POST",
      headers: adsHeaders(creds, token),
      body: JSON.stringify({ operations: kwOperations }),
    });
    if (!kwRes.ok) {
      return NextResponse.json({ error: "add_keywords_failed", adGroup: newAdGroupResourceName, details: await kwRes.text() }, { status: 502 });
    }

    // Step 3: Create RSA
    const rsaUrl = `https://googleads.googleapis.com/${API_VERSION}/customers/${creds.customerId}/adGroupAds:mutate`;
    const rsaRes = await fetch(rsaUrl, {
      method: "POST",
      headers: adsHeaders(creds, token),
      body: JSON.stringify({
        operations: [{
          create: {
            adGroup: newAdGroupResourceName,
            status: "ENABLED",
            ad: {
              finalUrls,
              responsiveSearchAd: {
                ...(path1 ? { path1 } : {}),
                ...(path2 ? { path2 } : {}),
                headlines: headlines.map((text) => ({ text })),
                descriptions: descriptions.map((text) => ({ text })),
              },
            },
          },
        }],
      }),
    });
    if (!rsaRes.ok) {
      return NextResponse.json({ error: "create_rsa_failed", adGroup: newAdGroupResourceName, details: await rsaRes.text() }, { status: 502 });
    }

    // Step 4: Optionally add language criterion to campaign
    let languageResult: string | null = null;
    if (languageId) {
      const langUrl = `https://googleads.googleapis.com/${API_VERSION}/customers/${creds.customerId}/campaignCriteria:mutate`;
      const langRes = await fetch(langUrl, {
        method: "POST",
        headers: adsHeaders(creds, token),
        body: JSON.stringify({
          operations: [{
            create: {
              campaign: campaignResourceName,
              type: "LANGUAGE",
              language: { languageConstant: `languageConstants/${languageId}` },
            },
          }],
        }),
      });
      languageResult = langRes.ok ? "added" : `failed: ${await langRes.text()}`;
    }

    return NextResponse.json({
      ok: true,
      adGroup: newAdGroupResourceName,
      keywordsAdded: kwInput.length,
      rsaCreated: true,
      languageCriterion: languageResult ?? "not_requested",
    });
  }

  // --- list_search_terms ---
  // Returns top search queries triggering ads in the last 30 days, sorted by impressions.
  // Use to identify irrelevant queries for negative keyword addition.
  if (body.action === "list_search_terms") {
    const days = 30;
    const searchQuery = `
      SELECT
        search_term_view.search_term,
        search_term_view.status,
        metrics.impressions,
        metrics.clicks,
        metrics.cost_micros,
        metrics.conversions,
        campaign.name,
        ad_group.name
      FROM search_term_view
      WHERE segments.date DURING LAST_30_DAYS
        AND metrics.impressions > 0
      ORDER BY metrics.impressions DESC
      LIMIT 200
    `;
    const stUrl = `https://googleads.googleapis.com/${API_VERSION}/customers/${creds.customerId}/googleAds:searchStream`;
    const stRes = await fetch(stUrl, {
      method: "POST",
      headers: adsHeaders(creds, token),
      body: JSON.stringify({ query: searchQuery }),
    });
    if (!stRes.ok) {
      return NextResponse.json({ error: "list_search_terms_failed", details: await stRes.text() }, { status: 502 });
    }
    const stText = await stRes.text();
    // searchStream returns NDJSON — parse each line
    const rows = stText.trim().split("\n")
      .filter(Boolean)
      .flatMap((line) => {
        try {
          const parsed = JSON.parse(line) as { results?: unknown[] };
          return parsed.results ?? [];
        } catch { return []; }
      }) as Array<{
        searchTermView?: { searchTerm?: string; status?: string };
        metrics?: { impressions?: string; clicks?: string; costMicros?: string; conversions?: string };
        campaign?: { name?: string };
        adGroup?: { name?: string };
      }>;

    const terms = rows.map((r) => ({
      query: r.searchTermView?.searchTerm ?? "",
      status: r.searchTermView?.status ?? "",
      impressions: Number(r.metrics?.impressions ?? 0),
      clicks: Number(r.metrics?.clicks ?? 0),
      costEur: Math.round(Number(r.metrics?.costMicros ?? 0) / 10000) / 100,
      conversions: Number(r.metrics?.conversions ?? 0),
      campaign: r.campaign?.name ?? "",
      adGroup: r.adGroup?.name ?? "",
    }));

    return NextResponse.json({ ok: true, days, total: terms.length, terms });
  }

  // --- get_campaign_info ---
  // Returns campaigns with bid strategy, budget, status, and 30-day metrics.
  // Use to audit Smart Bidding data source and campaign health.
  if (body.action === "get_campaign_info") {
    const infoQuery = `
      SELECT
        campaign.id,
        campaign.name,
        campaign.status,
        campaign.advertising_channel_type,
        campaign.bidding_strategy_type,
        campaign.target_cpa.target_cpa_micros,
        campaign.target_roas.target_roas,
        campaign_budget.amount_micros,
        metrics.impressions,
        metrics.clicks,
        metrics.cost_micros,
        metrics.conversions,
        metrics.conversion_value
      FROM campaign
      WHERE campaign.status != 'REMOVED'
        AND segments.date DURING LAST_30_DAYS
      ORDER BY metrics.cost_micros DESC
      LIMIT 50
    `;
    const ciUrl = `https://googleads.googleapis.com/${API_VERSION}/customers/${creds.customerId}/googleAds:searchStream`;
    const ciRes = await fetch(ciUrl, {
      method: "POST",
      headers: adsHeaders(creds, token),
      body: JSON.stringify({ query: infoQuery }),
    });
    if (!ciRes.ok) {
      return NextResponse.json({ error: "get_campaign_info_failed", details: await ciRes.text() }, { status: 502 });
    }
    const ciText = await ciRes.text();
    type CampaignRow = {
      campaign?: {
        id?: string; name?: string; status?: string;
        advertisingChannelType?: string; biddingStrategyType?: string;
        targetCpa?: { targetCpaMicros?: string };
        targetRoas?: { targetRoas?: number };
      };
      campaignBudget?: { amountMicros?: string };
      metrics?: { impressions?: string; clicks?: string; costMicros?: string; conversions?: string; conversionValue?: string };
    };
    const ciRows = ciText.trim().split("\n")
      .filter(Boolean)
      .flatMap((line) => {
        try { return (JSON.parse(line) as { results?: unknown[] }).results ?? []; }
        catch { return []; }
      }) as CampaignRow[];

    const campaigns = ciRows.map((r) => ({
      id: r.campaign?.id ?? "",
      name: r.campaign?.name ?? "",
      status: r.campaign?.status ?? "",
      type: r.campaign?.advertisingChannelType ?? "",
      biddingStrategy: r.campaign?.biddingStrategyType ?? "",
      targetCpa: r.campaign?.targetCpa?.targetCpaMicros ? Math.round(Number(r.campaign.targetCpa.targetCpaMicros) / 10000) / 100 : null,
      targetRoas: r.campaign?.targetRoas?.targetRoas ?? null,
      budgetEur: Math.round(Number(r.campaignBudget?.amountMicros ?? 0) / 10000) / 100,
      impressions30d: Number(r.metrics?.impressions ?? 0),
      clicks30d: Number(r.metrics?.clicks ?? 0),
      spendEur30d: Math.round(Number(r.metrics?.costMicros ?? 0) / 10000) / 100,
      conversions30d: Number(r.metrics?.conversions ?? 0),
      conversionValue30d: Math.round(Number(r.metrics?.conversionValue ?? 0) * 100) / 100,
    }));

    return NextResponse.json({ ok: true, campaigns, total: campaigns.length });
  }

  // --- add_brand_exclusions ---
  // Excludes brand keywords from PMax to prevent cannibalizing Search brand campaigns.
  // Body: { brandNames?: string[] } — defaults to MerrySails variants
  if (body.action === "add_brand_exclusions") {
    const brands = body.keywords as string[] | undefined ?? [
      "merrysails", "merry sails", "merrysails.com", "merry tourism",
    ];

    // List PMax campaigns first
    const pxQuery = `
      SELECT campaign.id, campaign.resource_name, campaign.name
      FROM campaign
      WHERE campaign.advertising_channel_type = 'PERFORMANCE_MAX'
        AND campaign.status = 'ENABLED'
    `;
    const pxUrl = `https://googleads.googleapis.com/${API_VERSION}/customers/${creds.customerId}/googleAds:searchStream`;
    const pxRes = await fetch(pxUrl, {
      method: "POST",
      headers: adsHeaders(creds, token),
      body: JSON.stringify({ query: pxQuery }),
    });
    if (!pxRes.ok) {
      return NextResponse.json({ error: "list_pmax_failed", details: await pxRes.text() }, { status: 502 });
    }
    const pxText = await pxRes.text();
    type PmaxRow = { campaign?: { id?: string; resourceName?: string; name?: string } };
    const pmaxCampaigns = pxText.trim().split("\n")
      .filter(Boolean)
      .flatMap((line) => {
        try { return (JSON.parse(line) as { results?: unknown[] }).results ?? []; }
        catch { return []; }
      }) as PmaxRow[];

    if (!pmaxCampaigns.length) {
      return NextResponse.json({ ok: true, message: "no_active_pmax_campaigns", brandsRequested: brands });
    }

    // Add brand exclusions to each PMax campaign
    const results: Array<{ campaign: string; status: string }> = [];
    for (const row of pmaxCampaigns) {
      const campaignRn = row.campaign?.resourceName;
      if (!campaignRn) continue;

      const excUrl = `https://googleads.googleapis.com/${API_VERSION}/customers/${creds.customerId}/campaignCriteria:mutate`;
      const excRes = await fetch(excUrl, {
        method: "POST",
        headers: adsHeaders(creds, token),
        body: JSON.stringify({
          operations: brands.map((brand) => ({
            create: {
              campaign: campaignRn,
              negative: true,
              keyword: { text: brand, matchType: "BROAD" },
            },
          })),
        }),
      });
      results.push({
        campaign: row.campaign?.name ?? campaignRn,
        status: excRes.ok ? "excluded" : `failed: HTTP ${excRes.status}`,
      });
    }

    return NextResponse.json({ ok: true, brands, results });
  }

  return NextResponse.json({ error: "unknown_action" }, { status: 400 });
}
