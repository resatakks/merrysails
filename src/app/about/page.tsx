import Image from "next/image";
import Link from "next/link";
import { Anchor, Award, Users, Ship, ArrowRight } from "lucide-react";

export const metadata = {
  title: "About MerrySails — TURSAB Licensed Cruise Operator Since 2001",
  description:
    "MerrySails by Merry Tourism — TURSAB-licensed A Group travel agency in Istanbul since 2001. 50,000+ guests, professional guides, best Bosphorus cruise experience.",
  keywords: [
    "merrysails about",
    "merry tourism istanbul",
    "TURSAB licensed travel agency",
    "bosphorus cruise company",
    "istanbul boat tour operator",
  ],
  alternates: { canonical: "https://merrysails.com/about" },
  openGraph: {
    title: "About MerrySails — TURSAB Licensed Cruise Operator",
    description:
      "TURSAB-licensed since 2001. 50,000+ happy guests, professional guides, and the best Bosphorus cruise experience in Istanbul.",
    url: "https://merrysails.com/about",
    type: "website" as const,
    images: [{ url: "https://merrysails.com/og-image.jpg", width: 1200, height: 630, alt: "MerrySails — Bosphorus Cruise Istanbul" }],
  },
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About MerrySails",
  description: "MerrySails by Merry Tourism — TURSAB-licensed A Group travel agency in Istanbul since 2001. 50,000+ guests, professional guides, best Bosphorus cruise experience.",
  url: "https://merrysails.com/about",
  mainEntity: {
    "@type": "TravelAgency",
    "@id": "https://merrysails.com/#organization",
    name: "MerrySails",
    alternateName: "Merry Tourism",
    foundingDate: "2001-01-01",
    numberOfEmployees: { "@type": "QuantitativeValue", minValue: 20 },
    slogan: "Istanbul's Trusted Bosphorus Cruise Company Since 2001",
    knowsAbout: ["Bosphorus Cruise Tours", "Yacht Charter Istanbul", "Private Boat Tours", "Dinner Cruise Istanbul", "Corporate Event Cruises"],
    award: "TURSAB A Group License",
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
          <h1 className="text-3xl md:text-4xl font-bold mb-4">About MerrySails — Istanbul&apos;s Trusted Bosphorus Cruise Company</h1>
          <p className="text-[var(--text-muted)] max-w-2xl mx-auto text-lg">
            Operated by Merry Tourism, a TURSAB-licensed A Group travel agency, we&apos;ve been
            offering Bosphorus boat tours, sunset cruises, dinner cruises, and private
            yacht charter services in Istanbul for over 23 years.
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
            <h2 className="text-2xl font-bold mb-4">Our Story — Bosphorus Cruise Experts Since 2001</h2>
            <p className="text-[var(--body-text)] leading-relaxed mb-4">
              Since 2001, Merry Tourism has been one of Istanbul&apos;s most trusted names in
              Bosphorus cruises, yacht charter, and boat tour services. What started as a
              small family operation with a single boat has grown into a fleet of modern
              vessels serving over 50,000 happy travelers.
            </p>
            <p className="text-[var(--body-text)] leading-relaxed mb-4">
              As a TURSAB-licensed A Group travel agency, we take pride in offering transparent
              pricing, professional service, and authentic Turkish hospitality. Our team of
              experienced captains and multilingual tourist guides ensures every guest enjoys
              a safe, comfortable, and memorable Istanbul Bosphorus cruise experience.
            </p>
            <p className="text-[var(--body-text)] leading-relaxed">
              From romantic Bosphorus sunset cruises to spectacular dinner cruises with Turkish
              night entertainment, from yacht rental for marriage proposals to corporate event
              cruises — we have 23+ years of experience and the passion to make your Istanbul
              boat trip truly special.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {[
            { icon: Ship, value: "23+", label: "Years Experience" },
            { icon: Users, value: "50K+", label: "Happy Guests" },
            { icon: Award, value: "5.0", label: "Average Rating" },
            { icon: Anchor, value: "21", label: "Tour Options" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-6 text-center shadow-sm">
              <stat.icon className="w-8 h-8 text-[var(--brand-primary)] mx-auto mb-3" />
              <div className="text-3xl font-bold text-[var(--heading)] mb-1">{stat.value}</div>
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
              description: "No hidden fees, no surprises. The price you see is the price you pay. Book direct for the best rates available.",
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
          <h2 className="text-2xl font-bold mb-8 text-center">Explore Our Bosphorus Cruise Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cruises & Tours */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-[var(--brand-primary)]">Bosphorus Cruises</h3>
              <ul className="space-y-2">
                <li><Link href="/cruises/bosphorus-sunset-cruise" className="text-sm text-[var(--body-text)] hover:text-[var(--brand-primary)] transition-colors flex items-center gap-1"><ArrowRight className="w-3 h-3 shrink-0" /> Sunset Cruise — From €20</Link></li>
                <li><Link href="/cruises/bosphorus-dinner-cruise" className="text-sm text-[var(--body-text)] hover:text-[var(--brand-primary)] transition-colors flex items-center gap-1"><ArrowRight className="w-3 h-3 shrink-0" /> Dinner Cruise & Turkish Night — From €65</Link></li>
                <li><Link href="/cruises/bosphorus-sightseeing-cruise" className="text-sm text-[var(--body-text)] hover:text-[var(--brand-primary)] transition-colors flex items-center gap-1"><ArrowRight className="w-3 h-3 shrink-0" /> Short Sightseeing Cruise — From €15</Link></li>
                <li><Link href="/cruises/yacht-charter-in-istanbul" className="text-sm text-[var(--body-text)] hover:text-[var(--brand-primary)] transition-colors flex items-center gap-1"><ArrowRight className="w-3 h-3 shrink-0" /> Private Yacht Charter — From €280</Link></li>
                <li><Link href="/cruises/istanbul-bosphorus-lunch-cruise" className="text-sm text-[var(--body-text)] hover:text-[var(--brand-primary)] transition-colors flex items-center gap-1"><ArrowRight className="w-3 h-3 shrink-0" /> Bosphorus Lunch Cruise — From €45</Link></li>
                <li><Link href="/cruises/istanbul-princes-island-tour" className="text-sm text-[var(--body-text)] hover:text-[var(--brand-primary)] transition-colors flex items-center gap-1"><ArrowRight className="w-3 h-3 shrink-0" /> Princes&apos; Islands Tour — From €35</Link></li>
                <li><Link href="/cruises/private-bosphorus-sunset-cruise" className="text-sm text-[var(--body-text)] hover:text-[var(--brand-primary)] transition-colors flex items-center gap-1"><ArrowRight className="w-3 h-3 shrink-0" /> Private Sunset Yacht Cruise</Link></li>
                <li><Link href="/cruises/private-bosphorus-dinner-yacht-cruise" className="text-sm text-[var(--body-text)] hover:text-[var(--brand-primary)] transition-colors flex items-center gap-1"><ArrowRight className="w-3 h-3 shrink-0" /> Private Dinner Yacht Cruise</Link></li>
                <li><Link href="/cruises/full-day-istanbul-old-city-tour" className="text-sm text-[var(--body-text)] hover:text-[var(--brand-primary)] transition-colors flex items-center gap-1"><ArrowRight className="w-3 h-3 shrink-0" /> Full Day Istanbul Old City Tour</Link></li>
                <li><Link href="/cruises/bosphorus-cruise-for-cruise-passengers" className="text-sm text-[var(--body-text)] hover:text-[var(--brand-primary)] transition-colors flex items-center gap-1"><ArrowRight className="w-3 h-3 shrink-0" /> Tour for Cruise Ship Passengers</Link></li>
                <li className="pt-1"><Link href="/cruises" className="text-sm font-semibold text-[var(--brand-primary)] hover:underline">View All 21 Cruises & Tours →</Link></li>
              </ul>
            </div>

            {/* Yacht Events */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-[var(--brand-primary)]">Yacht Events & Celebrations</h3>
              <ul className="space-y-2">
                <li><Link href="/cruises/romantic-marriage-proposal" className="text-sm text-[var(--body-text)] hover:text-[var(--brand-primary)] transition-colors flex items-center gap-1"><ArrowRight className="w-3 h-3 shrink-0" /> Marriage Proposal on Yacht</Link></li>
                <li><Link href="/cruises/yacht-birthday-party" className="text-sm text-[var(--body-text)] hover:text-[var(--brand-primary)] transition-colors flex items-center gap-1"><ArrowRight className="w-3 h-3 shrink-0" /> Yacht Birthday Party</Link></li>
                <li><Link href="/cruises/yacht-weddings" className="text-sm text-[var(--body-text)] hover:text-[var(--brand-primary)] transition-colors flex items-center gap-1"><ArrowRight className="w-3 h-3 shrink-0" /> Yacht Weddings Istanbul</Link></li>
                <li><Link href="/cruises/wedding-anniversary" className="text-sm text-[var(--body-text)] hover:text-[var(--brand-primary)] transition-colors flex items-center gap-1"><ArrowRight className="w-3 h-3 shrink-0" /> Wedding Anniversary Cruise</Link></li>
                <li><Link href="/cruises/bachelorette-yacht-party" className="text-sm text-[var(--body-text)] hover:text-[var(--brand-primary)] transition-colors flex items-center gap-1"><ArrowRight className="w-3 h-3 shrink-0" /> Bachelorette Yacht Party</Link></li>
                <li><Link href="/cruises/corporate-event-bosphorus-cruise" className="text-sm text-[var(--body-text)] hover:text-[var(--brand-primary)] transition-colors flex items-center gap-1"><ArrowRight className="w-3 h-3 shrink-0" /> Corporate Event Cruise</Link></li>
                <li><Link href="/cruises/private-yacht-swimming-tour" className="text-sm text-[var(--body-text)] hover:text-[var(--brand-primary)] transition-colors flex items-center gap-1"><ArrowRight className="w-3 h-3 shrink-0" /> Private Yacht Swimming Tour</Link></li>
                <li><Link href="/cruises/new-years-eve-party-cruise" className="text-sm text-[var(--body-text)] hover:text-[var(--brand-primary)] transition-colors flex items-center gap-1"><ArrowRight className="w-3 h-3 shrink-0" /> New Year&apos;s Eve Party Cruise</Link></li>
              </ul>
            </div>

            {/* Guides & Blog */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-[var(--brand-primary)]">Guides & Travel Tips</h3>
              <ul className="space-y-2">
                <li><Link href="/guides/bosphorus-strait" className="text-sm text-[var(--body-text)] hover:text-[var(--brand-primary)] transition-colors flex items-center gap-1"><ArrowRight className="w-3 h-3 shrink-0" /> The Bosphorus Strait Guide</Link></li>
                <li><Link href="/guides/maidens-tower" className="text-sm text-[var(--body-text)] hover:text-[var(--brand-primary)] transition-colors flex items-center gap-1"><ArrowRight className="w-3 h-3 shrink-0" /> Maiden&apos;s Tower (Kiz Kulesi)</Link></li>
                <li><Link href="/guides/dolmabahce-palace" className="text-sm text-[var(--body-text)] hover:text-[var(--brand-primary)] transition-colors flex items-center gap-1"><ArrowRight className="w-3 h-3 shrink-0" /> Dolmabahce Palace Guide</Link></li>
                <li><Link href="/guides/buyukada-princes-islands" className="text-sm text-[var(--body-text)] hover:text-[var(--brand-primary)] transition-colors flex items-center gap-1"><ArrowRight className="w-3 h-3 shrink-0" /> Buyukada & Princes&apos; Islands</Link></li>
                <li><Link href="/blog/best-bosphorus-cruise-istanbul-guide" className="text-sm text-[var(--body-text)] hover:text-[var(--brand-primary)] transition-colors flex items-center gap-1"><ArrowRight className="w-3 h-3 shrink-0" /> Best Bosphorus Cruise Guide</Link></li>
                <li><Link href="/blog/bosphorus-dinner-cruise-what-to-expect" className="text-sm text-[var(--body-text)] hover:text-[var(--brand-primary)] transition-colors flex items-center gap-1"><ArrowRight className="w-3 h-3 shrink-0" /> Dinner Cruise — What to Expect</Link></li>
                <li><Link href="/blog/istanbul-travel-guide-first-timers" className="text-sm text-[var(--body-text)] hover:text-[var(--brand-primary)] transition-colors flex items-center gap-1"><ArrowRight className="w-3 h-3 shrink-0" /> Istanbul Travel Guide for First-Timers</Link></li>
                <li><Link href="/blog/top-things-to-do-istanbul" className="text-sm text-[var(--body-text)] hover:text-[var(--brand-primary)] transition-colors flex items-center gap-1"><ArrowRight className="w-3 h-3 shrink-0" /> Top Things to Do in Istanbul</Link></li>
                <li className="pt-1"><Link href="/guides" className="text-sm font-semibold text-[var(--brand-primary)] hover:underline">All Istanbul Guides →</Link></li>
                <li><Link href="/blog" className="text-sm font-semibold text-[var(--brand-primary)] hover:underline">All Blog Posts →</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
