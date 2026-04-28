/**
 * Server-side Google Ads conversion uploader.
 *
 * Uploads offline conversions back to Google Ads using the gclid that was
 * captured at booking time. Catches the gap that client-side gtag misses
 * (ad blockers, cookie wipes, broken JavaScript).
 *
 * Required env vars (all production-only — leave blank to disable cleanly):
 *   GOOGLE_ADS_DEVELOPER_TOKEN              — from Google Ads → Tools → API Center
 *   GOOGLE_ADS_CUSTOMER_ID                  — numeric, no dashes (e.g. 1234567890)
 *   GOOGLE_ADS_LOGIN_CUSTOMER_ID            — MCC manager ID, optional
 *   GOOGLE_ADS_CLIENT_ID                    — OAuth client (Google Cloud Console)
 *   GOOGLE_ADS_CLIENT_SECRET                — OAuth client secret
 *   GOOGLE_ADS_REFRESH_TOKEN                — generated via OAuth Playground once
 *   GOOGLE_ADS_PURCHASE_CONVERSION_ACTION_ID — numeric ID (NOT label) of Purchase action
 *
 * If any required field is missing, this module silently no-ops and logs a
 * warning at runtime. The booking flow always succeeds even if upload fails.
 */

const GOOGLE_ADS_API_VERSION = "v20";

interface UploadConversionInput {
  gclid: string;
  /** ISO date when the booking was confirmed (or created). */
  conversionDateTime: Date;
  /** Booking value in EUR/TRY/etc. — must be > 0. */
  value: number;
  currency: string;
  /** Reservation ID for Google Ads dedupe (orderId). */
  orderId: string;
  /** Optional: hashed user_data for enhanced conversion match (sha256 lower). */
  userIdentifiers?: {
    sha256_email?: string;
    sha256_phone?: string;
  };
}

type UploadResult =
  | { ok: true; receivedConversions: number }
  | { ok: false; reason: string; details?: unknown };

function readEnv() {
  return {
    customerId: process.env.GOOGLE_ADS_CUSTOMER_ID?.replace(/-/g, "").trim(),
    developerToken: process.env.GOOGLE_ADS_DEVELOPER_TOKEN?.trim(),
    refreshToken: process.env.GOOGLE_ADS_REFRESH_TOKEN?.trim(),
    clientId: process.env.GOOGLE_ADS_CLIENT_ID?.trim(),
    clientSecret: process.env.GOOGLE_ADS_CLIENT_SECRET?.trim(),
    conversionActionId: process.env.GOOGLE_ADS_PURCHASE_CONVERSION_ACTION_ID?.trim(),
    loginCustomerId: process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID?.replace(/-/g, "").trim(),
  };
}

function isConfigured(env: ReturnType<typeof readEnv>): boolean {
  return Boolean(
    env.customerId &&
      env.developerToken &&
      env.refreshToken &&
      env.clientId &&
      env.clientSecret &&
      env.conversionActionId
  );
}

async function getAccessToken(env: ReturnType<typeof readEnv>): Promise<string> {
  const params = new URLSearchParams({
    client_id: env.clientId!,
    client_secret: env.clientSecret!,
    refresh_token: env.refreshToken!,
    grant_type: "refresh_token",
  });

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  if (!res.ok) {
    throw new Error(`OAuth token exchange failed: ${res.status} ${await res.text()}`);
  }

  const data = (await res.json()) as { access_token?: string };
  if (!data.access_token) {
    throw new Error("OAuth token response missing access_token");
  }
  return data.access_token;
}

/**
 * Format a Date as "yyyy-MM-dd HH:mm:ss+TZ" (Google Ads requirement).
 * Uses Europe/Istanbul as the operations timezone.
 */
function formatGoogleAdsDateTime(date: Date): string {
  const tz = "Europe/Istanbul";
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const lookup = (type: string) => parts.find((p) => p.type === type)?.value ?? "00";
  const yyyy = lookup("year");
  const mm = lookup("month");
  const dd = lookup("day");
  const hh = lookup("hour") === "24" ? "00" : lookup("hour");
  const mi = lookup("minute");
  const ss = lookup("second");

  // Compute offset for the target timezone via the same date.
  const offsetParts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    timeZoneName: "shortOffset",
  })
    .formatToParts(date)
    .find((p) => p.type === "timeZoneName")?.value ?? "GMT+03:00";
  const offsetMatch = offsetParts.match(/([+-]\d{1,2})(?::?(\d{2}))?/);
  const offsetHours = offsetMatch ? offsetMatch[1].padStart(3, offsetMatch[1].startsWith("-") ? "-0" : "+0") : "+03";
  const offsetMinutes = offsetMatch?.[2] ?? "00";
  const tzOffset = `${offsetHours}:${offsetMinutes}`;

  return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}${tzOffset}`;
}

export async function uploadPurchaseConversion(
  input: UploadConversionInput
): Promise<UploadResult> {
  const env = readEnv();

  if (!isConfigured(env)) {
    if (process.env.NODE_ENV === "production") {
      console.warn(
        "[google-ads] Server-side conversion upload skipped — missing OAuth/credential env vars."
      );
    }
    return { ok: false, reason: "not_configured" };
  }

  if (!input.gclid) {
    return { ok: false, reason: "missing_gclid" };
  }
  if (!Number.isFinite(input.value) || input.value <= 0) {
    return { ok: false, reason: "invalid_value" };
  }

  let accessToken: string;
  try {
    accessToken = await getAccessToken(env);
  } catch (err) {
    console.error("[google-ads] OAuth token failed:", err);
    return { ok: false, reason: "oauth_failed", details: String(err) };
  }

  const url = `https://googleads.googleapis.com/${GOOGLE_ADS_API_VERSION}/customers/${env.customerId}:uploadClickConversions`;

  const conversion: Record<string, unknown> = {
    conversionAction: `customers/${env.customerId}/conversionActions/${env.conversionActionId}`,
    conversionDateTime: formatGoogleAdsDateTime(input.conversionDateTime),
    conversionValue: input.value,
    currencyCode: input.currency,
    gclid: input.gclid,
    orderId: input.orderId,
  };

  if (input.userIdentifiers?.sha256_email || input.userIdentifiers?.sha256_phone) {
    const userIdentifiers: Array<Record<string, string>> = [];
    if (input.userIdentifiers.sha256_email) {
      userIdentifiers.push({ hashedEmail: input.userIdentifiers.sha256_email });
    }
    if (input.userIdentifiers.sha256_phone) {
      userIdentifiers.push({ hashedPhoneNumber: input.userIdentifiers.sha256_phone });
    }
    conversion.userIdentifiers = userIdentifiers;
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${accessToken}`,
    "developer-token": env.developerToken!,
    "Content-Type": "application/json",
  };
  if (env.loginCustomerId) {
    headers["login-customer-id"] = env.loginCustomerId;
  }

  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      conversions: [conversion],
      partialFailure: true,
    }),
  });

  const responseBody = await res.json().catch(() => ({}));

  if (!res.ok) {
    console.error("[google-ads] Upload conversion failed:", res.status, responseBody);
    return { ok: false, reason: `http_${res.status}`, details: responseBody };
  }

  type GoogleAdsResponse = {
    results?: unknown[];
    partialFailureError?: { message?: string };
  };
  const body = responseBody as GoogleAdsResponse;
  if (body.partialFailureError?.message) {
    console.warn("[google-ads] Partial failure:", body.partialFailureError.message);
  }

  return { ok: true, receivedConversions: body.results?.length ?? 0 };
}

async function sha256HexNode(input: string): Promise<string> {
  const { createHash } = await import("node:crypto");
  return createHash("sha256").update(input).digest("hex");
}

export async function hashUserIdentifiersServer(input: {
  email?: string;
  phone?: string;
}): Promise<{ sha256_email?: string; sha256_phone?: string }> {
  const out: { sha256_email?: string; sha256_phone?: string } = {};
  if (input.email) {
    out.sha256_email = await sha256HexNode(input.email.trim().toLowerCase());
  }
  if (input.phone) {
    const digits = input.phone.trim().replace(/[^\d+]/g, "");
    const normalized = digits.startsWith("+") ? digits : `+${digits.replace(/^0+/, "")}`;
    if (normalized.length > 1) {
      out.sha256_phone = await sha256HexNode(normalized);
    }
  }
  return out;
}
