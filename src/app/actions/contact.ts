"use server";

import { prisma } from "@/lib/db";
import { getNotificationInbox, sendEmail } from "@/lib/email";
import { contactNotificationEmail } from "@/lib/email-templates/contact-notification";
import { consumeRateLimit } from "@/lib/rate-limit";

interface AttributionPayload {
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  gadSource?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  referrerHost?: string;
  landingPath?: string;
  trafficChannel?: string;
}

interface ContactFormInput {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string;
  attribution?: AttributionPayload;
}

function sanitizeAttribution(input?: AttributionPayload) {
  if (!input) return {};
  const trim = (v?: string) => (v ? v.trim().slice(0, 255) || null : null);
  return {
    gclid: trim(input.gclid),
    gbraid: trim(input.gbraid),
    wbraid: trim(input.wbraid),
    gadSource: trim(input.gadSource),
    utmSource: trim(input.utmSource),
    utmMedium: trim(input.utmMedium),
    utmCampaign: trim(input.utmCampaign),
    utmContent: trim(input.utmContent),
    utmTerm: trim(input.utmTerm),
    referrerHost: trim(input.referrerHost),
    landingPath: trim(input.landingPath),
    trafficChannel: trim(input.trafficChannel),
  };
}

export async function submitContactForm(input: ContactFormInput) {
  try {
    if (input.honeypot?.trim()) {
      return { success: false, error: "Failed to send message. Please try again." };
    }

    const name = input.name.replace(/\s+/g, " ").trim().slice(0, 120);
    const email = input.email.replace(/\s+/g, " ").trim().toLowerCase().slice(0, 160);
    const subject = input.subject.replace(/\s+/g, " ").trim().slice(0, 160);
    const message = input.message.trim().slice(0, 4000);

    // Validate
    if (!name || !email || !subject || !message) {
      return { success: false, error: "All fields are required" };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { success: false, error: "Please enter a valid email address" };
    }

    const limit = consumeRateLimit("contact", email, {
      limit: 5,
      windowMs: 60 * 60 * 1000,
    });

    if (!limit.allowed) {
      return {
        success: false,
        error: "Too many contact requests were sent in a short time. Please try again later.",
      };
    }

    // Save to database
    await prisma.contactMessage.create({
      data: {
        name,
        email,
        subject,
        message,
        ...sanitizeAttribution(input.attribution),
      },
    });

    // Send notification email
    try {
      const notificationInbox = getNotificationInbox();

      if (notificationInbox) {
        await sendEmail({
          to: notificationInbox,
          subject: `📩 Contact Form: ${subject}`,
          html: contactNotificationEmail({ name, email, subject, message }),
        });
      }
    } catch (emailErr) {
      console.error("Failed to send contact notification:", emailErr);
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to submit contact form:", error);
    return { success: false, error: "Failed to send message. Please try again." };
  }
}
