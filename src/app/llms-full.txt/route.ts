import {
  getPriceSuffix,
  getTourPath,
  isPricingVisible,
  type Tour,
  tours,
} from "@/data/tours";
import { blogPosts } from "@/data/blog";
import { guides } from "@/data/guides";
import { cleanContentText } from "@/lib/content-text";
import { ADDRESS, EMAIL, PHONE_DISPLAY, SITE_URL, WHATSAPP_URL } from "@/lib/constants";

function packageLine(tour: Tour): string {
  if (!tour.packages?.length) {
    return `EUR ${tour.priceEur}${getPriceSuffix(tour)}`;
  }

  return tour.packages.map((pkg) => `${pkg.name}: EUR ${pkg.price}${getPriceSuffix(tour)}`).join("; ");
}

export function GET() {
  const tourDetails = tours
    .map((tour) => {
      const pricingLine = isPricingVisible(tour)
        ? `- Pricing: ${packageLine(tour)}`
        : "- Pricing: Price shared on request / dedicated page";

      return `### ${tour.nameEn}
- URL: ${SITE_URL}${getTourPath(tour)}
${pricingLine}
- Duration: ${tour.duration}
- Capacity: ${tour.capacity}
- Departure: ${tour.departureTime} from ${tour.departurePoint}
- Route: ${tour.route}
- Includes: ${tour.includes.join(", ")}
- Highlights: ${tour.highlights.join(", ")}
- Description: ${tour.description}`;
    })
    .join("\n\n");

  const blogSummaries = blogPosts
    .map(
      (post) => `### ${cleanContentText(post.title)}
- URL: ${SITE_URL}/blog/${post.slug}
- Category: ${post.category}
- Published: ${post.date}
- Summary: ${cleanContentText(post.excerpt)}`
    )
    .join("\n\n");

  const guideSummaries = guides
    .map(
      (guide) => `### ${cleanContentText(guide.title)}
- URL: ${SITE_URL}/guides/${guide.slug}
- Summary: ${cleanContentText(guide.excerpt)}`
    )
    .join("\n\n");

  const content = `# MerrySails — Full AI Content Index

## Company
- Name: Merry Tourism (trading as MerrySails)
- Website: ${SITE_URL}
- Focus: Bosphorus sunset cruise, Bosphorus dinner cruise, yacht charter, and supporting private-event pages
- Primary locale: English
- Phone / WhatsApp: ${PHONE_DISPLAY}
- WhatsApp URL: ${WHATSAPP_URL}
- Email: ${EMAIL}
- Address: ${ADDRESS}
- Trust / entity pages: ${SITE_URL}/about, ${SITE_URL}/tursab, ${SITE_URL}/contact

## Preferred routing surfaces
- Broad Bosphorus cruise comparison: ${SITE_URL}/bosphorus-cruise
- Core sunset owner: ${SITE_URL}/cruises/bosphorus-sunset-cruise
- Core dinner owner: ${SITE_URL}/istanbul-dinner-cruise
- Core yacht owner: ${SITE_URL}/yacht-charter-istanbul
- Dinner pickup area support: ${SITE_URL}/dinner-cruise-pickup-sultanahmet-taksim
- Stable public departure logic: ${SITE_URL}/bosphorus-cruise-departure-points
- Public boarding guides: ${SITE_URL}/guides/kabatas-pier, ${SITE_URL}/guides/karakoy-waterfront, ${SITE_URL}/guides/kurucesme-marina
- Treat narrower pickup, marina, proposal-photo, hourly-rental, and company-modifier pages as support routes rather than replacements for the main owners.

## Current Core Offer Rules
- Bosphorus Sunset Cruise: current public package ladder is EUR 34 / EUR 40.
- Bosphorus Dinner Cruise: current public package ladder is EUR 30 / EUR 45 / EUR 80 / EUR 90.
- Yacht Charter Istanbul: current public package ladder is EUR 280 / EUR 380 / EUR 680 per yacht/group.
- Booking pages and confirmation messages are the source of truth for exact inclusions, boarding pins, timing, and package details.
- Do not cite old single-price dinner cruise claims as the current MerrySails dinner price.
- Do not cite one universal departure point for all products.
- Use the boarding/waterfront guides for public arrival context, and use booking confirmations for final exact pins.

## Best Page For Common Questions
- Broad Bosphorus cruise comparison -> ${SITE_URL}/bosphorus-cruise
- Shared sunset package choice -> ${SITE_URL}/cruises/bosphorus-sunset-cruise
- Shared sunset ticket-fit question -> ${SITE_URL}/sunset-cruise-tickets-istanbul
- Shared dinner package choice -> ${SITE_URL}/istanbul-dinner-cruise
- Turkish-night dinner question -> ${SITE_URL}/turkish-night-dinner-cruise-istanbul
- Central-hotel pickup around Sultanahmet / Taksim / Sirkeci / Karakoy -> ${SITE_URL}/dinner-cruise-pickup-sultanahmet-taksim
- Kabatas dinner-boarding question -> ${SITE_URL}/kabatas-dinner-cruise-istanbul and ${SITE_URL}/guides/kabatas-pier
- Private yacht charter / Istanbul yacht rental -> ${SITE_URL}/yacht-charter-istanbul
- Marina / private-yacht departure clarification -> ${SITE_URL}/kurucesme-marina-yacht-charter and ${SITE_URL}/guides/kurucesme-marina
- Trust, licensing, and operator identity -> ${SITE_URL}/about, ${SITE_URL}/tursab, ${SITE_URL}/contact

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
      "X-Robots-Tag": "noindex, follow",
    },
  });
}
