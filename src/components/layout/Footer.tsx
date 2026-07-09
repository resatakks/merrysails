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
import {
  LOCALIZED_ROUTES as CORE_LOCALIZED_ROUTES,
  RU_ENABLED_ROUTES,
  ZH_ENABLED_ROUTES,
} from "@/i18n/localized-routes";

type NavLocale = ChromeLocale;

const NAV_LOCALES: NavLocale[] = ["tr", "de", "fr", "nl", "ru"];

// Footer extends the core LOCALIZED_ROUTES with `/reservation` (form route).
// `/princes-islands-tour-istanbul` is intentionally NOT in this set: the EN
// pillar lives at the root, and the non-EN locales use native slugs
// (prens-adalari / prinzeninseln / iles-aux-princes) — there is no
// `/<locale>/princes-islands-tour-istanbul` page for any locale, so prefixing
// it would 404. It always falls back to the EN-root href below.
const FOOTER_LOCALIZED_ROUTES = new Set<string>([
  ...Array.from(CORE_LOCALIZED_ROUTES).filter((r) => r !== ""),
  "/reservation",
]);

// Staged locales (ru/zh) only ship a subset of LOCALIZED_ROUTES (see
// RU_ENABLED_ROUTES / ZH_ENABLED_ROUTES). Prefixing a footer link to a route a
// staged locale doesn't have yet lands on a notFound() 404 — this is exactly
// how /zh/princes-islands-tour-istanbul and /zh|/ru secondary links (e.g.
// /sunset-cruise-tickets-istanbul) broke (translation/404 audit 2026-06-20).
// Mirror Header.localeHasRoute + LanguageSwitcher: gate by the enabled set and
// fall back to the EN-root href (HTTP 200) for un-shipped routes.
const STAGED_LOCALE_ROUTES: Partial<Record<NavLocale, Set<string>>> = {
  ru: RU_ENABLED_ROUTES,
  zh: ZH_ENABLED_ROUTES,
};

function localeHasRoute(locale: NavLocale, href: string): boolean {
  const gate = STAGED_LOCALE_ROUTES[locale];
  if (!gate) return true; // tr/de/fr/nl ship every FOOTER_LOCALIZED_ROUTES path
  // /reservation ships a [locale]/reservation page for every active locale
  // (its own META gate covers ru+zh), so it's always localizable even though
  // it's excluded from the core enabled sets (form route, no hreflang/sitemap).
  if (href === "/reservation") return true;
  return gate.has(href);
}

function localizeHref(href: string, locale: NavLocale): string {
  if (locale === "en") return href;
  if (FOOTER_LOCALIZED_ROUTES.has(href) && localeHasRoute(locale, href)) {
    return `/${locale}${href}`;
  }
  return href;
}

type FooterCoreLink = { label: string; href: string };

const CORE_LINKS: Record<NavLocale, FooterCoreLink[]> = {
  en: [
    { label: "Bosphorus Cruise Istanbul", href: "/bosphorus-cruise" },
    { label: "Bosphorus Sunset Cruise", href: "/cruises/bosphorus-sunset-cruise" },
    // 2026-07-09: EN root moved off /istanbul-dinner-cruise (DMCA relocation,
    // Lumen #86820254). Locale entries below unchanged (out of scope).
    { label: "Bosphorus Dinner Cruise", href: "/bosphorus-dinner-cruise-istanbul" },
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

// Footer secondary links. Labels are localized per NavLocale (translation
// audit 2026-06-20 — these 4 arrays previously rendered English on every
// non-EN route). hrefs are unchanged and still pass through localizeHref()
// for gating; only the visible label is translated. Parallel HREFS + LABELS
// arrays are zipped by buildLinks() so positions stay aligned. Mirrors the
// GoldenSunset Footer pattern.
const SERVICE_HREFS = [
  "/cruises/bosphorus-sunset-cruise",
  "/turkish-night-dinner-cruise-istanbul",
  "/dinner-cruise-with-hotel-pickup-istanbul",
  "/dinner-cruise-pickup-sultanahmet-taksim",
  "/boat-rental-hourly-istanbul",
  "/proposal-yacht-with-photographer-istanbul",
  "/corporate-yacht-dinner-istanbul",
  "/team-building-yacht-istanbul",
  "/bosphorus-cruise-departure-points",
];
const SERVICE_LABELS: Record<NavLocale, string[]> = {
  en: ["Sunset Ticket Support", "Turkish Night Dinner", "Dinner Pickup Support", "Sultanahmet & Taksim Pickup", "Boat Rental Hourly", "Proposal with Photographer", "Corporate Yacht Dinner", "Team Building Yacht", "Departure Points Hub"],
  tr: ["Gün Batımı Bilet Desteği", "Türk Gecesi Yemekli Tur", "Yemekli Tur Otel Transferi", "Sultanahmet & Taksim Transfer", "Saatlik Tekne Kiralama", "Fotoğrafçılı Evlilik Teklifi", "Kurumsal Yat Yemeği", "Takım Etkinliği Yatı", "Kalkış Noktaları"],
  de: ["Sonnenuntergang-Ticket-Hilfe", "Türkische Nacht mit Dinner", "Dinner-Abholservice", "Sultanahmet & Taksim Abholung", "Stündliche Bootsvermietung", "Heiratsantrag mit Fotograf", "Firmen-Yacht-Dinner", "Teambuilding-Yacht", "Abfahrtspunkte"],
  fr: ["Aide billets coucher de soleil", "Dîner Nuit Turque", "Transfert dîner-croisière", "Transfert Sultanahmet & Taksim", "Location de bateau à l'heure", "Demande en mariage avec photographe", "Dîner yacht entreprise", "Yacht team building", "Points de départ"],
  nl: ["Zonsondergang ticket-hulp", "Turkse Nacht Diner", "Diner ophaalservice", "Sultanahmet & Taksim ophalen", "Boot huren per uur", "Aanzoek met fotograaf", "Zakelijk jachtdiner", "Teambuilding-jacht", "Vertrekpunten"],
  ru: ["Помощь с билетами на закат", "Ужин «Турецкая ночь»", "Трансфер на ужин-круиз", "Трансфер Султанахмет и Таксим", "Почасовая аренда катера", "Предложение руки с фотографом", "Корпоративный ужин на яхте", "Тимбилдинг на яхте", "Точки отправления"],
  zh: ["日落游船购票协助", "土耳其之夜晚宴", "晚宴游船酒店接送", "苏丹艾哈迈德与塔克西姆接送", "按小时租船", "摄影师求婚游船", "企业游艇晚宴", "团队建设游艇", "出发点指南"],
};

// Former 25-link `companyLinks` column, split into three intent-balanced
// columns so no single column towers over CORE PRODUCTS. Privacy Policy and
// Terms & Conditions were removed here — they already render in the bottom
// bar, so keeping them in the column was a duplicate.
const EXPERIENCE_HREFS = [
  "/cruises",
  "/private-tours",
  "/bosphorus-cruise-for-couples",
  "/bosphorus-cruise-for-families",
  "/anniversary-yacht-cruise-istanbul",
  "/honeymoon-yacht-cruise-istanbul",
  "/princes-islands-tour-istanbul",
];
const EXPERIENCE_LABELS: Record<NavLocale, string[]> = {
  en: ["All Bosphorus Cruises", "Private Tours", "Cruise for Couples", "Cruise for Families", "Anniversary Yacht Cruise", "Honeymoon Yacht Cruise", "Princes Islands Tour"],
  tr: ["Tüm Boğaz Turları", "Özel Turlar", "Çiftler İçin Tur", "Aileler İçin Tur", "Yıldönümü Yat Turu", "Balayı Yat Turu", "Adalar Turu"],
  de: ["Alle Bosporus-Fahrten", "Private Touren", "Fahrt für Paare", "Fahrt für Familien", "Jubiläums-Yachtfahrt", "Flitterwochen-Yachtfahrt", "Prinzeninseln-Tour"],
  fr: ["Toutes les croisières", "Tours privés", "Croisière pour couples", "Croisière en famille", "Croisière yacht anniversaire", "Croisière yacht lune de miel", "Tour des îles des Princes"],
  nl: ["Alle Bosporus-cruises", "Privétours", "Cruise voor koppels", "Cruise voor gezinnen", "Jubileum-jachtcruise", "Huwelijksreis-jachtcruise", "Prinseneilanden-tour"],
  ru: ["Все круизы по Босфору", "Частные туры", "Круиз для пар", "Круиз для семей", "Юбилейный круиз на яхте", "Свадебный круиз на яхте", "Тур на Принцевы острова"],
  zh: ["全部博斯普鲁斯游船", "私人包船游", "情侣游船", "家庭游船", "周年纪念游艇游", "蜜月游艇游", "王子群岛之旅"],
};

const PLAN_HREFS = [
  "/compare-bosphorus-cruises",
  "/galataport-shore-excursion",
  "/merrysails-vs-bosphorustour",
  "/merrysails-vs-viator",
  "/pricing",
  // EN-root price-index link-magnet page (2026-06-26). Not in
  // FOOTER_LOCALIZED_ROUTES, so localizeHref() falls back to the EN root for
  // every locale (the page is EN-only by the strict locale rule).
  "/bosphorus-cruise-prices-istanbul-2026",
  // Preserved from the removed homepage CommercialIntentSection — the price
  // guide was the only one of its 8 surfaced links not already in the footer.
  "/blog/bosphorus-cruise-prices-2026",
  "/istanbul-cruise-faq",
  "/bosphorus-cruise-from-sultanahmet",
  "/bosphorus-cruise-from-taksim",
  "/bosphorus-cruise-from-beyoglu",
];
const PLAN_LABELS: Record<NavLocale, string[]> = {
  en: ["Compare All Cruises", "Galataport Shore Excursion", "MerrySails vs Bosphorustour", "MerrySails vs Viator", "Pricing", "Bosphorus Cruise Price Index 2026", "Bosphorus Cruise Prices 2026", "Bosphorus Cruise FAQ", "Cruise from Sultanahmet", "Cruise from Taksim", "Cruise from Beyoğlu"],
  tr: ["Tüm Turları Karşılaştır", "Galataport Liman Turu", "MerrySails vs Bosphorustour", "MerrySails vs Viator", "Fiyatlar", "Boğaz Turu Fiyat Endeksi 2026", "Boğaz Turu Fiyatları 2026", "Boğaz Turu SSS", "Sultanahmet'ten Tur", "Taksim'den Tur", "Beyoğlu'ndan Tur"],
  de: ["Alle Touren vergleichen", "Galataport Landausflug", "MerrySails vs. Bosphorustour", "MerrySails vs. Viator", "Preise", "Bosporus-Preisindex 2026", "Bosporus-Fahrt Preise 2026", "Bosporus-Kreuzfahrt FAQ", "Fahrt ab Sultanahmet", "Fahrt ab Taksim", "Fahrt ab Beyoğlu"],
  fr: ["Comparer les croisières", "Excursion Galataport", "MerrySails vs Bosphorustour", "MerrySails vs Viator", "Tarifs", "Indice des prix Bosphore 2026", "Prix croisière Bosphore 2026", "FAQ croisière Bosphore", "Croisière depuis Sultanahmet", "Croisière depuis Taksim", "Croisière depuis Beyoğlu"],
  nl: ["Vergelijk alle cruises", "Galataport Wal-excursie", "MerrySails vs Bosphorustour", "MerrySails vs Viator", "Prijzen", "Bosporus Prijsindex 2026", "Bosporus Cruise Prijzen 2026", "Bosporus Cruise FAQ", "Cruise vanaf Sultanahmet", "Cruise vanaf Taksim", "Cruise vanaf Beyoğlu"],
  ru: ["Сравнить все круизы", "Экскурсия из Галатапорта", "MerrySails и Bosphorustour", "MerrySails и Viator", "Цены", "Индекс цен на круизы 2026", "Цены на круизы по Босфору 2026", "FAQ по круизам", "Круиз из Султанахмета", "Круиз из Таксима", "Круиз из Бейоглу"],
  zh: ["比较所有游船", "加拉塔港岸上游", "MerrySails 与 Bosphorustour", "MerrySails 与 Viator", "价格", "2026 博斯普鲁斯游船价格指数", "2026 博斯普鲁斯游船价格", "博斯普鲁斯游船常见问题", "苏丹艾哈迈德出发", "塔克西姆出发", "贝伊奥卢出发"],
};

const COMPANY_HREFS = [
  "/about",
  "/about/team",
  "/contact",
  "/tursab",
  "/ai-knowledge",
  "/faq",
  "/blog",
  "/guides",
];
const COMPANY_LABELS: Record<NavLocale, string[]> = {
  en: ["About", "Meet the Team", "Contact", "TURSAB License", "AI Knowledge Hub", "FAQ", "Blog", "Istanbul Guides"],
  tr: ["Hakkımızda", "Ekibimiz", "İletişim", "TÜRSAB Lisansı", "AI Bilgi Merkezi", "SSS", "Blog", "İstanbul Rehberleri"],
  de: ["Über uns", "Unser Team", "Kontakt", "TÜRSAB-Lizenz", "KI-Wissenszentrum", "FAQ", "Blog", "Istanbul-Reiseführer"],
  fr: ["À propos", "Notre équipe", "Contact", "Licence TÜRSAB", "Centre de connaissances IA", "FAQ", "Blog", "Guides d'Istanbul"],
  nl: ["Over ons", "Ons team", "Contact", "TÜRSAB-vergunning", "AI-kenniscentrum", "FAQ", "Blog", "Istanbul-gidsen"],
  ru: ["О нас", "Наша команда", "Контакты", "Лицензия TÜRSAB", "AI-база знаний", "Вопросы и ответы", "Блог", "Гиды по Стамбулу"],
  zh: ["关于我们", "认识团队", "联系我们", "TÜRSAB 执照", "AI 知识中心", "常见问题", "博客", "伊斯坦布尔指南"],
};

function buildLinks(hrefs: string[], labels: Record<NavLocale, string[]>, locale: NavLocale) {
  const set = labels[locale] ?? labels.en;
  return hrefs.map((href, i) => ({ href, label: set[i] ?? labels.en[i] }));
}

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
  const serviceLinks = buildLinks(SERVICE_HREFS, SERVICE_LABELS, locale);
  const experienceLinks = buildLinks(EXPERIENCE_HREFS, EXPERIENCE_LABELS, locale);
  const planLinks = buildLinks(PLAN_HREFS, PLAN_LABELS, locale);
  const companyLinks = buildLinks(COMPANY_HREFS, COMPANY_LABELS, locale);

  return (
    <footer className="relative -mt-5 bg-[var(--brand-dark)] pt-5 pb-28 text-white/90 lg:pb-10">
      <div className="container-main pt-20 pb-12">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_2.6fr]">
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

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
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
                {t.experiences}
              </h3>
              <ul className="space-y-2.5">
                {experienceLinks.map((link) => (
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
                {t.planYourCruise}
              </h3>
              <ul className="space-y-2.5">
                {planLinks.map((link) => (
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

        </div>

        <div className="mt-10 grid gap-8 border-t border-white/10 pt-8 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-[var(--brand-gold)]">
              {t.supportRoutes}
            </h3>
            <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-1">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={localizeHref(link.href, locale)}
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
