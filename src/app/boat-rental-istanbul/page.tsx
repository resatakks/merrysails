import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fleet } from "@/data/fleet";
import { SITE_URL, WHATSAPP_URL } from "@/lib/constants";

export const revalidate = 3600;

const startingRate = Math.min(...fleet.map((boat) => boat.pricePerHour));

export const metadata: Metadata = {
  title: `Boat Rental Istanbul 2026 — From EUR ${startingRate}/hour | MerrySails`,
  description:
    `Boat rental and private boat hire in Istanbul from EUR ${startingRate}/hour. Choose the boat and route first, then add dinner, sunset, proposal, or celebration extras.`,
  alternates: { canonical: `${SITE_URL}/boat-rental-istanbul` },
  openGraph: {
    title: `Boat Rental Istanbul 2026 — From EUR ${startingRate}/hour | MerrySails`,
    description:
      `Private Bosphorus boat rental and private boat hire in Istanbul from EUR ${startingRate}/hour with vessel-first planning, custom routes, and add-ons for dinner, sunset, and celebrations.`,
    url: `${SITE_URL}/boat-rental-istanbul`,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Boat rental Istanbul — MerrySails",
      },
    ],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Boat Rental Istanbul",
  description:
    "Private Bosphorus boat rental in Istanbul for sightseeing cruises, sunset outings, birthdays, proposals, and flexible group trips.",
  provider: {
    "@id": `${SITE_URL}/#organization`,
  },
  areaServed: { "@type": "City", name: "Istanbul" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Boat Rental Formats",
    itemListElement: [
      { "@type": "Service", name: "Small Private Hire", description: "Compact private vessels for lighter Bosphorus requests." },
      { "@type": "Service", name: "Celebration Boat", description: "Private boats for birthdays, proposals, and evening gatherings on the Bosphorus." },
      { "@type": "Service", name: "Large Group Boat", description: "Larger private boats for family groups, friend gatherings, and hosted outings on the water." },
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does boat rental work on this site?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Boat rental starts with the kind of trip you want, such as sightseeing, sunset, celebration, or dinner. From there we match the right boat size, route, and duration to your group.",
      },
    },
    {
      "@type": "Question",
      name: "Is boat rental priced per person or per vessel?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Private boat rental is priced by boat and duration, with the final total shaped by boat size, route, timing, and any food or celebration extras you want on board.",
      },
    },
    {
      "@type": "Question",
      name: "When should I use boat rental instead of yacht charter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use boat rental when you want to start with the boat, route, and type of outing. Use yacht charter when you want to compare ready charter packages first, private dinner cruise when dinner is the main event, and the shared dinner cruise if you only need seats on a public evening cruise.",
      },
    },
    {
      "@type": "Question",
      name: "Where do private boat rentals usually depart from?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Private boat departures are planned around the selected vessel and operating plan. Many private Bosphorus outings use marina-based boarding on the European side, and the final boarding details are confirmed with the booking flow.",
      },
    },
    {
      "@type": "Question",
      name: "How long does a private boat rental last?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Boat rental duration depends on the vessel and the type of outing. Some groups book a short scenic run, while others extend the hire for dinner, sunset timing, or a longer private Bosphorus plan.",
      },
    },
    {
      "@type": "Question",
      name: "Can I add food, drinks, cake, or celebration extras?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Boat rental can stay simple as a private cruise, or it can include dinner, drinks, cake, flowers, music, and other celebration details depending on the vessel and event format.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Boat Rental Istanbul", item: `${SITE_URL}/boat-rental-istanbul` },
  ],
};

const priceLadder = fleet.map((boat) => ({
  title: boat.name,
  price: `From EUR ${boat.pricePerHour}/hour`,
  body: `${boat.type} for up to ${boat.capacity} guests.`,
}));

const vesselTypes = [
  {
    title: "Private sightseeing or sunset boat",
    body: "Best for couples, families, or friends who want a private Bosphorus ride with a simple route, photo stops, and time on the water.",
  },
  {
    title: "Celebration boat",
    body: "Best for birthdays, proposals, and longer evenings that may need dining, cake, flowers, music, or photo service.",
  },
  {
    title: "Larger private group boat",
    body: "Best for bigger family groups or friend gatherings that need more deck space, more seating, and a longer Bosphorus route.",
  },
];

const routeProof = [
  {
    title: "Start with the boat",
    body: "This page is for guests who want to choose the vessel and outing style before finalizing the route.",
  },
  {
    title: "Bosphorus-ready departures",
    body: "Private boat hires can be shaped around sunset, dinner, celebration, or a simple scenic cruise.",
  },
  {
    title: "Kuruçeşme Marina style planning",
    body: "The fleet is sized for private planning, so the right boat can be matched to the guest count and service plan.",
  },
];

const intentRows = [
  {
    query: "Private boat hire Istanbul",
    bestPage: "Boat Rental Istanbul",
    reason: "This page is the broader owner for flexible private boat hire before the brief narrows into hourly-only or occasion-led support.",
  },
  {
    query: "Boat rental hourly Istanbul",
    bestPage: "Boat Rental Hourly Istanbul",
    reason: "Use the narrower support page when the booking is clearly hour-led from the first click.",
  },
  {
    query: "Private yacht charter Istanbul",
    bestPage: "Yacht Charter Istanbul",
    reason: "Package-led private yacht demand should stay on the core yacht owner page instead of the flexible boat-hire page.",
  },
  {
    query: "Private dinner cruise Istanbul",
    bestPage: "Private Bosphorus Dinner Cruise",
    reason: "Dinner-led private evenings are different from vessel-first boat-hire intent.",
  },
];

const quoteDrivers = [
  "Date, start time, and whether sunset, dinner time, or night views matter most",
  "Guest count and whether the trip is for a couple, a family, or a larger private group",
  "Whether you want only cruising or also dinner, drinks, cake, flowers, or music",
  "Whether the trip fits better as boat rental, yacht charter, private dinner cruise, or a shared dinner cruise",
];

const faqItems = [
  {
    q: "How does boat rental work on this site?",
    a: "Boat rental starts with the kind of trip you want, such as sightseeing, sunset, celebration, or dinner. From there we match the right boat size, route, and duration to your group.",
  },
  {
    q: "Is boat rental priced per person or per vessel?",
    a: "Private boat rental is priced by boat and duration, with the final total shaped by boat size, route, timing, and any food or celebration extras you want on board.",
  },
  {
    q: "When should I use boat rental instead of yacht charter?",
    a: "Use boat rental when you want to start with the boat, route, and type of outing. Use yacht charter when you want to compare ready charter packages first, private dinner cruise when dinner is the main event, and the shared dinner cruise if you only need seats on a public evening cruise.",
  },
  {
    q: "Where do private boat rentals usually depart from?",
    a: "Private boat departures are planned around the selected vessel and operating plan. Many private Bosphorus outings use marina-based boarding on the European side, and the final boarding details are confirmed with the booking flow.",
  },
  {
    q: "How long does a private boat rental last?",
    a: "Boat rental duration depends on the vessel and the type of outing. Some groups book a short scenic run, while others extend the hire for dinner, sunset timing, or a longer private Bosphorus plan.",
  },
  {
    q: "Can I add food, drinks, cake, or celebration extras?",
    a: "Yes. Boat rental can stay simple as a private cruise, or it can include dinner, drinks, cake, flowers, music, and other celebration details depending on the vessel and event format.",
  },
];

const comparePages = [
  {
    href: "/boat-rental-hourly-istanbul",
    title: "Boat Rental Hourly Istanbul",
    description: "Best if the real search is per-hour private boat rental rather than a broader private-hire brief.",
  },
  {
    href: "/yacht-charter-istanbul",
    title: "Yacht Charter Istanbul",
    description: "Best if you want ready private yacht packages first instead of choosing the vessel yourself.",
  },
  {
    href: "/proposal-yacht-with-photographer-istanbul",
    title: "Proposal with Photographer",
    description: "Best if the moment is built around a proposal reveal with discreet coverage, privacy, and timing.",
  },
  {
    href: "/corporate-yacht-dinner-istanbul",
    title: "Corporate Yacht Dinner",
    description: "Best if the booking is specifically a dinner-led company evening rather than a broader event brief.",
  },
  {
    href: "/private-dinner-cruise-for-couples-istanbul",
    title: "Couples Private Dinner",
    description: "Best if the whole evening should revolve around a quieter dinner on your own yacht.",
  },
];

const formatComparison = [
  {
    title: "Boat rental Istanbul",
    body: "Start with the vessel, hourly logic, group size, and route direction first.",
  },
  {
    title: "Yacht charter Istanbul",
    body: "Start with package-led private charter options when you want the ready charter ladder first.",
  },
  {
    title: "Private dinner cruise",
    body: "Start here when dinner service is the main reason for the booking, not just the boat itself.",
  },
];

export default function BoatRentalIstanbulPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="pt-28 pb-20 bg-[var(--surface-alt)]">
        <div className="container-main">
          <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-start mb-14">
            <div>
              <p className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700 mb-4">
                Flexible private hire
              </p>
              <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[var(--heading)] leading-tight">
                Boat Rental Istanbul
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-[var(--text-muted)] mb-6">
                Start here if you want a private boat first and want the route, timing, boat size,
                and private boat hire format decided before you choose whether to add dinner or
                celebration extras.
              </p>
              <div className="mb-6 rounded-2xl border border-[var(--brand-primary)]/10 bg-white p-4">
                <p className="text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)] mb-1">
                  Visible price
                </p>
                <p className="text-3xl font-bold text-[var(--heading)]">From EUR {startingRate}/hour</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  Private boat hire is priced by vessel and duration. The final quote shifts with
                  guest count, route, and any dinner or celebration add-ons.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--brand-primary)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--brand-primary-hover)]"
                >
                  Ask about boat options <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border border-[var(--brand-primary)] px-6 py-3 font-semibold text-[var(--brand-primary)] transition-colors hover:bg-[var(--brand-primary)] hover:text-white"
                >
                  Ask on WhatsApp
                </a>
              </div>
            </div>

            <aside className="rounded-2xl border border-white bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-[var(--heading)] mb-4">What helps us match the right private boat hire in Istanbul first</h2>
              <ul className="space-y-3 text-sm text-[var(--text-muted)]">
                {quoteDrivers.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="font-bold text-[var(--brand-primary)]">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </section>

          <section className="mb-12 rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-2xl font-bold mb-4 text-[var(--heading)]">When boat rental in Istanbul is the better starting point</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {vesselTypes.map((item) => (
                <div key={item.title} className="rounded-xl border border-gray-100 bg-[var(--surface-alt)] p-4">
                  <h3 className="font-semibold text-[var(--heading)] mb-2">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12 rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-2xl font-bold mb-4 text-[var(--heading)]">
              Private boat hire Istanbul vs hourly rental vs yacht charter
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[var(--line)] text-[var(--heading)]">
                    <th className="px-4 py-3 font-semibold">Search intent</th>
                    <th className="px-4 py-3 font-semibold">Best page</th>
                    <th className="px-4 py-3 font-semibold">Why</th>
                  </tr>
                </thead>
                <tbody>
                  {intentRows.map((row) => (
                    <tr key={row.query} className="border-b border-[var(--line)] last:border-0">
                      <td className="px-4 py-3 text-[var(--heading)]">{row.query}</td>
                      <td className="px-4 py-3 font-medium text-[var(--brand-primary)]">{row.bestPage}</td>
                      <td className="px-4 py-3 text-[var(--text-muted)]">{row.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-12 rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-2xl font-bold mb-4 text-[var(--heading)]">Private boat hire Istanbul price ladder and vessel fit</h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {priceLadder.map((boat) => (
                <div key={boat.title} className="rounded-xl border border-gray-100 bg-[var(--surface-alt)] p-4">
                  <p className="text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)] mb-2">
                    {boat.price}
                  </p>
                  <h3 className="font-semibold text-[var(--heading)] mb-2">{boat.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{boat.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12 rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-2xl font-bold mb-4 text-[var(--heading)]">Bosphorus route and private boat service proof</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {routeProof.map((item) => (
                <div key={item.title} className="rounded-xl border border-gray-100 bg-[var(--surface-alt)] p-4">
                  <h3 className="font-semibold text-[var(--heading)] mb-2">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12 rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-2xl font-bold mb-4 text-[var(--heading)]">Boat rental vs yacht charter in Istanbul</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {formatComparison.map((item) => (
                <div key={item.title} className="rounded-xl border border-gray-100 bg-[var(--surface-alt)] p-4">
                  <h3 className="font-semibold text-[var(--heading)] mb-2">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{item.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)]">
              If you are mainly comparing ready private yacht packages, use{" "}
              <Link href="/yacht-charter-istanbul" className="font-semibold text-[var(--brand-primary)] hover:underline">
                Yacht Charter Istanbul
              </Link>
              . If the vessel and route come first, stay on this page and we will match the right private boat format.
            </p>
          </section>

          <section className="mb-12 rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-2xl font-bold mb-4 text-[var(--heading)]">Need a different Bosphorus format?</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {comparePages.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl border border-gray-200 bg-[var(--surface-alt)] p-4 transition-colors hover:border-[var(--brand-primary)]/30 hover:bg-white"
                >
                  <h3 className="mb-1 text-base font-semibold text-[var(--heading)]">{item.title}</h3>
                  <p className="text-sm text-[var(--text-muted)]">{item.description}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mb-12 rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6 text-[var(--heading)]">Boat rental FAQs</h2>
            <div className="space-y-4">
              {faqItems.map((faq) => (
                <details key={faq.q} className="rounded-xl border border-gray-200 bg-[var(--surface-alt)] p-4 group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[var(--heading)]">
                    {faq.q}
                    <span className="text-gray-400 transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="rounded-3xl bg-[var(--heading)] p-6 text-white md:p-8">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-white/60">
                  Next step
                </p>
                <h2 className="mb-3 text-2xl font-bold text-white md:text-3xl">
                  Still choosing between boat rental and yacht charter?
                </h2>
                <p className="max-w-2xl text-sm leading-relaxed text-white/75">
                  Send the guest count, date, and rough plan. We can either match a private boat or
                  move you to the yacht charter page if a package-led private Bosphorus experience
                  is the better fit.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-[var(--heading)] transition-colors hover:bg-white/90"
                >
                  Ask on WhatsApp
                </a>
                <Link
                  href="/yacht-charter-istanbul"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/35 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Compare yacht charter <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
