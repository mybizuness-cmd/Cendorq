import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const formPath = "src/components/customer-support/support-request-form.tsx";
const requestApiPath = "src/app/api/customer/support/request/route.ts";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-held-report-support-presets.mjs";

expect(formPath, [
  "HeldReportPreset",
  "HELD_REPORT_PRESETS",
  "Deep Review held report",
  "Build Fix held summary",
  "Ongoing Control held summary",
  "applyHeldReportPreset",
  "requestType: \"report-question\"",
  "customerAcknowledgement: true",
  "workStartGate: \"review-intake\"",
  "workStartGate: \"repair-prerequisites\"",
  "workStartGate: \"control-baseline\"",
  "Presets never include private report content, raw evidence, or internal notes.",
  "No private report content. No raw evidence. No internal notes.",
]);

expect(requestApiPath, [
  "requireCustomerSession(request",
  "requireVerifiedEmail: true",
  "rawPayloadStored: false",
  "private report internals",
  "report-question",
  "safeSummary",
  "operatorReviewRequired",
]);

expect(routesChainPath, [validatorPath]);

forbidden(formPath, [
  "dangerouslySetInnerHTML",
  "localStorage",
  "sessionStorage",
  "rawReportPayloadReturned: true",
  "rawPrivatePayloadReturned: true",
  "private report internals.",
  "raw internal notes.",
  "raw evidence.",
]);

forbidden(requestApiPath, [
  "rawPayloadStored: true",
  "customerIdHash, ...rest",
  "password:",
  "card number:",
  "privateKey",
  "dangerouslySetInnerHTML",
]);

if (failures.length) {
  console.error("Held report support preset validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Held report support preset validation passed with safe paid-report escalation presets, verified support API intake, no raw/private report content, and route-chain coverage.");

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
