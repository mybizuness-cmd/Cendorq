import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const runtimePath = "src/lib/production-launch-final-blocker-runtime.ts";
const contractPath = "src/lib/production-launch-final-blocker-contracts.ts";
const launchValidatorPath = "src/scripts/validate-platform-launch-readiness-contracts.mjs";
const failures = [];

expect(runtimePath, [
  "projectProductionLaunchFinalBlockers",
  "ProductionLaunchFinalBlockerInput",
  "ProductionLaunchFinalBlockerProjection",
  "ProductionLaunchFinalBlockerSummary",
  "PRODUCTION_LAUNCH_FINAL_BLOCKER_CONTRACT",
  "ownerConfigurationComplete",
  "productionSmokeComplete",
  "rollbackEvidenceComplete",
  "auditEvidenceComplete",
  "hardLocksClear",
]);

expect(runtimePath, [
  "blockerKey",
  "label",
  "blocks",
  "requiredEvidence",
  "evidenceStatus",
  "safeNextAction",
  "publicClaimAllowed",
  "paidClaimAllowed",
  "reportClaimAllowed",
  "blockedCount",
  "completeCount",
  "safeNextActions",
]);

expect(runtimePath, [
  "blocked-by-owner-configuration",
  "blocked-by-production-smoke",
  "blocked-by-rollback-evidence",
  "blocked-by-audit-evidence",
  "blocked-by-hard-lock",
  "ready-for-public-launch-review",
  "ready-for-owner-review",
]);

expect(runtimePath, [
  "Complete ${group.label.toLowerCase()} evidence before any matching launch claim.",
  "Evidence recorded. Keep proof preserved and continue release review.",
  "publicClaimAllowed: allComplete",
  "paidClaimAllowed: ownerComplete && hardLocksClear",
  "reportClaimAllowed: smokeComplete && rollbackComplete && auditComplete && hardLocksClear",
]);

expect(contractPath, [
  "PRODUCTION_LAUNCH_FINAL_BLOCKER_CONTRACT",
  "owner-configuration",
  "production-smoke-target",
  "rollback-evidence",
  "audit-evidence",
  "hard-lock-clearance",
]);

expect(launchValidatorPath, [
  "production-launch-final-blocker-runtime.ts",
  "projectProductionLaunchFinalBlockers",
]);

forbidden(runtimePath, [
  "public claim allowed before blockers",
  "paid claim allowed before owner",
  "absolute security",
  "impossible to hack",
  "never liable",
  "liability-free",
  "delete audit records",
  "localStorage.setItem",
  "sessionStorage.setItem",
  "document.cookie",
]);

if (failures.length) {
  console.error("Production launch final blocker runtime validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Production launch final blocker runtime validation passed.");

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
