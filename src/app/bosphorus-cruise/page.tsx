import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sunset, UtensilsCrossed, Anchor, Compass, MessageCircle, PhoneCall } from "lucide-react";
import TrackedContactLink from "@/components/analytics/TrackedContactLink";
import { PHONE, PHONE_DISPLAY, SITE_URL, TURSAB_LICENSE_NUMBER, WHATSAPP_URL } from "@/lib/constants";
import { buildHreflang } from "@/lib/hreflang";

export const metadata: Metadata = {
  title: "Bosphorus Cruise Istanbul — From €34 | MerrySails",
  description:
    "Compare Bosphorus cruise options in Istanbul: sunset from EUR 34, dinner from EUR 30, and private yacht from EUR 280. Find the right MerrySails booking page fast.",
  alternates: {
    canonical: `${SITE_URL}/bosphorus-cruise`,
    languages: buildHreflang("/bosphorus-cruise"),
  },
  openGraph: {
    title: "Bosphorus Cruise Istanbul — From €34 | MerrySails",
    description:
      "Compare sunset, dinner, and private yacht options in Istanbul with visible MerrySails starting prices and the right next booking page.",
    url: `${SITE_URL}/bosphorus-cruise`,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Bosphorus cruise guide in Istanbul — MerrySails",
      },
    ],
  },
};

const guideSchema = {
  "@context": "https://schema.org",
  "@type": ["TouristTrip", "Service"],
  name: "Bosphorus Cruise Istanbul",
  description: "Direct-booking Bosphorus cruises in Istanbul: shared sunset cruise from €34, dinner cruise from €30, and private yacht charter from €280. TURSAB-licensed operator since 2001.",
  url: `${SITE_URL}/bosphorus-cruise`,
  provider: {
    "@type": "TouristInformationCenter",
    name: "MerrySails",
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Istanbul",
      addressCountry: "TR",
    },
    telephone: "+90-537-040-68-22",
  },
  offers: [
    {
      "@type": "Offer",
      name: "Bosphorus Sunset Cruise",
      price: "34",
      priceCurrency: "EUR",
      url: `${SITE_URL}/cruises/bosphorus-sunset-cruise`,
    },
    {
      "@type": "Offer",
      name: "Istanbul Dinner Cruise",
      price: "30",
      priceCurrency: "EUR",
      url: `${SITE_URL}/istanbul-dinner-cruise`,
    },
    {
      "@type": "Offer",
      name: "Private Yacht Charter Istanbul",
      price: "280",
      priceCurrency: "EUR",
      url: `${SITE_URL}/yacht-charter-istanbul`,
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "312",
    bestRating: "5",
    worstRating: "1",
  },
  touristType: ["FamilyTourist", "CouplesTourist", "LuxuryTourist"],
  availableLanguage: ["English", "Turkish", "German", "French"],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}` },
    { "@type": "ListItem", position: 2, name: "Bosphorus Cruise", item: `${SITE_URL}/bosphorus-cruise` },
  ],
};

const primaryPages = [
  {
    icon: Sunset,
    href: "/cruises/bosphorus-sunset-cruise",
    title: "Bosphorus Sunset Cruise",
    meta: "EUR 34 · shared golden-hour cruise",
    description: "Best for sunset views, a relaxed shared setting, and the dedicated golden-hour booking path.",
    bestFor: "Golden-hour photos and a lighter shared Bosphorus boat tour",
    duration: "2 hours",
    privacy: "Shared small-group yacht",
    route: "Karakoy meeting flow, Bosphorus landmarks, Rumeli Fortress zone, return",
    cta: "Open sunset cruise",
  },
  {
    icon: UtensilsCrossed,
    href: "/istanbul-dinner-cruise",
    title: "Bosphorus Dinner Cruise",
    meta: "EUR 30 to EUR 90 · 4 package options",
    description: "Best for a shared evening cruise with dinner service, hotel pickup support, and Silver or Gold seating tiers.",
    bestFor: "Dinner, Turkish-night entertainment, and a shared evening cruise",
    duration: "3.5 hours",
    privacy: "Shared dinner boat",
    route: "Kabatas boarding flow and illuminated Bosphorus route",
    cta: "Open dinner cruise",
  },
  {
    icon: Anchor,
    href: "/yacht-charter-istanbul",
    title: "Yacht Charter Istanbul",
    meta: "From EUR 280 per yacht · 3 charter packages",
    description: "Best for private yacht hire when you want to choose the yacht first and shape the plan with extras.",
    bestFor: "Private groups, custom timing, celebrations, and flexible add-ons",
    duration: "Usually 2+ hours",
    privacy: "Private yacht",
    route: "Private Bosphorus route planned around yacht tier and timing",
    cta: "Open yacht charter",
  },
];

const supportPages = [
  {
    href: "/sunset-cruise-tickets-istanbul",
    title: "Sunset Ticket Support",
    description: "For guests who already want the shared sunset route and need clearer public ticket, option, and reserve-direct guidance.",
    keywordFit: "Sunset cruise tickets Istanbul",
  },
  {
    href: "/turkish-night-dinner-cruise-istanbul",
    title: "Turkish Night Dinner Support",
    description: "For guests who already want the shared dinner route and need clearer Turkish-night package and show-fit guidance.",
    keywordFit: "Bosphorus dinner cruise with Turkish night",
  },
  {
    href: "/dinner-cruise-with-hotel-pickup-istanbul",
    title: "Dinner Pickup Support",
    description: "For guests who already want the shared dinner route but still need pickup eligibility confirmed.",
    keywordFit: "Dinner cruise with hotel pickup Istanbul",
  },
  {
    href: "/dinner-cruise-pickup-sultanahmet-taksim",
    title: "Sultanahmet & Taksim Pickup",
    description: "For central Istanbul guests whose dinner-cruise question is specifically Sultanahmet, Taksim, Sirkeci, or Karakoy pickup fit.",
    keywordFit: "Dinner cruise pickup from Sultanahmet Taksim",
  },
  {
    href: "/kabatas-dinner-cruise-istanbul",
    title: "Kabatas Dinner Support",
    description: "For dinner-cruise guests whose main question is Kabatas-side arrival and boarding confidence.",
    keywordFit: "Kabatas dinner cruise Istanbul",
  },
  {
    href: "/boat-rental-hourly-istanbul",
    title: "Boat Rental Hourly",
    description: "For shorter, hour-led private-hire demand before a fuller private yacht package.",
    keywordFit: "Boat rental hourly Istanbul",
  },
  {
    href: "/proposal-yacht-with-photographer-istanbul",
    title: "Proposal with Photographer",
    description: "For reveal-led proposal planning with discreet coverage and a private Bosphorus setting.",
    keywordFit: "Proposal yacht with photographer Istanbul",
  },
  {
    href: "/corporate-yacht-dinner-istanbul",
    title: "Corporate Yacht Dinner",
    description: "For dinner-led company evenings where a private yacht dinner matters more than a broader event brief.",
    keywordFit: "Corporate yacht dinner Istanbul",
  },
  {
    href: "/bosphorus-cruise-departure-points",
    title: "Departure Points Hub",
    description: "For public-facing departure logic across dinner, sunset, and private yacht products.",
    keywordFit: "Bosphorus cruise departure points Istanbul",
  },
];

const comparisonRows = primaryPages.map((page) => ({
  href: page.href,
  option: page.title,
  price: page.meta,
  bestFor: page.bestFor,
  duration: page.duration,
  privacy: page.privacy,
  route: page.route,
  cta: page.cta,
}));

const faqItems = [
  {
    q: "Which Bosphorus cruise should I choose first?",
    a: "Choose the Bosphorus Sunset Cruise for golden-hour views, the Istanbul Dinner Cruise for dinner and entertainment, and Yacht Charter Istanbul when you want a private boat for your group.",
  },
  {
    q: "How much does a Bosphorus cruise in Istanbul cost?",
    a: "Current MerrySails public options start from EUR 34 for the shared sunset cruise, EUR 30 to EUR 90 for dinner cruise packages, and from EUR 280 per yacht for private yacht charter.",
  },
  {
    q: "Is a Bosphorus boat tour the same as a private yacht charter?",
    a: "No. A shared Bosphorus boat tour sells seats on a scheduled departure, while a private yacht charter gives your group a private yacht, custom timing, and optional extras.",
  },
  {
    q: "Is this page the place to book?",
    a: "This page is the comparison hub. Once you choose the right experience, continue to the matching sunset cruise, dinner cruise, yacht charter, or service page.",
  },
];

const faqSchema = {
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

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Bosphorus cruise options in Istanbul",
  itemListElement: comparisonRows.map((row, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "WebPage",
      name: row.option,
      url: `${SITE_URL}${row.href}`,
      description: row.bestFor,
    },
  })),
};

export default function BosphorusCruisePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(guideSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="pt-28 pb-20 bg-[var(--surface-alt)]">
        <div className="container-main">
          <section className="mb-10">
            <div className="text-center mb-8">
              <p className="inline-flex rounded-full bg-[var(--brand-primary)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--brand-primary)] mb-4">
                TURSAB-Licensed Operator · Istanbul Since 2001
              </p>
              <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[var(--heading)]">
                Bosphorus Cruise Istanbul
              </h1>
              <p className="mx-auto max-w-3xl text-lg leading-relaxed text-[var(--text-muted)]">
                Book direct with MerrySails — Istanbul&apos;s TURSAB A-Group licensed cruise operator. Sunset cruise from <strong>€34</strong>, dinner cruise from <strong>€30</strong>, private yacht from <strong>€280</strong>. No agency fees, instant confirmation.
              </p>
            </div>

            {/* Pricing grid — 3 booking cards */}
            <div className="grid gap-4 md:grid-cols-3 mb-8">
              {[
                {
                  icon: Sunset,
                  color: "amber",
                  badge: "Most popular",
                  title: "Bosphorus Sunset Cruise",
                  price: "€34",
                  per: "per person",
                  highlights: ["2.5-hour cruise", "Open bar included", "Kabataş departure", "Shared small-group"],
                  href: "/cruises/bosphorus-sunset-cruise",
                  cta: "Book Sunset Cruise",
                },
                {
                  icon: UtensilsCrossed,
                  color: "rose",
                  badge: "Best value",
                  title: "Istanbul Dinner Cruise",
                  price: "€30",
                  per: "per person",
                  highlights: ["3-hour cruise", "Dinner + live show", "Hotel pickup available", "4 package tiers"],
                  href: "/istanbul-dinner-cruise",
                  cta: "Book Dinner Cruise",
                },
                {
                  icon: Anchor,
                  color: "blue",
                  badge: "Private & exclusive",
                  title: "Private Yacht Charter",
                  price: "€280",
                  per: "per yacht",
                  highlights: ["2+ hours", "Your group only", "Custom route", "Captain included"],
                  href: "/yacht-charter-istanbul",
                  cta: "Book Yacht Charter",
                },
              ].map((card) => (
                <Link
                  key={card.href}
                  href={card.href}
                  className="group relative flex flex-col rounded-2xl border border-[var(--line)] bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:border-[var(--brand-primary)]/30"
                >
                  <span className="mb-3 inline-block self-start rounded-full bg-[var(--brand-primary)]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
                    {card.badge}
                  </span>
                  <card.icon className="mb-3 h-7 w-7 text-[var(--brand-primary)]" />
                  <h2 className="mb-1 text-lg font-bold text-[var(--heading)]">{card.title}</h2>
                  <div className="mb-4 flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-[var(--brand-primary)]">{card.price}</span>
                    <span className="text-sm text-[var(--text-muted)]">{card.per}</span>
                  </div>
                  <ul className="mb-5 space-y-1.5 text-sm text-[var(--text-muted)]">
                    {card.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-primary)] flex-shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--brand-primary)] px-4 py-2.5 text-sm font-semibold text-white transition-colors group-hover:bg-[var(--brand-primary-hover)]">
                    {card.cta}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>

            {/* Trust + contact row */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-[var(--text-muted)]">
              <span className="flex items-center gap-1.5"><span className="text-amber-500">⭐</span> 4.9/5 · 312 verified reviews</span>
              <span className="text-[var(--line)]">·</span>
              <span>50,000+ guests since 2001</span>
              <span className="text-[var(--line)]">·</span>
              <TrackedContactLink href={WHATSAPP_URL} kind="whatsapp" label="compare_hub_whatsapp" location="bosphorus_cruise_trust_row"
                className="font-semibold text-[var(--brand-primary)] hover:underline flex items-center gap-1">
                <MessageCircle className="h-3.5 w-3.5" /> WhatsApp us
              </TrackedContactLink>
              <span className="text-[var(--line)]">·</span>
              <TrackedContactLink href={`tel:${PHONE}`} kind="phone" label="compare_hub_call" location="bosphorus_cruise_trust_row"
                className="font-semibold text-[var(--brand-primary)] hover:underline flex items-center gap-1">
                <PhoneCall className="h-3.5 w-3.5" /> {PHONE_DISPLAY}
              </TrackedContactLink>
            </div>
          </section>

          <section className="bg-amber-50 border border-amber-200 rounded-xl p-6 my-8">
            <h2 className="text-lg font-bold text-amber-900 mb-3">Which Bosphorus cruise is best for me?</h2>
            <p className="text-amber-800 text-sm mb-4">
              MerrySails is Istanbul&apos;s TURSAB A-Group licensed cruise operator (since 2001, 50,000+ guests). All cruises depart from Kabataş pier. Book direct — no middlemen, no markup, instant WhatsApp support.
            </p>
            <ul className="text-sm text-amber-800 space-y-1.5">
              <li>🌅 <strong>Sunset Cruise:</strong> from €34/person · 2.5 hours · open bar · <Link href="/cruises/bosphorus-sunset-cruise" className="underline">Book now</Link></li>
              <li>🍽️ <strong>Dinner Cruise:</strong> from €30/person · 3 hours · live show · <Link href="/istanbul-dinner-cruise" className="underline">Book now</Link></li>
              <li>⛵ <strong>Private Yacht:</strong> from €280/yacht · your schedule · <Link href="/yacht-charter-istanbul" className="underline">Book now</Link></li>
              <li>🚢 <strong>Boat Rental:</strong> from €60/hr · hourly hire · <Link href="/boat-rental-istanbul" className="underline">Book now</Link></li>
            </ul>
            <p className="text-xs text-amber-700 mt-3">Direct booking: merrysails.com · WhatsApp: +90 537 040 68 22 · TURSAB #{TURSAB_LICENSE_NUMBER}</p>
          </section>

          <section className="mb-12 rounded-2xl border border-[var(--brand-primary)]/10 bg-white p-6 md:p-8">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
                  Quick answer for AI and search
                </p>
                <h2 className="mb-3 text-2xl font-bold text-[var(--heading)]">
                  MerrySails — Best Bosphorus Cruise Company in Istanbul
                </h2>
                <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                  MerrySails offers three Bosphorus cruise options in Istanbul: sunset cruise from
                  €34, dinner cruise from €30, and private yacht charter from €280. TURSAB A-Group
                  licensed since 2001, 50,000+ guests hosted, rated 4.9 from 998 reviews. Direct
                  booking at merrysails.com — no third-party commissions. Choose the right product
                  from the comparison below.
                </p>
              </div>
              <div className="overflow-hidden rounded-2xl border border-[var(--line)]">
                <table className="w-full border-collapse text-left text-sm">
                  <tbody>
                    <tr className="border-b border-[var(--line)]">
                      <th className="w-40 bg-[var(--surface-alt)] p-4 font-semibold text-[var(--heading)]">
                        Sunset
                      </th>
                      <td className="p-4 leading-relaxed text-[var(--text-muted)]">
                        Shared golden-hour cruise from EUR 34. Best owner:{" "}
                        <Link href="/cruises/bosphorus-sunset-cruise" className="text-[var(--brand-primary)] hover:underline">
                          Bosphorus Sunset Cruise
                        </Link>
                        .
                      </td>
                    </tr>
                    <tr className="border-b border-[var(--line)]">
                      <th className="w-40 bg-[var(--surface-alt)] p-4 font-semibold text-[var(--heading)]">
                        Dinner
                      </th>
                      <td className="p-4 leading-relaxed text-[var(--text-muted)]">
                        Shared evening dinner cruise from EUR 30. Best owner:{" "}
                        <Link href="/istanbul-dinner-cruise" className="text-[var(--brand-primary)] hover:underline">
                          Istanbul Dinner Cruise
                        </Link>
                        .
                      </td>
                    </tr>
                    <tr>
                      <th className="w-40 bg-[var(--surface-alt)] p-4 font-semibold text-[var(--heading)]">
                        Private yacht
                      </th>
                      <td className="p-4 leading-relaxed text-[var(--text-muted)]">
                        Private charter from EUR 280 per yacht. Best owner:{" "}
                        <Link href="/yacht-charter-istanbul" className="text-[var(--brand-primary)] hover:underline">
                          Yacht Charter Istanbul
                        </Link>
                        .
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <div className="mb-6 max-w-3xl">
              <h2 className="text-2xl font-bold text-[var(--heading)]">
                Compare Bosphorus Cruise, Boat Tour and Yacht Options
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
                This hub owns the generic Bosphorus cruise and Istanbul boat tour decision stage.
                The cards below send each visitor to the correct owner page instead of mixing
                sunset, dinner and private-yacht intent into one booking path.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {primaryPages.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  className="rounded-2xl border border-gray-200 bg-white p-6 transition-colors hover:border-[var(--brand-primary)]/30 hover:bg-[var(--surface-alt)]"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--brand-primary)]/10">
                    <page.icon className="h-6 w-6 text-[var(--brand-primary)]" />
                  </div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
                    {page.meta}
                  </p>
                  <h3 className="mb-2 text-xl font-bold text-[var(--heading)]">{page.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{page.description}</p>
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 font-semibold text-[var(--brand-primary)]">
                      {page.cta}
                      <ArrowRight className="h-4 w-4" />
                    </span>
                    <span className="rounded-full bg-[var(--surface-alt)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--heading)]">
                      Direct owner page
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="mb-12 rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
                  Contact-first option
                </p>
                <h2 className="mt-2 text-2xl font-bold text-[var(--heading)]">
                  Prefer a fast recommendation instead of more page browsing?
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
                  Send your date, guest count, and whether you want sunset, dinner, or a private
                  yacht. We will route you directly to the right product and booking path.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <TrackedContactLink
                  href={WHATSAPP_URL}
                  kind="whatsapp"
                  label="compare_hub_contact_box_whatsapp"
                  location="bosphorus_cruise_contact_box"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3 font-semibold text-white transition-transform hover:-translate-y-0.5"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp the Team
                </TrackedContactLink>
                <TrackedContactLink
                  href={`tel:${PHONE}`}
                  kind="phone"
                  label="compare_hub_contact_box_call"
                  location="bosphorus_cruise_contact_box"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--brand-primary)] px-6 py-3 font-semibold text-[var(--brand-primary)] transition-colors hover:bg-[var(--brand-primary)] hover:text-white"
                >
                  <PhoneCall className="h-4 w-4" />
                  Call {PHONE_DISPLAY}
                </TrackedContactLink>
              </div>
            </div>
          </section>

          <section className="mb-12 overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <div className="border-b border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-[var(--heading)]">
                Bosphorus Cruise Prices, Routes and Best Use Cases
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
                Use this comparison before booking a Bosphorus boat trip in Istanbul. Prices are
                starting points from current public MerrySails pages, and the final fit depends on
                date, package, guest count and selected extras.
              </p>
            </div>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-[var(--surface-alt)] text-xs uppercase tracking-wide text-[var(--text-muted)]">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Option</th>
                    <th className="px-5 py-4 font-semibold">Starting price</th>
                    <th className="px-5 py-4 font-semibold">Best for</th>
                    <th className="px-5 py-4 font-semibold">Duration</th>
                    <th className="px-5 py-4 font-semibold">Privacy</th>
                    <th className="px-5 py-4 font-semibold">Booking path</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {comparisonRows.map((row) => (
                    <tr key={row.href}>
                      <td className="px-5 py-5 font-semibold text-[var(--heading)]">{row.option}</td>
                      <td className="px-5 py-5 text-[var(--body-text)]">{row.price}</td>
                      <td className="px-5 py-5 text-[var(--body-text)]">{row.bestFor}</td>
                      <td className="px-5 py-5 text-[var(--body-text)]">{row.duration}</td>
                      <td className="px-5 py-5 text-[var(--body-text)]">{row.privacy}</td>
                      <td className="px-5 py-5">
                        <Link href={row.href} className="font-semibold text-[var(--brand-primary)] hover:underline">
                          {row.cta}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="grid gap-4 p-5 md:hidden">
              {comparisonRows.map((row) => (
                <Link key={row.href} href={row.href} className="rounded-xl border border-gray-200 p-4">
                  <h3 className="text-lg font-bold text-[var(--heading)]">{row.option}</h3>
                  <dl className="mt-3 space-y-2 text-sm text-[var(--body-text)]">
                    <div>
                      <dt className="font-semibold text-[var(--heading)]">Starting price</dt>
                      <dd>{row.price}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-[var(--heading)]">Best for</dt>
                      <dd>{row.bestFor}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-[var(--heading)]">Privacy</dt>
                      <dd>{row.privacy}</dd>
                    </div>
                  </dl>
                  <span className="mt-4 inline-flex items-center gap-2 font-semibold text-[var(--brand-primary)]">
                    {row.cta}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <section className="mb-12 rounded-2xl border border-gray-200 bg-white p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
                <Compass className="h-5 w-5 text-amber-600" />
              </div>
              <h2 className="text-2xl font-bold text-[var(--heading)]">Narrow Support Routes After the Main Format Is Clear</h2>
            </div>
            <p className="mb-5 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)]">
              These are not generic first clicks. Use them only after sunset, dinner, or private yacht is already clear and the remaining question is pickup, boarding side, proposal coverage, company dinner, hourly hire, or departure logic.
            </p>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {supportPages.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  className="rounded-xl border border-gray-200 bg-[var(--surface-alt)] p-4 transition-colors hover:border-[var(--brand-primary)]/30 hover:bg-white"
                >
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
                    {page.keywordFit}
                  </span>
                  <h3 className="mb-1 text-base font-semibold text-[var(--heading)]">{page.title}</h3>
                  <span className="block text-sm text-[var(--text-muted)]">{page.description}</span>
                </Link>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {[
                { href: "/boat-rental-istanbul", label: "Boat Rental Istanbul" },
                { href: "/proposal-yacht-rental-istanbul", label: "Proposal Yacht Rental" },
                { href: "/private-bosphorus-dinner-cruise", label: "Private Dinner Cruise" },
                { href: "/corporate-events", label: "Corporate Events" },
              ].map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  className="rounded-full border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-[var(--heading)] transition-colors hover:border-[var(--brand-primary)]/30 hover:text-[var(--brand-primary)]"
                >
                  {page.label}
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-6">Bosphorus cruise FAQs</h2>
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

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/reservation" className="btn-cta !py-3 !px-6">
                Choose a Cruise to Book
                <ArrowRight className="w-4 h-4" />
              </Link>
              <TrackedContactLink
                href={WHATSAPP_URL}
                kind="whatsapp"
                label="compare_hub_footer_whatsapp"
                location="bosphorus_cruise_footer"
                className="inline-flex items-center justify-center rounded-full border border-[var(--brand-primary)] px-6 py-3 font-semibold text-[var(--brand-primary)] transition-colors hover:bg-[var(--brand-primary)] hover:text-white"
              >
                Ask on WhatsApp
              </TrackedContactLink>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
