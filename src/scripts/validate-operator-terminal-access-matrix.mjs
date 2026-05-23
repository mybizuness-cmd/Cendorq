import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const matrixPath = "src/lib/operator-terminal-access-matrix.ts";

expect(matrixPath, [
  "OperatorTerminalAccessMatrixScenario",
  "OperatorTerminalAccessMatrixResult",
  "OperatorTerminalAccessMatrixSummary",
  "OPERATOR_TERMINAL_ACCESS_MATRIX_SCENARIOS",
  "resolveOperatorTerminalAccessMatrix",
  "resolveOperatorTerminalAccessMatrixScenario",
  "summarizeOperatorTerminalAccessMatrix",
  "resolveOperatorTerminalServerAccess",
  "owner-review-packet-granted",
  "operator-approve-release-granted",
  "support-approve-release-limited",
  "customer-view-terminal-denied",
  "anonymous-view-terminal-denied",
  "operator-release-execution-denied",
  "owner-provider-access-denied",
  "operator-missing-server-bound-session-limited",
  "access-granted",
  "access-limited",
  "access-denied",
  "releaseExecutionAllowed must remain false",
  "providerAccessAllowed must remain false",
  "serverVerifiedIdentity: true",
  "sessionBoundToServer: false",
  "acceptedInternalBoundary: true",
  "expectedPacketReviewAllowed",
  "expectedApprovalAllowed",
  "mismatches",
  "granted",
  "limited",
  "denied",
]);

order(matrixPath, "owner-review-packet-granted", "operator-approve-release-granted");
order(matrixPath, "operator-approve-release-granted", "support-approve-release-limited");
order(matrixPath, "support-approve-release-limited", "customer-view-terminal-denied");
order(matrixPath, "customer-view-terminal-denied", "anonymous-view-terminal-denied");
order(matrixPath, "anonymous-view-terminal-denied", "operator-release-execution-denied");
order(matrixPath, "operator-release-execution-denied", "owner-provider-access-denied");
order(matrixPath, "resolveOperatorTerminalServerAccess(scenario.input)", "releaseExecutionAllowed must remain false");
forbidden(matrixPath, ["cookie", "stripe", "providerAccessToken", "customerSecret"]);

if (failures.length) {
  console.error("Operator terminal access matrix validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Operator terminal access matrix validation passed with owner, operator, support, customer, anonymous, blocked release, blocked provider, and missing server-bound session scenarios.");

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
  const text = read(path).toLowerCase();
  for (const phrase of phrases) if (text.includes(phrase.toLowerCase())) failures.push(`${path} contains forbidden phrase: ${phrase}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
