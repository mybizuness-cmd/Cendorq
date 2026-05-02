import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const docsPath = "docs/controlled-continuous-evolution.md";
const contractPath = "src/lib/controlled-continuous-evolution-contracts.ts";
const pristineValidatorPath = "src/scripts/validate-most-pristine-system-standard.mjs";
const routeChainPath = "src/scripts/validate-routes-chain.mjs";
const routeChainIntegrityPath = "src/scripts/validate-routes-chain-integrity.mjs";
const validationRegistryPath = "src/lib/command-center/validation-registry.ts";
const validationRegistryValidatorPath = "src/scripts/validate-command-center-validation-registry.mjs";
const docsIndexPath = "docs/command-center-docs-index.md";
const docsIndexValidatorPath = "src/scripts/validate-command-center-docs-index.mjs";
const operatorRunbookPath = "docs/command-center-operator-runbook.md";
const operatorRunbookValidatorPath = "src/scripts/validate-command-center-operator-runbook.mjs";
const ownerManualPath = "docs/owner-operating-manual.md";
const ownerManualValidatorPath = "src/scripts/validate-owner-operating-manual.mjs";
const packagePath = "package.json";

expect(docsPath, [
  "# Controlled Continuous Evolution",
  "monitored, validated, reviewable, reversible updates",
  "Automated systems may detect, propose, test, and prepare updates",
  "a small coherent branch from the latest confirmed main",
  "validation scripts passing",
  "Vercel preview or deployment check success when applicable",
  "auto-merge production-impacting code without green gates",
  "skip Vercel or preview gates",
  "release-captain approval before merge",
  "Continuous updates must raise or preserve Cendorq's most-pristine standard",
  "Documentation rule",
]);

expect(contractPath, [
  "CONTROLLED_CONTINUOUS_EVOLUTION_CONTRACT",
  "controlled-continuous-evolution-v1",
  "Keep Cendorq improving after launch through monitored, validated, reviewable, reversible updates without uncontrolled production mutation or quality drift.",
  "Automated systems may detect, propose, test, and prepare updates.",
  "dependency-health",
  "security-scanning",
  "accessibility-and-ux-regression",
  "performance-and-core-web-vitals",
  "conversion-copy-quality",
  "legal-liability-language",
  "report-truthfulness-and-citation-quality",
  "daily dependency and vulnerability detection",
  "weekly interface quality and accessibility review",
  "monthly legal/liability language review",
  "quarterly platform architecture and scalability review",
  "open dependency update pull requests",
  "open security remediation pull requests",
  "run validation scripts",
  "run smoke checks against preview deployments",
  "auto-merge production-impacting code without green gates",
  "disable validation to make updates pass",
  "pull request with reviewable diff",
  "Vercel preview or deployment check passes",
  "rollback path identified",
  "small coherent batches",
  "preview before production",
  "rollback-ready before promotion",
  "dependency advisories",
  "code scanning alerts",
  "accessibility regressions",
  "performance regressions",
  "support request spikes",
  "CONTROLLED_CONTINUOUS_EVOLUTION_RUNBOOK",
  "CONTROLLED_CONTINUOUS_EVOLUTION_HARD_LOCKS",
  "CONTROLLED_CONTINUOUS_EVOLUTION_BLOCKED_PATTERNS",
  "automatic update systems can propose changes but cannot bypass validation",
  "all scheduled updates must remain coherent, bounded, and traceable",
]);

expect(pristineValidatorPath, [
  "validate-most-pristine-system-standard.mjs",
  "src/lib/controlled-continuous-evolution-contracts.ts",
  "src/scripts/validate-controlled-continuous-evolution.mjs",
  "controlled continuous evolution",
  "repo update scanning automation",
]);

expect(routeChainPath, [
  "src/scripts/validate-controlled-continuous-evolution.mjs",
  "src/scripts/validate-controlled-maintenance-contracts.mjs",
]);

expect(routeChainIntegrityPath, [
  "src/scripts/validate-controlled-continuous-evolution.mjs",
  "src/lib/controlled-continuous-evolution-contracts.ts",
  "validateControlledContinuousEvolutionCoverage",
  "controlled continuous evolution",
]);

expect(validationRegistryPath, [
  "controlled-continuous-evolution",
  "Controlled continuous evolution",
  "src/scripts/validate-controlled-continuous-evolution.mjs",
  "monitored, validated, reviewable, rollback-ready updates",
  "skipped Vercel gates",
]);

expect(validationRegistryValidatorPath, [
  "controlled-continuous-evolution",
  "Controlled continuous evolution",
  "src/scripts/validate-controlled-continuous-evolution.mjs",
  "src/lib/controlled-continuous-evolution-contracts.ts",
]);

expect(docsIndexPath, [
  "Controlled continuous evolution standard",
  "docs/controlled-continuous-evolution.md",
  "src/scripts/validate-controlled-continuous-evolution.mjs",
  "src/lib/controlled-continuous-evolution-contracts.ts",
  "small-batch, preview-gated, rollback-ready, documented",
  "route-chain integrity, validation registry, docs index, operator runbook, owner operating manual, and most-pristine coverage",
]);

expect(docsIndexValidatorPath, [
  "Controlled continuous evolution standard",
  "docs/controlled-continuous-evolution.md",
  "validate-controlled-continuous-evolution.mjs",
  "src/lib/controlled-continuous-evolution-contracts.ts",
  "controlled continuous evolution rule",
]);

expect(operatorRunbookPath, [
  "Required controlled continuous evolution coverage",
  "src/scripts/validate-controlled-continuous-evolution.mjs",
  "src/lib/controlled-continuous-evolution-contracts.ts",
  "Controlled continuous evolution is the approved way to keep Cendorq improving after launch.",
  "Route-chain integrity runs first and controlled continuous evolution remains centrally covered.",
]);

expect(operatorRunbookValidatorPath, [
  "Required controlled continuous evolution coverage",
  "validate-controlled-continuous-evolution.mjs",
  "src/lib/controlled-continuous-evolution-contracts.ts",
  "controlled continuous evolution",
]);

expect(ownerManualPath, [
  "## Controlled continuous evolution",
  "Cendorq should keep improving after launch through monitored, validated, reviewable, reversible updates without uncontrolled production mutation or quality drift.",
  "Do not skip gates to move faster.",
]);

expect(ownerManualValidatorPath, [
  "## Controlled continuous evolution",
  "controlled continuous evolution",
  "route-chain, registry, docs-index, operator-runbook, and most-pristine coverage",
]);

expect(packagePath, [
  "validate:routes",
]);

forbidden(docsPath, [
  "auto-merge without validation is allowed",
  "skip Vercel gates for speed",
  "disable validation to pass",
  "unreviewed production mutation is allowed",
  "weaken safeguards for convenience",
]);

forbidden(contractPath, [
  "autoMergeWithoutValidation allowed",
  "skipVercelGate allowed",
  "disableValidatorForUpdate allowed",
  "unreviewedProductionMutation allowed",
  "weakenGuardrailsForConvenience allowed",
  "storeRawPayloadForDebugging allowed",
  "deleteAuditRecordsToCleanUp allowed",
]);

if (failures.length) {
  console.error("Controlled continuous evolution validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Controlled continuous evolution validation passed with docs, route-chain, registry, docs-index, operator-runbook, owner-manual, and most-pristine coverage.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
  }
}

function forbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  for (const phrase of phrases) {
    if (text.includes(phrase)) failures.push(`${path} contains forbidden phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
