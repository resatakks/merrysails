import Link from "next/link";
import { Anchor, Ship, Sunset, UtensilsCrossed, Users, MapPin, BookOpen } from "lucide-react";

const cruiseTypes = [
  {
    icon: Sunset,
    title: "Bosphorus Sunset Cruise",
    price: "From €40",
    duration: "2.5 hours",
    description:
      "Watch the golden hour paint Istanbul's skyline from the water. The sunset cruise departs daily from Eminonu Pier and includes drinks, snacks, and live commentary. The most popular cruise for couples and photographers.",
    href: "/cruises/bosphorus-sunset-cruise",
  },
  {
    icon: UtensilsCrossed,
    title: "Istanbul Dinner Cruise",
    price: "From €65",
    duration: "3.5 hours",
    description:
      "An all-inclusive evening on the Bosphorus: 4-course Turkish dinner, unlimited drinks, belly dance, whirling dervish, and live music. Hotel pickup and drop-off included. Istanbul's signature night experience.",
    href: "/cruises/bosphorus-dinner-cruise",
  },
  {
    icon: Ship,
    title: "Short Sightseeing Cruise",
    price: "From €15",
    duration: "1.5 hours",
    description:
      "The most affordable way to see the Bosphorus. Pass Dolmabahce Palace, Ortakoy Mosque, both bridges, and the Maiden's Tower in a 90-minute narrated cruise. Ideal for tight itineraries.",
    href: "/cruises/bosphorus-sightseeing-cruise",
  },
  {
    icon: Anchor,
    title: "Private Yacht Charter",
    price: "From €280",
    duration: "2+ hours",
    description:
      "Your own yacht, your own route, your own crew. Perfect for birthdays, proposals, anniversaries, and corporate events. Accommodates 2 to 80 guests with custom catering options.",
    href: "/cruises/yacht-charter-in-istanbul",
  },
  {
    icon: Users,
    title: "Bosphorus Lunch Cruise",
    price: "From €45",
    duration: "3 hours",
    description:
      "A daytime Bosphorus experience with a full Turkish meal. Visit both the European and Asian shores while enjoying fresh Mediterranean cuisine and stunning waterfront views.",
    href: "/cruises/istanbul-bosphorus-lunch-cruise",
  },
  {
    icon: MapPin,
    title: "Princes Islands Tour",
    price: "From €35",
    duration: "Full day",
    description:
      "Escape Istanbul's bustle with a ferry ride to the car-free Princes Islands. Explore Buyukada by bike or horse carriage, swim in crystal-clear waters, and enjoy seafood by the harbor.",
    href: "/cruises/istanbul-princes-island-tour",
  },
];

export default function BosphorusGuideSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-main">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Bosphorus Cruise Istanbul 2026 — Your Complete Guide
          </h2>
          <p className="text-[var(--text-muted)] text-lg leading-relaxed">
            The Bosphorus strait separates Europe and Asia across 30 kilometres of
            historic waterway. A Bosphorus cruise is consistently rated the number
            one activity in Istanbul, with over 3 million passengers sailing
            annually. MerrySails, operated by Merry Tourism (TURSAB licensed since
            2001), offers every cruise type — from budget-friendly sightseeing
            tours to luxury private yacht charters.
          </p>
        </div>

        {/* Cruise type cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {cruiseTypes.map((cruise) => (
            <Link
              key={cruise.title}
              href={cruise.href}
              className="group bg-[var(--surface-alt)] rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[var(--brand-primary)]/10 rounded-lg flex items-center justify-center">
                  <cruise.icon className="w-5 h-5 text-[var(--brand-primary)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--heading)] group-hover:text-[var(--brand-primary)] transition-colors">
                    {cruise.title}
                  </h3>
                  <span className="text-xs text-[var(--text-muted)]">
                    {cruise.price} &middot; {cruise.duration}
                  </span>
                </div>
              </div>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                {cruise.description}
              </p>
            </Link>
          ))}
        </div>

        {/* Rich text content for SEO */}
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg prose-gray mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-[var(--heading)]">
              Why Book Your Bosphorus Cruise With MerrySails?
            </h2>
            <p className="text-[var(--body-text)] leading-relaxed mb-4">
              MerrySails is the cruise and yacht division of{" "}
              <a
                href="https://merrytourism.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--brand-primary)] hover:underline"
              >
                Merry Tourism
              </a>
              , a TURSAB A Group licensed travel agency operating in Istanbul since
              2001. Over 50,000 guests have sailed with us, and we maintain a 4.9
              rating from 2,800+ verified reviews. When you book direct with
              MerrySails, you save up to 35% compared to third-party platforms —
              because there is no middleman commission.
            </p>
            <p className="text-[var(--body-text)] leading-relaxed mb-4">
              Every cruise includes free cancellation up to 24 hours before
              departure, multilingual crew (English, Turkish, Arabic, Russian),
              and secure online payment. Dinner cruises include complimentary
              hotel pickup and drop-off from Sultanahmet, Taksim, Beyoglu, and
              surrounding areas. Our yacht charters depart from Kurucesme Marina
              and can be customized for any occasion — from intimate proposals to
              large corporate events.
            </p>

            <h3 className="text-xl font-bold mb-3 text-[var(--heading)]">
              Best Time for a Bosphorus Cruise in 2026
            </h3>
            <p className="text-[var(--body-text)] leading-relaxed mb-4">
              Istanbul offers year-round cruising. The peak season runs from April
              to October, with warm weather and long golden hours perfect for
              sunset cruises. Spring (April to June) and autumn (September to
              October) deliver the most dramatic sunset colors. Summer evenings
              extend past 20:00, while winter brings atmospheric mist over the
              strait and lower prices. The dinner cruise operates indoors
              year-round, making it comfortable in any season.
            </p>

            <h3 className="text-xl font-bold mb-3 text-[var(--heading)]">
              How to Get to the Bosphorus Cruise Departure Point
            </h3>
            <p className="text-[var(--body-text)] leading-relaxed mb-6">
              Shared cruises (sunset, dinner, sightseeing) depart from{" "}
              <strong>Eminonu Pier</strong>, accessible via the T1 tram line
              (stop: Eminonu). From Sultanahmet, it is a 10-minute tram ride.
              From Taksim, take the funicular to Kabatas and transfer to the T1.
              Private yacht charters depart from{" "}
              <strong>Kurucesme Marina</strong> on the European Bosphorus shore.
              For dinner cruises, hotel pickup is included — a vehicle collects
              you from your hotel lobby 60 to 90 minutes before departure.
            </p>
          </div>

          {/* Quick links */}
          <div className="bg-[var(--surface-alt)] rounded-2xl p-6 mt-8">
            <h3 className="font-semibold text-[var(--heading)] mb-3">
              Popular Guides & Resources
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Link
                href="/blog/best-bosphorus-cruise-istanbul-guide"
                className="text-sm text-[var(--brand-primary)] hover:underline"
              >
                Complete Bosphorus Cruise Guide 2026
              </Link>
              <Link
                href="/blog/bosphorus-dinner-cruise-what-to-expect"
                className="text-sm text-[var(--brand-primary)] hover:underline"
              >
                Dinner Cruise — What to Expect
              </Link>
              <Link
                href="/blog/istanbul-sunset-cruise-experience"
                className="text-sm text-[var(--brand-primary)] hover:underline"
              >
                Istanbul Sunset Cruise Experience
              </Link>
              <Link
                href="/blog/short-bosphorus-cruise-tour"
                className="text-sm text-[var(--brand-primary)] hover:underline"
              >
                Short Bosphorus Cruise (1.5 Hours)
              </Link>
              <Link
                href="/blog/bosphorus-cruise-departure-points"
                className="text-sm text-[var(--brand-primary)] hover:underline"
              >
                Cruise Departure Points & Piers
              </Link>
              <Link
                href="/blog/best-time-bosphorus-cruise"
                className="text-sm text-[var(--brand-primary)] hover:underline"
              >
                Best Time for a Bosphorus Cruise
              </Link>
              <Link
                href="/blog/private-yacht-charter-istanbul-guide"
                className="text-sm text-[var(--brand-primary)] hover:underline"
              >
                Private Yacht Charter Guide
              </Link>
              <Link
                href="/blog/yacht-rental-istanbul-prices"
                className="text-sm text-[var(--brand-primary)] hover:underline"
              >
                Yacht Rental Prices Istanbul 2026
              </Link>
              <Link
                href="/blog/istanbul-yacht-charter-guide"
                className="text-sm text-[var(--brand-primary)] hover:underline"
              >
                Istanbul Yacht Charter Guide
              </Link>
              <Link
                href="/blog/bosphorus-night-cruise-guide"
                className="text-sm text-[var(--brand-primary)] hover:underline"
              >
                Bosphorus Night Cruise Guide
              </Link>
              <Link
                href="/blog/what-to-wear-bosphorus-cruise"
                className="text-sm text-[var(--brand-primary)] hover:underline"
              >
                What to Wear on a Bosphorus Cruise
              </Link>
              <Link
                href="/blog/top-things-to-do-istanbul"
                className="text-sm text-[var(--brand-primary)] hover:underline"
              >
                Top Things to Do in Istanbul
              </Link>
            </div>
          </div>

          {/* Istanbul Landmark Guides */}
          <div className="bg-[var(--surface-alt)] rounded-2xl p-6 mt-4">
            <h3 className="font-semibold text-[var(--heading)] mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[var(--brand-primary)]" />
              Istanbul Landmark Guides
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Link href="/guides/bosphorus-strait" className="text-sm text-[var(--brand-primary)] hover:underline">The Bosphorus Strait</Link>
              <Link href="/guides/maidens-tower" className="text-sm text-[var(--brand-primary)] hover:underline">Maiden&apos;s Tower (Kiz Kulesi)</Link>
              <Link href="/guides/dolmabahce-palace" className="text-sm text-[var(--brand-primary)] hover:underline">Dolmabahce Palace</Link>
              <Link href="/guides/ortakoy-mosque" className="text-sm text-[var(--brand-primary)] hover:underline">Ortakoy Mosque</Link>
              <Link href="/guides/rumeli-fortress" className="text-sm text-[var(--brand-primary)] hover:underline">Rumeli Fortress</Link>
              <Link href="/guides/galata-bridge-eminonu" className="text-sm text-[var(--brand-primary)] hover:underline">Galata Bridge & Eminonu</Link>
              <Link href="/guides/buyukada-princes-islands" className="text-sm text-[var(--brand-primary)] hover:underline">Buyukada & Princes&apos; Islands</Link>
              <Link href="/guides/istanbul-bosphorus-bridges" className="text-sm text-[var(--brand-primary)] hover:underline">Bosphorus Bridges</Link>
              <Link href="/guides/kurucesme-marina" className="text-sm text-[var(--brand-primary)] hover:underline">Kurucesme Marina</Link>
              <Link href="/guides/golden-horn" className="text-sm text-[var(--brand-primary)] hover:underline">The Golden Horn</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
