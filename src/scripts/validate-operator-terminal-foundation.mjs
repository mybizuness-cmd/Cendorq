import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const modelPath = "src/lib/operator-terminal-foundation.ts";
const runtimePath = "src/lib/operator-terminal-packet-runtime.ts";
const accessSafetyPath = "src/lib/operator-terminal-access-safety.ts";
const serverGatePath = "src/lib/operator-terminal-server-access-gate.ts";
const accessMatrixPath = "src/lib/operator-terminal-access-matrix.ts";
const routePath = "src/app/operator-terminal/page.tsx";

expect(modelPath, [
  "OperatorTerminalLaneId",
  "OperatorTerminalLane",
  "OperatorTerminalPacket",
  "OPERATOR_TERMINAL_LANES",
  "OPERATOR_TERMINAL_SAMPLE_PACKETS",
  "getOperatorTerminalLanes",
  "getOperatorTerminalLane",
  "getOperatorTerminalSamplePackets",
  "command-queue",
  "business-truth-profile",
  "evidence-console",
  "finding-builder",
  "repair-composer",
  "approval-gate",
  "release-log",
  "release-ready",
  "needs-review",
  "release-blocked",
  "Open highest-risk packet",
  "Resolve fact boundaries",
  "Review evidence readiness",
  "Draft bounded finding",
  "Compose repair scope",
  "Approve or block release",
  "Write release record",
]);

expect(runtimePath, [
  "resolveOperatorTerminalPacketRuntimeBatch",
  "toOperatorApprovalPacket",
  "resolveOperatorApprovalFlow",
  "operatorNotice",
  "safeNextAction",
  "releaseReady",
  "needsReview",
  "releaseBlocked",
]);

expect(accessSafetyPath, [
  "getOperatorTerminalAccessSafety",
  "isOperatorTerminalReleaseExecutionAllowed",
  "sample-only",
  "operatorOnly: true",
  "customerFacingAllowed: false",
  "liveCustomerDataAllowed: false",
  "releaseExecutionAllowed: false",
  "providerAccessAllowed: false",
]);

expect(serverGatePath, [
  "resolveOperatorTerminalServerAccess",
  "OperatorTerminalServerAccessInput",
  "access-granted",
  "access-limited",
  "access-denied",
  "serverVerifiedIdentity",
  "sessionBoundToServer",
  "acceptedInternalBoundary",
  "releaseExecutionAllowed: false",
  "providerAccessAllowed: false",
]);

expect(accessMatrixPath, [
  "resolveOperatorTerminalAccessMatrix",
  "summarizeOperatorTerminalAccessMatrix",
  "owner-review-packet-granted",
  "operator-approve-release-granted",
  "support-approve-release-limited",
  "customer-view-terminal-denied",
  "anonymous-view-terminal-denied",
  "operator-release-execution-denied",
  "owner-provider-access-denied",
  "operator-missing-server-bound-session-limited",
]);

expect(routePath, [
  "OperatorTerminalPage",
  "resolveOperatorTerminalAccessMatrix",
  "summarizeOperatorTerminalAccessMatrix",
  "accessMatrix",
  "accessMatrixSummary",
  "getOperatorTerminalAccessSafety",
  "accessSafety",
  "resolveOperatorTerminalServerAccess",
  "serverAccess",
  "role: \"operator\"",
  "serverVerifiedIdentity: true",
  "sessionBoundToServer: true",
  "acceptedInternalBoundary: true",
  "requestedAction: \"review-packet\"",
  "getOperatorTerminalLanes",
  "getOperatorTerminalSamplePackets",
  "resolveOperatorTerminalPacketRuntimeBatch",
  "packetRuntime",
  "runtimePacket.visibleState",
  "runtimePacket.approvalResolution.nextGate",
  "runtimePacket.approvalResolution.evidenceSummary.customerReady",
  "runtimePacket.operatorNotice",
  "runtimePacket.safeNextAction",
  "Internal operator terminal",
  "Approve evidence before customer release.",
  "Operator terminal access safety",
  "Access safety is sample-only until server-owned gating exists.",
  "Server access gate",
  "Server-owned gate status:",
  "Access decision matrix",
  "Role and action coverage is checked before live auth wiring.",
  "accessMatrixSummary.passed",
  "accessMatrixSummary.failed",
  "accessMatrixSummary.total",
  "result.resolution.state",
  "serverAccess.reason",
  "serverAccess.terminalVisible",
  "serverAccess.packetReviewAllowed",
  "serverAccess.approvalAllowed",
  "serverAccess.releaseExecutionAllowed",
  "serverAccess.providerAccessAllowed",
  "Disabled actions",
  "Allowed sample actions",
  "Operator release lanes",
  "Command Queue",
  "Approval Gate",
  "Release Log",
]);

order(modelPath, "command-queue", "business-truth-profile");
order(modelPath, "business-truth-profile", "evidence-console");
order(modelPath, "evidence-console", "finding-builder");
order(modelPath, "finding-builder", "repair-composer");
order(modelPath, "repair-composer", "approval-gate");
order(modelPath, "approval-gate", "release-log");
order(routePath, "const accessSafety = getOperatorTerminalAccessSafety();", "const serverAccess = resolveOperatorTerminalServerAccess");
order(routePath, "const serverAccess = resolveOperatorTerminalServerAccess", "const accessMatrix = resolveOperatorTerminalAccessMatrix();");
order(routePath, "const accessMatrix = resolveOperatorTerminalAccessMatrix();", "const lanes = getOperatorTerminalLanes();");
order(routePath, "Internal operator terminal", "Operator terminal access safety");
order(routePath, "Operator terminal access safety", "Server access gate");
order(routePath, "Server access gate", "Access decision matrix");
order(routePath, "Access decision matrix", "Operator release lanes");
order(routePath, "Operator release lanes", "Command Queue");
order(routePath, "Command Queue", "Approval Gate");
order(routePath, "resolveOperatorTerminalPacketRuntimeBatch", "packetRuntime.packets.map");

forbidden(routePath, [
  "guaranteed ranking",
  "guaranteed revenue",
  "guaranteed AI placement",
  "customer-facing terminal",
  "public operator terminal",
  "executeRelease(",
  "providerAccessToken",
]);

if (failures.length) {
  console.error("Operator terminal foundation validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Operator terminal foundation validation passed with lane model, packet runtime integration, access-safety boundary, server access gate, access decision matrix, internal route, command queue, approval gate, release log, and customer-safe boundary coverage.");

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
