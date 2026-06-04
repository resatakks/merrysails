"use client";

import { Download, Eye } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface ReservationPdfPreviewProps {
  eyebrow: string;
  title: string;
  description: string;
  previewHref: string;
  downloadHref: string;
  /** Document type — e.g. "voucher", "invoice". Used as analytics label. */
  documentType?: "voucher" | "invoice" | "confirmation";
}

export function ReservationPdfPreview({
  eyebrow,
  title,
  description,
  previewHref,
  downloadHref,
  documentType = "confirmation",
}: ReservationPdfPreviewProps) {
  const handleEngagement = (action: "preview" | "download") => {
    try {
      trackEvent("reservation_pdf_engagement", {
        action,
        document_type: documentType,
        // Strip any reservation IDs from the href for privacy — only the
        // path stem is useful for analytics, not the per-customer token.
        path_stem: previewHref.split("?")[0].split("/").slice(-2, -1)[0] ?? null,
      });
    } catch {
      // Non-fatal; analytics never block UX.
    }
  };
  return (
    <section className="rounded-[2rem] border border-[var(--line)] bg-white p-5 shadow-sm print:hidden md:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="max-w-2xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--brand-primary)]">
            {eyebrow}
          </p>
          <h2 className="mt-2 text-2xl font-bold text-[var(--heading)]">
            {title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
            {description}
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
          <a
            href={previewHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleEngagement("preview")}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--brand-primary)] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(255,78,80,0.22)] transition-all hover:brightness-110"
          >
            <Eye className="h-4 w-4" />
            Open PDF
          </a>
          {/* 2026-06-04: Clarity logged 1 dead click on "Download PDF" from
              iOS user. Without the `download` attribute, iOS Safari/Chrome
              opens the PDF inline in the preview iframe instead of triggering
              the system share/download sheet. Adding both `download` and
              target="_self" so iOS honors Content-Disposition: attachment. */}
          <a
            href={downloadHref}
            download
            onClick={() => handleEngagement("download")}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--line)] px-5 py-3 text-sm font-semibold text-[var(--heading)] transition-colors hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </a>
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface-alt)]">
        <iframe
          src={previewHref}
          title={title}
          className="h-[68vh] min-h-[28rem] w-full bg-white"
          loading="lazy"
        />
      </div>

      <p className="mt-3 text-xs leading-relaxed text-[var(--text-muted)]">
        If the embedded preview does not load on your device, use the buttons
        above to open or download the original PDF directly.
      </p>
    </section>
  );
}
