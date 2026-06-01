import Link from "next/link";
import { ArrowRight, MapPin, Train, Car } from "lucide-react";
import { SITE_URL, WHATSAPP_URL, TURSAB_LICENSE_NUMBER } from "@/lib/constants";
import SocialProofBadges from "@/components/ui/SocialProofBadges";
import StickyMobileCta from "@/components/ui/StickyMobileCta";
import type { HotelClusterDistrict } from "@/lib/hotel-cluster-content";

/**
 * Shared template for /bosphorus-cruise-from-[district] pages. Renders
 * district-specific transport, hotels, FAQ, and pickup info from the
 * data object passed in.
 *
 * Why this template exists (2026-06-01):
 *   "Bosphorus cruise from Sultanahmet" / "from Taksim" / "from Beyoğlu"
 *   are high-intent local-search queries — the visitor has a hotel
 *   booked and wants to know the logistics. CR on these pages typically
 *   beats generic Bosphorus-cruise pages because the visitor is
 *   ready-to-buy with a specific hotel pickup question already answered.
 */

type Props = {
  district: HotelClusterDistrict;
};

export default function HotelClusterPage({ district }: Props) {
  const productPath =
    district.recommendedCruise === "sunset"
      ? "/cruises/bosphorus-sunset-cruise"
      : district.recommendedCruise === "dinner"
        ? "/istanbul-dinner-cruise"
        : "/yacht-charter-istanbul";
  const productPrice =
    district.recommendedCruise === "sunset"
      ? "€30"
      : district.recommendedCruise === "dinner"
        ? "€30"
        : "€200";
  const productLabel =
    district.recommendedCruise === "sunset"
      ? "Sunset cruise"
      : district.recommendedCruise === "dinner"
        ? "Dinner cruise"
        : "Yacht charter";

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Bosphorus Cruise from ${district.name}, Istanbul`,
    description: district.introCapsule,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "Place", name: `${district.name}, Istanbul` },
    serviceType: "Bosphorus cruise from hotel district",
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/${district.slug}`,
      price: productPrice.replace("€", ""),
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      validFrom: "2026-01-01",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", ".answer-capsule"],
    },
    mainEntity: district.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Bosphorus Cruise", item: `${SITE_URL}/bosphorus-cruise` },
      {
        "@type": "ListItem",
        position: 3,
        name: `From ${district.name}`,
        item: `${SITE_URL}/${district.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
            <Link href="/bosphorus-cruise" className="hover:text-[var(--brand-primary)]">Bosphorus Cruise</Link>
            <span>/</span>
            <span className="text-[var(--heading)] truncate">From {district.name}</span>
          </nav>

          {/* Above-fold conversion card */}
          <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-[var(--brand-primary)]/15 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:gap-5">
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--brand-primary)]">
                <MapPin className="mr-1 inline h-3 w-3" />
                From {district.name} hotels · {district.side} side
              </p>
              <h1 className="mt-1 text-2xl font-bold leading-tight text-[var(--heading)] sm:text-3xl">
                Bosphorus Cruise from {district.name}, Istanbul
              </h1>
              <p className="mt-1 text-sm text-[var(--text-muted)]">
                <span className="font-semibold text-[var(--heading)]">From {productPrice} per person</span>
                <span className="mx-2">·</span>
                <span>{district.pickupEligible ? "Hotel pickup included on dinner cruise" : "Self-arrive at the pier"}</span>
              </p>
            </div>
            <Link
              href={`${productPath}#core-booking-planner`}
              className="btn-cta !whitespace-nowrap !px-5 !py-3 text-sm sm:text-base"
            >
              Reserve {productLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <SocialProofBadges variant="generic" />

          {/* Intro / capsule */}
          <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6">
            <p className="answer-capsule text-sm leading-relaxed text-[var(--body-text)] md:text-base">
              {district.introCapsule}
            </p>
          </section>

          {/* Transport */}
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-[var(--heading)]">
              Getting from {district.name} to the cruise pier
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {district.transportToPier.map((opt) => (
                <div
                  key={opt.mode}
                  className="rounded-2xl border border-[var(--line)] bg-white p-5"
                >
                  <div className="mb-2 flex items-center gap-2">
                    {opt.mode.includes("Tram") || opt.mode.includes("funicular") ? (
                      <Train className="h-5 w-5 text-[var(--brand-primary)]" />
                    ) : opt.mode.includes("Taxi") ? (
                      <Car className="h-5 w-5 text-[var(--brand-primary)]" />
                    ) : (
                      <MapPin className="h-5 w-5 text-[var(--brand-primary)]" />
                    )}
                    <h3 className="text-base font-semibold text-[var(--heading)]">{opt.mode}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{opt.detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Hotels list */}
          <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6">
            <h2 className="mb-3 text-xl font-bold text-[var(--heading)]">
              Hotels in {district.name} we frequently arrange pickup for
            </h2>
            <p className="mb-3 text-sm text-[var(--text-muted)]">
              The dinner-cruise pickup vehicle stops at most {district.name} hotels
              regardless of brand — the list below shows venues we hear most
              commonly during booking confirmation. If your hotel is not listed,
              note the address in the WhatsApp booking message and the
              operations team will confirm the pickup point.
            </p>
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {district.knownHotels.map((hotel) => (
                <li
                  key={hotel}
                  className="rounded-lg bg-[var(--surface-alt)] px-3 py-2 text-sm text-[var(--body-text)]"
                >
                  {hotel}
                </li>
              ))}
            </ul>
          </section>

          {/* FAQ */}
          <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6">
            <h2 className="mb-4 text-xl font-bold text-[var(--heading)]">FAQ</h2>
            <div className="space-y-3">
              {district.faqs.map((f) => (
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

          {/* Related products */}
          <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6">
            <h2 className="mb-4 text-xl font-bold text-[var(--heading)]">
              All Bosphorus cruise options from {district.name}
            </h2>
            <ul className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <li>
                <Link
                  href="/cruises/bosphorus-sunset-cruise"
                  className="block rounded-xl border border-[var(--line)] p-4 transition-colors hover:border-[var(--brand-primary)]/40 hover:bg-[var(--surface-alt)]"
                >
                  <span className="block font-semibold text-[var(--heading)]">
                    Sunset cruise — from €30
                  </span>
                  <span className="mt-1 block text-sm text-[var(--text-muted)]">
                    2-hour golden hour from Karaköy pier.
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/istanbul-dinner-cruise"
                  className="block rounded-xl border border-[var(--line)] p-4 transition-colors hover:border-[var(--brand-primary)]/40 hover:bg-[var(--surface-alt)]"
                >
                  <span className="block font-semibold text-[var(--heading)]">
                    Dinner cruise — from €30
                  </span>
                  <span className="mt-1 block text-sm text-[var(--text-muted)]">
                    3.5-hour evening with dinner + Turkish night show. Hotel pickup included.
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/yacht-charter-istanbul"
                  className="block rounded-xl border border-[var(--line)] p-4 transition-colors hover:border-[var(--brand-primary)]/40 hover:bg-[var(--surface-alt)]"
                >
                  <span className="block font-semibold text-[var(--heading)]">
                    Private yacht — from €200
                  </span>
                  <span className="mt-1 block text-sm text-[var(--text-muted)]">
                    Whole-yacht charter, 2-hour minimum, 10–150 guests.
                  </span>
                </Link>
              </li>
            </ul>
          </section>

          {/* CTA */}
          <section className="rounded-2xl border border-[var(--brand-primary)]/20 bg-[linear-gradient(135deg,rgba(230,110,72,0.06),rgba(255,184,0,0.08))] p-6">
            <h2 className="mb-2 text-xl font-bold text-[var(--heading)]">
              Book your {district.name} cruise
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-[var(--body-text)]">
              Send your hotel name + preferred evening to WhatsApp — we confirm
              pickup time and package within minutes.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href={`${productPath}#core-booking-planner`} className="btn-cta !px-6 !py-3">
                Reserve {productLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`${WHATSAPP_URL}?text=${encodeURIComponent(
                  `Hi MerrySails! I'm staying in ${district.name} and would like to book the Bosphorus ${productLabel.toLowerCase()}. Hotel: [name], date: [date], guests: [N].`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--brand-primary)]/30 bg-white px-6 py-3 text-sm font-semibold text-[var(--brand-primary)] transition-colors hover:bg-[var(--brand-primary)]/5"
              >
                WhatsApp from {district.name}
              </a>
            </div>
            <p className="mt-3 text-xs italic text-[var(--text-muted)]">
              Operated under Meryem Yıldız Travel · TÜRSAB A Group licence #
              {TURSAB_LICENSE_NUMBER} · 50,000+ guests since 2001.
            </p>
          </section>
        </div>
      </main>
      <StickyMobileCta
        reserveHref={`${productPath}#core-booking-planner`}
        reserveLabel={`Reserve from ${productPrice}`}
        whatsappLocation={`hotel_cluster_${district.slug}`}
        whatsappPrefill={`Hi MerrySails! I'm staying in ${district.name} and would like to book the Bosphorus ${productLabel.toLowerCase()}.`}
      />
    </>
  );
}
