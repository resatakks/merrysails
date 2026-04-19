"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  tourSlug: string;
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

export default function SocialProof({ tourSlug }: Props) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1);
    }, 30_000);
    return () => clearInterval(interval);
  }, []);

  const getValues = useCallback(() => {
    // Use tick as part of the salt so values drift over time
    const viewing = seededRand(tourSlug, 100 + tick, 3, 15);
    const spotsLeft = seededRand(tourSlug, 200 + Math.floor(tick / 2), 2, 8);
    const lastBooked = seededRand(tourSlug, 300 + Math.floor(tick / 3), 5, 45);
    return { viewing, spotsLeft, lastBooked };
  }, [tourSlug, tick]);

  const { viewing, spotsLeft, lastBooked } = getValues();

  const signals = [
    {
      key: "viewing",
      icon: "\uD83D\uDD25",
      text: `${viewing} people are viewing this right now`,
    },
    {
      key: "spots",
      icon: "\u26A1",
      text: `Only ${spotsLeft} spots left for tomorrow`,
    },
    {
      key: "booked",
      icon: "\u2705",
      text: `Last booked ${lastBooked} minutes ago`,
    },
  ];

  return (
    <div className="space-y-2 mb-4">
      <AnimatePresence mode="popLayout">
        {signals.map((signal, i) => (
          <motion.div
            key={`${signal.key}-${tick}`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="flex items-center gap-2 text-xs text-[var(--text-muted)]"
          >
            <span className="text-sm leading-none">{signal.icon}</span>
            <span>{signal.text}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
