import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const renderingPath = "src/lib/protected-free-scan-results-rendering.ts";
const reportRenderingValidatorPath = "src/scripts/validate-report-generation-rendering-contracts.mjs";
const failures = [];

expect(renderingPath, [
  "ProtectedFreeScanResultSectionKey",
  "ProtectedFreeScanResultRenderInput",
  "ProtectedFreeScanResultRenderProjection",
  "projectProtectedFreeScanResultsRendering",
  "getProtectedFreeScanResultsRenderingRules",
  "PROTECTED_FREE_SCAN_RESULTS_RENDERING_RULES",
  "free-scan-result",
  "Free Scan",
  "notFullScan: true",
]);

expect(renderingPath, [
  "verified-facts",
  "observations",
  "assumptions",
  "inferences",
  "limitations",
  "recommendations",
  "next-actions",
  "plan-fit",
  "confidenceLabelRequired: true",
  "limitationsVisible: true",
]);

expect(renderingPath, [
  "customer ownership",
  "email verification",
  "safe release approval",
  "must not deliver a paid Full Scan or Deep Review report",
  "must not be presented as final truth",
  "education-not-pressure",
  "Deep Review",
  "unpaidDeliverableLeaked: false",
]);

expect(renderingPath, [
  "pendingReportPresentedAsFinal: false",
  "rawPayloadRendered: false",
  "rawEvidenceRendered: false",
  "rawSecurityPayloadRendered: false",
  "rawBillingDataRendered: false",
  "internalNotesRendered: false",
  "operatorIdentityRendered: false",
  "riskInternalsRendered: false",
  "promptRendered: false",
  "secretRendered: false",
  "tokenRendered: false",
  "unsupportedOutcomePromise: false",
]);

expect(reportRenderingValidatorPath, [
  "src/lib/protected-free-scan-results-rendering.ts",
  "validate-protected-free-scan-results-rendering.mjs",
  "projectProtectedFreeScanResultsRendering",
]);

forbidden(renderingPath, [
  "notFullScan: false",
  "unpaidDeliverableLeaked: true",
  "pendingReportPresentedAsFinal: true",
  "rawPayloadRendered: true",
  "rawEvidenceRendered: true",
  "rawSecurityPayloadRendered: true",
  "rawBillingDataRendered: true",
  "internalNotesRendered: true",
  "operatorIdentityRendered: true",
  "riskInternalsRendered: true",
  "promptRendered: true",
  "secretRendered: true",
  "tokenRendered: true",
  "unsupportedOutcomePromise: true",
  "guaranteed ROI",
  "guaranteed revenue",
  "guaranteed business results",
  "100% accurate",
  "impossible to hack",
  "never liable",
  "liability-free",
  "localStorage.setItem",
  "sessionStorage.setItem",
]);

if (failures.length) {
  console.error("Protected Free Scan results rendering validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Protected Free Scan results rendering validation passed.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = read(path);
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}

function forbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path).toLowerCase();
  for (const phrase of phrases) if (text.includes(phrase.toLowerCase())) failures.push(`${path} contains forbidden phrase: ${phrase}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
