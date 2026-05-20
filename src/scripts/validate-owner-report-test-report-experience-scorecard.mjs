import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const scorecardPath = "src/lib/owner-report-test-report-experience-scorecard.ts";
const apiPath = "src/app/api/command-center/owner-report-test-mode/route.ts";
const panelPath = "src/app/command-center/owner-report-test-mode-panel.tsx";
const failures = [];

expect(scorecardPath, [
  "OwnerReportTestExperienceDimension",
  "OwnerReportTestReportExperienceScorecard",
  "OwnerReportTestReportExperienceScorecardResult",
  "OWNER_REPORT_TEST_REPORT_EXPERIENCE_SCORECARD_STANDARD",
  "buildOwnerReportTestReportExperienceScorecards",
  "visualStructure",
  "evidenceTrace",
  "actionClarity",
  "chiefCaptainReview",
  "safetyBoundary",
  "category-dominating-ready",
  "overallScore: 100",
  "previewWatermarked: true",
  "ownerOnly: true",
  "customerDeliveryApproved: false",
  "reportReleaseApproved: false",
  "checkoutRequired: false",
  "billingMutationAllowed: false",
  "entitlementMutationAllowed: false",
]);

expect(apiPath, [
  "buildOwnerReportTestReportExperienceScorecards",
  "reportExperienceScorecards",
]);

expect(panelPath, [
  "buildOwnerReportTestReportExperienceScorecards",
  "reportExperienceScorecards",
  "Report experience scorecards",
  "Experience",
]);

forbidden(scorecardPath, [
  "ownerOnly: false",
  "customerDeliveryApproved: true",
  "reportReleaseApproved: true",
  "checkoutRequired: true",
  "billingMutationAllowed: true",
  "entitlementMutationAllowed: true",
]);

if (failures.length) {
  console.error("Owner report test report experience scorecard validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Owner report test report experience scorecard validation passed.");

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
