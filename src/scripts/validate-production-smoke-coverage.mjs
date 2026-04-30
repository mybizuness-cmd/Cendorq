import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const smokePath = "src/scripts/smoke-production.mjs";
const workflowPath = ".github/workflows/smoke-production.yml";
const packagePath = "package.json";
const runbookPath = "docs/command-center-operator-runbook.md";
const docsIndexPath = "docs/command-center-docs-index.md";
const validationRegistryPath = "src/lib/command-center/validation-registry.ts";
const reportTruthEnginePath = "src/lib/command-center/report-truth-engine.ts";
const reportGrowthSystemPath = "src/lib/command-center/report-growth-system.ts";
const controlledMarketLearningPath = "src/lib/command-center/controlled-market-learning.ts";
const enterpriseOperatingStandardPath = "src/lib/command-center/enterprise-operating-standard.ts";
const auditDefenseSystemPath = "src/lib/command-center/audit-defense-system.ts";
const mostPristineSystemStandardPath = "src/lib/command-center/most-pristine-system-standard.ts";

for (const file of [smokePath, workflowPath, packagePath, runbookPath, docsIndexPath, validationRegistryPath, reportTruthEnginePath, reportGrowthSystemPath, controlledMarketLearningPath, enterpriseOperatingStandardPath, auditDefenseSystemPath, mostPristineSystemStandardPath]) {
  if (!existsSync(join(root, file))) failures.push(`Missing production smoke dependency: ${file}`);
}

expect(smokePath, [
  "const isLocalBaseUrl = isLocalhostBaseUrl(baseUrl);",
  "redirect: \"manual\"",
  "isRedirectStatus(redirectResponse.status)",
  "redirectResponse.headers.get(\"location\")",
  "checkOptionsRoute",
  "GET,POST,OPTIONS",
  "checkProtectedReadRoute",
  "protectedReadChecks",
  "expectedStatus: 401",
  "The intake console is not authorized to read submissions.",
  "if (isLocalBaseUrl) return;",
  "payload.ok !== false",
  "closedCommandCenterChecks",
  "/command-center",
  "/command-center/intake",
  "Private Command Center",
  "Closed by default.",
  "No customer records",
  "checkClosedCommandCenterRoute",
  "protectedCommandCenterApiChecks",
  "/api/command-center/readiness",
  "The Command Center readiness endpoint is not authorized.",
  "/api/command-center/owner-configuration/evidence",
  "/api/command-center/owner-configuration/workflow",
  "expectError: \"not_available\"",
  "expectedStatus: 404",
  "checkProtectedJsonErrorRoute",
  "Private configuration checklist",
  "Schema anchors",
]);

expect(workflowPath, [
  "workflow_dispatch",
  "schedule:",
  "permissions:",
  "contents: read",
  "concurrency:",
  "cancel-in-progress: true",
  "timeout-minutes: 10",
  "persist-credentials: false",
  "CENDORQ_BASE_URL:",
  "https://cendorq.com",
  "Validate production smoke target",
  "CENDORQ_BASE_URL is required for production smoke checks.",
  "CENDORQ_BASE_URL must be a valid URL.",
  "CENDORQ_BASE_URL must use http or https.",
  "::notice title=Production smoke target::",
  "pnpm install --frozen-lockfile",
  "pnpm smoke:production",
  "node-version: \"24\"",
]);

expect(packagePath, [
  "validate:routes",
  "node ./src/scripts/validate-routes-chain.mjs",
  "validate-production-smoke-coverage.mjs",
]);

expect(runbookPath, [
  "# Command Center Operator Runbook",
  "docs/command-center-docs-index.md",
  "validate-command-center-validation-registry.mjs",
  "validate-report-truth-engine.mjs",
  "validate-command-center-docs-index.mjs",
  "src/app/api/command-center/owner-configuration/evidence/route.ts",
  "src/app/api/command-center/owner-configuration/workflow/route.ts",
]);

expect(docsIndexPath, [
  "# Command Center Docs Index",
  "src/lib/command-center/validation-registry.ts",
  "src/lib/command-center/report-truth-engine.ts",
  "src/lib/command-center/report-growth-system.ts",
  "src/lib/command-center/controlled-market-learning.ts",
  "src/lib/command-center/enterprise-operating-standard.ts",
  "src/lib/command-center/audit-defense-system.ts",
  "src/lib/command-center/most-pristine-system-standard.ts",
  "src/app/api/command-center/owner-configuration/evidence/route.ts",
  "src/app/api/command-center/owner-configuration/workflow/route.ts",
  "docs/command-center-operator-runbook.md",
  "validate-command-center-validation-registry.mjs",
  "validate-report-truth-engine.mjs",
  "validate-controlled-market-learning.mjs",
  "validate-enterprise-operating-standard.mjs",
  "validate-audit-defense-system.mjs",
  "validate-most-pristine-system-standard.mjs",
  "validate-command-center-operator-runbook.mjs",
]);

expect(validationRegistryPath, [
  "COMMAND_CENTER_VALIDATION_REGISTRY",
  "protectedBoundary",
  "failureMeaning",
  "validate-command-center-validation-registry.mjs",
  "validate-report-truth-engine.mjs",
  "validate-controlled-market-learning.mjs",
  "validate-enterprise-operating-standard.mjs",
  "validate-audit-defense-system.mjs",
  "validate-most-pristine-system-standard.mjs",
  "validate-production-smoke-coverage.mjs",
]);

expect(reportTruthEnginePath, [
  "REPORT_TRUTH_RULES",
  "BUSINESS_ENRICHMENT_RULES",
  "REPORT_METRIC_RULES",
  "REPORT_CONVERSION_RULES",
  "minimum-input-enrichment",
  "calculation inputs, formula label, evidence references, confidence level, and rounding policy",
  "must never claim 100% certainty, perfect accuracy, or guaranteed outcomes",
]);

expect(reportGrowthSystemPath, [
  "REPORT_GROWTH_SYSTEM_RULES",
  "PLAN_REPORT_DEPTH_RULES",
  "PLATFORM_REVENUE_SIGNAL_RULES",
  "Truthful high-conversion reporting",
  "Every report must look official and Cendorq-branded",
  "analyzed business logo above or beside the business name",
  "Full Diagnosis must be thorough and extensive",
  "social and platform activity",
  "Every business study must consider social media and other platform activity",
  "bread and butter",
]);

expect(controlledMarketLearningPath, [
  "CONTROLLED_MARKET_LEARNING_RULES",
  "SELF_EVOLUTION_CONTROL_RULES",
  "CENDORQ_LEVERAGE_RULES",
  "After enough businesses are studied",
  "what is working now, what is weakening, what is emerging",
  "No learned pattern can change customer-facing reports, pricing, plan promises, scoring, recommendations, or AI behavior until it is reviewed, versioned, tested, and approved",
  "Agents must stay inside the approved report truth engine, report growth system, validation registry, customer-output approval, and AI command history policies",
  "new service lines, report modules, vertical offers, platform integrations, data products, or subscription controls",
]);

expect(enterpriseOperatingStandardPath, [
  "ENTERPRISE_OPERATING_RULES",
  "Liability minimization defense",
  "Audit defense pass",
  "reduce liability as far as practical through claim substantiation",
  "strict-but-not-paralyzing",
]);

expect(auditDefenseSystemPath, [
  "AUDIT_DEFENSE_CONTROLS",
  "AUDIT_DEFENSE_RELEASE_GATES",
  "Claim substantiation record",
  "Customer consent and scope record",
  "must not promise rankings, traffic, leads, conversions, revenue, platform outcomes, perfect accuracy, or immunity from liability",
]);

expect(mostPristineSystemStandardPath, [
  "MOST_PRISTINE_SYSTEM_REQUIREMENTS",
  "MOST_PRISTINE_RELEASE_PASSES",
  "Frontend most-pristine standard",
  "Backend most-pristine standard",
  "Report most-pristine standard",
  "No weak link pass",
  "Does every visible and invisible layer meet the same most-pristine standard",
]);

const smokeText = read(smokePath);
for (const phrase of [
  "Search Presence Scan",
  "Visibility Blueprint",
  "Presence Infrastructure",
  "Presence Command",
  "console.log(payload)",
  "ALLOW_OPEN_INTAKE_READS",
  "COMMAND_CENTER_PREVIEW_KEY",
]) {
  if (smokeText.includes(phrase)) failures.push(`Production smoke script contains forbidden or risky phrase: ${phrase}`);
}

if (failures.length) {
  console.error("Production smoke coverage validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Production smoke coverage validation passed. Public routes, strict redirects, health, Free Scan OPTIONS, protected Free Scan read checks, closed Command Center route checks, protected Command Center readiness checks, protected owner configuration evidence/workflow API checks, Command Center panel guard validators, validation registry visibility, report truth and growth system validation, controlled market learning validation, enterprise operating validation, audit defense validation, most-pristine validation, operator runbook validation, docs index validation, documentation cross-references, and smoke workflow hardening are synchronized.");

function expect(path, phrases) {
  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing required production smoke phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
