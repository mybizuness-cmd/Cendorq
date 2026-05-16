import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const runtimePath = "src/lib/report-vault-plan-boundary-runtime.ts";
const pagePath = "src/app/dashboard/reports/page.tsx";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-report-vault-plan-boundaries.mjs";

expect(runtimePath, [
  "ReportVaultAccessDecision",
  "REPORT_VAULT_PLAN_BOUNDARY_RULES",
  "resolveReportVaultAccessDecision",
  "free-scan-result",
  "ai-readiness-review-report",
  "signal-repair-summary",
  "readiness-control-monthly-summary",
  "verifiedSessionRequired: true",
  "customerOwnershipRequired: true",
  "planBoundaryRequired: true",
  "releaseApprovalRequired: paidPlan",
  "approvedPdfRequired: paidPlan",
  "emailAttachmentRequired: paidPlan",
  "rawReportPayloadReturned: false",
  "rawPrivatePayloadReturned: false",
]);

expect(pagePath, [
  "resolveReportVaultAccessDecision",
  "REPORT_ACCESS_BY_PLAN",
  "REPORT_ACCESS_BY_PLAN[\"free-scan\"].customerRoute",
  "entitlementActive: false",
  "releaseApproved: false",
  "approvedPdfReady: false",
  "decision.finalReportVisible",
  "decision.releaseApprovalRequired",
  "decision.approvedPdfRequired",
  "decision.emailAttachmentRequired",
  "guaranteed ranking",
  "guaranteed AI placement",
]);

expect(routesChainPath, [validatorPath]);

forbidden(runtimePath, [
  "rawReportPayloadReturned: true",
  "rawPrivatePayloadReturned: true",
  "verifiedSessionRequired: false",
  "customerOwnershipRequired: false",
  "planBoundaryRequired: false",
  "releaseApprovalRequired: false,",
  "approvedPdfRequired: false,",
  "emailAttachmentRequired: false,",
]);

forbidden(pagePath, [
  "rawReportPayloadReturned: true",
  "rawPrivatePayloadReturned: true",
  "dangerouslySetInnerHTML",
  "localStorage",
  "sessionStorage",
]);

if (failures.length) {
  console.error("Report vault plan-boundary validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Report vault plan-boundary validation passed with separated report access decisions, paid release/PDF requirements, safe no-guarantee language, safe routes, and route-chain coverage.");

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
  const text = read(path);
  for (const phrase of phrases) {
    if (text.includes(phrase)) failures.push(`${path} contains forbidden phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
