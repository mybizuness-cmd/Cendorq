import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const smokePath = "src/scripts/smoke-production.mjs";
const workflowPath = ".github/workflows/smoke-production.yml";
const packagePath = "package.json";
const runbookPath = "docs/command-center-operator-runbook.md";
const docsIndexPath = "docs/command-center-docs-index.md";

for (const file of [smokePath, workflowPath, packagePath, runbookPath, docsIndexPath]) {
  if (!existsSync(join(root, file))) failures.push(`Missing production smoke dependency: ${file}`);
}

expect(smokePath, [
  "const isLocalBaseUrl = isLocalhostBaseUrl(baseUrl);",
  "redirect: \"manual\"",
  "isRedirectStatus(redirectResponse.status)",
  "redirectResponse.headers.get(\"location\")",
  "checkOptionsRoute",
  "GET,POST,OPTIONS",
  "checkProtectedReadRoute",
  "protectedReadChecks",
  "expectedStatus: 401",
  "The intake console is not authorized to read submissions.",
  "if (isLocalBaseUrl) return;",
  "payload.ok !== false",
  "closedCommandCenterChecks",
  "/command-center",
  "/command-center/intake",
  "Private Command Center",
  "Closed by default.",
  "No customer records",
  "checkClosedCommandCenterRoute",
  "protectedCommandCenterApiChecks",
  "/api/command-center/readiness",
  "The Command Center readiness endpoint is not authorized.",
  "checkProtectedJsonErrorRoute",
  "Private configuration checklist",
  "Schema anchors",
]);

expect(workflowPath, [
  "workflow_dispatch",
  "schedule:",
  "permissions:",
  "contents: read",
  "concurrency:",
  "cancel-in-progress: true",
  "timeout-minutes: 10",
  "persist-credentials: false",
  "CENDORQ_BASE_URL:",
  "https://cendorq.com",
  "Validate production smoke target",
  "CENDORQ_BASE_URL is required for production smoke checks.",
  "CENDORQ_BASE_URL must be a valid URL.",
  "CENDORQ_BASE_URL must use http or https.",
  "::notice title=Production smoke target::",
  "pnpm install --frozen-lockfile",
  "pnpm smoke:production",
  "node-version: \"24\"",
]);

expect(packagePath, [
  "validate:routes",
  "validate-command-center-security-posture.mjs",
  "validate-command-center-panel-registry.mjs",
  "validate-command-center-panel-safety.mjs",
  "validate-command-center-operator-runbook.mjs",
  "validate-command-center-docs-index.mjs",
  "validate-production-smoke-coverage.mjs",
]);

expect(runbookPath, [
  "# Command Center Operator Runbook",
  "docs/command-center-docs-index.md",
  "validate-command-center-docs-index.mjs",
]);

expect(docsIndexPath, [
  "# Command Center Docs Index",
  "docs/command-center-operator-runbook.md",
  "validate-command-center-operator-runbook.mjs",
]);

const smokeText = read(smokePath);
for (const phrase of [
  "Search Presence Scan",
  "Visibility Blueprint",
  "Presence Infrastructure",
  "Presence Command",
  "console.log(payload)",
  "ALLOW_OPEN_INTAKE_READS",
  "COMMAND_CENTER_PREVIEW_KEY",
]) {
  if (smokeText.includes(phrase)) failures.push(`Production smoke script contains forbidden or risky phrase: ${phrase}`);
}

if (failures.length) {
  console.error("Production smoke coverage validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Production smoke coverage validation passed. Public routes, strict redirects, health, Free Scan OPTIONS, protected Free Scan read checks, closed Command Center route checks, protected Command Center readiness checks, Command Center panel guard validators, operator runbook validation, docs index validation, documentation cross-references, and smoke workflow hardening are synchronized.");

function expect(path, phrases) {
  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing required production smoke phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
