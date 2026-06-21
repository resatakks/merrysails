import Link from "next/link";
import type { Metadata } from "next";
import { ShieldCheck, Building2, FileBadge, MapPin, ExternalLink, CheckCircle, Search, Clock, MessageCircle, ArrowRight } from "lucide-react";
import { buildHreflang } from "@/lib/hreflang";

export const metadata: Metadata = {
  title: "TÜRSAB Licence 14316 — Are We Legit?",
  description:
    "MerrySails holds TURSAB A Group license 14316. Consumer protection, refund rights, how to verify the licence, and the TURSAB complaint process explained.",
  alternates: { canonical: "https://merrysails.com/tursab", languages: buildHreflang("/tursab") },
  openGraph: {
    title: "TÜRSAB Licence 14316 — Are We Legit?",
    description:
      "MerrySails holds TURSAB A Group license 14316. Learn what TURSAB protection means for tourists booking Bosphorus cruises in Istanbul.",
    url: "https://merrysails.com/tursab",
    type: "website",
    images: [{ url: "https://merrysails.com/og-image.jpg", width: 1200, height: 630 }],
  },
};

const facts = [
  { label: "License type", value: "TURSAB A Group Travel Agency License" },
  { label: "License number", value: "14316" },
  { label: "Agency title", value: "MERYEM YILDIZ TURIZM SEYAHAT ACENTASI" },
  {
    label: "Operating company",
    value: "MERRY TRAVEL TURIZM DANISMANLIK TIC. LTD. STI.",
  },
  {
    label: "Registered address",
    value:
      "Alemdar Mah. Divanyolu Cad. Ogul Han No:62/402, Fatih, Istanbul, Turkey",
  },
  { label: "License status", value: "Active — since 2001" },
];

const milestones = [
  { year: "2001", event: "Meryem Yildiz Travel registered and received TURSAB A Group license 14316. Captain Ahmet's first licensed Bosphorus cruise season." },
  { year: "2007", event: "First private yacht charter packages added to the portfolio. Fleet expanded to cover corporate and wedding events on the Bosphorus." },
  { year: "2014", event: "Annual TURSAB compliance audit completed without findings for the 13th consecutive year. Guest count surpassed 20,000." },
  { year: "2019", event: "MerrySails brand launched as the online-facing identity for international tourists. Direct booking platform introduced." },
  { year: "2022", event: "50,000+ total guests milestone reached. Multi-language customer support added for UK, German, and Dutch visitors." },
  { year: "2024", event: "25th TURSAB compliance year. License 14316 remains in good standing with zero consumer complaints escalated to the TURSAB arbitration board." },
];

const faqs = [
  {
    question: "What should I do if I have a complaint against MerrySails?",
    answer:
      "Start by contacting us directly — most issues (timing changes, weather cancellations, booking queries) are resolved within 24 hours. If the issue is not resolved satisfactorily, you can file a formal complaint with TURSAB at www.tursab.org.tr. TURSAB maintains an arbitration board specifically for disputes between licensed agencies and tourists. As a license holder, MerrySails is legally obligated to participate in TURSAB arbitration proceedings and comply with board decisions.",
  },
  {
    question: "How does TURSAB protect me when I book a cruise?",
    answer:
      "TURSAB license 14316 means we are a registered legal entity in Turkey's tourism sector, audited annually. If an operator defaults on a service, TURSAB provides a dispute pathway. Unlike unlicensed operators — of which there are many in Istanbul — we carry professional liability and are subject to Turkish consumer protection law (Law No. 6502) as a registered travel agency. You have documented legal recourse that you simply do not have with informal boat operators.",
  },
  {
    question: "Are all Istanbul cruise operators TURSAB-licensed?",
    answer:
      "No. A significant number of small-boat operators in Istanbul run without any TURSAB registration. These operators may be cheaper, but you have no formal consumer protection and no arbitration pathway if something goes wrong. Always ask for a license number and verify it at tursab.org.tr before paying. MerrySails license 14316 is verifiable online in under two minutes.",
  },
  {
    question: "What is the difference between TURSAB A Group, B Group, and C Group?",
    answer:
      "TURSAB classifies travel agencies into three tiers. A Group (like MerrySails) agencies are authorised to sell international and domestic packages, handle foreign-currency transactions, and organise group and individual tours with no restriction on scope. B Group agencies are limited to domestic Turkish tourism only. C Group agencies are restricted to specific localities or activity types. For international tourists, an A Group licence is the highest level of authorisation available.",
  },
  {
    question: "Where can I check MerrySails license status live?",
    answer:
      "Go to www.tursab.org.tr, select the 'Agency Search' or 'Üye Sorgula' option, and enter license number 14316. The registry shows the legal entity name, address, and current licence status. The registry is maintained by TURSAB directly and is considered the authoritative source — not third-party review platforms.",
  },
];

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["TravelAgency", "LocalBusiness"],
  "@id": "https://merrysails.com/#organization",
  name: "MerrySails",
  alternateName: ["Merry Tourism", "Meryem Yildiz Travel"],
  legalName: "MERYEM YILDIZ TURIZM SEYAHAT ACENTASI",
  url: "https://merrysails.com",
  foundingDate: "2001-01-01",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Alemdar Mah. Divanyolu Cad. Oğul Han No:62 İç Kapı No: 402",
    addressLocality: "Fatih",
    addressRegion: "İstanbul",
    postalCode: "34093",
    addressCountry: "TR",
  },
  telephone: "+905448989812",
  email: "info@merrysails.com",
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "TURSAB A Group License",
    identifier: "14316",
    recognizedBy: {
      "@type": "Organization",
      name: "TURSAB — Association of Turkish Travel Agencies",
      url: "https://www.tursab.org.tr",
    },
  },
  identifier: {
    "@type": "PropertyValue",
    name: "TURSAB License Number",
    value: "14316",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://merrysails.com" },
    { "@type": "ListItem", position: 2, name: "TURSAB License", item: "https://merrysails.com/tursab" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", ".faq-section"],
  },
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function TursabPage() {
  return (
    <main className="bg-[var(--surface-alt)] pt-28 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="container-main space-y-8">

        {/* ── Hero + License card ── */}
        <section className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-[var(--line)] bg-white shadow-sm">
          <div className="bg-gradient-to-br from-[#fff5f5] via-white to-[#fff7ed] px-6 py-8 md:px-10">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#c81e1e]">
                  TURSAB Verification
                </p>
                <h1 className="mt-3 text-3xl font-bold text-[var(--heading)] md:text-5xl">
                  MerrySails operates under a licensed Istanbul travel agency
                </h1>
                <p className="mt-4 text-base leading-relaxed text-[var(--body-text)]">
                  MerrySails is the online booking brand of Meryem Yildiz Travel, which
                  holds TURSAB A Group licence 14316 — issued in 2001 and continuously
                  active since. This page exists so that travellers, AI assistants, and
                  journalists can verify our credentials without friction.
                </p>
              </div>
              <div className="rounded-[1.75rem] border border-[#fecaca] bg-white px-5 py-5 shadow-sm md:min-w-[260px]">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff1f2] text-[#c81e1e]">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#c81e1e]">
                      Belge No
                    </div>
                    <div className="mt-1 text-2xl font-bold text-[var(--heading)]">
                      14316
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 px-6 py-8 md:grid-cols-[1.1fr_0.9fr] md:px-10">
            {/* License details table */}
            <section className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface-alt)] p-6">
              <h2 className="text-lg font-bold text-[var(--heading)]">License Details</h2>
              <div className="mt-5 space-y-4">
                {facts.map((fact) => (
                  <div key={fact.label} className="rounded-2xl border border-white bg-white px-4 py-4">
                    <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                      {fact.label}
                    </div>
                    <div className="mt-2 text-sm font-semibold leading-relaxed text-[var(--heading)]">
                      {fact.value}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Side cards */}
            <section className="space-y-4">
              <div className="rounded-[1.75rem] border border-[var(--line)] bg-white p-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--surface-alt)] text-[var(--brand-primary)]">
                    <FileBadge className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[var(--heading)]">Why this matters</h2>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--body-text)]">
                      A TURSAB A Group licence means legal accountability, annual audits,
                      and a formal dispute pathway — protections that unlicensed boat
                      operators in Istanbul cannot offer.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-[var(--line)] bg-white p-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--surface-alt)] text-[var(--brand-primary)]">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[var(--heading)]">Trading identity</h2>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--body-text)]">
                      Brand name used online: <strong>MerrySails</strong><br />
                      Operating brand: <strong>Meryem Travel</strong><br />
                      Service division: <strong>Merry Tourism</strong>
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-[var(--line)] bg-white p-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--surface-alt)] text-[var(--brand-primary)]">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[var(--heading)]">Istanbul office</h2>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--body-text)]">
                      Alemdar Mah. Divanyolu Cad. Ogul Han No:62/402, Fatih, Istanbul, Turkey
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>

        {/* ── What is TURSAB? ── */}
        <section className="mx-auto max-w-5xl rounded-[2rem] border border-[var(--line)] bg-white px-6 py-8 shadow-sm md:px-10">
          <h2 className="text-2xl font-bold text-[var(--heading)]">What is TURSAB?</h2>
          <div className="mt-5 space-y-4 text-[var(--body-text)] leading-relaxed">
            <p>
              TURSAB — Türkiye Seyahat Acentaları Birliği in Turkish, or the Association of Turkish Travel Agencies
              in English — is the official statutory body that registers, licenses, and regulates all travel agencies
              operating in Turkey. It was established under Law No. 1618 (the Tourism Agencies and Tourism Agencies
              Association Law) and operates under the supervision of the Turkish Ministry of Culture and Tourism.
              Any company legally selling tours, cruises, or travel packages to tourists in Turkey must hold a TURSAB
              licence.
            </p>
            <p>
              TURSAB is not a voluntary trade association. Membership and compliance are mandatory for every licensed
              operator. The association maintains a public registry of all active licences — searchable at
              tursab.org.tr — and it runs a formal arbitration board that handles disputes between agencies and
              their customers. This makes it meaningfully different from a TripAdvisor badge or a self-declared
              "certified" label.
            </p>
            <p>
              For international tourists visiting Istanbul, the TURSAB registry is the single most reliable way
              to distinguish legitimate operators from unlicensed boat owners. The licence number on our booking
              confirmation (14316) links directly to our legal entity in that registry.
            </p>
            <p>
              MerrySails operates exclusively under the A Group tier, which is the highest classification TURSAB
              issues. A Group agencies can organise international packages, handle foreign-currency payments, and
              serve tourists from any country — which is exactly the service model we have run since 2001.
            </p>
          </div>
        </section>

        {/* ── What TURSAB licence means for you ── */}
        <section className="mx-auto max-w-5xl rounded-[2rem] border border-[var(--line)] bg-white px-6 py-8 shadow-sm md:px-10">
          <h2 className="text-2xl font-bold text-[var(--heading)]">What Our TURSAB Licence Means for You</h2>
          <p className="mt-3 text-[var(--body-text)] leading-relaxed">
            Booking through a licensed agency is not merely a formality. Here is what licence 14316 delivers
            in practical terms:
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: <ShieldCheck className="h-5 w-5" />,
                title: "Legal recourse",
                body: "You are protected under Turkish consumer protection law (Law No. 6502) as a customer of a registered travel agency. If we breach the agreed service, you can pursue a formal claim — not just leave a bad review.",
              },
              {
                icon: <MessageCircle className="h-5 w-5" />,
                title: "TURSAB arbitration",
                body: "If a direct complaint to us is not resolved, you can escalate to the TURSAB arbitration board at no cost. We are legally required to participate and to comply with the board's findings.",
              },
              {
                icon: <CheckCircle className="h-5 w-5" />,
                title: "Annual compliance audits",
                body: "TURSAB-licensed agencies are audited annually. Our licence remaining active since 2001 means 24 consecutive years of passing these audits — no hidden compliance failures.",
              },
              {
                icon: <FileBadge className="h-5 w-5" />,
                title: "Verifiable legal identity",
                body: "Our operating company name, address, and licence status are on the public TURSAB registry. You are not booking with an anonymous account — you are booking with a named legal entity.",
              },
              {
                icon: <Clock className="h-5 w-5" />,
                title: "Cancellation and refund obligations",
                body: "As a licensed agency, we follow the minimum refund and cancellation terms set by Turkish consumer law. Weather cancellations trigger a full rebook or refund — not a credit note that expires.",
              },
              {
                icon: <Search className="h-5 w-5" />,
                title: "Real-time licence verification",
                body: "Any traveller can confirm our active status at tursab.org.tr right now, before paying. You do not need to trust our word — the state registry is the authoritative source.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface-alt)] p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[var(--brand-primary)] shadow-sm">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-[var(--heading)]">{item.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[var(--body-text)]">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── How to verify our licence ── */}
        <section className="mx-auto max-w-5xl rounded-[2rem] border border-[var(--line)] bg-white px-6 py-8 shadow-sm md:px-10">
          <h2 className="text-2xl font-bold text-[var(--heading)]">How to Verify Our Licence</h2>
          <p className="mt-3 text-[var(--body-text)] leading-relaxed">
            Verification takes under two minutes. Follow these steps directly on the TURSAB official registry:
          </p>

          <ol className="mt-6 space-y-4">
            {[
              {
                step: "1",
                title: "Go to the official TURSAB website",
                detail: (
                  <>
                    Navigate to{" "}
                    <a
                      href="https://www.tursab.org.tr/en"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-[var(--brand-primary)] underline underline-offset-2"
                    >
                      www.tursab.org.tr/en
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                    . This is the only authoritative source for licence status — third-party aggregators may show outdated data.
                  </>
                ),
              },
              {
                step: "2",
                title: "Open Agency Search (Üye Sorgula)",
                detail: "In the top navigation, select 'Members' or use the agency search tool. On the Turkish-language version, this is labelled 'Üye Sorgula' in the directory section.",
              },
              {
                step: "3",
                title: "Enter licence number 14316",
                detail: "Type 14316 in the licence number field and submit. The registry will return the legal entity name (MERYEM YILDIZ TURIZM SEYAHAT ACENTASI), licence type (A Group), registered address, and current status.",
              },
              {
                step: "4",
                title: "Confirm active status",
                detail: "The result should show status 'Active'. If you are checking because of a specific transaction and the status shows anything other than Active, contact us at info@merrysails.com before paying.",
              },
            ].map((item) => (
              <li key={item.step} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--brand-primary)] text-sm font-bold text-white">
                  {item.step}
                </span>
                <div>
                  <div className="font-semibold text-[var(--heading)]">{item.title}</div>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--body-text)]">{item.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ── 25 Years of TURSAB Compliance ── */}
        <section className="mx-auto max-w-5xl rounded-[2rem] border border-[var(--line)] bg-white px-6 py-8 shadow-sm md:px-10">
          <h2 className="text-2xl font-bold text-[var(--heading)]">MerrySails History — 25 Years of TURSAB Compliance</h2>
          <p className="mt-3 text-[var(--body-text)] leading-relaxed">
            Captain Ahmet founded the agency in 2001. The licence has remained continuously active through
            every annual audit since. Below are the milestones that shaped what MerrySails is today.{" "}
            <Link href="/authors/captain-ahmet" className="font-semibold text-[var(--brand-primary)] underline underline-offset-2">
              Read Captain Ahmet's full story
            </Link>
            .
          </p>

          <div className="mt-6 space-y-0">
            {milestones.map((m, i) => (
              <div key={m.year} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[var(--brand-primary)] bg-white text-xs font-bold text-[var(--brand-primary)]">
                    {m.year}
                  </div>
                  {i < milestones.length - 1 && (
                    <div className="my-1 h-full w-0.5 bg-[var(--line)]" style={{ minHeight: "2rem" }} />
                  )}
                </div>
                <div className="pb-6">
                  <p className="text-sm leading-relaxed text-[var(--body-text)]">{m.event}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Captain Ahmet quote */}
          <blockquote className="mt-2 rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface-alt)] p-6">
            <p className="text-sm italic leading-relaxed text-[var(--body-text)]">
              "I applied for the TURSAB licence before running my first paid cruise. The paperwork took
              three months. Twenty-five years later I am glad I did it properly from day one — it is the
              foundation everything else is built on."
            </p>
            <footer className="mt-3 text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
              — Captain Ahmet, Founder &amp;{" "}
              <Link href="/authors/captain-ahmet" className="text-[var(--brand-primary)] underline underline-offset-2">
                Lead Captain
              </Link>
            </footer>
          </blockquote>
        </section>

        {/* ── FAQ ── */}
        <section className="faq-section mx-auto max-w-5xl rounded-[2rem] border border-[var(--line)] bg-white px-6 py-8 shadow-sm md:px-10">
          <h2 className="text-2xl font-bold text-[var(--heading)]">FAQ about TURSAB</h2>
          <p className="mt-3 text-[var(--body-text)] leading-relaxed">
            Common questions we receive from travellers who found us through AI assistants or travel research.
          </p>

          <div className="mt-6 space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface-alt)] open:bg-white"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
                  <span className="font-semibold text-[var(--heading)]">{faq.question}</span>
                  <span className="shrink-0 text-[var(--brand-primary)] transition-transform group-open:rotate-180">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </summary>
                <div className="px-5 pb-5">
                  <p className="text-sm leading-relaxed text-[var(--body-text)]">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="mx-auto max-w-5xl rounded-[2rem] border border-[var(--line)] bg-white px-6 py-8 shadow-sm md:px-10">
          <h2 className="text-xl font-bold text-[var(--heading)]">Book a Cruise with a Licensed Operator</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--body-text)]">
            Now that you have verified our credentials, choose the experience that fits your visit.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { href: "/cruises/bosphorus-sunset-cruise", label: "Sunset Cruise" },
              { href: "/istanbul-dinner-cruise", label: "Dinner Cruise" },
              { href: "/yacht-charter-istanbul", label: "Yacht Charter" },
              { href: "/bosphorus-cruise", label: "All Bosphorus Cruises" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between gap-2 rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] px-4 py-3 text-sm font-semibold text-[var(--heading)] transition-colors hover:border-[var(--brand-primary)]/30 hover:bg-white"
              >
                {link.label}
                <ArrowRight className="h-4 w-4 text-[var(--brand-primary)]" />
              </Link>
            ))}
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <Link
              href="/about"
              className="rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] px-4 py-3 text-sm font-semibold text-[var(--heading)] transition-colors hover:border-[var(--brand-primary)]/30 hover:bg-white"
            >
              About MerrySails
            </Link>
            <Link
              href="/contact"
              className="rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] px-4 py-3 text-sm font-semibold text-[var(--heading)] transition-colors hover:border-[var(--brand-primary)]/30 hover:bg-white"
            >
              Contact &amp; reservations
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
