import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const pagePath = "src/app/dashboard/support/page.tsx";
const bestStandardPath = "src/lib/best-of-best-operating-standard.ts";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const packagePath = "package.json";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const failures = [];

expect(pagePath, [
  "Readiness resolution routing",
  "BEST_OF_BEST_OPERATING_STANDARD",
  "BEST_SUPPORT_STANDARD",
  "SUPPORT_ROUTES",
  "PLAN_SUPPORT",
  "SUPPORT_RULES",
  "Route the blocker without weakening the readiness path.",
  "Help should restore momentum, acknowledge the issue, protect the proof trail, recover missed messages, and return the customer to the right report, account, billing, readiness depth, or status path.",
  "Track, then act.",
  "Check status first. Submit a safe request only when the issue needs review, correction, or new context.",
]);

expect(pagePath, [
  "Best support recovery standard",
  "Best-of-best support",
  "Acknowledge first",
  "Support should make the customer feel understood before routing: what happened, what state is visible, and what Cendorq can safely do next.",
  "One next move",
  "Every support path should provide one strongest next action and one fallback recovery route, not a wall of equal options.",
  "Mirror continuity",
  "Important support, correction, report, billing, or lifecycle messages should mirror into the dashboard when applicable.",
  "Document-safe recovery",
  "Report and billing document questions route back to vault or billing center state before PDF, attachment, or correction promises.",
]);

expect(pagePath, [
  "Access issue",
  "Proof question",
  "Message recovery",
  "Repair scope",
  "Control priority",
  "Account access",
  "Correction or dispute",
  "Find mirrored dashboard messages when an email was missed, filtered, suppressed, or delayed.",
  "Recover payment, invoice, billing PDF, or readiness-depth access without sending card data through support.",
  "Clarify confidence, limits, evidence boundaries, report-vault state, and next-readiness logic.",
  "mismatched with the released vault state",
]);

expect(pagePath, [
  "Pick the narrowest support path before submitting a request.",
  "Use safe summaries only: no passwords, card data, private keys, session tokens, raw attack strings, raw provider payloads, or unrelated private evidence.",
  "Support should acknowledge the human issue, show the current safe state, give one strongest next move, and avoid duplicate-request anxiety.",
  "Support must never imply a PDF, email, or attachment is more authoritative than report vault, billing center, provider state, or release-captain approval.",
  "No support dumping ground.",
  "No raw secrets.",
  "No duplicate request anxiety.",
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
  "validate-support-center-first-use.mjs",
  "validate-owner-maximum-protection-posture.mjs",
]);

expect(routesChainPath, [
  "validate-support-center-first-use.mjs",
]);

forbidden(pagePath, [
  "SUPPORT_FIRST_USE_SNAPSHOT",
  "Support center first use snapshot",
  "Help path",
  "Choose the right route",
  "Submission posture",
  "Status posture",
  "Promise posture",
  "SUPPORT_FIRST_USE_ACTIONS",
  "Support center first use guidance",
  "First support visit",
  "Choose the safest path before sending details.",
  "Check alerts",
  "SUPPORT_FIRST_USE_RULES",
  "First-use rules",
  "Deep Review",
  "Build Fix",
  "Ongoing Control",
  "guaranteed ROI",
  "guaranteed refund",
  "guaranteed legal outcome",
  "guaranteed security outcome",
  "impossible to hack",
  "never liable",
  "liability-free",
  "rawPayload",
  "rawEvidence",
  "rawSecurityPayload",
  "rawBillingData",
  "internalNotes",
  "operatorIdentity",
  "riskScoringInternals",
  "attackerDetails=",
  "sessionToken=",
  "csrfToken=",
  "localStorage",
  "sessionStorage",
  "refund guaranteed",
]);

if (failures.length) {
  console.error("Support center first use validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Support center first use validation passed with best-of-best support recovery, mirrored-message continuity, document-safe recovery, owner posture coverage, and no duplicate-request anxiety.");

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
