import { Ship, Users, UtensilsCrossed, Shield, Clock, Award } from "lucide-react";

const features = [
  {
    icon: Ship,
    title: "Özel Filo",
    description: "Bakımlı ve lüks teknelerimiz ile konforlu yolculuk",
  },
  {
    icon: Users,
    title: "Profesyonel Ekip",
    description: "Deneyimli kaptan ve misafirperver mürettebat",
  },
  {
    icon: UtensilsCrossed,
    title: "Lezzetli Menü",
    description: "Şefimizin özenle hazırladığı Türk mutfağı",
  },
  {
    icon: Shield,
    title: "Güvenli Yolculuk",
    description: "TURSAB lisanslı, tam sigortalı operasyon",
  },
  {
    icon: Clock,
    title: "Esnek Saatler",
    description: "Gün batımı, akşam ve özel saat seçenekleri",
  },
  {
    icon: Award,
    title: "5 Yıldız Hizmet",
    description: "1000+ mutlu misafir, 4.9/5 puan",
  },
];

export default function WhyUs() {
  return (
    <section className="section-padding bg-[#F5F1EB]">
      <div className="mx-auto max-w-[1290px] px-4">
        {/* Section Heading */}
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl font-bold text-heading md:text-4xl">
            Neden MerrySails?
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gold" />
          <p className="mt-4 text-muted">
            Boğaz&apos;da en güvenilir ve keyifli deneyim
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="rounded-2xl bg-white p-8 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold/10">
                  <Icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-heading">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
