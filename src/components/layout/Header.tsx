"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

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
  { name: "Blog", href: "/blog" },
  { name: "Hakkımızda", href: "/about" },
  { name: "İletişim", href: "/contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-deep-navy/95 backdrop-blur-md shadow-lg py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center text-deep-navy font-bold text-lg group-hover:bg-gold-light transition-colors">
              M
            </div>
            <div>
              <span className="text-white font-heading text-xl font-bold tracking-wide">
                Merry<span className="text-gold">Sails</span>
              </span>
              <p className="text-white/50 text-[10px] leading-none -mt-0.5">
                by Merry Tourism
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="px-3 py-2 text-sm text-white/80 hover:text-gold transition-colors flex items-center gap-1"
                >
                  {item.name}
                  {item.children && <ChevronDown className="w-3 h-3" />}
                </Link>
                {item.children && openDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-deep-navy/95 backdrop-blur-md rounded-lg shadow-xl border border-white/10 py-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-white/70 hover:text-gold hover:bg-white/5 transition-colors"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA + Phone */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+905321234567"
              className="text-white/70 hover:text-gold transition-colors flex items-center gap-1.5 text-sm"
            >
              <Phone className="w-4 h-4" />
              <span>+90 532 123 45 67</span>
            </a>
            <Link
              href="/booking"
              className="bg-sunset hover:bg-sunset-light text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-all hover:shadow-lg hover:shadow-sunset/25"
            >
              Rezervasyon Yap
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden text-white p-2"
            aria-label="Menüyü aç"
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="lg:hidden bg-deep-navy/98 backdrop-blur-md border-t border-white/10 mt-2">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navigation.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  onClick={() => !item.children && setIsMobileOpen(false)}
                  className="block px-3 py-2.5 text-white/80 hover:text-gold transition-colors text-base"
                >
                  {item.name}
                </Link>
                {item.children && (
                  <div className="ml-4 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        onClick={() => setIsMobileOpen(false)}
                        className="block px-3 py-2 text-white/60 hover:text-gold transition-colors text-sm"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <a
                href="tel:+905321234567"
                className="flex items-center gap-2 text-white/70 px-3 py-2"
              >
                <Phone className="w-4 h-4" />
                +90 532 123 45 67
              </a>
              <Link
                href="/booking"
                onClick={() => setIsMobileOpen(false)}
                className="block bg-sunset hover:bg-sunset-light text-white text-center px-5 py-3 rounded-lg font-semibold transition-all"
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
