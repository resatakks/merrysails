"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

function pushClarityTag(key: string, value: string) {
  try {
    if (typeof window.clarity === "function") {
      window.clarity("set", key, value.slice(0, 255));
      window.clarity("event", key);
    }
  } catch (_) {}
}

function pushDataLayer(payload: Record<string, unknown>) {
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
  } catch (_) {}
}

function reportToServer(payload: {
  type: "js_error" | "promise_rejection";
  message: string;
  source?: string;
}) {
  try {
    const body = JSON.stringify({
      ...payload,
      path: window.location.pathname + window.location.search,
      userAgent: navigator.userAgent,
      language: navigator.language,
    });

    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      navigator.sendBeacon("/api/client-error", blob);
      return;
    }

    fetch("/api/client-error", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch (_) {}
}

const MAX_REPORTS_PER_SESSION = 10;

export default function ErrorTracker() {
  const reportedKeys = useRef<Set<string>>(new Set());
  const reportCount = useRef(0);

  useEffect(() => {
    const shouldReport = (key: string) => {
      if (reportCount.current >= MAX_REPORTS_PER_SESSION) return false;
      if (reportedKeys.current.has(key)) return false;
      reportedKeys.current.add(key);
      reportCount.current += 1;
      return true;
    };

    // 2026-06-03 — Known-safe iOS WebKit DOM races. These fire during route
    // transitions / animation cleanups and never actually break the user
    // flow (the underlying node was simply unmounted before cleanup ran).
    // Preventing them avoids triggering outer React error boundaries which
    // would unmount the page on locales like ar/sa where iOS WebKit is
    // more aggressive about gc'ing detached nodes mid-transition.
    const KNOWN_SAFE_DOM_ERRORS = [
      /NotFoundError: The object can not be found here\.?/i,
      /ResizeObserver loop (?:limit exceeded|completed with undelivered notifications)/i,
      /The operation is insecure\.?/i, // private-window storage races
    ];

    const isKnownSafe = (msg: string) =>
      KNOWN_SAFE_DOM_ERRORS.some((re) => re.test(msg));

    const onError = (event: ErrorEvent) => {
      const message = String(event.message || "unknown");
      const source = `${event.filename || ""}:${event.lineno || ""}:${event.colno || ""}`;

      // Swallow known-safe DOM races so they don't break the page or
      // pollute Clarity / GA4. Still log once per session at info-level
      // so we know they fired (helps detect new regressions).
      if (isKnownSafe(message)) {
        event.preventDefault?.();
        if (typeof console !== "undefined" && shouldReport(`safe|${message}`)) {
          console.info("[ErrorTracker] suppressed known-safe DOM race:", message);
        }
        return;
      }

      const key = `error|${message}|${source}`;
      if (!shouldReport(key)) return;

      pushClarityTag("js_error", `${message} @ ${source}`);
      pushDataLayer({
        event: "js_error",
        error_message: message.slice(0, 500),
        error_source: source.slice(0, 500),
        page_path: window.location.pathname,
      });
      reportToServer({ type: "js_error", message, source });
    };

    const onRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      const message =
        reason instanceof Error
          ? `${reason.message}\n${(reason.stack || "").slice(0, 300)}`
          : String(reason ?? "unhandled rejection");

      // Same known-safe filter as onError — promise rejections from
      // fetch-after-unmount, abort signals, etc. shouldn't bubble.
      if (isKnownSafe(message) || /AbortError/i.test(message)) {
        event.preventDefault?.();
        return;
      }

      const key = `rejection|${message.slice(0, 200)}`;
      if (!shouldReport(key)) return;

      pushClarityTag("promise_rejection", message);
      pushDataLayer({
        event: "promise_rejection",
        error_message: message.slice(0, 500),
        page_path: window.location.pathname,
      });
      reportToServer({ type: "promise_rejection", message });
    };

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);

    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);

  return null;
}
