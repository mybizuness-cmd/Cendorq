import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const helperPath = "src/lib/admin-command-center-safe-access.ts";
const routes = [
  "src/app/api/admin/command-center/route.ts",
  "src/app/api/admin/command-center/summary/route.ts",
  "src/app/api/admin/command-center/audit/route.ts",
  "src/app/api/admin/command-center/mission-brief/route.ts",
  "src/app/api/admin/command-center/agent-findings/route.ts",
  "src/app/api/admin/command-center/forecast-escalation/route.ts",
];
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const failures = [];

expect(helperPath, [
  "AdminCommandCenterSafeAccessProjection",
  "resolveAdminCommandCenterSafeAccess",
  "adminCommandCenterAccessDeniedPayload",
  "commandCenterPreviewHeaderName",
  "resolveCommandCenterAccessState",
  "Command center access is closed.",
]);

for (const route of routes) {
  expect(route, [
    "resolveAdminCommandCenterSafeAccess",
    "adminCommandCenterAccessDeniedPayload",
    "@/lib/admin-command-center-safe-access",
    "adminCommandCenterJsonNoStore",
    "runtime = \"nodejs\"",
    "dynamic = \"force-dynamic\"",
  ]);
  forbidden(route, [
    "commandCenterPreviewHeaderName",
    "resolveCommandCenterAccessState",
    "request.headers.get",
    "error: \"Command center access is closed.\"",
    "localStorage",
    "sessionStorage",
    "dangerouslySetInnerHTML",
    "privateKey",
    "sessionToken",
    "csrfToken",
  ]);
}

expect(routesChainPath, [
  "src/scripts/validate-admin-command-center-safe-access.mjs",
]);

forbidden(helperPath, [
  "localStorage",
  "sessionStorage",
  "dangerouslySetInnerHTML",
  "privateKey",
  "sessionToken",
  "csrfToken",
]);

if (failures.length) {
  console.error("Admin command center safe access validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Admin command center safe access validation passed.");

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
