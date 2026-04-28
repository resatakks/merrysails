"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, ChevronDown, Anchor } from "lucide-react";
import { handleTrackedContactNavigation } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { PHONE_DISPLAY } from "@/lib/constants";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";

type NavLocale = "en" | "tr" | "de" | "fr" | "nl";

const NAV_LOCALES: NavLocale[] = ["tr", "de", "fr", "nl"];

const LOCALIZED_ROUTES = new Set<string>([
  "/bosphorus-cruise",
  "/istanbul-dinner-cruise",
  "/cruises/bosphorus-sunset-cruise",
  "/yacht-charter-istanbul",
  "/boat-rental-istanbul",
  "/private-bosphorus-dinner-cruise",
  "/proposal-yacht-rental-istanbul",
  "/corporate-events",
  "/private-events",
  "/faq",
  "/about",
  "/contact",
  "/reservation",
  "/blog",
  "/guides",
  "/cruises",
  "/private-tours",
  "/boat-rental-hourly-istanbul",
  "/bosphorus-cruise-departure-points",
  "/client-hosting-yacht-istanbul",
  "/corporate-yacht-dinner-istanbul",
  "/dinner-cruise-pickup-sultanahmet-taksim",
  "/dinner-cruise-with-hotel-pickup-istanbul",
  "/kabatas-dinner-cruise-istanbul",
  "/kurucesme-marina-yacht-charter",
  "/private-dinner-cruise-for-couples-istanbul",
  "/product-launch-yacht-istanbul",
  "/proposal-yacht-with-photographer-istanbul",
  "/sunset-cruise-tickets-istanbul",
  "/team-building-yacht-istanbul",
  "/turkish-night-dinner-cruise-istanbul",
]);

type NavLabelKey =
  | "cruises"
  | "sunsetCruise"
  | "dinnerCruise"
  | "yachtCharter"
  | "guides"
  | "blog"
  | "istanbulGuides"
  | "kabatasPier"
  | "karakoyWaterfront"
  | "faq"
  | "about"
  | "contact"
  | "reserveOnline"
  | "reserve";

const NAV_LABELS: Record<NavLocale, Record<NavLabelKey, string>> = {
  en: {
    cruises: "Cruises",
    sunsetCruise: "Sunset Cruise",
    dinnerCruise: "Dinner Cruise",
    yachtCharter: "Yacht Charter",
    guides: "Guides",
    blog: "Blog",
    istanbulGuides: "Istanbul Guides",
    kabatasPier: "Kabatas Pier",
    karakoyWaterfront: "Karakoy Waterfront",
    faq: "FAQ",
    about: "About",
    contact: "Contact",
    reserveOnline: "Reserve Online",
    reserve: "Reserve",
  },
  tr: {
    cruises: "Turlar",
    sunsetCruise: "Gün Batımı Turu",
    dinnerCruise: "Akşam Yemeği Turu",
    yachtCharter: "Yat Kiralama",
    guides: "Rehberler",
    blog: "Blog",
    istanbulGuides: "İstanbul Rehberleri",
    kabatasPier: "Kabataş İskelesi",
    karakoyWaterfront: "Karaköy Sahili",
    faq: "SSS",
    about: "Hakkımızda",
    contact: "İletişim",
    reserveOnline: "Online Rezervasyon",
    reserve: "Rezervasyon",
  },
  de: {
    cruises: "Kreuzfahrten",
    sunsetCruise: "Sonnenuntergang",
    dinnerCruise: "Dinner-Kreuzfahrt",
    yachtCharter: "Yachtcharter",
    guides: "Reiseführer",
    blog: "Blog",
    istanbulGuides: "Istanbul-Reiseführer",
    kabatasPier: "Kabataş-Pier",
    karakoyWaterfront: "Karaköy-Uferpromenade",
    faq: "FAQ",
    about: "Über uns",
    contact: "Kontakt",
    reserveOnline: "Online Buchen",
    reserve: "Buchen",
  },
  fr: {
    cruises: "Croisières",
    sunsetCruise: "Coucher de Soleil",
    dinnerCruise: "Dîner-Croisière",
    yachtCharter: "Location Yacht",
    guides: "Guides",
    blog: "Blog",
    istanbulGuides: "Guides Istanbul",
    kabatasPier: "Débarcadère Kabataş",
    karakoyWaterfront: "Front de mer Karaköy",
    faq: "FAQ",
    about: "À propos",
    contact: "Contact",
    reserveOnline: "Réserver en Ligne",
    reserve: "Réserver",
  },
  nl: {
    cruises: "Rondvaarten",
    sunsetCruise: "Zonsondergang",
    dinnerCruise: "Diner-Cruise",
    yachtCharter: "Jachthuur",
    guides: "Gidsen",
    blog: "Blog",
    istanbulGuides: "Istanbul Gidsen",
    kabatasPier: "Kabataş Pier",
    karakoyWaterfront: "Karaköy Waterkant",
    faq: "FAQ",
    about: "Over ons",
    contact: "Contact",
    reserveOnline: "Online Reserveren",
    reserve: "Reserveren",
  },
};

function detectLocale(pathname: string | null): NavLocale {
  if (!pathname) return "en";
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];
  if (first && (NAV_LOCALES as string[]).includes(first)) {
    return first as NavLocale;
  }
  return "en";
}

function localizeHref(href: string, locale: NavLocale): string {
  if (locale === "en") return href;
  if (LOCALIZED_ROUTES.has(href)) {
    return `/${locale}${href}`;
  }
  return href;
}

type NavChild = { labelKey: NavLabelKey; href: string };
type NavItem = { labelKey: NavLabelKey; href: string; children?: NavChild[] };

const navItems: NavItem[] = [
  { labelKey: "cruises", href: "/bosphorus-cruise" },
  { labelKey: "sunsetCruise", href: "/cruises/bosphorus-sunset-cruise" },
  { labelKey: "dinnerCruise", href: "/istanbul-dinner-cruise" },
  { labelKey: "yachtCharter", href: "/yacht-charter-istanbul" },
  {
    labelKey: "guides",
    href: "/guides",
    children: [
      { labelKey: "blog", href: "/blog" },
      { labelKey: "istanbulGuides", href: "/guides" },
      { labelKey: "kabatasPier", href: "/guides/kabatas-pier" },
      { labelKey: "karakoyWaterfront", href: "/guides/karakoy-waterfront" },
      { labelKey: "faq", href: "/faq" },
    ],
  },
  { labelKey: "about", href: "/about" },
  { labelKey: "contact", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const locale = detectLocale(pathname);
  const t = NAV_LABELS[locale];

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
              <div className="min-w-0" translate="no">
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
                  key={item.labelKey}
                  className="relative"
                  onMouseEnter={() => item.children && setOpenDropdown(item.labelKey)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={localizeHref(item.href, locale)}
                    className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-[var(--body-text)] transition-colors hover:bg-gray-50 hover:text-[var(--brand-primary)]"
                  >
                    {t[item.labelKey]}
                    {item.children && <ChevronDown className="h-3.5 w-3.5" />}
                  </Link>
                  {item.children && openDropdown === item.labelKey && (
                    <div className="absolute left-0 top-full z-50 pt-1">
                      <div className="min-w-[260px] rounded-xl border border-gray-100 bg-white py-2 shadow-lg">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={localizeHref(child.href, locale)}
                            className="block px-4 py-2.5 text-sm text-[var(--body-text)] transition-colors hover:bg-gray-50 hover:text-[var(--brand-primary)]"
                          >
                            {t[child.labelKey]}
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
                onClick={(event) =>
                  handleTrackedContactNavigation(event, {
                    href: "tel:+905370406822",
                    kind: "phone",
                    label: PHONE_DISPLAY,
                    location: "header_desktop",
                  })
                }
                className="hidden items-center gap-2 text-sm font-medium text-[var(--body-text)] transition-colors hover:text-[var(--brand-primary)] md:flex"
              >
                <Phone className="h-4 w-4" />
                {PHONE_DISPLAY}
              </a>

              <LanguageSwitcher />

              <Link
                href={localizeHref("/reservation", locale)}
                className="btn-cta inline-flex items-center justify-center text-xs !py-2.5 !px-3.5 sm:text-sm sm:!px-5"
              >
                  <span className="sm:hidden">{t.reserve}</span>
                  <span className="hidden sm:inline">{t.reserveOnline}</span>
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
                        <span className="text-xl font-bold text-[var(--heading)]" translate="no">
                          Merry<span className="text-[var(--brand-primary)]">Sails</span>
                        </span>
                      </div>
                    </div>
                    <nav className="flex-1 space-y-0.5 overflow-y-auto px-6">
                      {navItems.map((item) => (
                        <div key={item.labelKey}>
                          {item.children ? (
                            <>
                              <div className="flex items-center">
                                <Link
                                  href={localizeHref(item.href, locale)}
                                  className="flex-1 rounded-lg px-4 py-3 text-base font-medium text-[var(--body-text)] transition-colors hover:bg-gray-50 hover:text-[var(--brand-primary)]"
                                >
                                  {t[item.labelKey]}
                                </Link>
                                <button
                                  onClick={() =>
                                    setOpenMobileDropdown(
                                      openMobileDropdown === item.labelKey ? null : item.labelKey
                                    )
                                  }
                                  aria-label={`${openMobileDropdown === item.labelKey ? "Collapse" : "Expand"} ${t[item.labelKey]} menu`}
                                  className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-gray-50"
                                >
                                  <ChevronDown
                                    className={`h-4 w-4 text-[var(--text-muted)] transition-transform duration-200 ${
                                      openMobileDropdown === item.labelKey ? "rotate-180" : ""
                                    }`}
                                  />
                                </button>
                              </div>
                              {openMobileDropdown === item.labelKey && (
                                <div className="pb-1">
                                  {item.children.map((child) => (
                                    <Link
                                      key={child.href}
                                      href={localizeHref(child.href, locale)}
                                      className="block rounded-lg py-2.5 pl-8 pr-4 text-sm text-[var(--text-muted)] transition-colors hover:bg-gray-50 hover:text-[var(--brand-primary)]"
                                    >
                                      {t[child.labelKey]}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </>
                          ) : (
                            <Link
                              href={localizeHref(item.href, locale)}
                              className="block rounded-lg px-4 py-3 text-base font-medium text-[var(--body-text)] transition-colors hover:bg-gray-50 hover:text-[var(--brand-primary)]"
                            >
                              {t[item.labelKey]}
                            </Link>
                          )}
                        </div>
                      ))}
                    </nav>
                    <div className="space-y-3 border-t border-gray-100 p-6 pt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-[var(--text-muted)]">Language</span>
                        <LanguageSwitcher compact />
                      </div>
                      <a
                        href="tel:+905370406822"
                        onClick={(event) =>
                          handleTrackedContactNavigation(event, {
                            href: "tel:+905370406822",
                            kind: "phone",
                            label: PHONE_DISPLAY,
                            location: "header_mobile_menu",
                          })
                        }
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[var(--body-text)]"
                      >
                        <Phone className="h-4 w-4" />
                        {PHONE_DISPLAY}
                      </a>
                      <Link
                        href={localizeHref("/reservation", locale)}
                        className="btn-cta block w-full px-4 text-center !py-3 text-sm"
                      >
                        {t.reserveOnline}
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
