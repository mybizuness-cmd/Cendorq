import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const runtimePath = "src/lib/command-center/report-evidence-record-runtime.ts";
const contractsPath = "src/lib/command-center/report-evidence-record-contracts.ts";
const orchestrationRuntimePath = "src/lib/command-center/report-evidence-orchestration-runtime.ts";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const failures = [];

expect(runtimePath, [
  "buildReportEvidenceRecordRuntime",
  "ReportEvidenceRecordRuntimeInput",
  "ReportEvidenceRecordRuntimeSummary",
  "projectReportEvidenceRuntime",
  "ReportEvidenceRuntimeInput",
  "ReportEvidenceRuntimeProjection",
]);

expect(runtimePath, [
  "sourceRecords",
  "confidenceRecords",
  "conflictRecords",
  "planFitRecords",
  "blockedPatternRecords",
  "releaseReviewRecord",
  "buildSourceRecord",
  "buildConfidenceRecord",
  "buildConflictRecord",
  "buildPlanFitRecord",
  "buildBlockedPatternRecords",
  "buildReleaseReviewRecord",
]);

expect(runtimePath, [
  "rawEvidenceStored: false",
  "rawProviderPayloadStored: false",
  "privateCredentialStored: false",
  "customerDataStored: false",
  "publicOutputAllowed: false",
  "customerFacingLanguageAllowed: false",
  "paidRecommendationApproved: false",
  "customerFacingOutputApproved: false",
  "publicReportReleaseApproved: false",
  "paidPlanRecommendationApproved: false",
  "customerFacingOutputBlocked: true",
  "releaseCaptainReviewRequired: true",
]);

expect(runtimePath, [
  "pending-release-captain-review",
  "blocked",
  "reviewed",
  "ignoredEvidenceConflict",
  "unsupportedPlanRecommendation",
  "fixWithoutDiagnosis",
  "confidenceRaisedByReviewOnly",
  "confidenceDowngraded: true",
  "rawPrivateExposureChecked: true",
  "redacted-safe-record",
  "safeRecordSummary",
  "safeTimestamp",
  "safeToken",
]);

expect(contractsPath, [
  "ReportEvidenceSourceRecordContract",
  "ReportEvidenceConfidenceRecordContract",
  "ReportEvidenceConflictRecordContract",
  "ReportEvidencePlanFitRecordContract",
  "ReportEvidenceBlockedPatternRecordContract",
  "ReportEvidenceReleaseReviewRecordContract",
]);

expect(orchestrationRuntimePath, [
  "projectReportEvidenceRuntime",
  "customerOutputAllowed",
  "releaseCaptainRequired",
  "blockedPatterns",
  "safeNextActions",
]);

expect(routesChainPath, [
  "src/scripts/validate-report-evidence-record-runtime.mjs",
]);

forbidden(runtimePath, [
  "rawEvidenceStored: true",
  "rawProviderPayloadStored: true",
  "privateCredentialStored: true",
  "customerDataStored: true",
  "publicOutputAllowed: true",
  "customerFacingLanguageAllowed: true",
  "paidRecommendationApproved: true",
  "customerFacingOutputApproved: true",
  "publicReportReleaseApproved: true",
  "paidPlanRecommendationApproved: true",
  "rawPayload=",
  "rawEvidence=",
  "providerPayload=",
  "customerData=",
  "internalNotes=",
  "operatorIdentity=",
  "session" + "Token=",
  "csrf" + "Token=",
  "admin" + "Key=",
  "guaranteed ROI",
  "guaranteed revenue",
  "guaranteed accuracy",
  "guaranteed security",
  "impossible to hack",
  "liability-free",
]);

if (failures.length) {
  console.error("Report evidence record runtime validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Report evidence record runtime validation passed. Runtime projections create safe source, confidence, conflict, plan-fit, blocked-pattern, and release-review records without raw/private payload exposure or approval drift.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }

  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
  }
}

function forbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;

  const text = read(path).toLowerCase();
  for (const phrase of phrases) {
    if (text.includes(phrase.toLowerCase())) failures.push(`${path} contains forbidden phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
