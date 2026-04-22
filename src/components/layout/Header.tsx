"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Phone, ChevronDown, Anchor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { PHONE_DISPLAY } from "@/lib/constants";

const navItems = [
  { label: "Sunset Cruise", href: "/cruises/bosphorus-sunset-cruise" },
  { label: "Dinner Cruise", href: "/istanbul-dinner-cruise" },
  { label: "Yacht Charter", href: "/yacht-charter-istanbul" },
  {
    label: "Services",
    href: "/private-tours",
    children: [
      { label: "Boat Rental Istanbul", href: "/boat-rental-istanbul" },
      { label: "Proposal Yacht Rental", href: "/proposal-yacht-rental-istanbul" },
      { label: "Private Dinner Cruise", href: "/private-bosphorus-dinner-cruise" },
      { label: "Corporate Events", href: "/corporate-events" },
      { label: "Private Events", href: "/private-events" },
      { label: "Bosphorus Sightseeing", href: "/cruises/bosphorus-sightseeing-cruise" },
      { label: "Lunch Planning", href: "/cruises/istanbul-bosphorus-lunch-cruise" },
      { label: "Princes' Islands Tour", href: "/cruises/istanbul-princes-island-tour" },
      { label: "Old City Tour", href: "/cruises/full-day-istanbul-old-city-tour" },
    ],
  },
  {
    label: "Guides",
    href: "/guides",
    children: [
      { label: "Blog", href: "/blog" },
      { label: "Istanbul Guides", href: "/guides" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div
        className={`transition-all duration-300 ${
          scrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm"
        }`}
      >
        <div className="container-main">
          <div className="flex h-[3.75rem] items-center justify-between gap-2 sm:h-16 sm:gap-3">
            <Link href="/" className="flex min-w-0 items-center gap-2 shrink">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--brand-primary)] sm:h-10 sm:w-10">
                <Anchor className="h-4 w-4 text-white sm:h-5 sm:w-5" />
              </div>
              <div className="min-w-0">
                <span className="block truncate text-lg font-bold leading-none text-[var(--heading)] sm:text-xl">
                  Merry<span className="text-[var(--brand-primary)]">Sails</span>
                </span>
                <span className="mt-0.5 block text-[9px] leading-none text-[var(--text-muted)] sm:text-[10px]">
                  Merry Tourism
                </span>
              </div>
            </Link>

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
                    className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-[var(--body-text)] transition-colors hover:bg-gray-50 hover:text-[var(--brand-primary)]"
                  >
                    {item.label}
                    {item.children && <ChevronDown className="h-3.5 w-3.5" />}
                  </Link>
                  {item.children && openDropdown === item.label && (
                    <div className="absolute left-0 top-full z-50 pt-1">
                      <div className="min-w-[260px] rounded-xl border border-gray-100 bg-white py-2 shadow-lg">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2.5 text-sm text-[var(--body-text)] transition-colors hover:bg-gray-50 hover:text-[var(--brand-primary)]"
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

            <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
              <a
                href="tel:+905370406822"
                className="hidden items-center gap-2 text-sm font-medium text-[var(--body-text)] transition-colors hover:text-[var(--brand-primary)] md:flex"
              >
                <Phone className="h-4 w-4" />
                {PHONE_DISPLAY}
              </a>

              <Link href="/reservation">
                <button className="btn-cta text-xs !py-2.5 !px-3.5 sm:text-sm sm:!px-5">
                  <span className="sm:hidden">Reserve</span>
                  <span className="hidden sm:inline">Reserve Online</span>
                </button>
              </Link>

              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 lg:hidden"
                    aria-label="Open navigation menu"
                  >
                    <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 bg-white p-0">
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <div className="flex h-full flex-col overflow-y-auto">
                    <div className="p-6 pb-0">
                      <div className="mb-6 flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--brand-primary)]">
                          <Anchor className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-[var(--heading)]">
                          Merry<span className="text-[var(--brand-primary)]">Sails</span>
                        </span>
                      </div>
                    </div>
                    <nav className="flex-1 space-y-0.5 overflow-y-auto px-6">
                      {navItems.map((item) => (
                        <div key={item.label}>
                          {item.children ? (
                            <>
                              <div className="flex items-center">
                                <Link
                                  href={item.href}
                                  className="flex-1 rounded-lg px-4 py-3 text-base font-medium text-[var(--body-text)] transition-colors hover:bg-gray-50 hover:text-[var(--brand-primary)]"
                                >
                                  {item.label}
                                </Link>
                                <button
                                  onClick={() =>
                                    setOpenMobileDropdown(
                                      openMobileDropdown === item.label ? null : item.label
                                    )
                                  }
                                  aria-label={`${openMobileDropdown === item.label ? "Collapse" : "Expand"} ${item.label} menu`}
                                  className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-gray-50"
                                >
                                  <ChevronDown
                                    className={`h-4 w-4 text-[var(--text-muted)] transition-transform duration-200 ${
                                      openMobileDropdown === item.label ? "rotate-180" : ""
                                    }`}
                                  />
                                </button>
                              </div>
                              {openMobileDropdown === item.label && (
                                <div className="pb-1">
                                  {item.children.map((child) => (
                                    <Link
                                      key={child.href}
                                      href={child.href}
                                      className="block rounded-lg py-2.5 pl-8 pr-4 text-sm text-[var(--text-muted)] transition-colors hover:bg-gray-50 hover:text-[var(--brand-primary)]"
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
                              className="block rounded-lg px-4 py-3 text-base font-medium text-[var(--body-text)] transition-colors hover:bg-gray-50 hover:text-[var(--brand-primary)]"
                            >
                              {item.label}
                            </Link>
                          )}
                        </div>
                      ))}
                    </nav>
                    <div className="space-y-3 border-t border-gray-100 p-6 pt-4">
                      <a
                        href="tel:+905370406822"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[var(--body-text)]"
                      >
                        <Phone className="h-4 w-4" />
                        {PHONE_DISPLAY}
                      </a>
                      <Link href="/reservation" className="block px-4">
                        <button className="btn-cta w-full !py-3 text-sm">Reserve Online</button>
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
