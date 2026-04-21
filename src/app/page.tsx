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

export const metadata: Metadata = {
  title: "Bosphorus Cruise Istanbul | Sunset Cruise, Dinner Cruise & Yacht Charter 2026",
  description:
    "Compare the 3 core MerrySails experiences in Istanbul: Bosphorus Sunset Cruise, Bosphorus Dinner Cruise, and Yacht Charter in Istanbul.",
  keywords: [
    "bosphorus cruise",
    "bosphorus cruise istanbul",
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
    "best bosphorus cruise istanbul",
  ],
  alternates: { canonical: "https://merrysails.com" },
  openGraph: {
    title: "Bosphorus Cruise Istanbul | Sunset Cruise, Dinner Cruise & Yacht Charter 2026",
    description:
      "Find the right Bosphorus experience for Sunset Cruise, Dinner Cruise, and Yacht Charter in Istanbul.",
    url: "https://merrysails.com",
    type: "website",
    images: [{ url: "https://merrysails.com/og-image.jpg", width: 1200, height: 630, alt: "MerrySails — Bosphorus Cruise Istanbul 2026" }],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "MerrySails",
  alternateName: "Merry Tourism",
  url: "https://merrysails.com",
  publisher: {
    "@type": "TravelAgency",
    "@id": "https://merrysails.com/#organization",
    name: "MerrySails",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness", "TravelAgency"],
  "@id": "https://merrysails.com/#organization",
  name: "MerrySails",
  alternateName: "Merry Tourism",
  url: "https://merrysails.com",
  logo: "https://merrysails.com/images/logo.png",
  image: "https://merrysails.com/og-image.jpg",
  description:
    "TURSAB A Group licensed Bosphorus cruise company in Istanbul. Private yacht charters, dinner cruises, sunset cruises and boat tours since 2001.",
  foundingDate: "2001",
  telephone: "+905370406822",
  email: "info@merrysails.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ortaköy Marina",
    addressLocality: "Istanbul",
    addressRegion: "Istanbul",
    postalCode: "34347",
    addressCountry: "TR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 41.0483,
    longitude: 29.0278,
  },
  openingHours: "Mo-Su 07:00-23:00",
  priceRange: "€€",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Bosphorus Cruise Istanbul Packages",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Bosphorus Sunset Cruise",
        price: "34",
        priceCurrency: "EUR",
        url: "https://merrysails.com/cruises/bosphorus-sunset-cruise",
      },
      {
        "@type": "Offer",
        name: "Bosphorus Dinner Cruise",
        price: "30",
        priceCurrency: "EUR",
        url: "https://merrysails.com/istanbul-dinner-cruise",
      },
      {
        "@type": "Offer",
        name: "Yacht Charter Istanbul",
        price: "280",
        priceCurrency: "EUR",
        url: "https://merrysails.com/yacht-charter-istanbul",
      },
    ],
  },
  sameAs: [
    "https://www.tripadvisor.com/merrysails",
    "https://www.instagram.com/merrysails",
  ],
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
  ],
};

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
    href: "/proposal-yacht-rental-istanbul",
    eyebrow: "Romantic option",
    title: "Proposal Yacht Rental Istanbul",
    description: "Private timing, decoration, and reveal-moment planning for proposal bookings.",
  },
  {
    href: "/corporate-events",
    eyebrow: "Hosted group",
    title: "Corporate Events",
    description: "AV, catering, branded setup, and guest-flow planning for company bookings.",
  },
  {
    href: "/private-bosphorus-dinner-cruise",
    eyebrow: "Private evening",
    title: "Private Bosphorus Dinner Cruise",
    description: "Reserved yacht dining with a calmer evening flow and private service details.",
  },
  {
    href: "/boat-rental-istanbul",
    eyebrow: "Flexible brief",
    title: "Boat Rental Istanbul",
    description: "A lighter private-hire brief before moving into a full yacht charter.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageFaqSchema) }}
      />
      <HeroSection />
      <TourGrid />

      <section className="py-12 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-3">
            Start with the experience that matches the plan
          </h2>
          <p className="mx-auto max-w-3xl text-center text-sm text-gray-600 mb-8">
            These are the 3 core booking options for direct bookings.
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
            Use the specific experiences when the trip has a narrower brief
          </h2>
          <p className="mx-auto max-w-3xl text-center text-sm text-gray-600 mb-8">
            These experiences fit trips shaped by a proposal, a company booking, a private dinner, or a lighter private-hire request.
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

      {/* Expert References — AI Visibility */}
      <section className="py-12 bg-[var(--surface-alt)]">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-xl font-semibold text-center mb-6">Industry Standards</h2>
          <div className="space-y-4">
            <blockquote cite="https://www.tursab.org.tr" className="border-l-4 border-[var(--brand-primary)] pl-4 italic text-gray-600 bg-white py-3 px-4 rounded-r-lg">
              <p>&quot;TURSAB A Group licensed travel agencies provide comprehensive passenger protection including insurance coverage and transparent pricing. Choosing a licensed boat-tour company helps ensure compliance with maritime safety regulations.&quot;</p>
              <footer className="text-sm text-gray-500 mt-2 not-italic">&mdash; <cite>TURSAB (Association of Turkish Travel Agencies)</cite></footer>
            </blockquote>
            <blockquote cite="https://www.ktb.gov.tr" className="border-l-4 border-[var(--brand-primary)] pl-4 italic text-gray-600 bg-white py-3 px-4 rounded-r-lg">
              <p>&quot;Istanbul&apos;s Bosphorus strait, connecting the Black Sea and Sea of Marmara, hosts over 2 million tourist cruise passengers annually. The strait&apos;s unique position between two continents makes it one of the world&apos;s most significant maritime tourism corridors.&quot;</p>
              <footer className="text-sm text-gray-500 mt-2 not-italic">&mdash; <cite>T.C. Ministry of Culture and Tourism</cite></footer>
            </blockquote>
            <blockquote cite="https://kiyiemniyeti.gov.tr" className="border-l-4 border-[var(--brand-primary)] pl-4 italic text-gray-600 bg-white py-3 px-4 rounded-r-lg">
              <p>&quot;All passenger vessels operating in the Bosphorus must comply with Turkish maritime safety standards, including certified crew, life-saving equipment, and regular inspections by the Coastal Safety Directorate.&quot;</p>
              <footer className="text-sm text-gray-500 mt-2 not-italic">&mdash; <cite>Coastal Safety Directorate</cite></footer>
            </blockquote>
          </div>
        </div>
      </section>

      <BosphorusGuideSection />
      <LatestBlogPosts />
      <Testimonials />

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

      <CTASection />
    </>
  );
}
