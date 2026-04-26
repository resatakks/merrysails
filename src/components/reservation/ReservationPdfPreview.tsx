import { Download, Eye } from "lucide-react";

interface ReservationPdfPreviewProps {
  eyebrow: string;
  title: string;
  description: string;
  previewHref: string;
  downloadHref: string;
}

export function ReservationPdfPreview({
  eyebrow,
  title,
  description,
  previewHref,
  downloadHref,
}: ReservationPdfPreviewProps) {
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
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--brand-primary)] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(255,78,80,0.22)] transition-all hover:brightness-110"
          >
            <Eye className="h-4 w-4" />
            Open PDF
          </a>
          <a
            href={downloadHref}
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
