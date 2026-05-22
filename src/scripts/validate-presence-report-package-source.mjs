import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const helperPath = "src/lib/presence-report-package-source.ts";
const objectIndexPath = "src/lib/presence-report-object-index.ts";
const protectedPreviewPath = "src/components/presence-report/protected-free-scan-result-preview.tsx";
const dashboardSnapshotPath = "src/app/dashboard/dashboard-presence-command-snapshot.tsx";
const failures = [];

expect(helperPath, [
  "PresenceReportPackageSource",
  "getPresenceReportPackage",
  "PRESENCE_REPORT_OBJECT_INDEX",
  "demoReportPackage",
  "source: PresenceReportPackageSource = \"demo\"",
]);

expect(objectIndexPath, [
  "SANDWORK_PRESENCE_REPORT_PACKAGE",
  "demoReportPackage",
]);

expect(protectedPreviewPath, [
  "getPresenceReportPackage",
  "@/lib/presence-report-package-source",
  "const packageSource = getPresenceReportPackage()",
]);

expect(dashboardSnapshotPath, [
  "getPresenceReportPackage",
  "@/lib/presence-report-package-source",
  "const packageSource = getPresenceReportPackage()",
]);

forbidden(protectedPreviewPath, ["@/lib/sandwork-presence-report-fixture"]);
forbidden(dashboardSnapshotPath, ["@/lib/sandwork-presence-report-fixture"]);

if (failures.length) {
  console.error("Presence Report package source validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Presence Report package source validation passed with object-index-backed demo package access and no direct fixture imports in consuming surfaces.");

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
