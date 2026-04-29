import {
  CUSTOMER_SUPPORT_LIFECYCLE_COMMUNICATION_RULES,
  type CustomerSupportLifecycleChannel,
  type CustomerSupportLifecycleCommunicationRule,
} from "@/lib/customer-support-lifecycle-communication-orchestration";
import type { CustomerSupportCustomerVisibleStatus } from "@/lib/customer-support-status-contracts";

export type CustomerSupportLifecycleCommunicationDecision = "send" | "hold" | "suppress";

export type CustomerSupportLifecycleCommunicationInput = {
  supportRequestId: string;
  status: CustomerSupportCustomerVisibleStatus;
  customerOwnershipVerified: boolean;
  verifiedSession: boolean;
  safeStatusProjectionExists: boolean;
  alreadyCommunicatedKeys?: readonly string[];
  suppressionKeys?: readonly string[];
  allowedChannels?: readonly CustomerSupportLifecycleChannel[];
};

export type CustomerSupportLifecycleCommunicationPlan = {
  supportRequestId: string;
  status: CustomerSupportCustomerVisibleStatus;
  decision: CustomerSupportLifecycleCommunicationDecision;
  notificationKey: string;
  emailKey: string;
  primaryPath: string;
  channels: readonly CustomerSupportLifecycleChannel[];
  sendReasons: readonly string[];
  holdReasons: readonly string[];
  suppressionReasons: readonly string[];
  requiredGuards: readonly string[];
};

export const CUSTOMER_SUPPORT_LIFECYCLE_COMMUNICATION_RUNTIME_GUARDS = [
  "communication runtime returns only customer-safe keys, paths, channels, reasons, and guards",
  "communication runtime never returns raw payloads, raw evidence, raw security payloads, raw billing data, internal notes, operator identities, risk-scoring internals, attacker details, prompts, secrets, session tokens, CSRF tokens, admin keys, support context keys, or rejected unsafe content",
  "communication runtime holds when customer ownership, verified session, or customer-safe status projection is missing",
  "communication runtime suppresses duplicate status communication when a status rule was already communicated",
  "communication runtime respects channel suppression and allowed channel filters before returning send decisions",
  "communication runtime routes only to support status, safe resubmission, support center, or new request paths",
] as const;

export function buildSupportLifecycleCommunicationPlan(input: CustomerSupportLifecycleCommunicationInput): CustomerSupportLifecycleCommunicationPlan {
  const rule = getSupportLifecycleCommunicationRule(input.status);
  const blockedByGate = requiredGateFailures(input);
  const duplicateKey = `${input.supportRequestId}:${rule.key}`;
  const alreadyCommunicated = includesSafe(input.alreadyCommunicatedKeys, duplicateKey) || includesSafe(input.alreadyCommunicatedKeys, rule.key);
  const suppressed = input.suppressionKeys?.filter((key) => key === rule.key || key === duplicateKey || rule.channels.includes(key as CustomerSupportLifecycleChannel)) ?? [];
  const allowedChannels = input.allowedChannels?.length ? rule.channels.filter((channel) => input.allowedChannels?.includes(channel)) : rule.channels;
  const channelSuppression = allowedChannels.length ? [] : ["no allowed communication channels"];
  const suppressionReasons = [...suppressed.map((key) => `suppressed by ${key}`), ...channelSuppression];
  const holdReasons = [...blockedByGate, ...(alreadyCommunicated ? ["status communication already sent"] : []), ...rule.holdWhen];
  const decision: CustomerSupportLifecycleCommunicationDecision = suppressionReasons.length
    ? "suppress"
    : holdReasons.length > rule.holdWhen.length
      ? "hold"
      : "send";

  return {
    supportRequestId: sanitizePlanValue(input.supportRequestId, 120),
    status: input.status,
    decision,
    notificationKey: rule.notificationKey,
    emailKey: rule.emailKey,
    primaryPath: rule.primaryPath,
    channels: allowedChannels,
    sendReasons: rule.sendWhen,
    holdReasons,
    suppressionReasons,
    requiredGuards: rule.requiredGuards,
  };
}

export function getSupportLifecycleCommunicationRule(status: CustomerSupportCustomerVisibleStatus): CustomerSupportLifecycleCommunicationRule {
  return (
    CUSTOMER_SUPPORT_LIFECYCLE_COMMUNICATION_RULES.find((rule) => rule.status === status) ??
    CUSTOMER_SUPPORT_LIFECYCLE_COMMUNICATION_RULES[0]
  );
}

export function projectSupportLifecycleCommunicationPlan(plan: CustomerSupportLifecycleCommunicationPlan) {
  return {
    supportRequestId: plan.supportRequestId,
    status: plan.status,
    decision: plan.decision,
    notificationKey: plan.notificationKey,
    emailKey: plan.emailKey,
    primaryPath: plan.primaryPath,
    channels: plan.channels,
    sendReasons: plan.sendReasons,
    holdReasons: plan.holdReasons,
    suppressionReasons: plan.suppressionReasons,
    requiredGuards: plan.requiredGuards,
  };
}

function requiredGateFailures(input: CustomerSupportLifecycleCommunicationInput) {
  const failures: string[] = [];
  if (!input.customerOwnershipVerified) failures.push("customer ownership not verified");
  if (!input.verifiedSession) failures.push("verified session missing");
  if (!input.safeStatusProjectionExists) failures.push("customer-safe status projection missing");
  return failures;
}

function includesSafe(values: readonly string[] | undefined, value: string) {
  return Boolean(values?.some((candidate) => candidate === value));
}

function sanitizePlanValue(value: string, maxLength: number) {
  return value
    .normalize("NFKC")
    .replace(/[^a-zA-Z0-9:_-]/g, "")
    .slice(0, maxLength);
}
