import Link from "next/link";
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, Twitter } from "lucide-react";

const footerLinks = {
  tours: [
    { name: "Gün Batımı Turu", href: "/cruises/sunset-cruise" },
    { name: "Yemekli Akşam Turu", href: "/cruises/dinner-cruise" },
    { name: "Boğaz Keşif Turu", href: "/cruises/bosphorus-sightseeing" },
    { name: "Sabah Kahvaltı Turu", href: "/cruises/breakfast-cruise" },
    { name: "VIP Dinner Cruise", href: "/cruises/vip-dinner-cruise" },
    { name: "Adalar Turu", href: "/cruises/princes-islands" },
  ],
  company: [
    { name: "Hakkımızda", href: "/about" },
    { name: "Filomuz", href: "/fleet" },
    { name: "Galeri", href: "/gallery" },
    { name: "Blog", href: "/blog" },
    { name: "SSS", href: "/faq" },
    { name: "İletişim", href: "/contact" },
  ],
  legal: [
    { name: "Gizlilik Politikası", href: "/privacy-policy" },
    { name: "Kullanım Koşulları", href: "/terms" },
    { name: "KVKK Aydınlatma Metni", href: "/privacy-policy" },
    { name: "Çerez Politikası", href: "/privacy-policy" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-deep-navy text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-heading text-2xl font-bold">
                Özel Fırsatlardan Haberdar Olun
              </h3>
              <p className="text-white/60 mt-1">
                Yeni turlar, indirimler ve İstanbul rehberlerimiz için bültenimize abone olun.
              </p>
            </div>
            <form className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="Email adresiniz"
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 w-full md:w-72 focus:outline-none focus:border-gold transition-colors"
              />
              <button
                type="submit"
                className="bg-gold hover:bg-gold-light text-deep-navy px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-colors"
              >
                Abone Ol
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center text-deep-navy font-bold text-lg">
                M
              </div>
              <span className="text-white font-heading text-xl font-bold">
                Merry<span className="text-gold">Sails</span>
              </span>
            </Link>
            <p className="text-white/60 mt-4 max-w-sm text-sm leading-relaxed">
              Merry Tourism ailesinin denizcilik markası. İstanbul Boğazı&apos;nda
              unutulmaz cruise deneyimleri, özel yat kiralama ve organizasyonlar.
              TURSAB lisanslı, güvenilir hizmet.
            </p>
            <div className="flex gap-3 mt-6">
              {[
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Youtube, href: "#", label: "YouTube" },
                { icon: Twitter, href: "#", label: "Twitter" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 bg-white/10 hover:bg-gold rounded-lg flex items-center justify-center transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Tours */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Turlarımız</h4>
            <ul className="space-y-2.5">
              {footerLinks.tours.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-gold transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Kurumsal</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-gold transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">İletişim</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+905321234567"
                  className="flex items-start gap-2 text-white/60 hover:text-gold transition-colors text-sm"
                >
                  <Phone className="w-4 h-4 mt-0.5 shrink-0" />
                  +90 532 123 45 67
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@merrysails.com"
                  className="flex items-start gap-2 text-white/60 hover:text-gold transition-colors text-sm"
                >
                  <Mail className="w-4 h-4 mt-0.5 shrink-0" />
                  info@merrysails.com
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2 text-white/60 text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>
                    Eminönü İskelesi, Fatih
                    <br />
                    İstanbul, Türkiye
                  </span>
                </div>
              </li>
            </ul>
            {/* TURSAB Badge */}
            <div className="mt-6 p-3 bg-white/5 rounded-lg border border-white/10">
              <p className="text-xs text-white/50">TURSAB Lisanslı</p>
              <p className="text-sm font-semibold text-gold">Belge No: 12345</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm">
              &copy; {new Date().getFullYear()} MerrySails — Merry Tourism. Tüm hakları
              saklıdır.
            </p>
            <div className="flex gap-4">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-white/40 hover:text-white/70 text-xs transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
