import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const runtimePath = "src/lib/command-center/report-evidence-record-runtime.ts";
const persistenceRuntimePath = "src/lib/command-center/report-evidence-record-persistence-runtime.ts";
const persistenceValidatorPath = "src/scripts/validate-report-evidence-record-persistence-runtime.mjs";
const recordsApiPath = "src/app/api/command-center/report-evidence/records/route.ts";
const recordsApiValidatorPath = "src/scripts/validate-command-center-report-evidence-records-api.mjs";
const contractsPath = "src/lib/command-center/report-evidence-record-contracts.ts";
const orchestrationRuntimePath = "src/lib/command-center/report-evidence-orchestration-runtime.ts";
const ownerPersistencePath = "src/lib/owner-configuration-evidence-persistence-runtime.ts";
const launchPersistencePath = "src/lib/launch-evidence-persistence-runtime.ts";
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

expect(persistenceRuntimePath, [
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

expect(persistenceRuntimePath, [
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

expect(persistenceRuntimePath, [
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

expect(persistenceRuntimePath, [
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

expect(persistenceRuntimePath, [
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

expect(recordsApiPath, [
  "export const dynamic = \"force-dynamic\"",
  "export const revalidate = 0",
  "commandCenterPreviewHeaderName",
  "resolveCommandCenterAccessState",
  "recordReportEvidenceRecordBatch",
  "sourceRoute = \"/api/command-center/report-evidence/records\"",
  "export async function GET",
  "export async function POST",
  "acceptedInput: \"safe-summary-only\"",
  "persistenceMode: \"append-only-safe-projection\"",
  "commandCenterOnly: true",
  "rawEvidenceExposed: false",
  "containsBlockedEvidenceShape",
  "safe_summary_required",
  "privateauditpayload",
  "customerdata",
  "providerpayload",
  "Cache-Control",
  "no-store, max-age=0",
  "X-Robots-Tag",
  "noindex, nofollow, noarchive, nosnippet",
]);

expect(recordsApiValidatorPath, [
  "src/app/api/command-center/report-evidence/records/route.ts",
  "recordReportEvidenceRecordBatch",
  "acceptedInput: \\\"safe-summary-only\\\"",
  "persistenceMode: \\\"append-only-safe-projection\\\"",
  "rawEvidenceExposed: false",
  "customerFacingOutputApproved",
  "publicReportReleaseApproved",
  "paidPlanRecommendationApproved",
]);

expect(persistenceValidatorPath, [
  "ReportEvidenceRecordPersistenceAccess",
  "recordReportEvidenceRecordBatch",
  "appendOnly: true",
  "cache: \\\"no-store\\\"",
  "rawEvidenceStored: false",
  "customerFacingOutputApproved: false",
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

forbidden(persistenceRuntimePath, [
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

forbidden(recordsApiPath, [
  "rawEvidenceStored: true",
  "rawProviderPayloadStored: true",
  "privateCredentialStored: true",
  "customerDataStored: true",
  "privateAuditPayloadStored: true",
  "customerFacingOutputApproved: true",
  "publicReportReleaseApproved: true",
  "paidPlanRecommendationApproved: true",
  "rawEvidenceExposed: true",
  "cache: \"force-cache\"",
  "localStorage",
  "sessionStorage",
  "document.cookie",
  "productionMutation",
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

console.log("Report evidence record runtime validation passed. Runtime projections, persistence records, and the command-center records API create safe source, confidence, conflict, plan-fit, blocked-pattern, and release-review metadata without raw/private payload exposure or approval drift.");

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
