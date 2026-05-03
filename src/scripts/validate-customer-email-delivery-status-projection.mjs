import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const projectionPath = "src/lib/customer-email-delivery-status-projection.ts";
const queueValidatorPath = "src/scripts/validate-customer-email-dispatch-queue-runtime.mjs";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const packagePath = "package.json";
const failures = [];

expect(projectionPath, [
  "CustomerEmailDeliveryStatusKey",
  "CustomerEmailDeliveryStatusProjectionInput",
  "CustomerEmailDeliveryStatusProjection",
  "projectCustomerEmailDeliveryStatus",
  "getCustomerEmailDeliveryStatusProjectionRules",
  "deriveDeliveryStatus",
  "queued",
  "prepared",
  "sent",
  "held",
  "suppressed",
  "failed",
]);

expect(ownerMaximumProtectionPath, [
  "# Owner Maximum Protection Posture",
  "Protected customer and report surfaces require the correct verified access path.",
  "Operator surfaces remain private, metadata-first, and review-gated.",
]);
expect(ownerMaximumProtectionValidatorPath, ["Owner maximum protection posture validation passed", "docs/owner-maximum-protection-posture.md", "validate:routes"]);
expect(packagePath, ["validate:routes", "validate-customer-email-delivery-status-projection.mjs", "validate-owner-maximum-protection-posture.mjs"]);

expect(projectionPath, [
  "Cendorq Support",
  "support@cendorq.com",
  "Look for Cendorq Support support@cendorq.com.",
  "If the message is not visible, check spam or promotions once.",
  "Move Cendorq to your main inbox or save support@cendorq.com as a trusted sender.",
  "Cendorq does not guarantee inbox placement or provider delivery outcomes.",
  "delivery status projections are customer-safe summaries, not raw dispatch records",
  "deliverabilityGuaranteeClaimed: false",
  "rawCustomerEmailExposed: false",
  "rawTokenExposed: false",
  "tokenHashExposed: false",
  "confirmationUrlExposed: false",
  "providerPayloadExposed: false",
  "providerResponseExposed: false",
  "providerSecretExposed: false",
  "rawEvidenceExposed: false",
  "rawBillingDataExposed: false",
  "internalNotesExposed: false",
]);

expect(queueValidatorPath, [
  "src/lib/customer-email-delivery-status-projection.ts",
  "validate-customer-email-delivery-status-projection.mjs",
  "projectCustomerEmailDeliveryStatus",
]);

forbidden(projectionPath, [
  "deliverabilityGuaranteeClaimed: true",
  "rawCustomerEmailExposed: true",
  "rawTokenExposed: true",
  "tokenHashExposed: true",
  "confirmationUrlExposed: true",
  "providerPayloadExposed: true",
  "providerResponseExposed: true",
  "providerSecretExposed: true",
  "rawEvidenceExposed: true",
  "rawBillingDataExposed: true",
  "internalNotesExposed: true",
]);

if (failures.length) {
  console.error("Customer email delivery status projection validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer email delivery status projection validation passed with owner posture and package wiring coverage.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = read(path);
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}

function forbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path).toLowerCase();
  for (const phrase of phrases) if (text.includes(phrase.toLowerCase())) failures.push(`${path} contains forbidden phrase: ${phrase}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
