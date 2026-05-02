import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const runtimePath = "src/lib/production-launch-final-blocker-runtime.ts";
const contractPath = "src/lib/production-launch-final-blocker-contracts.ts";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
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
  "ready-for-release-captain-launch-review",
  "ready-for-owner-review",
]);

expect(runtimePath, [
  "Complete ${group.label.toLowerCase()} evidence before any matching launch claim.",
  "Evidence recorded. Keep proof preserved and continue release-captain review.",
  "allLaunchClaimEvidenceComplete",
  "ownerComplete && smokeComplete && rollbackComplete && auditComplete && hardLocksClear && allComplete",
  "publicClaimAllowed: allLaunchClaimEvidenceComplete",
  "paidClaimAllowed: allLaunchClaimEvidenceComplete",
  "reportClaimAllowed: allLaunchClaimEvidenceComplete",
  "publicClaimAllowed: false",
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
  "docs/owner-maximum-protection-posture.md",
  "validate-owner-maximum-protection-posture.mjs",
]);

forbidden(runtimePath, [
  "paidClaimAllowed: ownerComplete && hardLocksClear",
  "reportClaimAllowed: smokeComplete && rollbackComplete && auditComplete && hardLocksClear",
  "ready-for-public-launch-review",
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
  console.error("Production launch final blocker runtime validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Production launch final blocker runtime validation passed with owner posture coverage. Public, paid, and report claims require all final evidence classes and cannot be unlocked by owner configuration evidence alone.");

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
