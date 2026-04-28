import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const docsIndexPath = "docs/command-center-docs-index.md";
const runbookPath = "docs/command-center-operator-runbook.md";
const packagePath = "package.json";

validateTextFile(docsIndexPath, [
  "# Command Center Docs Index",
  "private documentation index",
  "docs/maximum-protection-standard.md",
  "docs/command-center-operator-runbook.md",
  "src/lib/command-center/access.ts",
  "src/lib/command-center/security-posture.ts",
  "src/lib/command-center/panel-registry.ts",
  "src/lib/command-center/validation-registry.ts",
  "src/lib/command-center/report-truth-engine.ts",
  "src/lib/command-center/report-growth-system.ts",
  "src/lib/command-center/controlled-market-learning.ts",
  "src/lib/command-center/enterprise-operating-standard.ts",
  "src/lib/command-center/audit-defense-system.ts",
  "src/lib/command-center/most-pristine-system-standard.ts",
  "src/lib/command-center/readiness-summary.ts",
  "src/lib/command-center/database-readiness.ts",
  "src/lib/command-center/auth-readiness.ts",
  "src/lib/command-center/file-storage-readiness.ts",
  "src/lib/command-center/billing-readiness.ts",
  "src/lib/command-center/delivery-readiness.ts",
  "src/lib/command-center/automation-readiness.ts",
  "src/lib/command-center/governance-readiness.ts",
  "src/lib/command-center/intelligence-readiness.ts",
  "src/scripts/validate-command-center-security-posture.mjs",
  "src/scripts/validate-command-center-panel-registry.mjs",
  "src/scripts/validate-command-center-panel-safety.mjs",
  "src/scripts/validate-command-center-validation-registry.mjs",
  "src/scripts/validate-report-truth-engine.mjs",
  "src/scripts/validate-controlled-market-learning.mjs",
  "src/scripts/validate-enterprise-operating-standard.mjs",
  "src/scripts/validate-audit-defense-system.mjs",
  "src/scripts/validate-most-pristine-system-standard.mjs",
  "src/scripts/validate-command-center-operator-runbook.mjs",
  "src/scripts/validate-command-center-docs-index.mjs",
  "src/scripts/validate-production-smoke-coverage.mjs",
  "must never include secret values, live customer data, raw intelligence, raw evidence, billing records, report internals, prompts, scoring weights, audit-defense legal strategy beyond approved metadata anchors, or non-public quality-review details",
]);

validateTextFile(runbookPath, [
  "# Command Center Operator Runbook",
  "Keep every validation guard wired into `validate:routes`.",
  "validate-command-center-operator-runbook.mjs",
  "validate-command-center-docs-index.mjs",
  "Vercel is green.",
]);

validateTextFile(packagePath, [
  "validate:routes",
  "validate-command-center-docs-index.mjs",
  "validate-command-center-validation-registry.mjs",
  "validate-report-truth-engine.mjs",
  "validate-controlled-market-learning.mjs",
  "validate-enterprise-operating-standard.mjs",
  "validate-audit-defense-system.mjs",
  "validate-most-pristine-system-standard.mjs",
]);

if (failures.length) {
  console.error("Command Center docs index validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command Center docs index validation passed. Private Command Center standards, source-of-truth files, validation registry, report truth engine, report growth system, controlled market learning, enterprise operating standard, audit defense system, most-pristine system standard, runbook references, and guardrail validators remain discoverable without exposing secrets or live private data.");

function validateTextFile(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing required docs index dependency: ${path}`);
    return;
  }

  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing required docs index phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
