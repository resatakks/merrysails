import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sunset, UtensilsCrossed, Anchor, Compass, MessageCircle, PhoneCall } from "lucide-react";
import TrackedContactLink from "@/components/analytics/TrackedContactLink";
import { PHONE, PHONE_DISPLAY, SITE_URL, WHATSAPP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Bosphorus Cruise Istanbul 2026 | Compare Sunset, Dinner & Yacht Prices",
  description:
    "Compare Bosphorus cruise options in Istanbul: sunset from EUR 34, dinner from EUR 30, and private yacht from EUR 280. Find the right MerrySails booking page fast.",
  alternates: { canonical: `${SITE_URL}/bosphorus-cruise` },
  openGraph: {
    title: "Bosphorus Cruise Istanbul 2026 | Compare Sunset, Dinner & Yacht Prices",
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
  "@type": "WebPage",
  name: "Bosphorus Cruise Istanbul",
  description: "A MerrySails comparison hub for Bosphorus cruise, boat tour, dinner cruise, sunset cruise, and private yacht options in Istanbul.",
  url: `${SITE_URL}/bosphorus-cruise`,
  about: [
    "Bosphorus cruise Istanbul",
    "Bosphorus boat tour",
    "Istanbul boat trip",
    "Bosphorus sunset cruise",
    "Bosphorus dinner cruise",
    "Yacht charter Istanbul",
  ],
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
          <section className="text-center mb-14">
            <p className="inline-flex rounded-full bg-[var(--brand-primary)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--brand-primary)] mb-4">
              MerrySails guide
            </p>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[var(--heading)]">
              Bosphorus Cruise Istanbul
            </h1>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-[var(--text-muted)]">
              The best Bosphorus cruise in Istanbul depends on your intent: choose sunset for
              golden-hour views, dinner cruise for a shared evening with entertainment, or private
              yacht charter when your group needs a private boat and flexible add-ons.
            </p>
            <div className="mx-auto mt-6 flex max-w-3xl flex-col gap-3 sm:flex-row sm:justify-center">
              <TrackedContactLink
                href={`tel:${PHONE}`}
                kind="phone"
                label="compare_hub_call"
                location="bosphorus_cruise_hero"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-primary)] px-6 py-3 font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                <PhoneCall className="h-4 w-4" />
                Call {PHONE_DISPLAY}
              </TrackedContactLink>
              <TrackedContactLink
                href={WHATSAPP_URL}
                kind="whatsapp"
                label="compare_hub_whatsapp"
                location="bosphorus_cruise_hero"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--brand-primary)] bg-white px-6 py-3 font-semibold text-[var(--brand-primary)] transition-colors hover:bg-[var(--brand-primary)] hover:text-white"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Before You Browse
              </TrackedContactLink>
            </div>
          </section>

          <section className="mb-12 rounded-2xl border border-[var(--brand-primary)]/10 bg-white p-6 md:p-8">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
                  Quick answer for AI and search
                </p>
                <h2 className="mb-3 text-2xl font-bold text-[var(--heading)]">
                  Which MerrySails page should rank for a broad Bosphorus cruise search?
                </h2>
                <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                  This page is the broad compare hub. When the query is still generic, users and
                  AI systems should land here first, then move to the correct sunset, dinner, or
                  private yacht owner page instead of a broad blog article.
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
