import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Anchor, Award, Calendar, MapPin, Users, ArrowRight, BookOpen } from "lucide-react";
import { SITE_URL, TURSAB_LICENSE_NUMBER, WHATSAPP_URL } from "@/lib/constants";
import { buildHreflang } from "@/lib/hreflang";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Captain Ahmet Yıldız — MerrySails Founder",
  description:
    "Captain Ahmet Yıldız founded MerrySails in 2001 and has personally guided 50,000+ guests across the Bosphorus. TURSAB licensed, 25+ years maritime experience.",
  alternates: {
    canonical: `${SITE_URL}/authors/captain-ahmet`,
    languages: buildHreflang("/authors/captain-ahmet"),
  },
  openGraph: {
    title: "Captain Ahmet Yıldız — Founder, MerrySails",
    description:
      "Founder and senior captain of MerrySails. 25+ years of Bosphorus navigation experience, TURSAB licensed.",
    url: `${SITE_URL}/authors/captain-ahmet`,
    type: "profile",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "Captain Ahmet Yıldız — MerrySails founder" }],
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#captain-ahmet`,
  name: "Captain Ahmet Yıldız",
  givenName: "Ahmet",
  familyName: "Yıldız",
  jobTitle: "Founder & Senior Captain",
  description:
    "Founded Merry Tourism in 2001. Over 25 years navigating the Bosphorus, Captain Ahmet has personally guided more than 50,000 guests through Istanbul's waterways.",
  url: `${SITE_URL}/authors/captain-ahmet`,
  worksFor: { "@id": `${SITE_URL}/#organization` },
  knowsAbout: [
    "Bosphorus Cruise",
    "Bosphorus Strait Navigation",
    "Yacht Charter Istanbul",
    "Istanbul Maritime Tourism",
    "Private Boat Tours",
    "Turkish Maritime Regulation",
    "Bosphorus Pier and Marina Operations",
  ],
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      name: "TURSAB A-Group Travel Agency License",
      credentialCategory: "Professional License",
      identifier: TURSAB_LICENSE_NUMBER,
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Turkish Maritime Captain Certification",
      credentialCategory: "Maritime License",
    },
  ],
  alumniOf: {
    "@type": "Organization",
    name: "Istanbul Maritime Vocational School",
  },
  award: [
    "TURSAB-licensed travel agency operator since 2001",
    "50,000+ guests hosted on Bosphorus cruises",
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "About", item: `${SITE_URL}/about` },
    { "@type": "ListItem", position: 3, name: "Captain Ahmet Yıldız", item: `${SITE_URL}/authors/captain-ahmet` },
  ],
};

const milestones = [
  {
    year: "2001",
    title: "Founded Merry Tourism",
    body: "Registered TURSAB A-Group travel agency #14316 in Istanbul. Started with one shared cruise route and a single yacht.",
  },
  {
    year: "2008",
    title: "Expanded to Yacht Charter",
    body: "Added private yacht charters as the company grew. Began offering proposals, weddings, and corporate evenings on the Bosphorus.",
  },
  {
    year: "2015",
    title: "10,000th Guest",
    body: "Crossed 10,000 cumulative guests across shared cruises, dinner cruises, and private charters.",
  },
  {
    year: "2020-2022",
    title: "Pandemic resilience",
    body: "Maintained TURSAB license, kept the captain team employed, returned to full operations as travel resumed.",
  },
  {
    year: "2026",
    title: "50,000+ guests",
    body: "Crossed the 50,000-guest milestone. Three published shared cruise products plus three private yacht packages.",
  },
];

const expertise = [
  {
    icon: Anchor,
    title: "Bosphorus Strait Navigation",
    body: "25+ years of weekly transits across all 31 km of the Bosphorus, in every season and weather condition that Turkish maritime regulation permits.",
  },
  {
    icon: MapPin,
    title: "Pier & Marina Operations",
    body: "Working knowledge of Karaköy, Kabataş, Kuruçeşme, Beşiktaş, and Üsküdar piers — including which boarding flow fits which cruise type and which transfer profile.",
  },
  {
    icon: Users,
    title: "Group + Private Itineraries",
    body: "Experience hosting solo travelers, families, corporate groups (up to 60), wedding parties, and proposal couples. Custom routing within Bosphorus operating limits.",
  },
  {
    icon: Award,
    title: "Maritime Safety & Compliance",
    body: "TURSAB-licensed since 2001, plus Turkish Coast Guard maritime captain certification. Every MerrySails vessel meets full Turkish maritime safety regulation.",
  },
];

const writtenFor = [
  {
    href: "/blog/best-bosphorus-cruise-istanbul-guide",
    title: "Best Bosphorus Cruise Istanbul 2026 — Guide",
  },
  {
    href: "/blog/best-bosphorus-sunset-cruise-istanbul-2026",
    title: "Best Bosphorus Sunset Cruise Istanbul 2026",
  },
  {
    href: "/blog/bosphorus-cruise-vs-ferry-istanbul-2026",
    title: "Bosphorus Cruise vs Ferry — Decision Guide 2026",
  },
  {
    href: "/blog/istanbul-dinner-cruise-etiquette-2026",
    title: "Istanbul Dinner Cruise Etiquette & Tips 2026",
  },
  {
    href: "/blog/private-yacht-charter-istanbul-2026-buyers-guide",
    title: "Private Yacht Charter Istanbul 2026 — Guide",
  },
];

export default function CaptainAhmetPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="bg-[var(--surface-alt)] pt-28 pb-20">
        <div className="container-main max-w-5xl">
          <nav className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6">
            <Link href="/" className="hover:text-[var(--brand-primary)]">Home</Link>
            <span>/</span>
            <Link href="/about" className="hover:text-[var(--brand-primary)]">About</Link>
            <span>/</span>
            <span className="text-[var(--heading)]">Captain Ahmet Yıldız</span>
          </nav>

          <section className="rounded-[2rem] overflow-hidden bg-white border border-[var(--line)] shadow-sm">
            <div className="relative aspect-[5/2] md:aspect-[16/5] bg-gradient-to-br from-[var(--brand-primary)]/15 via-[var(--brand-gold)]/10 to-white">
              <Image
                src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1920&q=80"
                alt="Bosphorus strait at golden hour — Captain Ahmet's home waters since 2001"
                fill
                className="object-cover opacity-40"
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            <div className="p-6 md:p-10">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                <div>
                  <p className="inline-flex rounded-full bg-[var(--brand-primary)]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[var(--brand-primary)] mb-3">
                    Founder · Senior Captain
                  </p>
                  <h1 className="text-3xl md:text-4xl font-bold text-[var(--heading)]" translate="no">
                    Captain Ahmet Yıldız
                  </h1>
                  <p className="mt-2 text-base text-[var(--body-text)]">
                    25+ years navigating the Bosphorus · TURSAB-licensed since 2001 · 50,000+ guests hosted
                  </p>
                </div>
                <div className="flex gap-2">
                  <a
                    href={WHATSAPP_URL}
                    className="inline-flex items-center gap-2 rounded-xl bg-[var(--brand-primary)] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[var(--brand-primary)]/90"
                  >
                    Ask Captain Ahmet <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <p className="text-base leading-relaxed text-[var(--body-text)] max-w-3xl mb-10">
                Captain Ahmet founded Merry Tourism in 2001 with a single chartered yacht and a clear principle: a tourist on the Bosphorus deserves the same operator-led service a local would get. Twenty-five years and 50,000+ guests later, the same principle still runs every cruise — direct booking, transparent pricing, and a captain on every boat who has personally crossed every kilometre of the strait more times than anyone outside the Coast Guard.
              </p>

              <h2 className="text-2xl font-bold text-[var(--heading)] mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-[var(--brand-primary)]" /> 25 Years on the Bosphorus
              </h2>
              <ol className="space-y-4 mb-10">
                {milestones.map((m) => (
                  <li key={m.year} className="grid grid-cols-[80px_1fr] gap-4 rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] p-4">
                    <div className="text-base font-bold text-[var(--brand-primary)]">{m.year}</div>
                    <div>
                      <h3 className="text-base font-semibold text-[var(--heading)] mb-1">{m.title}</h3>
                      <p className="text-sm text-[var(--text-muted)] leading-relaxed">{m.body}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">Areas of Expertise</h2>
              <div className="grid gap-4 md:grid-cols-2 mb-10">
                {expertise.map((e) => (
                  <div key={e.title} className="rounded-2xl border border-[var(--line)] bg-white p-5">
                    <e.icon className="h-6 w-6 text-[var(--brand-primary)] mb-3" />
                    <h3 className="text-base font-semibold text-[var(--heading)] mb-2">{e.title}</h3>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">{e.body}</p>
                  </div>
                ))}
              </div>

              <h2 className="text-2xl font-bold text-[var(--heading)] mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-[var(--brand-primary)]" /> Articles by Captain Ahmet
              </h2>
              <ul className="space-y-2 mb-10">
                {writtenFor.map((a) => (
                  <li key={a.href}>
                    <Link
                      href={a.href}
                      className="block rounded-xl border border-[var(--line)] bg-white p-4 hover:border-[var(--brand-primary)]/40 hover:shadow-sm transition"
                    >
                      <span className="text-sm font-semibold text-[var(--heading)] hover:text-[var(--brand-primary)]">
                        {a.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="rounded-2xl border border-[var(--brand-primary)]/20 bg-gradient-to-br from-[var(--brand-primary)]/5 to-white p-6 md:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--brand-primary)] mb-2">
                  Direct Contact
                </p>
                <h2 className="text-xl font-bold text-[var(--heading)] mb-3">
                  Ask Captain Ahmet about your cruise
                </h2>
                <p className="text-sm text-[var(--body-text)] mb-5 leading-relaxed">
                  Booking a private yacht for a proposal, a corporate evening, or a multi-generation family group?
                  Captain Ahmet personally reviews complex bookings before confirmation.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={WHATSAPP_URL}
                    className="inline-flex items-center gap-2 rounded-xl bg-[var(--brand-primary)] px-5 py-3 text-sm font-bold text-white hover:bg-[var(--brand-primary)]/90"
                  >
                    WhatsApp <ArrowRight className="h-4 w-4" />
                  </a>
                  <Link
                    href="/yacht-charter-istanbul"
                    className="inline-flex items-center gap-2 rounded-xl border border-[var(--line)] bg-white px-5 py-3 text-sm font-bold text-[var(--heading)] hover:border-[var(--brand-primary)]/40"
                  >
                    Yacht Charter Options
                  </Link>
                  <Link
                    href="/tursab"
                    className="inline-flex items-center gap-2 rounded-xl border border-[var(--line)] bg-white px-5 py-3 text-sm font-semibold text-[var(--heading)] hover:border-[var(--brand-primary)]/40"
                  >
                    TURSAB License #{TURSAB_LICENSE_NUMBER}
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
