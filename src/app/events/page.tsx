import type { Metadata } from "next";
import Image from "next/image";
import { Heart, Briefcase, PartyPopper, Gift, Star } from "lucide-react";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Özel Organizasyonlar",
  description: "Düğün, nişan, evlilik teklifi, doğum günü ve kurumsal etkinlikleriniz için Boğaz'da özel organizasyonlar.",
};

const events = [
  {
    icon: Heart,
    title: "Evlilik Teklifi",
    description: "Hayatınızın en özel anını İstanbul Boğazı'nın büyüleyici atmosferinde yaşayın. Profesyonel dekorasyon, çiçek, pasta ve fotoğrafçı dahil.",
    price: "€350'den başlayan",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
  },
  {
    icon: PartyPopper,
    title: "Doğum Günü Partisi",
    description: "Doğum gününüzü Boğaz'da kutlayın. Özel dekorasyon, pasta, DJ ve eğlence programı ile unutulmaz bir parti.",
    price: "€200'den başlayan",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
  },
  {
    icon: Briefcase,
    title: "Kurumsal Etkinlikler",
    description: "Şirket toplantıları, lansman, motivasyon etkinlikleri ve gala yemekleri için özel paketler. 20-100 kişilik gruplar.",
    price: "Teklif alın",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
  },
  {
    icon: Gift,
    title: "Düğün & Nişan",
    description: "Boğaz manzarası eşliğinde rüya gibi bir düğün veya nişan organizasyonu. Catering, dekorasyon ve müzik dahil.",
    price: "€1000'den başlayan",
    image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80",
  },
  {
    icon: Star,
    title: "Yılbaşı Partisi",
    description: "Yeni yılı Boğaz'da karşılayın! Limitsiz içecek, canlı müzik, DJ ve havai fişek manzarası ile muhteşem bir gece.",
    price: "€150'den başlayan",
    image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&q=80",
  },
];

export default function EventsPage() {
  return (
    <>
      <section className="relative h-72 md:h-80 flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80"
          alt="Özel Organizasyonlar"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white">Özel Organizasyonlar</h1>
          <p className="text-white/60 text-lg mt-4">Hayalinizdeki etkinliği Boğaz&apos;da gerçeğe dönüştürün</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-[1290px] mx-auto space-y-10">
          {events.map((event, i) => (
            <div
              key={event.title}
              className="bg-bg-white rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-0 border border-border hover:shadow-lg transition-all duration-300"
            >
              <div className={`relative h-72 md:h-80 overflow-hidden ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <Image src={event.image} alt={event.title} fill className="object-cover hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
              <div className={`p-8 md:p-10 flex flex-col justify-center ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center">
                    <event.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h2 className="font-heading text-2xl font-bold text-heading">{event.title}</h2>
                </div>
                <p className="text-[var(--text)] leading-relaxed">{event.description}</p>
                <p className="text-secondary font-bold text-lg mt-4">{event.price}</p>
                <div className="flex gap-3 mt-6">
                  <Button href="/contact" size="md">Teklif İsteyin</Button>
                  <Button href="https://wa.me/905321234567" variant="whatsapp" size="md">
                    WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
