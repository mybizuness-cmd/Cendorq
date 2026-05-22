import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const path = "src/lib/presence-report-customer-safe-render-runtime.ts";

expect(path, [
  "PresenceReportCustomerSafeRenderInput",
  "PresenceReportCustomerSafeRenderState",
  "PresenceReportCustomerSafeRenderResolution",
  "resolvePresenceReportCustomerSafeRender",
  "PresenceReportPackageSourceResolution",
  "PresenceReportEvidenceReadinessResolution",
  "render-ready",
  "render-demo-fallback",
  "render-blocked",
  "protected-free-scan",
  "report-vault",
  "customer-dashboard",
  "Presence Score",
  "Pillars",
  "Choice Gap",
  "Repair Queue",
  "Control Snapshot",
  "Recommended Next Move",
  "Raw Evidence",
  "Internal Notes",
  "Private Scoring",
  "Draft Findings",
  "approval-gate",
  "evidence-readiness",
  "customer-safe-render",
  "customerReady",
  "needsReview",
  "blocked",
  "customerSafeNotice",
  "allowedSections",
  "blockedSections",
  "nextGate",
]);

forbidden(path, ["rawEvidence", "operatorNotes", "privateScoring"]);

if (failures.length) {
  console.error("Presence Report customer-safe render runtime validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Presence Report customer-safe render runtime validation passed with render-ready, render-demo-fallback, render-blocked, evidence summary, allowed sections, blocked sections, next gate, and safe notice coverage.");

function expect(filePath, phrases) {
  if (!existsSync(join(root, filePath))) {
    failures.push(`Missing dependency: ${filePath}`);
    return;
  }
  const text = read(filePath);
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${filePath} missing phrase: ${phrase}`);
}

function forbidden(filePath, phrases) {
  if (!existsSync(join(root, filePath))) return;
  const text = read(filePath);
  for (const phrase of phrases) if (text.includes(phrase)) failures.push(`${filePath} contains forbidden phrase: ${phrase}`);
}

function read(filePath) {
  return readFileSync(join(root, filePath), "utf8");
}
