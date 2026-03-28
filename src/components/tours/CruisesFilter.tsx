"use client";

import { useState } from "react";
import TourCard from "@/components/tours/TourCard";
import type { Tour } from "@/data/tours";

const categories = [
  { label: "All", value: "all" },
  { label: "Cruises", value: "cruise" },
  { label: "Private Yacht", value: "private" },
  { label: "Events", value: "event" },
  { label: "Tours", value: "tour" },
];

export default function CruisesFilter({ tours }: { tours: Tour[] }) {
  const [active, setActive] = useState("all");

  const filtered = active === "all" ? tours : tours.filter((t) => t.category === active);

  return (
    <>
      {/* Filter tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActive(cat.value)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              active === cat.value
                ? "bg-[var(--brand-primary)] text-white shadow-md"
                : "bg-white text-[var(--body-text)] hover:bg-gray-100"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </>
  );
}
