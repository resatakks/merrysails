import { blogPosts } from "@/content/blog";
import type { BlogPost } from "@/data/blog";

// Minimum internal inlinks every blog post should receive from the related-posts
// grid. Project rule: ≥3 internal links per blog post (CLAUDE.md §17/19).
// Screaming Frog/SEMrush 2026-06-23 flagged 107 posts with only ONE internal
// inlink — the curated `relatedPosts` arrays concentrate links on a few hub
// posts (bosphorus-cruise-prices-2026 alone received 34) and starve the tail.
export const MIN_INLINKS = 3;

// How many related cards a post renders (out-links). 3 keeps the grid tidy on
// the EN root; we surface up to this many.
export const RELATED_RENDER_COUNT = 3;

// Max balanced-backlink out-links a single source post contributes. With
// RELATED_RENDER_COUNT=3 and balanced links rendered first, every assigned
// target survives the render slice. Kept ≤ RELATED_RENDER_COUNT so a source's
// grid never overflows into editorial slots entirely.
export const MAX_EXTRA_PER_SOURCE = 3;

type Slug = string;

// Deterministic 32-bit hash so the augmentation is stable across builds (no
// Math.random — every render is reproducible and SSR/CSR agree).
function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return h >>> 0;
}

/**
 * Build a balanced backlink graph over every EN blog post.
 *
 * Returns a map of source-slug → balanced target slugs the source post's
 * related-grid should surface, so that every post in the corpus receives
 * exactly MIN_INLINKS internal inlinks. Uses a deterministic ring assignment
 * per category (each post's `want` ring-predecessors become its sources), which
 * is perfectly balanced — every post is source and target exactly `want` times
 * — so no post is starved and no source overflows the render slice. Category
 * grouping keeps the surfaced links topically relevant; a tiny category folds
 * into a global ring so it still reaches MIN_INLINKS.
 */
function computeBacklinkGraph(): Map<Slug, Slug[]> {
  const posts: BlogPost[] = blogPosts;
  const out = new Map<Slug, Slug[]>();
  for (const p of posts) out.set(p.slug, []);

  // Group by category; categories too small to satisfy MIN_INLINKS on their own
  // (need ≥ MIN_INLINKS+1 members) fall into a shared "global" ring.
  const byCategory = new Map<string, BlogPost[]>();
  const tooSmall: BlogPost[] = [];
  const counts = new Map<string, number>();
  for (const p of posts) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
  for (const p of posts) {
    if ((counts.get(p.category) ?? 0) > MIN_INLINKS) {
      const arr = byCategory.get(p.category) ?? [];
      arr.push(p);
      byCategory.set(p.category, arr);
    } else {
      tooSmall.push(p);
    }
  }

  const assignRing = (members: BlogPost[], keyPrefix: string) => {
    const ring = [...members].sort(
      (a, b) => hash(keyPrefix + a.slug) - hash(keyPrefix + b.slug)
    );
    const n = ring.length;
    if (n < 2) return;
    const want = Math.min(MIN_INLINKS, n - 1, MAX_EXTRA_PER_SOURCE);
    for (let t = 0; t < n; t++) {
      const target = ring[t].slug;
      for (let k = 1; k <= want; k++) {
        const source = ring[(t - k + n) % n].slug; // distinct predecessors
        out.get(source)!.push(target);
      }
    }
  };

  for (const [cat, members] of byCategory) assignRing(members, cat);
  if (tooSmall.length) assignRing(tooSmall, "global");

  return out;
}

// Computed once per server process (module singleton).
let cached: Map<Slug, Slug[]> | null = null;

/** Extra related-target slugs this source post should also surface. */
export function getBalancedBacklinkSlugs(sourceSlug: Slug): Slug[] {
  if (!cached) cached = computeBacklinkGraph();
  return cached.get(sourceSlug) ?? [];
}
