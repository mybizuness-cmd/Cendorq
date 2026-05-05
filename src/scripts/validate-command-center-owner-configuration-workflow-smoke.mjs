import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const evidenceRoutePath = "src/app/api/command-center/owner-configuration/evidence/route.ts";
const workflowRoutePath = "src/app/api/command-center/owner-configuration/workflow/route.ts";
const workflowPanelPath = "src/app/command-center/owner-configuration-workflow-panel.tsx";
const pagePath = "src/app/command-center/page.tsx";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const packagePath = "package.json";
const smokeSuccessAnchor = "Command center owner configuration workflow smoke validation passed.";
const failures = [];

expect(evidenceRoutePath, [
  "resolveCommandCenterAccessState",
  "commandCenterPreviewHeaderName",
  "containsBlockedEvidenceShape",
  "acceptedInput: \"safe-summary-only\"",
  "persistenceMode: \"audit-safe-record-projection\"",
  "X-Robots-Tag",
  "noindex, nofollow, noarchive, nosnippet",
  "Cache-Control",
  "no-store, max-age=0",
]);

expect(workflowRoutePath, [
  "resolveCommandCenterAccessState",
  "commandCenterPreviewHeaderName",
  "recordOwnerConfigurationEvidenceBatch",
  "projectOwnerConfigurationEvidenceApprovalWorkflow",
  "workflowMode: \"release-captain-final-review-required\"",
  "reviewedByRole: \"release-captain\"",
  "X-Robots-Tag",
  "noindex, nofollow, noarchive, nosnippet",
  "Cache-Control",
  "no-store, max-age=0",
]);

expect(workflowPanelPath, [
  "OwnerConfigurationWorkflowPanel",
  "Workflow blockers",
  "workflow.missingAreaKeys",
  "workflow.pendingAreaKeys",
  "workflow.blockedAreaKeys",
  "does not approve public launch, paid launch, report launch, security readiness, provider configuration, payment mapping, or customer-facing claims",
]);

expect(pagePath, [
  "<OwnerConfigurationEvidencePanel />",
  "<OwnerConfigurationWorkflowPanel />",
  "<OperatorReadinessMatrix />",
  "ClosedCommandCenterPanel",
  "resolveCommandCenterAccessState",
]);

expect(ownerMaximumProtectionPath, [
  "# Owner Maximum Protection Posture",
  "Protected customer and report surfaces require the correct verified access path.",
  "Operator surfaces remain private, metadata-first, and review-gated.",
  "AI and automation may assist, but cannot approve launches, reports, billing behavior, provider setup, or customer-facing claims.",
]);

expect(ownerMaximumProtectionValidatorPath, [
  "Owner maximum protection posture validation passed",
  "docs/owner-maximum-protection-posture.md",
  "validate:routes",
]);

expect(packagePath, [
  "validate:routes",
  "validate-command-center-owner-configuration-workflow-smoke.mjs",
  "validate-owner-maximum-protection-posture.mjs",
]);

forbidden(evidenceRoutePath, unsafePhrases());
forbidden(workflowRoutePath, unsafePhrases());
forbidden(workflowPanelPath, unsafePhrases());

if (failures.length) {
  console.error("Command center owner configuration workflow smoke validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`${smokeSuccessAnchor} Owner posture coverage remains wired.`);

function unsafePhrases() {
  return [
    "publicLaunchAllowed: true",
    "paidLaunchAllowed: true",
    "reportLaunchAllowed: true",
    "securityReadinessApproved: true",
    "launchApprovalDerivedFromEvidence: true",
    "rawProviderPayload",
    "paymentProviderPayload",
    "protectedConfigValue",
    "privateCredentialMaterial",
    "operatorPrivateIdentity",
    "privateCustomerData",
    "privateAuditPayload",
    "localStorage.setItem",
    "sessionStorage.setItem",
    "document.cookie",
    "guaranteed ROI",
    "guaranteed revenue",
    "impossible to hack",
    "liability-free",
  ];
}

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
