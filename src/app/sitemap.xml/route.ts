import { tours } from "@/data/tours";
import { blogPosts } from "@/data/blog";
import { guides } from "@/data/guides";

const SITE_URL = "https://merrysails.com";

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
  const today = formatDate(new Date());

  const latestBlogDate = blogPosts.reduce((latest, post) => {
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
    { url: `${SITE_URL}/cruises`, changefreq: "daily", priority: "0.9", lastmod: contentLastmod },
    { url: `${SITE_URL}/istanbul-dinner-cruise`, changefreq: "weekly", priority: "0.95", lastmod: "2026-04-03" },
    { url: `${SITE_URL}/private-bosphorus-dinner-cruise`, changefreq: "weekly", priority: "0.94", lastmod: "2026-04-13" },
    { url: `${SITE_URL}/yacht-charter-istanbul`, changefreq: "weekly", priority: "0.95", lastmod: "2026-04-03" },
    { url: `${SITE_URL}/boat-rental-istanbul`, changefreq: "weekly", priority: "0.85", lastmod: "2026-04-04" },
    { url: `${SITE_URL}/private-tours`, changefreq: "weekly", priority: "0.8", lastmod: "2026-03-08" },
    { url: `${SITE_URL}/corporate-events`, changefreq: "weekly", priority: "0.85", lastmod: "2026-04-04" },
    { url: `${SITE_URL}/private-events`, changefreq: "weekly", priority: "0.85", lastmod: "2026-04-04" },
    { url: `${SITE_URL}/blog`, changefreq: "daily", priority: "0.8", lastmod: contentLastmod },
    { url: `${SITE_URL}/guides`, changefreq: "weekly", priority: "0.7", lastmod: "2026-03-10" },
    { url: `${SITE_URL}/about`, changefreq: "monthly", priority: "0.6", lastmod: "2026-03-01" },
    { url: `${SITE_URL}/contact`, changefreq: "monthly", priority: "0.6", lastmod: "2026-02-15" },
    { url: `${SITE_URL}/faq`, changefreq: "monthly", priority: "0.5", lastmod: "2026-03-01" },
    { url: `${SITE_URL}/privacy-policy`, changefreq: "yearly", priority: "0.3", lastmod: "2025-12-01" },
    { url: `${SITE_URL}/terms`, changefreq: "yearly", priority: "0.3", lastmod: "2025-12-01" },
  ];

  const tourPages: SitemapPage[] = tours.map((tour) => {
    const images: SitemapPage["images"] = [];
    if (tour.image) {
      images.push({
        loc: tour.image,
        title: `${tour.nameEn} - ${tour.name}`,
        caption: tour.description.slice(0, 200),
      });
    }
    if (tour.gallery) {
      for (const img of tour.gallery) {
        if (img !== tour.image) {
          images.push({ loc: img, title: `${tour.nameEn} gallery photo` });
        }
      }
    }
    return {
      url: `${SITE_URL}/cruises/${tour.slug}`,
      changefreq: "weekly",
      priority: "0.8",
      lastmod: contentLastmod,
      images: images.length > 0 ? images : undefined,
    };
  });

  const seenBlogSlugs = new Set<string>();
  const blogPages: SitemapPage[] = blogPosts
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
              loc: post.image,
              title: post.title,
              caption: post.imageAlt || post.excerpt?.slice(0, 200),
            },
          ]
        : undefined,
    }));

  const guidePages: SitemapPage[] = guides.map((guide) => ({
    url: `${SITE_URL}/guides/${guide.slug}`,
    changefreq: "monthly",
    priority: "0.7",
    lastmod: "2026-03-10",
    images: guide.image
      ? [{ loc: guide.image, title: guide.title }]
      : undefined,
  }));

  const allPages = [...staticPages, ...tourPages, ...blogPages, ...guidePages];

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
