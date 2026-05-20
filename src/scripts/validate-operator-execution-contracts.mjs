import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const contractPath = "src/lib/command-center/operator-execution-contracts.ts";
const failures = [];

expect(contractPath, [
  "OperatorExecutionCommandKey",
  "OperatorExecutionRiskLevel",
  "OperatorExecutionContract",
  "OPERATOR_EXECUTION_CONTRACTS",
  "OPERATOR_EXECUTION_SAFETY_STANDARD",
  "getOperatorExecutionContract",
  "assign-agent-mission",
  "submit-agent-finding",
  "request-release-review",
  "approve-customer-safe-report",
  "publish-dashboard-projection",
  "queue-customer-notification",
  "hold-billing-or-entitlement",
  "escalate-support-review",
  "release-critical",
  "requiredBeforeExecution",
  "allowedStateTransitions",
  "blockedInputs",
  "auditEvents",
  "customerProjectionRule",
]);

expect(contractPath, [
  "Release-critical commands require release-captain approval before customer-facing publication.",
  "Every customer-visible change must be traceable to an audit event and a customer-safe projection rule.",
  "No customer-facing report, notification, or dashboard update may be published from a release request alone.",
  "Only approved customer-safe report versions may appear in the report vault or customer email attachment flow.",
]);

forbidden(contractPath, [
  "auto approve",
  "auto-publish",
  "rawEmailReturned: true",
  "rawSessionReturned: true",
  "rawReportReturned: true",
  "rawEvidenceReturned: true",
  "guaranteed ROI",
  "guaranteed AI placement",
  "liability-free",
  "skip release",
]);

if (failures.length) {
  console.error("Operator execution contracts validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Operator execution contracts validation passed.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = read(path);
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}

function forbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path).toLowerCase();
  for (const phrase of phrases) if (text.includes(phrase.toLowerCase())) failures.push(`${path} contains forbidden phrase: ${phrase}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
