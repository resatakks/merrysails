import type { Metadata } from "next";
import Image from "next/image";
import { Mail, Phone, MapPin, Clock, MessageCircle, Instagram, Facebook } from "lucide-react";

export const metadata: Metadata = {
  title: "İletişim",
  description: "MerrySails ile iletişime geçin. Rezervasyon, fiyat teklifi ve sorularınız için 7/24 WhatsApp hattımızdan ulaşabilirsiniz.",
};

const contactInfo = [
  { icon: Phone, title: "Telefon", value: "+90 532 123 45 67", href: "tel:+905321234567" },
  { icon: Mail, title: "Email", value: "info@merrysails.com", href: "mailto:info@merrysails.com" },
  { icon: MessageCircle, title: "WhatsApp", value: "+90 532 123 45 67", href: "https://wa.me/905321234567" },
  { icon: MapPin, title: "Adres", value: "Eminönü İskelesi, Fatih, İstanbul", href: "#" },
  { icon: Clock, title: "Çalışma Saatleri", value: "Her gün 08:00 - 23:00", href: "#" },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-72 md:h-80 flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1920&q=80"
          alt="İletişim"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/70" />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white">İletişim</h1>
          <p className="text-white/70 text-lg mt-4">Sorularınız ve rezervasyonlarınız için bize ulaşın</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-[1290px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="font-heading text-3xl font-bold text-heading mb-6">Bize Yazın</h2>
              <form className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Ad Soyad *</label>
                    <input
                      type="text"
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
                      placeholder="Adınız Soyadınız"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Email *</label>
                    <input
                      type="email"
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
                      placeholder="ornek@email.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Telefon</label>
                    <input
                      type="tel"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
                      placeholder="+90 5XX XXX XX XX"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Konu</label>
                    <select className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors appearance-none">
                      <option value="">Konu Seçin</option>
                      <option value="reservation">Rezervasyon</option>
                      <option value="price">Fiyat Teklifi</option>
                      <option value="corporate">Kurumsal Etkinlik</option>
                      <option value="complaint">Şikayet / Öneri</option>
                      <option value="other">Diğer</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Mesajınız *</label>
                  <textarea
                    required
                    rows={5}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors resize-none"
                    placeholder="Mesajınızı buraya yazın..."
                  />
                </div>
                <button
                  type="submit"
                  className="bg-accent hover:bg-accent-hover text-white px-8 py-3 rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-accent/25"
                >
                  Gönder
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="font-heading text-3xl font-bold text-heading mb-6">İletişim Bilgileri</h2>
              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    className="flex items-start gap-4 bg-bg-secondary rounded-xl p-4 hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                      <item.icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold text-heading">{item.title}</p>
                      <p className="text-gray-500 text-sm">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Social */}
              <div className="mt-8">
                <h3 className="font-heading text-xl font-bold text-heading mb-4">Sosyal Medya</h3>
                <div className="flex gap-3">
                  {[
                    { icon: Instagram, label: "Instagram" },
                    { icon: Facebook, label: "Facebook" },
                    { icon: MessageCircle, label: "WhatsApp" },
                  ].map(({ icon: Icon, label }) => (
                    <a
                      key={label}
                      href="#"
                      className="w-12 h-12 bg-primary hover:bg-primary-light rounded-xl flex items-center justify-center transition-colors"
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="mt-8 bg-gray-200 rounded-2xl h-64 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <MapPin className="w-12 h-12 mx-auto mb-2" />
                  <p className="font-semibold">Eminönü İskelesi</p>
                  <p className="text-sm">Fatih, İstanbul</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
