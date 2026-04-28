import Image from "next/image";
import Link from "next/link";
import { Anchor, Award, Users, Ship, ArrowRight } from "lucide-react";
import {
  COMPANY_NAME,
  SITE_NAME,
  TURSAB_AGENCY_NAME,
  TURSAB_LICENSE_NUMBER,
} from "@/lib/constants";

export const metadata = {
  title: `About ${SITE_NAME} — ${COMPANY_NAME} and TURSAB License`,
  description:
    `${SITE_NAME} by ${COMPANY_NAME} — TURSAB-licensed A Group travel agency in Istanbul since 2001, focused on Bosphorus cruises, yacht charter, and clear booking support.`,
  keywords: [
    "merrysails about",
    "merry tourism istanbul",
    "TURSAB licensed travel agency",
    "bosphorus cruise company",
    "istanbul boat tour company",
  ],
  alternates: { canonical: "https://merrysails.com/about" },
  openGraph: {
    title: `About ${SITE_NAME} — TURSAB-Licensed Bosphorus Cruises`,
    description:
      `TURSAB-licensed since 2001. Learn about ${SITE_NAME}, the Bosphorus cruise and yacht division of ${COMPANY_NAME} in Istanbul.`,
    url: "https://merrysails.com/about",
    type: "website" as const,
    images: [{ url: "https://merrysails.com/og-image.jpg", width: 1200, height: 630, alt: "MerrySails — Bosphorus Cruise Istanbul" }],
  },
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About MerrySails",
  description: `${SITE_NAME} by ${COMPANY_NAME} — TURSAB-licensed A Group travel agency in Istanbul since 2001, offering Bosphorus cruises, private yacht charters, and guided boat tours.`,
  url: "https://merrysails.com/about",
  mainEntity: {
    "@type": "TravelAgency",
    "@id": "https://merrysails.com/#organization",
    name: SITE_NAME,
    alternateName: COMPANY_NAME,
    foundingDate: "2001-01-01",
    slogan: "Bosphorus Cruises in Istanbul Since 2001",
    knowsAbout: ["Bosphorus Cruise Tours", "Yacht Charter Istanbul", "Private Boat Tours", "Dinner Cruise Istanbul", "Corporate Event Cruises"],
    award: `TURSAB A Group License ${TURSAB_LICENSE_NUMBER}`,
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://merrysails.com" },
    { "@type": "ListItem", position: 2, name: "About", item: "https://merrysails.com/about" },
  ],
};

export default function AboutPage() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    <div className="pt-28 pb-20">
      <div className="container-main">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">About {SITE_NAME} — Bosphorus Cruises by {COMPANY_NAME}</h1>
          <p className="text-[var(--text-muted)] max-w-2xl mx-auto text-lg">
            {SITE_NAME} is part of {COMPANY_NAME}, a TURSAB-licensed A Group travel agency.
            Since 2001, we have offered Bosphorus boat tours, sunset cruises, dinner
            cruises, and private yacht charters in Istanbul.
          </p>
        </div>

        {/* Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80"
              alt="Istanbul Bosphorus"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Story — Bosphorus Cruises Since 2001</h2>
            <p className="text-[var(--body-text)] leading-relaxed mb-4">
              Since 2001, {COMPANY_NAME} has focused on Bosphorus cruises, yacht charters,
              and boat tours in Istanbul. What started as a small family operation has
              grown into a Bosphorus-focused travel service with shared cruises, private
              yacht charters, and event-led planning.
            </p>
            <p className="text-[var(--body-text)] leading-relaxed mb-4">
              As a TURSAB-licensed A Group travel agency under {TURSAB_AGENCY_NAME},
              we focus on clear pricing,
              careful service, and authentic Turkish hospitality. Our experienced captains
              and multilingual tourist guides help each guest enjoy a safe and comfortable
              Bosphorus cruise in Istanbul.
            </p>
          <p className="text-[var(--body-text)] leading-relaxed">
              The site is structured to keep broad Bosphorus comparisons separate from narrower
              proposal, private-dinner, celebration, and corporate-event requests. That makes it
              easier for guests to reach the right owner page before sending a reservation or quote
              request.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {[
            { icon: Ship, value: "Since 2001", label: "Operating History" },
            { icon: Users, value: "50,000+", label: "Guests Served" },
            { icon: Award, value: "TURSAB A Group", label: "License #14073" },
            { icon: Anchor, value: "5 Languages", label: "EN, TR, DE, FR, NL" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-6 text-center shadow-sm">
              <stat.icon className="w-8 h-8 text-[var(--brand-primary)] mx-auto mb-3" />
              <div className="text-2xl font-bold text-[var(--heading)] mb-1">{stat.value}</div>
              <div className="text-sm text-[var(--text-muted)]">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold mb-3">Our Values</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Safety First",
              description: "All vessels are regularly inspected and meet international safety standards. Life jackets and safety equipment for all passengers.",
            },
            {
              title: "Transparent Pricing",
              description: "The price shown on each experience page covers the listed inclusions. If you add extras, we confirm them before payment.",
            },
            {
              title: "Local Expertise",
              description: "Our guides and captains are Istanbul locals who know every corner of the Bosphorus and love sharing its stories.",
            },
          ].map((value) => (
            <div key={value.title} className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>

        {/* Explore Our Services */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-8 text-center">Use the Right MerrySails Path</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-[var(--brand-primary)]">Core Booking Owners</h3>
              <ul className="space-y-2">
                <li><Link href="/bosphorus-cruise" className="text-sm text-[var(--body-text)] hover:text-[var(--brand-primary)] transition-colors flex items-center gap-1"><ArrowRight className="w-3 h-3 shrink-0" /> Bosphorus Cruise Compare Hub</Link></li>
                <li><Link href="/cruises/bosphorus-sunset-cruise" className="text-sm text-[var(--body-text)] hover:text-[var(--brand-primary)] transition-colors flex items-center gap-1"><ArrowRight className="w-3 h-3 shrink-0" /> Bosphorus Sunset Cruise</Link></li>
                <li><Link href="/istanbul-dinner-cruise" className="text-sm text-[var(--body-text)] hover:text-[var(--brand-primary)] transition-colors flex items-center gap-1"><ArrowRight className="w-3 h-3 shrink-0" /> Istanbul Dinner Cruise</Link></li>
                <li><Link href="/yacht-charter-istanbul" className="text-sm text-[var(--body-text)] hover:text-[var(--brand-primary)] transition-colors flex items-center gap-1"><ArrowRight className="w-3 h-3 shrink-0" /> Yacht Charter Istanbul</Link></li>
                <li className="pt-1"><Link href="/bosphorus-cruise" className="text-sm font-semibold text-[var(--brand-primary)] hover:underline">Compare hub →</Link></li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-[var(--brand-primary)]">Narrower Support & Event Routes</h3>
              <ul className="space-y-2">
                <li><Link href="/boat-rental-hourly-istanbul" className="text-sm text-[var(--body-text)] hover:text-[var(--brand-primary)] transition-colors flex items-center gap-1"><ArrowRight className="w-3 h-3 shrink-0" /> Boat Rental Hourly</Link></li>
                <li><Link href="/proposal-yacht-with-photographer-istanbul" className="text-sm text-[var(--body-text)] hover:text-[var(--brand-primary)] transition-colors flex items-center gap-1"><ArrowRight className="w-3 h-3 shrink-0" /> Proposal with Photographer</Link></li>
                <li><Link href="/private-dinner-cruise-for-couples-istanbul" className="text-sm text-[var(--body-text)] hover:text-[var(--brand-primary)] transition-colors flex items-center gap-1"><ArrowRight className="w-3 h-3 shrink-0" /> Couples Private Dinner</Link></li>
                <li><Link href="/corporate-events" className="text-sm text-[var(--body-text)] hover:text-[var(--brand-primary)] transition-colors flex items-center gap-1"><ArrowRight className="w-3 h-3 shrink-0" /> Corporate Events</Link></li>
                <li><Link href="/corporate-yacht-dinner-istanbul" className="text-sm text-[var(--body-text)] hover:text-[var(--brand-primary)] transition-colors flex items-center gap-1"><ArrowRight className="w-3 h-3 shrink-0" /> Corporate Yacht Dinner</Link></li>
                <li><Link href="/kurucesme-marina-yacht-charter" className="text-sm text-[var(--body-text)] hover:text-[var(--brand-primary)] transition-colors flex items-center gap-1"><ArrowRight className="w-3 h-3 shrink-0" /> Kurucesme Marina Yacht</Link></li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-[var(--brand-primary)]">Trust, Guides & Support</h3>
              <ul className="space-y-2">
                <li><Link href="/tursab" className="text-sm text-[var(--body-text)] hover:text-[var(--brand-primary)] transition-colors flex items-center gap-1"><ArrowRight className="w-3 h-3 shrink-0" /> TURSAB License Details</Link></li>
                <li><Link href="/contact" className="text-sm text-[var(--body-text)] hover:text-[var(--brand-primary)] transition-colors flex items-center gap-1"><ArrowRight className="w-3 h-3 shrink-0" /> Contact & Quote Routing</Link></li>
                <li><Link href="/bosphorus-cruise-departure-points" className="text-sm text-[var(--body-text)] hover:text-[var(--brand-primary)] transition-colors flex items-center gap-1"><ArrowRight className="w-3 h-3 shrink-0" /> Departure Points Hub</Link></li>
                <li><Link href="/guides/kabatas-pier" className="text-sm text-[var(--body-text)] hover:text-[var(--brand-primary)] transition-colors flex items-center gap-1"><ArrowRight className="w-3 h-3 shrink-0" /> Kabatas Pier Guide</Link></li>
                <li><Link href="/guides/karakoy-waterfront" className="text-sm text-[var(--body-text)] hover:text-[var(--brand-primary)] transition-colors flex items-center gap-1"><ArrowRight className="w-3 h-3 shrink-0" /> Karakoy Waterfront Guide</Link></li>
                <li><Link href="/guides/kurucesme-marina" className="text-sm text-[var(--body-text)] hover:text-[var(--brand-primary)] transition-colors flex items-center gap-1"><ArrowRight className="w-3 h-3 shrink-0" /> Kurucesme Marina Guide</Link></li>
                <li><Link href="/blog/bosphorus-sunset-cruise-vs-dinner-cruise" className="text-sm text-[var(--body-text)] hover:text-[var(--brand-primary)] transition-colors flex items-center gap-1"><ArrowRight className="w-3 h-3 shrink-0" /> Sunset vs Dinner Cruise</Link></li>
                <li><Link href="/blog/private-yacht-departure-points-istanbul" className="text-sm text-[var(--body-text)] hover:text-[var(--brand-primary)] transition-colors flex items-center gap-1"><ArrowRight className="w-3 h-3 shrink-0" /> Private Yacht Departure Points</Link></li>
                <li className="pt-1"><Link href="/guides" className="text-sm font-semibold text-[var(--brand-primary)] hover:underline">All guides →</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
