import { NextRequest, NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { sendEmail } from "@/lib/email";
import { leadAutoresponderEmail } from "@/lib/email-templates/lead-autoresponder";
import { notifyGoogleAdsLead } from "@/lib/telegram/notifications";

export const runtime = "nodejs";

type LeadPayload = Record<string, unknown>;

function stringValue(value: unknown): string | null {
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed || null;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  return null;
}

function normalizeKey(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function extractField(payload: LeadPayload, wantedKeys: string[]) {
  const normalizedWanted = new Set(wantedKeys.map(normalizeKey));
  const userData = payload.user_column_data ?? payload.userColumnData;

  if (Array.isArray(userData)) {
    for (const item of userData) {
      if (!item || typeof item !== "object") continue;
      const row = item as Record<string, unknown>;
      const keys = [
        stringValue(row.column_id),
        stringValue(row.columnId),
        stringValue(row.column_name),
        stringValue(row.columnName),
      ].filter(Boolean) as string[];

      if (keys.some((key) => normalizedWanted.has(normalizeKey(key)))) {
        return (
          stringValue(row.string_value) ??
          stringValue(row.stringValue) ??
          stringValue(row.value)
        );
      }
    }
  }

  for (const [key, value] of Object.entries(payload)) {
    if (normalizedWanted.has(normalizeKey(key))) {
      return stringValue(value);
    }
  }

  return null;
}

function inferProduct(payload: LeadPayload, campaignName?: string | null) {
  const values = [
    campaignName,
    stringValue(payload.form_id),
    stringValue(payload.formId),
    stringValue(payload.form_name),
    stringValue(payload.formName),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (values.includes("sunset")) return "Sunset Cruise";
  if (values.includes("dinner")) return "Dinner Cruise";
  if (values.includes("pmax")) return "MerrySails Cruise";
  return "MerrySails";
}

function verifyGoogleKey(payload: LeadPayload) {
  const expected = process.env.GOOGLE_ADS_LEAD_FORM_SECRET?.trim();

  if (!expected) {
    return process.env.NODE_ENV !== "production";
  }

  const provided =
    stringValue(payload.google_key) ??
    stringValue(payload.googleKey) ??
    stringValue(payload.google_secret) ??
    stringValue(payload.googleSecret);

  return provided === expected;
}

export async function POST(request: NextRequest) {
  let payload: LeadPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  if (!verifyGoogleKey(payload)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const googleLeadId =
    stringValue(payload.lead_id) ??
    stringValue(payload.leadId) ??
    stringValue(payload.id);
  const campaignName =
    stringValue(payload.campaign_name) ?? stringValue(payload.campaignName);
  const product = inferProduct(payload, campaignName);
  const name = extractField(payload, ["FULL_NAME", "full name", "name"]);
  const phone = extractField(payload, ["PHONE_NUMBER", "phone number", "phone"]);
  const email = extractField(payload, ["EMAIL", "email"]);
  const gclid = extractField(payload, ["gcl_id", "gclid", "GCLID", "google_click_id"]);
  const isTest =
    payload.is_test === true ||
    payload.isTest === true ||
    stringValue(payload.is_test) === "true" ||
    stringValue(payload.isTest) === "true";

  const rawPayload = JSON.parse(JSON.stringify(payload)) as Prisma.InputJsonValue;
  const data = {
    googleLeadId,
    formId: stringValue(payload.form_id) ?? stringValue(payload.formId),
    campaignId: stringValue(payload.campaign_id) ?? stringValue(payload.campaignId),
    campaignName,
    product,
    name,
    phone,
    email,
    gclid,
    isTest,
    rawPayload,
  };

  const lead = googleLeadId
    ? await prisma.googleAdsLead.upsert({
        where: { googleLeadId },
        create: data,
        update: data,
      })
    : await prisma.googleAdsLead.create({ data });

  // Telegram notification (internal)
  try {
    await notifyGoogleAdsLead(lead);
  } catch (error) {
    console.error("Failed to send Google Ads lead Telegram notification:", error);
  }

  // Customer autoresponder — only if we have a real email and this is not a test ping.
  if (email && !isTest && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    try {
      await sendEmail({
        to: email,
        subject: `We received your MerrySails inquiry — we will reach out shortly`,
        html: leadAutoresponderEmail({ customerName: name, product }),
      });
    } catch (autoresponderErr) {
      console.error("Failed to send lead autoresponder:", autoresponderErr);
    }
  }

  return NextResponse.json({ success: true });
}
