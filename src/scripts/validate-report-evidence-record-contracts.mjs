import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const contractsPath = "src/lib/command-center/report-evidence-record-contracts.ts";
const orchestrationPath = "src/lib/command-center/report-evidence-orchestration.ts";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const failures = [];

expect(contractsPath, [
  "ReportEvidenceSourceRecordContract",
  "ReportEvidenceConfidenceRecordContract",
  "ReportEvidenceConflictRecordContract",
  "ReportEvidencePlanFitRecordContract",
  "ReportEvidenceBlockedPatternRecordContract",
  "ReportEvidenceReleaseReviewRecordContract",
  "REPORT_EVIDENCE_RECORD_CONTRACTS",
  "REPORT_EVIDENCE_RECORD_REQUIRED_GUARDS",
  "getReportEvidenceRecordContracts",
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

expect(contractsPath, [
  "report-evidence-source",
  "report-evidence-confidence",
  "report-evidence-conflict",
  "report-evidence-plan-fit",
  "report-evidence-blocked-pattern",
  "report-evidence-release-review",
]);

expect(contractsPath, [
  "sourceTier: ReportEvidenceSourceTier",
  "trustLevel: ReportEvidenceTrustLevel",
  "planFit: ReportEvidencePlanFit",
  "rawEvidenceStored: false",
  "rawProviderPayloadStored: false",
  "privateCredentialStored: false",
  "customerDataStored: false",
  "publicOutputAllowed: false",
  "customerFacingLanguageAllowed: false",
  "paidRecommendationApproved: false",
  "customerFacingOutputApproved: false",
  "publicReportReleaseApproved: false",
]);

expect(contractsPath, [
  "confidenceRaisedByReviewOnly",
  "confidenceDowngraded",
  "resolutionPath",
  "unsupportedUpsellBlocked",
  "releaseCaptainReviewRequired: true",
  "evidenceSeparationChecked",
  "confidenceLabelsChecked",
  "conflictsChecked",
  "planFitChecked",
  "blockedPatternsChecked",
  "rawPrivateExposureChecked",
]);

expect(contractsPath, [
  "no raw evidence in report evidence records",
  "no provider payloads in report evidence records",
  "no private credentials in report evidence records",
  "no customer data copied into safe summaries",
  "no customer claim upgraded without support",
  "no conflict hidden from confidence scoring",
  "no plan recommendation without evidence posture",
  "no paid recommendation approval inside evidence records",
  "no customer-facing output approval inside evidence records",
  "release-captain review remains separate from launch approval",
]);

expect(orchestrationPath, [
  "ReportEvidencePlanFit",
  "ReportEvidenceSourceTier",
  "ReportEvidenceTrustLevel",
  "REPORT_EVIDENCE_ORCHESTRATION_BLOCKED_PATTERNS",
]);

expect(routesChainPath, [
  "src/scripts/validate-report-evidence-record-contracts.mjs",
]);

forbidden(contractsPath, [
  "rawEvidenceStored: true",
  "rawProviderPayloadStored: true",
  "privateCredentialStored: true",
  "customerDataStored: true",
  "publicOutputAllowed: true",
  "customerFacingLanguageAllowed: true",
  "paidRecommendationApproved: true",
  "customerFacingOutputApproved: true",
  "publicReportReleaseApproved: true",
  "guaranteed ROI",
  "guaranteed revenue",
  "guaranteed accuracy",
  "guaranteed security",
  "impossible to hack",
  "liability-free",
]);

if (failures.length) {
  console.error("Report evidence record contracts validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Report evidence record contracts validation passed with owner posture coverage. Report evidence records preserve source, confidence, conflict, plan-fit, blocked-pattern, and release-review metadata without raw/private payload exposure or customer-facing approval drift.");

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
