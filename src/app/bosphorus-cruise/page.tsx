import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sunset, UtensilsCrossed, Anchor, Compass } from "lucide-react";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Bosphorus Cruise Istanbul | Sunset Cruise Guide, Dinner & Yacht Options | MerrySails",
  description:
    "Explore MerrySails Bosphorus cruise options in Istanbul, starting with sunset cruise choices and then comparing dinner, proposal, corporate, and private charter pages.",
  alternates: { canonical: `${SITE_URL}/bosphorus-cruise` },
  openGraph: {
    title: "Bosphorus Cruise Istanbul | Sunset Cruise Guide, Dinner & Yacht Options | MerrySails",
    description:
      "Compare MerrySails Bosphorus sunset cruise, dinner cruise, and yacht charter options in Istanbul.",
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
  description: "A MerrySails page for comparing Bosphorus cruise options in Istanbul, starting with sunset cruise choices.",
  url: `${SITE_URL}/bosphorus-cruise`,
  about: [
    "Bosphorus sunset cruise",
    "Bosphorus dinner cruise",
    "Yacht charter Istanbul",
  ],
};

const primaryPages = [
  {
    icon: Sunset,
    href: "/cruises/bosphorus-sunset-cruise",
    title: "Bosphorus Sunset Cruise",
    meta: "EUR 34 · shared golden-hour cruise",
    description: "Best for sunset views, a relaxed shared setting, and the dedicated golden-hour booking path.",
  },
  {
    icon: UtensilsCrossed,
    href: "/istanbul-dinner-cruise",
    title: "Bosphorus Dinner Cruise",
    meta: "EUR 30 to EUR 90 · 4 package options",
    description: "Best for a shared evening cruise with dinner service, hotel pickup support, and Silver or Gold seating tiers.",
  },
  {
    icon: Anchor,
    href: "/yacht-charter-istanbul",
    title: "Yacht Charter Istanbul",
    meta: "From EUR 280 per yacht · 3 charter packages",
    description: "Best for private yacht hire when you want to choose the yacht first and shape the plan with extras.",
  },
];

const supportPages = [
  {
    href: "/boat-rental-istanbul",
    title: "Boat Rental Istanbul",
    description: "For lighter private hire and flexible boat options.",
  },
  {
    href: "/proposal-yacht-rental-istanbul",
    title: "Proposal Yacht Rental",
    description: "For marriage proposals with a private Bosphorus setting.",
  },
  {
    href: "/private-bosphorus-dinner-cruise",
    title: "Private Dinner Cruise",
    description: "For a private dinner-first yacht experience on the Bosphorus.",
  },
  {
    href: "/corporate-events",
    title: "Corporate Events",
    description: "For company gatherings, client dinners, and business events.",
  },
];

const faqItems = [
  {
    q: "Which Bosphorus cruise page should I choose first?",
    a: "MerrySails highlights three main options: Bosphorus Sunset Cruise, Bosphorus Dinner Cruise, and Yacht Charter Istanbul.",
  },
  {
    q: "Why are there separate pages as well?",
    a: "Separate pages make it easier to find the right experience for proposals, private dinners, boat rental, corporate events, and celebrations.",
  },
  {
    q: "Is this page the place to book?",
    a: "This page is a quick comparison point. Once you choose the experience you want, you can move to the matching page to enquire or book.",
  },
];

export default function BosphorusCruisePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(guideSchema) }} />

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
              Use this page to compare the main Bosphorus experiences from MerrySails and choose
              the one that fits your plans. If sunset is your main request, start with the dedicated
              sunset cruise page and use this hub to compare it with the dinner and private options.
            </p>
          </section>

          <section className="mb-12">
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
                  <h2 className="mb-2 text-xl font-bold text-[var(--heading)]">{page.title}</h2>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{page.description}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mb-12 rounded-2xl border border-gray-200 bg-white p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
                <Compass className="h-5 w-5 text-amber-600" />
              </div>
              <h2 className="text-2xl font-bold text-[var(--heading)]">More ways to plan your trip</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {supportPages.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  className="rounded-xl border border-gray-200 bg-[var(--surface-alt)] p-4 transition-colors hover:border-[var(--brand-primary)]/30 hover:bg-white"
                >
                  <span className="mb-1 block text-base font-semibold text-[var(--heading)]">{page.title}</span>
                  <span className="block text-sm text-[var(--text-muted)]">{page.description}</span>
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
              <Link href="/cruises" className="btn-cta !py-3 !px-6">
                View Full Cruise Index
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/cruises/bosphorus-sunset-cruise"
                className="inline-flex items-center justify-center rounded-full border border-[var(--brand-primary)] px-6 py-3 font-semibold text-[var(--brand-primary)] transition-colors hover:bg-[var(--brand-primary)] hover:text-white"
              >
                Open Sunset Cruise
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
