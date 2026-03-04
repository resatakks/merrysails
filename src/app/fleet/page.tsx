import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Users, Ruler, Anchor } from "lucide-react";
import { fleet } from "@/data/fleet";

export const metadata: Metadata = {
  title: "Filomuz | MerrySails",
  description:
    "MerrySails filosunu keşfedin. İstanbul Boğazı'nda özel turlar için lüks yat ve teknelerimizi inceleyin.",
};

export default function FleetPage() {
  return (
    <main>
      {/* Hero Banner */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1920&q=80"
          alt="Lüks yat filosu"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#0A1628]/70" />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-[#F5F1EB]">
            Filomuz
          </h1>
        </div>
      </section>

      {/* Fleet Grid */}
      <section className="py-16 md:py-24 bg-[#F5F1EB]">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-center text-[#0A1628]/70 text-lg mb-12 max-w-2xl mx-auto">
            Her biri özenle bakılan ve donatılan teknelerimiz, konfor ve güvenliği
            bir arada sunar. İhtiyacınıza en uygun tekneyi seçin.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fleet.map((yacht) => (
              <div
                key={yacht.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Yacht Image */}
                <div className="relative h-64 w-full">
                  <Image
                    src={yacht.image}
                    alt={yacht.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Yacht Info */}
                <div className="p-6">
                  <h3 className="font-heading text-xl font-bold text-[#0A1628] mb-4">
                    {yacht.name}
                  </h3>

                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center gap-2 text-[#0A1628]/70">
                      <Users className="w-4 h-4 text-[#C9A84C]" />
                      <span className="text-sm">{yacht.capacity} Kişi</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#0A1628]/70">
                      <Ruler className="w-4 h-4 text-[#C9A84C]" />
                      <span className="text-sm">{yacht.length}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#0A1628]/70">
                      <Anchor className="w-4 h-4 text-[#C9A84C]" />
                      <span className="text-sm">{yacht.type}</span>
                    </div>
                  </div>

                  {/* Features */}
                  {yacht.features && yacht.features.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {yacht.features.map((feature) => (
                        <span
                          key={feature}
                          className="text-xs bg-[#F5F1EB] text-[#0A1628]/70 px-3 py-1 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}

                  <Link
                    href="/contact"
                    className="btn-cta inline-flex text-sm"
                  >
                    Rezervasyon İçin İletişime Geçin
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
