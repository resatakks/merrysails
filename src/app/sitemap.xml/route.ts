import { getTourPath, tours, REDIRECTED_TOUR_SLUGS } from "@/data/tours";
import { getCharterFleet } from "@/data/fleet";
import { blogPosts } from "@/data/blog";
import { guides } from "@/data/guides";
import { commercialSupportPosts } from "@/content/blog";
import { cleanContentText } from "@/lib/content-text";
import { ACTIVE_LOCALES } from "@/i18n/config";
import { getAllLocalePostsForLocale } from "@/data/blog/locale-posts";
import {
  LOCALIZED_ROUTES as CORE_LOCALIZED_ROUTES,
  RU_ENABLED_ROUTES,
  ZH_ENABLED_ROUTES,
} from "@/i18n/localized-routes";

const SITE_URL = "https://merrysails.com";
// Deprecated/redirecting tour slugs — single source of truth in tours.ts.
const EXCLUDED_TOUR_SLUGS = REDIRECTED_TOUR_SLUGS;

// Blog slugs whose URL is 301-redirected (next.config.ts) — keep them out of
// the sitemap so audit tools don't flag "redirect in sitemap".
const EXCLUDED_BLOG_SLUGS = new Set<string>([
  "bosphorus-cruise-departure-points",
]);

// ── Sitemap FOCUS exclusion (2026-06-24) ─────────────────────────────────────
// GSC 90-day data: the deprioritized EVENT/OCCASION landing pages + their thin
// event blog posts earn ZERO impressions and ZERO clicks. We stop ADVERTISING
// them in sitemap.xml so Google focuses crawl/discovery on the earning pages.
//
// IMPORTANT — these pages STAY LIVE + INDEXABLE + INTERNALLY LINKED. They are
// only removed from the sitemap, not noindexed, deleted, or redirected. Ads
// still land on them; the yacht hub + footer still link them; organic discovery
// is sufficient for a ~450-page site (sitemap focus, NOT crawl budget — Google's
// crawl-budget threshold is 10k+ pages).
//
// hreflang-safe rule: every EVENT/OCCASION EN slug below is in LOCALIZED_ROUTES,
// so the WHOLE hreflang cluster (EN root + /tr /de /fr /nl + any /ru) leaves the
// sitemap together via deriveLocaleUrls(). On-page hreflang on the live pages
// stays self-consistent (every alternate still 200s), and no page REMAINING in
// the sitemap references these as an alternate.
//
// Each slug verified zero-impression against data/gsc/ 3m + 28d + 7d page CSVs
// (2026-06-24). NOT excluded: /blog/istanbul-corporate-yacht-events — it EARNS
// impressions (corporate yacht event* queries, pos 3-28) so it stays in sitemap.
const SITEMAP_EXCLUDE_EVENT_SLUGS = [
  "/client-hosting-yacht-istanbul",
  "/product-launch-yacht-istanbul",
  "/team-building-yacht-istanbul",
  "/corporate-yacht-dinner-istanbul",
  "/proposal-yacht-with-photographer-istanbul",
  "/proposal-yacht-rental-istanbul",
];
const SITEMAP_EXCLUDE_EVENT_BLOG_SLUGS = [
  "bachelorette-party-yacht-istanbul",
  "wedding-anniversary-yacht-cruise",
  "istanbul-corporate-yacht-event-booking",
  "corporate-yacht-event-planning-istanbul",
  "corporate-yacht-events-on-the-bosphorus",
  "istanbul-proposal-yacht-cruise",
  "marriage-proposal-yacht-istanbul",
  "proposal-yacht-rental-istanbul-planning-guide",
];

// ── Tier-2 sitemap FOCUS exclusion: zero-impression BLOG CLUSTERS (2026-06-24) ─
// GSC 90-day page-impression pull (both properties, dimensions=[page]) returns
// only pages with >0 impressions. The EN blog slugs below NEVER appear in that
// 90-day set in ANY form — neither the EN /blog/{slug} parent NOR any
// /{locale}/blog/{slug} sibling earns a single impression or click. We stop
// ADVERTISING them in sitemap.xml so Google focuses crawl/discovery on the
// blog posts that actually earn.
//
// Conservative gate: a slug is here ONLY if BOTH the EN parent AND every locale
// variant are zero-impression / zero-click over 90 days. Any blog whose EN
// parent OR a locale sibling earned even 1 impression was KEPT (e.g. the whole
// princes-islands / vs-ferry / what-to-wear / tipping-guide cluster stays in).
//
// hreflang-safe: all 34 are EN-ONLY posts (no per-language product-post sibling
// in turkish/german/french/dutch/russian-product-posts.ts → getAllLocalePostsForLocale
// emits no /{locale}/blog/{slug} for them), so removing the EN /blog/{slug} URL
// removes the WHOLE hreflang cluster. The exclude builder still derives every
// locale form defensively, so the rule holds even if a translation is added
// later. No page REMAINING in the sitemap references these as an alternate.
//
// IMPORTANT — these posts STAY LIVE + INDEXABLE + INTERNALLY LINKED (blog
// listing, related-posts, in-content links). They are ONLY removed from the
// sitemap — NOT noindexed, deleted, or redirected. RE-ADD a slug here the moment
// it earns an impression (revert by deleting the line).
const SITEMAP_EXCLUDE_BLOG_CLUSTER_SLUGS = [
  "avoid-tourist-traps-istanbul-cruises",
  "best-bosphorus-sunset-cruise-companies-istanbul",
  "best-istanbul-cruise-2026",
  "best-restaurants-near-bosphorus",
  "best-time-bosphorus-cruise",
  "best-yacht-routes-bosphorus",
  "book-bosphorus-cruise-istanbul",
  "bosphorus-cruise-reviews-guide",
  "bosphorus-dinner-cruise-booking",
  "bosphorus-night-cruise-guide",
  "corporate-events-yacht-istanbul",
  "grand-bazaar-shopping-guide",
  "how-to-avoid-seasickness-cruise",
  "istanbul-boat-party-private",
  "istanbul-boat-tour-price-2026",
  "istanbul-boat-tour-prices-comparison",
  "istanbul-boat-tour-vs-ferry",
  "istanbul-cruise-booking-tips",
  "istanbul-cruise-package-deals",
  "istanbul-museums-near-bosphorus",
  "istanbul-night-cruise-guide",
  "istanbul-nightlife-guide",
  "istanbul-seaside-neighborhoods",
  "istanbul-street-food-guide",
  "istanbul-transportation-guide-tourists",
  "kadikoy-asian-side-istanbul",
  "luxury-yacht-bosphorus-experience",
  "new-years-eve-bosphorus-cruise",
  "private-yacht-charter-istanbul-prices",
  "private-yacht-hire-istanbul-2026",
  "valentines-day-cruise-istanbul",
  "yacht-catering-menu-istanbul",
  "yacht-decoration-ideas-istanbul",
  "yacht-rental-istanbul-prices",
];

// Routes that have live locale pages — derived from the hoisted core set in
// src/i18n/localized-routes.ts (single source of truth shared with hreflang.ts
// and Header/Footer). The sitemap adds 6 yacht-charter sub-paths that don't
// appear in the core LOCALIZED_ROUTES because they're tour-detail variants
// owned by yacht-charter-istanbul.
const LOCALIZED_PATHS = [
  ...Array.from(CORE_LOCALIZED_ROUTES).filter((r) => r !== ""),
  "/yacht-charter-istanbul/boutique-yacht-12",
  "/yacht-charter-istanbul/premium-yacht-15",
  "/yacht-charter-istanbul/group-yacht-40-standard",
  "/yacht-charter-istanbul/group-yacht-40-signature",
  "/yacht-charter-istanbul/event-yacht-90",
  "/yacht-charter-istanbul/mega-event-yacht-150",
];

const LOCALIZED_SET = new Set(LOCALIZED_PATHS);
const NON_EN_LOCALES = ACTIVE_LOCALES.filter((l) => l !== "en");

// Route segment -> BCP-47 hreflang ATTRIBUTE code. Mirrors HREFLANG_CODE in
// src/lib/hreflang.ts. The URL path keeps the route segment (/zh/, /sa/), but
// the hreflang attribute must be a valid language code: "zh" → "zh-Hans"
// (Simplified), "sa" (a region) → "ar" (Arabic). Emitting raw hreflang="zh"/"sa"
// is what Semrush flagged as "language mismatch".
const HREFLANG_CODE: Record<string, string> = {
  sa: "ar",
  zh: "zh-Hans",
};
function hreflangCode(locale: string): string {
  return HREFLANG_CODE[locale] ?? locale;
}

// Staged ru rollout: only emit /ru sitemap URLs for paths that have a live
// /ru page. Derived from the hoisted RU_ENABLED_ROUTES (core set uses "" for
// homepage path-suffix convention; the sitemap doesn't iterate homepage here).
const RU_ENABLED_PATHS = new Set<string>(
  Array.from(RU_ENABLED_ROUTES).filter((r) => r !== ""),
);

// 2026-06-04: Chinese (Simplified) staged rollout. Sitemap uses "/" for
// homepage (sitemap URL convention) while the hoisted set uses "" (path-suffix
// convention) — translate the homepage entry here.
const ZH_ENABLED_PATHS = new Set<string>(
  Array.from(ZH_ENABLED_ROUTES).map((r) => (r === "" ? "/" : r)),
);

function toAbsoluteUrl(url: string): string {
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${SITE_URL}${url.startsWith("/") ? url : `/${url}`}`;
}

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// Build xhtml:link hreflang block for a given path
function hreflangXml(path: string): string {
  const lines: string[] = [
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(`${SITE_URL}${path}`)}"/>`,
    `    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(`${SITE_URL}${path}`)}"/>`,
  ];
  for (const locale of NON_EN_LOCALES) {
    // Stage ru: only emit hreflang for paths with a live /ru page.
    if (locale === "ru" && !RU_ENABLED_PATHS.has(path)) continue;
    if (locale === "zh" && !ZH_ENABLED_PATHS.has(path)) continue;
    lines.push(`    <xhtml:link rel="alternate" hreflang="${hreflangCode(locale)}" href="${escapeXml(`${SITE_URL}/${locale}${path}`)}"/>`);
  }
  return lines.join("\n");
}

// Symmetric en↔tr hreflang for the best-cruise-companies listicle, which is
// built in English (root) and Turkish (/tr) only — no de/fr/nl variants.
const bestCruiseListicleHreflang = [
  `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(`${SITE_URL}/best-bosphorus-cruise-istanbul-2026`)}"/>`,
  `    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(`${SITE_URL}/best-bosphorus-cruise-istanbul-2026`)}"/>`,
  `    <xhtml:link rel="alternate" hreflang="tr" href="${escapeXml(`${SITE_URL}/tr/best-bosphorus-cruise-istanbul-2026`)}"/>`,
].join("\n");

// Build hreflang block for a locale page
function hreflangLocaleXml(path: string, thisLocale: string): string {
  const lines: string[] = [
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(`${SITE_URL}${path}`)}"/>`,
    `    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(`${SITE_URL}${path}`)}"/>`,
  ];
  for (const locale of NON_EN_LOCALES) {
    if (locale === "ru" && !RU_ENABLED_PATHS.has(path)) continue;
    if (locale === "zh" && !ZH_ENABLED_PATHS.has(path)) continue;
    lines.push(`    <xhtml:link rel="alternate" hreflang="${hreflangCode(locale)}" href="${escapeXml(`${SITE_URL}/${locale}${path}`)}"/>`);
  }
  return lines.join("\n");
}

type SitemapPage = {
  url: string;
  changefreq: string;
  priority: string;
  lastmod: string;
  images?: Array<{ loc: string; title: string; caption?: string }>;
  hreflang?: string;
};

export function GET() {
  const allBlogPosts = [...blogPosts, ...commercialSupportPosts];
  const latestBlogDate = allBlogPosts.reduce((latest, post) => {
    const d = post.dateModified || post.date;
    return d > latest ? d : latest;
  }, "2026-01-01");
  const contentLastmod = formatDate(new Date(latestBlogDate));

  const staticPages: SitemapPage[] = [
    {
      url: SITE_URL,
      changefreq: "daily",
      priority: "1.0",
      lastmod: contentLastmod,
      images: [
        { loc: `${SITE_URL}/og-image.jpg`, title: "MerrySails - Bosphorus Cruise & Yacht Charter Istanbul" },
      ],
    },
    { url: `${SITE_URL}/bosphorus-cruise`, changefreq: "daily", priority: "0.98", lastmod: contentLastmod, hreflang: hreflangXml("/bosphorus-cruise") },
    { url: `${SITE_URL}/cruises`, changefreq: "weekly", priority: "0.55", lastmod: contentLastmod, hreflang: hreflangXml("/cruises") },
    { url: `${SITE_URL}/bosphorus-dinner-cruise-istanbul`, changefreq: "weekly", priority: "0.97", lastmod: contentLastmod, hreflang: hreflangXml("/bosphorus-dinner-cruise-istanbul") },
    { url: `${SITE_URL}/turkish-night-dinner-cruise-istanbul`, changefreq: "weekly", priority: "0.73", lastmod: contentLastmod, hreflang: hreflangXml("/turkish-night-dinner-cruise-istanbul") },
    { url: `${SITE_URL}/dinner-cruise-with-hotel-pickup-istanbul`, changefreq: "weekly", priority: "0.73", lastmod: contentLastmod, hreflang: hreflangXml("/dinner-cruise-with-hotel-pickup-istanbul") },
    { url: `${SITE_URL}/dinner-cruise-pickup-sultanahmet-taksim`, changefreq: "weekly", priority: "0.72", lastmod: contentLastmod, hreflang: hreflangXml("/dinner-cruise-pickup-sultanahmet-taksim") },
    { url: `${SITE_URL}/bosphorus-cruise-departure-points`, changefreq: "weekly", priority: "0.71", lastmod: contentLastmod, hreflang: hreflangXml("/bosphorus-cruise-departure-points") },
    { url: `${SITE_URL}/private-bosphorus-dinner-cruise`, changefreq: "weekly", priority: "0.78", lastmod: contentLastmod, hreflang: hreflangXml("/private-bosphorus-dinner-cruise") },
    // DMCA-recovery clean-slug commercial pages (2026-06-15) — fresh URLs for
    // the deindexed money-page concepts. Original copy, clean data-layer images.
    { url: `${SITE_URL}/private-sunset-cruise-bosphorus-istanbul`, changefreq: "weekly", priority: "0.8", lastmod: contentLastmod, hreflang: hreflangXml("/private-sunset-cruise-bosphorus-istanbul") },
    { url: `${SITE_URL}/bosphorus-evening-dinner-cruise`, changefreq: "weekly", priority: "0.8", lastmod: contentLastmod, hreflang: hreflangXml("/bosphorus-evening-dinner-cruise") },
    // DMCA cannibalization resolution (2026-06-16): four clean slugs removed from
    // sitemap because they now 301 -> their established indexed pillar (one
    // indexable URL per intent). Sitemap must never list a redirecting URL.
    // istanbul-yacht-charter-rental -> /yacht-charter-istanbul
    // istanbul-dinner-cruise-bosphorus -> /bosphorus-dinner-cruise-istanbul (chain-flattened 2026-07-09)
    // sunset-cruise-istanbul-tickets-booking -> /cruises/bosphorus-sunset-cruise (chain-flattened 2026-07-09)
    // private-bosphorus-dinner-yacht-charter -> /private-bosphorus-dinner-cruise
    // DMCA-named twin consolidation (2026-07-09): /sunset-cruise-tickets-istanbul
    // removed from sitemap — 46-day-zero-impression suppressed duplicate of the
    // healthy owner page, now 301s -> /cruises/bosphorus-sunset-cruise.
    // DMCA-named pillar relocation (2026-07-09): /istanbul-dinner-cruise (named
    // in Lumen notice #86820254, 46-day organic suppression despite indexed-PASS
    // status) removed from sitemap — content/price/schema unchanged, moved to
    // /bosphorus-dinner-cruise-istanbul (entry above), now 301s there.
    { url: `${SITE_URL}/private-dinner-cruise-for-couples-istanbul`, changefreq: "weekly", priority: "0.73", lastmod: contentLastmod, hreflang: hreflangXml("/private-dinner-cruise-for-couples-istanbul") },
    // 0-impression niche event pages (3-month GSC) — kept for Ads landing, but deprioritized organically per ROADMAP audit 2026-05-17
    { url: `${SITE_URL}/proposal-yacht-rental-istanbul`, changefreq: "monthly", priority: "0.45", lastmod: contentLastmod, hreflang: hreflangXml("/proposal-yacht-rental-istanbul") },
    { url: `${SITE_URL}/proposal-yacht-with-photographer-istanbul`, changefreq: "monthly", priority: "0.45", lastmod: contentLastmod, hreflang: hreflangXml("/proposal-yacht-with-photographer-istanbul") },
    // Anniversary niche page (2026-06-01) — separate SERP intent from proposal.
    { url: `${SITE_URL}/anniversary-yacht-cruise-istanbul`, changefreq: "monthly", priority: "0.68", lastmod: contentLastmod },
    // Honeymoon yacht page (2026-06-01) — distinct from anniversary + proposal.
    { url: `${SITE_URL}/honeymoon-yacht-cruise-istanbul`, changefreq: "monthly", priority: "0.74", lastmod: contentLastmod },
    // Operator comparison page (2026-06-01) — high commercial intent.
    { url: `${SITE_URL}/merrysails-vs-bosphorustour`, changefreq: "monthly", priority: "0.78", lastmod: contentLastmod },
    // Princes Islands pillar (2026-06-02) — informational + commercial bridge.
    { url: `${SITE_URL}/princes-islands-tour-istanbul`, changefreq: "monthly", priority: "0.78", lastmod: contentLastmod },
    { url: `${SITE_URL}/tr/prens-adalari-istanbul`, changefreq: "monthly", priority: "0.74", lastmod: contentLastmod },
    { url: `${SITE_URL}/de/prinzeninseln-istanbul`, changefreq: "monthly", priority: "0.72", lastmod: contentLastmod },
    { url: `${SITE_URL}/fr/iles-aux-princes-istanbul`, changefreq: "monthly", priority: "0.72", lastmod: contentLastmod },
    { url: `${SITE_URL}/nl/prinseneilanden-istanbul`, changefreq: "monthly", priority: "0.70", lastmod: contentLastmod },
    { url: `${SITE_URL}/ru/prinkipo-ostrova-istanbul`, changefreq: "monthly", priority: "0.70", lastmod: contentLastmod },
    // Hotel-cluster landing pages (2026-06-01) — Tier-2 high-intent SERP capture.
    { url: `${SITE_URL}/bosphorus-cruise-from-sultanahmet`, changefreq: "monthly", priority: "0.72", lastmod: contentLastmod },
    { url: `${SITE_URL}/bosphorus-cruise-from-taksim`, changefreq: "monthly", priority: "0.72", lastmod: contentLastmod },
    { url: `${SITE_URL}/bosphorus-cruise-from-beyoglu`, changefreq: "monthly", priority: "0.72", lastmod: contentLastmod },
    // TR/DE/FR hotel-cluster variants (2026-06-02) — NL/RU deferred.
    { url: `${SITE_URL}/tr/bosphorus-cruise-from-sultanahmet`, changefreq: "monthly", priority: "0.74", lastmod: contentLastmod },
    { url: `${SITE_URL}/tr/bosphorus-cruise-from-taksim`, changefreq: "monthly", priority: "0.74", lastmod: contentLastmod },
    { url: `${SITE_URL}/tr/bosphorus-cruise-from-beyoglu`, changefreq: "monthly", priority: "0.74", lastmod: contentLastmod },
    { url: `${SITE_URL}/de/bosphorus-cruise-from-sultanahmet`, changefreq: "monthly", priority: "0.72", lastmod: contentLastmod },
    { url: `${SITE_URL}/de/bosphorus-cruise-from-taksim`, changefreq: "monthly", priority: "0.72", lastmod: contentLastmod },
    { url: `${SITE_URL}/de/bosphorus-cruise-from-beyoglu`, changefreq: "monthly", priority: "0.72", lastmod: contentLastmod },
    { url: `${SITE_URL}/fr/bosphorus-cruise-from-sultanahmet`, changefreq: "monthly", priority: "0.72", lastmod: contentLastmod },
    { url: `${SITE_URL}/fr/bosphorus-cruise-from-taksim`, changefreq: "monthly", priority: "0.72", lastmod: contentLastmod },
    { url: `${SITE_URL}/fr/bosphorus-cruise-from-beyoglu`, changefreq: "monthly", priority: "0.72", lastmod: contentLastmod },
    { url: `${SITE_URL}/nl/bosphorus-cruise-from-sultanahmet`, changefreq: "monthly", priority: "0.70", lastmod: contentLastmod },
    { url: `${SITE_URL}/nl/bosphorus-cruise-from-taksim`, changefreq: "monthly", priority: "0.70", lastmod: contentLastmod },
    { url: `${SITE_URL}/nl/bosphorus-cruise-from-beyoglu`, changefreq: "monthly", priority: "0.70", lastmod: contentLastmod },
    { url: `${SITE_URL}/ru/bosphorus-cruise-from-sultanahmet`, changefreq: "monthly", priority: "0.70", lastmod: contentLastmod },
    { url: `${SITE_URL}/ru/bosphorus-cruise-from-taksim`, changefreq: "monthly", priority: "0.70", lastmod: contentLastmod },
    { url: `${SITE_URL}/ru/bosphorus-cruise-from-beyoglu`, changefreq: "monthly", priority: "0.70", lastmod: contentLastmod },
    // Audience-segment landing pages (2026-06-01)
    { url: `${SITE_URL}/merrysails-vs-viator`, changefreq: "monthly", priority: "0.78", lastmod: contentLastmod },
    { url: `${SITE_URL}/bosphorus-cruise-for-couples`, changefreq: "monthly", priority: "0.74", lastmod: contentLastmod },
    { url: `${SITE_URL}/bosphorus-cruise-for-families`, changefreq: "monthly", priority: "0.74", lastmod: contentLastmod },
    { url: `${SITE_URL}/yacht-charter-istanbul`, changefreq: "weekly", priority: "0.96", lastmod: contentLastmod, hreflang: hreflangXml("/yacht-charter-istanbul") },
    { url: `${SITE_URL}/kurucesme-marina-yacht-charter`, changefreq: "weekly", priority: "0.72", lastmod: contentLastmod, hreflang: hreflangXml("/kurucesme-marina-yacht-charter") },
    { url: `${SITE_URL}/boat-rental-istanbul`, changefreq: "weekly", priority: "0.72", lastmod: contentLastmod, hreflang: hreflangXml("/boat-rental-istanbul") },
    { url: `${SITE_URL}/boat-rental-hourly-istanbul`, changefreq: "weekly", priority: "0.71", lastmod: contentLastmod, hreflang: hreflangXml("/boat-rental-hourly-istanbul") },
    { url: `${SITE_URL}/private-tours`, changefreq: "weekly", priority: "0.68", lastmod: contentLastmod, hreflang: hreflangXml("/private-tours") },
    { url: `${SITE_URL}/corporate-events`, changefreq: "weekly", priority: "0.74", lastmod: contentLastmod, hreflang: hreflangXml("/corporate-events") },
    { url: `${SITE_URL}/corporate-yacht-dinner-istanbul`, changefreq: "weekly", priority: "0.72", lastmod: contentLastmod, hreflang: hreflangXml("/corporate-yacht-dinner-istanbul") },
    { url: `${SITE_URL}/team-building-yacht-istanbul`, changefreq: "weekly", priority: "0.72", lastmod: contentLastmod, hreflang: hreflangXml("/team-building-yacht-istanbul") },
    { url: `${SITE_URL}/client-hosting-yacht-istanbul`, changefreq: "weekly", priority: "0.72", lastmod: contentLastmod, hreflang: hreflangXml("/client-hosting-yacht-istanbul") },
    { url: `${SITE_URL}/product-launch-yacht-istanbul`, changefreq: "weekly", priority: "0.72", lastmod: contentLastmod, hreflang: hreflangXml("/product-launch-yacht-istanbul") },
    { url: `${SITE_URL}/kabatas-dinner-cruise-istanbul`, changefreq: "weekly", priority: "0.72", lastmod: contentLastmod, hreflang: hreflangXml("/kabatas-dinner-cruise-istanbul") },
    // TR-only cluster page targeting "kabataş boğaz turu" 210 vol/mo (KD=38)
    { url: `${SITE_URL}/tr/kabatas-bogaz-turu`, changefreq: "weekly", priority: "0.73", lastmod: contentLastmod },
    { url: `${SITE_URL}/private-events`, changefreq: "weekly", priority: "0.72", lastmod: contentLastmod, hreflang: hreflangXml("/private-events") },
    { url: `${SITE_URL}/blog`, changefreq: "daily", priority: "0.8", lastmod: contentLastmod, hreflang: hreflangXml("/blog") },
    { url: `${SITE_URL}/guides`, changefreq: "weekly", priority: "0.7", lastmod: contentLastmod, hreflang: hreflangXml("/guides") },
    { url: `${SITE_URL}/compare-bosphorus-cruises`, changefreq: "monthly", priority: "0.85", lastmod: contentLastmod },
    { url: `${SITE_URL}/galataport-shore-excursion`, changefreq: "monthly", priority: "0.82", lastmod: contentLastmod },
    { url: `${SITE_URL}/best-bosphorus-sunset-cruise-2026`, changefreq: "monthly", priority: "0.82", lastmod: contentLastmod },
    // Best-cruise-companies listicle exists in EN (root) + TR only — emit a
    // symmetric en↔tr hreflang cluster inline (NOT hreflangXml, which would add
    // de/fr/nl alternates pointing at non-existent pages = asymmetric harm).
    { url: `${SITE_URL}/best-bosphorus-cruise-istanbul-2026`, changefreq: "monthly", priority: "0.88", lastmod: contentLastmod, hreflang: bestCruiseListicleHreflang },
    { url: `${SITE_URL}/tr/best-bosphorus-cruise-istanbul-2026`, changefreq: "monthly", priority: "0.85", lastmod: contentLastmod, hreflang: bestCruiseListicleHreflang },
    { url: `${SITE_URL}/istanbul-cruise-faq`, changefreq: "monthly", priority: "0.80", lastmod: contentLastmod },
    // Price-index link-magnet page (2026-06-26) — EN-root only, no hreflang
    // (slug intentionally not in LOCALIZED_ROUTES; do NOT localize per strict rule).
    { url: `${SITE_URL}/bosphorus-cruise-prices-istanbul-2026`, changefreq: "monthly", priority: "0.8", lastmod: contentLastmod },
    { url: `${SITE_URL}/about`, changefreq: "monthly", priority: "0.6", lastmod: contentLastmod, hreflang: hreflangXml("/about") },
    { url: `${SITE_URL}/contact`, changefreq: "monthly", priority: "0.6", lastmod: contentLastmod, hreflang: hreflangXml("/contact") },
    { url: `${SITE_URL}/faq`, changefreq: "monthly", priority: "0.5", lastmod: contentLastmod, hreflang: hreflangXml("/faq") },
    { url: `${SITE_URL}/tursab`, changefreq: "monthly", priority: "0.45", lastmod: contentLastmod },
    { url: `${SITE_URL}/ai-knowledge`, changefreq: "monthly", priority: "0.5", lastmod: "2026-05-09" },
    { url: `${SITE_URL}/about/team`, changefreq: "monthly", priority: "0.55", lastmod: "2026-05-09" },
    { url: `${SITE_URL}/privacy-policy`, changefreq: "yearly", priority: "0.3", lastmod: "2025-12-01" },
    { url: `${SITE_URL}/terms`, changefreq: "yearly", priority: "0.3", lastmod: "2025-12-01" },
  ];

  // Locale homepages (/tr, /de, /fr, /nl)
  const localeHomepages: SitemapPage[] = NON_EN_LOCALES.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    changefreq: "daily",
    priority: "0.90",
    lastmod: contentLastmod,
    hreflang: [
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(SITE_URL)}"/>`,
      `    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(SITE_URL)}"/>`,
      ...NON_EN_LOCALES.map((l) => `    <xhtml:link rel="alternate" hreflang="${hreflangCode(l)}" href="${escapeXml(`${SITE_URL}/${l}`)}"/>`),
    ].join("\n"),
  }));

  // All locale pages (30 routes × 4 locales).
  // Pillar pages get highest priority — bosphorus-cruise hub (0.97) is the
  // top organic target ("boğaz turu" 6,600/mo TR). Dinner, sunset, yacht
  // (0.95) are the 3 product pillars with €30/€34/€220 starting prices.
  const PILLAR_PATHS = new Set([
    "/bosphorus-cruise",
    "/istanbul-dinner-cruise",
    "/cruises/bosphorus-sunset-cruise",
    "/yacht-charter-istanbul",
  ]);
  const localePages: SitemapPage[] = NON_EN_LOCALES.flatMap((locale) =>
    LOCALIZED_PATHS
      // Stage ru: only emit /ru sitemap entries for paths with live ru content.
      .filter((path) => locale !== "ru" || RU_ENABLED_PATHS.has(path))
      // Stage zh: only emit /zh sitemap entries for paths with live zh content.
      .filter((path) => locale !== "zh" || ZH_ENABLED_PATHS.has(path))
      .map((path) => ({
        url: `${SITE_URL}/${locale}${path}`,
        changefreq: PILLAR_PATHS.has(path) ? "weekly" : "monthly",
        priority:
          path === "/bosphorus-cruise"
            ? "0.97"
            : PILLAR_PATHS.has(path)
              ? "0.95"
              : "0.70",
        lastmod: contentLastmod,
        hreflang: hreflangLocaleXml(path, locale),
      }))
  );

  const tourPages: SitemapPage[] = tours
    .filter((tour) => !EXCLUDED_TOUR_SLUGS.has(tour.slug))
    .map((tour) => {
    const images: SitemapPage["images"] = [];
    if (tour.image) {
      images.push({
        loc: toAbsoluteUrl(tour.image),
        title: `${tour.nameEn} - ${tour.name}`,
        caption: tour.description.slice(0, 200),
      });
    }
    if (tour.gallery) {
      for (const img of tour.gallery) {
        if (img !== tour.image) {
          images.push({ loc: toAbsoluteUrl(img), title: `${tour.nameEn} gallery photo` });
        }
      }
    }
    const path = getTourPath(tour);
    return {
      url: `${SITE_URL}${path}`,
      changefreq: "weekly",
      priority: tour.isCoreProduct ? "0.95" : tour.showPricing ? "0.76" : "0.68",
      lastmod: contentLastmod,
      images: images.length > 0 ? images : undefined,
      hreflang: LOCALIZED_SET.has(path) ? hreflangXml(path) : undefined,
    };
  });

  // EN fleet pages — /yacht-charter-istanbul/<fleet>. The /[locale]/ variants
  // are emitted by localePages via LOCALIZED_PATHS, but the EN canonical URLs
  // were previously missing from the sitemap (Bing flagged "new pages missing
  // from sitemaps" 2026-05-31). Generated from the same single source of truth
  // as the fleet-detail page's generateStaticParams.
  const fleetPages: SitemapPage[] = getCharterFleet().map((boat) => {
    const path = `/yacht-charter-istanbul/${boat.slug}`;
    return {
      url: `${SITE_URL}${path}`,
      changefreq: "weekly",
      priority: "0.78",
      lastmod: contentLastmod,
      hreflang: LOCALIZED_SET.has(path) ? hreflangXml(path) : undefined,
    };
  });

  const seenBlogSlugs = new Set<string>();
  const blogPages: SitemapPage[] = allBlogPosts
    .filter((post) => {
      if (EXCLUDED_BLOG_SLUGS.has(post.slug)) return false;
      // Drop noIndex posts from sitemap so Google doesn't try to crawl them again.
      if ((post as { noIndex?: boolean }).noIndex) return false;
      if (seenBlogSlugs.has(post.slug)) return false;
      seenBlogSlugs.add(post.slug);
      return true;
    })
    .map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      changefreq: "monthly",
      priority: "0.7",
      lastmod: formatDate(new Date(post.dateModified || post.date)),
      images: post.image
        ? [
            {
              loc: toAbsoluteUrl(post.image),
              title: cleanContentText(post.title),
              caption: cleanContentText((post.imageAlt || post.excerpt || "").slice(0, 200)),
            },
          ]
        : undefined,
    }));

  const guidePages: SitemapPage[] = guides.map((guide) => ({
    url: `${SITE_URL}/guides/${guide.slug}`,
    changefreq: "monthly",
    priority: "0.7",
    lastmod: contentLastmod,
    images: guide.image
      ? [{ loc: toAbsoluteUrl(guide.image), title: cleanContentText(guide.title) }]
      : undefined,
  }));

  // Locale blog posts — /tr/blog/slug, /de/blog/slug, etc.
  const NON_EN_BLOG_LOCALES = ACTIVE_LOCALES.filter((l) => l !== "en");
  const localeBlogPages: SitemapPage[] = NON_EN_BLOG_LOCALES.flatMap((locale) =>
    getAllLocalePostsForLocale(locale).map((post) => ({
      url: `${SITE_URL}/${locale}/blog/${post.slug}`,
      changefreq: "monthly" as const,
      priority: "0.7",
      lastmod: formatDate(new Date(post.dateModified ?? post.date)),
      images: post.image
        ? [{ loc: toAbsoluteUrl(post.image), title: cleanContentText(post.title) }]
        : undefined,
    }))
  );

  // Build the absolute-URL exclusion set for the FOCUS-pruned event/occasion
  // cluster. For each EN slug we derive the EN root URL plus every locale-prefixed
  // form (excluding a URL that was never emitted is a harmless no-op), so the
  // whole hreflang cluster leaves the sitemap together regardless of which source
  // array produced it. Event blog posts are EN-only here.
  const SITEMAP_EXCLUDE_URLS = new Set<string>();
  for (const slug of SITEMAP_EXCLUDE_EVENT_SLUGS) {
    SITEMAP_EXCLUDE_URLS.add(`${SITE_URL}${slug}`);
    for (const locale of NON_EN_LOCALES) {
      SITEMAP_EXCLUDE_URLS.add(`${SITE_URL}/${locale}${slug}`);
    }
  }
  for (const slug of SITEMAP_EXCLUDE_EVENT_BLOG_SLUGS) {
    SITEMAP_EXCLUDE_URLS.add(`${SITE_URL}/blog/${slug}`);
  }
  // Tier-2 zero-impression blog clusters: derive the EN parent URL plus every
  // locale-prefixed /{locale}/blog/{slug} form so the WHOLE hreflang cluster
  // leaves the sitemap together. These are EN-only today (no locale sibling is
  // emitted), so the locale forms are harmless no-ops — but deriving them keeps
  // the whole-cluster rule intact if a translation is ever added.
  for (const slug of SITEMAP_EXCLUDE_BLOG_CLUSTER_SLUGS) {
    SITEMAP_EXCLUDE_URLS.add(`${SITE_URL}/blog/${slug}`);
    for (const locale of NON_EN_LOCALES) {
      SITEMAP_EXCLUDE_URLS.add(`${SITE_URL}/${locale}/blog/${slug}`);
    }
  }

  const allPages = [
    ...staticPages,
    ...localeHomepages,
    ...localePages,
    ...tourPages,
    ...fleetPages,
    ...blogPages,
    ...guidePages,
    ...localeBlogPages,
  ]
    // FOCUS exclusion: drop the zero-impression event/occasion cluster from the
    // sitemap (pages stay live + indexable + internally linked — see top of file).
    .filter((page) => !SITEMAP_EXCLUDE_URLS.has(page.url))
    .filter(
      (page, index, pages) => pages.findIndex((candidate) => candidate.url === page.url) === index
    );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${allPages
  .map(
    (page) => `  <url>
    <loc>${escapeXml(page.url)}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>${
      page.hreflang ? `\n${page.hreflang}` : ""
    }${
      page.images
        ? page.images
            .map(
              (img) => `
    <image:image>
      <image:loc>${escapeXml(img.loc)}</image:loc>
      <image:title>${escapeXml(img.title)}</image:title>${
                img.caption
                  ? `
      <image:caption>${escapeXml(img.caption)}</image:caption>`
                  : ""
              }
    </image:image>`
            )
            .join("")
        : ""
    }
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
