import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getTourBySlug } from "@/data/tours";
import { SITE_URL, WHATSAPP_URL } from "@/lib/constants";

export const revalidate = 3600;

const corporateTour = getTourBySlug("corporate-event-bosphorus-cruise");

if (!corporateTour) {
  throw new Error("Corporate event data is missing.");
}

export const metadata: Metadata = {
  title: "Corporate Yacht Events Istanbul 2026 — From EUR 280 | MerrySails",
  description:
    "Corporate yacht events in Istanbul from EUR 280 for team dinners, client hosting, launches, and private company gatherings on the Bosphorus.",
  alternates: { canonical: `${SITE_URL}/corporate-events` },
  openGraph: {
    title: "Corporate Yacht Events Istanbul 2026 — From EUR 280 | MerrySails",
    description:
      "Private corporate yacht events from EUR 280 with planning support for guest flow, catering, branding, and invoicing.",
    url: `${SITE_URL}/corporate-events`,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Corporate yacht events in Istanbul — MerrySails",
      },
    ],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: corporateTour.nameEn,
  description: corporateTour.description,
  provider: {
    "@id": `${SITE_URL}/#organization`,
  },
  areaServed: { "@type": "City", name: "Istanbul" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Corporate Event Formats",
    itemListElement: corporateTour.packages?.map((pkg) => ({
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

const corporatePriceCards = corporateTour.packages?.map((pkg) => ({
  title: pkg.name,
  price: `EUR ${pkg.price}`,
  body: pkg.features.join(" • "),
})) ?? [];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How are corporate yacht events priced?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Corporate yacht event pricing depends on guest count, timing, catering level, branding needs, and the type of vessel required for the event brief.",
      },
    },
    {
      "@type": "Question",
      name: "Can we get an official invoice?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Corporate bookings can be arranged with official invoicing and the commercial details a finance team usually needs.",
      },
    },
    {
      "@type": "Question",
      name: "What kinds of company events work on board?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Team dinners, client hosting, board dinners, launches, incentive evenings, and company celebrations all work well on the Bosphorus.",
      },
    },
  ],
};

const eventFits = [
  {
    title: "Client hosting",
    body: "Best when the event needs a more memorable atmosphere than a standard restaurant or hotel setting.",
  },
  {
    title: "Team dinner or offsite",
    body: "Best when you want everyone together in a private setting with a simpler guest flow.",
  },
  {
    title: "Product launch or showcase",
    body: "Best when visual impact, timing, and branded setup matter as much as the venue itself.",
  },
  {
    title: "Board or leadership dinner",
    body: "Best when privacy, timing control, and a calmer onboard setting are more important than scale.",
  },
];

const routeProof = [
  {
    title: "From EUR 280",
    body: "The package ladder begins at Essential and moves up to Premium and VIP as vessel size and event scope increase.",
  },
  {
    title: "Kuruçeşme Marina",
    body: `The corporate setup starts from ${corporateTour.departurePoint}, which works well for business guests and transfers.`,
  },
  {
    title: "Custom corporate route",
    body: `The route stays flexible because ${corporateTour.route.toLowerCase()} is set per brief.`,
  },
];

const quoteDrivers = [
  "Guest count and whether seating or standing flow matters more",
  "Dinner, cocktail, or beverage expectations",
  "Need for branding, screens, microphones, or presentation support",
  "Departure timing, transfer planning, and invoicing details",
];

const comparePages = [
  {
    href: "/yacht-charter-istanbul",
    title: "Yacht Charter Istanbul",
    description: "Start here if you are still choosing the charter package before the event format is fixed.",
  },
  {
    href: "/boat-rental-istanbul",
    title: "Boat Rental Istanbul",
    description: "Start here if the vessel choice and route come first, before the event brief is set.",
  },
  {
    href: "/proposal-yacht-rental-istanbul",
    title: "Proposal Yacht Rental",
    description: "Start here if this is actually a private proposal setup rather than a company brief.",
  },
  {
    href: "/private-bosphorus-dinner-cruise",
    title: "Private Dinner Cruise",
    description: "Start here if the request is really a private dinner rather than a company event brief.",
  },
  {
    href: "/private-events",
    title: "Private Events",
    description: "Use this for birthdays, engagements, family gatherings, or other celebration-led private events.",
  },
];

export default function CorporateEventsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="pt-28 pb-20 bg-[var(--surface-alt)]">
        <div className="container-main">
          <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-start mb-14">
            <div>
              <p className="inline-flex rounded-full bg-[var(--brand-primary)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--brand-primary)] mb-4">
                Private corporate yacht event
              </p>
              <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[var(--heading)] leading-tight">
                Corporate Yacht Events Istanbul
              </h1>
              <p className="text-[var(--text-muted)] max-w-2xl text-lg leading-relaxed mb-6">
                Use this page when the request is business-led: team dinners, client hosting,
                launch moments, executive dinners, or a polished company evening on the Bosphorus.
                If the brief is birthday, engagement, or family-led, use the private events page
                instead.
              </p>
              <div className="mb-6 rounded-2xl border border-[var(--brand-primary)]/10 bg-white p-4">
                <p className="text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)] mb-1">
                  Visible price
                </p>
                <p className="text-3xl font-bold text-[var(--heading)]">From EUR 280</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  Corporate bookings start with the event size, then scale through Essential,
                  Premium, and VIP depending on the vessel, catering, and A/V brief.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--brand-primary)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--brand-primary-hover)]"
                >
                  Plan corporate event <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border border-[var(--brand-primary)] px-6 py-3 font-semibold text-[var(--brand-primary)] transition-colors hover:bg-[var(--brand-primary)] hover:text-white"
                >
                  WhatsApp planning
                </a>
              </div>
            </div>

            <aside className="rounded-2xl border border-white bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-[var(--heading)] mb-4">What the planner usually sends first</h2>
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
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">Corporate price ladder</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {corporatePriceCards.map((item) => (
                <div key={item.title} className="rounded-xl border border-gray-100 bg-[var(--surface-alt)] p-4">
                  <p className="text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)] mb-2">
                    {item.price}
                  </p>
                  <h3 className="font-semibold text-[var(--heading)] mb-2">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12 rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">Route and service proof</h2>
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
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">
              When the corporate page is the right fit
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {eventFits.map((item) => (
                <div key={item.title} className="rounded-xl border border-gray-100 bg-[var(--surface-alt)] p-4">
                  <h3 className="font-semibold text-[var(--heading)] mb-2">{item.title}</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12 rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">Need a different service path?</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {comparePages.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl border border-gray-200 bg-[var(--surface-alt)] p-4 transition-colors hover:border-[var(--brand-primary)]/30 hover:bg-white"
                >
                  <span className="block text-base font-semibold text-[var(--heading)] mb-1">{item.title}</span>
                  <span className="block text-sm text-[var(--text-muted)]">{item.description}</span>
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-6">Corporate event FAQs</h2>
            <div className="space-y-4">
              {faqSchema.mainEntity.map((faq) => (
                <details key={faq.name} className="rounded-xl border border-gray-200 bg-[var(--surface-alt)] p-4 group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[var(--heading)]">
                    {faq.name}
                    <span className="text-gray-400 transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                    {faq.acceptedAnswer.text}
                  </p>
                </details>
              ))}
              <details className="rounded-xl border border-gray-200 bg-[var(--surface-alt)] p-4 group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[var(--heading)]">
                  How is this different from private events?
                  <span className="text-gray-400 transition-transform group-open:rotate-180">▼</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                  Corporate events are for company briefings, client hosting, launches, and team
                  dinners. Private events are for personal celebrations such as birthdays,
                  engagements, and family gatherings.
                </p>
              </details>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
