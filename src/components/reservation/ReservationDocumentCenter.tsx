"use client";

import { useState } from "react";
import { Download, ExternalLink, FileText, Loader2 } from "lucide-react";

interface ReservationDocumentCenterProps {
  reservationId: string;
}

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
  // Clarity (7d, /reservation/[id]): 56 dead clicks + 4 rage clicks on "Open".
  // The old "Open" opened the PDF inside an in-page <iframe> modal, which most
  // mobile browsers (where reservation-detail links are opened from the
  // confirmation email / WhatsApp) render as a blank pane — so the button read
  // as broken and guests re-tapped. Both "Open" and "Download" are now plain
  // same-origin anchors that let the browser handle the PDF natively (new tab),
  // which is reliable on every device. The transient "preparing" spinner still
  // gives instant feedback while the on-demand PDF is generated.
  const [preparing, setPreparing] = useState<string | null>(null);
  const flagPreparing = (id: string) => {
    setPreparing(id);
    setTimeout(() => setPreparing((cur) => (cur === id ? null : cur)), 4000);
  };

  return (
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
            Open each PDF in a new browser tab, or download it directly to your
            device.
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {(["voucher", "invoice"] as const).map((docType) => {
              const previewHref = `/reservation/${reservationId}/${docType}/pdf`;
              const openKey = `${docType}-open`;
              const downloadKey = `${docType}-download`;
              return (
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
                    <a
                      href={previewHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => flagPreparing(openKey)}
                      aria-busy={preparing === openKey}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--brand-primary)] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(255,78,80,0.18)] transition-all hover:brightness-110"
                    >
                      {preparing === openKey ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Opening…
                        </>
                      ) : (
                        <>
                          <ExternalLink className="h-4 w-4" />
                          Open
                        </>
                      )}
                    </a>
                    <a
                      href={`${previewHref}?download=1`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => flagPreparing(downloadKey)}
                      aria-busy={preparing === downloadKey}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[var(--line)] px-4 py-2.5 text-sm font-semibold text-[var(--heading)] transition-colors hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]"
                    >
                      {preparing === downloadKey ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Preparing PDF…
                        </>
                      ) : (
                        <>
                          <Download className="h-4 w-4" />
                          Download PDF
                        </>
                      )}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
