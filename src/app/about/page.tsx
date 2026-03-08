import Image from "next/image";
import { Anchor, Award, Users, Ship } from "lucide-react";

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
  "@type": "LocalBusiness",
  "@id": "https://merrysails.com/#organization",
  name: "MerrySails — Merry Tourism",
  alternateName: "Merry Tourism",
  description: "TURSAB-licensed A Group travel agency offering Bosphorus cruises, dinner cruises, yacht charter, and boat tours in Istanbul since 2001.",
  url: "https://merrysails.com",
  telephone: "+905370406822",
  email: "info@merrysails.com",
  foundingDate: "2001",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Alemdar Mah. Divanyolu Cad. Oğul Han No:62 İç Kapı No: 402",
    addressLocality: "Fatih",
    addressRegion: "Istanbul",
    postalCode: "34093",
    addressCountry: "TR",
  },
  geo: { "@type": "GeoCoordinates", latitude: 41.0082, longitude: 28.9784 },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    opens: "09:00",
    closes: "22:00",
  },
  image: "https://merrysails.com/og-image.jpg",
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "2847", bestRating: "5", worstRating: "1" },
  priceRange: "€15 — €680",
  currenciesAccepted: "EUR, USD, TRY",
  paymentAccepted: "Cash, Credit Card, Bank Transfer",
  areaServed: { "@type": "City", name: "Istanbul" },
  knowsAbout: ["Bosphorus Cruises", "Yacht Charter", "Dinner Cruise", "Sunset Cruise", "Boat Tours"],
  hasCredential: { "@type": "EducationalOccupationalCredential", credentialCategory: "TURSAB A Group License" },
};

export default function AboutPage() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />
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
      </div>
    </div>
    </>
  );
}
