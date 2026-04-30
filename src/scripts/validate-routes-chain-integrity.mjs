import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const packagePath = "package.json";
const chainPath = "src/scripts/validate-routes-chain.mjs";

const requiredHighRiskValidators = [
  "src/scripts/validate-routes.mjs",
  "src/scripts/validate-public-drift.mjs",
  "src/scripts/validate-command-center-security-posture.mjs",
  "src/scripts/validate-command-center-panel-registry.mjs",
  "src/scripts/validate-command-center-panel-safety.mjs",
  "src/scripts/validate-command-center-validation-registry.mjs",
  "src/scripts/validate-report-truth-engine.mjs",
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

validateFileExists(packagePath);
validateFileExists(chainPath);

if (!failures.length) {
  const packageText = read(packagePath);
  const chainText = read(chainPath);
  const chainValidators = [...chainText.matchAll(/"(src\/scripts\/validate-[^"]+\.mjs)"/g)].map((match) => match[1]);
  const duplicateValidators = chainValidators.filter((validator, index) => chainValidators.indexOf(validator) !== index);

  if (!packageText.includes('"validate:routes": "node ./src/scripts/validate-routes-chain.mjs"')) {
    failures.push(`${packagePath} must delegate validate:routes to ${chainPath}`);
  }

  if (chainValidators.length < 120) {
    failures.push(`${chainPath} expected at least 120 validators in the ordered chain, found ${chainValidators.length}`);
  }

  if (duplicateValidators.length) {
    failures.push(`${chainPath} contains duplicate validators: ${[...new Set(duplicateValidators)].join(", ")}`);
  }

  if (chainValidators[0] !== "src/scripts/validate-routes.mjs") {
    failures.push(`${chainPath} must start with the baseline route validator.`);
  }

  if (chainValidators.at(-1) !== "src/scripts/validate-closed-intelligence.mjs") {
    failures.push(`${chainPath} must end with closed-intelligence validation.`);
  }

  for (const validatorPath of requiredHighRiskValidators) {
    if (!chainValidators.includes(validatorPath)) failures.push(`${chainPath} missing high-risk validator: ${validatorPath}`);
    validateFileExists(validatorPath);
  }

  for (const validatorPath of chainValidators) {
    validateFileExists(validatorPath);
  }

  validateChainOrdering(chainValidators, [
    "src/scripts/validate-command-center-panel-registry.mjs",
    "src/scripts/validate-command-center-panel-safety.mjs",
    "src/scripts/validate-command-center-validation-registry.mjs",
  ]);

  validateChainOrdering(chainValidators, [
    "src/scripts/validate-command-center-operator-runbook.mjs",
    "src/scripts/validate-command-center-docs-index.mjs",
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

console.log("Validate routes chain integrity passed. The central route validator delegates to the orchestrator, high-risk guardrails are present, ordering is protected, files exist, duplicates are blocked, and owner workflow validation remains before closed-intelligence validation.");

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
