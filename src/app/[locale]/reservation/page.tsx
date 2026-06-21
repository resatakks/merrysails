import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CoreBookingPlanner from "@/components/booking/CoreBookingPlanner";
import { ACTIVE_LOCALES, isActiveLocale, type SiteLocale } from "@/i18n/config";

export const revalidate = 3600;

export function generateStaticParams() {
  return ACTIVE_LOCALES.filter((l) => l !== "en").map((l) => ({ locale: l }));
}

const META: Record<string, { title: string; description: string; h1: string }> = {
  tr: {
    title: "Boğaz Turu Rezervasyon — Gün Batımı & Yat",
    description:
      "İstanbul Boğaz turu rezervasyonu: gün batımı turu, akşam yemeği turu veya özel yat kiralama için tarih ve misafir sayısını seçin.",
    h1: "İstanbul Boğaz Turu Rezervasyonu",
  },
  de: {
    title: "Bosporus Kreuzfahrt Reservierung Istanbul",
    description:
      "Bosporus-Kreuzfahrt in Istanbul buchen: Sonnenuntergangs-Tour, Dinner-Kreuzfahrt oder Yacht-Charter — Datum und Personenzahl auswählen.",
    h1: "Bosporus-Kreuzfahrt Reservierung Istanbul",
  },
  fr: {
    title: "Réservation Croisière Bosphore Istanbul",
    description:
      "Réservez une croisière sur le Bosphore à Istanbul : croisière coucher de soleil, dîner-croisière ou charter de yacht — choisissez la date et le nombre de personnes.",
    h1: "Réservation de croisière sur le Bosphore",
  },
  nl: {
    title: "Bosporus Cruise Reservering Istanbul",
    description:
      "Boek een Bosporus-cruise in Istanbul: zonsondergangs-cruise, dinercruise of jachtcharter — selecteer datum en aantal personen.",
    h1: "Bosporus-cruise reservering Istanbul",
  },
  ru: {
    title: "Бронирование круиза по Босфору в Стамбуле",
    description:
      "Забронируйте круиз по Босфору в Стамбуле: круиз на закате, ужин-круиз или аренда яхты — выберите дату и количество гостей.",
    h1: "Бронирование круиза по Босфору в Стамбуле",
  },
  zh: {
    title: "伊斯坦布尔博斯普鲁斯海峡游船预订",
    description:
      "预订伊斯坦布尔博斯普鲁斯海峡游船：日落游船、晚餐游船或私人游艇包船——选择日期和人数。",
    h1: "伊斯坦布尔博斯普鲁斯海峡游船预订",
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
  const m = META[locale];
  if (!m) notFound();

  return (
    <main className="min-h-screen overflow-x-hidden bg-[var(--surface-alt)] pt-28 pb-32">
      <div className="mx-auto max-w-[84rem] px-4">
        {/* SSR <h1> — CoreBookingPlanner is a client component with no h1, so
            Googlebot saw an h1-less page (lint S18). Localized per META; the EN
            root /reservation page renders its own h1, this mirrors it. */}
        <h1 className="sr-only">{m.h1}</h1>
        <CoreBookingPlanner source="locale-reservation" />
      </div>
    </main>
  );
}
