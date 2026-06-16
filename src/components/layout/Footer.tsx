"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Anchor,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Youtube,
  ShieldCheck,
} from "lucide-react";
import {
  ADDRESS,
  EMAIL,
  PHONE_DISPLAY,
  TURSAB_AGENCY_NAME,
  TURSAB_LEGAL_NAME,
  TURSAB_LICENSE_NUMBER,
} from "@/lib/constants";
import TrackedContactLink from "@/components/analytics/TrackedContactLink";
import NewsletterSignup from "@/components/marketing/NewsletterSignup";
import PaymentTrust from "@/components/marketing/PaymentTrust";
import {
  detectChromeLocaleFromPathname,
  getFooterStrings,
  type ChromeLocale,
} from "@/i18n/chrome-strings";
import { LOCALIZED_ROUTES as CORE_LOCALIZED_ROUTES } from "@/i18n/localized-routes";

type NavLocale = ChromeLocale;

const NAV_LOCALES: NavLocale[] = ["tr", "de", "fr", "nl", "ru"];

// Footer extends the core LOCALIZED_ROUTES with `/reservation` (form route)
// and `/princes-islands-tour-istanbul` (EN pillar — TR/DE/FR use
// locale-native slugs prens-adalari/prinzeninseln/iles-aux-princes that don't
// match this set). Both are footer-only concerns, not hreflang/sitemap ones.
const FOOTER_LOCALIZED_ROUTES = new Set<string>([
  ...Array.from(CORE_LOCALIZED_ROUTES).filter((r) => r !== ""),
  "/reservation",
  "/princes-islands-tour-istanbul",
]);

function localizeHref(href: string, locale: NavLocale): string {
  if (locale === "en") return href;
  if (FOOTER_LOCALIZED_ROUTES.has(href)) return `/${locale}${href}`;
  return href;
}

type FooterCoreLink = { label: string; href: string };

const CORE_LINKS: Record<NavLocale, FooterCoreLink[]> = {
  en: [
    { label: "Bosphorus Cruise Istanbul", href: "/bosphorus-cruise" },
    { label: "Bosphorus Sunset Cruise", href: "/cruises/bosphorus-sunset-cruise" },
    { label: "Bosphorus Dinner Cruise", href: "/istanbul-dinner-cruise" },
    { label: "Yacht Charter Istanbul", href: "/yacht-charter-istanbul" },
    { label: "Boat Rental Istanbul", href: "/boat-rental-istanbul" },
  ],
  tr: [
    { label: "İstanbul Boğaz Turu", href: "/tr/bosphorus-cruise" },
    { label: "Boğaz Gün Batımı Turu", href: "/tr/cruises/bosphorus-sunset-cruise" },
    { label: "Boğaz Akşam Yemeği Turu", href: "/tr/istanbul-dinner-cruise" },
    { label: "İstanbul Yat Kiralama", href: "/tr/yacht-charter-istanbul" },
    { label: "İstanbul Tekne Kiralama", href: "/tr/boat-rental-istanbul" },
  ],
  de: [
    { label: "Bosporus-Kreuzfahrt Istanbul", href: "/de/bosphorus-cruise" },
    { label: "Bosporus-Sonnenuntergangsfahrt", href: "/de/cruises/bosphorus-sunset-cruise" },
    { label: "Bosporus-Dinner-Kreuzfahrt", href: "/de/istanbul-dinner-cruise" },
    { label: "Yachtcharter Istanbul", href: "/de/yacht-charter-istanbul" },
    { label: "Bootsvermietung Istanbul", href: "/de/boat-rental-istanbul" },
  ],
  fr: [
    { label: "Croisière Bosphore Istanbul", href: "/fr/bosphorus-cruise" },
    { label: "Croisière Coucher de Soleil", href: "/fr/cruises/bosphorus-sunset-cruise" },
    { label: "Dîner-Croisière Bosphore", href: "/fr/istanbul-dinner-cruise" },
    { label: "Location Yacht Istanbul", href: "/fr/yacht-charter-istanbul" },
    { label: "Location Bateau Istanbul", href: "/fr/boat-rental-istanbul" },
  ],
  nl: [
    { label: "Bosporus Cruise Istanbul", href: "/nl/bosphorus-cruise" },
    { label: "Bosporus Zonsondergangtocht", href: "/nl/cruises/bosphorus-sunset-cruise" },
    { label: "Bosporus Dinercruise", href: "/nl/istanbul-dinner-cruise" },
    { label: "Jachthuur Istanbul", href: "/nl/yacht-charter-istanbul" },
    { label: "Bootsverhuur Istanbul", href: "/nl/boat-rental-istanbul" },
  ],
  ru: [
    { label: "Круиз по Босфору Стамбул", href: "/ru/bosphorus-cruise" },
    { label: "Круиз на закат по Босфору", href: "/ru/cruises/bosphorus-sunset-cruise" },
    { label: "Ужин-круиз по Босфору", href: "/ru/istanbul-dinner-cruise" },
    { label: "Аренда яхты в Стамбуле", href: "/ru/yacht-charter-istanbul" },
    { label: "Аренда катера в Стамбуле", href: "/ru/boat-rental-istanbul" },
  ],
  // zh ships only the 4 staged money pages (ZH_ENABLED_ROUTES). Boat-rental has
  // no /zh page yet — linking it would 404, so it is intentionally omitted here.
  zh: [
    { label: "伊斯坦布尔博斯普鲁斯游船", href: "/zh/bosphorus-cruise" },
    { label: "博斯普鲁斯日落游船", href: "/zh/cruises/bosphorus-sunset-cruise" },
    { label: "博斯普鲁斯晚宴游船", href: "/zh/istanbul-dinner-cruise" },
    { label: "伊斯坦布尔私人游艇包租", href: "/zh/yacht-charter-istanbul" },
  ],
};

const serviceLinks = [
  { label: "Sunset Ticket Support", href: "/sunset-cruise-tickets-istanbul" },
  { label: "Turkish Night Dinner", href: "/turkish-night-dinner-cruise-istanbul" },
  { label: "Dinner Pickup Support", href: "/dinner-cruise-with-hotel-pickup-istanbul" },
  { label: "Sultanahmet & Taksim Pickup", href: "/dinner-cruise-pickup-sultanahmet-taksim" },
  { label: "Boat Rental Hourly", href: "/boat-rental-hourly-istanbul" },
  { label: "Proposal with Photographer", href: "/proposal-yacht-with-photographer-istanbul" },
  { label: "Corporate Yacht Dinner", href: "/corporate-yacht-dinner-istanbul" },
  { label: "Team Building Yacht", href: "/team-building-yacht-istanbul" },
  { label: "Departure Points Hub", href: "/bosphorus-cruise-departure-points" },
];

const companyLinks = [
  { label: "All Bosphorus Cruises", href: "/cruises" },
  { label: "Private Tours", href: "/private-tours" },
  { label: "Compare All Cruises", href: "/compare-bosphorus-cruises" },
  { label: "MerrySails vs Bosphorustour", href: "/merrysails-vs-bosphorustour" },
  { label: "MerrySails vs Viator", href: "/merrysails-vs-viator" },
  { label: "Anniversary Yacht Cruise", href: "/anniversary-yacht-cruise-istanbul" },
  { label: "Honeymoon Yacht Cruise", href: "/honeymoon-yacht-cruise-istanbul" },
  { label: "Cruise for Couples", href: "/bosphorus-cruise-for-couples" },
  { label: "Cruise for Families", href: "/bosphorus-cruise-for-families" },
  { label: "Cruise from Sultanahmet", href: "/bosphorus-cruise-from-sultanahmet" },
  { label: "Cruise from Taksim", href: "/bosphorus-cruise-from-taksim" },
  { label: "Cruise from Beyoğlu", href: "/bosphorus-cruise-from-beyoglu" },
  { label: "Princes Islands Tour", href: "/princes-islands-tour-istanbul" },
  { label: "Bosphorus Cruise FAQ", href: "/istanbul-cruise-faq" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Meet the Team", href: "/about/team" },
  { label: "Contact", href: "/contact" },
  { label: "TURSAB License", href: "/tursab" },
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
  { label: "Istanbul Guides", href: "/guides" },
  { label: "AI Knowledge Hub", href: "/ai-knowledge" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
];

const blogLinks = [
  { label: "Best Bosphorus Cruise 2026 — Comparison", href: "/blog/best-istanbul-bosphorus-cruise-comparison-2026" },
  { label: "3-Day Istanbul Itinerary with Cruise", href: "/blog/istanbul-3-day-itinerary-bosphorus-cruise-2026" },
  { label: "Book Bosphorus Cruise Direct — Save €5-€15", href: "/blog/book-bosphorus-cruise-direct-save-2026" },
  { label: "Yacht Size Guide for Bosphorus Charter", href: "/blog/choosing-yacht-size-bosphorus-charter-istanbul-2026" },
  { label: "Bosphorus Cruise vs Princes Islands", href: "/blog/bosphorus-cruise-vs-princes-islands-tour-istanbul-2026" },
  { label: "What to Wear by Season", href: "/blog/what-to-wear-bosphorus-cruise-by-season" },
];

const guideLinks = [
  { label: "Bosphorus Strait", href: "/guides/bosphorus-strait" },
  { label: "Maiden's Tower", href: "/guides/maidens-tower" },
  { label: "Dolmabahce Palace", href: "/guides/dolmabahce-palace" },
  { label: "Rumeli Fortress", href: "/guides/rumeli-fortress" },
];

export default function Footer() {
  const pathname = usePathname();
  const locale = detectChromeLocaleFromPathname(pathname);
  const t = getFooterStrings(locale);
  const coreLinks = CORE_LINKS[locale] ?? CORE_LINKS.en;

  return (
    <footer className="relative -mt-5 bg-[var(--brand-dark)] pt-5 pb-28 text-white/90 lg:pb-10">
      <div className="container-main pt-20 pb-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_0.8fr_0.85fr]">
          <div>
            <Link href={locale === "en" ? "/" : `/${locale}`} className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                <Anchor className="h-5 w-5 text-[var(--brand-gold)]" />
              </div>
              <span className="text-xl font-bold tracking-wide" translate="no">
                Merry<span className="text-[var(--brand-gold)]">Sails</span>
              </span>
            </Link>
            <p className="mb-5 max-w-sm text-sm leading-relaxed text-white/60">
              {t.description}
            </p>
            <div className="mb-6 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit MerrySails on Instagram"
                title="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 transition-colors hover:bg-white/20"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit MerrySails on Facebook"
                title="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 transition-colors hover:bg-white/20"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit MerrySails on YouTube"
                title="YouTube"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 transition-colors hover:bg-white/20"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
            <div className="space-y-2.5">
              <TrackedContactLink
                href="tel:+905448989812"
                kind="phone"
                label={PHONE_DISPLAY}
                location="footer"
                className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-[var(--brand-gold)]"
                translate="no"
              >
                <Phone className="h-4 w-4 shrink-0" />
                {PHONE_DISPLAY}
              </TrackedContactLink>
              <a
                href="mailto:info@merrysails.com"
                className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-[var(--brand-gold)]"
                translate="no"
              >
                <Mail className="h-4 w-4 shrink-0" />
                {EMAIL}
              </a>
              <div className="flex items-start gap-2 text-sm text-white/60">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                {ADDRESS}
              </div>
            </div>

            <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff1f2] text-[#dc2626]">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--brand-gold)]">
                    {t.tursabLicensed}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-white" translate="no">
                    {TURSAB_AGENCY_NAME}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-white/65" translate="no">
                    {t.tursabLicenseNumberPrefix} {TURSAB_LICENSE_NUMBER} · {TURSAB_LEGAL_NAME}
                  </p>
                  <Link
                    href="/tursab"
                    className="mt-3 inline-flex text-xs font-semibold text-[var(--brand-gold)] transition-colors hover:text-white"
                  >
                    {t.viewLicense}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-[var(--brand-gold)]">
              {t.coreProducts}
            </h3>
            <ul className="space-y-2.5">
              {coreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 transition-colors hover:text-[var(--brand-gold)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-[var(--brand-gold)]">
              {t.supportRoutes}
            </h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={localizeHref(link.href, locale)}
                    className="text-sm text-white/80 transition-colors hover:text-[var(--brand-gold)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-[var(--brand-gold)]">
              {t.company}
            </h3>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={localizeHref(link.href, locale)}
                    className="text-sm text-white/80 transition-colors hover:text-[var(--brand-gold)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="mt-10 grid gap-8 border-t border-white/10 pt-8 md:grid-cols-2">
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-[var(--brand-gold)]">
              {t.blogHighlights}
            </h3>
            <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
              {blogLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-[var(--brand-gold)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-[var(--brand-gold)]">
              {t.guideTopics}
            </h3>
            <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
              {guideLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-[var(--brand-gold)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 mt-10">
          <NewsletterSignup variant="footer" source="footer" />
          <div className="mt-6">
            <PaymentTrust />
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-8 md:flex-row">
          <p className="text-sm text-white/70" translate="no">
            © 2026 MerrySails — Merry Tourism. {t.tursabLicenseNumberPrefix} {TURSAB_LICENSE_NUMBER}. {t.allRightsReserved}
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="text-sm text-white/70 transition-colors hover:text-white">
              {t.privacyPolicy}
            </Link>
            <Link href="/terms" className="text-sm text-white/70 transition-colors hover:text-white">
              {t.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
