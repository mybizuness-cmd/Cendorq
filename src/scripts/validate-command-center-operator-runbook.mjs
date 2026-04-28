import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const runbookPath = "docs/command-center-operator-runbook.md";
const docsIndexPath = "docs/command-center-docs-index.md";
const packagePath = "package.json";

validateTextFile(runbookPath, [
  "# Command Center Operator Runbook",
  "private, gated, metadata-only operating cockpit",
  "closed by default",
  "Keep the route as an access-control and panel-composition shell.",
  "Keep cockpit panels server-rendered",
  "Keep panels metadata-only by default.",
  "Never expose secret values, customer records, raw evidence, raw intelligence, billing details, private reports, score inputs, prompts, or exact scoring weights",
  "Keep every visible cockpit panel represented in the panel registry.",
  "Keep every validation guard wired into `validate:routes`.",
  "Never claim that Cendorq is unhackable, risk-free, or perfectly secure.",
  "validate-command-center-security-posture.mjs",
  "validate-command-center-panel-registry.mjs",
  "validate-command-center-panel-safety.mjs",
  "validate-command-center-validation-registry.mjs",
  "validate-command-center-docs-index.mjs",
  "validate-production-smoke-coverage.mjs",
  "No visible cockpit panel should be merged without a matching registry entry.",
  "Vercel is green.",
]);

validateTextFile(docsIndexPath, [
  "# Command Center Docs Index",
  "docs/command-center-operator-runbook.md",
  "docs/maximum-protection-standard.md",
  "src/lib/command-center/validation-registry.ts",
  "validate-command-center-validation-registry.mjs",
  "validate-command-center-operator-runbook.mjs",
  "validate-command-center-docs-index.mjs",
]);

validateTextFile(packagePath, [
  "validate:routes",
  "validate-command-center-security-posture.mjs",
  "validate-command-center-panel-registry.mjs",
  "validate-command-center-panel-safety.mjs",
  "validate-command-center-validation-registry.mjs",
  "validate-command-center-operator-runbook.mjs",
  "validate-command-center-docs-index.mjs",
  "validate-production-smoke-coverage.mjs",
]);

if (failures.length) {
  console.error("Command Center operator runbook validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command Center operator runbook validation passed. The runbook and docs index preserve closed-by-default, metadata-only, server-rendered panel, registry, validation-registry, and validation-chain operating standards.");

function validateTextFile(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing required runbook dependency: ${path}`);
    return;
  }

  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing required runbook phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
