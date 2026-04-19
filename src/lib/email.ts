import nodemailer from "nodemailer";

let transporter: nodemailer.Transporter | null = null;

function getEmailTransporter() {
  if (transporter) {
    return transporter;
  }

  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    throw new Error("Email transporter is not configured.");
  }

  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  return transporter;
}

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  cc?: string | string[];
}

export async function sendEmail({ to, subject, html, cc }: SendEmailOptions) {
  return getEmailTransporter().sendMail({
    from: `"MerrySails" <${process.env.GMAIL_USER}>`,
    to,
    cc,
    subject,
    html,
  });
}
