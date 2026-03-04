"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, ChevronDown, Anchor } from "lucide-react";

interface NavChild {
  name: string;
  href: string;
}

interface NavItem {
  name: string;
  href: string;
  children?: NavChild[];
}

const navItems: NavItem[] = [
  {
    name: "Turlarımız",
    href: "/cruises",
    children: [
      { name: "Gün Batımı Turu", href: "/cruises/sunset-cruise" },
      { name: "Yemekli Akşam Turu", href: "/cruises/dinner-cruise" },
      { name: "Boğaz Keşif Turu", href: "/cruises/bosphorus-sightseeing" },
      { name: "VIP Dinner Cruise", href: "/cruises/vip-dinner-cruise" },
    ],
  },
  {
    name: "Özel Yat",
    href: "/cruises/private-yacht",
    children: [
      { name: "Evlilik Teklifi", href: "/cruises/proposal-package" },
      { name: "Doğum Günü", href: "/events" },
      { name: "Kurumsal Etkinlik", href: "/events" },
    ],
  },
  { name: "Hakkımızda", href: "/about" },
  { name: "İletişim", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dd, setDd] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-[var(--color-gold)] rounded-lg flex items-center justify-center">
            <Anchor className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span
              className={`text-xl font-bold leading-tight transition-colors ${
                scrolled ? "text-[var(--color-heading)]" : "text-white"
              }`}
            >
              Merry
              <span className="text-[var(--color-gold)]">Sails</span>
            </span>
            <span
              className={`text-[10px] tracking-widest uppercase transition-colors ${
                scrolled ? "text-[var(--color-heading)]/50" : "text-white/60"
              }`}
            >
              Merry Tourism
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() => item.children && setDd(item.name)}
              onMouseLeave={() => setDd(null)}
            >
              <Link
                href={item.href}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  scrolled
                    ? "text-[var(--color-heading)]/70 hover:text-[var(--color-sunset)]"
                    : "text-white/85 hover:text-white"
                }`}
              >
                {item.name}
                {item.children && (
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      dd === item.name ? "rotate-180" : ""
                    }`}
                  />
                )}
              </Link>

              {/* Dropdown */}
              {item.children && dd === item.name && (
                <div className="absolute top-full left-0 pt-2">
                  <div className="bg-white rounded-xl shadow-xl py-2 min-w-[220px]">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className="block px-4 py-2.5 text-sm text-[var(--color-heading)]/70 hover:text-[var(--color-gold)] hover:bg-[var(--color-gold)]/5 transition-colors"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right Side */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:+905321234567"
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${
              scrolled
                ? "text-[var(--color-heading)]/70 hover:text-[var(--color-sunset)]"
                : "text-white/85 hover:text-white"
            }`}
          >
            <Phone className="w-4 h-4" />
            +90 532 123 45 67
          </a>
          <Link href="/booking" className="btn-cta text-sm !py-2.5 !px-5">
            Book Now
          </Link>
        </div>

        {/* Mobile Burger */}
        <button
          onClick={() => setOpen(!open)}
          className={`lg:hidden p-2 rounded-lg transition-colors ${
            scrolled
              ? "text-[var(--color-heading)]"
              : "text-white"
          }`}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-white shadow-lg">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  onClick={() => !item.children && setOpen(false)}
                  className="block px-4 py-3 text-[var(--color-heading)] font-medium text-sm rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {item.name}
                </Link>
                {item.children && (
                  <div className="ml-4 pl-4 border-l-2 border-gray-100 flex flex-col gap-0.5">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        onClick={() => setOpen(false)}
                        className="block px-4 py-2.5 text-sm text-[var(--color-heading)]/60 hover:text-[var(--color-gold)] transition-colors"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="mt-4 pt-4 border-t border-gray-100">
              <Link
                href="/booking"
                onClick={() => setOpen(false)}
                className="btn-cta w-full text-center block"
              >
                Rezervasyon Yap
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
