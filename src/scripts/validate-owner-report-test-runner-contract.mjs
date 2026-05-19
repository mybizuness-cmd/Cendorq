import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const contractPath = "src/lib/owner-report-test-runner-contract.ts";
const failures = [];

expect(contractPath, [
  "OwnerReportTestRunnerState",
  "OWNER_REPORT_TEST_RUNNER_CONTRACT",
  "buildOwnerReportTestRunnerState",
  "owner-report-test-runner",
  "without checkout, billing mutation, entitlement creation, customer delivery, or customer email",
  "acceptedInputs",
  "companyName",
  "companyUrl",
  "requestedPlans",
  "defaultPlans",
  "free-scan",
  "deep-review",
  "build-fix",
  "ongoing-control",
  "blockedInputs",
  "password",
  "private key",
  "session token",
  "raw provider payload",
  "non-public customer data",
  "requiredOutputs",
  "previewBlueprints",
  "sampleOutputs",
  "operatorTrace",
  "chiefReview",
  "releaseCaptainGate",
  "visualReportStructure",
  "watermark",
  "checkoutRequired: false",
  "customerDeliveryAllowed: false",
  "billingMutationAllowed: false",
  "entitlementMutationAllowed: false",
  "customerEmailAllowed: false",
  "reportReleaseAllowed: false",
  "ownerAccessRequired: true",
  "noindexRequired: true",
]);

forbidden(contractPath, [
  "checkoutRequired: true",
  "customerDeliveryAllowed: true",
  "billingMutationAllowed: true",
  "entitlementMutationAllowed: true",
  "customerEmailAllowed: true",
  "reportReleaseAllowed: true",
  "guaranteed accuracy",
  "guaranteed ranking",
  "guaranteed revenue",
]);

if (failures.length) {
  console.error("Owner report test runner contract validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Owner report test runner contract validation passed.");

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
