"use client";

import { useState } from "react";
import { Download, ExternalLink, FileText, X } from "lucide-react";

interface ReservationDocumentCenterProps {
  reservationId: string;
}

type ActiveDocument = "voucher" | "invoice" | null;

const docConfig = {
  voucher: {
    label: "Travel Voucher",
    description: "Boarding-ready PDF with reservation details and guest information.",
  },
  invoice: {
    label: "Reservation Invoice",
    description: "Finance-ready PDF generated from the saved reservation details.",
  },
} as const;

export function ReservationDocumentCenter({
  reservationId,
}: ReservationDocumentCenterProps) {
  const [activeDocument, setActiveDocument] = useState<ActiveDocument>(null);

  const previewHref = activeDocument
    ? `/reservation/${reservationId}/${activeDocument}/pdf`
    : "";
  const downloadHref = activeDocument ? `${previewHref}?download=1` : "";

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-[var(--line)] p-5">
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-[var(--surface-alt)] p-2.5">
            <FileText className="h-4 w-4 text-[var(--brand-primary)]" />
          </div>
          <div className="w-full">
            <div className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
              Reservation Documents
            </div>
            <h2 className="mt-1 text-lg font-bold text-[var(--heading)]">
              Preview or download the original voucher and invoice PDFs
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
              Open the PDFs inside a focused modal, then switch to the browser
              viewer or download them directly if needed.
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {(["voucher", "invoice"] as const).map((docType) => (
                <div
                  key={docType}
                  className="rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] p-4"
                >
                  <div className="text-sm font-semibold text-[var(--heading)]">
                    {docConfig[docType].label}
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--text-muted)]">
                    {docConfig[docType].description}
                  </p>

                  <div className="mt-4 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveDocument(docType)}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--brand-primary)] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(255,78,80,0.18)] transition-all hover:brightness-110"
                    >
                      <FileText className="h-4 w-4" />
                      Open in modal
                    </button>
                    <a
                      href={`/reservation/${reservationId}/${docType}/pdf?download=1`}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[var(--line)] px-4 py-2.5 text-sm font-semibold text-[var(--heading)] transition-colors hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]"
                    >
                      <Download className="h-4 w-4" />
                      Download PDF
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {activeDocument ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <button
            type="button"
            onClick={() => setActiveDocument(null)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            aria-label="Close document preview"
          />

          <div className="relative z-[101] flex h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white shadow-2xl">
            <div className="flex items-center justify-between gap-4 border-b border-[var(--line)] px-5 py-4">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--brand-primary)]">
                  PDF Preview
                </div>
                <h3 className="mt-1 text-lg font-bold text-[var(--heading)]">
                  {docConfig[activeDocument].label}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={previewHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-[var(--line)] px-4 text-sm font-semibold text-[var(--heading)] transition-colors hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open
                </a>
                <a
                  href={downloadHref}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[var(--brand-primary)] px-4 text-sm font-semibold text-white transition-all hover:brightness-110"
                >
                  <Download className="h-4 w-4" />
                  Download
                </a>
                <button
                  type="button"
                  onClick={() => setActiveDocument(null)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface-alt)] text-[var(--heading)] transition-colors hover:bg-white"
                  aria-label="Close document preview"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <iframe
              src={previewHref}
              title={docConfig[activeDocument].label}
              className="h-full w-full bg-white"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
