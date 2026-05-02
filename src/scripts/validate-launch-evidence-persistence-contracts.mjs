import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const contractPath = "src/lib/launch-evidence-persistence-contracts.ts";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const launchValidatorPath = "src/scripts/validate-platform-launch-readiness-contracts.mjs";
const failures = [];

expect(contractPath, [
  "LAUNCH_EVIDENCE_PERSISTENCE_CONTRACT",
  "LAUNCH_EVIDENCE_PERSISTENCE_BLOCKED_PATTERNS",
  "Launch Evidence Persistence Contract",
  "owner-configuration-evidence",
  "production-smoke-evidence",
  "rollback-evidence",
  "audit-evidence",
  "hard-lock-clearance-evidence",
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
  "Launch evidence records must be append-only.",
  "Launch evidence records must preserve audit proof and must not claim required audit records are deleted.",
  "Launch evidence records must be operator-only and never customer-facing.",
  "Launch evidence records may unlock operator review state only through safe projection and must not mutate production state.",
  "Launch evidence records must be tied to a launch readiness blocker or checklist item.",
  "Launch evidence records must use generic safe failure when access, storage, or evidence validation fails.",
]);

expect(contractPath, [
  "evidenceId",
  "evidenceType",
  "status",
  "safeSummary",
  "blockerKey",
  "checklistKey",
  "recordedAt",
  "recordedByRole",
  "auditId",
  "sourceRoute",
  "requestIdHash",
]);

expect(contractPath, [
  "rawSourceEvidence",
  "rawPayload",
  "rawEvidence",
  "rawSecurityPayload",
  "rawBillingData",
  "protectedProviderDetail",
  "operatorPrivateIdentity",
  "operatorEmail",
  "operatorIp",
  "privateCustomerData",
  "internalNotes",
  "internalRiskModel",
  "privilegedConfigValue",
  "privateCredentialMaterial",
  "privateAuditPayload",
  "systemPrompt",
  "developerPrompt",
  "sessionAuthority",
  "adminAuthority",
  "supportContextAuthority",
  "crossCustomerData",
]);

expect(contractPath, [
  "Do not treat missing evidence as launch-ready.",
  "Do not treat pending evidence as complete evidence.",
  "Do not allow public launch, paid launch, report launch, or security readiness claims from evidence records alone.",
  "Do not expose evidence persistence records through customer routes, customer emails, notifications, support pages, billing center, report vault, public pages, or crawlers.",
  "Do not allow evidence record deletion, rewrite, hidden overwrite, or production mutation from evidence persistence paths.",
]);

expect(contractPath, [
  "evidenceDeletion",
  "evidenceRewrite",
  "hiddenEvidenceOverwrite",
  "customerFacingEvidenceProjection",
  "publicEvidenceProjection",
  "missingEvidenceLaunchReady",
  "pendingEvidenceComplete",
  "evidenceOnlyPublicLaunchClaim",
  "evidenceOnlyPaidLaunchClaim",
  "evidenceOnlyReportLaunchClaim",
  "absoluteSecurityEvidenceClaim",
  "productionMutationFromEvidencePath",
  "rawSourceEvidenceProjection",
  "protectedProviderDetailProjection",
  "operatorPrivateIdentityProjection",
  "privateCustomerDataProjection",
  "internalRiskModelProjection",
  "privilegedConfigValueProjection",
  "privateCredentialMaterialProjection",
  "privateAuditPayloadProjection",
  "crossCustomerDataProjection",
]);

expect(launchValidatorPath, [
  "launch-evidence-persistence-contracts.ts",
  "Launch Evidence Persistence Contract",
  "docs/owner-maximum-protection-posture.md",
  "validate-owner-maximum-protection-posture.mjs",
]);

forbidden(contractPath, [
  "evidence deletion is allowed",
  "evidence rewrite is allowed",
  "missing evidence is launch-ready",
  "pending evidence is complete",
  "customer-facing evidence projection allowed",
  "public evidence projection allowed",
  "absolute security",
  "impossible to hack",
  "never liable",
  "liability-free",
  "delete audit records",
  "mutate production from evidence",
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
  console.error("Launch evidence persistence contracts validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Launch evidence persistence contracts validation passed with owner maximum-protection posture coverage.");

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
