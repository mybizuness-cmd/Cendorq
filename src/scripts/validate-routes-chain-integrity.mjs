import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const packagePath = "package.json";
const lockfilePath = "pnpm-lock.yaml";
const chainPath = "src/scripts/validate-routes-chain.mjs";
const chainIntegrityValidatorPath = "src/scripts/validate-routes-chain-integrity.mjs";
const baselineRouteValidatorPath = "src/scripts/validate-routes.mjs";
const reportEvidenceRecordRuntimeValidatorPath = "src/scripts/validate-report-evidence-record-runtime.mjs";
const maximumProtectionValidatorPath = "src/scripts/validate-maximum-protection-standard.mjs";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const maximumProtectionDocsPath = "docs/maximum-protection-standard.md";
const ownerMaximumProtectionDocsPath = "docs/owner-maximum-protection-posture.md";
const codeqlWorkflowValidatorPath = "src/scripts/validate-codeql-workflow-integrity.mjs";
const dependencyLockfileValidatorPath = "src/scripts/validate-dependency-lockfile-integrity.mjs";
const repoUpdateScanningValidatorPath = "src/scripts/validate-repo-update-scanning-automation.mjs";
const mostPristineValidatorPath = "src/scripts/validate-most-pristine-system-standard.mjs";
const continuousEvolutionValidatorPath = "src/scripts/validate-controlled-continuous-evolution.mjs";
const continuousEvolutionContractPath = "src/lib/controlled-continuous-evolution-contracts.ts";
const controlledMaintenanceValidatorPath = "src/scripts/validate-controlled-maintenance-contracts.mjs";
const controlledMaintenanceContractPath = "src/lib/controlled-maintenance-contracts.ts";
const controlledMaintenanceDocsPath = "docs/controlled-maintenance.md";
const validationRegistryPath = "src/lib/command-center/validation-registry.ts";
const codeqlWorkflowPath = ".github/workflows/codeql.yml";
const dependabotPath = ".github/dependabot.yml";
const reportEvidenceAcceptedInputAnchor = 'acceptedInput: \\"safe-summary-only\\"';
const reportEvidencePersistenceModeAnchor = 'persistenceMode: \\"append-only-safe-projection\\"';

const requiredHighRiskValidators = [
  chainIntegrityValidatorPath,
  baselineRouteValidatorPath,
  "src/scripts/validate-public-drift.mjs",
  maximumProtectionValidatorPath,
  ownerMaximumProtectionValidatorPath,
  "src/scripts/validate-command-center-security-posture.mjs",
  "src/scripts/validate-command-center-panel-registry.mjs",
  "src/scripts/validate-command-center-panel-safety.mjs",
  "src/scripts/validate-command-center-validation-registry.mjs",
  "src/scripts/validate-report-truth-engine.mjs",
  "src/scripts/validate-report-evidence-orchestration.mjs",
  "src/scripts/validate-report-evidence-orchestration-runtime.mjs",
  "src/scripts/validate-command-center-report-evidence-orchestration-panel.mjs",
  "src/scripts/validate-command-center-report-evidence-orchestration-api.mjs",
  "src/scripts/validate-report-evidence-record-contracts.mjs",
  reportEvidenceRecordRuntimeValidatorPath,
  "src/scripts/validate-report-generation-rendering-contracts.mjs",
  "src/scripts/validate-enterprise-operating-standard.mjs",
  "src/scripts/validate-audit-defense-system.mjs",
  mostPristineValidatorPath,
  controlledMaintenanceValidatorPath,
  "src/scripts/validate-access-governance.mjs",
  "src/scripts/validate-privacy-data-retention.mjs",
  "src/scripts/validate-trust-center-readiness.mjs",
  "src/scripts/validate-customer-platform-standard.mjs",
  "src/scripts/validate-customer-experience-standard.mjs",
  "src/scripts/validate-conversion-moat-standard.mjs",
  "src/scripts/validate-insights-conversation-standard.mjs",
  "src/scripts/validate-owner-operating-manual.mjs",
  "src/scripts/validate-platform-launch-readiness-contracts.mjs",
  "src/scripts/validate-platform-launch-readiness-runtime.mjs",
  "src/scripts/validate-command-center-launch-readiness-panel.mjs",
  "src/scripts/validate-platform-launch-readiness-audit-api-contracts.mjs",
  "src/scripts/validate-platform-launch-readiness-api-runtime.mjs",
  "src/scripts/validate-platform-launch-readiness-api-routes.mjs",
  "src/scripts/validate-production-launch-checklist-runtime.mjs",
  "src/scripts/validate-command-center-production-launch-checklist-panel.mjs",
  "src/scripts/validate-production-launch-final-blocker-contracts.mjs",
  "src/scripts/validate-production-launch-final-blocker-runtime.mjs",
  "src/scripts/validate-command-center-production-launch-final-blocker-panel.mjs",
  "src/scripts/validate-launch-evidence-persistence-contracts.mjs",
  "src/scripts/validate-launch-evidence-persistence-runtime.mjs",
  "src/scripts/validate-command-center-launch-evidence-panel.mjs",
  "src/scripts/validate-launch-evidence-api-routes.mjs",
  "src/scripts/validate-production-smoke-target-contracts.mjs",
  "src/scripts/validate-production-smoke-target-runtime.mjs",
  "src/scripts/validate-command-center-production-smoke-target-panel.mjs",
  "src/scripts/validate-production-smoke-api-routes.mjs",
  "src/scripts/validate-owner-configuration-evidence-contracts.mjs",
  "src/scripts/validate-owner-configuration-evidence-runtime.mjs",
  "src/scripts/validate-production-smoke-coverage.mjs",
  "src/scripts/validate-production-smoke-finalization-contracts.mjs",
  "src/scripts/validate-agent-operating-system-contracts.mjs",
  "src/scripts/validate-command-center-owner-configuration-evidence-api.mjs",
  "src/scripts/validate-command-center-owner-configuration-evidence-persistence.mjs",
  "src/scripts/validate-command-center-owner-configuration-evidence-approval-workflow.mjs",
  "src/scripts/validate-command-center-owner-configuration-workflow-api.mjs",
  "src/scripts/validate-command-center-owner-configuration-workflow-panel.mjs",
  "src/scripts/validate-command-center-owner-configuration-workflow-smoke.mjs",
  "src/scripts/validate-closed-intelligence.mjs",
];

const requiredIndirectReportEvidenceValidators = [
  "src/scripts/validate-report-evidence-record-persistence-runtime.mjs",
  "src/scripts/validate-command-center-report-evidence-records-api.mjs",
];

validateFileExists(packagePath);
validateFileExists(lockfilePath);
validateFileExists(chainPath);
validateFileExists(maximumProtectionValidatorPath);
validateFileExists(ownerMaximumProtectionValidatorPath);
validateFileExists(maximumProtectionDocsPath);
validateFileExists(ownerMaximumProtectionDocsPath);
validateFileExists(codeqlWorkflowPath);
validateFileExists(dependabotPath);
validateFileExists(codeqlWorkflowValidatorPath);
validateFileExists(dependencyLockfileValidatorPath);
validateFileExists(repoUpdateScanningValidatorPath);
validateFileExists(mostPristineValidatorPath);
validateFileExists(continuousEvolutionValidatorPath);
validateFileExists(continuousEvolutionContractPath);
validateFileExists(controlledMaintenanceValidatorPath);
validateFileExists(controlledMaintenanceContractPath);
validateFileExists(controlledMaintenanceDocsPath);
validateFileExists(validationRegistryPath);

if (!failures.length) {
  const packageText = read(packagePath);
  const chainText = read(chainPath);
  const chainValidators = [...chainText.matchAll(/"(src\/scripts\/validate-[^"]+\.mjs)"/g)].map((match) => match[1]);
  const duplicateValidators = chainValidators.filter((validator, index) => chainValidators.indexOf(validator) !== index);

  if (!packageText.includes('"validate:routes": "node ./src/scripts/validate-routes-chain.mjs"')) failures.push(`${packagePath} must delegate validate:routes to ${chainPath}`);
  if (chainValidators.length < 140) failures.push(`${chainPath} expected at least 140 validators in the ordered chain, found ${chainValidators.length}`);
  if (duplicateValidators.length) failures.push(`${chainPath} contains duplicate validators: ${[...new Set(duplicateValidators)].join(", ")}`);
  if (chainValidators[0] !== chainIntegrityValidatorPath) failures.push(`${chainPath} must start with the route-chain integrity validator.`);
  if (chainValidators[1] !== baselineRouteValidatorPath) failures.push(`${chainPath} must run the baseline route validator immediately after the integrity validator.`);
  if (chainValidators.at(-1) !== "src/scripts/validate-closed-intelligence.mjs") failures.push(`${chainPath} must end with closed-intelligence validation.`);

  for (const validatorPath of requiredHighRiskValidators) {
    if (!chainValidators.includes(validatorPath)) failures.push(`${chainPath} missing high-risk validator: ${validatorPath}`);
    validateFileExists(validatorPath);
  }
  for (const validatorPath of requiredIndirectReportEvidenceValidators) validateFileExists(validatorPath);
  for (const validatorPath of chainValidators) validateFileExists(validatorPath);

  validateIndirectReportEvidenceCoverage();
  validateCodeqlWorkflowCoverage();
  validateDependencyLockfileCoverage();
  validateRepoUpdateScanningCoverage();
  validateControlledContinuousEvolutionCoverage();
  validateControlledMaintenanceCoverage();

  validateChainOrdering(chainValidators, [chainIntegrityValidatorPath, baselineRouteValidatorPath, "src/scripts/validate-public-drift.mjs", maximumProtectionValidatorPath, ownerMaximumProtectionValidatorPath]);
  validateChainOrdering(chainValidators, ["src/scripts/validate-command-center-panel-registry.mjs", "src/scripts/validate-command-center-panel-safety.mjs", "src/scripts/validate-command-center-validation-registry.mjs"]);
  validateChainOrdering(chainValidators, ["src/scripts/validate-report-truth-engine.mjs", "src/scripts/validate-report-evidence-orchestration.mjs", "src/scripts/validate-report-evidence-orchestration-runtime.mjs", "src/scripts/validate-command-center-report-evidence-orchestration-panel.mjs", "src/scripts/validate-command-center-report-evidence-orchestration-api.mjs", "src/scripts/validate-report-evidence-record-contracts.mjs", reportEvidenceRecordRuntimeValidatorPath, "src/scripts/validate-report-generation-rendering-contracts.mjs"]);
  validateChainOrdering(chainValidators, ["src/scripts/validate-command-center-operator-runbook.mjs", "src/scripts/validate-command-center-docs-index.mjs", "src/scripts/validate-owner-operating-manual.mjs", "src/scripts/validate-production-smoke-coverage.mjs"]);
  validateChainOrdering(chainValidators, ["src/scripts/validate-platform-launch-readiness-contracts.mjs", "src/scripts/validate-platform-launch-readiness-runtime.mjs", "src/scripts/validate-platform-launch-readiness-api-routes.mjs", "src/scripts/validate-production-launch-final-blocker-runtime.mjs", "src/scripts/validate-launch-evidence-api-routes.mjs", "src/scripts/validate-production-smoke-api-routes.mjs", "src/scripts/validate-owner-configuration-evidence-contracts.mjs", "src/scripts/validate-owner-configuration-evidence-runtime.mjs", "src/scripts/validate-production-smoke-coverage.mjs"]);
  validateChainOrdering(chainValidators, ["src/scripts/validate-command-center-owner-configuration-evidence-api.mjs", "src/scripts/validate-command-center-owner-configuration-evidence-persistence.mjs", "src/scripts/validate-command-center-owner-configuration-evidence-approval-workflow.mjs", "src/scripts/validate-command-center-owner-configuration-workflow-api.mjs", "src/scripts/validate-command-center-owner-configuration-workflow-panel.mjs", "src/scripts/validate-command-center-owner-configuration-workflow-smoke.mjs", "src/scripts/validate-closed-intelligence.mjs"]);
}

if (failures.length) {
  console.error("Validate routes chain integrity failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Validate routes chain integrity passed. The route-chain self-check runs first, maximum protection, owner maximum-protection posture, CodeQL workflow integrity, dependency lockfile integrity, repo update scanning automation, controlled continuous evolution, and controlled maintenance are covered, report evidence record contracts/runtime plus indirect persistence and records API validators are mandatory, report evidence orchestration API and panel, report evidence runtime, owner operating manual, and launch-readiness guardrails are mandatory, high-risk guardrails are present, ordering is protected, files exist, duplicates are blocked, and owner workflow validation remains before closed-intelligence validation.");

function validateIndirectReportEvidenceCoverage() {
  const runtimeValidatorText = read(reportEvidenceRecordRuntimeValidatorPath);
  for (const validatorPath of requiredIndirectReportEvidenceValidators) if (!runtimeValidatorText.includes(validatorPath)) failures.push(`${reportEvidenceRecordRuntimeValidatorPath} must centrally cover indirect report evidence validator: ${validatorPath}`);
  for (const phrase of ["src/lib/command-center/report-evidence-record-persistence-runtime.ts", "src/app/api/command-center/report-evidence/records/route.ts", "recordReportEvidenceRecordBatch", reportEvidenceAcceptedInputAnchor, reportEvidencePersistenceModeAnchor, "rawEvidenceExposed: false"]) if (!runtimeValidatorText.includes(phrase)) failures.push(`${reportEvidenceRecordRuntimeValidatorPath} missing indirect report evidence coverage phrase: ${phrase}`);
}

function validateCodeqlWorkflowCoverage() {
  const workflowText = read(codeqlWorkflowPath);
  const validatorText = read(codeqlWorkflowValidatorPath);
  for (const phrase of ["actions/checkout@v6", "github/codeql-action/init@v4", "github/codeql-action/autobuild@v4", "github/codeql-action/analyze@v4", "security-extended,security-and-quality", "security-events: write"]) {
    if (!workflowText.includes(phrase)) failures.push(`${codeqlWorkflowPath} missing required workflow phrase: ${phrase}`);
    if (!validatorText.includes(phrase)) failures.push(`${codeqlWorkflowValidatorPath} missing required workflow validation phrase: ${phrase}`);
  }
}

function validateDependencyLockfileCoverage() {
  const validatorText = read(dependencyLockfileValidatorPath);
  for (const phrase of ["package.json", "pnpm-lock.yaml", "pnpm@9.15.9", ">=24.0.0", "@typescript-eslint/parser", "version: 8.59.1", "version: 16.2.4", "version: 19.2.5"]) if (!validatorText.includes(phrase)) failures.push(`${dependencyLockfileValidatorPath} missing dependency integrity phrase: ${phrase}`);
}

function validateRepoUpdateScanningCoverage() {
  const validatorText = read(repoUpdateScanningValidatorPath);
  for (const phrase of [".github/dependabot.yml", ".github/workflows/codeql.yml", "actions/checkout@v6", "github/codeql-action/init@v4", "github/codeql-action/analyze@v4", "src/scripts/validate-codeql-workflow-integrity.mjs", "src/scripts/validate-dependency-lockfile-integrity.mjs", "controlled-update", "next-react-platform", "typescript-tooling"]) if (!validatorText.includes(phrase)) failures.push(`${repoUpdateScanningValidatorPath} missing repo update scanning phrase: ${phrase}`);
}

function validateControlledContinuousEvolutionCoverage() {
  const contractText = read(continuousEvolutionContractPath);
  const validatorText = read(continuousEvolutionValidatorPath);
  const mostPristineText = read(mostPristineValidatorPath);
  for (const phrase of ["CONTROLLED_CONTINUOUS_EVOLUTION_CONTRACT", "controlled-continuous-evolution-v1", "Automated systems may detect, propose, test, and prepare updates.", "open dependency update pull requests", "run validation scripts", "Vercel preview or deployment check passes", "small coherent batches", "rollback-ready before promotion", "automatic update systems can propose changes but cannot bypass validation", "all scheduled updates must remain coherent, bounded, and traceable"]) if (!contractText.includes(phrase)) failures.push(`${continuousEvolutionContractPath} missing controlled continuous evolution phrase: ${phrase}`);
  for (const phrase of ["CONTROLLED_CONTINUOUS_EVOLUTION_CONTRACT", "controlled-continuous-evolution-v1", "auto-merge production-impacting code without green gates", "pull request with reviewable diff", "Vercel preview or deployment check passes", "rollback path identified", "skipVercelGate", "disableValidatorForUpdate"]) if (!validatorText.includes(phrase)) failures.push(`${continuousEvolutionValidatorPath} missing controlled continuous evolution validator phrase: ${phrase}`);
  for (const phrase of ["src/lib/controlled-continuous-evolution-contracts.ts", "src/scripts/validate-controlled-continuous-evolution.mjs", "Controlled continuous evolution validation passed", "controlled continuous evolution", "repo update scanning automation"]) if (!mostPristineText.includes(phrase)) failures.push(`${mostPristineValidatorPath} missing controlled continuous evolution coverage phrase: ${phrase}`);
}

function validateControlledMaintenanceCoverage() {
  const contractText = read(controlledMaintenanceContractPath);
  const validatorText = read(controlledMaintenanceValidatorPath);
  const docsText = read(controlledMaintenanceDocsPath);
  const registryText = read(validationRegistryPath);
  const mostPristineText = read(mostPristineValidatorPath);

  for (const phrase of ["CONTROLLED_MAINTENANCE_CONTRACT", "Controlled Maintenance Architecture", "safe update queues", "without uncontrolled AI changes or automatic production mutation", "reviewStreams", "safeUpdateQueue", "hardLocks", "releaseRules", "No queued update may mutate production automatically"]) if (!contractText.includes(phrase)) failures.push(`${controlledMaintenanceContractPath} missing controlled maintenance phrase: ${phrase}`);
  for (const phrase of ["Controlled maintenance contracts validation passed", "docs/controlled-maintenance.md", "src/lib/controlled-maintenance-contracts.ts", "docs/command-center-docs-index.md", "src/lib/command-center/validation-registry.ts", "No queued update may mutate production automatically"]) if (!validatorText.includes(phrase)) failures.push(`${controlledMaintenanceValidatorPath} missing controlled maintenance validator phrase: ${phrase}`);
  for (const phrase of ["# Controlled Maintenance", "keeping the platform current, secure, validated, and scalable", "No queued update may change production automatically", "validation, approval state, rollback plan, and audit record"]) if (!docsText.includes(phrase)) failures.push(`${controlledMaintenanceDocsPath} missing controlled maintenance docs phrase: ${phrase}`);
  for (const phrase of ["controlled-maintenance", "Controlled maintenance", "src/scripts/validate-controlled-maintenance-contracts.mjs", "safe update queues, review streams, validation gates, rollback planning, audit records"]) if (!registryText.includes(phrase)) failures.push(`${validationRegistryPath} missing controlled maintenance registry phrase: ${phrase}`);
  for (const phrase of ["src/lib/controlled-maintenance-contracts.ts", "src/scripts/validate-controlled-maintenance-contracts.mjs", "docs/controlled-maintenance.md", "Controlled maintenance contracts validation passed", "controlled maintenance"]) if (!mostPristineText.includes(phrase)) failures.push(`${mostPristineValidatorPath} missing controlled maintenance most-pristine coverage phrase: ${phrase}`);
}

function validateChainOrdering(chainValidators, orderedValidators) {
  const indexes = orderedValidators.map((validatorPath) => chainValidators.indexOf(validatorPath));
  if (indexes.some((index) => index === -1)) return;
  for (let index = 1; index < indexes.length; index += 1) if (indexes[index] <= indexes[index - 1]) failures.push(`${chainPath} invalid ordering: ${orderedValidators[index - 1]} must appear before ${orderedValidators[index]}`);
}

function validateFileExists(path) {
  if (!existsSync(join(root, path))) failures.push(`Missing required validation dependency: ${path}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
