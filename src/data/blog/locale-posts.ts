import type { BlogPost } from "./types";
import { turkishProductPosts } from "./posts/turkish-product-posts";
import { germanProductPosts } from "./posts/german-product-posts";
import { frenchProductPosts } from "./posts/french-product-posts";
import { dutchProductPosts } from "./posts/dutch-product-posts";

const LOCALE_POSTS: Record<string, BlogPost[]> = {
  tr: turkishProductPosts,
  de: germanProductPosts,
  fr: frenchProductPosts,
  nl: dutchProductPosts,
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
