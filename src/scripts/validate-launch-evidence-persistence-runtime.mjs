import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const runtimePath = "src/lib/launch-evidence-persistence-runtime.ts";
const contractPath = "src/lib/launch-evidence-persistence-contracts.ts";
const launchValidatorPath = "src/scripts/validate-platform-launch-readiness-contracts.mjs";
const failures = [];

expect(runtimePath, [
  "projectLaunchEvidence",
  "projectLaunchEvidenceBatch",
  "summarizeLaunchEvidenceReadiness",
  "LaunchEvidenceInput",
  "LaunchEvidenceProjection",
  "LaunchEvidencePersistenceResult",
  "LAUNCH_EVIDENCE_PERSISTENCE_CONTRACT",
  "appendOnly: true",
  "publicClaimAllowed: false",
]);

expect(runtimePath, [
  "owner-configuration-evidence",
  "production-smoke-evidence",
  "rollback-evidence",
  "audit-evidence",
  "hard-lock-clearance-evidence",
  "missing",
  "pending",
  "recorded",
  "blocked",
]);

expect(runtimePath, [
  "evidenceId",
  "evidenceType",
  "safeSummary",
  "blockerKey",
  "checklistKey",
  "recordedAt",
  "recordedByRole",
  "auditId",
  "sourceRoute",
  "requestIdHash",
  "redacted-safe-value",
  "redacted-safe-empty",
]);

expect(runtimePath, [
  "paidClaimAllowed: false",
  "reportClaimAllowed: false",
  "blockedProjectionFields",
  "isKnownEvidenceType",
  "safeRole",
  "safeRoute",
  "safeText",
  "stableHash",
]);

expect(contractPath, [
  "LAUNCH_EVIDENCE_PERSISTENCE_CONTRACT",
  "blockedProjectionFields",
  "Launch evidence records must be append-only.",
]);

expect(launchValidatorPath, [
  "launch-evidence-persistence-runtime.ts",
  "projectLaunchEvidence",
  "summarizeLaunchEvidenceReadiness",
]);

forbidden(runtimePath, [
  "publicClaimAllowed: true",
  "paidClaimAllowed: true",
  "reportClaimAllowed: true",
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
  console.error("Launch evidence persistence runtime validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Launch evidence persistence runtime validation passed.");

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
