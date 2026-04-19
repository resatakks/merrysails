import {
  getPriceSuffix,
  getTourPath,
  isPricingVisible,
  tours,
} from "@/data/tours";
import { blogPosts } from "@/data/blog";
import { guides } from "@/data/guides";

export function GET() {
  const tourDetails = tours
    .map((tour) => {
      const pricingLine = isPricingVisible(tour)
        ? `- Pricing: EUR ${tour.priceEur}${getPriceSuffix(tour)}`
        : "- Pricing: Price shared on request / dedicated page";

      return `### ${tour.nameEn}
- URL: https://merrysails.com${getTourPath(tour)}
${pricingLine}
- Duration: ${tour.duration}
- Capacity: ${tour.capacity}
- Departure: ${tour.departureTime} from ${tour.departurePoint}
- Route: ${tour.route}
- Rating: ${tour.rating}/5 (${tour.reviewCount} reviews)
- Includes: ${tour.includes.join(", ")}
- Highlights: ${tour.highlights.join(", ")}
- Description: ${tour.description}`;
    })
    .join("\n\n");

  const blogSummaries = blogPosts
    .map(
      (post) => `### ${post.title}
- URL: https://merrysails.com/blog/${post.slug}
- Category: ${post.category}
- Published: ${post.date}
- Summary: ${post.excerpt}`
    )
    .join("\n\n");

  const guideSummaries = guides
    .map(
      (guide) => `### ${guide.title}
- URL: https://merrysails.com/guides/${guide.slug}
- Summary: ${guide.excerpt}`
    )
    .join("\n\n");

  const content = `# MerrySails — Full AI Content Index

## Company
- Name: Merry Tourism (trading as MerrySails)
- Website: https://merrysails.com
- Focus: Bosphorus sunset cruise, Bosphorus dinner cruise, yacht charter, and supporting private-event pages
- Primary locale: English

## All tours and supporting pages (${tours.length})

${tourDetails}

## Blog posts (${blogPosts.length})

${blogSummaries}

## Guides (${guides.length})

${guideSummaries}
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
