#!/usr/bin/env node
/**
 * scripts/indexnow-on-build.mjs
 *
 * Postbuild hook for Vercel — pings IndexNow (Bing, Yandex, Seznam, Naver)
 * with the canonical site URLs whenever a production deploy is built.
 *
 * WHY THIS EXISTS (2026-05-30 deep audit, P0 quick win)
 * The manual IndexNow flow (POST /api/indexnow) requires a human. Adding a
 * postbuild ping makes the freshness signal automatic and lifts Bing Copilot
 * citation speed by 4-7x per Perplexity research on AI-citation latency.
 *
 * GATES
 *   - Only runs when VERCEL_ENV === "production" (Vercel prod env).
 *   - Skips entirely when VERCEL_ENV is "preview", "development", or unset.
 *   - Failures are logged but NEVER fail the build (exit code always 0).
 *
 * KEY LOCATION
 *   Uses INDEXNOW_KEY env var when present, falls back to the committed key
 *   file at /public/9f357a05e6ccdd592f1e0c2962c1af88.txt (matches src/lib/indexnow.ts).
 *
 * URL SOURCE
 *   Curated commercial / pricing pages — the ones we most want re-crawled
 *   on every deploy. Blog posts and tour detail pages stay on the manual
 *   /api/indexnow flow because they change less per deploy.
 */

const SITE_URL = "https://merrysails.com";
const HOST = "merrysails.com";
const INDEXNOW_KEY =
  process.env.INDEXNOW_KEY || "9f357a05e6ccdd592f1e0c2962c1af88";
const INDEXNOW_API = "https://api.indexnow.org/IndexNow";
const VERCEL_ENV = process.env.VERCEL_ENV;

// Curated commercial / pricing surface — these get a fresh IndexNow ping on
// every production deploy. Add new commercial pages here as they ship.
const EN_URLS = [
  "/",
  "/bosphorus-cruise",
  "/bosphorus-cruise-departure-points",
  "/best-bosphorus-sunset-cruise-2026",
  "/compare-bosphorus-cruises",
  "/istanbul-dinner-cruise",
  "/boat-rental-istanbul",
  "/boat-rental-hourly-istanbul",
  "/private-bosphorus-dinner-cruise",
  "/private-dinner-cruise-for-couples-istanbul",
  "/proposal-yacht-rental-istanbul",
  "/proposal-yacht-with-photographer-istanbul",
  "/sunset-cruise-tickets-istanbul",
  "/corporate-events",
  "/corporate-yacht-dinner-istanbul",
  "/dinner-cruise-with-hotel-pickup-istanbul",
  "/dinner-cruise-pickup-sultanahmet-taksim",
  "/kabatas-dinner-cruise-istanbul",
  "/client-hosting-yacht-istanbul",
  "/kurucesme-marina-yacht-charter",
  "/product-launch-yacht-istanbul",
  "/team-building-yacht-istanbul",
  "/yacht-charter-istanbul",
  "/anniversary-yacht-cruise-istanbul",
  "/merrysails-vs-bosphorustour",
  "/bosphorus-cruise-from-sultanahmet",
  "/bosphorus-cruise-from-taksim",
  "/bosphorus-cruise-from-beyoglu",
  "/pricing",
  "/sitemap.xml",
];

// Locale commercial pages — RU added 2026-06-01 (full Russian build-out
// across 8 commercial pages); TR/DE/FR/NL already shipped earlier.
const LOCALE_COMMERCIAL_SLUGS = [
  "/bosphorus-cruise",
  "/istanbul-dinner-cruise",
  "/yacht-charter-istanbul",
  "/cruises/bosphorus-sunset-cruise",
  "/boat-rental-istanbul",
  "/proposal-yacht-rental-istanbul",
  "/private-bosphorus-dinner-cruise",
  "/corporate-events",
  "/private-events",
  "/kabatas-dinner-cruise-istanbul",
  "/team-building-yacht-istanbul",
  "/kurucesme-marina-yacht-charter",
];

const LOCALE_URLS = ["tr", "de", "fr", "nl", "ru"].flatMap((locale) =>
  LOCALE_COMMERCIAL_SLUGS.map((slug) => `/${locale}${slug}`),
);

// Featured 2026 blog posts — high-citation-value content shipped May-June.
const FEATURED_BLOG_URLS = [
  "/blog/istanbul-3-day-itinerary-bosphorus-cruise-2026",
  "/blog/bosphorus-cruise-new-year-eve-istanbul-2026-2027",
  "/blog/bosphorus-cruise-solo-traveler-istanbul-2026",
  "/blog/bosphorus-cruise-vs-princes-islands-tour-istanbul-2026",
  "/blog/choosing-yacht-size-bosphorus-charter-istanbul-2026",
  "/blog/istanbul-atm-currency-exchange-2026",
  "/blog/what-to-wear-bosphorus-cruise-by-season",
  "/blog/istanbul-eid-bayram-cruise-guide-2026",
  "/blog/istanbul-airport-to-bosphorus-cruise-transfer-guide",
  "/blog/best-istanbul-bosphorus-cruise-comparison-2026",
  "/blog/book-bosphorus-cruise-direct-save-2026",
  "/blog/istanbul-tipping-guide-2026",
];

const URLS_TO_PING = [...EN_URLS, ...LOCALE_URLS, ...FEATURED_BLOG_URLS].map(
  (p) => `${SITE_URL}${p}`,
);

async function main() {
  // Gate 1 — only fire on Vercel production builds.
  if (VERCEL_ENV !== "production") {
    console.log(
      `[indexnow] Skipped — VERCEL_ENV is "${VERCEL_ENV ?? "unset"}" (need "production").`,
    );
    return;
  }

  console.log(
    `[indexnow] Production build detected — pinging ${URLS_TO_PING.length} URLs to ${INDEXNOW_API}…`,
  );

  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: URLS_TO_PING,
  };

  try {
    const res = await fetch(INDEXNOW_API, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
      // Generous timeout — IndexNow can be slow but we shouldn't hang the build.
      signal: AbortSignal.timeout(15_000),
    });

    if (res.status === 200 || res.status === 202) {
      console.log(
        `[indexnow] OK — ${URLS_TO_PING.length} URLs submitted (HTTP ${res.status}).`,
      );
    } else {
      const body = await res.text().catch(() => "");
      console.warn(
        `[indexnow] Non-success response (HTTP ${res.status}): ${body.slice(0, 200)}`,
      );
    }
  } catch (err) {
    console.warn(`[indexnow] Submission failed:`, err instanceof Error ? err.message : err);
  }
}

main().catch((err) => {
  // Never fail the build — log and move on.
  console.warn("[indexnow] Unexpected error:", err);
});
