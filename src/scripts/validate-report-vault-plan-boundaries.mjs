import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const checks = [
  ["src/lib/report-vault-plan-boundary-runtime.ts", ["ReportVaultAccessDecision", "REPORT_VAULT_PLAN_BOUNDARY_RULES", "resolveReportVaultAccessDecision", "free-scan-result", "deep-review-report", "build-fix-summary", "ongoing-control-monthly-summary", "verifiedSessionRequired: true", "customerOwnershipRequired: true", "planBoundaryRequired: true", "rawReportPayloadReturned: false", "rawPrivatePayloadReturned: false"]],
  ["src/app/dashboard/reports/page.tsx", ["resolveReportVaultAccessDecision", "REPORT_ACCESS_BY_PLAN", "REPORT_ACCESS_BY_PLAN[\"free-scan\"].customerRoute", "entitlementActive: false", "releaseApproved: false", "approvedPdfReady: false", "decision.finalReportVisible", "decision.releaseApprovalRequired", "decision.approvedPdfRequired", "decision.emailAttachmentRequired", "AI Visibility signal result dashboard-only protected result"]],
  ["src/scripts/validate-routes-chain.mjs", ["src/scripts/validate-report-vault-plan-boundaries.mjs"]],
];

for (const [path, phrases] of checks) expect(path, phrases);

if (failures.length) {
  console.error("Report vault plan-boundary validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Report vault plan-boundary validation passed.");

function expect(path, phrases) {
  const absolute = join(root, path);
  if (!existsSync(absolute)) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = readFileSync(absolute, "utf8");
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}
