"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, ChevronDown, Anchor } from "lucide-react";

const navigation = [
  { name: "Ana Sayfa", href: "/" },
  {
    name: "Turlarımız",
    href: "/cruises",
    children: [
      { name: "Gün Batımı Turu", href: "/cruises/sunset-cruise" },
      { name: "Yemekli Akşam Turu", href: "/cruises/dinner-cruise" },
      { name: "Boğaz Keşif Turu", href: "/cruises/bosphorus-sightseeing" },
      { name: "Sabah Kahvaltı Turu", href: "/cruises/breakfast-cruise" },
      { name: "VIP Dinner Cruise", href: "/cruises/vip-dinner-cruise" },
      { name: "Adalar Turu", href: "/cruises/princes-islands" },
    ],
  },
  {
    name: "Özel Organizasyonlar",
    href: "/events",
    children: [
      { name: "Özel Yat Kiralama", href: "/cruises/private-yacht" },
      { name: "Evlilik Teklifi", href: "/cruises/proposal-package" },
      { name: "Kurumsal Etkinlikler", href: "/events" },
    ],
  },
  { name: "Filomuz", href: "/fleet" },
  { name: "Galeri", href: "/gallery" },
  { name: "Hakkımızda", href: "/about" },
  { name: "İletişim", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-primary/95 backdrop-blur-md shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-[1290px] mx-auto px-5">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-secondary rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
              <Anchor className="w-5 h-5 text-primary" />
            </div>
            <div className="leading-tight">
              <span className="text-white font-heading text-xl font-bold tracking-wide">
                Merry<span className="text-secondary">Sails</span>
              </span>
              <p className="text-white/40 text-[10px] tracking-wider uppercase">
                Merry Tourism
              </p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="px-3.5 py-2 text-[14px] font-medium text-white/80 hover:text-secondary transition-colors flex items-center gap-1 rounded-lg"
                >
                  {item.name}
                  {item.children && <ChevronDown className="w-3.5 h-3.5 opacity-50" />}
                </Link>
                {item.children && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 animate-fade-in">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className="block px-4 py-2.5 text-[14px] text-gray-600 hover:text-accent hover:bg-bg-secondary transition-colors"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+905321234567"
              className="text-white/70 hover:text-white transition-colors flex items-center gap-1.5 text-sm"
            >
              <Phone className="w-4 h-4" />
              +90 532 123 45 67
            </a>
            <Link href="/booking" className="bg-accent hover:bg-accent-hover text-white py-2.5 px-5 rounded-xl font-semibold text-[13px] transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2">
              Book Now
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white p-2"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-primary border-t border-white/10 mt-2 animate-fade-in">
          <div className="max-w-[1290px] mx-auto px-5 py-5 space-y-1">
            {navigation.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  onClick={() => !item.children && setMobileOpen(false)}
                  className="block px-3 py-3 text-white/80 hover:text-secondary transition-colors text-[15px] font-medium"
                >
                  {item.name}
                </Link>
                {item.children && (
                  <div className="ml-5 space-y-0.5 border-l border-white/10 pl-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="block py-2 text-white/50 hover:text-secondary transition-colors text-sm"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <a href="tel:+905321234567" className="flex items-center gap-2 text-white/60 px-3 py-2 text-sm">
                <Phone className="w-4 h-4" />
                +90 532 123 45 67
              </a>
              <Link
                href="/booking"
                onClick={() => setMobileOpen(false)}
                className="block bg-accent text-white text-center py-3 rounded-xl font-semibold text-sm"
              >
                Rezervasyon Yap
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
