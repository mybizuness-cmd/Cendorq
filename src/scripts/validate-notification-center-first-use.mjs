import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const pagePath = "src/app/dashboard/notifications/page.tsx";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const packagePath = "package.json";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";

expect(pagePath, [
  "Readiness signal feed",
  "CUSTOMER_NOTIFICATION_CONTRACTS",
  "CUSTOMER_SUPPORT_LIFECYCLE_NOTIFICATION_CONTRACTS",
  "projectCustomerPlatformHandoff",
  "getCendorqPlanPrice",
  "getPlanValueDelivery",
  "PLAN_VALUE_SEPARATION_RULES",
  "FEATURED_NOTIFICATION_KEYS",
  "FEATURED_NOTIFICATIONS",
  "NOTIFICATION_HANDOFFS",
  "PRIORITY_FEED",
  "ALERT_TYPES",
  "MESSAGE_ACCESS_RULES",
  "QUIET_FEED_RULES",
]);

expect(pagePath, [
  "Act only on signals that protect readiness progress.",
  "document state changes",
  "email needs a dashboard mirror",
  "Open the proof record.",
  "Ready alerts should lead to proof before checkout.",
  "Priority readiness feed",
  "Scan. Review. Repair. Control. One safe next action each.",
  "Every signal should point to proof, access, document state, status, or safe recovery.",
  "Readiness proof",
  "Access signal",
  "Support signal",
  "Security signal",
]);

expect(pagePath, [
  "Dashboard message mirror standard",
  "Message access",
  "Email mirrored",
  "Important emails should appear here as dashboard messages with the same safe next action, related plan, and support path.",
  "Document state visible",
  "Report and billing document alerts route to the report vault or billing center instead of exposing raw files, provider payloads, or private document internals.",
  "Missed email recovery",
  "If email is missed, filtered, suppressed, or delayed, verified dashboard access still carries the safe message and destination.",
  "Suppression respected",
  "Non-essential reminders stay quiet when the customer acted, opted out, support paused reminders, or no evidence-backed next step exists.",
]);

expect(pagePath, [
  "Every alert must explain why it matters and where the customer can act safely.",
  "Every important email must mirror here as a customer-owned dashboard message when applicable.",
  "Notifications show safe customer summaries, not raw evidence, secrets, prompts, private internals, or raw billing IDs.",
  "Report and billing document alerts must route to the report vault or billing center and never expose raw provider or document internals.",
  "Readiness alerts must name the value, the boundary, and the next action before sending customers to checkout.",
  "Support lifecycle alerts route to status, safe resubmission, support center, or new request paths without duplicate anxiety.",
]);

expect(pagePath, [
  "free-scan",
  "deep-review",
  "build-fix",
  "ongoing-control",
  "Scan",
  "Review",
  "Repair",
  "Control",
  "Unlock ${DEEP_REVIEW.price}",
  "Unlock ${BUILD_FIX.price}",
  "Start ${ONGOING_CONTROL.price}",
  "AI Readiness Review",
  "Signal Repair",
  "Readiness Control",
  "No generic notification clutter.",
  "Dashboard message mirror.",
  "Email state.",
  "Document state.",
  "Safe document gates.",
  "No separate source of truth.",
  "No guaranteed inbox. No guaranteed deliverability.",
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

expect(routesChainPath, [
  "validate-notification-center-first-use.mjs",
]);

forbidden(pagePath, [
  "FIRST_USE_SNAPSHOT",
  "Notification center first use snapshot",
  "Alert meaning",
  "Actionable, not noisy",
  "Priority posture",
  "Calm urgency",
  "FIRST_USE_ACTIONS",
  "Notification center first use guidance",
  "Act on what moves the account forward.",
  "what is ready, what is blocked, and what next action protects or grows the business",
  "Deep Review",
  "Build Fix",
  "Ongoing Control",
  "monthly control",
  "guaranteed ROI",
  "guaranteed refund",
  "guaranteed legal outcome",
  "guaranteed security outcome",
  "guaranteed inbox placement",
  "guaranteed primary inbox",
  "guaranteed deliverability allowed",
  "impossible to hack",
  "never liable",
  "liability-free",
  "rawProviderPayload=",
  "rawBillingData=",
  "providerSecret=",
  "webhookSecret=",
  "localStorage",
  "sessionStorage",
]);

if (failures.length) {
  console.error("Notification center first use validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Notification center first use validation passed with readiness signal feed, dashboard message mirrors, document state recovery, missed-email recovery, suppression rules, owner posture coverage, and quiet safe-notification flow.");

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
