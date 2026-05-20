import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const runtimePath = "src/lib/owner-report-test-run-persistence-runtime.ts";
const failures = [];

expect(runtimePath, [
  "OwnerReportTestRunPersistenceAccess",
  "OwnerReportTestRunRecord",
  "OwnerReportTestRunPersistenceResponse",
  "recordOwnerReportTestRun",
  "getOwnerReportTestRunHistoryResponse",
  "owner-only-report-test-mode",
  "appendOnly: true",
  "cache: \"no-store\"",
  "not_available",
  "not_recorded",
  "status: 404",
  "status: 400",
  "status: 202",
  "status: 200",
  "companyHash",
  "urlHash",
  "previewBlueprintsRequired",
  "sampleOutputsRequired",
  "agentTraceRequired",
  "chiefReviewRequired",
  "releaseCaptainGateRequired",
  "visualReportStructureRequired",
  "checkoutRequired: false",
  "customerDeliveryApproved: false",
  "reportReleaseApproved: false",
  "billingMutationAllowed: false",
  "entitlementMutationAllowed: false",
  "customerEmailSent: false",
  "rawCompanyInputStored: false",
  "rawPublicPageStored: false",
  "rawEvidenceStored: false",
  "rawSecretsStored: false",
  "privateCredentialStored: false",
  "redacted-safe-value",
]);

forbidden(runtimePath, [
  "appendOnly: false",
  "cache: \"force-cache\"",
  "checkoutRequired: true",
  "customerDeliveryApproved: true",
  "reportReleaseApproved: true",
  "billingMutationAllowed: true",
  "entitlementMutationAllowed: true",
  "customerEmailSent: true",
  "rawCompanyInputStored: true",
  "rawPublicPageStored: true",
  "rawEvidenceStored: true",
  "rawSecretsStored: true",
  "privateCredentialStored: true",
  "deleteRecord",
  "rewriteRecord",
  "overwriteRecord",
  "guaranteed accuracy",
  "guaranteed ranking",
  "guaranteed ROI",
  "guaranteed revenue",
]);

if (failures.length) {
  console.error("Owner report test run persistence runtime validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Owner report test run persistence runtime validation passed.");

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
