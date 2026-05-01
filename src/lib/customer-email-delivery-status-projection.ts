import type { CustomerEmailDispatchAuditSafeProjection } from "./customer-email-dispatch-audit-runtime";
import type { CustomerEmailDispatchQueueSafeProjection, CustomerEmailDispatchQueueState } from "./customer-email-dispatch-queue-runtime";
import type { CustomerEmailProviderDispatchAttempt } from "./customer-email-provider-dispatch-adapter";

export type CustomerEmailDeliveryStatusKey = "queued" | "prepared" | "sent" | "held" | "suppressed" | "failed";

export type CustomerEmailDeliveryStatusProjectionInput = {
  queueRecord: CustomerEmailDispatchQueueSafeProjection;
  attempt?: CustomerEmailProviderDispatchAttempt | null;
  audit?: CustomerEmailDispatchAuditSafeProjection | null;
};

export type CustomerEmailDeliveryStatusProjection = {
  ok: boolean;
  status: CustomerEmailDeliveryStatusKey;
  queueId: string;
  customerMessage: string;
  senderName: "Cendorq Support";
  fromAddress: "support@cendorq.com";
  primaryCta: string;
  dashboardPath: "/dashboard" | "/dashboard/reports" | "/dashboard/notifications";
  safeNextAction: string;
  inboxGuidance: readonly string[];
  recoveryGuidance: readonly string[];
  deliverabilityGuaranteeClaimed: false;
  rawCustomerEmailExposed: false;
  rawTokenExposed: false;
  tokenHashExposed: false;
  confirmationUrlExposed: false;
  providerPayloadExposed: false;
  providerResponseExposed: false;
  providerSecretExposed: false;
  rawEvidenceExposed: false;
  rawBillingDataExposed: false;
  internalNotesExposed: false;
};

const STATUS_COPY: Record<CustomerEmailDeliveryStatusKey, Pick<CustomerEmailDeliveryStatusProjection, "customerMessage" | "safeNextAction" | "recoveryGuidance">> = {
  queued: {
    customerMessage: "Your Cendorq confirmation email is queued for controlled dispatch.",
    safeNextAction: "Check your inbox for Cendorq Support support@cendorq.com after the email is sent.",
    recoveryGuidance: [],
  },
  prepared: {
    customerMessage: "Your Cendorq confirmation email is prepared for the approved provider path.",
    safeNextAction: "Watch for Cendorq Support support@cendorq.com and use the confirmation button once it arrives.",
    recoveryGuidance: [],
  },
  sent: {
    customerMessage: "Your Cendorq confirmation email has been marked sent by the controlled dispatch workflow.",
    safeNextAction: "Open the email from Cendorq Support support@cendorq.com and confirm once to enter your command center.",
    recoveryGuidance: ["If you do not see it, check spam or promotions once.", "Move Cendorq to your main inbox or save support@cendorq.com as a trusted sender."],
  },
  held: {
    customerMessage: "Your Cendorq confirmation email is held until the dispatch guardrails are satisfied.",
    safeNextAction: "Return to your Cendorq dashboard for the next safe access step.",
    recoveryGuidance: ["No action is needed with passwords, card numbers, private keys, or session tokens."],
  },
  suppressed: {
    customerMessage: "Your Cendorq confirmation email is suppressed by a safety or duplicate-send control.",
    safeNextAction: "Use your dashboard or support path for a safe recovery option.",
    recoveryGuidance: ["A suppressed email is not a guarantee that an inbox provider blocked delivery.", "Request a safe resend path from inside your protected Cendorq dashboard if needed."],
  },
  failed: {
    customerMessage: "Your Cendorq confirmation email could not be completed through the current dispatch workflow.",
    safeNextAction: "Use the protected dashboard or support path to continue without sharing secrets.",
    recoveryGuidance: ["Do not send passwords, card numbers, private keys, session tokens, raw security payloads, or raw evidence by email.", "If the email is later resent, check spam or promotions once and save support@cendorq.com as a trusted sender."],
  },
};

const INBOX_GUIDANCE = [
  "Look for Cendorq Support support@cendorq.com.",
  "If the message is not visible, check spam or promotions once.",
  "Move Cendorq to your main inbox or save support@cendorq.com as a trusted sender.",
  "Cendorq does not guarantee inbox placement or provider delivery outcomes.",
] as const;

export function projectCustomerEmailDeliveryStatus(
  input: CustomerEmailDeliveryStatusProjectionInput,
): CustomerEmailDeliveryStatusProjection {
  const status = deriveDeliveryStatus(input.queueRecord.state, input.attempt, input.audit);
  const copy = STATUS_COPY[status];
  return {
    ok: status === "queued" || status === "prepared" || status === "sent",
    status,
    queueId: input.queueRecord.queueId,
    customerMessage: copy.customerMessage,
    senderName: "Cendorq Support",
    fromAddress: "support@cendorq.com",
    primaryCta: input.queueRecord.primaryCta,
    dashboardPath: input.queueRecord.dashboardPath,
    safeNextAction: copy.safeNextAction,
    inboxGuidance: INBOX_GUIDANCE,
    recoveryGuidance: copy.recoveryGuidance,
    deliverabilityGuaranteeClaimed: false,
    rawCustomerEmailExposed: false,
    rawTokenExposed: false,
    tokenHashExposed: false,
    confirmationUrlExposed: false,
    providerPayloadExposed: false,
    providerResponseExposed: false,
    providerSecretExposed: false,
    rawEvidenceExposed: false,
    rawBillingDataExposed: false,
    internalNotesExposed: false,
  };
}

export function getCustomerEmailDeliveryStatusProjectionRules() {
  return [
    "delivery status projections are customer-safe summaries, not raw dispatch records",
    "status copy may say queued, prepared, sent, held, suppressed, or failed but must not guarantee inbox placement",
    "customer guidance may suggest checking spam or promotions once and saving support@cendorq.com as a trusted sender",
    "delivery status projections must not expose raw customer emails, raw tokens, token hashes, confirmation URLs, provider payloads, provider responses, provider secrets, raw evidence, raw billing data, or internal notes",
    "failed and held status recovery must direct customers to protected dashboard or support paths without asking for secrets",
  ] as const;
}

function deriveDeliveryStatus(
  queueState: CustomerEmailDispatchQueueState,
  attempt?: CustomerEmailProviderDispatchAttempt | null,
  audit?: CustomerEmailDispatchAuditSafeProjection | null,
): CustomerEmailDeliveryStatusKey {
  if (queueState === "sent" || audit?.toState === "sent") return "sent";
  if (queueState === "failed" || audit?.toState === "failed") return "failed";
  if (queueState === "suppressed" || attempt?.decision === "suppress") return "suppressed";
  if (queueState === "held" || attempt?.decision === "hold") return "held";
  if (queueState === "sending" || attempt?.decision === "ready-for-provider") return "prepared";
  return "queued";
}
