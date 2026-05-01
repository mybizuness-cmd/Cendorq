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
  "admin command-center safe projection map for preview-gated, shared-access-backed, safe-options-backed, registry-contract-backed, panel-contract-strip-backed, no-store, read-only API index, summary, audit trail, mission brief, agent findings, and forecast escalation review surfaces",
  "docs/owner-operating-manual.md",
  "Admin command-center safe projection registry and route contract metadata",
  "src/lib/admin-command-center-safe-projection-registry.ts",
  "src/lib/admin-command-center-safe-access.ts",
  "src/lib/admin-command-center-safe-response.ts",
  "src/app/api/admin/command-center/route.ts",
  "src/app/api/admin/command-center/summary/route.ts",
  "src/app/api/admin/command-center/audit/route.ts",
  "src/app/api/admin/command-center/mission-brief/route.ts",
  "src/app/api/admin/command-center/agent-findings/route.ts",
  "src/app/api/admin/command-center/forecast-escalation/route.ts",
  "src/app/command-center/admin-command-center-control-panel.tsx",
  "preview-gated, shared-access-backed, safe-options-backed, no-store, registry-backed, registry-contract-backed, panel-contract-strip-backed, shared-response-backed, panel-visible, API-index-visible, and posture-only",
  "Safe projection validation standard",
  "validate-admin-command-center-safe-projections-runbook.mjs",
  "runbook structure, endpoint map, registry contract helpers, shared access helper, shared response/options helper, every admin projection route, and route-chain wiring",
  "admin command-center route contract metadata",
  "admin command-center panel contract strip",
  "admin command-center response or options helper",
]);

validateTextFile(runbookPath, [
  "# Command Center Operator Runbook",
  "Keep every validation guard wired into `validate:routes`.",
  "validate-command-center-operator-runbook.mjs",
  "validate-command-center-docs-index.mjs",
  "Vercel is green.",
]);

validateTextFile(safeProjectionRunbookPath, [
  "# Admin Command Center Safe Projections",
  "Operating posture",
  "Source of truth",
  "getAdminCommandCenterSafeProjectionRouteContract",
  "getAdminCommandCenterSafeProjectionRouteContractSummary",
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
]);

validateTextFile(packagePath, [
  "validate:routes",
  "node ./src/scripts/validate-routes-chain.mjs",
]);

validateTextFile(routesChainPath, [
  "validate-command-center-docs-index.mjs",
  "validate-admin-command-center-safe-response.mjs",
  "validate-admin-command-center-safe-projections-runbook.mjs",
  "validate-command-center-admin-control-panel.mjs",
]);

if (failures.length) {
  console.error("Command Center docs index validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command Center docs index validation passed with restored safe-projections validator coverage.");

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
