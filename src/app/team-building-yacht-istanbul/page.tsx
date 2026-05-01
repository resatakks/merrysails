import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TrackedContactLink from "@/components/analytics/TrackedContactLink";
import { PHONE_DISPLAY, SITE_URL, WHATSAPP_URL } from "@/lib/constants";
import { buildHreflang } from "@/lib/hreflang";

export const revalidate = 3600;

const canonicalUrl = `${SITE_URL}/team-building-yacht-istanbul`;

export const metadata: Metadata = {
  title: "Team Building Yacht Istanbul 2026 | Corporate Bosphorus Event Support",
  description:
    "Team building yacht in Istanbul for companies that want a private Bosphorus format focused on team connection, guest flow, and a structured group brief before booking.",
  alternates: {
    canonical: canonicalUrl,
    languages: buildHreflang("/team-building-yacht-istanbul"),
  },
  openGraph: {
    title: "Team Building Yacht Istanbul 2026 | Corporate Bosphorus Event Support",
    description:
      "Use this page when the company brief is specifically team building on a yacht rather than a broader corporate dinner or launch format.",
    url: canonicalUrl,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Team building yacht Istanbul — MerrySails",
      },
    ],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Team Building Yacht Istanbul",
  description:
    "Commercial support page for team building yacht events in Istanbul when the company brief is focused on group connection, activity format, and Bosphorus event flow.",
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
  serviceType: "Corporate Team Building Yacht Event",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Team Building Yacht Istanbul", item: canonicalUrl },
  ],
};

const faqItems = [
  {
    q: "Is this the main owner page for all company events?",
    a: "No. The main owner page is Corporate Events. This page is a narrower support URL for companies whose brief is specifically team building on a private Bosphorus yacht.",
  },
  {
    q: "When should I use this page instead of corporate yacht dinner?",
    a: "Use this page when the goal is team connection, activity design, and group flow. Use the corporate dinner page when the event is mainly meal-led and hospitality-focused.",
  },
  {
    q: "What types of team building formats work on a yacht?",
    a: "Structured networking, workshop-led sailings, light competition formats, and relaxed team evenings all work well when the run-of-show matches the group's real objective.",
  },
  {
    q: "Does the event always need a big vessel or technical setup?",
    a: "No. Some team-building briefs are simple private cruises with light facilitation, while others need a larger vessel, stronger circulation, or presentation support.",
  },
  {
    q: "What helps the team quote the right team-building format?",
    a: "The date, group size, event objective, hierarchy mix, whether dinner belongs in the plan, and any transport or invoice needs help shape the right yacht and activity flow.",
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
    title: "The event goal is team connection",
    description:
      "Use this page when the real outcome is bonding, alignment, or shared experience rather than a formal client-facing hospitality brief.",
  },
  {
    title: "Activity design matters",
    description:
      "This page fits companies that want a format matched to the group's energy, hierarchy, and internal objective instead of a generic dinner setup.",
  },
  {
    title: "A private Bosphorus setting helps the group",
    description:
      "It works well when changing the environment itself is part of how the team gets more open, connected, or celebratory.",
  },
];

const formatCards = [
  {
    title: "Relaxed networking cruise",
    description: "Best for cross-team mixing, onboarding groups, and informal connection in a private setting.",
  },
  {
    title: "Workshop-led yacht session",
    description: "Best when the cruise supports a short strategy or alignment session rather than replacing it.",
  },
  {
    title: "Light competition format",
    description: "Best when the group wants more energy, but the activity still needs to stay company-safe and easy to manage.",
  },
  {
    title: "Dinner plus team evening",
    description: "Best when the event needs both interaction time and a meal, without becoming a formal corporate hospitality night.",
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
      "Use this when the event is clearly dinner-led and the hospitality format matters more than team-building design.",
  },
  {
    href: "/yacht-charter-istanbul",
    title: "Yacht Charter Istanbul",
    description:
      "Use this when the main decision is still the private yacht package and the company event structure is not fixed yet.",
  },
  {
    href: "/contact",
    title: "Ask About Team-Building Fit",
    description:
      "Use contact when the date, headcount, and team objective are already clear and you want the right Bosphorus format fast.",
  },
];

const flowSteps = [
  {
    title: "Start with the team objective, not the boat alone",
    description:
      "The most useful team-building quotes begin with what the company wants the group to feel or achieve, then move to vessel and service fit.",
  },
  {
    title: "Match energy level and hierarchy mix",
    description:
      "A senior leadership group, a mixed onboarding cohort, and a large cross-functional team do not need the same run-of-show.",
  },
  {
    title: "Decide whether dinner belongs in the brief",
    description:
      "Some team-building nights work best as lighter activity-led formats, while others need dinner or stronger hosting built around the team flow.",
  },
  {
    title: "Confirm transfer, invoice, and boarding flow",
    description:
      "The written proposal should lock the guest logistics, marina, and commercial details only after the group format is clear.",
  },
];

export default function TeamBuildingYachtIstanbulPage() {
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
            <span className="text-[var(--heading)]">Team Building Yacht Istanbul</span>
          </nav>

          <section className="mb-12 grid items-start gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="mb-4 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
                Narrow commercial support page
              </p>
              <h1 className="mb-4 text-3xl font-bold leading-tight text-[var(--heading)] md:text-5xl">
                Team Building Yacht Istanbul
              </h1>
              <p className="mb-6 max-w-3xl text-lg leading-relaxed text-[var(--text-muted)]">
                Use this page when the company brief is already leaning toward team building on a private
                Bosphorus yacht. The protected owner page is still{" "}
                <Link href="/corporate-events" className="text-[var(--brand-primary)] hover:underline">
                  Corporate Events
                </Link>
                ; this support page exists for teams that need a clearer answer on format, group flow,
                and how a private yacht can support connection rather than only hospitality.
              </p>
              <div className="mb-6 rounded-2xl border border-[var(--brand-primary)]/10 bg-white p-4">
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
                  Team objective first
                </p>
                <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                  MerrySails works under Merry Tourism, a TURSAB-backed Istanbul operator since
                  2001. Team-building quotes work best when they start from the group objective, then
                  move into yacht, catering, and boarding logic.
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
                  Ask about team-building fit
                </Link>
              </div>
            </div>

            <aside className="rounded-2xl border border-white bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-[var(--heading)]">
                What helps us shape the right team-building format
              </h2>
              <ul className="space-y-3 text-sm text-[var(--text-muted)]">
                {[
                  "Preferred date and approximate guest count",
                  "Whether the goal is bonding, alignment, celebration, or energy",
                  "If dinner, presentation, or facilitator support belongs in the plan",
                  "Whether invoice, transfers, or a smoother marina flow are needed",
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
              When this team-building page is the right fit
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
              Common Bosphorus team-building formats
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
            <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">Team-building yacht FAQs</h2>
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
                  Company team-building brief
                </p>
                <h2 className="mb-3 text-3xl font-bold">Tell us the team goal and we&apos;ll shape the right yacht format</h2>
                <p className="max-w-2xl text-sm leading-relaxed text-white/80">
                  Send the date, headcount, and whether the event should energize, align, or simply
                  connect the group. We&apos;ll map that to the right Bosphorus team-building flow.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-[var(--heading)] transition-colors hover:bg-white/90"
                >
                  Ask for a team-building quote
                </Link>
                <TrackedContactLink
                  href={WHATSAPP_URL}
                  kind="whatsapp"
                  label="team_building_yacht_support_whatsapp"
                  location="team_building_yacht_support_page"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
                >
                  WhatsApp us
                </TrackedContactLink>
                <TrackedContactLink
                  href={`tel:${PHONE_DISPLAY.replace(/\s+/g, "")}`}
                  kind="phone"
                  label="team_building_yacht_support_phone"
                  location="team_building_yacht_support_page"
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
