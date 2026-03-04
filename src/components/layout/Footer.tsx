import Link from "next/link";
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, Anchor } from "lucide-react";

const footerLinks = {
  tours: [
    { name: "Sunset Cruise", href: "/cruises/sunset-cruise" },
    { name: "Dinner Cruise", href: "/cruises/dinner-cruise" },
    { name: "Sightseeing Tour", href: "/cruises/bosphorus-sightseeing" },
    { name: "Breakfast Cruise", href: "/cruises/breakfast-cruise" },
    { name: "Private Yacht", href: "/cruises/private-yacht" },
    { name: "VIP Dinner", href: "/cruises/vip-dinner-cruise" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Fleet", href: "/fleet" },
    { name: "Gallery", href: "/gallery" },
    { name: "Blog", href: "/blog" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-primary text-white pb-20 lg:pb-0">
      <div className="max-w-[1290px] mx-auto px-5 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 bg-secondary rounded-lg flex items-center justify-center">
                <Anchor className="w-5 h-5 text-primary" />
              </div>
              <span className="text-white font-heading text-xl font-bold">
                Merry<span className="text-secondary">Sails</span>
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed">
              Premium Bosphorus cruise experiences by Merry Tourism. TURSAB licensed, trusted local operator since day one.
            </p>
            <div className="flex gap-3 mt-6">
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Facebook, label: "Facebook" },
                { icon: Youtube, label: "YouTube" },
              ].map(({ icon: Icon, label }) => (
                <a key={label} href="#" aria-label={label} className="w-10 h-10 bg-white/10 hover:bg-secondary hover:text-primary rounded-lg flex items-center justify-center transition-colors">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg mb-5">Our Cruises</h4>
            <ul className="space-y-2.5">
              {footerLinks.tours.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/50 hover:text-secondary transition-colors text-sm">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg mb-5">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/50 hover:text-secondary transition-colors text-sm">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg mb-5">Contact</h4>
            <ul className="space-y-3.5">
              <li>
                <a href="tel:+905321234567" className="flex items-start gap-2.5 text-white/50 hover:text-secondary transition-colors text-sm">
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />+90 532 123 45 67
                </a>
              </li>
              <li>
                <a href="mailto:info@merrysails.com" className="flex items-start gap-2.5 text-white/50 hover:text-secondary transition-colors text-sm">
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />info@merrysails.com
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2.5 text-white/50 text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Eminönü, Fatih<br />Istanbul, Turkey</span>
                </div>
              </li>
            </ul>
            <div className="mt-6 p-3.5 bg-white/5 rounded-xl border border-white/10">
              <p className="text-xs text-white/40">TURSAB Licensed</p>
              <p className="text-sm font-semibold text-secondary">License No: 12345</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-[1290px] mx-auto px-5 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-sm">&copy; {new Date().getFullYear()} MerrySails — Merry Tourism. All rights reserved.</p>
            <div className="flex gap-5">
              {[
                { name: "Privacy Policy", href: "/privacy-policy" },
                { name: "Terms", href: "/terms" },
              ].map((link) => (
                <Link key={link.name} href={link.href} className="text-white/30 hover:text-white/60 text-xs transition-colors">
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
