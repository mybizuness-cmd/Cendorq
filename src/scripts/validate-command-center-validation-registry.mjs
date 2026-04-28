import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const registryPath = "src/lib/command-center/validation-registry.ts";
const packagePath = "package.json";

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
  "src/scripts/validate-command-center-operator-runbook.mjs",
  "src/scripts/validate-command-center-docs-index.mjs",
  "src/scripts/validate-optimization-method-library.mjs",
  "src/scripts/validate-customer-output-approval.mjs",
  "src/scripts/validate-ai-manager-command-queue.mjs",
  "src/scripts/validate-ai-manager-command-history.mjs",
  "src/scripts/validate-production-smoke-coverage.mjs",
  "src/scripts/validate-closed-intelligence.mjs",
];

validateFileExists(registryPath);
validateFileExists(packagePath);

if (!failures.length) {
  const registryText = read(registryPath);
  const packageText = read(packagePath);

  validateText(registryPath, registryText, [
    "COMMAND_CENTER_VALIDATION_REGISTRY",
    "CommandCenterValidationRegistryItem",
    "requiredInValidateRoutes: true",
    "protectedBoundary",
    "failureMeaning",
    "getCommandCenterValidationRegistry",
    "report-truth-engine",
    "controlled-market-learning",
    "enterprise-operating-standard",
    "audit-defense-system",
    "evidence-first reports, minimum-input enrichment, traceable calculations, confidence labels, plan conversion rules, and report growth standards",
    "market trend learning, Cendorq leverage discovery, privacy-safe aggregation, review-gated self-evolution, and strict agent boundaries",
    "strict-but-not-paralyzing governance across security, AI, data protection, report integrity, market learning, commercial leverage, audit defense, brand trust, and resilience",
    "claim substantiation, consent and scope records, terms alignment, release approvals, evidence retention, legal-review triggers, correction paths, and dispute-readiness metadata",
  ]);

  for (const scriptPath of requiredScripts) {
    validateFileExists(scriptPath);
    if (!registryText.includes(`scriptPath: "${scriptPath}"`)) failures.push(`${registryPath} missing validation registry script path: ${scriptPath}`);
    if (!packageText.includes(scriptPath)) failures.push(`${packagePath} validate:routes missing required validation script: ${scriptPath}`);
  }

  const registryEntries = [...registryText.matchAll(/scriptPath: "([^"]+)"/g)].map((match) => match[1]);
  if (registryEntries.length !== requiredScripts.length) {
    failures.push(`${registryPath} expected ${requiredScripts.length} validator entries, found ${registryEntries.length}`);
  }
}

if (failures.length) {
  console.error("Command Center validation registry validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command Center validation registry validation passed. Every registered guardrail script exists, is listed in validate:routes, and exposes protected-boundary and failure-meaning metadata, including report truth, controlled market learning, enterprise operating, and audit defense guardrails.");

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
