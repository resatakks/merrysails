"use server";

import { prisma } from "@/lib/db";
import { sendEmail } from "@/lib/email";
import { contactNotificationEmail } from "@/lib/email-templates/contact-notification";

interface ContactFormInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function submitContactForm(input: ContactFormInput) {
  try {
    // Validate
    if (!input.name || !input.email || !input.subject || !input.message) {
      return { success: false, error: "All fields are required" };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
      return { success: false, error: "Please enter a valid email address" };
    }

    // Save to database
    await prisma.contactMessage.create({
      data: {
        name: input.name,
        email: input.email,
        subject: input.subject,
        message: input.message,
      },
    });

    // Send notification email
    try {
      if (process.env.GMAIL_USER) {
        await sendEmail({
          to: process.env.GMAIL_USER,
          subject: `📩 Contact Form: ${input.subject}`,
          html: contactNotificationEmail(input),
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
