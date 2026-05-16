import { createHash } from "node:crypto";

import type { CendorqPaidPlanKey } from "@/lib/pricing-checkout-orchestration";

export type StripeEntitlementActivationDecision = {
  idempotencyKey: string;
  auditEventId: string;
  providerEventHash: string;
  checkoutSessionHash: string;
  customerIdHash: string;
  planKey: CendorqPaidPlanKey;
  replaySafe: boolean;
  durableStoreRequired: true;
  entitlementRecordRequired: true;
  auditRecordRequired: true;
  activationAllowed: boolean;
  activationBlockedReason: "missing-event-id" | "missing-session-id" | "missing-customer" | "missing-plan" | "missing-paid-state" | "durable-store-required";
  rawProviderPayloadStored: false;
  rawProviderPayloadReturned: false;
};

type ResolveStripeEntitlementActivationInput = {
  eventId: string;
  checkoutSessionId: string;
  customerStableId: string;
  planKey: CendorqPaidPlanKey | "";
  paidStateVerified: boolean;
  durableStoreReady?: boolean;
};

export const STRIPE_ENTITLEMENT_IDEMPOTENCY_GUARDS = [
  "do not activate entitlement without provider event id",
  "do not activate entitlement without checkout session id",
  "do not activate entitlement without stable customer identity",
  "do not activate entitlement without plan key",
  "do not activate entitlement without verified paid or active subscription state",
  "do not activate entitlement without durable idempotency store",
  "do not store or return raw provider payloads in entitlement audit records",
] as const;

export function resolveStripeEntitlementActivationDecision(input: ResolveStripeEntitlementActivationInput): StripeEntitlementActivationDecision {
  const eventId = cleanIdentifier(input.eventId);
  const checkoutSessionId = cleanIdentifier(input.checkoutSessionId);
  const customerStableId = cleanCustomerStableId(input.customerStableId);
  const planKey = input.planKey;
  const paidStateVerified = input.paidStateVerified === true;
  const durableStoreReady = input.durableStoreReady === true;

  const activationBlockedReason = resolveBlockedReason({
    eventId,
    checkoutSessionId,
    customerStableId,
    planKey,
    paidStateVerified,
    durableStoreReady,
  });
  const activationAllowed = activationBlockedReason === "durable-store-required" ? false : !activationBlockedReason;
  const idempotencyKey = buildStableHash(["stripe-entitlement", eventId, checkoutSessionId, customerStableId, planKey || "unknown-plan"]);

  return {
    idempotencyKey,
    auditEventId: `entitlement_${idempotencyKey.slice(0, 32)}`,
    providerEventHash: buildStableHash(["provider-event", eventId]),
    checkoutSessionHash: buildStableHash(["checkout-session", checkoutSessionId]),
    customerIdHash: buildStableHash(["customer", customerStableId]),
    planKey: planKey || "deep-review",
    replaySafe: Boolean(eventId && checkoutSessionId && customerStableId && planKey && paidStateVerified),
    durableStoreRequired: true,
    entitlementRecordRequired: true,
    auditRecordRequired: true,
    activationAllowed,
    activationBlockedReason: activationBlockedReason || "durable-store-required",
    rawProviderPayloadStored: false,
    rawProviderPayloadReturned: false,
  };
}

function resolveBlockedReason(input: {
  eventId: string;
  checkoutSessionId: string;
  customerStableId: string;
  planKey: CendorqPaidPlanKey | "";
  paidStateVerified: boolean;
  durableStoreReady: boolean;
}): StripeEntitlementActivationDecision["activationBlockedReason"] | "" {
  if (!input.eventId) return "missing-event-id";
  if (!input.checkoutSessionId) return "missing-session-id";
  if (!input.customerStableId) return "missing-customer";
  if (!input.planKey) return "missing-plan";
  if (!input.paidStateVerified) return "missing-paid-state";
  if (!input.durableStoreReady) return "durable-store-required";
  return "";
}

function cleanIdentifier(value: string) {
  return value.trim().replace(/[^a-zA-Z0-9:_-]/g, "").slice(0, 220);
}

function cleanCustomerStableId(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9@._:-]/g, "").slice(0, 220);
}

function buildStableHash(parts: string[]) {
  return createHash("sha256").update(parts.join("|")).digest("hex");
}
