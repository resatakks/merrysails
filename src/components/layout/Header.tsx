"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, ChevronDown, Anchor, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { isPromoActive, getSunsetPrice, SUNSET_PROMO } from "@/lib/promo";

const navItems = [
  {
    label: "Sunset Cruise",
    href: "/cruises/bosphorus-sunset-cruise",
  },
  {
    label: "Private Yacht",
    href: "/private-tours",
    children: [
      { label: "Romantic Marriage Proposal", href: "/cruises/romantic-marriage-proposal" },
      { label: "Yacht Birthday Party", href: "/cruises/yacht-birthday-party" },
      { label: "Exclusive Yacht Wedding", href: "/cruises/yacht-weddings" },
      { label: "Bachelorette Yacht Party", href: "/cruises/bachelorette-yacht-party" },
      { label: "Wedding Anniversary", href: "/cruises/wedding-anniversary" },
      { label: "Corporate Event Cruise", href: "/cruises/corporate-event-bosphorus-cruise" },
      { label: "Private Swimming Tour", href: "/cruises/private-yacht-swimming-tour" },
    ],
  },
  {
    label: "Dinner Cruise",
    href: "/cruises/bosphorus-dinner-cruise",
  },
  {
    label: "Yacht Charter",
    href: "/cruises/yacht-charter-in-istanbul",
  },
  {
    label: "Tours",
    href: "/cruises",
    children: [
      { label: "Princes' Islands Tour", href: "/cruises/istanbul-princes-island-tour" },
      { label: "Old City Tour", href: "/cruises/full-day-istanbul-old-city-tour" },
      { label: "Lunch Cruise & Two Continents", href: "/cruises/istanbul-bosphorus-lunch-cruise" },
      { label: "Short Bosphorus Cruise", href: "/cruises/bosphorus-sightseeing-cruise" },
    ],
  },
  { label: "About", href: "/about" },
  {
    label: "Blog",
    href: "/blog",
    children: [
      { label: "Cruise Guides", href: "/blog" },
      { label: "Istanbul Landmark Guides", href: "/guides" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const [promoDismissed, setPromoDismissed] = useState(false);

  const promoActive = isPromoActive();
  const sunsetPrice = getSunsetPrice();
  // Are we on a non-sunset tour page?
  const isTourPage = pathname.startsWith("/cruises/") && pathname !== "/cruises";
  const isSunsetPage = pathname === `/cruises/${SUNSET_PROMO.slug}`;
  const isOtherTourPage = isTourPage && !isSunsetPage;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Promo bar — contextual */}
      {promoActive && !promoDismissed && (
        <div className="bg-[var(--brand-primary)] text-white text-center text-sm py-1.5 px-4 relative">
          {isOtherTourPage ? (
            // Cross-sell on other tour pages
            <>
              <Link href={`/cruises/${SUNSET_PROMO.slug}`} className="hover:underline">
                <span className="opacity-90">✨ Add a Sunset Cruise to your trip —</span>{" "}
                <span className="font-bold text-[var(--brand-gold)]">€{SUNSET_PROMO.promoPrice}/person</span>
              </Link>
              <button
                onClick={() => setPromoDismissed(true)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 hover:bg-white/20 rounded"
                aria-label="Dismiss"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            // Full promo on homepage, sunset page, etc.
            <Link href={`/cruises/${SUNSET_PROMO.slug}`} className="hover:underline">
              <span className="font-semibold">{SUNSET_PROMO.label}</span> — Bosphorus Sunset Cruise{" "}
              <span className="font-bold text-[var(--brand-gold)]">€{SUNSET_PROMO.promoPrice}</span>{" "}
              <span className="line-through opacity-70">€{SUNSET_PROMO.regularPrice}</span>
            </Link>
          )}
        </div>
      )}

      <div className={`transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-md"
          : "bg-white/95 backdrop-blur-sm"
      }`}>
      <div className="container-main">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 bg-[var(--brand-primary)] rounded-xl flex items-center justify-center">
              <Anchor className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-[var(--heading)]">
                Merry<span className="text-[var(--brand-primary)]">Sails</span>
              </span>
              <span className="block text-[10px] text-[var(--text-muted)] leading-none -mt-0.5">
                Merry Tourism
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-[var(--body-text)] hover:text-[var(--brand-primary)] transition-colors rounded-lg hover:bg-gray-50"
                >
                  {item.label}
                  {item.children && <ChevronDown className="w-3.5 h-3.5" />}
                </Link>
                {item.children && openDropdown === item.label && (
                  <div className="absolute top-full left-0 pt-1 z-50">
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 py-2 min-w-[260px]">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-[var(--body-text)] hover:text-[var(--brand-primary)] hover:bg-gray-50 transition-colors"
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

          {/* Right side */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+905370406822"
              className="hidden md:flex items-center gap-2 text-sm font-medium text-[var(--body-text)] hover:text-[var(--brand-primary)] transition-colors"
            >
              <Phone className="w-4 h-4" />
              +90 537 040 68 22
            </a>

            <Link href="/cruises/bosphorus-sunset-cruise">
              <button className="btn-cta text-sm !py-2.5 !px-5">
                Book Now
              </button>
            </Link>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-white p-0">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col h-full overflow-y-auto">
                  <div className="p-6 pb-0">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-10 h-10 bg-[var(--brand-primary)] rounded-xl flex items-center justify-center">
                        <Anchor className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xl font-bold text-[var(--heading)]">
                        Merry<span className="text-[var(--brand-primary)]">Sails</span>
                      </span>
                    </div>
                  </div>
                  <nav className="flex-1 px-6 space-y-0.5 overflow-y-auto">
                    {navItems.map((item) => (
                      <div key={item.label}>
                        {item.children ? (
                          <>
                            <div className="flex items-center">
                              <Link
                                href={item.href}
                                className="flex-1 px-4 py-3 text-base font-medium text-[var(--body-text)] hover:text-[var(--brand-primary)] hover:bg-gray-50 rounded-lg transition-colors"
                              >
                                {item.label}
                              </Link>
                              <button
                                onClick={() => setOpenMobileDropdown(openMobileDropdown === item.label ? null : item.label)}
                                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-50 transition-colors"
                              >
                                <ChevronDown className={`w-4 h-4 text-[var(--text-muted)] transition-transform duration-200 ${openMobileDropdown === item.label ? "rotate-180" : ""}`} />
                              </button>
                            </div>
                            {openMobileDropdown === item.label && (
                              <div className="pb-1">
                                {item.children.map((child) => (
                                  <Link
                                    key={child.href}
                                    href={child.href}
                                    className="block pl-8 pr-4 py-2.5 text-sm text-[var(--text-muted)] hover:text-[var(--brand-primary)] hover:bg-gray-50 rounded-lg transition-colors"
                                  >
                                    {child.label}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </>
                        ) : (
                          <Link
                            href={item.href}
                            className="block px-4 py-3 text-base font-medium text-[var(--body-text)] hover:text-[var(--brand-primary)] hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            {item.label}
                          </Link>
                        )}
                      </div>
                    ))}
                  </nav>
                  <div className="p-6 pt-4 border-t border-gray-100 space-y-3">
                    <a
                      href="tel:+905370406822"
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[var(--body-text)]"
                    >
                      <Phone className="w-4 h-4" />
                      +90 537 040 68 22
                    </a>
                    <Link href={`/cruises/${SUNSET_PROMO.slug}`} className="block px-4">
                      <button className="btn-cta w-full !py-3 text-sm">
                        Book Now — €{sunsetPrice}
                      </button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      </div>
    </header>
  );
}
