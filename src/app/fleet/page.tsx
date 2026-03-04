import type { Metadata } from "next";
import Image from "next/image";
import { Users, Ruler, Check } from "lucide-react";
import { fleet } from "@/data/fleet";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Filomuz — Lüks Yatlar & Tekneler",
  description: "MerrySails'in modern ve bakımlı yat filosunu keşfedin. Lüks motor yat, klasik ahşap tekne, VIP süper yat ve katamaran.",
};

export default function FleetPage() {
  return (
    <>
      <section className="relative h-72 md:h-80 flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1920&q=80"
          alt="MerrySails Filosu"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/70" />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white">Filomuz</h1>
          <p className="text-white/70 text-lg mt-4">Modern, güvenli ve konforlu yatlarımız</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-[1290px] mx-auto space-y-12">
          {fleet.map((yacht, i) => (
            <div
              key={yacht.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}
            >
              <div className={`relative h-80 md:h-96 rounded-2xl overflow-hidden ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <Image src={yacht.image} alt={yacht.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                <div className="absolute top-4 left-4 glass-dark rounded-lg px-3 py-1">
                  <span className="text-white text-sm font-semibold">{yacht.type}</span>
                </div>
              </div>
              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <h2 className="font-heading text-3xl font-bold text-heading">{yacht.name}</h2>
                <p className="text-gray-600 mt-4 leading-relaxed">{yacht.description}</p>

                <div className="flex gap-6 mt-6">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-accent" />
                    <span className="text-heading font-semibold">{yacht.capacity} Kişi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ruler className="w-5 h-5 text-accent" />
                    <span className="text-heading font-semibold">{yacht.length}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold text-heading mb-3">Özellikler</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {yacht.features.map((f) => (
                      <div key={f} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-success" />
                        <span className="text-gray-600 text-sm">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-4">
                  <div>
                    <span className="text-gray-400 text-sm">Saatlik</span>
                    <p className="text-2xl font-bold text-heading font-bold">
                      {formatPrice(yacht.pricePerHour)}
                    </p>
                  </div>
                  <Button href="/booking">Rezervasyon Yap</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
