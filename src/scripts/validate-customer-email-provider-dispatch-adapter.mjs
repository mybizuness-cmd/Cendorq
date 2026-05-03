import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const adapterPath = "src/lib/customer-email-provider-dispatch-adapter.ts";
const providerConfigurationPath = "src/lib/customer-email-provider-configuration-contracts.ts";
const providerSendInterfacePath = "src/lib/customer-email-provider-send-interface.ts";
const queueValidatorPath = "src/scripts/validate-customer-email-dispatch-queue-runtime.mjs";
const providerConfigurationValidatorPath = "src/scripts/validate-customer-email-provider-configuration-contracts.mjs";
const providerSendInterfaceValidatorPath = "src/scripts/validate-customer-email-provider-send-interface.mjs";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const failures = [];

expect(adapterPath, [
  "prepareCustomerEmailProviderDispatchAttempt",
  "getCustomerEmailProviderDispatchAdapterRules",
  "CustomerEmailProviderDispatchAttempt",
  "CustomerEmailProviderDispatchAttemptInput",
  "ready-for-provider",
  "dry-run-ready",
  "hold",
  "suppress",
  "providerConfigured",
  "ownerApproved",
  "dryRun",
  "suppressionActive",
]);

expect(ownerMaximumProtectionPath, [
  "# Owner Maximum Protection Posture",
  "Protected customer and report surfaces require the correct verified access path.",
  "Operator surfaces remain private, metadata-first, and review-gated.",
]);

expect(ownerMaximumProtectionValidatorPath, [
  "Owner maximum protection posture validation passed",
  "docs/owner-maximum-protection-posture.md",
  "validate:routes",
]);

expect(adapterPath, [
  "Cendorq Support <support@cendorq.com>",
  "queue record must be queued before provider dispatch preparation",
  "provider configuration must be present before live sending",
  "owner approval must be present before live sending",
  "provider payload remains server-only and is never returned to browser-safe projections",
  "confirmation URL is hashed in queue records and only used inside the server-side provider payload",
]);

expect(adapterPath, [
  "queueRecordNotQueued",
  "unsupportedTemplateKey",
  "senderAddressMismatch",
  "confirmationUrlHashMissing",
  "providerPayloadRejected",
  "providerNotConfigured",
  "ownerApprovalMissing",
  "suppressionActive",
  "providerCallMade: false",
  "providerSecretRead: false",
  "browserVisible: false",
  "customerEmailReturned: false",
  "rawTokenReturned: false",
  "tokenHashReturned: false",
  "providerPayloadReturned: false",
]);

expect(providerConfigurationPath, [
  "CustomerEmailProviderConfigurationContract",
  "projectCustomerEmailProviderConfigurationSummary",
  "ownerApprovalRequired: true",
  "liveSendRequiresOwnerApproval: true",
  "providerConfigured: false",
  "liveSendAllowed: false",
  "providerPayloadExposed: false",
  "providerResponseExposed: false",
  "providerSecretExposed: false",
]);

expect(providerSendInterfacePath, [
  "sendCustomerEmailProviderMessage",
  "projectCustomerEmailProviderSendReadiness",
  "ready-for-approved-provider-adapter",
  "providerEventRefHashOnly: true",
  "liveProviderCallImplemented: false",
  "providerCallMade: false",
  "providerSecretRead: false",
  "providerPayloadReturned: false",
  "providerResponseReturned: false",
]);

expect(providerConfigurationValidatorPath, [
  "Customer email provider configuration contracts validation passed.",
  "src/lib/customer-email-provider-configuration-contracts.ts",
  "projectCustomerEmailProviderConfigurationSummary",
]);

expect(providerSendInterfaceValidatorPath, [
  "Customer email provider send interface validation passed.",
  "src/lib/customer-email-provider-send-interface.ts",
  "sendCustomerEmailProviderMessage",
]);

expect(queueValidatorPath, [
  "src/lib/customer-email-provider-dispatch-adapter.ts",
  "validate-customer-email-provider-dispatch-adapter.mjs",
  "prepareCustomerEmailProviderDispatchAttempt",
]);

forbidden(adapterPath, [
  "providerCallMade: true",
  "providerSecretRead: true",
  "browserVisible: true",
  "customerEmailReturned: true",
  "rawTokenReturned: true",
  "tokenHashReturned: true",
  "providerPayloadReturned: true",
  "providerResponseReturned: true",
  "providerResponseStored: true",
  "providerSecretExposed: true",
  "providerPayloadExposed: true",
  "providerResponseExposed: true",
  "unboundedAutoSendAllowed: true",
]);
forbidden(providerConfigurationPath, ["providerSecretExposed: true", "providerPayloadExposed: true", "providerResponseExposed: true", "unboundedAutoSendAllowed: true"]);
forbidden(providerSendInterfacePath, ["providerCallMade: true", "providerSecretRead: true", "providerPayloadReturned: true", "providerResponseReturned: true", "providerResponseStored: true"]);

if (failures.length) {
  console.error("Customer email provider dispatch adapter validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer email provider dispatch adapter validation passed with provider configuration, send interface, and owner posture coverage.");

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
