/**
 * GET  /api/gsc/inspect?token=...&url=https://merrysails.com/tr/bosphorus-cruise
 *   Inspects a single URL via GSC URL Inspection API v1.
 *   Returns: coverageState, robotsTxtState, indexingState, lastCrawlTime, richResults.
 *
 * POST /api/gsc/inspect?token=...
 *   Body: { action: "inspect_all" }
 *     Inspects all 130 locale + key EN URLs. Rate-limited to 8 req/s (quota: 2000/day, 600/min).
 *     Returns per-URL status + summary counts.
 *
 *   Body: { action: "inspect", urls: string[] }
 *     Inspects specific URLs (max 200 per call).
 *
 *   Body: { action: "submit_sitemap" }
 *     Re-submits the sitemap to GSC to trigger crawl of new locale pages.
 *
 *   Body: { action: "indexnow", urls?: string[] }
 *     Submits URLs to IndexNow (Bing/Yandex). Defaults to all locale URLs if no urls provided.
 */
import { NextRequest, NextResponse } from "next/server";
import { ACTIVE_LOCALES } from "@/i18n/config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const SITE_URL = "https://merrysails.com";
const INSPECTION_API = "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect";
const SITEMAPS_API = (siteUrl: string) =>
  `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/sitemaps`;
const INDEXNOW_API = "https://api.indexnow.org/IndexNow";

// All routes with locale pages
const LOCALE_PATHS = [
  "/bosphorus-cruise",
  "/istanbul-dinner-cruise",
  "/cruises/bosphorus-sunset-cruise",
  "/yacht-charter-istanbul",
  "/boat-rental-istanbul",
  "/boat-rental-hourly-istanbul",
  "/private-bosphorus-dinner-cruise",
  "/proposal-yacht-rental-istanbul",
  "/corporate-events",
  "/private-events",
  "/faq",
  "/about",
  "/contact",
  "/blog",
  "/guides",
  "/cruises",
  "/private-tours",
  "/bosphorus-cruise-departure-points",
  "/client-hosting-yacht-istanbul",
  "/corporate-yacht-dinner-istanbul",
  "/dinner-cruise-pickup-sultanahmet-taksim",
  "/dinner-cruise-with-hotel-pickup-istanbul",
  "/kabatas-dinner-cruise-istanbul",
  "/kurucesme-marina-yacht-charter",
  "/private-dinner-cruise-for-couples-istanbul",
  "/product-launch-yacht-istanbul",
  "/proposal-yacht-with-photographer-istanbul",
  "/sunset-cruise-tickets-istanbul",
  "/team-building-yacht-istanbul",
  "/turkish-night-dinner-cruise-istanbul",
  "/reservation",
];

// Key EN pages to also inspect
const EN_PRIORITY_PATHS = [
  "/",
  "/bosphorus-cruise",
  "/istanbul-dinner-cruise",
  "/cruises/bosphorus-sunset-cruise",
  "/yacht-charter-istanbul",
  "/boat-rental-istanbul",
];

function buildAllUrls(): string[] {
  const urls: string[] = [];
  // Locale homepages
  const nonEn = ACTIVE_LOCALES.filter((l) => l !== "en");
  for (const locale of nonEn) {
    urls.push(`${SITE_URL}/${locale}`);
  }
  // All locale paths × all non-EN locales
  for (const locale of nonEn) {
    for (const path of LOCALE_PATHS) {
      urls.push(`${SITE_URL}/${locale}${path}`);
    }
  }
  // EN priority pages
  for (const path of EN_PRIORITY_PATHS) {
    urls.push(`${SITE_URL}${path}`);
  }
  return urls;
}

function isAuthorized(req: NextRequest): boolean {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) return process.env.NODE_ENV !== "production";
  const auth = req.headers.get("authorization");
  if (auth === `Bearer ${cronSecret}`) return true;
  return req.nextUrl.searchParams.get("token") === cronSecret;
}

function readGscCreds() {
  const siteUrl = process.env.GSC_SITE_URL?.trim();
  const clientId = process.env.GSC_CLIENT_ID?.trim();
  const clientSecret = process.env.GSC_CLIENT_SECRET?.trim();
  const refreshToken = process.env.GSC_REFRESH_TOKEN?.trim();
  if (!siteUrl || !clientId || !clientSecret || !refreshToken) return null;
  return { siteUrl, clientId, clientSecret, refreshToken };
}

async function getAccessToken(creds: NonNullable<ReturnType<typeof readGscCreds>>): Promise<string> {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: creds.clientId,
      client_secret: creds.clientSecret,
      refresh_token: creds.refreshToken,
      grant_type: "refresh_token",
    }).toString(),
  });
  if (!res.ok) throw new Error(`OAuth: ${res.status} — ${await res.text()}`);
  const data = (await res.json()) as { access_token?: string };
  if (!data.access_token) throw new Error("missing access_token");
  return data.access_token;
}

type InspectionResult = {
  url: string;
  verdict: string;
  coverageState: string;
  robotsTxtState: string;
  indexingState: string;
  lastCrawlTime: string | null;
  pageFetchState: string;
  richResultsDetected: boolean;
  richVerdict: string;
  error?: string;
};

async function inspectUrl(
  url: string,
  siteUrl: string,
  token: string
): Promise<InspectionResult> {
  const res = await fetch(INSPECTION_API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inspectionUrl: url, siteUrl }),
  });

  if (!res.ok) {
    return {
      url,
      verdict: "ERROR",
      coverageState: "ERROR",
      robotsTxtState: "UNKNOWN",
      indexingState: "UNKNOWN",
      lastCrawlTime: null,
      pageFetchState: "UNKNOWN",
      richResultsDetected: false,
      richVerdict: "UNKNOWN",
      error: `HTTP ${res.status}: ${await res.text()}`,
    };
  }

  type ApiResult = {
    inspectionResult?: {
      indexStatusResult?: {
        verdict?: string;
        coverageState?: string;
        robotsTxtState?: string;
        indexingState?: string;
        lastCrawlTime?: string;
        pageFetchState?: string;
        googleCanonical?: string;
      };
      richResultsResult?: { verdict?: string; detectedItems?: unknown[] };
      mobileUsabilityResult?: { verdict?: string };
    };
  };

  const data = (await res.json()) as ApiResult;
  const r = data.inspectionResult?.indexStatusResult ?? {};

  return {
    url,
    verdict: r.verdict ?? "UNKNOWN",
    coverageState: r.coverageState ?? "UNKNOWN",
    robotsTxtState: r.robotsTxtState ?? "UNKNOWN",
    indexingState: r.indexingState ?? "UNKNOWN",
    lastCrawlTime: r.lastCrawlTime ?? null,
    pageFetchState: r.pageFetchState ?? "UNKNOWN",
    richResultsDetected: (data.inspectionResult?.richResultsResult?.detectedItems?.length ?? 0) > 0,
    richVerdict: data.inspectionResult?.richResultsResult?.verdict ?? "UNKNOWN",
  };
}

// Rate limiter: max 8 req/s to stay under 600/min quota
function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

async function inspectBatch(
  urls: string[],
  siteUrl: string,
  token: string
): Promise<InspectionResult[]> {
  const results: InspectionResult[] = [];
  for (let i = 0; i < urls.length; i++) {
    if (i > 0 && i % 8 === 0) await delay(1000); // 8 req/s burst, then 1s pause
    results.push(await inspectUrl(urls[i], siteUrl, token));
  }
  return results;
}

// --- GET: single URL inspection ---
export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const creds = readGscCreds();
  if (!creds) return NextResponse.json({ skipped: "missing_gsc_credentials" });

  const url = req.nextUrl.searchParams.get("url");
  if (!url) return NextResponse.json({ error: "url param required" }, { status: 400 });

  let token: string;
  try { token = await getAccessToken(creds); }
  catch (err) { return NextResponse.json({ error: "oauth_failed", details: String(err) }, { status: 502 }); }

  const result = await inspectUrl(url, creds.siteUrl, token);
  return NextResponse.json(result);
}

// --- POST: batch inspect / submit sitemap / indexnow ---
export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  let body: { action?: string; urls?: string[] };
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: "invalid_json" }, { status: 400 }); }

  // --- indexnow --- (does not require GSC OAuth)
  if (body.action === "indexnow") {
    const indexnowKey = process.env.INDEXNOW_KEY ?? "merrysails-indexnow-key";
    const urls = body.urls ?? buildAllUrls();

    const payload = {
      host: "merrysails.com",
      key: indexnowKey,
      keyLocation: `${SITE_URL}/${indexnowKey}.txt`,
      urlList: urls,
    };

    const inRes = await fetch(INDEXNOW_API, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });

    return NextResponse.json({
      ok: inRes.status === 200 || inRes.status === 202,
      status: inRes.status,
      urlsSubmitted: urls.length,
      response: inRes.status !== 200 && inRes.status !== 202 ? await inRes.text() : "accepted",
    });
  }

  const creds = readGscCreds();
  if (!creds) return NextResponse.json({ skipped: "missing_gsc_credentials" });

  let token: string;
  try { token = await getAccessToken(creds); }
  catch (err) { return NextResponse.json({ error: "oauth_failed", details: String(err) }, { status: 502 }); }

  // --- inspect_all ---
  if (body.action === "inspect_all") {
    const urls = buildAllUrls();
    const results = await inspectBatch(urls, creds.siteUrl, token);

    const coverageCounts: Record<string, number> = {};
    for (const r of results) {
      coverageCounts[r.coverageState] = (coverageCounts[r.coverageState] ?? 0) + 1;
    }
    const notIndexed = results.filter(
      (r) => !["Indexed, not submitted in sitemap", "Submitted and indexed"].includes(r.coverageState)
        && r.verdict !== "PASS"
    );

    return NextResponse.json({
      ok: true,
      inspected: urls.length,
      coverageSummary: coverageCounts,
      notIndexedCount: notIndexed.length,
      notIndexedUrls: notIndexed.map((r) => ({ url: r.url, state: r.coverageState })),
      richResultsDetected: results.filter((r) => r.richResultsDetected).length,
      results,
    });
  }

  // --- inspect (specific URLs) ---
  if (body.action === "inspect") {
    const urls = (body.urls ?? []).slice(0, 200);
    if (!urls.length) return NextResponse.json({ error: "urls required" }, { status: 400 });
    const results = await inspectBatch(urls, creds.siteUrl, token);
    return NextResponse.json({ ok: true, inspected: urls.length, results });
  }

  // --- submit_sitemap ---
  // Re-submits sitemap.xml to GSC so Google re-crawls all locale pages.
  if (body.action === "submit_sitemap") {
    const sitemapUrl = `${SITE_URL}/sitemap.xml`;
    const encoded = encodeURIComponent(creds.siteUrl);
    const feedEncoded = encodeURIComponent(sitemapUrl);
    const apiUrl = `${SITEMAPS_API(creds.siteUrl)}/${feedEncoded}`.replace(
      `${encoded}/${encoded}`,
      encoded
    );
    const submitRes = await fetch(
      `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(creds.siteUrl)}/sitemaps/${encodeURIComponent(sitemapUrl)}`,
      { method: "PUT", headers: { Authorization: `Bearer ${token}` } }
    );
    if (submitRes.status === 204 || submitRes.ok) {
      return NextResponse.json({ ok: true, action: "submit_sitemap", sitemapUrl });
    }
    return NextResponse.json({
      error: "sitemap_submit_failed",
      status: submitRes.status,
      details: await submitRes.text(),
    }, { status: 502 });
  }

  return NextResponse.json({ error: "unknown_action" }, { status: 400 });
}
