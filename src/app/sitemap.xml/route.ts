import { getTourPath, tours, REDIRECTED_TOUR_SLUGS } from "@/data/tours";
import { getCharterFleet } from "@/data/fleet";
import { blogPosts } from "@/data/blog";
import { guides } from "@/data/guides";
import { commercialSupportPosts } from "@/content/blog";
import { cleanContentText } from "@/lib/content-text";
import { ACTIVE_LOCALES } from "@/i18n/config";
import { getAllLocalePostsForLocale } from "@/data/blog/locale-posts";

const SITE_URL = "https://merrysails.com";
// Deprecated/redirecting tour slugs — single source of truth in tours.ts.
const EXCLUDED_TOUR_SLUGS = REDIRECTED_TOUR_SLUGS;

// Blog slugs whose URL is 301-redirected (next.config.ts) — keep them out of
// the sitemap so audit tools don't flag "redirect in sitemap".
const EXCLUDED_BLOG_SLUGS = new Set<string>([
  "bosphorus-cruise-departure-points",
]);

// Routes that have live locale pages — must match src/app/[locale]/ folders exactly
const LOCALIZED_PATHS = [
  "/bosphorus-cruise",
  "/istanbul-dinner-cruise",
  "/cruises/bosphorus-sunset-cruise",
  "/yacht-charter-istanbul",
  "/honeymoon-yacht-cruise-istanbul",
  "/anniversary-yacht-cruise-istanbul",
  "/bosphorus-cruise-for-couples",
  "/bosphorus-cruise-for-families",
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
  "/yacht-charter-istanbul/boutique-yacht-12",
  "/yacht-charter-istanbul/premium-yacht-15",
  "/yacht-charter-istanbul/group-yacht-40-standard",
  "/yacht-charter-istanbul/group-yacht-40-signature",
  "/yacht-charter-istanbul/event-yacht-90",
  "/yacht-charter-istanbul/mega-event-yacht-150",
];

const LOCALIZED_SET = new Set(LOCALIZED_PATHS);
const NON_EN_LOCALES = ACTIVE_LOCALES.filter((l) => l !== "en");

// Staged ru rollout: only emit /ru sitemap URLs for paths that have a live
// /ru page (translated TRANSLATIONS block). Mirror of RU_ENABLED_ROUTES in
// src/lib/hreflang.ts — keep these two in sync when adding new /ru pages.
// RU now covers 11 commercial paths (2026-06-01 expansion after building
// native Russian content for proposal-yacht, private-dinner, corporate,
// kabatas-dinner, team-building, private-events, boat-rental, kurucesme).
// Pillar /bosphorus-cruise also has full RU content via the locale pillar
// system. Adding to sitemap unlocks crawl + hreflang for Yandex.
const RU_ENABLED_PATHS = new Set<string>([
  "/bosphorus-cruise",
  "/cruises/bosphorus-sunset-cruise",
  "/istanbul-dinner-cruise",
  "/yacht-charter-istanbul",
  "/boat-rental-istanbul",
  "/proposal-yacht-rental-istanbul",
  "/private-bosphorus-dinner-cruise",
  "/corporate-events",
  "/private-events",
  "/kabatas-dinner-cruise-istanbul",
  "/team-building-yacht-istanbul",
  "/kurucesme-marina-yacht-charter",
  "/honeymoon-yacht-cruise-istanbul",
  "/anniversary-yacht-cruise-istanbul",
  "/bosphorus-cruise-for-couples",
  "/bosphorus-cruise-for-families",
  // 2026-06-02: Hotel-cluster RU variants shipped.
  "/bosphorus-cruise-from-sultanahmet",
  "/bosphorus-cruise-from-taksim",
  "/bosphorus-cruise-from-beyoglu",
]);

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
    lines.push(`    <xhtml:link rel="alternate" hreflang="${locale}" href="${escapeXml(`${SITE_URL}/${locale}${path}`)}"/>`);
  }
  return lines.join("\n");
}

// Build hreflang block for a locale page
function hreflangLocaleXml(path: string, thisLocale: string): string {
  const lines: string[] = [
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(`${SITE_URL}${path}`)}"/>`,
    `    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(`${SITE_URL}${path}`)}"/>`,
  ];
  for (const locale of NON_EN_LOCALES) {
    if (locale === "ru" && !RU_ENABLED_PATHS.has(path)) continue;
    lines.push(`    <xhtml:link rel="alternate" hreflang="${locale}" href="${escapeXml(`${SITE_URL}/${locale}${path}`)}"/>`);
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
    { url: `${SITE_URL}/sunset-cruise-tickets-istanbul`, changefreq: "weekly", priority: "0.73", lastmod: contentLastmod, hreflang: hreflangXml("/sunset-cruise-tickets-istanbul") },
    { url: `${SITE_URL}/istanbul-dinner-cruise`, changefreq: "weekly", priority: "0.97", lastmod: contentLastmod, hreflang: hreflangXml("/istanbul-dinner-cruise") },
    { url: `${SITE_URL}/turkish-night-dinner-cruise-istanbul`, changefreq: "weekly", priority: "0.73", lastmod: contentLastmod, hreflang: hreflangXml("/turkish-night-dinner-cruise-istanbul") },
    { url: `${SITE_URL}/dinner-cruise-with-hotel-pickup-istanbul`, changefreq: "weekly", priority: "0.73", lastmod: contentLastmod, hreflang: hreflangXml("/dinner-cruise-with-hotel-pickup-istanbul") },
    { url: `${SITE_URL}/dinner-cruise-pickup-sultanahmet-taksim`, changefreq: "weekly", priority: "0.72", lastmod: contentLastmod, hreflang: hreflangXml("/dinner-cruise-pickup-sultanahmet-taksim") },
    { url: `${SITE_URL}/bosphorus-cruise-departure-points`, changefreq: "weekly", priority: "0.71", lastmod: contentLastmod, hreflang: hreflangXml("/bosphorus-cruise-departure-points") },
    { url: `${SITE_URL}/private-bosphorus-dinner-cruise`, changefreq: "weekly", priority: "0.78", lastmod: contentLastmod, hreflang: hreflangXml("/private-bosphorus-dinner-cruise") },
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
    { url: `${SITE_URL}/best-bosphorus-sunset-cruise-2026`, changefreq: "monthly", priority: "0.82", lastmod: contentLastmod },
    { url: `${SITE_URL}/istanbul-cruise-faq`, changefreq: "monthly", priority: "0.80", lastmod: contentLastmod },
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
      ...NON_EN_LOCALES.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${escapeXml(`${SITE_URL}/${l}`)}"/>`),
    ].join("\n"),
  }));

  // All locale pages (30 routes × 4 locales).
  // Pillar pages get highest priority — bosphorus-cruise hub (0.97) is the
  // top organic target ("boğaz turu" 6,600/mo TR). Dinner, sunset, yacht
  // (0.95) are the 3 product pillars with €30/€34/€280 starting prices.
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

  const allPages = [
    ...staticPages,
    ...localeHomepages,
    ...localePages,
    ...tourPages,
    ...fleetPages,
    ...blogPages,
    ...guidePages,
    ...localeBlogPages,
  ].filter(
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
