import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

expect("package.json", ["validate:presence-report", "node ./src/scripts/validate-presence-report-system.mjs"]);

expect("src/scripts/validate-presence-report-system.mjs", [
  "src/scripts/validate-presence-report-merge-readiness.mjs",
  "src/scripts/validate-sandwork-presence-report-fixture.mjs",
  "src/scripts/validate-presence-report-package-source.mjs",
  "src/scripts/validate-presence-report-evidence-record-contracts.mjs",
  "Presence Report system validation passed with package-source, evidence record contracts, and merge-readiness coverage.",
]);

expect("src/lib/presence-report-object-index.ts", ["SANDWORK_PRESENCE_REPORT_PACKAGE", "demoReportPackage"]);
expect("src/lib/presence-report-evidence-record-contracts.ts", ["PRESENCE_REPORT_EVIDENCE_RECORD_CONTRACTS", "operator-note", "blocked-from-customer-report"]);

expect("docs/presence-report-merge-readiness.md", [
  "Presence Report merge readiness",
  "pnpm validate:routes",
  "pnpm validate:presence-report",
  "Free Scan remains first signal only.",
  "Sample Report remains example, not a promise.",
  "Presence Report recommendations stay evidence-led.",
  "Sandwork demo data stays centralized in the shared report package",
]);

expect("docs/presence-report-validation-runbook.md", [
  "Presence Report validation runbook",
  "pnpm validate:presence-report",
  "Release Gate checks approved facts",
]);

if (failures.length) {
  console.error("Presence Report merge readiness validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Presence Report merge readiness validation passed with package source, evidence record contracts, object index, and system-chain coverage.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = readFileSync(join(root, path), "utf8");
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
  }
}