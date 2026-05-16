import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-customer-support-request-page.mjs";

expect("src/app/dashboard/support/page.tsx", [
  "Start protected request",
  "/dashboard/support/request",
  "Use safe summaries only: no passwords, card data, private keys, session tokens, raw attack strings, or unrelated private evidence.",
]);

expect("src/app/dashboard/support/request/page.tsx", [
  "Market resolution intake",
  "noIndex: true",
  "Send the safe summary that moves the blocker forward.",
  "Intake should collect enough context to help without turning into a private data dump, duplicate request loop, or command-depth shortcut.",
  "SupportRequestForm",
  "SupportRequestUpdateForm",
  "CUSTOMER_SUPPORT_INTAKE_FLOWS",
  "CUSTOMER_SUPPORT_INTAKE_RISK_RULES",
  "Do not paste passwords, card numbers, bank details, private keys, raw tokens, session tokens, or admin keys.",
  "Do not paste raw attack strings, prompt-injection text, raw evidence dumps, or private report internals.",
  "After submission, track status and notifications instead of creating duplicate requests.",
  "Check work-start gates",
  "Start safe request",
  "Gate the queue.",
  "What Cendorq needs before backend work starts.",
  "Enough context. No secrets.",
  "Do not create duplicate noise.",
  "Use update mode only when the status page asks for safer customer context.",
  "Check status first",
]);

expect("src/components/customer-support/support-request-form.tsx", [
  "use client",
  "SupportRequestForm",
  "CUSTOMER_SUPPORT_INTAKE_FLOWS",
  "requestType",
  "businessContext",
  "safeDescription",
  "customerAcknowledgement",
  "/api/customer/support/request",
  "Submit protected intake",
  "Track this request safely",
  "/dashboard/support/status",
  "Back to support center",
  "Status tracking uses customer-safe projection only and never reveals internal notes, operator identities, risk-scoring details, raw evidence, billing data, session tokens, or support secrets.",
  "The support request service could not be reached right now.",
  "Do not include passwords, raw tokens, payment data, secrets, private keys, raw evidence dumps, raw security payloads, or private report internals.",
  "I confirm this request does not include passwords, raw tokens, payment details, secrets, private keys, raw evidence dumps, raw security payloads, or private report internals.",
]);

expect("src/components/customer-support/support-request-update-form.tsx", [
  "use client",
  "SupportRequestUpdateForm",
  "supportRequestId",
  "safeUpdateSummary",
  "customerAcknowledgement",
  "/api/customer/support/request/update",
  "new URL(window.location.href).searchParams.get(\"update\")",
  "Use this panel when support status asks for a safer customer summary.",
  "Update a waiting support request safely.",
  "Summarize what changed without pasting passwords, tokens, payment data, raw evidence, raw security payloads, or private report internals.",
  "Cendorq does not show rejected raw content here and does not ask you to paste sensitive records again.",
  "Submit safe update",
  "Back to support status",
  "Track updated request",
  "rawPayloadStored",
  "customerSafeProjectionOnly",
  "The support update service could not be reached right now.",
  "I confirm this update does not include passwords, raw tokens, payment details, secrets, private keys, raw evidence dumps, raw security payloads, or private report internals.",
]);

expect("src/app/api/customer/support/request/update/route.ts", [
  "requireCustomerSession",
  "requireVerifiedEmail: true",
  "entry.id === supportRequestId && entry.customerIdHash === sessionAccess.customerIdHash",
  "existing.decision !== \"sanitize\"",
  "rawPayloadStored: false",
]);

expect("src/lib/customer-support-intake-architecture.ts", [
  "CUSTOMER_SUPPORT_INTAKE_FLOWS",
  "CUSTOMER_SUPPORT_INTAKE_RISK_RULES",
  "no support intake accepts passwords, raw tokens, payment data, secrets, or private keys",
]);

expect("package.json", [
  "validate:routes",
  "validate-customer-support-request-page.mjs",
]);

expect(routesChainPath, [validatorPath]);

forbidden("src/app/dashboard/support/request/page.tsx", [
  "dangerouslySetInnerHTML",
  "localStorage.setItem",
  "sessionStorage.setItem",
  "guaranteed ROI",
  "refund approved",
  "legal outcome guaranteed",
  "raw evidence is shown",
  "passwords are accepted",
  "payment data is accepted",
]);

forbidden("src/components/customer-support/support-request-form.tsx", [
  "dangerouslySetInnerHTML",
  "localStorage",
  "sessionStorage",
  "x-cendorq-customer-context",
  "CUSTOMER_SUPPORT_CONTEXT_KEY",
  "NEXT_PUBLIC_CUSTOMER_SUPPORT_CONTEXT_KEY",
  "x-support-admin-key",
  "password accepted",
  "payment data accepted",
  "refund approved",
  "legal outcome guaranteed",
]);

forbidden("src/components/customer-support/support-request-update-form.tsx", [
  "dangerouslySetInnerHTML",
  "localStorage",
  "sessionStorage",
  "x-cendorq-customer-context",
  "CUSTOMER_SUPPORT_CONTEXT_KEY",
  "NEXT_PUBLIC_CUSTOMER_SUPPORT_CONTEXT_KEY",
  "x-support-admin-key",
  "rawRejectedContent",
  "rejectedRawContent",
  "customerIdHash",
  "auditEventId",
  "internalNotes",
  "operatorId",
  "operatorIdHash",
  "riskScoringInternals",
  "attackerDetails",
  "sessionToken",
  "csrfToken",
  "password accepted",
  "payment data accepted",
  "refund approved",
  "legal outcome guaranteed",
  "console.log",
]);

if (failures.length) {
  console.error("Customer support request page validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer support request page validation passed with current intake page, request forms, support update flow, API ownership checks, intake architecture, and route-chain coverage.");

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
