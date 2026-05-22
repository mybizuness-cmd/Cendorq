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

console.log("Command workforce quality validation passed with operating model and visual command contract coverage.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = readFileSync(join(root, path), "utf8");
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}
