/**
 * Shared LocalBusiness / TravelAgency schema block for commercial pillar
 * pages.  The audit on 2026-05-30 found LocalBusiness emitted on only the
 * homepage — every product hub (yacht charter, sunset cruise, dinner
 * cruise, bosphorus cruise, boat rental) should also carry its own
 * LocalBusiness facet pointing at the same operator entity but with the
 * product-specific priceRange and serviceArea.
 *
 * Per CLAUDE.md rule 2, LocalBusiness / TravelAgency schema MUST carry an
 * inline `address`; @id reference alone is not sufficient for Google's
 * Rich Results validator.  We bake the full PostalAddress in here.
 *
 * AggregateRating: parent type Organization is valid (CLAUDE.md rule 4a);
 * we attach the blended rating so this single block earns the rating
 * stars in SERPs where TouristTrip / Service can't.
 */
import { SATISFACTION_STATS } from "@/lib/trust-evidence";

const ORG_ID = "https://merrysails.com/#organization";

interface LocalBusinessOptions {
  /** Page-specific URL (e.g. https://merrysails.com/yacht-charter-istanbul). */
  pageUrl: string;
  /** Pricing band — one of "€", "€€", "€€€", or a custom "€€-€€€€" range. */
  priceRange: string;
  /** Product-specific service description that fills the LocalBusiness
   *  `description` and `serviceType` slot. */
  description: string;
  /** Optional override for sameAs links (additional brand profiles). */
  additionalSameAs?: readonly string[];
}

export function buildLocalBusinessSchema(opts: LocalBusinessOptions) {
  return {
    "@context": "https://schema.org",
    "@type": ["TravelAgency", "LocalBusiness"],
    "@id": `${opts.pageUrl}#localbusiness`,
    parentOrganization: { "@id": ORG_ID },
    name: "MerrySails — Merry Tourism",
    alternateName: ["Meryem Yıldız Travel", "MerrySails"],
    url: opts.pageUrl,
    description: opts.description,
    priceRange: opts.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Karaköy, Beyoğlu",
      addressLocality: "Istanbul",
      addressRegion: "Istanbul",
      postalCode: "34421",
      addressCountry: "TR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 41.0258,
      longitude: 28.9776,
    },
    areaServed: [
      { "@type": "City", name: "Istanbul" },
      { "@type": "Place", name: "Bosphorus Strait" },
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "10:00",
      closes: "22:00",
    },
    telephone: "+90-544-898-9812",
    email: "info@merrysails.com",
    image: `${opts.pageUrl.split("/").slice(0, 3).join("/")}/og-image.jpg`,
    knowsLanguage: ["en", "tr", "de", "fr", "nl", "ru"],
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "TURSAB A Group License",
      name: "TURSAB License 14316",
      recognizedBy: {
        "@type": "Organization",
        name: "TURSAB — Association of Turkish Travel Agencies",
        url: "https://www.tursab.org.tr/en",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: SATISFACTION_STATS.averageRatingBlended,
      reviewCount: SATISFACTION_STATS.totalReviewsBlended,
      bestRating: 5,
      worstRating: 1,
    },
    sameAs: [
      "https://www.tursab.org.tr/",
      "https://merrysails.com",
      ...(opts.additionalSameAs ?? []),
    ],
  };
}
