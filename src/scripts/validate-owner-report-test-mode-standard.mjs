import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const standardPath = "src/lib/owner-report-test-mode-standard.ts";
const failures = [];

expect(standardPath, [
  "OwnerReportTestPlanKey",
  "OwnerReportTestModeInput",
  "OwnerReportTestModeProjection",
  "OWNER_REPORT_TEST_MODE_STANDARD",
  "projectOwnerReportTestMode",
  "owner-only-report-test-mode",
  "free-scan",
  "deep-review",
  "build-fix",
  "ongoing-control",
  "checkoutRequired: false",
  "customerEntitlementCreated: false",
  "customerEmailSent: false",
  "customerRecordCreated: false",
  "ownerOnly: true",
  "noCustomerDelivery: true",
  "noBillingMutation: true",
  "noEntitlementMutation: true",
  "noPublicIndexing: true",
  "testWatermarkRequired: true",
  "rawSecretsAllowed: false",
  "privateCredentialsAllowed: false",
  "agent mission summary",
  "chief review posture",
  "release-captain gate posture",
  "blocked claim scan result",
]);

expect(standardPath, [
  "Owner test mode must allow the owner to run Free Scan, Deep Review, Build Fix, and Ongoing Control report previews without checkout.",
  "Owner test mode must never create a paid customer entitlement, send a customer email, mutate billing, or mark delivery complete.",
  "Every test report must be clearly watermarked as owner test mode and excluded from customer delivery metrics.",
  "Every test report must show visual structure, report sections, confidence, evidence classes, limitations, next command, and plan boundary.",
]);

forbidden(standardPath, [
  "checkoutRequired: true",
  "customerEntitlementCreated: true",
  "customerEmailSent: true",
  "customerRecordCreated: true",
  "noBillingMutation: false",
  "noEntitlementMutation: false",
  "rawSecretsAllowed: true",
  "privateCredentialsAllowed: true",
  "guaranteed accuracy",
  "guaranteed ranking",
]);

if (failures.length) {
  console.error("Owner report test mode standard validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Owner report test mode standard validation passed.");

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
