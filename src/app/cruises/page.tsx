import type { Metadata } from "next";
import Image from "next/image";
import TourCard from "@/components/tours/TourCard";
import { tours } from "@/data/tours";

export const metadata: Metadata = {
  title: "Our Cruises — Bosphorus Cruise & Boat Tours",
  description: "Istanbul Bosphorus sunset cruise, dinner cruise, breakfast cruise, private yacht charter and more. Book now at the best prices.",
};

export default function CruisesPage() {
  return (
    <>
      <section className="relative h-72 md:h-80 flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1920&q=80"
          alt="Istanbul Bosphorus Cruises"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/70" />
        <div className="relative z-10 text-center px-5">
          <p className="text-secondary font-medium tracking-[0.15em] uppercase text-sm mb-3">Explore</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white">Our Cruises</h1>
          <p className="text-white/60 text-lg mt-3 max-w-lg mx-auto">
            Bosphorus cruise experiences for every taste and budget
          </p>
        </div>
      </section>

      <section className="bg-white border-b border-border">
        <div className="max-w-[1290px] mx-auto px-5 py-4">
          <div className="flex flex-wrap items-center gap-2">
            {["All", "Cruise", "Private Yacht", "Events", "Day Tour"].map((filter, i) => (
              <button
                key={filter}
                className={`filter-pill ${i === 0 ? "!bg-primary !text-white !border-primary" : ""}`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-bg-secondary">
        <div className="max-w-[1290px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
