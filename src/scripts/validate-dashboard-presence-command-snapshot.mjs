import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const componentPath = "src/app/dashboard/dashboard-presence-command-snapshot.tsx";
const pagePath = "src/app/dashboard/page.tsx";
const fixturePath = "src/lib/sandwork-presence-report-fixture.ts";
const packageSourcePath = "src/lib/presence-report-package-source.ts";
const failures = [];

expect(componentPath, [
  "DashboardPresenceCommandSnapshot",
  "getPresenceReportPackage",
  "packageSource.report",
  "packageSource.choiceGap",
  "packageSource.controlSnapshot",
  "Presence command snapshot",
  "Presence Score",
  "Choice Gap",
  "Repair Queue",
  "Control Snapshot",
  "Open Free Scan result",
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
]);

expect(pagePath, [
  "DashboardPresenceCommandSnapshot",
  "AI Visibility command center",
  "Presence Reports",
  "one clear next command",
  "Presence command snapshot",
  "Presence Score",
  "Choice Gap",
  "Repair Queue",
  "Control Snapshot",
  "Scan. Review. Repair. Control.",
]);

forbidden(componentPath, [
  "@/lib/sandwork-presence-report-fixture",
  "SANDWORK_PRESENCE_REPORT_PACKAGE",
  "SAMPLE_PRESENCE_REPORT",
  "SAMPLE_CHOICE_GAP",
  "SAMPLE_CONTROL_SNAPSHOT",
  "guaranteed ranking",
  "guaranteed revenue",
  "guaranteed AI placement",
  "rawReport",
  "rawEvidence",
]);

forbidden(pagePath, [
  "guaranteed ranking",
  "guaranteed revenue",
  "guaranteed AI placement",
]);

if (failures.length) {
  console.error("Dashboard Presence Command Snapshot validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Dashboard Presence Command Snapshot validation passed with package-source helper, shared Sandwork fixture boundary, and protected report object boundaries.");

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
