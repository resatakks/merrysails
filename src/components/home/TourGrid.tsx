import TourCard from "@/components/tours/TourCard";
import { tours } from "@/data/tours";

export default function TourGrid() {
  return (
    <section className="section">
      <div className="max-w-[1290px] mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-heading font-bold">Istanbul Bosphorus Cruises</h2>
          <p className="text-muted mt-3 max-w-lg mx-auto">Discover the magic of Istanbul from the water. Premium cruise experiences for every taste.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {tours.slice(0, 4).map((t) => <TourCard key={t.id} tour={t} />)}
        </div>
      </div>
    </section>
  );
}
