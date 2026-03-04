import Image from "next/image";
import Link from "next/link";
import { Users, Ruler, ArrowRight } from "lucide-react";
import { fleet } from "@/data/fleet";

export default function FleetShowcase() {
  return (
    <section className="section">
      <div className="max-w-[1290px] mx-auto">
        <div className="text-center mb-10"><h2 className="text-heading font-bold">Our Fleet</h2></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {fleet.map((y) => (
            <Link key={y.id} href="/fleet" className="group block bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="relative h-48 overflow-hidden">
                <Image src={y.image} alt={y.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="320px" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-heading text-sm group-hover:text-gold transition-colors">{y.name}</h3>
                <div className="flex items-center gap-3 mt-1.5 text-muted text-xs">
                  <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{y.capacity}</span>
                  <span className="flex items-center gap-1"><Ruler className="w-3.5 h-3.5" />{y.length}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8"><Link href="/fleet" className="text-primary hover:text-gold font-semibold inline-flex items-center gap-1 transition-colors">View Fleet <ArrowRight className="w-4 h-4" /></Link></div>
      </div>
    </section>
  );
}
