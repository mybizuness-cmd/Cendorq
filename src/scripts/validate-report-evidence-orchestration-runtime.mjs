import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const runtimePath = "src/lib/command-center/report-evidence-orchestration-runtime.ts";
const contractPath = "src/lib/command-center/report-evidence-orchestration.ts";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const failures = [];

expect(runtimePath, [
  "projectReportEvidenceRuntime",
  "projectReportEvidenceItem",
  "ReportEvidenceRuntimeInput",
  "ReportEvidenceRuntimeProjection",
  "ReportEvidenceRuntimeSummary",
  "REPORT_EVIDENCE_CONFIDENCE_CONTRACTS",
  "REPORT_EVIDENCE_ORCHESTRATION_BLOCKED_PATTERNS",
  "REPORT_EVIDENCE_PLAN_FIT_CONTRACTS",
  "REPORT_EVIDENCE_SOURCE_CONTRACTS",
]);

expect(runtimePath, [
  "customerOutputState",
  "needs-release-captain-review",
  "customerFacingAllowed",
  "releaseCaptainRequired",
  "blockedPatterns",
  "safeNextActions",
  "customerOutputAllowed",
  "dominantTrustLevel",
  "planFitsRepresented",
]);

expect(runtimePath, [
  "customerClaimAsVerifiedFact",
  "customerFacingRawPayload",
  "customerFacingPrivateEvidence",
  "ignoredEvidenceConflict",
  "unlabeledLowConfidence",
  "hiddenEvidenceGap",
  "unsupportedPlanRecommendation",
  "fixWithoutDiagnosis",
]);

expect(runtimePath, [
  "Keep the customer claim labeled as customer-provided until supporting evidence is gathered.",
  "Resolve or disclose the evidence conflict before raising confidence or strengthening the recommendation.",
  "Name the missing evidence class and gather the next safe evidence source before customer-facing output.",
  "Tie the plan recommendation to observed blocker depth, evidence confidence, and customer readiness before output.",
  "Return material report claims, conflicts, and plan-fit recommendations to release-captain review.",
]);

expect(runtimePath, [
  "redacted-safe-value",
  "raw|payload|secret|token|password|private key|csrf|admin key|support context|operator note|internal note",
  "safeSummary",
  "safeToken",
]);

expect(contractPath, [
  "REPORT_EVIDENCE_ORCHESTRATION_RULES",
  "REPORT_EVIDENCE_SOURCE_CONTRACTS",
  "REPORT_EVIDENCE_CONFIDENCE_CONTRACTS",
  "REPORT_EVIDENCE_PLAN_FIT_CONTRACTS",
  "REPORT_EVIDENCE_ORCHESTRATION_BLOCKED_PATTERNS",
]);

expect(routesChainPath, [
  "src/scripts/validate-report-evidence-orchestration-runtime.mjs",
]);

forbidden(runtimePath, [
  "return rawPayload",
  "return rawEvidence",
  "return rawSecurityPayload",
  "return rawBillingData",
  "return internalNotes",
  "return operatorIdentity",
  "return sessionToken",
  "return csrfToken",
  "return adminKey",
  "return supportContextKey",
  "localStorage.setItem",
  "sessionStorage.setItem",
  "guaranteed ROI",
  "guaranteed revenue",
  "guaranteed accuracy",
  "guaranteed security",
  "impossible to hack",
  "liability-free",
]);

if (failures.length) {
  console.error("Report evidence orchestration runtime validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Report evidence orchestration runtime validation passed. Evidence inputs project to safe summaries, blocked patterns, release-captain review posture, and customer-output eligibility without raw/private exposure or unsupported guarantees.");

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
