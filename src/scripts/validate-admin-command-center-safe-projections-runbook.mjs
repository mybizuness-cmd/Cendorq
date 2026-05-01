import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const docPath = "docs/admin-command-center-safe-projections.md";
const registryPath = "src/lib/admin-command-center-safe-projection-registry.ts";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const failures = [];

expect(docPath, [
  "# Admin Command Center Safe Projections",
  "Operating posture",
  "Source of truth",
  "Endpoint map",
  "Operator sequence",
  "Validation requirements",
  "preview-gated",
  "no-store",
  "read-only review surfaces",
  "posture only",
  "src/lib/admin-command-center-safe-projection-registry.ts",
  "Do not duplicate the endpoint list in UI or API routes.",
]);

expect(docPath, [
  "/api/admin/command-center",
  "/api/admin/command-center/summary",
  "/api/admin/command-center/audit",
  "/api/admin/command-center/mission-brief",
  "/api/admin/command-center/agent-findings",
  "/api/admin/command-center/forecast-escalation",
  "validate-admin-command-center-projection-registry.mjs",
  "validate-admin-command-center-api-index.mjs",
  "validate-command-center-admin-control-panel.mjs",
  "validate-routes-chain.mjs",
]);

expect(registryPath, [
  "ADMIN_COMMAND_CENTER_SAFE_PROJECTION_LINKS",
  "getAdminCommandCenterSafeProjectionLinks",
  "/api/admin/command-center",
  "/api/admin/command-center/summary",
  "/api/admin/command-center/audit",
  "/api/admin/command-center/mission-brief",
  "/api/admin/command-center/agent-findings",
  "/api/admin/command-center/forecast-escalation",
]);

expect(routesChainPath, [
  "src/scripts/validate-admin-command-center-safe-projections-runbook.mjs",
]);

forbidden(docPath, [
  "localStorage",
  "sessionStorage",
  "dangerouslySetInnerHTML",
  "privateKey",
  "sessionToken",
  "csrfToken",
]);

if (failures.length) {
  console.error("Admin command center safe projections runbook validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Admin command center safe projections runbook validation passed.");

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
  const text = read(path);
  for (const phrase of phrases) if (text.includes(phrase)) failures.push(`${path} contains forbidden phrase: ${phrase}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
