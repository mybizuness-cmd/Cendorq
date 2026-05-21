import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const fixturePath = "src/lib/sandwork-presence-report-fixture.ts";
const protectedPreviewPath = "src/components/presence-report/protected-free-scan-result-preview.tsx";
const dashboardSnapshotPath = "src/app/dashboard/dashboard-presence-command-snapshot.tsx";
const failures = [];

expect(fixturePath, [
  "SANDWORK_FREE_SCAN_INPUT",
  "SANDWORK_FREE_SCAN_SNAPSHOT",
  "SANDWORK_PRESENCE_REPORT_PACKAGE",
  "satisfies FreeCheckReportInput",
  "buildFreeCheckReportSnapshot(SANDWORK_FREE_SCAN_INPUT)",
  "mapLiveScanSnapshotToPresenceReport(SANDWORK_FREE_SCAN_SNAPSHOT",
  "Sandwork",
  "Local service contractor",
  "Clear local service help with a simple request path.",
  "Free Scan remains first signal only.",
  "scoreModules",
  "discoverability",
  "recommendationVisibility",
  "trustAuthority",
  "conversionReadiness",
  "competitiveExposure",
  "preferredCta: \"Request service\"",
]);

expect(protectedPreviewPath, [
  "SANDWORK_PRESENCE_REPORT_PACKAGE",
  "@/lib/sandwork-presence-report-fixture",
]);

expect(dashboardSnapshotPath, [
  "SANDWORK_PRESENCE_REPORT_PACKAGE",
  "@/lib/sandwork-presence-report-fixture",
]);

forbidden(fixturePath, [
  "guaranteed ranking",
  "guaranteed revenue",
  "guaranteed AI placement",
  "rawEvidence",
  "rawReport",
]);

if (failures.length) {
  console.error("Sandwork Presence Report fixture validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Sandwork Presence Report fixture validation passed with shared live-mapper package and no hardcoded component fixture drift.");

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
