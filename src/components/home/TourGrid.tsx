import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TourCard from "@/components/tours/TourCard";
import { getCoreTours } from "@/data/tours";

export default function TourGrid() {
  const featured = getCoreTours();

  return (
    <section className="py-16 md:py-24 bg-[var(--surface-alt)]">
      <div className="container-main">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Our 3 Flagship Bosphorus Products</h2>
          <p className="text-[var(--text-muted)] max-w-xl mx-auto">
            Start with the three Bosphorus experiences guests ask for most: shared dinner cruise, shared sunset cruise, and private yacht charter.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/bosphorus-cruise"
            className="inline-flex items-center gap-2 text-[var(--brand-primary)] font-semibold hover:gap-3 transition-all"
          >
            Compare Bosphorus cruise options
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
