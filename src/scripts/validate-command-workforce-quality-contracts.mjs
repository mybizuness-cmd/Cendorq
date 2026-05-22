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
  "Report surfaces should separate score, finding, proof, limitation, next move, and repair priority.",
  "Mobile screens must preserve the main action",
]);

expect("docs/command-workforce-release-runbook.md", [
  "Command Workforce Release Runbook",
  "Finding intake",
  "Review lanes",
  "Batch sizing",
  "Acceptance",
  "Memory",
  "Report truth lane",
  "Customer command experience lane",
  "Visual command lane",
  "Security and command lane",
  "Market forecast lane",
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
  "docs/command-workforce-operating-model.md",
  "docs/command-workforce-release-runbook.md",
  "docs/visual-command-quality-standard.md",
  "src/lib/command-workforce-quality-contracts.ts",
  "src/scripts/validate-command-workforce-quality-contracts.mjs",
]);

expect("docs/command-workforce-merge-readiness.md", [
  "Command Workforce Merge Readiness",
  "Required checks",
  "node ./src/scripts/validate-command-workforce-quality-contracts.mjs",
  "Readiness conditions",
  "CI is green.",
  "Release Control is green.",
  "CodeQL is green.",
  "Vercel is green.",
  "Operating layer review",
  "Visual quality review",
  "Promotion path",
]);

expect("docs/command-workforce-handoff-addendum.md", [
  "Command Workforce Handoff Addendum",
  "Current layer",
  "Operating posture",
  "Visual posture",
  "Finding posture",
  "Batch posture",
  "Next promotion",
  "docs/command-workforce-operating-model.md",
  "docs/visual-command-quality-standard.md",
  "docs/command-workforce-release-runbook.md",
  "docs/command-workforce-docs-index.md",
  "docs/command-workforce-merge-readiness.md",
  "src/lib/command-workforce-quality-contracts.ts",
  "src/scripts/validate-command-workforce-quality-contracts.mjs",
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
  "visual-hierarchy-scout",
  "report-design-quality-scout",
  "mobile-command-clarity-scout",
  "findingId",
  "evidenceBasis",
  "customerImpact",
  "categoryImpact",
  "validatorNeeded",
  "releaseCaptainDecision",
  "What is the safest next command?",
  "premium-restraint",
  "one-dominant-next-action",
  "mobile-clarity",
  "report-readability",
  "dashboard-command-clarity",
]);

if (failures.length) {
  console.error("Command workforce quality validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command workforce quality validation passed with operating model, visual standard, release runbook, docs index, merge readiness, handoff addendum, and typed contract coverage.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = readFileSync(join(root, path), "utf8");
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}