import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CoreBookingPlanner from "@/components/booking/CoreBookingPlanner";
import { ACTIVE_LOCALES, isActiveLocale, type SiteLocale } from "@/i18n/config";

export const revalidate = 3600;

export function generateStaticParams() {
  return ACTIVE_LOCALES.filter((l) => l !== "en").map((l) => ({ locale: l }));
}

const META: Record<string, { title: string; description: string }> = {
  tr: {
    title: "Boğaz Turu Rezervasyon Merkezi | Gün Batımı, Akşam Yemeği & Yat Kiralama",
    description:
      "İstanbul Boğaz turu rezervasyonu: gün batımı turu, akşam yemeği turu veya özel yat kiralama için tarih ve misafir sayısını seçin.",
  },
  de: {
    title: "Bosporus Kreuzfahrt Reservierungszentrum | Sunset, Dinner & Yacht-Charter",
    description:
      "Bosporus-Kreuzfahrt in Istanbul buchen: Sonnenuntergangs-Tour, Dinner-Kreuzfahrt oder Yacht-Charter — Datum und Personenzahl auswählen.",
  },
  fr: {
    title: "Centre de Réservation Croisière Bosphore | Coucher de Soleil, Dîner & Yacht",
    description:
      "Réservez une croisière sur le Bosphore à Istanbul : croisière coucher de soleil, dîner-croisière ou charter de yacht — choisissez la date et le nombre de personnes.",
  },
  nl: {
    title: "Bosporus Cruise Reserveringscentrum | Zonsondergang, Diner & Jachtcharter",
    description:
      "Boek een Bosporus-cruise in Istanbul: zonsondergangs-cruise, dinercruise of jachtcharter — selecteer datum en aantal personen.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const m = META[locale];
  if (!m) return {};
  return {
    title: m.title,
    description: m.description,
    robots: { index: false, follow: true },
  };
}

export default async function LocaleReservationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isActiveLocale(locale as SiteLocale) || locale === "en") notFound();
  if (!META[locale]) notFound();

  return (
    <main className="min-h-screen overflow-x-hidden bg-[var(--surface-alt)] pt-28 pb-32">
      <div className="mx-auto max-w-[84rem] px-4">
        <CoreBookingPlanner source="locale-reservation" />
      </div>
    </main>
  );
}
