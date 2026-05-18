import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const previewPath = "src/lib/owner-report-test-preview-rendering.ts";
const failures = [];

expect(previewPath, [
  "OwnerReportPreviewSectionKey",
  "OwnerReportPreviewBlueprint",
  "OWNER_REPORT_TEST_PREVIEW_BLUEPRINTS",
  "OWNER_REPORT_TEST_PREVIEW_STANDARD",
  "getOwnerReportTestPreviewBlueprint",
  "OWNER TEST MODE - NOT CUSTOMER DELIVERY",
  "free-scan",
  "deep-review",
  "build-fix",
  "ongoing-control",
  "visual-system",
  "operator-trace",
  "chief-review",
  "release-captain-gate",
  "agent mission summary",
  "chief review posture",
  "release-captain gate posture",
  "Every owner test preview must show visual hierarchy, evidence class, confidence, limitations, next command, and plan boundary.",
]);

forbidden(previewPath, [
  "customer delivery email",
  "customerEmailSent: true",
  "checkoutRequired: true",
  "customerEntitlementCreated: true",
  "guaranteed ranking",
  "guaranteed ROI",
  "raw secrets",
]);

if (failures.length) {
  console.error("Owner report test preview rendering validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Owner report test preview rendering validation passed.");

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
