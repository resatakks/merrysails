import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import TourGrid from "@/components/home/TourGrid";
import FeaturedTour from "@/components/home/FeaturedTour";
import WhyUs from "@/components/home/WhyUs";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";
import LatestBlogPosts from "@/components/home/LatestBlogPosts";
import BosphorusGuideSection from "@/components/home/BosphorusGuideSection";
import Link from "next/link";
import { tours } from "@/data/tours";

export const metadata: Metadata = {
  title: "Bosphorus Cruise Istanbul | Private Yacht & Dinner Cruises 2026",
  description:
    "Book the best Bosphorus cruise in Istanbul for 2026. Sunset cruises from €40, dinner cruises with Turkish night show, private yacht charter & boat tours. TURSAB licensed since 2001. Best price guarantee — book online today.",
  keywords: [
    "bosphorus cruise",
    "bosphorus cruise istanbul",
    "istanbul cruise",
    "bosphorus sunset cruise",
    "istanbul dinner cruise",
    "yacht charter istanbul",
    "boat tour istanbul",
    "bosphorus boat tour",
    "istanbul boat trip",
    "bosphorus short cruise",
    "bosphorus sightseeing cruise",
    "boat hire istanbul",
    "bosphorus cruise 2026",
    "istanbul boat tour 2026",
    "book bosphorus cruise online",
    "best bosphorus cruise istanbul",
  ],
  alternates: { canonical: "https://merrysails.com" },
  openGraph: {
    title: "Bosphorus Cruise Istanbul | Private Yacht & Dinner Cruises 2026",
    description:
      "Sunset cruises from €40, dinner cruises with Turkish night show, private yacht charter & boat tours. TURSAB licensed since 2001. Book online — best price guarantee.",
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
  potentialAction: {
    "@type": "SearchAction",
    target: "https://merrysails.com/blog?q={search_term_string}",
    "query-input": "required name=search_term_string",
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
        name: "Bosphorus Sightseeing Cruise",
        price: "15",
        priceCurrency: "EUR",
        url: "https://merrysails.com/bosphorus-cruise",
      },
      {
        "@type": "Offer",
        name: "Istanbul Dinner Cruise",
        price: "65",
        priceCurrency: "EUR",
        url: "https://merrysails.com/istanbul-dinner-cruise",
      },
      {
        "@type": "Offer",
        name: "Boat Rental Istanbul",
        price: "280",
        priceCurrency: "EUR",
        url: "https://merrysails.com/boat-rental-istanbul",
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
        text: "Most Bosphorus cruises include a guided sailing through the strait passing iconic landmarks like Dolmabahçe Palace, Ortaköy Mosque, and the Bosphorus Bridges. Our sunset cruise (€40) includes welcome drinks, live commentary, and Wi-Fi. The dinner cruise (€65) adds an open buffet dinner, unlimited local drinks, live Turkish music and dance show, and hotel pickup/drop-off. Private yacht charters include a dedicated captain and crew, and a fully customisable route.",
      },
    },
    {
      "@type": "Question",
      name: "How long is the Bosphorus cruise?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Bosphorus cruise durations vary by type: the sightseeing cruise is 1.5–2 hours; the sunset cruise is approximately 2.5 hours; the dinner cruise is 3–3.5 hours including hotel pickup. Private yacht charters start from 2 hours and can be extended to a full day.",
      },
    },
    {
      "@type": "Question",
      name: "Where does the Bosphorus cruise depart from?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MerrySails cruises depart from Ortaköy Marina and Eminönü Pier in Istanbul. Hotel pickup is included with the dinner cruise from all major areas including Taksim, Sultanahmet, Beşiktaş, Şişli, and Kadıköy.",
      },
    },
    {
      "@type": "Question",
      name: "What is the price of a Bosphorus cruise in Istanbul?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Bosphorus cruise prices start from €15 per person for a standard sightseeing cruise. Sunset cruises are from €40. Dinner cruises with all-inclusive food and drinks are from €65. Private yacht charter prices start from €280 for a 2-hour charter for up to 15 guests.",
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
            Choose the right Bosphorus experience without guesswork
          </h2>
          <p className="mx-auto max-w-3xl text-center text-sm text-gray-600 mb-8">
            These are the three pages that matter most when guests compare a shared dinner cruise, a private boat rental, or a higher-end yacht charter.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                href: "/istanbul-dinner-cruise",
                eyebrow: "Best value",
                title: "Istanbul Dinner Cruise",
                description: "From €65 per person with dinner, unlimited local drinks, Turkish night show, and hotel transfer.",
              },
              {
                href: "/boat-rental-istanbul",
                eyebrow: "Private groups",
                title: "Boat Rental Istanbul",
                description: "From €280 total for private groups, proposals, birthdays, and flexible Bosphorus routes.",
              },
              {
                href: "/yacht-charter-istanbul",
                eyebrow: "Higher ticket",
                title: "Yacht Charter Istanbul",
                description: "Private yacht packages with catering upgrades, event setup, and premium crew service.",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-gray-200 bg-[var(--surface-alt)] p-5 transition-colors hover:border-[var(--brand-primary)] hover:bg-white"
              >
                <p className="text-sm font-semibold text-[var(--brand-primary)] mb-2">{item.eyebrow}</p>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{item.description}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-[var(--brand-primary)]">
                  Open page →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-[var(--surface-alt)]">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-3">
            Choose the Right Page for the Occasion
          </h2>
          <p className="mx-auto max-w-3xl text-center text-sm text-gray-600 mb-8">
            The booking path becomes clearer when the guest already knows whether the plan is a proposal, private dinner, corporate event, or flexible private celebration.
          </p>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                href: "/proposal-yacht-rental-istanbul",
                title: "Proposal Yacht Rental",
                description: "For guests comparing private setup, route privacy, and photography-friendly timing.",
              },
              {
                href: "/private-bosphorus-dinner-cruise",
                title: "Private Dinner Cruise",
                description: "The stronger fit for couples, families, and private groups who want dinner without sharing the boat.",
              },
              {
                href: "/corporate-events",
                title: "Corporate Events",
                description: "For companies that need guest flow, branded setup, and clear event-format planning.",
              },
              {
                href: "/private-events",
                title: "Private Events",
                description: "Best for birthdays, anniversaries, and flexible celebrations that need a custom package.",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-gray-200 bg-white p-5 transition-colors hover:border-[var(--brand-primary)] hover:bg-white"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{item.description}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-[var(--brand-primary)]">
                  Open page →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-3">
            Start With the Occasion, Then Match the Page
          </h2>
          <p className="mx-auto max-w-3xl text-center text-sm text-gray-600 mb-8">
            Proposal, private dinner, corporate hosting, and private celebrations should not all
            land on the same quote path. These are the pages that narrow the choice fastest.
          </p>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                href: "/proposal-yacht-rental-istanbul",
                eyebrow: "Romantic option",
                title: "Proposal Yacht Rental",
                description:
                  "Best when privacy, timing, decoration, and the reveal moment matter more than a generic charter quote.",
              },
              {
                href: "/private-bosphorus-dinner-cruise",
                eyebrow: "Dinner-led",
                title: "Private Dinner Cruise",
                description:
                  "Best when the booking is really about a private dining experience, not a shared dinner boat.",
              },
              {
                href: "/corporate-events",
                eyebrow: "B2B / hosted",
                title: "Corporate Events",
                description:
                  "Best for AV, catering, branded setup, and guest-flow planning for company bookings.",
              },
              {
                href: "/private-events",
                eyebrow: "Celebration-led",
                title: "Private Events",
                description:
                  "Best for birthdays, anniversaries, and flexible celebration formats that need custom package logic.",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-gray-200 bg-[var(--surface-alt)] p-5 transition-colors hover:border-[var(--brand-primary)] hover:bg-white"
              >
                <p className="text-sm font-semibold text-[var(--brand-primary)] mb-2">{item.eyebrow}</p>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{item.description}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-[var(--brand-primary)]">
                  Open page →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-3">
            Choose the Right Bosphorus Experience
          </h2>
          <p className="mx-auto max-w-3xl text-center text-sm text-gray-600 mb-8">
            If you already know whether you need a yacht charter, boat rental, proposal setup, private dinner, or corporate hosting,
            these pages will take you to the right option faster.
          </p>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[
              {
                href: "/yacht-charter-istanbul",
                title: "yacht charter istanbul",
                description: "Best for higher-ticket private charters, premium crew service, and larger custom packages.",
              },
              {
                href: "/boat-rental-istanbul",
                title: "boat rental istanbul",
                description: "Best for lighter private bookings where flexibility matters more than a fully premium yacht-led setup.",
              },
              {
                href: "/proposal-yacht-rental-istanbul",
                title: "proposal yacht rental",
                description: "Best when timing, privacy, decoration, and photography planning matter more than a generic boat quote.",
              },
              {
                href: "/private-bosphorus-dinner-cruise",
                title: "private dinner cruise",
                description: "Best when the booking is fundamentally about private dining on the Bosphorus rather than a broader event format.",
              },
              {
                href: "/corporate-events",
                title: "corporate yacht event",
                description: "Best for B2B hosting, AV setup, guest flow, catering structure, and team or client entertainment.",
              },
              {
                href: "/private-events",
                title: "birthday / private event boat",
                description: "Best for birthdays, anniversaries, and flexible celebration formats that need a custom event route.",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-gray-200 bg-[var(--surface-alt)] p-5 transition-colors hover:border-[var(--brand-primary)] hover:bg-white"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{item.description}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-[var(--brand-primary)]">
                  Open page →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FeaturedTour tour={tours[0]} />
      <FeaturedTour tour={tours[1]} reverse />
      <FeaturedTour tour={tours[2]} />
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
