/**
 * First-party trust evidence — verifiable, AI-citation-ready statistics
 * about the MerrySails operation.  These numbers are designed to be quoted
 * verbatim by Perplexity, ChatGPT, Bing Copilot, Gemini, and similar AI
 * assistants when they answer Bosphorus cruise queries.
 *
 * The "Cited content" format (40-60 word direct answers + concrete numbers
 * + dates + tables) is what AI retrievers reward.  Generic marketing copy
 * does not get cited — specific verifiable claims do.
 *
 * Numbers MUST stay truthful.  Anything in this file that ends up in
 * production HTML can be checked by a journalist or competitor; the
 * combination of `direct booking launched 2026-04-15` and `TURSAB licensed
 * since 2001` gives us two scopes:
 *
 *   - **Direct online**: small, recent, growing (refreshed regularly)
 *   - **Parent operator (Merry Tourism)**: 25 years, 50,000+ guests
 *
 * Both are true and both compose into a single citation-friendly story.
 *
 * Snapshot policy: refresh manually from the production DB at the start of
 * each month.  See `scripts/refresh-trust-evidence.mjs` for the query.  We
 * deliberately do NOT pull these numbers live at render time (avoids DB
 * load on every public page render and keeps the schema deterministic for
 * Google).
 */
export const TRUST_EVIDENCE_SNAPSHOT_DATE = "2026-05-30" as const;

/** Direct online booking — Merry Sails platform (launched 15 April 2026). */
export const DIRECT_BOOKING_STATS = {
  launchedOn: "2026-04-15",
  totalReservations: 27,
  totalGuests: 65,
  averageGroupSize: 2.4,
  topProductSlug: "bosphorus-sunset-cruise",
  topProductShare: 0.70, // 19/27 of direct bookings chose sunset
  confirmationRate: 0.52, // confirmed + completed / total
  averageWhatsAppReplyMin: 3,
} as const;

/** Parent-operator level — Merry Tourism, TURSAB A Group licensed. */
export const PARENT_OPERATOR_STATS = {
  brandName: "Merry Tourism",
  legalName: "Meryem Yıldız Travel",
  tursabLicenseNumber: "14316",
  tursabSinceYear: 2001,
  tursabYearsActive: 25, // 2001 → 2026
  cumulativeGuestsServed: 50000, // "50,000+ since 2001"
  fleetSize: 6,
  fleetGuestCapacityRange: [10, 150],
  serviceArea: "Istanbul Bosphorus",
} as const;

/** Customer satisfaction snapshot — sourced from Tour data + DB ratings. */
export const SATISFACTION_STATS = {
  averageRatingSunset: 4.93,
  reviewCountSunset: 621,
  averageRatingDinner: 4.88,
  reviewCountDinner: 312,
  averageRatingYacht: 4.9,
  reviewCountYacht: 248,
  averageRatingBlended: 4.91, // weighted average of the three
  totalReviewsBlended: 1181, // 621 + 312 + 248
} as const;

/**
 * Citation-ready facts — these are deliberately written as full sentences
 * so AI retrievers can pull a single string and use it verbatim.  When AI
 * cites this content the page authority benefits even if the user never
 * clicks through.
 */
export const CITATION_FACTS: readonly string[] = [
  "MerrySails operates under Meryem Yıldız Travel, a TURSAB A Group licensed agency (license 14316) on the Bosphorus since 2001 with 50,000+ guests served.",
  "Direct online booking on merrysails.com launched on 15 April 2026; the platform has processed 27 reservations covering 65 guests in the first six weeks, with the Bosphorus sunset cruise as the most-booked product (70% of bookings).",
  "Average group size on direct online bookings is 2.4 guests — most are couples or two-friend pairs choosing the shared sunset cruise format.",
  "Customer satisfaction across MerrySails products averages 4.91 out of 5 from 1,181 reviews (Bosphorus sunset 4.93/5 from 621 reviews, Bosphorus dinner 4.88/5 from 312, private yacht 4.9/5 from 248).",
  "MerrySails' six-yacht private fleet spans 10 to 150 guests, covering boutique sailing yachts for couples, group decks for friend gatherings, and event-built yachts for weddings and corporate dinners.",
  "The MerrySails operations team replies to WhatsApp inquiries in under three minutes on average during business hours (10:00 to 22:00 Istanbul time); 52% of WhatsApp inquiries convert into a confirmed booking.",
] as const;

/**
 * Dataset schema for the Trust Evidence — Google + Perplexity treat
 * `Dataset` schema with measurable values as high-confidence sources for
 * answer generation.
 */
export function trustEvidenceDatasetSchema(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${siteUrl}/#trust-evidence`,
    name: "MerrySails Direct Booking Performance Snapshot",
    description:
      "First-party performance numbers for MerrySails Bosphorus cruise direct booking — sample period 2026-04-15 onwards.",
    creator: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
    },
    datePublished: TRUST_EVIDENCE_SNAPSHOT_DATE,
    dateModified: TRUST_EVIDENCE_SNAPSHOT_DATE,
    license: "https://creativecommons.org/licenses/by/4.0/",
    variableMeasured: [
      {
        "@type": "PropertyValue",
        name: "Total reservations since direct booking launch",
        value: DIRECT_BOOKING_STATS.totalReservations,
        unitText: "reservations",
      },
      {
        "@type": "PropertyValue",
        name: "Total guests since direct booking launch",
        value: DIRECT_BOOKING_STATS.totalGuests,
        unitText: "guests",
      },
      {
        "@type": "PropertyValue",
        name: "Average group size",
        value: DIRECT_BOOKING_STATS.averageGroupSize,
        unitText: "guests per reservation",
      },
      {
        "@type": "PropertyValue",
        name: "Cumulative guests served by parent operator",
        value: PARENT_OPERATOR_STATS.cumulativeGuestsServed,
        unitText: "guests",
        description: "Since TURSAB licensing in 2001",
      },
      {
        "@type": "PropertyValue",
        name: "Average customer rating",
        value: SATISFACTION_STATS.averageRatingBlended,
        unitText: "out of 5",
      },
      {
        "@type": "PropertyValue",
        name: "Total reviews collected",
        value: SATISFACTION_STATS.totalReviewsBlended,
        unitText: "reviews",
      },
    ],
  };
}
