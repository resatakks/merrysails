import type { Metadata } from "next";
import Link from "next/link";
import TrackedContactLink from "@/components/analytics/TrackedContactLink";

import { buildHreflang } from "@/lib/hreflang";

const SITE_URL = "https://merrysails.com";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Marriage Proposal Yacht Rental Istanbul 2026 | Private Bosphorus Proposal",
  description:
    "Book a marriage proposal yacht rental in Istanbul with a private Bosphorus route, sunset timing, flowers, dinner, and photographer add-ons for a discreet reveal.",
  alternates: {
    canonical: `${SITE_URL}/proposal-yacht-rental-istanbul`,
    languages: buildHreflang("/proposal-yacht-rental-istanbul"),
  },
  openGraph: {
    title: "Marriage Proposal Yacht Rental Istanbul 2026 | Private Bosphorus Proposal",
    description:
      "Private Bosphorus proposal yacht with sunset timing, decoration, dinner, and photographer add-ons for a clean marriage proposal setup.",
    url: `${SITE_URL}/proposal-yacht-rental-istanbul`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
  },
};

const faqItems = [
  {
    q: "What makes this different from a standard yacht charter?",
    a: "The booking is built around the reveal moment first, so privacy, route timing, and setup details are shaped around the proposal instead of a general outing.",
  },
  {
    q: "How much does it cost?",
    a: "Proposal yacht pricing depends on the yacht type, timing, privacy level, and the styling or photography add-ons needed for the reveal.",
  },
  {
    q: "Can you arrange flowers, photographer, or violinist?",
    a: "Yes. Proposal decoration, bouquet, photographer, videographer, violinist, cake, and dinner styling can be arranged.",
  },
  {
    q: "What route usually suits a proposal?",
    a: "Sunset proposals often work well around Ortakoy and the first Bosphorus Bridge, while evening proposals may suit quieter stretches and bridge lights.",
  },
  {
    q: "Should I compare this with dinner cruise or private events?",
    a: "Yes. Use the private dinner cruise when dinner is the main format, yacht charter when the yacht package comes first, and private events when the booking is broader than one proposal moment.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Proposal Yacht Rental Istanbul",
  description:
    "Private yacht rental on the Bosphorus for marriage proposals, romantic setups, and premium proposal planning in Istanbul.",
  url: `${SITE_URL}/proposal-yacht-rental-istanbul`,
  image: `${SITE_URL}/og-image.jpg`,
  openingHours: "Mo-Su 00:00-23:59",
  provider: {
    "@id": `${SITE_URL}/#organization`,
  },
  areaServed: { "@type": "City", name: "Istanbul" },
  serviceType: "Proposal Yacht Rental",
  offers: {
    "@type": "Offer",
    priceCurrency: "EUR",
    price: "280",
    availability: "https://schema.org/InStock",
    validFrom: "2026-01-01",
    url: `${SITE_URL}/proposal-yacht-rental-istanbul`,
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Proposal Yacht Rental Istanbul", item: `${SITE_URL}/proposal-yacht-rental-istanbul` },
  ],
};

const fitCards = [
  {
    title: "Sunset proposal",
    description: "Best when you want the reveal to happen with soft light and bridge views behind you.",
  },
  {
    title: "Private couple setup",
    description: "Best when the moment should stay couple-only and quiet until the reveal.",
  },
  {
    title: "Proposal with styling",
    description: "Best when flowers, table styling, cake, or a violinist are part of the plan.",
  },
  {
    title: "Dinner-led proposal",
    description: "Best when the proposal should happen inside a longer dinner setup rather than a short cruise.",
  },
];

const quoteDrivers = [
  {
    title: "Timing window",
    description: "Short sunset moments and longer dinner proposals are priced differently.",
  },
  {
    title: "Setup level",
    description: "Flowers only, full styling, or photography support all change the package.",
  },
  {
    title: "Guest count",
    description: "Couple-only proposals and family-included proposals need different yacht layouts and timing.",
  },
  {
    title: "Dinner or no dinner",
    description: "A short reveal and a dinner-led proposal do not use the same yacht and service setup.",
  },
];

const quickFacts = [
  ["Best for", "Marriage proposal plans where privacy, timing, and styling matter more than a generic yacht ride."],
  ["Typical timing", "Sunset proposal routes and evening dinner proposals are the two most common planning formats."],
  ["Quote variables", "Yacht class, guest count, flowers, photographer, dinner, violinist, and route length."],
  ["Best next step", "Send the preferred date, rough timing, and setup level so the team can match the right yacht."],
];

const comparePages = [
  {
    href: "/proposal-yacht-with-photographer-istanbul",
    title: "Proposal Yacht with Photographer",
    description: "Use this when discreet reveal coverage and couple portraits are a major part of the booking brief.",
  },
  {
    href: "/private-dinner-cruise-for-couples-istanbul",
    title: "Couples Private Dinner",
    description: "Dinner-led evenings with a proposal later in the plan and a quieter couple-first setup.",
  },
  {
    href: "/yacht-charter-istanbul",
    title: "Yacht Charter Istanbul",
    description: "Private yacht packages first when you are still comparing size, route length, and charter style.",
  },
  {
    href: "/private-events",
    title: "Private Events",
    description: "A better fit when the occasion is a wider celebration rather than one proposal moment.",
  },
  {
    href: "/boat-rental-hourly-istanbul",
    title: "Boat Rental Hourly",
    description: "A good starting point when the vessel and shorter hour-led route come before the event format.",
  },
];

export default function ProposalYachtRentalIstanbulPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <main className="max-w-5xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-500 mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li>
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-800 font-medium">Proposal Yacht Rental Istanbul</li>
          </ol>
        </nav>

        <section className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] items-start mb-12">
          <div>
            <p className="inline-flex rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-rose-700 mb-4">
              Proposal yacht rental
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Proposal Yacht Rental Istanbul
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-6 max-w-2xl">
              A proposal yacht rental in Istanbul keeps the reveal private, the timing controlled,
              and the setup focused on the moment itself. Built for proposals where the reveal is
              the booking, not an add-on.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-rose-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-rose-700"
              >
                Request proposal quote
              </Link>
              <TrackedContactLink
                href="https://wa.me/905370406822"
                kind="whatsapp"
                label="proposal_page_whatsapp_hero"
                location="proposal_page"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-rose-600 px-6 py-3 font-semibold text-rose-600 transition-colors hover:bg-rose-50"
              >
                Plan on WhatsApp
              </TrackedContactLink>
            </div>
          </div>

          <aside className="rounded-2xl border border-rose-100 bg-rose-50 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">What helps us quote your proposal yacht rental quickly</h2>
            <ul className="space-y-3 text-sm text-gray-700">
              {[
                "Preferred proposal date and sunset vs evening timing",
                "Guest count and whether anyone else joins after the reveal",
                "Setup level: flowers, photographer, violinist, cake, or full styling",
                "Quiet stop, bridge lights, or dinner-led proposal format",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="font-bold text-rose-600">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </aside>
        </section>

        <section className="mb-12 rounded-2xl border border-rose-100 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Marriage proposal yacht rental Istanbul quick facts</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {quickFacts.map(([label, value]) => (
              <div key={label} className="rounded-xl border border-rose-100 bg-rose-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-rose-700 mb-1">{label}</p>
                <p className="text-sm leading-relaxed text-gray-700">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12 rounded-2xl border border-rose-100 bg-rose-50 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">When a proposal yacht rental in Istanbul makes sense</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {fitCards.map((item) => (
              <div key={item.title} className="rounded-xl border border-white bg-white p-4 shadow-sm">
                <h3 className="text-base font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12 rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What changes the proposal yacht rental price</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {quoteDrivers.map((item) => (
              <div key={item.title} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Compare with related private Bosphorus bookings</h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {comparePages.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl border border-gray-200 bg-gray-50 p-4 transition-colors hover:border-rose-200 hover:bg-rose-50"
              >
                <h3 className="text-base font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-12 rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Proposal yacht FAQs</h2>
          <div className="space-y-4">
            {faqItems.map((faq) => (
              <details key={faq.q} className="rounded-xl border border-gray-200 bg-gray-50 p-4 group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-gray-900">
                  {faq.q}
                  <span className="text-gray-400 transition-transform group-open:rotate-180">▼</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="rounded-3xl bg-rose-600 p-8 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">Plan the proposal with us</h2>
          <p className="text-rose-100 mb-6 max-w-2xl mx-auto">
            Send the date, your ideal timing, and the level of setup you want, and we&apos;ll return yacht options that suit the proposal plan.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-rose-700 transition-colors hover:bg-rose-50"
            >
              Request quote
            </Link>
            <TrackedContactLink
              href="https://wa.me/905370406822"
              kind="whatsapp"
              label="proposal_page_whatsapp_footer"
              location="proposal_page"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-white px-6 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-rose-700"
            >
              WhatsApp
            </TrackedContactLink>
          </div>
        </div>
      </main>
    </>
  );
}
