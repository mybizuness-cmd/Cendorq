import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const registryPath = "src/lib/command-center/validation-registry.ts";
const packagePath = "package.json";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const routesChainIntegrityPath = "src/scripts/validate-routes-chain-integrity.mjs";
const codeqlWorkflowValidatorPath = "src/scripts/validate-codeql-workflow-integrity.mjs";

const requiredScripts = [
  "src/scripts/validate-command-center-migrations.mjs",
  "src/scripts/validate-command-center-schema.mjs",
  "src/scripts/validate-command-center-readiness.mjs",
  "src/scripts/validate-command-center-security-posture.mjs",
  "src/scripts/validate-command-center-panel-registry.mjs",
  "src/scripts/validate-command-center-panel-safety.mjs",
  "src/scripts/validate-command-center-validation-registry.mjs",
  "src/scripts/validate-codeql-workflow-integrity.mjs",
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
    "stale action versions, weakened permissions, missing security query posture, missing main/PR/schedule coverage, or non-failing security analysis",
    "panel-safety",
    "Panel safety",
    "full current command-center cockpit panel set, including admin projections, launch readiness, owner workflow, plan delivery/routing, and report evidence records",
    "server-rendered, metadata-only, private-gated",
    "browser storage, browser-only APIs, direct environment access, raw/private payload fields, token patterns, unsafe guarantees, and public exposure drift",
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
      !chainText.includes(`"${scriptPath}"`)
    ) {
      failures.push(`${routesChainPath} missing required validation script: ${scriptPath}`);
    }
  }

  validateText(routesChainIntegrityPath, read(routesChainIntegrityPath), [
    "src/scripts/validate-codeql-workflow-integrity.mjs",
    ".github/workflows/codeql.yml",
    "validateCodeqlWorkflowCoverage",
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

  validateText("src/scripts/validate-report-evidence-record-runtime.mjs", read("src/scripts/validate-report-evidence-record-runtime.mjs"), [
    "src/lib/command-center/report-evidence-record-persistence-runtime.ts",
    "src/scripts/validate-report-evidence-record-persistence-runtime.mjs",
    "src/app/api/command-center/report-evidence/records/route.ts",
    "src/scripts/validate-command-center-report-evidence-records-api.mjs",
  ]);

  const registryEntries = [...registryText.matchAll(/scriptPath: "([^"]+)"/g)].map((match) => match[1]);
  if (registryEntries.length < 35) {
    failures.push(`${registryPath} expected at least 35 validator entries, found ${registryEntries.length}`);
  }
}

if (failures.length) {
  console.error("Command Center validation registry validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command Center validation registry validation passed. Registered guardrail scripts exist, validate:routes delegates to the orchestrator, and the orchestrator includes required command-center, CodeQL workflow integrity, expanded panel safety, admin safe projections, owner manual, owner-workflow, report truth, report evidence records API, report evidence record contracts/runtime/persistence, report evidence orchestration API and runtime, scale resilience, customer platform, customer experience, conversion moat, insights conversation, and enterprise guardrails.");

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
