import { createHash } from "node:crypto";

import type { CustomerConfirmationEmailPayload } from "./customer-confirmation-email-issuance-runtime";
import type { CustomerEmailDispatchAuditSafeProjection } from "./customer-email-dispatch-audit-runtime";
import type { CustomerEmailProviderDispatchAttempt } from "./customer-email-provider-dispatch-adapter";
import { projectCustomerEmailProviderConfigurationSummary } from "./customer-email-provider-configuration-contracts";

export type CustomerEmailProviderSendInterfaceInput = {
  attempt: CustomerEmailProviderDispatchAttempt;
  providerPayload: CustomerConfirmationEmailPayload["providerReadyPayload"];
  providerConfigured: boolean;
  ownerApproved: boolean;
  providerAdapterApproved: boolean;
  auditTransition?: CustomerEmailDispatchAuditSafeProjection | null;
  liveSendRequested?: boolean;
};

export type CustomerEmailProviderSendInterfaceResult = {
  ok: boolean;
  decision: "ready-for-approved-provider-adapter" | "hold";
  queueId: string;
  providerEventRefHash: string | null;
  providerPayloadHash: string;
  providerConfigured: boolean;
  ownerApproved: boolean;
  providerAdapterApproved: boolean;
  auditTransitionPresent: boolean;
  liveSendRequested: boolean;
  providerCallMade: false;
  providerSecretRead: false;
  rawCustomerEmailReturned: false;
  rawTokenReturned: false;
  tokenHashReturned: false;
  confirmationUrlReturned: false;
  providerPayloadReturned: false;
  providerResponseReturned: false;
  providerResponseStored: false;
  providerSecretExposed: false;
  browserVisible: false;
  localStorageAllowed: false;
  sessionStorageAllowed: false;
  holdReasons: readonly string[];
  requiredGuards: readonly string[];
};

const SEND_INTERFACE_GUARDS = [
  "send interface is a boundary contract and must not call live providers directly until an approved provider adapter exists",
  "live provider sending requires provider configuration, explicit owner approval, approved provider adapter, and audit transition coverage",
  "provider-ready payload must remain server-side and must never be returned to browser-safe projections",
  "provider response bodies must never be stored; future live sends may store only providerEventRefHash",
  "raw customer emails, raw tokens, token hashes, confirmation URLs, provider secrets, provider payloads, and provider responses must not be returned",
  "browser code must never read provider secrets or carry provider payload authority",
  "Cendorq Support <support@cendorq.com> remains the sender identity",
] as const;

export function sendCustomerEmailProviderMessage(
  input: CustomerEmailProviderSendInterfaceInput,
): CustomerEmailProviderSendInterfaceResult {
  const holdReasons = deriveHoldReasons(input);
  const providerPayloadHash = hashProviderPayload(input.providerPayload);
  const decision = holdReasons.length ? "hold" : "ready-for-approved-provider-adapter";

  return {
    ok: decision === "ready-for-approved-provider-adapter",
    decision,
    queueId: input.attempt.queueId,
    providerEventRefHash: decision === "ready-for-approved-provider-adapter" ? hashProviderEventRef(input.attempt.queueId, providerPayloadHash) : null,
    providerPayloadHash,
    providerConfigured: input.providerConfigured,
    ownerApproved: input.ownerApproved,
    providerAdapterApproved: input.providerAdapterApproved,
    auditTransitionPresent: Boolean(input.auditTransition),
    liveSendRequested: input.liveSendRequested === true,
    providerCallMade: false,
    providerSecretRead: false,
    rawCustomerEmailReturned: false,
    rawTokenReturned: false,
    tokenHashReturned: false,
    confirmationUrlReturned: false,
    providerPayloadReturned: false,
    providerResponseReturned: false,
    providerResponseStored: false,
    providerSecretExposed: false,
    browserVisible: false,
    localStorageAllowed: false,
    sessionStorageAllowed: false,
    holdReasons,
    requiredGuards: SEND_INTERFACE_GUARDS,
  };
}

export function getCustomerEmailProviderSendInterfaceRules() {
  return SEND_INTERFACE_GUARDS;
}

export function projectCustomerEmailProviderSendReadiness() {
  const configuration = projectCustomerEmailProviderConfigurationSummary();
  return {
    ...configuration,
    sendInterfaceAvailable: true,
    liveProviderCallImplemented: false,
    providerCallMade: false,
    providerSecretRead: false,
    providerEventRefHashOnly: true,
    providerPayloadReturned: false,
    providerResponseReturned: false,
    providerResponseStored: false,
  } as const;
}

function deriveHoldReasons(input: CustomerEmailProviderSendInterfaceInput) {
  const reasons: string[] = [];
  if (input.attempt.decision !== "ready-for-provider") reasons.push("dispatchAttemptNotReadyForProvider");
  if (!input.attempt.providerPayloadAccepted) reasons.push("providerPayloadNotAccepted");
  if (!input.providerConfigured) reasons.push("providerNotConfigured");
  if (!input.ownerApproved) reasons.push("ownerApprovalMissing");
  if (!input.providerAdapterApproved) reasons.push("providerAdapterNotApproved");
  if (!input.auditTransition) reasons.push("auditTransitionMissing");
  if (input.liveSendRequested !== true) reasons.push("liveSendNotRequested");
  return reasons;
}

function hashProviderPayload(payload: CustomerConfirmationEmailPayload["providerReadyPayload"]) {
  return createHash("sha256")
    .update(
      JSON.stringify({
        templateKey: payload.templateKey,
        senderDisplay: payload.senderDisplay,
        subject: payload.subject,
        preheader: payload.preheader,
        primaryCta: payload.primaryCta,
        confirmationUrl: payload.confirmationUrl,
      }),
    )
    .digest("hex");
}

function hashProviderEventRef(queueId: string, providerPayloadHash: string) {
  return createHash("sha256").update(`${queueId}:${providerPayloadHash}:provider-event-ref`).digest("hex");
}
