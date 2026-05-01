import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getTourBySlug } from "@/data/tours";
import { SITE_URL, WHATSAPP_URL } from "@/lib/constants";
import { buildHreflang } from "@/lib/hreflang";

export const revalidate = 3600;

const corporateTour = getTourBySlug("corporate-event-bosphorus-cruise");

if (!corporateTour) {
  throw new Error("Corporate event data is missing.");
}

export const metadata: Metadata = {
  title: "Corporate Yacht Events Istanbul 2026 | Company Event Planning | MerrySails",
  description:
    "Plan corporate yacht events in Istanbul for team dinners, client hosting, launches, and company evenings with quote-led Bosphorus event support.",
  alternates: { canonical: `${SITE_URL}/corporate-events`, languages: buildHreflang("/corporate-events") },
  openGraph: {
    title: "Corporate Yacht Events Istanbul 2026 | Company Event Planning | MerrySails",
    description:
      "Quote-led corporate Bosphorus event planning with support for guest flow, catering, branding, and invoicing.",
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
      availability: "https://schema.org/InStock",
      validFrom: "2026-01-01",
      url: `${SITE_URL}/corporate-events`,
      itemOffered: {
        "@type": "Service",
        name: pkg.name,
        description: pkg.description,
      },
    })),
  },
};

const corporatePlanningFormats = corporateTour.packages?.map((pkg) => ({
  title: pkg.name,
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

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Corporate Events", item: `${SITE_URL}/corporate-events` },
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
    title: "Quote-led company brief",
    body: "Corporate planning starts with the guest list, timing, and service needs before the vessel and commercial structure are confirmed.",
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

const quickFacts = [
  ["Best for", "Company dinners, client hosting, launches, and executive events that need a private Bosphorus venue."],
  ["Owner page role", "This is the main corporate owner page before the brief narrows into client hosting, launch, or dinner-only support."],
  ["Quote variables", "Guest count, catering, transfer flow, branding, AV needs, invoice details, and vessel scale."],
  ["Departure logic", "The final marina and boarding plan are tied to the assigned vessel and the event format."],
];

const comparePages = [
  {
    href: "/client-hosting-yacht-istanbul",
    title: "Client Hosting Yacht",
    description: "Start here if the company brief is specifically client-hosting-led and should stay narrower than the broad corporate owner page.",
  },
  {
    href: "/team-building-yacht-istanbul",
    title: "Team Building Yacht",
    description: "Start here if the company brief is specifically team-building-led and should stay narrower than the broad corporate owner page.",
  },
  {
    href: "/product-launch-yacht-istanbul",
    title: "Product Launch Yacht",
    description: "Start here if the company brief is specifically a launch, reveal, or showcase-led Bosphorus yacht format.",
  },
  {
    href: "/corporate-yacht-dinner-istanbul",
    title: "Corporate Yacht Dinner",
    description: "Start here if the company brief is already dinner-led and should stay narrower than the full corporate-events owner page.",
  },
  {
    href: "/yacht-charter-istanbul",
    title: "Yacht Charter Istanbul",
    description: "Start here if you are still choosing the charter package before the event format is fixed.",
  },
  {
    href: "/boat-rental-hourly-istanbul",
    title: "Boat Rental Hourly",
    description: "Start here if the private-hire brief is shorter, lighter, and hour-led before the company format is fixed.",
  },
  {
    href: "/proposal-yacht-with-photographer-istanbul",
    title: "Proposal with Photographer",
    description: "Start here if this is actually a photographer-led private proposal setup rather than a company brief.",
  },
  {
    href: "/private-dinner-cruise-for-couples-istanbul",
    title: "Couples Private Dinner",
    description: "Start here if the request is really a quieter couple-led private dinner rather than a company event brief.",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

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
                  Quote-led planning
                </p>
                <p className="text-3xl font-bold text-[var(--heading)]">Built around the brief</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  Corporate bookings start with guest flow, catering, branding, transfer, and invoicing needs.
                  The vessel and commercial structure are then matched to the event rather than pushed as a generic yacht package.
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
              <h2 className="text-lg font-semibold text-[var(--heading)] mb-4">What helps us plan your corporate yacht event</h2>
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
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">Corporate yacht events Istanbul quick facts</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {quickFacts.map(([label, value]) => (
                <div key={label} className="rounded-xl border border-gray-100 bg-[var(--surface-alt)] p-4">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[var(--brand-primary)]">{label}</p>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{value}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12 rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">Corporate event planning formats</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {corporatePlanningFormats.map((item) => (
                <div key={item.title} className="rounded-xl border border-gray-100 bg-[var(--surface-alt)] p-4">
                  <h3 className="font-semibold text-[var(--heading)] mb-2">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12 rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">Bosphorus route and corporate service proof</h2>
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
                  <h3 className="text-base font-semibold text-[var(--heading)] mb-1">{item.title}</h3>
                  <p className="text-sm text-[var(--text-muted)]">{item.description}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mb-12 rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
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

          <section className="rounded-3xl bg-[var(--heading)] p-6 text-white md:p-8">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-white/60">
                  Corporate enquiry
                </p>
                <h2 className="mb-3 text-2xl font-bold text-white md:text-3xl">
                  Ready to plan a corporate yacht event on the Bosphorus?
                </h2>
                <p className="max-w-2xl text-sm leading-relaxed text-white/75">
                  Share the date, guest count, event type, and whether you need catering, branding,
                  or presentation support. If the request is actually a private celebration, we will
                  route you to the right private event page instead.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[var(--heading)] transition-colors hover:bg-white/90"
                >
                  Send event brief <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border border-white/35 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
                >
                  WhatsApp planning
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
