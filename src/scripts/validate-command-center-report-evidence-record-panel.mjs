import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const panelPath = "src/app/command-center/report-evidence-record-panel.tsx";
const pagePath = "src/app/command-center/page.tsx";
const runtimePath = "src/lib/command-center/report-evidence-record-runtime.ts";
const persistenceRuntimePath = "src/lib/command-center/report-evidence-record-persistence-runtime.ts";
const recordsApiPath = "src/app/api/command-center/report-evidence/records/route.ts";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const failures = [];

expect(panelPath, [
  "ReportEvidenceRecordPanel",
  "buildReportEvidenceRecordRuntime",
  "recordReportEvidenceRecordBatch",
  "Report Evidence Records",
  "Safe record projection, persistence, and API posture for report evidence",
  "Private command-center projection only.",
  "append-only persistence",
  "without exposing raw evidence, provider payloads, credentials, customer data, internal notes, private audit payloads, or operator identity",
  "sampleRecord.sourceRecords",
  "sampleRecord.confidenceRecords",
  "sampleRecord.conflictRecords",
  "sampleRecord.planFitRecords",
  "sampleRecord.blockedPatternRecords",
  "sampleRecord.releaseReviewRecord",
  "samplePersistence.records",
  "persistenceRecords",
  "releaseReviewRecord",
]);

expect(panelPath, [
  "customer-claim-check",
  "owned-surface-observation",
  "conflict-resolution-path",
  "customer-context",
  "owned-business-surface",
  "safe-public-signal",
  "limited",
  "strong",
  "conflicted",
  "reviewed by: ${sampleRecord.releaseReviewRecord.reviewedByRole}",
  "customer output approved: ${String(sampleRecord.releaseReviewRecord.customerFacingOutputApproved)}",
  "public report release approved: ${String(sampleRecord.releaseReviewRecord.publicReportReleaseApproved)}",
  "paid plan recommendation approved: ${String(sampleRecord.releaseReviewRecord.paidPlanRecommendationApproved)}",
]);

expect(panelPath, [
  "/api/command-center/report-evidence/records",
  "commandCenterAllowed: true",
  "sourceRoute: \"/api/command-center/report-evidence/records\"",
  "requestIdHash: \"report-evidence-record-panel-sample\"",
  "append-only-safe-projection",
  "Records API",
  "Persistence mode",
  "Approval boundary",
  "review is not release",
  "customer-facing output, paid recommendation, public report release, launch, or security approval",
  "Persistence records",
  "Persistence denials",
  "Release review persistence",
  "safeSummaryHash",
]);

expect(pagePath, [
  "ReportEvidenceRecordPanel",
  "./report-evidence-record-panel",
  "<ReportEvidenceOrchestrationPanel />",
  "<ReportEvidenceRecordPanel />",
  "<AiManagerVersionRegistryPanel />",
  "ClosedCommandCenterPanel",
  "resolveCommandCenterAccessState",
]);

expect(runtimePath, [
  "buildReportEvidenceRecordRuntime",
  "rawEvidenceStored: false",
  "customerFacingOutputApproved: false",
  "publicReportReleaseApproved: false",
  "paidPlanRecommendationApproved: false",
]);

expect(persistenceRuntimePath, [
  "recordReportEvidenceRecordBatch",
  "appendOnly: true",
  "cache: \"no-store\"",
  "rawEvidenceStored: false",
  "rawProviderPayloadStored: false",
  "privateAuditPayloadStored: false",
  "customerFacingOutputApproved: false",
  "publicReportReleaseApproved: false",
  "paidPlanRecommendationApproved: false",
]);

expect(recordsApiPath, [
  "sourceRoute = \"/api/command-center/report-evidence/records\"",
  "acceptedInput: \"safe-summary-only\"",
  "persistenceMode: \"append-only-safe-projection\"",
  "rawEvidenceExposed: false",
  "Cache-Control",
  "no-store, max-age=0",
]);

expect(routesChainPath, [
  "src/scripts/validate-command-center-report-evidence-record-panel.mjs",
]);

forbidden(panelPath, [
  "rawEvidenceStored: true",
  "rawProviderPayloadStored: true",
  "privateAuditPayloadStored: true",
  "customerFacingOutputApproved: true",
  "publicReportReleaseApproved: true",
  "paidPlanRecommendationApproved: true",
  "rawPayload=",
  "rawEvidence=",
  "providerPayload=",
  "customerData=",
  "internalNotes=",
  "operatorIdentity=",
  "sessionToken=",
  "csrfToken=",
  "adminKey=",
  "guaranteed ROI",
  "guaranteed revenue",
  "guaranteed accuracy",
  "guaranteed security",
  "impossible to hack",
  "liability-free",
]);

if (failures.length) {
  console.error("Command center report evidence record panel validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command center report evidence record panel validation passed. Panel now shows runtime, persistence, and records API posture without exposing raw/private payloads or approval drift.");

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
