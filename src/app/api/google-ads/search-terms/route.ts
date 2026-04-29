/**
 * GET /api/google-ads/search-terms?token=...&days=14&limit=50
 *
 * Returns top search terms that triggered ads, sorted by cost.
 * Also returns ad group ads (headlines/descriptions) for review.
 *
 * Use this to:
 * 1. Find wasted spend on irrelevant queries → add as negatives
 * 2. Find converting queries → add as exact match keywords
 * 3. Review ad copy quality
 */
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const API_VERSION = "v20";

function isAuthorized(req: NextRequest): boolean {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) return process.env.NODE_ENV !== "production";
  const auth = req.headers.get("authorization");
  if (auth === `Bearer ${cronSecret}`) return true;
  return req.nextUrl.searchParams.get("token") === cronSecret;
}

function readCreds() {
  const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID?.replace(/-/g, "").trim();
  const developerToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN?.trim();
  const refreshToken = process.env.GOOGLE_ADS_REFRESH_TOKEN?.trim();
  const clientId = process.env.GOOGLE_ADS_CLIENT_ID?.trim();
  const clientSecret = process.env.GOOGLE_ADS_CLIENT_SECRET?.trim();
  if (!customerId || !developerToken || !refreshToken || !clientId || !clientSecret) return null;
  return { customerId, developerToken, refreshToken, clientId, clientSecret };
}

async function getAccessToken(creds: NonNullable<ReturnType<typeof readCreds>>): Promise<string> {
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
  if (!data.access_token) throw new Error("missing access_token");
  return data.access_token;
}

async function adsSearch(
  creds: NonNullable<ReturnType<typeof readCreds>>,
  token: string,
  query: string
): Promise<{ results?: unknown[] }> {
  const url = `https://googleads.googleapis.com/${API_VERSION}/customers/${creds.customerId}/googleAds:search`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "developer-token": creds.developerToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });
  if (!res.ok) throw new Error(`Ads search ${res.status}: ${await res.text()}`);
  return res.json() as Promise<{ results?: unknown[] }>;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const creds = readCreds();
  if (!creds) return NextResponse.json({ skipped: "missing_credentials" });

  const days = Math.min(90, Math.max(7, Number(req.nextUrl.searchParams.get("days") ?? "14")));
  const limit = Math.min(100, Math.max(10, Number(req.nextUrl.searchParams.get("limit") ?? "50")));

  let token: string;
  try { token = await getAccessToken(creds); }
  catch (err) { return NextResponse.json({ error: "oauth_failed", details: String(err) }, { status: 502 }); }

  type SearchTermRow = {
    searchTermView?: { searchTerm?: string; status?: string };
    campaign?: { name?: string };
    adGroup?: { name?: string };
    metrics?: { costMicros?: string; clicks?: string; impressions?: string; conversions?: number; ctr?: number };
  };

  type AdRow = {
    campaign?: { name?: string };
    adGroup?: { name?: string };
    adGroupAd?: {
      ad?: {
        responsiveSearchAd?: {
          headlines?: Array<{ text?: string; pinnedField?: string }>;
          descriptions?: Array<{ text?: string }>;
        };
        expandedTextAd?: {
          headlinePart1?: string;
          headlinePart2?: string;
          headlinePart3?: string;
          description?: string;
          description2?: string;
        };
        type?: string;
      };
      status?: string;
    };
    metrics?: { costMicros?: string; clicks?: string; impressions?: string; conversions?: number; ctr?: number };
  };

  const [searchTermsBody, adsBody] = await Promise.all([
    adsSearch(creds, token, `
      SELECT
        search_term_view.search_term,
        search_term_view.status,
        campaign.name,
        ad_group.name,
        metrics.cost_micros,
        metrics.clicks,
        metrics.impressions,
        metrics.conversions,
        metrics.ctr
      FROM search_term_view
      WHERE segments.date DURING LAST_${days}_DAYS
        AND metrics.impressions > 0
      ORDER BY metrics.cost_micros DESC
      LIMIT ${limit}
    `),
    adsSearch(creds, token, `
      SELECT
        campaign.name,
        ad_group.name,
        ad_group_ad.ad.type,
        ad_group_ad.ad.responsive_search_ad.headlines,
        ad_group_ad.ad.responsive_search_ad.descriptions,
        ad_group_ad.ad.expanded_text_ad.headline_part1,
        ad_group_ad.ad.expanded_text_ad.headline_part2,
        ad_group_ad.ad.expanded_text_ad.description,
        ad_group_ad.status,
        metrics.cost_micros,
        metrics.clicks,
        metrics.impressions,
        metrics.conversions,
        metrics.ctr
      FROM ad_group_ad
      WHERE campaign.status != 'REMOVED'
        AND ad_group_ad.status != 'REMOVED'
        AND segments.date DURING LAST_${days}_DAYS
      ORDER BY metrics.cost_micros DESC
      LIMIT 30
    `),
  ]).catch((err) => {
    throw err;
  });

  const terms = ((searchTermsBody.results ?? []) as SearchTermRow[]).map((row) => ({
    term: row.searchTermView?.searchTerm ?? "",
    status: row.searchTermView?.status ?? "",
    campaign: row.campaign?.name ?? "",
    adGroup: row.adGroup?.name ?? "",
    cost: Math.round(Number(row.metrics?.costMicros ?? 0) / 10_000) / 100,
    clicks: Number(row.metrics?.clicks ?? 0),
    impressions: Number(row.metrics?.impressions ?? 0),
    conversions: Number(row.metrics?.conversions ?? 0),
    ctr: row.metrics?.ctr != null ? Math.round(row.metrics.ctr * 10000) / 100 : 0,
  }));

  const ads = ((adsBody.results ?? []) as AdRow[]).map((row) => {
    const ad = row.adGroupAd?.ad;
    const rsa = ad?.responsiveSearchAd;
    const eta = ad?.expandedTextAd;
    const headlines = rsa?.headlines?.map((h) => h.text ?? "").filter(Boolean) ??
      [eta?.headlinePart1, eta?.headlinePart2, eta?.headlinePart3].filter(Boolean);
    const descriptions = rsa?.descriptions?.map((d) => d.text ?? "").filter(Boolean) ??
      [eta?.description, eta?.description2].filter(Boolean);

    return {
      campaign: row.campaign?.name ?? "",
      adGroup: row.adGroup?.name ?? "",
      type: ad?.type ?? "",
      status: row.adGroupAd?.status ?? "",
      headlines,
      descriptions,
      cost: Math.round(Number(row.metrics?.costMicros ?? 0) / 10_000) / 100,
      clicks: Number(row.metrics?.clicks ?? 0),
      impressions: Number(row.metrics?.impressions ?? 0),
      conversions: Number(row.metrics?.conversions ?? 0),
    };
  });

  // Identify potentially wasted spend: high cost, 0 conversions, not "ADDED" (meaning not a keyword match)
  const wastedTerms = terms.filter((t) => t.cost > 5 && t.conversions === 0 && t.status !== "ADDED");
  const suggestedNegatives = [...new Set(wastedTerms.map((t) => t.term))].slice(0, 20);

  return NextResponse.json({
    period: `last_${days}_days`,
    totalTerms: terms.length,
    wastedSpend: Math.round(wastedTerms.reduce((s, t) => s + t.cost, 0) * 100) / 100,
    suggestedNegatives,
    terms,
    ads,
  });
}
