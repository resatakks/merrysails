import {
  GBP_REVIEW_URL,
  PHONE,
  PHONE_DISPLAY,
  SITE_URL,
  WHATSAPP_URL,
} from "@/lib/constants";
import { emailHead, emailLegalFooter, escapeHtml } from "./helpers";

/**
 * Post-trip review + returning-guest cross-sell EMAIL (MerrySails / boat).
 *
 * Sent ~6h after the cruise/tour ends. Goal: a single, well-designed message —
 * satisfaction line + review buttons (Google now; Trustpilot when a profile
 * exists) + a returning-guest 10% discount (WELCOMEBACK10, honored MANUALLY by
 * the operator over WhatsApp) + own-cruise cross-sell + one tasteful sister-brand
 * (Merry Tourism) card + WhatsApp & Call buttons.
 *
 * Channel = EMAIL ONLY. No pre-filled WhatsApp text — the customer writes their
 * own message; the operator matches them by WhatsApp number (= customerPhone).
 */

export const DISCOUNT_CODE = "WELCOMEBACK10";

/** Boat brand locales — derived from customerCountry as the existing cron does. */
export type ReviewLocale = "tr" | "en";

export interface PostTripReviewData {
  customerName: string;
  tourName: string;
  /** Localised, human-readable trip date (already formatted). */
  date: string;
  time: string;
  locale: ReviewLocale;
  /** Google Business Profile write-review URL. */
  googleReviewUrl?: string;
  /** Trustpilot write-review URL — omitted (button hidden) until a profile exists. */
  trustpilotUrl?: string;
}

interface Copy {
  subject: string;
  preheader: string;
  tagline: string;
  badge: string;
  greeting: (name: string) => string;
  tripLine: (tour: string) => string;
  reviewHeading: string;
  reviewSub: string;
  googleBtn: string;
  trustpilotBtn: string;
  discountTitle: string;
  discountBody: string;
  whatsappBtn: string;
  whatsappHelper: string;
  crossSellHeading: string;
  crossSellBody: string;
  cruisesBtn: string;
  sunsetBtn: string;
  dinnerBtn: string;
  sisterHeading: string;
  sisterBody: string;
  sisterBtn: string;
  contactHeading: string;
  callBtn: string;
}

const COPY: Record<ReviewLocale, Copy> = {
  en: {
    subject: "How was your cruise? A little thank-you inside 🌊",
    preheader:
      "Tell us how it went — and enjoy 10% off your next sail with code WELCOMEBACK10.",
    tagline: "Bosphorus Cruises & Yacht Charter",
    badge: "Welcome back ashore",
    greeting: (name) => `Hi ${name},`,
    tripLine: (tour) =>
      `We hope you had a wonderful time on your <strong>${tour}</strong>. It was a pleasure to have you aboard.`,
    reviewHeading: "How was your experience with us?",
    reviewSub:
      "A quick review helps other travellers find us — and means the world to our small crew.",
    googleBtn: "Review on Google",
    trustpilotBtn: "Review on Trustpilot",
    discountTitle: "10% off your next booking",
    discountBody:
      "As a returning guest, here is a little thank-you for your next cruise or charter with us:",
    whatsappBtn: "Message us on WhatsApp",
    whatsappHelper:
      "Just mention code WELCOMEBACK10 in your message — our team will apply your 10%.",
    crossSellHeading: "Sail with us again",
    crossSellBody:
      "Loved being on the water? Here are a couple of guest favourites — your 10% applies to both.",
    cruisesBtn: "Browse all cruises",
    sunsetBtn: "Bosphorus Sunset Cruise",
    dinnerBtn: "Bosphorus Dinner Cruise",
    sisterHeading: "Need an airport transfer or a private tour?",
    sisterBody:
      "Our sister brand Merry Tourism handles VIP airport transfers, private car tours and group tours in Istanbul — and your WELCOMEBACK10 works there too for 10% off.",
    sisterBtn: "Visit Merry Tourism",
    contactHeading: "We are here whenever you need us",
    callBtn: "Call us",
  },
  tr: {
    subject: "Tekne turunuz nasıldı? İçeride küçük bir teşekkür var 🌊",
    preheader:
      "Nasıl geçtiğini bize anlatın — bir sonraki turunuzda WELCOMEBACK10 ile %10 indirim sizi bekliyor.",
    tagline: "Boğaz Turları & Yat Kiralama",
    badge: "Tekrar görüşmek üzere",
    greeting: (name) => `Merhaba ${name},`,
    tripLine: (tour) =>
      `<strong>${tour}</strong> deneyiminizden keyif aldığınızı umuyoruz. Sizi aramızda görmek bizim için bir zevkti.`,
    reviewHeading: "Bizimle deneyiminiz nasıldı?",
    reviewSub:
      "Kısa bir yorum, diğer misafirlerin bizi bulmasına yardımcı olur — ve küçük ekibimiz için çok değerli.",
    googleBtn: "Google'da yorum yap",
    trustpilotBtn: "Trustpilot'ta yorum yap",
    discountTitle: "Bir sonraki rezervasyonunuzda %10 indirim",
    discountBody:
      "Geri dönen misafirimiz olarak, bir sonraki tur veya kiralamanız için küçük bir teşekkür:",
    whatsappBtn: "WhatsApp'tan bize yazın",
    whatsappHelper:
      "Mesajınızda sadece WELCOMEBACK10 kodunu belirtmeniz yeterli — ekibimiz %10 indiriminizi uygular.",
    crossSellHeading: "Tekrar denize açılın",
    crossSellBody:
      "Denizde olmayı sevdiniz mi? İşte misafirlerimizin favorilerinden birkaçı — %10 indiriminiz ikisinde de geçerli.",
    cruisesBtn: "Tüm turlara göz atın",
    sunsetBtn: "Boğaz Gün Batımı Turu",
    dinnerBtn: "Boğaz Akşam Yemeği Turu",
    sisterHeading: "Havalimanı transferi veya özel tur mu lazım?",
    sisterBody:
      "Kardeş markamız Merry Tourism, İstanbul'da VIP havalimanı transferleri, özel araç turları ve grup turları sunuyor — WELCOMEBACK10 kodunuz orada da %10 indirim için geçerli.",
    sisterBtn: "Merry Tourism'i ziyaret et",
    contactHeading: "İhtiyacınız olduğunda buradayız",
    callBtn: "Bizi arayın",
  },
};

function reviewButtonsRow(c: Copy, googleUrl?: string, trustpilotUrl?: string): string {
  const buttons: string[] = [];
  if (trustpilotUrl) {
    buttons.push(
      `<a href="${escapeHtml(trustpilotUrl)}" style="display:inline-block;background:#00b67a;color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:999px;font-weight:700;font-size:14px;margin:0 6px 10px;">${escapeHtml(c.trustpilotBtn)}</a>`
    );
  }
  if (googleUrl) {
    buttons.push(
      `<a href="${escapeHtml(googleUrl)}" style="display:inline-block;background:#4285F4;color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:999px;font-weight:700;font-size:14px;margin:0 6px 10px;">${escapeHtml(c.googleBtn)}</a>`
    );
  }
  return buttons.join("");
}

export function postTripReviewEmail(data: PostTripReviewData): {
  subject: string;
  html: string;
} {
  const c = COPY[data.locale];
  const firstName = (data.customerName?.trim().split(/\s+/)[0] || "there").trim();
  const googleUrl = data.googleReviewUrl ?? GBP_REVIEW_URL;
  const trustpilotUrl = data.trustpilotUrl;
  // EN is served at the SITE ROOT with NO /en/ prefix — the [locale] layout
  // excludes 'en' and notFound()s it. Building /en/... here 404s for every
  // non-TR recipient (the majority). Prefix only the locales that actually
  // render under /<locale>/ (tr). Each path below is verified to resolve to a
  // live page (no notFound, no redirect) for BOTH en-root and the tr prefix:
  //   /cruises                         → src/app/cruises/page.tsx
  //                                      + src/app/[locale]/cruises/page.tsx
  //   /cruises/bosphorus-sunset-cruise → root src/app/cruises/[slug]/page.tsx
  //                                      (in tours, not an OWNER_REDIRECT)
  //                                      + static src/app/[locale]/cruises/
  //                                        bosphorus-sunset-cruise/page.tsx
  //                                        (shadows [slug])
  //   /istanbul-dinner-cruise          → canonical dinner page (NOT
  //                                      /cruises/bosphorus-dinner-cruise,
  //                                      which is an OWNER_REDIRECT → 301 hop);
  //                                      src/app/istanbul-dinner-cruise/page.tsx
  //                                      + src/app/[locale]/istanbul-dinner-cruise/page.tsx
  const url = (path: string) =>
    data.locale === "en" ? `${SITE_URL}${path}` : `${SITE_URL}/${data.locale}${path}`;
  const cruisesUrl = url("/cruises");
  const sunsetUrl = url("/cruises/bosphorus-sunset-cruise");
  const dinnerUrl = url("/istanbul-dinner-cruise");
  const merryTourismUrl = "https://www.merrytourism.com";

  const html = `<!DOCTYPE html>
<html lang="${data.locale}">
${emailHead()}
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(c.preheader)}</div>
  <div style="max-width:600px;margin:0 auto;padding:20px 16px;">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#0f172a 0%,#1b3160 55%,#15284f 100%);border-radius:18px 18px 0 0;padding:26px 22px;">
      <span style="display:block;font-size:24px;font-weight:800;letter-spacing:-0.4px;line-height:1;color:#ffffff;">Merry<span style="color:#7da6ff;">Sails</span></span>
      <span style="display:block;margin-top:6px;font-size:10.5px;letter-spacing:0.18em;text-transform:uppercase;color:#94a3b8;font-weight:600;">${escapeHtml(c.tagline)} &middot; TÜRSAB 14316</span>
      <div style="margin-top:18px;display:inline-block;padding:8px 14px;border-radius:999px;background:rgba(247,181,44,0.14);border:1px solid rgba(247,181,44,0.24);color:#f7b52c;font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;">
        ${escapeHtml(c.badge)}
      </div>
    </div>

    <div style="background:#fff;padding:24px 22px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 18px 18px;">

      <!-- Greeting + trip line -->
      <p style="color:#0f172a;margin:0 0 6px;font-size:16px;font-weight:700;">${escapeHtml(c.greeting(firstName))}</p>
      <p style="color:#334155;margin:0 0 22px;font-size:15px;line-height:1.7;">${c.tripLine(escapeHtml(data.tourName))}</p>

      <!-- Review block -->
      <div style="text-align:center;border-top:1px solid #eef2f7;padding-top:22px;margin-bottom:8px;">
        <p style="color:#0f172a;margin:0 0 6px;font-size:17px;font-weight:800;">${escapeHtml(c.reviewHeading)}</p>
        <p style="color:#64748b;margin:0 0 16px;font-size:13.5px;line-height:1.7;">${escapeHtml(c.reviewSub)}</p>
        <div>${reviewButtonsRow(c, googleUrl, trustpilotUrl)}</div>
      </div>

      <!-- Returning-guest discount card -->
      <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:16px;padding:22px;margin:22px 0;text-align:center;">
        <p style="color:#92400e;margin:0 0 6px;font-size:18px;font-weight:800;">${escapeHtml(c.discountTitle)}</p>
        <p style="color:#92400e;margin:0 0 16px;font-size:13.5px;line-height:1.7;">${escapeHtml(c.discountBody)}</p>
        <div style="display:inline-block;background:#ffffff;border:2px dashed #f59e0b;border-radius:12px;padding:12px 26px;margin:0 0 18px;font-family:'Courier New',Courier,monospace;font-size:22px;font-weight:800;letter-spacing:3px;color:#b45309;">${DISCOUNT_CODE}</div>
        <div>
          <a href="${WHATSAPP_URL}" style="display:inline-block;background:#25D366;color:#ffffff;text-decoration:none;padding:13px 26px;border-radius:999px;font-weight:700;font-size:14px;">${escapeHtml(c.whatsappBtn)}</a>
        </div>
        <p style="color:#92400e;margin:12px 0 0;font-size:12.5px;line-height:1.6;">${escapeHtml(c.whatsappHelper)}</p>
      </div>

      <!-- Cross-sell: own cruise products -->
      <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:16px;padding:20px 22px;margin:22px 0;">
        <p style="color:#0c4a6e;margin:0 0 6px;font-size:16px;font-weight:800;">${escapeHtml(c.crossSellHeading)}</p>
        <p style="color:#0369a1;margin:0 0 16px;font-size:13.5px;line-height:1.7;">${escapeHtml(c.crossSellBody)}</p>
        <div style="text-align:center;">
          <a href="${sunsetUrl}" style="display:inline-block;background:#0ea5e9;color:#ffffff;text-decoration:none;padding:11px 20px;border-radius:999px;font-weight:700;font-size:13px;margin:0 5px 9px;">${escapeHtml(c.sunsetBtn)}</a>
          <a href="${dinnerUrl}" style="display:inline-block;background:#0ea5e9;color:#ffffff;text-decoration:none;padding:11px 20px;border-radius:999px;font-weight:700;font-size:13px;margin:0 5px 9px;">${escapeHtml(c.dinnerBtn)}</a>
          <a href="${cruisesUrl}" style="display:inline-block;background:#ffffff;color:#0369a1;text-decoration:none;padding:11px 20px;border-radius:999px;font-weight:700;font-size:13px;margin:0 5px 9px;border:1px solid #7dd3fc;">${escapeHtml(c.cruisesBtn)}</a>
        </div>
      </div>

      <!-- Sister-brand card (single tasteful private-email cross-brand mention) -->
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:16px;padding:20px 22px;margin:22px 0;">
        <p style="color:#0f172a;margin:0 0 6px;font-size:15px;font-weight:800;">${escapeHtml(c.sisterHeading)}</p>
        <p style="color:#64748b;margin:0 0 14px;font-size:13.5px;line-height:1.7;">${escapeHtml(c.sisterBody)}</p>
        <a href="${merryTourismUrl}" style="display:inline-block;background:#0f172a;color:#ffffff;text-decoration:none;padding:11px 22px;border-radius:999px;font-weight:700;font-size:13px;">${escapeHtml(c.sisterBtn)}</a>
      </div>

      <!-- Contact row -->
      <div style="border-top:1px solid #eef2f7;padding-top:20px;text-align:center;">
        <p style="color:#0f172a;margin:0 0 14px;font-size:14px;font-weight:700;">${escapeHtml(c.contactHeading)}</p>
        <a href="${WHATSAPP_URL}" style="display:inline-block;background:#25D366;color:#ffffff;text-decoration:none;padding:11px 22px;border-radius:999px;font-weight:700;font-size:13px;margin:0 5px 8px;">${escapeHtml(c.whatsappBtn)}</a>
        <a href="tel:${PHONE}" style="display:inline-block;background:#ffffff;color:#0f172a;text-decoration:none;padding:11px 22px;border-radius:999px;font-weight:700;font-size:13px;margin:0 5px 8px;border:1px solid #cbd5e1;">${escapeHtml(c.callBtn)} ${escapeHtml(PHONE_DISPLAY)}</a>
      </div>
    </div>

    <!-- Footer -->
    <div style="padding:16px;text-align:center;">
      ${emailLegalFooter()}
      <p style="color:#94a3b8;font-size:10.5px;margin:8px 0 0;">merrysails.com &middot; info@merrysails.com</p>
    </div>
  </div>
</body>
</html>`;

  return { subject: c.subject, html };
}
