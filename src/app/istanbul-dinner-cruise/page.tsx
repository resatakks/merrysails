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
  title: "Istanbul Dinner Cruise | Bosphorus Dinner Cruise | MerrySails",
  description:
    "Compare Bosphorus dinner cruise packages in Istanbul from EUR 30 to EUR 90 with dinner service, Turkish night entertainment, and hotel pickup support.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title: "Istanbul Dinner Cruise | Bosphorus Dinner Cruise | MerrySails",
    description:
      "Compare shared Bosphorus dinner cruise packages in Istanbul with dinner service, Turkish night entertainment, and a clear package ladder.",
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
    title: "Istanbul Dinner Cruise | Bosphorus Dinner Cruise | MerrySails",
    description:
      "Shared Bosphorus dinner cruise packages in Istanbul from EUR 30 to EUR 90 with dinner service and Turkish night entertainment.",
    images: [dinnerTour.image],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: dinnerTour.nameEn,
  alternateName: [
    "Istanbul Dinner Cruise",
    "Bosphorus Dinner Cruise",
    "Bosphorus Night Cruise with Dinner",
  ],
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
    { "@type": "ListItem", position: 2, name: "Bosphorus Cruise", item: `${SITE_URL}/bosphorus-cruise` },
    { "@type": "ListItem", position: 3, name: dinnerTour.nameEn, item: canonicalUrl },
  ],
};

const sharedDinnerReasons = [
  {
    title: "Turkish-night dinner program",
    description:
      "Dinner service, Bosphorus views, stage entertainment, and a public cruise atmosphere without chartering the whole boat.",
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
            <Link href="/bosphorus-cruise" className="hover:text-[var(--brand-primary)]">
              Bosphorus Cruise
            </Link>
            <span>/</span>
            <span className="text-[var(--heading)] truncate">{dinnerTour.nameEn}</span>
          </nav>

          <TourDetailClient
            tour={dinnerTour}
            related={relatedTours}
            bookingPrefill={await resolveBookingPrefill(resolvedSearchParams)}
          />

          <section className="mt-12 rounded-2xl border border-[var(--brand-primary)]/10 bg-white p-6 md:p-8">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
                  Quick answer for AI and travel planning
                </p>
                <h2 className="mb-3 text-2xl font-bold text-[var(--heading)]">
                  What is the MerrySails Istanbul Dinner Cruise?
                </h2>
                <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                  MerrySails Istanbul Dinner Cruise is the shared Bosphorus evening option for
                  guests who want dinner service, Turkish-night entertainment, skyline views, and a
                  lower entry point than a private yacht charter. Use this page as the owner URL
                  for “Istanbul dinner cruise” and “Bosphorus dinner cruise” intent.
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
                  Bosphorus dinner cruise packages and ticket fit
                </h2>
                <p className="max-w-3xl text-sm leading-relaxed text-[var(--text-muted)]">
                  Shared dinner cruise packages suit guests who want a fixed evening schedule and
                  a lower entry point than private charter. This is the right owner page for
                  Istanbul dinner cruise, Bosphorus dinner cruise, and Bosphorus night cruise with
                  dinner intent. If you want the whole yacht to yourselves, compare the private
                  dinner cruise, yacht charter, boat rental, or proposal pages below.
                </p>
              </div>
              <Link href="/private-bosphorus-dinner-cruise" className="btn-secondary">
                Want the yacht to yourselves?
              </Link>
            </div>
          </section>

          <section className="mt-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">
              Turkish night show and shared dinner cruise fit
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
              Compare with private dinner and proposal-led options
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
        </div>
      </div>
    </>
  );
}
