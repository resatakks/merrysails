import { getTourPath, tours } from "@/data/tours";
import { blogPosts } from "@/data/blog";
import { guides } from "@/data/guides";
import { commercialSupportPosts } from "@/content/blog";
import { cleanContentText } from "@/lib/content-text";
import { ACTIVE_LOCALES } from "@/i18n/config";

const SITE_URL = "https://merrysails.com";
const EXCLUDED_TOUR_SLUGS = new Set([
  "romantic-marriage-proposal",
  "corporate-event-bosphorus-cruise",
  "private-bosphorus-dinner-yacht-cruise",
]);

// Routes that have live locale pages — must match src/app/[locale]/ folders exactly
const LOCALIZED_PATHS = [
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
];

const LOCALIZED_SET = new Set(LOCALIZED_PATHS);
const NON_EN_LOCALES = ACTIVE_LOCALES.filter((l) => l !== "en");

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
    { url: `${SITE_URL}/proposal-yacht-rental-istanbul`, changefreq: "weekly", priority: "0.76", lastmod: contentLastmod, hreflang: hreflangXml("/proposal-yacht-rental-istanbul") },
    { url: `${SITE_URL}/proposal-yacht-with-photographer-istanbul`, changefreq: "weekly", priority: "0.72", lastmod: contentLastmod, hreflang: hreflangXml("/proposal-yacht-with-photographer-istanbul") },
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
    { url: `${SITE_URL}/private-events`, changefreq: "weekly", priority: "0.72", lastmod: contentLastmod, hreflang: hreflangXml("/private-events") },
    { url: `${SITE_URL}/blog`, changefreq: "daily", priority: "0.8", lastmod: contentLastmod, hreflang: hreflangXml("/blog") },
    { url: `${SITE_URL}/guides`, changefreq: "weekly", priority: "0.7", lastmod: contentLastmod, hreflang: hreflangXml("/guides") },
    { url: `${SITE_URL}/about`, changefreq: "monthly", priority: "0.6", lastmod: contentLastmod, hreflang: hreflangXml("/about") },
    { url: `${SITE_URL}/contact`, changefreq: "monthly", priority: "0.6", lastmod: contentLastmod, hreflang: hreflangXml("/contact") },
    { url: `${SITE_URL}/faq`, changefreq: "monthly", priority: "0.5", lastmod: contentLastmod, hreflang: hreflangXml("/faq") },
    { url: `${SITE_URL}/tursab`, changefreq: "monthly", priority: "0.45", lastmod: contentLastmod },
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

  // All locale pages (30 routes × 4 locales)
  const localePages: SitemapPage[] = NON_EN_LOCALES.flatMap((locale) =>
    LOCALIZED_PATHS.map((path) => ({
      url: `${SITE_URL}/${locale}${path}`,
      changefreq: path === "/bosphorus-cruise" || path === "/istanbul-dinner-cruise" || path === "/yacht-charter-istanbul" ? "weekly" : "monthly",
      priority: path === "/bosphorus-cruise" ? "0.88" : path === "/istanbul-dinner-cruise" || path === "/yacht-charter-istanbul" ? "0.85" : "0.70",
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

  const seenBlogSlugs = new Set<string>();
  const blogPages: SitemapPage[] = allBlogPosts
    .filter((post) => {
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

  const allPages = [
    ...staticPages,
    ...localeHomepages,
    ...localePages,
    ...tourPages,
    ...blogPages,
    ...guidePages,
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
