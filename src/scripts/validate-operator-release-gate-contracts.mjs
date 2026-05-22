import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const path = "src/lib/operator-release-gate-contracts.ts";

expect(path, [
  "OperatorReleaseGateStage",
  "OPERATOR_RELEASE_GATE_CONTRACTS",
  "command-queue",
  "business-truth-profile",
  "evidence-console",
  "finding-builder",
  "repair-composer",
  "approval-gate",
  "release-log",
  "Command Queue",
  "Business Truth Profile",
  "Evidence Console",
  "Finding Builder",
  "Repair Composer",
  "Approval Gate",
  "Release Log",
  "operator approval",
  "release gate",
  "customer-safe rewrite",
  "released Presence Report package",
  "approved repair queue",
  "draft report",
  "unapproved finding",
  "raw evidence",
  "operator notes",
  "private scoring internals",
  "ranking promise",
  "lead promise",
  "revenue promise",
  "AI placement promise",
  "getOperatorReleaseGateContracts",
  "getOperatorReleaseGateContract",
]);

order(path, "command-queue", "business-truth-profile");
order(path, "business-truth-profile", "evidence-console");
order(path, "evidence-console", "finding-builder");
order(path, "finding-builder", "repair-composer");
order(path, "repair-composer", "approval-gate");
order(path, "approval-gate", "release-log");
forbidden(path, ["raw evidence allowed", "operator notes allowed", "guaranteed outcome"]);

if (failures.length) {
  console.error("Operator release gate contracts validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Operator release gate contracts validation passed with command queue, business truth profile, evidence console, finding builder, repair composer, approval gate, release log, and customer-safe exit criteria.");

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
