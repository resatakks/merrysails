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
    `Boat rental in Istanbul from EUR ${startingRate}/hour. Choose the boat and route first, then add dinner, sunset, proposal, or celebration extras.`,
  alternates: { canonical: `${SITE_URL}/boat-rental-istanbul` },
  openGraph: {
    title: `Boat Rental Istanbul 2026 — From EUR ${startingRate}/hour | MerrySails`,
    description:
      `Private Bosphorus boat rental from EUR ${startingRate}/hour with vessel-first planning, custom routes, and add-ons for dinner, sunset, and celebrations.`,
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
];

const comparePages = [
  {
    href: "/yacht-charter-istanbul",
    title: "Yacht Charter Istanbul",
    description: "Best if you want ready private yacht packages first instead of choosing the vessel yourself.",
  },
  {
    href: "/proposal-yacht-rental-istanbul",
    title: "Proposal Yacht Rental",
    description: "Best if the moment is built around a proposal reveal, privacy, and timing.",
  },
  {
    href: "/corporate-events",
    title: "Corporate Yacht Events",
    description: "Best if the booking is for a company dinner, client hosting, or a launch brief.",
  },
  {
    href: "/private-bosphorus-dinner-cruise",
    title: "Private Dinner Cruise",
    description: "Best if the whole evening should revolve around dinner on your own yacht.",
  },
];

export default function BoatRentalIstanbulPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

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
                Start here if you want a private boat first and want the route, timing, and boat
                size decided before you choose whether to add dinner or celebration extras.
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
              <h2 className="text-lg font-semibold text-[var(--heading)] mb-4">What helps us match the right boat first</h2>
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
            <h2 className="text-2xl font-bold mb-4 text-[var(--heading)]">When boat rental is the better starting point</h2>
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
              Fleet price ladder and vessel fit
            </h2>
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
            <h2 className="text-2xl font-bold mb-4 text-[var(--heading)]">Route and service proof</h2>
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
            <h2 className="text-2xl font-bold mb-4 text-[var(--heading)]">Need a different Bosphorus format?</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {comparePages.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl border border-gray-200 bg-[var(--surface-alt)] p-4 transition-colors hover:border-[var(--brand-primary)]/30 hover:bg-white"
                >
                  <span className="mb-1 block text-base font-semibold text-[var(--heading)]">{item.title}</span>
                  <span className="block text-sm text-[var(--text-muted)]">{item.description}</span>
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
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
        </div>
      </main>
    </>
  );
}
