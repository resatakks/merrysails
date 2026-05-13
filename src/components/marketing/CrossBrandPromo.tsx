"use client";

import { usePathname } from "next/navigation";

type Locale = "en" | "tr" | "de" | "fr" | "nl";

function detectLocale(pathname: string | null): Locale {
  if (!pathname) return "en";
  const seg = pathname.split("/").filter(Boolean)[0];
  if (seg === "tr" || seg === "de" || seg === "fr" || seg === "nl") return seg as Locale;
  return "en";
}

const copy: Record<Locale, { heading: string; body: string; cta: string }> = {
  en: {
    heading: "Getting to Istanbul? Book Your Airport Transfer",
    body: "Your Bosphorus cruise is best paired with a stress-free airport transfer. MerryTourism offers Mercedes Vito IST + SAW transfers with English-speaking chauffeurs.",
    cta: "See airport transfer rates",
  },
  tr: {
    heading: "Istanbul'a Geliyor musunuz? Havalimani Transferinizi Rezerve Edin",
    body: "Bogaz turunuz, konforlu bir havalimani transferiyle tamamlanir. MerryTourism, Ingilizce konusan soforlerle Mercedes Vito IST + SAW transferi sunmaktadir.",
    cta: "Transfer ucretlerini inceleyin",
  },
  de: {
    heading: "Auf dem Weg nach Istanbul? Flughafentransfer buchen",
    body: "Ihre Bosporus-Kreuzfahrt gelingt am besten mit einem stressfreien Flughafentransfer. MerryTourism bietet Mercedes-Vito-Transfers IST + SAW mit englischsprachigen Chauffeuren.",
    cta: "Transferpreise ansehen",
  },
  fr: {
    heading: "Vous arrivez a Istanbul? Reservez votre transfert aeroport",
    body: "Votre croisiere sur le Bosphore se combine parfaitement avec un transfert aeroport sans stress. MerryTourism propose des transferts Mercedes Vito IST + SAW avec chauffeurs anglophones.",
    cta: "Voir les tarifs de transfert",
  },
  nl: {
    heading: "Naar Istanbul? Boek uw luchthavenoverdracht",
    body: "Uw Bosporus-cruise is het best gecombineerd met een stressvrije luchthavenoverdracht. MerryTourism biedt Mercedes Vito IST + SAW-transfers met Engelstalige chauffeurs.",
    cta: "Bekijk transfertarieven",
  },
};

export default function CrossBrandPromo() {
  const pathname = usePathname();
  const locale = detectLocale(pathname);
  const t = copy[locale];

  return (
    <section className="py-12 bg-[#fffbf0] border-t border-[#D4A857]/20">
      <div className="mx-auto max-w-4xl px-4">
        <div className="rounded-2xl border border-[var(--brand-primary)]/15 bg-white p-6 md:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--brand-primary)]/10">
              <svg className="h-6 w-6 text-[var(--brand-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                {t.heading}
              </h2>
              <p className="text-sm leading-relaxed text-gray-600 mb-5 max-w-2xl">
                {t.body}
              </p>
              <a
                href="https://www.merrytourism.com/en/istanbul-airport-transfer"
                className="inline-flex items-center gap-2 bg-[var(--brand-primary)] text-white px-5 py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity text-sm"
                rel="noopener noreferrer"
              >
                {t.cta} &rarr; MerryTourism
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
