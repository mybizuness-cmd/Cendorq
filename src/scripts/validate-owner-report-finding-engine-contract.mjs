import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const contractPath = "src/lib/owner-report-finding-engine-contract.ts";
const failures = [];

expect(contractPath, [
  "OwnerReportFindingClass",
  "OwnerReportFinding",
  "OwnerReportFindingEngineProjection",
  "OWNER_REPORT_FINDING_ENGINE_STANDARD",
  "buildOwnerReportFindingEngineProjection",
  "visibility-signal",
  "trust-signal",
  "conversion-signal",
  "technical-readiness",
  "content-clarity",
  "risk-limitation",
  "next-command",
  "evidenceClass",
  "confidenceReason",
  "observed",
  "inferred",
  "limitations",
  "customerSafe: true",
  "ownerTestOnly: true",
  "rawEvidenceReturned: false",
  "privateDataReturned: false",
  "customerDeliveryApproved: false",
  "reportReleaseApproved: false",
  "unsupported guarantees",
  "No private customer systems, credentials, analytics, ad accounts, or search-console data are inspected.",
  "does not guarantee ranking, revenue, AI placement, security, or accuracy",
]);

forbidden(contractPath, [
  "customerSafe: false",
  "ownerTestOnly: false",
  "rawEvidenceReturned: true",
  "privateDataReturned: true",
  "customerDeliveryApproved: true",
  "reportReleaseApproved: true",
  "guaranteed ranking is allowed",
  "guaranteed revenue is allowed",
  "raw html returned",
  "password=",
  "secret=",
  "token=",
]);

if (failures.length) {
  console.error("Owner report finding engine contract validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Owner report finding engine contract validation passed.");

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
  const text = read(path).toLowerCase();
  for (const phrase of phrases) if (text.includes(phrase.toLowerCase())) failures.push(`${path} contains forbidden phrase: ${phrase}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
