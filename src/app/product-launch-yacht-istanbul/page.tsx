import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TrackedContactLink from "@/components/analytics/TrackedContactLink";
import { PHONE_DISPLAY, SITE_URL, WHATSAPP_URL } from "@/lib/constants";
import { buildHreflang } from "@/lib/hreflang";

export const revalidate = 3600;

const canonicalUrl = `${SITE_URL}/product-launch-yacht-istanbul`;

export const metadata: Metadata = {
  title: "Product Launch Yacht Istanbul 2026 | Private Bosphorus Launch Event",
  description:
    "Book a product launch yacht in Istanbul for private Bosphorus reveal events with guest flow, branding, and launch timing planned before booking.",
  alternates: {
    canonical: canonicalUrl,
    languages: buildHreflang("/product-launch-yacht-istanbul"),
  },
  openGraph: {
    title: "Product Launch Yacht Istanbul 2026 | Private Bosphorus Launch Event",
    description:
      "Use this page when the company brief is specifically a product launch or showcase on a private Bosphorus yacht rather than a broader corporate dinner or hosting format.",
    url: canonicalUrl,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Product launch yacht Istanbul — MerrySails",
      },
    ],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Product Launch Yacht Istanbul",
  description:
    "Commercial support page for private Bosphorus product-launch yacht events in Istanbul when reveal timing, guest flow, and launch-night coordination matter most.",
  provider: {
    "@id": `${SITE_URL}/#organization`,
  },
  areaServed: {
    "@type": "City",
    name: "Istanbul",
  },
  serviceType: "Product Launch Yacht Event",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Product Launch Yacht Istanbul", item: canonicalUrl },
  ],
};

const faqItems = [
  {
    q: "Is this the main owner page for all company events?",
    a: "No. The main owner page is Corporate Events. This page is a narrower support URL for companies whose brief is specifically a launch, showcase, or reveal-led Bosphorus event.",
  },
  {
    q: "When should I use this page instead of client hosting or corporate yacht dinner?",
    a: "Use this page when the key challenge is launch timing, guest flow, staging, or a reveal moment. Use client hosting when relationship-led hospitality comes first, and use corporate yacht dinner when the meal is the core format.",
  },
  {
    q: "What kinds of launches work well on a yacht?",
    a: "Small product showcases, partner previews, executive reveal nights, invite-only hospitality launches, and media-facing evenings can all work well when the flow fits the vessel and marina setup.",
  },
  {
    q: "Does every launch need a big technical build?",
    a: "No. Some launches only need a polished hospitality format with one reveal moment, while others need branding, screens, sound, guest transfers, or a tighter onboard circulation plan.",
  },
  {
    q: "What helps the team quote the right launch format?",
    a: "The launch goal, target guest list, event timing, whether dinner belongs in the flow, branding needs, transfer planning, and invoice details all help shape the right yacht and run-of-show.",
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
    title: "The event revolves around a reveal moment",
    description:
      "Use this page when timing, staging, or a specific guest-facing moment matters more than a general company dinner or charter brief.",
  },
  {
    title: "Guest circulation and attention need control",
    description:
      "This page fits companies that want a premium setting with tighter movement, arrival, and host control than a generic venue usually allows.",
  },
  {
    title: "The launch brief is narrower than a broad corporate event build",
    description:
      "It works when the company does not need a catch-all event page, but does need a cleaner answer for a launch-led Bosphorus format.",
  },
];

const formatCards = [
  {
    title: "Invite-only reveal night",
    description: "Best for smaller guest lists where the reveal timing matters more than scale.",
  },
  {
    title: "Partner or media showcase",
    description: "Best when the product needs a premium context, hospitality, and a controlled story arc on board.",
  },
  {
    title: "Dinner plus launch sequence",
    description: "Best when the company wants both a seated hospitality format and a clear launch moment during the evening.",
  },
  {
    title: "Soft launch yacht reception",
    description: "Best when the night should feel polished and private without becoming a large technical production.",
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
    href: "/client-hosting-yacht-istanbul",
    title: "Client Hosting Yacht",
    description:
      "Use this when guest hospitality and relationship-led hosting matter more than a product reveal or launch sequence.",
  },
  {
    href: "/corporate-yacht-dinner-istanbul",
    title: "Corporate Yacht Dinner",
    description:
      "Use this when the event is clearly dinner-led and the meal comes before launch staging or showcase timing.",
  },
  {
    href: "/contact",
    title: "Ask About Launch Fit",
    description:
      "Use contact when the date, guest count, and launch brief are already clear and you want the right Bosphorus format fast.",
  },
];

const flowSteps = [
  {
    title: "Start with the launch moment first",
    description:
      "The cleanest launch quotes begin with what must happen on board and when, then move to yacht, service, and marina fit.",
  },
  {
    title: "Separate hospitality from reveal mechanics",
    description:
      "A dinner-led company night, a guest-hosting brief, and a launch-led yacht event do not need the same circulation or pacing.",
  },
  {
    title: "Match branding and logistics to the guest list",
    description:
      "Branding, sound, catering, transfer planning, and marina access should match both the guest profile and the importance of the launch moment.",
  },
  {
    title: "Confirm invoice and operational handoff",
    description:
      "The written proposal should lock the commercial path, boarding flow, and event support only after the launch format is fully clear.",
  },
];

export default function ProductLaunchYachtIstanbulPage() {
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
            <span className="text-[var(--heading)]">Product Launch Yacht Istanbul</span>
          </nav>

          <section className="mb-12 grid items-start gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="mb-4 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
                Narrow commercial support page
              </p>
              <h1 className="mb-4 text-3xl font-bold leading-tight text-[var(--heading)] md:text-5xl">
                Product Launch Yacht Istanbul
              </h1>
              <p className="mb-6 max-w-3xl text-lg leading-relaxed text-[var(--text-muted)]">
                Use this page when the company brief is already leaning toward a product launch,
                showcase, or reveal on a private Bosphorus yacht. The protected owner page is still{" "}
                <Link href="/corporate-events" className="text-[var(--brand-primary)] hover:underline">
                  Corporate Events
                </Link>
                ; this support page exists for launch-led company requests where staging, timing,
                and guest flow matter more than a broader event build.
              </p>
              <div className="mb-6 rounded-2xl border border-[var(--brand-primary)]/10 bg-white p-4">
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
                  Launch-first planning
                </p>
                <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                  MerrySails works under Merry Tourism, a TURSAB-backed Istanbul operator since
                  2001. Launch quotes work best when they start from the reveal sequence, then move
                  into yacht, service, and marina logic.
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
                  Ask about launch fit
                </Link>
              </div>
            </div>

            <aside className="rounded-2xl border border-white bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-[var(--heading)]">
                What helps us shape the right launch format
              </h2>
              <ul className="space-y-3 text-sm text-[var(--text-muted)]">
                {[
                  "Preferred date and approximate guest count",
                  "Whether the launch is partner-facing, media-facing, or internal",
                  "Whether dinner belongs in the flow or the reveal should stay lighter",
                  "Branding, sound, screen, transfer, or boarding requirements",
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
                  Send the date, guest count, and launch goal through{" "}
                  <Link href="/contact" className="text-[var(--brand-primary)] hover:underline">
                    contact
                  </Link>{" "}
                  or use{" "}
                  <TrackedContactLink
                    href={WHATSAPP_URL}
                    kind="whatsapp"
                    label={PHONE_DISPLAY}
                    location="product_launch_yacht_page"
                    className="text-[var(--brand-primary)] hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </TrackedContactLink>{" "}
                  if the event window is close.
                </p>
              </div>
            </aside>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">
              When this launch page is the better fit
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {fitCards.map((card) => (
                <div key={card.title} className="rounded-2xl border border-white bg-white p-5 shadow-sm">
                  <h3 className="mb-2 text-lg font-semibold text-[var(--heading)]">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{card.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12 rounded-2xl border border-white bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-2xl font-bold text-[var(--heading)]">
              Launch formats that usually work well on a yacht
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {formatCards.map((card) => (
                <div key={card.title} className="rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] p-5">
                  <h3 className="mb-2 text-lg font-semibold text-[var(--heading)]">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{card.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12 rounded-2xl border border-white bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-2xl font-bold text-[var(--heading)]">
              How the launch-planning flow usually works
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {flowSteps.map((step) => (
                <div key={step.title} className="rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] p-5">
                  <h3 className="mb-2 text-lg font-semibold text-[var(--heading)]">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{step.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">
              Compare this page with the closest next routes
            </h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {comparePages.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl border border-white bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[var(--brand-primary)]/20"
                >
                  <h3 className="mb-2 text-lg font-semibold text-[var(--heading)]">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{item.description}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-[var(--line)] bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-2xl font-bold text-[var(--heading)]">
              Product Launch Yacht Istanbul FAQ
            </h2>
            <div className="space-y-4">
              {faqItems.map((item) => (
                <div key={item.q} className="rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] p-5">
                  <h3 className="mb-2 text-lg font-semibold text-[var(--heading)]">{item.q}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{item.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
