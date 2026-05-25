"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { ACTIVE_LOCALES, LOCALE_LABELS, LOCALIZED_ROUTES, type SiteLocale } from "@/i18n/config";

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

// Routes whose sub-segments (e.g. detail pages under a hub) also have locale
// versions. If `route` begins with one of these prefixes followed by "/", we
// treat the whole route as locale-aware.
const LOCALIZED_PREFIXES = ["yacht-charter-istanbul/", "cruises/", "blog/", "guides/"];

function isLocalizedRoute(route: string): boolean {
  if (LOCALIZED_ROUTES.has(route)) return true;
  return LOCALIZED_PREFIXES.some((prefix) => route.startsWith(prefix));
}

// Returns the target path for language switching.
function buildTargetPath(targetLocale: SiteLocale, route: string): string {
  // Homepage: always go to locale homepage
  if (route === "") {
    return targetLocale === "en" ? "/" : `/${targetLocale}`;
  }
  if (!isLocalizedRoute(route)) {
    if (targetLocale === "en") return `/${route}`;
    // No locale version — send to locale homepage so the user stays in their language.
    return `/${targetLocale}`;
  }
  return targetLocale === "en" ? `/${route}` : `/${targetLocale}/${route}`;
}

interface Props {
  className?: string;
  compact?: boolean;
}

export default function LanguageSwitcher({ className = "", compact = false }: Props) {
  const pathname = usePathname() ?? "/";
  const { locale: currentLocale, route } = detectFromPathname(pathname);
  // Click-toggle (not hover-only): hover menus are dead clicks on desktop and
  // completely unreachable on touch devices. Clarity showed the language
  // selector was the #1 click target AND the #1 dead-click source on mobile.
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  // Close the menu whenever navigation changes the path.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const activeLocales = ACTIVE_LOCALES as SiteLocale[];

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <button
        type="button"
        aria-label="Change language"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium text-[var(--body-text)] transition-colors hover:bg-gray-50 hover:text-[var(--brand-primary)]"
      >
        <span className="text-base leading-none">{LOCALE_FLAGS[currentLocale]}</span>
        {!compact && (
          <span className="hidden lg:inline">{LOCALE_LABELS[currentLocale]}</span>
        )}
        <ChevronDown
          className={`h-3.5 w-3.5 text-[var(--text-muted)] transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`absolute right-0 top-full z-50 pt-1 transition-all duration-150 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="min-w-[168px] rounded-xl border border-gray-100 bg-white py-1.5 shadow-lg ring-1 ring-black/5">
          {activeLocales.map((locale) => {
            const targetHref = buildTargetPath(locale, route);
            const isCurrent = locale === currentLocale;
            return (
              <Link
                key={locale}
                href={targetHref}
                hrefLang={locale}
                onClick={() => setOpen(false)}
                aria-current={isCurrent ? "page" : undefined}
                className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-sm transition-colors ${
                  isCurrent
                    ? "bg-[var(--surface-alt)] font-semibold text-[var(--brand-primary)]"
                    : "text-[var(--body-text)] hover:bg-[var(--surface-alt)] hover:text-[var(--brand-primary)]"
                }`}
              >
                <span className="text-base leading-none">{LOCALE_FLAGS[locale]}</span>
                <span className="flex-1 text-left">{LOCALE_LABELS[locale]}</span>
                {isCurrent && (
                  <svg className="h-3.5 w-3.5 shrink-0 text-[var(--brand-primary)]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
