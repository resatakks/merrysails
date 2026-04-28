import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SITE_URL } from "@/lib/constants";
import { buildHreflang } from "@/lib/hreflang";

export const revalidate = 3600;

const canonicalUrl = `${SITE_URL}/bosphorus-cruise-departure-points`;

export const metadata: Metadata = {
  title: "Bosphorus Cruise Departure Points Istanbul 2026 | MerrySails",
  description:
    "Bosphorus cruise departure points in Istanbul: Kabataş pier for dinner cruise, Karaköy waterfront for sunset cruise, Kurucesme Marina for private yacht charter. Exact addresses, metro/tram directions, and taxi times from city centre.",
  alternates: {
    canonical: canonicalUrl,
    languages: buildHreflang("/bosphorus-cruise-departure-points"),
  },
  openGraph: {
    title: "Bosphorus Cruise Departure Points Istanbul 2026 | MerrySails",
    description:
      "Use this page when the main question is where different Bosphorus cruise products start in Istanbul and which owner page each departure flow belongs to.",
    url: canonicalUrl,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Bosphorus cruise departure points Istanbul — MerrySails",
      },
    ],
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Bosphorus Cruise Departure Points Istanbul",
  description:
    "Public support hub for Bosphorus cruise departure logic in Istanbul, clarifying which MerrySails owner or support page fits dinner, sunset, and private-yacht boarding flows.",
  url: canonicalUrl,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Bosphorus Cruise Departure Points Istanbul", item: canonicalUrl },
  ],
};

const flowCards = [
  {
    title: "Kabataş pier — shared dinner cruise",
    eyebrow: "Shared dinner product",
    description:
      "The shared dinner cruise boards from the Kabataş side of the Bosphorus waterfront. Kabataş is directly accessible by tram (T1 line, Kabataş stop), funicular from Taksim (F1 line), and taxi from Sultanahmet in 10–15 minutes. The pier is at the foot of Dolmabahçe Palace on the European shore. Dinner cruise guests with hotel-transfer support are routed here after the central pickup completes.",
    ownerHref: "/istanbul-dinner-cruise",
    ownerLabel: "Open dinner owner page",
    supportHref: "/kabatas-dinner-cruise-istanbul",
    supportLabel: "See Kabataş support page",
  },
  {
    title: "Karaköy waterfront — shared sunset cruise",
    eyebrow: "Shared golden-hour product",
    description:
      "The sunset cruise uses a Karaköy-side meeting flow on the European Bosphorus waterfront. Karaköy is a 5-minute walk from the Galata Bridge and reachable by tram (T1 line, Karaköy stop) or taxi from Taksim in around 10 minutes. The final meeting pin is confirmed after booking for your specific date and seasonal departure time.",
    ownerHref: "/cruises/bosphorus-sunset-cruise",
    ownerLabel: "Open sunset owner page",
    supportHref: "/guides/karakoy-waterfront",
    supportLabel: "Read Karaköy guide",
  },
  {
    title: "Kurucesme Marina — private yacht charters",
    eyebrow: "Private charter direction",
    description:
      "Private yacht charters typically depart from Kurucesme Marina, located on the European Bosphorus shore between Ortaköy and Arnavutköy — approximately 7 km from Taksim. The marina is accessible by taxi (15–20 minutes from central Istanbul) or by the Bosphorus ferry from Eminönü. Your confirmation message specifies the exact marina gate and assigned berth for your vessel.",
    ownerHref: "/yacht-charter-istanbul",
    ownerLabel: "Open yacht owner page",
    supportHref: "/kurucesme-marina-yacht-charter",
    supportLabel: "See Kurucesme yacht support",
  },
];

const pierDetails = [
  {
    name: "Kabataş",
    product: "Dinner cruise",
    address: "Kabataş Vapur İskelesi, Beşiktaş, Istanbul (European side)",
    metro: "T1 tram — Kabataş stop; F1 funicular from Taksim",
    taxi: "10–15 min from Sultanahmet; 5 min from Beşiktaş",
    landmark: "Foot of Dolmabahçe Palace, directly below the Kabataş funicular terminus",
    tip: "Arrive 15 minutes before departure. Look for the MerrySails boarding staff at the pier entrance.",
  },
  {
    name: "Karaköy",
    product: "Sunset cruise",
    address: "Karaköy waterfront (Rıhtım Caddesi), Beyoğlu, Istanbul (European side)",
    metro: "T1 tram — Karaköy stop; 5-minute walk from Galata Bridge",
    taxi: "10 min from Taksim; 8 min from Sultanahmet",
    landmark: "Between the Galata Bridge and the cruise ship terminal, near the historic Han buildings",
    tip: "The exact meeting point is confirmed in your booking message. Do not rely on generic online maps for the precise berth number.",
  },
  {
    name: "Kurucesme Marina",
    product: "Private yacht charter",
    address: "Kurucesme Marina, Kuruçeşme Mah., Beşiktaş, Istanbul (European side)",
    metro: "No direct metro; taxi recommended",
    taxi: "15–20 min from Taksim; 20–25 min from Sultanahmet",
    landmark: "Between Ortaköy and Arnavutköy on the Bosphorus shoreline, visible from the European coastal road",
    tip: "Confirm the marina gate and berth number from your booking confirmation before arranging transport.",
  },
  {
    name: "Eminönü",
    product: "Selected sunset cruise variants",
    address: "Eminönü İskelesi, Fatih, Istanbul (European side, Golden Horn entry)",
    metro: "T1 tram — Eminönü stop; direct connection from Sultanahmet (1 stop)",
    taxi: "5 min from Sultanahmet; 15 min from Taksim",
    landmark: "Galata Bridge south end, next to the Spice Bazaar (Mısır Çarşısı)",
    tip: "Eminönü is used for selected cruise variants. Verify your booking confirmation before travelling here — not all sunset or dinner cruises use this pier.",
  },
];

const faqItems = [
  {
    q: "Do all Bosphorus cruises in Istanbul use the same departure point?",
    a: "No. Shared dinner, shared sunset, and private yacht products use different operational flows. Dinner cruises use Kabataş pier, sunset cruises use a Karaköy-side meeting flow, and private yacht charters typically depart from Kurucesme Marina. Eminönü is used for selected cruise variants. The written booking confirmation is always the final source of truth for your specific date.",
  },
  {
    q: "How do I get to Kabataş pier for the dinner cruise?",
    a: "Take the T1 tram to the Kabataş stop, or the F1 funicular from Taksim Square down to Kabataş. By taxi it takes 10–15 minutes from Sultanahmet. The pier is at the foot of Dolmabahçe Palace — look for the MerrySails boarding staff at the entrance.",
  },
  {
    q: "How do I get to Karaköy for the sunset cruise?",
    a: "Take the T1 tram to the Karaköy stop, then walk 5 minutes along the waterfront. From Taksim, taxis take around 10 minutes. Karaköy is the first stop after crossing the Galata Bridge heading north. Your exact meeting pin is sent in the booking confirmation.",
  },
  {
    q: "Where exactly is Kurucesme Marina?",
    a: "Kurucesme Marina is on the European Bosphorus shore between Ortaköy and Arnavutköy, approximately 7 km from Taksim. There is no direct metro connection — take a taxi (15–20 minutes from central Istanbul) or the Bosphorus ferry from Eminönü. Your confirmation specifies the exact berth.",
  },
  {
    q: "Can I board from Eminönü?",
    a: "Eminönü is used for selected MerrySails cruise variants. It is the most central pier — 5 minutes by tram from Sultanahmet (T1 line, Eminönü stop), located next to the Spice Bazaar at the south end of Galata Bridge. Check your booking confirmation to confirm whether your cruise uses this pier.",
  },
  {
    q: "Should I rely on a generic map pin before booking?",
    a: "No. Public departure references are useful for pre-trip planning, but the written booking confirmation is the final source of truth for the exact operational handoff on your date. Pier assignments can vary by product variant and vessel availability.",
  },
  {
    q: "Which page should I open first if I am still comparing products?",
    a: "Open the Bosphorus Cruise compare hub first. Use the narrower departure and support pages only after the product direction is already clear.",
  },
  {
    q: "Is hotel pickup available from central Istanbul?",
    a: "Yes. The dinner cruise offers hotel-transfer support from central areas including Sultanahmet, Taksim, Sirkeci, and Karaköy. Transfer guests are routed to the Kabataş boarding flow after pickup completes. See the dinner cruise pickup support pages for eligibility details.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

const planningNotes = [
  "Treat the product owner page as the first booking decision and the departure page as the second click.",
  "Use Kabataş logic only for the shared dinner path, not as a generic Istanbul cruise assumption.",
  "Use Karaköy logic only after the sunset product is already chosen.",
  "Use Kurucesme-side marina logic for private yachts, but wait for the final written boarding handoff before arranging transport.",
  "Arrive 15 minutes before departure to allow time for check-in and boarding.",
  "All MerrySails products are TURSAB A Group licensed — the boarding flow and final instructions are part of the confirmed booking service.",
];

export default function BosphorusCruiseDeparturePointsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="pt-28 pb-20 bg-[var(--surface-alt)]">
        <div className="container-main">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center gap-2 text-sm text-[var(--text-muted)]"
          >
            <Link href="/" className="hover:text-[var(--brand-primary)]">
              Home
            </Link>
            <span>/</span>
            <span className="text-[var(--heading)]">Bosphorus Cruise Departure Points Istanbul</span>
          </nav>

          <section className="mb-12 max-w-4xl">
            <p className="mb-4 inline-flex rounded-full bg-[var(--brand-primary)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
              Public support hub
            </p>
            <h1 className="mb-4 text-3xl font-bold leading-tight text-[var(--heading)] md:text-5xl">
              Bosphorus Cruise Departure Points Istanbul
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-[var(--text-muted)]">
              Use this page when the main question is where different Bosphorus cruise products
              start in Istanbul. MerrySails does not treat one generic waterfront pin as the answer
              for every booking. Dinner, sunset, and private-yacht departures each follow a different
              logic, and the right next click depends on the product first.
            </p>
          </section>

          <section className="mb-12 grid gap-4 lg:grid-cols-3">
            {flowCards.map((item) => (
              <div key={item.title} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
                  {item.eyebrow}
                </p>
                <h2 className="mb-3 text-xl font-bold text-[var(--heading)]">{item.title}</h2>
                <p className="mb-5 text-sm leading-relaxed text-[var(--text-muted)]">{item.description}</p>
                <div className="flex flex-col gap-3">
                  <Link
                    href={item.ownerHref}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--brand-primary)] px-5 py-3 font-semibold text-white transition-colors hover:bg-[var(--brand-primary-hover)]"
                  >
                    {item.ownerLabel} <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href={item.supportHref}
                    className="inline-flex items-center justify-center rounded-xl border border-[var(--brand-primary)] px-5 py-3 font-semibold text-[var(--brand-primary)] transition-colors hover:bg-[var(--brand-primary)] hover:text-white"
                  >
                    {item.supportLabel}
                  </Link>
                </div>
              </div>
            ))}
          </section>

          <section className="mb-12 rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
            <h2 className="mb-2 text-2xl font-bold text-[var(--heading)]">Istanbul Bosphorus Pier Guide — Getting to Each Departure Point</h2>
            <p className="mb-6 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)]">
              Each MerrySails product uses a specific pier on the Istanbul waterfront. Below are the confirmed departure points, exact locations, and transport options for each cruise type. Always verify your final boarding details in the booking confirmation message.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b-2 border-[var(--brand-primary)]/20 bg-[var(--surface-alt)]">
                    <th className="p-4 text-left font-semibold text-[var(--heading)]">Pier</th>
                    <th className="p-4 text-left font-semibold text-[var(--heading)]">Product</th>
                    <th className="p-4 text-left font-semibold text-[var(--heading)]">Address</th>
                    <th className="p-4 text-left font-semibold text-[var(--heading)]">Metro / Tram</th>
                    <th className="p-4 text-left font-semibold text-[var(--heading)]">Taxi from Centre</th>
                  </tr>
                </thead>
                <tbody>
                  {pierDetails.map((pier) => (
                    <tr key={pier.name} className="border-b border-[var(--line)] last:border-b-0">
                      <td className="p-4 font-semibold text-[var(--heading)]">{pier.name}</td>
                      <td className="p-4 text-[var(--brand-primary)] font-medium">{pier.product}</td>
                      <td className="p-4 text-[var(--text-muted)]">{pier.address}</td>
                      <td className="p-4 text-[var(--text-muted)]">{pier.metro}</td>
                      <td className="p-4 text-[var(--text-muted)]">{pier.taxi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {pierDetails.map((pier) => (
                <div key={pier.name} className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4">
                  <p className="mb-1 text-xs font-bold uppercase tracking-wide text-[var(--brand-primary)]">{pier.name} — {pier.product}</p>
                  <p className="mb-2 text-sm font-semibold text-[var(--heading)]">{pier.landmark}</p>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]"><strong>Tip:</strong> {pier.tip}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12 rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">
              Departure planning rules that keep booking decisions clean
            </h2>
            <ul className="grid gap-3 md:grid-cols-2">
              {planningNotes.map((item) => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-sm leading-relaxed text-[var(--text-muted)]">
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-12 rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">Departure-point FAQs</h2>
            <div className="space-y-4">
              {faqItems.map((faq) => (
                <details key={faq.q} className="group rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[var(--heading)]">
                    {faq.q}
                    <span className="text-xl text-[var(--brand-primary)] transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="rounded-3xl bg-[var(--heading)] px-6 py-10 text-white md:px-10">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
                  Product first, departure second
                </p>
                <h2 className="mb-3 text-3xl font-bold">Choose the right owner page before you solve the waterfront detail</h2>
                <p className="max-w-2xl text-sm leading-relaxed text-white/80">
                  If you are still broad, start with the compare hub. If the product is already chosen,
                  use the matching support page or local guide above.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Link
                  href="/bosphorus-cruise"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-[var(--heading)] transition-colors hover:bg-white/90"
                >
                  Open compare hub
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl border border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Ask the team
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
