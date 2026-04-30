import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const runtimePath = "src/lib/owner-configuration-evidence-runtime.ts";
const contractPath = "src/lib/owner-configuration-evidence-contracts.ts";
const launchValidatorPath = "src/scripts/validate-platform-launch-readiness-contracts.mjs";
const failures = [];

expect(runtimePath, [
  "projectOwnerConfigurationEvidence",
  "summarizeOwnerConfigurationEvidence",
  "OwnerConfigurationEvidenceInput",
  "OwnerConfigurationEvidenceProjection",
  "OwnerConfigurationEvidenceSummary",
  "OwnerConfigurationApprovalStatus",
  "OWNER_CONFIGURATION_EVIDENCE_CONTRACT",
]);

expect(runtimePath, [
  "auth-provider-configuration",
  "payment-mapping-configuration",
  "protected-runtime-configuration",
  "launch-contact-configuration",
  "support-identity-configuration",
  "missing",
  "pending",
  "approved",
  "blocked",
]);

expect(runtimePath, [
  "complete: approvalStatus === \"approved\"",
  "publicLaunchAllowed: false",
  "paidLaunchAllowed: false",
  "approvedCount",
  "pendingCount",
  "missingCount",
  "blockedCount",
  "redacted-safe-value",
  "redacted-safe-empty",
]);

expect(runtimePath, [
  "owner approval evidence is pending and not complete",
  "owner approval evidence is missing and not complete",
  "owner approval evidence is blocked and cannot be used for launch review",
  "blockedProjectionFields",
  "safeRole",
  "safeRoute",
  "safeText",
  "stableHash",
]);

expect(contractPath, [
  "OWNER_CONFIGURATION_EVIDENCE_CONTRACT",
  "blockedProjectionFields",
  "Owner configuration evidence alone must not create public launch approval.",
  "Owner configuration evidence alone must not create paid launch approval.",
]);

expect(launchValidatorPath, [
  "owner-configuration-evidence-runtime.ts",
  "projectOwnerConfigurationEvidence",
  "summarizeOwnerConfigurationEvidence",
]);

forbidden(runtimePath, [
  "publicLaunchAllowed: true",
  "paidLaunchAllowed: true",
  "missing is complete",
  "pending is complete",
  "return rawPayload",
  "return rawEvidence",
  "return rawBillingData",
  "return internalNotes",
  "return operatorIdentity",
  "return databaseUrl",
  "return sessionToken",
  "return csrfToken",
  "return supportContextKey",
  "delete evidence",
  "rewrite evidence",
  "mutate production",
  "localStorage.setItem",
  "sessionStorage.setItem",
  "document.cookie",
]);

if (failures.length) {
  console.error("Owner configuration evidence runtime validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Owner configuration evidence runtime validation passed.");

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
