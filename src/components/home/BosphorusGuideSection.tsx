import Link from "next/link";
import { Anchor, Sunset, UtensilsCrossed, Briefcase, BookOpen } from "lucide-react";

const cruiseTypes = [
  {
    icon: Sunset,
    title: "Bosphorus Sunset Cruise",
    meta: "2 options · EUR 34 to EUR 40 · 2 hours",
    description:
      "Watch the golden hour paint Istanbul's skyline from the water with a shared cruise, light hospitality, and a with-wine or without-wine option on the same route.",
    href: "/cruises/bosphorus-sunset-cruise",
  },
  {
    icon: UtensilsCrossed,
    title: "Bosphorus Dinner Cruise",
    meta: "4 packages · EUR 30 to EUR 90",
    description:
      "Choose a shared evening cruise with dinner service, stage entertainment, hotel pickup support, and four package options across Silver and Gold tiers.",
    href: "/istanbul-dinner-cruise",
  },
  {
    icon: Anchor,
    title: "Yacht Charter Istanbul",
    meta: "3 packages · from EUR 280 per yacht",
    description:
      "Book a private yacht and shape the plan around your group, with optional meals, drinks, transfers, music, and event extras.",
    href: "/yacht-charter-istanbul",
  },
  {
    icon: Briefcase,
    title: "Service Pages & Custom Planning",
    meta: "Custom quote",
    description:
      "Use the support pages for boat rental, proposals, private dinners, corporate events, and other tailored daytime or occasion-led briefs.",
    href: "/private-events",
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
            2001), now keeps its English commercial structure focused on three core
            products: sunset cruise, dinner cruise, and yacht charter.
          </p>
        </div>

        {/* Cruise type cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-14">
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
                    {cruise.meta}
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
              rating from 2,800+ verified reviews. Each cruise page shows the
              current format, inclusions, and pricing so you can compare options
              before you book.
            </p>
            <p className="text-[var(--body-text)] leading-relaxed mb-4">
              Every cruise includes free cancellation up to 24 hours before
              departure, multilingual crew (English, Turkish, Arabic, Russian),
              and a reserve-now, pay-onboard booking flow. Shared dinner cruises can include hotel
              pickup and drop-off from central European-side zones such as
              Sultanahmet, Taksim, Beyoglu, and nearby areas. Our yacht charters depart from Bosphorus marinas
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
              Departure points now depend on the product. The{" "}
              <strong>Bosphorus Sunset Cruise</strong> uses a Kabatas-side
              boarding flow confirmed after booking, while the{" "}
              <strong>Bosphorus Dinner Cruise</strong> is tied to Kabatas Pier
              and can include hotel pickup from central European-side areas.
              Some sightseeing departures still use{" "}
              <strong>Eminonu Pier</strong> where relevant. Private yacht
              charters depart from <strong>Bosphorus marinas</strong> on the
              European Bosphorus shore.
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
                Short Bosphorus Cruise Guide
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
