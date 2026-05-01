import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const componentPath = "src/app/dashboard/dashboard-action-inbox.tsx";
const dashboardPath = "src/app/dashboard/page.tsx";
const commandCenterPath = "src/app/dashboard/dashboard-business-command-center.tsx";
const reentryPath = "src/app/dashboard/dashboard-control-room-reentry.tsx";
const confirmationContractPath = "src/lib/customer-email-confirmation-handoff-contracts.ts";
const ownerManualPath = "docs/owner-operating-manual.md";
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

expect(commandCenterPath, [
  "DashboardBusinessCommandCenter",
  "This is where the customer controls the business journey",
  "Cendorq guiding the smartest next move",
  "premium control room for the customer",
  "The customer owns the decisions; Cendorq guides the strategy, sequencing, and safeguards.",
  "Conversion should come from confidence, education, proof, and visible momentum—not pressure or confusion.",
  "Diagnose",
  "Decide",
  "Act",
  "Protect",
]);

expect(reentryPath, [
  "DashboardControlRoomReentry",
  "They can leave today and come back to the same business control room tomorrow.",
  "Use the dashboard link in any Cendorq email",
  "Return from the public site",
  "Resume after session expiry",
  "Recover from support or billing",
  "safe sign-in or magic-link re-auth",
  "return them to the dashboard without restarting the scan or purchase journey",
]);

expect(confirmationContractPath, [
  "CUSTOMER_EMAIL_CONFIRMATION_HANDOFF_CONTRACT",
  "Cendorq Support <support@cendorq.com>",
  "support@cendorq.com",
  "Confirm email and open your results",
  "Confirm your email to open your Cendorq results",
  "Confirm your email and enter your Cendorq command center",
  "Confirm your email to continue your Cendorq plan",
  "check spam or promotions once",
  "move Cendorq to your main inbox",
  "save support@cendorq.com as a trusted sender",
  "Do not show Free Scan findings before email verification and safe release state.",
  "dashboard/report vault",
  "dashboard inbox supplements email and does not replace it",
  "Verification tokens must be single-use, short-lived, server-validated, and never stored in localStorage or sessionStorage.",
]);

expect(ownerManualPath, [
  "Verify-to-view email confirmation and report access",
  "Cendorq Support <support@cendorq.com>",
  "support@cendorq.com",
  "Confirm email and open your results",
  "check spam or promotions once",
  "dashboard/report vault",
  "Email remains the delivery and return channel",
]);

expect(dashboardPath, [
  "DashboardActionInbox",
  "DashboardBusinessCommandCenter",
  "DashboardControlRoomReentry",
  "./dashboard-action-inbox",
  "./dashboard-business-command-center",
  "./dashboard-control-room-reentry",
  "<DashboardActionInbox />",
  "<DashboardBusinessCommandCenter />",
  "<DashboardControlRoomReentry />",
  "Customer business command center",
  "Control the next move. Cendorq guides the smartest path.",
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

forbidden(componentPath, unsafePhrases());
forbidden(commandCenterPath, unsafePhrases());
forbidden(reentryPath, unsafePhrases());
forbidden(confirmationContractPath, [
  ...unsafePhrases(),
  "show protected results before verification",
  "skip email verification for reports",
  "verification token in localStorage",
  "verification token in sessionStorage",
  "guaranteed deliverability",
  "guaranteed inbox placement",
]);

if (failures.length) {
  console.error("Dashboard action inbox validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Dashboard action inbox validation passed with command-center, re-entry, and verify-to-view coverage.");

function unsafePhrases() {
  return [
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
  ];
}

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
