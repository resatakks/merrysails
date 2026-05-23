/**
 * Meta Conversions API (CAPI) — server-side event sender for MerrySails.
 *
 * Why CAPI:
 *   iOS 14+ ATT + ad blockers cause Pixel-only loss of 30-60% conversions.
 *   CAPI recovers 60-75% of that lost signal by sending events server-to-server.
 *   Meta dedups Pixel + CAPI events sharing the same `event_id`, so we send BOTH.
 *
 * Env required (silently no-op if missing — never breaks deploy):
 *   META_CAPI_ACCESS_TOKEN    — System User permanent token (server-only secret)
 *   NEXT_PUBLIC_META_PIXEL_ID — Pixel/Dataset ID (16 digits)
 * Optional:
 *   META_CAPI_TEST_EVENT_CODE — set in Events Manager Test Events tab to dry-run
 *
 * Imported pattern from kingsworldtransfer/src/lib/meta-capi.ts.
 * Docs: https://developers.facebook.com/docs/marketing-api/conversions-api
 */

import crypto from "node:crypto";

const GRAPH_VERSION = "v22.0";

type CapiEventName =
  | "PageView"
  | "ViewContent"
  | "Search"
  | "Lead"
  | "InitiateCheckout"
  | "AddToCart"
  | "Contact"
  | "Schedule"
  | "SubmitApplication"
  | "Purchase";

export interface CapiUserData {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  country?: string;
  zip?: string;
  externalId?: string;
  fbp?: string; // _fbp cookie (browser id)
  fbc?: string; // _fbc cookie (click id)
  clientIpAddress?: string;
  clientUserAgent?: string;
}

export interface CapiCustomData {
  currency?: string;
  value?: number;
  contentName?: string;
  contentCategory?: string;
  contentIds?: string[];
  contentType?: string;
  numItems?: number;
  predictedLtv?: number;
  status?: string;
  searchString?: string;
  orderId?: string;
}

export interface CapiEvent {
  eventName: CapiEventName;
  eventTime?: number;
  eventId?: string; // dedup key — MUST match the Pixel event_id
  eventSourceUrl?: string;
  actionSource?:
    | "website"
    | "email"
    | "app"
    | "phone_call"
    | "chat"
    | "physical_store"
    | "system_generated"
    | "other";
  userData: CapiUserData;
  customData?: CapiCustomData;
}

/** SHA-256 + lowercase + trim. Required for all PII in CAPI. */
function hash(value: string | undefined): string | undefined {
  if (!value) return undefined;
  return crypto.createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

/** Normalize phone to E.164 digits-only (strip +, spaces, dashes) before hashing. */
function normalizePhone(phone: string | undefined): string | undefined {
  if (!phone) return undefined;
  return phone.replace(/[^\d]/g, "");
}

function buildUserData(u: CapiUserData): Record<string, unknown> {
  const ud: Record<string, unknown> = {};
  if (u.email) ud.em = [hash(u.email)];
  if (u.phone) ud.ph = [hash(normalizePhone(u.phone))];
  if (u.firstName) ud.fn = [hash(u.firstName)];
  if (u.lastName) ud.ln = [hash(u.lastName)];
  if (u.city) ud.ct = [hash(u.city)];
  if (u.country) ud.country = [hash(u.country)];
  if (u.zip) ud.zp = [hash(u.zip)];
  if (u.externalId) ud.external_id = [hash(u.externalId)];
  if (u.fbp) ud.fbp = u.fbp; // never hashed
  if (u.fbc) ud.fbc = u.fbc; // never hashed
  if (u.clientIpAddress) ud.client_ip_address = u.clientIpAddress;
  if (u.clientUserAgent) ud.client_user_agent = u.clientUserAgent;
  return ud;
}

function buildCustomData(c?: CapiCustomData): Record<string, unknown> | undefined {
  if (!c) return undefined;
  const cd: Record<string, unknown> = {};
  if (c.currency) cd.currency = c.currency;
  if (typeof c.value === "number") cd.value = c.value;
  if (c.contentName) cd.content_name = c.contentName;
  if (c.contentCategory) cd.content_category = c.contentCategory;
  if (c.contentIds) cd.content_ids = c.contentIds;
  if (c.contentType) cd.content_type = c.contentType;
  if (typeof c.numItems === "number") cd.num_items = c.numItems;
  if (typeof c.predictedLtv === "number") cd.predicted_ltv = c.predictedLtv;
  if (c.status) cd.status = c.status;
  if (c.searchString) cd.search_string = c.searchString;
  if (c.orderId) cd.order_id = c.orderId;
  return Object.keys(cd).length ? cd : undefined;
}

export interface CapiSendResult {
  ok: boolean;
  status?: number;
  eventsReceived?: number;
  fbtraceId?: string;
  error?: string;
  skipped?: boolean;
  reason?: string;
}

/**
 * Send one or more events to Meta CAPI.
 * Silently no-op (returns { ok: true, skipped: true }) if env vars are missing,
 * so unconfigured deploys never throw.
 */
export async function sendCapiEvents(events: CapiEvent[]): Promise<CapiSendResult> {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  const testEventCode = process.env.META_CAPI_TEST_EVENT_CODE;

  if (!pixelId || !accessToken) {
    return { ok: true, skipped: true, reason: "META env not configured" };
  }
  if (!events.length) {
    return { ok: true, skipped: true, reason: "no events" };
  }

  const data = events.map((e) => ({
    event_name: e.eventName,
    event_time: e.eventTime ?? Math.floor(Date.now() / 1000),
    event_id: e.eventId,
    event_source_url: e.eventSourceUrl,
    action_source: e.actionSource ?? "website",
    user_data: buildUserData(e.userData),
    custom_data: buildCustomData(e.customData),
  }));

  const body: Record<string, unknown> = { data };
  if (testEventCode) body.test_event_code = testEventCode;

  const url = `https://graph.facebook.com/${GRAPH_VERSION}/${pixelId}/events?access_token=${encodeURIComponent(accessToken)}`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const json = (await res.json().catch(() => ({}))) as Record<string, unknown>;

    if (!res.ok) {
      return {
        ok: false,
        status: res.status,
        error:
          typeof json.error === "object" && json.error !== null
            ? JSON.stringify(json.error)
            : `HTTP ${res.status}`,
        fbtraceId: typeof json.fbtrace_id === "string" ? json.fbtrace_id : undefined,
      };
    }
    return {
      ok: true,
      status: res.status,
      eventsReceived: typeof json.events_received === "number" ? json.events_received : undefined,
      fbtraceId: typeof json.fbtrace_id === "string" ? json.fbtrace_id : undefined,
    };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

/** Convenience for a single event. */
export async function sendCapiEvent(event: CapiEvent): Promise<CapiSendResult> {
  return sendCapiEvents([event]);
}
