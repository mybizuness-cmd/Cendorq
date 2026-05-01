import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const apiPath = "src/app/api/admin/command-center/route.ts";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const failures = [];

expect(apiPath, [
  "runtime = \"nodejs\"",
  "dynamic = \"force-dynamic\"",
  "NextRequest",
  "NextResponse",
  "commandCenterPreviewHeaderName",
  "resolveCommandCenterAccessState",
  "Command center access is closed.",
  "projection: \"admin-command-center-api-index\"",
  "jsonNoStore",
  "Cache-Control",
  "no-store, max-age=0",
  "X-Robots-Tag",
]);

expect(apiPath, [
  "safeProjectionEndpoints",
  "admin-command-center-safe-summary",
  "admin-command-center-audit-trail",
  "admin-command-center-mission-brief",
  "admin-command-center-agent-findings",
  "admin-command-center-forecast-escalation",
  "/api/admin/command-center/summary",
  "/api/admin/command-center/audit",
  "/api/admin/command-center/mission-brief",
  "/api/admin/command-center/agent-findings",
  "/api/admin/command-center/forecast-escalation",
]);

expect(apiPath, [
  "closedByDefault: true",
  "noStoreRequired: true",
  "readOnly: true",
  "grantsLiveAuthority: false",
  "preview-gated command-center access",
  "no-store responses",
  "safe projections only",
  "read-only index",
  "review-only operating posture",
  "separate approval gates for action lanes",
]);

expect(routesChainPath, [
  "src/scripts/validate-admin-command-center-api-index.mjs",
]);

forbidden(apiPath, [
  "localStorage",
  "sessionStorage",
  "dangerouslySetInnerHTML",
  "console.log",
  "rawPayload",
  "privateKey",
  "sessionToken",
  "csrfToken",
  "grantsLiveAuthority: true",
  "readOnly: false",
]);

if (failures.length) {
  console.error("Admin command center API index validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Admin command center API index validation passed.");

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
