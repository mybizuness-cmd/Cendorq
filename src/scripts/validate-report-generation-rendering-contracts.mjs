import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const contractPath = "src/lib/report-generation-rendering-contracts.ts";
const protectedFreeScanRenderingPath = "src/lib/protected-free-scan-results-rendering.ts";
const protectedFreeScanRenderingValidatorPath = "src/scripts/validate-protected-free-scan-results-rendering.mjs";
const packagePath = "package.json";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-report-generation-rendering-contracts.mjs";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const failures = [];

expect(contractPath, [
  "REPORT_GENERATION_RENDERING_CONTRACT",
  "REPORT_GENERATION_RENDERING_BLOCKED_PATTERNS",
  "Report Generation and Branded Rendering Contract",
  "safe HTML/PDF outputs",
  "free-scan-result",
  "deep-review-report",
  "build-fix-summary",
  "ongoing-control-monthly-report",
  "correction-review-addendum",
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

expect(contractPath, [
  "executive summary",
  "verified facts",
  "assumptions",
  "inferences",
  "confidence labels",
  "limitations",
  "recommendations",
  "next actions",
  "support and correction path",
  "liability and protection footer",
]);

expect(contractPath, [
  "Verified facts must be separated from assumptions, inferences, recommendations, and limitations.",
  "Pending, draft, incomplete, or unapproved reports must never be presented as final customer truth.",
  "Confidence labels must be visible",
  "avoid outcome guarantees covering ROI, revenue, security outcomes, legal outcomes, or business results",
]);

expect(contractPath, [
  "HTML and PDF reports must carry Cendorq branding",
  "Customer business logo may be rendered only when provided by the customer, approved for report use, safely stored, and passed through a safe asset projection.",
  "fall back to a Cendorq-branded neutral placeholder",
  "PDF and HTML outputs must use the same approved report content source",
]);

expect(contractPath, [
  "report generation source is customer-owned",
  "safe report projection exists",
  "truth separation checks pass",
  "blocked claim scan passes",
  "raw/internal leakage scan passes",
  "correction and support path is visible",
  "report version and audit event are recorded",
]);

expect(contractPath, [
  "rawPayload",
  "rawEvidence",
  "rawSecurityPayload",
  "rawBillingData",
  "internalNotes",
  "operatorIdentity",
  "riskScoringInternals",
  "attackerDetails",
  "promptMessages",
  "secrets",
  "sessionTokens",
  "csrfTokens",
  "adminKeys",
  "supportContextKeys",
  "crossCustomerData",
]);

expect(contractPath, [
  "Footer must be calm and trust-preserving, not fear-based.",
  "analysis is based on available provided and observed information at generation time",
  "preserve auditability and correction path",
  "must not claim Cendorq is breach-proof, risk-free, free from all responsibility, or certain to produce results",
]);

expect(contractPath, [
  "pendingReportPresentedAsFinal",
  "draftReportReleased",
  "rawPayloadRendered",
  "rawEvidenceRendered",
  "internalNotesRendered",
  "guaranteedRoiReportClaim",
  "guaranteedRevenueReportClaim",
  "liabilityFreeReportClaim",
  "auditDeletionClaim",
  "pdfHtmlVersionDrift",
  "unapprovedBusinessLogoRendered",
]);

expect(protectedFreeScanRenderingPath, [
  "projectProtectedFreeScanResultsRendering",
  "getProtectedFreeScanResultsRenderingRules",
  "free-scan-result",
  "notFullScan: true",
  "confidenceLabelRequired: true",
  "limitationsVisible: true",
  "nextRecommendedPlan: \"Deep Review\"",
  "conversionStyle: \"education-not-pressure\"",
  "pendingReportPresentedAsFinal: false",
  "unpaidDeliverableLeaked: false",
]);

expect(protectedFreeScanRenderingValidatorPath, [
  "Protected Free Scan results rendering validation passed.",
  "src/lib/protected-free-scan-results-rendering.ts",
  "projectProtectedFreeScanResultsRendering",
]);

expect(packagePath, [
  "validate:routes",
  "node ./src/scripts/validate-routes-chain.mjs",
]);

expect(routesChainPath, [
  validatorPath,
  ownerMaximumProtectionValidatorPath,
]);

forbidden(contractPath, unsafePhrases());
forbidden(protectedFreeScanRenderingPath, unsafePhrases());

if (failures.length) {
  console.error("Report generation rendering contracts validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Report generation rendering contracts validation passed with protected Free Scan results rendering and owner posture coverage.");

function unsafePhrases() {
  return [
    "pending reports are final",
    "release draft report",
    "render raw" + "Payload",
    "render raw" + "Evidence",
    "render internal" + "Notes",
    "unapproved logo is allowed",
    "PDF can differ from HTML",
    "guaranteed " + "ROI",
    "guaranteed " + "revenue",
    "guaranteed business " + "results",
    "impossible to " + "hack",
    "never " + "liable",
    "liability" + "-free",
    "delete audit records",
    "session" + "Token=",
    "csrf" + "Token=",
    "admin" + "Key=",
    "support" + "Context" + "Key=",
    "notFullScan: false",
    "unpaidDeliverableLeaked: true",
    "pendingReportPresentedAsFinal: true",
    "rawPayloadRendered: true",
    "rawEvidenceRendered: true",
    "internalNotesRendered: true",
    "unsupportedOutcomePromise: true",
  ];
}

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
