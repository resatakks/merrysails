import Link from "next/link";
import { tours } from "@/data/tours";
import TourCard from "@/components/tours/TourCard";
import { ArrowRight } from "lucide-react";

export default function TourGrid() {
  return (
    <section className="section bg-bg">
      <div className="max-w-[1290px] mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-heading text-3xl md:text-4xl font-bold mb-3">Popular Tours</h2>
          <p className="text-text-light text-lg">
            Discover our most popular Istanbul cruise experiences
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {tours.slice(0, 4).map((tour) => (
            <TourCard key={tour.slug} tour={tour} />
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-10">
          <Link
            href="/cruises"
            className="inline-flex items-center gap-2 text-primary hover:text-secondary font-semibold transition-colors"
          >
            View All Tours
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
