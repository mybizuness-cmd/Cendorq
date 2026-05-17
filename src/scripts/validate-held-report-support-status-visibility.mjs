import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const presetValidatorPath = "src/scripts/validate-held-report-support-presets.mjs";
const statusApiPath = "src/app/api/customer/support/status/route.ts";
const statusListPath = "src/components/customer-support/support-status-list.tsx";
const statusPagePath = "src/app/dashboard/support/status/page.tsx";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-held-report-support-status-visibility.mjs";

expect(presetValidatorPath, [
  "Deep Review held report",
  "Build Fix held summary",
  "Ongoing Control held summary",
  "requestType: \\\"report-question\\\"",
  "workStartGate: \\\"review-intake\\\"",
  "workStartGate: \\\"repair-prerequisite\\\"",
  "workStartGate: \\\"control-baseline\\\"",
]);

expect(statusApiPath, [
  "requireCustomerSession(request, { requireVerifiedEmail: true })",
  "const ownedEntries = envelope.entries.filter((entry) => entry.customerIdHash === sessionAccess.customerIdHash);",
  "normalizeRequestType(request.nextUrl.searchParams.get(\"requestType\"))",
  "normalizeWorkStartGate(request.nextUrl.searchParams.get(\"workStartGate\"))",
  "CENDORQ_WORK_START_GATES.some((gate) => gate.key === value)",
  "report-question",
  "safeSummary",
  "rawPayloadStored: false",
  "customerOwnershipRequired: true",
  "supportAuditRequired: true",
]);

expect(statusListPath, [
  "fetch(\"/api/customer/support/status\"",
  "buildGatePath(entry)",
  "entry.workStartGate === \"repair-prerequisite\"",
  "entry.workStartGate === \"control-baseline\"",
  "Status is shown through customer-safe projection only.",
  "Internal notes, operator identities, risk-scoring details, raw evidence, billing data, session tokens, and support secrets are never displayed here.",
]);

expect(statusPagePath, [
  "SupportStatusList",
  "Show progress without exposing internals.",
  "Status tracking should never reveal raw evidence, security payloads, billing data, secrets, prompts, or tokens.",
]);

expect(routesChainPath, [validatorPath]);

forbidden(statusApiPath, [
  "rawPayloadStored: true",
  "rawReportPayloadReturned: true",
  "rawPrivatePayloadReturned: true",
  "operatorIdentity",
  "riskScoringDetails",
  "privateReportInternals",
  "dangerouslySetInnerHTML",
]);

forbidden(statusListPath, [
  "dangerouslySetInnerHTML",
  "localStorage",
  "sessionStorage",
  "rawReportPayloadReturned: true",
  "rawPrivatePayloadReturned: true",
  "operatorIdentity",
  "riskScoringDetails",
]);

if (failures.length) {
  console.error("Held report support status visibility validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Held report support status visibility validation passed with customer-owned status filtering, shared gate-registry support, held-report request visibility, safe projections, and route-chain coverage.");

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

function forbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  for (const phrase of phrases) {
    if (text.includes(phrase)) failures.push(`${path} contains forbidden phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
