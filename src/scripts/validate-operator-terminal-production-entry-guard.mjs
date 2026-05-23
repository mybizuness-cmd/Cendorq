import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const guardPath = "src/lib/operator-terminal-production-entry-guard.ts";

expect(guardPath, [
  "OperatorTerminalProductionEntryGateId",
  "OperatorTerminalProductionEntryGate",
  "OperatorTerminalProductionEntryResolution",
  "OPERATOR_TERMINAL_PRODUCTION_ENTRY_GATES",
  "resolveOperatorTerminalProductionEntryGuard",
  "productionEntryAllowed: false",
  "hold-for-production-readiness",
  "verified-operator-identity",
  "route-boundary",
  "role-scope",
  "packet-record-source",
  "approval-audit-trail",
  "release-log-record",
  "rollback-plan",
  "visual-review",
  "missingGateIds",
  "allowedBeforeProduction",
  "forbiddenBeforeProduction",
]);

order(guardPath, "verified-operator-identity", "route-boundary");
order(guardPath, "route-boundary", "role-scope");
order(guardPath, "role-scope", "packet-record-source");
order(guardPath, "packet-record-source", "approval-audit-trail");
order(guardPath, "approval-audit-trail", "release-log-record");
order(guardPath, "release-log-record", "rollback-plan");
order(guardPath, "rollback-plan", "visual-review");
forbidden(guardPath, ["productionEntryAllowed: true", "providerAccessToken", "stripe"]);

if (failures.length) {
  console.error("Operator terminal production entry guard validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Operator terminal production entry guard validation passed.");

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
