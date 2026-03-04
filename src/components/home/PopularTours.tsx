import TourCard from "@/components/tours/TourCard";
import { tours } from "@/data/tours";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PopularTours() {
  return (
    <section className="section">
      <div className="max-w-[1290px] mx-auto">
        <div className="text-center mb-14">
          <p className="text-gold font-semibold tracking-[0.2em] uppercase text-sm mb-3">Our Cruises</p>
          <h2 className="text-3xl md:text-4xl font-bold text-heading">Popular Bosphorus Cruises</h2>
          <p className="text-muted mt-4 max-w-lg mx-auto">Handpicked experiences from sunset tours to private yacht charters</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7">
          {tours.slice(0, 4).map((tour) => (<TourCard key={tour.id} tour={tour} />))}
        </div>
        <div className="text-center mt-12">
          <Link href="/cruises" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white py-3 px-8 rounded-full font-semibold text-sm transition-all hover:-translate-y-0.5 hover:shadow-lg">View All Cruises <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </div>
    </section>
  );
}
