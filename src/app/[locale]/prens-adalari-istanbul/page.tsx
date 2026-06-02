import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Anchor, Ship, MapPin, Clock, Users, Trees } from "lucide-react";
import { SITE_URL, TURSAB_LICENSE_NUMBER, WHATSAPP_URL } from "@/lib/constants";
import { buildHreflang } from "@/lib/hreflang";
import { isActiveLocale, type SiteLocale } from "@/i18n/config";

export const revalidate = 3600;

// TR-only Turkish slug — Prens Adaları targets local TR search intent
// directly. EN equivalent lives at /princes-islands-tour-istanbul.
export async function generateStaticParams() {
  return [{ locale: "tr" }];
}

const canonicalUrl = `${SITE_URL}/tr/prens-adalari-istanbul`;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "tr") return {};
  return {
    title: "Prens Adaları Turu İstanbul — €45'ten",
    description:
      "Prens Adaları turu İstanbul 2026 — paylaşımlı tam gün €45 (vapur + rehber + öğle) veya özel yat €280'den. Büyükada, Heybeliada, araba yasak adalar.",
    alternates: {
      canonical: canonicalUrl,
      // TR-only pillar — buildHreflang skipped because no EN/DE/FR/NL variant
      // exists for this specific slug (EN uses /princes-islands-tour-istanbul).
      languages: undefined,
    },
    openGraph: {
      title: "Prens Adaları Turu İstanbul — €45'ten",
      description:
        "Prens Adaları'nı keşfetmek için iki yol: 8 saatlik paylaşımlı vapur turu €45 veya özel yat kiralama €280'den. İki formatı karşılaştırın.",
      url: canonicalUrl,
      type: "article",
    },
  };
}

const ISLANDS = [
  {
    name: "Büyükada",
    sizeLabel: "En büyük · 5,4 km²",
    summary:
      "Adaların kraliçesi. Viktoryen dönem ahşap köşkleri, ada zirvesindeki Aya Yorgi Manastırı, çam ağaçlı sokaklar ve popüler Yörükali plajı. Kabataş'tan vapurla yaklaşık 75-90 dakika.",
  },
  {
    name: "Heybeliada",
    sizeLabel: "İkinci en büyük · 2,3 km²",
    summary:
      "Büyükada'ya göre daha sakin. Tarihî Heybeliada Ruhban Okulu, kıyı yürüyüş yolu ve Değirmenburnu piknik alanıyla bilinir. Aynı vapur hattında.",
  },
  {
    name: "Burgazada",
    sizeLabel: "Orta · 1,5 km²",
    summary:
      "Küçük ve sevimli. Kalpazankaya'da deniz manzaralı balık öğle yemeği, kolay yürüyüş rotaları ve büyük adalardan çok daha az turist.",
  },
  {
    name: "Kınalıada",
    sizeLabel: "İstanbul'a en yakın · 1,3 km²",
    summary:
      "Vapur hattının ilk durağı — Kabataş'tan 40 dakika. Kumsallar, iskele üstü balık lokantaları ve köyde Ermeni mirası küçük kiliseler.",
  },
];

const FAQ_ITEMS = [
  {
    q: "İstanbul'dan Prens Adaları'na en ucuz nasıl gidilir?",
    a: "Kabataş'tan Şehir Hatları vapuru tek yön yaklaşık ₺40 (€1,20) ve Büyükada'ya 75-90 dakikada ulaşır. MerrySails'in €45 tam gün rehberli turu, gidiş-dönüş vapur + rehber + öğle yemeği + yapılandırılmış ada gezisini içerir — yalnız navigasyon yapmak veya Türkçe vapur tarifelerini okumak istemiyorsanız pratik.",
  },
  {
    q: "Prens Adaları'nda araba var mı?",
    a: "Hayır — dört yerleşik adanın tamamında özel araba kullanımı yasaktır. Tek motorlu ulaşım belediyenin elektrikli araçlarıdır. Yerel halk ve ziyaretçiler bisiklet, elektrikli minibüs veya yürüyerek dolaşır. Araç yasağı adaların en büyük cazibesidir.",
  },
  {
    q: "Prens Adaları turu İstanbul'dan ne kadar sürer?",
    a: "Tam gün rehberli tur kapıdan kapıya 8 saat (09:00 kalkış, dönüş ~17:00). Özel yat kiralama günlük gezi 6-8 saat ve tamamen esnek — kalkış saatini, adalar arası rotayı ve her adada ne kadar kalacağınızı siz seçersiniz.",
  },
  {
    q: "Paylaşımlı vapur turu mu özel yat mı — hangisi daha iyi?",
    a: "Paylaşımlı vapur turu (€45/kişi) yalnız gezginler, bütçe çiftleri ve rehber + öğle yemeği isteyenler için. Özel yat (€280'den/tüm tekne, 2 saat minimum, tam gün mevcut) 4+ kişi gruplar, aileler veya esneklik isteyenler için — kendi adalarınızı, duraklarınızı, zamanlamanızı seçin, yiyecek-içeceği yat üstünde organize edin.",
  },
  {
    q: "Prens Adaları'na yılın hangi zamanı en iyi?",
    a: "Nisan sonu — Haziran başı ve Eylül ortası — Ekim ideal — yüzmek için yeterince sıcak, yürüyüş için yeterince ferah, yaz zirvesine göre çok daha az kalabalık. Temmuz-Ağustos hafta sonları İstanbullular adalara akın ettiğinden aşırı kalabalık. Kışın atmosferik ama plaj lokantalarının çoğu kapalı.",
  },
  {
    q: "Prens Adaları'nda yüzülebilir mi?",
    a: "Evet — Büyükada'da Yörükali Plajı ve Nakibey Plajı (giriş ücretli, şezlong). Heybeliada'da Değirmenburnu ve Yelken Klübü plajları. Çoğu plaj Mayıs ortasından Ekim ortasına açık. Temmuz-Ağustos su sıcaklığı 22-24°C civarı.",
  },
  {
    q: "İstanbul'dan Prens Adaları'na özel yat kiralama var mı?",
    a: "Evet — MerrySails Kuruçeşme Marina veya Kabataş'tan özel tam gün yat kiralama sunar. Tipik Prens Adaları yat günü 6-8 saat, Essential paket €280'den (8 kişiye kadar), Büyükada + Heybeliada + tercih ettiğiniz yüzme koyunda duraklar. 150 kişiye kadar daha büyük tekneler mevcuttur.",
  },
];

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "TouristAttraction",
  name: "Prens Adaları Turu İstanbul",
  description:
    "İstanbul'dan Prens Adaları'nı keşfetmek için iki yol: paylaşımlı rehberli tam gün vapur turu €45 veya özel yat kiralama €280'den. Büyükada, Heybeliada, Burgazada ve Kınalıada — İstanbul'un araba yasak takımadaları.",
  url: canonicalUrl,
  image: `${SITE_URL}/og-image.jpg`,
  isAccessibleForFree: false,
  publicAccess: true,
  touristType: ["Çiftler", "Aileler", "Yalnız gezginler", "Gruplar"],
  hasMap: "https://www.google.com/maps?q=Prens+Adaları+İstanbul",
  containsPlace: ISLANDS.map((i) => ({ "@type": "TouristAttraction", name: i.name })),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: [".faq-q", ".faq-a"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Prens Adaları Turu İstanbul", item: canonicalUrl },
  ],
};

const WHATSAPP_PREFILL =
  "Merhaba MerrySails — Prens Adaları gezisi planlıyorum. Tarih: [tarih], misafir: [N]. Paylaşımlı tur mu yoksa özel yat mı?";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isActiveLocale(locale as SiteLocale) || locale !== "tr") notFound();

  return (
    <main className="bg-[var(--bg)] text-[var(--body-text)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="border-b border-[var(--line)] bg-gradient-to-b from-[var(--accent-soft,#f5f0e6)] to-[var(--bg)]">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
          <nav aria-label="Breadcrumb" className="text-sm text-[var(--text-muted)] mb-4">
            <Link href="/tr" className="hover:underline">Ana Sayfa</Link>
            <span className="mx-2">/</span>
            <span>Prens Adaları Turu İstanbul</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--heading)] mb-3">
            Prens Adaları Turu — İstanbul 2026 Rehberi
          </h1>
          <p className="text-base sm:text-lg text-[var(--body-text)] max-w-3xl">
            <strong>Özet.</strong> İstanbul&apos;un araba yasak Prens Adaları&apos;nı keşfetmek için iki yol:
            paylaşımlı tam gün vapur turu <strong>€45/kişi</strong> (8 saat, öğle + rehber dahil)
            veya 8 kişiye kadar özel yat kiralama <strong>€280&apos;den</strong> (esnek 6-8 saatlik gün,
            adaları ve yüzme koylarını siz seçersiniz). Dört yerleşik ada — Büyükada, Heybeliada,
            Burgazada, Kınalıada — yalnızca bisiklet, elektrikli araç ve yürüyüşle gezilir.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/cruises/istanbul-princes-island-tour"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-white hover:brightness-110 transition"
            >
              Paylaşımlı tur €45&apos;ten <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/tr/yacht-charter-istanbul"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--brand)] px-5 py-3 text-sm font-semibold text-[var(--brand)] hover:bg-[var(--brand)]/5 transition"
            >
              Özel yat €280&apos;den <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`${WHATSAPP_URL}?text=${encodeURIComponent(WHATSAPP_PREFILL)}`}
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white hover:brightness-110 transition"
              target="_blank"
              rel="noopener"
            >
              WhatsApp +90 544 898 98 12
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10">
        <h2 className="text-2xl font-bold text-[var(--heading)] mb-6">Paylaşımlı vapur turu vs. özel yat kiralama</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-[var(--line)] bg-white p-5">
            <div className="flex items-center gap-2 text-[var(--brand)] mb-2">
              <Ship className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wide">Paylaşımlı tam gün tur</span>
            </div>
            <h3 className="text-xl font-bold text-[var(--heading)] mb-2">Kişi başı €45</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2"><Clock className="w-4 h-4 mt-0.5 text-[var(--text-muted)]" /><span>Toplam 8 saat · 09:00 kalkış</span></li>
              <li className="flex gap-2"><Users className="w-4 h-4 mt-0.5 text-[var(--text-muted)]" /><span>Maks. 50 misafir · yalnız ve çift uyumlu</span></li>
              <li className="flex gap-2"><MapPin className="w-4 h-4 mt-0.5 text-[var(--text-muted)]" /><span>Şehir Hatları vapuru → Büyükada → rehberli yürüyüş → öğle</span></li>
              <li className="flex gap-2"><Trees className="w-4 h-4 mt-0.5 text-[var(--text-muted)]" /><span>Vapur + rehber + öğle yemeği dahil</span></li>
            </ul>
            <Link href="/cruises/istanbul-princes-island-tour" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand)] hover:underline">
              Paylaşımlı tur detayları <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="rounded-2xl border border-[var(--brand)]/30 bg-[var(--brand)]/5 p-5">
            <div className="flex items-center gap-2 text-[var(--brand)] mb-2">
              <Anchor className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wide">Özel yat kiralama</span>
            </div>
            <h3 className="text-xl font-bold text-[var(--heading)] mb-2">€280&apos;den / yat</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2"><Clock className="w-4 h-4 mt-0.5 text-[var(--text-muted)]" /><span>6-8 saat esnek · kalkış saatini siz seçin</span></li>
              <li className="flex gap-2"><Users className="w-4 h-4 mt-0.5 text-[var(--text-muted)]" /><span>2-150 misafir (Essential 8 kişi)</span></li>
              <li className="flex gap-2"><MapPin className="w-4 h-4 mt-0.5 text-[var(--text-muted)]" /><span>Rota size özel — Büyükada, Heybeliada, yüzme koyu</span></li>
              <li className="flex gap-2"><Trees className="w-4 h-4 mt-0.5 text-[var(--text-muted)]" /><span>Kaptan + mürettebat dahil, ikram opsiyonel</span></li>
            </ul>
            <Link href="/tr/yacht-charter-istanbul" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand)] hover:underline">
              Yat paketlerini gör <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[var(--accent-soft,#f7f4ec)] border-y border-[var(--line)]">
        <div className="mx-auto max-w-5xl px-4 py-10">
          <h2 className="text-2xl font-bold text-[var(--heading)] mb-2">Yerleşik dört Prens Adası</h2>
          <p className="text-sm text-[var(--text-muted)] mb-6">Takımadada toplam dokuz ada — dördü yerleşik ve Şehir Hatları vapuruyla ulaşılabilir. Vapurlar Kabataş ve Kadıköy&apos;den sabit bir hatla dört adaya da uğrar.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {ISLANDS.map((island) => (
              <div key={island.name} className="rounded-2xl border border-[var(--line)] bg-white p-5">
                <h3 className="text-lg font-bold text-[var(--heading)] mb-1">{island.name}</h3>
                <p className="text-xs text-[var(--text-muted)] uppercase tracking-wide mb-2">{island.sizeLabel}</p>
                <p className="text-sm text-[var(--body-text)]">{island.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10">
        <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">İstanbul&apos;dan Prens Adaları&apos;na ulaşım</h2>
        <div className="space-y-4 text-sm leading-relaxed">
          <p>
            <strong>Kabataş&apos;tan (Avrupa yakası) Şehir Hatları vapuru:</strong> en yaygın rota.
            Büyükada&apos;ya yaklaşık 75-90 dakika; yol üzerinde Kınalıada, Burgazada ve Heybeliada
            duraklarıyla. Vapurlar her 1-2 saatte bir kalkar; ilk sefer ~06:50, Büyükada&apos;dan son
            dönüş ~21:30. İstanbulkart ile tek yön ~₺40.
          </p>
          <p>
            <strong>Kadıköy veya Bostancı&apos;dan (Anadolu yakası) vapur:</strong> daha hızlı —
            Bostancı&apos;dan Büyükada yaklaşık 30 dakika. Oteliniz Anadolu yakasındaysa pratiktir.
          </p>
          <p>
            <strong>İDO deniz otobüsü:</strong> Kabataş ve Bostancı&apos;dan daha hızlı katamaran
            hizmeti, Büyükada&apos;ya yaklaşık 45 dakika. Ücret biraz daha yüksek (~₺70). Tarifesi
            vapurdan seyrektir.
          </p>
          <p>
            <strong>Kuruçeşme Marina veya Kabataş&apos;tan özel yat kiralama:</strong> yat türüne göre
            Büyükada 60-75 dakika. Kapıdan kapıya — vapur kuyruğu yok, sabit dönüş saati yok ve
            rotanız size ait. MerrySails marina rezervasyonu ve kaptanı organize eder.
          </p>
        </div>
      </section>

      <section className="bg-[var(--accent-soft,#f7f4ec)] border-y border-[var(--line)]">
        <div className="mx-auto max-w-5xl px-4 py-10">
          <h2 className="text-2xl font-bold text-[var(--heading)] mb-6">SSS — Prens Adaları Turu İstanbul</h2>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item) => (
              <details key={item.q} className="group rounded-2xl border border-[var(--line)] bg-white p-5">
                <summary className="faq-q cursor-pointer text-base font-semibold text-[var(--heading)] list-none flex items-start justify-between gap-3">
                  <span>{item.q}</span>
                  <span className="text-[var(--brand)] group-open:rotate-180 transition shrink-0">▼</span>
                </summary>
                <p className="faq-a mt-3 text-sm leading-relaxed text-[var(--body-text)]">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10">
        <div className="rounded-3xl bg-gradient-to-r from-[var(--brand)] to-[var(--brand-dark,#0a3e6f)] p-8 sm:p-10 text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">İstanbul&apos;dan Prens Adaları gününüzü planlayın</h2>
          <p className="text-sm sm:text-base opacity-90 mb-5 max-w-2xl">
            WhatsApp&apos;tan tarih ve grup boyunuzu yazın — paylaşımlı tur müsaitliğini teyit ederiz
            veya aynı gün için özel yat fiyatı paylaşırız, genelde dakikalar içinde. TÜRSAB A Grubu
            lisanslı (#{TURSAB_LICENSE_NUMBER}) · 2001&apos;den bu yana 50.000+ misafir.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={`${WHATSAPP_URL}?text=${encodeURIComponent(WHATSAPP_PREFILL)}`}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[var(--brand)] hover:brightness-105 transition"
            >
              WhatsApp ekibe yaz
            </a>
            <Link
              href="/tr/bosphorus-cruise"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
            >
              Boğaz turu seçenekleri <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
