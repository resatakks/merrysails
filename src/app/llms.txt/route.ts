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
- Sunset Cruise: From €20/person (2.5 hours)
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
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
