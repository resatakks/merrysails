import Link from "next/link";
import { Anchor, Phone, Mail, MapPin, Instagram, Facebook, Youtube } from "lucide-react";

const cruiseLinks = [
  { label: "Sunset Cruise", href: "/cruises/bosphorus-sunset-cruise" },
  { label: "Dinner Cruise", href: "/cruises/bosphorus-dinner-cruise" },
  { label: "Short Cruise", href: "/cruises/bosphorus-sightseeing-cruise" },
  { label: "Yacht Charter", href: "/cruises/yacht-charter-in-istanbul" },
  { label: "Lunch Cruise", href: "/cruises/istanbul-lunch-cruise" },
  { label: "Princes' Islands", href: "/cruises/istanbul-princes-island-tour" },
];

const orgLinks = [
  { label: "Marriage Proposal", href: "/cruises/romantic-marriage-proposal" },
  { label: "Birthday Party", href: "/cruises/yacht-birthday-party" },
  { label: "Yacht Wedding", href: "/cruises/yacht-weddings" },
  { label: "Bachelorette Party", href: "/cruises/bachelorette-yacht-party" },
  { label: "Wedding Anniversary", href: "/cruises/wedding-anniversary" },
  { label: "Corporate Event", href: "/cruises/corporate-event-bosphorus-cruise" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
  { label: "All Cruises", href: "/cruises" },
  { label: "Private Tours", href: "/private-tours" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--brand-dark)] text-white/90 pb-24 lg:pb-0">
      <div className="container-main py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                <Anchor className="w-5 h-5 text-[var(--brand-gold)]" />
              </div>
              <span className="text-xl font-bold tracking-wide">
                Merry<span className="text-[var(--brand-gold)]">Sails</span>
              </span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed mb-4 max-w-sm">
              Over 23 years serving travelers since 2001. A brand of Merry Tourism —
              TURSAB licensed, A Group travel agency. All guides hold Professional Tourist
              Guidance Certificates.
            </p>
            <div className="flex items-center gap-3 mb-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
            {/* Contact */}
            <div className="space-y-2.5">
              <a href="tel:+905370406822" className="flex items-center gap-2 text-sm text-white/60 hover:text-[var(--brand-gold)] transition-colors">
                <Phone className="w-4 h-4 shrink-0" />
                +90 537 040 68 22
              </a>
              <a href="tel:+905364146605" className="flex items-center gap-2 text-sm text-white/60 hover:text-[var(--brand-gold)] transition-colors">
                <Phone className="w-4 h-4 shrink-0" />
                +90 536 414 66 05
              </a>
              <a href="https://wa.me/905370406822" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white/60 hover:text-[var(--brand-gold)] transition-colors">
                <Phone className="w-4 h-4 shrink-0" />
                WhatsApp
              </a>
              <a href="mailto:info@merrytourism.com" className="flex items-center gap-2 text-sm text-white/60 hover:text-[var(--brand-gold)] transition-colors">
                <Mail className="w-4 h-4 shrink-0" />
                info@merrytourism.com
              </a>
              <div className="flex items-start gap-2 text-sm text-white/60">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                Alemdar Mah. Divanyolu Cad. Oğul Han No:62 İç Kapı No: 402, 34093 Fatih/İstanbul
              </div>
            </div>
          </div>

          {/* Cruises */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-white uppercase tracking-wider">Bosphorus Cruises</h4>
            <ul className="space-y-2.5">
              {cruiseLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-[var(--brand-gold)] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Organizations */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-white uppercase tracking-wider">Yacht Organizations</h4>
            <ul className="space-y-2.5">
              {orgLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-[var(--brand-gold)] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-white uppercase tracking-wider">Company</h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-[var(--brand-gold)] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">
            © 2026 MerrySails — Merry Tourism. TURSAB Licensed. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="text-xs text-white/40 hover:text-white/60 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-white/40 hover:text-white/60 transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
