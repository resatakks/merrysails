/**
 * GET /api/seo/rankings
 * Weekly cron: check top-20 commercial keywords for merrysails.com,
 * save results to SeoRanking table.
 *
 * Auth: Bearer CRON_SECRET header or ?token= query param
 * Schedule: every Monday 07:30 UTC (vercel.json)
 */
import { NextRequest, NextResponse } from "next/server";
import { checkRankings } from "@/lib/dataforseo";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60; // DataForSEO SERP live calls can take 10-20s each

function isAuthorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return process.env.NODE_ENV !== "production";
  const auth = req.headers.get("authorization");
  if (auth === `Bearer ${secret}`) return true;
  return req.nextUrl.searchParams.get("token") === secret;
}

const DOMAIN = "merrysails.com";

// ─── 20 Commercial Keywords ─────────────────────────────────
// TR: location 2792 (Turkey), language "tr"
const TR_KEYWORDS = [
  "kiralık yat istanbul",
  "istanbul yat turu",
  "yat turu istanbul",
  "özel tekne kiralama istanbul",
  "istanbul tekne turu",
  "boğaz yat turu",
  "özel yat turu istanbul",
  "gece yat turu istanbul",
  "istanbul boğaz turu tekne",
  "yat kiralama istanbul",
];

// EN: location 2792 (Turkey), language "en"
const EN_KEYWORDS = [
  "yacht charter istanbul",
  "istanbul yacht tour",
  "private yacht istanbul",
  "bosphorus yacht tour",
  "boat tour istanbul",
  "sunset cruise istanbul",
  "luxury yacht charter istanbul",
  "private boat tour istanbul",
  "bosphorus private cruise",
  "yacht rental istanbul",
];

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const started = Date.now();
  const errors: string[] = [];
  let saved = 0;

  // ── TR batch ───────────────────────────────────────────────
  let trResults: Awaited<ReturnType<typeof checkRankings>> = [];
  try {
    trResults = await checkRankings(DOMAIN, TR_KEYWORDS, 2792, "tr");
  } catch (err) {
    errors.push(`TR SERP: ${String(err)}`);
  }

  // ── EN batch ───────────────────────────────────────────────
  let enResults: Awaited<ReturnType<typeof checkRankings>> = [];
  try {
    enResults = await checkRankings(DOMAIN, EN_KEYWORDS, 2792, "en");
  } catch (err) {
    errors.push(`EN SERP: ${String(err)}`);
  }

  // ── Save to DB ─────────────────────────────────────────────
  const allResults = [...trResults, ...enResults];
  if (allResults.length > 0) {
    try {
      const rows = allResults.map((r) => ({
        domain: DOMAIN,
        keyword: r.keyword,
        locationCode: r.locationCode,
        languageCode: r.languageCode,
        rank: r.rank ?? null,
        url: r.url ?? null,
        title: r.title ?? null,
        snippet: r.snippet ?? null,
        totalResults: r.totalResults,
        checkedAt: new Date(r.checkedAt),
      }));
      await prisma.seoRanking.createMany({ data: rows });
      saved = rows.length;
    } catch (err) {
      errors.push(`DB write: ${String(err)}`);
    }
  }

  // ── Summary ────────────────────────────────────────────────
  const ranked = allResults.filter((r) => r.rank !== null);
  const summary = ranked.map((r) => ({
    keyword: r.keyword,
    lang: r.languageCode,
    rank: r.rank,
    url: r.url,
  }));

  return NextResponse.json({
    ok: errors.length === 0,
    domain: DOMAIN,
    checkedAt: new Date().toISOString(),
    durationMs: Date.now() - started,
    total: allResults.length,
    saved,
    ranked: ranked.length,
    notInTop100: allResults.length - ranked.length,
    rankings: summary,
    errors: errors.length ? errors : undefined,
  });
}
