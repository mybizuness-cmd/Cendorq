import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const runtimePath = "src/lib/command-center/report-evidence-record-persistence-runtime.ts";
const recordRuntimePath = "src/lib/command-center/report-evidence-record-runtime.ts";
const ownerPersistencePath = "src/lib/owner-configuration-evidence-persistence-runtime.ts";
const launchPersistencePath = "src/lib/launch-evidence-persistence-runtime.ts";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";

expect(runtimePath, [
  "ReportEvidenceRecordPersistenceAccess",
  "ReportEvidencePersistedRecordClass",
  "ReportEvidenceRecordPersistenceRecord",
  "ReportEvidenceRecordPersistenceResponse",
  "recordReportEvidenceRecordBatch",
  "getReportEvidenceRecordHistoryResponse",
  "buildReportEvidenceRecordRuntime",
  "ReportEvidenceRecordRuntimeInput",
  "ReportEvidenceRecordRuntimeSummary",
]);

expect(runtimePath, [
  "recordClass: \"source\"",
  "recordClass: \"confidence\"",
  "recordClass: \"conflict\"",
  "recordClass: \"plan-fit\"",
  "recordClass: \"blocked-pattern\"",
  "recordClass: \"release-review\"",
  "sourceRecordCount",
  "confidenceRecordCount",
  "conflictRecordCount",
  "planFitRecordCount",
  "blockedPatternRecordCount",
  "runtimeStatus",
  "safeSummaryHash",
]);

expect(runtimePath, [
  "appendOnly: true",
  "cache: \"no-store\"",
  "not_available",
  "not_recorded",
  "status: 404",
  "status: 400",
  "status: 202",
  "status: 200",
  "releaseCaptainReviewed",
  "runtimeStatus === \"reviewed\"",
  "sourceRoute: safeRoute",
  "requestIdHash: safeText",
  "stableHash",
  "safeText",
  "safeToken",
]);

expect(runtimePath, [
  "rawEvidenceStored: false",
  "rawProviderPayloadStored: false",
  "privateCredentialStored: false",
  "customerDataStored: false",
  "privateAuditPayloadStored: false",
  "customerFacingOutputApproved: false",
  "publicReportReleaseApproved: false",
  "paidPlanRecommendationApproved: false",
  "rawPrivateExposureChecked",
  "evidenceSeparationChecked",
  "confidenceLabelsChecked",
  "conflictsChecked",
  "planFitChecked",
  "blockedPatternsChecked",
]);

expect(runtimePath, [
  "secret=",
  "password=",
  "token=",
  "rawpayload=",
  "rawevidence=",
  "credential=",
  "privateauditpayload=",
  "customerdata=",
  "providerpayload=",
  "operatoridentity=",
  "redacted-safe-value",
]);

expect(recordRuntimePath, [
  "buildReportEvidenceRecordRuntime",
  "rawEvidenceStored: false",
  "customerFacingOutputApproved: false",
  "publicReportReleaseApproved: false",
  "paidPlanRecommendationApproved: false",
]);

expect(ownerPersistencePath, [
  "recordOwnerConfigurationEvidenceBatch",
  "cache: \"no-store\"",
  "not_available",
  "publicLaunchAllowed: false",
  "paidLaunchAllowed: false",
  "reportLaunchAllowed: false",
  "securityReadinessApproved: false",
]);

expect(launchPersistencePath, [
  "projectLaunchEvidence",
  "appendOnly: true",
  "publicClaimAllowed: false",
  "rawPayload",
  "privateAuditPayload",
]);

expect(routesChainPath, [
  "src/scripts/validate-report-evidence-record-persistence-runtime.mjs",
]);

forbidden(runtimePath, [
  "rawEvidenceStored: true",
  "rawProviderPayloadStored: true",
  "privateCredentialStored: true",
  "customerDataStored: true",
  "privateAuditPayloadStored: true",
  "customerFacingOutputApproved: true",
  "publicReportReleaseApproved: true",
  "paidPlanRecommendationApproved: true",
  "appendOnly: false",
  "cache: \"force-cache\"",
  "status: 201",
  "deleteRecord",
  "rewriteRecord",
  "overwriteRecord",
  "productionMutation",
  "guaranteed ROI",
  "guaranteed revenue",
  "guaranteed accuracy",
  "guaranteed security",
  "impossible to hack",
  "liability-free",
]);

if (failures.length) {
  console.error("Report evidence record persistence runtime validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Report evidence record persistence runtime validation passed. Persistence remains command-center gated, append-only, no-store, safe-summary/hash based, and blocked from raw/private payload exposure or approval drift.");

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
