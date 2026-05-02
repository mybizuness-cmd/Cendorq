import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const docsIndexPath = "docs/command-center-docs-index.md";
const runbookPath = "docs/command-center-operator-runbook.md";
const safeProjectionRunbookPath = "docs/admin-command-center-safe-projections.md";
const ownerManualPath = "docs/owner-operating-manual.md";
const packagePath = "package.json";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";

validateTextFile(docsIndexPath, [
  "# Command Center Docs Index",
  "private documentation index",
  "docs/maximum-protection-standard.md",
  "docs/command-center-operator-runbook.md",
  "docs/admin-command-center-safe-projections.md",
  "registry-contract-backed, route-contract-summary-backed, projection-link-count-backed, panel-contract-strip-backed, panel-summary-display-backed",
  "docs/owner-operating-manual.md",
  "src/lib/command-center/access.ts",
  "src/lib/command-center/security-posture.ts",
  "src/lib/command-center/panel-registry.ts",
  "src/lib/command-center/validation-registry.ts",
  "Admin command-center safe projection registry, route contract metadata, route contract summary, and projection link count",
  "src/lib/admin-command-center-safe-projection-registry.ts",
  "src/lib/admin-command-center-safe-access.ts",
  "src/lib/admin-command-center-safe-response.ts",
  "src/lib/command-center/report-truth-engine.ts",
  "src/lib/command-center/report-evidence-orchestration.ts",
  "src/lib/command-center/report-evidence-orchestration-runtime.ts",
  "src/lib/command-center/report-evidence-record-contracts.ts",
  "src/lib/command-center/report-evidence-record-runtime.ts",
  "src/lib/command-center/report-evidence-record-persistence-runtime.ts",
  "src/lib/command-center/report-growth-system.ts",
  "src/lib/command-center/controlled-market-learning.ts",
  "src/lib/command-center/enterprise-operating-standard.ts",
  "src/lib/command-center/audit-defense-system.ts",
  "src/lib/command-center/most-pristine-system-standard.ts",
  "src/lib/command-center/audit-report-record-contracts.ts",
  "src/lib/command-center/scale-resilience-standard.ts",
  "src/lib/command-center/customer-platform-standard.ts",
  "src/lib/command-center/customer-command-experience-standard.ts",
  "src/lib/command-center/conversion-moat-standard.ts",
  "src/lib/command-center/insights-conversation-standard.ts",
  "src/lib/command-center/readiness-summary.ts",
  "src/lib/command-center/database-readiness.ts",
  "src/lib/command-center/auth-readiness.ts",
  "src/lib/command-center/file-storage-readiness.ts",
  "src/lib/command-center/billing-readiness.ts",
  "src/lib/command-center/delivery-readiness.ts",
  "src/lib/command-center/automation-readiness.ts",
  "src/lib/command-center/governance-readiness.ts",
  "src/lib/command-center/intelligence-readiness.ts",
  "src/lib/owner-configuration-evidence-runtime.ts",
  "src/lib/owner-configuration-evidence-persistence-runtime.ts",
  "src/lib/owner-configuration-evidence-approval-workflow-runtime.ts",
]);

validateTextFile(docsIndexPath, [
  "src/app/api/command-center/owner-configuration/evidence/route.ts",
  "src/app/api/command-center/owner-configuration/workflow/route.ts",
  "src/app/command-center/owner-configuration-evidence-panel.tsx",
  "src/app/command-center/owner-configuration-workflow-panel.tsx",
  "src/app/api/admin/command-center/route.ts",
  "src/app/api/admin/command-center/summary/route.ts",
  "src/app/api/admin/command-center/audit/route.ts",
  "src/app/api/admin/command-center/mission-brief/route.ts",
  "src/app/api/admin/command-center/agent-findings/route.ts",
  "src/app/api/admin/command-center/forecast-escalation/route.ts",
  "src/app/command-center/admin-command-center-control-panel.tsx",
  "projection-link-count-backed",
  "route-contract-summary-backed",
  "panel-contract-strip-backed",
  "panel-summary-display-backed",
  "Safe projection validation standard",
  "validate-admin-command-center-safe-projections-runbook.mjs",
  "runbook structure, endpoint map, registry contract helpers, projection link count/completeness helpers, shared access helper, shared response/options helper, every admin projection route, and route-chain wiring",
  "panel summary display tied to method count and all-helpers-required posture from `getAdminCommandCenterSafeProjectionRouteContractSummary`",
  "src/app/api/command-center/report-evidence/orchestration/route.ts",
  "src/app/command-center/report-evidence-orchestration-panel.tsx",
  "customer-facing report approvals",
]);

validateTextFile(docsIndexPath, [
  "src/scripts/validate-command-center-security-posture.mjs",
  "src/scripts/validate-admin-command-center-projection-registry.mjs",
  "src/scripts/validate-admin-command-center-safe-response.mjs",
  "src/scripts/validate-admin-command-center-safe-projections-runbook.mjs",
  "src/scripts/validate-admin-command-center-api-index.mjs",
  "src/scripts/validate-admin-command-center-safe-summary-api.mjs",
  "src/scripts/validate-admin-command-center-audit-trail-api.mjs",
  "src/scripts/validate-admin-command-center-mission-brief-api.mjs",
  "src/scripts/validate-admin-command-center-agent-findings-api.mjs",
  "src/scripts/validate-admin-command-center-forecast-escalation-api.mjs",
  "src/scripts/validate-command-center-admin-control-panel.mjs",
  "src/scripts/validate-command-center-panel-registry.mjs",
  "src/scripts/validate-command-center-panel-safety.mjs",
  "src/scripts/validate-command-center-validation-registry.mjs",
  "src/scripts/validate-report-truth-engine.mjs",
  "src/scripts/validate-report-evidence-orchestration.mjs",
  "src/scripts/validate-report-evidence-orchestration-runtime.mjs",
  "src/scripts/validate-command-center-report-evidence-orchestration-panel.mjs",
  "src/scripts/validate-command-center-report-evidence-orchestration-api.mjs",
  "src/scripts/validate-report-evidence-record-contracts.mjs",
  "src/scripts/validate-report-evidence-record-runtime.mjs",
  "src/scripts/validate-report-evidence-record-persistence-runtime.mjs",
  "src/scripts/validate-controlled-market-learning.mjs",
  "src/scripts/validate-enterprise-operating-standard.mjs",
  "src/scripts/validate-audit-defense-system.mjs",
  "src/scripts/validate-most-pristine-system-standard.mjs",
  "src/scripts/validate-report-record-contracts.mjs",
  "src/scripts/validate-scale-resilience-standard.mjs",
  "src/scripts/validate-customer-platform-standard.mjs",
  "src/scripts/validate-customer-experience-standard.mjs",
  "src/scripts/validate-conversion-moat-standard.mjs",
  "src/scripts/validate-insights-conversation-standard.mjs",
  "src/scripts/validate-command-center-operator-runbook.mjs",
  "src/scripts/validate-command-center-docs-index.mjs",
  "src/scripts/validate-owner-operating-manual.mjs",
  "src/scripts/validate-production-smoke-coverage.mjs",
  "src/scripts/validate-command-center-owner-configuration-evidence-api.mjs",
  "src/scripts/validate-command-center-owner-configuration-evidence-persistence.mjs",
  "src/scripts/validate-command-center-owner-configuration-evidence-approval-workflow.mjs",
  "src/scripts/validate-command-center-owner-configuration-workflow-api.mjs",
  "src/scripts/validate-command-center-owner-configuration-workflow-panel.mjs",
  "src/scripts/validate-command-center-owner-configuration-workflow-smoke.mjs",
  "admin command-center projection link count",
  "admin command-center route contract summary",
  "admin command-center panel contract strip",
  "admin command-center panel summary display",
  "admin command-center response or options helper",
  "report evidence route",
  "report evidence record contract",
  "report evidence record runtime",
  "report evidence record persistence runtime",
]);

validateTextFile(runbookPath, [
  "# Command Center Operator Runbook",
  "Keep every validation guard wired into `validate:routes`.",
  "validate-command-center-operator-runbook.mjs",
  "validate-command-center-docs-index.mjs",
  "validate-command-center-owner-configuration-workflow-smoke.mjs",
  "Vercel is green.",
]);

validateTextFile(safeProjectionRunbookPath, [
  "# Admin Command Center Safe Projections",
  "Operating posture",
  "Source of truth",
  "getAdminCommandCenterSafeProjectionRouteContract",
  "getAdminCommandCenterSafeProjectionRouteContractSummary",
  "getAdminCommandCenterSafeProjectionLinkCount",
  "getAdminCommandCenterExpectedSafeProjectionLinkCount",
  "getAdminCommandCenterSafeProjectionLinksComplete",
  "projection link count",
  "expected projection link count",
  "projection completeness",
  "routeContractSummary",
  "The strip must show method count and all-helpers-required posture from the summary accessor",
  "resolveAdminCommandCenterSafeAccess",
  "adminCommandCenterAccessDeniedPayload",
  "adminCommandCenterJsonNoStore",
  "adminCommandCenterOptions",
  "ADMIN_COMMAND_CENTER_SAFE_METHODS",
  "Validation requirements",
  "safe-projections validator must enforce shared `OPTIONS` helper coverage across every admin command-center projection route",
]);

validateTextFile(ownerManualPath, [
  "# Cendorq Owner Operating Manual",
  "proof before output",
  "evidence before recommendation",
  "confidence before certainty",
  "Conversion moat",
  "Market-learning loop",
  "Owner responsibilities after build",
]);

validateTextFile(packagePath, ["validate:routes", "node ./src/scripts/validate-routes-chain.mjs"]);

validateTextFile(routesChainPath, [
  "validate-command-center-docs-index.mjs",
  "validate-admin-command-center-safe-response.mjs",
  "validate-admin-command-center-safe-projections-runbook.mjs",
  "validate-owner-operating-manual.mjs",
  "validate-command-center-validation-registry.mjs",
  "validate-report-truth-engine.mjs",
  "validate-report-evidence-record-runtime.mjs",
  "validate-command-center-owner-configuration-workflow-smoke.mjs",
]);

if (failures.length) {
  console.error("Command Center docs index validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command Center docs index validation passed with projection link count, panel summary display, report evidence record runtime, and report evidence record persistence runtime coverage.");

function validateTextFile(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing required docs index dependency: ${path}`);
    return;
  }

  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing required docs index phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
