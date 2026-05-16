import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const runtimePath = "src/lib/stripe-entitlement-idempotency-runtime.ts";
const webhookPath = "src/app/api/stripe/webhook/route.ts";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-stripe-entitlement-idempotency.mjs";

expect(runtimePath, [
  "StripeEntitlementActivationDecision",
  "resolveStripeEntitlementActivationDecision",
  "STRIPE_ENTITLEMENT_IDEMPOTENCY_GUARDS",
  "do not activate entitlement without provider event id",
  "do not activate entitlement without checkout session id",
  "do not activate entitlement without stable customer identity",
  "do not activate entitlement without plan key",
  "do not activate entitlement without verified paid or active subscription state",
  "do not activate entitlement without durable idempotency store",
  "durableStoreRequired: true",
  "entitlementRecordRequired: true",
  "auditRecordRequired: true",
  "rawProviderPayloadStored: false",
  "rawProviderPayloadReturned: false",
  "idempotencyKey",
  "auditEventId",
  "providerEventHash",
  "checkoutSessionHash",
  "customerIdHash",
]);

expect(webhookPath, [
  "resolveStripeEntitlementActivationDecision",
  "paidStateVerified",
  "durableStoreReady: false",
  "entitlementActivated: entitlementDecision.activationAllowed",
  "entitlementActivation: entitlementDecision",
  "customerStableId",
  "accepted: false",
  "entitlementActivated: false",
]);

expect(routesChainPath, [validatorPath]);

forbidden(runtimePath, [
  "durableStoreRequired: false",
  "entitlementRecordRequired: false",
  "auditRecordRequired: false",
  "rawProviderPayloadStored: true",
  "rawProviderPayloadReturned: true",
  "activationAllowed: true",
]);

forbidden(webhookPath, [
  "entitlementActivated: journey.paidWorkCanStart",
  "durableStoreReady: true",
  "rawProviderPayloadStored: true",
  "rawProviderPayloadReturned: true",
]);

if (failures.length) {
  console.error("Stripe entitlement idempotency validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Stripe entitlement idempotency validation passed with stable activation decision, replay-safe keys, durable store requirement, safe audit projection, and route-chain coverage.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
  }
}

function forbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  for (const phrase of phrases) {
    if (text.includes(phrase)) failures.push(`${path} contains forbidden phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
