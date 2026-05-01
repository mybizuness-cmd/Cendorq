import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const helperPath = "src/lib/admin-command-center-safe-response.ts";
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
  "ADMIN_COMMAND_CENTER_SAFE_RESPONSE_HEADERS",
  "adminCommandCenterJsonNoStore",
  "NextResponse.json",
  "Cache-Control",
  "no-store, max-age=0",
  "Pragma",
  "no-cache",
  "Expires",
  "X-Robots-Tag",
  "noindex, nofollow, noarchive",
]);

for (const route of routes) {
  expect(route, [
    "adminCommandCenterJsonNoStore",
    "@/lib/admin-command-center-safe-response",
    "Command center access is closed.",
    "runtime = \"nodejs\"",
    "dynamic = \"force-dynamic\"",
  ]);
  forbidden(route, [
    "NextResponse.json",
    "function jsonNoStore",
    "headers: {",
    "Cache-Control",
    "X-Robots-Tag",
    "localStorage",
    "sessionStorage",
    "dangerouslySetInnerHTML",
    "privateKey",
    "sessionToken",
    "csrfToken",
  ]);
}

expect(routesChainPath, [
  "src/scripts/validate-admin-command-center-safe-response.mjs",
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
  console.error("Admin command center safe response validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Admin command center safe response validation passed.");

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
