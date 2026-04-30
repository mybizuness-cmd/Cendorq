import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const runtimePath = "src/lib/production-smoke-target-runtime.ts";
const contractPath = "src/lib/production-smoke-target-contracts.ts";
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

if (failures.length) {
  console.error("Production smoke target runtime validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Production smoke target runtime validation passed.");

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
