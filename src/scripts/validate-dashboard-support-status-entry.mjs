import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

expect("src/app/dashboard/page.tsx", [
  "track support status",
  "/dashboard/support/status",
  "Track support status",
  "View customer-safe request status, approved next actions, and support follow-through without internal data exposure.",
  "track support status, and move to the next plan only when the proof and stage make sense.",
]);

expect("src/app/dashboard/support/status/page.tsx", [
  "SupportStatusList",
  "Track support without exposing internal risk.",
]);

expect("src/lib/customer-platform-route-map.ts", [
  "dashboardSupportStatus",
  "/dashboard/support/status",
  "support status access requires authenticated customer ownership, session authorization, and customer-safe projection",
]);

expect("package.json", [
  "validate:routes",
  "validate-dashboard-support-status-entry.mjs",
]);

forbidden("src/app/dashboard/page.tsx", [
  "internal notes",
  "operator identities",
  "risk-scoring internals",
  "attacker details",
  "raw evidence",
  "raw billing data",
  "admin keys",
  "support context keys",
  "session tokens",
  "CSRF tokens",
  "guaranteed support outcome",
  "refund approved",
]);

if (failures.length) {
  console.error("Dashboard support status entry validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Dashboard support status entry validation passed.");

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
