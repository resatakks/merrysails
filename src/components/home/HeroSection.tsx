import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Shield, Star } from "lucide-react";
import { getContactChannel } from "@/lib/constants";
import TrackedContactLink from "@/components/analytics/TrackedContactLink";
import type { SiteLocale } from "@/i18n/config";
import { LOCALIZED_ROUTES } from "@/i18n/localized-routes";

/* ------------------------------------------------------------------ */
/* Locale-aware hero copy.                                             */
/*                                                                     */
/* The hero is the SAME immersive image hero on every locale homepage  */
/* (EN root `/` and `/tr /de /fr /nl /ru /zh`) — only the text + the   */
/* link targets change per locale.  Default "en" keeps the EN root     */
/* homepage byte-for-byte identical (backward compatible — pages that  */
/* render <HeroSection /> with no prop get exactly the previous EN     */
/* markup).                                                            */
/*                                                                     */
/* Prices match the locale homepage TRANSLATIONS object in             */
/* src/app/[locale]/page.tsx (sunset/dinner from €30, private yacht    */
/* from €220) so copy stays consistent across the page.               */
/* ------------------------------------------------------------------ */

type HeroLocale = "en" | "tr" | "de" | "fr" | "nl" | "ru" | "zh";

type HeroProductString = { title: string; meta: string; price: string };

type HeroStrings = {
  /** Plain headline lead, before the gold inline product links. */
  headlineBase: string;
  /** The three inline gold product link words in the headline. */
  inlineDinner: string;
  inlineSunset: string;
  inlineYacht: string;
  subtext: string;
  products: {
    sunset: HeroProductString;
    dinner: HeroProductString;
    yacht: HeroProductString;
  };
  openPage: string;
  compareButton: string;
  reservationButton: string;
  badgeOptions: string;
  badgePricing: string;
  badgeLicensed: string;
  /** Mobile-only fold-1 chip + buttons (≤ 360px friendly). */
  mobileFromPrice: string;
  mobileViewCruises: string;
  mobileWhatsapp: string;
};

const HERO_STRINGS: Record<HeroLocale, HeroStrings> = {
  en: {
    headlineBase: "Bosphorus Cruise Istanbul",
    inlineDinner: "Dinner",
    inlineSunset: "Sunset",
    inlineYacht: "Yacht Charter",
    subtext:
      "Book direct with Istanbul's TURSAB-licensed operator — sunset from €30, dinner from €30, private yacht from €220 across a 6-vessel Bosphorus fleet.",
    products: {
      sunset: { title: "Bosphorus Sunset Cruise", meta: "2 shared options", price: "From €30" },
      dinner: { title: "Bosphorus Dinner Cruise", meta: "4 shared packages", price: "From €30" },
      yacht: { title: "Yacht Charter Istanbul", meta: "6 yachts · 10–150 guests", price: "From €220" },
    },
    openPage: "Open page",
    compareButton: "Compare Cruise Options",
    reservationButton: "Open Reservation Center",
    badgeOptions: "Shared and private cruise options",
    badgePricing: "Direct booking with clear pricing",
    badgeLicensed: "TURSAB-licensed since 2001",
    mobileFromPrice: "From €30 · per person",
    mobileViewCruises: "Browse cruises",
    mobileWhatsapp: "WhatsApp",
  },
  tr: {
    headlineBase: "İstanbul Boğaz Turu",
    inlineDinner: "Akşam Yemeği",
    inlineSunset: "Gün Batımı",
    inlineYacht: "Yat Kiralama",
    subtext:
      "İstanbul'un TÜRSAB lisanslı operatörüyle direkt rezervasyon — gün batımı €30'dan, akşam yemeği €30'dan, özel yat €220'den, 6 tekneli Boğaz filosuyla.",
    products: {
      sunset: { title: "Boğaz Gün Batımı Turu", meta: "2 paylaşımlı seçenek", price: "€30'dan başlayan" },
      dinner: { title: "Boğaz Akşam Yemeği Turu", meta: "4 paylaşımlı paket", price: "€30'dan başlayan" },
      yacht: { title: "Yat Kiralama İstanbul", meta: "6 yat · 10–150 misafir", price: "€220'den başlayan" },
    },
    openPage: "Sayfayı aç",
    compareButton: "Boğaz Turu Seçeneklerini Karşılaştır",
    reservationButton: "Rezervasyon Merkezini Aç",
    badgeOptions: "Paylaşımlı ve özel tur seçenekleri",
    badgePricing: "Net fiyatlarla direkt rezervasyon",
    badgeLicensed: "2001'den beri TÜRSAB lisanslı",
    mobileFromPrice: "€30'dan · kişi başı",
    mobileViewCruises: "Turları gör",
    mobileWhatsapp: "WhatsApp",
  },
  de: {
    headlineBase: "Bosporus Kreuzfahrt Istanbul",
    inlineDinner: "Dinner",
    inlineSunset: "Sonnenuntergang",
    inlineYacht: "Yacht-Charter",
    subtext:
      "Buchen Sie direkt beim TURSAB-lizenzierten Istanbuler Veranstalter — Sonnenuntergang ab €30, Dinner ab €30, private Yacht ab €220 mit einer 6-Boote-Bosporus-Flotte.",
    products: {
      sunset: { title: "Bosporus Sonnenuntergangs-Kreuzfahrt", meta: "2 geteilte Optionen", price: "Ab €30" },
      dinner: { title: "Bosporus Dinner-Kreuzfahrt", meta: "4 geteilte Pakete", price: "Ab €30" },
      yacht: { title: "Yacht-Charter Istanbul", meta: "6 Yachten · 10–150 Gäste", price: "Ab €220" },
    },
    openPage: "Seite öffnen",
    compareButton: "Kreuzfahrt-Optionen vergleichen",
    reservationButton: "Reservierungszentrum öffnen",
    badgeOptions: "Geteilte und private Kreuzfahrt-Optionen",
    badgePricing: "Direkte Buchung mit klaren Preisen",
    badgeLicensed: "TURSAB-lizenziert seit 2001",
    mobileFromPrice: "Ab €30 · pro Person",
    mobileViewCruises: "Kreuzfahrten ansehen",
    mobileWhatsapp: "WhatsApp",
  },
  fr: {
    headlineBase: "Croisière Bosphore Istanbul",
    inlineDinner: "Dîner",
    inlineSunset: "Coucher de Soleil",
    inlineYacht: "Yacht",
    subtext:
      "Réservez en direct avec l'opérateur stambouliote licencié TURSAB — coucher de soleil dès €30, dîner dès €30, yacht privé dès €220 avec une flotte de 6 bateaux sur le Bosphore.",
    products: {
      sunset: { title: "Croisière Coucher de Soleil", meta: "2 options partagées", price: "À partir de €30" },
      dinner: { title: "Croisière Dîner Bosphore", meta: "4 packages partagés", price: "À partir de €30" },
      yacht: { title: "Charter de Yacht Istanbul", meta: "6 yachts · 10–150 invités", price: "À partir de €220" },
    },
    openPage: "Ouvrir la page",
    compareButton: "Comparer les croisières",
    reservationButton: "Ouvrir le centre de réservation",
    badgeOptions: "Croisières partagées et privées",
    badgePricing: "Réservation directe à prix clairs",
    badgeLicensed: "Licencié TURSAB depuis 2001",
    mobileFromPrice: "Dès €30 · par personne",
    mobileViewCruises: "Voir les croisières",
    mobileWhatsapp: "WhatsApp",
  },
  nl: {
    headlineBase: "Bosporus Cruise Istanbul",
    inlineDinner: "Diner",
    inlineSunset: "Zonsondergang",
    inlineYacht: "Jachtcharter",
    subtext:
      "Boek direct bij Istanbul's TURSAB-gelicentieerde aanbieder — zonsondergang vanaf €30, diner vanaf €30, privéjacht vanaf €220 met een Bosporus-vloot van 6 boten.",
    products: {
      sunset: { title: "Bosporus Zonsondergangs-Cruise", meta: "2 gedeelde opties", price: "Vanaf €30" },
      dinner: { title: "Bosporus Dinercruise", meta: "4 gedeelde pakketten", price: "Vanaf €30" },
      yacht: { title: "Jachtcharter Istanbul", meta: "6 jachten · 10–150 gasten", price: "Vanaf €220" },
    },
    openPage: "Pagina openen",
    compareButton: "Cruise-opties vergelijken",
    reservationButton: "Reserveringscentrum openen",
    badgeOptions: "Gedeelde en privé cruise-opties",
    badgePricing: "Directe boeking met heldere prijzen",
    badgeLicensed: "TURSAB-gelicentieerd sinds 2001",
    mobileFromPrice: "Vanaf €30 · per persoon",
    mobileViewCruises: "Bekijk cruises",
    mobileWhatsapp: "WhatsApp",
  },
  ru: {
    headlineBase: "Круиз по Босфору в Стамбуле",
    inlineDinner: "Ужин",
    inlineSunset: "Закат",
    inlineYacht: "Аренда яхты",
    subtext:
      "Бронируйте напрямую у лицензированного TÜRSAB оператора в Стамбуле — закат от €30, ужин от €30, частная яхта от €220, флот из 6 судов на Босфоре.",
    products: {
      sunset: { title: "Круиз по Босфору на закате", meta: "2 совместных варианта", price: "от €30" },
      dinner: { title: "Ужин-круиз по Босфору", meta: "4 совместных пакета", price: "от €30" },
      yacht: { title: "Аренда яхты в Стамбуле", meta: "6 яхт · 10–150 гостей", price: "от €220" },
    },
    openPage: "Открыть страницу",
    compareButton: "Сравнить варианты круизов",
    reservationButton: "Открыть центр бронирования",
    badgeOptions: "Совместные и частные круизы",
    badgePricing: "Прямое бронирование с понятными ценами",
    badgeLicensed: "Лицензия TÜRSAB с 2001 года",
    mobileFromPrice: "От €30 · с человека",
    mobileViewCruises: "Смотреть круизы",
    mobileWhatsapp: "WhatsApp",
  },
  zh: {
    headlineBase: "伊斯坦布尔博斯普鲁斯海峡游船",
    inlineDinner: "晚宴",
    inlineSunset: "日落",
    inlineYacht: "游艇包租",
    subtext:
      "向伊斯坦布尔持 TÜRSAB 许可的运营方直接预订 — 日落 €30 起、晚宴 €30 起、私人游艇 €220 起,博斯普鲁斯 6 艘船队。",
    products: {
      sunset: { title: "博斯普鲁斯日落游船", meta: "2 个共享选项", price: "€30 起" },
      dinner: { title: "博斯普鲁斯晚宴游船", meta: "4 个共享套餐", price: "€30 起" },
      yacht: { title: "伊斯坦布尔私人游艇包租", meta: "6 艘游艇 · 10–150 位客人", price: "€220 起" },
    },
    openPage: "打开页面",
    compareButton: "比较游船选项",
    reservationButton: "打开预订中心",
    badgeOptions: "共享与私人游船选项",
    badgePricing: "价格透明,直接预订",
    badgeLicensed: "自 2001 年起持 TÜRSAB 许可",
    mobileFromPrice: "€30 起 · 每人",
    mobileViewCruises: "查看游船",
    mobileWhatsapp: "WhatsApp",
  },
};

/* Routes that have a live /<locale>/<path> page. `/reservation` is localized
   for the CTA (mirrors Header.tsx) even though it is excluded from hreflang.
   Routes NOT in this set (e.g. /compare-bosphorus-cruises, /pricing, /tursab)
   only exist at the EN root, so they stay un-prefixed for every locale. */
const HERO_LOCALIZED_ROUTES = new Set<string>([
  ...Array.from(LOCALIZED_ROUTES).filter((r) => r !== ""),
  "/reservation",
]);

function localizeHref(href: string, locale: HeroLocale): string {
  // 2026-07-09: EN root moved off /istanbul-dinner-cruise (DMCA relocation,
  // Lumen #86820254) to /bosphorus-dinner-cruise-istanbul. Callers below keep
  // passing the OLD path as lookup key so tr/de/fr/nl/ru localization keeps
  // resolving to the still-live, unchanged /<locale>/istanbul-dinner-cruise.
  if (href === "/istanbul-dinner-cruise" && locale === "en") return "/bosphorus-dinner-cruise-istanbul";
  if (locale === "en") return href;
  return HERO_LOCALIZED_ROUTES.has(href) ? `/${locale}${href}` : href;
}

interface Props {
  /** Locale for the hero copy + link prefixes. Defaults to "en" so the EN
   *  root homepage renders byte-for-byte identical (backward compatible). */
  locale?: SiteLocale;
}

export default function HeroSection({ locale = "en" }: Props) {
  const l: HeroLocale = (locale in HERO_STRINGS ? locale : "en") as HeroLocale;
  const s = HERO_STRINGS[l];
  // Contact is WhatsApp for every locale incl. ru/zh (operator decision
  // 2026-06-02 — no Telegram CTA anywhere).
  const channel = getContactChannel(l);

  const heroProducts = [
    { href: localizeHref("/cruises/bosphorus-sunset-cruise", l), ...s.products.sunset },
    { href: localizeHref("/istanbul-dinner-cruise", l), ...s.products.dinner },
    { href: localizeHref("/yacht-charter-istanbul", l), ...s.products.yacht },
  ];

  return (
    <section className="relative overflow-hidden bg-[#0b1e3a]">
      {/* Hero — our own sunset cruise photo. object-position centres on the
          subject (guests watching the sunset) without cropping their faces
          on tall viewports. */}
      <Image
        src="/images/sunset-2026/hero.jpeg"
        alt="MerrySails Bosphorus sunset cruise — guests watching golden hour"
        fill
        className="object-cover [object-position:50%_35%]"
        priority
        sizes="100vw"
        quality={75}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(255,200,120,0.18),transparent_55%),radial-gradient(ellipse_at_20%_80%,rgba(11,30,58,0.45),transparent_60%)]"
      />
      <div aria-hidden className="absolute inset-0 bg-black/35" />

      <div className="relative z-10 container-main flex min-h-[36rem] flex-col pt-24 pb-6 sm:min-h-[82svh] sm:justify-center sm:pt-28 sm:pb-12">
        <div className="mx-auto w-full max-w-4xl">
          <div className="hero-fade-in mx-auto max-w-3xl text-center">
            <h1 className="text-[1.6rem] font-bold leading-[1.1] text-white sm:text-5xl md:text-[4.2rem] md:leading-[0.98]">
              {s.headlineBase}
              {/* Clarity (2026-05-29) showed 32 dead-clicks on this gold
                  sub-heading — users were treating it as a CTA. We now
                  expose each of the three products as inline anchor links
                  so the tap goes somewhere useful instead of nothing. */}
              <span className="mt-1 block text-[var(--brand-gold)] sm:mt-0 sm:inline">
                {" — "}
                <Link href={localizeHref("/istanbul-dinner-cruise", l)} className="underline-offset-[6px] hover:underline focus:underline">
                  {s.inlineDinner}
                </Link>
                {", "}
                <Link href={localizeHref("/cruises/bosphorus-sunset-cruise", l)} className="underline-offset-[6px] hover:underline focus:underline">
                  {s.inlineSunset}
                </Link>
                {" & "}
                <Link href={localizeHref("/yacht-charter-istanbul", l)} className="underline-offset-[6px] hover:underline focus:underline">
                  {s.inlineYacht}
                </Link>
              </span>
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-[13px] leading-relaxed text-white/84 sm:mt-4 sm:text-base md:text-lg">
              {s.subtext}
            </p>

            {/* Mobile-only fold-1 conversion strip — price chip + 2 CTA row.
                The homepage has 13.6% avg mobile scroll depth and is the #1
                quickback page (Clarity 2026-06-20): the three product cards
                are crammed below the fold and the Compare/Reservation CTAs
                further down are never seen. This puts a visible "From €30"
                price + one primary scroll action (Browse cruises → #tours)
                and a WhatsApp fallback above the fold on 360px viewports.
                Hidden ≥ sm so the desktop hero is untouched. WhatsApp is the
                ONLY contact channel on every locale incl. ru/zh. */}
            <div className="mt-4 flex flex-col items-stretch gap-2 sm:hidden">
              <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-[var(--brand-gold)]/95 px-3 py-1.5 text-[12px] font-bold uppercase tracking-wide text-[#0b1e3a] shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
                <Star className="h-3.5 w-3.5" aria-hidden />
                {s.mobileFromPrice}
              </div>
              <div className="mt-1 grid grid-cols-2 gap-2">
                <a
                  href="#tours"
                  className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-full bg-[var(--brand-primary)] px-3 text-sm font-bold text-white shadow-[0_10px_28px_rgba(11,21,58,0.28)] transition-transform active:scale-95"
                >
                  {s.mobileViewCruises}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <TrackedContactLink
                  href={channel.url}
                  kind="whatsapp"
                  label="herosection_hub"
                  location="homepage_hero_mobile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-full bg-white px-3 text-sm font-bold shadow-[0_10px_28px_rgba(11,21,58,0.18)] transition-transform active:scale-95"
                  style={{ borderWidth: 1, borderStyle: "solid", borderColor: "#25D366", color: "#128C7E" }}
                >
                  {s.mobileWhatsapp}
                </TrackedContactLink>
              </div>
            </div>
          </div>

          <div className="hero-fade-in hero-fade-in-delay-1 mt-5 grid gap-2.5 sm:mt-6 sm:gap-3 md:grid-cols-3">
            {heroProducts.map((product) => (
              <Link
                key={product.href}
                href={product.href}
                className="group rounded-2xl border border-white/45 bg-white/84 px-3.5 py-3 text-[var(--heading)] shadow-[0_18px_48px_rgba(11,21,58,0.14)] transition-all hover:-translate-y-0.5 hover:border-white/70 hover:bg-white/90 sm:rounded-[1.55rem] sm:px-4 sm:py-4"
              >
                <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)] sm:text-[10px] sm:tracking-[0.18em]">
                  {product.meta}
                </p>
                <h2 className="mt-1.5 text-[0.98rem] font-semibold leading-snug text-[var(--heading)] sm:mt-2 sm:text-[1.1rem]">
                  {product.title}
                </h2>
                <div className="mt-2.5 flex items-center justify-between gap-3 sm:mt-3">
                  <p className="text-sm font-bold text-[var(--brand-gold)]">{product.price}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand-primary)] transition-colors group-hover:text-[var(--brand-primary-hover)]">
                    {s.openPage}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="hero-fade-in hero-fade-in-delay-2 mt-5 flex flex-wrap justify-center gap-2.5 sm:mt-6 sm:gap-3">
            <Link
              href={localizeHref("/bosphorus-cruise", l)}
              className="btn-cta text-sm !px-6 !py-3 sm:text-base sm:!px-8 sm:!py-3.5"
            >
              {s.compareButton}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={localizeHref("/reservation", l)}
              className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/95 px-6 py-3 text-sm font-semibold text-[var(--brand-primary)] shadow-[0_16px_42px_rgba(11,21,58,0.18)] backdrop-blur-sm transition-all hover:bg-white hover:text-[var(--brand-primary-hover)] sm:px-8 sm:py-3.5 sm:text-base"
            >
              {s.reservationButton}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Trust badges — converted from <span> to <Link> after Clarity
              (2026-05-29) showed 24 dead-clicks on "Shared and private
              cruise options".  Users were treating each badge as a tappable
              chip, so we route them to the relevant proof page.  These three
              proof pages (/compare-bosphorus-cruises, /pricing, /tursab) are
              EN-root-only, so localizeHref leaves them un-prefixed. */}
          <div className="hero-fade-in hero-fade-in-delay-3 mt-7 hidden flex-wrap items-center justify-center gap-5 text-sm text-white/76 sm:flex">
            <Link
              href={localizeHref("/compare-bosphorus-cruises", l)}
              className="flex items-center gap-2 transition-colors hover:text-white"
            >
              <Star className="h-4 w-4 text-[var(--brand-gold)]" />
              <span>{s.badgeOptions}</span>
            </Link>
            <Link
              href={localizeHref("/pricing", l)}
              className="flex items-center gap-2 transition-colors hover:text-white"
            >
              <Shield className="h-4 w-4 text-[var(--brand-gold)]" />
              <span>{s.badgePricing}</span>
            </Link>
            <Link
              href={localizeHref("/tursab", l)}
              className="flex items-center gap-2 transition-colors hover:text-white"
            >
              <Clock className="h-4 w-4 text-[var(--brand-gold)]" />
              <span>{s.badgeLicensed}</span>
            </Link>
          </div>

          {/* Desktop-only "see all cruises" scroll affordance. With the hero
              shortened to sm:min-h-[82svh], desktop users didn't realise the
              page continues below the fold to the full cruise grid. This
              subtle centered hint + bouncing chevron jumps to #tours. Reuses
              the same localized "browse cruises" string as the mobile strip
              (no new key). Hidden on mobile — the mobile strip already has a
              visible "Browse cruises" action. */}
          <div className="hero-fade-in hero-fade-in-delay-3 mt-8 hidden justify-center sm:flex">
            <a
              href="#tours"
              className="group inline-flex flex-col items-center gap-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/70 transition-colors hover:text-white"
            >
              <span>{s.mobileViewCruises}</span>
              <ArrowRight className="h-4 w-4 rotate-90 animate-bounce text-[var(--brand-gold)]" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
