import type { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createBookingPrefillPayload } from "@/lib/booking-prefill";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      tourSlug?: string;
      packageName?: string;
      date?: string;
      guests?: number;
      time?: string;
      source?: string;
    };

    if (!body?.tourSlug?.trim()) {
      return NextResponse.json(
        { success: false, error: "Missing tour slug." },
        { status: 400 }
      );
    }

    const payload = createBookingPrefillPayload({
      packageName: body.packageName,
      date: body.date,
      guests: body.guests,
      time: body.time,
      source: body.source,
    });

    const prefill = await prisma.bookingPrefill.create({
      data: {
        tourSlug: body.tourSlug.trim(),
        payload: payload as Prisma.InputJsonValue,
        source: payload.source ?? null,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      },
      select: { id: true },
    });

    return NextResponse.json({ success: true, id: prefill.id }, { status: 200 });
  } catch (error) {
    console.error("Failed to create booking prefill:", error);
    return NextResponse.json(
      { success: false, error: "Could not create booking prefill." },
      { status: 500 }
    );
  }
}

export const runtime = "nodejs";
