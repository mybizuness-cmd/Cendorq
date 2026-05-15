import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const pagePath = "src/app/dashboard/support/request/page.tsx";
const requestFormPath = "src/components/customer-support/support-request-form.tsx";
const updateFormPath = "src/components/customer-support/support-request-update-form.tsx";
const intakeArchitecturePath = "src/lib/customer-support-intake-architecture.ts";
const workStartGatesPath = "src/lib/cendorq-work-start-intake-gates.ts";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const packagePath = "package.json";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-support-request-first-use.mjs";
const failures = [];

expect(pagePath, [
  "Market resolution intake",
  "Start or safely update a protected Cendorq support request with guarded summaries and no raw secrets or payment data.",
  "SupportRequestForm",
  "SupportRequestUpdateForm",
  "CENDORQ_WORK_START_GATE_PROJECTIONS",
  "CUSTOMER_SUPPORT_INTAKE_FLOWS",
  "CUSTOMER_SUPPORT_INTAKE_RISK_RULES",
  "Send the safe summary that moves the blocker forward.",
  "Intake should collect enough context to help without turning into a private data dump, duplicate request loop, or command-depth shortcut.",
  "Work starts only when the right Cendorq gate is clear.",
  "Check work-start gates",
  "Start safe request",
  "Gate the queue.",
  "Payment alone should not start the wrong work.",
  "What Cendorq needs before backend work starts.",
  "Review intake gate",
  "Repair prerequisite gate",
  "Control baseline gate",
  "New blocker",
  "Asked for context",
  "Already submitted",
  "Enough context. No secrets.",
  "Do not create duplicate noise.",
  "Use update mode only when the status page asks for safer customer context.",
  "Check status first",
  "Safe summary only",
  "Update only when asked",
  "No duplicate requests",
  "No private data dump",
  "No command-depth shortcut",
  "Track status first",
  "new-support-request",
  "support-request-update",
  "work-start-gates",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(requestFormPath, [
  "use client",
  "SupportRequestForm",
  "CENDORQ_WORK_START_GATES",
  "CUSTOMER_SUPPORT_INTAKE_FLOWS",
  "fetch(\"/api/customer/support/request\"",
  "Submit the context Cendorq needs before work starts.",
  "Do not include passwords, raw tokens, payment data, secrets, private keys, raw evidence dumps, raw security payloads, or private report internals.",
  "Cendorq work-start gate",
  "Request type",
  "Business or account context",
  "Safe description",
  "Required before queue",
  "I confirm this request does not include passwords, raw tokens, payment details, secrets, private keys, raw evidence dumps, raw security payloads, or private report internals.",
  "Submit protected intake",
  "Track this request safely",
  "Status tracking uses customer-safe projection only and never reveals internal notes, operator identities, risk-scoring details, raw evidence, billing data, session tokens, or support secrets.",
  "validateLocally",
  "customerAcknowledgement",
]);

expect(updateFormPath, [
  "use client",
  "SupportRequestUpdateForm",
  "fetch(\"/api/customer/support/request/update\"",
  "new URL(window.location.href).searchParams.get(\"update\")",
  "Update a waiting support request safely.",
  "Summarize what changed without pasting passwords, tokens, payment data, raw evidence, raw security payloads, or private report internals.",
  "Use this panel when support status asks for a safer customer summary.",
  "Cendorq does not show rejected raw content here and does not ask you to paste sensitive records again.",
  "Support request ID",
  "Safe update summary",
  "I confirm this update does not include passwords, raw tokens, payment details, secrets, private keys, raw evidence dumps, raw security payloads, or private report internals.",
  "Submit safe update",
  "Back to support status",
  "rawPayloadStored: false",
  "customerSafeProjectionOnly: true",
  "validateLocally",
]);

expect(intakeArchitecturePath, [
  "CUSTOMER_SUPPORT_INTAKE_FLOWS",
  "CUSTOMER_SUPPORT_INTAKE_RISK_RULES",
  "CUSTOMER_SUPPORT_INTAKE_GLOBAL_GUARDS",
  "report-question",
  "correction-request",
  "billing-help",
  "security-concern",
  "plan-guidance",
  "safeSummaryRequirements",
  "requiredGuards",
  "blockedBehaviors",
  "secret-or-token-submission",
  "payment-data-submission",
  "raw-evidence-dump",
  "hostile-instruction-or-prompt-injection",
  "unsafe-promise-demand",
  "no support intake without authenticated customer ownership and route authorization",
  "no support intake accepts passwords, raw tokens, payment data, secrets, or private keys",
  "no support intake creates correction, refund, billing, legal, report-change, or outcome promises without approval",
]);

expect(workStartGatesPath, [
  "CENDORQ_WORK_START_GATES",
  "CENDORQ_WORK_START_GATE_PROJECTIONS",
  "review-intake",
  "repair-prerequisite",
  "control-baseline",
  "Create review queue only after ownership is verified and review intake is complete enough to avoid guessing.",
  "Hold repair as do-not-start until diagnosis and repair scope are approved; never turn repair into unpaid review work.",
  "Hold control setup until the baseline and monthly control scope are approved.",
  "Do not start a broad audit from a payment receipt alone.",
  "Do not let a direct Signal Repair purchase bypass diagnosis.",
  "Do not start monthly monitoring with no known baseline.",
]);

expect(ownerMaximumProtectionPath, [
  "# Owner Maximum Protection Posture",
  "Protected customer and report surfaces require the correct verified access path.",
  "Operator surfaces remain private, metadata-first, and review-gated.",
  "Sensitive operational details are summarized safely instead of copied into public, customer, or operator-visible text.",
]);

expect(ownerMaximumProtectionValidatorPath, [
  "Owner maximum protection posture validation passed",
  "docs/owner-maximum-protection-posture.md",
  "validate:routes",
]);

expect(packagePath, [
  "validate:routes",
  "validate-support-request-first-use.mjs",
  "validate-owner-maximum-protection-posture.mjs",
]);

expect(routesChainPath, [validatorPath]);

forbidden(pagePath, [
  "guaranteed ROI",
  "guaranteed refund",
  "guaranteed legal outcome",
  "guaranteed security outcome",
  "impossible to hack",
  "never liable",
  "liability-free",
  "localStorage",
  "sessionStorage",
  "refund guaranteed",
]);

forbidden(requestFormPath, [
  "localStorage",
  "sessionStorage",
  "dangerouslySetInnerHTML",
  "innerHTML",
  "document.cookie",
  "window.location.href =",
  "refund guaranteed",
  "guaranteed legal outcome",
  "guaranteed security outcome",
]);

forbidden(updateFormPath, [
  "localStorage",
  "sessionStorage",
  "dangerouslySetInnerHTML",
  "innerHTML",
  "document.cookie",
  "window.location.href =",
  "refund guaranteed",
  "guaranteed legal outcome",
  "guaranteed security outcome",
]);

if (failures.length) {
  console.error("Support request first use validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Support request first use validation passed with current safe intake, update flow, work-start gates, intake contracts, and owner posture coverage.");

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
