import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const registryPath = "src/lib/command-center/validation-registry.ts";
const packagePath = "package.json";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const controlledEvolutionContractPath = "src/lib/controlled-continuous-evolution-contracts.ts";
const controlledMaintenanceValidatorPath = "src/scripts/validate-controlled-maintenance-contracts.mjs";
const controlledMaintenanceContractPath = "src/lib/controlled-maintenance-contracts.ts";
const controlledMaintenanceDocsPath = "docs/controlled-maintenance.md";
const coreValidators = [
  "src/scripts/validate-command-center-migrations.mjs",
  "src/scripts/validate-command-center-schema.mjs",
  "src/scripts/validate-command-center-readiness.mjs",
  "src/scripts/validate-command-center-security-posture.mjs",
  "src/scripts/validate-command-center-panel-registry.mjs",
  "src/scripts/validate-command-center-panel-safety.mjs",
  "src/scripts/validate-maximum-protection-standard.mjs",
  "src/scripts/validate-owner-maximum-protection-posture.mjs",
  "src/scripts/validate-controlled-continuous-evolution.mjs",
  controlledMaintenanceValidatorPath,
  "src/scripts/validate-report-truth-engine.mjs",
  "src/scripts/validate-report-evidence-orchestration.mjs",
  "src/scripts/validate-report-evidence-record-contracts.mjs",
  "src/scripts/validate-report-evidence-record-runtime.mjs",
  "src/scripts/validate-report-generation-rendering-contracts.mjs",
  "src/scripts/validate-customer-platform-standard.mjs",
  "src/scripts/validate-customer-experience-standard.mjs",
  "src/scripts/validate-conversion-moat-standard.mjs",
  "src/scripts/validate-insights-conversation-standard.mjs",
  "src/scripts/validate-command-center-docs-index.mjs",
  "src/scripts/validate-owner-operating-manual.mjs",
  "src/scripts/validate-closed-intelligence.mjs",
];

for (const path of [registryPath, packagePath, routesChainPath, controlledEvolutionContractPath, controlledMaintenanceValidatorPath, controlledMaintenanceContractPath, controlledMaintenanceDocsPath, ...coreValidators]) validateFileExists(path);

if (!failures.length) {
  const registryText = read(registryPath);
  const packageText = read(packagePath);
  const chainText = read(routesChainPath);
  const docsText = read(controlledMaintenanceDocsPath);
  const contractText = read(controlledMaintenanceContractPath);
  const maintenanceValidatorText = read(controlledMaintenanceValidatorPath);

  expectText(packagePath, packageText, ["\"validate:routes\": \"node ./src/scripts/validate-routes-chain.mjs\""]);

  expectText(registryPath, registryText, [
    "COMMAND_CENTER_VALIDATION_REGISTRY",
    "CommandCenterValidationRegistryItem",
    "requiredInValidateRoutes: true",
    "protectedBoundary",
    "failureMeaning",
    "getCommandCenterValidationRegistry",
    "maximum-protection-standard",
    "controlled-continuous-evolution",
    "Controlled continuous evolution",
    "controlled-maintenance",
    "Panel safety",
    "report-truth-engine",
    "report-evidence-orchestration",
    "report-evidence-record-contracts",
    "customer-platform-standard",
    "customer-experience-standard",
    "conversion-moat-standard",
    "insights-conversation-standard",
  ]);

  for (const scriptPath of coreValidators) {
    if (!chainText.includes(`"${scriptPath}"`)) failures.push(`${routesChainPath} missing required validation script: ${scriptPath}`);
  }

  expectText(controlledEvolutionContractPath, read(controlledEvolutionContractPath), [
    "CONTROLLED_CONTINUOUS_EVOLUTION_CONTRACT",
    "controlled-continuous-evolution-v1",
  ]);

  expectText(controlledMaintenanceContractPath, contractText, [
    "CONTROLLED_MAINTENANCE_CONTRACT",
    "Controlled Maintenance Architecture",
    "safe update queues",
    "without uncontrolled AI changes or automatic production mutation",
    "reviewStreams",
    "safeUpdateQueue",
    "hardLocks",
    "releaseRules",
  ]);

  expectText(controlledMaintenanceDocsPath, docsText, [
    "# Controlled Maintenance",
    "keeping the platform current, secure, validated, and scalable",
    "No queued update may change production automatically",
    "validation, approval state, rollback plan, and audit record",
  ]);

  expectText(controlledMaintenanceValidatorPath, maintenanceValidatorText, [
    "Controlled maintenance contracts validation passed",
    "docs/controlled-maintenance.md",
    "src/lib/controlled-maintenance-contracts.ts",
  ]);

  const registryEntries = [...registryText.matchAll(/scriptPath: "([^"]+)"/g)].map((match) => match[1]);
  if (registryEntries.length < 40) failures.push(`${registryPath} expected at least 40 validator entries, found ${registryEntries.length}`);
}

if (failures.length) {
  console.error("Command Center validation registry validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command Center validation registry validation passed. Registered guardrail scripts exist, validate:routes delegates to the orchestrator, and command-center, maximum protection, owner posture through the route chain, controlled evolution, controlled maintenance, report truth, report evidence, customer platform, customer experience, conversion moat, insights conversation, owner manual, and closed-intelligence guardrails remain covered.");

function validateFileExists(path) {
  if (!existsSync(join(root, path))) failures.push(`Missing required validation registry dependency: ${path}`);
}

function expectText(path, text, phrases) {
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing required validation registry phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
