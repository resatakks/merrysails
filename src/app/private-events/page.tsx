import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SITE_URL, WHATSAPP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Private Events Bosphorus | Birthday, Proposal & Celebration Services | MerrySails",
  description:
    "Private Bosphorus event planning for birthdays, anniversaries, celebration dinners, and proposal-adjacent requests in Istanbul.",
  alternates: { canonical: `${SITE_URL}/private-events` },
  openGraph: {
    title: "Private Events Bosphorus | Birthday, Proposal & Celebration Services | MerrySails",
    description:
      "Private Bosphorus event planning for birthdays, anniversaries, celebration dinners, and flexible private gatherings.",
    url: `${SITE_URL}/private-events`,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Private Bosphorus events in Istanbul — MerrySails",
      },
    ],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Private Events on the Bosphorus",
  description:
    "Private Bosphorus event planning for birthdays, anniversaries, proposals, celebration dinners, and private group evenings.",
  provider: {
    "@id": `${SITE_URL}/#organization`,
  },
  areaServed: { "@type": "City", name: "Istanbul" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Private Event Formats",
    itemListElement: [
      { "@type": "Service", name: "Birthday Event", description: "Private Bosphorus birthday planning and celebration flow." },
      { "@type": "Service", name: "Anniversary Event", description: "Anniversary-led Bosphorus planning with private service options." },
      { "@type": "Service", name: "Celebration Dinner", description: "Private celebration-led Bosphorus evening planning." },
    ],
  },
};

const faqItems = [
  {
    q: "How are private event requests priced?",
    a: "Private event pricing depends on guest count, timing, vessel type, food and drink expectations, and the level of styling or entertainment needed.",
  },
  {
    q: "Which occasions fit this page best?",
    a: "This page works best for birthdays, anniversaries, flexible celebrations, and private gatherings that are not primarily a proposal page or a corporate event page.",
  },
  {
    q: "Can you arrange decoration, cake, music, or photography?",
    a: "Yes. Decoration, cake, photographer, music, flowers, and onboard service details can all be planned as part of the event brief.",
  },
];

const comparePages = [
  {
    href: "/proposal-yacht-rental-istanbul",
    title: "Proposal Yacht Rental",
    description: "Use this when the proposal reveal is the center of the booking.",
  },
  {
    href: "/private-bosphorus-dinner-cruise",
    title: "Private Dinner Cruise",
    description: "Use this when a seated dinner-first experience is the main priority.",
  },
  {
    href: "/corporate-events",
    title: "Corporate Events",
    description: "Use this when the request is company-led and needs invoicing or guest-flow planning.",
  },
];

const eventFits = [
  {
    title: "Birthday celebrations",
    body: "Best when the event needs a private onboard setting with room for cake, photos, music, and a custom run of show.",
  },
  {
    title: "Anniversaries and milestones",
    body: "Best when the evening needs a celebratory structure but not necessarily a proposal-first or dinner-first format.",
  },
  {
    title: "Flexible private gatherings",
    body: "Best when the group wants a private Bosphorus evening and the final format still needs shaping.",
  },
  {
    title: "Celebration-led requests",
    body: "Best when the group wants a flexible private event rather than a fixed shared cruise package.",
  },
];

export default function PrivateEventsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <main className="pt-28 pb-20 bg-[var(--surface-alt)]">
        <div className="container-main">
          <section className="text-center mb-14">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[var(--heading)]">
              Private Events on the Bosphorus
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-[var(--text-muted)]">
              This page is for birthdays, anniversaries, and flexible celebration requests that
              need a private Bosphorus setup without forcing every event into the same booking path.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--brand-primary)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--brand-primary-hover)]"
              >
                Plan private event <ArrowRight className="w-4 h-4" />
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
          </section>

          <section className="mb-12 rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-2xl font-bold mb-4 text-[var(--heading)]">When this page is the right fit</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {eventFits.map((event) => (
                <div key={event.title} className="rounded-xl border border-gray-100 bg-[var(--surface-alt)] p-4">
                  <h3 className="font-semibold text-[var(--heading)] mb-2">{event.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{event.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12 rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-2xl font-bold mb-4 text-[var(--heading)]">Looking for a more specific option?</h2>
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
            <h2 className="text-2xl font-bold mb-6 text-[var(--heading)]">Private event FAQs</h2>
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
