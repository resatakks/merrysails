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

type NavLocale = "en" | "tr" | "de" | "fr" | "nl";

const NAV_LOCALES: NavLocale[] = ["tr", "de", "fr", "nl"];

type FooterCoreLink = { label: string; href: string };

type FooterTranslation = {
  description: string;
  coreProducts: string;
  supportRoutes: string;
  company: string;
  blogHighlights: string;
  guideTopics: string;
  viewLicense: string;
  copyright: string;
  privacyPolicy: string;
  terms: string;
  coreLinks: FooterCoreLink[];
};

const FOOTER_TRANSLATIONS: Record<NavLocale, FooterTranslation> = {
  en: {
    description:
      "Direct Bosphorus bookings for sunset cruise, dinner cruise, and private yacht charter in Istanbul.",
    coreProducts: "Core Products",
    supportRoutes: "Support Routes",
    company: "Company",
    blogHighlights: "Blog Highlights",
    guideTopics: "Guide Topics",
    viewLicense: "View license details",
    copyright: "All rights reserved.",
    privacyPolicy: "Privacy Policy",
    terms: "Terms & Conditions",
    coreLinks: [
      { label: "Bosphorus Sunset Cruise", href: "/cruises/bosphorus-sunset-cruise" },
      { label: "Bosphorus Dinner Cruise", href: "/istanbul-dinner-cruise" },
      { label: "Yacht Charter Istanbul", href: "/yacht-charter-istanbul" },
    ],
  },
  tr: {
    description:
      "İstanbul'da gün batımı turu, akşam yemeği turu ve özel yat kiralama için doğrudan Boğaz rezervasyonları.",
    coreProducts: "Ana Ürünler",
    supportRoutes: "Destek Sayfaları",
    company: "Şirket",
    blogHighlights: "Blog",
    guideTopics: "Rehberler",
    viewLicense: "Lisans detaylarını görüntüle",
    copyright: "Tüm hakları saklıdır.",
    privacyPolicy: "Gizlilik Politikası",
    terms: "Kullanım Şartları",
    coreLinks: [
      { label: "Boğaz Gün Batımı Turu", href: "/tr/cruises/bosphorus-sunset-cruise" },
      { label: "Boğaz Akşam Yemeği Turu", href: "/tr/istanbul-dinner-cruise" },
      { label: "İstanbul Yat Kiralama", href: "/tr/yacht-charter-istanbul" },
    ],
  },
  de: {
    description:
      "Direkte Buchungen für Sonnenuntergangs-Kreuzfahrten, Dinner-Kreuzfahrten und privaten Yachtcharter auf dem Bosporus in Istanbul.",
    coreProducts: "Hauptprodukte",
    supportRoutes: "Support-Seiten",
    company: "Unternehmen",
    blogHighlights: "Blog",
    guideTopics: "Reiseführer",
    viewLicense: "Lizenzdetails ansehen",
    copyright: "Alle Rechte vorbehalten.",
    privacyPolicy: "Datenschutzrichtlinie",
    terms: "Nutzungsbedingungen",
    coreLinks: [
      { label: "Bosporus-Sonnenuntergangsfahrt", href: "/de/cruises/bosphorus-sunset-cruise" },
      { label: "Bosporus-Dinner-Kreuzfahrt", href: "/de/istanbul-dinner-cruise" },
      { label: "Yachtcharter Istanbul", href: "/de/yacht-charter-istanbul" },
    ],
  },
  fr: {
    description:
      "Réservations directes pour croisière coucher de soleil, dîner-croisière et yacht privé sur le Bosphore à Istanbul.",
    coreProducts: "Produits Phares",
    supportRoutes: "Pages d'assistance",
    company: "Entreprise",
    blogHighlights: "Blog",
    guideTopics: "Guides de voyage",
    viewLicense: "Voir les détails de la licence",
    copyright: "Tous droits réservés.",
    privacyPolicy: "Politique de confidentialité",
    terms: "Conditions d'utilisation",
    coreLinks: [
      { label: "Croisière Coucher de Soleil", href: "/fr/cruises/bosphorus-sunset-cruise" },
      { label: "Dîner-Croisière Bosphore", href: "/fr/istanbul-dinner-cruise" },
      { label: "Location Yacht Istanbul", href: "/fr/yacht-charter-istanbul" },
    ],
  },
  nl: {
    description:
      "Directe boekingen voor zonsondergangstochten, dinercruises en privéjachtverhuur op de Bosporus in Istanbul.",
    coreProducts: "Hoofdproducten",
    supportRoutes: "Ondersteuningspagina's",
    company: "Bedrijf",
    blogHighlights: "Blog",
    guideTopics: "Reisidsen",
    viewLicense: "Licentiedetails bekijken",
    copyright: "Alle rechten voorbehouden.",
    privacyPolicy: "Privacybeleid",
    terms: "Algemene Voorwaarden",
    coreLinks: [
      { label: "Bosporus Zonsondergangtocht", href: "/nl/cruises/bosphorus-sunset-cruise" },
      { label: "Bosporus Dinercruise", href: "/nl/istanbul-dinner-cruise" },
      { label: "Jachthuur Istanbul", href: "/nl/yacht-charter-istanbul" },
    ],
  },
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
  { label: "Bosphorus Cruise Compare", href: "/bosphorus-cruise" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "TURSAB License", href: "/tursab" },
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
  { label: "Istanbul Guides", href: "/guides" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
];

const blogLinks = [
  { label: "Sunset vs Dinner Cruise", href: "/blog/bosphorus-sunset-cruise-vs-dinner-cruise" },
  { label: "Corporate Yacht Events", href: "/blog/corporate-yacht-events-on-the-bosphorus" },
  { label: "Cruise Boarding Points", href: "/blog/bosphorus-cruise-boarding-points-guide-2026" },
  { label: "Private Yacht Departure Points", href: "/blog/private-yacht-departure-points-istanbul" },
];

const guideLinks = [
  { label: "Bosphorus Strait", href: "/guides/bosphorus-strait" },
  { label: "Maiden's Tower", href: "/guides/maidens-tower" },
  { label: "Dolmabahce Palace", href: "/guides/dolmabahce-palace" },
  { label: "Rumeli Fortress", href: "/guides/rumeli-fortress" },
];

function detectLocale(pathname: string | null): NavLocale {
  if (!pathname) return "en";
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];
  if (first && (NAV_LOCALES as string[]).includes(first)) {
    return first as NavLocale;
  }
  return "en";
}

export default function Footer() {
  const pathname = usePathname();
  const locale = detectLocale(pathname);
  const t = FOOTER_TRANSLATIONS[locale];

  return (
    <footer className="relative -mt-5 bg-[var(--brand-dark)] pt-5 pb-28 text-white/90 lg:pb-10">
      <div className="container-main pt-20 pb-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_0.8fr_0.85fr]">
          <div>
            <Link href="/" className="mb-4 flex items-center gap-3">
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
                href="tel:+905370406822"
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
                    TURSAB Licensed
                  </p>
                  <p className="mt-2 text-sm font-semibold text-white" translate="no">
                    {TURSAB_AGENCY_NAME}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-white/65" translate="no">
                    Belge No {TURSAB_LICENSE_NUMBER} · {TURSAB_LEGAL_NAME}
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
              {t.coreLinks.map((link) => (
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
              {t.company}
            </h3>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
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

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-8 md:flex-row">
          <p className="text-sm text-white/70" translate="no">
            © 2026 MerrySails — Merry Tourism. TURSAB license {TURSAB_LICENSE_NUMBER}. {t.copyright}
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
