import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { email } = body;

  if (!email) {
    return NextResponse.json(
      { error: "Email adresi zorunludur" },
      { status: 400 }
    );
  }

  // In production: save to mailing list (Mailchimp, Resend, etc.)
  return NextResponse.json({
    success: true,
    message: "Bültenimize başarıyla abone oldunuz!",
  });
}
