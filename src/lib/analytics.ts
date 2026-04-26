"use client";

import type { MouseEvent } from "react";

type AnalyticsPrimitive = string | number | boolean;
type AnalyticsValue =
  | AnalyticsPrimitive
  | AnalyticsPrimitive[]
  | Record<string, unknown>
  | Array<Record<string, unknown>>;

type TrafficAttribution = {
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

declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const GOOGLE_ADS_CONVERSION_NAMES = {
  abandonment: "abandonment",
  contact: "contact",
  phone: "phone",
  purchase: "purchase",
  whatsapp: "whatsapp",
} as const;
const CLARITY_EVENT_TAG_KEYS = new Set([
  "click_label",
  "click_location",
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

export function trackEvent(
  eventName: string,
  params: Record<string, AnalyticsValue | null | undefined> = {}
) {
  if (typeof window === "undefined") {
    return;
  }

  const cleanedParams = compactParams(params);

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
  conversionName: keyof typeof GOOGLE_ADS_CONVERSION_NAMES,
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

  pushToDataLayer("google_ads_conversion", cleanedParams);
}

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
  guests: number;
  packageName?: string;
  tourName: string;
  tourSlug: string;
  transactionId: string;
  value: number;
}) {
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
  pagePath: string;
  subject: string;
}) {
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
    currency: "TRY",
    value: 350,
  });
}

export function trackBookingAbandonment(params: {
  fieldsCompleted: string[];
  guests: number;
  packageName?: string;
  source: string;
  tourName: string;
  tourSlug: string;
  trigger: string;
  value: number;
}) {
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
    currency: "TRY",
    value: 250,
  });
}

export function trackPhoneClick(params: {
  label: string;
  location: string;
}) {
  const payload = {
    click_label: params.label,
    click_location: params.location,
    contact_method: "phone",
  };

  trackEvent("phone_click", payload);
  trackEvent("contact_us", payload);

  trackGoogleAdsConversion("phone", {
    currency: "TRY",
    value: 300,
  });
}

export function trackWhatsAppClick(params: {
  label: string;
  location: string;
}) {
  const payload = {
    click_label: params.label,
    click_location: params.location,
    contact_method: "whatsapp",
  };

  trackEvent("whatsapp_click", payload);
  trackEvent("contact_us", payload);

  trackGoogleAdsConversion("whatsapp", {
    currency: "TRY",
    value: 300,
  });
}

const CONTACT_NAVIGATION_DELAY_MS = 180;

type ContactNavigationKind = "phone" | "whatsapp";

export function handleTrackedContactNavigation(
  event: MouseEvent<HTMLAnchorElement>,
  params: {
    href: string;
    kind: ContactNavigationKind;
    label: string;
    location: string;
  }
) {
  if (params.kind === "phone") {
    trackPhoneClick({
      label: params.label,
      location: params.location,
    });
  } else {
    trackWhatsAppClick({
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
