import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { name, email, phone, subject, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Ad, email ve mesaj zorunludur" },
      { status: 400 }
    );
  }

  // In production: send email via Resend, save to database
  const contactSubmission = {
    id: `CONTACT-${Date.now()}`,
    name,
    email,
    phone: phone || null,
    subject: subject || "Genel",
    message,
    createdAt: new Date().toISOString(),
  };

  return NextResponse.json({
    success: true,
    submission: contactSubmission,
    message: "Mesajınız alındı! En kısa sürede size dönüş yapacağız.",
  });
}
