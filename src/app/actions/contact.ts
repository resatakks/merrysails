"use server";

import { prisma } from "@/lib/db";
import { sendEmail } from "@/lib/email";
import { contactNotificationEmail } from "@/lib/email-templates/contact-notification";
import { consumeRateLimit } from "@/lib/rate-limit";

interface ContactFormInput {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string;
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
      },
    });

    // Send notification email
    try {
      if (process.env.GMAIL_USER) {
        await sendEmail({
          to: process.env.GMAIL_USER,
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
