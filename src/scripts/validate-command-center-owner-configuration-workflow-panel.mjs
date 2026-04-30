import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const panelPath = "src/app/command-center/owner-configuration-workflow-panel.tsx";
const pagePath = "src/app/command-center/page.tsx";
const failures = [];

expect(panelPath, [
  "OwnerConfigurationWorkflowPanel",
  "projectOwnerConfigurationEvidenceApprovalWorkflow",
  "recordOwnerConfigurationEvidenceBatch",
  "Owner configuration workflow",
  "Evidence recorded, owner approval tracked, and release-captain review required before any launch posture can move.",
  "Workflow blockers",
  "workflow.decision",
  "workflow.evidenceRecorded",
  "workflow.ownerApprovalRecorded",
  "workflow.finalValidator",
  "workflow.missingAreaKeys",
  "workflow.pendingAreaKeys",
  "workflow.blockedAreaKeys",
]);

expect(panelPath, [
  "does not approve public launch, paid launch, report launch, security readiness, provider configuration, payment mapping, or customer-facing claims",
  "Missing, pending, or blocked evidence remains incomplete",
  "Release-captain review is tracked separately and still does not create launch approval by itself.",
]);

expect(pagePath, [
  "OwnerConfigurationWorkflowPanel",
  "./owner-configuration-workflow-panel",
  "<OwnerConfigurationEvidencePanel />",
  "<OwnerConfigurationWorkflowPanel />",
  "<OperatorReadinessMatrix />",
  "ClosedCommandCenterPanel",
  "resolveCommandCenterAccessState",
]);

forbidden(panelPath, [
  "publicLaunchAllowed: true",
  "paidLaunchAllowed: true",
  "reportLaunchAllowed: true",
  "securityReadinessApproved: true",
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
  console.error("Command center owner configuration workflow panel validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command center owner configuration workflow panel validation passed.");

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
