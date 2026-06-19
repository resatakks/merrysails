import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Plane, Camera, Wine, MapPin } from "lucide-react";
import { buildHreflang } from "@/lib/hreflang";
import { SITE_URL, WHATSAPP_URL, TURSAB_LICENSE_NUMBER } from "@/lib/constants";
import SocialProofBadges from "@/components/ui/SocialProofBadges";
import StickyMobileCta from "@/components/ui/StickyMobileCta";

/**
 * /honeymoon-yacht-cruise-istanbul
 *
 * Honeymoon intent differs from both proposal and anniversary:
 *   - Proposal: pre-engagement, surprise mechanic mandatory
 *   - Anniversary: existing couple, date-of-marriage tied
 *   - Honeymoon: just-married, often part of a 7-10 day Istanbul +
 *     Cappadocia / Antalya itinerary, multi-stop holiday context.
 *     The cruise is one of several memory moments, not THE moment.
 *
 * Editorial framing: the honeymoon yacht cruise pairs with the wider
 * holiday — photo-friendly route, cake / champagne / dinner add-ons,
 * gentler pacing than a proposal, sunset hour optional but common.
 */

export const metadata: Metadata = {
  title: "Honeymoon Yacht Cruise Istanbul",
  description:
    "Honeymoon yacht cruise on the Bosphorus, Istanbul. Private 2-hour charter from €220 with cake, champagne, photographer, sunset timing. TÜRSAB A licensed since 2001.",
  alternates: {
    canonical: `${SITE_URL}/honeymoon-yacht-cruise-istanbul`,
    languages: buildHreflang("/honeymoon-yacht-cruise-istanbul"),
  },
  openGraph: {
    title: "Honeymoon Yacht Cruise Istanbul",
    description:
      "Private yacht charter for honeymoons on the Bosphorus — cake, champagne, photographer, sunset timing. TÜRSAB A-Group licensed.",
    url: `${SITE_URL}/honeymoon-yacht-cruise-istanbul`,
    type: "article",
  },
};

const REASONS = [
  {
    icon: Plane,
    title: "Pairs with the wider honeymoon itinerary",
    desc: "Most honeymoon trips to Türkiye combine Istanbul (3-4 days) with Cappadocia or Antalya. The yacht cruise fits the Istanbul evening slot — book it for your last Istanbul night so you finish the city portion on the Bosphorus rather than packing for the next flight.",
  },
  {
    icon: Camera,
    title: "Photogenic without the proposal pressure",
    desc: "Same southern Bosphorus loop as proposal cruises — Dolmabahçe Palace, Ortaköy Mosque, the first Bosphorus Bridge, Rumeli Hisarı — but timed for relaxed honeymoon pacing. Bring your own phone or add a professional photographer (50+ edited photos in 7 days).",
  },
  {
    icon: Wine,
    title: "Champagne, cake, custom dinner — all add-ons",
    desc: "Common honeymoon additions: champagne toast on boarding, custom cake with your wedding date and venue name, multi-course dinner (fish/chicken/vegetarian), live violinist for the boarding moment. Less surprise-driven than proposal styling, more memory-driven.",
  },
  {
    icon: MapPin,
    title: "Customizable route around your hotel district",
    desc: "If you're staying in a specific Istanbul district (Sultanahmet, Beşiktaş, Karaköy, Cihangir), the boarding pier and route can be adjusted to start near you. Kuruçeşme Marina for Beşiktaş hotels, Karaköy pier for Beyoğlu, Kabataş for Sultanahmet — choose whichever is closest.",
  },
];

const faqItems = [
  {
    q: "How much is a honeymoon yacht cruise in Istanbul?",
    a: "Private yacht charter for honeymoons starts at €220 for 2 hours on the Boutique yacht (up to 12 guests). The larger Premium yacht with extended deck and styled setup is €320 (up to 15 guests). Most honeymoon couples add cake (~€80) + champagne service (~€60-€120 depending on label) + sunset-photo timing — these add-ons are arranged on request, so WhatsApp us for a precise quote. Priced per yacht, not per head; 10% off from 3 hours.",
  },
  {
    q: "How is a honeymoon cruise different from a proposal cruise?",
    a: "Proposal cruises are built around a hidden moment — strict timing, photographer in concealed position, surprise reveal. Honeymoon cruises are built around a memory — relaxed pacing, photo opportunities throughout the route, no surprise mechanic. Same yacht fleet, same route, different programme.",
  },
  {
    q: "How is a honeymoon cruise different from an anniversary cruise?",
    a: "Anniversary cruises are typically tied to a specific date (the wedding anniversary). Honeymoon cruises are during the trip itself — usually 1-4 weeks after the wedding — and often fit into a multi-stop Türkiye itinerary. The on-board experience can be similar, but honeymoon planning focuses more on integrating with Cappadocia / Antalya / Bodrum legs of the trip.",
  },
  {
    q: "When should we book the honeymoon cruise in our Istanbul stay?",
    a: "The strongest pattern is the last Istanbul evening before flying to Cappadocia or Antalya — you finish the city portion on the water rather than packing in your hotel. Common alternative: the first Istanbul evening, as a fresh-arrival celebration. Avoid the same night as your flight in (jet lag + ferry timing rarely align).",
  },
  {
    q: "Can we get a sunset-timed cruise + dinner + photographer combined?",
    a: "Yes — the most-requested honeymoon combination. The yacht boards 30-45 minutes before sunset (varies by season), boards with a champagne welcome, sails the southern Bosphorus loop during golden hour with the photographer covering the bridge + Ortaköy + Rumeli passages, and serves dinner during the blue-hour return. Total time on the water: 2.5-3 hours.",
  },
  {
    q: "What's a good route if we're staying in Cappadocia first and Istanbul second?",
    a: "If Cappadocia is days 1-3 and Istanbul is days 4-6 of the honeymoon, book the yacht cruise for day 5 evening (your second Istanbul night). Day 4 is for arrival and city orientation; day 5 evening makes the cruise the trip finale before either flying home day 6 or extending to Bodrum / Antalya for a beach week.",
  },
  {
    q: "Should we book the proposal yacht page or this honeymoon page?",
    a: "Use this honeymoon page if the wedding has already happened and you're planning the celebration evening during the trip. Use the proposal yacht page if the cruise IS the proposal moment (one partner doesn't know yet). They're the same yacht fleet, just different programme briefs.",
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
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Honeymoon Yacht Cruise Istanbul",
  serviceType: "Private yacht charter for honeymoons",
  description:
    "Private yacht charter on the Bosphorus for honeymooners. Cake, champagne, dinner, photographer, and sunset timing arranged around the trip.",
  provider: { "@id": `${SITE_URL}/#organization` },
  areaServed: { "@type": "City", name: "Istanbul" },
  offers: {
    "@type": "Offer",
    url: `${SITE_URL}/honeymoon-yacht-cruise-istanbul`,
    price: "220",
    priceCurrency: "EUR",
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
    { "@type": "ListItem", position: 3, name: "Honeymoon Yacht Cruise", item: `${SITE_URL}/honeymoon-yacht-cruise-istanbul` },
  ],
};

export default function Page() {
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
            <span className="text-[var(--heading)] truncate">Honeymoon Yacht Cruise</span>
          </nav>

          {/* Above-fold conversion card */}
          <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-[var(--brand-primary)]/15 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:gap-5">
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--brand-primary)]">
                2 hours · Private yacht · Just-married
              </p>
              <h1 className="mt-1 text-2xl font-bold leading-tight text-[var(--heading)] sm:text-3xl">
                Honeymoon Yacht Cruise Istanbul
              </h1>
              <p className="mt-1 text-sm text-[var(--text-muted)]">
                <span className="font-semibold text-[var(--heading)]">From €220</span>
                <span className="mx-2">·</span>
                <span>★ 4.9/5 honeymoon cruise rating</span>
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

          <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6">
            <p className="answer-capsule text-sm leading-relaxed text-[var(--body-text)] md:text-base">
              <strong>A honeymoon yacht cruise in Istanbul</strong> books a
              private yacht for just-married couples — typically pairing with
              a wider 7-10 day Türkiye trip that includes Cappadocia, Antalya,
              or Bodrum. The base 2-hour charter is <strong>€220</strong> on
              our Boutique sailing yacht (up to 12 guests); the Premium yacht with extended
              deck and styled setup is €320. Decoration,{" "}
              <strong>champagne, custom cake, a photographer, and music</strong>{" "}
              are arranged on request — WhatsApp for a precise quote.
              Boarding is from Kabataş or Kuruçeşme Marina; the exact pier
              depends on the yacht class and gets confirmed by WhatsApp on
              booking.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-[var(--heading)]">
              Why this works for honeymoons
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {REASONS.map((r) => (
                <div key={r.title} className="rounded-2xl border border-[var(--line)] bg-white p-5">
                  <div className="mb-2 flex items-center gap-2">
                    <r.icon className="h-5 w-5 text-[var(--brand-primary)]" />
                    <h3 className="text-base font-semibold text-[var(--heading)]">{r.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{r.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Sample programme */}
          <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6">
            <h2 className="mb-4 text-xl font-bold text-[var(--heading)]">
              Sample honeymoon evening programme (2.5 hours)
            </h2>
            <ol className="space-y-3 text-sm leading-relaxed text-[var(--body-text)]">
              <li className="flex gap-3">
                <span className="font-semibold text-[var(--brand-primary)]">19:00 —</span>
                <span>
                  <strong>Boarding with champagne toast.</strong> Live violinist
                  on the pier (if booked). Yacht decorated with white flowers
                  and your wedding-date custom signage.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-[var(--brand-primary)]">19:15 —</span>
                <span>
                  <strong>Departure + Dolmabahçe pass.</strong> Photographer
                  takes the first set with the illuminated palace as backdrop.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-[var(--brand-primary)]">19:40 —</span>
                <span>
                  <strong>Ortaköy Mosque + first Bosphorus Bridge.</strong> The
                  signature Istanbul skyline composition during golden hour.
                  Dinner first course is served on the upper deck.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-[var(--brand-primary)]">20:15 —</span>
                <span>
                  <strong>Rumeli Hisarı turn-around.</strong> Wedding-cake
                  service with your venue name and date written in the icing.
                  Captain reads a custom message (optional, prepared at
                  booking).
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-[var(--brand-primary)]">21:00 —</span>
                <span>
                  <strong>Blue-hour return to Kabataş.</strong> Final photo
                  set under the bridge lights as Istanbul switches on. Edited
                  photo delivery within 7 days; raw files on a USB at
                  disembarkation.
                </span>
              </li>
            </ol>
          </section>

          {/* FAQ */}
          <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6">
            <h2 className="mb-4 text-xl font-bold text-[var(--heading)]">
              Honeymoon FAQ
            </h2>
            <div className="space-y-3">
              {faqItems.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4"
                >
                  <summary className="cursor-pointer list-none font-semibold text-[var(--heading)]">
                    {f.q}
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--body-text)]">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* Related occasions */}
          <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6">
            <h2 className="mb-4 text-xl font-bold text-[var(--heading)]">
              Related occasion pages
            </h2>
            <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <li>
                <Link
                  href="/proposal-yacht-rental-istanbul"
                  className="block rounded-xl border border-[var(--line)] p-4 transition-colors hover:border-[var(--brand-primary)]/40 hover:bg-[var(--surface-alt)]"
                >
                  <span className="block font-semibold text-[var(--heading)]">
                    Proposal yacht — pre-engagement
                  </span>
                  <span className="mt-1 block text-sm text-[var(--text-muted)]">
                    For couples not yet engaged. Surprise reveal mechanic,
                    hidden photographer, ring timing.
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/anniversary-yacht-cruise-istanbul"
                  className="block rounded-xl border border-[var(--line)] p-4 transition-colors hover:border-[var(--brand-primary)]/40 hover:bg-[var(--surface-alt)]"
                >
                  <span className="block font-semibold text-[var(--heading)]">
                    Anniversary yacht cruise
                  </span>
                  <span className="mt-1 block text-sm text-[var(--text-muted)]">
                    For couples celebrating an existing marriage on their date
                    of anniversary.
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/bosphorus-cruise-for-couples"
                  className="block rounded-xl border border-[var(--line)] p-4 transition-colors hover:border-[var(--brand-primary)]/40 hover:bg-[var(--surface-alt)]"
                >
                  <span className="block font-semibold text-[var(--heading)]">
                    Bosphorus cruise for couples
                  </span>
                  <span className="mt-1 block text-sm text-[var(--text-muted)]">
                    All cruise formats compared for couples — shared sunset
                    vs shared dinner vs private yacht.
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
                    Six-yacht fleet from boutique sailing (10 guests) to event
                    yacht (150 guests).
                  </span>
                </Link>
              </li>
            </ul>
          </section>

          <section className="rounded-2xl border border-[var(--brand-primary)]/20 bg-[linear-gradient(135deg,rgba(230,110,72,0.06),rgba(255,184,0,0.08))] p-6">
            <h2 className="mb-2 text-xl font-bold text-[var(--heading)]">
              Plan the honeymoon evening
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-[var(--body-text)]">
              Send your wedding date + trip dates + add-on preferences
              (cake, champagne, photographer, violinist). We return a
              complete plan in 24 h with yacht recommendation, pier
              location, and timing.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/yacht-charter-istanbul#fleet" className="btn-cta !px-6 !py-3">
                See the yacht fleet
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`${WHATSAPP_URL}?text=${encodeURIComponent(
                  "Hi MerrySails! We're on our honeymoon and would like to book a private yacht evening on the Bosphorus. Wedding date: [date], Istanbul trip: [dates]. We'd like cake / champagne / photographer.",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--brand-primary)]/30 bg-white px-6 py-3 text-sm font-semibold text-[var(--brand-primary)] transition-colors hover:bg-[var(--brand-primary)]/5"
              >
                WhatsApp the honeymoon team
              </a>
            </div>
            <p className="mt-3 text-xs italic text-[var(--text-muted)]">
              Operated under Meryem Yıldız Travel · TÜRSAB A Group licence #
              {TURSAB_LICENSE_NUMBER} · 50,000+ guests on the Bosphorus since 2001.
            </p>
          </section>
        </div>
      </main>
      <StickyMobileCta
        reserveHref="/yacht-charter-istanbul#fleet"
        reserveLabel="Quote from €220"
        whatsappLocation="honeymoon_yacht_cruise"
        whatsappPrefill="Hi MerrySails! Honeymoon yacht enquiry — wedding date [date], Istanbul trip [dates]."
      />
    </>
  );
}
