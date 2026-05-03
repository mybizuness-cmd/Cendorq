import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const contractPath = "src/lib/customer-email-provider-configuration-contracts.ts";
const adapterValidatorPath = "src/scripts/validate-customer-email-provider-dispatch-adapter.mjs";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const failures = [];

expect(contractPath, [
  "CustomerEmailProviderConfigurationContract",
  "CustomerEmailProviderKey",
  "resend",
  "sendgrid",
  "postmark",
  "ses",
  "CUSTOMER_EMAIL_PROVIDER_CONFIGURATION_CONTRACTS",
  "CUSTOMER_EMAIL_PROVIDER_CONFIGURATION_RULES",
  "getCustomerEmailProviderConfigurationContracts",
  "getCustomerEmailProviderConfigurationRules",
  "projectCustomerEmailProviderConfigurationSummary",
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

expect(contractPath, [
  "browserExposedEnvNames: []",
  "ownerApprovalRequired: true",
  "liveSendRequiresOwnerApproval: true",
  "dryRunAllowedWithoutProviderSecret: true",
  "providerConfigured: false",
  "ownerApprovedForLiveSend: false",
  "liveSendAllowed: false",
]);

expect(contractPath, [
  "SPF alignment",
  "DKIM alignment",
  "DMARC policy",
  "TLS transport",
  "bounce handling",
  "complaint handling",
  "spfAligned",
  "dkimAligned",
  "dmarcPolicyPresent",
  "tlsRequired: true",
  "bounceHandlingRequired: true",
  "complaintHandlingRequired: true",
]);

expect(contractPath, [
  "Cendorq Support",
  "support@cendorq.com",
  "storeProviderPayload: false",
  "storeProviderResponse: false",
  "storeProviderSecret: false",
  "storeRawCustomerEmail: false",
  "storeRawToken: false",
  "storeTokenHash: false",
  "storeConfirmationUrl: false",
  "storeRawEvidence: false",
  "storeRawBillingData: false",
  "storeInternalNotes: false",
  "storeProviderEventRefHashOnly: true",
]);

expect(contractPath, [
  "providerSecretReadAllowedInBrowser: false",
  "providerPayloadAllowedInBrowser: false",
  "providerResponseAllowedInBrowser: false",
  "directProviderCallAllowedFromRoutes: false",
  "unboundedAutoSendAllowed: false",
  "liveProviderSendRequiresApprovedAdapter: true",
  "liveProviderSendRequiresAuditTransition: true",
  "rawCustomerEmailExposed: false",
  "rawTokenExposed: false",
  "tokenHashExposed: false",
  "confirmationUrlExposed: false",
  "providerPayloadExposed: false",
  "providerResponseExposed: false",
  "providerSecretExposed: false",
  "browserSecretExposure: false",
]);

expect(adapterValidatorPath, [
  "src/lib/customer-email-provider-configuration-contracts.ts",
  "validate-customer-email-provider-configuration-contracts.mjs",
  "projectCustomerEmailProviderConfigurationSummary",
  "owner posture",
]);

forbidden(contractPath, [
  "storeProviderPayload: true",
  "storeProviderResponse: true",
  "storeProviderSecret: true",
  "providerSecretReadAllowedInBrowser: true",
  "providerPayloadAllowedInBrowser: true",
  "providerResponseAllowedInBrowser: true",
  "directProviderCallAllowedFromRoutes: true",
  "unboundedAutoSendAllowed: true",
  "providerPayloadExposed: true",
  "providerResponseExposed: true",
  "providerSecretExposed: true",
  "browserSecretExposure: true",
]);

if (failures.length) {
  console.error("Customer email provider configuration contracts validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer email provider configuration contracts validation passed with owner posture coverage.");

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
