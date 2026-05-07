import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const notificationsPath = "src/app/dashboard/notifications/page.tsx";
const supportPath = "src/app/dashboard/support/page.tsx";
const supportRequestPath = "src/app/dashboard/support/request/page.tsx";
const supportStatusPath = "src/app/dashboard/support/status/page.tsx";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-command-notifications-support-flow.mjs";

expect(notificationsPath, [
  "Premium notification command feed",
  "Act only on alerts that protect progress.",
  "Notifications should feel calm and operational.",
  "Quiet priority feed",
  "Four plan moments. One safe next action each.",
  "Alert routing types",
  "Featured customer alerts",
  "Quiet feed standard",
  "Alerts should create confidence, not noise.",
  "No generic notification clutter",
  "No raw evidence, secrets, prompts, private internals, raw billing IDs, attacker details, risk-scoring internals, or duplicate-request anxiety.",
  "hover:-translate-y-0.5",
  "shadow-[0_28px_100px_rgba(2,8,23,0.42)]",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(supportPath, [
  "Premium support routing center",
  "Route the blocker without blurring the plan.",
  "Support route selector",
  "Pick the narrowest path that matches the blocker.",
  "Support should restore momentum without expanding scope silently.",
  "Billing issue",
  "Report question",
  "Scope question",
  "Monthly priority",
  "Account access",
  "Correction or dispute",
  "No support dumping ground",
  "No raw secrets",
  "No duplicate request anxiety",
  "hover:-translate-y-0.5",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(supportRequestPath, [
  "Premium protected support intake",
  "Send the safe summary that moves the blocker forward.",
  "Safe summary only.",
  "Update only when asked.",
  "No duplicate requests",
  "No private data dump",
  "No plan-expansion shortcut",
  "Track status first.",
  "New blocker",
  "Asked for context",
  "Already submitted",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(supportStatusPath, [
  "Premium support status",
  "Know where the blocker stands and what to do next.",
  "Show progress without exposing internals.",
  "Continue the paid path.",
  "No generic ticket tracker",
  "No internal notes",
  "No raw evidence",
  "No duplicate support loop",
  "Status safety standard",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(routesChainPath, [validatorPath]);

forbidden(notificationsPath, [
  "Plan notification decision routes",
  "Every alert needs a value, a boundary, and a safe next action.",
  "ALERT_ROUTING_STANDARDS",
  "FIRST_USE_SNAPSHOT",
  "NOTIFICATION_GROUPS",
  "SupportLifecycleNotificationList",
]);

forbidden(supportPath, [
  "Support routing map",
  "Plan support boundaries",
  "SUPPORT_FIRST_USE_SNAPSHOT",
  "SUPPORT_FIRST_USE_ACTIONS",
  "SUPPORT_FIRST_USE_RULES",
  "SUPPORT_SAFETY_RULES",
]);

forbidden(supportRequestPath, [
  "REQUEST_PATHS = [\n  { title: \"Resolve report question\"",
  "Get the blocker out of the way.",
  "Resolve report question",
  "Fix billing blocker",
  "Choose plan depth",
  "SUPPORT_REQUEST_FIRST_USE_SNAPSHOT",
  "SUPPORT_REQUEST_FIRST_USE_ACTIONS",
  "SUPPORT_REQUEST_FIRST_USE_RULES",
]);

forbidden(supportStatusPath, [
  "Resolve the issue and keep the account moving.",
  "MOMENTUM_ACTIONS",
  "SUPPORT_STATUS_FIRST_USE_SNAPSHOT",
  "SUPPORT_STATUS_FIRST_USE_ACTIONS",
  "SUPPORT_STATUS_FIRST_USE_RULES",
]);

boundedLength(notificationsPath, 13500);
boundedLength(supportPath, 13500);
boundedLength(supportRequestPath, 9500);
boundedLength(supportStatusPath, 8500);

if (failures.length) {
  console.error("Premium notifications and support flow validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Premium notifications and support flow validation passed with quiet alerts, routed support, safe intake, and customer-safe status.");

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

function boundedLength(path, maxCharacters) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  if (text.length > maxCharacters) failures.push(`${path} is too long for the command notification/support standard: ${text.length} > ${maxCharacters}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
