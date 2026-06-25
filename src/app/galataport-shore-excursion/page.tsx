import type { Metadata } from "next";
import Link from "next/link";
import { buildHreflang } from "@/lib/hreflang";
import { SITE_URL, WHATSAPP_URL, PHONE_DISPLAY } from "@/lib/constants";
import QuickAnswer from "@/components/ai/QuickAnswer";

export const revalidate = 3600;

const PAGE_PATH = "/galataport-shore-excursion";
const canonicalUrl = `${SITE_URL}${PAGE_PATH}`;

export const metadata: Metadata = {
  // Source title ≤47 chars (root layout appends " | MerrySails").
  title: "Galataport Shore Excursion Istanbul",
  description:
    "Bosphorus shore excursions from Galataport cruise terminal, Karaköy. Sunset from €30, dinner from €30, private yacht from €220 — walkable, timed for layovers.",
  alternates: {
    canonical: canonicalUrl,
    languages: buildHreflang(PAGE_PATH),
  },
  openGraph: {
    title: "Galataport Shore Excursion Istanbul",
    description:
      "Step off your cruise ship at Galataport and sail the Bosphorus — sunset, dinner and private yacht options from €30, boarding piers a short walk from the terminal.",
    url: canonicalUrl,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Galataport Shore Excursion Istanbul",
    description:
      "Bosphorus shore excursions from Galataport: sunset from €30, dinner from €30, private yacht from €220. Walkable from the cruise terminal in Karaköy.",
  },
};

// Real, bookable options reachable from Galataport. Prices, durations and
// piers are taken from src/data/tours.ts and src/data/fleet.ts — no invented
// figures. (Sunset: from €30 Mon/Tue/Thu, €34 other days, Karaköy 19:00, ~2h.
// Dinner: from €30, Kabataş 20:30, ~3.5h. Private yacht: from €220 per boat.)
const OPTIONS = [
  {
    name: "Bosphorus Sunset Cruise",
    href: "/cruises/bosphorus-sunset-cruise",
    type: "Shared",
    priceFrom: "From €30",
    priceNote: "per person (€30 Mon/Tue/Thu, €34 other days)",
    duration: "~2 hours",
    departs: "Boards from Karaköy ferry pier, sails 19:00",
    bestFor:
      "Cruise passengers with a late-afternoon free window who want the golden-hour skyline without a full dinner programme.",
    walkNote:
      "The Karaköy boarding pier is the closest of all our departure points to Galataport — a short walk along the waterfront from the cruise terminal.",
  },
  {
    name: "Bosphorus Dinner Cruise",
    href: "/istanbul-dinner-cruise",
    type: "Shared",
    priceFrom: "From €30",
    priceNote: "per person, 4 package tiers up to €90",
    duration: "~3.5 hours",
    departs: "Boards from Kabataş Pier, sails 20:30",
    bestFor:
      "Passengers overnighting in port or on a long evening layover who want dinner, a Turkish-night show and the illuminated strait.",
    walkNote:
      "Kabataş Pier is one tram stop (T1) or a short taxi ride from Galataport along the shore road.",
  },
  {
    name: "Private Yacht Charter",
    href: "/yacht-charter-istanbul",
    type: "Private",
    priceFrom: "From €220",
    priceNote: "per yacht (whole vessel, not per person), 2-hour entry rate",
    duration: "2 hours, extendable",
    departs: "Flexible departure time and pier — set to your layover window",
    bestFor:
      "Families or small groups off a single ship who want a private deck on their own schedule, with the pickup pier arranged around the ship's departure time.",
    walkNote:
      "Because the charter is private, we set the boarding pier and time to fit your cruise-ship schedule — including a Karaköy boarding berth beside Galataport when available.",
  },
] as const;

const FAQS = [
  {
    q: "What is a Galataport shore excursion?",
    a: "Galataport is Istanbul's cruise terminal in Karaköy, on the European shore of the Bosphorus. A Galataport shore excursion is any tour you join after disembarking your cruise ship there. A Bosphorus cruise is one of the most popular options because the boarding piers sit a short walk or one tram stop from the terminal, so you can be on the water without a long transfer eating into your time ashore.",
  },
  {
    q: "How far is the Bosphorus cruise pier from Galataport?",
    a: "Our Karaköy sunset-cruise boarding pier is the closest — a short walk along the waterfront from the Galataport terminal. The Kabataş dinner-cruise pier is one stop on the T1 tram or a brief taxi ride. For private yacht charters we can arrange a Karaköy boarding berth beside Galataport when one is available, so you barely leave the dock area.",
  },
  {
    q: "Which cruise fits a cruise-ship layover best?",
    a: "If your ship leaves in the evening, the ~2-hour sunset cruise (from €30) is the safest fit — it boards from Karaköy at 19:00 and returns within roughly two hours. If you are overnighting in port, the ~3.5-hour dinner cruise (from €30) adds a full Turkish-night dinner and show. If you want full control of the timing, a private yacht charter (from €220 per boat) lets us set the departure around your ship's all-aboard time.",
  },
  {
    q: "How much does a Bosphorus cruise from Galataport cost?",
    a: "The shared sunset cruise starts at €30 per person (Monday, Tuesday and Thursday sailings; €34 on other days). The shared dinner cruise starts at €30 per person, with package tiers up to €90. A private yacht charter starts at €220 for the whole vessel on a 2-hour sailing — that price is per boat, not per guest. There is no separate Galataport surcharge.",
  },
  {
    q: "Should cruise passengers book ahead?",
    a: "Yes. In high season (May–September) the shared cruises fill quickly, and private yachts need their pier and timing arranged in advance to match your ship's schedule. Book direct at merrysails.com or message us on WhatsApp at +90 544 898 98 12 — we confirm in writing, usually within an hour, and free cancellation applies up to 48 hours before departure.",
  },
  {
    q: "Will I make it back before my ship departs?",
    a: "We plan the timing around your all-aboard time. Tell us your ship's name and departure time when you book and we will recommend the cruise that leaves the widest safety margin — and for private charters we set the return time deliberately early. We have hosted 50,000+ guests on the Bosphorus and know how tight a layover can be.",
  },
];

export default function GalataportShoreExcursionPage() {
  const touristTripSchema = {
    "@context": "https://schema.org",
    "@type": ["TouristTrip", "Service"],
    "@id": `${canonicalUrl}#trip`,
    name: "Galataport Shore Excursion — Bosphorus Cruise",
    description:
      "Bosphorus shore excursions for cruise passengers disembarking at Galataport, Istanbul: shared sunset and dinner cruises plus private yacht charters from piers near the terminal.",
    touristType: ["Cruise Tourism", "Sightseeing"],
    url: canonicalUrl,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "City", name: "Istanbul" },
    offers: {
      "@type": "AggregateOffer",
      lowPrice: 30,
      highPrice: 220,
      priceCurrency: "EUR",
      offerCount: OPTIONS.length,
      availability: "https://schema.org/InStock",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Bosphorus Cruise", item: `${SITE_URL}/bosphorus-cruise` },
      { "@type": "ListItem", position: 3, name: "Galataport Shore Excursion", item: canonicalUrl },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "en",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(touristTripSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="pt-28 pb-20 bg-[var(--surface-alt)]">
        <div className="container-main">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6">
            <Link href="/" className="hover:text-[var(--brand-primary)]">Home</Link>
            <span>/</span>
            <Link href="/bosphorus-cruise" className="hover:text-[var(--brand-primary)]">Bosphorus Cruise</Link>
            <span>/</span>
            <span className="text-[var(--heading)] truncate">Galataport Shore Excursion</span>
          </nav>

          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--heading)] mb-4">
              Galataport Shore Excursion — Bosphorus Cruise from the Cruise Terminal
            </h1>
            <p className="max-w-3xl text-base leading-relaxed text-[var(--text-muted)]">
              Galataport is Istanbul&apos;s cruise terminal in Karaköy, on the European shore of the
              Bosphorus. If your ship docks here, you are already at the doorstep of the strait — our
              boarding piers are a short walk or one tram stop away, so a Bosphorus cruise fits neatly
              into a shore day without a long transfer. Below are the cruises you can join from
              Galataport, with real prices, timings and how each one fits a cruise-ship layover.
            </p>
          </header>

          <QuickAnswer
            locale="en"
            title="Galataport Shore Excursion — MerrySails"
            question="What can I do on a Galataport shore excursion in Istanbul?"
            content="Galataport is Istanbul's cruise terminal in Karaköy, on the European Bosphorus shore. The most convenient shore excursion is a Bosphorus cruise, because the boarding piers are walkable or one T1 tram stop from the terminal. Three options fit different layovers: a shared sunset cruise from €30 per person (~2 hours, boards Karaköy at 19:00), a shared dinner cruise from €30 per person with a Turkish-night show (~3.5 hours, boards Kabataş at 20:30), and a private yacht charter from €220 per boat with a flexible departure time set around your ship's schedule. MerrySails is TÜRSAB A-Group licensed since 2001 (#14316) and has hosted 50,000+ guests. Book direct at merrysails.com or WhatsApp +90 544 898 98 12 — written confirmation usually within an hour, free cancellation up to 48 hours before departure."
          />

          {/* Why a Bosphorus cruise is the natural Galataport excursion */}
          <section className="mt-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">
              Why a Bosphorus cruise is the natural shore excursion from Galataport
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-[var(--text-muted)]">
              <p>
                Galataport opened in Karaköy as a dedicated cruise terminal on the European bank of
                the Bosphorus, with the passenger terminal built below the promenade so the waterfront
                stays open. That location matters for a shore excursion: the strait you came to see is
                right in front of the terminal, and the southern stretch of the Bosphorus — from the old
                city up to Rumeli Hisarı — holds the densest run of Ottoman waterfront palaces, mosques
                and fortresses anywhere in Istanbul.
              </p>
              <p>
                A Bosphorus cruise turns a few free hours into the city&apos;s signature view: Dolmabahçe
                Palace, the Maiden&apos;s Tower on its islet off the Asian shore, Ortaköy Mosque framed by
                the first Bosphorus Bridge, and the 1452 fortress of Rumeli Hisarı, all seen from the
                water. Because our Karaköy boarding pier is a short walk from Galataport, you spend your
                time on the strait rather than in transit.
              </p>
              <p className="text-[var(--heading)] font-medium">
                MerrySails operates under Meryem Yıldız Travel — TÜRSAB A-Group licensed since 2001
                (#14316), with 50,000+ guests hosted on the Bosphorus.
              </p>
            </div>
          </section>

          {/* The options */}
          <section className="mt-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">
              Bosphorus cruise options reachable from Galataport
            </h2>
            <div className="grid gap-5 md:grid-cols-3">
              {OPTIONS.map((opt) => (
                <div key={opt.name} className="flex flex-col rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-5">
                  <div className="mb-3">
                    <span className="inline-block rounded-full bg-[var(--brand-primary)]/10 px-3 py-0.5 text-xs font-semibold text-[var(--brand-primary)]">
                      {opt.type}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[var(--heading)] mb-1">{opt.name}</h3>
                  <p className="text-xl font-bold text-[var(--brand-primary)]">{opt.priceFrom}</p>
                  <p className="text-xs text-[var(--text-muted)] mb-3">{opt.priceNote}</p>
                  <ul className="mb-4 space-y-1.5 text-sm text-[var(--text-muted)]">
                    <li><span className="font-semibold text-[var(--heading)]">Duration:</span> {opt.duration}</li>
                    <li><span className="font-semibold text-[var(--heading)]">Departs:</span> {opt.departs}</li>
                  </ul>
                  <p className="mb-3 text-sm leading-relaxed text-[var(--text-muted)]">{opt.bestFor}</p>
                  <p className="mb-4 text-xs leading-relaxed text-[var(--text-muted)] italic">{opt.walkNote}</p>
                  <Link
                    href={opt.href}
                    className="mt-auto inline-flex items-center justify-center rounded-xl bg-[var(--brand-primary)] px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    View {opt.name} →
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* Timing your excursion around the ship */}
          <section className="mt-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">
              Timing a Bosphorus cruise around your cruise-ship layover
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-[var(--text-muted)]">
              <p>
                The single most important thing on a shore day is being back before all-aboard. Tell us
                your ship&apos;s name and departure time when you book and we will steer you to the cruise
                that leaves the widest safety margin. As a rule of thumb: an evening departure pairs well
                with the ~2-hour sunset cruise, which boards at 19:00 from Karaköy beside Galataport and
                returns within roughly two hours.
              </p>
              <p>
                If you are overnighting in port, the ~3.5-hour dinner cruise adds a full Turkish-night
                dinner and live show from Kabataş Pier — one T1 tram stop from the terminal. For complete
                control of the clock, a private yacht charter lets us set the departure and return time
                directly around your ship&apos;s schedule, so the timing is never left to a fixed public
                sailing.
              </p>
              <p>
                Whichever you choose, book ahead in high season and message us your layover window — a
                little planning is the difference between a relaxed sail and a rushed taxi back to the
                terminal. You can compare every option side by side on our{" "}
                <Link href="/compare-bosphorus-cruises" className="font-semibold text-[var(--brand-primary)] underline">
                  Bosphorus cruise comparison
                </Link>{" "}
                page, or read the full{" "}
                <Link href="/bosphorus-cruise" className="font-semibold text-[var(--brand-primary)] underline">
                  Bosphorus cruise guide
                </Link>.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Plan my excursion on WhatsApp
              </a>
              <a href={`tel:${PHONE_DISPLAY.replace(/\s/g, "")}`} className="btn-secondary">
                Call {PHONE_DISPLAY}
              </a>
            </div>
          </section>

          {/* FAQ */}
          <section className="mt-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">Galataport shore excursion FAQ</h2>
            <div className="space-y-4">
              {FAQS.map(({ q, a }) => (
                <details key={q} className="rounded-xl border border-[var(--line)] p-4">
                  <summary className="cursor-pointer font-semibold text-[var(--heading)]">{q}</summary>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{a}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
