import { createHash } from "node:crypto";
import { NextRequest } from "next/server";

import {
  cleanGatewayString,
  jsonNoStore,
  optionsNoStore,
  verifyAdminReadAccess,
} from "@/lib/customer-access-gateway-runtime";
import type { CustomerConfirmationEmailPayload } from "@/lib/customer-confirmation-email-issuance-runtime";
import type { CustomerEmailDispatchQueueSafeProjection } from "@/lib/customer-email-dispatch-queue-runtime";
import { runCustomerEmailDispatchCycle } from "@/lib/customer-email-dispatch-runner-runtime";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const route = "/api/admin/customer/email/dispatch/dry-run" as const;
const adminEnvNames = ["CUSTOMER_EMAIL_DISPATCH_ADMIN_KEY", "SUPPORT_ADMIN_READ_KEY"] as const;
const dryRunQueueId = "dry-run-confirm-email-queue";
const dryRunHash = createHash("sha256").update("cendorq-customer-email-dispatch-dry-run").digest("hex");

export function OPTIONS() {
  return optionsNoStore("POST,OPTIONS");
}

export async function POST(request: NextRequest) {
  const access = verifyAdminReadAccess(request, adminEnvNames);
  if (!access.ok) {
    return jsonNoStore(
      {
        ok: false,
        status: 404,
        route,
        cache: "no-store" as const,
        error: "not_available" as const,
        adminOnly: true,
        dryRunOnly: true,
        safeProjectionOnly: true,
        providerCallMade: false,
        providerSecretRead: false,
        rawCustomerEmailExposed: false,
        rawTokenExposed: false,
        tokenHashExposed: false,
        confirmationUrlExposed: false,
        providerPayloadExposed: false,
        providerResponseExposed: false,
        providerSecretExposed: false,
        browserSecretExposure: false,
      },
      404,
    );
  }

  const body = await readBody(request);
  if (containsBlockedDryRunShape(body)) {
    return jsonNoStore(
      {
        ok: false,
        status: 400,
        route,
        cache: "no-store" as const,
        error: "safe_dry_run_projection_required" as const,
        rejectedUnsafeMaterial: true,
        providerCallMade: false,
        providerSecretRead: false,
        rawCustomerEmailExposed: false,
        rawTokenExposed: false,
        tokenHashExposed: false,
        confirmationUrlExposed: false,
        providerPayloadExposed: false,
        providerResponseExposed: false,
        providerSecretExposed: false,
      },
      400,
    );
  }

  const result = await runCustomerEmailDispatchCycle({
    queueRecord: buildDryRunQueueProjection(body),
    providerPayload: buildServerOnlyDryRunProviderPayload(body),
    providerConfigured: false,
    ownerApproved: true,
    dryRun: true,
    suppressionActive: false,
    providerEventRefHash: null,
    failureCode: null,
  });

  return jsonNoStore({
    ok: true,
    status: 200,
    route,
    cache: "no-store" as const,
    adminOnly: true,
    dryRunOnly: true,
    safeProjectionOnly: true,
    providerDispatchMode: "dry-run-no-provider-call" as const,
    adminAccessDecision: access.decision,
    adminAccessAuditEvent: access.auditEvent,
    decision: result.decision,
    queueId: result.queueId,
    queueState: result.queueState,
    updatedQueue: result.updatedQueue,
    audit: result.audit,
    attempt: {
      decision: result.attempt.decision,
      providerPayloadHash: result.attempt.providerPayloadHash,
      requiredGuards: result.attempt.requiredGuards,
      holdReasons: result.attempt.holdReasons,
      suppressionReasons: result.attempt.suppressionReasons,
      providerCallMade: false,
      providerSecretRead: false,
      browserVisible: false,
      customerEmailReturned: false,
      rawTokenReturned: false,
      tokenHashReturned: false,
      confirmationUrlReturned: false,
      providerPayloadReturned: false,
      providerResponseReturned: false,
    },
    runnerGuards: result.runnerGuards,
    providerCallMade: false,
    providerSecretRead: false,
    rawCustomerEmailExposed: false,
    rawTokenExposed: false,
    tokenHashExposed: false,
    confirmationUrlExposed: false,
    providerPayloadExposed: false,
    providerResponseExposed: false,
    providerSecretExposed: false,
    browserSecretExposure: false,
    localStorageAllowed: false,
    sessionStorageAllowed: false,
  });
}

async function readBody(request: NextRequest): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    return {};
  }
}

function buildDryRunQueueProjection(body: unknown): CustomerEmailDispatchQueueSafeProjection {
  const record = isRecord(body) ? body : {};
  const subject = cleanGatewayString(record.subject, 140) || "Confirm your email and open your Cendorq results";
  const preheader = cleanGatewayString(record.preheader, 220) || "One protected step opens your private Cendorq command center.";
  const expiresAt = cleanIso(record.expiresAt) || new Date(Date.now() + 15 * 60 * 1000).toISOString();

  return {
    queueId: cleanGatewayString(record.queueId, 120) || dryRunQueueId,
    state: "queued",
    templateKey: "confirm-email",
    senderName: "Cendorq Support",
    fromAddress: "support@cendorq.com",
    subject,
    preheader,
    primaryCta: "Confirm email and open your results",
    confirmationPath: "/api/customer/email/confirm",
    confirmationUrlHash: dryRunHash,
    dashboardPath: "/dashboard/reports",
    expiresAt,
    auditEventId: `dry-run-${dryRunHash.slice(0, 24)}`,
    rawTokenStored: false,
    tokenHashStored: false,
    rawEmailStored: false,
    providerPayloadStored: false,
    secretsStored: false,
  };
}

function buildServerOnlyDryRunProviderPayload(body: unknown): CustomerConfirmationEmailPayload["providerReadyPayload"] {
  const record = isRecord(body) ? body : {};
  const subject = cleanGatewayString(record.subject, 140) || "Confirm your email and open your Cendorq results";
  const preheader = cleanGatewayString(record.preheader, 220) || "One protected step opens your private Cendorq command center.";

  return {
    templateKey: "confirm-email",
    senderDisplay: "Cendorq Support <support@cendorq.com>",
    subject,
    preheader,
    primaryCta: "Confirm email and open your results",
    bodyIntro: "Your Cendorq results are protected behind one email confirmation step.",
    bodyGuidance:
      "Use the confirmation button to verify your email and open your private Cendorq dashboard. If the email was filtered, move Cendorq to your main inbox or save support@cendorq.com as a trusted sender.",
    bodyFooter:
      "This dry-run does not send email. Cendorq will never ask for your password, card number, private key, or session token in this email.",
    confirmationUrl: "https://cendorq.com/api/customer/email/confirm?dry_run=1",
  };
}

function containsBlockedDryRunShape(value: unknown): boolean {
  if (Array.isArray(value)) return value.some(containsBlockedDryRunShape);
  if (!isRecord(value)) return false;

  for (const [key, nestedValue] of Object.entries(value)) {
    const normalizedKey = key.toLowerCase();
    const blockedKey = [
      "email",
      "raw",
      "token",
      "tokenhash",
      "confirmationurl",
      "providerpayload",
      "providerresponse",
      "secret",
      "password",
      "credential",
      "session",
      "csrf",
      "adminkey",
      "billing",
      "evidence",
      "internalnotes",
    ].some((fragment) => normalizedKey.includes(fragment));

    if (blockedKey) return true;
    if (typeof nestedValue === "string" && containsUnsafeFragment(nestedValue)) return true;
    if (containsBlockedDryRunShape(nestedValue)) return true;
  }

  return false;
}

function containsUnsafeFragment(value: string) {
  const normalized = value.toLowerCase();
  return [
    "secret=",
    "password=",
    "token=",
    "key=",
    "authorization:",
    "bearer ",
    "confirmationurl=",
    "providerpayload=",
    "providerresponse=",
    "guaranteed inbox placement",
    "guaranteed deliverability",
    "guaranteed roi",
    "guaranteed revenue",
    "100% accurate",
    "impossible to hack",
    "liability-free",
  ].some((fragment) => normalized.includes(fragment));
}

function cleanIso(value: unknown) {
  if (typeof value !== "string") return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString();
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
