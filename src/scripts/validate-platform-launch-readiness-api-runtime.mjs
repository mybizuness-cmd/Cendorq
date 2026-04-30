import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const runtimePath = "src/lib/platform-launch-readiness-api-runtime.ts";
const contractPath = "src/lib/platform-launch-readiness-audit-api-contracts.ts";
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

if (failures.length) {
  console.error("Platform launch readiness API runtime validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Platform launch readiness API runtime validation passed.");

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
