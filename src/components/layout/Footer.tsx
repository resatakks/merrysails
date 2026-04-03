import Link from "next/link";
import { Anchor, Phone, Mail, MapPin, Instagram, Facebook, Youtube } from "lucide-react";

const cruiseLinks = [
  { label: "Sunset Cruise", href: "/cruises/bosphorus-sunset-cruise" },
  { label: "Dinner Cruise", href: "/cruises/bosphorus-dinner-cruise" },
  { label: "Short Cruise", href: "/cruises/bosphorus-sightseeing-cruise" },
  { label: "Yacht Charter", href: "/cruises/yacht-charter-in-istanbul" },
  { label: "Lunch Cruise", href: "/cruises/istanbul-bosphorus-lunch-cruise" },
  { label: "Princes' Islands", href: "/cruises/istanbul-princes-island-tour" },
  { label: "Private Sunset Yacht", href: "/cruises/private-bosphorus-sunset-cruise" },
  { label: "Old City Tour", href: "/cruises/full-day-istanbul-old-city-tour" },
  { label: "Cruise Ship Tour", href: "/cruises/bosphorus-cruise-for-cruise-passengers" },
  { label: "NYE Party Cruise", href: "/cruises/new-years-eve-party-cruise" },
];

const orgLinks = [
  { label: "Marriage Proposal", href: "/cruises/romantic-marriage-proposal" },
  { label: "Birthday Party", href: "/cruises/yacht-birthday-party" },
  { label: "Yacht Wedding", href: "/cruises/yacht-weddings" },
  { label: "Bachelorette Party", href: "/cruises/bachelorette-yacht-party" },
  { label: "Wedding Anniversary", href: "/cruises/wedding-anniversary" },
  { label: "Corporate Event", href: "/cruises/corporate-event-bosphorus-cruise" },
];

const blogLinks = [
  { label: "Best Bosphorus Cruise Guide", href: "/blog/best-bosphorus-cruise-istanbul-guide" },
  { label: "Dinner Cruise — What to Expect", href: "/blog/bosphorus-dinner-cruise-what-to-expect" },
  { label: "Istanbul Sunset Cruise", href: "/blog/istanbul-sunset-cruise-experience" },
  { label: "Private Yacht Charter Guide", href: "/blog/private-yacht-charter-istanbul-guide" },
  { label: "Top Things to Do Istanbul", href: "/blog/top-things-to-do-istanbul" },
  { label: "Istanbul Travel Guide", href: "/blog/istanbul-travel-guide-first-timers" },
];

const guideLinks = [
  { label: "Bosphorus Strait", href: "/guides/bosphorus-strait" },
  { label: "Maiden's Tower", href: "/guides/maidens-tower" },
  { label: "Dolmabahce Palace", href: "/guides/dolmabahce-palace" },
  { label: "Princes' Islands", href: "/guides/buyukada-princes-islands" },
  { label: "Rumeli Fortress", href: "/guides/rumeli-fortress" },
  { label: "Galata Bridge", href: "/guides/galata-bridge-eminonu" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
  { label: "Istanbul Dinner Cruise", href: "/istanbul-dinner-cruise" },
  { label: "Yacht Charter Istanbul", href: "/yacht-charter-istanbul" },
  { label: "All Cruises", href: "/cruises" },
  { label: "Private Tours", href: "/private-tours" },
  { label: "Blog", href: "/blog" },
  { label: "Istanbul Guides", href: "/guides" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--brand-dark)] text-white/90 pb-24 lg:pb-6">
      <div className="container-main pt-14 pb-10">
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
              Over 25 years serving travelers since 2001. A brand of Merry Tourism —
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
              <a href="mailto:info@merrysails.com" className="flex items-center gap-2 text-sm text-white/60 hover:text-[var(--brand-gold)] transition-colors">
                <Mail className="w-4 h-4 shrink-0" />
                info@merrysails.com
              </a>
              <div className="flex items-start gap-2 text-sm text-white/60">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                Alemdar Mah. Divanyolu Cad. Oğul Han No:62 İç Kapı No: 402, 34093 Fatih/İstanbul
              </div>
            </div>
          </div>

          {/* Cruises */}
          <div>
            <h4 className="text-sm font-bold mb-4 text-[var(--brand-gold)] uppercase tracking-wider">Bosphorus Cruises</h4>
            <ul className="space-y-2.5">
              {cruiseLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/80 hover:text-[var(--brand-gold)] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Organizations */}
          <div>
            <h4 className="text-sm font-bold mb-4 text-[var(--brand-gold)] uppercase tracking-wider">Yacht Organizations</h4>
            <ul className="space-y-2.5">
              {orgLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/80 hover:text-[var(--brand-gold)] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-bold mb-4 text-[var(--brand-gold)] uppercase tracking-wider">Company</h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/80 hover:text-[var(--brand-gold)] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Additional Links Row */}
        <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-sm font-bold mb-3 text-[var(--brand-gold)] uppercase tracking-wider">Popular Blog Posts</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
              {blogLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/70 hover:text-[var(--brand-gold)] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold mb-3 text-[var(--brand-gold)] uppercase tracking-wider">Istanbul Landmark Guides</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
              {guideLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/70 hover:text-[var(--brand-gold)] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        

        {/* 7/24 Online Contact Bar */}
        <div className="mt-16 w-full bg-[#1e1e1e] rounded-xl px-4 py-6 md:px-8 border border-white/10 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
            {/* Logo Alanı */}
            <div className="flex items-center">
               <Link href="/" className="flex items-center gap-2">
                 <div className="w-8 h-8 md:w-10 md:h-10 relative bg-[#c8a45d] rounded-xl flex items-center justify-center shadow-lg shadow-[#c8a45d]/30 -rotate-3">
                   <span className="text-[#0a1e3a] font-bold text-lg md:text-xl rotate-3">M</span>
                 </div>
                 <span className="text-white font-bold text-lg md:text-xl tracking-wide uppercase">
                   MERRY <span className="font-light text-[#c8a45d]">SAILS</span>
                 </span>
               </Link>
            </div>

            {/* İletişim Bilgileri */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 w-full md:w-auto">
              <a 
                href="mailto:info@merrysails.com" 
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <div className="w-10 h-10 rounded-full border border-red-500/30 flex items-center justify-center text-red-500 relative bg-red-500/10">
                  <span className="text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                  </span>
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#1e1e1e]"></span>
                </div>
                <div>
                  <div className="text-[10px] md:text-xs text-gray-400 capitalize whitespace-nowrap">7/24 Online</div>
                  <div className="text-xs md:text-sm text-white font-medium whitespace-nowrap">info@merrysails.com</div>
                </div>
              </a>

              <a 
                href="tel:+905337036849" 
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <div className="w-10 h-10 rounded-full border border-red-500/30 flex items-center justify-center text-red-500 relative bg-red-500/10">
                  <span className="text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </span>
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse border-2 border-[#1e1e1e]"></span>
                </div>
                <div>
                  <div className="text-[10px] md:text-xs text-gray-400 capitalize whitespace-nowrap">7/24 Online</div>
                  <div className="text-xs md:text-sm text-white font-medium whitespace-nowrap">+90 533 703 68 49</div>
                 </div>
              </a>

              <a 
                href="https://wa.me/905337036849" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <div className="w-10 h-10 rounded-full border border-green-500/30 flex items-center justify-center text-green-500 relative bg-green-500/10">
                  <span className="text-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"></path><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"></path></svg>
                  </span>
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse border-2 border-[#1e1e1e]"></span>
                </div>
                <div>
                  <div className="text-[10px] md:text-xs text-gray-400 capitalize whitespace-nowrap">7/24 Online</div>
                  <div className="text-xs md:text-sm text-white font-medium whitespace-nowrap">+90 533 703 68 49</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/15 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/70">
            © 2026 MerrySails — Merry Tourism. TURSAB Licensed. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="text-sm text-white/70 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-white/70 hover:text-white transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
