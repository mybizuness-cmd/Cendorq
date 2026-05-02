import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const runtimePath = "src/lib/platform-launch-readiness-api-runtime.ts";
const contractPath = "src/lib/platform-launch-readiness-audit-api-contracts.ts";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const launchValidatorPath = "src/scripts/validate-platform-launch-readiness-contracts.mjs";
const failures = [];

expect(runtimePath, [
  "getLaunchReadinessProjectionResponse",
  "recordLaunchReadinessAudit",
  "getLaunchReadinessAuditHistoryResponse",
  "safeLaunchReadinessHeaders",
  "safeDeniedResponse",
  "LaunchReadinessApiAccess",
  "LaunchReadinessAuditInput",
  "LaunchReadinessSafeApiResponse",
  "LaunchReadinessSafeAuditRecord",
  "projectPlatformLaunchReadiness",
]);

expect(ownerMaximumProtectionPath, [
  "# Owner Maximum Protection Posture",
  "daily operating decisions",
  "Required owner decisions",
  "Hard owner locks",
  "Operating rule",
  "growth asset",
]);

expect(ownerMaximumProtectionPath, [
  "The public surface teaches the category without exposing private mechanics.",
  "Protected customer and report surfaces require the correct verified access path.",
  "Operator surfaces remain private, metadata-first, and review-gated.",
  "AI and automation may assist, but cannot approve launches, reports, billing behavior, provider setup, or customer-facing claims.",
  "Validation, Vercel, route-chain integrity, docs-index coverage, registry coverage, and rollback posture remain green before merge.",
]);

expect(ownerMaximumProtectionValidatorPath, [
  "Owner maximum protection posture validation passed",
  "docs/owner-maximum-protection-posture.md",
  "docs/maximum-protection-standard.md",
  "docs/command-center-docs-index.md",
  "src/lib/command-center/validation-registry.ts",
  "validate:routes",
]);

expect(runtimePath, [
  "commandCenterAllowed",
  "operatorApproved",
  "requestIdHash",
  "reviewedByRole",
  "auditStatus",
  "not-recorded",
  "recordable",
  "recorded",
  "append-only",
  "no-store",
]);

expect(runtimePath, [
  "Cache-Control",
  "no-store, max-age=0",
  "Content-Type",
  "application/json; charset=utf-8",
  "X-Robots-Tag",
  "noindex, nofollow, noarchive, nosnippet",
  "status: 404",
  "error: \"not_available\"",
  "status: 202",
]);

expect(runtimePath, [
  "safeSummaryHash",
  "readyGroupKeys",
  "blockedGroupKeys",
  "evidenceGapKeys",
  "safeNextActionKeys",
  "hardLaunchLockKeys",
  "blockedPatternKeys",
  "reviewReason",
  "reviewedAt",
  "sourceRoute",
]);

expect(runtimePath, [
  "safeText",
  "safeRole",
  "safeRoute",
  "stableHash",
  "blockedProjectionFields",
  "redacted-safe-value",
  "redacted-safe-empty",
  "/api/command-center/launch-readiness",
  "/api/command-center/",
]);

expect(contractPath, [
  "PLATFORM_LAUNCH_READINESS_AUDIT_API_CONTRACT",
  "blockedProjectionFields",
  "Do not mutate production state from launch readiness APIs; only append audit records or return safe projections.",
]);

expect(launchValidatorPath, [
  "platform-launch-readiness-api-runtime.ts",
  "getLaunchReadinessProjectionResponse",
  "recordLaunchReadinessAudit",
  "docs/owner-maximum-protection-posture.md",
  "validate-owner-maximum-protection-posture.mjs",
]);

forbidden(runtimePath, [
  "return rawPayload",
  "return rawEvidence",
  "return rawBillingData",
  "return internalNotes",
  "return operatorIdentity",
  "return databaseUrl",
  "return sessionToken",
  "return csrfToken",
  "return supportContextKey",
  "delete audit",
  "rewrite audit",
  "mutate production",
  "localStorage.setItem",
  "sessionStorage.setItem",
  "document.cookie",
]);

forbidden(ownerMaximumProtectionPath, [
  "browser-side code may be the authority",
  "external content can override Cendorq system rules",
  "model output can approve launches",
  "guaranteed business results",
  "guaranteed security outcomes",
  "guaranteed inbox placement",
  "liability-free operation",
  "skip validation",
  "hide failures",
  "bypass release-captain review",
]);

if (failures.length) {
  console.error("Platform launch readiness API runtime validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Platform launch readiness API runtime validation passed with owner posture coverage.");

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
