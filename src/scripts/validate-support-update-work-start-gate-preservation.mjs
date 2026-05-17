import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const updateApiPath = "src/app/api/customer/support/request/update/route.ts";
const updateFormPath = "src/components/customer-support/support-request-update-form.tsx";
const statusApiPath = "src/app/api/customer/support/status/route.ts";
const statusListPath = "src/components/customer-support/support-status-list.tsx";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-support-update-work-start-gate-preservation.mjs";

expect(updateApiPath, [
  "CENDORQ_WORK_START_GATES",
  "type CendorqWorkStartGateKey",
  "workStartGate: CendorqWorkStartGateKey",
  "workStartPlanKey: string",
  "workStartRequiredBeforeQueue: string[]",
  "workStartBackendStartRule: string",
  "workStartBlockedPattern: string",
  "const workStartGateKey = normalizeWorkStartGate(value.workStartGate) || \"review-intake\"",
  "const workStartGate = getWorkStartGate(workStartGateKey)",
  "const requiredBeforeQueue = normalizeStringArray(value.workStartRequiredBeforeQueue, 120)",
  "workStartGate: workStartGate.key",
  "workStartPlanKey: cleanString(value.workStartPlanKey, 80) || workStartGate.planKey",
  "workStartRequiredBeforeQueue: requiredBeforeQueue.length ? requiredBeforeQueue : [...workStartGate.requiredBeforeQueue]",
  "workStartBackendStartRule: cleanString(value.workStartBackendStartRule, 300) || workStartGate.backendStartRule",
  "workStartBlockedPattern: cleanString(value.workStartBlockedPattern, 220) || workStartGate.blockedPattern",
  "normalizeWorkStartGate(value: unknown): CendorqWorkStartGateKey | null",
  "CENDORQ_WORK_START_GATES.some((gate) => gate.key === value)",
  "getWorkStartGate(key: CendorqWorkStartGateKey): CendorqWorkStartGate",
  "entry.id === supportRequestId && entry.customerIdHash === sessionAccess.customerIdHash",
  "existing.decision !== \"sanitize\"",
  "rawPayloadStored: false",
]);

expect(updateFormPath, [
  "new URL(window.location.href).searchParams.get(\"update\")",
  "Loaded from update link.",
  "Support request ID",
  "Safe update summary",
  "private report internals",
  "rawPayloadStored: false",
  "customerSafeProjectionOnly: true",
]);

expect(statusApiPath, [
  "workStartGate: CendorqWorkStartGateKey",
  "workStartPlanKey: string",
  "workStartRequiredBeforeQueue: string[]",
  "workStartBackendStartRule: string",
  "workStartBlockedPattern: string",
  "projectSupportStatus",
]);

expect(statusListPath, [
  "entry.workStartGate === \"repair-prerequisite\"",
  "entry.workStartGate === \"control-baseline\"",
  "WorkStartGatePanel",
  "buildGatePath(entry)",
]);

expect(routesChainPath, [validatorPath]);

forbidden(updateApiPath, [
  "rawPayloadStored: true",
  "workStartGate: \"review-intake\" as const",
  "workStartPlanKey: \"deep-review\" as const",
  "rawReportPayloadReturned: true",
  "rawPrivatePayloadReturned: true",
  "dangerouslySetInnerHTML",
  "operatorIdentity",
  "riskScoringDetails",
]);

forbidden(updateFormPath, [
  "dangerouslySetInnerHTML",
  "localStorage",
  "sessionStorage",
  "rawReportPayloadReturned: true",
  "rawPrivatePayloadReturned: true",
]);

if (failures.length) {
  console.error("Support update work-start gate preservation validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Support update work-start gate preservation validation passed with verified customer ownership, sanitize-only update flow, preserved work-start metadata, safe update form, and route-chain coverage.");

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
