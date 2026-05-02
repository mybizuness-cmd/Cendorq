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
    "report-evidence-orchestration",
    "Report evidence orchestration",
    "evidence source tiers, trust levels, conflict handling, confidence language, plan-fit thresholds, release-captain review, and blocked report patterns",
    "Report evidence handling may no longer separate source classes, confidence levels, conflicts, plan-fit recommendations, or unsafe customer-facing claims.",
    "report-evidence-orchestration-runtime",
    "Report evidence orchestration runtime",
    "safe evidence projections, blocked-pattern surfacing, release-captain review posture, customer-output eligibility, and redacted report evidence summaries",
    "Report evidence inputs may no longer project into safe summaries, blocked-pattern flags, review posture, or customer-output eligibility before report use.",
    "report-evidence-orchestration-api",
    "Report evidence orchestration API",
    "command-center-only report evidence projection route, safe-summary-only input, no-store/noindex response headers, raw/private payload rejection, and no customer-facing report approval",
    "Report evidence API behavior may no longer be command-center gated, safe-summary-only, runtime-backed, raw/private rejecting, or blocked from approving customer-facing report output.",
    "report-evidence-records-api",
    "Report evidence records API",
    "command-center-only report evidence records route, safe-summary-only input, append-only safe projection persistence, no-store/noindex response headers, raw/private payload rejection, and no customer-facing output, paid recommendation, launch, security, or public report approval",
    "Report evidence records API behavior may no longer be command-center gated, safe-summary-only, persistence-backed, raw/private rejecting, append-only, no-store/noindex, or blocked from customer-facing output and launch approval drift.",
    "report-evidence-record-contracts",
    "Report evidence record contracts",
    "safe report evidence source, confidence, conflict, plan-fit, blocked-pattern, and release-review records without raw/private payload exposure or customer-facing approval drift",
    "Report evidence records may no longer preserve orchestration metadata safely, or may allow raw evidence, provider payloads, private credentials, hidden conflicts, unsupported plan recommendations, or approval drift.",
    "report-evidence-record-runtime",
    "Report evidence record runtime",
    "safe generation of report evidence source, confidence, conflict, plan-fit, blocked-pattern, and release-review records from runtime projections without raw/private payload exposure or approval drift",
    "Report evidence runtime records may no longer generate safe summaries, preserve release-captain review posture, or block raw evidence, provider payloads, credentials, customer data, and approval drift.",
    "report-evidence-record-persistence-runtime",
    "Report evidence record persistence runtime",
    "command-center-gated, append-only, no-store report evidence persistence projections with safe hashes and no raw/private payload exposure or approval drift",
    "Report evidence persistence may no longer stay append-only, no-store, safe-summary/hash based, command-center gated, centrally covered, or blocked from raw evidence, provider payloads, credentials, customer data, private audit payloads, and approval drift.",
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
      !chainText.includes(`"${scriptPath}"`)
    ) {
      failures.push(`${routesChainPath} missing required validation script: ${scriptPath}`);
    }
  }

  validateText("src/scripts/validate-report-evidence-record-runtime.mjs", read("src/scripts/validate-report-evidence-record-runtime.mjs"), [
    "src/lib/command-center/report-evidence-record-persistence-runtime.ts",
    "src/scripts/validate-report-evidence-record-persistence-runtime.mjs",
    "src/app/api/command-center/report-evidence/records/route.ts",
    "src/scripts/validate-command-center-report-evidence-records-api.mjs",
  ]);

  const registryEntries = [...registryText.matchAll(/scriptPath: "([^"]+)"/g)].map((match) => match[1]);
  if (registryEntries.length < 34) {
    failures.push(`${registryPath} expected at least 34 validator entries, found ${registryEntries.length}`);
  }
}

if (failures.length) {
  console.error("Command Center validation registry validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command Center validation registry validation passed. Registered guardrail scripts exist, validate:routes delegates to the orchestrator, and the orchestrator includes required command-center, admin safe projections, owner manual, owner-workflow, report truth, report evidence records API, report evidence record contracts/runtime/persistence, report evidence orchestration API and runtime, scale resilience, customer platform, customer experience, conversion moat, insights conversation, and enterprise guardrails.");

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
