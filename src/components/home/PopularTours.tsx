import TourCard from "@/components/tours/TourCard";
import { tours } from "@/data/tours";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PopularTours() {
  const popularTours = tours.slice(0, 4);

  return (
    <section className="section-padding bg-bg-secondary">
      <div className="max-w-[1290px] mx-auto">
        <div className="text-center mb-12">
          <p className="text-secondary font-medium tracking-[0.15em] uppercase text-sm mb-3">Our Cruises</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-heading">
            Istanbul Bosphorus Cruises
          </h2>
          <p className="text-muted mt-4 max-w-xl mx-auto">
            Discover our handpicked Bosphorus cruise experiences. From sunset tours to private yacht charters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/cruises" className="inline-flex items-center gap-2 text-accent hover:text-accent-hover font-semibold transition-colors text-lg">
            View All Cruises
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
