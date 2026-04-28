"use client";

import { usePathname, useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { ACTIVE_LOCALES, LOCALE_LABELS, type SiteLocale } from "@/i18n/config";

const LOCALE_FLAGS: Partial<Record<SiteLocale, string>> = {
  en: "🇬🇧",
  tr: "🇹🇷",
  de: "🇩🇪",
  fr: "🇫🇷",
  nl: "🇳🇱",
  es: "🇪🇸",
  it: "🇮🇹",
  pt: "🇵🇹",
  ru: "🇷🇺",
  hu: "🇭🇺",
  sa: "🇸🇦",
  el: "🇬🇷",
};

// Routes that have live locale-specific pages under /[locale]/
const LOCALIZED_ROUTES = new Set([
  "bosphorus-cruise",
  "istanbul-dinner-cruise",
  "cruises/bosphorus-sunset-cruise",
  "yacht-charter-istanbul",
  "boat-rental-istanbul",
  "private-bosphorus-dinner-cruise",
  "proposal-yacht-rental-istanbul",
  "corporate-events",
  "private-events",
  "faq",
  "about",
  "contact",
  "reservation",
  "blog",
  "guides",
  "cruises",
  "private-tours",
  "boat-rental-hourly-istanbul",
  "bosphorus-cruise-departure-points",
  "client-hosting-yacht-istanbul",
  "corporate-yacht-dinner-istanbul",
  "dinner-cruise-pickup-sultanahmet-taksim",
  "dinner-cruise-with-hotel-pickup-istanbul",
  "kabatas-dinner-cruise-istanbul",
  "kurucesme-marina-yacht-charter",
  "private-dinner-cruise-for-couples-istanbul",
  "product-launch-yacht-istanbul",
  "proposal-yacht-with-photographer-istanbul",
  "sunset-cruise-tickets-istanbul",
  "team-building-yacht-istanbul",
  "turkish-night-dinner-cruise-istanbul",
]);

const NON_EN_LOCALES = ACTIVE_LOCALES.filter((l) => l !== "en") as SiteLocale[];

function detectFromPathname(pathname: string): { locale: SiteLocale; route: string } {
  const stripped = pathname.replace(/^\//, "");
  const firstSegment = stripped.split("/")[0];

  if (NON_EN_LOCALES.includes(firstSegment as SiteLocale)) {
    return {
      locale: firstSegment as SiteLocale,
      route: stripped.slice(firstSegment.length + 1),
    };
  }

  return { locale: "en" as SiteLocale, route: stripped };
}

// Returns the target path, or null if no locale version exists for this route.
// null = stay on current page (no navigation).
function buildTargetPath(targetLocale: SiteLocale, route: string): string | null {
  if (!LOCALIZED_ROUTES.has(route)) {
    // Non-localized page — only EN exists.
    // If switching to EN: strip the locale prefix (in case there was one).
    // If switching to any non-EN: no translation exists, stay put.
    return targetLocale === "en" ? `/${route}` : null;
  }
  return targetLocale === "en" ? `/${route}` : `/${targetLocale}/${route}`;
}

interface Props {
  className?: string;
  compact?: boolean;
}

export default function LanguageSwitcher({ className = "", compact = false }: Props) {
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const { locale: currentLocale, route } = detectFromPathname(pathname);

  const isLocalized = LOCALIZED_ROUTES.has(route);

  const handleSwitch = (target: SiteLocale) => {
    if (target === currentLocale) return;
    const path = buildTargetPath(target, route);
    if (path) router.push(path);
  };

  const activeLocales = ACTIVE_LOCALES as SiteLocale[];

  return (
    <div className={`relative group ${className}`}>
      <button
        aria-label="Change language"
        className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium text-[var(--body-text)] transition-colors hover:bg-gray-50 hover:text-[var(--brand-primary)]"
      >
        <span className="text-base leading-none">{LOCALE_FLAGS[currentLocale]}</span>
        {!compact && (
          <span className="hidden lg:inline">{LOCALE_LABELS[currentLocale]}</span>
        )}
        <ChevronDown className="h-3.5 w-3.5 text-[var(--text-muted)] transition-transform group-hover:rotate-180 duration-150" />
      </button>

      <div className="absolute right-0 top-full z-50 pt-1 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150">
        <div className="min-w-[168px] rounded-xl border border-gray-100 bg-white py-1.5 shadow-lg ring-1 ring-black/5">
          {activeLocales.map((locale) => {
            const available = locale === "en" || isLocalized;
            return (
              <button
                key={locale}
                onClick={() => handleSwitch(locale)}
                disabled={!available}
                title={!available ? "English only" : undefined}
                className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-sm transition-colors ${
                  locale === currentLocale
                    ? "bg-[var(--surface-alt)] font-semibold text-[var(--brand-primary)]"
                    : available
                    ? "text-[var(--body-text)] hover:bg-[var(--surface-alt)] hover:text-[var(--brand-primary)]"
                    : "cursor-not-allowed text-[var(--text-muted)] opacity-40"
                }`}
              >
                <span className="text-base leading-none">{LOCALE_FLAGS[locale]}</span>
                <span className="flex-1 text-left">{LOCALE_LABELS[locale]}</span>
                {locale === currentLocale && (
                  <svg className="h-3.5 w-3.5 shrink-0 text-[var(--brand-primary)]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
