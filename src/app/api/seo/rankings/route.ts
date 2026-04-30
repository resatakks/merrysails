/**
 * GET /api/seo/rankings
 * DAILY cron (+ manual): full SEO snapshot for merrysails.com
 *   1. SERP  — 21 backlink-priority keywords (EN+DE+TR+FR+NL) → SeoRanking
 *   2. Backlinks — domain summary                            → SeoBacklink
 *   3. LLM Mentions — 6 brand queries                        → SeoLlmMention
 *
 * Auth: Bearer CRON_SECRET or ?token=
 * Schedule: daily 07:00 UTC (vercel.json)
 *
 * Keywords aligned with 6 backlink target URLs — see data/BACKLINK-URLS.md
 *   and data/BACKLINK-PRIORITY-KEYWORDS.md.
 *
 * Cost per run (est.):
 *   SERP  21 kw  ≈ $0.13
 *   BL    1 dom  ≈ $0.005
 *   LLM   6 q   ≈ $0.06 (regular SERP fallback)
 *   Total       ≈ $0.20 / day  →  ~ $6 / month
 */
import { NextRequest, NextResponse } from "next/server";
import { checkRankings, getBacklinkSummary, checkLlmMentions } from "@/lib/dataforseo";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

function isAuthorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return process.env.NODE_ENV !== "production";
  const auth = req.headers.get("authorization");
  if (auth === `Bearer ${secret}`) return true;
  return req.nextUrl.searchParams.get("token") === secret;
}

const DOMAIN = "merrysails.com";
const BRAND  = "merrysails";

// ─── SERP Keywords (backlink-priority) ───────────────────────
// Aligned with the 6 backlink target URLs in data/BACKLINK-URLS.md.
// Grouped by (location_code, language_code) so DataForSEO is called once per group.

// EN — TR-tourist (loc 2792)
const EN_KEYWORDS = [
  "bosphorus cruise istanbul",
  "bosphorus dinner cruise",
  "istanbul dinner cruise",
  "sunset cruise istanbul",
  "bosphorus sunset cruise",
  "yacht charter istanbul",
  "boat tour istanbul",
  "private bosphorus cruise",
  "bosphorus boat tour",
];

// TR — Turkey (loc 2792)
const TR_KEYWORDS = [
  "istanbul yat turu",
  "boğaz yat turu",
  "yemekli boğaz turu",
  "istanbul dinner cruise",
];

// DE — Germany (loc 2276)
const DE_KEYWORDS = [
  "bosporus kreuzfahrt istanbul",
  "bosporus sonnenuntergangsfahrt istanbul",
  "istanbul dinner kreuzfahrt",
  "yacht charter istanbul",
  "romantische bootsfahrt istanbul",
];

// FR — France (loc 2250)
const FR_KEYWORDS = [
  "croisière bosphore istanbul",
  "dîner croisière bosphore",
];

// NL — Netherlands (loc 2528)
const NL_KEYWORDS = [
  "bosporus boottocht istanbul",
];

// ─── LLM Brand Queries ───────────────────────────────────────
// Queries real users ask AI assistants when planning istanbul trips
const LLM_QUERIES = [
  "best yacht charter company in Istanbul",
  "where to rent a private yacht in Istanbul",
  "Istanbul bosphorus private boat tour recommendations",
  "luxury boat experience Istanbul recommendation",
  "private cruise Istanbul bosphorus which company",
  "best istanbul dinner cruise",
];

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const started = Date.now();
  const errors: string[] = [];

  // ── 1. SERP — 5 grouped calls ────────────────────────────────
  let enResults: Awaited<ReturnType<typeof checkRankings>> = [];
  let trResults: Awaited<ReturnType<typeof checkRankings>> = [];
  let deResults: Awaited<ReturnType<typeof checkRankings>> = [];
  let frResults: Awaited<ReturnType<typeof checkRankings>> = [];
  let nlResults: Awaited<ReturnType<typeof checkRankings>> = [];

  try {
    enResults = await checkRankings(DOMAIN, EN_KEYWORDS, 2792, "en");
  } catch (err) { errors.push(`SERP EN: ${String(err)}`); }

  try {
    trResults = await checkRankings(DOMAIN, TR_KEYWORDS, 2792, "tr");
  } catch (err) { errors.push(`SERP TR: ${String(err)}`); }

  try {
    deResults = await checkRankings(DOMAIN, DE_KEYWORDS, 2276, "de");
  } catch (err) { errors.push(`SERP DE: ${String(err)}`); }

  try {
    frResults = await checkRankings(DOMAIN, FR_KEYWORDS, 2250, "fr");
  } catch (err) { errors.push(`SERP FR: ${String(err)}`); }

  try {
    nlResults = await checkRankings(DOMAIN, NL_KEYWORDS, 2528, "nl");
  } catch (err) { errors.push(`SERP NL: ${String(err)}`); }

  const allSerp = [...enResults, ...trResults, ...deResults, ...frResults, ...nlResults];
  let serpSaved = 0;
  if (allSerp.length > 0) {
    try {
      await prisma.seoRanking.createMany({
        data: allSerp.map((r) => ({
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
        })),
      });
      serpSaved = allSerp.length;
    } catch (err) { errors.push(`DB SERP: ${String(err)}`); }
  }

  // ── 2. Backlinks ─────────────────────────────────────────────
  let blData: Awaited<ReturnType<typeof getBacklinkSummary>> | null = null;
  try {
    blData = await getBacklinkSummary(DOMAIN);
    await prisma.seoBacklink.create({
      data: {
        domain: blData.domain,
        totalBacklinks: blData.totalBacklinks,
        referringDomains: blData.referringDomains,
        domainRank: blData.domainRank,
        checkedAt: new Date(blData.checkedAt),
      },
    });
  } catch (err) { errors.push(`Backlinks: ${String(err)}`); }

  // ── 3. LLM Mentions ──────────────────────────────────────────
  let llmResults: Awaited<ReturnType<typeof checkLlmMentions>> = [];
  try {
    llmResults = await checkLlmMentions(BRAND, LLM_QUERIES);
    await prisma.seoLlmMention.createMany({
      data: llmResults.map((r) => ({
        domain: DOMAIN,
        query: r.query,
        model: r.model,
        mentioned: r.mentioned,
        rank: r.rank ?? null,
        snippet: r.snippet ?? null,
        checkedAt: new Date(r.checkedAt),
      })),
    });
  } catch (err) { errors.push(`LLM: ${String(err)}`); }

  // ── Summary ───────────────────────────────────────────────────
  const ranked = allSerp.filter((r) => r.rank !== null);
  const llmMentioned = llmResults.filter((r) => r.mentioned);

  return NextResponse.json({
    ok: errors.length === 0,
    domain: DOMAIN,
    checkedAt: new Date().toISOString(),
    durationMs: Date.now() - started,
    serp: {
      total: allSerp.length,
      saved: serpSaved,
      ranked: ranked.length,
      notInTop100: allSerp.length - ranked.length,
      rankings: ranked.map((r) => ({
        keyword: r.keyword,
        lang: r.languageCode,
        rank: r.rank,
        url: r.url,
      })),
    },
    backlinks: blData
      ? {
          totalBacklinks: blData.totalBacklinks,
          referringDomains: blData.referringDomains,
          domainRank: blData.domainRank,
        }
      : null,
    llm: {
      total: llmResults.length,
      mentioned: llmMentioned.length,
      mentionRate: llmResults.length
        ? `${Math.round((llmMentioned.length / llmResults.length) * 100)}%`
        : "0%",
      mentions: llmMentioned.map((r) => ({
        query: r.query,
        rank: r.rank,
        snippet: r.snippet,
      })),
    },
    errors: errors.length ? errors : undefined,
  });
}
