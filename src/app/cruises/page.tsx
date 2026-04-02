import type { Metadata } from "next";
import Link from "next/link";
import CruisesFilter from "@/components/tours/CruisesFilter";
import { tours } from "@/data/tours";

export const metadata: Metadata = {
  title: "Istanbul Bosphorus Cruises & Yacht Charter 2026 | MerrySails",
  description:
    "Book Istanbul Bosphorus cruises & yacht charter from €15. Sunset, dinner & sightseeing cruises plus private yacht rental. Best price guarantee — book online direct.",
  keywords: [
    "bosphorus cruise",
    "istanbul cruise",
    "yacht charter istanbul",
    "sunset cruise",
    "dinner cruise",
    "boat tour istanbul",
  ],
  alternates: {
    canonical: "https://merrysails.com/cruises",
  },
  openGraph: {
    title: "Istanbul Bosphorus Cruises & Yacht Charter 2026 | MerrySails",
    description:
      "Book Istanbul Bosphorus cruises & yacht charter from €15. Sunset, dinner & sightseeing cruises plus private yacht rental. Best price guarantee — book online direct.",
    url: "https://merrysails.com/cruises",
    siteName: "MerrySails",
    type: "website",
  },
};

export default function CruisesPage() {
  return (
    <div className="pt-32 pb-20 bg-[var(--surface-alt)]">
      <div className="container-main">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Istanbul Bosphorus Cruises, Yacht Charter & Boat Tours</h1>
          <p className="text-[var(--text-muted)] max-w-xl mx-auto">
            Sunset cruises, dinner cruises with Turkish night, private yacht rental,
            and guided boat tours in Istanbul. Best price guaranteed — book direct.
          </p>
        </div>

        {/* Interactive filter (client component) */}
        <CruisesFilter tours={tours} />

        {/* SEO: Full tour index for search engine crawlers (all links rendered in HTML) */}
        <nav aria-label="All cruise and tour options" className="mt-16 border-t border-[var(--line)] pt-8">
          <h2 className="text-xl font-bold mb-4 text-[var(--heading)]">All Bosphorus Cruises & Tours</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
            {tours.map((tour) => (
              <li key={tour.slug}>
                <Link
                  href={`/cruises/${tour.slug}`}
                  className="text-sm text-[var(--body-text)] hover:text-[var(--brand-primary)] transition-colors"
                >
                  {tour.nameEn} — From €{tour.priceEur}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* SEO: Rich content section for search engines */}
        <section className="mt-16 border-t border-[var(--line)] pt-10">
          <h2 className="text-2xl font-bold mb-6 text-[var(--heading)]">Bosphorus Cruise Istanbul — Your Complete Guide</h2>

          <div className="prose prose-gray max-w-none">
            <p className="text-[var(--body-text)] leading-relaxed mb-4">
              Looking for the <strong>best Bosphorus cruise in Istanbul</strong>? MerrySails offers a wide range of
              cruise experiences on the iconic Bosphorus Strait — from affordable <Link href="/cruises/bosphorus-sightseeing-cruise" className="text-[var(--brand-primary)] hover:underline">sightseeing cruises from €15</Link> to
              premium <Link href="/cruises/bosphorus-dinner-cruise" className="text-[var(--brand-primary)] hover:underline">dinner cruises with Turkish night entertainment</Link> and
              exclusive <Link href="/cruises/yacht-charter-in-istanbul" className="text-[var(--brand-primary)] hover:underline">private yacht charters from €280</Link>.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-3 text-[var(--heading)]">Bosphorus Sunset Cruise</h3>
            <p className="text-[var(--body-text)] leading-relaxed mb-4">
              Our most popular experience, the <Link href="/cruises/bosphorus-sunset-cruise" className="text-[var(--brand-primary)] hover:underline">Bosphorus sunset cruise</Link> departs daily
              from Eminonu Pier and glides past Maiden&apos;s Tower, Dolmabahce Palace, Ortakoy Mosque, and Rumeli Fortress as the
              sun paints the sky golden. Starting from just €40, it&apos;s the most affordable way to experience Istanbul from the water.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-3 text-[var(--heading)]">Istanbul Dinner Cruise</h3>
            <p className="text-[var(--body-text)] leading-relaxed mb-4">
              The <Link href="/cruises/bosphorus-dinner-cruise" className="text-[var(--brand-primary)] hover:underline">Bosphorus dinner cruise</Link> is Istanbul&apos;s
              ultimate evening experience — a 4-course Turkish dinner with unlimited drinks, live belly dancing, whirling dervish ceremony, and
              traditional folk shows, all while cruising the illuminated Bosphorus. Hotel pickup included. From €65.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-3 text-[var(--heading)]">Yacht Charter Istanbul</h3>
            <p className="text-[var(--body-text)] leading-relaxed mb-4">
              For a truly private experience, our <Link href="/cruises/yacht-charter-in-istanbul" className="text-[var(--brand-primary)] hover:underline">yacht charter service in Istanbul</Link> gives
              you an entire yacht with captain and crew. Perfect for <Link href="/cruises/romantic-marriage-proposal" className="text-[var(--brand-primary)] hover:underline">marriage proposals</Link>,{" "}
              <Link href="/cruises/yacht-birthday-party" className="text-[var(--brand-primary)] hover:underline">birthday parties</Link>,{" "}
              <Link href="/cruises/yacht-weddings" className="text-[var(--brand-primary)] hover:underline">weddings</Link>, and{" "}
              <Link href="/cruises/corporate-event-bosphorus-cruise" className="text-[var(--brand-primary)] hover:underline">corporate events</Link>. Three packages available:
              Essential (€280), Premium (€380), and VIP (€680).
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-3 text-[var(--heading)]">Istanbul Boat Tours</h3>
            <p className="text-[var(--body-text)] leading-relaxed mb-4">
              Beyond cruises, we offer full-day <Link href="/cruises/istanbul-bosphorus-lunch-cruise" className="text-[var(--brand-primary)] hover:underline">lunch cruise and two continents tours</Link>,{" "}
              <Link href="/cruises/istanbul-princes-island-tour" className="text-[var(--brand-primary)] hover:underline">Princes&apos; Islands day trips</Link>, and{" "}
              <Link href="/cruises/full-day-istanbul-old-city-tour" className="text-[var(--brand-primary)] hover:underline">Istanbul old city tours</Link> — all operated by
              TURSAB-licensed professional guides. <Link href="/about" className="text-[var(--brand-primary)] hover:underline">About MerrySails</Link> — serving Istanbul since 2001.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
