import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const path = "src/lib/operator-approval-flow-runtime.ts";

expect(path, [
  "OperatorApprovalFlowState",
  "OperatorApprovalPacket",
  "OperatorApprovalFlowResolution",
  "resolveOperatorApprovalFlow",
  "getNextOperatorStage",
  "getOperatorApprovalRequiredEvidenceKinds",
  "getOperatorReleaseGateContract",
  "release-ready",
  "needs-review",
  "release-blocked",
  "command-queue",
  "business-truth-profile",
  "evidence-console",
  "finding-builder",
  "repair-composer",
  "approval-gate",
  "release-log",
  "completedChecks",
  "approvedOutputs",
  "approvalActor",
  "approvalTime",
  "releaseNote",
  "missingChecks",
  "blockedOutputs",
  "customerSafeReleaseNote",
  "releaseLogRequired",
  "customerReady",
  "needsReview",
  "blocked",
  "approval actor",
  "approval time",
  "customer-safe release note",
]);

order(path, "command-queue", "business-truth-profile");
order(path, "business-truth-profile", "evidence-console");
order(path, "evidence-console", "finding-builder");
order(path, "finding-builder", "repair-composer");
order(path, "repair-composer", "approval-gate");
order(path, "approval-gate", "release-log");
forbidden(path, ["rawEvidence", "privateScoring", "guaranteedOutcome"]);

if (failures.length) {
  console.error("Operator approval flow runtime validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Operator approval flow runtime validation passed with stage order, release-ready, needs-review, release-blocked, evidence summary, missing checks, release log, and customer-safe note coverage.");

function expect(filePath, phrases) {
  if (!existsSync(join(root, filePath))) {
    failures.push(`Missing dependency: ${filePath}`);
    return;
  }
  const text = read(filePath);
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${filePath} missing phrase: ${phrase}`);
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

function forbidden(filePath, phrases) {
  if (!existsSync(join(root, filePath))) return;
  const text = read(filePath);
  for (const phrase of phrases) if (text.includes(phrase)) failures.push(`${filePath} contains forbidden phrase: ${phrase}`);
}

function read(filePath) {
  return readFileSync(join(root, filePath), "utf8");
}
