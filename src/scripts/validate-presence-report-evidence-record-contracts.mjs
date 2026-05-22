import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const contractPath = "src/lib/presence-report-evidence-record-contracts.ts";
const systemValidatorPath = "src/scripts/validate-presence-report-system.mjs";
const validatorPath = "src/scripts/validate-presence-report-evidence-record-contracts.mjs";

expect(contractPath, [
  "PresenceReportEvidenceKind",
  "PresenceReportEvidenceReviewState",
  "PresenceReportEvidenceSensitivity",
  "PresenceReportEvidenceRecordContract",
  "PRESENCE_REPORT_EVIDENCE_RECORD_CONTRACTS",
  "submitted-business-context",
  "visible-public-signal",
  "comparison-signal",
  "customer-proof-signal",
  "operator-note",
  "captured",
  "normalized",
  "review-required",
  "approved-for-customer-report",
  "blocked-from-customer-report",
  "customer-safe",
  "restricted",
  "internal-only",
  "verified customer email",
  "same-account access gate",
  "server-side scan ownership",
  "source label",
  "confidence label",
  "evidence boundary",
  "operator review",
  "operator approval",
  "release gate",
  "customer-safe rewrite",
  "getPresenceReportEvidenceRecordContracts",
  "getPresenceReportEvidenceRecordContract",
]);

expect(systemValidatorPath, [validatorPath]);

forbidden(contractPath, [
  "raw intake payload exposed",
  "raw scrape body exposed",
  "operator notes exposed",
  "unsupported guarantee allowed",
]);

if (failures.length) {
  console.error("Presence Report evidence record contract validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Presence Report evidence record contract validation passed with customer-safe, restricted, and internal-only evidence boundaries plus review and approval gates.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = read(path);
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}

function forbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  for (const phrase of phrases) if (text.includes(phrase)) failures.push(`${path} contains forbidden phrase: ${phrase}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
