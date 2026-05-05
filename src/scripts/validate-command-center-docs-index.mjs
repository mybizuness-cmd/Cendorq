import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const requiredFiles = [
  "docs/command-center-docs-index.md",
  "docs/maximum-protection-standard.md",
  "docs/owner-maximum-protection-posture.md",
  "docs/command-center-operator-runbook.md",
  "docs/admin-command-center-safe-projections.md",
  "docs/owner-operating-manual.md",
  "docs/repo-update-scanning-automation.md",
  "docs/controlled-continuous-evolution.md",
  "package.json",
  "src/scripts/validate-routes-chain.mjs",
  "src/scripts/validate-routes-chain-integrity.mjs",
  "src/scripts/validate-maximum-protection-standard.mjs",
  "src/scripts/validate-owner-maximum-protection-posture.mjs",
  "src/scripts/validate-codeql-workflow-integrity.mjs",
  "src/scripts/validate-command-center-docs-index.mjs",
  "src/scripts/validate-owner-operating-manual.mjs",
  "src/scripts/validate-command-center-validation-registry.mjs",
  "src/scripts/validate-report-truth-engine.mjs",
  "src/scripts/validate-report-evidence-record-runtime.mjs",
  "src/scripts/validate-command-center-owner-configuration-workflow-smoke.mjs",
  "src/lib/command-center/validation-registry.ts",
  "src/lib/controlled-continuous-evolution-contracts.ts",
];

for (const file of requiredFiles) validateFileExists(file);

validateTextFile("docs/command-center-docs-index.md", [
  "# Command Center Docs Index",
  "private documentation index",
  "docs/maximum-protection-standard.md",
  "docs/owner-maximum-protection-posture.md",
  "docs/command-center-operator-runbook.md",
  "docs/admin-command-center-safe-projections.md",
  "docs/owner-operating-manual.md",
  "docs/repo-update-scanning-automation.md",
  "docs/controlled-continuous-evolution.md",
  "src/lib/command-center/validation-registry.ts",
  "Route-chain integrity standard",
  "Maximum protection standard",
  "Owner maximum protection posture",
  "CodeQL workflow integrity standard",
  "Repo update scanning automation standard",
  "Controlled continuous evolution standard",
]);

validateTextFile("docs/command-center-operator-runbook.md", [
  "# Command Center Operator Runbook",
  "Keep every validation guard wired into `validate:routes`.",
  "validate-command-center-docs-index.mjs",
  "validate-command-center-owner-configuration-workflow-smoke.mjs",
  "Vercel is green.",
]);

validateTextFile("docs/maximum-protection-standard.md", [
  "# Cendorq Maximum Protection Standard",
  "Default posture: deny by default.",
  "Public content may teach the category, but it must not expose the private machine.",
]);

validateTextFile("docs/owner-maximum-protection-posture.md", [
  "# Owner Maximum Protection Posture",
  "daily operating decisions",
  "Required owner decisions",
  "Hard owner locks",
  "Operating rule",
]);

validateTextFile("docs/repo-update-scanning-automation.md", [
  "# Repo Update Scanning Automation",
  "src/scripts/validate-repo-update-scanning-automation.mjs",
  ".github/dependabot.yml",
  ".github/workflows/codeql.yml",
  "release-captain review",
]);

validateTextFile("docs/controlled-continuous-evolution.md", [
  "# Controlled Continuous Evolution",
  "monitored, validated, reviewable, reversible updates",
  "release-captain approval before merge",
  "Documentation rule",
]);

validateTextFile("docs/admin-command-center-safe-projections.md", [
  "# Admin Command Center Safe Projections",
  "Operating posture",
  "Source of truth",
  "Validation requirements",
]);

validateTextFile("docs/owner-operating-manual.md", [
  "# Cendorq Owner Operating Manual",
  "proof before output",
  "evidence before recommendation",
  "Conversion moat",
]);

validateTextFile("src/scripts/validate-routes-chain.mjs", [
  "validate-routes-chain-integrity.mjs",
  "validate-maximum-protection-standard.mjs",
  "validate-owner-maximum-protection-posture.mjs",
  "validate-command-center-docs-index.mjs",
  "validate-owner-operating-manual.mjs",
  "validate-command-center-validation-registry.mjs",
  "validate-report-truth-engine.mjs",
  "validate-report-evidence-record-runtime.mjs",
  "validate-command-center-owner-configuration-workflow-smoke.mjs",
]);

validateTextFile("src/scripts/validate-routes-chain-integrity.mjs", [
  "validate-codeql-workflow-integrity.mjs",
  "validate-repo-update-scanning-automation.mjs",
  "validate-controlled-continuous-evolution.mjs",
  "validateCodeqlWorkflowCoverage",
  "validateControlledContinuousEvolutionCoverage",
  "requiredIndirectReportEvidenceValidators",
  "validateIndirectReportEvidenceCoverage",
  "rawEvidenceExposed: false",
]);

validateTextFile("src/scripts/validate-codeql-workflow-integrity.mjs", [
  ".github/workflows/codeql.yml",
  "actions/checkout@v6",
  "github/codeql-action/init@v4",
  "github/codeql-action/analyze@v4",
]);

validateTextFile("package.json", ["validate:routes", "node ./src/scripts/validate-routes-chain.mjs"]);

if (failures.length) {
  console.error("Command Center docs index validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command Center docs index validation passed with docs index, owner posture, route-chain integrity, CodeQL workflow integrity, repo update scanning, controlled continuous evolution, owner manual, and report evidence runtime coverage.");

function validateFileExists(path) {
  if (!existsSync(join(root, path))) failures.push(`Missing required docs index dependency: ${path}`);
}

function validateTextFile(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing required docs index dependency: ${path}`);
    return;
  }
  const text = read(path);
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing required docs index phrase: ${phrase}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
