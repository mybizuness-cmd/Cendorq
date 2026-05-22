import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const helperPath = "src/lib/presence-report-package-source.ts";
const contractPath = "src/lib/presence-report-customer-source-contracts.ts";
const snapshotSourcePath = "src/lib/presence-report-free-scan-snapshot-source.ts";
const objectIndexPath = "src/lib/presence-report-object-index.ts";
const protectedPreviewPath = "src/components/presence-report/protected-free-scan-result-preview.tsx";
const dashboardSnapshotPath = "src/app/dashboard/dashboard-presence-command-snapshot.tsx";
const renderRuntimePath = "src/lib/presence-report-customer-safe-render-runtime.ts";
const failures = [];

expect(contractPath, [
  "PresenceReportPackageSourceKind",
  "customer-latest-free-scan",
  "customer-released-report",
  "pending-storage",
  "requires-customer-ownership",
  "requires-release-approval",
  "PRESENCE_REPORT_CUSTOMER_SOURCE_CONTRACTS",
  "verified customer email",
  "server-side scan ownership",
  "same-account access gate",
  "released report ownership",
  "operator approval gate",
  "getPresenceReportCustomerSourceContracts",
  "getPresenceReportCustomerSourceContract",
]);

expect(snapshotSourcePath, [
  "FreeScanSnapshotOwnershipProof",
  "FreeScanSnapshotRecord",
  "FreeScanSnapshotRetrievalResolution",
  "resolveCustomerLatestFreeScanSnapshotPackage",
  "verified customer email",
  "server-side scan ownership",
  "same-account access gate",
  "customer-owned Free Scan snapshot",
  "resolved-customer-snapshot",
  "blocked-needs-ownership",
  "blocked-missing-snapshot",
  "mapLiveScanSnapshotToPresenceReport(record.snapshot, record.generationInput)",
]);

expect(helperPath, [
  "PresenceReportPackageSource",
  "PresenceReportPackageSourceOptions",
  "PresenceReportPackageSourceResolution",
  "resolvePresenceReportPackageSource",
  "getPresenceReportPackage",
  "getPresenceReportCustomerSourceContract",
  "resolveCustomerLatestFreeScanSnapshotPackage",
  "PRESENCE_REPORT_OBJECT_INDEX",
  "demoReportPackage",
  "resolvedSource: \"demo\"",
  "resolvedSource: \"customer-latest-free-scan\"",
  "fallbackReason",
  "retrievalReason",
  "blockedGates",
  "server-side customer ownership and release storage are wired",
  "source: PresenceReportPackageSource = \"demo\"",
  "latestFreeScanRecord",
  "ownershipProof",
]);

expect(objectIndexPath, [
  "SANDWORK_PRESENCE_REPORT_PACKAGE",
  "demoReportPackage",
]);

expect(renderRuntimePath, [
  "resolvePresenceReportCustomerSafeRender",
  "render-ready",
  "render-demo-fallback",
  "render-blocked",
  "customerSafeNotice",
]);

expect(protectedPreviewPath, [
  "resolvePresenceReportPackageSource",
  "@/lib/presence-report-package-source",
  "resolvePresenceReportCustomerSafeRender",
  "@/lib/presence-report-customer-safe-render-runtime",
  "const packageResolution = resolvePresenceReportPackageSource()",
  "const renderResolution = resolvePresenceReportCustomerSafeRender",
  "const packageSource = renderResolution.package ?? packageResolution.package",
]);

expect(dashboardSnapshotPath, [
  "getPresenceReportPackage",
  "@/lib/presence-report-package-source",
  "const packageSource = getPresenceReportPackage()",
]);

order(protectedPreviewPath, "resolvePresenceReportPackageSource", "resolvePresenceReportCustomerSafeRender");
forbidden(protectedPreviewPath, ["@/lib/sandwork-presence-report-fixture"]);
forbidden(dashboardSnapshotPath, ["@/lib/sandwork-presence-report-fixture"]);
forbidden(contractPath, ["raw intake payload exposed", "draft report exposed", "operator notes exposed"]);

if (failures.length) {
  console.error("Presence Report package source validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Presence Report package source validation passed with customer source contracts, customer-owned Free Scan snapshot retrieval, protected render-gated package resolution, object-index-backed demo fallback, released report fallback, and no direct fixture imports in consuming surfaces.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = read(path);
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
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
  const text = read(path);
  for (const phrase of phrases) if (text.includes(phrase)) failures.push(`${path} contains forbidden phrase: ${phrase}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
