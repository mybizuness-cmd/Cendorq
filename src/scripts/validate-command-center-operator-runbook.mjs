import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const runbookPath = "docs/command-center-operator-runbook.md";
const docsIndexPath = "docs/command-center-docs-index.md";
const packagePath = "package.json";
const ownerEvidenceRoutePath = "src/app/api/command-center/owner-configuration/evidence/route.ts";
const ownerWorkflowRoutePath = "src/app/api/command-center/owner-configuration/workflow/route.ts";
const ownerWorkflowPanelPath = "src/app/command-center/owner-configuration-workflow-panel.tsx";
const ownerWorkflowRuntimePath = "src/lib/owner-configuration-evidence-approval-workflow-runtime.ts";
const ownerWorkflowSmokeValidatorPath = "src/scripts/validate-command-center-owner-configuration-workflow-smoke.mjs";
const routesChainIntegrityPath = "src/scripts/validate-routes-chain-integrity.mjs";
const reportEvidenceRecordRuntimeValidatorPath = "src/scripts/validate-report-evidence-record-runtime.mjs";
const codeqlWorkflowValidatorPath = "src/scripts/validate-codeql-workflow-integrity.mjs";
const dependencyLockfileValidatorPath = "src/scripts/validate-dependency-lockfile-integrity.mjs";
const dependencyLockfileDocsPath = "docs/dependency-lockfile-integrity.md";
const repoUpdateScanningValidatorPath = "src/scripts/validate-repo-update-scanning-automation.mjs";
const repoUpdateScanningDocsPath = "docs/repo-update-scanning-automation.md";

validateTextFile(runbookPath, [
  "# Command Center Operator Runbook",
  "private, gated, metadata-only operating cockpit",
  "closed by default",
  "security workflow integrity, dependency integrity, or repo update scanning integrity",
  "Keep the route as an access-control and panel-composition shell.",
  "Keep cockpit panels server-rendered",
  "Keep panels metadata-only by default.",
  "Never expose secret values, customer records, raw evidence, raw intelligence, billing details, private reports, score inputs, prompts, or exact scoring weights",
  "Keep every visible cockpit panel represented in the panel registry.",
  "Keep every validation guard wired into `validate:routes`.",
  "Keep `validate-routes-chain-integrity.mjs` first in `validate:routes`.",
  "Keep `validate-codeql-workflow-integrity.mjs` centrally covered by route-chain integrity.",
  "Keep `validate-dependency-lockfile-integrity.mjs` centrally covered by route-chain integrity.",
  "Keep `validate-repo-update-scanning-automation.mjs` centrally covered by route-chain integrity.",
  "Keep indirect high-risk report evidence validators centrally covered by `validate-report-evidence-record-runtime.mjs`",
  "Never claim that Cendorq is unhackable, risk-free, or perfectly secure.",
  "Owner configuration evidence workflow",
  "src/app/api/command-center/owner-configuration/evidence/route.ts",
  "src/app/api/command-center/owner-configuration/workflow/route.ts",
  "src/lib/owner-configuration-evidence-runtime.ts",
  "src/lib/owner-configuration-evidence-persistence-runtime.ts",
  "src/lib/owner-configuration-evidence-approval-workflow-runtime.ts",
  "src/app/command-center/owner-configuration-evidence-panel.tsx",
  "src/app/command-center/owner-configuration-workflow-panel.tsx",
  "safe summaries, safe hashes, owner approval posture, and release-captain review posture",
  "Owner evidence alone never creates public launch approval, paid launch approval, report launch approval, provider configuration approval, payment mapping approval, security readiness approval, or customer-facing claims.",
]);

validateTextFile(runbookPath, [
  "Route-chain integrity workflow",
  "first validator in `validate:routes`",
  "src/scripts/validate-routes-chain-integrity.mjs",
  "src/scripts/validate-routes.mjs",
  "Duplicate validators are blocked.",
  "High-risk validator files must exist.",
  "Ordering between security, panel, report evidence, owner workflow, launch readiness, smoke, and closed-intelligence checks must stay protected.",
  "CodeQL workflow integrity must remain covered through the first route-chain integrity validator.",
  "Dependency lockfile integrity must remain covered through the first route-chain integrity validator.",
  "Repo update scanning automation must remain covered through the first route-chain integrity validator.",
  "Required CodeQL workflow integrity coverage",
  "src/scripts/validate-codeql-workflow-integrity.mjs",
  ".github/workflows/codeql.yml",
  "actions/checkout@v6",
  "github/codeql-action/init@v4",
  "github/codeql-action/autobuild@v4",
  "github/codeql-action/analyze@v4",
  "security-extended,security-and-quality",
  "minimal read permissions plus `security-events: write`",
  "main push, pull request, and weekly schedule triggers",
  "JavaScript/TypeScript analysis",
  "current approved action versions",
  "older action versions, broad write permissions, or `continue-on-error: true`",
  "Required dependency lockfile integrity coverage",
  "src/scripts/validate-dependency-lockfile-integrity.mjs",
  "docs/dependency-lockfile-integrity.md",
  "package.json",
  "pnpm-lock.yaml",
  "package manager `pnpm@9.15.9`",
  "Node engine `>=24.0.0`",
  "current approved core dependency ranges",
  "current resolved lockfile dependency anchors",
  "Dependency updates must not merge with unreviewed package-manager, Node-engine, validate-route-chain, package-range, lockfile-resolution, or dependency-integrity-documentation drift.",
  "Required repo update scanning automation coverage",
  "src/scripts/validate-repo-update-scanning-automation.mjs",
  "docs/repo-update-scanning-automation.md",
  ".github/dependabot.yml",
  "src/scripts/validate-most-pristine-system-standard.mjs",
  "Dependabot groups including `controlled-update`, `next-react-platform`, and `typescript-tooling`",
  "Repo update scanning automation is protective and advisory only.",
  "guarded squash merge with the expected head SHA",
  "Indirect report evidence validators must not become orphaned",
  "Required indirect report evidence validator coverage",
  "src/scripts/validate-report-evidence-record-persistence-runtime.mjs",
  "src/scripts/validate-command-center-report-evidence-records-api.mjs",
  "src/scripts/validate-report-evidence-record-runtime.mjs",
  "src/lib/command-center/report-evidence-record-persistence-runtime.ts",
  "src/app/api/command-center/report-evidence/records/route.ts",
  "safe-summary-only input",
  "append-only safe projection mode",
  "raw evidence exposure blocking",
]);

validateTextFile(runbookPath, [
  "validate-routes-chain-integrity.mjs",
  "validate-codeql-workflow-integrity.mjs",
  "validate-dependency-lockfile-integrity.mjs",
  "validate-repo-update-scanning-automation.mjs",
  "validate-command-center-owner-configuration-evidence-api.mjs",
  "validate-command-center-owner-configuration-evidence-persistence.mjs",
  "validate-command-center-owner-configuration-evidence-approval-workflow.mjs",
  "validate-command-center-owner-configuration-workflow-api.mjs",
  "validate-command-center-owner-configuration-workflow-panel.mjs",
  "validate-command-center-owner-configuration-workflow-smoke.mjs",
  "validate-command-center-security-posture.mjs",
  "validate-command-center-panel-registry.mjs",
  "validate-command-center-panel-safety.mjs",
  "validate-command-center-validation-registry.mjs",
  "validate-report-truth-engine.mjs",
  "validate-report-evidence-record-runtime.mjs",
  "validate-report-evidence-record-persistence-runtime.mjs",
  "validate-command-center-report-evidence-records-api.mjs",
  "validate-command-center-docs-index.mjs",
  "validate-production-smoke-coverage.mjs",
  "No visible cockpit panel should be merged without a matching registry entry.",
  "Route-chain integrity runs first and CodeQL workflow integrity remains centrally covered.",
  "Route-chain integrity runs first and dependency lockfile integrity remains centrally covered.",
  "Route-chain integrity runs first and repo update scanning automation remains centrally covered.",
  "Route-chain integrity runs first and indirect report evidence validators remain centrally covered.",
  "Vercel is green.",
]);

validateTextFile(docsIndexPath, [
  "# Command Center Docs Index",
  "docs/command-center-operator-runbook.md",
  "docs/repo-update-scanning-automation.md",
  "Route-chain integrity standard",
  "validate-routes-chain-integrity.mjs",
  "verify CodeQL workflow integrity coverage",
  "verify repo update scanning automation coverage",
  "Repo update scanning automation standard",
  "validate-repo-update-scanning-automation.mjs",
  "CodeQL workflow integrity standard",
  "validate-codeql-workflow-integrity.mjs",
  "verify indirect report evidence validators remain centrally covered through `src/scripts/validate-report-evidence-record-runtime.mjs`",
  "docs/maximum-protection-standard.md",
  "src/lib/command-center/validation-registry.ts",
  "src/lib/command-center/report-truth-engine.ts",
  "src/lib/owner-configuration-evidence-runtime.ts",
  "src/lib/owner-configuration-evidence-persistence-runtime.ts",
  "src/lib/owner-configuration-evidence-approval-workflow-runtime.ts",
  "src/app/api/command-center/owner-configuration/evidence/route.ts",
  "src/app/api/command-center/owner-configuration/workflow/route.ts",
  "src/app/command-center/owner-configuration-evidence-panel.tsx",
  "src/app/command-center/owner-configuration-workflow-panel.tsx",
  "validate-command-center-validation-registry.mjs",
  "validate-report-truth-engine.mjs",
  "validate-command-center-operator-runbook.mjs",
  "validate-command-center-docs-index.mjs",
  "validate-command-center-owner-configuration-evidence-api.mjs",
  "validate-command-center-owner-configuration-evidence-persistence.mjs",
  "validate-command-center-owner-configuration-evidence-approval-workflow.mjs",
  "validate-command-center-owner-configuration-workflow-api.mjs",
  "validate-command-center-owner-configuration-workflow-panel.mjs",
  "validate-command-center-owner-configuration-workflow-smoke.mjs",
]);

validateTextFile(routesChainIntegrityPath, [
  "validate-codeql-workflow-integrity.mjs",
  "validate-dependency-lockfile-integrity.mjs",
  "validate-repo-update-scanning-automation.mjs",
  "validateCodeqlWorkflowCoverage",
  "validateDependencyLockfileCoverage",
  "validateRepoUpdateScanningCoverage",
  "actions/checkout@v6",
  "github/codeql-action/init@v4",
  "requiredIndirectReportEvidenceValidators",
  "validate-report-evidence-record-persistence-runtime.mjs",
  "validate-command-center-report-evidence-records-api.mjs",
  "validateIndirectReportEvidenceCoverage",
  "acceptedInput: \\\"safe-summary-only\\\"",
  "persistenceMode: \\\"append-only-safe-projection\\\"",
  "rawEvidenceExposed: false",
]);

validateTextFile(codeqlWorkflowValidatorPath, [
  ".github/workflows/codeql.yml",
  "actions/checkout@v6",
  "github/codeql-action/init@v4",
  "github/codeql-action/autobuild@v4",
  "github/codeql-action/analyze@v4",
  "security-extended,security-and-quality",
  "continue-on-error: true",
]);

validateTextFile(dependencyLockfileValidatorPath, [
  "package.json",
  "pnpm-lock.yaml",
  "docs/dependency-lockfile-integrity.md",
  "pnpm@9.15.9",
  "version: 8.59.1",
  "version: 16.2.4",
  "version: 19.2.5",
]);

validateTextFile(dependencyLockfileDocsPath, [
  "# Dependency Lockfile Integrity",
  "package.json",
  "pnpm-lock.yaml",
  "pnpm@9.15.9",
  "Next resolved version: `16.2.4`",
  "React resolved version: `19.2.5`",
  "TypeScript ESLint parser resolved version: `8.59.1`",
]);

validateTextFile(repoUpdateScanningValidatorPath, [
  "docs/repo-update-scanning-automation.md",
  ".github/dependabot.yml",
  ".github/workflows/codeql.yml",
  "src/scripts/validate-codeql-workflow-integrity.mjs",
  "src/scripts/validate-dependency-lockfile-integrity.mjs",
  "src/scripts/validate-most-pristine-system-standard.mjs",
  "actions/checkout@v6",
  "github/codeql-action/init@v4",
  "github/codeql-action/analyze@v4",
  "controlled-update",
  "next-react-platform",
  "typescript-tooling",
]);

validateTextFile(repoUpdateScanningDocsPath, [
  "# Repo Update Scanning Automation",
  "src/scripts/validate-repo-update-scanning-automation.mjs",
  ".github/dependabot.yml",
  ".github/workflows/codeql.yml",
  "src/scripts/validate-codeql-workflow-integrity.mjs",
  "src/scripts/validate-dependency-lockfile-integrity.mjs",
  "src/scripts/validate-most-pristine-system-standard.mjs",
  "actions/checkout@v6",
  "github/codeql-action/init@v4",
  "github/codeql-action/autobuild@v4",
  "github/codeql-action/analyze@v4",
  "controlled-update",
  "next-react-platform",
  "typescript-tooling",
  "release-captain review",
  "expected head SHA",
]);

validateTextFile(reportEvidenceRecordRuntimeValidatorPath, [
  "src/lib/command-center/report-evidence-record-persistence-runtime.ts",
  "src/scripts/validate-report-evidence-record-persistence-runtime.mjs",
  "src/app/api/command-center/report-evidence/records/route.ts",
  "src/scripts/validate-command-center-report-evidence-records-api.mjs",
  "acceptedInput: \\\"safe-summary-only\\\"",
  "persistenceMode: \\\"append-only-safe-projection\\\"",
  "rawEvidenceExposed: false",
]);

validateTextFile(ownerEvidenceRoutePath, [
  "resolveCommandCenterAccessState",
  "commandCenterPreviewHeaderName",
  "containsBlockedEvidenceShape",
  "acceptedInput: \"safe-summary-only\"",
  "persistenceMode: \"audit-safe-record-projection\"",
  "publicLaunchAllowed: false",
  "paidLaunchAllowed: false",
  "reportLaunchAllowed: false",
  "securityReadinessApproved: false",
]);

validateTextFile(ownerWorkflowRoutePath, [
  "resolveCommandCenterAccessState",
  "commandCenterPreviewHeaderName",
  "recordOwnerConfigurationEvidenceBatch",
  "projectOwnerConfigurationEvidenceApprovalWorkflow",
  "workflowMode: \"release-captain-final-review-required\"",
  "reviewedByRole: \"release-captain\"",
  "publicLaunchAllowed: false",
  "paidLaunchAllowed: false",
  "reportLaunchAllowed: false",
  "securityReadinessApproved: false",
]);

validateTextFile(ownerWorkflowPanelPath, [
  "OwnerConfigurationWorkflowPanel",
  "projectOwnerConfigurationEvidenceApprovalWorkflow",
  "Workflow blockers",
  "workflow.missingAreaKeys",
  "workflow.pendingAreaKeys",
  "workflow.blockedAreaKeys",
  "does not approve public launch, paid launch, report launch, security readiness, provider configuration, payment mapping, or customer-facing claims",
]);

validateTextFile(ownerWorkflowRuntimePath, [
  "finalValidator: \"release-captain\"",
  "release-reviewed-not-launch-approved",
  "launchApprovalDerivedFromEvidence: false",
  "publicLaunchAllowed: false",
  "paidLaunchAllowed: false",
  "reportLaunchAllowed: false",
  "securityReadinessApproved: false",
]);

validateTextFile(ownerWorkflowSmokeValidatorPath, [
  "Command center owner configuration workflow smoke validation passed.",
  "src/app/api/command-center/owner-configuration/evidence/route.ts",
  "src/app/api/command-center/owner-configuration/workflow/route.ts",
  "src/app/command-center/owner-configuration-workflow-panel.tsx",
]);

validateTextFile(packagePath, [
  "validate:routes",
  "validate-command-center-security-posture.mjs",
  "validate-command-center-panel-registry.mjs",
  "validate-command-center-panel-safety.mjs",
  "validate-command-center-validation-registry.mjs",
  "validate-report-truth-engine.mjs",
  "validate-command-center-operator-runbook.mjs",
  "validate-command-center-docs-index.mjs",
  "validate-production-smoke-coverage.mjs",
]);

forbidden(ownerEvidenceRoutePath, unsafePhrases());
forbidden(ownerWorkflowRoutePath, unsafePhrases());
forbidden(ownerWorkflowPanelPath, unsafePhrases());
forbidden(ownerWorkflowRuntimePath, unsafePhrases());

if (failures.length) {
  console.error("Command Center operator runbook validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command Center operator runbook validation passed. The runbook and docs index preserve closed-by-default, metadata-only, server-rendered panel, registry, validation-registry, route-chain integrity, CodeQL workflow integrity, dependency lockfile integrity, repo update scanning automation, indirect report evidence validator coverage, report-truth, owner-configuration workflow, and validation-chain operating standards.");

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

function validateTextFile(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing required runbook dependency: ${path}`);
    return;
  }

  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing required runbook phrase: ${phrase}`);
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
