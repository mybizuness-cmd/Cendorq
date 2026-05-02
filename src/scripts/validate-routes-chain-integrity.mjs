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
const codeqlWorkflowValidatorPath = "src/scripts/validate-codeql-workflow-integrity.mjs";
const dependencyLockfileValidatorPath = "src/scripts/validate-dependency-lockfile-integrity.mjs";
const repoUpdateScanningValidatorPath = "src/scripts/validate-repo-update-scanning-automation.mjs";
const codeqlWorkflowPath = ".github/workflows/codeql.yml";
const dependabotPath = ".github/dependabot.yml";

const requiredHighRiskValidators = [
  chainIntegrityValidatorPath,
  baselineRouteValidatorPath,
  "src/scripts/validate-public-drift.mjs",
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
  "src/scripts/validate-most-pristine-system-standard.mjs",
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
validateFileExists(codeqlWorkflowPath);
validateFileExists(dependabotPath);
validateFileExists(codeqlWorkflowValidatorPath);
validateFileExists(dependencyLockfileValidatorPath);
validateFileExists(repoUpdateScanningValidatorPath);

if (!failures.length) {
  const packageText = read(packagePath);
  const chainText = read(chainPath);
  const chainValidators = [...chainText.matchAll(/"(src\/scripts\/validate-[^"]+\.mjs)"/g)].map((match) => match[1]);
  const duplicateValidators = chainValidators.filter((validator, index) => chainValidators.indexOf(validator) !== index);

  if (!packageText.includes('"validate:routes": "node ./src/scripts/validate-routes-chain.mjs"')) {
    failures.push(`${packagePath} must delegate validate:routes to ${chainPath}`);
  }

  if (chainValidators.length < 140) {
    failures.push(`${chainPath} expected at least 140 validators in the ordered chain, found ${chainValidators.length}`);
  }

  if (duplicateValidators.length) {
    failures.push(`${chainPath} contains duplicate validators: ${[...new Set(duplicateValidators)].join(", ")}`);
  }

  if (chainValidators[0] !== chainIntegrityValidatorPath) {
    failures.push(`${chainPath} must start with the route-chain integrity validator.`);
  }

  if (chainValidators[1] !== baselineRouteValidatorPath) {
    failures.push(`${chainPath} must run the baseline route validator immediately after the integrity validator.`);
  }

  if (chainValidators.at(-1) !== "src/scripts/validate-closed-intelligence.mjs") {
    failures.push(`${chainPath} must end with closed-intelligence validation.`);
  }

  for (const validatorPath of requiredHighRiskValidators) {
    if (!chainValidators.includes(validatorPath)) failures.push(`${chainPath} missing high-risk validator: ${validatorPath}`);
    validateFileExists(validatorPath);
  }

  for (const validatorPath of requiredIndirectReportEvidenceValidators) {
    validateFileExists(validatorPath);
  }

  for (const validatorPath of chainValidators) {
    validateFileExists(validatorPath);
  }

  validateIndirectReportEvidenceCoverage();
  validateCodeqlWorkflowCoverage();
  validateDependencyLockfileCoverage();
  validateRepoUpdateScanningCoverage();

  validateChainOrdering(chainValidators, [
    chainIntegrityValidatorPath,
    baselineRouteValidatorPath,
    "src/scripts/validate-public-drift.mjs",
  ]);

  validateChainOrdering(chainValidators, [
    "src/scripts/validate-command-center-panel-registry.mjs",
    "src/scripts/validate-command-center-panel-safety.mjs",
    "src/scripts/validate-command-center-validation-registry.mjs",
  ]);

  validateChainOrdering(chainValidators, [
    "src/scripts/validate-report-truth-engine.mjs",
    "src/scripts/validate-report-evidence-orchestration.mjs",
    "src/scripts/validate-report-evidence-orchestration-runtime.mjs",
    "src/scripts/validate-command-center-report-evidence-orchestration-panel.mjs",
    "src/scripts/validate-command-center-report-evidence-orchestration-api.mjs",
    "src/scripts/validate-report-evidence-record-contracts.mjs",
    reportEvidenceRecordRuntimeValidatorPath,
    "src/scripts/validate-report-generation-rendering-contracts.mjs",
  ]);

  validateChainOrdering(chainValidators, [
    "src/scripts/validate-command-center-operator-runbook.mjs",
    "src/scripts/validate-command-center-docs-index.mjs",
    "src/scripts/validate-owner-operating-manual.mjs",
    "src/scripts/validate-production-smoke-coverage.mjs",
  ]);

  validateChainOrdering(chainValidators, [
    "src/scripts/validate-platform-launch-readiness-contracts.mjs",
    "src/scripts/validate-platform-launch-readiness-runtime.mjs",
    "src/scripts/validate-platform-launch-readiness-api-routes.mjs",
    "src/scripts/validate-production-launch-final-blocker-runtime.mjs",
    "src/scripts/validate-launch-evidence-api-routes.mjs",
    "src/scripts/validate-production-smoke-api-routes.mjs",
    "src/scripts/validate-owner-configuration-evidence-contracts.mjs",
    "src/scripts/validate-owner-configuration-evidence-runtime.mjs",
    "src/scripts/validate-production-smoke-coverage.mjs",
  ]);

  validateChainOrdering(chainValidators, [
    "src/scripts/validate-command-center-owner-configuration-evidence-api.mjs",
    "src/scripts/validate-command-center-owner-configuration-evidence-persistence.mjs",
    "src/scripts/validate-command-center-owner-configuration-evidence-approval-workflow.mjs",
    "src/scripts/validate-command-center-owner-configuration-workflow-api.mjs",
    "src/scripts/validate-command-center-owner-configuration-workflow-panel.mjs",
    "src/scripts/validate-command-center-owner-configuration-workflow-smoke.mjs",
    "src/scripts/validate-closed-intelligence.mjs",
  ]);
}

if (failures.length) {
  console.error("Validate routes chain integrity failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Validate routes chain integrity passed. The route-chain self-check runs first, CodeQL workflow integrity, dependency lockfile integrity, and repo update scanning automation are covered, report evidence record contracts/runtime plus indirect persistence and records API validators are mandatory, report evidence orchestration API and panel, report evidence runtime, owner operating manual, and launch-readiness guardrails are mandatory, high-risk guardrails are present, ordering is protected, files exist, duplicates are blocked, and owner workflow validation remains before closed-intelligence validation.");

function validateIndirectReportEvidenceCoverage() {
  const runtimeValidatorText = read(reportEvidenceRecordRuntimeValidatorPath);
  for (const validatorPath of requiredIndirectReportEvidenceValidators) {
    if (!runtimeValidatorText.includes(validatorPath)) {
      failures.push(`${reportEvidenceRecordRuntimeValidatorPath} must centrally cover indirect report evidence validator: ${validatorPath}`);
    }
  }

  for (const phrase of [
    "src/lib/command-center/report-evidence-record-persistence-runtime.ts",
    "src/app/api/command-center/report-evidence/records/route.ts",
    "recordReportEvidenceRecordBatch",
    "acceptedInput: \\\"safe-summary-only\\\"",
    "persistenceMode: \\\"append-only-safe-projection\\\"",
    "rawEvidenceExposed: false",
  ]) {
    if (!runtimeValidatorText.includes(phrase)) failures.push(`${reportEvidenceRecordRuntimeValidatorPath} missing indirect report evidence coverage phrase: ${phrase}`);
  }
}

function validateCodeqlWorkflowCoverage() {
  const workflowText = read(codeqlWorkflowPath);
  const validatorText = read(codeqlWorkflowValidatorPath);

  for (const phrase of [
    "actions/checkout@v6",
    "github/codeql-action/init@v4",
    "github/codeql-action/autobuild@v4",
    "github/codeql-action/analyze@v4",
    "security-extended,security-and-quality",
    "security-events: write",
  ]) {
    if (!workflowText.includes(phrase)) failures.push(`${codeqlWorkflowPath} missing required workflow phrase: ${phrase}`);
    if (!validatorText.includes(phrase)) failures.push(`${codeqlWorkflowValidatorPath} missing required workflow validation phrase: ${phrase}`);
  }
}

function validateDependencyLockfileCoverage() {
  const validatorText = read(dependencyLockfileValidatorPath);
  for (const phrase of [
    "package.json",
    "pnpm-lock.yaml",
    "pnpm@9.15.9",
    ">=24.0.0",
    "@typescript-eslint/parser",
    "version: 8.59.1",
    "version: 16.2.4",
    "version: 19.2.5",
  ]) {
    if (!validatorText.includes(phrase)) failures.push(`${dependencyLockfileValidatorPath} missing dependency integrity phrase: ${phrase}`);
  }
}

function validateRepoUpdateScanningCoverage() {
  const validatorText = read(repoUpdateScanningValidatorPath);
  for (const phrase of [
    ".github/dependabot.yml",
    ".github/workflows/codeql.yml",
    "actions/checkout@v6",
    "github/codeql-action/init@v4",
    "github/codeql-action/analyze@v4",
    "src/scripts/validate-codeql-workflow-integrity.mjs",
    "src/scripts/validate-dependency-lockfile-integrity.mjs",
    "controlled-update",
    "next-react-platform",
    "typescript-tooling",
  ]) {
    if (!validatorText.includes(phrase)) failures.push(`${repoUpdateScanningValidatorPath} missing repo update scanning phrase: ${phrase}`);
  }
}

function validateChainOrdering(chainValidators, orderedValidators) {
  const indexes = orderedValidators.map((validatorPath) => chainValidators.indexOf(validatorPath));
  if (indexes.some((index) => index === -1)) return;

  for (let index = 1; index < indexes.length; index += 1) {
    if (indexes[index] <= indexes[index - 1]) {
      failures.push(`${chainPath} invalid ordering: ${orderedValidators[index - 1]} must appear before ${orderedValidators[index]}`);
    }
  }
}

function validateFileExists(path) {
  if (!existsSync(join(root, path))) failures.push(`Missing required validation dependency: ${path}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
