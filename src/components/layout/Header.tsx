"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, ChevronDown, Anchor } from "lucide-react";

const nav = [
  { name: "Sunset Cruise", href: "/cruises/sunset-cruise" },
  { name: "Turlarımız", href: "/cruises", children: [
    { name: "Gün Batımı Turu", href: "/cruises/sunset-cruise" },
    { name: "Yemekli Akşam Turu", href: "/cruises/dinner-cruise" },
    { name: "Boğaz Keşif Turu", href: "/cruises/bosphorus-sightseeing" },
    { name: "VIP Dinner Cruise", href: "/cruises/vip-dinner-cruise" },
  ]},
  { name: "Özel Yat", href: "/cruises/private-yacht", children: [
    { name: "Evlilik Teklifi", href: "/cruises/proposal-package" },
    { name: "Doğum Günü", href: "/events" },
    { name: "Kurumsal Etkinlik", href: "/events" },
  ]},
  { name: "Hakkımızda", href: "/about" },
  { name: "İletişim", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dd, setDd] = useState<string | null>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"}`}>
      <div className="max-w-[1290px] mx-auto px-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center"><Anchor className="w-5 h-5 text-white" /></div>
          <div>
            <span className={`text-xl font-bold ${scrolled ? "text-heading" : "text-white"}`}>Merry<span className="text-gold">Sails</span></span>
            <p className={`text-[10px] tracking-wider uppercase ${scrolled ? "text-muted" : "text-white/50"}`}>Merry Tourism</p>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((item) => (
            <div key={item.name} className="relative" onMouseEnter={() => item.children && setDd(item.name)} onMouseLeave={() => setDd(null)}>
              <Link href={item.href} className={`px-3 py-2 text-[14px] font-medium flex items-center gap-1 rounded-lg transition-colors ${scrolled ? "text-heading/70 hover:text-primary" : "text-white/85 hover:text-white"}`}>
                {item.name}{item.children && <ChevronDown className="w-3.5 h-3.5 opacity-50" />}
              </Link>
              {item.children && dd === item.name && (
                <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-xl py-2 fade-in">
                  {item.children.map((c) => <Link key={c.name} href={c.href} className="block px-4 py-2 text-sm text-[var(--text)] hover:text-primary hover:bg-bg transition-colors">{c.name}</Link>)}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a href="tel:+905321234567" className={`text-sm flex items-center gap-1.5 transition-colors ${scrolled ? "text-heading/60 hover:text-primary" : "text-white/70 hover:text-white"}`}><Phone className="w-4 h-4" />+90 532 123 45 67</a>
          <Link href="/booking" className="btn-cta text-sm !py-2.5 !px-5">Book Now</Link>
        </div>

        <button onClick={() => setOpen(!open)} className={`lg:hidden p-2 ${scrolled ? "text-heading" : "text-white"}`}>{open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button>
      </div>

      {open && (
        <div className="lg:hidden bg-white shadow-lg mt-2 fade-in">
          <div className="max-w-[1290px] mx-auto px-5 py-4 space-y-1">
            {nav.map((item) => (
              <div key={item.name}>
                <Link href={item.href} onClick={() => !item.children && setOpen(false)} className="block px-3 py-2.5 text-heading/80 hover:text-primary text-sm font-medium">{item.name}</Link>
                {item.children && <div className="ml-5 border-l border-border pl-3">{item.children.map((c) => <Link key={c.name} href={c.href} onClick={() => setOpen(false)} className="block py-1.5 text-muted hover:text-primary text-sm">{c.name}</Link>)}</div>}
              </div>
            ))}
            <div className="pt-3 border-t border-border"><Link href="/booking" onClick={() => setOpen(false)} className="btn-cta w-full justify-center text-sm !py-3">Rezervasyon Yap</Link></div>
          </div>
        </div>
      )}
    </header>
  );
}
