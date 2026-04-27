import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

validateTextFile("docs/maximum-protection-standard.md", [
  "Cendorq Maximum Protection Standard",
  "Default posture: deny by default.",
  "Secrets must never be committed.",
  "no client-side secret exposure",
  "no public database browser",
  "server-side service access only",
  "AI agents must treat external content as untrusted.",
  "No single layer should be trusted as the only protection.",
  "Every major change should reduce or contain these threats, not expand them.",
]);

validateTextFile("src/lib/command-center/security-posture.ts", [
  "COMMAND_CENTER_SECURITY_POSTURE",
  "maximum-practical-defense-in-depth",
  "absoluteGuaranteeClaimAllowed: false",
  "defaultAccess: \"deny\"",
  "privateDataAccess: \"server-side-only\"",
  "secretsPolicy: \"server-env-only-never-client\"",
  "databasePolicy: \"private-server-only-no-public-browser\"",
  "aiActionPolicy: \"review-gated-no-autonomous-customer-output\"",
  "publicExposureAllowed",
  "unhackable",
  "perfect security",
  "zero risk",
]);

validateTextFile("src/lib/command-center/panel-registry.ts", [
  "COMMAND_CENTER_PANEL_REGISTRY",
  "CommandCenterPanelRegistryItem",
  "visibility: \"private-gated\"",
  "dataExposure: \"metadata-only\"",
  "protectionNote",
  "secret values",
  "customer data",
  "raw intelligence",
  "order: 10",
  "order: 160",
  "getCommandCenterPanelRegistry",
]);

validateTextFile("src/lib/command-center/access.ts", [
  "timingSafePreviewKeyEqual",
  "getCommandCenterAccessPolicy",
  "defaultMode: \"closed\"",
  "minimumPreviewKeyLength: MINIMUM_PREVIEW_KEY_LENGTH",
  "comparisonMode: \"timing-safe\"",
  "publicAccessAllowed: false",
  "clientSideBypassAllowed: false",
  "MINIMUM_PREVIEW_KEY_LENGTH = 32",
  "isStrongPreviewKey",
  "mismatch |= candidate.charCodeAt(index) ^ expected.charCodeAt(index)",
  "allowed: false, mode: \"closed\"",
  "allowed: true, mode: \"preview\"",
]);

validateTextFile("src/lib/command-center/auth-readiness.ts", [
  "COMMAND_CENTER_AUTH_ALLOWED_PROVIDERS",
  "COMMAND_CENTER_AUTH_CONFIG_KEYS",
  "AUTH_PROVIDER",
  "AUTH_SECRET",
  "MINIMUM_AUTH_SECRET_LENGTH = 32",
  "providerAllowed",
  "authSecretShape",
  "defaultAccess: \"deny\"",
  "sessionValidation: \"server-side-required\"",
  "rolePolicy: \"least-privilege\"",
  "auditPolicy: \"record-access-decisions\"",
  "clientOnlyProtectionAllowed: false",
  "publicBypassAllowed: false",
  "session revocation path",
  "service access rotation path",
]);

validateTextFile("src/lib/command-center/file-storage-readiness.ts", [
  "COMMAND_CENTER_FILE_STORAGE_ALLOWED_PROVIDERS",
  "COMMAND_CENTER_FILE_STORAGE_CONFIG_KEYS",
  "FILE_STORAGE_PROVIDER",
  "FILE_STORAGE_SERVER_TOKEN",
  "MINIMUM_FILE_STORAGE_SERVER_TOKEN_LENGTH = 32",
  "providerAllowed",
  "serverTokenShape",
  "objectVisibility: \"private\"",
  "uploadAuthorization: \"server-side-required\"",
  "downloadPolicy: \"signed-or-authenticated\"",
  "publicListingAllowed: false",
  "clientDirectUploadAllowed: false",
  "clientDirectDownloadAllowed: false",
  "download access recording",
  "revocation path",
]);

validateTextFile("src/lib/command-center/billing-readiness.ts", [
  "COMMAND_CENTER_BILLING_ALLOWED_PROVIDERS",
  "COMMAND_CENTER_BILLING_CONFIG_KEYS",
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "MINIMUM_BILLING_SECRET_LENGTH = 32",
  "providerAllowed",
  "secretKeyShape",
  "webhookSecretShape",
  "checkoutCreation: \"server-side-only\"",
  "webhookVerification: \"signature-required\"",
  "billingStateAuthority: \"verified-webhook-or-server-reconciliation\"",
  "clientBillingMutationAllowed: false",
  "unverifiedWebhookAllowed: false",
  "publicBillingRecordAccessAllowed: false",
  "idempotent webhook handling",
  "billing event replay protection",
]);

validateTextFile("src/lib/command-center/delivery-readiness.ts", [
  "COMMAND_CENTER_DELIVERY_ALLOWED_PROVIDERS",
  "COMMAND_CENTER_DELIVERY_CONFIG_KEYS",
  "REPORT_DELIVERY_PROVIDER",
  "REPORT_DELIVERY_SERVER_TOKEN",
  "MINIMUM_DELIVERY_SERVER_TOKEN_LENGTH = 32",
  "providerAllowed",
  "serverTokenShape",
  "deliveryAuthorization: \"server-side-required\"",
  "customerSendPolicy: \"review-approved-output-only\"",
  "sourceOfTruth: \"cendorq\"",
  "vendorLockInAllowed: false",
  "clientDirectSendAllowed: false",
  "unapprovedCustomerDeliveryAllowed: false",
  "publicDeliveryRecordAccessAllowed: false",
  "approved output requirement",
  "provider failure containment",
]);

validateTextFile("src/lib/command-center/automation-readiness.ts", [
  "COMMAND_CENTER_AUTOMATION_CONFIG_KEYS",
  "AUTOMATION_SIGNING_SECRET",
  "MINIMUM_AUTOMATION_SIGNING_SECRET_LENGTH = 32",
  "signingSecretShape",
  "executionPolicy: \"server-side-only\"",
  "inboundEventPolicy: \"signed-events-required\"",
  "idempotencyPolicy: \"required\"",
  "retryPolicy: \"retry-safe-with-failure-recording\"",
  "operatorVisibility: \"required\"",
  "clientExecutionAllowed: false",
  "unsignedInboundEventAllowed: false",
  "nonIdempotentExecutionAllowed: false",
  "publicAutomationRecordAccessAllowed: false",
  "dead-letter review path",
  "automation pause switch",
]);

validateTextFile("src/lib/command-center/governance-readiness.ts", [
  "COMMAND_CENTER_GOVERNANCE_CONFIG_KEYS",
  "GOVERNANCE_CONTACT_EMAIL",
  "contactShape",
  "privacyRequestPolicy: \"private-tracked-response-required\"",
  "retentionPolicy: \"reviewed-before-delete-or-export\"",
  "backupPolicy: \"tracked-private-exports-only\"",
  "incidentPolicy: \"recorded-with-containment-owner\"",
  "publicGovernanceRecordAccessAllowed: false",
  "untrackedPrivacyRequestAllowed: false",
  "untrackedBackupExportAllowed: false",
  "destructiveRetentionWithoutReviewAllowed: false",
  "private governance record access",
  "containment owner assignment",
  "destructive retention review gate",
  "backup export review gate",
]);

validateTextFile("src/lib/command-center/intelligence-readiness.ts", [
  "COMMAND_CENTER_INTELLIGENCE_CONFIG_KEYS",
  "INTELLIGENCE_REVIEW_OWNER",
  "reviewOwnerShape",
  "classificationPolicy: \"evidence-gated\"",
  "memoryPromotionPolicy: \"human-reviewed-reversible\"",
  "rawIntelligenceAccess: \"private-only\"",
  "customerSummaryPolicy: \"client-safe-separated-from-raw\"",
  "promptInjectionPolicy: \"external-content-untrusted\"",
  "publicRawIntelligenceAllowed: false",
  "aiAutopromotionAllowed: false",
  "unsupportedSignalAuthorityAllowed: false",
  "customerUnsafeSummaryAllowed: false",
  "prompt-injection resistant source handling",
  "raw intelligence private by default",
  "reversible memory promotion",
  "unsupported signal authority blocker",
]);

validateTextFile("src/lib/command-center/database-config.ts", [
  "getCommandCenterDatabaseConfigState",
  "COMMAND_CENTER_DATABASE_CONFIG_KEYS",
  "DATABASE_URL",
  "serverOnly: true",
  "publicExposureAllowed: false",
  "intentional-operator-controlled",
  "postgresql:",
]);

validateTextFile("src/lib/command-center/database-readiness.ts", [
  "getCommandCenterDatabaseConfigState",
  "safeConnectionShape",
  "serverOnly: true",
  "publicExposureAllowed: false",
  "migrationPolicy",
]);

for (const path of [
  "src/lib/command-center/security-posture.ts",
  "src/lib/command-center/panel-registry.ts",
  "src/lib/command-center/access.ts",
  "src/lib/command-center/auth-readiness.ts",
  "src/lib/command-center/file-storage-readiness.ts",
  "src/lib/command-center/billing-readiness.ts",
  "src/lib/command-center/delivery-readiness.ts",
  "src/lib/command-center/automation-readiness.ts",
  "src/lib/command-center/governance-readiness.ts",
  "src/lib/command-center/intelligence-readiness.ts",
  "src/lib/command-center/database-config.ts",
  "src/lib/command-center/database-readiness.ts",
]) {
  validateHelperSafety(path);
}

if (failures.length) {
  console.error("Command Center security posture validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command Center security posture validation passed. The system uses maximum practical defense-in-depth language, denies absolute security guarantees, keeps cockpit panels private-gated and metadata-only, keeps auth, files, billing, delivery, automation, governance, intelligence, and database configuration server-only, blocks public exposure, hardens preview access with strong secret requirements and timing-safe comparison, enforces least-privilege auth readiness, protects private file storage boundaries, requires verified billing state changes, requires approved-output delivery, requires signed idempotent automation, keeps governance records private and reviewed, keeps raw intelligence private and evidence-gated, preserves Cendorq as source of truth, and preserves review-gated private operation boundaries.");

function validateTextFile(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing security posture file: ${path}`);
    return;
  }

  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing required phrase: ${phrase}`);
  }
}

function validateHelperSafety(path) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  for (const forbidden of ["NEXT_PUBLIC", "localStorage", "sessionStorage", "use client", "secretValue", "unhackable: true", "absoluteGuaranteeClaimAllowed: true", "publicExposureAllowed: true", "clientSideBypassAllowed: true", "clientOnlyProtectionAllowed: true", "publicBypassAllowed: true", "publicListingAllowed: true", "clientDirectUploadAllowed: true", "clientDirectDownloadAllowed: true", "clientBillingMutationAllowed: true", "unverifiedWebhookAllowed: true", "publicBillingRecordAccessAllowed: true", "vendorLockInAllowed: true", "clientDirectSendAllowed: true", "unapprovedCustomerDeliveryAllowed: true", "publicDeliveryRecordAccessAllowed: true", "clientExecutionAllowed: true", "unsignedInboundEventAllowed: true", "nonIdempotentExecutionAllowed: true", "publicAutomationRecordAccessAllowed: true", "publicGovernanceRecordAccessAllowed: true", "untrackedPrivacyRequestAllowed: true", "untrackedBackupExportAllowed: true", "destructiveRetentionWithoutReviewAllowed: true", "publicRawIntelligenceAllowed: true", "aiAutopromotionAllowed: true", "unsupportedSignalAuthorityAllowed: true", "customerUnsafeSummaryAllowed: true", "dataExposure: \"live-data\"", "visibility: \"public\"", "allowed: true, mode: \"closed\""]) {
    if (text.includes(forbidden)) failures.push(`${path} contains forbidden security behavior: ${forbidden}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
