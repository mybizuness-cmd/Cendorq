import { NextRequest } from "next/server";

import {
  jsonNoStore,
  optionsNoStore,
  verifyAdminReadAccess,
} from "@/lib/customer-access-gateway-runtime";
import { getCustomerEmailDispatchAuditRules } from "@/lib/customer-email-dispatch-audit-runtime";
import { getCustomerEmailProviderDispatchAdapterRules } from "@/lib/customer-email-provider-dispatch-adapter";
import { getCustomerEmailDispatchQueueStorageRules } from "@/lib/customer-email-dispatch-queue-runtime";
import { getCustomerEmailDispatchRunnerRules } from "@/lib/customer-email-dispatch-runner-runtime";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const route = "/api/admin/customer/email/dispatch/preview" as const;
const adminEnvNames = ["CUSTOMER_EMAIL_DISPATCH_ADMIN_KEY", "SUPPORT_ADMIN_READ_KEY"] as const;

export function OPTIONS() {
  return optionsNoStore("GET,OPTIONS");
}

export async function GET(request: NextRequest) {
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
        safeProjectionOnly: true,
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

  return jsonNoStore({
    ok: true,
    status: 200,
    route,
    cache: "no-store" as const,
    adminOnly: true,
    operatorPreview: true,
    safeProjectionOnly: true,
    acceptedMethod: "GET" as const,
    storageMode: "safe-queue-and-audit-projection-only" as const,
    providerDispatchMode: "preview-only-no-provider-call" as const,
    adminAccessDecision: access.decision,
    adminAccessAuditEvent: access.auditEvent,
    queuePreview: {
      scope: "customer-confirmation-email-dispatch" as const,
      senderName: "Cendorq Support" as const,
      fromAddress: "support@cendorq.com" as const,
      visibleStates: ["queued", "held", "suppressed", "sending", "sent", "failed", "cancelled"] as const,
      queueRecordsReturned: 0,
      queueRecordsRequireSafeProjection: true,
      rawCustomerEmailExposed: false,
      rawTokenExposed: false,
      tokenHashExposed: false,
      confirmationUrlExposed: false,
      providerPayloadExposed: false,
      providerResponseExposed: false,
      providerSecretExposed: false,
    },
    runnerPreview: {
      dispatchRunnerAvailable: true,
      providerCallMade: false,
      providerSecretRead: false,
      browserVisible: false,
      dryRunSupported: true,
      holdSupported: true,
      suppressionSupported: true,
      readyForProviderSupported: true,
      auditTransitionRequiredForEveryMutationDecision: true,
    },
    auditPreview: {
      appendOnly: true,
      safeTransitionProjectionOnly: true,
      rawCustomerEmailStored: false,
      rawTokenStored: false,
      tokenHashStored: false,
      confirmationUrlStored: false,
      providerPayloadStored: false,
      providerResponseStored: false,
      secretsStored: false,
    },
    rules: {
      queue: getCustomerEmailDispatchQueueStorageRules(),
      adapter: getCustomerEmailProviderDispatchAdapterRules(),
      audit: getCustomerEmailDispatchAuditRules(),
      runner: getCustomerEmailDispatchRunnerRules(),
    },
    blockedContent: [
      "raw customer email",
      "raw token",
      "token hash",
      "confirmation URL",
      "provider payload",
      "provider response",
      "provider secret",
      "raw evidence",
      "raw billing data",
      "internal notes",
      "browser-carried authority",
    ] as const,
  });
}
