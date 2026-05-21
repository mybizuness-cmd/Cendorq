import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const pagePath = "src/app/dashboard/notifications/page.tsx";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const packagePath = "package.json";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-notification-center-first-use.mjs";

expect(pagePath, [
  "AI Visibility signal feed",
  "Act only on signals that protect command progress.",
  "This feed should stay quiet until something matters",
  "Open AI Visibility proof",
  "Track status",
  "Open the proof record.",
  "Ready alerts should lead to proof before checkout.",
  "Priority AI Visibility feed",
  "Scan. Review. Repair. Control. One safe next action each.",
  "No generic clutter. Every signal should point to proof, access, status, or safe recovery.",
  "Signal routing types",
  "Featured customer signals",
  "Quiet feed standard",
  "Signals should create confidence, not noise.",
  "PRIORITY_FEED",
  "ALERT_TYPES",
  "QUIET_FEED_RULES",
  "FEATURED_NOTIFICATIONS",
  "CUSTOMER_NOTIFICATION_CONTRACTS",
  "CUSTOMER_SUPPORT_LIFECYCLE_NOTIFICATION_CONTRACTS",
  "Notification paid actions route to plan detail pages before payment.",
  "Notifications show safe customer summaries, not raw evidence, secrets, prompts, private internals, or raw billing IDs.",
  "Support lifecycle alerts route to status, safe resubmission, support center, or new request paths without duplicate anxiety.",
  "AI Visibility alerts must name the value, the boundary, and the next action before sending customers to checkout.",
  "AI Visibility signal ready",
  "Diagnosis evidence",
  "Keep AI Visibility, trust, friction, and monthly decisions under review.",
  "Proof signal",
  "Access signal",
  "Support signal",
  "Security signal",
  "focus:outline-none",
  "focus:ring-2",
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
  "validate-notification-center-first-use.mjs",
  "validate-owner-maximum-protection-posture.mjs",
]);

expect(routesChainPath, [validatorPath]);

forbidden(pagePath, [
  "Readiness signal feed",
  "protect readiness progress",
  "Open readiness proof",
  "Priority readiness feed",
  "Readiness alerts must name",
  "guaranteed ROI",
  "guaranteed refund",
  "guaranteed legal outcome",
  "guaranteed security outcome",
  "impossible to hack",
  "never liable",
  "liability-free",
  "localStorage",
  "sessionStorage",
]);

if (failures.length) {
  console.error("Notification center first use validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Notification center first use validation passed with AI Visibility signal feed, quiet-alert rules, safe routing, command progress, and owner posture coverage.");

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
