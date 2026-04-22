import {
  getBookingMode,
  getTourBySlug,
  getTourPath,
  isCoreProduct,
  type PriceMode,
} from "@/data/tours";
import { SITE_URL } from "@/lib/constants";
import { getExperienceSupportPageUrl } from "@/lib/experience-support";

export interface BookingAbandonmentNotification {
  source: string;
  trigger: string;
  occurredAt: string;
  pagePath?: string;
  pageUrl?: string;
  tourSlug: string;
  tourName: string;
  date: string;
  time?: string;
  guests: number;
  totalPrice: number;
  currency: string;
  priceMode?: PriceMode;
  packageName?: string;
  addOns: string[];
  departurePoint?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  customerMessage?: string;
  privateTransferRequested?: boolean;
  additionalGuests: string[];
  fieldsCompleted: string[];
}

export interface BookingAbandonmentContext {
  bookingLabel: string;
  pageLabel: string;
  supportGuideUrl: string | null;
  tourPath: string;
  tourUrl: string;
}

function joinSiteUrl(path: string): string {
  if (path.startsWith("http")) {
    return path;
  }

  return `${SITE_URL}${path}`;
}

function sanitizeSingleLine(value: unknown, maxLength: number): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const cleaned = value.replace(/\s+/g, " ").trim().slice(0, maxLength);
  return cleaned || undefined;
}

function sanitizeMultiline(value: unknown, maxLength: number): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const cleaned = value.replace(/\u0000/g, "").trim().slice(0, maxLength);
  return cleaned || undefined;
}

function sanitizeStringArray(
  value: unknown,
  maxItems: number,
  maxItemLength: number
): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((entry) => sanitizeSingleLine(entry, maxItemLength))
    .filter((entry): entry is string => Boolean(entry))
    .slice(0, maxItems);
}

function sanitizePriceMode(value: unknown): PriceMode | undefined {
  if (value === "perPerson" || value === "perGroup" || value === "custom") {
    return value;
  }

  return undefined;
}

function sanitizeGuests(value: unknown): number {
  const parsed = Number.parseInt(String(value ?? ""), 10);

  if (!Number.isFinite(parsed) || parsed < 1) {
    return 1;
  }

  return Math.min(parsed, 50);
}

function sanitizeMoney(value: unknown): number {
  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed < 0) {
    return 0;
  }

  return Number(parsed.toFixed(2));
}

function sanitizeIsoTimestamp(value: unknown): string {
  if (typeof value !== "string") {
    return new Date().toISOString();
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString();
}

function inferFieldProgress(
  input: Pick<
    BookingAbandonmentNotification,
    | "customerName"
    | "customerEmail"
    | "customerPhone"
    | "customerMessage"
    | "packageName"
    | "addOns"
    | "additionalGuests"
    | "privateTransferRequested"
  >
): string[] {
  const filledFields: string[] = [];

  if (input.customerName) filledFields.push("name");
  if (input.customerEmail) filledFields.push("email");
  if (input.customerPhone) filledFields.push("phone");
  if (input.customerMessage) filledFields.push("message");
  if (input.packageName) filledFields.push("package");
  if (input.addOns.length > 0) filledFields.push("add-ons");
  if (input.additionalGuests.length > 0) filledFields.push("additional-guests");
  if (input.privateTransferRequested) filledFields.push("private-transfer");

  return filledFields;
}

export function getBookingAbandonmentContext(
  tourSlug: string
): BookingAbandonmentContext {
  const tour = getTourBySlug(tourSlug);
  const tourPath = tour ? getTourPath(tour) : "/";

  return {
    bookingLabel: tour
      ? getBookingMode(tour) === "quote"
        ? "Quote-led request"
        : "Direct booking page"
      : "Custom request",
    pageLabel: tour
      ? isCoreProduct(tour)
        ? "Core product"
        : "Service page"
      : "Custom request",
    supportGuideUrl: getExperienceSupportPageUrl(tourSlug),
    tourPath,
    tourUrl: joinSiteUrl(tourPath),
  };
}

export function normalizeBookingAbandonmentPhone(value?: string): string {
  return (value ?? "").replace(/[^\d+]/g, "");
}

export function hasBookingAbandonmentContact(
  input: Pick<BookingAbandonmentNotification, "customerEmail" | "customerPhone">
): boolean {
  const phoneDigits = normalizeBookingAbandonmentPhone(input.customerPhone).replace(/\D/g, "");
  return phoneDigits.length >= 7;
}

export function getBookingAbandonmentTriggerLabel(trigger?: string): string {
  switch (trigger) {
    case "close_button":
      return "Close button";
    case "backdrop":
      return "Backdrop click";
    case "beforeunload":
      return "Before unload";
    case "pagehide":
      return "Page hide";
    case "visibilitychange":
      return "Tab hidden";
    case "unmount":
      return "Modal unmount";
    default:
      return "Unknown";
  }
}

export function sanitizeBookingAbandonmentPayload(
  input: unknown
): BookingAbandonmentNotification | null {
  if (!input || typeof input !== "object") {
    return null;
  }

  const raw = input as Record<string, unknown>;
  const tourSlug = sanitizeSingleLine(raw.tourSlug, 120);

  if (!tourSlug) {
    return null;
  }

  const tour = getTourBySlug(tourSlug);
  const pagePath = sanitizeSingleLine(raw.pagePath, 240);
  const resolvedPagePath = pagePath ?? (tour ? getTourPath(tour) : undefined);
  const customerName = sanitizeSingleLine(raw.customerName, 120);
  const customerEmail = sanitizeSingleLine(raw.customerEmail, 160)?.toLowerCase();
  const customerPhone = sanitizeSingleLine(raw.customerPhone, 40);
  const customerMessage = sanitizeMultiline(raw.customerMessage, 1200);
  const addOns = sanitizeStringArray(raw.addOns, 20, 120);
  const additionalGuests = sanitizeStringArray(raw.additionalGuests, 24, 120);
  const privateTransferRequested = Boolean(raw.privateTransferRequested);

  const payload: BookingAbandonmentNotification = {
    source: sanitizeSingleLine(raw.source, 80) ?? "booking_modal",
    trigger: sanitizeSingleLine(raw.trigger, 80) ?? "unknown",
    occurredAt: sanitizeIsoTimestamp(raw.occurredAt),
    pagePath: resolvedPagePath,
    pageUrl:
      sanitizeSingleLine(raw.pageUrl, 500) ??
      (resolvedPagePath ? joinSiteUrl(resolvedPagePath) : undefined),
    tourSlug,
    tourName:
      sanitizeSingleLine(raw.tourName, 160) ?? tour?.nameEn ?? "Booking request",
    date: sanitizeSingleLine(raw.date, 120) ?? "Date not selected",
    time: sanitizeSingleLine(raw.time, 80),
    guests: sanitizeGuests(raw.guests),
    totalPrice: sanitizeMoney(raw.totalPrice),
    currency: sanitizeSingleLine(raw.currency, 8)?.toUpperCase() ?? "EUR",
    priceMode: sanitizePriceMode(raw.priceMode),
    packageName: sanitizeSingleLine(raw.packageName, 160),
    addOns,
    departurePoint: sanitizeSingleLine(raw.departurePoint, 240),
    customerName,
    customerEmail,
    customerPhone,
    customerMessage,
    privateTransferRequested,
    additionalGuests,
    fieldsCompleted: sanitizeStringArray(raw.fieldsCompleted, 20, 40),
  };

  if (payload.fieldsCompleted.length === 0) {
    payload.fieldsCompleted = inferFieldProgress(payload);
  }

  return payload;
}
