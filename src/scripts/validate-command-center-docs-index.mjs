import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const requiredFiles = [
  "docs/command-center-docs-index.md",
  "docs/command-design-operating-standard.md",
  "docs/command-design-release-checklist.md",
  ".github/PULL_REQUEST_TEMPLATE/command-design.md",
  "docs/maximum-protection-standard.md",
  "docs/owner-maximum-protection-posture.md",
  "docs/command-center-operator-runbook.md",
  "docs/admin-command-center-safe-projections.md",
  "docs/owner-operating-manual.md",
  "docs/repo-update-scanning-automation.md",
  "docs/controlled-continuous-evolution.md",
  "docs/command-center-delivery-readiness.md",
  "package.json",
  "src/scripts/validate-routes-chain.mjs",
  "src/scripts/validate-routes-chain-integrity.mjs",
  "src/scripts/validate-command-design-operating-standard.mjs",
  "src/scripts/validate-public-drift.mjs",
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
  "Public buyer-path guard",
  "Contact Us",
  "`/connect` as the stable Contact Us route",
  "`/contact` redirecting into `/connect`",
  "support@cendorq.com",
  "no untested public message boxes or fake success states",
  "docs/command-design-operating-standard.md",
  "docs/command-design-release-checklist.md",
  "docs/command-center-delivery-readiness.md",
  "delivery readiness standard",
  "Contact Us send-pipeline safety",
  ".github/PULL_REQUEST_TEMPLATE/command-design.md",
  "src/scripts/validate-command-design-operating-standard.mjs",
  "src/scripts/validate-public-drift.mjs",
  "Required command design paths",
  "Apple-level trust and authority",
  "Google-level simplicity",
  "ChatGPT-level immediate action",
  "safest-next-command rule",
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
  "delivery readiness behavior",
]);

validateTextFile("docs/command-center-delivery-readiness.md", [
  "# Command Center Delivery Readiness",
  "support handoff",
  "Contact Us remains direct-email based to `support@cendorq.com`",
  "sender reply-email capture for future Contact Us forms",
  "`/connect` remains the Contact Us route",
  "`/contact` redirects to `/connect`",
  "public Contact Us still uses `support@cendorq.com`",
  "any future Contact Us form collects a reply email, sends to `support@cendorq.com`, and avoids fake success states",
  "No untested public message boxes.",
]);

validateTextFile("docs/command-design-operating-standard.md", [
  "Apple-level trust and authority",
  "Google-level simplicity",
  "ChatGPT-level immediate action",
  "What is the safest next command?",
]);

validateTextFile("docs/command-design-release-checklist.md", [
  "# Command Design Release Checklist",
  "Apple-level trust and authority",
  "Google-level simplicity",
  "ChatGPT-level immediate action",
]);

validateTextFile(".github/PULL_REQUEST_TEMPLATE/command-design.md", [
  "Command design impact",
  "Apple-level trust and authority",
  "Google-level simplicity",
  "ChatGPT-level immediate action",
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
  "validate-command-design-operating-standard.mjs",
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

validateTextFile("src/scripts/validate-command-design-operating-standard.mjs", [
  "docs/command-design-operating-standard.md",
  "docs/command-design-release-checklist.md",
  ".github/PULL_REQUEST_TEMPLATE/command-design.md",
  "docs/command-center-docs-index.md",
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

console.log("Command Center docs index validation passed with command design, Contact Us support guard, delivery readiness, docs index, owner posture, route-chain integrity, CodeQL workflow integrity, repo update scanning, controlled continuous evolution, owner manual, and report evidence runtime coverage.");

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
