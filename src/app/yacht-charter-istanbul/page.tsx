import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import TourDetailClient from "@/components/tours/TourDetailClient";
import { getTourBySlug, getTourPath, type Tour } from "@/data/tours";
import { SITE_URL } from "@/lib/constants";
import { parseBookingPrefill } from "@/lib/booking-prefill";

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
  title: "Yacht Charter Istanbul 2026 — From EUR 280 | MerrySails",
  description:
    "Private yacht charter in Istanbul from EUR 280. Compare Essential, Premium, and VIP yacht packages, then add sunset, dinner, proposal, or corporate extras.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title: "Yacht Charter Istanbul 2026 — From EUR 280 | MerrySails",
    description:
      "Choose private yacht charter packages in Istanbul from EUR 280, with private Bosphorus route planning, booking-specific marina confirmation, and event add-ons.",
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
    title: "Yacht Charter Istanbul 2026 — From EUR 280 | MerrySails",
    description:
      "Private Bosphorus yacht charter from EUR 280 with Essential, Premium, and VIP packages plus proposal, dinner, sunset, and corporate add-ons.",
    images: [yachtTour.image],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: yachtTour.nameEn,
  description: yachtTour.description,
  serviceType: "Private Yacht Charter",
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
    name: "Yacht Charter Packages",
    itemListElement: yachtTour.packages?.map((pkg) => ({
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
    { "@type": "ListItem", position: 2, name: "Cruises", item: `${SITE_URL}/cruises` },
    { "@type": "ListItem", position: 3, name: yachtTour.nameEn, item: canonicalUrl },
  ],
};

const charterReasons = [
  {
    title: "Private yacht packages first",
    description:
      "Choose yacht charter when you want a private yacht first and want to compare package levels before deciding on route or extras.",
  },
  {
    title: "Sunset or celebration add-ons",
    description:
      "It fits birthdays, family gatherings, and friend groups that want a private yacht first and then add food, drinks, or decor.",
  },
  {
    title: "Longer hosted outing",
    description:
      "It also suits guests who want more time on the water, more space for their group, and a charter that can grow with extras.",
  },
];

const charterPriceCards =
  yachtTour.packages?.map((pkg) => ({
    title: pkg.name,
    price: `EUR ${pkg.price}`,
    body: pkg.description,
  })) ?? [];

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
    title: "2-hour core charter",
    body: "The starter package ladder is built on a 2-hour private charter, then extends with add-ons if needed.",
  },
];

const comparePages = [
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
      {yachtTour.faq && yachtTour.faq.length > 0 && (
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
            <span className="text-[var(--heading)] truncate">{yachtTour.nameEn}</span>
          </nav>

          <TourDetailClient
            tour={yachtTour}
            related={relatedTours}
            bookingPrefill={parseBookingPrefill(resolvedSearchParams)}
          />

          <section className="mt-12 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)] mb-2">
                  Private Yacht Charter
                </p>
                <h2 className="text-2xl font-bold text-[var(--heading)] mb-2">
                  Choose the private yacht package, then shape the cruise around your group
                </h2>
                <p className="max-w-3xl text-sm leading-relaxed text-[var(--text-muted)]">
                  This page fits guests who already know they want a private yacht and want to
                  compare charter packages first. Use boat rental if you want to begin with vessel
                  type and route, private dinner cruise if dinner is the focus, and the shared
                  dinner cruise page if you only need seats on a public cruise.
                </p>
              </div>
              <Link href="/private-bosphorus-dinner-cruise" className="btn-secondary">
                Need dinner to be the focus?
              </Link>
            </div>
          </section>

          <section className="mt-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-2xl border border-[var(--brand-primary)]/10 bg-[var(--surface-alt)] p-5">
                <p className="text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)] mb-2">
                  Visible price
                </p>
                <p className="text-3xl font-bold text-[var(--heading)] mb-2">From EUR 280</p>
                <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                  The ladder starts at Essential, then moves to Premium and VIP. That keeps the
                  yacht choice clear before you add food, drinks, transfer, or event styling.
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
              Yacht packages and price ladder
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {charterPriceCards.map((item) => (
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
              When yacht charter is the better starting point
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
              Compare yacht charter with the other Bosphorus formats
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
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
