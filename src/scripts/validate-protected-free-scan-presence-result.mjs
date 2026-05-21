import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const pagePath = "src/app/dashboard/reports/free-scan/page.tsx";
const componentPath = "src/components/presence-report/protected-free-scan-result-preview.tsx";
const indexPath = "src/components/presence-report/index.ts";
const failures = [];

expect(pagePath, [
  "ProtectedFreeScanResultPreview",
  "The first Free Scan Presence Report is ready.",
  "Protected Free Scan Presence Report standard",
  "First signal only",
  "Open Review page",
]);

expect(componentPath, [
  "ProtectedFreeScanResultPreview",
  "mapLiveScanSnapshotToPresenceReport",
  "buildFreeCheckReportSnapshot",
  "PROTECTED_FREE_SCAN_SNAPSHOT",
  "PROTECTED_FREE_SCAN_PACKAGE",
  "Sandwork",
  "Presence Score",
  "First weak point",
  "Top repair priorities",
  "Protected Free Scan result",
  "scoreModules",
  "competitiveExposure",
  "Free Scan remains first signal only.",
]);

expect(indexPath, ["ProtectedFreeScanResultPreview"]);

forbidden(pagePath, [
  "full diagnosis.",
  "guaranteed ranking",
  "guaranteed revenue",
  "guaranteed AI placement",
]);

forbidden(componentPath, [
  "guaranteed ranking",
  "guaranteed revenue",
  "guaranteed AI placement",
]);

if (failures.length) {
  console.error("Protected Free Scan Presence Result validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Protected Free Scan Presence Result validation passed.");

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
  const text = read(path).toLowerCase();
  for (const phrase of phrases) {
    if (text.includes(phrase.toLowerCase())) failures.push(`${path} contains forbidden phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
