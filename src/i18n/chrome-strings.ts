// Central per-locale strings for the global UI chrome (Header, Footer,
// LanguageSwitcher, MobileBookingBar, error pages). Mirrors the structure of
// `booking-strings.ts` — one Record per surface, one accessor per surface,
// shared locale detection.
//
// Why this lives in its own file (not co-located with each component):
//   - Server components like `not-found.tsx` need to read strings without
//     importing the client-component bundles where the chrome lives.
//   - Adding a new locale (e.g. /ru) is a single-file diff.
//   - Keeps `booking-strings.ts` focused on the in-page booking surface.
//
// Locale standards (formal address):
//   - TR formal "Siz"
//   - DE formal "Sie"
//   - FR formal "vous"
//   - NL formal "u"
//   - RU formal "Вы"
//   - ZH Simplified Chinese (mainland), formal/neutral register

export type ChromeLocale = "en" | "tr" | "de" | "fr" | "nl" | "ru" | "zh";

export const CHROME_LOCALES: ChromeLocale[] = ["en", "tr", "de", "fr", "nl", "ru", "zh"];

/** Header navigation + reserve CTA + a11y labels. */
export interface HeaderStrings {
  // primary nav
  cruises: string;
  sunsetCruise: string;
  dinnerCruise: string;
  yachtCharter: string;
  guides: string;
  blog: string;
  istanbulGuides: string;
  kabatasPier: string;
  karakoyWaterfront: string;
  faq: string;
  about: string;
  contact: string;
  // CTAs
  reserveOnline: string;
  reserve: string;
  callUs: string;
  // a11y / sr-only
  openNavMenu: string;
  navigationMenu: string;
  collapseMenu: (label: string) => string;
  expandMenu: (label: string) => string;
  languageHeading: string;
}

/** Footer column titles, copyright, social/contact a11y. */
export interface FooterStrings {
  description: string;
  coreProducts: string;
  supportRoutes: string;
  company: string;
  blogHighlights: string;
  guideTopics: string;
  partnerServices: string;
  sisterBrands: string;
  viewLicense: string;
  tursabLicensed: string;
  tursabLicenseNumberPrefix: string; // e.g. "Belge No" (TR) / "License No"
  allRightsReserved: string;
  privacyPolicy: string;
  terms: string;
  aiKnowledge: string;
}

/** Language switcher a11y labels. */
export interface LanguageSwitcherStrings {
  changeLanguage: string;
  selectLanguage: string;
  language: string;
}

/** Mobile booking bar — tour and hub variants. */
export interface MobileBookingBarStrings {
  book: string;
  chat: string;
  from: string;
  // hub variant (homepage / compare hub)
  hubBrand: string;
  hubBook: string;
  quickBookRegion: string;
}

/** Error pages (404, 500, generic error fallback). */
export interface ErrorPageStrings {
  notFoundCode: string; // usually "404" — kept localized for RU (could be "404")
  notFoundTitle: string;
  notFoundDescription: string;
  backToHome: string;
  compareCruises: string;
  // generic error
  errorTitle: string;
  errorDescription: string;
  tryAgain: string;
}

/** Breadcrumb labels. Currently only Home is shared across the codebase. */
export interface BreadcrumbStrings {
  home: string;
}

// ----------------------------------------------------------------------------
// HEADER
// ----------------------------------------------------------------------------

const HEADER: Record<ChromeLocale, HeaderStrings> = {
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
    callUs: "Call us",
    openNavMenu: "Open navigation menu",
    navigationMenu: "Navigation Menu",
    collapseMenu: (label) => `Collapse ${label} menu`,
    expandMenu: (label) => `Expand ${label} menu`,
    languageHeading: "Language",
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
    callUs: "Bizi arayın",
    openNavMenu: "Menüyü aç",
    navigationMenu: "Navigasyon Menüsü",
    collapseMenu: (label) => `${label} menüsünü kapat`,
    expandMenu: (label) => `${label} menüsünü aç`,
    languageHeading: "Dil",
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
    callUs: "Rufen Sie uns an",
    openNavMenu: "Navigationsmenü öffnen",
    navigationMenu: "Navigationsmenü",
    collapseMenu: (label) => `Menü ${label} einklappen`,
    expandMenu: (label) => `Menü ${label} ausklappen`,
    languageHeading: "Sprache",
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
    callUs: "Appelez-nous",
    openNavMenu: "Ouvrir le menu de navigation",
    navigationMenu: "Menu de Navigation",
    collapseMenu: (label) => `Réduire le menu ${label}`,
    expandMenu: (label) => `Développer le menu ${label}`,
    languageHeading: "Langue",
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
    callUs: "Bel ons",
    openNavMenu: "Navigatiemenu openen",
    navigationMenu: "Navigatiemenu",
    collapseMenu: (label) => `${label} menu inklappen`,
    expandMenu: (label) => `${label} menu uitklappen`,
    languageHeading: "Taal",
  },
  ru: {
    cruises: "Круизы",
    sunsetCruise: "Круиз на закат",
    dinnerCruise: "Круиз с ужином",
    yachtCharter: "Аренда яхты",
    guides: "Гиды",
    blog: "Блог",
    istanbulGuides: "Гиды по Стамбулу",
    kabatasPier: "Причал Кабаташ",
    karakoyWaterfront: "Набережная Каракёй",
    faq: "Вопросы",
    about: "О нас",
    contact: "Контакты",
    reserveOnline: "Забронировать онлайн",
    reserve: "Бронировать",
    callUs: "Позвонить нам",
    openNavMenu: "Открыть меню навигации",
    navigationMenu: "Меню навигации",
    collapseMenu: (label) => `Свернуть меню «${label}»`,
    expandMenu: (label) => `Развернуть меню «${label}»`,
    languageHeading: "Язык",
  },
  zh: {
    cruises: "游船",
    sunsetCruise: "日落游船",
    dinnerCruise: "晚宴游船",
    yachtCharter: "私人游艇",
    guides: "攻略",
    blog: "博客",
    istanbulGuides: "伊斯坦布尔攻略",
    kabatasPier: "卡巴塔什码头",
    karakoyWaterfront: "卡拉科伊海滨",
    faq: "常见问题",
    about: "关于我们",
    contact: "联系我们",
    reserveOnline: "在线预订",
    reserve: "预订",
    callUs: "致电我们",
    openNavMenu: "打开导航菜单",
    navigationMenu: "导航菜单",
    collapseMenu: (label) => `收起${label}菜单`,
    expandMenu: (label) => `展开${label}菜单`,
    languageHeading: "语言",
  },
};

// ----------------------------------------------------------------------------
// FOOTER
// ----------------------------------------------------------------------------

const FOOTER: Record<ChromeLocale, FooterStrings> = {
  en: {
    description:
      "Direct Bosphorus bookings for sunset cruise, dinner cruise, and private yacht charter in Istanbul.",
    coreProducts: "Core Products",
    supportRoutes: "Support Routes",
    company: "Company",
    blogHighlights: "Blog Highlights",
    guideTopics: "Guide Topics",
    partnerServices: "Partner Services",
    sisterBrands: "Group Brands",
    viewLicense: "View license details",
    tursabLicensed: "TURSAB Licensed",
    tursabLicenseNumberPrefix: "License No",
    allRightsReserved: "All rights reserved.",
    privacyPolicy: "Privacy Policy",
    terms: "Terms & Conditions",
    aiKnowledge: "AI Knowledge",
  },
  tr: {
    description:
      "İstanbul'da gün batımı turu, akşam yemeği turu ve özel yat kiralama için doğrudan Boğaz rezervasyonları.",
    coreProducts: "Ana Ürünler",
    supportRoutes: "Destek Sayfaları",
    company: "Şirket",
    blogHighlights: "Blog",
    guideTopics: "Rehberler",
    partnerServices: "Ortak Hizmetler",
    sisterBrands: "Grup Markaları",
    viewLicense: "Lisans detaylarını görüntüle",
    tursabLicensed: "TÜRSAB Lisanslı",
    tursabLicenseNumberPrefix: "Belge No",
    allRightsReserved: "Tüm hakları saklıdır.",
    privacyPolicy: "Gizlilik Politikası",
    terms: "Kullanım Şartları",
    aiKnowledge: "Yapay Zeka Bilgisi",
  },
  de: {
    description:
      "Direkte Buchungen für Sonnenuntergangs-Kreuzfahrten, Dinner-Kreuzfahrten und privaten Yachtcharter auf dem Bosporus in Istanbul.",
    coreProducts: "Hauptprodukte",
    supportRoutes: "Support-Seiten",
    company: "Unternehmen",
    blogHighlights: "Blog",
    guideTopics: "Reiseführer",
    partnerServices: "Partner-Services",
    sisterBrands: "Konzernmarken",
    viewLicense: "Lizenzdetails ansehen",
    tursabLicensed: "TÜRSAB-lizenziert",
    tursabLicenseNumberPrefix: "Lizenznummer",
    allRightsReserved: "Alle Rechte vorbehalten.",
    privacyPolicy: "Datenschutzrichtlinie",
    terms: "Nutzungsbedingungen",
    aiKnowledge: "KI-Wissen",
  },
  fr: {
    description:
      "Réservations directes pour croisière coucher de soleil, dîner-croisière et yacht privé sur le Bosphore à Istanbul.",
    coreProducts: "Produits Phares",
    supportRoutes: "Pages d'assistance",
    company: "Entreprise",
    blogHighlights: "Blog",
    guideTopics: "Guides de voyage",
    partnerServices: "Services Partenaires",
    sisterBrands: "Marques du Groupe",
    viewLicense: "Voir les détails de la licence",
    tursabLicensed: "Licencié TÜRSAB",
    tursabLicenseNumberPrefix: "Licence n°",
    allRightsReserved: "Tous droits réservés.",
    privacyPolicy: "Politique de confidentialité",
    terms: "Conditions d'utilisation",
    aiKnowledge: "Connaissance IA",
  },
  nl: {
    description:
      "Directe boekingen voor zonsondergangstochten, dinercruises en privéjachtverhuur op de Bosporus in Istanbul.",
    coreProducts: "Hoofdproducten",
    supportRoutes: "Ondersteuningspagina's",
    company: "Bedrijf",
    blogHighlights: "Blog",
    guideTopics: "Reisgidsen",
    partnerServices: "Partnerservices",
    sisterBrands: "Groepsmerken",
    viewLicense: "Licentiedetails bekijken",
    tursabLicensed: "TÜRSAB-gelicentieerd",
    tursabLicenseNumberPrefix: "Licentienummer",
    allRightsReserved: "Alle rechten voorbehouden.",
    privacyPolicy: "Privacybeleid",
    terms: "Algemene Voorwaarden",
    aiKnowledge: "AI-kennis",
  },
  ru: {
    description:
      "Прямые бронирования на круизы по Босфору: круиз на закате, ужин-круиз и частная аренда яхты в Стамбуле.",
    coreProducts: "Основные продукты",
    supportRoutes: "Сервисные страницы",
    company: "Компания",
    blogHighlights: "Блог",
    guideTopics: "Гиды",
    partnerServices: "Партнёрские сервисы",
    sisterBrands: "Бренды группы",
    viewLicense: "Подробности лицензии",
    tursabLicensed: "Лицензия TÜRSAB",
    tursabLicenseNumberPrefix: "Лицензия №",
    allRightsReserved: "Все права защищены.",
    privacyPolicy: "Политика конфиденциальности",
    terms: "Условия использования",
    aiKnowledge: "AI-знания",
  },
  zh: {
    description:
      "在伊斯坦布尔直接预订博斯普鲁斯日落游船、晚宴游船和私人游艇包租。",
    coreProducts: "核心产品",
    supportRoutes: "服务页面",
    company: "公司",
    blogHighlights: "博客精选",
    guideTopics: "攻略主题",
    partnerServices: "合作服务",
    sisterBrands: "集团品牌",
    viewLicense: "查看许可证详情",
    tursabLicensed: "TÜRSAB 持牌",
    tursabLicenseNumberPrefix: "许可证号",
    allRightsReserved: "版权所有。",
    privacyPolicy: "隐私政策",
    terms: "使用条款",
    aiKnowledge: "AI 知识库",
  },
};

// ----------------------------------------------------------------------------
// LANGUAGE SWITCHER
// ----------------------------------------------------------------------------

const LANGUAGE_SWITCHER: Record<ChromeLocale, LanguageSwitcherStrings> = {
  en: { changeLanguage: "Change language", selectLanguage: "Select language", language: "Language" },
  tr: { changeLanguage: "Dili değiştir", selectLanguage: "Dil seçin", language: "Dil" },
  de: { changeLanguage: "Sprache ändern", selectLanguage: "Sprache auswählen", language: "Sprache" },
  fr: { changeLanguage: "Changer de langue", selectLanguage: "Sélectionner une langue", language: "Langue" },
  nl: { changeLanguage: "Taal wijzigen", selectLanguage: "Taal selecteren", language: "Taal" },
  ru: { changeLanguage: "Сменить язык", selectLanguage: "Выберите язык", language: "Язык" },
  zh: { changeLanguage: "切换语言", selectLanguage: "选择语言", language: "语言" },
};

// ----------------------------------------------------------------------------
// MOBILE BOOKING BAR
// ----------------------------------------------------------------------------

const MOBILE_BOOKING_BAR: Record<ChromeLocale, MobileBookingBarStrings> = {
  en: {
    book: "Book now",
    chat: "WhatsApp",
    from: "from",
    hubBrand: "Bosphorus cruises",
    hubBook: "View cruises",
    quickBookRegion: "Quick book",
  },
  tr: {
    book: "Rezervasyon",
    chat: "WhatsApp",
    from: "",
    hubBrand: "Boğaz turları",
    hubBook: "Turları gör",
    quickBookRegion: "Hızlı rezervasyon",
  },
  de: {
    book: "Jetzt buchen",
    chat: "WhatsApp",
    from: "ab",
    hubBrand: "Bosporus-Kreuzfahrten",
    hubBook: "Kreuzfahrten ansehen",
    quickBookRegion: "Schnellbuchung",
  },
  fr: {
    book: "Réserver",
    chat: "WhatsApp",
    from: "dès",
    hubBrand: "Croisières Bosphore",
    hubBook: "Voir les croisières",
    quickBookRegion: "Réservation rapide",
  },
  nl: {
    book: "Boek nu",
    chat: "WhatsApp",
    from: "vanaf",
    hubBrand: "Bosporus-cruises",
    hubBook: "Bekijk cruises",
    quickBookRegion: "Snel boeken",
  },
  ru: {
    book: "Забронировать",
    chat: "WhatsApp",
    from: "от",
    hubBrand: "Круизы по Босфору",
    hubBook: "Смотреть круизы",
    quickBookRegion: "Быстрое бронирование",
  },
  zh: {
    book: "立即预订",
    chat: "WhatsApp",
    from: "",
    hubBrand: "博斯普鲁斯游船",
    hubBook: "查看游船",
    quickBookRegion: "快速预订",
  },
};

// ----------------------------------------------------------------------------
// ERROR PAGES
// ----------------------------------------------------------------------------

const ERROR_PAGE: Record<ChromeLocale, ErrorPageStrings> = {
  en: {
    notFoundCode: "404",
    notFoundTitle: "Page Not Found",
    notFoundDescription:
      "The page you're looking for doesn't exist or has been moved. Getting lost on the Bosphorus is lovely — but not on the web!",
    backToHome: "Back to Home",
    compareCruises: "Compare Cruises",
    errorTitle: "Something went wrong",
    errorDescription: "We hit an unexpected error. Please try again or contact us if the issue persists.",
    tryAgain: "Try again",
  },
  tr: {
    notFoundCode: "404",
    notFoundTitle: "Sayfa Bulunamadı",
    notFoundDescription:
      "Aradığınız sayfa mevcut değil veya taşınmış olabilir. Boğaz'da kaybolmak güzel, ama internette pek hoş değil!",
    backToHome: "Anasayfaya Dön",
    compareCruises: "Turları Karşılaştır",
    errorTitle: "Bir hata oluştu",
    errorDescription: "Beklenmedik bir hata aldık. Lütfen tekrar deneyin veya sorun devam ederse bizimle iletişime geçin.",
    tryAgain: "Tekrar dene",
  },
  de: {
    notFoundCode: "404",
    notFoundTitle: "Seite nicht gefunden",
    notFoundDescription:
      "Die gesuchte Seite existiert nicht oder wurde verschoben. Auf dem Bosporus verloren zu gehen ist schön — im Netz nicht!",
    backToHome: "Zurück zur Startseite",
    compareCruises: "Kreuzfahrten vergleichen",
    errorTitle: "Etwas ist schiefgelaufen",
    errorDescription: "Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut oder kontaktieren Sie uns.",
    tryAgain: "Erneut versuchen",
  },
  fr: {
    notFoundCode: "404",
    notFoundTitle: "Page introuvable",
    notFoundDescription:
      "La page que vous cherchez n'existe pas ou a été déplacée. Se perdre sur le Bosphore est charmant — mais pas sur le web !",
    backToHome: "Retour à l'accueil",
    compareCruises: "Comparer les croisières",
    errorTitle: "Une erreur est survenue",
    errorDescription: "Nous avons rencontré une erreur inattendue. Veuillez réessayer ou nous contacter si le problème persiste.",
    tryAgain: "Réessayer",
  },
  nl: {
    notFoundCode: "404",
    notFoundTitle: "Pagina niet gevonden",
    notFoundDescription:
      "De pagina die u zoekt bestaat niet of is verplaatst. Verdwalen op de Bosporus is heerlijk — op het web minder!",
    backToHome: "Terug naar de homepage",
    compareCruises: "Cruises vergelijken",
    errorTitle: "Er ging iets mis",
    errorDescription: "We zijn een onverwachte fout tegengekomen. Probeer het opnieuw of neem contact met ons op.",
    tryAgain: "Opnieuw proberen",
  },
  ru: {
    notFoundCode: "404",
    notFoundTitle: "Страница не найдена",
    notFoundDescription:
      "Запрашиваемая страница не существует или была перемещена. Заблудиться на Босфоре — это прекрасно, а вот в сети — не очень!",
    backToHome: "На главную",
    compareCruises: "Сравнить круизы",
    errorTitle: "Что-то пошло не так",
    errorDescription: "Произошла неожиданная ошибка. Пожалуйста, попробуйте снова или свяжитесь с нами.",
    tryAgain: "Попробовать снова",
  },
  zh: {
    notFoundCode: "404",
    notFoundTitle: "页面未找到",
    notFoundDescription:
      "您查找的页面不存在或已被移动。在博斯普鲁斯海峡上迷路很美妙——但在网上可不行!",
    backToHome: "返回首页",
    compareCruises: "对比游船",
    errorTitle: "出了点问题",
    errorDescription: "我们遇到了意外错误。请重试,如果问题持续,请联系我们。",
    tryAgain: "重试",
  },
};

// ----------------------------------------------------------------------------
// BREADCRUMBS
// ----------------------------------------------------------------------------

const BREADCRUMBS: Record<ChromeLocale, BreadcrumbStrings> = {
  en: { home: "Home" },
  tr: { home: "Anasayfa" },
  de: { home: "Startseite" },
  fr: { home: "Accueil" },
  nl: { home: "Home" },
  ru: { home: "Главная" },
  zh: { home: "首页" },
};

// ----------------------------------------------------------------------------
// ACCESSORS
// ----------------------------------------------------------------------------

export function getHeaderStrings(locale: ChromeLocale): HeaderStrings {
  return HEADER[locale] ?? HEADER.en;
}

export function getFooterStrings(locale: ChromeLocale): FooterStrings {
  return FOOTER[locale] ?? FOOTER.en;
}

export function getLanguageSwitcherStrings(locale: ChromeLocale): LanguageSwitcherStrings {
  return LANGUAGE_SWITCHER[locale] ?? LANGUAGE_SWITCHER.en;
}

export function getMobileBookingBarStrings(locale: ChromeLocale): MobileBookingBarStrings {
  return MOBILE_BOOKING_BAR[locale] ?? MOBILE_BOOKING_BAR.en;
}

export function getErrorPageStrings(locale: ChromeLocale): ErrorPageStrings {
  return ERROR_PAGE[locale] ?? ERROR_PAGE.en;
}

export function getBreadcrumbStrings(locale: ChromeLocale): BreadcrumbStrings {
  return BREADCRUMBS[locale] ?? BREADCRUMBS.en;
}

/**
 * Single locale-detection helper for all chrome surfaces. Mirrors
 * `detectBookingLocaleFromPathname` but returns the wider `ChromeLocale` type.
 * Re-exported under the booking-strings alias for callers that already use it.
 */
export function detectChromeLocaleFromPathname(
  pathname: string | null | undefined,
): ChromeLocale {
  if (!pathname) return "en";
  const first = pathname.split("/").filter(Boolean)[0];
  if (
    first === "tr" ||
    first === "de" ||
    first === "fr" ||
    first === "nl" ||
    first === "ru" ||
    first === "zh"
  ) {
    return first;
  }
  return "en";
}
