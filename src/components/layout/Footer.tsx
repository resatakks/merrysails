import Link from "next/link";
import { Anchor, Phone, Mail, MapPin, Instagram, Facebook, Youtube } from "lucide-react";

const cruiseLinks = [
  { label: "Sunset Cruise", href: "/cruises/sunset-cruise" },
  { label: "Dinner Cruise", href: "/cruises/dinner-cruise" },
  { label: "Private Yacht", href: "/cruises/private-yacht" },
  { label: "Short Cruise", href: "/cruises/bosphorus-sightseeing" },
  { label: "Princes' Islands", href: "/cruises/princes-islands" },
];

const orgLinks = [
  { label: "Marriage Proposal", href: "/cruises/proposal-cruise" },
  { label: "Birthday Party", href: "/cruises/birthday-yacht" },
  { label: "Corporate Event", href: "/cruises/corporate-cruise" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
  { label: "All Cruises", href: "/cruises" },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--brand-dark)] text-white/90 pb-24 lg:pb-0">
      <div className="container-main py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                <Anchor className="w-5 h-5 text-[var(--brand-gold)]" />
              </div>
              <span className="text-xl font-bold">
                Merry<span className="text-[var(--brand-gold)]">Sails</span>
              </span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed mb-4">
              Over 23 years serving travelers since 2001. Licensed by TURSAB, 
              operated by Merry Tourism — your trusted local partner in Istanbul.
            </p>
            <div className="flex items-center gap-3">
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
          </div>

          {/* Cruises */}
          <div>
            <h4 className="text-base font-semibold mb-4 text-white">Bosphorus Cruises</h4>
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
            <h4 className="text-base font-semibold mb-4 text-white">Yacht Organizations</h4>
            <ul className="space-y-2.5">
              {orgLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-[var(--brand-gold)] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="text-base font-semibold mb-4 mt-6 text-white">Company</h4>
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

          {/* Contact */}
          <div>
            <h4 className="text-base font-semibold mb-4 text-white">Contact</h4>
            <div className="space-y-3">
              <a href="tel:+905524638498" className="flex items-start gap-3 text-sm text-white/60 hover:text-[var(--brand-gold)] transition-colors">
                <Phone className="w-4 h-4 mt-0.5 shrink-0" />
                +90 552 463 84 98
              </a>
              <a href="https://wa.me/905524638498" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-sm text-white/60 hover:text-[var(--brand-gold)] transition-colors">
                <Phone className="w-4 h-4 mt-0.5 shrink-0" />
                WhatsApp
              </a>
              <a href="mailto:info@merrysails.com" className="flex items-start gap-3 text-sm text-white/60 hover:text-[var(--brand-gold)] transition-colors">
                <Mail className="w-4 h-4 mt-0.5 shrink-0" />
                info@merrysails.com
              </a>
              <div className="flex items-start gap-3 text-sm text-white/60">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                Arap Cami, Beyoğlu, Istanbul
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">
            © 2025 MerrySails — Merry Tourism. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/faq" className="text-xs text-white/40 hover:text-white/60 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/faq" className="text-xs text-white/40 hover:text-white/60 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
