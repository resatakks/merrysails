import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TourCard from "@/components/tours/TourCard";
import { tours } from "@/data/tours";

export default function TourGrid() {
  const featured = tours.slice(0, 4);

  return (
    <section className="py-16 md:py-24 bg-[var(--surface-alt)]">
      <div className="container-main">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Istanbul Bosphorus Cruises</h2>
          <p className="text-[var(--text-muted)] max-w-xl mx-auto">
            Choose from our curated selection of Bosphorus experiences — from budget-friendly sightseeing to luxury private yachts.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/cruises"
            className="inline-flex items-center gap-2 text-[var(--brand-primary)] font-semibold hover:gap-3 transition-all"
          >
            View All Tours
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
