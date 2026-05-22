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

expect("docs/command-center-command-workforce-bridge.md", [
  "Command Center Command Workforce Bridge",
  "Connected layer",
  "Command Center relationship",
  "Required posture",
  "Promotion path",
  "docs/command-workforce-operating-model.md",
  "docs/command-workforce-quality-scorecard.md",
  "docs/visual-command-quality-standard.md",
  "src/scripts/validate-command-workforce-quality-contracts.mjs",
  "pnpm validate:command-workforce",
  "Command workforce validation remains in Release Control.",
]);

expect("docs/visual-command-device-width-review-protocol.md", [
  "Visual Command Device-Width Review Protocol",
  "Required surfaces",
  "Required widths",
  "Required capture bands",
  "Pass criteria",
  "Fail criteria",
  "Surface-specific checks",
  "Required review record",
  "Release rule",
  "390px mobile portrait",
  "430px large mobile portrait",
  "768px tablet portrait",
  "1024px tablet landscape",
  "1440px desktop",
  "proof appears before high-commitment paid action pressure",
  "one dominant next command is visible per screen band",
  "Homepage `/`",
  "Plans `/plans`",
  "FAQ `/faq`",
  "Sample Presence Report `/sample-report`",
  "Protected Free Scan Presence Report `/dashboard/reports/free-scan`",
]);

expect("docs/visual-command-surface-review-register.md", [
  "Visual Command Surface Review Register",
  "Homepage `/`",
  "Sample Presence Report `/sample-report`",
  "Protected Free Scan Presence Report `/dashboard/reports/free-scan`",
  "Dashboard Presence Command Snapshot",
  "Plans `/plans`",
  "FAQ `/faq`",
  "Mobile command hierarchy",
  "one obvious safest next command",
  "premium restraint",
  "strong hierarchy",
  "immediate scannability",
  "clear proof sequence",
  "mobile clarity",
  "report readability",
  "dashboard command clarity",
  "Run Free Scan as the clearest first command",
  "sample language educational, not promissory",
  "first signal only visible",
  "Choice Gap, Repair Queue, and Control Snapshot distinct",
  "Keep Free Scan as the safest starting command when the buyer is unsure.",
  "Keep Start Free Scan first in quick links.",
  "Keep one dominant next action per screen band.",
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

console.log("Command workforce quality validation passed with device-width review protocol, visual surface review register, Plans FAQ mobile review coverage, Command Center bridge, operating model, finding template, quality scorecard, visual standard, visual review template, release runbook, docs index, merge readiness, handoff addendum, package script, and typed contract coverage.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = readFileSync(join(root, path), "utf8");
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}