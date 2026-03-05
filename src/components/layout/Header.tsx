"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, ChevronDown, Anchor } from "lucide-react";

const navItems = [
  { label: "Sunset Cruise", href: "/cruises/sunset-cruise" },
  {
    label: "Private Yacht",
    href: "/cruises/private-yacht",
    children: [
      { label: "Proposal", href: "/cruises/proposal-cruise" },
      { label: "Birthday", href: "/cruises/birthday-yacht" },
      { label: "Corporate", href: "/cruises/corporate-cruise" },
    ],
  },
  { label: "Dinner Cruise", href: "/cruises/dinner-cruise" },
  { label: "Yacht Charter", href: "/cruises/private-yacht" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1290px] mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
              <Anchor className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span
                className={`text-lg font-bold leading-tight ${
                  scrolled ? "text-heading" : "text-white"
                }`}
              >
                Merry<span className="text-secondary">Sails</span>
              </span>
              <span
                className={`text-[10px] leading-tight ${
                  scrolled ? "text-text-light" : "text-white/70"
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
                key={item.label}
                className="relative"
                onMouseEnter={() =>
                  item.children && setDropdownOpen(item.label)
                }
                onMouseLeave={() =>
                  item.children && setDropdownOpen(null)
                }
              >
                <Link
                  href={item.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                    scrolled
                      ? "text-heading hover:bg-bg"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                  )}
                </Link>

                {item.children && dropdownOpen === item.label && (
                  <div className="absolute top-full left-0 pt-1 min-w-[200px]">
                    <div className="bg-white rounded-xl shadow-xl border border-border p-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-heading hover:bg-bg rounded-lg transition-colors"
                        >
                          {child.label}
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
              href="tel:+905524638498"
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                scrolled
                  ? "text-heading hover:text-primary"
                  : "text-white/90 hover:text-white"
              }`}
            >
              <Phone className="w-4 h-4" />
              +90 552 463 84 98
            </a>
            <Link href="/contact" className="btn-cta text-sm px-5 py-2.5">
              Book Now
            </Link>
          </div>

          {/* Mobile Burger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              scrolled
                ? "text-heading hover:bg-bg"
                : "text-white hover:bg-white/10"
            }`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-white z-40 overflow-y-auto">
          <div className="px-4 py-6 space-y-1">
            {navItems.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => {
                    if (!item.children) setMobileOpen(false);
                  }}
                  className="flex items-center justify-between px-4 py-3 text-heading font-medium rounded-lg hover:bg-bg transition-colors"
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      className="w-4 h-4 text-text-light cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setDropdownOpen(
                          dropdownOpen === item.label ? null : item.label
                        );
                      }}
                    />
                  )}
                </Link>

                {item.children && dropdownOpen === item.label && (
                  <div className="ml-4 pl-4 border-l-2 border-border space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="block px-4 py-2.5 text-sm text-text-light hover:text-heading rounded-lg hover:bg-bg transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="pt-4 mt-4 border-t border-border space-y-3">
              <a
                href="tel:+905524638498"
                className="flex items-center gap-3 px-4 py-3 text-heading font-medium"
              >
                <Phone className="w-5 h-5 text-secondary" />
                +90 552 463 84 98
              </a>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="btn-cta block text-center mx-4 py-3"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
