import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const routePath = "src/app/api/command-center/report-evidence/records/route.ts";
const runtimePath = "src/lib/command-center/report-evidence-record-persistence-runtime.ts";
const wiredRuntimeValidatorPath = "src/scripts/validate-report-evidence-record-runtime.mjs";
const orchestrationApiPath = "src/app/api/command-center/report-evidence/orchestration/route.ts";
const workflowApiPath = "src/app/api/command-center/owner-configuration/workflow/route.ts";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";

expect(routePath, [
  "export const dynamic = \"force-dynamic\"",
  "export const revalidate = 0",
  "commandCenterPreviewHeaderName",
  "resolveCommandCenterAccessState",
  "hasCommandCenterAccess",
  "deniedResponse",
  "status: 404",
  "not_available",
  "safeHeaders",
  "Cache-Control",
  "no-store, max-age=0",
  "X-Robots-Tag",
  "noindex, nofollow, noarchive, nosnippet",
]);

expect(ownerMaximumProtectionPath, [
  "# Owner Maximum Protection Posture",
  "Protected customer and report surfaces require the correct verified access path.",
  "Operator surfaces remain private, metadata-first, and review-gated.",
]);

expect(ownerMaximumProtectionValidatorPath, [
  "Owner maximum protection posture validation passed",
  "docs/owner-maximum-protection-posture.md",
  "validate:routes",
]);

expect(routePath, [
  "recordReportEvidenceRecordBatch",
  "ReportEvidenceRuntimeInput",
  "sourceRoute = \"/api/command-center/report-evidence/records\"",
  "export async function GET",
  "export async function POST",
  "acceptedInput: \"safe-summary-only\"",
  "persistenceMode: \"append-only-safe-projection\"",
  "commandCenterOnly: true",
  "rawEvidenceExposed: false",
]);

expect(routePath, [
  "containsBlockedEvidenceShape",
  "containsUnsafeFragment",
  "safe_summary_required",
  "privateauditpayload",
  "providerpayload",
  "customerdata",
  "operatoridentity",
  "rawpayload",
  "rawevidence",
  "credential",
  "REPORT_EVIDENCE_ORCHESTRATION_BLOCKED_PATTERNS",
]);

expect(routePath, [
  "customerFacingOutputApproved",
  "publicReportReleaseApproved",
  "paidPlanRecommendationApproved",
  "releaseCaptainReviewed",
  "reviewedByRole: \"release-captain\"",
  "retentionClass: \"audit-defense\"",
  "requestIdHash",
  "recordedByRole",
]);

expect(runtimePath, [
  "recordReportEvidenceRecordBatch",
  "getReportEvidenceRecordHistoryResponse",
  "appendOnly: true",
  "rawEvidenceStored: false",
  "privateAuditPayloadStored: false",
  "customerFacingOutputApproved: false",
  "publicReportReleaseApproved: false",
  "paidPlanRecommendationApproved: false",
]);

expect(orchestrationApiPath, [
  "/api/command-center/report-evidence/orchestration",
  "projectReportEvidenceRuntime",
  "safe-summary-only",
  "rawEvidenceExposed: false",
]);

expect(workflowApiPath, [
  "recordOwnerConfigurationEvidenceBatch",
  "projectOwnerConfigurationEvidenceApprovalWorkflow",
  "publicLaunchAllowed: false",
  "paidLaunchAllowed: false",
  "reportLaunchAllowed: false",
  "securityReadinessApproved: false",
]);

expect(wiredRuntimeValidatorPath, [
  "src/app/api/command-center/report-evidence/records/route.ts",
  "src/scripts/validate-command-center-report-evidence-records-api.mjs",
  "owner posture coverage",
]);

forbidden(routePath, [
  "rawEvidenceStored: true",
  "rawProviderPayloadStored: true",
  "privateCredentialStored: true",
  "customerDataStored: true",
  "privateAuditPayloadStored: true",
  "customerFacingOutputApproved: true",
  "publicReportReleaseApproved: true",
  "paidPlanRecommendationApproved: true",
  "rawEvidenceExposed: true",
  "publicLaunchAllowed: true",
  "paidLaunchAllowed: true",
  "reportLaunchAllowed: true",
  "securityReadinessApproved: true",
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
  console.error("Command Center report evidence records API validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command Center report evidence records API validation passed with owner posture coverage. Route stays command-center gated, safe-summary-only, no-store/noindex, persistence-runtime backed, raw/private rejecting, and blocked from customer-facing output or launch approval drift.");

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
