import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  cc?: string | string[];
}

export async function sendEmail({ to, subject, html, cc }: SendEmailOptions) {
  return transporter.sendMail({
    from: `"MerrySails" <${process.env.GMAIL_USER}>`,
    to,
    cc,
    subject,
    html,
  });
}
