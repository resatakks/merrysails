import { Metadata } from "next";
import { tours } from "@/data/tours";
import TourCard from "@/components/tours/TourCard";

export const metadata: Metadata = {
  title: "Turlarımız | MerrySails",
  description:
    "İstanbul Boğazı'nda unutulmaz tur deneyimleri. Gün batımı turları, yemekli akşam turları, özel yat kiralama ve daha fazlası MerrySails ile sizi bekliyor.",
};

export default function CruisesPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-4">
            Turlarımız
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
            İstanbul Boğazı&apos;nın büyüsünü keşfedin
          </p>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="section-padding">
        <div className="max-w-[1290px] mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {tours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
