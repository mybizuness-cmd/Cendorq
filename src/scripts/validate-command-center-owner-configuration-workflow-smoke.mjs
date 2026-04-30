import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const evidenceRoutePath = "src/app/api/command-center/owner-configuration/evidence/route.ts";
const workflowRoutePath = "src/app/api/command-center/owner-configuration/workflow/route.ts";
const workflowPanelPath = "src/app/command-center/owner-configuration-workflow-panel.tsx";
const pagePath = "src/app/command-center/page.tsx";
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

forbidden(evidenceRoutePath, unsafePhrases());
forbidden(workflowRoutePath, unsafePhrases());
forbidden(workflowPanelPath, unsafePhrases());

if (failures.length) {
  console.error("Command center owner configuration workflow smoke validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command center owner configuration workflow smoke validation passed.");

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
