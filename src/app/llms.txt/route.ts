import { tours } from "@/data/tours";

export function GET() {
  const content = `# MerrySails — Bosphorus Cruise & Yacht Charter in Istanbul

> MerrySails is operated by Merry Tourism, a TURSAB A Group licensed travel agency in Istanbul, Turkey. We offer Bosphorus cruises, dinner cruises, sunset cruises, private yacht charters, and boat tours since 2001.

## About
- Company: Merry Tourism (Trading as MerrySails)
- License: TURSAB A Group Travel Agency
- Founded: 2001
- Location: Alemdar Mah. Divanyolu Cad. Oğul Han No:62 İç Kapı No: 402, 34093 Fatih/İstanbul, Turkey
- Phone: +90 537 040 68 22 / +90 536 414 66 05
- Email: info@merrysails.com
- WhatsApp: +90 537 040 68 22
- Rating: 4.9/5 (2,847 reviews)
- Guests Served: 50,000+

## Services

### Bosphorus Cruises
${tours
  .filter((t) => t.category === "cruise" || t.category === "tour")
  .map((t) => `- **${t.nameEn}**: ${t.description} Duration: ${t.duration}. From €${t.priceEur}/person.`)
  .join("\n")}

### Private Yacht Charter & Events
${tours
  .filter((t) => t.category === "private" || t.category === "organization")
  .map((t) => `- **${t.nameEn}**: ${t.description} Duration: ${t.duration}. From €${t.priceEur}/person.`)
  .join("\n")}

## Pricing
- Sightseeing Cruise: From €15/person (1.5 hours)
- Sunset Cruise: From €40/person (2.5 hours)
- Dinner Cruise: From €65/person (3.5 hours, includes hotel transfer)
- Dinner Cruise Gold: €95/person (premium seating)
- Private Yacht Essential: From €280 (2 hours, up to 15 guests)
- Private Yacht Premium: From €380 (3 hours, decoration & photographer)
- Private Yacht VIP: From €680 (4 hours, full luxury package)

## Key Pages
- Homepage: https://merrysails.com
- All Cruises: https://merrysails.com/cruises
- Private Tours: https://merrysails.com/private-tours
- Blog: https://merrysails.com/blog
- Istanbul Guides: https://merrysails.com/guides
- About: https://merrysails.com/about
- Contact: https://merrysails.com/contact
- FAQ: https://merrysails.com/faq
- Track Reservation: https://merrysails.com/reservation

## Policies
- Free cancellation up to 24 hours before departure
- Best price guarantee — no middleman fees
- Secure online payment (SSL)
- Hotel pickup included with dinner cruises
- Languages: English, Turkish, Arabic, Russian

## Detailed Tour Pages
${tours.map((t) => `- [${t.nameEn}](https://merrysails.com/cruises/${t.slug})`).join("\n")}

## Blog & Guides
- [Blog — Cruise Guides & Travel Tips](https://merrysails.com/blog)
- [Istanbul Landmark Guides](https://merrysails.com/guides)

## Commercial Cruise Guides (Booking & Pricing)
- [Book a Bosphorus Cruise — Complete Guide](https://merrysails.com/blog/book-bosphorus-cruise-istanbul): How to book sightseeing, sunset, dinner & yacht cruises from €15. Prices, departure points, booking channels.
- [Bosphorus Dinner Cruise Booking](https://merrysails.com/blog/bosphorus-dinner-cruise-booking): Book the €65 all-inclusive dinner cruise — 4-course meal, live entertainment, hotel transfer. Menu details and reservation.
- [Istanbul Sunset Cruise Booking](https://merrysails.com/blog/istanbul-sunset-cruise-booking): Book the €40 sunset cruise — 2.5-hour golden hour experience, departure times by season, what is included.
- [Private Yacht Charter Istanbul Prices](https://merrysails.com/blog/private-yacht-charter-istanbul-prices): Yacht charter from €280 — Essential, Premium & VIP packages, routes, custom events.
- [Bosphorus Cruise Prices 2026](https://merrysails.com/blog/bosphorus-cruise-prices-2026): Complete price breakdown for all cruise types — sightseeing €15, sunset €40, dinner €65, yacht €280+.
- [Istanbul Night Cruise](https://merrysails.com/blog/istanbul-night-cruise): Compare sunset, dinner & party cruises after dark — prices, routes, what is included.
- [Party Boat Istanbul](https://merrysails.com/blog/party-boat-istanbul): Private party boat from €280 — birthday, bachelorette, corporate events on the Bosphorus.
- [Istanbul Boat Party Private](https://merrysails.com/blog/istanbul-boat-party-private): Private yacht events — DJ setup, catering, decorations, packages from €280.
- [Best Bosphorus Cruise Guide](https://merrysails.com/blog/best-bosphorus-cruise-istanbul-guide): Comprehensive comparison of all cruise types, pricing tables, and booking tips for 2026.
- [Istanbul Sunset Cruise Experience](https://merrysails.com/blog/istanbul-sunset-cruise-experience): The signature Istanbul sunset experience from €40 — photography tips, best seasons, route details.
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
