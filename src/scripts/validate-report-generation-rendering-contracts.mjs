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
const planReportStandardPath = "docs/plan-report-agent-delivery-standard.md";
const intakePaymentStandardPath = "docs/customer-intake-payment-standard.md";
const planReportValidatorPath = "src/scripts/validate-plan-report-and-intake-standards.mjs";
const failures = [];

expect(contractPath, [
  "REPORT_GENERATION_RENDERING_CONTRACT",
  "REPORT_GENERATION_RENDERING_BLOCKED_PATTERNS",
  "Report Generation and Branded Rendering Contract",
  "premium customer reports",
  "safe HTML/PDF/dashboard outputs",
  "plan-specific structure",
  "plain customer wording",
  "helpful visuals",
  "free-scan-result",
  "deep-review-report",
  "build-fix-summary",
  "ongoing-control-monthly-report",
  "correction-review-addendum",
]);

expect(contractPath, [
  "planReportRules",
  "Free Scan Signal Report",
  "Deep Review Diagnostic Report",
  "Build Fix Delivery Report",
  "Ongoing Control Report",
  "maximumCustomerFacingLength: \"two pages\"",
  "simple signal meter or readiness bar",
  "competitor comparison chart when evidence allows",
  "expected timeline visual",
  "trend line or month-over-month signal visual",
  "nextPlanMotion",
]);

expect(contractPath, [
  "customerWordingRules",
  "Reports must be educational while selling and informational while selling.",
  "Use customer-understandable words such as visibility, readiness, trust, clarity, proof, weak point, strongest next step, what this means, what to fix first, and what may take time.",
  "Every technical point must answer what we saw, why it matters, how confident we are, and what should happen next.",
  "Report language must sound premium, clear, calm, direct, and useful instead of generic, robotic, overly technical, or filler-heavy.",
]);

expect(contractPath, [
  "visualDesignRules",
  "Every customer report must look pristine, structured, and premium across dashboard, HTML, and PDF outputs.",
  "Visuals must teach; do not add decorative charts that do not make the customer decision clearer.",
  "Use scorecards when scores help the customer understand priority",
  "Charts and tables must be readable, accessible, high-contrast, and safe for a non-technical business owner.",
]);

expect(contractPath, [
  "Cendorq letterhead",
  "customer-safe business identity",
  "report title and report type",
  "report version and generated date",
  "executive summary",
  "verified facts",
  "assumptions",
  "inferences",
  "confidence labels",
  "limitations",
  "visual explanation",
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
  "Competitor and forecast sections must describe the public evidence basis and avoid fake precision or private-data assumptions.",
]);

expect(contractPath, [
  "HTML and PDF reports must carry Cendorq branding",
  "Customer business logo may be rendered only when provided by the customer, approved for report use, safely stored, and passed through a safe asset projection.",
  "fall back to a Cendorq-branded neutral placeholder",
  "PDF and HTML outputs must use the same approved report content source",
]);

expect(contractPath, [
  "dashboardStorageRules",
  "Every report or report-related output must create or update a customer dashboard report record when customer-safe storage is available.",
  "missing customer inputs when blocked",
  "Dashboard records must not expose draft, unapproved, raw, internal, cross-customer, or unsafe report data.",
]);

expect(contractPath, [
  "report generation source is customer-owned",
  "safe report projection exists",
  "plan-specific required sections exist",
  "customer wording review passes",
  "visual explanation review passes",
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
  "genericAiFillerReport",
  "technicalClutterReport",
  "decorativeChartWithoutDecisionValue",
  "fullCompetitorAnalysisInFreeScan",
  "fakePrecisionForecast",
  "unsupportedCompetitorClaim",
  "unsupportedOutcomePromise",
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

expect(planReportStandardPath, [
  "# Cendorq Plan Report and Agent Delivery Standard",
  "Reports must be educational while selling and informational while selling.",
  "Cendorq letterhead",
  "Deep Review",
  "Build Fix",
  "Ongoing Control",
]);

expect(intakePaymentStandardPath, [
  "# Cendorq Customer Intake and Payment Timing Standard",
  "Use progressive intake.",
  "Payment should happen before the heavy paid plan questionnaire.",
]);

expect(planReportValidatorPath, [
  "Plan report and intake standards validation passed",
  "premium report rules",
  "progressive intake",
]);

expect(protectedFreeScanRenderingValidatorPath, [
  "Protected Free Scan results rendering validation passed.",
  "src/lib/protected-free-scan-results-rendering.ts",
  "projectProtectedFreeScanResultsRendering",
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

expect(packagePath, [
  "validate:routes",
  "node ./src/scripts/validate-routes-chain.mjs",
]);

expect(routesChainPath, [
  validatorPath,
  ownerMaximumProtectionValidatorPath,
  planReportValidatorPath,
]);

forbidden(contractPath, unsafePhrases());
forbidden(protectedFreeScanRenderingPath, unsafePhrases());

if (failures.length) {
  console.error("Report generation rendering contracts validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Report generation rendering contracts validation passed with elevated plan-specific report rules, protected Free Scan results rendering, intake/payment timing, premium visual design, dashboard storage, and owner posture coverage.");

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
