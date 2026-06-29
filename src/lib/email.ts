import nodemailer from "nodemailer";
import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
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

function trimEnv(value: string | undefined): string | undefined {
  if (value === undefined) return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function getMailerConfig() {
  const smtpUser = trimEnv(process.env.SMTP_USER) ?? trimEnv(process.env.GMAIL_USER);
  const smtpPass = trimEnv(process.env.SMTP_PASS) ?? trimEnv(process.env.GMAIL_APP_PASSWORD);
  const smtpHost = trimEnv(process.env.SMTP_HOST) ?? "smtp.gmail.com";
  const smtpPort = Number.parseInt(trimEnv(process.env.SMTP_PORT) ?? "465", 10);
  const fromName =
    trimEnv(process.env.SMTP_FROM_NAME) ??
    trimEnv(process.env.EMAIL_FROM_NAME) ??
    "MerrySails";
  const fromEmail = trimEnv(process.env.SMTP_FROM_EMAIL) ?? smtpUser;

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
  /** Optional plain-text alternative.  If omitted, a stripped version of the
   *  HTML is generated automatically so every outgoing email is multipart —
   *  Gmail rewards multipart/alternative senders. */
  text?: string;
  cc?: string | string[];
  /** Optional override for the public Reply-To header.  Defaults to the
   *  SMTP user (info@merrysails.com). */
  replyTo?: string;
  /** Mark as a transactional / system-generated email so receivers
   *  (Gmail, Outlook) classify it correctly.  Defaults true since all
   *  current senders are reservation / contact notifications. */
  transactional?: boolean;
  attachments?: {
    filename: string;
    content: Buffer | string;
    contentType?: string;
  }[];
}

/** Strip HTML to a readable plain-text fallback for the multipart/alternative
 *  body.  Not pretty, but Gmail just needs SOMETHING parseable. */
function htmlToPlainText(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function normalizeRecipients(values: Array<string | null | undefined>): string[] {
  return [...new Set(values.map((value) => value?.trim().toLowerCase()).filter(Boolean))] as string[];
}

function parseRecipientList(value?: string | null): string[] {
  if (!value) {
    return [];
  }

  return value
    .split(/[,;\s]+/)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export function getReservationCcRecipients(extra?: string | string[] | null): string[] {
  const configuredRecipients = parseRecipientList(trimEnv(process.env.RESERVATION_CC_RECIPIENTS));
  const defaultRecipients =
    configuredRecipients.length > 0
      ? configuredRecipients
      : [
          "info@merrysails.com",
          "resatakkus10@gmail.com",
        ];
  const extraRecipients = Array.isArray(extra) ? extra : extra ? [extra] : [];

  return normalizeRecipients([...defaultRecipients, ...extraRecipients]);
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function sendEmail({
  to,
  subject,
  html,
  text,
  cc,
  replyTo,
  transactional = true,
  attachments,
}: SendEmailOptions) {
  let lastError: unknown = null;
  const { fromName, fromEmail } = getMailerConfig();
  const resolvedReplyTo = replyTo ?? fromEmail ?? "info@merrysails.com";
  const plainText = text ?? htmlToPlainText(html);
  const entityRefId = randomUUID();

  // Headers that lift Gmail / Outlook deliverability without changing the
  // visible content. List-Unsubscribe is required by Gmail's 2024 bulk
  // sender rules and is a positive signal even for transactional senders.
  // X-Entity-Ref-ID gives Gmail a stable per-message fingerprint so identical
  // resend retries don't get flagged as duplicates.
  const baseHeaders: Record<string, string> = {
    "List-Unsubscribe": `<mailto:unsubscribe@merrysails.com?subject=unsubscribe>, <https://merrysails.com/unsubscribe?e=${encodeURIComponent(to)}>`,
    "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    "X-Entity-Ref-ID": entityRefId,
  };

  if (transactional) {
    // Gmail uses this to classify the message as auto-generated; it suppresses
    // out-of-office replies and signals "system mail, not promotional".
    baseHeaders["Auto-Submitted"] = "auto-generated";
  }

  for (let attempt = 0; attempt < SMTP_SEND_ATTEMPTS; attempt += 1) {
    try {
      return await getEmailTransporter().sendMail({
        from: `"${fromName}" <${fromEmail}>`,
        replyTo: resolvedReplyTo,
        to,
        cc,
        subject,
        html,
        text: plainText,
        headers: baseHeaders,
        attachments,
      });
    } catch (error) {
      lastError = error;
      console.warn(
        `[email] SMTP send attempt ${attempt + 1}/${SMTP_SEND_ATTEMPTS} failed for "${subject}" to ${to}:`,
        error instanceof Error ? error.message : error
      );
      // Reset cached transporter so a transient auth/connection issue is
      // retried with a fresh connection on the next attempt.
      transporter = null;

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
      text: plainText,
      headers: baseHeaders,
      attachments,
      replyTo: trimEnv(process.env.GMAIL_USER) ?? fallbackConfig.fromEmail,
    });
  }

  console.error(
    `[email] all ${SMTP_SEND_ATTEMPTS} SMTP attempts failed for "${subject}" to ${to}:`,
    lastError instanceof Error ? lastError.message : lastError
  );

  throw lastError instanceof Error
    ? lastError
    : new Error("Email sending failed.");
}

export async function verifyEmailTransport() {
  return getEmailTransporter().verify();
}
