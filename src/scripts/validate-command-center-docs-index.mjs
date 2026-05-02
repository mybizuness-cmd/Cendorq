import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const docsIndexPath = "docs/command-center-docs-index.md";
const runbookPath = "docs/command-center-operator-runbook.md";
const safeProjectionRunbookPath = "docs/admin-command-center-safe-projections.md";
const ownerManualPath = "docs/owner-operating-manual.md";
const repoUpdateScanningDocsPath = "docs/repo-update-scanning-automation.md";
const continuousEvolutionDocsPath = "docs/controlled-continuous-evolution.md";
const controlledMaintenanceDocsPath = "docs/controlled-maintenance.md";
const continuousEvolutionContractPath = "src/lib/controlled-continuous-evolution-contracts.ts";
const controlledMaintenanceContractPath = "src/lib/controlled-maintenance-contracts.ts";
const packagePath = "package.json";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const routesChainIntegrityPath = "src/scripts/validate-routes-chain-integrity.mjs";
const codeqlWorkflowValidatorPath = "src/scripts/validate-codeql-workflow-integrity.mjs";
const continuousEvolutionValidatorPath = "src/scripts/validate-controlled-continuous-evolution.mjs";
const controlledMaintenanceValidatorPath = "src/scripts/validate-controlled-maintenance-contracts.mjs";

validateTextFile(docsIndexPath, [
  "# Command Center Docs Index",
  "private documentation index",
  "docs/maximum-protection-standard.md",
  "docs/command-center-operator-runbook.md",
  "docs/admin-command-center-safe-projections.md",
  "docs/owner-operating-manual.md",
  "docs/repo-update-scanning-automation.md",
  "docs/controlled-continuous-evolution.md",
  "docs/controlled-maintenance.md",
  "controlled maintenance standard for safe update queues, review streams, validation gates, rollback planning, and audit-ready maintenance posture",
  "src/lib/controlled-continuous-evolution-contracts.ts",
  "src/lib/controlled-maintenance-contracts.ts",
]);

validateTextFile(docsIndexPath, [
  "Full cockpit panel safety standard",
  "Route-chain integrity standard",
  "verify CodeQL workflow integrity coverage",
  "verify repo update scanning automation coverage",
  "verify controlled continuous evolution coverage",
  "CodeQL workflow integrity standard",
  "Repo update scanning automation standard",
  "Controlled continuous evolution standard",
  "Controlled maintenance standard",
  "validate-controlled-maintenance-contracts.mjs",
  "docs/controlled-maintenance.md",
  "safe update queue states",
  "approval gates",
  "rollback planning",
  "audit records",
  "validation bypass",
  "approval bypass",
  "uncontrolled production mutation",
  "unsupported outcome claims",
]);

validateTextFile(controlledMaintenanceDocsPath, [
  "# Controlled Maintenance",
  "keeping the platform current, secure, validated, and scalable",
  "without uncontrolled AI changes or automatic production mutation",
  "dependency review",
  "security advisory monitoring",
  "validation registry checks",
  "smoke-test scheduling",
  "performance health checks",
  "schema drift checks",
  "route drift checks",
  "content and claim drift checks",
  "No queued update may mutate production automatically",
  "validation, approval state, rollback plan, and audit record",
  "Controlled continuous evolution defines how Cendorq improves after launch",
  "Documentation rule",
]);

validateTextFile(controlledMaintenanceContractPath, [
  "CONTROLLED_MAINTENANCE_CONTRACT",
  "Controlled Maintenance Architecture",
  "scheduled review",
  "safe update queues",
  "without uncontrolled AI changes or automatic production mutation",
  "reviewStreams",
  "safeUpdateQueue",
  "hardLocks",
  "releaseRules",
  "No queued update may mutate production automatically",
]);

validateTextFile(controlledMaintenanceValidatorPath, [
  "Controlled maintenance contracts validation passed",
  "src/lib/controlled-maintenance-contracts.ts",
  "docs/controlled-maintenance.md",
  "validate:routes",
]);

validateTextFile(docsIndexPath, [
  "src/scripts/validate-routes-chain-integrity.mjs",
  "src/scripts/validate-codeql-workflow-integrity.mjs",
  "src/scripts/validate-command-center-security-posture.mjs",
  "src/scripts/validate-command-center-panel-registry.mjs",
  "src/scripts/validate-command-center-panel-safety.mjs",
  "src/scripts/validate-command-center-validation-registry.mjs",
  "src/scripts/validate-controlled-market-learning.mjs",
  "src/scripts/validate-enterprise-operating-standard.mjs",
  "src/scripts/validate-most-pristine-system-standard.mjs",
  "src/scripts/validate-command-center-operator-runbook.mjs",
  "src/scripts/validate-command-center-docs-index.mjs",
  "repo update scanning automation rule",
  "controlled continuous evolution rule",
  "controlled maintenance rule",
]);

validateTextFile(runbookPath, [
  "# Command Center Operator Runbook",
  "Keep every validation guard wired into `validate:routes`.",
  "Vercel is green.",
]);

validateTextFile(repoUpdateScanningDocsPath, [
  "# Repo Update Scanning Automation",
  "release-captain review",
  "expected head SHA",
]);

validateTextFile(continuousEvolutionDocsPath, [
  "# Controlled Continuous Evolution",
  "monitored, validated, reviewable, reversible updates",
  "release-captain approval before merge",
  "Continuous updates must raise or preserve Cendorq's most-pristine standard",
]);

validateTextFile(continuousEvolutionContractPath, [
  "CONTROLLED_CONTINUOUS_EVOLUTION_CONTRACT",
  "controlled-continuous-evolution-v1",
  "automatic update systems can propose changes but cannot bypass validation",
]);

validateTextFile(continuousEvolutionValidatorPath, [
  "Controlled continuous evolution validation passed",
  "docs/controlled-continuous-evolution.md",
]);

validateTextFile(safeProjectionRunbookPath, [
  "# Admin Command Center Safe Projections",
  "Operating posture",
  "Source of truth",
  "Validation requirements",
]);

validateTextFile(ownerManualPath, [
  "# Cendorq Owner Operating Manual",
  "proof before output",
  "Controlled continuous evolution",
]);

validateTextFile(packagePath, ["validate:routes", "node ./src/scripts/validate-routes-chain.mjs"]);

validateTextFile(routesChainPath, [
  "validate-routes-chain-integrity.mjs",
  "validate-controlled-continuous-evolution.mjs",
  "validate-controlled-maintenance-contracts.mjs",
  "validate-command-center-docs-index.mjs",
]);

validateTextFile(routesChainIntegrityPath, [
  "validate-codeql-workflow-integrity.mjs",
  "validate-repo-update-scanning-automation.mjs",
  "validate-controlled-continuous-evolution.mjs",
  "validateControlledContinuousEvolutionCoverage",
]);

validateTextFile(codeqlWorkflowValidatorPath, [
  ".github/workflows/codeql.yml",
  "actions/checkout@v6",
  "github/codeql-action/init@v4",
  "github/codeql-action/analyze@v4",
]);

if (failures.length) {
  console.error("Command Center docs index validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command Center docs index validation passed with controlled maintenance docs, controlled continuous evolution docs, CodeQL workflow integrity, route-chain integrity, repo update scanning automation, expanded panel safety, and report evidence coverage.");

function validateTextFile(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing required docs index dependency: ${path}`);
    return;
  }

  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing required docs index phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
