import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";
export const maxDuration = 300;

const SITE = "https://merrysails.com";

const URLS_TO_CHECK = [
  "/",
  "/cruises/bosphorus-sunset-cruise",
  "/istanbul-dinner-cruise",
  "/yacht-charter-istanbul",
];

const STRATEGIES = ["mobile", "desktop"] as const;

interface LighthouseMetrics {
  performanceScore: number | null;
  seoScore: number | null;
  accessibilityScore: number | null;
  bestPracticesScore: number | null;
  fcp: number | null;
  lcp: number | null;
  tbt: number | null;
  cls: number | null;
  si: number | null;
  tti: number | null;
}

function extractMetrics(data: Record<string, unknown>): LighthouseMetrics {
  const cats = (data.lighthouseResult as Record<string, unknown> | undefined)
    ?.categories as Record<string, { score: number | null }> | undefined;
  const audits = (data.lighthouseResult as Record<string, unknown> | undefined)
    ?.audits as Record<string, { numericValue?: number }> | undefined;

  const score = (key: string) =>
    cats?.[key]?.score != null ? Math.round(cats[key].score! * 100) : null;

  const ms = (key: string) => audits?.[key]?.numericValue ?? null;

  return {
    performanceScore: score("performance"),
    seoScore: score("seo"),
    accessibilityScore: score("accessibility"),
    bestPracticesScore: score("best-practices"),
    fcp: ms("first-contentful-paint"),
    lcp: ms("largest-contentful-paint-ms") ?? ms("largest-contentful-paint"),
    tbt: ms("total-blocking-time"),
    cls: ms("cumulative-layout-shift"),
    si: ms("speed-index"),
    tti: ms("interactive"),
  };
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.GOOGLE_PSI_API_KEY ?? "";
  const results: { url: string; strategy: string; saved: boolean; error?: string }[] = [];

  for (const path of URLS_TO_CHECK) {
    for (const strategy of STRATEGIES) {
      const fullUrl = `${SITE}${path}`;
      const apiUrl = new URL(
        "https://www.googleapis.com/pagespeedonline/v5/runPagespeed"
      );
      apiUrl.searchParams.set("url", fullUrl);
      apiUrl.searchParams.set("strategy", strategy);
      for (const cat of ["PERFORMANCE", "SEO", "ACCESSIBILITY", "BEST_PRACTICES"]) {
        apiUrl.searchParams.append("category", cat);
      }
      if (apiKey) apiUrl.searchParams.set("key", apiKey);

      try {
        const res = await fetch(apiUrl.toString(), {
          next: { revalidate: 0 },
        });
        if (!res.ok) {
          results.push({ url: fullUrl, strategy, saved: false, error: `PSI ${res.status}` });
          continue;
        }
        const data = await res.json() as Record<string, unknown>;
        const metrics = extractMetrics(data);

        await prisma.performanceSnapshot.create({
          data: {
            url: fullUrl,
            strategy,
            ...metrics,
          },
        });

        results.push({ url: fullUrl, strategy, saved: true });
      } catch (err) {
        results.push({
          url: fullUrl,
          strategy,
          saved: false,
          error: err instanceof Error ? err.message : "unknown",
        });
      }
    }
  }

  return NextResponse.json({ ok: true, results });
}
