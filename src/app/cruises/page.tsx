import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageCircle, PhoneCall } from "lucide-react";
import TrackedContactLink from "@/components/analytics/TrackedContactLink";
import CruisesFilter from "@/components/tours/CruisesFilter";
import { getTourPath, isPricingVisible, tours } from "@/data/tours";
import { PHONE, PHONE_DISPLAY, WHATSAPP_URL } from "@/lib/constants";
import { buildHreflang } from "@/lib/hreflang";

const SITE_URL = "https://merrysails.com";

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "MerrySails Cruise Catalog",
  description: "Catalog of MerrySails cruises, yacht charter options, and private Bosphorus service pages in Istanbul.",
  numberOfItems: tours.length,
  itemListElement: tours.map((tour, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${SITE_URL}${getTourPath(tour)}`,
    name: tour.nameEn,
    image: tour.image,
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Cruises", item: `${SITE_URL}/cruises` },
  ],
};

export const metadata: Metadata = {
  title: "MerrySails Cruise Catalog & Service Pages | Istanbul 2026",
  description:
    "Browse the full MerrySails catalog of cruise, yacht, and support pages after using the Bosphorus comparison hub for broader Istanbul cruise intent.",
  keywords: [
    "merrysails cruise catalog",
    "merrysails istanbul cruises",
    "merrysails service pages",
    "merrysails yacht experiences",
    "merrysails bosphorus catalog",
  ],
  alternates: {
    canonical: "https://merrysails.com/cruises",
    languages: buildHreflang("/cruises"),
  },
  openGraph: {
    title: "MerrySails Cruise Catalog & Service Pages | Istanbul 2026",
    description:
      "Browse the full MerrySails catalog after using the Bosphorus comparison hub for broader cruise intent.",
    url: "https://merrysails.com/cruises",
    siteName: "MerrySails",
    type: "website",
  },
};

export default function CruisesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="pt-32 pb-20 bg-[var(--surface-alt)]">
        <div className="container-main">
        <div className="mb-10 overflow-hidden rounded-[2rem] border border-[var(--line)] bg-white shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
          <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="bg-[linear-gradient(135deg,#0f172a_0%,#1d3557_55%,#2a9d8f_100%)] p-8 text-white md:p-10">
              <p className="mb-3 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/85">
                Fastest path for paid traffic
              </p>
              <h1 className="max-w-2xl text-3xl font-bold leading-tight md:text-5xl">
                Pick the right Bosphorus product fast or contact MerrySails directly.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/80 md:text-base">
                If your intent is already clear, go straight to the owner page. If not, call or
                WhatsApp us now and we will route you to the best option in minutes.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <TrackedContactLink
                  href={`tel:${PHONE}`}
                  kind="phone"
                  label="catalog_hero_call"
                  location="cruises_page_hero"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-900 transition-transform hover:-translate-y-0.5"
                >
                  <PhoneCall className="h-4 w-4" />
                  Call {PHONE_DISPLAY}
                </TrackedContactLink>
                <TrackedContactLink
                  href={WHATSAPP_URL}
                  kind="whatsapp"
                  label="catalog_hero_whatsapp"
                  location="cruises_page_hero"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/15"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp for Fast Routing
                </TrackedContactLink>
              </div>
            </div>

            <div className="grid gap-4 bg-[var(--surface-alt)] p-6 md:grid-cols-1 md:p-8">
              {[
                {
                  href: "/cruises/bosphorus-sunset-cruise",
                  title: "Sunset Cruise",
                  meta: "From EUR 34",
                  copy: "Golden-hour shared yacht route. Best if the intent is views, photos, and a shorter premium cruise.",
                },
                {
                  href: "/istanbul-dinner-cruise",
                  title: "Dinner Cruise",
                  meta: "From EUR 30",
                  copy: "Best if the intent is dinner, Turkish-night entertainment, and a full evening on the Bosphorus.",
                },
                {
                  href: "/yacht-charter-istanbul",
                  title: "Private Yacht",
                  meta: "From EUR 280",
                  copy: "Private timing, custom route, proposal, birthday, or direct group planning.",
                },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl border border-white bg-white p-5 transition-colors hover:border-[var(--brand-primary)]/30"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand-primary)]">{item.meta}</p>
                  <h2 className="mt-1 text-xl font-bold text-[var(--heading)]">{item.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{item.copy}</p>
                  <span className="mt-4 inline-flex items-center gap-2 font-semibold text-[var(--brand-primary)]">
                    Open owner page
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <section className="mb-10 rounded-2xl border border-[var(--line)] bg-white p-6">
          <h2 className="text-2xl font-bold mb-3 text-[var(--heading)]">Start with the Bosphorus Cruise comparison hub for generic search intent</h2>
          <p className="max-w-3xl text-sm leading-relaxed text-[var(--body-text)]">
            If you are searching broadly for a{" "}
              <Link href="/bosphorus-cruise" className="font-semibold text-[var(--brand-primary)] hover:underline">
                Bosphorus cruise in Istanbul
              </Link>
            , use the comparison hub first. This `/cruises` page is the full MerrySails catalog for users who want to browse every experience, not the main owner page for generic cruise intent.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/bosphorus-cruise"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-primary)] px-5 py-3 font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Compare Public Cruise Options
              <ArrowRight className="h-4 w-4" />
            </Link>
            <TrackedContactLink
              href={WHATSAPP_URL}
              kind="whatsapp"
              label="catalog_compare_whatsapp"
              location="cruises_page_compare_box"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--brand-primary)] px-5 py-3 font-semibold text-[var(--brand-primary)] transition-colors hover:bg-[var(--brand-primary)] hover:text-white"
            >
              <MessageCircle className="h-4 w-4" />
              Ask Which Cruise Fits
            </TrackedContactLink>
          </div>
        </section>

        {/* Interactive filter (client component) */}
        <CruisesFilter tours={tours} />

        {/* SEO: Full tour index for search engine crawlers (all links rendered in HTML) */}
        <nav aria-label="All cruise and tour options" className="mt-16 border-t border-[var(--line)] pt-8">
          <h2 className="text-xl font-bold mb-4 text-[var(--heading)]">Catalog URLs for browsing after route selection</h2>
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
          <h2 className="text-2xl font-bold mb-6 text-[var(--heading)]">Use the catalog after the main route is clear</h2>

          <div className="prose prose-gray max-w-none">
            <p className="text-[var(--body-text)] leading-relaxed mb-4">
              Start with{" "}
              <Link href="/bosphorus-cruise" className="text-[var(--brand-primary)] hover:underline">
                Bosphorus Cruise Istanbul
              </Link>{" "}
              if you want the generic comparison view first. From there, use the{" "}
              <Link href="/cruises/bosphorus-sunset-cruise" className="text-[var(--brand-primary)] hover:underline">sunset cruise</Link>{" "}
              for golden-hour views, the{" "}
              <Link href="/istanbul-dinner-cruise" className="text-[var(--brand-primary)] hover:underline">dinner cruise</Link>{" "}
              for dinner and live entertainment, and{" "}
              <Link href="/yacht-charter-istanbul" className="text-[var(--brand-primary)] hover:underline">Yacht Charter Istanbul</Link>{" "}
              for private package-led planning.
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

            <h3 className="text-xl font-semibold mt-8 mb-3 text-[var(--heading)]">Istanbul Boat Tours & Private Hire</h3>
            <p className="text-[var(--body-text)] leading-relaxed mb-4">
              Beyond those main options, this catalog also lists sightseeing cruises, private dinners,
              proposal setups, boat rental, and company-event support pages. It is best used once the
              main route is clear rather than as the first owner page for broad Bosphorus cruise demand.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-3 text-[var(--heading)]">Planning Your Visit to Istanbul?</h3>
            <p className="text-[var(--body-text)] leading-relaxed mb-4">
              Combine your Bosphorus cruise with a reliable{" "}
              <a
                href="https://www.kingsworldtransfer.com/en/istanbul-airport-transfer"
                className="text-[var(--brand-primary)] hover:underline font-medium"
              >
                Istanbul airport transfer
              </a>{" "}
              — fixed price, Mercedes fleet, meet &amp; greet service from our transfer partner Kings
              World Transfer. Whether you land at Istanbul Airport (IST) or Sabiha Gökçen (SAW),
              they offer{" "}
              <a
                href="https://www.kingsworldtransfer.com/en/istanbul-vip-transfer"
                className="text-[var(--brand-primary)] hover:underline font-medium"
              >
                VIP transfer Istanbul
              </a>{" "}
              options with real-time flight tracking and no hidden fees.
            </p>
          </div>
        </section>
        </div>
      </div>
    </>
  );
}
