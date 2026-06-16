import type { SiteLocale } from "@/i18n/config";

// Tour-card badge translations. `tour.badge` is a small fixed enum stored in
// English on the tour record and is NOT part of the tour-locale override system
// (src/data/tour-locales.ts), so without this map it renders English on every
// non-EN locale. Keyed by the full SiteLocale (incl. zh).
const BADGE_TRANSLATIONS: Record<string, Partial<Record<SiteLocale, string>>> = {
  "Best Seller": {
    tr: "Çok Satan",
    de: "Bestseller",
    fr: "Meilleure Vente",
    nl: "Best Verkocht",
    ru: "Хит продаж",
    zh: "热门之选",
  },
  Premium: {
    tr: "Premium",
    de: "Premium",
    fr: "Premium",
    nl: "Premium",
    ru: "Премиум",
    zh: "尊享",
  },
  "Budget Friendly": {
    tr: "Uygun Fiyatlı",
    de: "Preiswert",
    fr: "Économique",
    nl: "Voordelig",
    ru: "Выгодно",
    zh: "超值",
  },
  Romantic: {
    tr: "Romantik",
    de: "Romantisch",
    fr: "Romantique",
    nl: "Romantisch",
    ru: "Романтично",
    zh: "浪漫之选",
  },
  Gourmet: {
    tr: "Gurme",
    de: "Gourmet",
    fr: "Gastronomique",
    nl: "Gourmet",
    ru: "Гурмэ",
    zh: "美食之选",
  },
  Daytime: {
    tr: "Gündüz",
    de: "Tagsüber",
    fr: "En Journée",
    nl: "Overdag",
    ru: "Дневной",
    zh: "日间",
  },
  Private: {
    tr: "Özel",
    de: "Privat",
    fr: "Privé",
    nl: "Privé",
    ru: "Приватно",
    zh: "私人",
  },
};

export function localizeBadge(badge: string, locale: SiteLocale | undefined): string {
  if (!locale || locale === "en") return badge;
  return BADGE_TRANSLATIONS[badge]?.[locale] ?? badge;
}
