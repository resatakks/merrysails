import { tours } from "@/data/tours";
import { blogPosts } from "@/data/blog";
import { guides } from "@/data/guides";

const SITE_URL = "https://merrysails.com";

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

export function GET() {
  const today = formatDate(new Date());

  const staticPages = [
    { url: SITE_URL, changefreq: "daily", priority: "1.0", lastmod: today },
    { url: `${SITE_URL}/cruises`, changefreq: "daily", priority: "0.9", lastmod: today },
    { url: `${SITE_URL}/private-tours`, changefreq: "weekly", priority: "0.8", lastmod: today },
    { url: `${SITE_URL}/blog`, changefreq: "daily", priority: "0.8", lastmod: today },
    { url: `${SITE_URL}/guides`, changefreq: "weekly", priority: "0.7", lastmod: today },
    { url: `${SITE_URL}/about`, changefreq: "monthly", priority: "0.6", lastmod: today },
    { url: `${SITE_URL}/contact`, changefreq: "monthly", priority: "0.6", lastmod: today },
    { url: `${SITE_URL}/faq`, changefreq: "monthly", priority: "0.5", lastmod: today },
    { url: `${SITE_URL}/privacy-policy`, changefreq: "yearly", priority: "0.3", lastmod: today },
    { url: `${SITE_URL}/terms`, changefreq: "yearly", priority: "0.3", lastmod: today },
  ];

  const tourPages = tours.map((tour) => ({
    url: `${SITE_URL}/cruises/${tour.slug}`,
    changefreq: "weekly",
    priority: "0.8",
    lastmod: today,
  }));

  const blogPages = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    changefreq: "monthly",
    priority: "0.7",
    lastmod: formatDate(new Date(post.date)),
  }));

  const guidePages = guides.map((guide) => ({
    url: `${SITE_URL}/guides/${guide.slug}`,
    changefreq: "monthly",
    priority: "0.7",
    lastmod: today,
  }));

  const allPages = [...staticPages, ...tourPages, ...blogPages, ...guidePages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
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
