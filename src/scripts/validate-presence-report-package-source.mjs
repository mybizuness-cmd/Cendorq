import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const helperPath = "src/lib/presence-report-package-source.ts";
const contractPath = "src/lib/presence-report-customer-source-contracts.ts";
const objectIndexPath = "src/lib/presence-report-object-index.ts";
const protectedPreviewPath = "src/components/presence-report/protected-free-scan-result-preview.tsx";
const dashboardSnapshotPath = "src/app/dashboard/dashboard-presence-command-snapshot.tsx";
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

expect(helperPath, [
  "PresenceReportPackageSource",
  "PresenceReportPackageSourceResolution",
  "resolvePresenceReportPackageSource",
  "getPresenceReportPackage",
  "getPresenceReportCustomerSourceContract",
  "PRESENCE_REPORT_OBJECT_INDEX",
  "demoReportPackage",
  "resolvedSource: \"demo\"",
  "fallbackReason",
  "server-side customer ownership and release storage are wired",
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
forbidden(contractPath, ["raw intake payload exposed", "draft report exposed", "operator notes exposed"]);

if (failures.length) {
  console.error("Presence Report package source validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Presence Report package source validation passed with customer source contracts, object-index-backed demo fallback, future customer latest Free Scan and released report source kinds, and no direct fixture imports in consuming surfaces.");

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