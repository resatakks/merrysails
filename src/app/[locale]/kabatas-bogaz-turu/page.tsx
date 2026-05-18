import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_URL, WHATSAPP_URL } from "@/lib/constants";
import { isActiveLocale, type SiteLocale } from "@/i18n/config";
import { buildHreflang } from "@/lib/hreflang";

export const revalidate = 3600;

// TR-only page — other locales → 404
export function generateStaticParams() {
  return [{ locale: "tr" }];
}

// ─── Types ────────────────────────────────────────────────────────────────────

type PriceRow = { name: string; price: string; duration: string; included: string };
type TourCard = { title: string; price: string; tag: string; desc: string };
type TransportItem = { mode: string; detail: string };
type WhyItem = { title: string; desc: string };
type Faq = { q: string; a: string };
type ScheduleRow = { season: string; sunsetTime: string; dinnerTime: string };

// ─── Content ──────────────────────────────────────────────────────────────────

const CANONICAL_PATH = "/tr/kabatas-bogaz-turu";
const CANONICAL_URL = `${SITE_URL}${CANONICAL_PATH}`;

const META_TITLE = "Kabataş Boğaz Turu — €30'dan Başlayan Fiyatlar";
const META_DESCRIPTION =
  "Kabataş İskelesi'nden boğaz turu €30'dan: gün batımı (Sal & Per), yemekli tur ve özel yat kiralama. TÜRSAB A Grubu lisanslı, 50.000+ misafir.";

const PRICE_ROWS: PriceRow[] = [
  { name: "Gün Batımı Turu — Şarapsız (Sal & Per)", price: "€30 / kişi", duration: "2 saat", included: "Rehber, ikram, köprü altı geçiş" },
  { name: "Gün Batımı Turu — Şarapsız (diğer günler)", price: "€34 / kişi", duration: "2 saat", included: "Rehber, ikram, köprü altı geçiş" },
  { name: "Gün Batımı Turu — Şaraplı (Sal & Per)", price: "€35 / kişi", duration: "2 saat", included: "Rehber, 1 bardak şarap, ikram" },
  { name: "Gün Batımı Turu — Şaraplı (diğer günler)", price: "€40 / kişi", duration: "2 saat", included: "Rehber, 1 bardak şarap, ikram" },
  { name: "Yemekli Boğaz Turu — Temel", price: "€30 / kişi", duration: "3,5 saat", included: "Akşam yemeği, müzik, Türk gecesi gösterisi" },
  { name: "Yemekli Boğaz Turu — Silver Alkollü", price: "€45 / kişi", duration: "3,5 saat", included: "Standart koltuk, yerel alkol, akşam yemeği, Türk gecesi" },
  { name: "Yemekli Boğaz Turu — Gold Alkolsüz", price: "€80 / kişi", duration: "3,5 saat", included: "VIP koltuk (sahne yakını), premium menü, alkolsüz" },
  { name: "Yemekli Boğaz Turu — Otel Transfer", price: "€90 / kişi", duration: "~5 saat", included: "Sultanahmet/Taksim transfer dahil" },
  { name: "Özel Yat Kiralama (2 saat)", price: "€280 / tekne", duration: "2 saat", included: "Tüm tekne size özel, 8 kişiye kadar" },
];

const TOUR_CARDS: TourCard[] = [
  {
    title: "Gün Batımı Boğaz Turu",
    price: "€30'dan",
    tag: "En çok tercih edilen",
    desc: "Kabataş'tan kalkan 2 saatlik gün batımı boğaz turu. Şarapsız €30 (Sal & Per) / €34, şaraplı €35 (Sal & Per) / €40. Boğaz köprüleri, Ortaköy Camii ve Dolmabahçe manzarası.",
  },
  {
    title: "Akşam Yemekli Boğaz Turu",
    price: "€30'dan",
    tag: "4 paket seçeneği",
    desc: "3,5 saatlik Boğaz deneyimi, Türk gecesi gösterisi ve akşam yemeği. Temel paketten Gold pakete 4 farklı seçenek. Sultanahmet/Taksim otel transfer mevcut.",
  },
  {
    title: "Özel Yat Kiralama",
    price: "€280'den",
    tag: "Tam özel deneyim",
    desc: "Tüm tekne size özel — evlilik teklifi, doğum günü, aile kutlaması veya kurumsal etkinlik için idealdir. Güzergah ve menüyü siz belirlersiniz.",
  },
];

const TRANSPORT_ITEMS: TransportItem[] = [
  { mode: "Metro M2", detail: "Taksim'den Kabataş'a — tek durak, 5 dakika" },
  { mode: "Füniküler F1", detail: "Taksim'den Kabataş'a — 3 dakika, 2 durak" },
  { mode: "Tramvay T1", detail: "Sultanahmet / Eminönü'nden Kabataş son durağa ~20 dk" },
  { mode: "Vapur", detail: "Üsküdar – Kabataş hattı: Anadolu yakasından 10 dakika" },
  { mode: "Otopark", detail: "Setüstü kapalı otopark — saatlik ücretli, 5 dk yürüyüş" },
];

const WHY_ITEMS: WhyItem[] = [
  {
    title: "Taksim'e 5 Dakika",
    desc: "Metro M2 veya füniküler F1 ile Taksim'den Kabataş'a sadece 5 dakika sürer. İstanbul'un en bağlantılı kalkış noktalarından biridir.",
  },
  {
    title: "Dolmabahçe Sarayı Önünde Kalkış",
    desc: "Kabataş İskelesi, Dolmabahçe Sarayı'nın hemen karşısında yer alır. Tekne kalkışı öncesinde sarayın görkemli cephesini görmek deneyimi tamamlar.",
  },
  {
    title: "Üsküdar'dan 10 Dakika",
    desc: "Üsküdar – Kabataş vapur hattıyla Anadolu yakasından gelen misafirler 10 dakikada Kabataş İskelesi'ne ulaşabilir.",
  },
  {
    title: "Araçsız Gidiş-Dönüş",
    desc: "Metro, tramvay, füniküler ve vapur ağının kesiştiği noktada yer alır. İstanbul trafiğiyle uğraşmadan, toplu taşımayla rahatça gidip gelebilirsiniz.",
  },
];

const SCHEDULE_ROWS: ScheduleRow[] = [
  { season: "Mayıs – Haziran", sunsetTime: "19:30", dinnerTime: "20:30" },
  { season: "Temmuz – Ağustos", sunsetTime: "19:45", dinnerTime: "20:30" },
  { season: "Eylül – Ekim", sunsetTime: "18:30", dinnerTime: "20:00" },
  { season: "Kasım – Şubat", sunsetTime: "16:30", dinnerTime: "20:00" },
];

const FAQS: Faq[] = [
  {
    q: "Kabataş'tan boğaz turu nereden kalkar?",
    a: "Turlar Kabataş İskelesi'nden hareket eder. İskele adresi: Setüstü Kabataş Mahallesi, Beyoğlu, İstanbul. Dolmabahçe Sarayı'nın hemen karşısında, tramvay T1 son durağındadır. Kalkıştan en az 20 dakika önce iskelede olmanızı öneririz.",
  },
  {
    q: "Kabataş boğaz turu fiyatları ne kadar?",
    a: "Gün batımı turu €30'dan başlar (Salı & Perşembe, şarapsız); diğer günler €34. Şaraplı seçenek Sal & Per €35, diğer günler €40. Yemekli boğaz turu €30'dan (Temel paket), Silver Alkollü €45, Gold Alkolsüz €80, otel transfer dahil paket €90. Özel yat kiralama tekne başına €280'den (8 kişiye kadar).",
  },
  {
    q: "Kabataş'a Taksim'den nasıl gelinir?",
    a: "İki kolay seçenek: (1) Metro M2 ile Taksim'den Kabataş'a tek durak, yaklaşık 5 dakika. (2) Füniküler F1 ile Taksim'den Kabataş'a 3 dakika. Her ikisi de sık sefer yapar ve İstanbulkart ile kullanılabilir.",
  },
  {
    q: "Kabataş iskelesinde otopark var mı?",
    a: "Evet, Setüstü Kapalı Otopark iskeleden yaklaşık 5 dakika yürüme mesafesindedir. Saatlik ücretli çalışır. Akşam kalkışlı turlarda otoparkta süre uzayabileceğinden, özellikle yoğun sezonlarda toplu taşımayı tercih etmenizi öneririz.",
  },
  {
    q: "Üsküdar'dan Kabataş'a nasıl gelinir?",
    a: "Şehir Hatları Üsküdar – Kabataş vapur hattıyla yaklaşık 10 dakikada Kabataş İskelesi'ne ulaşabilirsiniz. Vapur seferleri 06:30 – 23:00 arasında 15–20 dakika aralıklarla işler. İstanbulkart ile geçiş yapılabilir.",
  },
  {
    q: "Kabataş'tan kaçta kalkış var?",
    a: "Gün batımı turları: Mayıs–Haziran 19:30, Temmuz–Ağustos 19:45, Eylül–Ekim 18:30, Kasım–Şubat 16:30 civarında kalkar. Yemekli turlar genellikle 20:30'da hareket eder. Kesin saat rezervasyon onayınızda belirtilir.",
  },
  {
    q: "Kabataş kalkışlı turlarda otel transfer var mı?",
    a: "Evet, yemekli boğaz turu otel transfer paketi (€90) ile Sultanahmet ve Taksim bölgesindeki seçili otellerden alım yapılmaktadır. Kabataş çevresinde konaklıyorsanız yürüyerek veya toplu taşımayla da kolayca ulaşabilirsiniz.",
  },
  {
    q: "Kabataş'tan özel yat kiralama yapılır mı?",
    a: "Evet. Özel yat kiralama turları Kabataş İskelesi'nden kalkış seçeneğiyle sunulmaktadır. Tekne başına €280'den başlayan fiyatlarla tüm tekneyi kiralayabilirsiniz. Evlilik teklifi, doğum günü ve kurumsal etkinlikler için özel paketler mevcuttur.",
  },
];

// ─── generateMetadata ─────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isActiveLocale(locale as SiteLocale) || locale !== "tr") notFound();

  const languages = buildHreflang("/kabatas-bogaz-turu");

  return {
    title: META_TITLE,
    description: META_DESCRIPTION,
    alternates: {
      canonical: CANONICAL_URL,
      languages: languages ?? {
        tr: CANONICAL_URL,
      },
    },
    openGraph: {
      title: META_TITLE,
      description: META_DESCRIPTION,
      url: CANONICAL_URL,
      type: "website",
      locale: "tr_TR",
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: META_TITLE,
      description: META_DESCRIPTION,
      images: [`${SITE_URL}/og-image.jpg`],
    },
  };
}

// ─── Page Component ───────────────────────────────────────────────────────────

export default async function KabatasBagazTuruPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isActiveLocale(locale as SiteLocale) || locale !== "tr") notFound();

  // ── Schemas ────────────────────────────────────────────────────────────────

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": ["TouristTrip", "Service"],
    "@id": `${CANONICAL_URL}#tour`,
    name: "Kabataş Boğaz Turu — Kabataş İskelesi'nden Kalkışlı Boğaz Turları",
    description: META_DESCRIPTION,
    url: CANONICAL_URL,
    image: `${SITE_URL}/og-image.jpg`,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "City", name: "Istanbul" },
    touristType: "Cultural Tourism",
    offers: {
      "@type": "AggregateOffer",
      lowPrice: 30,
      highPrice: 280,
      priceCurrency: "EUR",
      offerCount: 9,
      availability: "https://schema.org/InStock",
    },
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${CANONICAL_URL}#product`,
    name: "Kabataş Boğaz Turu",
    description: META_DESCRIPTION,
    image: `${SITE_URL}/og-image.jpg`,
    brand: { "@type": "Brand", name: "MerrySails" },
    sku: "merrysails-kabatas-bogaz-turu-tr",
    category: "Kabataş Pier Bosphorus Tour",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "487",
      bestRating: 5,
      worstRating: 1,
    },
    offers: {
      "@type": "Offer",
      price: "30",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      seller: { "@id": `${SITE_URL}/#organization` },
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: `${SITE_URL}/tr` },
      { "@type": "ListItem", position: 2, name: "Boğaz Turu", item: `${SITE_URL}/tr/bosphorus-cruise` },
      { "@type": "ListItem", position: 3, name: "Kabataş Boğaz Turu", item: CANONICAL_URL },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="pt-28 pb-20 bg-[var(--surface-alt)]">
        <div className="container-main">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6">
            <Link href="/tr" className="hover:text-[var(--brand-primary)]">Ana Sayfa</Link>
            <span>/</span>
            <Link href="/tr/bosphorus-cruise" className="hover:text-[var(--brand-primary)]">Boğaz Turu</Link>
            <span>/</span>
            <span className="text-[var(--heading)] truncate">Kabataş Boğaz Turu</span>
          </nav>

          {/* Hero */}
          <section className="mb-10">
            <p className="inline-flex rounded-full bg-[var(--brand-primary)]/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[var(--brand-primary)] mb-4">
              MerrySails İstanbul — Kabataş İskelesi
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-[var(--heading)] mb-3 leading-tight">
              Kabataş Boğaz Turu — Kabataş İskelesi&apos;nden Kalkışlı Boğaz Turları
            </h1>
            <p className="text-lg font-medium text-[var(--brand-primary)] mb-4">
              €30&apos;dan başlayan fiyatlar · Dolmabahçe Sarayı önünden kalkış
            </p>
            <div className="text-base md:text-lg text-[var(--text-muted)] leading-relaxed mb-5 max-w-3xl space-y-4">
              <p>
                Kabataş boğaz turu, İstanbul&apos;un Avrupa yakasında, Dolmabahçe Sarayı&apos;nın hemen karşısındaki Kabataş İskelesi&apos;nden hareket eder. Metro M2 ve füniküler F1 ile Taksim&apos;den sadece 5 dakika, tramvay T1 ile Sultanahmet&apos;ten yaklaşık 20 dakika uzaklıkta olan bu iskele, İstanbul&apos;daki Boğaz turlarının en kolay ulaşılan kalkış noktalarından biridir.
              </p>
              <p>
                MerrySails olarak Kabataş İskelesi&apos;nden üç farklı tur seçeneği sunuyoruz: 2 saatlik gün batımı boğaz turu (€30&apos;dan, Salı &amp; Perşembe), Türk gecesi gösterili 3,5 saatlik yemekli boğaz turu (€30&apos;dan) ve tüm teknenin size özel olduğu özel yat kiralama (€280&apos;den, tekne başına). TÜRSAB A Grubu lisanslı Merry Tourism bünyesinde 2001&apos;den bu yana 50.000&apos;den fazla misafir ağırladık.
              </p>
              <p>
                Kabataş&apos;tan kalkan turlarımızda tekne Dolmabahçe önünden ayrılır ayrılmaz Çırağan Sarayı, Ortaköy Camii ve Boğaz köprülerinin silueti görünür hale gelir. Rezervasyonlarınız kalkıştan 48 saat öncesine kadar ücretsiz olarak iptal edilebilir.
              </p>
            </div>
            <p className="text-sm font-medium text-[var(--heading)] mb-6">
              TÜRSAB A Grubu Lisanslı Merry Tourism · 2001&apos;den Bu Yana · 50.000+ Misafir
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/tr/reservation"
                className="inline-flex items-center justify-center rounded-xl bg-[var(--brand-primary)] px-6 py-3 font-semibold text-white transition-colors hover:opacity-90"
              >
                Rezervasyon Yap
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-[var(--brand-primary)] px-6 py-3 font-semibold text-[var(--brand-primary)] transition-colors hover:bg-[var(--brand-primary)]/5"
              >
                WhatsApp ile Yazın
              </a>
            </div>
          </section>

          {/* Key Facts */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { icon: "📍", label: "Kalkış", value: "Kabataş İskelesi" },
              { icon: "💶", label: "Fiyat", value: "€30'dan itibaren" },
              { icon: "⏱", label: "Süre", value: "2 – 3,5 saat" },
              { icon: "🛡", label: "Lisans", value: "TÜRSAB A Grubu" },
            ].map((fact) => (
              <div key={fact.label} className="rounded-2xl border border-[var(--line)] bg-white p-4 text-center">
                <span className="text-2xl mb-2 block">{fact.icon}</span>
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)] mb-1">{fact.label}</p>
                <p className="font-bold text-[var(--heading)] text-sm">{fact.value}</p>
              </div>
            ))}
          </div>

          {/* Departure Location */}
          <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-[var(--heading)] mb-4">
              Kabataş İskelesi — Kalkış Noktası Bilgisi
            </h2>
            <div className="space-y-4 text-sm md:text-base leading-relaxed text-[var(--text-muted)]">
              <p>
                Kabataş İskelesi, Setüstü Kabataş Mahallesi, Beyoğlu, İstanbul adresinde, Dolmabahçe Sarayı&apos;nın tam karşısında yer alır. Boğaz ile İstanbul&apos;un Avrupa yakası ana ulaşım güzergahlarının kesiştiği bu stratejik nokta, tekne turları için son derece avantajlı bir kalkış konumudur.
              </p>
              <p>
                İskeleye ulaşım son derece kolaydır: Tramvay T1 hattının son durağı olan Kabataş&apos;a Sultanahmet veya Eminönü&apos;nden yaklaşık 20 dakikada ulaşılır. Metro M2 ile Taksim İstasyonu&apos;ndan tek durakta, sadece 5 dakikada gelinebilir. Füniküler F1 (Tünel) de Taksim ile Kabataş&apos;ı doğrudan birbirine bağlar.
              </p>
              <p>
                Üsküdar veya Kadıköy gibi Anadolu yakasından gelenler için Şehir Hatları vapuruyla Üsküdar – Kabataş arası yaklaşık 10 dakika sürmektedir. Vapur seferleri 06:30 – 23:00 arasında düzenli aralıklarla işler. Araçlı gelenler Setüstü Kapalı Otopark&apos;ı (saatlik ücretli) kullanabilir.
              </p>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {TRANSPORT_ITEMS.map((item) => (
                <div key={item.mode} className="flex items-start gap-3 rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-3">
                  <span className="text-[var(--brand-primary)] font-bold text-sm shrink-0">{item.mode}</span>
                  <span className="text-sm text-[var(--text-muted)]">{item.detail}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Tour Options */}
          <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-[var(--heading)] mb-6">
              Kabataş&apos;tan Kalkan Tur Seçenekleri
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {TOUR_CARDS.map((card) => (
                <div key={card.title} className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-[var(--brand-primary)] mb-2">{card.tag}</p>
                  <p className="font-bold text-[var(--heading)] text-base mb-1">{card.title}</p>
                  <p className="text-2xl font-bold text-[var(--brand-primary)] mb-3">{card.price}</p>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-[var(--text-muted)] mt-5">
              Tüm paket detayları ve güncel fiyatlar için{" "}
              <Link href="/tr/bosphorus-cruise" className="text-[var(--brand-primary)] underline hover:opacity-80">
                Boğaz Turu ana sayfamızı
              </Link>{" "}
              ziyaret edin.
            </p>
          </section>

          {/* Price Table */}
          <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-[var(--heading)] mb-6">
              Kabataş Boğaz Turu Fiyatları 2026
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--line)]">
                    {["Tur", "Fiyat", "Süre", "Dahil Olanlar"].map((col) => (
                      <th key={col} className="pb-3 text-left font-semibold text-[var(--heading)] pr-4 last:pr-0">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PRICE_ROWS.map((row, idx) => (
                    <tr
                      key={row.name}
                      className={`border-b border-[var(--line)] last:border-0 ${idx % 2 === 0 ? "" : "bg-[var(--surface-alt)]"}`}
                    >
                      <td className="py-3 pr-4 font-medium text-[var(--heading)]">{row.name}</td>
                      <td className="py-3 pr-4 font-bold text-[var(--brand-primary)] whitespace-nowrap">{row.price}</td>
                      <td className="py-3 pr-4 text-[var(--text-muted)] whitespace-nowrap">{row.duration}</td>
                      <td className="py-3 text-[var(--text-muted)]">{row.included}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Schedule */}
          <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-[var(--heading)] mb-4">
              Kabataş Kalkış Saatleri — Sezon Takvimi 2026
            </h2>
            <p className="text-sm md:text-base text-[var(--text-muted)] mb-5 leading-relaxed">
              Kalkış saatleri güneşin batış vaktine ve sezona göre dinamik olarak güncellenir. Aşağıdaki tablo tipik kalkış aralıklarını özetler. Kesin rezervasyon saatiniz onay e-postanızda ve WhatsApp bildiriminizde yer alır. Kalkıştan en az 20 dakika önce iskelede olmanızı öneririz.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--line)]">
                    {["Sezon", "Gün Batımı Turu Kalkışı", "Akşam Yemeği Turu Kalkışı"].map((col) => (
                      <th key={col} className="pb-3 text-left font-semibold text-[var(--heading)] pr-4 last:pr-0">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SCHEDULE_ROWS.map((row, idx) => (
                    <tr
                      key={row.season}
                      className={`border-b border-[var(--line)] last:border-0 ${idx % 2 === 0 ? "" : "bg-[var(--surface-alt)]"}`}
                    >
                      <td className="py-3 pr-4 font-medium text-[var(--heading)]">{row.season}</td>
                      <td className="py-3 pr-4 text-[var(--text-muted)]">{row.sunsetTime}</td>
                      <td className="py-3 text-[var(--text-muted)]">{row.dinnerTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-3">
              Özel yat kiralama için saat tamamen size özeldir; gündüz, gün batımı veya gece kalkış mümkündür.
            </p>
          </section>

          {/* Why Kabataş */}
          <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-[var(--heading)] mb-5">
              Neden Kabataş Kalkışlı Tur Tercih Edilir?
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {WHY_ITEMS.map((item) => (
                <div key={item.title} className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4">
                  <p className="font-semibold text-[var(--heading)] mb-1 flex items-center gap-2">
                    <span className="text-[var(--brand-primary)]">✓</span>
                    {item.title}
                  </p>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* How to get here from nearby areas */}
          <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-[var(--heading)] mb-4">
              Kabataş Yakın Bölgelerden Nasıl Gelinir?
            </h2>
            <div className="space-y-4 text-sm md:text-base leading-relaxed text-[var(--text-muted)]">
              <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4">
                <p className="font-semibold text-[var(--heading)] mb-1">Taksim&apos;den</p>
                <p>
                  Metro M2 ile Taksim İstasyonu&apos;ndan Kabataş&apos;a tek durak, 5 dakika. Alternatif olarak Füniküler F1 (Tünel) ile 3 dakikada Kabataş&apos;a ulaşılır. Her iki hat da sık sefer yapar, İstanbulkart kabul eder.
                </p>
              </div>
              <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4">
                <p className="font-semibold text-[var(--heading)] mb-1">Sultanahmet&apos;ten</p>
                <p>
                  Tramvay T1 hattıyla Sultanahmet durağından Kabataş son durağına yaklaşık 12 dakika. Kapalıçarşı veya Eminönü&apos;nden binerek de ulaşabilirsiniz; Kabataş T1&apos;in son durağıdır.
                </p>
              </div>
              <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4">
                <p className="font-semibold text-[var(--heading)] mb-1">Üsküdar&apos;dan</p>
                <p>
                  Şehir Hatları vapuruyla Üsküdar – Kabataş hattı yaklaşık 10 dakika sürer. Vapur seferleri 06:30 – 23:00 arasında 15–20 dakikada bir hareket eder. Anadolu yakasından gelenler için en pratik ve keyifli seçenektir.
                </p>
              </div>
              <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4">
                <p className="font-semibold text-[var(--heading)] mb-1">Beşiktaş&apos;tan</p>
                <p>
                  Beşiktaş&apos;tan Kabataş&apos;a yaklaşık 1 km yürüyüş (10–12 dakika) veya minibüs ile 5 dakikada ulaşılır. Beşiktaş–Kabataş arasını sahil yürüyüşü olarak da tercih edebilirsiniz.
                </p>
              </div>
            </div>
          </section>

          {/* Related tours links */}
          <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-xl font-bold text-[var(--heading)] mb-4">İlgili Turlar</h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                { href: "/tr/bosphorus-cruise", title: "Boğaz Turu İstanbul", desc: "Tüm boğaz turu seçenekleri ve fiyatları" },
                { href: "/tr/istanbul-dinner-cruise", title: "Akşam Yemeği Turu", desc: "Türk gecesi gösterili yemekli boğaz turu" },
                { href: "/tr/cruises/bosphorus-sunset-cruise", title: "Gün Batımı Turu", desc: "2 saatlik altın saat Boğaz deneyimi" },
                { href: "/tr/yacht-charter-istanbul", title: "Özel Yat Kiralama", desc: "Tüm tekne sizin grubunuza özel" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4 transition-colors hover:border-[var(--brand-primary)]/30 hover:bg-white"
                >
                  <p className="font-semibold text-[var(--heading)] mb-1">{link.title}</p>
                  <p className="text-sm text-[var(--text-muted)]">{link.desc}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-[var(--heading)] mb-5">Sık Sorulan Sorular</h2>
            <div className="space-y-3">
              {FAQS.map((faq) => (
                <details
                  key={faq.q}
                  className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4 group"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[var(--heading)]">
                    {faq.q}
                    <span className="text-[var(--text-muted)] transition-transform group-open:rotate-180 shrink-0">▼</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="rounded-2xl bg-[var(--brand-primary)] p-8 md:p-10 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Kabataş Boğaz Turu Rezervasyonu
            </h2>
            <p className="text-white/80 mb-6 text-sm md:text-base">
              Tarih ve kişi sayısını belirtin, anında yanıt alalım. 48 saat öncesine kadar ücretsiz iptal.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/tr/reservation"
                className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-3 font-semibold text-[var(--brand-primary)] hover:bg-gray-50 transition-colors"
              >
                Online Rezervasyon →
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-white/50 px-8 py-3 font-semibold text-white hover:bg-white/10 transition-colors"
              >
                WhatsApp ile Yazın
              </a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
