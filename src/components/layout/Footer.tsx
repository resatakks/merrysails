import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Youtube,
  Anchor,
} from "lucide-react";

const cruiseLinks = [
  { name: "Gün Batımı Turu", href: "/cruises/sunset-cruise" },
  { name: "Yemekli Akşam Turu", href: "/cruises/dinner-cruise" },
  { name: "Boğaz Keşif Turu", href: "/cruises/bosphorus-sightseeing" },
  { name: "VIP Dinner Cruise", href: "/cruises/vip-dinner-cruise" },
  { name: "Özel Yat Kiralama", href: "/cruises/private-yacht" },
];

const companyLinks = [
  { name: "About", href: "/about" },
  { name: "Fleet", href: "/fleet" },
  { name: "Gallery", href: "/gallery" },
  { name: "Blog", href: "/blog" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
];

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Youtube, href: "https://youtube.com", label: "Youtube" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0A1628] text-white pb-20 lg:pb-0">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Col 1: Brand */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[var(--color-gold)] rounded-lg flex items-center justify-center">
                <Anchor className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">
                Merry
                <span className="text-[var(--color-gold)]">Sails</span>
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed">
              Premium Bosphorus cruise experiences by Merry Tourism. Discover
              the beauty of Istanbul from the water with our luxury fleet and
              exceptional service.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white/60 hover:bg-[var(--color-gold)] hover:text-white transition-all"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Cruises */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-5">
              Cruises
            </h4>
            <ul className="space-y-3">
              {cruiseLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-[var(--color-gold)] text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-[var(--color-gold)] text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-5">
              Contact
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+905321234567"
                  className="flex items-center gap-3 text-white/50 hover:text-[var(--color-gold)] text-sm transition-colors"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  +90 532 123 45 67
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@merrysails.com"
                  className="flex items-center gap-3 text-white/50 hover:text-[var(--color-gold)] text-sm transition-colors"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  info@merrysails.com
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-white/50 text-sm">
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    Kuruçeşme Mah. Muallim Naci Cad.
                    <br />
                    Beşiktaş, İstanbul
                  </span>
                </div>
              </li>
            </ul>

            {/* TURSAB Badge */}
            <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-xl">
              <p className="text-[var(--color-gold)] text-xs font-semibold">
                TURSAB
              </p>
              <p className="text-white/40 text-xs mt-1">
                Lisans No: 14256
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            &copy; 2026 MerrySails by Merry Tourism. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-white/40 hover:text-white/70 text-xs transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-white/40 hover:text-white/70 text-xs transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
