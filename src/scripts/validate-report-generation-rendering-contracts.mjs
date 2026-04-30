import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const contractPath = "src/lib/report-generation-rendering-contracts.ts";
const packagePath = "package.json";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-report-generation-rendering-contracts.mjs";
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
  "avoid guaranteed ROI, guaranteed revenue, guaranteed security outcome, guaranteed legal outcome, or guaranteed business result claims",
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
  "must not claim Cendorq is impossible to hack, guaranteed safe, never liable, liability-free, or guaranteed to produce results",
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

expect(packagePath, [
  "validate:routes",
  "node ./src/scripts/validate-routes-chain.mjs",
]);

expect(routesChainPath, [
  validatorPath,
]);

forbidden(contractPath, [
  "pending reports are final",
  "release draft report",
  "render rawPayload",
  "render rawEvidence",
  "render internalNotes",
  "unapproved logo is allowed",
  "PDF can differ from HTML",
  "guaranteed ROI",
  "guaranteed revenue",
  "guaranteed business results",
  "impossible to hack",
  "never liable",
  "liability-free",
  "delete audit records",
  "sessionToken=",
  "csrfToken=",
  "adminKey=",
  "supportContextKey=",
]);

if (failures.length) {
  console.error("Report generation rendering contracts validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Report generation rendering contracts validation passed. validate:routes delegates through the orchestrator and the report rendering validator remains wired into the route chain.");

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
