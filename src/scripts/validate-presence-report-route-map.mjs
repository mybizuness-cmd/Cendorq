import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const mapPath = "src/lib/presence-report-route-map.ts";
const failures = [];

expect(mapPath, [
  "PRESENCE_REPORT_PUBLIC_ROUTES",
  "PRESENCE_REPORT_PROTECTED_ROUTES",
  "PRESENCE_REPORT_ROUTE_PURPOSES",
  "/sample-report/dentist",
  "/sample-report/med-spa",
  "/sample-report/law-firm",
  "/sample-report/contractor",
  "/dashboard/reports/free-scan",
]);

if (failures.length) {
  console.error("Presence Report route map validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Presence Report route map validation passed.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = readFileSync(join(root, path), "utf8");
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}
