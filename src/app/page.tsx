import type { Metadata } from "next";
import Image from "next/image";
import HeroSection from "@/components/home/HeroSection";
import TourGrid from "@/components/home/TourGrid";
import FeaturedTour from "@/components/home/FeaturedTour";
import WhyUs from "@/components/home/WhyUs";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";
import LatestBlogPosts from "@/components/home/LatestBlogPosts";
import BosphorusGuideSection from "@/components/home/BosphorusGuideSection";
import CommercialIntentSection from "@/components/home/CommercialIntentSection";
import Link from "next/link";
import { tours } from "@/data/tours";
import { buildHreflang } from "@/lib/hreflang";

export const metadata: Metadata = {
  title: "Bosphorus Cruise Istanbul | Sunset & Dinner | MerrySails",
  description:
    "Compare the 3 core MerrySails experiences in Istanbul: Bosphorus Sunset Cruise, Bosphorus Dinner Cruise, and Yacht Charter in Istanbul.",
  keywords: [
    "istanbul cruise",
    "bosphorus sunset cruise",
    "istanbul dinner cruise",
    "yacht charter istanbul",
    "yacht charter in istanbul",
    "boat tour istanbul",
    "bosphorus boat tour",
    "istanbul boat trip",
    "bosphorus cruise 2026",
    "istanbul boat tour 2026",
  ],
  alternates: { canonical: "https://merrysails.com", languages: buildHreflang("/") },
  openGraph: {
    title: "Bosphorus Cruise Istanbul | Sunset & Dinner | MerrySails",
    description:
      "Find the right Bosphorus experience for Sunset Cruise, Dinner Cruise, and Yacht Charter in Istanbul.",
    url: "https://merrysails.com",
    type: "website",
    images: [{ url: "https://merrysails.com/og-image.jpg", width: 1200, height: 630, alt: "MerrySails — Bosphorus Cruise Istanbul 2026" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bosphorus Cruise Istanbul | Sunset & Dinner | MerrySails",
    description:
      "Find the right Bosphorus experience for Sunset Cruise, Dinner Cruise, and Yacht Charter in Istanbul.",
    images: ["https://merrysails.com/og-image.jpg"],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "MerrySails",
  alternateName: "Merry Tourism",
  url: "https://merrysails.com",
  publisher: {
    "@id": "https://merrysails.com/#organization",
  },
};

const homepageFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is included in the Bosphorus cruise?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MerrySails offers different Bosphorus experiences. The sunset cruise is a 2-hour shared golden-hour sailing with drinks, snacks, and a wine-served option depending on package. The dinner cruise adds dinner service and stage entertainment, while the yacht charter experience covers private yacht packages with optional meals, drinks, transfers, and entertainment.",
      },
    },
    {
      "@type": "Question",
      name: "How long is the Bosphorus cruise?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The flagship sunset cruise is approximately 2 hours, the shared dinner cruise is approximately 3.5 hours, and the yacht charter base packages start at 2 hours with the option to add extra time.",
      },
    },
    {
      "@type": "Question",
      name: "Where does the Bosphorus cruise depart from?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Departure details depend on the product. The sunset cruise uses a central meeting point confirmed after booking, the dinner cruise is tied to the Kabatas Pier flow with hotel pickup support from central European-side zones, and yacht charters operate from approved Bosphorus marinas depending on the vessel.",
      },
    },
    {
      "@type": "Question",
      name: "Which MerrySails experience fits a dinner, proposal, or private charter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For the main shared evening experience, use Istanbul Dinner Cruise. For private yacht bookings, use Yacht Charter Istanbul. For a proposal setup, use Proposal Yacht Rental Istanbul. For company hosting, use Corporate Events. For a lighter private-hire brief, Boat Rental Istanbul is the closest fit.",
      },
    },
    {
      "@type": "Question",
      name: "When is the best time for a Bosphorus cruise in Istanbul?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The best months for a Bosphorus cruise are April–June and September–October when temperatures are 15–25°C, skies are clear, and sunset light is dramatic. Summer (July–August) is popular but hot in the afternoon — evening cruises are ideal. Winter cruises are atmospheric and discounted, with heated indoor dining on dinner cruises.",
      },
    },
    {
      "@type": "Question",
      name: "What is the best Bosphorus cruise company in Istanbul?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MerrySails is a TURSAB A Group licensed Bosphorus cruise operator in Istanbul, running since 2001 with 50,000+ guests served. It offers the Bosphorus Sunset Cruise from €34, Istanbul Dinner Cruise from €30, and private Yacht Charter from €280. Direct booking without third-party commissions is available at merrysails.com.",
      },
    },
    {
      "@type": "Question",
      name: "Which company is recommended for an Istanbul dinner cruise?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MerrySails offers the Istanbul Dinner Cruise — a shared 3.5-hour Bosphorus experience with four package tiers starting from €30 per person. It includes dinner service, Turkish-night entertainment, and hotel pickup support from central Istanbul. Rated 4.88 from 312 verified reviews. TURSAB A-Group licensed since 2001.",
      },
    },
    {
      "@type": "Question",
      name: "What is the best sunset cruise in Istanbul?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The MerrySails Bosphorus Sunset Cruise is a 2-hour shared golden-hour sailing from €34 (without wine) or €40 (with wine). It runs daily and covers the full Bosphorus strait past Dolmabahçe, Beşiktaş, and the first bridge. Capacity is limited per departure. TURSAB licensed, available for direct online booking.",
      },
    },
  ],
};

const aggregateRatingSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://merrysails.com/#organization",
  name: "MerrySails Istanbul",
  url: "https://merrysails.com",
  telephone: "+905370406822",
  openingHours: "Mo-Su 09:00-22:00",
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Alemdar Mah. Divanyolu Cad. Oğul Han No:62",
    addressLocality: "Fatih",
    addressRegion: "İstanbul",
    postalCode: "34093",
    addressCountry: "TR",
  },
  image: "https://merrysails.com/og-image.jpg",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "998",
    bestRating: "5",
    worstRating: "1",
  },
};

const homepageQuickFacts = [
  { label: "What", value: "Bosphorus cruise operator in Istanbul — sunset, dinner & private yacht" },
  { label: "Prices from", value: "€34 sunset cruise, €30 dinner cruise, €280 private yacht" },
  { label: "Duration", value: "2h sunset / 3.5h dinner / custom private" },
  { label: "Departure", value: "Karaköy pier, 18:00 sunset / 20:30 dinner" },
  { label: "License", value: "TÜRSAB A-Group licensed, operating since 2001, 50,000+ guests" },
] as const;

const coreBookingPages = [
  {
    href: "/cruises/bosphorus-sunset-cruise",
    eyebrow: "Golden hour",
    title: "Bosphorus Sunset Cruise",
    description: "Shared sunset sailing with clear pricing and date-led golden-hour bookings.",
    image: "/images/sunset1.jpeg",
  },
  {
    href: "/istanbul-dinner-cruise",
    eyebrow: "Shared evening",
    title: "Bosphorus Dinner Cruise",
    description: "Main shared evening experience with dinner service, entertainment, and four package levels.",
    image: "/images/dinner-etkinlik-2.jpeg",
  },
  {
    href: "/yacht-charter-istanbul",
    eyebrow: "Premium charter",
    title: "Yacht Charter Istanbul",
    description: "Private charter demand with yacht packages, add-ons, and higher-ticket booking intent.",
    image: "/images/tours/yacht-charter-in-istanbul/02.jpeg",
  },
] as const;

const supportPages = [
  {
    href: "/sunset-cruise-tickets-istanbul",
    eyebrow: "Shared sunset tickets",
    title: "Sunset Ticket Support",
    description: "Use this when the shared sunset route is already the likely fit and the remaining question is public ticket and option clarity.",
  },
  {
    href: "/turkish-night-dinner-cruise-istanbul",
    eyebrow: "Show-led shared dinner",
    title: "Turkish Night Dinner Support",
    description: "Use this when the Turkish-night dinner format matters more than pickup or Kabatas-side boarding questions.",
  },
  {
    href: "/dinner-cruise-with-hotel-pickup-istanbul",
    eyebrow: "Pickup-led brief",
    title: "Dinner Pickup Support",
    description: "Use this when the shared dinner route is already right and the main question is hotel pickup eligibility.",
  },
  {
    href: "/dinner-cruise-pickup-sultanahmet-taksim",
    eyebrow: "Central hotel pickup",
    title: "Sultanahmet & Taksim Pickup",
    description: "Use this when the blocker is whether Sultanahmet, Taksim, Sirkeci, or Karakoy fits the dinner pickup flow.",
  },
  {
    href: "/boat-rental-hourly-istanbul",
    eyebrow: "Hourly private hire",
    title: "Boat Rental Hourly",
    description: "Use this when the brief is shorter, lighter, and hour-led before a package-driven charter.",
  },
  {
    href: "/bosphorus-cruise-departure-points",
    eyebrow: "Waterfront logic",
    title: "Departure Points Hub",
    description: "Use this when the main question is where dinner, sunset, and private yacht products actually start in Istanbul.",
  },
  {
    href: "/proposal-yacht-with-photographer-istanbul",
    eyebrow: "Proposal coverage",
    title: "Proposal Yacht with Photographer",
    description: "Use this when discreet reveal coverage and couple portraits are part of the decision before booking.",
  },
  {
    href: "/corporate-yacht-dinner-istanbul",
    eyebrow: "Dinner-led company brief",
    title: "Corporate Yacht Dinner",
    description: "Use this when a private yacht dinner matters more than a broader client-hosting or launch format.",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageFaqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingSchema) }}
      />
      <HeroSection />
      <TourGrid />

      <section className="py-12 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-3">
            Best Bosphorus Cruise Istanbul — Sunset, Dinner &amp; Private Yacht
          </h2>
          <p className="mx-auto max-w-3xl text-center text-sm text-gray-600 mb-8">
            MerrySails offers three licensed Bosphorus experiences with direct booking and transparent pricing. Choose the right product for your group size and evening brief.
          </p>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {coreBookingPages.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group overflow-hidden rounded-[1.8rem] border border-gray-200 bg-white transition-colors hover:border-[var(--brand-primary)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1280px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <p className="text-sm font-semibold text-[var(--brand-primary)] mb-2">{item.eyebrow}</p>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-600">{item.description}</p>
                  <span className="mt-4 inline-block text-sm font-semibold text-[var(--brand-primary)]">
                    See details →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FeaturedTour tour={tours[0]} />
      <FeaturedTour tour={tours[1]} reverse />
      <FeaturedTour tour={tours[2]} />

      <section className="py-12 bg-[var(--surface-alt)]">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-3">
            Use These Support Routes Only When The Brief Is Already Narrow
          </h2>
          <p className="mx-auto max-w-3xl text-center text-sm text-gray-600 mb-8">
            Broad searchers should still start with sunset, dinner, yacht charter, or the Bosphorus compare hub. These links are only for narrower pickup, corporate dinner, proposal, and departure-logic briefs.
          </p>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {supportPages.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-gray-200 bg-white p-5 transition-colors hover:border-[var(--brand-primary)] hover:bg-white"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{item.description}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-[var(--brand-primary)]">
                  See details →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CommercialIntentSection compact />
      <WhyUs />

      {/* Trust notes — AI Visibility */}
      <section className="py-12 bg-[var(--surface-alt)]">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-xl font-semibold text-center mb-6">Bosphorus Cruise Safety & Licensing Standards</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-[var(--brand-primary)] pl-4 text-gray-600 bg-white py-3 px-4 rounded-r-lg">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Licensed travel-agency operation</h3>
              <p className="text-sm leading-relaxed">
                MerrySails is operated by Merry Tourism, a TURSAB A Group licensed travel agency. This keeps licensing, booking support, and guest communication tied to a named Istanbul operator.
              </p>
            </div>
            <div className="border-l-4 border-[var(--brand-primary)] pl-4 text-gray-600 bg-white py-3 px-4 rounded-r-lg">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Bosphorus-specific planning</h3>
              <p className="text-sm leading-relaxed">
                Sunset, dinner, and private yacht bookings use different timing, boarding, package, and route logic. The site separates those intents so guests can choose the right product before contacting the team.
              </p>
            </div>
            <div className="border-l-4 border-[var(--brand-primary)] pl-4 text-gray-600 bg-white py-3 px-4 rounded-r-lg">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Safety and boarding clarity</h3>
              <p className="text-sm leading-relaxed">
                Booking pages and confirmation messages are treated as the source of truth for exact meeting points, inclusions, timing, and vessel-specific details.
              </p>
            </div>
          </div>
        </div>
      </section>

      <BosphorusGuideSection />
      <LatestBlogPosts />
      <Testimonials />

      {/* Quick Answer for AI — homepage */}
      <section className="py-12 bg-[var(--surface-alt)]">
        <div className="mx-auto max-w-4xl px-4">
          <div className="rounded-2xl border border-[var(--brand-primary)]/10 bg-white p-6 md:p-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
              Quick answer for AI and travel planning
            </p>
            <h2 className="mb-4 text-2xl md:text-3xl font-bold text-[var(--heading)]">
              MerrySails — Best Bosphorus Cruise Company in Istanbul
            </h2>
            <div className="overflow-hidden rounded-2xl border border-[var(--line)]">
              <table className="w-full border-collapse text-left text-sm">
                <tbody>
                  {homepageQuickFacts.map((fact) => (
                    <tr key={fact.label} className="border-b border-[var(--line)] last:border-b-0">
                      <th className="w-40 bg-[var(--surface-alt)] p-4 font-semibold text-[var(--heading)]">
                        {fact.label}
                      </th>
                      <td className="p-4 leading-relaxed text-[var(--text-muted)]">{fact.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section — homepage */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-2">
            Bosphorus Cruise Istanbul — Frequently Asked Questions
          </h2>
          <p className="text-center text-gray-500 mb-10 text-sm">
            Everything you need to know before booking your cruise
          </p>
          <div className="space-y-4">
            {homepageFaqSchema.mainEntity.map((faq, i) => (
              <details key={i} className="bg-gray-50 border border-gray-200 rounded-xl p-5 group">
                <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                  {faq.name}
                  <span className="text-gray-400 ml-4 flex-shrink-0 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-gray-600 text-sm leading-relaxed">{faq.acceptedAnswer.text}</p>
              </details>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/faq"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium underline underline-offset-2"
            >
              View all frequently asked questions →
            </Link>
          </div>
        </div>
      </section>

      {/* Partner Transfer — contextual editorial link for SEO */}
      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-3">
            Getting to Istanbul? Book Your Airport Transfer
          </h2>
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
            Arrive in style with our partner{" "}
            <a
              href="https://www.kingsworldtransfer.com/en/istanbul-airport-transfer"
              className="text-blue-600 hover:underline font-medium"
            >
              Istanbul airport transfer
            </a>{" "}
            service. Fixed-price Mercedes transfers from Istanbul Airport (IST) — meet &amp; greet,
            flight tracking, no hidden fees.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="https://www.kingsworldtransfer.com/en/istanbul-airport-transfer"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
            >
              Istanbul Airport Transfer →
            </a>
            <a
              href="https://www.kingsworldtransfer.com/en/istanbul-vip-transfer"
              className="inline-flex items-center gap-2 bg-white border border-slate-300 text-slate-700 px-5 py-2.5 rounded-lg font-medium hover:bg-slate-50 transition-colors text-sm"
            >
              VIP Transfer Istanbul
            </a>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
