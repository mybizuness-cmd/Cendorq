import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const routeMapPath = "src/lib/customer-platform-route-map.ts";
const dashboardPath = "src/app/dashboard/page.tsx";
const pagePath = "src/app/dashboard/support/page.tsx";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const packagePath = "package.json";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-customer-support-center.mjs";

expect(routeMapPath, [
  "dashboardSupport",
  "/dashboard/support",
  "Support and corrections",
  "support center access requires authenticated customer ownership and route authorization",
  "support center must not promise refunds, legal outcomes, report changes, billing changes, or guaranteed results without approval",
  "support center must preserve correction path, billing help, security review, and escalation visibility",
]);

expect(dashboardPath, [
  "Support",
  "/dashboard/support",
  "Resolve blockers without sending private details.",
  "dashboard-to-support",
]);

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
  "Help should restore momentum without expanding scope silently.",
  "Pick the narrowest support path before submitting a request.",
  "Use safe summaries only: no passwords, card data, private keys, session tokens, raw attack strings, or unrelated private evidence.",
  "Support can explain process, status, and next steps; approved outcomes require the right review gate.",
  "Support must separate billing, proof questions, Repair scope, Control priority, account access, and correction paths.",
  "Support paid actions route to plan detail pages before payment.",
  "No support dumping ground",
  "No raw secrets",
  "No duplicate request anxiety",
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
  "validate-customer-support-center.mjs",
  "validate-owner-maximum-protection-posture.mjs",
]);

expect(routesChainPath, [validatorPath]);

forbidden(pagePath, [
  "dangerouslySetInnerHTML",
  "localStorage",
  "sessionStorage",
  "guaranteed ROI",
  "guaranteed results",
  "refund approved",
  "legal outcome guaranteed",
  "raw evidence is shown",
  "passwords are accepted",
  "algorithm control guaranteed",
  "rawPayload",
  "rawEvidence",
  "rawSecurityPayload",
  "rawBillingData",
  "private credentials",
]);

if (failures.length) {
  console.error("Customer support center validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer support center validation passed with current readiness support routing, route-map guards, dashboard entry, and owner posture coverage.");

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
