import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "İletişim | MerrySails",
  description:
    "MerrySails ile iletişime geçin. İstanbul Boğazı yat kiralama, özel turlar ve organizasyonlar için bize ulaşın.",
};

const contactInfo = [
  {
    icon: MapPin,
    label: "Adres",
    value: "Kuruçeşme Mah. Muallim Naci Cad. No:54, Beşiktaş / İstanbul",
  },
  {
    icon: Phone,
    label: "Telefon",
    value: "+90 (212) 000 00 00",
    href: "tel:+902120000000",
  },
  {
    icon: Mail,
    label: "E-posta",
    value: "info@merrysails.com",
    href: "mailto:info@merrysails.com",
  },
  {
    icon: Clock,
    label: "Çalışma Saatleri",
    value: "Her gün 09:00 - 22:00",
  },
];

export default function ContactPage() {
  return (
    <main>
      {/* Hero Banner */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#0A1628]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E3A5F]/50 to-[#0A1628]/90" />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-[#F5F1EB]">
            İletişim
          </h1>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-[#F5F1EB]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Contact Info */}
            <div>
              <h2 className="font-heading text-3xl font-bold text-[#0A1628] mb-8">
                Bize Ulaşın
              </h2>
              <div className="space-y-6 mb-10">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#C9A84C]/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-[#C9A84C]" />
                      </div>
                      <div>
                        <p className="font-heading font-semibold text-[#0A1628] mb-1">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-[#0A1628]/70 hover:text-[#E8642C] transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-[#0A1628]/70">{item.value}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* WhatsApp Link */}
              <a
                href="https://wa.me/902120000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp ile İletişime Geçin
              </a>
            </div>

            {/* Right: Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="font-heading text-2xl font-bold text-[#0A1628] mb-6">
                Mesaj Gönderin
              </h2>
              <form className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-[#0A1628] mb-2"
                  >
                    Adınız Soyadınız
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-[#0A1628]/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 focus:border-[#C9A84C] transition-colors bg-[#F5F1EB]/50"
                    placeholder="Ad Soyad"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-[#0A1628] mb-2"
                  >
                    E-posta Adresiniz
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-[#0A1628]/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 focus:border-[#C9A84C] transition-colors bg-[#F5F1EB]/50"
                    placeholder="ornek@email.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-[#0A1628] mb-2"
                  >
                    Telefon Numaranız
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 border border-[#0A1628]/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 focus:border-[#C9A84C] transition-colors bg-[#F5F1EB]/50"
                    placeholder="+90 (5XX) XXX XX XX"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-[#0A1628] mb-2"
                  >
                    Mesajınız
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full px-4 py-3 border border-[#0A1628]/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 focus:border-[#C9A84C] transition-colors resize-none bg-[#F5F1EB]/50"
                    placeholder="Mesajınızı buraya yazın..."
                  />
                </div>
                <button
                  type="submit"
                  className="btn-cta w-full text-center justify-center"
                >
                  Mesaj Gönder
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="bg-[#1E3A5F]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="font-heading text-2xl font-bold text-[#F5F1EB] mb-8 text-center">
            Konumumuz
          </h2>
          <div className="w-full h-[400px] rounded-2xl bg-[#0A1628]/50 flex items-center justify-center overflow-hidden">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-[#C9A84C] mx-auto mb-4" />
              <p className="text-[#F5F1EB]/70 text-lg">
                Kuruçeşme, Beşiktaş / İstanbul
              </p>
              <p className="text-[#F5F1EB]/50 text-sm mt-2">
                Harita yakında eklenecektir
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
