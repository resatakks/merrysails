import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { tourSlug, date, guests, name, email, phone, hotel, notes, transfer } = body;

  if (!tourSlug || !date || !guests || !name || !email || !phone) {
    return NextResponse.json(
      { error: "Zorunlu alanlar eksik" },
      { status: 400 }
    );
  }

  const bookingId = `MS-2026-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  // In production: save to database, send confirmation email, create payment intent
  const booking = {
    id: bookingId,
    tourSlug,
    date,
    guests,
    name,
    email,
    phone,
    hotel: hotel || null,
    notes: notes || null,
    transfer: transfer || false,
    status: "confirmed",
    createdAt: new Date().toISOString(),
  };

  return NextResponse.json({
    success: true,
    booking,
    message: "Rezervasyonunuz başarıyla oluşturuldu!",
  });
}
