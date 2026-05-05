import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const contractPath = "src/lib/command-center/audit-report-record-contracts.ts";
const docsIndexPath = "docs/command-center-docs-index.md";
const routeChainPath = "src/scripts/validate-routes-chain.mjs";
const registryPath = "src/lib/command-center/validation-registry.ts";

validateTextFile(contractPath, [
  "AUDIT_REPORT_RECORD_CONTRACTS",
  "AUDIT_REPORT_RECORD_REQUIRED_GUARDS",
  "getAuditReportRecordContracts",
  "business-identity",
  "evidence",
  "report-calculation",
  "report-claim",
  "customer-consent-scope",
  "report-release-approval",
  "material-error-correction",
  "dispute-readiness-package",
  "rawSecretStored: false",
  "publicOutputAllowed: false",
  "privacySafeExportOnly: true",
  "no raw secrets in public output",
  "no customer-facing claim without substantiation",
  "no paid report delivery without approval record",
  "no score without calculation trace",
  "no correction without preserved correction history",
]);

validateTextFile(docsIndexPath, [
  "src/lib/command-center/audit-report-record-contracts.ts",
  "src/scripts/validate-report-record-contracts.mjs",
]);

validateTextFile(routeChainPath, ["src/scripts/validate-report-record-contracts.mjs"]);
validateTextFile(registryPath, ["report-record-contracts", "src/scripts/validate-report-record-contracts.mjs"]);

validateForbidden(contractPath, [
  "rawSecretStored: true",
  "publicOutputAllowed: true",
  "privacySafeExportOnly: false",
  "guaranteed revenue",
  "guaranteed ROI",
]);

if (failures.length) {
  console.error("Report record contracts validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Report record contracts validation passed with proof, privacy, release, correction, and dispute-readiness safeguards.");

function validateTextFile(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing required report record dependency: ${path}`);
    return;
  }
  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing required report record phrase: ${phrase}`);
  }
}

function validateForbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  for (const phrase of phrases) {
    if (text.includes(phrase)) failures.push(`${path} contains forbidden report record phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
