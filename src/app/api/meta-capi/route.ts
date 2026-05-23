/**
 * POST /api/meta-capi
 *
 * Receives a Pixel event mirror from the browser and forwards it to Meta's
 * Conversions API server-to-server. The Pixel event_id and this CAPI event_id
 * are identical so Meta dedups them as a single conversion.
 *
 * Body shape (from src/lib/meta-pixel.ts):
 *   {
 *     eventName: 'Lead' | 'Purchase' | 'InitiateCheckout' | ...,
 *     eventId: string,
 *     eventSourceUrl: string,
 *     params: { currency?, value?, content_name?, ... },
 *     userData: { email?, phone?, firstName?, lastName?, externalId?, fbp?, fbc? }
 *   }
 *
 * Response: { ok: boolean, ...CapiSendResult }
 *
 * Silently no-ops with 200 if env vars missing — never blocks the user flow.
 */

import { NextRequest, NextResponse } from "next/server";
import { sendCapiEvent } from "@/lib/meta-capi";

export const runtime = "nodejs"; // crypto module
export const dynamic = "force-dynamic";

interface IncomingPayload {
  eventName: string;
  eventId?: string;
  eventSourceUrl?: string;
  params?: {
    currency?: string;
    value?: number;
    content_name?: string;
    content_category?: string;
    content_ids?: string[];
    content_type?: string;
    num_items?: number;
    predicted_ltv?: number;
    status?: string;
    search_string?: string;
    order_id?: string;
  };
  userData?: {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    externalId?: string;
    fbp?: string;
    fbc?: string;
  };
}

const ALLOWED_EVENTS = new Set([
  "PageView",
  "ViewContent",
  "Search",
  "Lead",
  "InitiateCheckout",
  "AddToCart",
  "Contact",
  "Schedule",
  "SubmitApplication",
  "Purchase",
]);

function getClientIp(req: NextRequest): string | undefined {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const xri = req.headers.get("x-real-ip");
  if (xri) return xri.trim();
  return undefined;
}

export async function POST(req: NextRequest) {
  let payload: IncomingPayload;
  try {
    payload = (await req.json()) as IncomingPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  if (!payload?.eventName || !ALLOWED_EVENTS.has(payload.eventName)) {
    return NextResponse.json({ ok: false, error: "invalid_event_name" }, { status: 400 });
  }

  const ud = payload.userData ?? {};

  const result = await sendCapiEvent({
    eventName: payload.eventName as Parameters<typeof sendCapiEvent>[0]["eventName"],
    eventId: payload.eventId,
    eventSourceUrl: payload.eventSourceUrl,
    actionSource: "website",
    userData: {
      email: ud.email,
      phone: ud.phone,
      firstName: ud.firstName,
      lastName: ud.lastName,
      externalId: ud.externalId,
      fbp: ud.fbp,
      fbc: ud.fbc,
      clientIpAddress: getClientIp(req),
      clientUserAgent: req.headers.get("user-agent") ?? undefined,
    },
    customData: payload.params,
  });

  return NextResponse.json(result, { status: 200 });
}

export async function GET() {
  // Health check — does NOT prove auth, just that the route is mounted
  // and env keys are present. Full auth verifies via test event in Events Manager.
  const configured = Boolean(
    process.env.NEXT_PUBLIC_META_PIXEL_ID && process.env.META_CAPI_ACCESS_TOKEN,
  );
  return NextResponse.json({
    ok: true,
    configured,
    pixelIdPresent: Boolean(process.env.NEXT_PUBLIC_META_PIXEL_ID),
    accessTokenPresent: Boolean(process.env.META_CAPI_ACCESS_TOKEN),
    testEventCodePresent: Boolean(process.env.META_CAPI_TEST_EVENT_CODE),
  });
}
