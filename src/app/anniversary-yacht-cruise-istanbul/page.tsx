import type { Metadata } from "next";
import Link from "next/link";
import { buildHreflang } from "@/lib/hreflang";
import { SITE_URL, WHATSAPP_URL, TURSAB_LICENSE_NUMBER } from "@/lib/constants";
import { ArrowRight, Heart, Calendar, Camera, Music, Cake } from "lucide-react";
import SocialProofBadges from "@/components/ui/SocialProofBadges";
import StickyMobileCta from "@/components/ui/StickyMobileCta";

/**
 * /anniversary-yacht-cruise-istanbul
 *
 * Created 2026-06-01 as part of the Tier-2 niche-conversion page set.
 * Anniversary intent is distinct from proposal intent:
 *   - Couple already committed (no surprise mechanics)
 *   - Focus on shared memory + restaurant-on-water feel
 *   - Often involves the original engagement date — heavier on memory/photo
 *   - Higher repeat-cruise intent (anniversary cruises become traditions)
 *
 * Separate from /proposal-yacht-rental-istanbul (different emotion graph,
 * different SERP intent — Google distinguishes "propose" vs "anniversary"
 * verbatim).
 */

export const metadata: Metadata = {
  title: "Anniversary Yacht Cruise Istanbul",
  description:
    "Private yacht for your anniversary on the Bosphorus. From €220 for 2 hours with captain and crew. Dinner, cake, photographer, sunset timing — built around your date.",
  alternates: {
    canonical: `${SITE_URL}/anniversary-yacht-cruise-istanbul`,
    languages: buildHreflang("/anniversary-yacht-cruise-istanbul"),
  },
  openGraph: {
    title: "Anniversary Yacht Cruise Istanbul",
    description:
      "Private yacht charter for anniversaries on the Bosphorus. Custom timing, dinner, photographer, sunset hour. TÜRSAB A licensed since 2001.",
    url: `${SITE_URL}/anniversary-yacht-cruise-istanbul`,
    type: "article",
  },
};

const faqItems = [
  {
    q: "How much is a private anniversary yacht cruise in Istanbul?",
    a: "Private anniversary yacht charter starts at €220 for 2 hours on our Boutique yacht (up to 12 guests). The larger Premium yacht with extended deck and decorated styling is €320 (up to 15 guests). The price is per yacht — couple, family, or close-friend group all included. 10% discount on 3+ hour bookings.",
  },
  {
    q: "What's the difference between an anniversary and proposal yacht cruise?",
    a: "An anniversary cruise celebrates an established couple — no surprise mechanic required, more emphasis on shared dinner, golden-hour photos, and the route passing places that matter to the relationship. A proposal cruise is built around a hidden moment with strict timing. Same yachts, different programme.",
  },
  {
    q: "Can we time the cruise around our original wedding/engagement date?",
    a: "Yes. We schedule anniversary charters by the date and the sunset hour of that specific day in Istanbul. If your anniversary is in summer (sunset ~20:30), boarding is 19:30. In winter (sunset ~17:00), boarding is 16:00. Send the date and we time the cruise around it.",
  },
  {
    q: "Can we add dinner, cake, photographer, violinist, or flowers?",
    a: "All of the above. Anniversary cruises commonly add: a custom anniversary cake with year count, professional photographer (delivers 50+ edited photos within 7 days), live violinist for the boarding moment, fresh flower bouquet, champagne service, and full multi-course dinner. Send the date and what matters most.",
  },
  {
    q: "What route works best for an anniversary cruise?",
    a: "Most couples choose the southern Bosphorus loop — Dolmabahçe Palace, Ortaköy Mosque, the first Bosphorus Bridge, Rumeli Hisarı turn-around — because it passes Istanbul's most photographable landmarks during golden hour. We can also detour to a specific spot that matters (a hotel where you stayed, a restaurant where you got engaged).",
  },
  {
    q: "How far ahead should we book an anniversary cruise?",
    a: "For weekday anniversaries, 5-7 days is comfortable. For weekend or summer-peak (June-September), book 2-3 weeks ahead. For anniversary dates that fall on Valentine's Day or New Year's Eve, book 4-6 weeks ahead — those slots fill fastest.",
  },
  {
    q: "Is there a milestone anniversary package (10th, 25th, 50th)?",
    a: "We don't have rigid milestone packages — instead we customize. Common 25th and 50th anniversary additions: a printed yacht-keepsake card with the cruise date, a second photographer for family arrivals at the pier (when adult children join the surprise), and a guided narration of the route's landmarks tied to the year you got married.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "h2", ".answer-capsule"],
  },
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
  name: "Anniversary Yacht Cruise Istanbul",
  serviceType: "Private yacht charter for anniversaries",
  description:
    "Private yacht charter on the Bosphorus for wedding anniversaries and milestone celebrations. Custom dinner, photography, music, and sunset timing.",
  provider: {
    "@id": `${SITE_URL}/#organization`,
  },
  areaServed: {
    "@type": "City",
    name: "Istanbul",
  },
  offers: {
    "@type": "Offer",
    url: `${SITE_URL}/anniversary-yacht-cruise-istanbul`,
    price: "220",
    priceCurrency: "EUR",
    priceSpecification: {
      "@type": "PriceSpecification",
      price: "220",
      priceCurrency: "EUR",
      description: "From €220 for a 2-hour private yacht charter, all-included base price.",
    },
    availability: "https://schema.org/InStock",
    validFrom: "2026-01-01",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Yacht Charter Istanbul", item: `${SITE_URL}/yacht-charter-istanbul` },
    { "@type": "ListItem", position: 3, name: "Anniversary Yacht Cruise", item: `${SITE_URL}/anniversary-yacht-cruise-istanbul` },
  ],
};

export default function AnniversaryYachtCruisePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main className="min-h-screen bg-[var(--surface-alt)] pt-28 pb-20">
        <div className="container-main max-w-4xl">
          <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-sm text-[var(--text-muted)]">
            <Link href="/" className="hover:text-[var(--brand-primary)]">Home</Link>
            <span>/</span>
            <Link href="/yacht-charter-istanbul" className="hover:text-[var(--brand-primary)]">Yacht Charter Istanbul</Link>
            <span>/</span>
            <span className="text-[var(--heading)] truncate">Anniversary Yacht Cruise</span>
          </nav>

          {/* Above-the-fold conversion card */}
          <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-[var(--brand-primary)]/15 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:gap-5">
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--brand-primary)]">
                2 hours · Private yacht
              </p>
              <h1 className="mt-1 text-2xl font-bold leading-tight text-[var(--heading)] sm:text-3xl">
                Anniversary Yacht Cruise Istanbul
              </h1>
              <p className="mt-1 text-sm text-[var(--text-muted)]">
                <span className="font-semibold text-[var(--heading)]">From €220</span>
                <span className="mx-2">·</span>
                <span>★ 4.9/5 anniversary cruise rating</span>
              </p>
            </div>
            <Link
              href="/yacht-charter-istanbul#fleet"
              className="btn-cta !whitespace-nowrap !px-5 !py-3 text-sm sm:text-base"
            >
              Choose your yacht
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <SocialProofBadges variant="product" productKey="yacht" />

          {/* Intro / answer-capsule */}
          <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6">
            <p className="answer-capsule text-sm leading-relaxed text-[var(--body-text)] md:text-base">
              <strong>An anniversary yacht cruise in Istanbul</strong> reserves a private boat
              for your couple (or close-family group) and times the route around the sunset hour
              of your specific anniversary date. The base 2-hour charter starts at <strong>€220</strong>{" "}
              on our Boutique yacht (up to 12 guests); the larger Premium yacht with extended deck and styled
              setup is €320. Dinner, custom cake, professional photographer, live violinist,
              and flower bouquet are add-ons — most couples add at least the cake plus the
              photographer. Departures are from Kabataş or Kuruçeşme Marina; the exact
              pier is confirmed by WhatsApp on booking.
            </p>
          </section>

          {/* Why anniversary cruise */}
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-[var(--heading)]">
              Why an anniversary yacht cruise on the Bosphorus
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                {
                  icon: Heart,
                  title: "Built around your couple",
                  desc: "The yacht is reserved for your group only — no shared seating, no other guests' anniversaries on the same evening. The pacing, music, and dinner timing follow your moment.",
                },
                {
                  icon: Calendar,
                  title: "Timed to YOUR anniversary date",
                  desc: "Sunset hour, route, and boarding time are scheduled around the specific day you celebrate. Summer evenings board at 19:30, winter at 16:00 — your anniversary, your light.",
                },
                {
                  icon: Camera,
                  title: "Photographable Bosphorus skyline",
                  desc: "The southern Bosphorus loop passes Dolmabahçe Palace, Ortaköy Mosque, the first Bosphorus Bridge, and Rumeli Hisarı during golden hour — the most photographable hour of the Istanbul day.",
                },
                {
                  icon: Cake,
                  title: "Cake, dinner, music — all add-ons",
                  desc: "Anniversary cake with year count, multi-course dinner, professional photographer (50+ edited photos within 7 days), live violinist for boarding, fresh bouquet, champagne service — added on request.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[var(--line)] bg-white p-5"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <item.icon className="h-5 w-5 text-[var(--brand-primary)]" />
                    <h3 className="text-base font-semibold text-[var(--heading)]">{item.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Add-ons table */}
          <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6">
            <h2 className="mb-4 text-xl font-bold text-[var(--heading)]">
              Common add-ons for anniversary cruises
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-[var(--line)]">
                  <tr>
                    <th className="px-3 py-2 font-semibold text-[var(--heading)]">Add-on</th>
                    <th className="px-3 py-2 font-semibold text-[var(--heading)]">Detail</th>
                    <th className="px-3 py-2 font-semibold text-[var(--heading)]">Best for</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Anniversary cake", "Custom message + year count", "Most-booked add-on"],
                    ["Multi-course dinner", "Fish, chicken, or vegetarian — 3 courses", "Couples skipping a separate restaurant"],
                    ["Professional photographer", "50+ edited photos in 7 days", "Milestone anniversaries (10, 25, 50)"],
                    ["Live violinist (boarding)", "30-min serenade at pier", "Surprise component for non-engaged partner"],
                    ["Fresh flower bouquet", "Seasonal Istanbul florist", "Surprise reveal on arrival"],
                    ["Champagne service", "House or premium label", "Toast moment scheduled mid-cruise"],
                    ["Extra hour", "Extends route past Rumeli to swim spots", "Summer anniversaries"],
                  ].map(([addon, detail, fit]) => (
                    <tr key={addon} className="border-b border-[var(--line)] last:border-0">
                      <td className="px-3 py-2 font-medium text-[var(--heading)]">{addon}</td>
                      <td className="px-3 py-2 text-[var(--text-muted)]">{detail}</td>
                      <td className="px-3 py-2 text-[var(--text-muted)]">{fit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs italic text-[var(--text-muted)]">
              All add-ons are priced separately and quoted at booking. Send your date + add-on
              preferences to receive a full quote within 24 h.
            </p>
          </section>

          {/* Sample programme */}
          <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6">
            <h2 className="mb-4 text-xl font-bold text-[var(--heading)]">
              Sample 2-hour anniversary programme
            </h2>
            <ol className="space-y-3 text-sm leading-relaxed text-[var(--body-text)]">
              <li className="flex gap-3">
                <span className="font-semibold text-[var(--brand-primary)]">19:30 —</span>
                <span>
                  <strong>Boarding at Kabataş.</strong> Live violinist welcomes you on the
                  pier (if booked). Champagne toast before the yacht departs.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-[var(--brand-primary)]">19:45 —</span>
                <span>
                  <strong>Departure + Dolmabahçe pass.</strong> First photo set against the
                  illuminated palace as the yacht rounds the headland.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-[var(--brand-primary)]">20:10 —</span>
                <span>
                  <strong>Ortaköy Mosque + first Bosphorus Bridge.</strong> The signature
                  Istanbul-skyline composition. Dinner is served on the upper deck.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-[var(--brand-primary)]">20:45 —</span>
                <span>
                  <strong>Rumeli Hisarı turn-around.</strong> Cake served with year-count
                  candles. Custom message read by the crew.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-[var(--brand-primary)]">21:30 —</span>
                <span>
                  <strong>Return to Kabataş.</strong> Final photo set under the bridge
                  lights. Photographer delivers a USB with raw files at disembarkation;
                  edited delivery follows within 7 days.
                </span>
              </li>
            </ol>
            <p className="mt-4 text-xs italic text-[var(--text-muted)]">
              Programme is illustrative — your actual schedule will be timed to your
              anniversary date and the sunset hour of that day.
            </p>
          </section>

          {/* FAQ */}
          <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6">
            <h2 className="mb-4 text-xl font-bold text-[var(--heading)]">Frequently asked</h2>
            <div className="space-y-4">
              {faqItems.map((item) => (
                <details key={item.q} className="group rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4">
                  <summary className="cursor-pointer list-none font-semibold text-[var(--heading)]">
                    {item.q}
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--body-text)]">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* Related products */}
          <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6">
            <h2 className="mb-4 text-xl font-bold text-[var(--heading)]">Related private cruise formats</h2>
            <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <li>
                <Link
                  href="/proposal-yacht-rental-istanbul"
                  className="block rounded-xl border border-[var(--line)] p-4 transition-colors hover:border-[var(--brand-primary)]/40 hover:bg-[var(--surface-alt)]"
                >
                  <span className="block font-semibold text-[var(--heading)]">
                    Proposal yacht — surprise styling
                  </span>
                  <span className="mt-1 block text-sm text-[var(--text-muted)]">
                    For couples not yet engaged. Hidden moment, surprise reveal, photographer.
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/private-bosphorus-dinner-cruise"
                  className="block rounded-xl border border-[var(--line)] p-4 transition-colors hover:border-[var(--brand-primary)]/40 hover:bg-[var(--surface-alt)]"
                >
                  <span className="block font-semibold text-[var(--heading)]">
                    Private dinner cruise on the Bosphorus
                  </span>
                  <span className="mt-1 block text-sm text-[var(--text-muted)]">
                    When dinner is the focus rather than the yacht — same yachts, different
                    pacing.
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/yacht-charter-istanbul"
                  className="block rounded-xl border border-[var(--line)] p-4 transition-colors hover:border-[var(--brand-primary)]/40 hover:bg-[var(--surface-alt)]"
                >
                  <span className="block font-semibold text-[var(--heading)]">
                    Yacht charter Istanbul — full fleet
                  </span>
                  <span className="mt-1 block text-sm text-[var(--text-muted)]">
                    Six-yacht fleet from boutique sailing (10 guests) to event yacht (150
                    guests).
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/marriage-proposal-yacht-istanbul"
                  className="block rounded-xl border border-[var(--line)] p-4 transition-colors hover:border-[var(--brand-primary)]/40 hover:bg-[var(--surface-alt)]"
                >
                  <span className="block font-semibold text-[var(--heading)]">
                    Proposal planning guide (in-depth)
                  </span>
                  <span className="mt-1 block text-sm text-[var(--text-muted)]">
                    Same operator perspective applied to proposal logistics. Useful for
                    anniversary couples planning a surprise mid-cruise.
                  </span>
                </Link>
              </li>
            </ul>
          </section>

          {/* CTA */}
          <section className="rounded-2xl border border-[var(--brand-primary)]/20 bg-[linear-gradient(135deg,rgba(230,110,72,0.06),rgba(255,184,0,0.08))] p-6">
            <h2 className="mb-2 text-xl font-bold text-[var(--heading)]">
              Plan your anniversary cruise
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-[var(--body-text)]">
              Send your anniversary date, your couple-or-family group size, and the add-ons
              that matter most (cake, photographer, dinner, music). We return a full
              package quote within 24 h.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/yacht-charter-istanbul#fleet"
                className="btn-cta !px-6 !py-3"
              >
                See the yacht fleet
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`${WHATSAPP_URL}?text=${encodeURIComponent(
                  "Hi MerrySails! We'd like to plan an anniversary yacht cruise. Our anniversary date is [date] and we are [N] guests. We'd like [cake/dinner/photographer/music].",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--brand-primary)]/30 bg-white px-6 py-3 text-sm font-semibold text-[var(--brand-primary)] transition-colors hover:bg-[var(--brand-primary)]/5"
              >
                <Music className="h-4 w-4" />
                Send anniversary brief via WhatsApp
              </a>
            </div>
            <p className="mt-3 text-xs italic text-[var(--text-muted)]">
              Operated under Meryem Yıldız Travel · TÜRSAB A Group licence #{TURSAB_LICENSE_NUMBER} · 50,000+
              guests on the Bosphorus since 2001.
            </p>
          </section>
        </div>
      </main>
      <StickyMobileCta
        reserveHref="/yacht-charter-istanbul#fleet"
        reserveLabel="Quote from €220"
        whatsappLocation="anniversary_yacht_cruise"
        whatsappPrefill="Hi MerrySails! We'd like to plan an anniversary yacht cruise. Our anniversary date is [date] and we are [N] guests."
      />
    </>
  );
}
