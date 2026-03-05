"use client";

import { useState } from "react";
import { tours } from "@/data/tours";
import TourCard from "@/components/tours/TourCard";

const categories = ["All", "Cruises", "Private Yacht", "Events", "Tours"];

export default function CruisesPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTours =
    activeCategory === "All"
      ? tours
      : tours.filter((tour) => tour.category === activeCategory);

  return (
    <main>
      {/* Hero Banner */}
      <section className="min-h-[40vh] bg-primary flex items-center justify-center text-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Cruises &amp; Tours
          </h1>
          <p className="text-lg text-white/80">
            Discover Istanbul from the water
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="section">
        <div className="max-w-[1290px] mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full font-medium text-sm transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-white"
                    : "bg-bg text-heading hover:bg-primary/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Tour Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredTours.map((tour) => (
              <TourCard key={tour.slug} tour={tour} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
