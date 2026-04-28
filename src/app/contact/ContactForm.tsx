"use client";

import { useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import { submitContactForm } from "@/app/actions/contact";
import { getStoredAttribution, trackContactSubmitSuccess } from "@/lib/analytics";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const pathname = usePathname() ?? "/contact";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    const result = await submitContactForm({
      name: data.get("name") as string,
      email: data.get("email") as string,
      subject: data.get("subject") as string,
      message: data.get("message") as string,
      honeypot: data.get("company") as string,
      attribution: getStoredAttribution() ?? undefined,
    });

    setLoading(false);

    if (result.success) {
      trackContactSubmitSuccess({
        customerEmail: (data.get("email") as string) || undefined,
        customerName: (data.get("name") as string) || undefined,
        pagePath: pathname,
        subject: (data.get("subject") as string) || "",
      });
      setSuccess(true);
      form.reset();
    } else {
      setError(result.error || "Something went wrong. Please try again.");
    }
  }

  if (success) {
    return (
      <div className="bg-white rounded-2xl p-6 md:p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
        </div>
        <h2 className="text-xl font-bold mb-2">Message Sent!</h2>
        <p className="text-[var(--text-muted)] mb-6">
          Thank you for reaching out. We&apos;ll get back to you within a few hours.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="text-[var(--brand-primary)] font-medium hover:underline"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8">
      <h2 className="text-xl font-bold mb-6">Send a Message</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div
          aria-hidden="true"
          className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
        >
          <label htmlFor="company-contact">Company</label>
          <input id="company-contact" type="text" name="company" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Name</label>
            <input
              type="text"
              name="name"
              required
              minLength={2}
              autoComplete="name"
              className="w-full px-4 py-2.5 rounded-xl border border-[var(--line)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20 focus:border-[var(--brand-primary)]"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Email</label>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              className="w-full px-4 py-2.5 rounded-xl border border-[var(--line)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20 focus:border-[var(--brand-primary)]"
              placeholder="your@email.com"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Subject</label>
          <input
            type="text"
            name="subject"
            required
            className="w-full px-4 py-2.5 rounded-xl border border-[var(--line)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20 focus:border-[var(--brand-primary)]"
            placeholder="Booking inquiry"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Message</label>
          <textarea
            name="message"
            rows={5}
            required
            minLength={10}
            className="w-full px-4 py-2.5 rounded-xl border border-[var(--line)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20 focus:border-[var(--brand-primary)] resize-none"
            placeholder="Tell us about your plans..."
          />
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-cta w-full !py-3 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Sending…" : "Send Message"}
        </button>
      </form>
    </div>
  );
}
