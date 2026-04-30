/**
 * GET /api/seo/rankings
 * Weekly cron (+ manual): full SEO snapshot for merrysails.com
 *   1. SERP  — 20 keywords (10 TR + 10 EN) → SeoRanking
 *   2. Backlinks — domain summary        → SeoBacklink
 *   3. LLM Mentions — 5 brand queries    → SeoLlmMention
 *
 * Auth: Bearer CRON_SECRET or ?token=
 * Schedule: every Monday 07:30 UTC (vercel.json)
 *
 * Cost per run (est.):
 *   SERP  20 kw  ≈ $0.12
 *   BL    1 dom  ≈ $0.005
 *   LLM   5 q   ≈ $0.15
 *   Total       ≈ $0.28 / week
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

// ─── SERP Keywords ───────────────────────────────────────────
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

// ─── LLM Brand Queries ───────────────────────────────────────
// Queries real users ask AI assistants when planning istanbul trips
const LLM_QUERIES = [
  "best yacht charter company in Istanbul",
  "where to rent a private yacht in Istanbul",
  "Istanbul bosphorus private boat tour recommendations",
  "luxury boat experience Istanbul recommendation",
  "private cruise Istanbul bosphorus which company",
];

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const started = Date.now();
  const errors: string[] = [];

  // ── 1. SERP ──────────────────────────────────────────────────
  let trResults: Awaited<ReturnType<typeof checkRankings>> = [];
  let enResults: Awaited<ReturnType<typeof checkRankings>> = [];

  try {
    trResults = await checkRankings(DOMAIN, TR_KEYWORDS, 2792, "tr");
  } catch (err) { errors.push(`SERP TR: ${String(err)}`); }

  try {
    enResults = await checkRankings(DOMAIN, EN_KEYWORDS, 2792, "en");
  } catch (err) { errors.push(`SERP EN: ${String(err)}`); }

  const allSerp = [...trResults, ...enResults];
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
