import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const routePath = "src/app/api/command-center/owner-report-test-mode/route.ts";
const failures = [];

expect(routePath, [
  "commandCenterPreviewHeaderName",
  "resolveCommandCenterAccessState",
  "validateOwnerPublicCompanyUrl",
  "buildOwnerPublicPageAcquisitionProjection",
  "buildOwnerReportFindingEngineProjection",
  "buildOwnerReportPreviewPackages",
  "buildOwnerReportTestBatchManifest",
  "buildOwnerReportTestExecutionReceipt",
  "buildOwnerReportTestFixtureBatchRunner",
  "getOwnerReportTestFixtureCommands",
  "buildOwnerReportTestReadinessScore",
  "buildOwnerReportTestResultExportProjection",
  "projectOwnerReportTestMode",
  "getOwnerReportTestPreviewBlueprint",
  "getOwnerReportTestSampleOutput",
  "buildOwnerReportTestRunnerState",
  "recordOwnerReportTestRun",
  "export async function GET",
  "export async function POST",
  "/api/command-center/owner-report-test-mode",
  "checkoutRequired: false",
  "customerDeliveryAllowed: false",
  "fixtureBatch",
  "batchManifest",
  "fixtureCommands",
  "sampleOutputs",
  "previewBlueprints",
  "previewPackages",
  "exportProjection",
  "readinessScore",
  "executionReceipt",
  "runner",
  "urlSafety",
  "acquisition",
  "findings",
  "persistence",
  "safeRequestIdHash",
  "previewOnly: true",
  "checkoutBypassedForOwnerTestOnly: true",
  "customerDeliveryApproved: false",
  "reportReleaseApproved: false",
  "billingMutationAllowed: false",
  "entitlementMutationAllowed: false",
  "public-company-url-only",
  "X-Robots-Tag",
  "noindex, nofollow, noarchive, nosnippet",
  "Referrer-Policy",
  "same-origin",
  "nosniff",
]);

forbidden(routePath, [
  "customerDeliveryApproved: true",
  "reportReleaseApproved: true",
  "billingMutationAllowed: true",
  "entitlementMutationAllowed: true",
  "customerEmailSent: true",
  "customerEntitlementCreated: true",
  "rawSecretsAllowed: true",
  "privateCredentialsAllowed: true",
  "localStorage",
  "sessionStorage",
]);

if (failures.length) {
  console.error("Owner report test mode API validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Owner report test mode API validation passed with fixture discovery, batch manifest, execution receipt, readiness score, export projection, public URL safety, acquisition, findings, preview packages, runner state, and sample outputs.");

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
