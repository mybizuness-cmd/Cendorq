import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const checks = [
  ["src/lib/customer-email-provider-dispatch-adapter.ts", [
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
    "Cendorq Support <support@cendorq.com>",
    "queue record must be queued before provider dispatch preparation",
    "provider configuration must be present before live sending",
    "owner approval must be present before live sending",
    "provider payload remains server-only and is never returned to browser-safe projections",
    "confirmation URL is hashed in queue records and only used inside the server-side provider payload",
    "queueRecordNotQueued",
    "unsupportedTemplateKey",
    "senderAddressMismatch",
    "confirmationUrlHashMissing",
    "providerPayloadRejected",
    "providerNotConfigured",
    "ownerApprovalMissing",
    "providerCallMade: false",
    "providerSecretRead: false",
    "browserVisible: false",
    "providerPayloadReturned: false",
  ]],
  ["src/lib/customer-email-provider-configuration-contracts.ts", [
    "CustomerEmailProviderConfigurationContract",
    "projectCustomerEmailProviderConfigurationSummary",
    "ownerApprovalRequired: true",
    "liveSendRequiresOwnerApproval: true",
    "providerConfigured: false",
    "liveSendAllowed: false",
    "providerPayloadExposed: false",
    "providerResponseExposed: false",
    "providerSecretExposed: false",
  ]],
  ["src/lib/customer-email-provider-send-interface.ts", [
    "sendCustomerEmailProviderMessage",
    "projectCustomerEmailProviderSendReadiness",
    "ready-for-approved-provider-adapter",
    "providerEventRefHashOnly: true",
    "liveProviderCallImplemented: false",
    "providerCallMade: false",
    "providerSecretRead: false",
    "providerPayloadReturned: false",
    "providerResponseReturned: false",
  ]],
  ["docs/owner-maximum-protection-posture.md", ["# Owner Maximum Protection Posture", "Protected customer and report surfaces require the correct verified access path."]],
  ["src/scripts/validate-owner-maximum-protection-posture.mjs", ["Owner maximum protection posture validation passed", "docs/owner-maximum-protection-posture.md", "validate:routes"]],
  ["src/scripts/validate-customer-email-provider-configuration-contracts.mjs", ["src/lib/customer-email-provider-configuration-contracts.ts", "projectCustomerEmailProviderConfigurationSummary"]],
  ["src/scripts/validate-customer-email-provider-send-interface.mjs", ["src/lib/customer-email-provider-send-interface.ts", "sendCustomerEmailProviderMessage"]],
  ["src/scripts/validate-customer-email-dispatch-queue-runtime.mjs", ["src/lib/customer-email-provider-dispatch-adapter.ts", "validate-customer-email-provider-dispatch-adapter.mjs", "prepareCustomerEmailProviderDispatchAttempt"]],
];

for (const [path, phrases] of checks) expect(path, phrases);

if (failures.length) {
  console.error("Customer email provider dispatch adapter validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer email provider dispatch adapter validation passed.");

function expect(path, phrases) {
  const absolute = join(root, path);
  if (!existsSync(absolute)) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = readFileSync(absolute, "utf8");
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}
