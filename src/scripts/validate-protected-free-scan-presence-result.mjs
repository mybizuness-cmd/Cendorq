import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const pagePath = "src/app/dashboard/reports/free-scan/page.tsx";
const componentPath = "src/components/presence-report/protected-free-scan-result-preview.tsx";
const fixturePath = "src/lib/sandwork-presence-report-fixture.ts";
const packageSourcePath = "src/lib/presence-report-package-source.ts";
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
  "getPresenceReportPackage",
  "packageSource.report",
  "packageSource.choiceGap",
  "Presence Score",
  "First weak point",
  "Top repair priorities",
  "Protected Free Scan result",
]);

expect(packageSourcePath, [
  "getPresenceReportPackage",
  "PRESENCE_REPORT_OBJECT_INDEX",
  "demoReportPackage",
]);

expect(fixturePath, [
  "SANDWORK_FREE_SCAN_INPUT",
  "SANDWORK_FREE_SCAN_SNAPSHOT",
  "SANDWORK_PRESENCE_REPORT_PACKAGE",
  "mapLiveScanSnapshotToPresenceReport",
  "buildFreeCheckReportSnapshot",
  "Sandwork",
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
  "@/lib/sandwork-presence-report-fixture",
  "SANDWORK_PRESENCE_REPORT_PACKAGE",
  "guaranteed ranking",
  "guaranteed revenue",
  "guaranteed AI placement",
]);

forbidden(fixturePath, [
  "guaranteed ranking",
  "guaranteed revenue",
  "guaranteed AI placement",
]);

if (failures.length) {
  console.error("Protected Free Scan Presence Result validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Protected Free Scan Presence Result validation passed with package-source helper, shared fixture boundary, and first-signal positioning.");

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
