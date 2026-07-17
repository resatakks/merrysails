// ─────────────────────────────────────────────────────────────────────────────
// PRUNED 410 AUTHORITY (crawl-budget prune, 2026-07-17)
//
// Single source of truth for the reversible 410/Gone prune. The dated manifest
// data/pruned-2026-07-17-410.json (repo root) lists 26 EN /blog/<slug> posts
// that are 0-impression (GSC 28d 2026-06-18→2026-07-16), thin/derivative, and
// NON-COMMERCIAL — i.e. informational blog articles only, never a /cruises,
// /yacht-charter-istanbul, or other money/service page. Full rationale + the
// KEEP/REWRITE/301 buckets live in data/seo/crawl-budget/merrysails-crawl-budget-2026-07-17.md §4.
//
// Consumed by:
//   • src/proxy.ts — exact-match edge gate returns HTTP 410 for PRUNED_410_PATHS
//     (fail-open: any path NOT in the set is passed through untouched).
//   • src/data/blog/index.ts + src/content/blog.ts — drop the pruned slugs from
//     the base post arrays so they leave every listing / related-posts /
//     JSON-LD ItemList / sitemap surface together (no internal links to a Gone
//     URL — Screaming Frog "internal_broken_links" safe).
//
// FREEZE-SAFE: this touches routing status + sitemap membership only. It does
// NOT rewrite any <title>/metaTitle/h1 (merrysails is Bing-suppression-RECOVERED;
// bulk title/meta churn is the exact trigger we must never repeat).
//
// REVERSIBLE: the blog posts stay in the source data. To un-prune a URL, delete
// it from the manifest and redeploy — the post returns to 200 and reappears in
// the sitemap/listings automatically. TO ADD a future prune wave, ship a new
// dated manifest + union it into the sets below (keep the old one for audit).
// ─────────────────────────────────────────────────────────────────────────────

import prunedManifest from "./pruned-2026-07-17-410.json";

/** Exact request paths (EN /blog/<slug>) that must return HTTP 410 Gone. */
export const PRUNED_410_PATHS: ReadonlySet<string> = new Set<string>(
  prunedManifest.paths,
);

/** Blog slugs pruned to 410 — used to drop them from listings/related/sitemap. */
export const PRUNED_410_BLOG_SLUGS: ReadonlySet<string> = new Set<string>(
  prunedManifest.slugs,
);

/** True when a blog slug has been 410-pruned (do not link or list it). */
export function isPruned410BlogSlug(slug: string): boolean {
  return PRUNED_410_BLOG_SLUGS.has(slug);
}
