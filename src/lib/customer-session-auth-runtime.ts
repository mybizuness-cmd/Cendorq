import { NextRequest } from "next/server";
import { cleanGatewayString, denyGatewayAccess, hashGatewaySecret, safeGatewayEqual, type CustomerAccessGatewayResult } from "@/lib/customer-access-gateway-runtime";

export type CustomerSessionAuthDecision = "allow" | "deny" | "challenge" | "lockout";

export type CustomerSessionAuthRuntimeResult = CustomerAccessGatewayResult & {
  sessionIdHash?: string;
  csrfHash?: string;
  emailVerified?: boolean;
  reauthRequired?: boolean;
};

export type CustomerSessionAuthRuntimeOptions = {
  requireVerifiedEmail?: boolean;
  requireCsrf?: boolean;
  requireFreshReauth?: boolean;
  allowedOrigins?: readonly string[];
};

export const CUSTOMER_SESSION_COOKIE_NAME = "__Host-cendorq_session";
export const CUSTOMER_CSRF_COOKIE_NAME = "__Host-cendorq_csrf";
export const CUSTOMER_CSRF_HEADER_NAME = "x-cendorq-csrf";
export const CUSTOMER_REAUTH_HEADER_NAME = "x-cendorq-reauth";

export const CUSTOMER_SESSION_AUTH_RUNTIME_GUARDS = [
  "session runtime is closed by default when no server-managed session is present",
  "session runtime expects secure httpOnly sameSite customer session cookies",
  "session runtime never reads session tokens from browser storage, URLs, analytics, HTML, emails, or public JavaScript",
  "session runtime requires CSRF or equivalent checks for protected state-changing API requests",
  "session runtime uses constant-time comparison for CSRF and reauthentication checks",
  "session runtime returns safe failures without account existence, attacker details, risk-scoring internals, raw evidence, raw billing IDs, prompts, secrets, or private report internals",
  "session runtime can require verified email before dashboard, report, billing, notification, support, or protected API value",
  "session runtime can require fresh reauthentication before risky billing, security, report, or account actions",
] as const;

export function requireCustomerSession(request: NextRequest, options: CustomerSessionAuthRuntimeOptions = {}): CustomerSessionAuthRuntimeResult {
  const sessionToken = cleanGatewayString(request.cookies.get(CUSTOMER_SESSION_COOKIE_NAME)?.value ?? "", 500);
  if (!sessionToken) {
    return denySession("missing-session", "Sign in or confirm your account to continue.", "customer-session-missing");
  }

  const sessionIdHash = hashGatewaySecret(sessionToken);
  const emailVerified = request.headers.get("x-cendorq-email-verified") === "true";
  if (options.requireVerifiedEmail && !emailVerified) {
    return {
      ok: false,
      decision: "challenge",
      sessionIdHash,
      emailVerified: false,
      reason: "email-verification-required",
      safeMessage: "Confirm your email to continue.",
      auditEvent: "customer-email-verification-required",
    };
  }

  const originDecision = checkRequestOrigin(request, options.allowedOrigins);
  if (!originDecision.ok) return originDecision;

  if (options.requireCsrf) {
    const csrfDecision = verifyCsrfForMutation(request);
    if (!csrfDecision.ok) return { ...csrfDecision, sessionIdHash, emailVerified };
  }

  if (options.requireFreshReauth) {
    const reauthDecision = verifyFreshReauth(request);
    if (!reauthDecision.ok) return { ...reauthDecision, sessionIdHash, emailVerified, reauthRequired: true };
  }

  return {
    ok: true,
    decision: "allow",
    sessionIdHash,
    customerIdHash: sessionIdHash,
    emailVerified,
    reauthRequired: false,
    reason: "customer-session-verified",
    safeMessage: "Access allowed through the protected customer session.",
    auditEvent: "customer-session-allowed",
  };
}

export function verifyCsrfForMutation(request: NextRequest): CustomerSessionAuthRuntimeResult {
  const cookieValue = cleanGatewayString(request.cookies.get(CUSTOMER_CSRF_COOKIE_NAME)?.value ?? "", 500);
  const headerValue = cleanGatewayString(request.headers.get(CUSTOMER_CSRF_HEADER_NAME) ?? "", 500);
  if (!cookieValue || !headerValue || !safeGatewayEqual(cookieValue, headerValue)) {
    return denySession("invalid-csrf", "The protected request could not be verified. Refresh and try again.", "customer-csrf-denied");
  }

  return {
    ok: true,
    decision: "allow",
    csrfHash: hashGatewaySecret(headerValue),
    reason: "csrf-verified",
    safeMessage: "The protected request was verified.",
    auditEvent: "customer-csrf-allowed",
  };
}

export function verifyFreshReauth(request: NextRequest): CustomerSessionAuthRuntimeResult {
  const reauthValue = cleanGatewayString(request.headers.get(CUSTOMER_REAUTH_HEADER_NAME) ?? "", 500);
  const expectedValue = cleanGatewayString(request.cookies.get(CUSTOMER_REAUTH_HEADER_NAME)?.value ?? "", 500);
  if (!reauthValue || !expectedValue || !safeGatewayEqual(reauthValue, expectedValue)) {
    return {
      ok: false,
      decision: "challenge",
      reauthRequired: true,
      reason: "fresh-reauth-required",
      safeMessage: "Reconfirm your account before continuing.",
      auditEvent: "customer-reauth-required",
    };
  }

  return {
    ok: true,
    decision: "allow",
    reason: "fresh-reauth-verified",
    safeMessage: "Fresh reauthentication verified.",
    auditEvent: "customer-reauth-allowed",
  };
}

export function checkRequestOrigin(request: NextRequest, allowedOrigins: readonly string[] = []): CustomerSessionAuthRuntimeResult {
  if (!allowedOrigins.length) {
    return {
      ok: true,
      decision: "allow",
      reason: "origin-check-not-configured",
      safeMessage: "Origin check deferred to deployment configuration.",
      auditEvent: "customer-origin-check-deferred",
    };
  }

  const origin = cleanGatewayString(request.headers.get("origin") ?? "", 300);
  if (!origin || !allowedOrigins.some((allowed) => safeGatewayEqual(origin, allowed))) {
    return denySession("unsafe-origin", "The protected request could not be verified. Refresh and try again.", "customer-origin-denied");
  }

  return {
    ok: true,
    decision: "allow",
    reason: "origin-verified",
    safeMessage: "Request origin verified.",
    auditEvent: "customer-origin-allowed",
  };
}

export function buildCustomerSessionCookieAttributes(maxAgeSeconds: number) {
  return {
    name: CUSTOMER_SESSION_COOKIE_NAME,
    httpOnly: true,
    secure: true,
    sameSite: "lax" as const,
    path: "/",
    maxAge: maxAgeSeconds,
  };
}

export function buildCustomerCsrfCookieAttributes(maxAgeSeconds: number) {
  return {
    name: CUSTOMER_CSRF_COOKIE_NAME,
    httpOnly: true,
    secure: true,
    sameSite: "lax" as const,
    path: "/",
    maxAge: maxAgeSeconds,
  };
}

function denySession(reason: string, safeMessage: string, auditEvent: string): CustomerSessionAuthRuntimeResult {
  return denyGatewayAccess({ reason, safeMessage, auditEvent }) as CustomerSessionAuthRuntimeResult;
}
