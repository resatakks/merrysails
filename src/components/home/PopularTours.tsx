import TourCard from "@/components/tours/TourCard";
import { tours } from "@/data/tours";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PopularTours() {
  const popularTours = tours.slice(0, 4);

  return (
    <section className="section-padding">
      <div className="max-w-[1290px] mx-auto">
        <div className="text-center mb-14">
          <p className="text-secondary font-semibold tracking-[0.2em] uppercase text-sm mb-3">Our Cruises</p>
          <h2 className="font-heading text-3xl md:text-[42px] font-bold text-heading leading-tight">
            Istanbul Bosphorus Cruises
          </h2>
          <p className="text-muted mt-5 max-w-xl mx-auto text-[17px]">
            Handpicked cruise experiences from sunset tours to private yacht charters.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {popularTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>

        <div className="text-center mt-14">
          <Link
            href="/cruises"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-white py-3.5 px-8 rounded-full font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            View All Cruises
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
