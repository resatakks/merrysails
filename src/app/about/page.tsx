import Image from "next/image";
import type { Metadata } from "next";
import { Shield, Award, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Hakkımızda | MerrySails",
  description:
    "MerrySails hakkında bilgi edinin. İstanbul Boğazı'nda yat kiralama ve özel tur deneyimleri sunan güvenilir markamızı tanıyın.",
};

const stats = [
  { value: "1000+", label: "Mutlu Misafir" },
  { value: "4.9/5", label: "Müşteri Puanı" },
  { value: "5+", label: "Yıllık Deneyim" },
];

const values = [
  {
    icon: Shield,
    title: "Güvenlik",
    description:
      "Tüm teknelerimiz düzenli bakımdan geçer, deneyimli kaptanlarımız ve tam donanımlı güvenlik ekipmanlarımızla misafirlerimizin güvenliği her zaman önceliğimizdir.",
  },
  {
    icon: Award,
    title: "Kalite",
    description:
      "Premium hizmet anlayışımızla her detayı titizlikle planlıyor, misafirlerimize unutulmaz bir deneyim sunmak için en yüksek standartlarda çalışıyoruz.",
  },
  {
    icon: Heart,
    title: "Deneyim",
    description:
      "Yılların birikimiyle edindiğimiz tecrübe sayesinde her organizasyonu eksiksiz yönetiyor, misafirlerimizin hayallerini gerçeğe dönüştürüyoruz.",
  },
];

export default function AboutPage() {
  return (
    <main>
      {/* Hero Banner */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1920&q=80"
          alt="İstanbul Boğazı manzarası"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#0A1628]/70" />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-[#F5F1EB]">
            Hakkımızda
          </h1>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24 bg-[#F5F1EB]">
        <div className="max-w-[900px] mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#0A1628] mb-8 text-center">
            Hikayemiz
          </h2>
          <div className="space-y-6 text-[#0A1628]/80 text-lg leading-relaxed">
            <p>
              MerrySails, Merry Tourism ailesinin denizcilik markasıdır. İstanbul
              Boğazı&apos;nın eşsiz güzelliklerini misafirlerimizle buluşturmak
              amacıyla yola çıktık. Yılların getirdiği deneyim ve tutkuyla, her
              yolculuğu unutulmaz bir anıya dönüştürüyoruz.
            </p>
            <p>
              Profesyonel ekibimiz, modern filomuz ve kişiye özel hizmet
              anlayışımızla İstanbul&apos;un en güvenilir yat kiralama ve boğaz
              turu markası olma vizyonuyla çalışıyoruz. Evlilik tekliflerinden
              kurumsal etkinliklere, doğum günü kutlamalarından özel boğaz
              turlarına kadar her organizasyonu titizlikle planlıyor ve
              kusursuz bir şekilde hayata geçiriyoruz.
            </p>
            <p>
              TÜRSAB lisanslı bir turizm markası olarak, tüm yasal
              düzenlemelere uygun şekilde faaliyet gösteriyor ve
              misafirlerimize güvenli, konforlu ve kaliteli bir deneyim
              sunuyoruz.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#1E3A5F]">
        <div className="max-w-[900px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-heading text-4xl md:text-5xl font-bold text-[#C9A84C] mb-2">
                  {stat.value}
                </div>
                <div className="text-[#F5F1EB] text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[900px] mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#0A1628] mb-12 text-center">
            Değerlerimiz
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-[#F5F1EB] rounded-2xl p-8 text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#C9A84C]/10 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-[#C9A84C]" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-[#0A1628] mb-4">
                    {item.title}
                  </h3>
                  <p className="text-[#0A1628]/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TURSAB Badge */}
      <section className="py-12 bg-[#F5F1EB]">
        <div className="max-w-[900px] mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-4 bg-white rounded-2xl px-8 py-6 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-[#1E3A5F] flex items-center justify-center">
              <Shield className="w-8 h-8 text-[#C9A84C]" />
            </div>
            <div className="text-left">
              <p className="font-heading font-bold text-[#0A1628] text-lg">
                TÜRSAB Lisanslı
              </p>
              <p className="text-[#0A1628]/60 text-sm">
                Belgeli ve güvenilir turizm hizmeti
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
