import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Private Bosphorus Event Types in Istanbul | MerrySails",
  description:
    "Compare private Bosphorus event pages for proposals, private dinners, celebrations, and corporate requests. For general private yacht charter, start with Yacht Charter Istanbul.",
  alternates: { canonical: "https://merrysails.com/private-tours" },
  openGraph: {
    title: "Private Bosphorus Event Types in Istanbul | MerrySails",
    description:
      "Proposal, private dinner, celebration, and corporate Bosphorus event pages from MerrySails. Use Yacht Charter Istanbul for general private charter intent.",
    url: "https://merrysails.com/private-tours",
    type: "website" as const,
    images: [{ url: "https://merrysails.com/og-image.jpg", width: 1200, height: 630, alt: "MerrySails — Bosphorus Cruise Istanbul" }],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Private Bosphorus Event Types in Istanbul",
  description: "Compare MerrySails pages for proposal yachts, private dinner cruises, private celebrations, and corporate yacht events in Istanbul.",
  provider: {
    "@id": "https://merrysails.com/#organization",
  },
  areaServed: { "@type": "City", name: "Istanbul" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
  name: "Private Yacht Packages",
  itemListElement: [
      { "@type": "Service", name: "Proposal Yacht Rental", description: "A private Bosphorus yacht experience for marriage proposals." },
      { "@type": "Service", name: "Private Dinner Cruise", description: "A dinner-first private yacht experience for Bosphorus evenings." },
      { "@type": "Service", name: "Corporate Yacht Events", description: "Private corporate hosting, client dinners, and company events on the Bosphorus." },
    ],
  },
};

const privateFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "How should I use the private Bosphorus event hub?", acceptedAnswer: { "@type": "Answer", text: "Use this page to compare proposal, private dinner, celebration, and corporate event paths. If you are still choosing a general private yacht package, start with the Yacht Charter Istanbul page." }},
    { "@type": "Question", name: "Can I organize a marriage proposal on a yacht?", acceptedAnswer: { "@type": "Answer", text: "Yes. MerrySails uses a dedicated proposal page for Bosphorus yacht proposals so timing, privacy, styling, and photographer planning can stay central to the quote." }},
    { "@type": "Question", name: "What events can I host on a private yacht?", acceptedAnswer: { "@type": "Answer", text: "Common private Bosphorus requests include proposals, private dinners, birthdays, anniversaries, celebration-led private events, and corporate hosting. The site separates these paths so guests can start from the right page." }},
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://merrysails.com" },
    { "@type": "ListItem", position: 2, name: "Private Event Types", item: "https://merrysails.com/private-tours" },
  ],
};

const primaryRoutingCards = [
  {
    href: "/yacht-charter-istanbul",
    title: "Yacht Charter Istanbul",
    description: "Use this for generic private yacht packages, charter tiers, route length, and base private Bosphorus pricing.",
  },
  {
    href: "/boat-rental-hourly-istanbul",
    title: "Boat Rental Hourly",
    description: "Use this when the vessel, shorter duration, and hour-led private-hire logic come first instead of a full charter package.",
  },
];

const supportOwnerCards = [
  {
    href: "/proposal-yacht-with-photographer-istanbul",
    title: "Proposal with Photographer",
    description: "Proposal planning for photographer-led reveals, discreet coverage, and a private Bosphorus setup.",
  },
  {
    href: "/private-dinner-cruise-for-couples-istanbul",
    title: "Couples Private Dinner",
    description: "Dinner-first private yacht planning for honeymoon, anniversary, and quieter couple-led evenings.",
  },
  {
    href: "/corporate-yacht-dinner-istanbul",
    title: "Corporate Yacht Dinner",
    description: "Dinner-led private yacht planning for companies that already know the evening format should stay dinner-first.",
  },
  {
    href: "/client-hosting-yacht-istanbul",
    title: "Client Hosting Yacht",
    description: "Business-led yacht planning when guest impression and hosting rhythm matter more than a broad event label.",
  },
  {
    href: "/team-building-yacht-istanbul",
    title: "Team Building Yacht",
    description: "Company support route for team-connection-led Bosphorus plans instead of a broader corporate brief.",
  },
  {
    href: "/private-events",
    title: "Private Celebrations",
    description: "Occasion-led routing for birthdays, anniversaries, and broader celebration requests that are not dinner-first.",
  },
];

export default function PrivateToursPage() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(privateFaqSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    <div className="pt-28 pb-20 bg-[var(--surface-alt)]">
      <div className="container-main">
        <div className="text-center mb-14">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Private Bosphorus Event Types in Istanbul</h1>
          <p className="text-[var(--text-muted)] max-w-2xl mx-auto text-lg">
            Use this hub to compare proposal, private dinner, celebration, and corporate Bosphorus
            pages without forcing different intents into the same booking path.
          </p>
        </div>

        <section className="mb-12 rounded-2xl border border-[var(--brand-primary)]/15 bg-white p-6">
          <h2 className="text-2xl font-bold mb-3">Start with Yacht Charter Istanbul for generic private yacht demand</h2>
          <p className="max-w-3xl text-[var(--text-muted)] leading-relaxed">
            If you are still comparing private yacht size, charter length, route, or base package
            pricing, the owner page is{" "}
            <Link href="/yacht-charter-istanbul" className="font-semibold text-[var(--brand-primary)] hover:underline">
              Yacht Charter Istanbul
            </Link>
            . Use the sections below when the request is already narrowed to proposal, dinner,
            celebration, or corporate event intent.
          </p>
        </section>

        <section className="mb-12 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Not a price owner",
              description: "This page is a router for private-event intent. Public charter pricing belongs on Yacht Charter Istanbul, not here.",
            },
            {
              title: "Use when the occasion is already clear",
              description: "Proposal, private dinner, celebration, and corporate demand should move from here into the dedicated page as quickly as possible.",
            },
            {
              title: "Quote first, vessel second",
              description: "If the request is about the event brief rather than a generic charter tier, this hub helps route that conversation correctly.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-[var(--heading)]">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{item.description}</p>
            </div>
          ))}
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Start with the right private Bosphorus path</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {primaryRoutingCards.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-[var(--brand-primary)]/30 hover:shadow-sm"
              >
                <h3 className="text-lg font-semibold text-[var(--heading)] transition-colors group-hover:text-[var(--brand-primary)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{item.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand-primary)]">
                  Open page <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Private event owners and support pages</h2>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {supportOwnerCards.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-[var(--brand-primary)]/30 hover:shadow-sm"
              >
                <h3 className="text-lg font-semibold text-[var(--heading)] transition-colors group-hover:text-[var(--brand-primary)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{item.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand-primary)]">
                  View details <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-3xl bg-[var(--heading)] p-6 text-white md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-white/60">
                Private Bosphorus planning
              </p>
              <h2 className="mb-3 text-2xl font-bold text-white md:text-3xl">
                Not sure which private yacht option fits your event?
              </h2>
              <p className="max-w-2xl text-sm leading-relaxed text-white/75">
                Send the date, guest count, and occasion. We will route you to yacht charter,
                proposal, private dinner, corporate event, or boat rental without mixing the
                booking paths.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[var(--heading)] transition-colors hover:bg-white/90"
              >
                Ask for the right option <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/yacht-charter-istanbul"
                className="inline-flex items-center justify-center rounded-xl border border-white/35 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                Compare yacht charter
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
    </>
  );
}
