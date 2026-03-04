import Image from "next/image";
import Link from "next/link";
import { Users, Ruler, ArrowRight } from "lucide-react";
import { fleet } from "@/data/fleet";

export default function FleetShowcase() {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-[1290px] px-4">
        {/* Section Heading */}
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl font-bold text-heading md:text-4xl">
            Filomuz
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gold" />
          <p className="mt-4 text-muted">Lüks ve konforlu teknelerimiz</p>
        </div>

        {/* Yacht Cards — horizontal scroll on mobile, grid on lg */}
        <div className="flex gap-5 overflow-x-auto pb-4 lg:grid lg:grid-cols-4 lg:overflow-x-visible lg:pb-0">
          {fleet.map((yacht) => (
            <Link
              key={yacht.slug}
              href="/fleet"
              className="min-w-[260px] flex-shrink-0 overflow-hidden rounded-2xl bg-white transition hover:-translate-y-1 hover:shadow-lg lg:min-w-0"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={yacht.image}
                  alt={yacht.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="font-heading text-lg font-bold text-heading">
                  {yacht.name}
                </h3>
                <div className="mt-2 flex items-center gap-4 text-sm text-muted">
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {yacht.capacity} Kişi
                  </span>
                  <span className="flex items-center gap-1">
                    <Ruler className="h-4 w-4" />
                    {yacht.length}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-10 text-center">
          <Link
            href="/fleet"
            className="inline-flex items-center gap-2 font-medium text-gold transition hover:underline"
          >
            Tüm Filoyu Görüntüle
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
