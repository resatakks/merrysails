import type { Metadata } from "next";
import Link from "next/link";
import CommercialIntentSection from "@/components/home/CommercialIntentSection";
import CruisesFilter from "@/components/tours/CruisesFilter";
import { getTourPath, isPricingVisible, tours } from "@/data/tours";

export const metadata: Metadata = {
  title: "Istanbul Bosphorus Cruises & Yacht Charter 2026 | MerrySails",
  description:
    "Browse the full MerrySails collection of sunset cruises, dinner cruises, yacht charter options, sightseeing tours, and private event experiences in Istanbul.",
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
      "Compare sunset cruises, dinner cruises, yacht charter options, and Bosphorus tour experiences in one place.",
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
            Compare shared cruises, private yacht options, and celebration-focused services in one place.
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
                  href={getTourPath(tour)}
                  className="text-sm text-[var(--body-text)] hover:text-[var(--brand-primary)] transition-colors"
                >
                  {tour.nameEn}
                  {isPricingVisible(tour) ? ` — From €${tour.priceEur}` : " — View details"}
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
              Looking for the <strong>best Bosphorus cruise in Istanbul</strong>? Start with the
              <Link href="/cruises/bosphorus-sunset-cruise" className="text-[var(--brand-primary)] hover:underline"> Bosphorus sunset cruise</Link>{" "}
              if you want golden-hour views, the{" "}
              <Link href="/istanbul-dinner-cruise" className="text-[var(--brand-primary)] hover:underline">Bosphorus dinner cruise</Link>{" "}
              if you want dinner and live entertainment, and{" "}
              <Link href="/yacht-charter-istanbul" className="text-[var(--brand-primary)] hover:underline">yacht charter in Istanbul</Link>{" "}
              if you want a private boat for your own group.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-3 text-[var(--heading)]">Bosphorus Sunset Cruise</h3>
            <p className="text-[var(--body-text)] leading-relaxed mb-4">
              Our most popular experience, the <Link href="/cruises/bosphorus-sunset-cruise" className="text-[var(--brand-primary)] hover:underline">Bosphorus sunset cruise</Link> departs daily
              around the golden-hour window and glides past Maiden&apos;s Tower, Dolmabahce Palace,
              Ortakoy Mosque, and Rumeli Fortress as the sky shifts from gold to blue. The page is
              structured around two public sunset options on the same route, with the current live
              ladder showing EUR 34 for Without Wine and EUR 40 for the wine-served option.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-3 text-[var(--heading)]">Bosphorus Dinner Cruise</h3>
            <p className="text-[var(--body-text)] leading-relaxed mb-4">
              The <Link href="/istanbul-dinner-cruise" className="text-[var(--brand-primary)] hover:underline">Bosphorus dinner cruise</Link> currently offers four shared evening packages: Silver Soft Drinks, Silver Alcoholic Drinks, Gold Soft Drinks, and Gold Unlimited Alcohol. The live package ladder currently runs from EUR 30 to EUR 90 per guest.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-3 text-[var(--heading)]">Yacht Charter Istanbul</h3>
            <p className="text-[var(--body-text)] leading-relaxed mb-4">
              For a truly private experience, the <Link href="/yacht-charter-istanbul" className="text-[var(--brand-primary)] hover:underline">yacht charter service in Istanbul</Link> gives
              guests three public package levels before they add meals, drinks, transfers, decoration,
              performances, or celebration extras. Essential, Premium, and VIP now each surface
              their own extras table so pricing stays closer to the actual yacht tier.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-3 text-[var(--heading)]">Istanbul Boat Tours</h3>
            <p className="text-[var(--body-text)] leading-relaxed mb-4">
              Beyond those main options, you can also browse sightseeing cruises, private dinners,
              proposal setups, boat rental, and company-event options to find the right match for your group.
            </p>
          </div>
        </section>

        <div className="mt-16 border-t border-[var(--line)] pt-10">
          <CommercialIntentSection compact />
        </div>
      </div>
    </div>
  );
}
