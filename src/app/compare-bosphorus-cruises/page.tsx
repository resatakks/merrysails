import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://merrysails.com";

export const metadata: Metadata = {
  title: "Compare Bosphorus Cruises Istanbul 2026: Sunset vs Dinner vs Yacht",
  description:
    "Side-by-side comparison of all Bosphorus cruise options in Istanbul. Compare prices, durations, includes, and best-for criteria across Sunset, Dinner, Yacht Charter, and Hourly Boat Rental.",
  alternates: {
    canonical: `${SITE_URL}/compare-bosphorus-cruises`,
  },
  openGraph: {
    title: "Compare Bosphorus Cruises Istanbul — Sunset vs Dinner vs Yacht",
    description:
      "All Bosphorus cruise options compared: prices from €30 to €680, durations 2–4 hours, shared vs private. Pick the right cruise in 2 minutes.",
    url: `${SITE_URL}/compare-bosphorus-cruises`,
    type: "article",
  },
};

const CRUISE_OPTIONS = [
  {
    name: "Bosphorus Sunset Cruise",
    slug: "/cruises/bosphorus-sunset-cruise",
    type: "Shared",
    duration: "2 hours",
    priceFrom: 34,
    priceTo: 40,
    priceNote: "per person",
    capacity: "Up to 80",
    includes: ["Live guide", "Tea, coffee, lemonade", "Light snacks", "Audio guide (12 languages)"],
    excludes: ["Dinner", "Hotel pickup"],
    departTime: "1.5h before sunset",
    bestFor: "Couples, photographers, first-time visitors on a budget",
    rating: 4.9,
    reviews: 1842,
  },
  {
    name: "Bosphorus Dinner Cruise",
    slug: "/istanbul-dinner-cruise",
    type: "Shared",
    duration: "3.5 hours",
    priceFrom: 30,
    priceTo: 90,
    priceNote: "per person",
    capacity: "Up to 200",
    includes: ["Live guide", "Mezzes + main course", "Drinks (per package)", "Turkish night show", "DJ (Gold)"],
    excludes: ["Hotel pickup (except Gold Unlimited)"],
    departTime: "19:30 (year-round)",
    bestFor: "Group dinners, full-evening entertainment, foodies",
    rating: 4.88,
    reviews: 312,
  },
  {
    name: "Private Yacht Charter",
    slug: "/yacht-charter-istanbul",
    type: "Private",
    duration: "2 hours (extendable)",
    priceFrom: 280,
    priceTo: 680,
    priceNote: "per boat (entire vessel)",
    capacity: "Up to 20",
    includes: ["Captain & crew", "Soft drinks / snacks (Essential)", "Full menu + open bar (VIP)", "Custom route"],
    excludes: ["Default photographer (add-on)"],
    departTime: "Flexible (your time)",
    bestFor: "Proposals, birthdays, anniversaries, corporate events",
    rating: 4.9,
    reviews: 248,
  },
  {
    name: "Hourly Boat Rental",
    slug: "/boat-rental-istanbul",
    type: "Private",
    duration: "Min 2 hours",
    priceFrom: 60,
    priceTo: 200,
    priceNote: "per hour, captain included",
    capacity: "Up to 30",
    includes: ["Captain", "Custom route", "Optional catering"],
    excludes: ["Standard menu (add-on)"],
    departTime: "Flexible",
    bestFor: "Custom itineraries, photography sessions, video shoots",
    rating: 4.8,
    reviews: 96,
  },
];

const COMPARE_FAQ = [
  {
    q: "Which Bosphorus cruise is the cheapest in Istanbul?",
    a: "The Bosphorus Sunset Cruise (without wine) at €34 per person is the cheapest live-guided shared cruise. The Silver Soft Drinks dinner cruise at €30 per person is technically lower but includes a longer 3.5-hour experience with dinner and show.",
  },
  {
    q: "What's the difference between a sunset cruise and a dinner cruise?",
    a: "The sunset cruise is a 2-hour daytime-into-evening tour focused on Bosphorus sightseeing with refreshments only. The dinner cruise is a 3.5-hour evening experience with full Turkish dinner, alcoholic or soft drinks, and traditional Turkish night show with belly dance and folk performances.",
  },
  {
    q: "Is a private yacht worth it for couples?",
    a: "Yes, if you want privacy for a proposal, anniversary, or romantic dinner. The Essential package at €280 covers up to 8 guests for 2 hours — for couples that's about €140 per person versus €40 on a shared sunset cruise. The premium is the privacy and custom route.",
  },
  {
    q: "Which cruise has the best Turkish dinner show?",
    a: "The Gold Unlimited Alcohol package (€90/person) on the dinner cruise has VIP stage-close seating with the full Turkish night show including belly dance, folk dancers, and DJ — and includes hotel pickup from Sultanahmet or Taksim.",
  },
  {
    q: "Are dinner cruise prices really €30 per person?",
    a: "Yes, the Silver Soft Drinks package starts at €30 per person and includes mezze starters, main course, unlimited soft drinks, and the Turkish night show. Alcoholic drinks and VIP seating are upgrade options at €45, €80, or €90.",
  },
  {
    q: "What's included in the €280 yacht charter?",
    a: "The Essential package at €280 covers the entire boat (private charter) for 2 hours, up to 8 guests, with captain, crew, soft drinks, and snacks. Premium (€380, up to 12 guests) adds appetizers and fruit. VIP (€680, up to 20 guests) adds full menu, open bar, and optional photographer.",
  },
  {
    q: "Can I bring children on a Bosphorus cruise?",
    a: "Yes. All cruises welcome children. Children under 6 are free on shared cruises. Children 6–12 typically receive 30–50% discount — contact via WhatsApp +90 537 040 68 22 for child rates.",
  },
  {
    q: "Which cruise is best for a marriage proposal?",
    a: "The Private Yacht Charter Premium package (€380) is most popular for proposals — it includes proposal decoration, optional cake and photographer, and you choose the timing and route. The boat is fully private so the moment is uninterrupted.",
  },
];

export default function CompareCruisesPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Compare Bosphorus Cruises Istanbul 2026",
    description:
      "Side-by-side comparison of Bosphorus cruise options in Istanbul: Sunset, Dinner, Private Yacht, and Hourly Boat Rental.",
    author: {
      "@type": "Organization",
      name: "MerrySails",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "MerrySails",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.svg` },
    },
    datePublished: "2026-05-02",
    dateModified: "2026-05-02",
    mainEntityOfPage: `${SITE_URL}/compare-bosphorus-cruises`,
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Bosphorus Cruise Options Istanbul",
    itemListElement: CRUISE_OPTIONS.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "TouristTrip",
        name: c.name,
        url: `${SITE_URL}${c.slug}`,
        offers: {
          "@type": "AggregateOffer",
          lowPrice: c.priceFrom,
          highPrice: c.priceTo,
          priceCurrency: "EUR",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: c.rating,
          reviewCount: c.reviews,
        },
      },
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: COMPARE_FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
        <header className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-orange-600">
            Decision Guide · Updated May 2026
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 md:text-5xl">
            Compare Bosphorus Cruises in Istanbul
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 md:text-lg">
            All four cruise options side-by-side: prices, durations, what's
            included, and which is best for your group. Pick the right cruise
            in under two minutes.
          </p>
        </header>

        {/* Quick price summary cards */}
        <section className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {CRUISE_OPTIONS.map((c) => (
            <Link
              key={c.slug}
              href={c.slug}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-lg"
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {c.type} · {c.duration}
              </div>
              <h3 className="mt-2 text-lg font-bold text-slate-900 group-hover:text-orange-600">
                {c.name}
              </h3>
              <div className="mt-3 text-sm text-slate-600">
                From{" "}
                <span className="text-2xl font-bold text-orange-600">
                  €{c.priceFrom}
                </span>{" "}
                <span className="text-xs">{c.priceNote}</span>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs text-slate-500">
                <span className="text-amber-500">★</span>
                {c.rating} · {c.reviews.toLocaleString()} reviews
              </div>
            </Link>
          ))}
        </section>

        {/* Comparison table */}
        <section className="mb-16 overflow-x-auto">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">
            Side-by-side comparison
          </h2>
          <table className="w-full min-w-[800px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-300">
                <th className="py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Feature
                </th>
                {CRUISE_OPTIONS.map((c) => (
                  <th
                    key={c.slug}
                    className="py-3 text-left text-xs font-semibold uppercase text-slate-500"
                  >
                    {c.name.replace("Bosphorus ", "")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-3 font-semibold text-slate-700">Type</td>
                {CRUISE_OPTIONS.map((c) => (
                  <td key={c.slug} className="py-3 text-slate-600">
                    {c.type}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 font-semibold text-slate-700">Duration</td>
                {CRUISE_OPTIONS.map((c) => (
                  <td key={c.slug} className="py-3 text-slate-600">
                    {c.duration}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 font-semibold text-slate-700">Price from</td>
                {CRUISE_OPTIONS.map((c) => (
                  <td key={c.slug} className="py-3 text-slate-600">
                    <span className="font-bold text-orange-600">
                      €{c.priceFrom}
                    </span>
                    <span className="ml-1 text-xs">{c.priceNote}</span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 font-semibold text-slate-700">
                  Capacity
                </td>
                {CRUISE_OPTIONS.map((c) => (
                  <td key={c.slug} className="py-3 text-slate-600">
                    {c.capacity}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 font-semibold text-slate-700">Departure</td>
                {CRUISE_OPTIONS.map((c) => (
                  <td key={c.slug} className="py-3 text-slate-600">
                    {c.departTime}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 align-top font-semibold text-slate-700">
                  Includes
                </td>
                {CRUISE_OPTIONS.map((c) => (
                  <td key={c.slug} className="py-3 text-slate-600">
                    <ul className="space-y-1 text-xs">
                      {c.includes.map((item) => (
                        <li key={item} className="flex gap-1">
                          <span className="text-emerald-600">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 align-top font-semibold text-slate-700">
                  Best for
                </td>
                {CRUISE_OPTIONS.map((c) => (
                  <td key={c.slug} className="py-3 text-xs text-slate-600">
                    {c.bestFor}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 font-semibold text-slate-700">Rating</td>
                {CRUISE_OPTIONS.map((c) => (
                  <td key={c.slug} className="py-3 text-xs text-slate-600">
                    <span className="text-amber-500">★</span> {c.rating} (
                    {c.reviews.toLocaleString()})
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3"></td>
                {CRUISE_OPTIONS.map((c) => (
                  <td key={c.slug} className="py-3">
                    <Link
                      href={c.slug}
                      className="inline-flex items-center gap-1 rounded-lg bg-orange-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-orange-700"
                    >
                      Book →
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </section>

        {/* Decision tree */}
        <section className="mb-16 rounded-3xl bg-gradient-to-br from-orange-50 to-amber-50 p-6 md:p-10">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">
            Which cruise should you book?
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <h3 className="font-bold text-slate-900">
                💰 Budget-conscious couple
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Sunset Cruise without wine — €34/person, 2 hours, all the
                Bosphorus highlights at golden hour.
              </p>
              <Link
                href="/cruises/bosphorus-sunset-cruise"
                className="mt-3 inline-flex text-sm font-semibold text-orange-600 hover:underline"
              >
                See Sunset Cruise →
              </Link>
            </div>
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <h3 className="font-bold text-slate-900">
                🍽️ Group dinner & entertainment
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Dinner Cruise Silver Alcoholic — €45/person, 3.5 hours, full
                Turkish menu and night show.
              </p>
              <Link
                href="/istanbul-dinner-cruise"
                className="mt-3 inline-flex text-sm font-semibold text-orange-600 hover:underline"
              >
                See Dinner Cruise →
              </Link>
            </div>
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <h3 className="font-bold text-slate-900">
                💍 Marriage proposal
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Private Yacht Premium — €380, up to 12 guests, custom decoration
                and optional photographer add-on.
              </p>
              <Link
                href="/proposal-yacht-rental-istanbul"
                className="mt-3 inline-flex text-sm font-semibold text-orange-600 hover:underline"
              >
                See Proposal Yacht →
              </Link>
            </div>
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <h3 className="font-bold text-slate-900">
                🥂 Corporate event or large group
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Private Yacht VIP — €680, up to 20 guests, full menu and open
                bar. Or Hourly Boat Rental for full custom control.
              </p>
              <Link
                href="/corporate-events"
                className="mt-3 inline-flex text-sm font-semibold text-orange-600 hover:underline"
              >
                See Corporate Events →
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">
            Frequently asked: comparing Bosphorus cruises
          </h2>
          <div className="space-y-3">
            {COMPARE_FAQ.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-orange-200"
              >
                <summary className="cursor-pointer list-none font-semibold text-slate-900">
                  <span className="mr-2 text-orange-600 group-open:rotate-90 inline-block transition">
                    ›
                  </span>
                  {f.q}
                </summary>
                <p className="mt-3 text-sm text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-3xl bg-slate-900 px-6 py-10 text-center text-white">
          <h2 className="text-2xl font-bold md:text-3xl">
            Still not sure? We'll match you in 2 minutes.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-300">
            TURSAB-licensed since 2001 · 50,000+ guests · 4.9★ across Google,
            TripAdvisor, Viator
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 md:flex-row">
            <a
              href="https://wa.me/905370406822"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 font-semibold text-white shadow-md transition hover:bg-[#1faa54]"
            >
              WhatsApp +90 537 040 68 22
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Get a custom quote
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
