import { tours } from "@/data/tours";
import TourCard from "@/components/tours/TourCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function TourGrid() {
  const displayedTours = tours.slice(0, 4);

  return (
    <section className="section-padding">
      <div className="max-w-[1290px] mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-heading mb-4">
            Popüler Turlar
            <span className="block mx-auto mt-3 h-1 w-16 rounded-full bg-gold" />
          </h2>
          <p className="text-muted text-lg max-w-xl mx-auto">
            İstanbul&apos;un en çok tercih edilen deniz turları
          </p>
        </div>

        {/* Tour Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {displayedTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-10">
          <Link
            href="/cruises"
            className="inline-flex items-center gap-2 text-gold font-semibold hover:gap-3 transition-all"
          >
            View All Tours
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
