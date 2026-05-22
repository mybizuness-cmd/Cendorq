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
  "src/scripts/validate-presence-report-retrieval-workflow-contracts.mjs",
  "src/scripts/validate-operator-release-gate-contracts.mjs",
  "src/scripts/validate-category-proof-standard-contracts.mjs",
  "Presence Report system validation passed with package-source, evidence record contracts, retrieval workflow contracts, operator release gates, category proof standards, and merge-readiness coverage.",
]);

expect("src/lib/presence-report-object-index.ts", ["SANDWORK_PRESENCE_REPORT_PACKAGE", "demoReportPackage"]);
expect("src/lib/presence-report-evidence-record-contracts.ts", ["PRESENCE_REPORT_EVIDENCE_RECORD_CONTRACTS", "operator-note", "blocked-from-customer-report"]);
expect("src/lib/presence-report-retrieval-workflow-contracts.ts", ["PRESENCE_REPORT_RETRIEVAL_WORKFLOW_CONTRACTS", "customer-safe-render", "package-source helper used"]);
expect("src/lib/operator-release-gate-contracts.ts", ["OPERATOR_RELEASE_GATE_CONTRACTS", "Approval Gate", "Release Log"]);
expect("src/lib/category-proof-standard-contracts.ts", ["CATEGORY_PROOF_STANDARD_CONTRACTS", "Findability", "Understanding", "Trust", "Choice", "Action", "Control"]);
expect("src/lib/presence-report-free-scan-snapshot-source.ts", [
  "resolveCustomerLatestFreeScanSnapshotPackage",
  "FreeScanSnapshotOwnershipProof",
  "FreeScanSnapshotRecord",
  "verified customer email",
  "server-side scan ownership",
  "same-account access gate",
  "customer-owned Free Scan snapshot",
  "resolved-customer-snapshot",
  "blocked-needs-ownership",
  "blocked-missing-snapshot",
]);
expect("src/lib/presence-report-package-source.ts", [
  "resolveCustomerLatestFreeScanSnapshotPackage",
  "PresenceReportPackageSourceOptions",
  "latestFreeScanRecord",
  "ownershipProof",
  "resolvedSource: \"customer-latest-free-scan\"",
  "blockedGates",
]);

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

console.log("Presence Report merge readiness validation passed with package source, customer-owned Free Scan snapshot retrieval, evidence record contracts, retrieval workflow contracts, operator release gates, category proof standards, object index, and system-chain coverage.");

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
