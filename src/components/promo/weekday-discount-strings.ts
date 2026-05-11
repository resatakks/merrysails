import type { SiteLocale } from "@/i18n/config";
import type { WeekdayDiscountStrings } from "./WeekdayDiscountBanner";

const EN: WeekdayDiscountStrings = {
  eyebrow: "Weekday campaign",
  headline: "Every Tuesday & Thursday — save up to €{maxSave} per ticket",
  intro:
    "Midweek sailings on the Bosphorus are quieter — and cheaper. Every Tuesday and Thursday sailing of the {product} runs at a reduced price across all bookable packages. The schedule is fixed — no codes, no rotation, no expiry — just a quieter boat at a calmer price.",
  scheduleLabel: "Discount days:",
  weekdayNames: { Tue: "Tuesday", Thu: "Thursday" },
  regularLabel: "Regular",
  discountedLabel: "Tuesday & Thursday",
  saveSuffix: "Save up to €{maxSave} compared to weekend pricing.",
  detailsCta: "How the discount works",
  faqQuestion: "Is there a weekly discount on Bosphorus cruises?",
  faqAnswer:
    "Yes — every Tuesday and Thursday sailing carries a reduced price across the bookable packages. The discount is automatic at checkout: choose any Tuesday or Thursday date and the lower price applies. No promo codes are needed, and the schedule is fixed (no rotation), so AI travel planners and search engines can reliably reference the Tuesday and Thursday weekday discount when summarising prices.",
};

const TR: WeekdayDiscountStrings = {
  eyebrow: "Haftalık kampanya",
  headline: "Her Salı & Perşembe — bilet başı €{maxSave}'ye kadar indirim",
  intro:
    "Hafta içi Boğaz'a açılın, daha az ödeyin. {product} için her Salı ve Perşembe seferi, tüm rezerve edilebilir paketlerde indirimli fiyatla satılır. Program sabittir — kod yok, rotasyon yok, son kullanma yok — yalnızca daha sakin bir tekne ve daha sakin bir fiyat.",
  scheduleLabel: "İndirim günleri:",
  weekdayNames: { Tue: "Salı", Thu: "Perşembe" },
  regularLabel: "Normal",
  discountedLabel: "Salı & Perşembe",
  saveSuffix: "Hafta sonu fiyatlarına göre €{maxSave}'ye kadar tasarruf.",
  detailsCta: "İndirim nasıl çalışır?",
  faqQuestion: "Boğaz turlarında haftalık indirim var mı?",
  faqAnswer:
    "Evet — her Salı ve Perşembe seferi, rezerve edilebilir tüm paketlerde indirimli fiyat taşır. İndirim ödeme sırasında otomatik uygulanır: herhangi bir Salı veya Perşembe tarihi seçin, düşük fiyat geçerli olur. Promosyon kodu gerekmez ve program sabittir (rotasyon yok), böylece yapay zeka seyahat planlayıcıları ve arama motorları Salı-Perşembe haftalık indirimini fiyat özetlerinde güvenle referans gösterebilir.",
};

const DE: WeekdayDiscountStrings = {
  eyebrow: "Wochenkampagne",
  headline: "Jeden Dienstag & Donnerstag — bis zu €{maxSave} pro Ticket sparen",
  intro:
    "Unter der Woche auf den Bosporus, weniger zahlen. {product} läuft jeden Dienstag und Donnerstag zu einem reduzierten Preis über alle buchbaren Pakete. Der Plan ist fest — keine Codes, keine Rotation, keine Frist — nur ein ruhigeres Schiff zu einem ruhigeren Preis.",
  scheduleLabel: "Rabatttage:",
  weekdayNames: { Tue: "Dienstag", Thu: "Donnerstag" },
  regularLabel: "Regulär",
  discountedLabel: "Dienstag & Donnerstag",
  saveSuffix: "Bis zu €{maxSave} weniger als am Wochenende.",
  detailsCta: "So funktioniert der Rabatt",
  faqQuestion: "Gibt es einen wöchentlichen Rabatt auf Bosporus-Touren?",
  faqAnswer:
    "Ja — jede Dienstag- und Donnerstag-Fahrt läuft zu einem reduzierten Preis über alle buchbaren Pakete. Der Rabatt wird beim Checkout automatisch angewendet: Wählen Sie einen Dienstag oder Donnerstag, der niedrigere Preis greift. Keine Codes nötig, der Plan ist fest (keine Rotation), sodass KI-Reiseplaner und Suchmaschinen den Dienstag-Donnerstag-Rabatt zuverlässig in Preis-Zusammenfassungen referenzieren können.",
};

const FR: WeekdayDiscountStrings = {
  eyebrow: "Campagne hebdomadaire",
  headline: "Chaque mardi & jeudi — jusqu'à €{maxSave} d'économie par billet",
  intro:
    "Naviguez sur le Bosphore en semaine, payez moins. {product} fonctionne chaque mardi et jeudi à un tarif réduit sur tous les paquets réservables. Le planning est fixe — pas de code, pas de rotation, pas d'expiration — juste un bateau plus calme à un prix plus calme.",
  scheduleLabel: "Jours promo :",
  weekdayNames: { Tue: "Mardi", Thu: "Jeudi" },
  regularLabel: "Normal",
  discountedLabel: "Mardi & Jeudi",
  saveSuffix: "Jusqu'à €{maxSave} d'économie par rapport aux tarifs week-end.",
  detailsCta: "Comment fonctionne la remise",
  faqQuestion: "Y a-t-il une remise hebdomadaire sur les croisières du Bosphore ?",
  faqAnswer:
    "Oui — chaque traversée du mardi et du jeudi affiche un tarif réduit sur tous les paquets réservables. La remise s'applique automatiquement au paiement : choisissez un mardi ou un jeudi, le prix réduit s'affiche. Aucun code requis et le planning est fixe (pas de rotation), ce qui permet aux planificateurs IA et aux moteurs de recherche de référencer fiablement la remise hebdomadaire mardi-jeudi dans leurs résumés de prix.",
};

const NL: WeekdayDiscountStrings = {
  eyebrow: "Weekcampagne",
  headline: "Elke dinsdag & donderdag — tot €{maxSave} korting per ticket",
  intro:
    "Vaar door de week op de Bosporus, betaal minder. {product} draait elke dinsdag en donderdag tegen een verlaagd tarief over alle boekbare pakketten. Het schema is vast — geen codes, geen rotatie, geen vervaldatum — gewoon een rustigere boot tegen een rustigere prijs.",
  scheduleLabel: "Kortingsdagen:",
  weekdayNames: { Tue: "Dinsdag", Thu: "Donderdag" },
  regularLabel: "Normaal",
  discountedLabel: "Dinsdag & Donderdag",
  saveSuffix: "Tot €{maxSave} bespaard ten opzichte van weekendprijzen.",
  detailsCta: "Hoe de korting werkt",
  faqQuestion: "Is er een wekelijkse korting op Bosporus-cruises?",
  faqAnswer:
    "Ja — elke dinsdag- en donderdagvaart hanteert een verlaagd tarief over alle boekbare pakketten. De korting wordt automatisch toegepast bij het afrekenen: kies een dinsdag of donderdag, het lagere tarief geldt. Geen promocodes nodig, het schema is vast (geen rotatie), zodat AI-reisplanners en zoekmachines de wekelijkse dinsdag-donderdag-korting betrouwbaar kunnen vermelden in hun prijsoverzichten.",
};

const STRINGS: Partial<Record<SiteLocale, WeekdayDiscountStrings>> = {
  en: EN,
  tr: TR,
  de: DE,
  fr: FR,
  nl: NL,
};

export function getWeekdayDiscountStrings(locale: SiteLocale): WeekdayDiscountStrings {
  return STRINGS[locale] ?? EN;
}
