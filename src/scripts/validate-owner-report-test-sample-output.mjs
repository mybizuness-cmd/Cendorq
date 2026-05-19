import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const samplePath = "src/lib/owner-report-test-sample-output.ts";
const failures = [];

expect(samplePath, [
  "OwnerReportTestSampleOutput",
  "OWNER_REPORT_TEST_SAMPLE_OUTPUTS",
  "getOwnerReportTestSampleOutput",
  "OWNER TEST MODE - NOT CUSTOMER DELIVERY",
  "Example Public Company",
  "https://example.com",
  "Executive signal",
  "Proof and confidence",
  "Next command",
  "visibleInOwnerTest: true",
  "visibleToCustomer: false",
  "checkoutRequired: false",
  "customerDeliveryApproved: false",
  "billingMutationAllowed: false",
  "entitlementMutationAllowed: false",
  "rawEvidenceReturned: false",
]);

forbidden(samplePath, [
  "checkoutRequired: true",
  "customerDeliveryApproved: true",
  "billingMutationAllowed: true",
  "entitlementMutationAllowed: true",
  "rawEvidenceReturned: true",
  "guaranteed ranking",
  "guaranteed ROI",
  "guaranteed revenue",
]);

if (failures.length) {
  console.error("Owner report test sample output validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Owner report test sample output validation passed.");

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
