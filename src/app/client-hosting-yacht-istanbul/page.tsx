import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TrackedContactLink from "@/components/analytics/TrackedContactLink";
import { PHONE_DISPLAY, SITE_URL, WHATSAPP_URL } from "@/lib/constants";

export const revalidate = 3600;

const canonicalUrl = `${SITE_URL}/client-hosting-yacht-istanbul`;

export const metadata: Metadata = {
  title: "Client Hosting Yacht Istanbul 2026 | Corporate Bosphorus Hosting Support",
  description:
    "Client hosting yacht in Istanbul for companies that need a private Bosphorus setting focused on hospitality, guest experience, and invoice-ready planning before booking.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title: "Client Hosting Yacht Istanbul 2026 | Corporate Bosphorus Hosting Support",
    description:
      "Use this page when the company brief is specifically client hosting on a private yacht rather than a broader corporate event or team-building format.",
    url: canonicalUrl,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Client hosting yacht Istanbul — MerrySails",
      },
    ],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Client Hosting Yacht Istanbul",
  description:
    "Commercial support page for private Bosphorus client-hosting yacht events in Istanbul when hospitality, guest flow, and company-ready planning matter most.",
  provider: {
    "@id": `${SITE_URL}/#organization`,
  },
  areaServed: {
    "@type": "City",
    name: "Istanbul",
  },
  serviceType: "Corporate Client Hosting Yacht Event",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Client Hosting Yacht Istanbul", item: canonicalUrl },
  ],
};

const faqItems = [
  {
    q: "Is this the main owner page for all company events?",
    a: "No. The main owner page is Corporate Events. This page is a narrower support URL for companies whose main brief is client hosting on a private Bosphorus yacht.",
  },
  {
    q: "When should I use this page instead of corporate yacht dinner?",
    a: "Use this page when guest hospitality, host control, and client impression come first. Use the corporate dinner page when the event is clearly dinner-led and more internally focused.",
  },
  {
    q: "What kinds of client-hosting formats work on a yacht?",
    a: "Executive dinners, private hospitality sailings, investor hosting, partner entertainment, and smaller relationship-led company evenings all work well on a private Bosphorus yacht.",
  },
  {
    q: "Does this always need a large branded event build?",
    a: "No. Some client-hosting briefs are intentionally understated and private, while others need stronger catering, branding, or transfer support around the guest experience.",
  },
  {
    q: "What helps the team quote the right client-hosting format?",
    a: "The date, guest count, hosting goal, whether dinner belongs in the plan, transfer needs, and invoice details all help shape the right yacht and service flow.",
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
    title: "The goal is stronger client experience",
    description:
      "Use this page when the real outcome is hospitality, trust, or relationship-building rather than a general company night.",
  },
  {
    title: "The format should stay private and polished",
    description:
      "This page fits companies that want more control, calmer flow, and better host attention than a public venue usually allows.",
  },
  {
    title: "The hosting brief is narrower than a broad event build",
    description:
      "It works when the company does not need a full launch or large activation, but still wants a premium Bosphorus setting for guests.",
  },
];

const formatCards = [
  {
    title: "Executive hosting dinner",
    description: "Best for smaller senior-level guest lists where privacy, timing, and service rhythm matter more than scale.",
  },
  {
    title: "Relationship-led sailing",
    description: "Best for lighter hosting formats where the Bosphorus itself carries most of the experience.",
  },
  {
    title: "Partner or investor hospitality",
    description: "Best when the event should feel premium and controlled without becoming a full public-facing activation.",
  },
  {
    title: "Dinner plus hosted evening",
    description: "Best when the company wants both seated hospitality and time for conversation in a private setting.",
  },
];

const comparePages = [
  {
    href: "/corporate-events",
    title: "Corporate Events",
    description:
      "Use the protected owner page when the company brief is still broad and you need the main corporate-event routing first.",
  },
  {
    href: "/corporate-yacht-dinner-istanbul",
    title: "Corporate Yacht Dinner",
    description:
      "Use this when the event is clearly dinner-led and should stay closer to an internal or meal-first format.",
  },
  {
    href: "/team-building-yacht-istanbul",
    title: "Team Building Yacht",
    description:
      "Use this when the main goal is team connection or activity design rather than client-facing hospitality.",
  },
  {
    href: "/contact",
    title: "Ask About Hosting Fit",
    description:
      "Use contact when the date, guest count, and hosting brief are already clear and you want the right Bosphorus format fast.",
  },
];

const flowSteps = [
  {
    title: "Start with the guest experience goal",
    description:
      "The best client-hosting quotes begin with what the company wants the guests to feel, notice, or remember, then move to yacht and service fit.",
  },
  {
    title: "Decide how formal the hosting should feel",
    description:
      "An executive dinner, a softer private sailing, and an investor-focused evening do not need the same meal, timing, or circulation.",
  },
  {
    title: "Match hospitality level to the guest list",
    description:
      "Catering, drinks, transfer planning, and marina handling should match both the relationship value and the guest profile.",
  },
  {
    title: "Confirm invoice and operational handoff",
    description:
      "The written proposal should lock the commercial path, marina flow, and guest support only after the hosting format is fully clear.",
  },
];

export default function ClientHostingYachtIstanbulPage() {
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
            <span className="text-[var(--heading)]">Client Hosting Yacht Istanbul</span>
          </nav>

          <section className="mb-12 grid items-start gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="mb-4 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
                Narrow commercial support page
              </p>
              <h1 className="mb-4 text-3xl font-bold leading-tight text-[var(--heading)] md:text-5xl">
                Client Hosting Yacht Istanbul
              </h1>
              <p className="mb-6 max-w-3xl text-lg leading-relaxed text-[var(--text-muted)]">
                Use this page when the company brief is already leaning toward private client hosting
                on the Bosphorus. The protected owner page is still{" "}
                <Link href="/corporate-events" className="text-[var(--brand-primary)] hover:underline">
                  Corporate Events
                </Link>
                ; this support page exists for guest-hospitality-led company requests where impression,
                privacy, and host control matter more than a broader event build.
              </p>
              <div className="mb-6 rounded-2xl border border-[var(--brand-primary)]/10 bg-white p-4">
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
                  Hosting-first planning
                </p>
                <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                  MerrySails works under Merry Tourism, a TURSAB-backed Istanbul operator since
                  2001. Client-hosting quotes work best when they start from guest experience,
                  then move into yacht, service, and marina logic.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/corporate-events"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--brand-primary)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--brand-primary-hover)]"
                >
                  Open corporate owner page <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl border border-[var(--brand-primary)] px-6 py-3 font-semibold text-[var(--brand-primary)] transition-colors hover:bg-[var(--brand-primary)] hover:text-white"
                >
                  Ask about hosting fit
                </Link>
              </div>
            </div>

            <aside className="rounded-2xl border border-white bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-[var(--heading)]">
                What helps us shape the right hosting format
              </h2>
              <ul className="space-y-3 text-sm text-[var(--text-muted)]">
                {[
                  "Preferred date and approximate guest count",
                  "Whether the event is executive, partner-facing, or investor-oriented",
                  "If dinner belongs in the plan or a lighter hosted sail is enough",
                  "Whether transfers, invoice details, or a smoother marina flow are needed",
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
              When this client-hosting page is the right fit
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
              Common Bosphorus client-hosting formats
            </h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {formatCards.map((item) => (
                <div key={item.title} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <h3 className="mb-2 text-base font-semibold text-[var(--heading)]">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12 rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">
              How the planning flow usually works
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
            <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">Compare with related corporate booking paths</h2>
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
            <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">Client-hosting yacht FAQs</h2>
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
                  Client-hosting brief
                </p>
                <h2 className="mb-3 text-3xl font-bold">Tell us the guest experience you want to deliver</h2>
                <p className="max-w-2xl text-sm leading-relaxed text-white/80">
                  Send the date, guest count, and whether the event should feel executive, partner-focused,
                  or more relaxed. We&apos;ll map that to the right Bosphorus hosting format.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-[var(--heading)] transition-colors hover:bg-white/90"
                >
                  Ask for a hosting quote
                </Link>
                <TrackedContactLink
                  href={WHATSAPP_URL}
                  kind="whatsapp"
                  label="client_hosting_yacht_support_whatsapp"
                  location="client_hosting_yacht_support_page"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
                >
                  WhatsApp us
                </TrackedContactLink>
                <TrackedContactLink
                  href={`tel:${PHONE_DISPLAY.replace(/\s+/g, "")}`}
                  kind="phone"
                  label="client_hosting_yacht_support_phone"
                  location="client_hosting_yacht_support_page"
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
