import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const componentPath = "src/app/dashboard/dashboard-action-inbox.tsx";
const dashboardPath = "src/app/dashboard/page.tsx";
const runtimePath = "src/lib/plan-routing-runtime.ts";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const failures = [];

expect(componentPath, [
  "DashboardActionInbox",
  "projectPlanRouting",
  "type PlanRoutingInput",
  "Dashboard action inbox",
  "The most important customer actions stay visible without becoming noise.",
  "This inbox is a dashboard command strip, not a replacement for email or the notification center.",
  "Open notification center",
  "Customer-safe rule",
]);

expect(componentPath, [
  "Confirm your Cendorq inbox once",
  "Optimization scope is protected",
  "Monthly command stays evidence-led",
  "One-time setup",
  "Plan scope",
  "Ongoing control",
  "Confirm inbox",
  "Review plan scope",
  "View monthly updates",
]);

expect(componentPath, [
  "report, billing, support, and plan-status messages are easier to find",
  "Email remains the delivery channel; this dashboard keeps the action visible.",
  "Build Fix can continue inside the purchased optimization scope.",
  "Add Deep Review if you want the full standalone diagnosis behind the work.",
  "Monthly control can continue from approved scope.",
  "Build Fix is recommended only when evidence shows implementation work is needed.",
]);

expect(componentPath, [
  "raw payloads",
  "raw evidence",
  "internal notes",
  "risk internals",
  "operator identities",
  "provider payloads",
  "secrets",
  "payment data",
  "unsupported outcome promises",
  "pressure-based urgency",
]);

expect(dashboardPath, [
  "DashboardActionInbox",
  "./dashboard-action-inbox",
  "<DashboardActionInbox />",
  "Customer command room",
  "Connected dashboard handoffs",
]);

expect(runtimePath, [
  "projectPlanRouting",
  "warningEmailAllowed",
  "inboxConfirmationAllowed",
  "safeCustomerLanguage",
]);

expect(routesChainPath, [
  "src/scripts/validate-dashboard-action-inbox.mjs",
]);

forbidden(componentPath, [
  "replace email",
  "replacement for email",
  "replace notification center",
  "guaranteed inbox",
  "guaranteed primary inbox",
  "guaranteed ROI",
  "guaranteed revenue",
  "guaranteed accuracy",
  "100% accurate",
  "100 percent accurate",
  "impossible to hack",
  "never liable",
  "liability-free",
  "fake urgency",
  "urgent upgrade required",
  "password=",
  "token=",
  "privateKey=",
  "cardNumber=",
  "bankDetail=",
  "rawPayload=",
  "rawEvidence=",
  "operatorIdentity=",
  "internalNote=",
  "localStorage.setItem",
  "sessionStorage.setItem",
]);

if (failures.length) {
  console.error("Dashboard action inbox validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Dashboard action inbox validation passed.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = read(path);
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}

function forbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path).toLowerCase();
  for (const phrase of phrases) if (text.includes(phrase.toLowerCase())) failures.push(`${path} contains forbidden phrase: ${phrase}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
