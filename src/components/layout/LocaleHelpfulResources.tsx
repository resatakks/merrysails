import Link from "next/link";
import type { SiteLocale } from "@/i18n/config";

const TRANSLATIONS: Record<
  SiteLocale,
  {
    label: string;
    hub: string;
    sunset: string;
    dinner: string;
    yacht: string;
    pricing: string;
    faq: string;
  }
> = {
  en: {
    label: "Helpful resources:",
    hub: "All Bosphorus cruise options →",
    sunset: "Sunset cruise from €30 →",
    dinner: "Dinner cruise from €30 →",
    yacht: "Yacht charter from €280 →",
    pricing: "All pricing →",
    faq: "44-question FAQ →",
  },
  tr: {
    label: "Faydalı kaynaklar:",
    hub: "Tüm Boğaz turu seçenekleri →",
    sunset: "Gün batımı turu €30'dan →",
    dinner: "Akşam yemekli tur €30'dan →",
    yacht: "Yat kiralama €280'den →",
    pricing: "Fiyatlar →",
    faq: "44 soruluk SSS →",
  },
  de: {
    label: "Hilfreiche Links:",
    hub: "Alle Bosporus-Touren →",
    sunset: "Sonnenuntergangsfahrt ab €30 →",
    dinner: "Dinner-Kreuzfahrt ab €30 →",
    yacht: "Yachtcharter ab €280 →",
    pricing: "Alle Preise →",
    faq: "44 FAQ →",
  },
  fr: {
    label: "Ressources utiles :",
    hub: "Toutes les croisières Bosphore →",
    sunset: "Croisière coucher de soleil dès €30 →",
    dinner: "Dîner-croisière dès €30 →",
    yacht: "Location de yacht dès €280 →",
    pricing: "Tarifs →",
    faq: "FAQ 44 questions →",
  },
  nl: {
    label: "Handige bronnen:",
    hub: "Alle Bosporus cruise opties →",
    sunset: "Zonsondergangscruise vanaf €30 →",
    dinner: "Dinercruise vanaf €30 →",
    yacht: "Jachthuur vanaf €280 →",
    pricing: "Alle prijzen →",
    faq: "FAQ 44 vragen →",
  },
  // Future locales reuse English copy until translations are written.
  it: {
    label: "Risorse utili:",
    hub: "Tutte le opzioni di crociera →",
    sunset: "Crociera al tramonto da €30 →",
    dinner: "Cena in crociera da €30 →",
    yacht: "Noleggio yacht da €280 →",
    pricing: "Tariffe →",
    faq: "FAQ →",
  },
  es: {
    label: "Recursos útiles:",
    hub: "Todas las opciones de crucero →",
    sunset: "Crucero al atardecer desde €30 →",
    dinner: "Cena crucero desde €30 →",
    yacht: "Alquiler de yate desde €280 →",
    pricing: "Tarifas →",
    faq: "FAQ →",
  },
  pt: {
    label: "Recursos úteis:",
    hub: "Todas as opções de cruzeiro →",
    sunset: "Cruzeiro ao pôr do sol desde €30 →",
    dinner: "Cruzeiro com jantar desde €30 →",
    yacht: "Aluguel de iate desde €280 →",
    pricing: "Preços →",
    faq: "FAQ →",
  },
  ru: {
    label: "Полезные ссылки:",
    hub: "Все варианты круизов →",
    sunset: "Круиз на закат от €30 →",
    dinner: "Круиз с ужином от €30 →",
    yacht: "Аренда яхты от €280 →",
    pricing: "Цены →",
    faq: "FAQ →",
  },
  sa: {
    label: "روابط مفيدة:",
    hub: "كل رحلات البوسفور →",
    sunset: "رحلة الغروب من €30 →",
    dinner: "رحلة العشاء من €30 →",
    yacht: "تأجير اليخت من €280 →",
    pricing: "الأسعار →",
    faq: "FAQ →",
  },
  hu: {
    label: "Hasznos linkek:",
    hub: "Minden Boszporusz hajóút →",
    sunset: "Naplemente hajóút €30-tól →",
    dinner: "Vacsora hajóút €30-tól →",
    yacht: "Jachtbérlés €280-tól →",
    pricing: "Árak →",
    faq: "GYIK →",
  },
  el: {
    label: "Χρήσιμοι σύνδεσμοι:",
    hub: "Όλες οι κρουαζιέρες Βοσπόρου →",
    sunset: "Κρουαζιέρα ηλιοβασιλέματος από €30 →",
    dinner: "Κρουαζιέρα με δείπνο από €30 →",
    yacht: "Ενοικίαση γιοτ από €280 →",
    pricing: "Τιμές →",
    faq: "Συχνές ερωτήσεις →",
  },
};

/**
 * Helpful Resources cross-link strip for locale pillar pages.
 * Renders 4-link rozet block that drives PageRank between the 4 commercial
 * pillars (hub + sunset + dinner + yacht) per locale.
 *
 * `omit` lets a page skip its own link (e.g. dinner page doesn't link to dinner).
 */
export default function LocaleHelpfulResources({
  locale,
  omit,
}: {
  locale: SiteLocale;
  omit?: "hub" | "sunset" | "dinner" | "yacht";
}) {
  const t = TRANSLATIONS[locale] ?? TRANSLATIONS.en;
  const prefix = locale === "en" ? "" : `/${locale}`;

  type LinkItem = { key: NonNullable<typeof omit>; href: string; label: string };
  const links: LinkItem[] = ([
    { key: "hub" as const, href: `${prefix}/bosphorus-cruise`, label: t.hub },
    { key: "sunset" as const, href: `${prefix}/cruises/bosphorus-sunset-cruise`, label: t.sunset },
    { key: "dinner" as const, href: `${prefix}/istanbul-dinner-cruise`, label: t.dinner },
    { key: "yacht" as const, href: `${prefix}/yacht-charter-istanbul`, label: t.yacht },
  ] satisfies LinkItem[]).filter((l) => l.key !== omit);

  return (
    <div className="my-6 flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-4 text-sm text-[var(--text-muted)] sm:flex-row sm:items-center sm:flex-wrap">
      <span className="font-semibold text-[var(--heading)]">{t.label}</span>
      {links.map((l, i) => (
        <span key={l.href} className="contents">
          <Link
            href={l.href}
            className="font-semibold text-[var(--brand-primary)] hover:underline"
          >
            {l.label}
          </Link>
          {i < links.length - 1 && <span className="hidden sm:inline">·</span>}
        </span>
      ))}
    </div>
  );
}
