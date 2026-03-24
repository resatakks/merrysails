import { tours } from "@/data/tours";
import { blogPosts } from "@/data/blog";
import { guides } from "@/data/guides";

const SITE_URL = "https://merrysails.com";

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

export function GET() {
  const today = formatDate(new Date());

  // Use the most recent blog post date as a proxy for "last content update"
  const latestBlogDate = blogPosts.reduce((latest, post) => {
    const d = post.dateModified || post.date;
    return d > latest ? d : latest;
  }, "2026-01-01");
  const contentLastmod = formatDate(new Date(latestBlogDate));

  const staticPages = [
    { url: SITE_URL, changefreq: "daily", priority: "1.0", lastmod: contentLastmod },
    { url: `${SITE_URL}/cruises`, changefreq: "daily", priority: "0.9", lastmod: contentLastmod },
    { url: `${SITE_URL}/private-tours`, changefreq: "weekly", priority: "0.8", lastmod: "2026-03-08" },
    { url: `${SITE_URL}/blog`, changefreq: "daily", priority: "0.8", lastmod: contentLastmod },
    { url: `${SITE_URL}/guides`, changefreq: "weekly", priority: "0.7", lastmod: "2026-03-10" },
    { url: `${SITE_URL}/about`, changefreq: "monthly", priority: "0.6", lastmod: "2026-03-01" },
    { url: `${SITE_URL}/contact`, changefreq: "monthly", priority: "0.6", lastmod: "2026-02-15" },
    { url: `${SITE_URL}/faq`, changefreq: "monthly", priority: "0.5", lastmod: "2026-03-01" },
    { url: `${SITE_URL}/privacy-policy`, changefreq: "yearly", priority: "0.3", lastmod: "2025-12-01" },
    { url: `${SITE_URL}/terms`, changefreq: "yearly", priority: "0.3", lastmod: "2025-12-01" },
  ];

  const tourPages = tours.map((tour) => ({
    url: `${SITE_URL}/cruises/${tour.slug}`,
    changefreq: "weekly",
    priority: "0.8",
    lastmod: contentLastmod,
  }));

  const seenBlogSlugs = new Set<string>();
  const blogPages = blogPosts
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
