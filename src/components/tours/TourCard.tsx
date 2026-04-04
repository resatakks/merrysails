"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, Star, Users } from "lucide-react";
import type { Tour } from "@/data/tours";
import { getDiscountedPrice } from "@/lib/promo";

const categoryLabel: Record<string, string> = {
  cruise: "Cruise",
  private: "Private Yacht",
  event: "Event",
  tour: "Tour",
  organization: "Organization",
};

export default function TourCard({ tour }: { tour: Tour }) {
  const discountedPrice = getDiscountedPrice(tour.priceEur);

  return (
    <Link
      href={`/cruises/${tour.slug}`}
      className="block group rounded-2xl overflow-hidden bg-white border border-[var(--line)] hover:shadow-xl hover:shadow-black/8 hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={tour.image}
          alt={`${tour.nameEn} — Book from €${discountedPrice} in Istanbul`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

        {/* Category badge — top left */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-block px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide rounded-md bg-white/90 backdrop-blur-sm text-[var(--heading)]">
            {categoryLabel[tour.category] || tour.category}
          </span>
        </div>

        {/* Original badge — top right */}
        {tour.badge && (
          <div className="absolute top-3 right-3 z-10">
            <span
              className={`inline-block px-2.5 py-1 text-xs font-bold rounded-md ${tour.badgeColor}`}
            >
              {tour.badge}
            </span>
          </div>
        )}

        {/* Capacity — small pill */}
        <div className="absolute top-12 left-3 z-10">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-md bg-black/50 backdrop-blur-sm text-white/90">
            <Users className="w-2.5 h-2.5" />
            {tour.capacity}
          </span>
        </div>

        {/* Content at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
          <h3 className="text-lg font-bold text-white mb-1 leading-tight group-hover:text-[var(--brand-gold)] transition-colors">
            {tour.nameEn}
          </h3>

          {/* Rating stars */}
          <div className="flex items-center gap-1 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.round(tour.rating)
                    ? "fill-[var(--brand-gold)] text-[var(--brand-gold)]"
                    : "text-white/30"
                }`}
              />
            ))}
            <span className="text-xs font-semibold text-white ml-1">
              {tour.rating}
            </span>
            <span className="text-[10px] text-white/50">
              ({tour.reviewCount})
            </span>
          </div>

          {/* Price + Duration row */}
          <div className="flex items-end justify-between">
            <div>
              <span className="text-sm text-white/50 line-through mr-2">
                €{tour.priceEur}
              </span>
              <span className="text-lg font-bold text-[var(--brand-gold)]">
                €{discountedPrice}
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-white/70">
              <Clock className="w-3.5 h-3.5" />
              {tour.duration}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
