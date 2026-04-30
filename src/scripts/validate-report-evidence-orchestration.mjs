import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const contractPath = "src/lib/command-center/report-evidence-orchestration.ts";
const ownerManualPath = "docs/owner-operating-manual.md";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const failures = [];

expect(contractPath, [
  "REPORT_EVIDENCE_ORCHESTRATION_RULES",
  "REPORT_EVIDENCE_SOURCE_CONTRACTS",
  "REPORT_EVIDENCE_CONFIDENCE_CONTRACTS",
  "REPORT_EVIDENCE_PLAN_FIT_CONTRACTS",
  "REPORT_EVIDENCE_ORCHESTRATION_BLOCKED_PATTERNS",
  "getReportEvidenceOrchestrationPolicy",
]);

expect(contractPath, [
  "evidence-before-report-output",
  "conflict-before-confidence",
  "plan-fit-before-upgrade",
  "release-captain-before-final-report",
  "Customer-facing report claims must be grounded",
  "Contradictory evidence must be surfaced as an evidence conflict",
  "Plan recommendations must be tied to observed blocker depth",
  "Final customer-facing report output must remain subject to release-captain review posture",
]);

expect(contractPath, [
  "customer-context",
  "owned-business-surface",
  "safe-public-signal",
  "technical-observation",
  "calculated-analysis",
  "operator-review",
  "release-captain-review",
  "allowedUses",
  "cannotProve",
  "requiredHandling",
]);

expect(contractPath, [
  "verified",
  "strong",
  "moderate",
  "limited",
  "missing",
  "conflicted",
  "allowedReportLanguage",
  "requiredEvidencePosture",
  "blockedReportLanguage",
  "State as verified only when the claim is directly supported",
  "State as strongly supported when multiple signals point to the same conclusion",
  "State as likely or directional",
  "State as limited or preliminary",
  "State that evidence is missing",
  "State that evidence conflicts",
]);

expect(contractPath, [
  "free-scan",
  "deep-review",
  "build-fix",
  "ongoing-control",
  "minimumEvidencePosture",
  "allowedRecommendation",
  "blockedRecommendation",
  "Recommend Free Scan as a first direction",
  "Recommend Deep Review when root cause",
  "Recommend Build Fix when evidence supports specific blockers",
  "Recommend Ongoing Control when the business needs monitoring",
]);

expect(contractPath, [
  "customerClaimAsVerifiedFact",
  "singleSourceAsCompleteProof",
  "hiddenEvidenceGap",
  "ignoredEvidenceConflict",
  "unlabeledLowConfidence",
  "unsupportedPlanRecommendation",
  "fixWithoutDiagnosis",
  "customerFacingRawPayload",
  "customerFacingPrivateEvidence",
  "customerFacingOperatorNote",
  "guaranteedOutcomeClaim",
  "guaranteedRevenueClaim",
  "guaranteedRoiClaim",
  "absoluteSecurityClaim",
  "liabilityFreeClaim",
]);

expect(ownerManualPath, [
  "Report accuracy operating model",
  "Strongest practical report workflow",
  "Evidence conflict pass",
  "Report truth pass",
  "Plan-fit pass",
  "Conversion pass",
  "Release-captain pass",
]);

expect(routesChainPath, [
  "src/scripts/validate-report-evidence-orchestration.mjs",
]);

forbidden(contractPath, [
  "guaranteed accuracy",
  "guaranteed revenue",
  "guaranteed ROI",
  "guaranteed rankings",
  "guaranteed security",
  "impossible to hack",
  "liability-free",
  "100% certainty",
  "perfect accuracy",
  "raw payloads may be exposed",
  "private evidence may be exposed",
  "operator notes may be customer-facing",
  "customer claim becomes verified fact",
  "ignore evidence conflict",
  "skip release captain",
]);

if (failures.length) {
  console.error("Report evidence orchestration validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Report evidence orchestration validation passed. Evidence source handling, trust levels, conflicts, plan fit, release-captain review, and blocked report patterns remain enforced.");

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
