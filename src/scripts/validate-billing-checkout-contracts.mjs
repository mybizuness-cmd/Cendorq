import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const contractPath = "src/lib/billing-checkout-contracts.ts";
const packagePath = "package.json";
const failures = [];

expect(contractPath, [
  "BILLING_CHECKOUT_CONTRACT",
  "BILLING_CHECKOUT_BLOCKED_PATTERNS",
  "Billing Checkout and Payment Link Contract",
  "plans-to-checkout",
  "dashboard-to-checkout",
  "billing-center-to-checkout",
  "report-vault-to-plan-upgrade",
  "support-to-billing-center",
  "billing-webhook-to-entitlement",
]);

expect(contractPath, [
  "deep review payment link id or URL provided by owner",
  "build fix payment link id or URL provided by owner",
  "ongoing control payment link id or URL provided by owner",
  "billing portal link id or URL provided by owner",
  "Checkout must be created server-side or via owner-provided payment link mapping",
  "browser must not create authoritative billing state",
]);

expect(contractPath, [
  "Billing webhooks must be verified with provider signature before any entitlement change.",
  "Webhook event ids must be idempotent and stored as hashes or safe references.",
  "Entitlement updates require provider event type, customer ownership mapping, plan mapping, and audit event.",
  "Raw provider payloads, raw billing data, payment method details, card numbers, bank details, and provider internals must not be projected to customer surfaces.",
]);

expect(contractPath, [
  "entitlementProjectionFields",
  "currentAccess",
  "pendingAction",
  "futureEntitlement",
  "billingPortalAvailable",
  "invoiceAvailability",
  "supportPath",
  "blockedProjectionFields",
]);

expect(contractPath, [
  "cardNumber",
  "bankDetails",
  "paymentMethodFingerprint",
  "providerSecret",
  "webhookSecret",
  "checkoutSessionRaw",
  "invoiceRaw",
  "subscriptionRaw",
  "sessionToken",
  "csrfToken",
  "adminKey",
  "supportContextKey",
]);

expect(contractPath, [
  "Do not enable paid checkout until payment links or provider checkout config are owner-provided and mapped to plan keys.",
  "Do not activate entitlement from client-only success redirects; verified webhook or server-confirmed provider state is required.",
  "Do not expose paid report access until entitlement, report release approval, customer ownership, and verified access pass.",
  "Do not deploy billing copy or runtime that asks customers to submit raw payment data through support.",
]);

expect(contractPath, [
  "clientAuthoritativeBillingState",
  "unverifiedWebhookEntitlement",
  "rawProviderPayloadProjection",
  "rawBillingDataProjection",
  "cardNumberCollectionInSupport",
  "bankDetailsCollectionInSupport",
  "providerSecretExposure",
  "webhookSecretExposure",
  "guaranteedRoiCheckoutClaim",
  "guaranteedRefundCheckoutClaim",
  "fakeUrgencyBillingClaim",
  "entitlementWithoutOwnership",
  "reportAccessWithoutEntitlement",
]);

expect(packagePath, [
  "validate:routes",
  "node ./src/scripts/validate-billing-checkout-contracts.mjs",
]);

forbidden(contractPath, [
  "client creates authoritative billing state",
  "unverified webhook can update entitlement",
  "collect card numbers in support",
  "collect bank details in support",
  "guaranteed ROI",
  "guaranteed revenue",
  "guaranteed refund",
  "fake urgency",
  "hide support path",
  "rawProviderPayload=",
  "rawBillingData=",
  "cardNumber=",
  "bankDetails=",
  "webhookSecret=",
  "providerSecret=",
  "sessionToken=",
  "csrfToken=",
  "adminKey=",
  "supportContextKey=",
]);

if (failures.length) {
  console.error("Billing checkout contracts validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Billing checkout contracts validation passed.");

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

  const text = read(path).toLowerCase();
  for (const phrase of phrases) {
    if (text.includes(phrase.toLowerCase())) failures.push(`${path} contains forbidden phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
