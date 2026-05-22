import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const pagePath = "src/app/dashboard/reports/free-scan/page.tsx";
const componentPath = "src/components/presence-report/protected-free-scan-result-preview.tsx";
const fixturePath = "src/lib/sandwork-presence-report-fixture.ts";
const packageSourcePath = "src/lib/presence-report-package-source.ts";
const renderRuntimePath = "src/lib/presence-report-customer-safe-render-runtime.ts";
const indexPath = "src/components/presence-report/index.ts";
const failures = [];

expect(pagePath, [
  "ProtectedFreeScanResultPreview",
  "The first Free Scan Presence Report is ready.",
  "Protected Free Scan Presence Report standard",
  "First signal only",
  "Read Free Scan report first",
  "free-scan-presence-report",
  "Proof before paid pressure",
  "Open Review page",
  "Use Deep Review only when the Free Scan signal matters enough to prove the cause before repair or control.",
]);

expect(componentPath, [
  "ProtectedFreeScanResultPreview",
  "resolvePresenceReportPackageSource",
  "resolvePresenceReportCustomerSafeRender",
  "packageResolution",
  "renderResolution",
  "renderResolution.package ?? packageResolution.package",
  "protected-free-scan",
  "requestedAction: \"preview\"",
  "Customer-safe render gate",
  "renderResolution.state",
  "renderResolution.customerSafeNotice",
  "packageSource.report",
  "packageSource.choiceGap",
  "Presence Score",
  "First weak point",
  "Top repair priorities",
  "Protected Free Scan result",
]);

expect(packageSourcePath, [
  "resolvePresenceReportPackageSource",
  "getPresenceReportPackage",
  "PRESENCE_REPORT_OBJECT_INDEX",
  "demoReportPackage",
]);

expect(renderRuntimePath, [
  "resolvePresenceReportCustomerSafeRender",
  "render-ready",
  "render-demo-fallback",
  "render-blocked",
  "customerSafeNotice",
  "allowedSections",
  "blockedSections",
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

order(pagePath, "Read Free Scan report first", "id=\"free-scan-presence-report\"");
order(pagePath, "id=\"free-scan-presence-report\"", "Proof before paid pressure");
order(pagePath, "Proof before paid pressure", "Open Review page");
order(componentPath, "resolvePresenceReportPackageSource", "resolvePresenceReportCustomerSafeRender");
order(componentPath, "Customer-safe render gate", "Protected Free Scan result");

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

console.log("Protected Free Scan Presence Result validation passed with customer-safe render gate, package-source helper, shared fixture boundary, first-signal positioning, and proof-before-paid-pressure CTA order.");

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
