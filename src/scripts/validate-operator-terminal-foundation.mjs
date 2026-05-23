import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const modelPath = "src/lib/operator-terminal-foundation.ts";
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

expect(routePath, [
  "OperatorTerminalPage",
  "getOperatorTerminalLanes",
  "getOperatorTerminalSamplePackets",
  "Internal operator terminal",
  "Approve evidence before customer release.",
  "Operator release lanes",
  "Command Queue",
  "Business Truth Profile",
  "Evidence Console",
  "Finding Builder",
  "Repair Composer",
  "Approval Gate",
  "Release Log",
  "No raw evidence, unapproved findings, operator notes, or unsupported certainty leaves this terminal.",
  "Packets waiting on safe next gates.",
  "Release only after evidence, finding, repair, and approval gates pass.",
  "Must produce a customer-safe output or stay blocked.",
]);

order(modelPath, "command-queue", "business-truth-profile");
order(modelPath, "business-truth-profile", "evidence-console");
order(modelPath, "evidence-console", "finding-builder");
order(modelPath, "finding-builder", "repair-composer");
order(modelPath, "repair-composer", "approval-gate");
order(modelPath, "approval-gate", "release-log");
order(routePath, "Internal operator terminal", "Operator release lanes");
order(routePath, "Operator release lanes", "Command Queue");
order(routePath, "Command Queue", "Approval Gate");

forbidden(routePath, [
  "guaranteed ranking",
  "guaranteed revenue",
  "guaranteed AI placement",
  "customer-facing terminal",
  "public operator terminal",
]);

if (failures.length) {
  console.error("Operator terminal foundation validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Operator terminal foundation validation passed with lane model, internal route, command queue, approval gate, release log, and customer-safe boundary coverage.");

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
