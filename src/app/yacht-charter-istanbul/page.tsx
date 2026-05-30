import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import TourDetailClient from "@/components/tours/TourDetailClient";
import { getTourBySlug, getTourPath, type Tour } from "@/data/tours";
import { SITE_URL } from "@/lib/constants";
import { resolveBookingPrefill } from "@/lib/booking-prefill";
import { buildHreflang } from "@/lib/hreflang";
import RelatedTours from "@/components/ui/RelatedTours";
import FleetShowcase from "@/components/yacht/FleetShowcase";
import ComparisonTable from "@/components/ai/ComparisonTable";
import QuickAnswer from "@/components/ai/QuickAnswer";
import { getFleetStrings } from "@/components/yacht/fleet-strings";
import { OFFER_MERCHANT_DEFAULTS } from "@/lib/schema-merchant";
import { buildLocalBusinessSchema } from "@/lib/local-business-schema";
import {
  buildPricingTableSchema,
  buildReserveActionSchema,
} from "@/lib/travel-action-schema";
import PricingTable from "@/components/ai/PricingTable";
import {
  getCharterFleet,
  getCharterFleetLocale,
  getCharterLowestEntryPriceEur,
  getCharterHighestTotalPriceEur,
} from "@/data/fleet";

const fleetLowestEur = getCharterLowestEntryPriceEur();
const fleetHighestEur = getCharterHighestTotalPriceEur();

export const revalidate = 3600;

const yachtTour = getTourBySlug("yacht-charter-in-istanbul");

if (!yachtTour) {
  throw new Error("Yacht charter data is missing.");
}

const relatedTours: Tour[] = [
  getTourBySlug("bosphorus-sunset-cruise"),
  getTourBySlug("bosphorus-dinner-cruise"),
  getTourBySlug("private-bosphorus-sunset-cruise"),
  getTourBySlug("corporate-event-bosphorus-cruise"),
].filter((tour): tour is Tour => Boolean(tour));

const canonicalUrl = `${SITE_URL}${getTourPath(yachtTour)}`;

export const metadata: Metadata = {
  title: "Private Yacht Charter Istanbul — From €200",
  description: `Private yacht charter Istanbul from €${fleetLowestEur}. Six-yacht fleet, 10–150 guests, 2-hour minimum, 10% off from 3 hours. Captain and crew included.`,
  alternates: {
    canonical: canonicalUrl,
    languages: buildHreflang("/yacht-charter-istanbul"),
  },
  openGraph: {
    title: "Private Yacht Charter Istanbul — From €200",
    description: `Bosphorus yacht charter from €${fleetLowestEur}. Six-yacht fleet across boutique, group, and event tiers. Whole-yacht booking with captain and crew.`,
    url: canonicalUrl,
    type: "website",
    images: [
      {
        url: yachtTour.image,
        width: 1200,
        height: 630,
        alt: yachtTour.nameEn,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Private Yacht Charter Istanbul — From €200",
    description: `Bosphorus yacht charter from €${fleetLowestEur}. Six-yacht fleet, two-hour minimum, ten percent off from three hours.`,
    images: [yachtTour.image],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": ["TouristTrip", "Service"],
  "@id": `${canonicalUrl}#tour`,
  touristType: "Couples, Groups, Families, Corporate",
  name: yachtTour.nameEn,
  alternateName: [
    "Yacht Charter Istanbul",
    "Private Yacht Charter Istanbul",
    "Istanbul Yacht Rental",
    "Private Bosphorus Cruise",
  ],
  description: yachtTour.description,
  serviceType: "Private Yacht Charter",
  url: canonicalUrl,
  image: yachtTour.image,
  openingHours: "Mo-Su 00:00-23:59",
  provider: {
    "@id": `${SITE_URL}/#organization`,
  },
  areaServed: {
    "@type": "City",
    name: "Istanbul",
  },
  // aggregateRating intentionally NOT here — per Google Review snippet
  // spec, AggregateRating must sit on Event/Product/LocalBusiness/
  // Organization/Recipe/Movie/Course/Book/HowTo, never on Service/TouristTrip.
  // The valid AggregateRating is rendered separately on the Product schema
  // below (CLAUDE.md rule 4a).
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Bosphorus yacht charter fleet — entry price per yacht for a 2-hour sailing",
    itemListElement: getCharterFleet().map((boat) => {
      const en = getCharterFleetLocale(boat, "en");
      const entry = boat.priceByHours?.[boat.minHours] ?? null;
      return {
        "@type": "Offer",
        ...OFFER_MERCHANT_DEFAULTS,
        name: en.label,
        ...(entry != null
          ? { price: entry, priceCurrency: "EUR" }
          : {
              priceSpecification: {
                "@type": "PriceSpecification",
                priceCurrency: "EUR",
                price: null,
                description: "Program-based quote",
              },
            }),
        availability: "https://schema.org/InStock",
        validFrom: "2026-01-01",
        url: canonicalUrl,
        eligibleQuantity: {
          "@type": "QuantitativeValue",
          minValue: boat.capacity.min,
          maxValue: boat.capacity.max,
          unitText: "guests",
        },
        itemOffered: {
          "@type": "Service",
          name: en.label,
          description: en.description,
        },
      };
    }),
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", ".faq-section", ".faq-section dt", ".faq-section dd"],
  },
  mainEntity: yachtTour.faq?.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Bosphorus Cruise", item: `${SITE_URL}/bosphorus-cruise` },
    { "@type": "ListItem", position: 3, name: yachtTour.nameEn, item: canonicalUrl },
  ],
};

const fleetTableSchema = {
  "@context": "https://schema.org",
  "@type": "Table",
  name: "MerrySails Bosphorus private yacht charter fleet 2026",
  about: "Side-by-side comparison of the MerrySails private yacht charter fleet — Boutique 12, Premium 15, Group 40 Standard, Group 40 Signature, Event 90, Mega Event 150 — with capacity, 2h / 4h / 8h pricing in EUR, and inclusions.",
  url: canonicalUrl,
};

const productSchema = yachtTour
  ? {
      "@context": "https://schema.org",
      "@type": "Product",
      "@id": `${canonicalUrl}#product`,
      name: `${yachtTour.nameEn ?? "Private Yacht Charter Istanbul"} — Booking`,
      description: yachtTour.description,
      image: yachtTour.image,
      brand: { "@type": "Brand", name: "MerrySails" },
      sku: "merrysails-yacht-charter-istanbul",
      category: "Private Yacht Charter",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: yachtTour.rating ?? 4.9,
        reviewCount: yachtTour.reviewCount ?? 87,
        bestRating: 5,
        worstRating: 1,
      },
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "EUR",
        lowPrice: fleetLowestEur,
        highPrice: fleetHighestEur,
        offerCount: getCharterFleet().filter((b) => b.bookable).length,
        availability: "https://schema.org/InStock",
        seller: { "@id": `${SITE_URL}/#organization` },
      },
    }
  : null;

// Citation-ready fleet pricing rows — used by both the visual
// PricingTable below and the schema.org/Table emitted alongside.
const fleetPricingRows = getCharterFleet().slice(0, 6).map((boat) => {
  const en = getCharterFleetLocale(boat, "en");
  const entry = boat.priceByHours?.[boat.minHours];
  return {
    name: en.label,
    fromPrice: entry != null ? `From €${entry}` : "On request",
    unit: `per yacht / ${boat.minHours}h minimum`,
    note: `${boat.capacity.min}-${boat.capacity.max} guests`,
    includes: "captain, crew, soft drinks, snacks",
  };
});

const fleetPricingTableSchema = buildPricingTableSchema({
  name: "Bosphorus yacht charter — entry pricing per vessel",
  description:
    "Whole-yacht hire on the Bosphorus across six vessels; entry-tier rate per minimum-charter window, EUR per yacht (not per guest).",
  pageUrl: canonicalUrl,
  rows: fleetPricingRows,
});

const yachtReserveActionSchema = buildReserveActionSchema({
  productUrl: canonicalUrl,
  productName: "Private Bosphorus yacht charter",
  fromPriceEur: fleetLowestEur,
});

const charterReasons = [
  {
    title: "Six decks, one private sailing",
    description:
      "The fleet spans 10 to 150 guests — small sailing yachts for couples, mid-size decks for friend or family groups, event-built yachts for weddings and brand evenings.",
  },
  {
    title: "Whole-yacht pricing in EUR",
    description:
      "Each booking holds the entire yacht. Soft drinks, snacks, captain, crew, and fuel are included in the deck price. Flat 10% off from three hours upward.",
  },
  {
    title: "Brief-led extras",
    description:
      "Catering, alcohol, DJ, live music, photographer, proposal styling, and hotel transfer are on a separate quote — deck price stays clean, program stays flexible.",
  },
];

const charterCategoryCards = [
  {
    title: "Small deck · 10 to 14 guests",
    price: "From €200 / 2h",
    body: "Compact sailing yachts for couples, anniversaries, birthday afternoons, and tight friend trips. Two options sit in this tier.",
  },
  {
    title: "Mid-size group · 36 guests",
    price: "From €200 / 2h",
    body: "Mid-size decks for medium gatherings — standard and a signature upgrade for milestone birthdays, brand evenings, and smaller corporate offsites.",
  },
  {
    title: "Event class · 44 to 150 guests",
    price: "On quote",
    body: "Event-built decks for wedding receptions, gala dinners, full-program corporate evenings, and brand activations. Priced per program.",
  },
];

const routeProof = [
  {
    title: "Private Bosphorus route",
    body: `The charter follows ${yachtTour.route.toLowerCase()} rather than a fixed shared departure.`,
  },
  {
    title: "Confirmed departure marina",
    body: `Departure planning starts from ${yachtTour.departurePoint.toLowerCase()}, with the final boarding details shared after booking.`,
  },
  {
    title: "Two-hour minimum, three-hour saving",
    body: "Every yacht starts on a two-hour deck. Sailings of three hours or longer drop a flat ten percent automatically across the bookable tiers.",
  },
];

const aiCitationFacts = [
  {
    label: "Best fit",
    value:
      "Private yacht charter in Istanbul for guests who want to choose the yacht first and shape the route, timing, and onboard setup around their own group.",
  },
  {
    label: "Operator",
    value:
      "MerrySails — operated by Merry Tourism, TURSAB A-Group licensed since 2001. Our 6-yacht fleet has hosted 50,000+ guests for shared and private Bosphorus charters, with zero safety incidents in 25 years of operations.",
  },
  {
    label: "Price ladder",
    value: "From €200 for a two-hour boutique sailing through to €1,070 for an eight-hour signature group sailing. Six yachts from 10 to 150 guests, priced per yacht, not per seat. Three hours and longer carries a flat ten percent saving.",
  },
  {
    label: "Duration",
    value: "Two-hour minimum, eight-hour ceiling. A flat ten percent comes off from three hours upward across every bookable tier.",
  },
  {
    label: "Included on the deck",
    value: "Whole-yacht booking, licensed captain and crew, fuel, soft drinks, light snacks, onboard audio, life jackets.",
  },
  {
    label: "Outside the deck",
    value: "Catering, full bar service, DJ or live music, proposal styling, photographer, marina pickup or hotel transfer — all priced on a separate brief.",
  },
  {
    label: "Departure",
    value:
      "Marina and boarding point confirmed after booking based on selected yacht tier. Kurucesme is the primary marina cluster.",
  },
];

const comparePages = [
  {
    href: "/pricing",
    title: "Bosphorus Cruise Prices",
    description:
      "Full price comparison across all shared and private formats — use this first if you need to compare yacht charter costs alongside shared cruise tickets.",
  },
  {
    href: "/kurucesme-marina-yacht-charter",
    title: "Kurucesme Marina Yacht Charter",
    description:
      "Open this if the charter is already the right fit and the main question is the marina, boarding, or departure setup.",
  },
  {
    href: "/boat-rental-istanbul",
    title: "Boat Rental Istanbul",
    description:
      "Open this if you want to start with boat type, route, and outing style instead of comparing charter packages first.",
  },
  {
    href: "/private-bosphorus-dinner-cruise",
    title: "Private Bosphorus Dinner Cruise",
    description:
      "Open this if dinner is the main event and you want a private table on the Bosphorus rather than a package-led charter.",
  },
  {
    href: "/proposal-yacht-rental-istanbul",
    title: "Proposal Yacht Rental",
    description:
      "Open this if the booking is really about a reveal moment, privacy, and the timing around the proposal itself.",
  },
  {
    href: "/corporate-events",
    title: "Corporate Yacht Events",
    description:
      "Open this if the charter is for client hosting, a launch, or a company evening with an invoice-led brief.",
  },
  {
    href: "/corporate-yacht-dinner-istanbul",
    title: "Corporate Yacht Dinner",
    description:
      "Open this if the company brief is specifically a dinner-led private yacht evening rather than a broad corporate event.",
  },
  {
    href: "/team-building-yacht-istanbul",
    title: "Team Building Yacht",
    description:
      "Open this if the brief is team building on a yacht — group games, photo ops, structured activities at sea.",
  },
  {
    href: "/client-hosting-yacht-istanbul",
    title: "Client Hosting Yacht",
    description:
      "Open this if guest hospitality and client impression matter more than a broad company-event format.",
  },
  {
    href: "/product-launch-yacht-istanbul",
    title: "Product Launch Yacht",
    description:
      "Open this if the yacht is the venue for a product launch — branded event, press, photographer-led setup.",
  },
  {
    href: "/proposal-yacht-with-photographer-istanbul",
    title: "Proposal with Photographer",
    description:
      "Open this if proposal photography coverage is the deciding factor — paired yacht + photographer package.",
  },
];

export default async function YachtCharterIstanbulPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  if (!yachtTour) {
    notFound();
  }

  const resolvedSearchParams = await searchParams;
  const hasPrefill = typeof resolvedSearchParams.prefill === "string" && resolvedSearchParams.prefill.length > 0;
  const bookingPrefill = hasPrefill
    ? await resolveBookingPrefill(resolvedSearchParams)
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildLocalBusinessSchema({
              pageUrl: canonicalUrl,
              priceRange: `€€€-€€€€ (€${fleetLowestEur}-€${fleetHighestEur} per yacht)`,
              description:
                "Private Bosphorus yacht charter in Istanbul — six-yacht fleet covering boutique sailing yachts, group decks, and event-built yachts for weddings, corporate dinners, and proposals.",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {productSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(fleetPricingTableSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(yachtReserveActionSchema) }}
      />
      {yachtTour.faq && yachtTour.faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(fleetTableSchema) }}
      />

      <div className="pt-28 pb-20 bg-[var(--surface-alt)]">
        <div className="container-main">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6"
          >
            <Link href="/" className="hover:text-[var(--brand-primary)]">
              Home
            </Link>
            <span>/</span>
            <Link href="/bosphorus-cruise" className="hover:text-[var(--brand-primary)]">
              Bosphorus Cruise
            </Link>
            <span>/</span>
            <span className="text-[var(--heading)] truncate">{yachtTour.nameEn}</span>
          </nav>

          <header className="mb-3 md:mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-[var(--heading)] tracking-tight leading-tight">
              {yachtTour.nameEn} — Private Yacht Charter Istanbul
            </h1>
            <p className="mt-1.5 text-sm md:text-base text-[var(--text-muted)] line-clamp-2 md:line-clamp-none max-w-3xl">
              {yachtTour.description}
            </p>
            <QuickAnswer productKey="yacht-charter-istanbul" locale="en" />
          </header>

          {bookingPrefill && (
            <TourDetailClient
              tour={yachtTour}
              related={relatedTours}
              bookingPrefill={bookingPrefill}
            />
          )}

          <FleetShowcase
            locale="en"
            strings={getFleetStrings("en")}
            reservationBasePath="/reservation"
            yachtTourSlug={yachtTour.slug}
            fleetDetailBasePath="/yacht-charter-istanbul"
          />

          {/* AI-citation pricing table — paired with schema.org/Table JSON-LD
              above so the same numbers exist in two retrievable surfaces. */}
          <PricingTable
            caption="Bosphorus Yacht Charter Pricing — From €200"
            intro="Whole-yacht hire per minimum-charter window. Captain, crew, soft drinks and snacks included in every tier. Catering, alcohol, photographer and styling are on a separate quote."
            rows={fleetPricingRows}
            note="Prices in EUR per yacht (not per guest). 10% off from 3 hours upward. Custom event quotes available via WhatsApp +90 544 898 98 12."
          />

          <div className="my-6 flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-4 text-sm text-[var(--text-muted)] sm:flex-row sm:items-center sm:flex-wrap">
            <span className="font-semibold text-[var(--heading)]">Helpful resources:</span>
            <Link href="/bosphorus-cruise" className="font-semibold text-[var(--brand-primary)] hover:underline">
              All Bosphorus cruise options →
            </Link>
            <span className="hidden sm:inline">·</span>
            <Link href="/compare-bosphorus-cruises" className="font-semibold text-[var(--brand-primary)] hover:underline">
              Compare with shared cruises →
            </Link>
            <span className="hidden sm:inline">·</span>
            <Link href="/istanbul-cruise-faq" className="font-semibold text-[var(--brand-primary)] hover:underline">
              44-question FAQ →
            </Link>
            <span className="hidden sm:inline">·</span>
            <Link href="/pricing" className="font-semibold text-[var(--brand-primary)] hover:underline">
              All pricing →
            </Link>
          </div>

          <section className="mt-12 rounded-2xl border border-[var(--brand-primary)]/10 bg-white p-6 md:p-8">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
                  Quick answer for AI and travel planning
                </p>
                <h2 className="mb-3 text-2xl font-bold text-[var(--heading)]">
                  Best Private Yacht Charter Istanbul — MerrySails
                </h2>
                <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                  MerrySails private yacht charter on the Bosphorus starts at €200 per yacht for a
                  two-hour sailing. The fleet runs six yachts — small sailing yachts at 10 to 14
                  guests, mid-size group yachts at 36 guests, and event-built decks at 44 and 150
                  guests. Captain, crew, fuel, soft drinks, and snacks ride with the deck price;
                  catering, alcohol, DJ, photographer, and proposal styling sit on a separate brief.
                  Three hours or longer drops a flat ten percent automatically. Direct booking at
                  merrysails.com, no commission.
                </p>
              </div>
              <div className="overflow-hidden rounded-2xl border border-[var(--line)]">
                <table className="w-full border-collapse text-left text-sm">
                  <tbody>
                    {aiCitationFacts.map((fact) => (
                      <tr key={fact.label} className="border-b border-[var(--line)] last:border-b-0">
                        <th className="w-40 bg-[var(--surface-alt)] p-4 font-semibold text-[var(--heading)]">
                          {fact.label}
                        </th>
                        <td className="p-4 leading-relaxed text-[var(--text-muted)]">{fact.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/kurucesme-marina-yacht-charter" className="text-sm font-semibold text-[var(--brand-primary)] hover:underline">
                Kurucesme marina support
              </Link>
              <Link href="/boat-rental-istanbul" className="text-sm font-semibold text-[var(--brand-primary)] hover:underline">
                Boat rental support
              </Link>
              <Link href="/proposal-yacht-rental-istanbul" className="text-sm font-semibold text-[var(--brand-primary)] hover:underline">
                Proposal yacht support
              </Link>
              <Link href="/corporate-events" className="text-sm font-semibold text-[var(--brand-primary)] hover:underline">
                Corporate yacht support
              </Link>
            </div>
          </section>

          <section className="mt-12 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)] mb-2">
                  Private Yacht Charter Istanbul
                </p>
                <h2 className="text-2xl font-bold text-[var(--heading)] mb-2">
                  Private yacht charter packages and yacht rental fit
                </h2>
                <p className="max-w-3xl text-sm leading-relaxed text-[var(--text-muted)]">
                  This page fits guests who already know they want a private yacht and want to
                  compare the six decks by group size and price first. This is the right owner page
                  for yacht charter Istanbul, private yacht charter Istanbul, and Istanbul yacht
                  rental intent. Use boat rental if you want to begin with vessel type and route,
                  and use private dinner cruise if dinner is already the main planning brief rather
                  than the deck itself.
                </p>
              </div>
              <Link href="/private-bosphorus-dinner-cruise" className="btn-secondary">
                Need dinner to be the focus?
              </Link>
            </div>

            {/* AI-extractable fleet comparison — bookable yachts only, with
                the 2h entry tier, the 4h tier, the 8h day rate, capacity, and
                what is included onboard for each vessel. */}
            <div className="mt-6">
              <ComparisonTable
                caption="MerrySails Bosphorus private yacht charter fleet 2026 — five bookable vessels (Boutique 12, Premium 15, Group 40 Standard, Group 40 Signature, Event 90) with capacity, 2-hour entry price, 4-hour price, 8-hour day rate, and what is included onboard. Captain and crew included on every charter."
                ariaLabel="Private yacht charter fleet comparison"
                minWidth="780px"
                headers={[
                  "Vessel",
                  "Capacity",
                  "2h entry",
                  "4h price",
                  "8h price",
                  "What's included",
                ]}
                rows={[
                  [
                    "Boutique Yacht — 12 guests",
                    "Up to 12",
                    "€220",
                    "€396",
                    "€792",
                    "Captain & crew · soft drinks · snacks · custom Bosphorus route",
                  ],
                  [
                    "Premium Yacht — 15 guests",
                    "Up to 15",
                    "€320",
                    "€576",
                    "€1,152",
                    "Captain & crew · soft drinks · snacks · custom Bosphorus route",
                  ],
                  [
                    "Group Yacht — Standard (≤15 guests)",
                    "Up to 15 (40-guest yacht)",
                    "€380",
                    "€684",
                    "€1,368",
                    "Captain & crew · soft drinks · snacks · upper deck access",
                  ],
                  [
                    "Group Yacht — Signature (15–40 guests)",
                    "15 to 40",
                    "€500",
                    "€900",
                    "€1,800",
                    "Captain & crew · soft drinks · snacks · upper deck access",
                  ],
                  [
                    "Event Yacht — 90 guests",
                    "30 to 90",
                    "—",
                    "€1,200 (4h min)",
                    "€2,160",
                    "Captain & crew · event-class deck · catering & open bar by quote",
                  ],
                  [
                    "Mega Event Yacht — 150 guests",
                    "80 to 150",
                    "By quote",
                    "By quote",
                    "By quote",
                    "Captain & crew · gala-class vessel · full event production by quote",
                  ],
                ]}
              />
              <p className="mt-3 text-xs text-[var(--text-muted)]">
                Automatic 10% discount applied from 3 hours onward across the
                bookable fleet (Event Yacht discount kicks in from 5 hours).
                Catering, alcohol, DJ, photographer, and proposal styling are
                available as add-ons on every charter.
              </p>
            </div>
          </section>

          <section className="mt-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-2xl border border-[var(--brand-primary)]/10 bg-[var(--surface-alt)] p-5">
                <p className="text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)] mb-2">
                  Visible price
                </p>
                <p className="text-3xl font-bold text-[var(--heading)] mb-2">From EUR 200</p>
                <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                  Entry deck is a 10-guest sailing yacht on a two-hour Bosphorus loop. The fleet
                  steps up to mid-size group yachts and event-built decks; sailings of three hours
                  or longer drop a flat ten percent. Catering, bar service, DJ, and event styling
                  sit outside the deck price.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {routeProof.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] p-4"
                  >
                    <h3 className="text-base font-semibold text-[var(--heading)] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[var(--text-muted)]">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">
              Bosphorus yacht categories and price overview
            </h2>
            <p className="mb-4 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)]">
              The bookable fleet sorts into three categories by deck size. Use this overview to
              short-list the right tier before opening the full fleet section above.
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              {charterCategoryCards.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4"
                >
                  <p className="text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)] mb-2">
                    {item.price}
                  </p>
                  <h3 className="text-lg font-semibold text-[var(--heading)] mb-2">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">
              When private yacht charter in Istanbul is the better starting point
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {charterReasons.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4"
                >
                  <h3 className="text-base font-semibold text-[var(--heading)] mb-2">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">
              Compare yacht charter with related private Bosphorus formats
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {comparePages.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4 transition-colors hover:border-[var(--brand-primary)]/30 hover:bg-white"
                >
                  <h3 className="block text-base font-semibold text-[var(--heading)] mb-1">
                    {item.title}
                  </h3>
                  <span className="block text-sm leading-relaxed text-[var(--text-muted)]">
                    {item.description}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <RelatedTours exclude="yacht" heading="Other Bosphorus experiences" />
        </div>
      </div>
    </>
  );
}
