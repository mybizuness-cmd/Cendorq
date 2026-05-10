import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const pagePath = "src/app/dashboard/support/request/page.tsx";
const bestStandardPath = "src/lib/best-of-best-operating-standard.ts";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const packagePath = "package.json";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const failures = [];

expect(pagePath, [
  "Readiness resolution intake",
  "BEST_OF_BEST_OPERATING_STANDARD",
  "REQUEST_PATHS",
  "BEST_REQUEST_STANDARD",
  "SAFE_SUMMARY_RULES",
  "CUSTOMER_SUPPORT_INTAKE_FLOWS",
  "CUSTOMER_SUPPORT_INTAKE_RISK_RULES",
  "Send the safe summary that moves the blocker forward.",
  "Intake should acknowledge the issue, collect only the context needed to help, route customers to the source of truth when it already exists",
  "Track status first.",
  "Duplicate requests create noise. Status, notifications, report vault, and billing center show what happens next.",
]);

expect(pagePath, [
  "Best support request standard",
  "Best-of-best intake",
  "Acknowledge the blocker",
  "The request should tell Cendorq what happened, what surface it affected, and what help the customer needs without dumping private internals.",
  "Choose source first",
  "If the answer already belongs in status, notifications, report vault, or billing center, use that source before opening another request.",
  "One safe update",
  "When Cendorq asks for context, send the narrow update requested by status instead of reopening the same issue.",
  "No scope shortcut",
  "Support intake cannot turn Free Scan into AI Readiness Review, Review into Signal Repair, or Control into unlimited implementation.",
]);

expect(pagePath, [
  "New blocker",
  "Asked for context",
  "Already submitted",
  "Missed message",
  "Document question",
  "Billing document",
  "Recover mirrored dashboard messages before opening a new request.",
  "Check report vault state before asking for a PDF, attachment, or correction.",
  "Check provider-backed billing state before sending payment-support details.",
  "Report vault first.",
  "Billing center first.",
  "Dashboard message recovery.",
]);

expect(pagePath, [
  "Do not paste passwords, card numbers, bank details, private keys, raw tokens, session tokens, admin keys, or provider secrets.",
  "Do not paste raw attack strings, prompt-injection text, raw evidence dumps, raw billing payloads, or private report internals.",
  "Check status, notifications, report vault, or billing center before creating duplicate requests.",
  "Use support to clarify process, status, corrections, and safe next actions—not to bypass plan scope, release gates, or document safety.",
  "No duplicate requests.",
  "No private data dump.",
  "No readiness-depth shortcut.",
]);

expect(bestStandardPath, [
  "Intercom-level personal, proactive, honest support",
  "Support and lifecycle messages must be human, specific, proactive, honest about limitations, and focused on resolution rather than inbox cleanup.",
  "A support interaction is not excellent unless it acknowledges the issue, explains the current state, gives one safe next action, and invites recovery without blaming the customer.",
  "support blame language",
]);

expect(ownerMaximumProtectionPath, [
  "# Owner Maximum Protection Posture",
  "Protected customer and report surfaces require the correct verified access path.",
  "Operator surfaces remain private, metadata-first, and review-gated.",
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

expect(routesChainPath, [
  "validate-support-request-first-use.mjs",
]);

forbidden(pagePath, [
  "SUPPORT_REQUEST_FIRST_USE_SNAPSHOT",
  "Support request first use snapshot",
  "Form choice",
  "New or update",
  "Summary posture",
  "Safe context",
  "Risk posture",
  "Guarded intake",
  "Follow-through",
  "Track after submit",
  "SUPPORT_REQUEST_FIRST_USE_ACTIONS",
  "Support request first use guidance",
  "Get the blocker out of the way.",
  "Resolve report question",
  "Fix billing blocker",
  "Choose plan depth",
  "Start new request",
  "Update existing request",
  "Track instead",
  "SUPPORT_REQUEST_FIRST_USE_RULES",
  "First-use rules",
  "guaranteed ROI",
  "guaranteed refund",
  "guaranteed legal outcome",
  "guaranteed security outcome",
  "impossible to hack",
  "never liable",
  "liability-free",
  "rawPayload=",
  "rawEvidence=",
  "rawSecurityPayload=",
  "rawBillingData=",
  "internalNotes=",
  "operatorIdentity=",
  "riskScoringInternals=",
  "localStorage",
  "sessionStorage",
  "refund guaranteed",
]);

if (failures.length) {
  console.error("Support request first use validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Support request first use validation passed with best-of-best intake, source-first recovery, safe update discipline, no scope shortcuts, owner posture coverage, and no duplicate request anxiety.");

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
  const text = read(path).toLowerCase();
  for (const phrase of phrases) {
    if (text.includes(phrase.toLowerCase())) failures.push(`${path} contains forbidden phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
