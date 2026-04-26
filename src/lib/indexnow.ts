const SITE_URL = "https://merrysails.com";
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || "merrysails-indexnow-key";
const INDEXNOW_API = "https://api.indexnow.org/IndexNow";

export interface IndexNowResult {
  submitted: number;
  status: number;
  ok: boolean;
  error?: string;
}

/**
 * Submit an array of URLs to the IndexNow API for instant indexing
 * by Bing, Yandex, and other participating search engines.
 *
 * URLs are automatically batched into groups of 10,000 (IndexNow limit).
 *
 * @param urls - Array of full URLs to submit (e.g. ["https://merrysails.com/blog/my-post"])
 * @returns Array of results, one per batch
 */
export async function submitToIndexNow(
  urls: string[]
): Promise<IndexNowResult[]> {
  if (urls.length === 0) {
    return [];
  }

  // IndexNow API allows max 10,000 URLs per request
  const batches: string[][] = [];
  for (let i = 0; i < urls.length; i += 10000) {
    batches.push(urls.slice(i, i + 10000));
  }

  const results: IndexNowResult[] = [];

  for (const batch of batches) {
    const payload = {
      host: "merrysails.com",
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: batch,
    };

    try {
      const res = await fetch(INDEXNOW_API, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(payload),
      });
      results.push({
        submitted: batch.length,
        status: res.status,
        ok: res.status === 200 || res.status === 202,
      });
    } catch (error) {
      results.push({
        submitted: batch.length,
        status: 0,
        ok: false,
        error: String(error),
      });
    }
  }

  return results;
}

/**
 * Build the full list of site URLs (static pages, tours, blogs, guides).
 * Useful for submitting the entire sitemap to IndexNow after a deployment.
 */
export async function getAllSiteUrls(): Promise<string[]> {
  // Dynamic imports to avoid pulling data modules into every bundle
  const { blogPosts } = await import("@/data/blog");
  const { getTourPath, tours } = await import("@/data/tours");
  const { guides } = await import("@/data/guides");

  const staticUrls = [
    SITE_URL,
    `${SITE_URL}/bosphorus-cruise`,
    `${SITE_URL}/bosphorus-cruise-departure-points`,
    `${SITE_URL}/cruises`,
    `${SITE_URL}/sunset-cruise-tickets-istanbul`,
    `${SITE_URL}/istanbul-dinner-cruise`,
    `${SITE_URL}/turkish-night-dinner-cruise-istanbul`,
    `${SITE_URL}/dinner-cruise-with-hotel-pickup-istanbul`,
    `${SITE_URL}/dinner-cruise-pickup-sultanahmet-taksim`,
    `${SITE_URL}/yacht-charter-istanbul`,
    `${SITE_URL}/boat-rental-istanbul`,
    `${SITE_URL}/boat-rental-hourly-istanbul`,
    `${SITE_URL}/proposal-yacht-rental-istanbul`,
    `${SITE_URL}/proposal-yacht-with-photographer-istanbul`,
    `${SITE_URL}/private-bosphorus-dinner-cruise`,
    `${SITE_URL}/private-dinner-cruise-for-couples-istanbul`,
    `${SITE_URL}/kurucesme-marina-yacht-charter`,
    `${SITE_URL}/private-tours`,
    `${SITE_URL}/corporate-events`,
    `${SITE_URL}/corporate-yacht-dinner-istanbul`,
    `${SITE_URL}/team-building-yacht-istanbul`,
    `${SITE_URL}/client-hosting-yacht-istanbul`,
    `${SITE_URL}/product-launch-yacht-istanbul`,
    `${SITE_URL}/kabatas-dinner-cruise-istanbul`,
    `${SITE_URL}/private-events`,
    `${SITE_URL}/blog`,
    `${SITE_URL}/guides`,
    `${SITE_URL}/about`,
    `${SITE_URL}/contact`,
    `${SITE_URL}/faq`,
    `${SITE_URL}/tursab`,
  ];

  const tourUrls = tours.map((t) => `${SITE_URL}${getTourPath(t)}`);
  const blogUrls = blogPosts.map((p: { slug: string }) => `${SITE_URL}/blog/${p.slug}`);
  const guideUrls = guides.map((g: { slug: string }) => `${SITE_URL}/guides/${g.slug}`);

  return [...new Set([...staticUrls, ...tourUrls, ...blogUrls, ...guideUrls])];
}
