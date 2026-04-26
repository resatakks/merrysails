import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ADMIN_COOKIE_NAME = "merrysails_admin_session";
const DEFAULT_SESSION_HOURS = 12;

function getAdminEmail(): string | null {
  return process.env.ADMIN_ACCESS_EMAIL?.trim().toLowerCase() || null;
}

function getAdminPassword(): string | null {
  return process.env.ADMIN_ACCESS_PASSWORD?.trim() || null;
}

function getAdminSessionSecret(): string | null {
  return process.env.ADMIN_SESSION_SECRET?.trim() || null;
}

export function isAdminAuthConfigured(): boolean {
  return Boolean(getAdminEmail() && getAdminPassword() && getAdminSessionSecret());
}

export function isAdminDevBypassEnabled(): boolean {
  return process.env.NODE_ENV !== "production" && !isAdminAuthConfigured();
}

function signSessionPayload(payload: string): string {
  const secret = getAdminSessionSecret();

  if (!secret) {
    throw new Error("Admin session secret is not configured.");
  }

  return createHmac("sha256", secret).update(payload).digest("hex");
}

function buildSessionToken(expiresAt: number): string {
  const payload = `admin:${expiresAt}`;
  const signature = signSessionPayload(payload);
  return `${payload}.${signature}`;
}

function verifySessionToken(token?: string | null): boolean {
  if (!token) {
    return false;
  }

  const [payload, providedSignature] = token.split(".");

  if (!payload || !providedSignature) {
    return false;
  }

  let expectedSignature: string;

  try {
    expectedSignature = signSessionPayload(payload);
  } catch {
    return false;
  }

  const providedBuffer = Buffer.from(providedSignature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (providedBuffer.length !== expectedBuffer.length) {
    return false;
  }

  if (!timingSafeEqual(providedBuffer, expectedBuffer)) {
    return false;
  }

  const [, expiresAtRaw] = payload.split(":");
  const expiresAt = Number.parseInt(expiresAtRaw ?? "", 10);

  return Number.isFinite(expiresAt) && expiresAt > Date.now();
}

export async function isAdminAuthenticated(): Promise<boolean> {
  if (isAdminDevBypassEnabled()) {
    return true;
  }

  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
}

export async function requireAdminSession() {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    redirect("/admin/login");
  }
}

export async function setAdminSession() {
  if (isAdminDevBypassEnabled()) {
    return;
  }

  const cookieStore = await cookies();
  const expiresAt = Date.now() + DEFAULT_SESSION_HOURS * 60 * 60 * 1000;

  cookieStore.set(ADMIN_COOKIE_NAME, buildSessionToken(expiresAt), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    expires: new Date(expiresAt),
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}

function safeEqual(actual: string, expected: string): boolean {
  const actualBuffer = Buffer.from(actual);
  const expectedBuffer = Buffer.from(expected);

  if (actualBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(actualBuffer, expectedBuffer);
}

export function validateAdminCredentials(email: string, password: string): boolean {
  const expectedEmail = getAdminEmail();
  const expected = getAdminPassword();

  if (!expectedEmail || !expected) {
    return false;
  }

  return safeEqual(email.trim().toLowerCase(), expectedEmail) && safeEqual(password, expected);
}
