import { NextRequest, NextResponse } from "next/server";
import {
  getNotificationInbox,
  getReservationCcRecipients,
  isEmailConfigured,
  sendEmail,
  verifyEmailTransport,
} from "@/lib/email";
import { getTourBySlug } from "@/data/tours";
import { reservationConfirmationEmail } from "@/lib/email-templates/reservation-confirmation";
import { reservationReminderEmail } from "@/lib/email-templates/reservation-reminder";
import { buildReservationPdfAttachments } from "@/lib/reservation-pdf";

function isDevEnvironment(req: NextRequest) {
  return process.env.NODE_ENV !== "production" || req.nextUrl.hostname === "localhost";
}

export async function GET(req: NextRequest) {
  if (!isDevEnvironment(req)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const mode = req.nextUrl.searchParams.get("mode") ?? "verify";
  const to = req.nextUrl.searchParams.get("to") ?? getNotificationInbox();
  const reservationCcRecipients = getReservationCcRecipients(getNotificationInbox());

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

    if (mode === "reservation-bundle") {
      if (!to) {
        return NextResponse.json(
          { success: false, error: "Missing target email.", ...support },
          { status: 400 }
        );
      }

      const previewDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
      const formattedDate = previewDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      const previewReservationId = `MRY-TEST-${previewDate.getUTCFullYear()}-0422`;
      const previewTour = getTourBySlug("bosphorus-sunset-cruise");
      const attachments = await buildReservationPdfAttachments({
        reservationId: previewReservationId,
        customerName: "Resat Test",
        customerEmail: to,
        customerPhone: "+90 537 040 68 22",
        tourSlug: previewTour?.slug ?? "bosphorus-sunset-cruise",
        tourName: previewTour?.nameEn ?? "Bosphorus Sunset Cruise",
        serviceDate: previewDate,
        time: "18:00",
        guests: 2,
        totalPrice: 80,
        currency: "EUR",
        packageName: "Bosphorus Sunset Cruise with Wine",
        addOns: [],
        additionalGuests: [],
        privateTransferRequested: false,
        notes: undefined,
        status: "Confirmed",
      });

      const confirmationResult = await sendEmail({
        to,
        cc: reservationCcRecipients,
        attachments,
        subject: `[TEST] Reservation Confirmed — ${previewReservationId} | MerrySails`,
        html: reservationConfirmationEmail({
          reservationId: previewReservationId,
          customerName: "Resat Test",
          tourName: previewTour?.nameEn ?? "Bosphorus Sunset Cruise",
          tourSlug: previewTour?.slug ?? "bosphorus-sunset-cruise",
          date: formattedDate,
          time: "18:00",
          guests: 2,
          totalPrice: 80,
          currency: "EUR",
          packageName: "Bosphorus Sunset Cruise with Wine",
          addOns: [],
          additionalGuests: [],
          privateTransferRequested: false,
          notes: undefined,
          variant: "confirmed",
        }),
      });

      const reminderResult = await sendEmail({
        to,
        cc: reservationCcRecipients,
        subject: `[TEST] Reminder: ${previewTour?.nameEn ?? "Bosphorus Sunset Cruise"} starts soon | ${previewReservationId} | MerrySails`,
        html: reservationReminderEmail({
          reservationId: previewReservationId,
          customerName: "Resat Test",
          tourName: previewTour?.nameEn ?? "Bosphorus Sunset Cruise",
          tourSlug: previewTour?.slug ?? "bosphorus-sunset-cruise",
          date: formattedDate,
          time: "18:00",
          guests: 2,
          departurePoint: previewTour?.departurePoint,
          packageName: "Bosphorus Sunset Cruise with Wine",
          addOns: [],
          privateTransferRequested: false,
        }),
      });

      return NextResponse.json(
        {
          success: true,
          mode,
          to,
          confirmationMessageId: confirmationResult.messageId,
          reminderMessageId: reminderResult.messageId,
          reservationId: previewReservationId,
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
