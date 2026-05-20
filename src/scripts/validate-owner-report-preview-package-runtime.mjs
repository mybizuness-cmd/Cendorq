import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const runtimePath = "src/lib/owner-report-preview-package-runtime.ts";
const failures = [];

expect(runtimePath, [
  "OwnerReportPreviewPackage",
  "OwnerReportPreviewPackageRuntimeResult",
  "OWNER_REPORT_PREVIEW_PACKAGE_STANDARD",
  "buildOwnerReportPreviewPackages",
  "evaluateReportQualityReleaseGate",
  "OWNER TEST MODE - NOT CUSTOMER DELIVERY",
  "qualityGate",
  "linkedFindings",
  "findingCount",
  "nextCommand",
  "customerDeliveryApproved: false",
  "reportReleaseApproved: false",
  "checkoutRequired: false",
  "billingMutationAllowed: false",
  "entitlementMutationAllowed: false",
  "rawEvidenceReturned: false",
  "privateDataReturned: false",
  "quality-gate-blocked",
  "owner-report-preview-packages-ready",
]);

forbidden(runtimePath, [
  "customerDeliveryApproved: true",
  "reportReleaseApproved: true",
  "checkoutRequired: true",
  "billingMutationAllowed: true",
  "entitlementMutationAllowed: true",
  "rawEvidenceReturned: true",
  "privateDataReturned: true",
  "dangerouslySetInnerHTML",
]);

if (failures.length) {
  console.error("Owner report preview package runtime validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Owner report preview package runtime validation passed.");

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
