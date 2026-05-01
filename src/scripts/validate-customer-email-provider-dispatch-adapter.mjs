import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const adapterPath = "src/lib/customer-email-provider-dispatch-adapter.ts";
const providerConfigurationPath = "src/lib/customer-email-provider-configuration-contracts.ts";
const queueValidatorPath = "src/scripts/validate-customer-email-dispatch-queue-runtime.mjs";
const providerConfigurationValidatorPath = "src/scripts/validate-customer-email-provider-configuration-contracts.mjs";
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

expect(adapterPath, [
  "Cendorq Support <support@cendorq.com>",
  "support@cendorq.com",
  "queue record must be queued before provider dispatch preparation",
  "provider configuration must be present before live sending",
  "owner approval must be present before live sending",
  "provider payload remains server-only and is never returned to browser-safe projections",
  "confirmation URL is hashed in queue records and only used inside the server-side provider payload",
  "raw customer emails, raw tokens, token hashes, provider secrets, and provider responses must not be exposed to the browser",
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
  "localStorageAllowed: false",
  "sessionStorageAllowed: false",
]);

expect(providerConfigurationPath, [
  "CustomerEmailProviderConfigurationContract",
  "getCustomerEmailProviderConfigurationContracts",
  "getCustomerEmailProviderConfigurationRules",
  "projectCustomerEmailProviderConfigurationSummary",
  "ownerApprovalRequired: true",
  "liveSendRequiresOwnerApproval: true",
  "dryRunAllowedWithoutProviderSecret: true",
  "providerConfigured: false",
  "liveSendAllowed: false",
  "providerPayloadExposed: false",
  "providerResponseExposed: false",
  "providerSecretExposed: false",
  "unboundedAutoSendAllowed: false",
]);

expect(providerConfigurationValidatorPath, [
  "Customer email provider configuration contracts validation passed.",
  "src/lib/customer-email-provider-configuration-contracts.ts",
  "projectCustomerEmailProviderConfigurationSummary",
]);

expect(queueValidatorPath, [
  "src/lib/customer-email-provider-dispatch-adapter.ts",
  "validate-customer-email-provider-dispatch-adapter.mjs",
  "prepareCustomerEmailProviderDispatchAttempt",
]);

forbidden(adapterPath, unsafePhrases());
forbidden(providerConfigurationPath, unsafePhrases());

if (failures.length) {
  console.error("Customer email provider dispatch adapter validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer email provider dispatch adapter validation passed with provider configuration coverage.");

function unsafePhrases() {
  return [
    "providerCallMade: true",
    "providerSecretRead: true",
    "browserVisible: true",
    "customerEmailReturned: true",
    "rawTokenReturned: true",
    "tokenHashReturned: true",
    "providerPayloadReturned: true",
    "localStorageAllowed: true",
    "sessionStorageAllowed: true",
    "localStorage.setItem",
    "sessionStorage.setItem",
    "storeProviderPayload: true",
    "storeProviderResponse: true",
    "storeProviderSecret: true",
    "providerSecretExposed: true",
    "providerPayloadExposed: true",
    "providerResponseExposed: true",
    "unboundedAutoSendAllowed: true",
    "sendGrid",
    "resend.emails.send",
    "fetch(\"https://api",
    "process.env.RESEND_API_KEY",
    "process.env.SENDGRID_API_KEY",
    "guaranteed inbox placement",
    "guaranteed deliverability",
    "guaranteed ROI",
    "guaranteed revenue",
    "100% accurate",
    "impossible to hack",
    "never liable",
    "liability-free",
  ];
}

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
