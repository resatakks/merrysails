"use client";

import { useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  tourSlug: string;
  locale?: string;
}

/** Simple deterministic hash from a string, returns a number. */
function hashSlug(slug: string, salt: number = 0): number {
  let h = 0x811c9dc5;
  const s = slug + String(salt);
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return Math.abs(h);
}

/** Returns a pseudo-random integer in [min, max] seeded by slug + salt. */
function seededRand(slug: string, salt: number, min: number, max: number): number {
  const h = hashSlug(slug, salt);
  return min + (h % (max - min + 1));
}

type Phrases = {
  viewing: (n: number) => string;
  spots: (n: number) => string;
  booked: (n: number) => string;
};

// Localized urgency/social-proof copy. Hardcoded English on locale pages was
// causing untranslated text + rage-clicks (Clarity, RU pages 2026-06-29).
const PHRASES: Record<string, Phrases> = {
  en: {
    viewing: (n) => `${n} people are viewing this right now`,
    spots: (n) => `Only ${n} spots left for tomorrow`,
    booked: (n) => `Last booked ${n} minutes ago`,
  },
  tr: {
    viewing: (n) => `${n} kişi şu anda bunu inceliyor`,
    spots: (n) => `Yarın için sadece ${n} yer kaldı`,
    booked: (n) => `Son rezervasyon ${n} dakika önce`,
  },
  de: {
    viewing: (n) => `${n} Personen sehen sich das gerade an`,
    spots: (n) => `Nur noch ${n} Plätze für morgen`,
    booked: (n) => `Zuletzt vor ${n} Minuten gebucht`,
  },
  fr: {
    viewing: (n) => `${n} personnes regardent ceci en ce moment`,
    spots: (n) => `Plus que ${n} places pour demain`,
    booked: (n) => `Dernière réservation il y a ${n} minutes`,
  },
  nl: {
    viewing: (n) => `${n} mensen bekijken dit nu`,
    spots: (n) => `Nog maar ${n} plekken voor morgen`,
    booked: (n) => `Laatst geboekt ${n} minuten geleden`,
  },
  ru: {
    viewing: (n) => `${n} человек смотрят это прямо сейчас`,
    spots: (n) => `Осталось всего ${n} мест на завтра`,
    booked: (n) => `Последнее бронирование ${n} мин. назад`,
  },
  zh: {
    viewing: (n) => `${n} 人正在浏览`,
    spots: (n) => `明天仅剩 ${n} 个名额`,
    booked: (n) => `最近预订于 ${n} 分钟前`,
  },
  ar: {
    viewing: (n) => `${n} أشخاص يشاهدون هذا الآن`,
    spots: (n) => `بقي ${n} مقاعد فقط للغد`,
    booked: (n) => `آخر حجز قبل ${n} دقيقة`,
  },
};

export default function SocialProof({ tourSlug, locale = "en" }: Props) {
  const variantSeed = hashSlug(`${tourSlug}:stable`);
  const t = PHRASES[locale] ?? PHRASES.en;

  const getValues = useCallback(() => {
    const viewing = seededRand(tourSlug, 100 + variantSeed, 3, 15);
    const spotsLeft = seededRand(tourSlug, 200 + variantSeed, 2, 8);
    const lastBooked = seededRand(tourSlug, 300 + variantSeed, 5, 45);
    return { viewing, spotsLeft, lastBooked };
  }, [tourSlug, variantSeed]);

  const { viewing, spotsLeft, lastBooked } = getValues();

  const signals = [
    { key: "viewing", icon: "🔥", text: t.viewing(viewing) },
    { key: "spots", icon: "⚡", text: t.spots(spotsLeft) },
    { key: "booked", icon: "✅", text: t.booked(lastBooked) },
  ];

  return (
    <div className="space-y-2 mb-4">
      <AnimatePresence mode="popLayout">
        {signals.map((signal, i) => (
          <motion.div
            key={`${signal.key}-${variantSeed}`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="flex items-center gap-2 rounded-xl bg-white/70 px-3 py-2 text-xs text-[var(--text-muted)] cursor-default select-none"
          >
            <span className="text-sm leading-none">{signal.icon}</span>
            <span>{signal.text}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
