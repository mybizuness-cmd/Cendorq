import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const registryPath = "src/lib/command-center/validation-registry.ts";
const packagePath = "package.json";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";

const requiredScripts = [
  "src/scripts/validate-command-center-migrations.mjs",
  "src/scripts/validate-command-center-schema.mjs",
  "src/scripts/validate-command-center-readiness.mjs",
  "src/scripts/validate-command-center-security-posture.mjs",
  "src/scripts/validate-command-center-panel-registry.mjs",
  "src/scripts/validate-command-center-panel-safety.mjs",
  "src/scripts/validate-command-center-validation-registry.mjs",
  "src/scripts/validate-report-truth-engine.mjs",
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
    "operator-runbook",
    "Operator runbook and owner workflow chain",
    "owner configuration evidence API, workflow API, workflow panel, approval workflow runtime, and workflow smoke-validator coverage",
    "owner-operating-manual",
    "Owner operating manual",
    "owner-level evidence accuracy, tailored plan fit, conversion moat, market learning, launch review, and post-build operating cadence",
    "unsafe guarantees",
    "report-truth-engine",
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
    if (!chainText.includes(`"${scriptPath}"`)) failures.push(`${routesChainPath} missing required validation script: ${scriptPath}`);
  }

  const registryEntries = [...registryText.matchAll(/scriptPath: "([^"]+)"/g)].map((match) => match[1]);
  if (registryEntries.length < 27) {
    failures.push(`${registryPath} expected at least 27 validator entries, found ${registryEntries.length}`);
  }
}

if (failures.length) {
  console.error("Command Center validation registry validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command Center validation registry validation passed. Registered guardrail scripts exist, validate:routes delegates to the orchestrator, and the orchestrator includes required command-center, owner manual, owner-workflow, report truth, scale resilience, customer platform, customer experience, conversion moat, insights conversation, and enterprise guardrails.");

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
