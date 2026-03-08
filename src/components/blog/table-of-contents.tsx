"use client";

import { useState } from "react";
import { List, ChevronDown } from "lucide-react";

export function TableOfContents({ headings }: { headings: string[] }) {
  const [open, setOpen] = useState(false);

  if (!headings?.length) return null;

  return (
    <>
      {/* Mobile: collapsible */}
      <div className="lg:hidden my-6 rounded-xl bg-[var(--surface-alt)] p-4">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-between w-full text-sm font-semibold text-[var(--heading)]"
        >
          <span className="flex items-center gap-2">
            <List className="w-4 h-4" />
            Table of Contents
          </span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>
        {open && (
          <nav className="mt-3 space-y-1.5">
            {headings.map((h, i) => (
              <a
                key={i}
                href={`#section-${i}`}
                className="block text-sm text-[var(--text-muted)] hover:text-[var(--brand-primary)] transition-colors pl-4 border-l-2 border-transparent hover:border-[var(--brand-primary)]"
                onClick={() => setOpen(false)}
              >
                {h}
              </a>
            ))}
          </nav>
        )}
      </div>

      {/* Desktop: sticky sidebar */}
      <nav className="hidden lg:block sticky top-28 space-y-1.5">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-3">
          <List className="w-3.5 h-3.5" />
          Contents
        </p>
        {headings.map((h, i) => (
          <a
            key={i}
            href={`#section-${i}`}
            className="block text-sm text-[var(--text-muted)] hover:text-[var(--brand-primary)] transition-colors pl-3 border-l-2 border-transparent hover:border-[var(--brand-primary)] py-1"
          >
            {h}
          </a>
        ))}
      </nav>
    </>
  );
}
