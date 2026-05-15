import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const pagePath = "src/app/dashboard/support/page.tsx";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const packagePath = "package.json";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-support-center-first-use.mjs";
const failures = [];

expect(pagePath, [
  "Readiness support routing",
  "Your private Cendorq support routing center for proof questions, corrections, billing help, security review, and readiness-depth guidance.",
  "SUPPORT_ROUTES",
  "PLAN_SUPPORT",
  "SUPPORT_RULES",
  "Route the blocker without weakening the readiness path.",
  "Help should restore momentum, protect the proof trail, and return the customer to the right report, account, readiness depth, or status path.",
  "Track status",
  "Start protected request",
  "Track, then act.",
  "Check status first. Submit a safe request only when the issue needs review or new context.",
  "Pick the narrowest path that matches the blocker.",
  "This should not become a dumping ground. Each route has a boundary and the next safest action.",
  "Help should restore momentum without expanding scope silently.",
  "Access issue",
  "Proof question",
  "Repair scope",
  "Control priority",
  "Account access",
  "Correction or dispute",
  "Open billing",
  "Open readiness proof",
  "Send secure access link",
  "Start request",
  "Scan",
  "Review",
  "Repair",
  "Control",
  "Pick the narrowest support path before submitting a request.",
  "Use safe summaries only: no passwords, card data, private keys, session tokens, raw attack strings, or unrelated private evidence.",
  "Support can explain process, status, and next steps; approved outcomes require the right review gate.",
  "Support must separate billing, proof questions, Repair scope, Control priority, account access, and correction paths.",
  "Support paid actions route to plan detail pages before payment.",
  "focus:outline-none",
  "focus:ring-2",
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
  "validate-support-center-first-use.mjs",
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
  "full AI Readiness Review unless unlocked",
  "unlimited implementation",
  "guaranteed ranking/AI placement",
]);

if (failures.length) {
  console.error("Support center first use validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Support center first use validation passed with current readiness support routing, safe-summary boundaries, plan separation, and owner posture coverage.");

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
