import { createHash, timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

export type CustomerAccessGatewayDecision = "allow" | "deny" | "challenge" | "lockout";

export type CustomerAccessGatewayResult = {
  ok: boolean;
  decision: CustomerAccessGatewayDecision;
  customerIdHash?: string;
  reason: string;
  safeMessage: string;
  auditEvent: string;
};

export type CustomerAccessGatewaySecretCheck = {
  ok: boolean;
  secretHash?: string;
  reason: string;
};

export const CUSTOMER_ACCESS_NO_STORE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
  Pragma: "no-cache",
  Expires: "0",
} as const;

export const CUSTOMER_ACCESS_GATEWAY_RUNTIME_GUARDS = [
  "gateway responses use no-store headers",
  "gateway secret comparisons use constant-time checks",
  "gateway customer context is server-verified before protected API work",
  "gateway admin reads require server-only secret headers",
  "gateway safe failure messages do not disclose account existence, attacker details, risk-scoring internals, raw evidence, raw billing IDs, prompts, secrets, or private report internals",
  "gateway projection removes customer secret hashes and server-only context before returning data",
  "gateway string cleaning strips markup, control characters, invisible characters, and excessive whitespace",
  "gateway runtime does not expose support context keys, admin keys, session tokens, or entitlement provider secrets to clients",
] as const;

export function jsonNoStore(payload: unknown, status = 200) {
  return NextResponse.json(payload, { status, headers: CUSTOMER_ACCESS_NO_STORE_HEADERS });
}

export function optionsNoStore(allow = "GET,POST,OPTIONS") {
  return new NextResponse(null, { status: 204, headers: { Allow: allow, ...CUSTOMER_ACCESS_NO_STORE_HEADERS } });
}

export function cleanGatewayString(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value
    .normalize("NFKC")
    .replace(/<[^>]*>/g, " ")
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

export function safeGatewayEqual(left: string, right: string) {
  const cleanLeft = cleanGatewayString(left, 500);
  const cleanRight = cleanGatewayString(right, 500);
  const leftBuffer = Buffer.from(cleanLeft);
  const rightBuffer = Buffer.from(cleanRight);
  if (!cleanLeft || !cleanRight || leftBuffer.length !== rightBuffer.length) return false;
  return timingSafeEqual(leftBuffer, rightBuffer);
}

export function hashGatewaySecret(value: string, length = 24) {
  return createHash("sha256").update(value).digest("hex").slice(0, length);
}

export function checkServerSecretHeader({
  request,
  headerName,
  envNames,
  localDevelopmentAllowed = false,
}: {
  request: NextRequest;
  headerName: string;
  envNames: readonly string[];
  localDevelopmentAllowed?: boolean;
}): CustomerAccessGatewaySecretCheck {
  if (localDevelopmentAllowed && process.env.NODE_ENV !== "production") {
    return { ok: true, secretHash: "local-development-context", reason: "local-development-allowed" };
  }

  const configuredSecret = firstConfiguredSecret(envNames);
  const providedSecret = cleanGatewayString(request.headers.get(headerName) ?? "", 500);
  if (!configuredSecret || !providedSecret || !safeGatewayEqual(providedSecret, configuredSecret)) {
    return { ok: false, reason: "missing-or-invalid-server-secret" };
  }

  return { ok: true, secretHash: hashGatewaySecret(providedSecret), reason: "server-secret-verified" };
}

export function verifyCustomerSupportContext(request: NextRequest) {
  const check = checkServerSecretHeader({
    request,
    headerName: "x-cendorq-customer-context",
    envNames: ["CUSTOMER_SUPPORT_CONTEXT_KEY"],
    localDevelopmentAllowed: true,
  });

  if (!check.ok) {
    return denyGatewayAccess({
      reason: check.reason,
      safeMessage: "Verified customer context is required before submitting support requests.",
      auditEvent: "support-context-denied",
    });
  }

  return allowGatewayAccess({
    customerIdHash: check.secretHash ?? "verified-customer-context",
    reason: check.reason,
    auditEvent: "support-context-verified",
  });
}

export function verifyAdminReadAccess(request: NextRequest, envNames: readonly string[]) {
  const check = checkServerSecretHeader({
    request,
    headerName: "x-support-admin-key",
    envNames,
    localDevelopmentAllowed: true,
  });

  if (!check.ok) {
    return denyGatewayAccess({
      reason: check.reason,
      safeMessage: "The support console is not authorized to read requests.",
      auditEvent: "support-admin-read-denied",
    });
  }

  return allowGatewayAccess({
    customerIdHash: check.secretHash ?? "admin-read-context",
    reason: check.reason,
    auditEvent: "support-admin-read-allowed",
  });
}

export function allowGatewayAccess({ customerIdHash, reason, auditEvent }: { customerIdHash: string; reason: string; auditEvent: string }): CustomerAccessGatewayResult {
  return {
    ok: true,
    decision: "allow",
    customerIdHash,
    reason,
    safeMessage: "Access allowed through the protected customer gateway.",
    auditEvent,
  };
}

export function denyGatewayAccess({ reason, safeMessage, auditEvent }: { reason: string; safeMessage: string; auditEvent: string }): CustomerAccessGatewayResult {
  return {
    ok: false,
    decision: "deny",
    reason,
    safeMessage,
    auditEvent,
  };
}

export function challengeGatewayAccess({ reason, safeMessage, auditEvent }: { reason: string; safeMessage: string; auditEvent: string }): CustomerAccessGatewayResult {
  return {
    ok: false,
    decision: "challenge",
    reason,
    safeMessage,
    auditEvent,
  };
}

export function projectGatewaySafeRecord<T extends Record<string, unknown>>(record: T, blockedKeys: readonly string[]) {
  const projected: Record<string, unknown> = {};
  const blocked = new Set(blockedKeys);
  for (const [key, value] of Object.entries(record)) {
    if (blocked.has(key)) continue;
    projected[key] = value;
  }
  return projected as Omit<T, (typeof blockedKeys)[number]>;
}

export function firstConfiguredSecret(envNames: readonly string[]) {
  for (const envName of envNames) {
    const value = cleanGatewayString(process.env[envName] ?? "", 500);
    if (value) return value;
  }
  return "";
}

export function buildGatewaySafeFailure(error: string, details: readonly string[] = []) {
  return {
    ok: false,
    error,
    details,
  };
}
