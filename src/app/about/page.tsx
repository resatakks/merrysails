import type { Metadata } from "next";
import Image from "next/image";
import { Ship, Shield, Award, Users, Heart, Globe } from "lucide-react";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "MerrySails, Merry Tourism ailesinin denizcilik markasıdır. TURSAB lisanslı, 10+ yıl tecrübe ile İstanbul Boğazı'nda güvenilir cruise hizmeti.",
};

const stats = [
  { value: "10+", label: "Yıl Tecrübe" },
  { value: "50K+", label: "Mutlu Misafir" },
  { value: "4.9", label: "Ortalama Puan" },
  { value: "4", label: "Lüks Yat" },
];

const values = [
  { icon: Shield, title: "Güvenlik", description: "Tam sigortalı filo, TURSAB lisansı ve düzenli denetimlerle misafirlerimizin güvenliği her zaman önceliğimiz." },
  { icon: Award, title: "Kalite", description: "En kaliteli hizmeti sunmak için sürekli kendimizi geliştiriyor, ekipmanlarımızı yeniliyoruz." },
  { icon: Heart, title: "Misafir Memnuniyeti", description: "Her misafirimizi özel hissettirmek ve unutulmaz anılar biriktirmelerini sağlamak en büyük motivasyonumuz." },
  { icon: Globe, title: "Kapsayıcılık", description: "6 dilde hizmet vererek dünyanın her yerinden gelen misafirlerimize en iyi deneyimi sunuyoruz." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-72 md:h-96 flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1920&q=80"
          alt="MerrySails Hakkımızda"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-deep-navy/70" />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white">Hakkımızda</h1>
          <p className="text-white/70 text-lg mt-4">Merry Tourism Ailesi&apos;nin Denizcilik Markası</p>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-deep-navy mb-6">
                Boğaz&apos;ın Büyüsünü
                <br />
                <span className="text-sunset">Sizinle Paylaşıyoruz</span>
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  MerrySails, Merry Tourism ailesinin denizcilik markasıdır. İstanbul
                  Boğazı&apos;nın eşsiz güzelliğini misafirlerimizle paylaşmak için kurulduk.
                </p>
                <p>
                  TURSAB lisanslı, tam sigortalı filomuz ve profesyonel ekibimiz ile her
                  yolculuğu güvenli ve keyifli bir deneyime dönüştürüyoruz. 10 yılı aşkın
                  sektör tecrübemiz ve 50.000&apos;den fazla mutlu misafirimizle İstanbul&apos;un
                  en güvenilir cruise markalarından biriyiz.
                </p>
                <p>
                  Gün batımında Boğaz&apos;ın altın renklerine bürünüşünü izlemek, yıldızlar
                  altında yemekli bir cruise&apos;da İstanbul&apos;un silüetini seyretmek ya da
                  özel gününüzü bir yatta kutlamak... MerrySails ile her an bir hikaye.
                </p>
              </div>
              <Button href="/cruises" className="mt-8">
                Turlarımızı Keşfedin
              </Button>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80"
                alt="MerrySails Ekibi"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-deep-navy py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-heading text-4xl md:text-5xl font-bold text-gold">{stat.value}</p>
                <p className="text-white/60 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-deep-navy">Değerlerimiz</h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-gold mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((val) => (
              <div key={val.title} className="bg-white rounded-2xl p-6 flex gap-4">
                <div className="w-14 h-14 bg-sunset/10 rounded-xl flex items-center justify-center shrink-0">
                  <val.icon className="w-7 h-7 text-sunset" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-deep-navy">{val.title}</h3>
                  <p className="text-gray-500 mt-2 text-sm leading-relaxed">{val.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-deep-navy mb-4">Ekibimiz</h2>
          <p className="text-gray-500 max-w-2xl mx-auto mb-12">
            Deneyimli kaptanlar, profesyonel şefler ve çok dilli misafir ilişkileri ekibimiz ile her yolculuğunuz özel.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Kaptan Mehmet Yılmaz", role: "Baş Kaptan", icon: Ship },
              { name: "Ayşe Kara", role: "Misafir İlişkileri Müdürü", icon: Users },
              { name: "Chef Ahmet Demir", role: "Baş Şef", icon: Award },
            ].map((member) => (
              <div key={member.name} className="bg-cream rounded-2xl p-8">
                <div className="w-20 h-20 bg-ocean-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <member.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-heading text-lg font-bold text-deep-navy">{member.name}</h3>
                <p className="text-gray-400 text-sm mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
