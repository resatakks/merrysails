/**
 * Per-locale overrides for Tour content.
 *
 * Why this exists (2026-05-30 audit):
 *   /tr/cruises/bosphorus-sunset-cruise still rendered ~50% English content
 *   because tours.ts is single-locale (EN).  Locale pages share the same
 *   tour data → mixed-language pages → confused Yandex/Google language
 *   classifiers + bad UX for Turkish/German/French/Dutch/Russian visitors.
 *
 * Design:
 *   - Keep tours.ts as the single source of truth for EN + all
 *     structural data (prices, capacities, schedules, slugs).
 *   - This file contains PARTIAL overrides per locale.  Only fields that
 *     differ from EN need to be filled in — empty/missing locale falls
 *     back to EN automatically.
 *   - Translations are written by humans / Claude with native voice,
 *     NOT machine-translated.  Each locale block is reviewed for tone,
 *     terminology consistency (Boğaz Turu, Bosporus Kreuzfahrt, etc.),
 *     and SEO keyword match against KEYWORDS.md.
 *
 * Rollout order (impact-weighted from booking data):
 *   1. bosphorus-sunset-cruise — 11/17 May bookings = 65% of monthly volume
 *   2. bosphorus-dinner-cruise — 3 May bookings + €6,600/mo "boğaz turu"
 *   3. yacht-charter-in-istanbul — premium tier, low volume but high AOV
 *   4. remaining 18 tours — lower priority
 *
 * Each tour × locale is roughly 800-1,500 words of native content covering
 * longDescription, route, departurePoint, importantNotes, highlights,
 * includes, notIncluded.
 */

import type { Tour } from "@/data/tours";

/** Subset of Tour fields we localise — text fields that show up to users. */
export type LocalisedTourFields = Partial<
  Pick<
    Tour,
    | "name"
    | "description"
    | "longDescription"
    | "duration"
    | "capacity"
    | "route"
    | "departureTime"
    | "departurePoint"
    | "includes"
    | "notIncluded"
    | "highlights"
    | "importantNotes"
    | "bestFor"
    | "availability"
    | "enquiryLabel"
  >
>;

/** Locale code → tour-slug → localised fields. */
export type TourLocaleOverrides = Record<string, Record<string, LocalisedTourFields>>;

const overrides: TourLocaleOverrides = {
  tr: {
    "bosphorus-sunset-cruise": {
      name: "Boğaz Gün Batımı Turu",
      description:
        "İstanbul Boğaz gün batımı turu — Pazartesi, Salı ve Perşembe günleri €30'dan başlıyor (diğer günler €34). Karaköy iskelesinden 2 saatlik altın saat yelken keyfi, canlı rehber, hafif ikram. Şarapsız ve şaraplı iki seçenek var.",
      longDescription:
        "MerrySails'in paylaşımlı Boğaz gün batımı turu, akşam yemekli programa girmeden Boğaz'da altın saat keyfi yaşamak isteyen misafirler için tasarlandı. Karaköy iskelesinden — Galata Köprüsü'nün hemen kuzeyinden — 18:30 itibarıyla biniş başlar, yat 19:00'da yelken açar ve güney Boğaz hattında yaklaşık 2 saatlik bir rota izler.\n\nBoğaz, Avrupa ile Asya'yı birbirinden ayıran 31 kilometre uzunluğunda dar bir su yolu olup Karadeniz'i Marmara Denizi'ne bağlar. İstanbul iki yakaya da yayılmıştır ve Boğaz'ın güney kesimi — eski şehirden Rumeli Hisarı'na kadar — Türkiye'deki en yoğun Osmanlı dönemi sahil mirasını barındırır. Yat güvertesinden Dolmabahçe Sarayı (1856 yılında Sultan Abdülmecid I için yapılan son imparatorluk sarayı), Asya kıyısından yaklaşık 200 metre açıkta küçük adasıyla Kız Kulesi, ilk Boğaz Köprüsü'nün önündeki 1853 Barok cepheli Ortaköy Camii ve son olarak — Fatih Sultan Mehmed'in fethinden önce Boğaz'ı kontrol altına almak için dört ayda yaptırdığı 1452 yapımı Rumeli Hisarı geçilir. Yat burada dönüş yapar ve gökyüzü mavi saate geçerken güneye doğru ilerler.\n\nAynı rota üzerinde iki paket sunuyoruz. Şarapsız temel ücret €34 (Pazartesi, Salı ve Perşembe seferlerinde €30), Şaraplı paket €40 (aynı üç gün için €35). Hafta içi indirimi rezervasyon sırasında otomatik uygulanır — kupon kodu gerekmez ve yıl boyunca sabit kalır.\n\nGemideki ikram üç küçük kategoriye bölünmüştür. Sıcak içecekler: taze demlenmiş çay ve Türk kahvesi. Soğuk içecekler: ev yapımı buzlu çay, ev limonatası, mevsim meyve suyu ve şişe su. Atıştırmalık tabağında karışık kuruyemiş, tuzlu kraker ve mevsim meyve tabağı. Şaraplı paket alan misafirler iki bardak şarap ile karşılanır. Canlı İngilizce konuşan rehber, geçilen her önemli noktayı tarihçesiyle birlikte aktarır.\n\nMerrySails, 2001 yılından beri Boğaz'da 50.000'i aşkın misafir ağırlayan TURSAB A Grubu lisanslı Meryem Yıldız Travel çatısı altında faaliyet göstermektedir.",
      duration: "2 saat",
      capacity: "Paylaşımlı gün batımı yatı oturma düzeni",
      route:
        "Karaköy iskelesi (Galata Köprüsü kuzeyi) → Dolmabahçe & Ortaköy → İlk Boğaz Köprüsü → Rumeli Hisarı dönüşü → mavi saatte geri dönüş",
      departureTime: "19:00 (biniş 18:30'da başlar)",
      departurePoint:
        "Karaköy iskelesi — Galata Köprüsü'nün hemen kuzeyi. Tam buluşma yeri ve iskele numarası, rezervasyon sonrası WhatsApp ile gönderilir.",
      includes: [
        "2 saatlik paylaşımlı gün batımı yelkeni, lüks bir yatta",
        "Tüm rota boyunca canlı İngilizce rehber",
        "Sıcak içecekler — çay ve Türk kahvesi",
        "Soğuk içecekler — buzlu çay, limonata, meyve suyu ve şişe su",
        "Atıştırmalık tabağı — karışık kuruyemiş, kraker ve mevsim meyve tabağı",
        "Şaraplı paket: kişi başı 2 bardak şarap dahil",
      ],
      notIncluded: [
        "Seçilen gün batımı paketinin dışında ek şarap servisi",
        "Otel transferi (gün batımı turu için standart değildir)",
        "Akşam yemeği — gün batımı turu yemekli programa girmez",
      ],
      highlights: [
        "Kız Kulesi",
        "Dolmabahçe Sarayı",
        "Ortaköy Camii",
        "Rumeli Hisarı",
        "Boğaz Köprüsü",
      ],
      importantNotes: [
        "Paylaşımlı gün batımı turu hafta içi indirimiyle €30'dan başlar (Pazartesi, Salı ve Perşembe) — diğer günler €34. Şaraplı paket hafta içi €35, diğer günler €40.",
        "Paylaşımlı format küçük gruplu lüks yat üzerinde yapılır; günlük doluluk sefere göre değişir.",
        "Tam buluşma yeri ve saat, rezervasyon sonrası WhatsApp ile paylaşılır — genel iskele tabelalarını takip etmek yerine bu mesaja güvenin.",
      ],
      bestFor: [
        "Çiftler",
        "Çift dostları",
        "Fotoğraf tutkunları",
        "İlk kez İstanbul'a gelen ziyaretçiler",
      ],
      availability: "Tüm yıl",
      enquiryLabel: "WhatsApp ile sorgu yap",
    },
  },
  de: {
    "bosphorus-sunset-cruise": {
      name: "Bosporus-Sonnenuntergangsfahrt",
      description:
        "Bosporus-Sonnenuntergangsfahrt in Istanbul — Mo, Di & Do ab €30 (andere Tage €34). 2-stündige Golden-Hour-Fahrt ab Karaköy mit Live-Guide auf Englisch und leichter Verpflegung. Zwei Optionen: ohne Wein und mit Wein.",
      longDescription:
        "Die gemeinsame Bosporus-Sonnenuntergangsfahrt von MerrySails wurde für Gäste konzipiert, die das Golden-Hour-Erlebnis auf der Meerenge genießen möchten, ohne ein komplettes Abendessenprogramm zu absolvieren. Das Einsteigen beginnt gegen 18:30 Uhr an der Promenade von Karaköy — wenige Schritte nördlich der Galata-Brücke — und die Yacht legt um 19:00 Uhr für eine ca. 2-stündige Schleife entlang des südlichen Bosporus ab.\n\nDer Bosporus ist eine 31 Kilometer lange Meerenge, die Europa von Asien trennt und das Schwarze Meer mit dem Marmarameer verbindet. Istanbul erstreckt sich über beide Ufer, und der südliche Teil der Meerenge — von der Altstadt bis Rumeli Hisarı — birgt die dichteste Konzentration osmanischen Uferer­bes im Land. Vom Deck aus passieren Sie den Dolmabahçe Sarayı (1856 von Sultan Abdülmecid I. erbauter Residenzpalast), den Mädchenturm auf seiner kleinen Insel etwa 200 Meter vor der asiatischen Küste, die Barockfassade der Ortaköy Camii vor der ersten Bosporus-Brücke und schließlich Rumeli Hisarı — die 1452 von Mehmed II. in nur vier Monaten errichtete Festung zur Kontrolle der Meerenge vor der Eroberung Konstantinopels. Die Yacht wendet dort und kehrt zurück, während der Himmel in die blaue Stunde übergeht.\n\nWir bieten zwei Preisstufen auf derselben Route. Der Grundtarif ohne Wein beträgt €34 (Mo/Di/Do €30), mit Wein €40 (gleiche drei Wochentage €35). Der Wochenrabatt wird automatisch beim Checkout angewendet — kein Gutscheincode erforderlich.\n\nDie Bewirtung an Bord ist in drei Kategorien aufgeteilt. Heißgetränke: frisch gebrühter Tee und türkischer Kaffee. Kaltgetränke: Eistee, hausgemachte Limonade, saisonaler Fruchtsaft und Mineralwasser in Flaschen. Snackteller mit gemischten Nüssen, gesalzenen Crackern und einer frischen Obstplatte wird ab Einstieg serviert. Gäste mit Wein-Option erhalten zusätzlich zwei Gläser Wein pro Person. Ein englischsprachiger Live-Guide kommentiert jeden Wahrzeichen.\n\nMerrySails operiert unter Meryem Yıldız Travel — TURSAB-A-lizenziert seit 2001, mit über 50.000 Gästen auf dem Bosporus.",
      route:
        "Karaköy-Promenade (nördlich der Galata-Brücke) → Dolmabahçe & Ortaköy → Erste Bosporus-Brücke → Rumeli Hisarı Wendepunkt → Rückkehr zur blauen Stunde",
      departureTime: "19:00 (Einsteigen ab 18:30)",
      departurePoint:
        "Karaköy-Promenade unmittelbar nördlich der Galata-Brücke — der genaue Anlegeplatz wird nach der Buchung per WhatsApp bestätigt.",
    },
  },
};

/** Apply locale overrides to a tour. Empty fields fall back to EN. */
export function applyTourLocale(tour: Tour, locale: string | undefined): Tour {
  if (!locale || locale === "en") return tour;
  const localeBlock = overrides[locale];
  if (!localeBlock) return tour;
  const slugOverride = localeBlock[tour.slug];
  if (!slugOverride) return tour;
  // Spread tour first, then override — only filled-in fields replace EN.
  return { ...tour, ...slugOverride };
}
