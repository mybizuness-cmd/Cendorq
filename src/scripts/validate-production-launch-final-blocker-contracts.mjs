import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const contractPath = "src/lib/production-launch-final-blocker-contracts.ts";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const launchValidatorPath = "src/scripts/validate-platform-launch-readiness-contracts.mjs";
const failures = [];

expect(contractPath, [
  "PRODUCTION_LAUNCH_FINAL_BLOCKER_CONTRACT",
  "PRODUCTION_LAUNCH_FINAL_BLOCKER_BLOCKED_PATTERNS",
  "Production Launch Final Blocker Contract",
  "owner-configuration",
  "production-smoke-target",
  "rollback-evidence",
  "audit-evidence",
  "hard-lock-clearance",
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

expect(contractPath, [
  "auth provider configuration approved by owner",
  "payment mapping approved by owner before paid checkout launch",
  "production smoke target configured",
  "protected denial posture checked",
  "command center closed posture checked",
  "auth rollback plan recorded",
  "billing rollback plan recorded",
  "report release rollback plan recorded",
  "support workflow rollback plan recorded",
  "public conversion rollback plan recorded",
]);

expect(contractPath, [
  "auth audit path recorded",
  "billing audit path recorded",
  "report release audit path recorded",
  "support and operator audit path recorded",
  "maintenance audit path recorded",
  "no customer route leaks protected internals",
  "no pending report is final",
  "no paid access without entitlement and ownership",
  "no client-only billing authority",
  "no unsafe support collection request",
  "no fake urgency or guaranteed outcome claim",
  "no uncontrolled production mutation",
]);

expect(contractPath, [
  "Do not state public launch readiness until every blocker group has complete evidence.",
  "Do not state paid launch readiness until owner payment configuration and entitlement verification are complete.",
  "Do not state report launch readiness until approved report release, ownership, and access checks are complete.",
  "Do not state security readiness as absolute safety; use defense-in-depth, risk reduction, auditability, and controlled access language.",
  "Do not state operations readiness unless command center, support, audit, rollback, and maintenance checks are complete.",
]);

expect(contractPath, [
  "blocked-by-owner-configuration",
  "blocked-by-production-smoke",
  "blocked-by-rollback-evidence",
  "blocked-by-audit-evidence",
  "blocked-by-hard-lock",
  "ready-for-owner-review",
  "ready-for-limited-launch-review",
  "ready-for-public-launch-review",
]);

expect(contractPath, [
  "requiredSafeProjectionFields",
  "blockerKey",
  "evidenceStatus",
  "safeNextAction",
  "publicClaimAllowed",
  "blockedProjectionFields",
  "rawSourceEvidence",
  "protectedProviderDetail",
  "operatorPrivateIdentity",
  "privateCustomerData",
  "internalRiskModel",
  "privilegedConfigValue",
  "privateCredentialMaterial",
  "privateAuditPayload",
]);

expect(contractPath, [
  "Final blocker checks are operator-only and never customer-facing.",
  "Final blocker checks may guide launch review but must not mutate production state.",
  "Final blocker checks must preserve audit proof and must not claim audit records are deleted when preservation is required.",
  "Final blocker checks must use no public launch claim until all blocker groups clear.",
]);

expect(contractPath, [
  "publicLaunchClaimBeforeBlockersClear",
  "paidLaunchClaimBeforeOwnerPaymentConfig",
  "reportLaunchClaimBeforeReleaseApproval",
  "absoluteSecurityClaim",
  "auditDeletionClaim",
  "customerFacingFinalBlockerProjection",
  "productionMutationFromBlockerCheck",
  "rawSourceEvidenceProjection",
  "protectedProviderDetailProjection",
  "operatorPrivateIdentityProjection",
  "privateCustomerDataProjection",
  "internalRiskModelProjection",
  "privilegedConfigValueProjection",
  "privateCredentialMaterialProjection",
  "privateAuditPayloadProjection",
]);

expect(launchValidatorPath, [
  "production-launch-final-blocker-contracts.ts",
  "Production Launch Final Blocker Contract",
  "docs/owner-maximum-protection-posture.md",
  "validate-owner-maximum-protection-posture.mjs",
]);

forbidden(contractPath, [
  "public launch allowed before blockers clear",
  "paid launch allowed before owner payment config",
  "absolute security",
  "impossible to hack",
  "never liable",
  "liability-free",
  "delete audit records",
  "customer-facing blocker projection allowed",
  "mutate production from blocker check",
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
  console.error("Production launch final blocker contracts validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Production launch final blocker contracts validation passed with owner maximum-protection posture coverage.");

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
