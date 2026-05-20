import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const scorePath = "src/lib/owner-report-test-readiness-score.ts";
const apiPath = "src/app/api/command-center/owner-report-test-mode/route.ts";
const runnerPath = "src/app/command-center/owner-report-test/page.tsx";
const failures = [];

expect(scorePath, [
  "OwnerReportTestReadinessScore",
  "buildOwnerReportTestReadinessScore",
  "acquisition",
  "findings",
  "previewPackages",
  "exportProjection",
  "mutationSafety",
  "customerDeliveryApproved: false",
  "reportReleaseApproved: false",
  "billingMutationAllowed: false",
  "entitlementMutationAllowed: false",
]);

expect(apiPath, [
  "buildOwnerReportTestReadinessScore",
  "readinessScore",
]);

expect(runnerPath, [
  "buildOwnerReportTestReadinessScore",
  "readinessScore",
  "Owner test readiness checks",
  "Readiness",
]);

forbidden(scorePath, [
  "customerDeliveryApproved: true",
  "reportReleaseApproved: true",
  "billingMutationAllowed: true",
  "entitlementMutationAllowed: true",
  "localStorage",
  "sessionStorage",
  "dangerouslySetInnerHTML",
]);

if (failures.length) {
  console.error("Owner report test readiness score validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Owner report test readiness score validation passed.");

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
