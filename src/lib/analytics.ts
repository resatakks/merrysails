"use client";

import type { MouseEvent } from "react";

type AnalyticsPrimitive = string | number | boolean;
type AnalyticsValue =
  | AnalyticsPrimitive
  | AnalyticsPrimitive[]
  | Record<string, unknown>
  | Array<Record<string, unknown>>;

export type TrafficAttribution = {
  campaign?: string;
  channel: "google_ads" | "paid_search" | "organic_search" | "direct" | "referral" | "social" | "email";
  content?: string;
  gadSource?: string;
  gbraid?: string;
  gclid?: string;
  landingPath: string;
  medium?: string;
  referrerHost?: string;
  source: string;
  term?: string;
  wbraid?: string;
};

/** Server-action-safe attribution payload (string-only fields). */
export type AttributionInput = {
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  gadSource?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  referrerHost?: string;
  landingPath?: string;
  trafficChannel?: string;
};

/**
 * Reads the persisted first-touch attribution from sessionStorage and returns
 * a flat shape ready to attach to a server action input. Returns `null` if
 * called server-side or if nothing has been recorded yet (e.g., user landed
 * directly on the booking modal without a tracked page view — rare).
 */
export function getStoredAttribution(): AttributionInput | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.sessionStorage.getItem(FIRST_ATTRIBUTION_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored) as TrafficAttribution;
    return {
      gadSource: parsed.gadSource,
      gbraid: parsed.gbraid,
      gclid: parsed.gclid,
      landingPath: parsed.landingPath,
      referrerHost: parsed.referrerHost,
      trafficChannel: parsed.channel,
      utmCampaign: parsed.campaign,
      utmContent: parsed.content,
      utmMedium: parsed.medium,
      utmSource: parsed.source,
      utmTerm: parsed.term,
      wbraid: parsed.wbraid,
    };
  } catch {
    return null;
  }
}

export type ContactIntent =
  | "pre_booking"
  | "during_booking"
  | "post_booking"
  | "support";

declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GOOGLE_ADS_CONVERSION_NAMES = {
  abandonment: "abandonment",
  contact: "contact",
  phone: "phone",
  purchase: "purchase",
  whatsapp: "whatsapp",
} as const;

type GoogleAdsConversionKey = keyof typeof GOOGLE_ADS_CONVERSION_NAMES;

const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const GOOGLE_ADS_CONVERSION_LABELS: Record<GoogleAdsConversionKey, string | undefined> = {
  abandonment: process.env.NEXT_PUBLIC_GADS_LABEL_ABANDONMENT,
  contact: process.env.NEXT_PUBLIC_GADS_LABEL_CONTACT,
  phone: process.env.NEXT_PUBLIC_GADS_LABEL_PHONE,
  purchase: process.env.NEXT_PUBLIC_GADS_LABEL_PURCHASE,
  whatsapp: process.env.NEXT_PUBLIC_GADS_LABEL_WHATSAPP,
};

// Default value-per-conversion in TRY for soft conversions (phone/whatsapp/contact/abandonment).
// Override via env to recalibrate Google Ads smart bidding without redeploying logic.
// Recommended formula: AOV × CR(intent → booking). For €100 avg booking ≈ 3500 TRY:
//   phone 15% → 525, whatsapp 10% → 350, form 5% → 175, abandonment 2% recovery → 70.
// Tune up or down based on your actual booking funnel data after 30 days of attribution.
function envNumber(key: string, fallback: number): number {
  const raw = process.env[key];
  if (!raw) return fallback;
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

const CONVERSION_VALUE_CURRENCY = process.env.NEXT_PUBLIC_CONVERSION_VALUE_CURRENCY || "TRY";
const CONVERSION_VALUES = {
  abandonment: envNumber("NEXT_PUBLIC_CONVERSION_VALUE_ABANDONMENT", 250),
  contact: envNumber("NEXT_PUBLIC_CONVERSION_VALUE_CONTACT", 350),
  phone: envNumber("NEXT_PUBLIC_CONVERSION_VALUE_PHONE", 300),
  whatsapp: envNumber("NEXT_PUBLIC_CONVERSION_VALUE_WHATSAPP", 300),
} as const;

// Kill switch: when true, soft conversions (phone/whatsapp/contact/abandonment)
// stop firing as Google Ads conversions. dataLayer push + Clarity tagging
// continue, so GA4/Clarity behavioral data is preserved — only the smart-bidding
// signal is silenced. Use this when soft conversions inflate Ads spend without
// translating into bookings.
const DISABLE_SOFT_ADS_CONVERSIONS =
  process.env.NEXT_PUBLIC_GADS_DISABLE_SOFT_CONVERSIONS === "true";

const SOFT_CONVERSION_NAMES = new Set<GoogleAdsConversionKey>([
  "abandonment",
  "contact",
  "phone",
  "whatsapp",
]);

const CLARITY_EVENT_TAG_KEYS = new Set([
  "click_label",
  "click_location",
  "contact_intent",
  "contact_method",
  "currency",
  "fields_completed",
  "guests",
  "item_name",
  "item_variant",
  "package_name",
  "page_context",
  "page_path",
  "reservation_date",
  "tour_slug",
  "trigger",
  "value",
]);
const FIRST_ATTRIBUTION_KEY = "merrysails:first-attribution";
const ENHANCED_CONVERSIONS_FLAG_KEY = "merrysails:ec-set";

function compactParams(
  params: Record<string, AnalyticsValue | null | undefined>
): Record<string, AnalyticsValue> {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== "")
  ) as Record<string, AnalyticsValue>;
}

function pushToDataLayer(
  eventName: string,
  params: Record<string, AnalyticsValue | null | undefined> = {}
) {
  if (typeof window === "undefined") {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...compactParams(params),
  });
}

function ensureGtag(): ((...args: unknown[]) => void) | null {
  if (typeof window === "undefined") {
    return null;
  }
  if (typeof window.gtag === "function") {
    return window.gtag;
  }
  // GTM container loads gtag.js but does not always expose window.gtag.
  // Provide a thin shim that funnels into the same dataLayer GTM is reading.
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtagShim(...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  return window.gtag;
}

export function trackEvent(
  eventName: string,
  params: Record<string, AnalyticsValue | null | undefined> = {}
) {
  if (typeof window === "undefined") {
    return;
  }

  const cleanedParams = compactParams(params);

  // dataLayer push — GTM picks this up and routes to GA4 / Ads tags.
  // Direct gtag GA4 calls are intentionally NOT used here because GTM has a
  // GA4 Configuration tag on all pages; calling gtag('event', ..., send_to: GA_ID)
  // alongside GTM would double-count events in GA4.
  pushToDataLayer(eventName, cleanedParams);

  if (typeof window.clarity === "function") {
    window.clarity("event", eventName);

    for (const [key, value] of Object.entries(cleanedParams)) {
      if (
        CLARITY_EVENT_TAG_KEYS.has(key) &&
        (typeof value === "string" || typeof value === "number" || typeof value === "boolean")
      ) {
        window.clarity("set", key, String(value));
      }
    }
  }
}

function trackGoogleAdsConversion(
  conversionName: GoogleAdsConversionKey,
  params: Record<string, AnalyticsPrimitive | null | undefined> = {}
) {
  if (typeof window === "undefined") {
    return;
  }

  const cleanedParams = compactParams({
    conversion_name: GOOGLE_ADS_CONVERSION_NAMES[conversionName],
    event_source: "site_data_layer",
    ...params,
  });

  // Keep dataLayer push for backwards-compatible GTM-side tags.
  pushToDataLayer("google_ads_conversion", cleanedParams);

  // Soft conversion kill switch — when enabled, stop sending phone/whatsapp/
  // contact/abandonment conversions to Google Ads. Bidding optimizer then
  // only learns from real bookings (purchase).
  if (
    DISABLE_SOFT_ADS_CONVERSIONS &&
    SOFT_CONVERSION_NAMES.has(conversionName)
  ) {
    return;
  }

  // Direct gtag('event','conversion',...) routing — works without any
  // GTM container configuration as long as both AW id and a label env are set.
  const label = GOOGLE_ADS_CONVERSION_LABELS[conversionName];
  if (!GOOGLE_ADS_ID || !label) {
    if (process.env.NODE_ENV !== "production" && GOOGLE_ADS_ID && !label) {
      console.warn(
        `[analytics] Missing NEXT_PUBLIC_GADS_LABEL_${conversionName.toUpperCase()} — Google Ads conversion '${conversionName}' will not fire via gtag.`
      );
    }
    return;
  }

  const gtag = ensureGtag();
  if (!gtag) {
    return;
  }

  const conversionPayload: Record<string, AnalyticsValue> = {
    send_to: `${GOOGLE_ADS_ID}/${label}`,
    ...cleanedParams,
  };

  // Google Ads expects `transaction_id` for purchase dedupe, value/currency for revenue.
  gtag("event", "conversion", conversionPayload);
}

// --- Enhanced conversions -------------------------------------------------

async function sha256Hex(input: string): Promise<string | undefined> {
  if (typeof window === "undefined" || !window.crypto?.subtle) {
    return undefined;
  }
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  } catch {
    return undefined;
  }
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function normalizePhoneE164(phone: string): string {
  const trimmed = phone.trim();
  if (!trimmed) return "";
  const digits = trimmed.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) {
    return digits;
  }
  // Fallback: if a 10–11 digit Turkish-style number comes in without country code,
  // prefix it. Booking flow uses react-international-phone which already returns +CC.
  return `+${digits.replace(/^0+/, "")}`;
}

function splitName(fullName: string): { first?: string; last?: string } {
  const trimmed = fullName.trim();
  if (!trimmed) return {};
  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) return { first: parts[0].toLowerCase() };
  return {
    first: parts[0].toLowerCase(),
    last: parts.slice(1).join(" ").toLowerCase(),
  };
}

export type EnhancedConversionsInput = {
  email?: string;
  phone?: string;
  name?: string;
};

/**
 * Sets hashed user-provided data for Google Ads enhanced conversions.
 * Call BEFORE the conversion fires, ideally on the same tick.
 * Safe to call multiple times in a session — gtag treats it as set-state.
 */
export async function setEnhancedConversionsUserData(
  input: EnhancedConversionsInput
): Promise<void> {
  if (typeof window === "undefined" || !GOOGLE_ADS_ID) {
    return;
  }

  const userData: Record<string, string> = {};

  if (input.email) {
    const hashed = await sha256Hex(normalizeEmail(input.email));
    if (hashed) userData.sha256_email_address = hashed;
  }

  if (input.phone) {
    const normalized = normalizePhoneE164(input.phone);
    if (normalized) {
      const hashed = await sha256Hex(normalized);
      if (hashed) userData.sha256_phone_number = hashed;
    }
  }

  if (input.name) {
    const { first, last } = splitName(input.name);
    if (first) {
      const hashed = await sha256Hex(first);
      if (hashed) userData.sha256_first_name = hashed;
    }
    if (last) {
      const hashed = await sha256Hex(last);
      if (hashed) userData.sha256_last_name = hashed;
    }
  }

  if (Object.keys(userData).length === 0) {
    return;
  }

  const gtag = ensureGtag();
  if (!gtag) return;

  gtag("set", "user_data", userData);

  try {
    window.sessionStorage.setItem(ENHANCED_CONVERSIONS_FLAG_KEY, "1");
  } catch {
    // ignore quota / privacy mode
  }
}

// --- Traffic attribution --------------------------------------------------

function safeHost(value: string): string | undefined {
  try {
    return new URL(value).hostname.replace(/^www\./, "");
  } catch {
    return undefined;
  }
}

function classifyTraffic(
  searchParams: URLSearchParams,
  referrerHost?: string
): Pick<TrafficAttribution, "channel" | "source"> {
  const source = searchParams.get("utm_source")?.toLowerCase();
  const medium = searchParams.get("utm_medium")?.toLowerCase();
  const hasGoogleClickId =
    searchParams.has("gclid") ||
    searchParams.has("gbraid") ||
    searchParams.has("wbraid") ||
    searchParams.has("gad_source");

  if (
    hasGoogleClickId ||
    (source === "google" && ["cpc", "ppc", "paid", "paid_search"].includes(medium ?? ""))
  ) {
    return { channel: "google_ads", source: "google" };
  }

  if (medium && ["cpc", "ppc", "paid", "paid_search"].includes(medium)) {
    return { channel: "paid_search", source: source ?? "paid" };
  }

  if (medium && ["email", "newsletter"].includes(medium)) {
    return { channel: "email", source: source ?? "email" };
  }

  if (
    medium &&
    ["social", "paid_social"].includes(medium)
  ) {
    return { channel: "social", source: source ?? "social" };
  }

  if (
    referrerHost &&
    /(^|\.)google\.|bing\.com|yahoo\.com|duckduckgo\.com|yandex\./.test(referrerHost)
  ) {
    return { channel: "organic_search", source: referrerHost.includes("google") ? "google" : referrerHost };
  }

  if (referrerHost) {
    return { channel: "referral", source: referrerHost };
  }

  return { channel: "direct", source: "direct" };
}

function getTrafficAttribution(path: string): TrafficAttribution | null {
  if (typeof window === "undefined") {
    return null;
  }

  const url = new URL(window.location.href);
  const referrerHost = safeHost(document.referrer);
  const classified = classifyTraffic(url.searchParams, referrerHost);

  return {
    campaign: url.searchParams.get("utm_campaign") ?? undefined,
    channel: classified.channel,
    content: url.searchParams.get("utm_content") ?? undefined,
    gadSource: url.searchParams.get("gad_source") ?? undefined,
    gbraid: url.searchParams.get("gbraid") ?? undefined,
    gclid: url.searchParams.get("gclid") ?? undefined,
    landingPath: path,
    medium: url.searchParams.get("utm_medium") ?? undefined,
    referrerHost,
    source: url.searchParams.get("utm_source") ?? classified.source,
    term: url.searchParams.get("utm_term") ?? undefined,
    wbraid: url.searchParams.get("wbraid") ?? undefined,
  };
}

function getFirstAttribution(current: TrafficAttribution): TrafficAttribution {
  try {
    const stored = window.sessionStorage.getItem(FIRST_ATTRIBUTION_KEY);
    if (stored) {
      return JSON.parse(stored) as TrafficAttribution;
    }

    window.sessionStorage.setItem(FIRST_ATTRIBUTION_KEY, JSON.stringify(current));
  } catch {
    return current;
  }

  return current;
}

function setClarityTag(key: string, value: string | undefined) {
  if (typeof window.clarity === "function" && value) {
    window.clarity("set", key, value);
  }
}

function setTrafficTags(current: TrafficAttribution) {
  const first = getFirstAttribution(current);

  setClarityTag("traffic_channel", current.channel);
  setClarityTag("traffic_source", current.source);
  setClarityTag("traffic_medium", current.medium);
  setClarityTag("utm_campaign", current.campaign);
  setClarityTag("utm_content", current.content);
  setClarityTag("utm_term", current.term);
  setClarityTag(
    "google_click_id_type",
    current.gclid ? "gclid" : current.gbraid ? "gbraid" : current.wbraid ? "wbraid" : undefined
  );
  setClarityTag("landing_path", current.landingPath);
  setClarityTag("referrer_host", current.referrerHost);
  setClarityTag("first_traffic_channel", first.channel);
  setClarityTag("first_traffic_source", first.source);
  setClarityTag("first_traffic_medium", first.medium);
  setClarityTag("first_utm_campaign", first.campaign);
  setClarityTag("first_landing_path", first.landingPath);
}

export function trackPageView(path: string) {
  const trafficAttribution = getTrafficAttribution(path);

  if (trafficAttribution) {
    setTrafficTags(trafficAttribution);
  }

  if (typeof window === "undefined") {
    return;
  }

  const pageViewParams = {
    page_location: `${window.location.origin}${path}`,
    page_path: path,
    page_title: document.title,
  };

  pushToDataLayer("page_view", pageViewParams);

  if (trafficAttribution) {
    const firstAttribution = getFirstAttribution(trafficAttribution);

    const attributionParams = compactParams({
      first_traffic_channel: firstAttribution.channel,
      first_traffic_source: firstAttribution.source,
      gad_source: trafficAttribution.gadSource,
      gbraid: trafficAttribution.gbraid,
      gclid: trafficAttribution.gclid,
      traffic_channel: trafficAttribution.channel,
      traffic_source: trafficAttribution.source,
      utm_campaign: trafficAttribution.campaign,
      utm_content: trafficAttribution.content,
      utm_medium: trafficAttribution.medium,
      utm_term: trafficAttribution.term,
      wbraid: trafficAttribution.wbraid,
    });

    pushToDataLayer("traffic_attribution", attributionParams);
  }
}

export function trackBeginCheckout(params: {
  currency?: string;
  date?: string;
  guests: number;
  packageName?: string;
  source: string;
  tourName: string;
  tourSlug: string;
  value?: number;
}) {
  trackEvent("begin_checkout", {
    currency: params.currency ?? "EUR",
    guests: params.guests,
    item_name: params.tourName,
    item_variant: params.packageName,
    page_context: params.source,
    reservation_date: params.date,
    tour_slug: params.tourSlug,
    value: params.value,
  });
}

export function trackPurchase(params: {
  addOns?: string[];
  currency?: string;
  customerEmail?: string;
  customerName?: string;
  customerPhone?: string;
  guests: number;
  packageName?: string;
  tourName: string;
  tourSlug: string;
  transactionId: string;
  value: number;
}) {
  // Fire enhanced conversions BEFORE the conversion event so gtag has user_data
  // attached to the same context. Promise is intentionally not awaited so the
  // dataLayer event remains synchronous.
  if (params.customerEmail || params.customerPhone || params.customerName) {
    void setEnhancedConversionsUserData({
      email: params.customerEmail,
      name: params.customerName,
      phone: params.customerPhone,
    });
  }

  trackEvent("purchase", {
    currency: params.currency ?? "EUR",
    items: [
      compactParams({
        item_category: "bosphorus-cruise",
        item_id: params.tourSlug,
        item_name: params.tourName,
        item_variant: params.packageName,
        price: params.value,
        quantity: params.guests,
      }),
    ],
    package_name: params.packageName,
    reservation_add_ons: params.addOns?.join(", "),
    tour_slug: params.tourSlug,
    transaction_id: params.transactionId,
    value: params.value,
  });

  trackGoogleAdsConversion("purchase", {
    currency: params.currency ?? "EUR",
    transaction_id: params.transactionId,
    value: params.value,
  });
}

export function trackContactSubmitSuccess(params: {
  customerEmail?: string;
  customerName?: string;
  pagePath: string;
  subject: string;
}) {
  if (params.customerEmail || params.customerName) {
    void setEnhancedConversionsUserData({
      email: params.customerEmail,
      name: params.customerName,
    });
  }

  const payload = {
    contact_method: "form",
    form_subject: params.subject,
    page_path: params.pagePath,
  };

  trackEvent("contact_submit_success", payload);
  trackEvent("submit_form", payload);
  trackEvent("contact_us", payload);
  trackEvent("generate_lead", payload);
  trackGoogleAdsConversion("contact", {
    currency: CONVERSION_VALUE_CURRENCY,
    value: CONVERSION_VALUES.contact,
  });
}

export function trackBookingAbandonment(params: {
  customerEmail?: string;
  customerPhone?: string;
  fieldsCompleted: string[];
  guests: number;
  packageName?: string;
  source: string;
  tourName: string;
  tourSlug: string;
  trigger: string;
  value: number;
}) {
  if (params.customerEmail || params.customerPhone) {
    void setEnhancedConversionsUserData({
      email: params.customerEmail,
      phone: params.customerPhone,
    });
  }

  trackEvent("booking_abandonment", {
    currency: "EUR",
    fields_completed: params.fieldsCompleted.join(","),
    guests: params.guests,
    item_name: params.tourName,
    item_variant: params.packageName,
    page_context: params.source,
    tour_slug: params.tourSlug,
    trigger: params.trigger,
    value: params.value,
  });

  trackGoogleAdsConversion("abandonment", {
    currency: CONVERSION_VALUE_CURRENCY,
    value: CONVERSION_VALUES.abandonment,
  });
}

export function trackPhoneClick(params: {
  intent?: ContactIntent;
  label: string;
  location: string;
}) {
  const payload = {
    click_label: params.label,
    click_location: params.location,
    contact_intent: params.intent ?? "pre_booking",
    contact_method: "phone",
  };

  trackEvent("phone_click", payload);
  trackEvent("contact_us", payload);

  trackGoogleAdsConversion("phone", {
    contact_intent: params.intent ?? "pre_booking",
    currency: CONVERSION_VALUE_CURRENCY,
    value: CONVERSION_VALUES.phone,
  });
}

export function trackWhatsAppClick(params: {
  intent?: ContactIntent;
  label: string;
  location: string;
}) {
  const payload = {
    click_label: params.label,
    click_location: params.location,
    contact_intent: params.intent ?? "pre_booking",
    contact_method: "whatsapp",
  };

  trackEvent("whatsapp_click", payload);
  trackEvent("contact_us", payload);

  trackGoogleAdsConversion("whatsapp", {
    contact_intent: params.intent ?? "pre_booking",
    currency: CONVERSION_VALUE_CURRENCY,
    value: CONVERSION_VALUES.whatsapp,
  });
}

const CONTACT_NAVIGATION_DELAY_MS = 180;

type ContactNavigationKind = "phone" | "whatsapp";

export function handleTrackedContactNavigation(
  event: MouseEvent<HTMLAnchorElement>,
  params: {
    href: string;
    intent?: ContactIntent;
    kind: ContactNavigationKind;
    label: string;
    location: string;
  }
) {
  if (params.kind === "phone") {
    trackPhoneClick({
      intent: params.intent,
      label: params.label,
      location: params.location,
    });
  } else {
    trackWhatsAppClick({
      intent: params.intent,
      label: params.label,
      location: params.location,
    });
  }

  if (typeof window === "undefined") {
    return;
  }

  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return;
  }

  const href = params.href.trim();
  if (!href.startsWith("tel:") && !href.startsWith("https://wa.me/")) {
    return;
  }

  event.preventDefault();

  window.setTimeout(() => {
    window.location.assign(href);
  }, CONTACT_NAVIGATION_DELAY_MS);
}
