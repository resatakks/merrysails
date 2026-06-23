"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { ACTIVE_LOCALES, LOCALE_LABELS, LOCALIZED_ROUTES, type SiteLocale } from "@/i18n/config";
import { RU_ENABLED_ROUTES, ZH_ENABLED_ROUTES } from "@/i18n/localized-routes";
import {
  detectChromeLocaleFromPathname,
  getLanguageSwitcherStrings,
} from "@/i18n/chrome-strings";

// Staged locales only ship content for a subset of LOCALIZED_ROUTES. Linking
// them to a route outside their enabled set lands on a notFound() 404 (a
// customer switching to 中文 on /about was lost — 2026-06-16). The gate sets in
// localized-routes.ts use a leading slash and "" for the homepage; map each
// staged locale to its set so the switcher can fall back to the locale
// homepage instead of a dead link.
const STAGED_LOCALE_ROUTES: Partial<Record<SiteLocale, Set<string>>> = {
  ru: RU_ENABLED_ROUTES,
  zh: ZH_ENABLED_ROUTES,
};

// True when `targetLocale` actually ships the given switcher `route`
// (route is slug-less, "" = homepage). Non-staged locales (tr/de/fr/nl) ship
// every LOCALIZED_ROUTES path, so they always pass.
function localeHasRoute(targetLocale: SiteLocale, route: string): boolean {
  const gate = STAGED_LOCALE_ROUTES[targetLocale];
  if (!gate) return true;
  return gate.has(route === "" ? "" : `/${route}`);
}

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
  zh: "🇨🇳", // 2026-06-04: Chinese (Simplified) added — staged commercial funnel
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

// Detail routes whose SLUGS are disjoint across locales: every locale ships its
// own blog posts / guides under its own unique slugs, and there is no
// `[locale]/guides/[slug]` route at all (only the locale index). Emitting a
// same-slug detail URL in another locale 404s — e.g. /tr/blog/<tr-slug> →
// /blog/<tr-slug> (EN root has no such slug), or /blog/<en-slug> →
// /de/blog/<en-slug> (DE has no such slug). For these we switch to the target
// locale's INDEX page (which always exists) instead of a dead same-slug URL.
// (Semrush/Screaming Frog 2026-06-23: 749 of 761 broken internal links were
// the language switcher building cross-locale same-slug blog/guide URLs.)
const SLUG_DISJOINT_PREFIXES = ["blog/", "guides/"];

function indexRouteForDisjointDetail(route: string): string | null {
  for (const prefix of SLUG_DISJOINT_PREFIXES) {
    if (route.startsWith(prefix)) return prefix.slice(0, -1); // "blog/foo" → "blog"
  }
  return null;
}

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

  // Slug-disjoint detail routes (blog/<slug>, guides/<slug>): the same slug does
  // not exist in any other locale, so switch to the target locale's index page
  // (the index — "blog"/"guides" — is in LOCALIZED_ROUTES and ships everywhere,
  // with staged locales gated below).
  const disjointIndex = indexRouteForDisjointDetail(route);
  if (disjointIndex) {
    if (targetLocale === "en") return `/${disjointIndex}`;
    if (!localeHasRoute(targetLocale, disjointIndex)) return `/${targetLocale}`;
    return `/${targetLocale}/${disjointIndex}`;
  }

  if (!isLocalizedRoute(route)) {
    // Non-localized routes include locale-only pages (e.g. the TR-only
    // /tr/kabatas-bogaz-turu) that have NO English root equivalent. Emitting
    // /<route> for the EN target 404s, so fall back to the EN homepage.
    if (targetLocale === "en") return "/";
    // No locale version — send to locale homepage so the user stays in their language.
    return `/${targetLocale}`;
  }
  if (targetLocale === "en") return `/${route}`;
  // Staged locales (ru/zh) only ship a subset of LOCALIZED_ROUTES. Linking to a
  // route they don't have yet lands on a notFound() 404. Fall back to the locale
  // homepage so the user stays in their language instead of hitting a dead page.
  if (!localeHasRoute(targetLocale, route)) return `/${targetLocale}`;
  return `/${targetLocale}/${route}`;
}

interface Props {
  className?: string;
  compact?: boolean;
}

export default function LanguageSwitcher({ className = "", compact = false }: Props) {
  const pathname = usePathname() ?? "/";
  const t = getLanguageSwitcherStrings(detectChromeLocaleFromPathname(pathname));
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
        aria-label={t.changeLanguage}
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
