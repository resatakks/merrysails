import Link from "next/link";
import type { Metadata } from "next";
import { ShieldCheck, Building2, FileBadge, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "TURSAB License 14316 | MerrySails Istanbul",
  description:
    "Verify the TURSAB A Group license behind MerrySails and Merry Tourism in Istanbul. License number 14316, office details, and operator identity.",
  alternates: { canonical: "https://merrysails.com/tursab" },
  openGraph: {
    title: "TURSAB License 14316 | MerrySails Istanbul",
    description:
      "Verify the TURSAB A Group license behind MerrySails and Merry Tourism in Istanbul.",
    url: "https://merrysails.com/tursab",
    type: "website",
    images: [{ url: "https://merrysails.com/og-image.jpg", width: 1200, height: 630 }],
  },
};

const facts = [
  { label: "License type", value: "TURSAB A Group Travel Agency License" },
  { label: "License number", value: "14316" },
  { label: "Agency title", value: "MERYEM YILDIZ TURIZM SEYAHAT ACENTASI" },
  {
    label: "Operating company",
    value: "MERRY TRAVEL TURIZM DANISMANLIK TIC. LTD. STI.",
  },
  {
    label: "Registered address",
    value:
      "Alemdar Mah. Divanyolu Cad. Ogul Han No:62/402, Fatih, Istanbul, Turkey",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://merrysails.com" },
    { "@type": "ListItem", position: 2, name: "TURSAB License", item: "https://merrysails.com/tursab" },
  ],
};

export default function TursabPage() {
  return (
    <main className="bg-[var(--surface-alt)] pt-28 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="container-main">
        <section className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-[var(--line)] bg-white shadow-sm">
          <div className="bg-gradient-to-br from-[#fff5f5] via-white to-[#fff7ed] px-6 py-8 md:px-10">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#c81e1e]">
                  TURSAB Verification
                </p>
                <h1 className="mt-3 text-3xl font-bold text-[var(--heading)] md:text-5xl">
                  MerrySails operates under a licensed Istanbul travel agency
                </h1>
                <p className="mt-4 text-base leading-relaxed text-[var(--body-text)]">
                  MerrySails is part of Merry Tourism and works under the
                  registered TURSAB A Group license held by Meryem Travel.
                  Guests can use this page as a trust reference when reviewing
                  our Bosphorus cruise and yacht services.
                </p>
              </div>

              <div className="rounded-[1.75rem] border border-[#fecaca] bg-white px-5 py-5 shadow-sm md:min-w-[260px]">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff1f2] text-[#c81e1e]">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#c81e1e]">
                      Belge No
                    </div>
                    <div className="mt-1 text-2xl font-bold text-[var(--heading)]">
                      14316
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 px-6 py-8 md:grid-cols-[1.1fr_0.9fr] md:px-10">
            <section className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface-alt)] p-6">
              <h2 className="text-lg font-bold text-[var(--heading)]">
                License Details
              </h2>
              <div className="mt-5 space-y-4">
                {facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="rounded-2xl border border-white bg-white px-4 py-4"
                  >
                    <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                      {fact.label}
                    </div>
                    <div className="mt-2 text-sm font-semibold leading-relaxed text-[var(--heading)]">
                      {fact.value}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <div className="rounded-[1.75rem] border border-[var(--line)] bg-white p-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--surface-alt)] text-[var(--brand-primary)]">
                    <FileBadge className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[var(--heading)]">
                      Why this matters
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--body-text)]">
                      A TURSAB-licensed operator gives guests a stronger trust
                      signal around legal travel-agency operations, clearer
                      commercial identity, and accountable guest support in
                      Istanbul.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-[var(--line)] bg-white p-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--surface-alt)] text-[var(--brand-primary)]">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[var(--heading)]">
                      Trading identity
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--body-text)]">
                      Brand name used online: <strong>MerrySails</strong>
                      <br />
                      Operating brand: <strong>Meryem Travel</strong>
                      <br />
                      Service division: <strong>Merry Tourism</strong>
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-[var(--line)] bg-white p-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--surface-alt)] text-[var(--brand-primary)]">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[var(--heading)]">
                      Istanbul office
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--body-text)]">
                      Alemdar Mah. Divanyolu Cad. Ogul Han No:62/402, Fatih,
                      Istanbul, Turkey
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-[var(--line)] bg-white p-6">
                <h2 className="text-lg font-bold text-[var(--heading)]">
                  Useful next steps
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[var(--body-text)]">
                  Use this page as a trust reference, then move back to the main
                  product or contact path that matches the booking intent.
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <Link
                    href="/about"
                    className="rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] px-4 py-3 text-sm font-semibold text-[var(--heading)] transition-colors hover:border-[var(--brand-primary)]/30 hover:bg-white"
                  >
                    About MerrySails
                  </Link>
                  <Link
                    href="/contact"
                    className="rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] px-4 py-3 text-sm font-semibold text-[var(--heading)] transition-colors hover:border-[var(--brand-primary)]/30 hover:bg-white"
                  >
                    Contact & reservations
                  </Link>
                  <Link
                    href="/bosphorus-cruise"
                    className="rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] px-4 py-3 text-sm font-semibold text-[var(--heading)] transition-colors hover:border-[var(--brand-primary)]/30 hover:bg-white"
                  >
                    Compare core cruise paths
                  </Link>
                  <Link
                    href="/yacht-charter-istanbul"
                    className="rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] px-4 py-3 text-sm font-semibold text-[var(--heading)] transition-colors hover:border-[var(--brand-primary)]/30 hover:bg-white"
                  >
                    Open yacht charter owner page
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
