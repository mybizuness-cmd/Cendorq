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
  "The most important customer actions stay visible and conversion-ready without becoming noise.",
  "This inbox is a dashboard conversion and action strip, not a substitute for the email orchestration, lifecycle follow-up emails, or the full notification center.",
  "Email remains the external delivery channel to the signup address; the dashboard keeps the next best action visible when the customer returns.",
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
  "Conversion role",
  "Keeps the customer reachable for report-ready notices, plan education, billing clarity, and support follow-through without repeating confirmation every plan.",
  "Converts direct Optimization buyers back toward Deep Review through scope clarity and customer understanding, not pressure or unpaid report leakage.",
  "Turns recurring visibility into upgrade education by showing when monthly insight needs paid implementation, while preserving the active monthly plan.",
  "convert through evidence, plan-fit education, scope clarity, and one safe next action",
]);

expect(componentPath, [
  "report, billing, support, and plan-status emails sent to your signup address are easier to find",
  "Build Fix can continue inside the purchased optimization scope.",
  "Add Deep Review if you want the full standalone diagnosis behind the work.",
  "email follow-ups still go to your signup address",
  "Monthly control can continue from approved scope.",
  "Build Fix is recommended only when evidence shows implementation work is needed",
  "monthly emails remain part of the customer lifecycle flow",
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
