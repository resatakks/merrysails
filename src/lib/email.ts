import nodemailer from "nodemailer";
import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";

let transporter: nodemailer.Transporter | null = null;
let fallbackTransporter: nodemailer.Transporter | null = null;
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

function getMailerConfig() {
  const smtpUser = process.env.SMTP_USER ?? process.env.GMAIL_USER;
  const smtpPass = process.env.SMTP_PASS ?? process.env.GMAIL_APP_PASSWORD;
  const smtpHost = process.env.SMTP_HOST ?? "smtp.gmail.com";
  const smtpPort = Number.parseInt(process.env.SMTP_PORT ?? "465", 10);
  const fromName =
    process.env.SMTP_FROM_NAME ??
    process.env.EMAIL_FROM_NAME ??
    "MerrySails";
  const fromEmail = process.env.SMTP_FROM_EMAIL ?? smtpUser;

  return {
    smtpUser,
    smtpPass,
    smtpHost,
    smtpPort,
    fromName,
    fromEmail,
  };
}

interface MailerConfig {
  smtpUser?: string;
  smtpPass?: string;
  smtpHost: string;
  smtpPort: number;
  fromName: string;
  fromEmail?: string;
}

function createTransport(config: MailerConfig) {
  const isStartTls = config.smtpPort === 587;

  return nodemailer.createTransport({
    host: config.smtpHost,
    port: config.smtpPort,
    secure: config.smtpPort === 465,
    requireTLS: isStartTls,
    auth: {
      user: config.smtpUser,
      pass: config.smtpPass,
    },
    connectionTimeout: SMTP_CONNECTION_TIMEOUT,
    greetingTimeout: SMTP_GREETING_TIMEOUT,
    socketTimeout: SMTP_SOCKET_TIMEOUT,
    dnsTimeout: SMTP_DNS_TIMEOUT,
  });
}

function getLocalMerryTourismFallbackConfig(): MailerConfig | null {
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  const fallbackEnvPath =
    process.env.MERRYSAILS_LOCAL_SMTP_FALLBACK_ENV_PATH ??
    path.join("/Users/resat/Desktop/merryturizm", ".env");

  if (!fs.existsSync(fallbackEnvPath)) {
    return null;
  }

  const parsed = dotenv.parse(fs.readFileSync(fallbackEnvPath));
  const smtpUser = parsed.SMTP_USER;
  const smtpPass = parsed.SMTP_PASS;
  const smtpHost = parsed.SMTP_HOST ?? "smtpout.secureserver.net";
  const rawPort = Number.parseInt(parsed.SMTP_PORT ?? "465", 10);
  const smtpPort = rawPort === 465 ? 587 : rawPort;
  const fromName = process.env.EMAIL_FROM_NAME ?? "MerrySails";

  if (!smtpUser || !smtpPass) {
    return null;
  }

  return {
    smtpUser,
    smtpPass,
    smtpHost,
    smtpPort,
    fromName,
    fromEmail: smtpUser,
  };
}

export function getNotificationInbox() {
  return getMailerConfig().smtpUser ?? null;
}

export function isEmailConfigured() {
  const { smtpUser, smtpPass } = getMailerConfig();
  return Boolean(smtpUser && smtpPass);
}

function getEmailTransporter() {
  if (transporter) {
    return transporter;
  }

  const { smtpUser, smtpPass, smtpHost, smtpPort } = getMailerConfig();

  if (!smtpUser || !smtpPass) {
    throw new Error("Email transporter is not configured.");
  }

  transporter = createTransport({
    smtpUser,
    smtpPass,
    smtpHost,
    smtpPort,
    fromName: process.env.EMAIL_FROM_NAME ?? "MerrySails",
    fromEmail: smtpUser,
  });

  return transporter;
}

function getFallbackTransporter() {
  if (fallbackTransporter) {
    return fallbackTransporter;
  }

  const fallbackConfig = getLocalMerryTourismFallbackConfig();

  if (!fallbackConfig) {
    return null;
  }

  fallbackTransporter = createTransport(fallbackConfig);
  return fallbackTransporter;
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
  const { fromName, fromEmail } = getMailerConfig();

  for (let attempt = 0; attempt < SMTP_SEND_ATTEMPTS; attempt += 1) {
    try {
      return await getEmailTransporter().sendMail({
        from: `"${fromName}" <${fromEmail}>`,
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

  const fallback = getFallbackTransporter();
  const fallbackConfig = getLocalMerryTourismFallbackConfig();

  if (fallback && fallbackConfig?.fromEmail) {
    return fallback.sendMail({
      from: `"${fallbackConfig.fromName}" <${fallbackConfig.fromEmail}>`,
      to,
      cc,
      subject,
      html,
      replyTo: process.env.GMAIL_USER ?? fallbackConfig.fromEmail,
    });
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("Email sending failed.");
}

export async function verifyEmailTransport() {
  return getEmailTransporter().verify();
}
