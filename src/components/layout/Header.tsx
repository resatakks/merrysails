"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, ChevronDown, Anchor } from "lucide-react";

const navigation = [
  { name: "Ana Sayfa", href: "/" },
  { name: "Turlarımız", href: "/cruises", children: [
    { name: "Gün Batımı Turu", href: "/cruises/sunset-cruise" },
    { name: "Yemekli Akşam Turu", href: "/cruises/dinner-cruise" },
    { name: "Boğaz Keşif Turu", href: "/cruises/bosphorus-sightseeing" },
    { name: "Sabah Kahvaltı Turu", href: "/cruises/breakfast-cruise" },
    { name: "VIP Dinner Cruise", href: "/cruises/vip-dinner-cruise" },
    { name: "Adalar Turu", href: "/cruises/princes-islands" },
  ]},
  { name: "Özel Organizasyonlar", href: "/events", children: [
    { name: "Özel Yat Kiralama", href: "/cruises/private-yacht" },
    { name: "Evlilik Teklifi", href: "/cruises/proposal-package" },
    { name: "Kurumsal Etkinlikler", href: "/events" },
  ]},
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"}`}>
      <div className="max-w-[1290px] mx-auto px-5">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-secondary rounded-lg flex items-center justify-center"><Anchor className="w-5 h-5 text-white" /></div>
            <span className={`font-heading text-xl font-bold ${scrolled ? "text-heading" : "text-white"}`}>Merry<span className="text-secondary">Sails</span></span>
          </Link>
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <div key={item.name} className="relative" onMouseEnter={() => item.children && setActiveDropdown(item.name)} onMouseLeave={() => setActiveDropdown(null)}>
                <Link href={item.href} className={`px-3 py-2 text-sm font-medium transition-colors flex items-center gap-1 rounded-lg ${scrolled ? "text-heading/70 hover:text-primary" : "text-white/80 hover:text-white"}`}>
                  {item.name}{item.children && <ChevronDown className="w-3.5 h-3.5 opacity-50" />}
                </Link>
                {item.children && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-gray-100/50 py-2 animate-fade-in">
                    {item.children.map((child) => (<Link key={child.name} href={child.href} className="block px-4 py-2.5 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors">{child.name}</Link>))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:+905321234567" className={`flex items-center gap-1.5 text-sm transition-colors ${scrolled ? "text-heading/60 hover:text-primary" : "text-white/70 hover:text-white"}`}><Phone className="w-4 h-4" />+90 532 123 45 67</a>
            <Link href="/booking" className="bg-secondary hover:bg-secondary-hover text-white py-2.5 px-6 rounded-full font-semibold text-sm transition-all hover:-translate-y-0.5">Book Now</Link>
          </div>
          <button onClick={() => setMobileOpen(!mobileOpen)} className={`lg:hidden p-2 ${scrolled ? "text-heading" : "text-white"}`} aria-label="Menu">{mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button>
        </div>
      </div>
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 mt-2 animate-fade-in shadow-lg">
          <div className="max-w-[1290px] mx-auto px-5 py-4 space-y-1">
            {navigation.map((item) => (
              <div key={item.name}>
                <Link href={item.href} onClick={() => !item.children && setMobileOpen(false)} className="block px-3 py-2.5 text-heading/80 hover:text-primary text-sm font-medium">{item.name}</Link>
                {item.children && (<div className="ml-5 border-l border-gray-200 pl-3">{item.children.map((child) => (<Link key={child.name} href={child.href} onClick={() => setMobileOpen(false)} className="block py-2 text-gray-500 hover:text-primary text-sm">{child.name}</Link>))}</div>)}
              </div>
            ))}
            <div className="pt-3 border-t border-gray-100"><Link href="/booking" onClick={() => setMobileOpen(false)} className="block bg-secondary text-white text-center py-3 rounded-full font-semibold text-sm">Rezervasyon Yap</Link></div>
          </div>
        </div>
      )}
    </header>
  );
}
