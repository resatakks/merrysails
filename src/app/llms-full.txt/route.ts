import { tours } from "@/data/tours";
import { blogPosts } from "@/data/blog";
import { guides } from "@/data/guides";

export function GET() {
  const tourDetails = tours
    .map(
      (t) => `### ${t.nameEn}
- URL: https://merrysails.com/cruises/${t.slug}
- Price: From €${t.priceEur}/person${t.originalPriceEur ? ` (was €${t.originalPriceEur})` : ""}
- Duration: ${t.duration}
- Capacity: ${t.capacity}
- Departure: ${t.departureTime} from ${t.departurePoint}
- Route: ${t.route}
- Rating: ${t.rating}/5 (${t.reviewCount} reviews)
- Includes: ${t.includes.join(", ")}
- Highlights: ${t.highlights.join(", ")}
- Description: ${t.description}
${t.packages ? t.packages.map((p) => `- ${p.name} Package: €${p.price} — ${p.description}`).join("\n") : ""}
${t.addOns ? `- Add-ons: ${t.addOns.map((a) => `${a.name} (${a.price})`).join(", ")}` : ""}`
    )
    .join("\n\n");

  const blogSummaries = blogPosts
    .map(
      (p) => `### ${p.title}
- URL: https://merrysails.com/blog/${p.slug}
- Category: ${p.category}
- Published: ${p.date}
- Read Time: ${p.readTime}
- Summary: ${p.excerpt}
- Keywords: ${p.keywords.join(", ")}
- Sections: ${p.sections.map((s) => s.heading).join(" | ")}
${p.faqs.length > 0 ? `- FAQs:\n${p.faqs.map((f) => `  Q: ${f.q}\n  A: ${f.a}`).join("\n")}` : ""}`
    )
    .join("\n\n");

  const guidesSummaries = guides
    .map(
      (g) => `### ${g.title}
- URL: https://merrysails.com/guides/${g.slug}
- Summary: ${g.excerpt}
- Keywords: ${g.keywords.join(", ")}
- Sections: ${g.sections.map((s) => s.heading).join(" | ")}`
    )
    .join("\n\n");

  const content = `# MerrySails — Complete Site Content for AI

> This is the full content index of MerrySails (merrysails.com), operated by Merry Tourism — a TURSAB A Group licensed travel agency in Istanbul, Turkey, offering Bosphorus cruises, dinner cruises, yacht charters, and boat tours since 2001.

## Company Information
- **Name:** Merry Tourism (trading as MerrySails)
- **License:** TURSAB A Group Travel Agency
- **Founded:** 2001
- **Address:** Alemdar Mah. Divanyolu Cad. Oğul Han No:62 İç Kapı No: 402, 34093 Fatih/İstanbul, Turkey
- **Phone:** +90 537 040 68 22 / +90 536 414 66 05
- **Email:** info@merrysails.com
- **WhatsApp:** +90 537 040 68 22
- **Rating:** 4.9/5 (2,847 reviews)
- **Guests Served:** 50,000+
- **Languages:** English, Turkish, Arabic, Russian
- **Cancellation:** Free cancellation up to 24 hours before departure
- **Payment:** Credit card, bank transfer, cash (EUR/USD/TRY)

---

## All Tours (${tours.length} tours)

${tourDetails}

---

## Blog Posts (${blogPosts.length} articles)

${blogSummaries}

---

## Istanbul Guides (${guides.length} guides)

${guidesSummaries}

---

## Frequently Asked Questions

**How much does a Bosphorus cruise cost?**
Prices start from €15 for a sightseeing cruise, €20 for a sunset cruise, €65 for a dinner cruise with entertainment, and €280+ for a private yacht charter.

**Where do cruises depart from?**
Shared cruises depart from Eminönü Pier (accessible by T1 tram). Private yacht charters depart from Kuruçeşme Marina.

**Is free cancellation available?**
Yes, free cancellation up to 24 hours before departure for a full refund.

**Do you offer hotel pickup?**
Hotel pickup and drop-off is included with dinner cruises at no extra cost.

**Is MerrySails licensed?**
Yes, operated by Merry Tourism, a TURSAB A Group licensed travel agency since 2001.

**Can I book a private yacht?**
Yes, private yacht charters start from €280 for 2 hours. Available for proposals, birthdays, weddings, and corporate events.
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
