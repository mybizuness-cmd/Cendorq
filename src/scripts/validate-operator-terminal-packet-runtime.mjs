import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const runtimePath = "src/lib/operator-terminal-packet-runtime.ts";

expect(runtimePath, [
  "OperatorTerminalPacketRuntimeInput",
  "OperatorTerminalPacketRuntimeResolution",
  "resolveOperatorTerminalPacketRuntime",
  "resolveOperatorTerminalPacketRuntimeBatch",
  "toOperatorApprovalPacket",
  "resolveOperatorApprovalFlow",
  "OperatorApprovalPacket",
  "OperatorApprovalFlowResolution",
  "buildEvidenceReadinessFromCounts",
  "visible-public-signal",
  "operator-note",
  "release-ready",
  "needs-review",
  "release-blocked",
  "releaseReady",
  "releaseBlocked",
  "operatorNotice",
  "safeNextAction",
  "Packet can move to release log after the required approval record is complete.",
  "Packet cannot release until blocked evidence or unsupported output is removed.",
  "Write release log before customer visibility changes.",
  "Keep packet blocked and remove unsafe evidence before retrying approval.",
]);

order(runtimePath, "toOperatorApprovalPacket", "resolveOperatorApprovalFlow");
order(runtimePath, "releaseReady", "needsReview");
order(runtimePath, "needsReview", "releaseBlocked");
forbidden(runtimePath, ["liveCustomerData", "paymentState", "providerAccess", "executeRelease"]);

if (failures.length) {
  console.error("Operator terminal packet runtime validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Operator terminal packet runtime validation passed with approval packet conversion, evidence readiness count projection, approval flow resolution, state buckets, operator notice, and safe next action coverage.");

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
