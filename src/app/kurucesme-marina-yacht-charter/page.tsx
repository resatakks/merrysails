import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TrackedContactLink from "@/components/analytics/TrackedContactLink";
import { PHONE_DISPLAY, SITE_URL, WHATSAPP_URL } from "@/lib/constants";
import { buildHreflang } from "@/lib/hreflang";

export const revalidate = 3600;

const canonicalUrl = `${SITE_URL}/kurucesme-marina-yacht-charter`;

export const metadata: Metadata = {
  title: "Kurucesme Marina Yacht Charter Istanbul 2026 | MerrySails",
  description:
    "Kurucesme Marina yacht charter support page for guests who already know they want a private yacht and need clearer departure-marina, boarding, and waterfront context before booking in Istanbul.",
  alternates: {
    canonical: canonicalUrl,
    languages: buildHreflang("/kurucesme-marina-yacht-charter"),
  },
  openGraph: {
    title: "Kurucesme Marina Yacht Charter Istanbul 2026 | MerrySails",
    description:
      "Use this page when Kurucesme Marina departure logic is the main question before booking a private Bosphorus yacht charter in Istanbul.",
    url: canonicalUrl,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Kurucesme Marina yacht charter Istanbul — MerrySails",
      },
    ],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Kurucesme Marina Yacht Charter Istanbul",
  description:
    "Commercial support page for guests comparing private yacht charter in Istanbul when Kurucesme Marina departure and boarding context are the deciding questions.",
  url: canonicalUrl,
  image: `${SITE_URL}/og-image.jpg`,
  openingHours: "Mo-Su 00:00-23:59",
  provider: {
    "@id": `${SITE_URL}/#organization`,
  },
  areaServed: {
    "@type": "City",
    name: "Istanbul",
  },
  serviceType: "Private Yacht Charter Departure Support",
  offers: {
    "@type": "Offer",
    priceCurrency: "EUR",
    price: "280",
    availability: "https://schema.org/InStock",
    validFrom: "2026-01-01",
    url: `${SITE_URL}/yacht-charter-istanbul`,
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Kurucesme Marina Yacht Charter Istanbul", item: canonicalUrl },
  ],
};

const faqItems = [
  {
    q: "Is this the main owner page for private yacht charter in Istanbul?",
    a: "No. The main owner page is Yacht Charter Istanbul. This page is a narrower support URL for guests whose main question is how Kurucesme Marina departure and boarding work before the charter is confirmed.",
  },
  {
    q: "When should I use this page instead of the Kurucesme Marina guide?",
    a: "Use this page when the question is already commercial and charter-led. Use the guide when you mainly need neighborhood, transport, or waterfront context around the marina.",
  },
  {
    q: "Do all private yacht bookings depart from Kurucesme Marina?",
    a: "Many private charter flows use Kurucesme Marina as the clearest departure reference, but the final boarding point can still depend on the yacht assignment, route, and booking details.",
  },
  {
    q: "Should I open another page if the brief is really proposal or dinner-led?",
    a: "Yes. Use the proposal page when the reveal is the main task, and use the private dinner page when dinner is the main format rather than marina or vessel logistics.",
  },
  {
    q: "What helps the team confirm the right marina flow?",
    a: "The date, guest count, yacht brief, whether transfer support is needed, and whether the booking is a simple charter or an event-led plan all help the team confirm the best departure setup.",
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
    title: "The yacht is already the chosen format",
    description:
      "Use this page when the guest is already sold on a private yacht and the remaining concern is the Kurucesme-side departure flow.",
  },
  {
    title: "Departure confidence matters",
    description:
      "This page fits guests who want to understand boarding, marina access, and how the private charter starts before paying.",
  },
  {
    title: "Waterfront context helps close the booking",
    description:
      "It is a clean fit when nearby access, marina feel, and the departure environment are part of the purchase decision.",
  },
];

const flowSteps = [
  {
    title: "Confirm private yacht charter is the right owner path",
    description:
      "The yacht owner page should still carry package comparison. This page exists after the private-charter direction is already clear.",
  },
  {
    title: "Use Kurucesme as the practical departure reference",
    description:
      "Kurucesme Marina is the cleanest public reference point for many private departures without turning every waterfront mention into a guarantee.",
  },
  {
    title: "Check transfer or self-arrival needs",
    description:
      "Some bookings are simple self-arrival charters, while others need hotel transfer support or a more event-led arrival plan.",
  },
  {
    title: "Follow the final booking confirmation",
    description:
      "The written confirmation remains the source of truth for the exact marina, timing, and boarding flow on your date.",
  },
];

const comparePages = [
  {
    href: "/yacht-charter-istanbul",
    title: "Yacht Charter Istanbul",
    description:
      "Use the protected owner page for package comparison, visible pricing logic, and the main private-yacht booking path.",
  },
  {
    href: "/guides/kurucesme-marina",
    title: "Kurucesme Marina Guide",
    description:
      "Use the guide when your question is more local-support or transport-led than commercial yacht-led.",
  },
  {
    href: "/proposal-yacht-rental-istanbul",
    title: "Proposal Yacht Rental",
    description:
      "Use this when the departure only matters because the real booking is a proposal with privacy and reveal timing.",
  },
  {
    href: "/contact",
    title: "Ask About Marina Fit",
    description:
      "Use contact when the date, group size, and desired yacht format are already known and you want the team to confirm the departure flow.",
  },
];

const marinaReasons = [
  {
    title: "Straightforward private charter boarding",
    description: "A good fit when the group wants a clean marina arrival without a complex event build around it.",
  },
  {
    title: "Sunset or photo-led charter timing",
    description: "Useful when the marina and departure slot need to line up with light, route, or a shorter luxury outing.",
  },
  {
    title: "Celebration logistics before add-ons",
    description: "Helpful when the yacht and the boarding flow need to be confirmed before discussion moves into decoration or catering.",
  },
];

export default function KurucesmeMarinaYachtCharterPage() {
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
            <span className="text-[var(--heading)]">Kurucesme Marina Yacht Charter Istanbul</span>
          </nav>

          <section className="mb-12 grid items-start gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="mb-4 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
                Narrow commercial support page
              </p>
              <h1 className="mb-4 text-3xl font-bold leading-tight text-[var(--heading)] md:text-5xl">
                Kurucesme Marina Yacht Charter Istanbul
              </h1>
              <p className="mb-6 max-w-3xl text-lg leading-relaxed text-[var(--text-muted)]">
                Use this page when private yacht charter is already the likely fit and the real question
                is how the Kurucesme Marina departure flow works. The protected owner page is still{" "}
                <Link href="/yacht-charter-istanbul" className="text-[var(--brand-primary)] hover:underline">
                  Yacht Charter Istanbul
                </Link>
                ; this support page exists for guests who need clearer marina, boarding, and arrival
                confidence before they move ahead with a Bosphorus private yacht booking.
              </p>
              <div className="mb-6 rounded-2xl border border-[var(--brand-primary)]/10 bg-white p-4">
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
                  Departure-first support
                </p>
                <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                  MerrySails works under Merry Tourism, a TURSAB-backed Istanbul operator since
                  2001. Kurucesme is a practical private-yacht departure reference, but the final
                  booking confirmation still defines the exact boarding flow.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/yacht-charter-istanbul"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--brand-primary)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--brand-primary-hover)]"
                >
                  Compare yacht packages <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/guides/kurucesme-marina"
                  className="inline-flex items-center justify-center rounded-xl border border-[var(--brand-primary)] px-6 py-3 font-semibold text-[var(--brand-primary)] transition-colors hover:bg-[var(--brand-primary)] hover:text-white"
                >
                  Read marina guide
                </Link>
              </div>
            </div>

            <aside className="rounded-2xl border border-white bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-[var(--heading)]">
                What helps us confirm the departure setup
              </h2>
              <ul className="space-y-3 text-sm text-[var(--text-muted)]">
                {[
                  "Preferred date and rough charter timing",
                  "Guest count and whether the plan is simple or event-led",
                  "Whether transfer support is needed or self-arrival is fine",
                  "Whether proposal, dinner, or celebration details are already part of the brief",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="font-bold text-[var(--brand-primary)]">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </section>

          <section className="mb-12 rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">
              When this Kurucesme yacht page is the right fit
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {fitCards.map((item) => (
                <div key={item.title} className="rounded-xl border border-white bg-white p-4 shadow-sm">
                  <h3 className="mb-2 text-base font-semibold text-[var(--heading)]">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12 rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">
              How the marina-led booking flow usually works
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {flowSteps.map((item) => (
                <div key={item.title} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <h3 className="mb-2 font-semibold text-[var(--heading)]">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12 rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">
              Common reasons guests care about Kurucesme Marina
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {marinaReasons.map((item) => (
                <div key={item.title} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <h3 className="mb-2 text-base font-semibold text-[var(--heading)]">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12 rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">Compare with related private-yacht paths</h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {comparePages.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl border border-gray-200 bg-gray-50 p-4 transition-colors hover:border-[var(--brand-primary)]/20 hover:bg-white"
                >
                  <h3 className="mb-1 text-base font-semibold text-[var(--heading)]">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{item.description}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mb-12 rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">Kurucesme yacht charter FAQs</h2>
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
                  Marina-led charter support
                </p>
                <h2 className="mb-3 text-3xl font-bold">Tell us the yacht brief and we&apos;ll confirm the cleanest departure path</h2>
                <p className="max-w-2xl text-sm leading-relaxed text-white/80">
                  Send the date, group size, and whether you need a simple private charter or a more
                  event-led setup. We will route you into the right marina and charter flow.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-[var(--heading)] transition-colors hover:bg-white/90"
                >
                  Ask about departure fit
                </Link>
                <TrackedContactLink
                  href={WHATSAPP_URL}
                  kind="whatsapp"
                  label="kurucesme_marina_yacht_support_whatsapp"
                  location="kurucesme_marina_yacht_support_page"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
                >
                  WhatsApp us
                </TrackedContactLink>
                <TrackedContactLink
                  href={`tel:${PHONE_DISPLAY.replace(/\s+/g, "")}`}
                  kind="phone"
                  label="kurucesme_marina_yacht_support_phone"
                  location="kurucesme_marina_yacht_support_page"
                  className="inline-flex items-center justify-center rounded-xl border border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Call {PHONE_DISPLAY}
                </TrackedContactLink>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
