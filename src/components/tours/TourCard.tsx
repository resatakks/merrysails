"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Users, ArrowRight } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import type { Tour } from "@/data/tours";

interface TourCardProps {
  tour: Tour;
  featured?: boolean;
}

export default function TourCard({ tour, featured = false }: TourCardProps) {
  return (
    <Link
      href={`/cruises/${tour.slug}`}
      className={cn(
        "group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1",
        featured && "md:col-span-2 md:grid md:grid-cols-2"
      )}
    >
      <div className={cn("relative overflow-hidden", featured ? "h-64 md:h-full" : "h-56")}>
        <Image
          src={tour.image}
          alt={tour.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <span className={cn("absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold", tour.badgeColor)}>
          {tour.badge}
        </span>
        <div className="absolute bottom-4 right-4 glass-dark rounded-lg px-3 py-1.5">
          <span className="text-white font-mono font-bold text-lg">{formatPrice(tour.priceEur)}</span>
          <span className="text-white/60 text-xs ml-1">/ kişi</span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-heading text-xl font-bold text-deep-navy group-hover:text-sunset transition-colors">
          {tour.name}
        </h3>
        <p className="text-gray-500 text-sm mt-2 line-clamp-2">{tour.description}</p>
        <div className="flex items-center gap-4 mt-4 text-sm text-gray-400">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {tour.duration}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {tour.capacity}
          </span>
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="flex flex-wrap gap-1">
            {tour.includes.slice(0, 2).map((item) => (
              <span key={item} className="text-xs bg-cream text-ocean-blue px-2 py-0.5 rounded-full">
                {item}
              </span>
            ))}
            {tour.includes.length > 2 && (
              <span className="text-xs text-gray-400">+{tour.includes.length - 2}</span>
            )}
          </div>
          <span className="text-sunset group-hover:translate-x-1 transition-transform">
            <ArrowRight className="w-5 h-5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
