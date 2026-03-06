import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { tours } from "@/data/tours";

export const metadata = {
  title: "Private Yacht Charter & Events on the Bosphorus — Marriage Proposal, Birthday, Wedding",
  description: "Book a private yacht on the Bosphorus for marriage proposals, birthday parties, weddings, corporate events, and bachelorette parties. Essential from €280, Premium €380, VIP €680. Customizable packages with add-on services.",
  alternates: { canonical: "https://merrysails.vercel.app/private-tours" },
};

export default function PrivateToursPage() {
  const orgTours = tours.filter((t) => t.category === "organization");
  const privateTours = tours.filter((t) => t.category === "private");

  return (
    <div className="pt-28 pb-20 bg-[var(--surface-alt)]">
      <div className="container-main">
        <div className="text-center mb-14">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Private Yacht Charter & Events in Istanbul</h1>
          <p className="text-[var(--text-muted)] max-w-2xl mx-auto text-lg">
            Rent a private yacht on the Bosphorus for marriage proposals, birthday parties,
            weddings, and corporate events. Essential from €280, Premium €380, VIP €680.
            Fully customizable with add-on services.
          </p>
        </div>

        {/* Organization Tours */}
        <h2 className="text-2xl font-bold mb-6">Yacht Events & Organizations on the Bosphorus</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {orgTours.map((tour) => (
            <Link key={tour.id} href={`/cruises/${tour.slug}`} className="group">
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
                    <span className="text-lg font-bold text-[var(--heading)]">From €{tour.priceEur}</span>
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
            <Link key={tour.id} href={`/cruises/${tour.slug}`} className="group">
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
                    <span className="text-lg font-bold text-[var(--heading)]">From €{tour.priceEur}</span>
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
  );
}
