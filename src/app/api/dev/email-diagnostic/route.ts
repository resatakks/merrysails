import { NextRequest, NextResponse } from "next/server";
import {
  getNotificationInbox,
  isEmailConfigured,
  sendEmail,
  verifyEmailTransport,
} from "@/lib/email";

function isDevEnvironment(req: NextRequest) {
  return process.env.NODE_ENV !== "production" || req.nextUrl.hostname === "localhost";
}

export async function GET(req: NextRequest) {
  if (!isDevEnvironment(req)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const mode = req.nextUrl.searchParams.get("mode") ?? "verify";
  const to = req.nextUrl.searchParams.get("to") ?? getNotificationInbox();

  const support = {
    googleSupportUrl: "https://support.google.com/mail/?p=WebLoginRequired",
    googleAccountsUrl: "https://accounts.google.com/",
  };

  try {
    if (!isEmailConfigured()) {
      return NextResponse.json(
        {
          success: false,
          mode,
          error: "SMTP or Gmail mail credentials are not configured.",
          ...support,
        },
        { status: 500 }
      );
    }

    if (mode === "send") {
      if (!to) {
        return NextResponse.json(
          { success: false, error: "Missing target email.", ...support },
          { status: 400 }
        );
      }

      const result = await sendEmail({
        to,
        subject: "MerrySails Local Email Diagnostic",
        html: `
          <div style="font-family:Arial,sans-serif;padding:24px">
            <h2>MerrySails local email diagnostic</h2>
            <p>This message was sent from the local development environment.</p>
            <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
          </div>
        `,
      });

      return NextResponse.json(
        {
          success: true,
          mode,
          to,
          messageId: result.messageId,
          ...support,
        },
        { status: 200 }
      );
    }

    await verifyEmailTransport();

    return NextResponse.json(
      {
        success: true,
        mode: "verify",
        message: "SMTP verification passed.",
        ...support,
      },
      { status: 200 }
    );
  } catch (error) {
    const err = error as Error & { code?: string; command?: string };
    return NextResponse.json(
      {
        success: false,
        mode,
        error: err.message,
        code: err.code,
        command: err.command,
        ...support,
      },
      { status: 500 }
    );
  }
}

export const runtime = "nodejs";
