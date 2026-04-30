import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const workflowPath = "src/lib/owner-configuration-evidence-approval-workflow-runtime.ts";
const failures = [];

expect(workflowPath, [
  "OwnerConfigurationEvidenceApprovalDecision",
  "OwnerConfigurationEvidenceApprovalWorkflowInput",
  "OwnerConfigurationEvidenceApprovalWorkflowProjection",
  "projectOwnerConfigurationEvidenceApprovalWorkflow",
  "evidenceRecorded",
  "safeSummaryAvailable",
  "ownerApprovalRecorded",
  "releaseCaptainReviewed",
  "missingAreaKeys",
  "pendingAreaKeys",
  "blockedAreaKeys",
  "approvedAreaKeys",
  "finalValidator: \"release-captain\"",
  "not-ready",
  "owner-approved-pending-release-review",
  "release-reviewed-not-launch-approved",
  "Release captain review is required before any launch readiness claim.",
]);

expect(workflowPath, [
  "launchApprovalDerivedFromEvidence: false",
  "publicLaunchAllowed: false",
  "paidLaunchAllowed: false",
  "reportLaunchAllowed: false",
  "securityReadinessApproved: false",
  "sanitizeRecordForWorkflow",
  "redacted-safe-value",
]);

forbidden(workflowPath, [
  "publicLaunchAllowed: true",
  "paidLaunchAllowed: true",
  "reportLaunchAllowed: true",
  "securityReadinessApproved: true",
  "launchApprovalDerivedFromEvidence: true",
  "agentFinalApprovalAuthority",
  "chiefAgentFinalAuthority",
  "rawProviderPayload",
  "paymentProviderPayload",
  "protectedConfigValue",
  "privateCredentialMaterial",
  "operatorPrivateIdentity",
  "privateCustomerData",
  "privateAuditPayload",
  "localStorage.setItem",
  "sessionStorage.setItem",
  "guaranteed ROI",
  "guaranteed revenue",
  "impossible to hack",
  "liability-free",
]);

if (failures.length) {
  console.error("Command center owner configuration evidence approval workflow validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command center owner configuration evidence approval workflow validation passed.");

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
