"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Grid3X3,
  List,
  Search,
  ChevronDown,
  Star,
  Clock,
  Users,
  SlidersHorizontal,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import TourCard from "@/components/tours/TourCard";
import type { Tour } from "@/data/tours";
import { getDiscountedPrice } from "@/lib/promo";

/* -- Constants -- */

const categories = [
  { label: "All", value: "all" },
  { label: "Cruises", value: "cruise" },
  { label: "Private Yacht", value: "private" },
  { label: "Events", value: "event" },
  { label: "Tours", value: "tour" },
  { label: "Organizations", value: "organization" },
] as const;

type SortOption = "popular" | "price-asc" | "price-desc" | "rating";

const sortOptions: { label: string; value: SortOption }[] = [
  { label: "Popular", value: "popular" },
  { label: "Price: Low \u2192 High", value: "price-asc" },
  { label: "Price: High \u2192 Low", value: "price-desc" },
  { label: "Top Rated", value: "rating" },
];

/* -- Helpers -- */

function getDisplayPrice(tour: Tour) {
  return getDiscountedPrice(tour.priceEur);
}

/* -- Component -- */

export default function CruisesFilter({ tours }: { tours: Tour[] }) {
  const [active, setActive] = useState("all");
  const [sort, setSort] = useState<SortOption>("popular");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sortOpen, setSortOpen] = useState(false);
  const [query, setQuery] = useState("");
  const sortRef = useRef<HTMLDivElement>(null);

  // Close sort dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
    }
    if (sortOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [sortOpen]);

  const filtered = useMemo(() => {
    let result =
      active === "all"
        ? [...tours]
        : tours.filter((t) => t.category === active);

    // text search
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      result = result.filter((t) => t.nameEn.toLowerCase().includes(q));
    }

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => getDisplayPrice(a) - getDisplayPrice(b));
        break;
      case "price-desc":
        result.sort((a, b) => getDisplayPrice(b) - getDisplayPrice(a));
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "popular":
      default:
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    return result;
  }, [active, sort, tours, query]);

  const currentSort = sortOptions.find((s) => s.value === sort)!;

  return (
    <div className="space-y-6">
      {/* -- Search + Category bar -- */}
      <div className="flex flex-col gap-4">
        {/* Search */}
        <div className="relative max-w-md mx-auto w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--body-text)] opacity-50" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tours..."
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-[var(--line)] bg-white text-sm text-[var(--body-text)] placeholder:text-[var(--body-text)]/40 focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/30 focus:border-[var(--brand-primary)] transition-all"
          />
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActive(cat.value)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                active === cat.value
                  ? "bg-[var(--brand-primary)] text-white shadow-md shadow-[var(--brand-primary)]/25"
                  : "bg-white text-[var(--body-text)] hover:bg-[var(--surface-alt)] border border-[var(--line)]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* -- Toolbar -- */}
      <div className="flex items-center justify-between">
        {/* Results count */}
        <p className="text-sm text-[var(--body-text)]">
          Showing{" "}
          <span className="font-semibold text-[var(--heading)]">
            {filtered.length}
          </span>{" "}
          cruises &amp; tours
        </p>

        <div className="flex items-center gap-2">
          {/* Sort dropdown */}
          <div className="relative" ref={sortRef}>
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 px-3.5 py-2 bg-white rounded-lg border border-[var(--line)] text-sm font-medium text-[var(--body-text)] hover:bg-[var(--surface-alt)] transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 opacity-50" />
              <span className="hidden sm:inline">{currentSort.label}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 opacity-50 transition-transform duration-200 ${
                  sortOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {sortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-1.5 bg-white rounded-xl shadow-xl border border-[var(--line)] py-1 z-30 min-w-[180px]"
                >
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setSort(opt.value);
                        setSortOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        sort === opt.value
                          ? "bg-[var(--brand-primary)]/5 text-[var(--brand-primary)] font-semibold"
                          : "text-[var(--body-text)] hover:bg-[var(--surface-alt)]"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* View toggle -- hidden on mobile */}
          <div className="hidden md:flex items-center bg-white rounded-lg border border-[var(--line)] p-0.5">
            <button
              onClick={() => setView("grid")}
              className={`p-2 rounded-md transition-colors ${
                view === "grid"
                  ? "bg-[var(--brand-primary)] text-white"
                  : "text-[var(--body-text)] opacity-50 hover:opacity-100"
              }`}
              aria-label="Grid view"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-2 rounded-md transition-colors ${
                view === "list"
                  ? "bg-[var(--brand-primary)] text-white"
                  : "text-[var(--body-text)] opacity-50 hover:opacity-100"
              }`}
              aria-label="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* -- Tour listings -- */}
      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-20"
          >
            <p className="text-lg text-[var(--body-text)] opacity-60">
              No tours found.
            </p>
            <button
              onClick={() => {
                setActive("all");
                setQuery("");
              }}
              className="mt-3 text-[var(--brand-primary)] font-medium hover:underline"
            >
              Clear filters
            </button>
          </motion.div>
        ) : view === "grid" || typeof window !== "undefined" && window.innerWidth < 768 ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((tour, i) => (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
              >
                <TourCard tour={tour} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {filtered.map((tour, i) => (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
              >
                <TourListItem tour={tour} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* -- List view card -- */

const categoryLabel: Record<string, string> = {
  cruise: "Cruise",
  private: "Private Yacht",
  event: "Event",
  tour: "Tour",
  organization: "Organization",
};

function TourListItem({ tour }: { tour: Tour }) {
  const discountedPrice = getDiscountedPrice(tour.priceEur);

  return (
    <Link
      href={`/cruises/${tour.slug}`}
      className="group flex bg-white rounded-2xl overflow-hidden border border-[var(--line)] hover:shadow-xl hover:border-[var(--brand-primary)]/20 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative w-72 lg:w-80 shrink-0 aspect-[4/3]">
        <Image
          src={tour.image}
          alt={tour.nameEn}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="320px"
        />
        {/* Capacity badge */}
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-md flex items-center gap-1">
          <Users className="w-3 h-3" />
          {tour.capacity}
        </div>
        {/* Category badge */}
        <div className="absolute bottom-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-[var(--heading)] text-xs font-semibold px-2.5 py-1 rounded-md">
            {categoryLabel[tour.category] || tour.category}
          </span>
        </div>
      </div>

      {/* Center -- info */}
      <div className="flex-1 p-5 lg:p-6 flex flex-col justify-center min-w-0">
        <h3 className="text-lg font-bold text-[var(--heading)] group-hover:text-[var(--brand-primary)] transition-colors leading-snug mb-2 truncate">
          {tour.nameEn}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${
                i < Math.round(tour.rating)
                  ? "fill-[var(--brand-gold)] text-[var(--brand-gold)]"
                  : "text-[var(--line)]"
              }`}
            />
          ))}
          <span className="text-xs font-semibold text-[var(--heading)] ml-1">
            {tour.rating}
          </span>
          <span className="text-xs text-[var(--body-text)] opacity-50">
            ({tour.reviewCount} reviews)
          </span>
        </div>

        <p className="text-sm text-[var(--body-text)] opacity-75 line-clamp-2 mb-3">
          {tour.description}
        </p>

        <div className="flex items-center gap-3 text-xs text-[var(--body-text)] opacity-60">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {tour.duration}
          </span>
        </div>
      </div>

      {/* Right -- price + CTA */}
      <div className="w-44 shrink-0 border-l border-[var(--line)] p-5 lg:p-6 flex flex-col items-end justify-center gap-3">
        <div className="text-right">
          <span className="block text-sm text-[var(--body-text)] line-through opacity-50">
            €{tour.priceEur}
          </span>
          <span className="block text-2xl font-bold text-[var(--heading)]">
            €{discountedPrice}
          </span>
          <span className="text-xs text-[var(--body-text)] opacity-40">
            per person
          </span>
        </div>
        <span className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[var(--brand-primary)] text-white text-sm font-semibold group-hover:shadow-lg group-hover:shadow-[var(--brand-primary)]/25 transition-all duration-200">
          Explore
        </span>
      </div>
    </Link>
  );
}
