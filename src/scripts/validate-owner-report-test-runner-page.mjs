import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const pagePath = "src/app/command-center/owner-report-test/page.tsx";
const failures = [];

expect(pagePath, [
  "Owner report test mode | Cendorq",
  "resolveCommandCenterAccessState",
  "ClosedCommandCenterPanel",
  "validateOwnerPublicCompanyUrl",
  "buildOwnerReportTestRunnerState",
  "projectOwnerReportTestMode",
  "getOwnerReportTestPreviewBlueprint",
  "getOwnerReportTestSampleOutput",
  "Owner-only report test runner",
  "Preview every Cendorq report without checkout.",
  "Run public-company test inputs across Free Scan, Deep Review, Build Fix, and Ongoing Control.",
  "Public URL safety blocked that input",
  "Public URL safety",
  "Run preview",
  "Agent / chief / captain trace",
  "checkoutRequired",
  "noCustomerDelivery",
  "noBillingMutation",
  "urlSafety.ok",
  "testWatermarkRequired",
  "noimageindex",
  "force-dynamic",
]);

forbidden(pagePath, [
  "customerDeliveryApproved: true",
  "reportReleaseApproved: true",
  "billingMutationAllowed: true",
  "entitlementMutationAllowed: true",
  "customerEmailSent: true",
  "customerEntitlementCreated: true",
  "guaranteed ranking",
  "guaranteed ROI",
  "guaranteed revenue",
  "localStorage",
  "sessionStorage",
  "dangerouslySetInnerHTML",
]);

if (failures.length) {
  console.error("Owner report test runner page validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Owner report test runner page validation passed with public URL safety.");

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
