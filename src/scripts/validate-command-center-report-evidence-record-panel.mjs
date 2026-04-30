import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const panelPath = "src/app/command-center/report-evidence-record-panel.tsx";
const pagePath = "src/app/command-center/page.tsx";
const runtimePath = "src/lib/command-center/report-evidence-record-runtime.ts";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const failures = [];

expect(panelPath, [
  "ReportEvidenceRecordPanel",
  "buildReportEvidenceRecordRuntime",
  "Report Evidence Records",
  "Safe record projection for report source, confidence, conflict, plan-fit, and release review",
  "Private command-center projection only.",
  "without exposing raw evidence, provider payloads, credentials, customer data, internal notes, or operator identity",
  "sampleRecord.sourceRecords",
  "sampleRecord.confidenceRecords",
  "sampleRecord.conflictRecords",
  "sampleRecord.planFitRecords",
  "sampleRecord.blockedPatternRecords",
  "sampleRecord.releaseReviewRecord",
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

expect(routesChainPath, [
  "src/scripts/validate-command-center-report-evidence-record-panel.mjs",
]);

forbidden(panelPath, [
  "rawEvidenceStored: true",
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
  "impossible to hack",
  "liability-free",
]);

if (failures.length) {
  console.error("Command center report evidence record panel validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command center report evidence record panel validation passed.");

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
