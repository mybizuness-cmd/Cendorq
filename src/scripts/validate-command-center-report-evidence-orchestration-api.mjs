import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const routePath = "src/app/api/command-center/report-evidence/orchestration/route.ts";
const runtimePath = "src/lib/command-center/report-evidence-orchestration-runtime.ts";
const contractPath = "src/lib/command-center/report-evidence-orchestration.ts";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const failures = [];

expect(routePath, [
  "commandCenterPreviewHeaderName",
  "resolveCommandCenterAccessState",
  "hasCommandCenterAccess",
  "deniedResponse",
  "not_available",
  "safeHeaders",
  "Cache-Control",
  "no-store, max-age=0",
  "X-Robots-Tag",
  "noindex, nofollow, noarchive, nosnippet",
]);

expect(routePath, [
  "projectReportEvidenceRuntime",
  "ReportEvidenceRuntimeInput",
  "GET",
  "POST",
  "readJson",
  "parseEvidenceInputs",
  "safeSourceTier",
  "safeTrustLevel",
  "safePlanFit",
  "containsBlockedEvidenceShape",
  "containsUnsafeFragment",
  "safe_summary_required",
]);

expect(routePath, [
  "safe-summary-only",
  "safe-projection-only",
  "customerFacingOutputApproved: false",
  "publicReportReleaseApproved: false",
  "paidPlanRecommendationApproved: false",
  "rawEvidenceExposed: false",
  "commandCenterOnly: true",
]);

expect(routePath, [
  "customer-context",
  "owned-business-surface",
  "safe-public-signal",
  "technical-observation",
  "calculated-analysis",
  "operator-review",
  "release-captain-review",
  "verified",
  "strong",
  "moderate",
  "limited",
  "missing",
  "conflicted",
  "free-scan",
  "deep-review",
  "build-fix",
  "ongoing-control",
]);

expect(routePath, [
  "rawpayload",
  "rawevidence",
  "rawsecuritypayload",
  "rawbillingdata",
  "privatepayload",
  "privateevidence",
  "providerpayload",
  "customerdata",
  "internalnotes",
  "operatoridentity",
  "riskscoringinternals",
  "attackerdetails",
  "sessiontoken",
  "csrftoken",
  "adminkey",
  "supportcontextkey",
  "secret",
  "password",
  "credential",
  "guaranteed roi",
  "guaranteed revenue",
  "guaranteed accuracy",
  "guaranteed security",
  "impossible to hack",
  "liability-free",
  "REPORT_EVIDENCE_ORCHESTRATION_BLOCKED_PATTERNS",
]);

expect(runtimePath, [
  "projectReportEvidenceRuntime",
  "customerOutputAllowed",
  "releaseCaptainRequired",
  "blockedPatterns",
  "safeNextActions",
]);

expect(contractPath, [
  "REPORT_EVIDENCE_ORCHESTRATION_BLOCKED_PATTERNS",
  "REPORT_EVIDENCE_SOURCE_CONTRACTS",
  "REPORT_EVIDENCE_CONFIDENCE_CONTRACTS",
  "REPORT_EVIDENCE_PLAN_FIT_CONTRACTS",
]);

expect(routesChainPath, [
  "src/scripts/validate-command-center-report-evidence-orchestration-api.mjs",
]);

forbidden(routePath, [
  "export const revalidate = 60",
  "publicReportReleaseApproved: true",
  "paidPlanRecommendationApproved: true",
  "customerFacingOutputApproved: true",
  "rawEvidenceExposed: true",
  "localStorage",
  "sessionStorage",
  "document.cookie",
  "window.",
  "process.env.",
  "rawPayload=",
  "rawEvidence=",
  "rawSecurityPayload=",
  "rawBillingData=",
  "internalNotes=",
  "operatorIdentity=",
  "session" + "Token=",
  "csrf" + "Token=",
  "admin" + "Key=",
  "support" + "Context" + "Key=",
]);

if (failures.length) {
  console.error("Command Center report evidence orchestration API validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command Center report evidence orchestration API validation passed. The API remains command-center gated, no-store, safe-summary-only, raw/private rejecting, runtime-backed, and unable to approve customer-facing report output.");

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
