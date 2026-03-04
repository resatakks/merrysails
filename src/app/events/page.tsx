import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Heart, Cake, Building2, PartyPopper } from "lucide-react";

export const metadata: Metadata = {
  title: "Özel Organizasyonlar | MerrySails",
  description:
    "MerrySails ile İstanbul Boğazı'nda özel organizasyonlar. Evlilik teklifi, doğum günü, kurumsal etkinlik ve yılbaşı partisi.",
};

const events = [
  {
    icon: Heart,
    title: "Evlilik Teklifi",
    description:
      "İstanbul Boğazı'nın büyüleyici manzarası eşliğinde hayatınızın en özel anını yaşayın. Özel dekorasyon, canlı müzik ve romantik bir akşam yemeği ile unutulmaz bir evlilik teklifi organizasyonu hazırlıyoruz. Kız Kulesi, Boğaz Köprüsü ve tarihi yarımada manzarası eşliğinde hayalinizdeki teklifi gerçeğe dönüştürün.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    imageAlt: "Romantik evlilik teklifi organizasyonu",
  },
  {
    icon: Cake,
    title: "Doğum Günü",
    description:
      "Doğum gününüzü İstanbul Boğazı'nda kutlamak ister misiniz? Özel pasta, balon süslemeleri, DJ eşliğinde dans ve eğlence dolu bir gece sizi bekliyor. Küçük veya büyük gruplar için özel tekne seçeneklerimizle doğum günü partinizi benzersiz kılıyoruz.",
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80",
    imageAlt: "Doğum günü kutlaması",
  },
  {
    icon: Building2,
    title: "Kurumsal Etkinlik",
    description:
      "Şirket toplantılarınızı, ödül gecelerinizi veya takım motivasyon etkinliklerinizi Boğaz'ın eşsiz atmosferinde gerçekleştirin. Profesyonel ses ve ışık sistemleri, toplantı ekipmanları, özel menü seçenekleri ve deneyimli organizasyon ekibimizle kurumsal etkinliklerinize değer katıyoruz.",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80",
    imageAlt: "Kurumsal etkinlik organizasyonu",
  },
  {
    icon: PartyPopper,
    title: "Yılbaşı Partisi",
    description:
      "Yeni yıla İstanbul Boğazı'nda merhaba deyin! Özel yılbaşı menüsü, canlı müzik, DJ performansı ve havai fişek gösterisi eşliğinde muhteşem bir gece geçirin. Sınırlı sayıda kontenjanla özel ve samimi bir kutlama deneyimi yaşayın.",
    image:
      "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=800&q=80",
    imageAlt: "Yılbaşı partisi kutlaması",
  },
];

export default function EventsPage() {
  return (
    <main>
      {/* Hero Banner */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80"
          alt="Özel organizasyonlar"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#0A1628]/70" />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-[#F5F1EB]">
            Özel Organizasyonlar
          </h1>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16 md:py-24 bg-[#F5F1EB]">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-center text-[#0A1628]/70 text-lg mb-16 max-w-2xl mx-auto">
            Hayalinizdeki organizasyonu İstanbul Boğazı&apos;nın eşsiz
            manzarasında gerçeğe dönüştürüyoruz. Her etkinlik, sizin için özel
            olarak tasarlanır.
          </p>

          <div className="space-y-12">
            {events.map((event, index) => {
              const Icon = event.icon;
              const isReversed = index % 2 !== 0;

              return (
                <div
                  key={event.title}
                  className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col ${
                    isReversed ? "md:flex-row-reverse" : "md:flex-row"
                  }`}
                >
                  {/* Image */}
                  <div className="relative w-full md:w-1/2 h-64 md:h-auto md:min-h-[360px]">
                    <Image
                      src={event.image}
                      alt={event.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>

                  {/* Content */}
                  <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
                    <div className="w-14 h-14 rounded-full bg-[#C9A84C]/10 flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-[#C9A84C]" />
                    </div>
                    <h3 className="font-heading text-2xl md:text-3xl font-bold text-[#0A1628] mb-4">
                      {event.title}
                    </h3>
                    <p className="text-[#0A1628]/70 leading-relaxed mb-8">
                      {event.description}
                    </p>
                    <Link
                      href="/contact"
                      className="btn-cta inline-flex self-start"
                    >
                      Detaylar İçin Arayın
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
