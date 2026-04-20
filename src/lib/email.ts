import nodemailer from "nodemailer";

let transporter: nodemailer.Transporter | null = null;

const SMTP_HOST = process.env.SMTP_HOST ?? "smtp.gmail.com";
const SMTP_PORT = Number.parseInt(process.env.SMTP_PORT ?? "465", 10);
const SMTP_CONNECTION_TIMEOUT = Number.parseInt(
  process.env.EMAIL_SMTP_CONNECTION_TIMEOUT_MS ?? "8000",
  10
);
const SMTP_GREETING_TIMEOUT = Number.parseInt(
  process.env.EMAIL_SMTP_GREETING_TIMEOUT_MS ?? "8000",
  10
);
const SMTP_SOCKET_TIMEOUT = Number.parseInt(
  process.env.EMAIL_SMTP_SOCKET_TIMEOUT_MS ?? "15000",
  10
);
const SMTP_DNS_TIMEOUT = Number.parseInt(
  process.env.EMAIL_SMTP_DNS_TIMEOUT_MS ?? "8000",
  10
);
const SMTP_SEND_ATTEMPTS = Math.max(
  1,
  Number.parseInt(process.env.EMAIL_SMTP_SEND_ATTEMPTS ?? "2", 10)
);

function getEmailTransporter() {
  if (transporter) {
    return transporter;
  }

  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    throw new Error("Email transporter is not configured.");
  }

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
    connectionTimeout: SMTP_CONNECTION_TIMEOUT,
    greetingTimeout: SMTP_GREETING_TIMEOUT,
    socketTimeout: SMTP_SOCKET_TIMEOUT,
    dnsTimeout: SMTP_DNS_TIMEOUT,
  });

  return transporter;
}

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  cc?: string | string[];
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function sendEmail({ to, subject, html, cc }: SendEmailOptions) {
  let lastError: unknown = null;

  for (let attempt = 0; attempt < SMTP_SEND_ATTEMPTS; attempt += 1) {
    try {
      return await getEmailTransporter().sendMail({
        from: `"${process.env.EMAIL_FROM_NAME ?? "MerrySails"}" <${process.env.GMAIL_USER}>`,
        to,
        cc,
        subject,
        html,
      });
    } catch (error) {
      lastError = error;

      if (attempt < SMTP_SEND_ATTEMPTS - 1) {
        await sleep((attempt + 1) * 750);
      }
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("Email sending failed.");
}
