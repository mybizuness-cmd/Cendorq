import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const pagePath = "src/app/dashboard/support/status/page.tsx";
const bestStandardPath = "src/lib/best-of-best-operating-standard.ts";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const packagePath = "package.json";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const failures = [];

expect(pagePath, [
  "Readiness resolution status",
  "BEST_OF_BEST_OPERATING_STANDARD",
  "STATUS_ACTIONS",
  "STATUS_RECOVERY_STANDARD",
  "STATUS_RULES",
  "CUSTOMER_SUPPORT_STATUS_CONTRACTS",
  "Know where the blocker stands and what to do next.",
  "Status should reduce anxiety, acknowledge the current state, protect private information, recover missed messages",
  "Track, then act.",
  "Check status first. Submit a safe request only when the issue needs review, correction, or new context.",
]);

expect(pagePath, [
  "Best support status recovery standard",
  "Best-of-best status",
  "Acknowledge state",
  "Status should name what is happening, what Cendorq is waiting on, and what the customer can safely do next.",
  "Prevent duplicates",
  "Customers should not feel pushed into repeated tickets when a status, mirrored message, or safe update path already exists.",
  "Mirror important updates",
  "Important support, correction, billing, and report updates should be recoverable from dashboard messages when applicable.",
  "Route documents safely",
  "Report and billing document status should lead to report vault or billing center truth before any PDF or attachment promise.",
]);

expect(pagePath, [
  "Review status",
  "Recover message",
  "Send safe update",
  "Return to readiness depth",
  "Check mirrored dashboard messages when an email was missed or delayed.",
  "Status should show one strongest next move and one fallback recovery path when needed.",
  "Document, billing, and report questions should route back to report vault, billing center, provider state, or release-captain approval before new promises are made.",
  "No generic ticket tracker.",
  "No internal notes.",
  "No raw evidence.",
  "No duplicate support loop.",
  "No PDF, email, or attachment is more authoritative than vault, billing center, provider state, or release-captain approval.",
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
  "validate-support-status-first-use.mjs",
  "validate-owner-maximum-protection-posture.mjs",
]);

expect(routesChainPath, [
  "validate-support-status-first-use.mjs",
]);

forbidden(pagePath, [
  "SUPPORT_STATUS_FIRST_USE_SNAPSHOT",
  "Support status first use snapshot",
  "Progress meaning",
  "Communication posture",
  "Send, hold, or suppress",
  "Action posture",
  "One clear next step",
  "Privacy posture",
  "No raw content",
  "SUPPORT_STATUS_FIRST_USE_ACTIONS",
  "Support status first use guidance",
  "Resolve the issue and keep the account moving.",
  "Continue the paid path",
  "Return to billing",
  "Compare plans",
  "Review current status",
  "Return to support",
  "SUPPORT_STATUS_FIRST_USE_RULES",
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
  console.error("Support status first use validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Support status first use validation passed with best-of-best recovery state, mirrored-message recovery, document-safe routing, owner posture coverage, and no duplicate support anxiety.");

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
