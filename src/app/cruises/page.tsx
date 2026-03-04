import type { Metadata } from "next";
import Image from "next/image";
import TourCard from "@/components/tours/TourCard";
import { tours } from "@/data/tours";

export const metadata: Metadata = {
  title: "Turlarımız — Boğaz Cruise & Tekne Turları",
  description:
    "İstanbul Boğazı'nda gün batımı cruise, yemekli akşam turu, sabah kahvaltı turu, özel yat kiralama ve daha fazlası. En uygun fiyatlarla hemen rezervasyon yapın.",
};

export default function CruisesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-72 md:h-96 flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1920&q=80"
          alt="İstanbul Boğazı Turları"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-deep-navy/70" />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white">
            Turlarımız
          </h1>
          <p className="text-white/70 text-lg mt-4 max-w-xl mx-auto">
            İstanbul Boğazı&apos;nda her bütçeye ve zevke uygun cruise deneyimleri
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-cream border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-semibold text-deep-navy">Filtrele:</span>
            {["Tümü", "Cruise", "Özel Yat", "Etkinlik", "Gün Turu"].map((filter) => (
              <button
                key={filter}
                className="px-4 py-1.5 rounded-full text-sm bg-white text-deep-navy hover:bg-sunset hover:text-white transition-colors border border-gray-200 hover:border-sunset"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
