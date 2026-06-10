import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import TourDetailClient from "@/components/tours/TourDetailClient";
import { getTourBySlug, getTourPath, type Tour } from "@/data/tours";
import { SITE_URL, TURSAB_LICENSE_NUMBER } from "@/lib/constants";
import { resolveBookingPrefill } from "@/lib/booking-prefill";
import { buildHreflang } from "@/lib/hreflang";
import RelatedTours from "@/components/ui/RelatedTours";
import HowToGetThere from "@/components/tours/HowToGetThere";
import StickyMobileCta from "@/components/ui/StickyMobileCta";
import SocialProofBadges from "@/components/ui/SocialProofBadges";
import BookingMomentumBadge from "@/components/ui/BookingMomentumBadge";
import { getProductBookingMomentum } from "@/lib/booking-momentum";
import ReviewsCarousel from "@/components/ui/ReviewsCarousel";
import WeekdayDiscountBanner from "@/components/promo/WeekdayDiscountBanner";
import { getWeekdayDiscountStrings } from "@/components/promo/weekday-discount-strings";
import { OFFER_MERCHANT_DEFAULTS } from "@/lib/schema-merchant";
import { buildLocalBusinessSchema } from "@/lib/local-business-schema";
import {
  buildPricingTableSchema,
  buildReserveActionSchema,
} from "@/lib/travel-action-schema";
import PricingTable from "@/components/ai/PricingTable";
import ComparisonTable from "@/components/ai/ComparisonTable";
import QuickAnswer from "@/components/ai/QuickAnswer";
import { SITE_LAST_MODIFIED, SITE_PUBLISHED } from "@/lib/freshness";

export const revalidate = 3600;

const dinnerTour = getTourBySlug("bosphorus-dinner-cruise");

if (!dinnerTour) {
  throw new Error("Dinner cruise data is missing.");
}

const relatedTours: Tour[] = [
  getTourBySlug("bosphorus-sunset-cruise"),
  getTourBySlug("yacht-charter-in-istanbul"),
  getTourBySlug("private-bosphorus-dinner-yacht-cruise"),
  getTourBySlug("private-bosphorus-sunset-cruise"),
].filter((tour): tour is Tour => Boolean(tour));

const canonicalUrl = `${SITE_URL}${getTourPath(dinnerTour)}`;

export const metadata: Metadata = {
  title: "Istanbul Dinner Cruise — From €30",
  description:
    "Bosphorus dinner cruise Istanbul from EUR 30. Four shared packages with dinner, Turkish-night entertainment, and hotel pickup. TURSAB-licensed since 2001.",
  alternates: {
    canonical: canonicalUrl,
    languages: buildHreflang("/istanbul-dinner-cruise"),
  },
  openGraph: {
    title: "Istanbul Dinner Cruise — From €30",
    description:
      "Compare 4 Bosphorus dinner cruise packages in Istanbul with visible pricing, Turkish-night entertainment, and pickup support.",
    url: canonicalUrl,
    type: "website",
    images: [
      {
        url: dinnerTour.image,
        width: 1200,
        height: 630,
        alt: dinnerTour.nameEn,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Istanbul Dinner Cruise — From €30",
    description:
      "Shared Bosphorus dinner cruise packages from EUR 30 with dinner service, Turkish-night entertainment, and pickup support.",
    images: [dinnerTour.image],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": ["TouristTrip", "Service"],
  "@id": `${canonicalUrl}#trip`,
  name: dinnerTour.nameEn,
  alternateName: [
    "Istanbul Dinner Cruise",
    "Bosphorus Dinner Cruise",
    "Bosphorus Night Cruise with Dinner",
  ],
  description: dinnerTour.description,
  datePublished: SITE_PUBLISHED,
  dateModified: SITE_LAST_MODIFIED,
  touristType: "Cultural Tourism",
  url: canonicalUrl,
  image: dinnerTour.image,
  provider: {
    "@id": `${SITE_URL}/#organization`,
  },
  areaServed: {
    "@type": "City",
    name: "Istanbul",
  },
  tripOrigin: {
    "@type": "BoatTerminal",
    "@id": `${SITE_URL}/#kabatas-pier`,
    name: "Kabataş Cruise Terminal",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kabataş Iskelesi 1",
      addressLocality: "Beyoğlu",
      addressRegion: "Istanbul",
      postalCode: "34427",
      addressCountry: "TR",
    },
    geo: { "@type": "GeoCoordinates", latitude: 41.0335, longitude: 28.9913 },
  },
  subjectOf: {
    "@type": "BodyOfWater",
    name: "Bosphorus Strait",
    sameAs: "https://www.wikidata.org/wiki/Q83329",
  },
  potentialAction: {
    "@type": "ReserveAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/reservation?tour=dinner-cruise`,
      actionPlatform: [
        "http://schema.org/DesktopWebPlatform",
        "http://schema.org/MobileWebPlatform",
      ],
    },
    result: { "@type": "Reservation", name: "Dinner cruise reservation" },
  },
  offers: {
    "@type": "AggregateOffer",
    lowPrice: Math.min(...(dinnerTour.packages?.map((p) => p.price) ?? [dinnerTour.priceEur])),
    highPrice: Math.max(...(dinnerTour.packages?.map((p) => p.price) ?? [dinnerTour.priceEur])),
    priceCurrency: "EUR",
    offerCount: dinnerTour.packages?.length ?? 1,
    availability: "https://schema.org/InStock",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Dinner Cruise Packages",
    itemListElement: dinnerTour.packages?.map((pkg) => ({
      "@type": "Offer",
      ...OFFER_MERCHANT_DEFAULTS,
      name: pkg.name,
      price: pkg.price,
      priceCurrency: "EUR",
      itemOffered: {
        "@type": "Service",
        name: pkg.name,
        description: pkg.description,
      },
    })),
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: dinnerTour.faq?.map((item) => ({
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
    { "@type": "ListItem", position: 3, name: dinnerTour.nameEn, item: canonicalUrl },
  ],
};

const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": ["Restaurant", "FoodEstablishment"],
  "@id": `${SITE_URL}/istanbul-dinner-cruise#restaurant`,
  name: "MerrySails Istanbul Bosphorus Dinner Cruise",
  url: canonicalUrl,
  image: dinnerTour.image,
  telephone: "+905448989812",
  email: "info@merrysails.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Kabataş İskelesi",
    addressLocality: "Kabataş, Beşiktaş",
    addressRegion: "Istanbul",
    postalCode: "34357",
    addressCountry: "TR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 41.0378,
    longitude: 28.9978,
  },
  servesCuisine: ["Turkish", "Mediterranean"],
  priceRange: "€€–€€€",
  acceptsReservations: true,
  hasMenu: `${SITE_URL}/istanbul-dinner-cruise#menu`,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "20:30",
      closes: "00:00",
    },
  ],
  areaServed: {
    "@type": "City",
    name: "Istanbul",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: dinnerTour.rating,
    reviewCount: dinnerTour.reviewCount,
    bestRating: 5,
    worstRating: 1,
  },
  currenciesAccepted: "EUR",
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Live Entertainment", value: true },
    { "@type": "LocationFeatureSpecification", name: "Hotel Pickup", value: true },
    { "@type": "LocationFeatureSpecification", name: "Bosphorus Views", value: true },
  ],
};

const menuSchema = {
  "@context": "https://schema.org",
  "@type": "Menu",
  "@id": `${SITE_URL}/istanbul-dinner-cruise#menu`,
  name: "Bosphorus Dinner Cruise Menu",
  url: canonicalUrl,
  inLanguage: "en",
  hasMenuSection: [
    {
      "@type": "MenuSection",
      name: "Silver Dinner Cruise — Soft Drinks",
      description: "Standard seating package with full dinner service and unlimited soft drinks. From €30 per person.",
      offers: {
        "@type": "Offer",
        ...OFFER_MERCHANT_DEFAULTS,
        price: 30,
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        url: canonicalUrl,
      },
      hasMenuItem: [
        { "@type": "MenuItem", name: "Welcome Cocktail", description: "Non-alcoholic welcome drink on boarding" },
        { "@type": "MenuItem", name: "Cold Meze Spread (10 varieties)", description: "Yaprak sarma (stuffed vine leaves), hummus, tarama, shepherd's salad, roasted red pepper, cacık, eggplant salad, white bean salad, white cheese, seasonal pickles" },
        { "@type": "MenuItem", name: "Fresh Seasonal Salad" },
        { "@type": "MenuItem", name: "Hot Starter" },
        { "@type": "MenuItem", name: "Main Course (live selection)", description: "Choice of fish, chicken, or meat; vegetarian grilled vegetable plate or pasta available on request" },
        { "@type": "MenuItem", name: "Baklava", description: "Flaky pistachio and honey syrup pastry" },
        { "@type": "MenuItem", name: "Fresh Fruit Plate with Turkish Coffee or Tea" },
        { "@type": "MenuItem", name: "Unlimited Soft Drinks", description: "Includes soft drinks and tea throughout the cruise" },
      ],
    },
    {
      "@type": "MenuSection",
      name: "Silver Dinner Cruise — Alcoholic",
      description: "Standard seating package with full dinner service and local alcoholic drinks. From €45 per person.",
      offers: {
        "@type": "Offer",
        ...OFFER_MERCHANT_DEFAULTS,
        price: 45,
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        url: canonicalUrl,
      },
      hasMenuItem: [
        { "@type": "MenuItem", name: "Full Silver Dinner Menu", description: "Same multi-course dinner as Silver Soft Drinks" },
        { "@type": "MenuItem", name: "2 Glasses Local Alcoholic Drinks", description: "Local wine or beer included; imported drinks available at extra charge" },
      ],
    },
    {
      "@type": "MenuSection",
      name: "Gold Dinner Cruise — Soft Drinks",
      description: "VIP stage-close table with expanded dinner menu and unlimited soft drinks. From €80 per person.",
      offers: {
        "@type": "Offer",
        ...OFFER_MERCHANT_DEFAULTS,
        price: 80,
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        url: canonicalUrl,
      },
      hasMenuItem: [
        { "@type": "MenuItem", name: "Guaranteed VIP Table (stage-close)", description: "Priority placement within 5 metres of the stage" },
        { "@type": "MenuItem", name: "Expanded VIP Dinner Menu", description: "Additional starter choices and chef-attended main-course service" },
        { "@type": "MenuItem", name: "Unlimited Soft Drinks" },
      ],
    },
    {
      "@type": "MenuSection",
      name: "Gold Dinner Cruise — Unlimited Alcohol",
      description: "Best VIP table with premium dinner menu and unlimited local and imported alcoholic drinks. From €90 per person.",
      offers: {
        "@type": "Offer",
        ...OFFER_MERCHANT_DEFAULTS,
        price: 90,
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        url: canonicalUrl,
      },
      hasMenuItem: [
        { "@type": "MenuItem", name: "Best VIP Table (stage-close guaranteed)", description: "Top table placement with full stage visibility" },
        { "@type": "MenuItem", name: "Premium VIP Dinner Menu", description: "Full VIP menu with live chef service selection" },
        { "@type": "MenuItem", name: "Unlimited Local & Imported Alcoholic Drinks", description: "Includes raki, wine, beer, and spirits" },
        { "@type": "MenuItem", name: "Unlimited Soft Drinks" },
      ],
    },
  ],
};

const packageTableSchema = {
  "@context": "https://schema.org",
  "@type": "Table",
  name: "Istanbul Dinner Cruise package comparison 2026",
  about: "Side-by-side comparison of the four MerrySails Bosphorus dinner cruise packages — Silver Soft Drinks, Silver Alcoholic, Gold Soft Drinks, Gold Unlimited Alcohol — covering standard and Mon/Tue/Thu weekday prices, drinks tier, seating, show, and dinner inclusions.",
  url: canonicalUrl,
};

const eventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Istanbul Bosphorus Dinner Cruise",
  description: dinnerTour.description,
  image: dinnerTour.image,
  startDate: "2026-01-01T20:30:00+03:00",
  endDate: "2026-12-31T00:00:00+03:00",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  // 2026-06-06: upgraded to recurring Schedule array with full schema.org
  // byDay URIs + duration + start/end window. AI engines (Bing Copilot,
  // Google AI Overviews) use this to surface "tonight at 20:30" rich
  // results for "dinner cruise Istanbul" queries — competitors don't.
  eventSchedule: [
    {
      "@type": "Schedule",
      byDay: [
        "https://schema.org/Monday",
        "https://schema.org/Tuesday",
        "https://schema.org/Wednesday",
        "https://schema.org/Thursday",
        "https://schema.org/Friday",
        "https://schema.org/Saturday",
        "https://schema.org/Sunday",
      ],
      startTime: "20:30",
      endTime: "00:00",
      duration: "PT3H30M",
      scheduleTimezone: "Europe/Istanbul",
      repeatFrequency: "P1D",
      startDate: "2026-01-01",
      endDate: "2027-12-31",
    },
  ],
  location: {
    "@type": "Place",
    name: "Kabataş Pier — MerrySails",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kabataş İskelesi",
      addressLocality: "Kabataş, Beşiktaş",
      addressRegion: "Istanbul",
      postalCode: "34357",
      addressCountry: "TR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 41.0378,
      longitude: 28.9978,
    },
  },
  offers: {
    "@type": "Offer",
    ...OFFER_MERCHANT_DEFAULTS,
    url: "https://merrysails.com/istanbul-dinner-cruise",
    price: dinnerTour.priceEur,
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
    validFrom: "2026-01-01",
  },
  organizer: {
    "@type": "Organization",
    "@id": "https://merrysails.com/#organization",
    name: "MerrySails",
    url: "https://merrysails.com",
  },
  performer: {
    "@type": "Organization",
    "@id": "https://merrysails.com/#organization",
    name: "MerrySails",
    url: "https://merrysails.com",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: dinnerTour.rating,
    reviewCount: dinnerTour.reviewCount,
    bestRating: 5,
    worstRating: 1,
  },
};

const sharedDinnerReasons = [
  {
    title: "Turkish-night dinner program",
    description:
      "Dinner service, Bosphorus views, stage entertainment, and a public cruise atmosphere without chartering the whole boat.",
  },
  {
    title: "Compare dinner cruise packages by tier",
    description:
      "A cleaner fit when you want to compare seating and inclusions first, then book the package that fits your budget.",
  },
  {
    title: "Hotel pickup for Istanbul dinner cruise",
    description:
      "One departure flow, a clear evening schedule, and no need to choose a private vessel.",
  },
];

const aiCitationFacts = [
  {
    label: "Best fit",
    value:
      "Shared Bosphorus dinner cruise in Istanbul with dinner service, Turkish-night entertainment, and a fixed evening route.",
  },
  {
    label: "Typical duration",
    value: "Approximately 3.5 hours for the shared evening cruise.",
  },
  {
    label: "Current package ladder",
    value: "EUR 30, EUR 45, EUR 80, and EUR 90 package levels depending on seating and inclusions.",
  },
  {
    label: "Pickup logic",
    value:
      "Selected central European-side hotel pickup can be reviewed, but exact pickup or meeting-point details are confirmed in writing after booking.",
  },
];

const comparePages = [
  {
    href: "/turkish-night-dinner-cruise-istanbul",
    title: "Turkish Night Dinner Support",
    description:
      "Use this when the deciding question is the Turkish-night show format, package fit, and shared evening rhythm rather than private alternatives.",
  },
  {
    href: "/private-bosphorus-dinner-cruise",
    title: "Private Bosphorus Dinner Cruise",
    description:
      "Your own yacht, a quieter table, and a better fit for proposal, birthday, or anniversary dinners.",
  },
  {
    href: "/boat-rental-istanbul",
    title: "Boat Rental Istanbul",
    description:
      "A private boat first when route and vessel choice matter more than dinner tickets.",
  },
  {
    href: "/dinner-cruise-pickup-sultanahmet-taksim",
    title: "Sultanahmet & Taksim Pickup",
    description:
      "Use this when the shared dinner product is clear and the remaining question is central hotel pickup around Sultanahmet, Taksim, Sirkeci, or Karakoy.",
  },
  {
    href: "/yacht-charter-istanbul",
    title: "Yacht Charter Istanbul",
    description:
      "Private yacht packages first, then food, drinks, and celebration extras.",
  },
];

export default async function IstanbulDinnerCruisePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  if (!dinnerTour) {
    notFound();
  }

  const resolvedSearchParams = await searchParams;
  const momentum = await getProductBookingMomentum("bosphorus-dinner-cruise");

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
              pageUrl: `${SITE_URL}/istanbul-dinner-cruise`,
              priceRange: "€€-€€€ (€30-€90 per guest)",
              description:
                "Bosphorus dinner cruise with Turkish night show: Silver (€30-€45), Gold (€80-€90). 3.5-hour shared evening cruise with mezzes, main course, drinks, belly dance, DJ.",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {dinnerTour.faq && dinnerTour.faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildPricingTableSchema({
              name: "Bosphorus dinner cruise — package pricing",
              description:
                "Shared 3.5-hour dinner cruise on the Bosphorus with Turkish night show; four package tiers from Silver Soft Drinks to Gold Unlimited Alcohol.",
              pageUrl: `${SITE_URL}/istanbul-dinner-cruise`,
              rows: (dinnerTour.packages ?? []).map((pkg) => ({
                name: pkg.name,
                fromPrice: `From €${pkg.price}`,
                unit: "per guest",
                note: pkg.weekdayDiscount
                  ? `Mon/Tue/Thu €${pkg.weekdayDiscount.discountedPrice}`
                  : undefined,
                includes: pkg.description.slice(0, 60),
              })),
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildReserveActionSchema({
              productUrl: `${SITE_URL}/istanbul-dinner-cruise`,
              productName: "Bosphorus dinner cruise",
              fromPriceEur: 30,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(packageTableSchema) }}
      />

      <div className="pt-28 pb-20 bg-[var(--surface-alt)]">
        <div className="container-main">
          {/* 2026-06-05: removed page-level sr-only <h1> — TourDetailClient
              already renders the canonical visible <h1>. Two <h1> = Semrush fail. */}
          <QuickAnswer productKey="istanbul-dinner-cruise" locale="en" />
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
            <span className="text-[var(--heading)] truncate">{dinnerTour.nameEn}</span>
          </nav>

          {/* Above-fold trust row — surfaces 4.88/5 rating + TURSAB + 50k+
              guests + 3-min WhatsApp reply at top of pillar page. */}
          <SocialProofBadges variant="product" productKey="dinner" />

          <BookingMomentumBadge
            momentum={momentum}
            productLabel="dinner cruise"
            className="mb-6"
          />

          {dinnerTour.packages?.some((p) => p.weekdayDiscount) && (
            <WeekdayDiscountBanner
              packages={dinnerTour.packages}
              productName={dinnerTour.nameEn}
              strings={getWeekdayDiscountStrings("en")}
            />
          )}

          <TourDetailClient
            tour={dinnerTour}
            related={relatedTours}
            bookingPrefill={await resolveBookingPrefill(resolvedSearchParams)}
          />

          <div className="my-8">
            <HowToGetThere slug="bosphorus-dinner-cruise" />
          </div>

          <div className="my-8">
            <ReviewsCarousel productKey="dinner" />
          </div>

          <section className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-8">
            <h2 className="text-lg font-bold text-blue-900 mb-3">Quick Answer: Best Istanbul Dinner Cruise</h2>
            <p className="text-blue-800 text-sm mb-4">
              MerrySails offers Istanbul&apos;s top-rated Bosphorus dinner cruise from €30 per person — live Turkish music, 3-course dinner, open bar. Departs Kabataş nightly. MerrySails&apos; Bosphorus dinner cruise is rated 4.88 across 312 verified reviews, operated under TÜRSAB A-Group licence #14316 since 2001. Book direct, no OTA markup.
            </p>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>✔ Duration: 3 hours on the Bosphorus</li>
              <li>✔ Includes: 3-course dinner + open bar + live entertainment</li>
              <li>✔ Departure: Kabataş pier, central Istanbul</li>
              <li>✔ Price: from €30/person (packages available)</li>
              <li>✔ Hotel pickup available from central districts</li>
            </ul>
            <p className="text-xs text-blue-700 mt-3">Book direct: merrysails.com · WhatsApp: +90 544 898 98 12 · TURSAB #{TURSAB_LICENSE_NUMBER}</p>
          </section>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 my-4">
            <h3 className="font-semibold text-green-800">✓ Free Cancellation</h3>
            <p className="text-green-700 text-sm">
              Cancel up to 24 hours before departure for a full refund. No questions asked.
            </p>
          </div>

          <div className="my-4 flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-4 text-sm text-[var(--text-muted)] sm:flex-row sm:items-center sm:flex-wrap">
            <span className="font-semibold text-[var(--heading)]">Helpful resources:</span>
            <Link href="/bosphorus-cruise" className="font-semibold text-[var(--brand-primary)] hover:underline">
              All Bosphorus cruise options →
            </Link>
            <span className="hidden sm:inline">·</span>
            <Link href="/compare-bosphorus-cruises" className="font-semibold text-[var(--brand-primary)] hover:underline">
              Compare with Sunset & Yacht →
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
                  Best Istanbul Dinner Cruise on the Bosphorus — MerrySails
                </h2>
                <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                  MerrySails Istanbul Dinner Cruise is a shared 3.5-hour Bosphorus evening experience
                  from €30, with dinner service, Turkish-night entertainment, and skyline views. TURSAB
                  A-Group licensed since 2001, rated 4.88 from 312 reviews. Direct booking without
                  third-party commissions at merrysails.com.
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
              <Link href="/turkish-night-dinner-cruise-istanbul" className="text-sm font-semibold text-[var(--brand-primary)] hover:underline">
                Turkish night dinner support
              </Link>
              <Link href="/dinner-cruise-with-hotel-pickup-istanbul" className="text-sm font-semibold text-[var(--brand-primary)] hover:underline">
                Hotel pickup support
              </Link>
              <Link href="/dinner-cruise-pickup-sultanahmet-taksim" className="text-sm font-semibold text-[var(--brand-primary)] hover:underline">
                Sultanahmet & Taksim pickup
              </Link>
              <Link href="/kabatas-dinner-cruise-istanbul" className="text-sm font-semibold text-[var(--brand-primary)] hover:underline">
                Kabatas dinner boarding
              </Link>
            </div>
          </section>

          <section className="mt-12 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)] mb-2">
                  Bosphorus Dinner Cruise
                </p>
                <h2 className="text-2xl font-bold text-[var(--heading)] mb-2">
                  Istanbul Dinner Cruise Recommendations — 4 Packages Compared
                </h2>
                <p className="max-w-3xl text-sm leading-relaxed text-[var(--text-muted)]">
                  Shared dinner cruise packages suit guests who want a fixed evening schedule with
                  dinner service, Turkish-night entertainment, and Bosphorus views — starting at €30 per person.
                  For a fully private yacht dinner, compare the options below.
                </p>
              </div>
              <Link href="/private-bosphorus-dinner-cruise" className="btn-secondary">
                Want the yacht to yourselves?
              </Link>
            </div>

            {/* AI-extractable semantic comparison table — Perplexity / ChatGPT
                / Claude reproduce <table> markup verbatim, so the four
                published dinner packages live here in a single source of
                truth that includes price, drinks tier, seating, and show. */}
            <div className="mt-6">
              <ComparisonTable
                caption="Istanbul Bosphorus Dinner Cruise packages 2026 — Silver Soft Drinks (€30), Silver Alcoholic (€45 standard / €40 Mon–Tue–Thu), Gold Soft Drinks (€80 / €75 Mon–Tue–Thu), Gold Unlimited Alcohol (€90 / €85 Mon–Tue–Thu). Live Turkish-night show + DJ included on every tier. Hotel pickup from central European-side areas included on all tiers."
                ariaLabel="Dinner cruise packages comparison"
                minWidth="720px"
                headers={[
                  "Package",
                  "Price (standard)",
                  "Weekday price (Mon · Tue · Thu)",
                  "Drinks tier",
                  "Seating",
                  "Show",
                  "Dinner inclusions",
                ]}
                rows={[
                  [
                    "Silver — Soft Drinks",
                    "€30 / guest",
                    "€30 (entry tier — no extra discount)",
                    "Unlimited soft drinks + tea",
                    "Standard table assigned by crew",
                    "Turkish-night show + DJ",
                    "Welcome cocktail · 10 cold mezes · seasonal salad · hot starter · main course · baklava & fruit",
                  ],
                  [
                    "Silver — Alcoholic",
                    "€45 / guest",
                    "€40 / guest",
                    "2 glasses of local alcohol + soft drinks + tea",
                    "Standard table assigned by crew",
                    "Turkish-night show + DJ",
                    "Welcome cocktail · 10 cold mezes · seasonal salad · hot starter · main course · baklava & fruit",
                  ],
                  [
                    "Gold — Soft Drinks",
                    "€80 / guest",
                    "€75 / guest",
                    "Unlimited soft drinks",
                    "Guaranteed VIP table near stage",
                    "Turkish-night show + professional DJ",
                    "Welcome drink · Turkish appetizers · seasonal salads · hot starter · chef-served VIP main · baklava & fruit",
                  ],
                  [
                    "Gold — Unlimited Alcohol",
                    "€90 / guest",
                    "€85 / guest",
                    "Unlimited local & imported alcohol + soft drinks",
                    "Best VIP tables closest to stage",
                    "Turkish-night show + premium DJ set",
                    "Welcome drink · Turkish appetizers · mixed salads · hot starter · best VIP main · baklava & fruit",
                  ],
                ]}
              />
            </div>
          </section>

          <section className="mt-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">
              Why Choose the Shared Istanbul Dinner Cruise
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {sharedDinnerReasons.map((item) => (
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
              Istanbul Dinner Cruise vs. Private Bosphorus Dinner Options
            </h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {comparePages.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4 transition-colors hover:border-[var(--brand-primary)]/30 hover:bg-white"
                >
                  <h3 className="text-base font-semibold text-[var(--heading)] mb-1">
                    {item.title}
                  </h3>
                  <span className="block text-sm leading-relaxed text-[var(--text-muted)]">
                    {item.description}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* Featured reading — internal-link surface from pillar to high-intent
              decision/planning posts. Anchor text uses descriptive titles rather
              than exact-match keywords (SEO best practice: anchor variety). */}
          <section className="mt-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">Plan your dinner cruise — 2026 reading list</h2>
            <p className="text-sm text-[var(--text-muted)] mb-6">Operator-side guides for booking the right package, choosing the boarding pier, and what to expect on the evening.</p>
            <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <li>
                <Link href="/blog/best-istanbul-bosphorus-cruise-comparison-2026" className="block rounded-xl border border-[var(--line)] p-4 transition-colors hover:border-[var(--brand-primary)]/40 hover:bg-[var(--surface-alt)]">
                  <span className="block font-semibold text-[var(--heading)]">Sunset vs Dinner vs Yacht — which one fits</span>
                  <span className="mt-1 block text-sm text-[var(--text-muted)]">Honest comparison of the three flagship formats with real direct prices.</span>
                </Link>
              </li>
              <li>
                <Link href="/blog/book-bosphorus-cruise-direct-save-2026" className="block rounded-xl border border-[var(--line)] p-4 transition-colors hover:border-[var(--brand-primary)]/40 hover:bg-[var(--surface-alt)]">
                  <span className="block font-semibold text-[var(--heading)]">Save €5–€15 by booking direct, not via Viator</span>
                  <span className="mt-1 block text-sm text-[var(--text-muted)]">Where OTA markups land and how to skip them on the same boats.</span>
                </Link>
              </li>
              <li>
                <Link href="/blog/istanbul-airport-to-bosphorus-cruise-transfer-guide" className="block rounded-xl border border-[var(--line)] p-4 transition-colors hover:border-[var(--brand-primary)]/40 hover:bg-[var(--surface-alt)]">
                  <span className="block font-semibold text-[var(--heading)]">Airport to Kabataş — transfer timing</span>
                  <span className="mt-1 block text-sm text-[var(--text-muted)]">IST and SAW transit times for same-day cruise planning.</span>
                </Link>
              </li>
              <li>
                <Link href="/blog/what-to-wear-bosphorus-cruise-by-season" className="block rounded-xl border border-[var(--line)] p-4 transition-colors hover:border-[var(--brand-primary)]/40 hover:bg-[var(--surface-alt)]">
                  <span className="block font-semibold text-[var(--heading)]">What to wear — by season, with deck temps</span>
                  <span className="mt-1 block text-sm text-[var(--text-muted)]">Month-by-month dress code and the wind-chill reality.</span>
                </Link>
              </li>
              <li>
                <Link href="/blog/istanbul-3-day-itinerary-bosphorus-cruise-2026" className="block rounded-xl border border-[var(--line)] p-4 transition-colors hover:border-[var(--brand-primary)]/40 hover:bg-[var(--surface-alt)]">
                  <span className="block font-semibold text-[var(--heading)]">3-Day Istanbul itinerary with the cruise as finale</span>
                  <span className="mt-1 block text-sm text-[var(--text-muted)]">Day-by-day plan ending with the cruise as the Day 3 evening.</span>
                </Link>
              </li>
              <li>
                <Link href="/blog/bosphorus-cruise-new-year-eve-istanbul-2026-2027" className="block rounded-xl border border-[var(--line)] p-4 transition-colors hover:border-[var(--brand-primary)]/40 hover:bg-[var(--surface-alt)]">
                  <span className="block font-semibold text-[var(--heading)]">New Year's Eve 2026/27 dinner cruise</span>
                  <span className="mt-1 block text-sm text-[var(--text-muted)]">Special-evening pricing, fireworks viewing zone, booking deadline.</span>
                </Link>
              </li>
            </ul>
          </section>

          <RelatedTours exclude="dinner" heading="Other Bosphorus experiences" />
        </div>
      </div>
      <StickyMobileCta
        reserveHref={`/reservation?tour=${dinnerTour.slug}#core-booking-planner`}
        reserveLabel={`Reserve from €${dinnerTour.priceEur}`}
        whatsappLocation="istanbul_dinner_cruise_pillar"
        whatsappPrefill={`Hi MerrySails! I'm interested in the Bosphorus Dinner Cruise (from €${dinnerTour.priceEur}). What dates work and which package fits us best?`}
      />
    </>
  );
}
