"use client";

/**
 * AISurveyAfterBooking
 * --------------------
 * 2026-06-12 — Post-booking 1-question survey to measure AI-assistant attribution.
 * Operator long-standing request (Aleyda Solis Layer-3 framework):
 *   "Did you encounter [brand] in an AI assistant before booking?"
 *
 * Behaviour:
 * - Auto-renders on the confirmation page (`/reservation/[id]`) once per
 *   reservation. LocalStorage flag `ms_ai_survey_v1` keyed by reservation id
 *   prevents double-fire on refresh or revisit.
 * - On choice → GA4 custom event `ai_discovery_survey` with `event_label` =
 *   choice. Also fires to `window.dataLayer` for GTM consumers.
 * - Opt-in only: a single "No thanks" dismiss closes it permanently for that
 *   reservation.
 * - Renders nothing on SSR (`mounted` gate) and nothing if already answered.
 *
 * Why this is useful: vanity citation counts (Otterly/Profound) are upstream
 * signal. This is downstream: did the user actually act on it? The survey
 * answer becomes the ground-truth AI-ROI KPI per Solis 2026 framework.
 */

import { useEffect, useState } from "react";

const STORAGE_PREFIX = "ms_ai_survey_v1::";

const CHOICES: Array<{ id: string; label: string }> = [
  { id: "chatgpt", label: "ChatGPT" },
  { id: "gemini", label: "Gemini" },
  { id: "claude", label: "Claude" },
  { id: "perplexity", label: "Perplexity" },
  { id: "no_other", label: "No / Other" },
];

interface DataLayerWindow extends Window {
  dataLayer?: Array<Record<string, unknown>>;
  gtag?: (...args: unknown[]) => void;
}

function emit(choiceId: string, reservationId: string) {
  if (typeof window === "undefined") return;
  const w = window as DataLayerWindow;
  const payload = {
    event: "ai_discovery_survey",
    event_category: "attribution",
    event_label: choiceId,
    reservation_id: reservationId,
  };
  try {
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push(payload);
  } catch {
    // dataLayer push failure is non-fatal
  }
  try {
    w.gtag?.("event", "ai_discovery_survey", {
      event_category: "attribution",
      event_label: choiceId,
      reservation_id: reservationId,
    });
  } catch {
    // gtag absent is non-fatal
  }
}

interface Props {
  reservationId: string;
}

export default function AISurveyAfterBooking({ reservationId }: Props) {
  const [mounted, setMounted] = useState(false);
  const [answered, setAnswered] = useState(false);

  const storageKey = `${STORAGE_PREFIX}${reservationId}`;

  useEffect(() => {
    setMounted(true);
    try {
      if (typeof window !== "undefined" && window.localStorage.getItem(storageKey)) {
        setAnswered(true);
      }
    } catch {
      // localStorage unavailable (private mode, SSR fallback) — show widget anyway
    }
  }, [storageKey]);

  if (!mounted || answered) return null;

  const handleChoice = (choiceId: string) => {
    emit(choiceId, reservationId);
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(storageKey, choiceId);
      }
    } catch {
      // ignore — event already fired
    }
    setAnswered(true);
  };

  const handleDismiss = () => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(storageKey, "dismissed");
      }
    } catch {
      // ignore
    }
    setAnswered(true);
  };

  return (
    <aside
      aria-label="AI discovery survey"
      className="mt-6 rounded-2xl border border-[var(--line)] bg-white px-5 py-4 shadow-sm sm:px-6 sm:py-5"
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-[var(--heading)] sm:text-[15px]">
          Optional: Did you discover us in an AI assistant before booking?
        </p>
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss survey"
          className="-mr-2 -mt-1 shrink-0 rounded-full p-1 text-xs text-[var(--text-muted)] transition hover:bg-zinc-50 hover:text-[var(--body-text)]"
        >
          ×
        </button>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {CHOICES.map((choice) => (
          <button
            key={choice.id}
            type="button"
            onClick={() => handleChoice(choice.id)}
            className="rounded-full border border-[var(--line)] bg-white px-4 py-1.5 text-sm font-medium text-[var(--body-text)] transition hover:border-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-white focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/40"
          >
            {choice.label}
          </button>
        ))}
      </div>
      <p className="mt-3 text-xs text-[var(--text-muted)]">
        One tap. Helps us understand how guests find MerrySails.
      </p>
    </aside>
  );
}
