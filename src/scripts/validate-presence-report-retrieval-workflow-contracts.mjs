import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const path = "src/lib/presence-report-retrieval-workflow-contracts.ts";

expect(path, [
  "PresenceReportRetrievalStage",
  "PresenceReportRetrievalMode",
  "PRESENCE_REPORT_RETRIEVAL_WORKFLOW_CONTRACTS",
  "entry-context",
  "customer-identity",
  "ownership-resolution",
  "evidence-readiness",
  "package-resolution",
  "customer-safe-render",
  "demo-fallback",
  "customer-latest-free-scan",
  "customer-released-report",
  "verified customer email",
  "same-account access gate",
  "server-side scan ownership",
  "paid entitlement for released report",
  "operator note converted before use",
  "package-source helper used",
  "no direct fixture import",
  "fallback reason attached when demo is used",
  "no ranking guarantee",
  "no revenue guarantee",
  "no AI placement guarantee",
  "next move tied to evidence",
  "getPresenceReportRetrievalWorkflowContracts",
  "getPresenceReportRetrievalWorkflowContract",
  "getPresenceReportRetrievalMode",
]);

order(path, "entry-context", "customer-identity");
order(path, "customer-identity", "ownership-resolution");
order(path, "ownership-resolution", "evidence-readiness");
order(path, "evidence-readiness", "package-resolution");
order(path, "package-resolution", "customer-safe-render");
forbidden(path, ["raw intake payload exposed", "blank dashboard allowed", "direct fixture import allowed"]);

if (failures.length) {
  console.error("Presence Report retrieval workflow contracts validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Presence Report retrieval workflow contracts validation passed with customer identity, ownership, evidence readiness, package-source resolution, demo fallback, and customer-safe render gates.");

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

function order(filePath, before, after) {
  if (!existsSync(join(root, filePath))) return;
  const text = read(filePath);
  const beforeIndex = text.indexOf(before);
  const afterIndex = text.indexOf(after);
  if (beforeIndex === -1) failures.push(`${filePath} missing order phrase: ${before}`);
  if (afterIndex === -1) failures.push(`${filePath} missing order phrase: ${after}`);
  if (beforeIndex !== -1 && afterIndex !== -1 && beforeIndex >= afterIndex) failures.push(`${filePath} order violation: ${before} must appear before ${after}`);
}

function read(filePath) {
  return readFileSync(join(root, filePath), "utf8");
}
