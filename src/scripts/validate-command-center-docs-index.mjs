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
  "registry-contract-backed, route-contract-summary-backed, panel-contract-strip-backed",
  "docs/owner-operating-manual.md",
  "Admin command-center safe projection registry, route contract metadata, and route contract summary",
  "src/lib/admin-command-center-safe-projection-registry.ts",
  "src/lib/admin-command-center-safe-access.ts",
  "src/lib/admin-command-center-safe-response.ts",
  "route-contract-summary-backed",
  "admin command-center route contract summary",
]);

validateTextFile(docsIndexPath, [
  "src/app/api/admin/command-center/route.ts",
  "src/app/api/admin/command-center/summary/route.ts",
  "src/app/api/admin/command-center/audit/route.ts",
  "src/app/api/admin/command-center/mission-brief/route.ts",
  "src/app/api/admin/command-center/agent-findings/route.ts",
  "src/app/api/admin/command-center/forecast-escalation/route.ts",
  "src/app/command-center/admin-command-center-control-panel.tsx",
  "Safe projection validation standard",
  "validate-admin-command-center-safe-projections-runbook.mjs",
  "runbook structure, endpoint map, registry contract helpers, shared access helper, shared response/options helper, every admin projection route, and route-chain wiring",
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
  "src/scripts/validate-command-center-docs-index.mjs",
  "src/scripts/validate-owner-operating-manual.mjs",
]);

validateTextFile(runbookPath, [
  "# Command Center Operator Runbook",
  "Keep every validation guard wired into `validate:routes`.",
  "validate-command-center-docs-index.mjs",
  "Vercel is green.",
]);

validateTextFile(safeProjectionRunbookPath, [
  "# Admin Command Center Safe Projections",
  "getAdminCommandCenterSafeProjectionRouteContract",
  "getAdminCommandCenterSafeProjectionRouteContractSummary",
  "routeContractSummary",
  "admin-control-panel validator must enforce the canonical route-contract strip and compact route-contract summary",
]);

validateTextFile(ownerManualPath, [
  "# Cendorq Owner Operating Manual",
  "proof before output",
  "evidence before recommendation",
  "confidence before certainty",
  "Conversion moat",
]);

validateTextFile(packagePath, ["validate:routes", "node ./src/scripts/validate-routes-chain.mjs"]);

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

console.log("Command Center docs index validation passed with route contract summary index coverage.");

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
