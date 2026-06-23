import type { BlogPost } from "./types";
import { turkishProductPosts } from "./posts/turkish-product-posts";
import { germanProductPosts } from "./posts/german-product-posts";
import { frenchProductPosts } from "./posts/french-product-posts";
import { dutchProductPosts } from "./posts/dutch-product-posts";
import { russianProductPosts } from "./posts/russian-product-posts";

const LOCALE_POSTS: Record<string, BlogPost[]> = {
  tr: turkishProductPosts,
  de: germanProductPosts,
  fr: frenchProductPosts,
  nl: dutchProductPosts,
  ru: russianProductPosts,
};

export function getLocalePostBySlug(locale: string, slug: string): BlogPost | undefined {
  return (LOCALE_POSTS[locale] ?? []).find((p) => p.slug === slug);
}

export function getAllLocalePostSlugs(locale: string): string[] {
  return (LOCALE_POSTS[locale] ?? []).map((p) => p.slug);
}

export function getAllLocalePostsForLocale(locale: string): BlogPost[] {
  return LOCALE_POSTS[locale] ?? [];
}

// Deterministic 32-bit hash — stable related-post selection across builds.
function hashLocale(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return h >>> 0;
}

// Balanced per-locale backlink graph: source-slug → related target slugs, built
// so EVERY locale post receives at least `count` inbound links from siblings
// (the SEMrush metric counts INLINKS, not out-links — a naive per-post pick
// leaves tail posts with 1 inlink). Same neediest-first round-robin as the EN
// graph in @/lib/related-posts-graph. Computed once per locale, memoized.
const localeGraphCache = new Map<string, Map<string, string[]>>();

function computeLocaleGraph(locale: string, count: number): Map<string, string[]> {
  const posts = LOCALE_POSTS[locale] ?? [];
  const slugs = posts.map((p) => p.slug);
  const want = Math.min(count, Math.max(0, slugs.length - 1));

  const inlinks = new Map<string, number>(slugs.map((s) => [s, 0]));
  const out = new Map<string, string[]>(slugs.map((s) => [s, []]));

  if (want === 0) return out;

  // Deterministic ring assignment: order posts by hash, then for each target
  // take its `want` predecessors on the ring as sources. With a fixed ring this
  // is perfectly balanced — every post is both source and target exactly `want`
  // times — so every post gets exactly `want` inlinks AND `want` out-links, no
  // post starved, no source exceeds the render slice. (n×want in = n×want out.)
  const ring = [...slugs].sort((a, b) => hashLocale(a) - hashLocale(b));
  const n = ring.length;
  for (let t = 0; t < n; t++) {
    const target = ring[t];
    for (let k = 1; k <= want; k++) {
      const source = ring[(t - k + n) % n]; // distinct predecessors; k≤want≤n-1
      out.get(source)!.push(target);
      inlinks.set(target, inlinks.get(target)! + 1);
    }
  }
  return out;
}

/**
 * Same-locale related posts for `currentSlug`, guaranteeing every locale post
 * receives ≥`count` inbound internal links from siblings (Screaming
 * Frog/SEMrush 2026-06-23: locale blog posts rendered no related grid → flagged
 * "only one internal link"). Deterministic + memoized per locale. Returns []
 * when the locale has fewer than 2 posts (nothing meaningful to link).
 */
export function getLocaleRelatedPosts(
  locale: string,
  currentSlug: string,
  count = 3
): BlogPost[] {
  const posts = LOCALE_POSTS[locale] ?? [];
  if (posts.length < 2) return [];
  const key = `${locale}:${count}`;
  let graph = localeGraphCache.get(key);
  if (!graph) {
    graph = computeLocaleGraph(locale, count);
    localeGraphCache.set(key, graph);
  }
  const bySlug = new Map(posts.map((p) => [p.slug, p] as const));
  const slugs = graph.get(currentSlug) ?? [];
  return slugs
    .map((s) => bySlug.get(s))
    .filter((p): p is BlogPost => Boolean(p));
}
