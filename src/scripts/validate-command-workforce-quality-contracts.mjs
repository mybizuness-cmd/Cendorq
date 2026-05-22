import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

expect("docs/command-workforce-operating-model.md", [
  "Cendorq Command Workforce Operating Model",
  "Owner command sets category direction and launch posture.",
  "Release captain controls the active branch",
  "Visual command lane",
  "Visual hierarchy scout",
  "Report design quality scout",
  "Mobile command clarity scout",
  "Every finding should include",
  "Use bigger batches when changes form one coherent operating layer and can be validated together.",
]);

expect("docs/command-workforce-finding-template.md", [
  "Command Workforce Finding Template",
  "Finding identity",
  "Evidence basis",
  "Affected surface",
  "Release captain decision",
  "Regression memory",
  "Validator needed:",
]);

expect("docs/command-workforce-quality-scorecard.md", [
  "Command Workforce Quality Scorecard",
  "Category command",
  "Customer clarity",
  "Visual command",
  "Report truth",
  "Operational safety",
  "Batch decision",
  "Required notes",
  "Makes Cendorq harder to copy by improving proof, control, clarity, or customer trust.",
  "Next action is obvious, safe, and tied to evidence.",
  "Validator coverage, handoff memory, and release checks clearly protect the change.",
]);

expect("docs/visual-command-quality-standard.md", [
  "Cendorq Visual Command Quality Standard",
  "Visual quality is part of category ownership.",
  "What is the safest next command?",
  "Premium restraint",
  "Strong hierarchy",
  "Immediate scannability",
  "Clear proof sequence",
  "One dominant next action",
  "Mobile clarity",
  "Report readability",
  "Dashboard command clarity",
  "Clean visual focus",
]);

expect("docs/visual-command-review-template.md", [
  "Visual Command Review Template",
  "Surface reviewed",
  "One-command clarity",
  "Trust and restraint",
  "Proof sequence",
  "Mobile command quality",
  "Dashboard command quality",
  "Decision",
  "What is the safest next command?",
]);

expect("docs/command-workforce-release-runbook.md", [
  "Command Workforce Release Runbook",
  "Finding intake",
  "Review lanes",
  "Batch sizing",
  "Acceptance",
  "Memory",
  "passing CI",
  "passing Release Control",
  "passing CodeQL",
  "green Vercel",
]);

expect("docs/command-workforce-docs-index.md", [
  "Command Workforce Docs Index",
  "Operating layer",
  "Visual quality layer",
  "Typed source of truth",
  "Validator",
  "Promotion path",
  "docs/command-workforce-finding-template.md",
  "docs/visual-command-review-template.md",
  "pnpm validate:command-workforce",
]);

expect("docs/command-workforce-merge-readiness.md", [
  "Command Workforce Merge Readiness",
  "Required checks",
  "pnpm validate:command-workforce",
  "Readiness conditions",
  "CI is green.",
  "Release Control is green.",
  "CodeQL is green.",
  "Vercel is green.",
]);

expect("docs/command-workforce-handoff-addendum.md", [
  "Command Workforce Handoff Addendum",
  "Current layer",
  "Operating posture",
  "Visual posture",
  "Finding posture",
  "Batch posture",
  "Next promotion",
]);

expect("package.json", [
  "validate:command-workforce",
  "node ./src/scripts/validate-command-workforce-quality-contracts.mjs",
]);

expect("src/lib/command-workforce-quality-contracts.ts", [
  "COMMAND_WORKFORCE_OPERATING_MODEL",
  "VISUAL_COMMAND_QUALITY_STANDARD",
  "getCommandWorkforceOperatingModel",
  "getVisualCommandQualityStandard",
  "owner-command",
  "release-captain",
  "chief-lanes",
  "scoped-scouts",
  "visual-command",
  "findingId",
  "evidenceBasis",
  "customerImpact",
  "categoryImpact",
  "validatorNeeded",
  "releaseCaptainDecision",
  "What is the safest next command?",
]);

if (failures.length) {
  console.error("Command workforce quality validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command workforce quality validation passed with operating model, finding template, quality scorecard, visual standard, visual review template, release runbook, docs index, merge readiness, handoff addendum, package script, and typed contract coverage.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = readFileSync(join(root, path), "utf8");
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}