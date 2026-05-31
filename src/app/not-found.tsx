"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Anchor } from "lucide-react";
import {
  detectChromeLocaleFromPathname,
  getErrorPageStrings,
} from "@/i18n/chrome-strings";

// Note: metadata cannot be exported from a client component, so the static
// English defaults already declared in `[locale]/layout.tsx` / root layout
// govern the <title> for crawlers. The body copy below is what users see.

export default function NotFound() {
  const pathname = usePathname() ?? "/";
  const locale = detectChromeLocaleFromPathname(pathname);
  const t = getErrorPageStrings(locale);
  const homeHref = locale === "en" ? "/" : `/${locale}`;
  const compareHref =
    locale === "en" ? "/bosphorus-cruise" : `/${locale}/bosphorus-cruise`;

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4">
      <div className="text-center">
        <Anchor className="w-16 h-16 text-gold mx-auto mb-6" />
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">{t.notFoundCode}</h1>
        <h2 className="text-2xl text-white/80 mb-4">{t.notFoundTitle}</h2>
        <p className="text-white/50 max-w-md mx-auto mb-8">
          {t.notFoundDescription}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={homeHref}
            className="bg-gold hover:bg-gold-hover text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            {t.backToHome}
          </Link>
          <Link
            href={compareHref}
            className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            {t.compareCruises}
          </Link>
        </div>
      </div>
    </div>
  );
}
