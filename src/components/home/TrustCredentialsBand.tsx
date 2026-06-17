/**
 * TrustCredentialsBand — corporate trust & verification band.
 *
 * Placed high on the homepage (just under the hero/TourGrid) so credibility
 * hits before the visitor scrolls into the product grids.  Three layers:
 *
 *   1. A real first-party aggregate strip (blended rating, review count,
 *      cumulative guests, TÜRSAB licence, no-hidden-fees) — every number is
 *      sourced from `src/lib/trust-evidence.ts`, so it stays truthful and
 *      stays in sync with the AI-citation TrustEvidence block below it.
 *   2. A verification / review-platform logo row (TripAdvisor, Google Reviews,
 *      Trustpilot, TÜRSAB) under "Reviewed & verified on", plus a dedicated
 *      payment + security row (PaymentTrust, light tone) under "Secure payment"
 *      carrying the real card / wallet marks + 256-bit SSL.  Framed truthfully
 *      as "verified on" — NO fabricated per-platform star counts.  Muted
 *      grayscale that warms to full brand colour on hover so it reads premium,
 *      not spammy.
 *   3. The three safety / licensing trust points (licensed agency, Bosphorus-
 *      specific planning, safety & boarding clarity) — folded in from the old
 *      standalone text-wall on the homepage so the E-E-A-T / AI signal copy is
 *      preserved in a tighter, more visual form.
 *
 * Server component — the hover treatment is pure CSS, no client JS needed.
 */
import { ShieldCheck, Compass, LifeBuoy } from "lucide-react";
import { cn } from "@/lib/utils";
import PaymentTrust from "@/components/marketing/PaymentTrust";
import {
  PARENT_OPERATOR_STATS,
  SATISFACTION_STATS,
} from "@/lib/trust-evidence";

/* ------------------------------------------------------------------ */
/* Locale-aware label strings.                                         */
/*                                                                     */
/* Only the *labels* translate — every STAT (rating, review count,     */
/* guests, TÜRSAB licence number, years active) still comes from       */
/* trust-evidence.ts, so the numbers stay truthful and in sync with    */
/* the EN homepage.  Default "en" keeps the EN homepage byte-for-byte  */
/* identical (backward compatible).                                    */
/* ------------------------------------------------------------------ */

type BandLocale = "en" | "tr" | "de" | "fr" | "nl" | "ru" | "zh";

type BandStrings = {
  eyebrow: string;
  /** {reviews} {guests} {since} are interpolated with real stats. */
  headline: string;
  lede: string;
  reviewsLabel: string;
  guestsLabel: string;
  licenceLabel: string; // value is "TÜRSAB A" — this is the small caption
  noFeesValue: string;
  noFeesLabel: string;
  reviewedOn: string;
  securePayment: string;
  badgeReviewedOn: string;
  badgeVerifiedOn: string;
  badgeLicensedAgency: string;
  credentials: { title: string; description: string }[];
};

const BAND_STRINGS: Record<BandLocale, BandStrings> = {
  en: {
    eyebrow: "Trusted & Verified",
    headline:
      "A TÜRSAB-licensed Bosphorus operator, reviewed across every major platform",
    lede: "{reviews}+ verified guest reviews, {guests},000+ guests hosted since {since}, and secure online payment — book the same boat and crew at the direct operator price.",
    reviewsLabel: "{reviews}+ verified reviews",
    guestsLabel: "Guests hosted since {since}",
    licenceLabel: "Licence #{licence} · {years} yrs",
    noFeesValue: "No hidden fees",
    noFeesLabel: "Direct operator price",
    reviewedOn: "Reviewed & verified on",
    securePayment: "Secure payment",
    badgeReviewedOn: "Reviewed on",
    badgeVerifiedOn: "Verified on",
    badgeLicensedAgency: "Licensed agency",
    credentials: [
      {
        title: "Licensed travel-agency operation",
        description:
          "MerrySails is operated by Merry Tourism, a TÜRSAB A Group licensed travel agency — licensing, booking support, and guest communication stay tied to a named Istanbul operator.",
      },
      {
        title: "Bosphorus-specific planning",
        description:
          "Sunset, dinner, and private yacht bookings use different timing, boarding, package, and route logic, so guests can choose the right product before contacting the team.",
      },
      {
        title: "Safety & boarding clarity",
        description:
          "Booking pages and confirmation messages are the source of truth for exact meeting points, inclusions, timing, and vessel-specific details.",
      },
    ],
  },
  tr: {
    eyebrow: "Güvenilir & Doğrulanmış",
    headline:
      "TÜRSAB lisanslı Boğaz operatörü — tüm büyük platformlarda değerlendirildi",
    lede: "{reviews}+ doğrulanmış misafir yorumu, {since}'den bu yana {guests}.000+ misafir ve güvenli online ödeme — aynı tekne ve ekip, doğrudan operatör fiyatıyla.",
    reviewsLabel: "{reviews}+ doğrulanmış yorum",
    guestsLabel: "{since}'den bu yana misafir",
    licenceLabel: "Lisans #{licence} · {years} yıl",
    noFeesValue: "Gizli ücret yok",
    noFeesLabel: "Doğrudan operatör fiyatı",
    reviewedOn: "Değerlendirildiği ve doğrulandığı platformlar",
    securePayment: "Güvenli ödeme",
    badgeReviewedOn: "Değerlendirildi",
    badgeVerifiedOn: "Doğrulandı",
    badgeLicensedAgency: "Lisanslı acente",
    credentials: [
      {
        title: "Lisanslı seyahat acentesi",
        description:
          "MerrySails, TÜRSAB A Grubu lisanslı bir seyahat acentesi olan Merry Tourism tarafından işletilir — lisans, rezervasyon desteği ve misafir iletişimi adı belli bir İstanbul operatörüne bağlıdır.",
      },
      {
        title: "Boğaz'a özel planlama",
        description:
          "Gün batımı, akşam yemeği ve özel yat rezervasyonları farklı zamanlama, biniş, paket ve rota mantığı kullanır; böylece misafirler ekibe ulaşmadan önce doğru ürünü seçebilir.",
      },
      {
        title: "Güvenlik & biniş netliği",
        description:
          "Rezervasyon sayfaları ve onay mesajları; tam buluşma noktaları, dahil olanlar, zamanlama ve tekneye özel detaylar için tek doğru kaynaktır.",
      },
    ],
  },
  de: {
    eyebrow: "Vertrauenswürdig & Verifiziert",
    headline:
      "Ein TÜRSAB-lizenzierter Bosporus-Veranstalter, bewertet auf allen großen Plattformen",
    lede: "{reviews}+ verifizierte Gästebewertungen, {guests}.000+ Gäste seit {since} und sichere Online-Zahlung — buchen Sie dasselbe Boot und dieselbe Crew zum direkten Veranstalterpreis.",
    reviewsLabel: "{reviews}+ verifizierte Bewertungen",
    guestsLabel: "Gäste seit {since}",
    licenceLabel: "Lizenz #{licence} · {years} J.",
    noFeesValue: "Keine versteckten Kosten",
    noFeesLabel: "Direkter Veranstalterpreis",
    reviewedOn: "Bewertet & verifiziert auf",
    securePayment: "Sichere Zahlung",
    badgeReviewedOn: "Bewertet auf",
    badgeVerifiedOn: "Verifiziert auf",
    badgeLicensedAgency: "Lizenzierte Agentur",
    credentials: [
      {
        title: "Lizenzierter Reisebüro-Betrieb",
        description:
          "MerrySails wird von Merry Tourism betrieben, einer Reiseagentur mit TÜRSAB-A-Gruppen-Lizenz — Lizenzierung, Buchungssupport und Gästekommunikation bleiben an einen namentlich genannten Istanbuler Veranstalter gebunden.",
      },
      {
        title: "Bosporus-spezifische Planung",
        description:
          "Sonnenuntergang-, Dinner- und private Yacht-Buchungen folgen unterschiedlicher Zeit-, Einstiegs-, Paket- und Routenlogik, damit Gäste das richtige Produkt wählen können, bevor sie das Team kontaktieren.",
      },
      {
        title: "Sicherheit & klarer Einstieg",
        description:
          "Buchungsseiten und Bestätigungsnachrichten sind die maßgebliche Quelle für genaue Treffpunkte, Leistungen, Zeiten und bootsspezifische Details.",
      },
    ],
  },
  fr: {
    eyebrow: "Fiable & Vérifié",
    headline:
      "Un opérateur du Bosphore licencié TÜRSAB, évalué sur toutes les grandes plateformes",
    lede: "{reviews}+ avis clients vérifiés, plus de {guests} 000 invités depuis {since} et paiement en ligne sécurisé — réservez le même bateau et le même équipage au prix direct de l'opérateur.",
    reviewsLabel: "{reviews}+ avis vérifiés",
    guestsLabel: "Invités depuis {since}",
    licenceLabel: "Licence #{licence} · {years} ans",
    noFeesValue: "Aucun frais caché",
    noFeesLabel: "Prix direct opérateur",
    reviewedOn: "Évalué & vérifié sur",
    securePayment: "Paiement sécurisé",
    badgeReviewedOn: "Évalué sur",
    badgeVerifiedOn: "Vérifié sur",
    badgeLicensedAgency: "Agence licenciée",
    credentials: [
      {
        title: "Exploitation par une agence licenciée",
        description:
          "MerrySails est exploité par Merry Tourism, une agence de voyages licenciée TÜRSAB Groupe A — licence, support de réservation et communication client restent liés à un opérateur stambouliote identifié.",
      },
      {
        title: "Planification propre au Bosphore",
        description:
          "Les réservations coucher de soleil, dîner et yacht privé suivent des logiques d'horaire, d'embarquement, de package et d'itinéraire différentes, afin que les invités choisissent le bon produit avant de contacter l'équipe.",
      },
      {
        title: "Sécurité & clarté d'embarquement",
        description:
          "Les pages de réservation et les messages de confirmation font foi pour les points de rendez-vous exacts, les prestations incluses, les horaires et les détails propres au bateau.",
      },
    ],
  },
  nl: {
    eyebrow: "Vertrouwd & Geverifieerd",
    headline:
      "Een TÜRSAB-gelicentieerde Bosporus-aanbieder, beoordeeld op elk groot platform",
    lede: "{reviews}+ geverifieerde gastbeoordelingen, {guests}.000+ gasten sinds {since} en veilige online betaling — boek dezelfde boot en bemanning tegen de directe aanbiedersprijs.",
    reviewsLabel: "{reviews}+ geverifieerde beoordelingen",
    guestsLabel: "Gasten sinds {since}",
    licenceLabel: "Licentie #{licence} · {years} jaar",
    noFeesValue: "Geen verborgen kosten",
    noFeesLabel: "Directe aanbiedersprijs",
    reviewedOn: "Beoordeeld & geverifieerd op",
    securePayment: "Veilige betaling",
    badgeReviewedOn: "Beoordeeld op",
    badgeVerifiedOn: "Geverifieerd op",
    badgeLicensedAgency: "Gelicentieerd bureau",
    credentials: [
      {
        title: "Gelicentieerd reisbureau",
        description:
          "MerrySails wordt beheerd door Merry Tourism, een reisbureau met TÜRSAB A Groep-licentie — licentie, boekingsondersteuning en gastcommunicatie blijven gekoppeld aan een met naam genoemde Istanbul-aanbieder.",
      },
      {
        title: "Bosporus-specifieke planning",
        description:
          "Zonsondergangs-, diner- en privé jachtboekingen volgen verschillende timing-, inscheep-, pakket- en routelogica, zodat gasten het juiste product kiezen voordat ze het team contacteren.",
      },
      {
        title: "Veiligheid & duidelijk inschepen",
        description:
          "Boekingspagina's en bevestigingsberichten zijn de bron van waarheid voor exacte ontmoetingspunten, inbegrepen onderdelen, timing en vaartuigspecifieke details.",
      },
    ],
  },
  ru: {
    eyebrow: "Надёжно и проверено",
    headline:
      "Лицензированный TÜRSAB оператор Босфора — с отзывами на всех крупных платформах",
    lede: "{reviews}+ проверенных отзывов гостей, более {guests} 000 гостей с {since} года и безопасная онлайн-оплата — забронируйте ту же яхту и команду по прямой цене оператора.",
    reviewsLabel: "{reviews}+ проверенных отзывов",
    guestsLabel: "Гостей с {since} года",
    licenceLabel: "Лицензия #{licence} · {years} лет",
    noFeesValue: "Без скрытых комиссий",
    noFeesLabel: "Прямая цена оператора",
    reviewedOn: "Отзывы и проверка на",
    securePayment: "Безопасная оплата",
    badgeReviewedOn: "Отзывы на",
    badgeVerifiedOn: "Проверено на",
    badgeLicensedAgency: "Лицензированное агентство",
    credentials: [
      {
        title: "Лицензированное турагентство",
        description:
          "MerrySails работает под управлением Merry Tourism — турагентства с лицензией TÜRSAB группы А. Лицензия, поддержка бронирования и общение с гостями привязаны к конкретному стамбульскому оператору.",
      },
      {
        title: "Планирование под Босфор",
        description:
          "Бронирования на закате, ужин-круизы и частные яхты используют разную логику времени, посадки, пакетов и маршрута, чтобы гости выбрали нужный продукт до обращения к команде.",
      },
      {
        title: "Безопасность и ясная посадка",
        description:
          "Страницы бронирования и сообщения-подтверждения — источник истины для точных мест встречи, включённых услуг, времени и деталей по конкретному судну.",
      },
    ],
  },
  zh: {
    eyebrow: "值得信赖 · 已验证",
    headline: "持有 TÜRSAB 许可的博斯普鲁斯运营商,在各大平台均有评价",
    lede: "{reviews}+ 条已验证客人评价,自 {since} 年起接待 {guests},000+ 位客人,安全在线支付 — 以运营方直接价格预订同一艘船和同一支团队。",
    reviewsLabel: "{reviews}+ 条已验证评价",
    guestsLabel: "自 {since} 年起接待的客人",
    licenceLabel: "许可证 #{licence} · {years} 年",
    noFeesValue: "无隐藏费用",
    noFeesLabel: "运营方直接价格",
    reviewedOn: "评价与验证平台",
    securePayment: "安全支付",
    badgeReviewedOn: "评价于",
    badgeVerifiedOn: "验证于",
    badgeLicensedAgency: "持牌旅行社",
    credentials: [
      {
        title: "持牌旅行社运营",
        description:
          "MerrySails 由 Merry Tourism 运营,后者是持有 TÜRSAB A 类许可的旅行社 — 许可、预订支持与客人沟通均由一家具名的伊斯坦布尔运营方负责。",
      },
      {
        title: "博斯普鲁斯专属规划",
        description:
          "日落、晚宴与私人游艇预订采用不同的时间、登船、套餐与航线逻辑,客人可在联系团队前选定合适的产品。",
      },
      {
        title: "安全与登船清晰",
        description:
          "预订页面与确认信息是确切集合点、包含项目、时间及船型专属细节的准确来源。",
      },
    ],
  },
};

function fill(
  template: string,
  vars: { reviews: string; guests: string; since: number; licence: string; years: number },
): string {
  return template
    .replace(/\{reviews\}/g, vars.reviews)
    .replace(/\{guests\}/g, vars.guests)
    .replace(/\{since\}/g, String(vars.since))
    .replace(/\{licence\}/g, vars.licence)
    .replace(/\{years\}/g, String(vars.years));
}

/* ------------------------------------------------------------------ */
/* Verification / review-platform badges                               */
/* Brand-accurate inline SVG (no external logo assets in the repo).    */
/* Each badge is greyscale by default and animates to full colour on   */
/* hover via the `group`/`group-hover` utilities on the wrapper.       */
/* ------------------------------------------------------------------ */

function TripAdvisorBadge() {
  return (
    <svg viewBox="0 0 28 18" className="h-6 w-auto" role="img" aria-label="Tripadvisor">
      <circle cx="9" cy="9" r="7.4" fill="none" stroke="#34E0A1" strokeWidth="1.6" />
      <circle cx="19" cy="9" r="7.4" fill="none" stroke="#34E0A1" strokeWidth="1.6" />
      <circle cx="9" cy="9" r="2.7" fill="#34E0A1" />
      <circle cx="19" cy="9" r="2.7" fill="#34E0A1" />
      <circle cx="14" cy="5.4" r="1.1" fill="#34E0A1" />
    </svg>
  );
}

function GoogleReviewsBadge() {
  return (
    <svg viewBox="0 0 18 18" className="h-5 w-auto" role="img" aria-label="Google Reviews">
      <path
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z"
        fill="#4285F4"
      />
      <path
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.02-3.7H.92v2.33A9 9 0 0 0 9 18z"
        fill="#34A853"
      />
      <path
        d="M3.98 10.72A5.4 5.4 0 0 1 3.7 9c0-.6.1-1.18.28-1.72V4.95H.92A9 9 0 0 0 0 9c0 1.45.35 2.82.92 4.05l3.06-2.33z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .92 4.95l3.06 2.33C4.68 5.16 6.66 3.58 9 3.58z"
        fill="#EA4335"
      />
    </svg>
  );
}

function TrustpilotBadge() {
  return (
    <svg viewBox="0 0 20 19" className="h-5 w-auto" role="img" aria-label="Trustpilot">
      <path
        d="M10 0l2.45 6.18L19 6.4l-5.12 4.06L15.6 17 10 13.3 4.4 17l1.72-6.54L1 6.4l6.55-.22z"
        fill="#00B67A"
      />
    </svg>
  );
}

function TursabBadge() {
  return (
    <svg viewBox="0 0 64 18" className="h-4 w-auto" role="img" aria-label="TÜRSAB licensed">
      <rect x="0" y="2" width="4" height="14" rx="1" fill="#E11D2A" />
      <text
        x="8"
        y="14"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="14"
        fontWeight="800"
        fill="#E11D2A"
        letterSpacing="0.5"
      >
        TÜRSAB
      </text>
    </svg>
  );
}

/* Badge SVG nodes are purely visual (brand logos) — kept at module level.
   Only the surrounding captions/notes translate, inside the component. */
const badgeNodes = [
  { node: <TripAdvisorBadge />, caption: "Tripadvisor", noteKey: "badgeReviewedOn" as const },
  { node: <GoogleReviewsBadge />, caption: "Google Reviews", noteKey: "badgeVerifiedOn" as const },
  { node: <TrustpilotBadge />, caption: "Trustpilot", noteKey: "badgeReviewedOn" as const },
  {
    node: <TursabBadge />,
    caption: `#${PARENT_OPERATOR_STATS.tursabLicenseNumber}`,
    noteKey: "badgeLicensedAgency" as const,
  },
] as const;

const credentialIcons = [ShieldCheck, Compass, LifeBuoy] as const;

interface Props {
  className?: string;
  /** Locale for the label strings. Real stats are always sourced from
   *  trust-evidence.ts regardless of locale. Defaults to "en" so the EN
   *  homepage renders unchanged. */
  locale?: BandLocale;
}

export default function TrustCredentialsBand({ className, locale = "en" }: Props) {
  const s = BAND_STRINGS[locale] ?? BAND_STRINGS.en;

  // Real, truthful stats — same source as the EN homepage.
  const reviewsStr = SATISFACTION_STATS.totalReviewsBlended.toLocaleString("en-US");
  const guestsStr = (PARENT_OPERATOR_STATS.cumulativeGuestsServed / 1000).toFixed(0);
  const fillVars = {
    reviews: reviewsStr,
    guests: guestsStr,
    since: PARENT_OPERATOR_STATS.tursabSinceYear,
    licence: PARENT_OPERATOR_STATS.tursabLicenseNumber,
    years: PARENT_OPERATOR_STATS.tursabYearsActive,
  };

  const aggregateStats = [
    {
      value: `${SATISFACTION_STATS.averageRatingBlended.toFixed(2)}★`,
      label: fill(s.reviewsLabel, fillVars),
    },
    {
      value: `${guestsStr}k+`,
      label: fill(s.guestsLabel, fillVars),
    },
    {
      value: "TÜRSAB A",
      label: fill(s.licenceLabel, fillVars),
    },
    {
      value: s.noFeesValue,
      label: s.noFeesLabel,
    },
  ];

  return (
    <section
      aria-label="Trust, credentials and verification"
      className={cn(
        "bg-gradient-to-b from-[var(--surface-teal)] to-white",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-16">
        <header className="text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--brand-gold)]">
            {s.eyebrow}
          </p>
          <h2 className="mx-auto mt-2 max-w-2xl text-2xl font-bold text-[var(--heading)] md:text-3xl">
            {s.headline}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
            {fill(s.lede, fillVars)}
          </p>
        </header>

        {/* Real aggregate strip */}
        <dl className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] md:grid-cols-4">
          {aggregateStats.map((stat) => (
            <div key={stat.label} className="bg-white px-4 py-5 text-center">
              <dd className="text-xl font-bold text-[var(--brand-primary)] md:text-2xl">
                {stat.value}
              </dd>
              <dt className="mt-1 text-[11px] font-medium uppercase tracking-wide text-[var(--text-muted)]">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>

        {/* Thin divider */}
        <div className="mx-auto mt-10 max-w-4xl border-t border-[var(--line)]" />

        {/* Verification / partner logo row */}
        <p className="mt-8 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
          {s.reviewedOn}
        </p>
        <ul className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {badgeNodes.map((badge) => (
            <li
              key={badge.caption}
              className="group flex min-w-[7.5rem] flex-col items-center gap-2 rounded-2xl border border-[var(--line)] bg-white px-5 py-4 transition-colors hover:border-[var(--brand-primary)]/30"
            >
              <span className="flex h-7 items-center grayscale transition-[filter] duration-300 group-hover:grayscale-0">
                {badge.node}
              </span>
              <span className="text-center text-[10px] font-medium uppercase tracking-wide text-[var(--text-muted)]">
                {s[badge.noteKey]}
                <span className="block font-bold text-[var(--heading)] normal-case tracking-normal">
                  {badge.caption}
                </span>
              </span>
            </li>
          ))}
        </ul>

        {/* Payment + security row — real card / wallet marks + SSL, legible on
            the light band via PaymentTrust's "light" tone. */}
        <p className="mt-9 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
          {s.securePayment}
        </p>
        <div className="mt-4 flex justify-center">
          <PaymentTrust
            tone="light"
            className="justify-center rounded-2xl border border-[var(--line)] bg-white px-5 py-4"
          />
        </div>

        {/* Safety & licensing credentials */}
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {s.credentials.map((item, i) => {
            const Icon = credentialIcons[i] ?? ShieldCheck;
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-[var(--line)] bg-white p-5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--brand-primary)]/10">
                  <Icon className="h-5 w-5 text-[var(--brand-primary)]" />
                </div>
                <h3 className="mt-4 text-sm font-bold text-[var(--heading)]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
