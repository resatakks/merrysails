import { getTourPath, tours } from "@/data/tours";
import { blogPosts } from "@/data/blog";
import { guides } from "@/data/guides";
import { commercialSupportPosts } from "@/content/blog";
import { cleanContentText } from "@/lib/content-text";

const SITE_URL = "https://merrysails.com";
const EXCLUDED_TOUR_SLUGS = new Set([
  "romantic-marriage-proposal",
  "corporate-event-bosphorus-cruise",
  "private-bosphorus-dinner-yacht-cruise",
]);

function toAbsoluteUrl(url: string): string {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

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

type SitemapPage = {
  url: string;
  changefreq: string;
  priority: string;
  lastmod: string;
  images?: Array<{ loc: string; title: string; caption?: string }>;
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
    { url: `${SITE_URL}/bosphorus-cruise`, changefreq: "daily", priority: "0.98", lastmod: contentLastmod },
    { url: `${SITE_URL}/cruises`, changefreq: "weekly", priority: "0.55", lastmod: contentLastmod },
    { url: `${SITE_URL}/sunset-cruise-tickets-istanbul`, changefreq: "weekly", priority: "0.73", lastmod: contentLastmod },
    { url: `${SITE_URL}/istanbul-dinner-cruise`, changefreq: "weekly", priority: "0.97", lastmod: contentLastmod },
    { url: `${SITE_URL}/turkish-night-dinner-cruise-istanbul`, changefreq: "weekly", priority: "0.73", lastmod: contentLastmod },
    { url: `${SITE_URL}/dinner-cruise-with-hotel-pickup-istanbul`, changefreq: "weekly", priority: "0.73", lastmod: contentLastmod },
    { url: `${SITE_URL}/dinner-cruise-pickup-sultanahmet-taksim`, changefreq: "weekly", priority: "0.72", lastmod: contentLastmod },
    { url: `${SITE_URL}/bosphorus-cruise-departure-points`, changefreq: "weekly", priority: "0.71", lastmod: contentLastmod },
    { url: `${SITE_URL}/private-bosphorus-dinner-cruise`, changefreq: "weekly", priority: "0.78", lastmod: contentLastmod },
    { url: `${SITE_URL}/private-dinner-cruise-for-couples-istanbul`, changefreq: "weekly", priority: "0.73", lastmod: contentLastmod },
    { url: `${SITE_URL}/proposal-yacht-rental-istanbul`, changefreq: "weekly", priority: "0.76", lastmod: contentLastmod },
    { url: `${SITE_URL}/proposal-yacht-with-photographer-istanbul`, changefreq: "weekly", priority: "0.72", lastmod: contentLastmod },
    { url: `${SITE_URL}/yacht-charter-istanbul`, changefreq: "weekly", priority: "0.96", lastmod: contentLastmod },
    { url: `${SITE_URL}/kurucesme-marina-yacht-charter`, changefreq: "weekly", priority: "0.72", lastmod: contentLastmod },
    { url: `${SITE_URL}/boat-rental-istanbul`, changefreq: "weekly", priority: "0.72", lastmod: contentLastmod },
    { url: `${SITE_URL}/boat-rental-hourly-istanbul`, changefreq: "weekly", priority: "0.71", lastmod: contentLastmod },
    { url: `${SITE_URL}/private-tours`, changefreq: "weekly", priority: "0.68", lastmod: contentLastmod },
    { url: `${SITE_URL}/corporate-events`, changefreq: "weekly", priority: "0.74", lastmod: contentLastmod },
    { url: `${SITE_URL}/corporate-yacht-dinner-istanbul`, changefreq: "weekly", priority: "0.72", lastmod: contentLastmod },
    { url: `${SITE_URL}/team-building-yacht-istanbul`, changefreq: "weekly", priority: "0.72", lastmod: contentLastmod },
    { url: `${SITE_URL}/client-hosting-yacht-istanbul`, changefreq: "weekly", priority: "0.72", lastmod: contentLastmod },
    { url: `${SITE_URL}/product-launch-yacht-istanbul`, changefreq: "weekly", priority: "0.72", lastmod: contentLastmod },
    { url: `${SITE_URL}/kabatas-dinner-cruise-istanbul`, changefreq: "weekly", priority: "0.72", lastmod: contentLastmod },
    { url: `${SITE_URL}/private-events`, changefreq: "weekly", priority: "0.72", lastmod: contentLastmod },
    { url: `${SITE_URL}/blog`, changefreq: "daily", priority: "0.8", lastmod: contentLastmod },
    { url: `${SITE_URL}/guides`, changefreq: "weekly", priority: "0.7", lastmod: contentLastmod },
    { url: `${SITE_URL}/about`, changefreq: "monthly", priority: "0.6", lastmod: contentLastmod },
    { url: `${SITE_URL}/contact`, changefreq: "monthly", priority: "0.6", lastmod: contentLastmod },
    { url: `${SITE_URL}/faq`, changefreq: "monthly", priority: "0.5", lastmod: contentLastmod },
    { url: `${SITE_URL}/tursab`, changefreq: "monthly", priority: "0.45", lastmod: contentLastmod },
    { url: `${SITE_URL}/privacy-policy`, changefreq: "yearly", priority: "0.3", lastmod: "2025-12-01" },
    { url: `${SITE_URL}/terms`, changefreq: "yearly", priority: "0.3", lastmod: "2025-12-01" },
  ];

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
    return {
      url: `${SITE_URL}${getTourPath(tour)}`,
      changefreq: "weekly",
      priority: tour.isCoreProduct ? "0.95" : tour.showPricing ? "0.76" : "0.68",
      lastmod: contentLastmod,
      images: images.length > 0 ? images : undefined,
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

  const allPages = [...staticPages, ...tourPages, ...blogPages, ...guidePages].filter(
    (page, index, pages) => pages.findIndex((candidate) => candidate.url === page.url) === index
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allPages
  .map(
    (page) => `  <url>
    <loc>${escapeXml(page.url)}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>${
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
