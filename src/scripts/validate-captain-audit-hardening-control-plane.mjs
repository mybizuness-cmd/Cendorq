import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const docPath = "docs/captain-audit-hardening-control-plane.md";
const runtimePath = "src/lib/captain-audit-hardening-control-plane.ts";
const ownerValidatorPath = "src/scripts/validate-owner-operating-manual.mjs";
const failures = [];

expect(docPath, [
  "# Captain Audit Hardening Control Plane",
  "prevents Cendorq captain work from turning into blind feature marching",
  "Owner command is above the captain",
  "Required takeover sequence",
  "Three independent reviews",
  "Buyer path and conversion review",
  "Production safety and operations review",
  "Maintenance and backend-readiness review",
  "Five hardening passes",
  "Weak-area registry",
]);

expect(docPath, [
  "Verify latest main and Vercel status.",
  "Verify active branch status and whether it is identical, ahead, behind, or conflicted.",
  "Review open pull requests for relevance, staleness, duplicate risk, dependency risk, and merge safety.",
  "Review the handoff packet and compare it to current GitHub state.",
  "Identify weak areas before adding new features.",
  "Patch the highest-risk weakness first when it affects future work quality.",
]);

expect(docPath, [
  "Route and discovery hardening",
  "Language and trust hardening",
  "Privacy and configuration hardening",
  "Integration and backend-readiness hardening",
  "Manual QA and release hardening",
  "Validation has many phrase-based checks and needs more behavior-oriented runtime tests over time.",
  "Architecture contracts are ahead of some live implementation surfaces.",
  "Admin command center needs an integrated RBAC, audit, approval, and safe notes foundation before more operator UI expansion.",
  "Older open PRs must be triaged before they are merged, revived, or ignored.",
]);

expect(docPath, [
  "Fresh branch from latest merged main.",
  "Smallest valuable coherent layer.",
  "Validation added or updated.",
  "Diff reviewed before PR.",
  "Vercel checked.",
  "Merge only when Vercel is green and PR is mergeable.",
  "The correct continuation point after the already-merged customer operations layers is admin command center foundation",
]);

expect(runtimePath, [
  "CaptainAuditReviewKey",
  "CaptainAuditHardeningPassKey",
  "CaptainAuditWeakAreaKey",
  "CaptainAuditControlPlaneProjection",
  "CAPTAIN_AUDIT_REVIEWS",
  "CAPTAIN_AUDIT_HARDENING_PASSES",
  "CAPTAIN_AUDIT_WEAK_AREAS",
  "CAPTAIN_AUDIT_CONTROL_RULES",
  "projectCaptainAuditHardeningControlPlane",
  "getCaptainAuditControlRules",
  "admin-command-center-foundation",
]);

expect(runtimePath, [
  "buyer-path-conversion",
  "production-safety-operations",
  "maintenance-backend-readiness",
  "route-discovery",
  "language-trust",
  "privacy-configuration",
  "integration-backend-readiness",
  "manual-qa-release",
]);

expect(runtimePath, [
  "phrase-based-validation",
  "contracts-ahead-of-implementation",
  "admin-command-center-gap",
  "open-pr-triage",
  "visual-qa-gap",
  "production-readiness-gap",
  "live-provider-send-blocked",
  "report-generation-depth-gap",
  "agent-orchestration-not-production",
  "backend-zip-intake-not-started",
]);

expect(runtimePath, [
  "ownerCommandAboveCaptain: true",
  "captainMustAuditBeforeExpansion: true",
  "branchLoopRequired: true",
  "vercelGreenBeforeMergeRequired: true",
  "stalePrBlindMergeAllowed: false",
  "uncontrolledAgentApprovalAllowed: false",
  "unsupportedGuaranteeAllowed: false",
  "browserSecretExposureAllowed: false",
  "rawCustomerDataExposureAllowed: false",
  "providerPayloadExposureAllowed: false",
  "customerFacingInternalNotesAllowed: false",
]);

expect(ownerValidatorPath, [
  "src/scripts/validate-captain-audit-hardening-control-plane.mjs",
  "src/lib/captain-audit-hardening-control-plane.ts",
  "docs/captain-audit-hardening-control-plane.md",
  "projectCaptainAuditHardeningControlPlane",
]);

forbidden(docPath, unsafePhrases());
forbidden(runtimePath, unsafePhrases());

if (failures.length) {
  console.error("Captain audit hardening control plane validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Captain audit hardening control plane validation passed.");

function unsafePhrases() {
  return [
    "owner command is below the captain",
    "captain may skip audit",
    "blind feature marching is allowed",
    "stalePrBlindMergeAllowed: true",
    "uncontrolledAgentApprovalAllowed: true",
    "unsupportedGuaranteeAllowed: true",
    "browserSecretExposureAllowed: true",
    "rawCustomerDataExposureAllowed: true",
    "providerPayloadExposureAllowed: true",
    "customerFacingInternalNotesAllowed: true",
    "merge without Vercel",
    "guaranteed ROI",
    "guaranteed revenue",
    "guaranteed deliverability",
    "guaranteed inbox placement",
    "100% accurate",
    "impossible to hack",
    "never liable",
    "liability-free",
    "localStorage.setItem",
    "sessionStorage.setItem",
  ];
}

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = read(path);
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}

function forbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path).toLowerCase();
  for (const phrase of phrases) if (text.includes(phrase.toLowerCase())) failures.push(`${path} contains forbidden phrase: ${phrase}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
