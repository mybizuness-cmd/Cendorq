import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const target = "src/app/login/page.tsx";
const failures = [];

expect(target, [
  "SAFE_DASHBOARD_PATHS",
  "/dashboard/reports/free-scan",
  "/dashboard/billing",
  "/dashboard/support",
  "/dashboard/notifications",
  "return SAFE_DASHBOARD_PATHS.find",
]);

if (failures.length) {
  console.error("Login return allowlist validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Login return allowlist validation passed.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = readFileSync(join(root, path), "utf8");
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}
