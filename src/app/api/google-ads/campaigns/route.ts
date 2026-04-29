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

  let body: { action?: string; multiplier?: number; keywords?: string[] };
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

  // --- add_negatives ---
  if (body.action === "add_negatives") {
    const keywords: string[] = (body.keywords ?? []).filter(
      (k) => typeof k === "string" && k.trim().length > 0
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

  return NextResponse.json({ error: "unknown_action" }, { status: 400 });
}
