import Image from "next/image";
import Link from "next/link";
import type { Tour } from "@/data/tours";
import { Clock, Users, MapPin, Languages, Check } from "lucide-react";

interface FeaturedTourProps {
  tour: Tour;
  reverse?: boolean;
}

export default function FeaturedTour({ tour, reverse = false }: FeaturedTourProps) {
  return (
    <div className="featured-grid">
      {/* Image Side */}
      <div
        className={`relative rounded-2xl overflow-hidden group ${
          reverse ? "lg:order-2" : "lg:order-1"
        }`}
      >
        <div className="aspect-[4/3] lg:aspect-auto lg:h-full relative">
          <Image
            src={tour.image}
            alt={tour.nameEn}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>

      {/* Content Side */}
      <div
        className={`flex flex-col justify-center py-6 lg:py-10 ${
          reverse ? "lg:order-1 lg:pr-12" : "lg:order-2 lg:pl-12"
        }`}
      >
        {/* Badge */}
        {tour.badge && (
          <span
            className={`inline-block self-start rounded-full px-4 py-1.5 text-xs font-semibold mb-4 ${tour.badgeColor}`}
          >
            {tour.badge}
          </span>
        )}

        {/* Title */}
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-heading mb-3">
          {tour.nameEn}
        </h2>

        {/* Description */}
        <p className="text-muted mb-6 leading-relaxed">{tour.descriptionEn}</p>

        {/* Spec Grid */}
        <div className="spec-grid grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2 text-sm text-muted">
            <Clock className="h-4 w-4 text-gold" />
            <div>
              <span className="block text-xs text-muted/60">Duration</span>
              <span className="font-medium text-heading">{tour.duration}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted">
            <Users className="h-4 w-4 text-gold" />
            <div>
              <span className="block text-xs text-muted/60">Capacity</span>
              <span className="font-medium text-heading">{tour.capacity}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted">
            <MapPin className="h-4 w-4 text-gold" />
            <div>
              <span className="block text-xs text-muted/60">Departure</span>
              <span className="font-medium text-heading">
                {tour.departurePoint}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted">
            <Languages className="h-4 w-4 text-gold" />
            <div>
              <span className="block text-xs text-muted/60">Guide</span>
              <span className="font-medium text-heading">Multi-language</span>
            </div>
          </div>
        </div>

        {/* Includes List */}
        <div className="mb-6">
          <ul className="space-y-2">
            {tour.includes.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-muted">
                <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Price Box */}
        <div className="price-box rounded-xl bg-primary p-5 mb-6 flex items-center justify-between">
          <div>
            <span className="text-3xl font-bold text-gold">€{tour.priceEur}</span>
            <span className="text-white/60 text-sm ml-1">/person</span>
          </div>
          <Link href={`/cruises/${tour.slug}`} className="btn-cta">
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}
