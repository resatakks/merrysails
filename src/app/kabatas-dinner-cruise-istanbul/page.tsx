import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TrackedContactLink from "@/components/analytics/TrackedContactLink";
import { PHONE_DISPLAY, SITE_URL, WHATSAPP_URL } from "@/lib/constants";

export const revalidate = 3600;

const canonicalUrl = `${SITE_URL}/kabatas-dinner-cruise-istanbul`;

export const metadata: Metadata = {
  title: "Kabatas Dinner Cruise Istanbul 2026 | Boarding-Focused Dinner Support",
  description:
    "Kabatas dinner cruise support page for guests who already know they want the shared Bosphorus dinner cruise and need clearer boarding, arrival, and Kabatas-side routing context.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title: "Kabatas Dinner Cruise Istanbul 2026 | Boarding-Focused Dinner Support",
    description:
      "Use this page when Kabatas boarding and dinner-cruise arrival logic are the deciding questions before a shared Bosphorus evening in Istanbul.",
    url: canonicalUrl,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Kabatas dinner cruise Istanbul — MerrySails",
      },
    ],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Kabatas Dinner Cruise Istanbul",
  description:
    "Commercial support page for guests comparing the shared Bosphorus dinner cruise in Istanbul when Kabatas Pier boarding and arrival logistics are the main decision point.",
  provider: {
    "@id": `${SITE_URL}/#organization`,
  },
  areaServed: {
    "@type": "City",
    name: "Istanbul",
  },
  serviceType: "Shared Bosphorus Dinner Cruise Boarding Support",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Kabatas Dinner Cruise Istanbul", item: canonicalUrl },
  ],
};

const faqItems = [
  {
    q: "Is Kabatas the main owner page for the dinner cruise?",
    a: "No. The owner page for the shared dinner product is Istanbul Dinner Cruise. This page exists for guests whose main decision point is the Kabatas-side boarding flow rather than package comparison alone.",
  },
  {
    q: "Should I use this page if I still need to compare cruise types?",
    a: "No. If you are still comparing sunset, dinner, and private yacht options, use the Bosphorus Cruise compare hub or the main dinner owner page first.",
  },
  {
    q: "Does every dinner-cruise guest arrive directly at Kabatas?",
    a: "Not always. Some guests are routed through hotel pickup support or a nearby collection point before entering the Kabatas-side boarding flow.",
  },
  {
    q: "Is this page better than the pickup page?",
    a: "Use this page when the pier, boarding confidence, and direct-arrival logic are the real questions. Use the pickup page when hotel location and shuttle eligibility are the main uncertainty.",
  },
  {
    q: "What remains the final source of truth for the departure plan?",
    a: "The written confirmation sent for your booking remains the final source of truth for the exact evening plan, timing, and boarding instruction.",
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

const fitCards = [
  {
    title: "Kabatas is the main concern",
    description:
      "Use this page when the guest is already close to booking the shared dinner cruise but wants more confidence around the Kabatas-side flow.",
  },
  {
    title: "Dinner format is already chosen",
    description:
      "This page assumes the shared dinner format is already the right product and does not replace the main package owner page.",
  },
  {
    title: "Arrival logic matters more than pricing",
    description:
      "Use this page when the practical question is how the evening starts, not which cruise type to book in the first place.",
  },
];

const flowSteps = [
  {
    title: "Choose the shared dinner product first",
    description:
      "Confirm that the Bosphorus dinner cruise is the correct booking path before narrowing the decision to Kabatas-side logistics.",
  },
  {
    title: "Check direct arrival vs transfer-fed flow",
    description:
      "Some guests arrive directly toward Kabatas, while others join the evening through pickup or a nearby collection point.",
  },
  {
    title: "Use Kabatas as the public reference point",
    description:
      "Kabatas is the public landmark that helps guests understand the dinner boarding area without treating every waterfront queue as their cruise.",
  },
  {
    title: "Follow the written booking confirmation",
    description:
      "The final operational message still overrides any generic pier assumption and confirms the actual boarding logic for your date.",
  },
];

const kabatasDecisionRows = [
  {
    question: "I already want the shared dinner route and my main blocker is Kabatas-side boarding",
    bestPage: "Kabatas Dinner Support",
    reason: "This page exists exactly for pier-side arrival confidence and public reference-point clarity.",
  },
  {
    question: "I already want the shared dinner route and my main blocker is hotel transfer",
    bestPage: "Dinner Pickup Support",
    reason: "Pickup eligibility is different from Kabatas-side direct-arrival logic.",
  },
  {
    question: "I already want the shared dinner route and my main blocker is Turkish-night package fit",
    bestPage: "Turkish Night Dinner Support",
    reason: "Show-led shared-evening fit is a different question from where and how to board.",
  },
  {
    question: "I need only public transit and waterfront context around Kabatas",
    bestPage: "Kabatas Pier Guide",
    reason: "A public guide is better when the need is local orientation rather than a booking decision.",
  },
];

const comparePages = [
  {
    href: "/istanbul-dinner-cruise",
    title: "Istanbul Dinner Cruise",
    description:
      "Use the protected owner page for live package comparison, inclusions, and the main shared dinner booking flow.",
  },
  {
    href: "/turkish-night-dinner-cruise-istanbul",
    title: "Turkish Night Dinner Support",
    description:
      "Use this when the deciding question is the Turkish-night show format and package fit rather than Kabatas-side arrival flow.",
  },
  {
    href: "/dinner-cruise-with-hotel-pickup-istanbul",
    title: "Dinner Cruise with Hotel Pickup",
    description:
      "Use this when hotel location and pickup eligibility matter more than the Kabatas-side direct-arrival logic.",
  },
  {
    href: "/guides/kabatas-pier",
    title: "Kabatas Pier Guide",
    description:
      "Use the guide when you need broader public-transport and waterfront context around Kabatas rather than a commercial dinner decision page.",
  },
  {
    href: "/contact",
    title: "Ask the Team Directly",
    description:
      "Use contact when the date, hotel, and guest count are already clear and you want the team to confirm the flow quickly.",
  },
];

export default function KabatasDinnerCruiseIstanbulPage() {
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
            <span className="text-[var(--heading)]">Kabatas Dinner Cruise Istanbul</span>
          </nav>

          <section className="mb-12 grid items-start gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="mb-4 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
                Narrow commercial support page
              </p>
              <h1 className="mb-4 text-3xl font-bold leading-tight text-[var(--heading)] md:text-5xl">
                Kabatas Dinner Cruise Istanbul
              </h1>
              <p className="mb-6 max-w-3xl text-lg leading-relaxed text-[var(--text-muted)]">
                Use this page when the shared dinner cruise is already the likely fit and the real
                question is how the Kabatas-side boarding flow works. The protected owner page is
                still{" "}
                <Link href="/istanbul-dinner-cruise" className="text-[var(--brand-primary)] hover:underline">
                  Istanbul Dinner Cruise
                </Link>
                ; this page exists for guests who need clearer pier, arrival, and boarding
                confidence before they rely on a generic Istanbul dinner-cruise assumption.
              </p>
              <div className="mb-6 rounded-2xl border border-[var(--brand-primary)]/10 bg-white p-4">
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
                  Boarding-first support
                </p>
                <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                  MerrySails works under Merry Tourism, a TURSAB-backed Istanbul operator since
                  2001. Kabatas is the public reference point for the shared dinner-cruise flow,
                  but the final booking message remains the operational source of truth.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/istanbul-dinner-cruise"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--brand-primary)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--brand-primary-hover)]"
                >
                  Compare dinner packages <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/guides/kabatas-pier"
                  className="inline-flex items-center justify-center rounded-xl border border-[var(--brand-primary)] px-6 py-3 font-semibold text-[var(--brand-primary)] transition-colors hover:bg-[var(--brand-primary)] hover:text-white"
                >
                  Read Kabatas guide
                </Link>
              </div>
            </div>

            <aside className="rounded-2xl border border-white bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-[var(--heading)]">
                What helps us confirm the Kabatas-side dinner flow
              </h2>
              <ul className="space-y-3 text-sm text-[var(--text-muted)]">
                {[
                  "Date and preferred dinner package",
                  "Hotel or district if you are unsure about direct arrival",
                  "Guest count and whether children are joining",
                  "Whether the question is boarding confidence or pickup eligibility",
                  "Whether the booking still belongs on the shared dinner route",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="font-bold text-[var(--brand-primary)]">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4">
                <p className="text-sm font-semibold text-[var(--heading)]">Fast reply path</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  Send the date, hotel, and guest count through{" "}
                  <Link href="/contact" className="text-[var(--brand-primary)] hover:underline">
                    contact
                  </Link>{" "}
                  or WhatsApp at {PHONE_DISPLAY}.
                </p>
              </div>
            </aside>
          </section>

          <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">
              When this Kabatas dinner page is the right fit
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {fitCards.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4"
                >
                  <h3 className="mb-2 text-base font-semibold text-[var(--heading)]">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">
              How the Kabatas-side dinner flow usually works
            </h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {flowSteps.map((item, index) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4"
                >
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
                    Step {index + 1}
                  </p>
                  <h3 className="mb-2 text-base font-semibold text-[var(--heading)]">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">
              Kabatas dinner cruise vs pickup vs Turkish night support
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[var(--line)] text-[var(--heading)]">
                    <th className="px-4 py-3 font-semibold">Main question</th>
                    <th className="px-4 py-3 font-semibold">Best page</th>
                    <th className="px-4 py-3 font-semibold">Why</th>
                  </tr>
                </thead>
                <tbody>
                  {kabatasDecisionRows.map((row) => (
                    <tr key={row.question} className="border-b border-[var(--line)] last:border-0">
                      <td className="px-4 py-3 text-[var(--heading)]">{row.question}</td>
                      <td className="px-4 py-3 font-medium text-[var(--brand-primary)]">{row.bestPage}</td>
                      <td className="px-4 py-3 text-[var(--text-muted)]">{row.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
              <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-5">
                <h2 className="mb-3 text-xl font-bold text-[var(--heading)]">Strong fit when</h2>
                <ul className="space-y-3 text-sm leading-relaxed text-[var(--text-muted)]">
                  <li>The guest already wants the shared dinner cruise.</li>
                  <li>Kabatas boarding confidence is the practical blocker.</li>
                  <li>The question is arrival logic, not whether to book dinner vs yacht.</li>
                  <li>The guest needs a clearer public reference point before booking.</li>
                </ul>
              </div>
              <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-5">
                <h2 className="mb-3 text-xl font-bold text-[var(--heading)]">
                  Move back to another page when
                </h2>
                <ul className="space-y-3 text-sm leading-relaxed text-[var(--text-muted)]">
                  <li>You still need to compare cruise types broadly.</li>
                  <li>The main uncertainty is hotel pickup rather than Kabatas itself.</li>
                  <li>You need a private dinner yacht or a private charter.</li>
                  <li>You only need a general landmark/transit guide rather than a booking-focused page.</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">
              Compare with the pages that own the final decision
            </h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {comparePages.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4 transition-colors hover:border-[var(--brand-primary)]/30 hover:bg-white"
                >
                  <h3 className="mb-1 text-base font-semibold text-[var(--heading)]">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mb-12 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">Kabatas dinner FAQs</h2>
            <div className="space-y-4">
              {faqItems.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[var(--heading)]">
                    {item.q}
                    <span className="text-[var(--text-muted)] transition-transform group-open:rotate-180">
                      ▼
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          <div className="rounded-3xl bg-[var(--brand-primary)] p-8 text-center text-white">
            <h2 className="mb-3 text-2xl font-bold text-white md:text-3xl">
              Check your Kabatas-side dinner plan
            </h2>
            <p className="mx-auto mb-6 max-w-2xl text-blue-50">
              Send the date, hotel, and guest count. We will tell you whether your booking belongs
              on the shared Kabatas-side dinner flow, the pickup support flow, or a different
              product page entirely.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-[var(--brand-primary)] transition-colors hover:bg-blue-50"
              >
                Request boarding check
              </Link>
              <TrackedContactLink
                href={WHATSAPP_URL}
                kind="whatsapp"
                label="kabatas_dinner_page_whatsapp"
                location="kabatas_dinner_page"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-white px-6 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-[var(--brand-primary)]"
              >
                Ask on WhatsApp
              </TrackedContactLink>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
