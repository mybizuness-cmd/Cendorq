import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const registryPath = "src/lib/command-center/validation-registry.ts";
const packagePath = "package.json";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const routesChainIntegrityPath = "src/scripts/validate-routes-chain-integrity.mjs";
const codeqlWorkflowValidatorPath = "src/scripts/validate-codeql-workflow-integrity.mjs";
const dependencyLockfileValidatorPath = "src/scripts/validate-dependency-lockfile-integrity.mjs";
const dependencyLockfileDocsPath = "docs/dependency-lockfile-integrity.md";
const repoUpdateScanningValidatorPath = "src/scripts/validate-repo-update-scanning-automation.mjs";
const repoUpdateScanningDocsPath = "docs/repo-update-scanning-automation.md";
const continuousEvolutionValidatorPath = "src/scripts/validate-controlled-continuous-evolution.mjs";
const continuousEvolutionContractPath = "src/lib/controlled-continuous-evolution-contracts.ts";
const controlledMaintenanceValidatorPath = "src/scripts/validate-controlled-maintenance-contracts.mjs";
const controlledMaintenanceContractPath = "src/lib/controlled-maintenance-contracts.ts";
const controlledMaintenanceDocsPath = "docs/controlled-maintenance.md";

const requiredScripts = [
  "src/scripts/validate-command-center-migrations.mjs",
  "src/scripts/validate-command-center-schema.mjs",
  "src/scripts/validate-command-center-readiness.mjs",
  "src/scripts/validate-command-center-security-posture.mjs",
  "src/scripts/validate-command-center-panel-registry.mjs",
  "src/scripts/validate-command-center-panel-safety.mjs",
  "src/scripts/validate-command-center-validation-registry.mjs",
  "src/scripts/validate-codeql-workflow-integrity.mjs",
  "src/scripts/validate-dependency-lockfile-integrity.mjs",
  "src/scripts/validate-repo-update-scanning-automation.mjs",
  "src/scripts/validate-controlled-continuous-evolution.mjs",
  "src/scripts/validate-controlled-maintenance-contracts.mjs",
  "src/scripts/validate-admin-command-center-projection-registry.mjs",
  "src/scripts/validate-admin-command-center-safe-response.mjs",
  "src/scripts/validate-admin-command-center-safe-projections-runbook.mjs",
  "src/scripts/validate-admin-command-center-api-index.mjs",
  "src/scripts/validate-admin-command-center-safe-summary-api.mjs",
  "src/scripts/validate-admin-command-center-audit-trail-api.mjs",
  "src/scripts/validate-admin-command-center-mission-brief-api.mjs",
  "src/scripts/validate-admin-command-center-agent-findings-api.mjs",
  "src/scripts/validate-admin-command-center-forecast-escalation-api.mjs",
  "src/scripts/validate-command-center-admin-control-panel.mjs",
  "src/scripts/validate-report-truth-engine.mjs",
  "src/scripts/validate-report-evidence-orchestration.mjs",
  "src/scripts/validate-report-evidence-orchestration-runtime.mjs",
  "src/scripts/validate-command-center-report-evidence-orchestration-panel.mjs",
  "src/scripts/validate-command-center-report-evidence-orchestration-api.mjs",
  "src/scripts/validate-command-center-report-evidence-records-api.mjs",
  "src/scripts/validate-report-evidence-record-contracts.mjs",
  "src/scripts/validate-report-evidence-record-runtime.mjs",
  "src/scripts/validate-report-evidence-record-persistence-runtime.mjs",
  "src/scripts/validate-controlled-market-learning.mjs",
  "src/scripts/validate-enterprise-operating-standard.mjs",
  "src/scripts/validate-audit-defense-system.mjs",
  "src/scripts/validate-most-pristine-system-standard.mjs",
  "src/scripts/validate-report-record-contracts.mjs",
  "src/scripts/validate-scale-resilience-standard.mjs",
  "src/scripts/validate-customer-platform-standard.mjs",
  "src/scripts/validate-customer-experience-standard.mjs",
  "src/scripts/validate-conversion-moat-standard.mjs",
  "src/scripts/validate-insights-conversation-standard.mjs",
  "src/scripts/validate-command-center-operator-runbook.mjs",
  "src/scripts/validate-command-center-docs-index.mjs",
  "src/scripts/validate-owner-operating-manual.mjs",
  "src/scripts/validate-optimization-method-library.mjs",
  "src/scripts/validate-customer-output-approval.mjs",
  "src/scripts/validate-ai-manager-command-queue.mjs",
  "src/scripts/validate-ai-manager-command-history.mjs",
  "src/scripts/validate-production-smoke-coverage.mjs",
  "src/scripts/validate-command-center-owner-configuration-evidence-api.mjs",
  "src/scripts/validate-command-center-owner-configuration-evidence-persistence.mjs",
  "src/scripts/validate-command-center-owner-configuration-evidence-approval-workflow.mjs",
  "src/scripts/validate-command-center-owner-configuration-workflow-api.mjs",
  "src/scripts/validate-command-center-owner-configuration-workflow-panel.mjs",
  "src/scripts/validate-command-center-owner-configuration-workflow-smoke.mjs",
  "src/scripts/validate-closed-intelligence.mjs",
];

validateFileExists(registryPath);
validateFileExists(packagePath);
validateFileExists(routesChainPath);
validateFileExists(routesChainIntegrityPath);
validateFileExists(codeqlWorkflowValidatorPath);
validateFileExists(dependencyLockfileValidatorPath);
validateFileExists(dependencyLockfileDocsPath);
validateFileExists(repoUpdateScanningValidatorPath);
validateFileExists(repoUpdateScanningDocsPath);
validateFileExists(continuousEvolutionValidatorPath);
validateFileExists(continuousEvolutionContractPath);
validateFileExists(controlledMaintenanceValidatorPath);
validateFileExists(controlledMaintenanceContractPath);
validateFileExists(controlledMaintenanceDocsPath);

if (!failures.length) {
  const registryText = read(registryPath);
  const packageText = read(packagePath);
  const chainText = read(routesChainPath);

  validateText(packagePath, packageText, [
    "\"validate:routes\": \"node ./src/scripts/validate-routes-chain.mjs\"",
  ]);

  validateText(registryPath, registryText, [
    "COMMAND_CENTER_VALIDATION_REGISTRY",
    "CommandCenterValidationRegistryItem",
    "requiredInValidateRoutes: true",
    "protectedBoundary",
    "failureMeaning",
    "getCommandCenterValidationRegistry",
    "codeql-workflow-integrity",
    "CodeQL workflow integrity",
    "src/scripts/validate-codeql-workflow-integrity.mjs",
    "CodeQL workflow triggers, minimal permissions, checkout v6, CodeQL v4, JavaScript/TypeScript analysis, security-and-quality query posture, and no broad write permission or continue-on-error drift",
    "dependency-lockfile-integrity",
    "Dependency lockfile integrity",
    "src/scripts/validate-dependency-lockfile-integrity.mjs",
    "repo-update-scanning-automation",
    "Repo update scanning automation",
    "src/scripts/validate-repo-update-scanning-automation.mjs",
    "controlled-continuous-evolution",
    "Controlled continuous evolution",
    "src/scripts/validate-controlled-continuous-evolution.mjs",
    "monitored, validated, reviewable, rollback-ready updates, small coherent batches, Vercel gate posture, and no uncontrolled production mutation or quality drift",
    "controlled-maintenance",
    "Controlled maintenance",
    "src/scripts/validate-controlled-maintenance-contracts.mjs",
    "safe update queues, review streams, validation gates, rollback planning, audit records, and no uncontrolled AI changes or automatic production mutation",
    "Controlled maintenance may have drifted toward validation bypass, approval bypass, missing rollback plans, audit deletion, raw/private exposure, uncontrolled production mutation, or unsupported outcome claims.",
    "panel-safety",
    "Panel safety",
    "full current command-center cockpit panel set, including admin projections, launch readiness, owner workflow, plan delivery/routing, and report evidence records",
    "server-rendered, metadata-only, private-gated",
    "operator-runbook",
    "Owner operating manual",
    "report-truth-engine",
    "report-evidence-orchestration",
    "report-evidence-orchestration-runtime",
    "report-evidence-orchestration-api",
    "report-evidence-records-api",
    "report-evidence-record-contracts",
    "report-evidence-record-runtime",
    "report-evidence-record-persistence-runtime",
    "controlled-market-learning",
    "enterprise-operating-standard",
    "audit-defense-system",
    "most-pristine-system-standard",
    "report-record-contracts",
    "scale-resilience-standard",
    "customer-platform-standard",
    "customer-experience-standard",
    "conversion-moat-standard",
    "insights-conversation-standard",
  ]);

  for (const scriptPath of requiredScripts) {
    validateFileExists(scriptPath);
    if (
      scriptPath !== "src/scripts/validate-report-evidence-record-persistence-runtime.mjs" &&
      scriptPath !== "src/scripts/validate-command-center-report-evidence-records-api.mjs" &&
      scriptPath !== "src/scripts/validate-codeql-workflow-integrity.mjs" &&
      scriptPath !== "src/scripts/validate-dependency-lockfile-integrity.mjs" &&
      scriptPath !== "src/scripts/validate-repo-update-scanning-automation.mjs" &&
      !chainText.includes(`"${scriptPath}"`)
    ) {
      failures.push(`${routesChainPath} missing required validation script: ${scriptPath}`);
    }
  }

  validateText(routesChainIntegrityPath, read(routesChainIntegrityPath), [
    "src/scripts/validate-codeql-workflow-integrity.mjs",
    "src/scripts/validate-dependency-lockfile-integrity.mjs",
    "src/scripts/validate-repo-update-scanning-automation.mjs",
    "src/scripts/validate-controlled-continuous-evolution.mjs",
    "src/lib/controlled-continuous-evolution-contracts.ts",
    "validateCodeqlWorkflowCoverage",
    "validateDependencyLockfileCoverage",
    "validateRepoUpdateScanningCoverage",
    "validateControlledContinuousEvolutionCoverage",
    "actions/checkout@v6",
    "github/codeql-action/init@v4",
    "github/codeql-action/analyze@v4",
  ]);

  validateText(codeqlWorkflowValidatorPath, read(codeqlWorkflowValidatorPath), [
    ".github/workflows/codeql.yml",
    "actions/checkout@v6",
    "github/codeql-action/init@v4",
    "github/codeql-action/autobuild@v4",
    "github/codeql-action/analyze@v4",
    "security-extended,security-and-quality",
    "continue-on-error: true",
  ]);

  validateText(dependencyLockfileValidatorPath, read(dependencyLockfileValidatorPath), [
    "package.json",
    "pnpm-lock.yaml",
    "docs/dependency-lockfile-integrity.md",
    "pnpm@9.15.9",
    "version: 8.59.1",
    "version: 16.2.4",
    "version: 19.2.5",
  ]);

  validateText(dependencyLockfileDocsPath, read(dependencyLockfileDocsPath), [
    "# Dependency Lockfile Integrity",
    "pnpm@9.15.9",
    "Next resolved version: `16.2.4`",
    "React resolved version: `19.2.5`",
    "TypeScript ESLint parser resolved version: `8.59.1`",
  ]);

  validateText(repoUpdateScanningValidatorPath, read(repoUpdateScanningValidatorPath), [
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

  validateText(repoUpdateScanningDocsPath, read(repoUpdateScanningDocsPath), [
    "# Repo Update Scanning Automation",
    "src/scripts/validate-repo-update-scanning-automation.mjs",
    ".github/dependabot.yml",
    ".github/workflows/codeql.yml",
    "actions/checkout@v6",
    "github/codeql-action/init@v4",
    "github/codeql-action/autobuild@v4",
    "github/codeql-action/analyze@v4",
    "release-captain review",
    "expected head SHA",
  ]);

  validateText(continuousEvolutionValidatorPath, read(continuousEvolutionValidatorPath), [
    "CONTROLLED_CONTINUOUS_EVOLUTION_CONTRACT",
    "controlled-continuous-evolution-v1",
    "auto-merge production-impacting code without green gates",
    "pull request with reviewable diff",
    "Vercel preview or deployment check passes",
    "rollback path identified",
    "skipVercelGate",
    "disableValidatorForUpdate",
  ]);

  validateText(continuousEvolutionContractPath, read(continuousEvolutionContractPath), [
    "CONTROLLED_CONTINUOUS_EVOLUTION_CONTRACT",
    "controlled-continuous-evolution-v1",
    "Automated systems may detect, propose, test, and prepare updates.",
    "small coherent batches",
    "rollback-ready before promotion",
    "automatic update systems can propose changes but cannot bypass validation",
    "all scheduled updates must remain coherent, bounded, and traceable",
  ]);

  validateText(controlledMaintenanceValidatorPath, read(controlledMaintenanceValidatorPath), [
    "Controlled maintenance contracts validation passed",
    "docs/controlled-maintenance.md",
    "src/lib/controlled-maintenance-contracts.ts",
    "No queued update may mutate production automatically",
  ]);

  validateText(controlledMaintenanceContractPath, read(controlledMaintenanceContractPath), [
    "CONTROLLED_MAINTENANCE_CONTRACT",
    "Controlled Maintenance Architecture",
    "safe update queues",
    "without uncontrolled AI changes or automatic production mutation",
  ]);

  validateText(controlledMaintenanceDocsPath, read(controlledMaintenanceDocsPath), [
    "# Controlled Maintenance",
    "No queued update may mutate production automatically",
    "validation, approval state, rollback plan, and audit record",
  ]);

  validateText("src/scripts/validate-report-evidence-record-runtime.mjs", read("src/scripts/validate-report-evidence-record-runtime.mjs"), [
    "src/lib/command-center/report-evidence-record-persistence-runtime.ts",
    "src/scripts/validate-report-evidence-record-persistence-runtime.mjs",
    "src/app/api/command-center/report-evidence/records/route.ts",
    "src/scripts/validate-command-center-report-evidence-records-api.mjs",
  ]);

  const registryEntries = [...registryText.matchAll(/scriptPath: "([^"]+)"/g)].map((match) => match[1]);
  if (registryEntries.length < 39) {
    failures.push(`${registryPath} expected at least 39 validator entries, found ${registryEntries.length}`);
  }
}

if (failures.length) {
  console.error("Command Center validation registry validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command Center validation registry validation passed. Registered guardrail scripts exist, validate:routes delegates to the orchestrator, and the orchestrator includes required command-center, CodeQL workflow integrity, dependency lockfile integrity, repo update scanning automation, controlled continuous evolution, controlled maintenance, expanded panel safety, admin safe projections, owner manual, owner-workflow, report truth, report evidence records API, report evidence record contracts/runtime/persistence, report evidence orchestration API and runtime, scale resilience, customer platform, customer experience, conversion moat, insights conversation, and enterprise guardrails.");

function validateFileExists(path) {
  if (!existsSync(join(root, path))) failures.push(`Missing required validation registry dependency: ${path}`);
}

function validateText(path, text, phrases) {
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing required validation registry phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
