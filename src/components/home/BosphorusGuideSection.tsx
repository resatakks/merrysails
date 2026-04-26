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
    title: "Bosphorus Cruise Compare Hub",
    meta: "Broad comparison",
    description:
      "Start here when the search is still broad and you need to compare sunset, dinner, and private yacht directions before opening a narrower support page.",
    href: "/bosphorus-cruise",
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
            historic waterway. A Bosphorus cruise is one of the clearest ways to
            understand Istanbul from the water, and MerrySails now keeps its
            English commercial structure focused on three core products: sunset
            cruise, dinner cruise, and yacht charter.
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
              2001. Each cruise page shows the current format, inclusions, and
              pricing so you can compare options before you book.
            </p>
            <p className="text-[var(--body-text)] leading-relaxed mb-4">
              Every cruise includes free cancellation up to 24 hours before
              departure and a reserve-first booking flow. Shared dinner cruises can
              include hotel pickup and drop-off from central European-side zones
              such as Sultanahmet, Taksim, Beyoglu, and nearby areas. Our yacht
              charters depart from Bosphorus marinas confirmed with the assigned
              vessel and can be customized for any occasion — from intimate
              proposals to large corporate events.
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
                href="/bosphorus-cruise"
                className="text-sm text-[var(--brand-primary)] hover:underline"
              >
                Bosphorus Cruise Compare Hub
              </Link>
              <Link
                href="/blog/bosphorus-sunset-cruise-vs-dinner-cruise"
                className="text-sm text-[var(--brand-primary)] hover:underline"
              >
                Sunset vs Dinner Cruise
              </Link>
              <Link
                href="/sunset-cruise-tickets-istanbul"
                className="text-sm text-[var(--brand-primary)] hover:underline"
              >
                Sunset Ticket Support
              </Link>
              <Link
                href="/dinner-cruise-with-hotel-pickup-istanbul"
                className="text-sm text-[var(--brand-primary)] hover:underline"
              >
                Dinner Pickup Support
              </Link>
              <Link
                href="/dinner-cruise-pickup-sultanahmet-taksim"
                className="text-sm text-[var(--brand-primary)] hover:underline"
              >
                Sultanahmet & Taksim Pickup
              </Link>
              <Link
                href="/bosphorus-cruise-departure-points"
                className="text-sm text-[var(--brand-primary)] hover:underline"
              >
                Departure Points Hub
              </Link>
              <Link
                href="/istanbul-dinner-cruise"
                className="text-sm text-[var(--brand-primary)] hover:underline"
              >
                Istanbul Dinner Cruise
              </Link>
              <Link
                href="/cruises/bosphorus-sunset-cruise"
                className="text-sm text-[var(--brand-primary)] hover:underline"
              >
                Bosphorus Sunset Cruise
              </Link>
              <Link
                href="/kabatas-dinner-cruise-istanbul"
                className="text-sm text-[var(--brand-primary)] hover:underline"
              >
                Kabatas Dinner Support
              </Link>
              <Link
                href="/yacht-charter-istanbul"
                className="text-sm text-[var(--brand-primary)] hover:underline"
              >
                Yacht Charter Istanbul
              </Link>
              <Link
                href="/kurucesme-marina-yacht-charter"
                className="text-sm text-[var(--brand-primary)] hover:underline"
              >
                Kurucesme Marina Yacht Charter
              </Link>
              <Link
                href="/proposal-yacht-with-photographer-istanbul"
                className="text-sm text-[var(--brand-primary)] hover:underline"
              >
                Proposal Yacht with Photographer
              </Link>
              <Link
                href="/corporate-yacht-dinner-istanbul"
                className="text-sm text-[var(--brand-primary)] hover:underline"
              >
                Corporate Yacht Dinner
              </Link>
              <Link
                href="/blog/what-to-wear-bosphorus-cruise"
                className="text-sm text-[var(--brand-primary)] hover:underline"
              >
                What to Wear on a Bosphorus Cruise
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
