import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const runtimePath = "src/lib/production-smoke-target-runtime.ts";
const contractPath = "src/lib/production-smoke-target-contracts.ts";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const launchValidatorPath = "src/scripts/validate-platform-launch-readiness-contracts.mjs";
const failures = [];

expect(runtimePath, [
  "projectProductionSmokeTarget",
  "projectProductionSmokeRoute",
  "ProductionSmokeRouteInput",
  "ProductionSmokeRouteProjection",
  "ProductionSmokeTargetSummary",
  "ProductionSmokeObservedPosture",
  "PRODUCTION_SMOKE_TARGET_CONTRACT",
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
  "reachable-public-safe",
  "safe-auth-boundary-or-safe-render",
  "generic-safe-denial-without-session",
  "closed-by-default",
  "operator-only-safe-projection",
  "unexpected",
  "publicLaunchAllowed: false",
]);

expect(runtimePath, [
  "smokeRunId",
  "targetName",
  "routeGroupKey",
  "expectedPosture",
  "observedPosture",
  "result",
  "checkedAt",
  "safeSummary",
  "evidenceId",
  "requestIdHash",
  "redacted-safe-value",
  "redacted-safe-empty",
]);

expect(runtimePath, [
  "allowedRoute && matchesExpectedPosture ? \"pass\" : \"blocked\"",
  "Observed posture matches expected posture",
  "does not match expected posture",
  "blockedSmokeRecordFields",
  "safeRoute",
  "safeText",
  "stableHash",
]);

expect(contractPath, [
  "PRODUCTION_SMOKE_TARGET_CONTRACT",
  "routeGroups",
  "blockedSmokeRecordFields",
]);

expect(launchValidatorPath, [
  "production-smoke-target-runtime.ts",
  "projectProductionSmokeTarget",
  "projectProductionSmokeRoute",
  "docs/owner-maximum-protection-posture.md",
  "validate-owner-maximum-protection-posture.mjs",
]);

forbidden(runtimePath, [
  "publicLaunchAllowed: true",
  "return rawPayload",
  "return rawEvidence",
  "return rawBillingData",
  "return internalNotes",
  "return operatorIdentity",
  "return databaseUrl",
  "return sessionToken",
  "return csrfToken",
  "return supportContextKey",
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
  console.error("Production smoke target runtime validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Production smoke target runtime validation passed with owner posture coverage.");

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
