import { type SiteLocale } from "@/i18n/config";
import {
  LOCALIZED_ROUTES,
  RU_ENABLED_ROUTES,
  ZH_ENABLED_ROUTES,
} from "@/i18n/localized-routes";
import { getLocalePostBySlug } from "@/data/blog/locale-posts";

// Staged locales only ship a subset of LOCALIZED_ROUTES (see localized-routes.ts).
// Linking them to a route they don't have yet lands on a notFound() 404 — the
// exact defect Screaming Frog/SEMrush flagged 2026-06-23 (e.g. an RU page linking
// to /ru/contact or /ru/blog, which have no RU page). This mirrors the gate the
// LanguageSwitcher already uses so every link-builder agrees.
const STAGED_LOCALE_ROUTES: Partial<Record<SiteLocale, Set<string>>> = {
  ru: RU_ENABLED_ROUTES,
  zh: ZH_ENABLED_ROUTES,
};

// True when `locale` actually ships the given route. `route` is the slug-less
// path with a leading slash ("/contact", "/blog"); "" / "/" = homepage.
// Non-staged locales (tr/de/fr/nl) ship every LOCALIZED_ROUTES path.
function localeShipsRoute(locale: SiteLocale, route: string): boolean {
  const normalized = route === "/" ? "" : route;
  const gate = STAGED_LOCALE_ROUTES[locale];
  if (gate) return gate.has(normalized);
  // tr/de/fr/nl: only routes in LOCALIZED_ROUTES exist as /<locale>/<path>.
  return LOCALIZED_ROUTES.has(normalized);
}

/**
 * Build a locale-aware internal href for an EN-root path (leading slash, no
 * locale prefix), guaranteeing the target page actually exists.
 *
 * - EN stays at the root.
 * - For a non-EN locale, returns `/<locale><path>` only when that locale ships
 *   the page; otherwise falls back to the locale homepage so the user stays in
 *   their language instead of hitting a 404 (matches LanguageSwitcher behavior).
 *
 * Pass the EN-root path: localeHref("ru", "/contact") → "/ru" (RU has no
 * contact page yet), localeHref("ru", "/bosphorus-cruise") → "/ru/bosphorus-cruise".
 */
export function localeHref(locale: SiteLocale, path: string): string {
  if (locale === "en") return path;
  // Path without query/hash for the gate check; re-append the suffix afterwards.
  const [routeOnly, ...rest] = path.split(/(?=[?#])/);
  const suffix = rest.join("");
  if (localeShipsRoute(locale, routeOnly)) {
    return `/${locale}${routeOnly}${suffix}`;
  }
  return `/${locale}`;
}

/**
 * Locale-aware href for a BLOG post. Blog content is locale-disjoint: a post
 * exists at `/<locale>/blog/<slug>` ONLY when a translated post for that locale
 * is registered (src/data/blog/posts/<locale>-product-posts.ts → locale-posts.ts,
 * which is also what the [locale]/blog/[slug] route + generateStaticParams use).
 * When no translation exists we fall back to the EN post at the root `/blog/<slug>`
 * instead of emitting a `/<locale>/blog/<slug>` link that 404s (the exact defect
 * Screaming Frog/SEMrush flagged 2026-06-23 — ~790 internal 404s from locale-
 * prefixed links to EN-only blog/guide slugs).
 */
export function localeBlogHref(locale: SiteLocale, slug: string): string {
  if (locale !== "en" && getLocalePostBySlug(locale, slug)) {
    return `/${locale}/blog/${slug}`;
  }
  return `/blog/${slug}`;
}

/**
 * Locale-aware href for a GUIDE. There is NO `/[locale]/guides/[slug]` route —
 * only the EN `/guides/[slug]` route + a localized `/[locale]/guides` index that
 * links out to the EN guides. So EVERY guide deep-link must point at the EN root
 * `/guides/<slug>`; a `/<locale>/guides/<slug>` link is always a 404. Keep this
 * the single emitter so a future "localize this CTA" edit can't reintroduce the
 * 404 wave.
 */
export function localeGuideHref(_locale: SiteLocale, slug: string): string {
  return `/guides/${slug}`;
}
