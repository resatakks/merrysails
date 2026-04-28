import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TrackedContactLink from "@/components/analytics/TrackedContactLink";
import { PHONE_DISPLAY, SITE_URL, WHATSAPP_URL } from "@/lib/constants";
import { buildHreflang } from "@/lib/hreflang";

export const revalidate = 3600;

const canonicalUrl = `${SITE_URL}/dinner-cruise-pickup-sultanahmet-taksim`;

export const metadata: Metadata = {
  title: "Dinner Cruise Pickup from Sultanahmet & Taksim Istanbul 2026",
  description:
    "Dinner cruise pickup support for Sultanahmet, Taksim, Sirkeci, and Karakoy guests comparing shared Bosphorus dinner cruise transfer fit before booking.",
  alternates: {
    canonical: canonicalUrl,
    languages: buildHreflang("/dinner-cruise-pickup-sultanahmet-taksim"),
  },
  openGraph: {
    title: "Dinner Cruise Pickup from Sultanahmet & Taksim Istanbul 2026",
    description:
      "Use this support page when your main question is whether Sultanahmet, Taksim, Sirkeci, or Karakoy pickup fits the shared Bosphorus dinner cruise flow.",
    url: canonicalUrl,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Dinner cruise pickup from Sultanahmet and Taksim Istanbul — MerrySails",
      },
    ],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Dinner Cruise Pickup from Sultanahmet and Taksim Istanbul",
  description:
    "Narrow commercial support page for shared Bosphorus dinner-cruise guests checking Sultanahmet, Taksim, Sirkeci, and Karakoy pickup fit before booking.",
  provider: {
    "@id": `${SITE_URL}/#organization`,
  },
  areaServed: [
    { "@type": "Place", name: "Sultanahmet, Istanbul" },
    { "@type": "Place", name: "Taksim, Istanbul" },
    { "@type": "Place", name: "Sirkeci, Istanbul" },
    { "@type": "Place", name: "Karakoy, Istanbul" },
  ],
  serviceType: "Bosphorus Dinner Cruise Pickup Area Support",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Dinner Cruise Pickup from Sultanahmet and Taksim", item: canonicalUrl },
  ],
};

const faqItems = [
  {
    q: "Can MerrySails arrange dinner cruise pickup from Sultanahmet?",
    a: "Sultanahmet is usually one of the first areas to check for selected central European-side pickup support, but final confirmation depends on hotel address, street access, date, and the operating plan.",
  },
  {
    q: "Can I book a dinner cruise pickup from Taksim?",
    a: "Taksim and Beyoglu hotels can often be reviewed for pickup or nearby collection-point support, but door pickup is not promised until the team confirms your exact hotel and date.",
  },
  {
    q: "Is this different from the main dinner cruise page?",
    a: "Yes. The main Istanbul Dinner Cruise page owns the shared dinner product and package details. This page only answers the local pickup-area question for central Istanbul guests.",
  },
  {
    q: "What if I stay in Karakoy or Sirkeci?",
    a: "Karakoy and Sirkeci are central enough that direct arrival, nearby collection, or transfer support may all be possible depending on the evening. The written confirmation is the source of truth.",
  },
  {
    q: "Should Asian-side hotels use this page?",
    a: "Usually not as the first route. Asian-side guests often need direct arrival or a separately confirmed plan rather than the standard central European-side pickup flow.",
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

const areaRows = [
  {
    area: "Sultanahmet / Old City",
    bestFit: "Often a strong pickup-review area",
    note: "Share the hotel name and street. Some streets require a nearby collection point instead of door pickup.",
  },
  {
    area: "Taksim / Beyoglu",
    bestFit: "Good central-zone candidate",
    note: "Taksim hotels are reviewed by exact location, traffic pattern, and whether the vehicle can stop safely.",
  },
  {
    area: "Sirkeci",
    bestFit: "Usually close enough for flexible routing",
    note: "Depending on the evening, Sirkeci may work as pickup, nearby collection, or simple direct arrival.",
  },
  {
    area: "Karakoy",
    bestFit: "Often better checked against boarding-side logistics",
    note: "Karakoy can be close to the waterfront flow, so the team may recommend direct arrival or a short transfer plan.",
  },
  {
    area: "Asian side / outer districts",
    bestFit: "Needs separate confirmation",
    note: "These stays are usually outside the simple central European-side pickup logic.",
  },
];

const decisionRows = [
  {
    question: "I know I want the shared dinner cruise and only need Sultanahmet/Taksim pickup clarity",
    bestPage: "This local pickup support page",
    href: "/dinner-cruise-pickup-sultanahmet-taksim",
  },
  {
    question: "I need broader hotel pickup eligibility and transfer rules",
    bestPage: "Dinner Cruise with Hotel Pickup",
    href: "/dinner-cruise-with-hotel-pickup-istanbul",
  },
  {
    question: "I need Kabatas-side arrival and boarding confidence",
    bestPage: "Kabatas Dinner Cruise Support",
    href: "/kabatas-dinner-cruise-istanbul",
  },
  {
    question: "I still need to compare dinner packages first",
    bestPage: "Istanbul Dinner Cruise",
    href: "/istanbul-dinner-cruise",
  },
];

const routeSteps = [
  "Choose the main shared dinner cruise only if the public evening format is already right.",
  "Send your hotel name, district, guest count, and travel date before assuming pickup is included.",
  "Wait for direct pickup, nearby collection, or direct-arrival instructions in writing.",
  "Use the main dinner page for package details and the confirmation message for exact pickup timing.",
];

export default function DinnerCruisePickupSultanahmetTaksimPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
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
            <span className="text-[var(--heading)]">Dinner Cruise Pickup from Sultanahmet & Taksim</span>
          </nav>

          <section className="mb-12 grid items-start gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="mb-4 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
                Local pickup support page
              </p>
              <h1 className="mb-4 text-3xl font-bold leading-tight text-[var(--heading)] md:text-5xl">
                Dinner Cruise Pickup from Sultanahmet & Taksim
              </h1>
              <p className="mb-6 max-w-3xl text-lg leading-relaxed text-[var(--text-muted)]">
                Use this page when the shared{" "}
                <Link href="/istanbul-dinner-cruise" className="text-[var(--brand-primary)] hover:underline">
                  Istanbul Dinner Cruise
                </Link>{" "}
                is already the likely fit, but your real question is whether a hotel in
                Sultanahmet, Taksim, Sirkeci, or Karakoy can join the pickup flow. It is a local
                support page, not a replacement for the protected dinner-cruise owner page.
              </p>
              <div className="mb-6 rounded-2xl border border-[var(--brand-primary)]/10 bg-white p-4">
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
                  Important pickup rule
                </p>
                <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                  Pickup is reviewed by hotel address, date, guest count, and street access. The
                  written confirmation always beats generic district assumptions.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/dinner-cruise-with-hotel-pickup-istanbul"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--brand-primary)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--brand-primary-hover)]"
                >
                  Check hotel pickup logic <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/istanbul-dinner-cruise"
                  className="inline-flex items-center justify-center rounded-xl border border-[var(--brand-primary)] px-6 py-3 font-semibold text-[var(--brand-primary)] transition-colors hover:bg-[var(--brand-primary)] hover:text-white"
                >
                  Compare dinner packages
                </Link>
              </div>
            </div>

            <aside className="rounded-2xl border border-white bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-[var(--heading)]">
                What to send for a fast pickup check
              </h2>
              <ul className="space-y-3 text-sm leading-relaxed text-[var(--text-muted)]">
                <li>Hotel name and district</li>
                <li>Exact stay date</li>
                <li>Guest count</li>
                <li>Whether anyone needs extra walking support</li>
                <li>Preferred package from the dinner-cruise page</li>
              </ul>
              <TrackedContactLink
                href={WHATSAPP_URL}
                kind="whatsapp"
                label="dinner_pickup_sultanahmet_taksim_sidebar_whatsapp"
                location="dinner_pickup_sultanahmet_taksim_sidebar"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-green-700"
              >
                Ask on WhatsApp
              </TrackedContactLink>
              <p className="mt-3 text-center text-xs text-[var(--text-muted)]">
                Or call {PHONE_DISPLAY}
              </p>
            </aside>
          </section>

          <section className="mb-12 rounded-3xl bg-white p-6 shadow-sm md:p-8">
            <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">
              Sultanahmet, Taksim, Sirkeci and Karakoy Dinner Cruise Pickup Areas
            </h2>
            <p className="mb-6 max-w-3xl text-[var(--text-muted)]">
              These central districts are not identical. A good pickup answer needs the hotel
              address, not just the neighborhood name.
            </p>
            <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-[var(--surface-alt)] text-[var(--heading)]">
                  <tr>
                    <th className="p-4 font-semibold">Area</th>
                    <th className="p-4 font-semibold">Typical Fit</th>
                    <th className="p-4 font-semibold">What to Check</th>
                  </tr>
                </thead>
                <tbody>
                  {areaRows.map((row) => (
                    <tr key={row.area} className="border-t border-[var(--border)]">
                      <td className="p-4 font-semibold text-[var(--heading)]">{row.area}</td>
                      <td className="p-4 text-[var(--text-muted)]">{row.bestFit}</td>
                      <td className="p-4 text-[var(--text-muted)]">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-12 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
              <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">
                Which Dinner Cruise Pickup Page Should You Use?
              </h2>
              <div className="space-y-4">
                {decisionRows.map((row) => (
                  <div key={row.question} className="rounded-2xl border border-[var(--border)] p-4">
                    <h3 className="mb-2 text-base font-semibold text-[var(--heading)]">{row.question}</h3>
                    <Link href={row.href} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-primary)] hover:underline">
                      {row.bestPage} <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
              <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">
                How the Central Hotel Pickup Flow Works
              </h2>
              <ol className="space-y-4">
                {routeSteps.map((step, index) => (
                  <li key={step} className="flex gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--brand-primary)] text-sm font-bold text-white">
                      {index + 1}
                    </span>
                    <p className="pt-1 text-sm leading-relaxed text-[var(--text-muted)]">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section className="mb-12 rounded-3xl bg-white p-6 shadow-sm md:p-8">
            <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">
              Dinner Cruise Pickup FAQ for Sultanahmet and Taksim
            </h2>
            <div className="space-y-4">
              {faqItems.map((item) => (
                <div key={item.q} className="rounded-2xl border border-[var(--border)] p-4">
                  <h3 className="mb-2 text-base font-semibold text-[var(--heading)]">{item.q}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl bg-[var(--brand-primary)] p-8 text-white">
            <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
              <div>
                <h2 className="mb-3 text-2xl font-bold">
                  Ready to check your hotel pickup fit?
                </h2>
                <p className="text-white/85">
                  Send the hotel name and date first, then use the main dinner-cruise page for the
                  package choice once the local pickup logic is clear.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
                <TrackedContactLink
                  href={WHATSAPP_URL}
                  kind="whatsapp"
                  label="dinner_pickup_sultanahmet_taksim_final_whatsapp"
                  location="dinner_pickup_sultanahmet_taksim_final_cta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 font-semibold text-[var(--brand-primary)] transition-colors hover:bg-white/90"
                >
                  Send hotel details
                </TrackedContactLink>
                <Link
                  href="/istanbul-dinner-cruise"
                  className="inline-flex items-center justify-center rounded-xl border border-white/70 px-5 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-[var(--brand-primary)]"
                >
                  View dinner cruise
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
