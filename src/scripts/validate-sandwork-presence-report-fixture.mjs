import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const fixturePath = "src/lib/sandwork-presence-report-fixture.ts";
const packageSourcePath = "src/lib/presence-report-package-source.ts";
const renderRuntimePath = "src/lib/presence-report-customer-safe-render-runtime.ts";
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

expect(packageSourcePath, [
  "getPresenceReportPackage",
  "resolvePresenceReportPackageSource",
  "PRESENCE_REPORT_OBJECT_INDEX",
  "demoReportPackage",
]);

expect(renderRuntimePath, [
  "resolvePresenceReportCustomerSafeRender",
  "render-demo-fallback",
  "customerSafeNotice",
]);

expect(protectedPreviewPath, [
  "resolvePresenceReportPackageSource",
  "resolvePresenceReportCustomerSafeRender",
  "@/lib/presence-report-package-source",
  "@/lib/presence-report-customer-safe-render-runtime",
]);

expect(dashboardSnapshotPath, [
  "getPresenceReportPackage",
  "@/lib/presence-report-package-source",
]);

order(protectedPreviewPath, "resolvePresenceReportPackageSource", "resolvePresenceReportCustomerSafeRender");

forbidden(fixturePath, [
  "guaranteed ranking",
  "guaranteed revenue",
  "guaranteed AI placement",
  "rawEvidence",
  "rawReport",
]);

forbidden(protectedPreviewPath, ["@/lib/sandwork-presence-report-fixture"]);
forbidden(dashboardSnapshotPath, ["@/lib/sandwork-presence-report-fixture"]);

if (failures.length) {
  console.error("Sandwork Presence Report fixture validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Sandwork Presence Report fixture validation passed with shared live-mapper package, protected render-gated package resolution, package-source consumption, and no hardcoded component fixture drift.");

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

function order(path, before, after) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  const beforeIndex = text.indexOf(before);
  const afterIndex = text.indexOf(after);
  if (beforeIndex === -1) failures.push(`${path} missing order phrase: ${before}`);
  if (afterIndex === -1) failures.push(`${path} missing order phrase: ${after}`);
  if (beforeIndex !== -1 && afterIndex !== -1 && beforeIndex >= afterIndex) failures.push(`${path} order violation: ${before} must appear before ${after}`);
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
