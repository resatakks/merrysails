export type { BlogCollection } from "./collections";
export type { BlogPost, BlogSection, BlogSubsection } from "./types";

import { blogCollections } from "./collections";
import type { BlogPost } from "./types";
import { commercialConversionGuides } from "./posts/commercial-conversion-guides";
import { commercialCruiseGuides } from "./posts/commercial-cruise-guides";
import { foundationalCruiseGuides } from "./posts/foundational-cruise-guides";
import { istanbulCityGuides } from "./posts/istanbul-city-guides";
import { planningAndSupportGuides } from "./posts/planning-and-support-guides";
import { privateYachtAndOccasionGuides } from "./posts/private-yacht-and-occasion-guides";

export { blogCollections, getBlogCollectionBySlug } from "./collections";
export { commercialConversionGuides } from "./posts/commercial-conversion-guides";
export { commercialCruiseGuides } from "./posts/commercial-cruise-guides";
export { foundationalCruiseGuides } from "./posts/foundational-cruise-guides";
export { istanbulCityGuides } from "./posts/istanbul-city-guides";
export { planningAndSupportGuides } from "./posts/planning-and-support-guides";
export { privateYachtAndOccasionGuides } from "./posts/private-yacht-and-occasion-guides";

export const blogPosts: BlogPost[] = [
  ...foundationalCruiseGuides,
  ...privateYachtAndOccasionGuides,
  ...istanbulCityGuides,
  ...planningAndSupportGuides,
  ...commercialCruiseGuides,
  ...commercialConversionGuides,
];

/* Duplicates removed: istanbul-honeymoon-cruise-guide, bosphorus-cruise-reviews-guide,
   istanbul-cruise-package-deals, how-to-avoid-seasickness-cruise, istanbul-currency-tips-tourists
   — original comprehensive versions retained above */

const blogPostIndex = new Map(blogPosts.map((post) => [post.slug, post]));

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogPostIndex.get(slug);
}

export function getBlogsByCategory(category: BlogPost["category"]): BlogPost[] {
  return blogPosts.filter((post) => post.category === category);
}

export function getAllBlogSlugs(): string[] {
  return blogPosts.map((post) => post.slug);
}

export function getBlogCollectionsWithPosts(posts: BlogPost[] = blogPosts) {
  const postIndex = new Map(posts.map((post) => [post.slug, post]));

  return blogCollections.map((collection) => ({
    ...collection,
    posts: collection.postSlugs
      .map((slug) => postIndex.get(slug))
      .filter((post): post is BlogPost => Boolean(post)),
  }));
}
