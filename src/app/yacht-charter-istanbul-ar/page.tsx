import type { Metadata } from "next";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  SITE_URL,
  SITE_NAME,
  PHONE_DISPLAY,
  WHATSAPP_URL,
  TURSAB_LICENSE_NUMBER,
} from "@/lib/constants";
import { SITE_LAST_MODIFIED, SITE_PUBLISHED } from "@/lib/freshness";

// ─────────────────────────────────────────────────────────────────────────
// Standalone Arabic (RTL) Google Ads landing page for Gulf / Arabic-speaking
// travellers. NOINDEX on purpose — this is a paid-traffic LP only. It is NOT
// part of the site-wide locale system (the `sa` locale stays inactive so we
// never ship 400+ thin untranslated pages). Rendered inside the root layout
// (lang=en); the RTL/Arabic direction is set on this page's own wrapper.
// Canonical pricing mirrors src/data/fleet.ts — NEVER fabricate other numbers.
// ─────────────────────────────────────────────────────────────────────────

const PAGE_PATH = "/yacht-charter-istanbul-ar";
const canonicalUrl = `${SITE_URL}${PAGE_PATH}`;

// Prefilled WhatsApp message in Arabic — "I'd like a private yacht charter quote".
const WHATSAPP_PREFILL = "أرغب في عرض سعر لتأجير يخت خاص";
const whatsappHref = `${WHATSAPP_URL}?text=${encodeURIComponent(WHATSAPP_PREFILL)}`;

export const metadata: Metadata = {
  // Arabic: "Private Yacht Charter Istanbul — Whole Boat" (≤47 source chars).
  title: "تأجير يخت خاص في اسطنبول — قارب كامل",
  description:
    "استأجر يختاً خاصاً على مضيق البوسفور في اسطنبول مباشرةً من €220 للقارب الكامل، بدون عمولة فنادق أو وكلاء. رخصة TÜRSAB الفئة A منذ 2001 وأكثر من 50,000 ضيف.",
  alternates: {
    canonical: canonicalUrl,
  },
  // NON-NEGOTIABLE: ad landing page only — keep it out of the index so it
  // adds zero crawl pressure / thin-content risk to merrysails.com.
  robots: { index: false, follow: false },
  openGraph: {
    title: "تأجير يخت خاص في اسطنبول — قارب كامل من €220",
    description:
      "يخت خاص على البوسفور مباشرةً من €220 للقارب الكامل. أسطول من ستة يخوت، من 12 إلى 150 ضيفاً، الكابتن والطاقم ضمن السعر.",
    url: canonicalUrl,
    type: "website",
    locale: "ar_AR",
    images: [
      {
        url: `${SITE_URL}/images/sunset-2026/hero.jpeg`,
        width: 1200,
        height: 630,
        alt: "يخت خاص على مضيق البوسفور في اسطنبول",
      },
    ],
  },
};

// ── Canonical fleet tiers (mirror src/data/fleet.ts) ──────────────────────
const fleetRows: {
  name: string;
  capacity: string;
  price: string;
  note: string;
}[] = [
  {
    name: "اليخت البوتيك — 12 ضيفاً",
    capacity: "حتى 12 ضيفاً",
    price: "من €220",
    note: "للساعتين · مثالي للأزواج والمجموعات الصغيرة",
  },
  {
    name: "اليخت بريميوم — 15 ضيفاً",
    capacity: "حتى 15 ضيفاً",
    price: "من €320",
    note: "للساعتين · للعائلات ومجموعات الأصدقاء",
  },
  {
    name: "يخت المجموعات — قياسي (40 ضيفاً)",
    capacity: "حتى 40 ضيفاً",
    price: "€380 – €500",
    note: "للساعتين · للتجمعات المتوسطة والمناسبات",
  },
  {
    name: "يخت الفعاليات — 90 ضيفاً",
    capacity: "30 إلى 90 ضيفاً",
    price: "بحسب الطلب",
    note: "لحفلات الزفاف والعشاء والفعاليات الكبرى",
  },
  {
    name: "يخت ميغا للفعاليات — 150 ضيفاً",
    capacity: "80 إلى 150 ضيفاً",
    price: "بحسب الطلب",
    note: "للحفلات الكبرى والفعاليات المؤسسية",
  },
];

// ── Trust pillars ─────────────────────────────────────────────────────────
const trustPoints: { title: string; body: string }[] = [
  {
    title: "حجز مباشر بلا عمولة",
    body: "تحجز معنا مباشرةً، لا عبر فندق أو وكيل سفر. منافسونا يبدؤون من €330 إلى €499، ومنصات الحجز والكونسيرج يعيدون بيع اليخت نفسه (12 ضيفاً / ساعتان) بسعر €500 إلى €975. السعر الذي تؤكده هو السعر الذي تدفعه.",
  },
  {
    title: "رخصة TÜRSAB الفئة A",
    body: `وكالة سفر مرخّصة من الاتحاد التركي لوكالات السفر، الفئة A، رقم الترخيص ${TURSAB_LICENSE_NUMBER}. نعمل منذ عام 2001 وقد استضفنا أكثر من 50,000 ضيف على متن أسطولنا.`,
  },
  {
    title: "الكابتن والطاقم ضمن السعر",
    body: "سعر القارب يشمل الكابتن والطاقم المرخّص والوقود والمشروبات الغازية والوجبات الخفيفة. الطعام الساخن والمشروبات الكحولية والـ DJ والمصوّر تُسعَّر بشكل منفصل لتبقى الخطة مرنة.",
  },
];

// ── FAQ (Arabic) ──────────────────────────────────────────────────────────
const faqItems: { question: string; answer: string }[] = [
  {
    question: "كم تكلفة تأجير يخت خاص في اسطنبول؟",
    answer:
      "تبدأ الأسعار من €220 للقارب الكامل (لا للشخص) لرحلة بحرية مدّتها ساعتان على متن اليخت البوتيك لـ 12 ضيفاً. اليخت بريميوم لـ 15 ضيفاً من €320، ويخت المجموعات لـ 40 ضيفاً من €380 إلى €500. يخوت الفعاليات لـ 90 و150 ضيفاً تُسعَّر بحسب الطلب. تُطبَّق تلقائياً نسبة خصم 10% بدءاً من ثلاث ساعات.",
  },
  {
    question: "ما الذي يشمله السعر؟",
    answer:
      "يشمل سعر القارب حجز اليخت بالكامل، والكابتن والطاقم المرخّص، والوقود، والمشروبات الغازية، والوجبات الخفيفة، ونظام الصوت، وسترات النجاة. أما خدمة الطعام والبار والموسيقى والمصوّر وتنسيق طلب الزواج فتُسعَّر على حدة بحسب طلبك.",
  },
  {
    question: "كيف أحجز اليخت؟",
    answer:
      "أسرع طريقة هي مراسلتنا عبر واتساب على الرقم +90 544 898 98 12. أرسل لنا عدد الضيوف والتاريخ والمناسبة، ونرسل لك عرض سعر للقارب الكامل خلال دقائق. الحجز مباشر معنا دون أي عمولة وسيط.",
  },
  {
    question: "ما المناسبات التي تناسبها اليخوت الخاصة؟",
    answer:
      "تناسب أسطولنا الأزواج وذكرى الزواج وأعياد الميلاد وطلبات الزواج والتجمعات العائلية ورحلات الأصدقاء، إضافةً إلى حفلات الزفاف وعشاء الفعاليات والمناسبات المؤسسية على متن يخوت الفعاليات الأكبر.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "ar",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": ["TouristTrip", "Service"],
  "@id": `${canonicalUrl}#tour`,
  name: "تأجير يخت خاص على البوسفور في اسطنبول",
  alternateName: [
    "تأجير يخت في اسطنبول",
    "Private Yacht Charter Istanbul",
    "يخت خاص البوسفور",
  ],
  description:
    "تأجير يخت خاص على مضيق البوسفور في اسطنبول — أسطول من ستة يخوت يتسع من 12 إلى 150 ضيفاً، حجز القارب بالكامل مع الكابتن والطاقم، من €220 للساعتين.",
  datePublished: SITE_PUBLISHED,
  dateModified: SITE_LAST_MODIFIED,
  serviceType: "Private Yacht Charter",
  url: canonicalUrl,
  inLanguage: "ar",
  image: `${SITE_URL}/images/sunset-2026/hero.jpeg`,
  touristType: "Couples, Families, Groups, Corporate",
  provider: {
    "@id": `${SITE_URL}/#organization`,
  },
  areaServed: [
    { "@type": "City", name: "Istanbul", sameAs: "https://www.wikidata.org/wiki/Q406" },
    {
      "@type": "BodyOfWater",
      name: "Bosphorus Strait",
      sameAs: "https://www.wikidata.org/wiki/Q83329",
    },
  ],
  availableLanguage: ["Arabic", "English", "Turkish"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "أسطول تأجير اليخوت الخاصة على البوسفور — سعر الدخول لكل يخت لرحلة ساعتين",
    itemListElement: [
      {
        "@type": "Offer",
        name: "اليخت البوتيك · 12 ضيفاً",
        price: 220,
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        validFrom: "2026-01-01",
        url: canonicalUrl,
      },
      {
        "@type": "Offer",
        name: "اليخت بريميوم · 15 ضيفاً",
        price: 320,
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        validFrom: "2026-01-01",
        url: canonicalUrl,
      },
      {
        "@type": "Offer",
        name: "يخت المجموعات · 40 ضيفاً",
        price: 380,
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        validFrom: "2026-01-01",
        url: canonicalUrl,
      },
    ],
  },
};

const sectionCard = "rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8";

export default function YachtCharterIstanbulArabicLandingPage() {
  return (
    <div dir="rtl" lang="ar" className="text-right">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="pt-28 pb-20 bg-[var(--surface-alt)]">
        <div className="container-main">
          {/* ── Hero ──────────────────────────────────────────────────── */}
          <header className="overflow-hidden rounded-3xl border border-[var(--line)] bg-white">
            <div className="relative h-64 w-full md:h-96">
              <Image
                src="/images/sunset-2026/hero.jpeg"
                alt="يخت خاص يبحر على مضيق البوسفور عند الغروب في اسطنبول"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1100px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
                <p className="mb-2 inline-block rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[var(--brand-primary)]">
                  رخصة TÜRSAB الفئة A · منذ 2001 · أكثر من 50,000 ضيف
                </p>
                <h1 className="max-w-3xl text-2xl font-bold leading-tight tracking-tight text-white md:text-4xl">
                  تأجير يخت خاص على مضيق البوسفور — قارب كامل من €220
                </h1>
              </div>
            </div>

            <div className="grid gap-6 p-6 md:grid-cols-[1.4fr_1fr] md:p-8">
              {/* Self-contained answer block (130–160 words of Arabic). */}
              <div>
                <p className="text-base leading-relaxed text-[var(--text-muted)]">
                  نقدّم في {SITE_NAME} تأجير يخت خاص على مضيق البوسفور في اسطنبول،
                  مع حجز القارب بالكامل لمجموعتك وحدها. تبدأ الأسعار من €220 للقارب
                  الكامل — وليس للشخص — لرحلة بحرية مدّتها ساعتان على متن اليخت
                  البوتيك لـ 12 ضيفاً، ويتّسع أسطولنا المكوّن من ستة يخوت حتى 150
                  ضيفاً. أهم ميزة: أنت تحجز معنا مباشرةً دون أي عمولة فندق أو وكيل
                  سفر. منافسونا يبدؤون من €330 إلى €499، بينما تعيد منصات الحجز
                  وخدمات الكونسيرج بيع اليخت نفسه بسعر €500 إلى €975 لذات القارب
                  لـ 12 ضيفاً ولمدّة ساعتين. سعر القارب يشمل الكابتن والطاقم المرخّص
                  والوقود والمشروبات الغازية والوجبات الخفيفة، وتُطبَّق نسبة خصم 10%
                  تلقائياً بدءاً من ثلاث ساعات. الطعام والبار والموسيقى والمصوّر
                  تُسعَّر بشكل منفصل، فيبقى سعر القارب واضحاً وخطّتك مرنة.
                </p>
                <p className="mt-3 text-sm font-semibold text-[var(--heading)]">
                  التواصل عبر واتساب فقط — رد سريع خلال دقائق.
                </p>
              </div>

              {/* WhatsApp CTA card */}
              <div className="flex flex-col justify-center gap-3 rounded-2xl border border-[var(--brand-primary)]/15 bg-[var(--surface-alt)] p-5 text-center">
                <p className="text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
                  احجز يختك الآن
                </p>
                <p className="text-3xl font-bold text-[var(--heading)]">من €220</p>
                <p className="text-xs text-[var(--text-muted)]">
                  للقارب الكامل · ساعتان · لا عمولة وسيط
                </p>
                {/* Rating at the decision point — Arabic is the cheapest
                    converter cohort; surface the 4.9/5 trust token beside the
                    CTA, not only in the trust block below. */}
                <p className="text-xs font-semibold text-[var(--heading)]">
                  ★ 4.9 من 5 · 248 تقييم · TÜRSAB A منذ 2001
                </p>
                <a
                  href={whatsappHref}
                  className="btn-cta w-full"
                  rel="nofollow"
                >
                  اطلب عرض سعر عبر واتساب
                </a>
                <p className="text-xs text-[var(--text-muted)]">{PHONE_DISPLAY}</p>
              </div>
            </div>
          </header>

          {/* ── Fleet / pricing table ─────────────────────────────────── */}
          <section className={cn(sectionCard, "mt-8")}>
            <h2 className="mb-2 text-2xl font-bold text-[var(--heading)]">
              الأسطول والأسعار
            </h2>
            <p className="mb-5 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)]">
              جميع الأسعار باليورو لكل يخت (وليس لكل ضيف)، وتشمل الكابتن والطاقم
              والمشروبات الغازية والوجبات الخفيفة. خصم 10% تلقائي بدءاً من ثلاث ساعات.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-[var(--line)]">
              <table className="w-full min-w-[640px] border-collapse text-right text-sm">
                <thead>
                  <tr className="bg-[var(--surface-alt)] text-[var(--heading)]">
                    <th className="p-4 font-semibold">اليخت</th>
                    <th className="p-4 font-semibold">السعة</th>
                    <th className="p-4 font-semibold">السعر</th>
                    <th className="p-4 font-semibold">ملاحظة</th>
                  </tr>
                </thead>
                <tbody>
                  {fleetRows.map((row) => (
                    <tr
                      key={row.name}
                      className="border-t border-[var(--line)] align-top"
                    >
                      <td className="p-4 font-semibold text-[var(--heading)]">
                        {row.name}
                      </td>
                      <td className="p-4 text-[var(--text-muted)]">{row.capacity}</td>
                      <td className="p-4 font-bold text-[var(--brand-primary)]">
                        {row.price}
                      </td>
                      <td className="p-4 leading-relaxed text-[var(--text-muted)]">
                        {row.note}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-[var(--text-muted)]">
              عروض أسعار يخوت الفعاليات لـ 90 و150 ضيفاً متاحة عبر واتساب على الرقم{" "}
              {PHONE_DISPLAY}.
            </p>
          </section>

          {/* ── Why book direct (trust) ───────────────────────────────── */}
          <section className={cn(sectionCard, "mt-8")}>
            <h2 className="mb-5 text-2xl font-bold text-[var(--heading)]">
              لماذا الحجز المباشر معنا؟
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {trustPoints.map((point) => (
                <div
                  key={point.title}
                  className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-5"
                >
                  <h3 className="mb-2 text-base font-semibold text-[var(--heading)]">
                    {point.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                    {point.body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── FAQ ───────────────────────────────────────────────────── */}
          <section className={cn(sectionCard, "mt-8")}>
            <h2 className="mb-5 text-2xl font-bold text-[var(--heading)]">
              الأسئلة الشائعة
            </h2>
            <div className="space-y-4">
              {faqItems.map((item) => (
                <div
                  key={item.question}
                  className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-5"
                >
                  <h3 className="mb-2 text-base font-semibold text-[var(--heading)]">
                    {item.question}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Closing CTA ───────────────────────────────────────────── */}
          <section
            className={cn(
              sectionCard,
              "mt-8 flex flex-col items-center gap-4 bg-white text-center",
            )}
          >
            <h2 className="text-2xl font-bold text-[var(--heading)]">
              جاهز لرحلة خاصة على البوسفور؟
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-[var(--text-muted)]">
              أرسل لنا عدد الضيوف والتاريخ والمناسبة عبر واتساب، ونرسل لك عرض سعر
              للقارب الكامل خلال دقائق — بدون عمولة وسيط.
            </p>
            <a
              href={whatsappHref}
              className="btn-cta"
              rel="nofollow"
            >
              اطلب عرض سعر عبر واتساب
            </a>
            <p className="text-xs text-[var(--text-muted)]">
              واتساب فقط · {PHONE_DISPLAY}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
