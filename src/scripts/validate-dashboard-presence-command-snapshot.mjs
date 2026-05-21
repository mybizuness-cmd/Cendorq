import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const componentPath = "src/app/dashboard/dashboard-presence-command-snapshot.tsx";
const pagePath = "src/app/dashboard/page.tsx";
const failures = [];

expect(componentPath, [
  "DashboardPresenceCommandSnapshot",
  "SAMPLE_PRESENCE_REPORT",
  "SAMPLE_CHOICE_GAP",
  "SAMPLE_CONTROL_SNAPSHOT",
  "Presence command snapshot",
  "Presence Score",
  "Choice Gap",
  "Repair Queue",
  "Control Snapshot",
  "Open Free Scan result",
]);

expect(pagePath, [
  "DashboardPresenceCommandSnapshot",
  "Presence command snapshot",
  "Presence Score",
  "Choice Gap",
  "Repair Queue",
  "Control Snapshot",
]);

forbidden(componentPath, [
  "guaranteed ranking",
  "guaranteed revenue",
  "guaranteed AI placement",
  "rawReport",
  "rawEvidence",
]);

if (failures.length) {
  console.error("Dashboard Presence Command Snapshot validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Dashboard Presence Command Snapshot validation passed.");

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
