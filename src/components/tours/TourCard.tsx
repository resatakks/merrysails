import Image from "next/image";
import Link from "next/link";
import { Tour } from "@/data/tours";
import { Clock } from "lucide-react";

interface TourCardProps {
  tour: Tour;
}

export default function TourCard({ tour }: TourCardProps) {
  return (
    <Link href={`/cruises/${tour.slug}`} className="tour-card block">
      {/* Image */}
      <div className="tour-card-image relative aspect-[3/4] overflow-hidden">
        <Image
          src={tour.image}
          alt={tour.nameEn}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Overlay */}
        <div className="overlay absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Content */}
        <div className="content absolute bottom-0 left-0 right-0 p-5">
          {/* Badge */}
          {tour.badge && (
            <span
              className={`inline-block rounded-full px-3 py-1 text-xs font-bold uppercase mb-2 ${tour.badgeColor}`}
            >
              {tour.badge}
            </span>
          )}

          {/* Name */}
          <h3 className="text-white font-bold text-lg leading-snug">{tour.nameEn}</h3>
          <p className="text-white/70 text-sm mt-0.5">{tour.name}</p>

          {/* Price */}
          <div className="mt-2">
            {tour.originalPriceEur ? (
              <span className="text-secondary font-bold">
                €{tour.priceEur}{" "}
                <s className="text-white/50 font-normal text-sm">€{tour.originalPriceEur}</s>
              </span>
            ) : (
              <span className="text-secondary font-bold">From €{tour.priceEur}</span>
            )}
          </div>

          {/* Duration */}
          <div className="flex items-center gap-1 text-white/60 text-xs mt-2">
            <Clock className="w-3.5 h-3.5" />
            <span>{tour.duration}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
