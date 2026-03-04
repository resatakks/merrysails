import Image from "next/image";
import Link from "next/link";
import { Clock, Users, ArrowRight, Check } from "lucide-react";
import { tours } from "@/data/tours";

const featured = [tours[0], tours[1], tours[4]];

export default function FeaturedTours() {
  return (
    <section className="section-padding bg-bg-white">
      <div className="max-w-[1290px] mx-auto">
        <div className="text-center mb-14">
          <p className="text-secondary font-semibold tracking-[0.2em] uppercase text-sm mb-3">Featured</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-heading">Most Popular Experiences</h2>
        </div>
        <div className="space-y-8">
          {featured.map((tour, i) => (
            <div key={tour.id} className="featured-tour">
              <div className={`featured-image ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <Image src={tour.image} alt={tour.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
              <div className={`p-8 lg:p-12 flex flex-col justify-center ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <div className="flex items-center gap-4 text-sm text-muted mb-3">
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{tour.duration}</span>
                  <span className="flex items-center gap-1.5"><Users className="w-4 h-4" />{tour.capacity}</span>
                </div>
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-heading">{tour.name}</h3>
                <p className="text-[var(--text)] leading-relaxed mt-4">{tour.description}</p>
                <div className="grid grid-cols-2 gap-2 mt-5">
                  {tour.includes.slice(0, 4).map((item) => (
                    <span key={item} className="flex items-center gap-2 text-sm text-[var(--text-light)]"><Check className="w-4 h-4 text-success flex-shrink-0" />{item}</span>
                  ))}
                </div>
                <div className="flex items-center gap-5 mt-8">
                  <div>
                    <p className="text-xs text-muted uppercase tracking-wider">From</p>
                    <p className="text-3xl font-bold text-heading"><span className="text-lg">€</span>{tour.priceEur}<span className="text-sm font-normal text-muted ml-1">/ person</span></p>
                  </div>
                  <Link href={`/cruises/${tour.slug}`} className="bg-secondary hover:bg-secondary-hover text-white py-3 px-6 rounded-full font-semibold text-sm transition-all hover:-translate-y-0.5 inline-flex items-center gap-2">View Details <ArrowRight className="w-4 h-4" /></Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
