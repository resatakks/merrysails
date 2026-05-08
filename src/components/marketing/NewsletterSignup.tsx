"use client";

import { useState, useRef } from "react";
import { CheckCircle } from "lucide-react";

interface Props {
  variant?: "footer" | "inline";
  source?: string;
}

export default function NewsletterSignup({ variant = "footer", source = "footer" }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const honeypotRef = useRef<HTMLInputElement>(null);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading" || status === "success") return;

    setStatus("loading");
    setErrorMsg("");

    const company = honeypotRef.current?.value ?? "";

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source, company }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMsg((data as { error?: string }).error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      try {
        if (typeof window !== "undefined" && typeof (window as unknown as Record<string, unknown>).gtag === "function") {
          (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", "generate_lead", {
            method: "newsletter",
            value: 5,
            currency: "EUR",
          });
        }
      } catch {
        // analytics failure is non-fatal
      }

      if (resetTimer.current) clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => {
        setStatus("idle");
        setEmail("");
      }, 5000);
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (variant === "footer") {
    return (
      <div className="mt-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--brand-gold)]">
          Newsletter
        </p>
        {status === "success" ? (
          <div className="flex items-center gap-2 text-sm text-green-400">
            <CheckCircle className="h-4 w-4 shrink-0" />
            Welcome aboard! Check your inbox to confirm.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            {/* honeypot */}
            <input
              ref={honeypotRef}
              name="company"
              type="text"
              tabIndex={-1}
              aria-hidden="true"
              autoComplete="off"
              className="hidden"
            />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 min-w-0 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder-white/40 focus:border-[var(--brand-gold)] focus:outline-none"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="shrink-0 rounded-lg bg-[var(--brand-gold)] px-3 py-2 text-xs font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {status === "loading" ? "..." : "Subscribe"}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="mt-1 text-xs text-red-400">{errorMsg}</p>
        )}
      </div>
    );
  }

  // inline variant
  return (
    <div className="rounded-2xl border border-[#D4A857]/30 bg-[#fffbf0] px-6 py-10 md:px-10">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="text-xl font-bold text-gray-900 md:text-2xl">
          Get insider Istanbul cruise tips + early-bird discounts
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">
          Receive 1 short email per month &mdash; boutique boat updates, sunset timing tips, and members-only fares. No spam, unsubscribe anytime.
        </p>

        {status === "success" ? (
          <div className="mt-6 flex items-center justify-center gap-2 text-base font-semibold text-green-700">
            <CheckCircle className="h-5 w-5 shrink-0" />
            Welcome aboard! Check your inbox to confirm.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
            {/* honeypot */}
            <input
              ref={honeypotRef}
              name="company"
              type="text"
              tabIndex={-1}
              aria-hidden="true"
              autoComplete="off"
              className="hidden"
            />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-[#D4A857] focus:outline-none"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="shrink-0 rounded-xl bg-[#D4A857] px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {status === "loading" ? "Subscribing..." : "Get insider tips"}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="mt-2 text-sm text-red-600">{errorMsg}</p>
        )}
      </div>
    </div>
  );
}
