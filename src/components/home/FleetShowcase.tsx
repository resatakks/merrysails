import Image from "next/image";
import Link from "next/link";
import { Users, Ruler, ArrowRight } from "lucide-react";
import { fleet } from "@/data/fleet";

export default function FleetShowcase() {
  return (
    <section className="section-padding bg-bg-secondary">
      <div className="max-w-[1290px] mx-auto">
        <div className="text-center mb-12">
          <p className="text-secondary font-medium tracking-[0.15em] uppercase text-sm mb-3">Our Fleet</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-heading">
            Modern & Comfortable Yachts
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {fleet.map((yacht) => (
            <Link
              key={yacht.id}
              href="/fleet"
              className="group block bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={yacht.image}
                  alt={yacht.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="320px"
                />
                <div className="absolute bottom-3 left-3 bg-primary/80 backdrop-blur-sm rounded-lg px-3 py-1">
                  <span className="text-white text-xs font-semibold">{yacht.type}</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-heading text-lg font-bold text-heading group-hover:text-accent transition-colors">
                  {yacht.name}
                </h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted">
                  <span className="flex items-center gap-1"><Users className="w-4 h-4" />{yacht.capacity} guests</span>
                  <span className="flex items-center gap-1"><Ruler className="w-4 h-4" />{yacht.length}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {yacht.features.slice(0, 3).map((f) => (
                    <span key={f} className="text-xs bg-bg-secondary text-primary px-2.5 py-0.5 rounded-full">{f}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/fleet" className="inline-flex items-center gap-2 text-accent hover:text-accent-hover font-semibold transition-colors">
            Explore Full Fleet <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
