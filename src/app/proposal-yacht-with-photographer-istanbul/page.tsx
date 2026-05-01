import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TrackedContactLink from "@/components/analytics/TrackedContactLink";
import { PHONE_DISPLAY, SITE_URL, WHATSAPP_URL } from "@/lib/constants";
import { buildHreflang } from "@/lib/hreflang";

export const revalidate = 3600;

const canonicalUrl = `${SITE_URL}/proposal-yacht-with-photographer-istanbul`;

export const metadata: Metadata = {
  title: "Proposal Yacht with Photographer Istanbul 2026 | MerrySails",
  description:
    "Proposal yacht with photographer in Istanbul for couples who want the reveal captured professionally without losing the private Bosphorus proposal flow.",
  alternates: {
    canonical: canonicalUrl,
    languages: buildHreflang("/proposal-yacht-with-photographer-istanbul"),
  },
  openGraph: {
    title: "Proposal Yacht with Photographer Istanbul 2026 | MerrySails",
    description:
      "Use this page when a proposal yacht is already the right fit and photographer coverage is the deciding planning detail before booking in Istanbul.",
    url: canonicalUrl,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Proposal yacht with photographer Istanbul — MerrySails",
      },
    ],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Proposal Yacht with Photographer Istanbul",
  description:
    "Commercial support page for Bosphorus proposal yacht bookings in Istanbul when photographer coverage is one of the main buying questions.",
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
  serviceType: "Proposal Yacht Photography Support",
  offers: {
    "@type": "Offer",
    priceCurrency: "EUR",
    price: "280",
    availability: "https://schema.org/InStock",
    validFrom: "2026-01-01",
    url: `${SITE_URL}/proposal-yacht-rental-istanbul`,
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Proposal Yacht with Photographer Istanbul", item: canonicalUrl },
  ],
};

const faqItems = [
  {
    q: "Is this the main owner page for proposal yacht bookings?",
    a: "No. The main owner page is Proposal Yacht Rental Istanbul. This page is a narrower support URL for couples whose key planning question is how photographer coverage fits into the proposal flow.",
  },
  {
    q: "When should I use this page instead of the general proposal page?",
    a: "Use this page when the proposal is already the right booking path and you mainly need clarity on discreet photography coverage, reveal timing, and post-proposal couple shots.",
  },
  {
    q: "Can the photographer stay discreet during the reveal?",
    a: "Yes. Proposal photography is usually planned to stay low-profile until the right moment so the reveal does not feel staged too early.",
  },
  {
    q: "Does this page replace the proposal owner or private dinner page?",
    a: "No. Use the owner page for the overall proposal structure and the private dinner page when dinner is the main format. This support page is only for photographer-led proposal narrowing.",
  },
  {
    q: "What helps the team quote the right photography setup?",
    a: "The date, preferred light conditions, how private the moment should feel, and whether you want only the reveal covered or also couple portraits and follow-up celebration shots.",
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
    title: "The reveal needs to be captured well",
    description:
      "Use this page when the proposal is already the chosen format and photographer coverage is the biggest planning decision left.",
  },
  {
    title: "You want discreet coverage first",
    description:
      "This page fits couples who care more about a clean, low-profile reveal than a heavier decoration build.",
  },
  {
    title: "Post-proposal portraits matter too",
    description:
      "It also works when you want the reveal plus a short portrait session on the Bosphorus without turning the plan into a full production.",
  },
];

const photoScenarios = [
  {
    title: "Reveal-only coverage",
    description: "The cleanest option when the proposal moment itself is the priority and the couple wants minimal intrusion.",
  },
  {
    title: "Reveal plus couple portraits",
    description: "A stronger fit when the yacht, skyline, and bridge line should also be used for follow-up photos after the yes.",
  },
  {
    title: "Styled proposal with media support",
    description: "Useful when flowers, a violinist, or celebration setup make photography part of a fuller premium proposal build.",
  },
];

const comparePages = [
  {
    href: "/proposal-yacht-rental-istanbul",
    title: "Proposal Yacht Rental Istanbul",
    description:
      "Use the owner page when you still need the main proposal structure, privacy logic, and reveal timing before narrowing to photography.",
  },
  {
    href: "/private-bosphorus-dinner-cruise",
    title: "Private Bosphorus Dinner Cruise",
    description:
      "Use this when the evening is really dinner-led and photography is secondary to the private dinner format.",
  },
  {
    href: "/yacht-charter-istanbul",
    title: "Yacht Charter Istanbul",
    description:
      "Use this when the vessel or charter package is still the main decision and the proposal brief is not fixed yet.",
  },
  {
    href: "/contact",
    title: "Ask for Photographer Fit",
    description:
      "Use contact when the date, desired light, and proposal direction are clear and you want the team to shape the right coverage plan.",
  },
];

const flowSteps = [
  {
    title: "Confirm proposal is the real owner path",
    description:
      "This page should only be used after the couple already knows the booking is proposal-led rather than generic charter-led.",
  },
  {
    title: "Decide how visible the photographer should be",
    description:
      "Some couples want fully discreet coverage; others are comfortable with a more obvious pre-positioned photographer after the reveal.",
  },
  {
    title: "Match the route to the light and reveal moment",
    description:
      "Sunset, bridge lights, and quieter stretches of the Bosphorus all change how the coverage should be staged.",
  },
  {
    title: "Keep the final written proposal as the source of truth",
    description:
      "The final booking message still confirms the actual photography, timing, and yacht setup on your chosen date.",
  },
];

export default function ProposalYachtWithPhotographerIstanbulPage() {
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
            <span className="text-[var(--heading)]">Proposal Yacht with Photographer Istanbul</span>
          </nav>

          <section className="mb-12 grid items-start gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="mb-4 inline-flex rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-rose-700">
                Narrow commercial support page
              </p>
              <h1 className="mb-4 text-3xl font-bold leading-tight text-[var(--heading)] md:text-5xl">
                Proposal Yacht with Photographer Istanbul
              </h1>
              <p className="mb-6 max-w-3xl text-lg leading-relaxed text-[var(--text-muted)]">
                Use this page when a proposal yacht is already the likely fit and photographer coverage
                is the real planning question. The protected owner page is still{" "}
                <Link href="/proposal-yacht-rental-istanbul" className="text-[var(--brand-primary)] hover:underline">
                  Proposal Yacht Rental Istanbul
                </Link>
                ; this support page exists for couples who want a cleaner answer on discreet reveal
                coverage, portrait timing, and how photography fits the Bosphorus proposal flow.
              </p>
              <div className="mb-6 rounded-2xl border border-[var(--brand-primary)]/10 bg-white p-4">
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
                  Photographer-led proposal support
                </p>
                <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                  MerrySails works under Merry Tourism, a TURSAB-backed Istanbul operator since
                  2001. Proposal photography is planned around privacy, timing, and whether the
                  coverage should stay discreet until the reveal.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/proposal-yacht-rental-istanbul"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--brand-primary)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--brand-primary-hover)]"
                >
                  Open proposal owner page <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl border border-[var(--brand-primary)] px-6 py-3 font-semibold text-[var(--brand-primary)] transition-colors hover:bg-[var(--brand-primary)] hover:text-white"
                >
                  Ask about photographer coverage
                </Link>
              </div>
            </div>

            <aside className="rounded-2xl border border-white bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-[var(--heading)]">
                What helps us shape the right proposal coverage
              </h2>
              <ul className="space-y-3 text-sm text-[var(--text-muted)]">
                {[
                  "Preferred proposal date and whether sunset or evening light matters more",
                  "Whether the reveal should feel fully discreet or lightly staged",
                  "If you want only the reveal or also portraits after the yes",
                  "Whether flowers, live music, or dinner are already part of the plan",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="font-bold text-[var(--brand-primary)]">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </section>

          <section className="mb-12 rounded-2xl border border-rose-100 bg-rose-50 p-6">
            <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">
              When this photographer support page is the right fit
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
              Common proposal-photo coverage patterns
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {photoScenarios.map((item) => (
                <div key={item.title} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <h3 className="mb-2 text-base font-semibold text-[var(--heading)]">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12 rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">
              How the proposal-photo planning flow usually works
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

          <section className="mb-12 rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">Compare with related proposal and private-yacht paths</h2>
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
            <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">Proposal photographer FAQs</h2>
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
                  Proposal-photo planning
                </p>
                <h2 className="mb-3 text-3xl font-bold">Tell us how discreet and how complete the coverage should be</h2>
                <p className="max-w-2xl text-sm leading-relaxed text-white/80">
                  Send the date, preferred light, and whether you want only the reveal or also couple
                  portraits afterward. We will shape the cleanest proposal-photo setup around it.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-[var(--heading)] transition-colors hover:bg-white/90"
                >
                  Ask for proposal-photo fit
                </Link>
                <TrackedContactLink
                  href={WHATSAPP_URL}
                  kind="whatsapp"
                  label="proposal_photographer_support_whatsapp"
                  location="proposal_photographer_support_page"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
                >
                  WhatsApp us
                </TrackedContactLink>
                <TrackedContactLink
                  href={`tel:${PHONE_DISPLAY.replace(/\s+/g, "")}`}
                  kind="phone"
                  label="proposal_photographer_support_phone"
                  location="proposal_photographer_support_page"
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
