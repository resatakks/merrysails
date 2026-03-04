import type { Metadata } from "next";
import Image from "next/image";
import TourCard from "@/components/tours/TourCard";
import { tours } from "@/data/tours";

export const metadata: Metadata = { title: "Our Cruises" };

export default function CruisesPage() {
  return (
    <>
      <section className="relative h-64 md:h-80 flex items-center justify-center">
        <Image src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1920&q=80" alt="Cruises" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-dark/70" />
        <div className="relative z-10 text-center px-5">
          <h1 className="text-white text-3xl md:text-5xl font-bold">Our Cruises</h1>
          <p className="text-white/60 mt-3">Bosphorus experiences for every taste</p>
        </div>
      </section>
      <section className="section">
        <div className="max-w-[1290px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">{tours.map((t) => <TourCard key={t.id} tour={t} />)}</div>
        </div>
      </section>
    </>
  );
}
