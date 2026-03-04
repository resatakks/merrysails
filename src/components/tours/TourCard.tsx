import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";

interface TourCardProps {
  tour: {
    slug: string;
    name: string;
    nameEn: string;
    image: string;
    badge: string;
    badgeColor: string;
    priceEur: number;
    duration: string;
  };
}

export default function TourCard({ tour }: TourCardProps) {
  return (
    <Link href={`/cruises/${tour.slug}`} className="tour-card group block">
      <div className="tour-card-image relative aspect-[3/4] overflow-hidden rounded-2xl">
        <Image
          src={tour.image}
          alt={tour.nameEn}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Content at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          {/* Badge */}
          {tour.badge && (
            <span
              className={`inline-block rounded-full px-3 py-1 text-xs font-semibold mb-3 ${tour.badgeColor}`}
            >
              {tour.badge}
            </span>
          )}

          {/* Tour name (English) */}
          <h3 className="text-white font-bold text-lg leading-snug mb-1">
            {tour.nameEn}
          </h3>

          {/* Tour name (Turkish) */}
          <p className="text-white/70 text-sm mb-3">{tour.name}</p>

          {/* Price & Duration */}
          <div className="flex items-center justify-between">
            <span className="text-white font-semibold">
              From €{tour.priceEur}
            </span>
            <span className="flex items-center gap-1 text-white/60 text-sm">
              <Clock className="h-3.5 w-3.5" />
              {tour.duration}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
