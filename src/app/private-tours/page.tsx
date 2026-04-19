import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getTourPath, isCoreProduct, tours } from "@/data/tours";

export const metadata = {
  title: "Private Yacht Charter & Events — Bosphorus Istanbul",
  description:
    "Explore private yacht charter and event pages from MerrySails for proposals, birthdays, weddings, celebrations, and corporate requests.",
  keywords: [
    "private yacht istanbul",
    "yacht charter bosphorus",
    "marriage proposal yacht",
    "yacht birthday party istanbul",
    "yacht wedding bosphorus",
    "corporate event yacht istanbul",
    "bachelorette party yacht",
  ],
  alternates: { canonical: "https://merrysails.com/private-tours" },
  openGraph: {
    title: "Private Yacht Charter & Events — Bosphorus Istanbul",
    description:
      "Private yacht charter and event pages from MerrySails for proposals, dinners, celebrations, and corporate requests.",
    url: "https://merrysails.com/private-tours",
    type: "website" as const,
    images: [{ url: "https://merrysails.com/og-image.jpg", width: 1200, height: 630, alt: "MerrySails — Bosphorus Cruise Istanbul" }],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Private Yacht Charter & Events in Istanbul",
  description: "Rent a private yacht on the Bosphorus for marriage proposals, birthday parties, weddings, bachelorette parties, and corporate events with flexible packages.",
  provider: {
    "@id": "https://merrysails.com/#organization",
  },
  areaServed: { "@type": "City", name: "Istanbul" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
  name: "Private Yacht Packages",
  itemListElement: [
      { "@type": "Service", name: "Proposal Yacht Rental", description: "A private Bosphorus yacht experience for marriage proposals." },
      { "@type": "Service", name: "Private Dinner Cruise", description: "A dinner-first private yacht experience for Bosphorus evenings." },
      { "@type": "Service", name: "Corporate Yacht Events", description: "Private corporate hosting, client dinners, and company events on the Bosphorus." },
    ],
  },
};

const privateFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "How does private yacht charter work?", acceptedAnswer: { "@type": "Answer", text: "MerrySails keeps proposal, private dinner, celebration, and corporate requests on separate pages so you can go straight to the option that fits your plans." }},
    { "@type": "Question", name: "Can I organize a marriage proposal on a yacht?", acceptedAnswer: { "@type": "Answer", text: "Yes! We specialize in yacht marriage proposals on the Bosphorus. Our Romance package includes rose petal decoration, champagne, a professional photographer, and a violinist. We handle everything so you can focus on the moment." }},
    { "@type": "Question", name: "What events can I host on a private yacht?", acceptedAnswer: { "@type": "Answer", text: "You can host marriage proposals, birthday parties, bachelorette parties, wedding celebrations, wedding anniversaries, corporate events, and private dinner cruises. All events are fully customizable with add-on services." }},
  ],
};

export default function PrivateToursPage() {
  const orgTours = tours.filter((t) => t.category === "organization");
  const privateTours = tours.filter((t) => t.category === "private");

  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(privateFaqSchema) }} />
    <div className="pt-28 pb-20 bg-[var(--surface-alt)]">
      <div className="container-main">
        <div className="text-center mb-14">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Private Yacht Charter & Events in Istanbul</h1>
          <p className="text-[var(--text-muted)] max-w-2xl mx-auto text-lg">
            Rent a private yacht on the Bosphorus for marriage proposals, birthday parties,
            weddings, and corporate events. Use this page to find the right experience from
            MerrySails without having to sort through every option at once.
          </p>
        </div>

        {/* Organization Tours */}
        <h2 className="text-2xl font-bold mb-6">Yacht Events & Organizations on the Bosphorus</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {orgTours.map((tour) => (
            <Link key={tour.id} href={getTourPath(tour)} className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={tour.image}
                    alt={tour.nameEn}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`inline-block px-3 py-1 text-xs font-bold rounded-md ${tour.badgeColor}`}>
                      {tour.badge}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold mb-1 group-hover:text-[var(--brand-primary)] transition-colors">
                    {tour.nameEn}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] mb-3 line-clamp-2">{tour.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-[var(--heading)]">
                      {isCoreProduct(tour) ? "Main experience" : "Related option"}
                    </span>
                    <span className="text-sm text-[var(--brand-primary)] font-medium flex items-center gap-1">
                      View Details <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Private Yacht Tours */}
        <h2 className="text-2xl font-bold mb-6">Private Bosphorus Yacht Cruises</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {privateTours.map((tour) => (
            <Link key={tour.id} href={getTourPath(tour)} className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={tour.image}
                    alt={tour.nameEn}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`inline-block px-3 py-1 text-xs font-bold rounded-md ${tour.badgeColor}`}>
                      {tour.badge}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold mb-1 group-hover:text-[var(--brand-primary)] transition-colors">
                    {tour.nameEn}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] mb-3 line-clamp-2">{tour.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-[var(--heading)]">
                      {isCoreProduct(tour) ? "Main experience" : "Related option"}
                    </span>
                    <span className="text-sm text-[var(--brand-primary)] font-medium flex items-center gap-1">
                      View Details <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
