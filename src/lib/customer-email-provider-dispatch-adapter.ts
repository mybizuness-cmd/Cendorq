import { createHash } from "node:crypto";

import type { CustomerEmailDispatchQueueSafeProjection } from "./customer-email-dispatch-queue-runtime";
import type { CustomerConfirmationEmailPayload } from "./customer-confirmation-email-issuance-runtime";

export type CustomerEmailProviderDispatchDecision = "ready-for-provider" | "dry-run-ready" | "hold" | "suppress";

export type CustomerEmailProviderDispatchAttemptInput = {
  queueRecord: CustomerEmailDispatchQueueSafeProjection;
  providerPayload: CustomerConfirmationEmailPayload["providerReadyPayload"];
  providerConfigured: boolean;
  ownerApproved: boolean;
  dryRun?: boolean;
  suppressionActive?: boolean;
};

export type CustomerEmailProviderDispatchAttempt = {
  decision: CustomerEmailProviderDispatchDecision;
  queueId: string;
  templateKey: "confirm-email";
  senderDisplay: "Cendorq Support <support@cendorq.com>";
  fromAddress: "support@cendorq.com";
  subject: string;
  preheader: string;
  primaryCta: string;
  confirmationPath: "/api/customer/email/confirm";
  confirmationUrlHash: string;
  providerPayloadHash: string;
  providerPayloadAccepted: boolean;
  providerCallMade: false;
  providerSecretRead: false;
  browserVisible: false;
  customerEmailReturned: false;
  rawTokenReturned: false;
  tokenHashReturned: false;
  providerPayloadReturned: false;
  localStorageAllowed: false;
  sessionStorageAllowed: false;
  requiredGuards: readonly string[];
  holdReasons: readonly string[];
  suppressionReasons: readonly string[];
};

const REQUIRED_GUARDS = [
  "queue record must be queued before provider dispatch preparation",
  "provider configuration must be present before live sending",
  "owner approval must be present before live sending",
  "provider payload remains server-only and is never returned to browser-safe projections",
  "confirmation URL is hashed in queue records and only used inside the server-side provider payload",
  "Cendorq Support <support@cendorq.com> remains the sender identity",
  "raw customer emails, raw tokens, token hashes, provider secrets, and provider responses must not be exposed to the browser",
] as const;

export function prepareCustomerEmailProviderDispatchAttempt(
  input: CustomerEmailProviderDispatchAttemptInput,
): CustomerEmailProviderDispatchAttempt {
  const holdReasons = getHoldReasons(input);
  const suppressionReasons = input.suppressionActive ? ["suppressionActive"] : [];
  const providerPayloadAccepted = isProviderPayloadAccepted(input);
  const decision: CustomerEmailProviderDispatchDecision = suppressionReasons.length
    ? "suppress"
    : holdReasons.length
      ? "hold"
      : input.dryRun
        ? "dry-run-ready"
        : "ready-for-provider";

  return {
    decision,
    queueId: input.queueRecord.queueId,
    templateKey: "confirm-email",
    senderDisplay: "Cendorq Support <support@cendorq.com>",
    fromAddress: "support@cendorq.com",
    subject: input.queueRecord.subject,
    preheader: input.queueRecord.preheader,
    primaryCta: input.queueRecord.primaryCta,
    confirmationPath: input.queueRecord.confirmationPath,
    confirmationUrlHash: input.queueRecord.confirmationUrlHash,
    providerPayloadHash: providerPayloadAccepted ? hashProviderPayload(input.providerPayload) : "",
    providerPayloadAccepted,
    providerCallMade: false,
    providerSecretRead: false,
    browserVisible: false,
    customerEmailReturned: false,
    rawTokenReturned: false,
    tokenHashReturned: false,
    providerPayloadReturned: false,
    localStorageAllowed: false,
    sessionStorageAllowed: false,
    requiredGuards: REQUIRED_GUARDS,
    holdReasons,
    suppressionReasons,
  };
}

export function getCustomerEmailProviderDispatchAdapterRules() {
  return REQUIRED_GUARDS;
}

function getHoldReasons(input: CustomerEmailProviderDispatchAttemptInput) {
  const reasons: string[] = [];
  if (input.queueRecord.state !== "queued") reasons.push("queueRecordNotQueued");
  if (input.queueRecord.templateKey !== "confirm-email") reasons.push("unsupportedTemplateKey");
  if (input.queueRecord.fromAddress !== "support@cendorq.com") reasons.push("senderAddressMismatch");
  if (!input.queueRecord.confirmationUrlHash) reasons.push("confirmationUrlHashMissing");
  if (!isProviderPayloadAccepted(input)) reasons.push("providerPayloadRejected");
  if (!input.providerConfigured && !input.dryRun) reasons.push("providerNotConfigured");
  if (!input.ownerApproved && !input.dryRun) reasons.push("ownerApprovalMissing");
  return reasons;
}

function isProviderPayloadAccepted(input: CustomerEmailProviderDispatchAttemptInput) {
  const payload = input.providerPayload;
  return Boolean(
    payload &&
      payload.templateKey === "confirm-email" &&
      payload.senderDisplay === "Cendorq Support <support@cendorq.com>" &&
      payload.subject === input.queueRecord.subject &&
      payload.preheader === input.queueRecord.preheader &&
      payload.primaryCta === input.queueRecord.primaryCta &&
      payload.confirmationUrl.includes(input.queueRecord.confirmationPath) &&
      !/password=|privateKey=|cardNumber=|bankDetail=|rawPayload=|rawEvidence=|sessionToken=|csrfToken=|adminKey=/i.test(payload.confirmationUrl),
  );
}

function hashProviderPayload(payload: CustomerConfirmationEmailPayload["providerReadyPayload"]) {
  return createHash("sha256")
    .update(JSON.stringify({
      templateKey: payload.templateKey,
      senderDisplay: payload.senderDisplay,
      subject: payload.subject,
      preheader: payload.preheader,
      primaryCta: payload.primaryCta,
      confirmationUrl: payload.confirmationUrl,
    }))
    .digest("hex");
}
