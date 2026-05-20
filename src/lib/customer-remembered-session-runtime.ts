import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import type { NextRequest, NextResponse } from "next/server";

export const CENDORQ_CUSTOMER_SESSION_COOKIE = "cendorq_customer_session";

const SESSION_VERSION = "v1";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30;
const SESSION_SECRET_ENV = "CENDORQ_CUSTOMER_SESSION_SECRET";
const SAFE_DASHBOARD_PATHS = [
  "/dashboard",
  "/dashboard/reports",
  "/dashboard/reports/free-scan",
  "/dashboard/billing",
  "/dashboard/support",
  "/dashboard/notifications",
] as const;

export type CustomerRememberedSessionProjection = {
  ok: boolean;
  reason: "valid" | "missing" | "not-configured" | "malformed" | "expired" | "signature-mismatch";
  safeReturnTo: string;
};

export function setCustomerRememberedSessionCookie(response: NextResponse, input: { customerIdHash: string; signupEmailHash: string; destination?: string | null }) {
  const secret = getSessionSecret();
  if (!secret) return false;

  const customerIdHash = cleanHash(input.customerIdHash);
  const signupEmailHash = cleanHash(input.signupEmailHash);
  if (!customerIdHash || !signupEmailHash) return false;

  const issuedAt = Math.floor(Date.now() / 1000);
  const expiresAt = issuedAt + SESSION_TTL_SECONDS;
  const payload = [
    SESSION_VERSION,
    customerIdHash,
    signupEmailHash,
    String(issuedAt),
    String(expiresAt),
    randomBytes(16).toString("base64url"),
  ].join(".");
  const signature = sign(payload, secret);
  const value = `${payload}.${signature}`;

  response.cookies.set(CENDORQ_CUSTOMER_SESSION_COOKIE, value, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });

  return true;
}

export function readCustomerRememberedSession(request: NextRequest, requestedReturnTo?: string | null): CustomerRememberedSessionProjection {
  return readCustomerRememberedSessionCookieValue(request.cookies.get(CENDORQ_CUSTOMER_SESSION_COOKIE)?.value || "", requestedReturnTo);
}

export function readCustomerRememberedSessionCookieValue(cookieValue: string | undefined | null, requestedReturnTo?: string | null): CustomerRememberedSessionProjection {
  const safeReturnTo = safeDashboardPath(requestedReturnTo) || "/dashboard";
  const secret = getSessionSecret();
  if (!secret) return { ok: false, reason: "not-configured", safeReturnTo };

  const value = typeof cookieValue === "string" ? cookieValue : "";
  if (!value) return { ok: false, reason: "missing", safeReturnTo };

  const parts = value.split(".");
  if (parts.length !== 7) return { ok: false, reason: "malformed", safeReturnTo };
  const [version, customerIdHash, signupEmailHash, issuedAt, expiresAt, nonce, signature] = parts;
  const payload = [version, customerIdHash, signupEmailHash, issuedAt, expiresAt, nonce].join(".");
  if (version !== SESSION_VERSION || !cleanHash(customerIdHash) || !cleanHash(signupEmailHash) || !isSafeIntegerString(issuedAt) || !isSafeIntegerString(expiresAt) || !isSafeNonce(nonce)) {
    return { ok: false, reason: "malformed", safeReturnTo };
  }
  if (Number(expiresAt) <= Math.floor(Date.now() / 1000)) return { ok: false, reason: "expired", safeReturnTo };
  if (!safeEqual(signature, sign(payload, secret))) return { ok: false, reason: "signature-mismatch", safeReturnTo };

  return { ok: true, reason: "valid", safeReturnTo };
}

export function clearCustomerRememberedSessionCookie(response: NextResponse) {
  response.cookies.set(CENDORQ_CUSTOMER_SESSION_COOKIE, "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export function safeDashboardPath(value: string | null | undefined) {
  if (!value) return null;
  return SAFE_DASHBOARD_PATHS.find((path) => value === path || value.startsWith(`${path}/`)) || null;
}

function getSessionSecret() {
  const value = typeof process.env[SESSION_SECRET_ENV] === "string" ? process.env[SESSION_SECRET_ENV]!.trim() : "";
  return value.length >= 32 ? value : "";
}

function sign(payload: string, secret: string) {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function safeEqual(left: string, right: string) {
  try {
    const leftBuffer = Buffer.from(left);
    const rightBuffer = Buffer.from(right);
    if (leftBuffer.length !== rightBuffer.length) return false;
    return timingSafeEqual(leftBuffer, rightBuffer);
  } catch {
    return false;
  }
}

function cleanHash(value: unknown) {
  if (typeof value !== "string") return "";
  const cleaned = value.trim().toLowerCase();
  return /^[a-f0-9]{24,96}$/.test(cleaned) ? cleaned : "";
}

function isSafeIntegerString(value: string) {
  return /^\d{10,12}$/.test(value);
}

function isSafeNonce(value: string) {
  return /^[A-Za-z0-9_-]{16,64}$/.test(value);
}
