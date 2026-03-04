import Image from "next/image";
import Link from "next/link";
import type { Tour } from "@/data/tours";

export default function TourCard({ tour }: { tour: Tour }) {
  return (
    <Link href={`/cruises/${tour.slug}`} className="tour-card block group">
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image src={tour.image} alt={tour.name} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
        <div className="overlay" />
        <div className="content">
          <h3 className="text-white text-lg md:text-xl font-bold leading-snug drop-shadow-lg">{tour.nameEn}</h3>
          <p className="text-white/60 text-sm mt-1">{tour.name}</p>
        </div>
      </div>
    </Link>
  );
}
