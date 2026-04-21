import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import TourDetailClient from "@/components/tours/TourDetailClient";
import { getTourBySlug, getTourPath, type Tour } from "@/data/tours";
import { SITE_URL } from "@/lib/constants";
import { resolveBookingPrefill } from "@/lib/booking-prefill";

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
  title: "Istanbul Dinner Cruise | Shared Bosphorus Dinner Tickets | MerrySails",
  description:
    "Shared Bosphorus dinner cruise in Istanbul with fixed packages, dinner service, and hotel pickup support for guests who want tickets instead of a private yacht.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title: "Istanbul Dinner Cruise | Shared Bosphorus Dinner Tickets | MerrySails",
    description:
      "Shared Bosphorus dinner cruise packages in Istanbul for guests who want a public evening on the water and an easier entry point than private charter.",
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
    title: "Istanbul Dinner Cruise | Shared Bosphorus Dinner Tickets | MerrySails",
    description:
      "Shared Bosphorus dinner cruise in Istanbul with public packages, dinner service, and hotel pickup support for guests who do not need a private yacht.",
    images: [dinnerTour.image],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: dinnerTour.nameEn,
  description: dinnerTour.description,
  serviceType: "Shared Bosphorus Dinner Cruise",
  url: canonicalUrl,
  provider: {
    "@id": `${SITE_URL}/#organization`,
  },
  areaServed: {
    "@type": "City",
    name: "Istanbul",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Dinner Cruise Packages",
    itemListElement: dinnerTour.packages?.map((pkg) => ({
      "@type": "Offer",
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
    { "@type": "ListItem", position: 2, name: "Cruises", item: `${SITE_URL}/cruises` },
    { "@type": "ListItem", position: 3, name: dinnerTour.nameEn, item: canonicalUrl },
  ],
};

const sharedDinnerReasons = [
  {
    title: "Shared Bosphorus evening",
    description:
      "Dinner, Bosphorus views, and a public cruise atmosphere without chartering the whole boat.",
  },
  {
    title: "Package-led night out",
    description:
      "A cleaner fit when you want to compare seating and inclusions first, then book the package that fits your budget.",
  },
  {
    title: "Simple for hotel guests",
    description:
      "One departure flow, a clear evening schedule, and no need to choose a private vessel.",
  },
];

const comparePages = [
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
    href: "/yacht-charter-istanbul",
    title: "Yacht Charter Istanbul",
    description:
      "Private yacht packages first, then food, drinks, and celebration extras.",
  },
  {
    href: "/proposal-yacht-rental-istanbul",
    title: "Proposal Yacht Rental Istanbul",
    description: "Privacy, timing, and a reveal-led plan.",
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
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
            <Link href="/cruises" className="hover:text-[var(--brand-primary)]">
              Cruises
            </Link>
            <span>/</span>
            <span className="text-[var(--heading)] truncate">{dinnerTour.nameEn}</span>
          </nav>

          <TourDetailClient
            tour={dinnerTour}
            related={relatedTours}
            bookingPrefill={await resolveBookingPrefill(resolvedSearchParams)}
          />

          <section className="mt-12 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)] mb-2">
                  Shared Dinner Cruise
                </p>
                <h2 className="text-2xl font-bold text-[var(--heading)] mb-2">
                  Dinner tickets, Bosphorus views, and a public evening on the water
                </h2>
                <p className="max-w-3xl text-sm leading-relaxed text-[var(--text-muted)]">
                  Shared dinner cruise packages suit guests who want a fixed evening schedule and
                  a lower entry point than private charter. If you want the whole yacht to
                  yourselves, compare the private dinner cruise, yacht charter, boat rental, or
                  proposal pages below.
                </p>
              </div>
              <Link href="/private-bosphorus-dinner-cruise" className="btn-secondary">
                Want the yacht to yourselves?
              </Link>
            </div>
          </section>

          <section className="mt-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
              <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">
              When the shared dinner cruise fits best
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
              Compare with private and proposal-led options
            </h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {comparePages.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4 transition-colors hover:border-[var(--brand-primary)]/30 hover:bg-white"
                >
                  <span className="block text-base font-semibold text-[var(--heading)] mb-1">
                    {item.title}
                  </span>
                  <span className="block text-sm leading-relaxed text-[var(--text-muted)]">
                    {item.description}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
