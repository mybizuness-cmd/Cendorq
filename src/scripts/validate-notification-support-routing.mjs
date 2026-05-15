import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const notificationPath = "src/app/dashboard/notifications/page.tsx";
const supportPath = "src/app/dashboard/support/page.tsx";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-notification-support-routing.mjs";

expect(notificationPath, [
  "Readiness signal feed",
  "Act only on signals that protect readiness progress.",
  "Priority readiness feed",
  "Signal routing types",
  "Featured customer signals",
  "Quiet feed standard",
  "Every alert must explain why it matters and where the customer can act safely.",
  "Notifications show safe customer summaries",
  "Readiness alerts must name the value, the boundary, and the next action before sending customers to checkout.",
  "Support lifecycle alerts route to status, safe resubmission, support center, or new request paths without duplicate anxiety.",
  "Proof signal",
  "Access signal",
  "Support signal",
  "Security signal",
  "Readiness signal ready",
  "Cause needs proof",
  "Repair target is clear",
  "Monthly watch is needed",
  "PLAN_VALUE_SEPARATION_RULES",
  "getPlanValueDelivery",
  "getCendorqPlanPrice",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(supportPath, [
  "Readiness support routing",
  "Route the blocker without weakening the readiness path.",
  "Pick the narrowest path that matches the blocker.",
  "Help should restore momentum without expanding scope silently.",
  "SUPPORT_ROUTES",
  "PLAN_SUPPORT",
  "SUPPORT_RULES",
  "Access issue",
  "Proof question",
  "Repair scope",
  "Control priority",
  "Account access",
  "Correction or dispute",
  "Restore access or payment flow first.",
  "Understand the signal before acting.",
  "Confirm what can be improved.",
  "Choose what should be watched.",
  "Restore safe workspace entry.",
  "Request bounded review.",
  "Pick the narrowest support path before submitting a request.",
  "Support can explain process, status, and next steps; approved outcomes require the right review gate.",
  "PLAN_VALUE_SEPARATION_RULES",
  "getPlanValueDelivery",
  "getCendorqPlanPrice",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(routesChainPath, [validatorPath]);

forbidden(notificationPath, [
  "fake urgency",
  "we guarantee ranking",
  "we guarantee ai placement",
  "we guarantee revenue",
  "submit your card number",
  "paste your password",
]);

forbidden(supportPath, [
  "support will refund",
  "support will change the report",
  "unlimited build fix included",
  "we guarantee ranking",
  "we guarantee ai placement",
  "we guarantee revenue",
  "submit card number",
  "paste your password",
]);

if (failures.length) {
  console.error("Notification and support routing validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Notification and support routing validation passed with current readiness signal feed, support routing, boundary, and safe next-action coverage.");

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
