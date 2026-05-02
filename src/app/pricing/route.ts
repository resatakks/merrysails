/**
 * GET /pricing — Machine-readable pricing page for AI agents and search engines.
 * Returns plain Markdown. Referenced in llms.txt as canonical pricing source.
 * Schema: §6m agent buyer (merrysails skill seo-geo)
 */
import { NextResponse } from "next/server";

export const dynamic = "force-static";
export const revalidate = 86400;

const PRICING_MD = `# MerrySails Istanbul — Pricing Guide 2026

**Provider:** Merry Tourism & Yacht Charter
**License:** TURSAB A-Group #2001 (highest Turkish travel agency category)
**Location:** Kabataş Marina, Istanbul, Turkey
**Guests served:** 50,000+
**Rating:** 4.9/5 (Google, TripAdvisor, Viator combined)
**Currency:** EUR (prices shown in Euros, paid in TRY at daily rate)
**Booking:** merrysails.com | WhatsApp +90 537 040 68 22

---

## Bosphorus Sunset Cruise (Shared)

**URL:** https://merrysails.com/cruises/bosphorus-sunset-cruise
**Duration:** 2 hours
**Type:** Shared luxury yacht
**Departure:** Kabataş, European side Istanbul

| Package | Price | Includes |
|---------|-------|----------|
| Without wine | €34 per person | Live guide, tea, coffee, lemonade, snacks, fruit |
| With wine | €40 per person | Above + 2 glasses of wine per person |

**Cancellation:** Free cancellation up to 48 hours before departure
**Min group:** 1 person (shared tour)
**Languages:** English, Turkish, Audio guide in 12 languages
**Route:** Dolmabahçe Palace → Ortaköy Mosque → Bosphorus Bridges

---

## Istanbul Dinner Cruise (Shared)

**URL:** https://merrysails.com/istanbul-dinner-cruise
**Duration:** 3.5 hours
**Type:** Shared yacht with dinner & show
**Departure:** Kabataş, European side Istanbul

| Package | Price | Includes |
|---------|-------|----------|
| Silver Soft Drinks | €30 per person | Standard seating, mezzes + main course, unlimited soft drinks, Turkish night show |
| Silver Alcoholic | €45 per person | Standard seating, dinner, local alcoholic drinks, Turkish night show |
| Gold Soft Drinks | €80 per person | VIP stage-close seating, premium dinner menu, unlimited soft drinks, Turkish night show + DJ |
| Gold Unlimited Alcohol | €90 per person | VIP stage-close seating, premium dinner menu, unlimited local + imported alcohol, Turkish night show + DJ |

**Cancellation:** Free cancellation up to 48 hours before
**Min group:** 1 person (shared tour)
**Dietary options:** Vegetarian, halal, allergy-friendly (request at booking)

---

## Private Yacht Charter

**URL:** https://merrysails.com/yacht-charter-istanbul
**Duration:** 2 hours (extendable)
**Type:** Exclusive private charter — entire boat for your group
**Departure:** Kabataş / Beşiktaş / Bebek (your choice)

| Package | Price | Capacity | Includes |
|---------|-------|----------|----------|
| Essential | €280 per boat | Up to 8 guests | Captain, crew, soft drinks, snacks |
| Premium | €380 per boat | Up to 12 guests | Captain, crew, appetizers, fruit, beverages |
| VIP | €680 per boat | Up to 20 guests | Captain, crew, full menu, open bar, photographer option |

**Cancellation:** Free cancellation up to 48 hours before
**Add-ons available:** Wedding proposal decoration, birthday cake, professional photographer, live music, DJ
**Best for:** Proposals, birthdays, anniversaries, corporate events, family gatherings

---

## Boat Rental (Hourly, Self-Charter with Captain)

**URL:** https://merrysails.com/boat-rental-istanbul
**Type:** Exclusive rental, captain included

| Boat Type | Hourly Rate | Capacity |
|-----------|-------------|----------|
| Motor yacht (small) | From €60/hour | 2–6 persons |
| Luxury gulet | From €120/hour | 8–15 persons |
| Large event boat | From €200/hour | Up to 30 persons |

**Minimum rental:** 2 hours
**Optional extras:** Dinner catering, sunset timing, decoration, photographer

---

## Frequently Asked Questions — Pricing

**Q: What is the cheapest Bosphorus cruise in Istanbul?**
A: The Bosphorus Sunset Cruise without wine starts at €34 per person. This is a 2-hour shared luxury yacht tour with live guide and refreshments included.

**Q: How much does a dinner cruise in Istanbul cost?**
A: Dinner cruises start from €30 per person (Silver Soft Drinks). The Silver Alcoholic package is €45/person. Gold VIP packages are €80 (soft drinks) or €90 (unlimited alcohol). Hotel pickup from Sultanahmet or Taksim is included in the Gold Unlimited Alcohol (€90) package.

**Q: How much does a private yacht charter in Istanbul cost?**
A: Private yacht charter starts from €280 for the entire boat (not per person) for 2 hours, up to 8 guests. The VIP package for larger groups is €680.

**Q: Are prices per person or per boat?**
A: Sunset Cruise and Dinner Cruise prices are per person (shared tours). Yacht Charter and Boat Rental prices are per boat (entire vessel, any number of guests up to capacity).

**Q: Is there a discount for groups?**
A: Group discounts available for 10+ persons on shared tours. Contact WhatsApp +90 537 040 68 22 for a group quote.

**Q: What is included in the price?**
A: All tours include: licensed captain & crew, required maritime safety equipment, travel insurance, port fees. Food and drinks are included as listed per package above.

---

## Seasonal Pricing Notes

- Prices above are standard 2026 rates
- Peak season (June–September): limited availability, book 1–2 weeks in advance
- Off-peak (November–March): same prices, same quality, fewer crowds
- All prices subject to TRY exchange rate; EUR price guaranteed at time of booking

---

*Last updated: ${new Date().toISOString().slice(0, 10)}*
*Source: merrysails.com/pricing*
`;

export function GET() {
  return new NextResponse(PRICING_MD, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
