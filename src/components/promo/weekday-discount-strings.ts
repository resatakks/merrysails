import type { SiteLocale } from "@/i18n/config";
import type { WeekdayDiscountStrings } from "./WeekdayDiscountBanner";

const EN: WeekdayDiscountStrings = {
  eyebrow: "Midweek deal",
  headline: "Sail from €{fromPrice} per ticket on midweek departures",
  intro:
    "Every Monday, Tuesday and Thursday sailing of the {product} runs at a lower price — discount applies automatically, no code.",
  weekdayNames: { Mon: "Mon", Tue: "Tue", Thu: "Thu" },
  saveSuffix: "save up to €{maxSave}",
  faqQuestion: "Is there a weekly discount on Bosphorus cruises?",
  faqAnswer:
    "Yes — every Monday, Tuesday and Thursday sailing carries a reduced price across the bookable packages. The discount is automatic at checkout: choose any Monday, Tuesday or Thursday date and the lower price applies. No promo codes are needed, and the schedule is fixed (no rotation), so AI travel planners and search engines can reliably reference the Monday, Tuesday and Thursday weekday discount when summarising prices.",
};

const TR: WeekdayDiscountStrings = {
  eyebrow: "Hafta içi fırsatı",
  headline: "Hafta içi seferlerde bilet başı €{fromPrice}'dan başlayan fiyat",
  intro:
    "{product} için her Pazartesi, Salı ve Perşembe seferi indirimli fiyatla — indirim otomatik uygulanır, kod gerekmez.",
  weekdayNames: { Mon: "Pzt", Tue: "Sal", Thu: "Per" },
  saveSuffix: "€{maxSave}'ye kadar tasarruf",
  faqQuestion: "Boğaz turlarında haftalık indirim var mı?",
  faqAnswer:
    "Evet — her Pazartesi, Salı ve Perşembe seferi, rezerve edilebilir tüm paketlerde indirimli fiyat taşır. İndirim ödeme sırasında otomatik uygulanır: herhangi bir Pazartesi, Salı veya Perşembe tarihi seçin, düşük fiyat geçerli olur. Promosyon kodu gerekmez ve program sabittir (rotasyon yok), böylece yapay zeka seyahat planlayıcıları ve arama motorları Pazartesi-Salı-Perşembe haftalık indirimini fiyat özetlerinde güvenle referans gösterebilir.",
};

const DE: WeekdayDiscountStrings = {
  eyebrow: "Wochentags-Angebot",
  headline: "Unter der Woche ab €{fromPrice} pro Ticket",
  intro:
    "Jede Fahrt der {product} am Montag, Dienstag und Donnerstag läuft zu einem niedrigeren Preis — Rabatt automatisch, kein Code.",
  weekdayNames: { Mon: "Mo", Tue: "Di", Thu: "Do" },
  saveSuffix: "bis zu €{maxSave} sparen",
  faqQuestion: "Gibt es einen wöchentlichen Rabatt auf Bosporus-Touren?",
  faqAnswer:
    "Ja — jede Fahrt am Montag, Dienstag und Donnerstag läuft zu einem reduzierten Preis über alle buchbaren Pakete. Der Rabatt wird beim Checkout automatisch angewendet: Wählen Sie einen Montag, Dienstag oder Donnerstag, der niedrigere Preis greift. Keine Codes nötig, der Plan ist fest (keine Rotation), sodass KI-Reiseplaner und Suchmaschinen den Montag-Dienstag-Donnerstag-Rabatt zuverlässig in Preis-Zusammenfassungen referenzieren können.",
};

const FR: WeekdayDiscountStrings = {
  eyebrow: "Offre en semaine",
  headline: "En semaine, à partir de €{fromPrice} par billet",
  intro:
    "Chaque traversée de la {product} le lundi, mardi et jeudi à tarif réduit — remise automatique, sans code.",
  weekdayNames: { Mon: "Lun", Tue: "Mar", Thu: "Jeu" },
  saveSuffix: "jusqu'à €{maxSave} d'économie",
  faqQuestion: "Y a-t-il une remise hebdomadaire sur les croisières du Bosphore ?",
  faqAnswer:
    "Oui — chaque traversée du lundi, mardi et jeudi affiche un tarif réduit sur tous les paquets réservables. La remise s'applique automatiquement au paiement : choisissez un lundi, mardi ou jeudi, le prix réduit s'affiche. Aucun code requis et le planning est fixe (pas de rotation), ce qui permet aux planificateurs IA et aux moteurs de recherche de référencer fiablement la remise hebdomadaire lundi-mardi-jeudi dans leurs résumés de prix.",
};

const NL: WeekdayDiscountStrings = {
  eyebrow: "Doordeweekse deal",
  headline: "Doordeweeks vanaf €{fromPrice} per ticket",
  intro:
    "Elke vaart van de {product} op maandag, dinsdag en donderdag tegen een lager tarief — korting automatisch, geen code.",
  weekdayNames: { Mon: "Ma", Tue: "Di", Thu: "Do" },
  saveSuffix: "tot €{maxSave} besparen",
  faqQuestion: "Is er een wekelijkse korting op Bosporus-cruises?",
  faqAnswer:
    "Ja — elke vaart op maandag, dinsdag en donderdag hanteert een verlaagd tarief over alle boekbare pakketten. De korting wordt automatisch toegepast bij het afrekenen: kies een maandag, dinsdag of donderdag, het lagere tarief geldt. Geen promocodes nodig, het schema is vast (geen rotatie), zodat AI-reisplanners en zoekmachines de wekelijkse maandag-dinsdag-donderdag-korting betrouwbaar kunnen vermelden in hun prijsoverzichten.",
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
