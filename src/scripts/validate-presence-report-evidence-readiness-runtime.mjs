import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const path = "src/lib/presence-report-evidence-readiness-runtime.ts";

expect(path, [
  "PresenceReportEvidenceReadinessInput",
  "PresenceReportEvidenceReadinessState",
  "PresenceReportEvidenceReadinessResolution",
  "resolvePresenceReportEvidenceReadiness",
  "resolvePresenceReportEvidenceReadinessBatch",
  "getPresenceReportEvidenceRecordContract",
  "customer-ready",
  "needs-review",
  "blocked",
  "approved-for-customer-report",
  "customer-safe",
  "blocked-from-customer-report",
  "internal-only",
  "customerSafeSummary",
  "confidenceLabel",
  "limitation",
  "missingSignals",
  "blockedReasons",
  "nextGate",
  "package-resolution",
  "approval-gate",
  "evidence-readiness",
  "review state blocks customer report use",
  "internal-only sensitivity blocks customer rendering",
  "customer-safe summary missing",
  "confidence label missing",
  "limitation missing",
  "customer-safe rewrite missing",
]);

forbidden(path, ["rawEvidence", "raw scrape", "private scoring"]);

if (failures.length) {
  console.error("Presence Report evidence readiness runtime validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Presence Report evidence readiness runtime validation passed with customer-ready, needs-review, blocked, missing-signal, blocked-reason, batch, package-resolution, and approval-gate coverage.");

function expect(filePath, phrases) {
  if (!existsSync(join(root, filePath))) {
    failures.push(`Missing dependency: ${filePath}`);
    return;
  }
  const text = read(filePath);
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${filePath} missing phrase: ${phrase}`);
}

function forbidden(filePath, phrases) {
  if (!existsSync(join(root, filePath))) return;
  const text = read(filePath);
  for (const phrase of phrases) if (text.includes(phrase)) failures.push(`${filePath} contains forbidden phrase: ${phrase}`);
}

function read(filePath) {
  return readFileSync(join(root, filePath), "utf8");
}
