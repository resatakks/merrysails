import { after, NextRequest, NextResponse } from "next/server";
import {
  hasBookingAbandonmentContact,
  normalizeBookingAbandonmentPhone,
  sanitizeBookingAbandonmentPayload,
} from "@/lib/booking-abandonment";
import { getNotificationInbox, getReservationCcRecipients, sendEmail } from "@/lib/email";
import { bookingAbandonmentNotificationEmail } from "@/lib/email-templates/booking-abandonment-notification";
import { consumeRateLimit } from "@/lib/rate-limit";

async function parseRequestBody(request: NextRequest): Promise<unknown> {
  try {
    const raw = await request.text();
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  const rawBody = await parseRequestBody(request);
  const payload = sanitizeBookingAbandonmentPayload(rawBody);

  if (!payload) {
    return NextResponse.json(
      { success: false, error: "Invalid abandonment payload." },
      { status: 400 }
    );
  }

  if (!hasBookingAbandonmentContact(payload)) {
    return NextResponse.json(
      { success: false, error: "A valid phone number is required." },
      { status: 400 }
    );
  }

  const normalizedPhone = normalizeBookingAbandonmentPhone(payload.customerPhone).replace(
    /^\+/,
    ""
  );
  const dedupeKey = [
    payload.tourSlug,
    payload.date,
    payload.customerEmail ?? "",
    normalizedPhone,
  ]
    .join("|")
    .toLowerCase();

  const rateLimit = consumeRateLimit("booking-abandonment", dedupeKey, {
    limit: 1,
    windowMs: 4 * 60 * 60 * 1000,
  });

  if (!rateLimit.allowed) {
    return NextResponse.json({ success: true, deduped: true });
  }

  const notificationInbox = getNotificationInbox();
  const reservationCcRecipients = getReservationCcRecipients(notificationInbox);

  after(async () => {
    const tasks: Promise<unknown>[] = [];

    if (notificationInbox) {
      tasks.push(
        sendEmail({
          to: notificationInbox,
          cc: reservationCcRecipients.filter(
            (recipient) => recipient !== notificationInbox
          ),
          subject: `Abandoned Booking Lead - ${payload.tourName}`,
          html: bookingAbandonmentNotificationEmail(payload),
        }).catch((error) => {
          console.error("Failed to send abandonment notification email:", error);
        })
      );
    }

    if (process.env.TELEGRAM_BOT_TOKEN) {
      tasks.push(
        import("@/lib/telegram/notifications")
          .then(({ notifyBookingAbandonment }) =>
            notifyBookingAbandonment(payload)
          )
          .catch((error) => {
            console.error(
              "Failed to send abandonment Telegram notification:",
              error
            );
          })
      );
    }

    await Promise.allSettled(tasks);
  });

  return NextResponse.json({ success: true });
}
