import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Anchor, Ship, MapPin, Clock, Users, Trees } from "lucide-react";
import { SITE_URL, TURSAB_LICENSE_NUMBER, WHATSAPP_URL } from "@/lib/constants";
import { buildHreflang } from "@/lib/hreflang";

export const revalidate = 3600;

const canonicalUrl = `${SITE_URL}/princes-islands-tour-istanbul`;

export const metadata: Metadata = {
  title: "Princes Islands Tour Istanbul — €45 or Yacht",
  description:
    "Princes Islands tour from Istanbul 2026 — shared full-day €45 (ferry + guide + lunch) or private yacht charter from €280. Büyükada, Heybeliada, car-free islands.",
  alternates: {
    canonical: canonicalUrl,
    languages: buildHreflang("/princes-islands-tour-istanbul"),
  },
  openGraph: {
    title: "Princes Islands Tour Istanbul — €45 or Yacht",
    description:
      "Two ways to visit the Princes Islands from Istanbul: shared 8-hour ferry tour at €45 or private yacht charter from €280. Compare both formats.",
    url: canonicalUrl,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "Princes Islands Tour Istanbul — MerrySails" }],
  },
};

const ISLANDS = [
  {
    name: "Büyükada",
    sizeLabel: "Largest · 5.4 km²",
    summary:
      "The main attraction. Victorian-era wooden mansions, the Aya Yorgi monastery atop the highest hill, pine-shaded streets and the popular Yörükali beach. About 75–90 minutes by public ferry from Kabataş.",
  },
  {
    name: "Heybeliada",
    sizeLabel: "Second-largest · 2.3 km²",
    summary:
      "Quieter than Büyükada, with the historic Halki Greek Orthodox seminary, a beautiful coastal walking path and Değirmenburnu picnic area. Same ferry stops as Büyükada.",
  },
  {
    name: "Burgazada",
    sizeLabel: "Mid · 1.5 km²",
    summary:
      "Compact and intimate. Best for a relaxed day with seafood lunch at Kalpazankaya cliffs, easy walking loops and far fewer tourists than the two bigger islands.",
  },
  {
    name: "Kınalıada",
    sizeLabel: "Closest to Istanbul · 1.3 km²",
    summary:
      "First stop on the ferry route — a 40-minute hop from Kabataş. Sandy beaches, fish restaurants on the pier and small Armenian-heritage churches in the village.",
  },
];

const FAQ_ITEMS = [
  {
    q: "What is the cheapest way to visit the Princes Islands from Istanbul?",
    a: "The public Şehir Hatları ferry from Kabataş costs about ₺40 (€1.20) one-way and reaches Büyükada in 75–90 minutes. The full-day guided MerrySails tour at €45 includes round-trip ferry, a guide, lunch and a structured island walk — useful if you do not want to navigate alone or read Turkish ferry schedules.",
  },
  {
    q: "Are cars allowed on the Princes Islands?",
    a: "No — private cars are banned across all four inhabited islands. The only motorised transport is municipal electric vehicles. Locals and visitors get around by bicycle, electric shuttle or walking. The car-free atmosphere is one of the islands' main attractions.",
  },
  {
    q: "How long does a Princes Islands tour from Istanbul take?",
    a: "A full-day guided tour is 8 hours door-to-door (09:00 departure, return ~17:00). A private yacht charter day trip is typically 6–8 hours and is fully flexible — you choose departure time, route across the islands and how long to stay on each.",
  },
  {
    q: "Princes Islands shared ferry tour vs private yacht — which one is better?",
    a: "Shared ferry tour (€45/person) is best for solo travellers, couples on a budget and visitors who want a guide and lunch handled. Private yacht charter (€280+ for the whole boat, 2-hour minimum, full-day available) is better for groups of 4+, families, or anyone wanting flexibility — pick your islands, your stops, your timing, and bring catering on board.",
  },
  {
    q: "When is the best time of year to visit the Princes Islands?",
    a: "Late April to early June and mid-September to October are ideal — warm enough for swimming, light enough for hiking, and far less crowded than peak summer. July and August weekends are extremely busy with Istanbul residents escaping the city. Winter visits are atmospheric but most beach restaurants close.",
  },
  {
    q: "Can I swim at the Princes Islands?",
    a: "Yes — Büyükada has Yörükali Plajı and Nakibey Plajı (entry fee, sun loungers). Heybeliada has Değirmenburnu and Yelken Klübü beaches. Most public beaches are open mid-May through mid-October. Water temperature in July–August is around 22–24°C.",
  },
  {
    q: "Is there a private yacht charter from Istanbul that visits the Princes Islands?",
    a: "Yes — MerrySails offers private full-day yacht charters from Kuruçeşme Marina or Kabataş. A typical Princes Islands yacht day is 6–8 hours starting from €280 for up to 8 guests (Essential package), with stops at Büyükada, Heybeliada and your choice of swim cove. Larger yachts available for groups up to 150.",
  },
];

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "TouristAttraction",
  name: "Princes Islands Tour from Istanbul",
  description:
    "Two ways to visit the Princes Islands from Istanbul: shared guided ferry day tour at €45 or private yacht charter from €280. Büyükada, Heybeliada, Burgazada and Kınalıada — Istanbul's car-free archipelago.",
  url: canonicalUrl,
  image: `${SITE_URL}/og-image.jpg`,
  isAccessibleForFree: false,
  publicAccess: true,
  touristType: ["Couples", "Families", "Solo travellers", "Groups"],
  hasMap: "https://www.google.com/maps?q=Princes+Islands+Istanbul",
  containsPlace: ISLANDS.map((i) => ({ "@type": "TouristAttraction", name: i.name })),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: [".faq-q", ".faq-a"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Princes Islands Tour Istanbul", item: canonicalUrl },
  ],
};

export default function PrincesIslandsPillarPage() {
  return (
    <main className="bg-[var(--bg)] text-[var(--body-text)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="border-b border-[var(--line)] bg-gradient-to-b from-[var(--accent-soft,#f5f0e6)] to-[var(--bg)]">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
          <nav aria-label="Breadcrumb" className="text-sm text-[var(--text-muted)] mb-4">
            <Link href="/" className="hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <span>Princes Islands Tour Istanbul</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--heading)] mb-3">
            Princes Islands Tour from Istanbul — 2026 Guide
          </h1>
          <p className="text-base sm:text-lg text-[var(--body-text)] max-w-3xl">
            <strong>TL;DR.</strong> Two ways to visit Istanbul&apos;s car-free Princes Islands: a shared full-day
            ferry tour at <strong>€45/person</strong> (8 hours, lunch + guide included) or a private
            yacht charter from <strong>€280</strong> for up to 8 guests (flexible 6–8 hour day, pick
            your islands and swim coves). The four inhabited islands — Büyükada, Heybeliada,
            Burgazada, Kınalıada — have no private cars, only bicycles, electric shuttles and
            walking paths.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/cruises/istanbul-princes-island-tour"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-white hover:brightness-110 transition"
            >
              Shared tour from €45 <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/yacht-charter-istanbul"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--brand)] px-5 py-3 text-sm font-semibold text-[var(--brand)] hover:bg-[var(--brand)]/5 transition"
            >
              Private yacht from €280 <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`${WHATSAPP_URL}?text=${encodeURIComponent("Hi MerrySails — I'd like to plan a Princes Islands day trip. Dates: [date], guests: [N]. Shared tour or private yacht?")}`}
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white hover:brightness-110 transition"
              target="_blank"
              rel="noopener"
            >
              WhatsApp +90 544 898 98 12
            </a>
          </div>
        </div>
      </section>

      {/* Compare formats */}
      <section className="mx-auto max-w-5xl px-4 py-10">
        <h2 className="text-2xl font-bold text-[var(--heading)] mb-6">Shared ferry tour vs private yacht charter</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-[var(--line)] bg-white p-5">
            <div className="flex items-center gap-2 text-[var(--brand)] mb-2">
              <Ship className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wide">Shared full-day tour</span>
            </div>
            <h3 className="text-xl font-bold text-[var(--heading)] mb-2">€45 per person</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2"><Clock className="w-4 h-4 mt-0.5 text-[var(--text-muted)]" /><span>8 hours total · 09:00 departure</span></li>
              <li className="flex gap-2"><Users className="w-4 h-4 mt-0.5 text-[var(--text-muted)]" /><span>Max 50 guests · solo &amp; couples welcome</span></li>
              <li className="flex gap-2"><MapPin className="w-4 h-4 mt-0.5 text-[var(--text-muted)]" /><span>Public ferry → Büyükada → guided walk → lunch</span></li>
              <li className="flex gap-2"><Trees className="w-4 h-4 mt-0.5 text-[var(--text-muted)]" /><span>Lunch + ferry + guide included</span></li>
            </ul>
            <Link href="/cruises/istanbul-princes-island-tour" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand)] hover:underline">
              See shared tour details <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="rounded-2xl border border-[var(--brand)]/30 bg-[var(--brand)]/5 p-5">
            <div className="flex items-center gap-2 text-[var(--brand)] mb-2">
              <Anchor className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wide">Private yacht charter</span>
            </div>
            <h3 className="text-xl font-bold text-[var(--heading)] mb-2">From €280 per yacht</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2"><Clock className="w-4 h-4 mt-0.5 text-[var(--text-muted)]" /><span>6–8 hours flexible · pick start time</span></li>
              <li className="flex gap-2"><Users className="w-4 h-4 mt-0.5 text-[var(--text-muted)]" /><span>2–150 guests (Essential 8-guest yacht)</span></li>
              <li className="flex gap-2"><MapPin className="w-4 h-4 mt-0.5 text-[var(--text-muted)]" /><span>Your route — Büyükada, Heybeliada, swim coves</span></li>
              <li className="flex gap-2"><Trees className="w-4 h-4 mt-0.5 text-[var(--text-muted)]" /><span>Captain + crew included, catering optional</span></li>
            </ul>
            <Link href="/yacht-charter-istanbul" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand)] hover:underline">
              See yacht charter packages <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* The four inhabited islands */}
      <section className="bg-[var(--accent-soft,#f7f4ec)] border-y border-[var(--line)]">
        <div className="mx-auto max-w-5xl px-4 py-10">
          <h2 className="text-2xl font-bold text-[var(--heading)] mb-2">The four inhabited Princes Islands</h2>
          <p className="text-sm text-[var(--text-muted)] mb-6">Nine islands total in the archipelago — four inhabited and reachable by public ferry. Ferries call at all four on a fixed loop from Kabataş and Kadıköy.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {ISLANDS.map((island) => (
              <div key={island.name} className="rounded-2xl border border-[var(--line)] bg-white p-5">
                <h3 className="text-lg font-bold text-[var(--heading)] mb-1">{island.name}</h3>
                <p className="text-xs text-[var(--text-muted)] uppercase tracking-wide mb-2">{island.sizeLabel}</p>
                <p className="text-sm text-[var(--body-text)]">{island.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to get there */}
      <section className="mx-auto max-w-5xl px-4 py-10">
        <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">How to get to the Princes Islands from Istanbul</h2>
        <div className="space-y-4 text-sm leading-relaxed">
          <p>
            <strong>Public Şehir Hatları ferry from Kabataş (European side):</strong> the most common
            route. About 75–90 minutes to Büyükada, stopping at Kınalıada, Burgazada and Heybeliada
            along the way. Ferries depart every 1–2 hours; first one around 06:50, last return from
            Büyükada around 21:30. One-way fare ~₺40 with Istanbulkart.
          </p>
          <p>
            <strong>Public ferry from Kadıköy or Bostancı (Asian side):</strong> faster — Bostancı to
            Büyükada takes about 30 minutes. Useful if your hotel is already on the Asian side.
          </p>
          <p>
            <strong>İDO sea bus (deniz otobüsü):</strong> faster catamaran service from Kabataş and
            Bostancı, reaches Büyükada in about 45 minutes. Slightly higher fare (~₺70). Schedule is
            less frequent than the public ferry.
          </p>
          <p>
            <strong>Private yacht charter from Kuruçeşme Marina or Kabataş:</strong> 60–75 minutes to
            Büyükada depending on yacht. Door-to-door — no ferry queues, no fixed return schedule,
            and your route is yours to design. MerrySails handles the marina booking and captain.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--accent-soft,#f7f4ec)] border-y border-[var(--line)]">
        <div className="mx-auto max-w-5xl px-4 py-10">
          <h2 className="text-2xl font-bold text-[var(--heading)] mb-6">FAQ — Princes Islands Tour Istanbul</h2>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item) => (
              <details key={item.q} className="group rounded-2xl border border-[var(--line)] bg-white p-5">
                <summary className="faq-q cursor-pointer text-base font-semibold text-[var(--heading)] list-none flex items-start justify-between gap-3">
                  <span>{item.q}</span>
                  <span className="text-[var(--brand)] group-open:rotate-180 transition shrink-0">▼</span>
                </summary>
                <p className="faq-a mt-3 text-sm leading-relaxed text-[var(--body-text)]">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Trust + CTA */}
      <section className="mx-auto max-w-5xl px-4 py-10">
        <div className="rounded-3xl bg-gradient-to-r from-[var(--brand)] to-[var(--brand-dark,#0a3e6f)] p-8 sm:p-10 text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Plan your Princes Islands day from Istanbul</h2>
          <p className="text-sm sm:text-base opacity-90 mb-5 max-w-2xl">
            Send your dates and group size on WhatsApp — we&apos;ll confirm shared-tour availability or
            quote a private yacht for the same day, usually within minutes. TÜRSAB A Group licensed
            (#{TURSAB_LICENSE_NUMBER}) · 50,000+ guests hosted since 2001.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={`${WHATSAPP_URL}?text=${encodeURIComponent("Hi MerrySails — I'd like to plan a Princes Islands day trip. Dates: [date], guests: [N]. Shared tour or private yacht?")}`}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[var(--brand)] hover:brightness-105 transition"
            >
              WhatsApp the team
            </a>
            <Link
              href="/guides/buyukada-princes-islands"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
            >
              Read the full Büyükada guide <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
