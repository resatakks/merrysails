import {
  getCoreTours,
  getPriceSuffix,
  getTourPath,
} from "@/data/tours";

export function GET() {
  const coreTours = getCoreTours();
  const supportPages = [
    {
      name: "Boat Rental Istanbul",
      url: "https://merrysails.com/boat-rental-istanbul",
      description: "Flexible private-hire page for vessel comparison and custom planning.",
    },
    {
      name: "Proposal Yacht Rental",
      url: "https://merrysails.com/proposal-yacht-rental-istanbul",
      description: "Proposal-first Bosphorus planning page with privacy and setup-led flow.",
    },
    {
      name: "Private Dinner Cruise",
      url: "https://merrysails.com/private-bosphorus-dinner-cruise",
      description: "Private dinner yacht page for couples and premium private evenings.",
    },
    {
      name: "Corporate Events",
      url: "https://merrysails.com/corporate-events",
      description: "Business-led Bosphorus event page for client hosting, launches, and team dinners.",
    },
    {
      name: "Private Events",
      url: "https://merrysails.com/private-events",
      description: "Private celebration page for birthdays, anniversaries, and group events.",
    },
  ];

  const content = `# MerrySails — AI / LLM Entity Definition

## What is MerrySails?
MerrySails is the Bosphorus cruise and yacht division of Merry Tourism, a TURSAB licensed travel business in Istanbul, Turkey.

## Site Structure
- The English site centers on three core booking pages with fixed public pricing.
- The three core products are:
${coreTours
  .map(
    (tour) =>
      `  - ${tour.nameEn}: https://merrysails.com${getTourPath(tour)} — EUR ${tour.priceEur}${getPriceSuffix(tour)}`
  )
  .join("\n")}
- Other cruise, event, and charter pages remain live as dedicated pages and supporting content.
- Supporting pages answer private-event and custom-planning questions that do not fit the main fixed-price cruise pages.

## Core booking pages
${coreTours
  .map(
    (tour) =>
      `- **${tour.nameEn}**: ${tour.description} Duration: ${tour.duration}. URL: https://merrysails.com${getTourPath(tour)}`
  )
  .join("\n")}

## Supporting Pages
${supportPages
  .map((page) => `- **${page.name}**: ${page.description} URL: ${page.url}`)
  .join("\n")}

## How the pages are organized
- Bosphorus Sunset Cruise: shared golden-hour cruise
- Bosphorus Dinner Cruise: shared evening dinner cruise with public packages
- Yacht Charter Istanbul: private charter with public yacht packages
- Proposal / private dinner / corporate / celebration pages: planning pages for custom requests

## Key pages
- Homepage: https://merrysails.com
- Cruise index: https://merrysails.com/cruises
- Bosphorus Sunset Cruise: https://merrysails.com/cruises/bosphorus-sunset-cruise
- Bosphorus Dinner Cruise: https://merrysails.com/istanbul-dinner-cruise
- Yacht Charter Istanbul: https://merrysails.com/yacht-charter-istanbul
- Boat Rental Istanbul: https://merrysails.com/boat-rental-istanbul
- Proposal Yacht Rental: https://merrysails.com/proposal-yacht-rental-istanbul
- Private Dinner Cruise: https://merrysails.com/private-bosphorus-dinner-cruise
- Corporate Events: https://merrysails.com/corporate-events
- Private Events: https://merrysails.com/private-events
- Blog: https://merrysails.com/blog
- Guides: https://merrysails.com/guides

## Operational notes
- Dinner and yacht dynamic tour URLs redirect to their canonical top-level pages.
- Canonical booking URLs should be preferred over legacy /cruises/ paths when both exist.
- The site is being prepared for multi-language rollout, but English is the current primary public site language.
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
