"use client";

import { useState } from "react";
import Link from "next/link";
import TourCard from "@/components/tours/TourCard";
import { tours } from "@/data/tours";

const categories = [
  { label: "All", value: "all" },
  { label: "Cruises", value: "cruise" },
  { label: "Private Yacht", value: "private" },
  { label: "Events", value: "event" },
  { label: "Tours", value: "tour" },
];

export default function CruisesPage() {
  const [active, setActive] = useState("all");

  const filtered = active === "all" ? tours : tours.filter((t) => t.category === active);

  return (
    <div className="pt-32 pb-20 bg-[var(--surface-alt)]">
      <div className="container-main">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Istanbul Bosphorus Cruises, Yacht Charter & Boat Tours</h1>
          <p className="text-[var(--text-muted)] max-w-xl mx-auto">
            Sunset cruises, dinner cruises with Turkish night, private yacht rental,
            and guided boat tours in Istanbul. Best price guaranteed — book direct.
          </p>
        </div>

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

        {/* SEO: Full tour index for search engine crawlers (all links rendered in HTML) */}
        <nav aria-label="All cruise and tour options" className="mt-16 border-t border-[var(--line)] pt-8">
          <h2 className="text-xl font-bold mb-4 text-[var(--heading)]">All Bosphorus Cruises & Tours</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
            {tours.map((tour) => (
              <li key={tour.slug}>
                <Link
                  href={`/cruises/${tour.slug}`}
                  className="text-sm text-[var(--body-text)] hover:text-[var(--brand-primary)] transition-colors"
                >
                  {tour.nameEn} — From €{tour.priceEur}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
