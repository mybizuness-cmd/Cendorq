import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const contractPath = "src/lib/customer-email-provider-configuration-contracts.ts";
const adapterValidatorPath = "src/scripts/validate-customer-email-provider-dispatch-adapter.mjs";
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
]);

forbidden(contractPath, [
  "browserExposedEnvNames: [\"",
  "storeProviderPayload: true",
  "storeProviderResponse: true",
  "storeProviderSecret: true",
  "storeRawCustomerEmail: true",
  "storeRawToken: true",
  "storeTokenHash: true",
  "storeConfirmationUrl: true",
  "storeRawEvidence: true",
  "storeRawBillingData: true",
  "storeInternalNotes: true",
  "providerSecretReadAllowedInBrowser: true",
  "providerPayloadAllowedInBrowser: true",
  "providerResponseAllowedInBrowser: true",
  "directProviderCallAllowedFromRoutes: true",
  "unboundedAutoSendAllowed: true",
  "rawCustomerEmailExposed: true",
  "rawTokenExposed: true",
  "tokenHashExposed: true",
  "confirmationUrlExposed: true",
  "providerPayloadExposed: true",
  "providerResponseExposed: true",
  "providerSecretExposed: true",
  "browserSecretExposure: true",
  "guaranteed inbox placement",
  "guaranteed deliverability",
  "guaranteed ROI",
  "guaranteed revenue",
  "100% accurate",
  "impossible to hack",
  "never liable",
  "liability-free",
]);

if (failures.length) {
  console.error("Customer email provider configuration contracts validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer email provider configuration contracts validation passed.");

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
