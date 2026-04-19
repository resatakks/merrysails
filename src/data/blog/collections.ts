import { commercialConversionGuides } from "./posts/commercial-conversion-guides";
import { commercialCruiseGuides } from "./posts/commercial-cruise-guides";
import { foundationalCruiseGuides } from "./posts/foundational-cruise-guides";
import { istanbulCityGuides } from "./posts/istanbul-city-guides";
import { planningAndSupportGuides } from "./posts/planning-and-support-guides";
import { privateYachtAndOccasionGuides } from "./posts/private-yacht-and-occasion-guides";
import type { BlogPost } from "./types";

export interface BlogCollection {
  slug: string;
  title: string;
  description: string;
  intent: string;
  primaryCategory: BlogPost["category"];
  postSlugs: string[];
}

export const blogCollections: BlogCollection[] = [
  {
    slug: "commercial-cruise-guides",
    title: "Cruise Comparison Guides",
    description:
      "Comparison and price-focused articles around sunset cruise, dinner cruise, and yacht charter bookings.",
    intent:
      "Helpful when the guest is already comparing options, prices, timing, or package details before booking.",
    primaryCategory: "cruise-guide",
    postSlugs: commercialCruiseGuides.map((post) => post.slug),
  },
  {
    slug: "commercial-conversion-guides",
    title: "Booking Decision Guides",
    description:
      "Decision-stage content that helps visitors move from research into a clear booking path or service page.",
    intent:
      "Helpful when the guest is close to booking but still needs a clearer direction.",
    primaryCategory: "cruise-guide",
    postSlugs: commercialConversionGuides.map((post) => post.slug),
  },
  {
    slug: "private-yacht-and-occasion-guides",
    title: "Private Yacht & Occasion Guides",
    description:
      "Private yacht, proposal, birthday, celebration, and special-occasion content built around tailored charter plans.",
    intent:
      "Helpful when the brief is private, romantic, celebratory, or event-led rather than a standard shared cruise.",
    primaryCategory: "yacht-guide",
    postSlugs: privateYachtAndOccasionGuides.map((post) => post.slug),
  },
  {
    slug: "foundational-cruise-guides",
    title: "Foundational Cruise Guides",
    description:
      "Core educational posts that explain the main Bosphorus cruise types and help first-time visitors understand the market.",
    intent:
      "Helpful at the early research stage when the guest still needs orientation before choosing among the 3 main products.",
    primaryCategory: "cruise-guide",
    postSlugs: foundationalCruiseGuides.map((post) => post.slug),
  },
  {
    slug: "planning-and-support-guides",
    title: "Planning & Support Guides",
    description:
      "Boarding, routes, cancellations, weather, timing, and practical planning content that supports existing demand.",
    intent:
      "Helpful after the main product pages, when guests need logistics, reassurance, or trip-planning detail.",
    primaryCategory: "tips",
    postSlugs: planningAndSupportGuides.map((post) => post.slug),
  },
  {
    slug: "istanbul-city-guides",
    title: "Istanbul City Guides",
    description:
      "Landmark and city-context articles that connect Bosphorus experiences to Istanbul trip planning and sightseeing.",
    intent:
      "Helpful for broader destination relevance and internal linking without competing with the 3 main booking pages.",
    primaryCategory: "istanbul",
    postSlugs: istanbulCityGuides.map((post) => post.slug),
  },
];

const blogCollectionIndex = new Map(blogCollections.map((collection) => [collection.slug, collection]));

export function getBlogCollectionBySlug(slug: string): BlogCollection | undefined {
  return blogCollectionIndex.get(slug);
}
