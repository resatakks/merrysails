import type { Metadata } from "next";
import Link from "next/link";
import TrackedContactLink from "@/components/analytics/TrackedContactLink";

import { buildHreflang } from "@/lib/hreflang";

const SITE_URL = "https://merrysails.com";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Private Bosphorus Dinner Cruise | Private Yacht Dinner in Istanbul | MerrySails",
  description:
    "Private Bosphorus dinner cruise in Istanbul for couples and small groups who want their own yacht, a private dinner table, and a route timed for sunset or city lights.",
  alternates: {
    canonical: `${SITE_URL}/private-bosphorus-dinner-cruise`,
    languages: buildHreflang("/private-bosphorus-dinner-cruise"),
  },
  openGraph: {
    title: "Private Bosphorus Dinner Cruise | Private Yacht Dinner in Istanbul | MerrySails",
    description:
      "Private yacht dinner on the Bosphorus for proposals, birthdays, anniversaries, and small groups that want a private table and a calm evening route.",
    url: `${SITE_URL}/private-bosphorus-dinner-cruise`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
  },
};

const faqItems = [
  {
    q: "What makes this different from a shared dinner cruise?",
    a: "The yacht is reserved for your group only, so dinner, timing, and onboard atmosphere are shaped around your table instead of a shared seating plan.",
  },
  {
    q: "How many guests fit best?",
    a: "Couples and small groups are the cleanest fit. The right yacht depends on guest count, table layout, and how much open deck space you want.",
  },
  {
    q: "Can you arrange proposal or birthday details?",
    a: "Yes. Flowers, cake, photographer, violinist, and table styling can all be arranged on board.",
  },
  {
    q: "Can the dinner stay simple?",
    a: "Yes. If you only want a private table, a clear route, and a quiet evening on the water, we can keep the setup understated.",
  },
  {
    q: "Which pages should I compare before booking?",
    a: "If dinner is not the only priority, compare this page with the shared Bosphorus dinner cruise, yacht charter Istanbul, or proposal yacht rental Istanbul pages.",
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
  name: "Private Bosphorus Dinner Cruise",
  description:
    "Private yacht dinner cruise in Istanbul for couples, proposals, birthdays, anniversaries, and small groups who want dinner on their own Bosphorus yacht.",
  url: `${SITE_URL}/private-bosphorus-dinner-cruise`,
  image: `${SITE_URL}/og-image.jpg`,
  openingHours: "Mo-Su 00:00-23:59",
  provider: {
    "@id": `${SITE_URL}/#organization`,
  },
  areaServed: { "@type": "City", name: "Istanbul" },
  serviceType: "Private Yacht Dinner Cruise",
  offers: {
    "@type": "Offer",
    priceCurrency: "EUR",
    price: "280",
    availability: "https://schema.org/InStock",
    validFrom: "2026-01-01",
    url: `${SITE_URL}/yacht-charter-istanbul`,
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Private Bosphorus Dinner Cruise", item: `${SITE_URL}/private-bosphorus-dinner-cruise` },
  ],
};

const fitCards = [
  {
    title: "Private dinner for two",
    description: "Best for couples who want their own table, bridge views, and a slower rhythm than a shared cruise.",
  },
  {
    title: "Proposal dinner on the Bosphorus",
    description: "Best when the meal, route, flowers, and photo moments need to stay focused on one private reveal.",
  },
  {
    title: "Birthday or anniversary table",
    description: "Best when dinner, cake, music, and celebration mood matter more than a public cruise atmosphere.",
  },
  {
    title: "Private family or friend dinner",
    description: "Best for smaller groups who want to dine together on the Bosphorus without sharing the yacht.",
  },
];

const quoteDrivers = [
  {
    title: "Guest count and yacht size",
    description: "The right vessel, table layout, and service style start with how many guests will be on board.",
  },
  {
    title: "Dinner style",
    description: "Menu choice, drinks, cake, flowers, and table styling all shape the final quote.",
  },
  {
    title: "Timing on the Bosphorus",
    description: "Sunset light, bridge lights, and how long you want to stay on the water help define the best departure slot.",
  },
  {
    title: "Celebration details",
    description: "Proposal, birthday, anniversary, or a simple private dinner each call for a different onboard setup.",
  },
];

const comparePages = [
  {
    href: "/private-dinner-cruise-for-couples-istanbul",
    title: "Private Dinner for Couples",
    description: "A narrower support page for date nights, anniversaries, and quieter couple-led private dinner intent.",
  },
  {
    href: "/istanbul-dinner-cruise",
    title: "Istanbul Dinner Cruise",
    description: "Shared tickets, fixed packages, and a lower entry price than a private yacht.",
  },
  {
    href: "/boat-rental-istanbul",
    title: "Boat Rental Istanbul",
    description: "A private boat first, then dinner or celebrations if you want to build the evening yourself.",
  },
  {
    href: "/yacht-charter-istanbul",
    title: "Yacht Charter Istanbul",
    description: "Private yacht packages first, then route and add-ons.",
  },
  {
    href: "/proposal-yacht-with-photographer-istanbul",
    title: "Proposal Yacht with Photographer",
    description: "Reveal timing, discreet coverage, and privacy centered on the proposal.",
  },
];

export default function PrivateBosphorusDinnerCruisePage() {
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
            <li className="text-gray-800 font-medium">Private Bosphorus Dinner Cruise</li>
          </ol>
        </nav>

        <section className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] items-start mb-12">
          <div>
            <p className="inline-flex rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-rose-700 mb-4">
              Private yacht dinner
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Private Bosphorus Dinner Cruise
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-6 max-w-2xl">
              A private Bosphorus dinner cruise keeps the yacht, the table, and the timing on your
              side. It works for couples, proposals, birthdays, anniversaries, and small groups
              that want dinner on the water without shared seating.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-rose-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-rose-700"
              >
                Plan private dinner
              </Link>
              <TrackedContactLink
                href="https://wa.me/905370406822"
                kind="whatsapp"
                label="private_dinner_page_whatsapp_hero"
                location="private_dinner_page"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-rose-600 px-6 py-3 font-semibold text-rose-600 transition-colors hover:bg-rose-50"
              >
                Ask on WhatsApp
              </TrackedContactLink>
            </div>
          </div>

          <aside className="rounded-2xl border border-rose-100 bg-rose-50 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">What helps us quote your private Bosphorus dinner cruise</h2>
            <ul className="space-y-3 text-sm text-gray-700">
              {[
                "Preferred date and dinner time",
                "Guest count and whether it is a couple or a group",
                "Occasion: proposal, birthday, anniversary, or family dinner",
                "Dinner style: set menu, seafood, drinks, cake, flowers, or photographer",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="font-bold text-rose-600">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </aside>
        </section>

        <section className="mb-12 rounded-2xl border border-rose-100 bg-rose-50 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">When a private Bosphorus dinner yacht is the right fit</h2>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What changes the private dinner yacht price</h2>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Private dinner FAQs</h2>
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
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">Get prices for your private dinner yacht</h2>
          <p className="text-rose-100 mb-6 max-w-2xl mx-auto">
            Send the date, guest count, and dinner style, and we will suggest yachts that match
            the kind of evening you want.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-rose-700 transition-colors hover:bg-rose-50"
            >
              Request prices
            </Link>
            <TrackedContactLink
              href="https://wa.me/905370406822"
              kind="whatsapp"
              label="private_dinner_page_whatsapp_footer"
              location="private_dinner_page"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-white px-6 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-rose-700"
            >
              Ask on WhatsApp
            </TrackedContactLink>
          </div>
        </div>
      </main>
    </>
  );
}
