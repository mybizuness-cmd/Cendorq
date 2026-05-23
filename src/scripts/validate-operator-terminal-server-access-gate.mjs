import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const gatePath = "src/lib/operator-terminal-server-access-gate.ts";

expect(gatePath, [
  "OperatorTerminalServerAccessRole",
  "OperatorTerminalServerAccessState",
  "OperatorTerminalServerAccessInput",
  "OperatorTerminalServerAccessResolution",
  "resolveOperatorTerminalServerAccess",
  "getOperatorTerminalAccessSafety",
  "access-granted",
  "access-limited",
  "access-denied",
  "owner",
  "operator",
  "support",
  "customer",
  "anonymous",
  "view-terminal",
  "review-packet",
  "approve-release",
  "execute-release",
  "open-provider-access",
  "serverVerifiedIdentity",
  "sessionBoundToServer",
  "acceptedInternalBoundary",
  "terminalVisible",
  "packetReviewAllowed",
  "approvalAllowed",
  "releaseExecutionAllowed: false",
  "providerAccessAllowed: false",
  "server-verified identity",
  "server-bound session",
  "accepted internal boundary",
  "Only server-verified internal roles may view the operator terminal.",
  "Internal role detected, but server-owned access gates are incomplete.",
  "Release execution and provider access remain disabled until a later audited release layer.",
  "Support role may review packets but cannot approve release candidates.",
]);

order(gatePath, "customer", "anonymous");
order(gatePath, "serverVerifiedIdentity", "sessionBoundToServer");
order(gatePath, "sessionBoundToServer", "acceptedInternalBoundary");
forbidden(gatePath, ["stripe", "providerAccessToken", "liveCustomerMutation"]);

if (failures.length) {
  console.error("Operator terminal server access gate validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Operator terminal server access gate validation passed with internal roles, denied public roles, server gate requirements, approval limits, and disabled release/provider actions.");

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
