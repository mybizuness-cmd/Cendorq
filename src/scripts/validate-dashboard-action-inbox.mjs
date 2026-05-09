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
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const packagePath = "package.json";
const failures = [];

expect(componentPath, [
  "DashboardActionInbox",
  "projectPlanRouting",
  "type PlanRoutingInput",
  "Dashboard action inbox",
  "Conversion inbox",
  "The dashboard sells the next depth by making the proof impossible to ignore.",
  "No clutter, no panic, no account-page energy.",
  "Every action should either open proof, clarify scope, or move the customer to the right paid depth.",
  "Open Free Scan result",
  "Customer-led dashboard conversion inbox",
]);

expect(componentPath, [
  "Open the signal before buying deeper work",
  "Unlock Review when the cause needs proof",
  "Move to Repair only when the weak signal is clear",
  "Keep Control for signals worth watching",
  "Next command",
  "Upgrade path",
  "Scope discipline",
  "Recurring value",
  "Open signal",
  "Unlock Review",
  "Start Repair",
  "Start Control",
]);

expect(componentPath, [
  "proof first, then the right depth, not a blind upgrade push",
  "deeper review is the way to prove cause, priority, and safest next action before repair",
  "the customer can see exactly what the repair is supposed to improve",
  "This makes retention feel earned",
  "Cendorq keeps track of what can change",
  "Open proof. Clarify scope. Move to the right paid depth.",
]);

expect(commandCenterPath, [
  "DashboardBusinessCommandCenter",
  "Conversion command center",
  "This is where Free Scan turns into the right paid depth.",
  "The customer should see what Cendorq found, why it matters, what is still unknown, and why Review, Repair, or Control is the safest next move.",
  "This next step makes sense.",
  "proof earns trust, trust opens budget, and the correct plan depth becomes the obvious move",
  "Open the proof first",
  "Make the upgrade rational",
  "Show what stays separate",
  "Keep the next move visible",
  "The dashboard should guide, not beg.",
  "Every lane should lead to proof, scope, or the next paid depth.",
]);

expect(commandCenterPath, [
  "Proof creates trust.",
  "Trust makes the upgrade feel safe.",
  "Clear scope removes hesitation.",
  "One next action keeps momentum alive.",
  "Reports",
  "Plans",
  "Notifications",
  "Support",
]);

expect(reentryPath, [
  "DashboardControlRoomReentry",
  "Bring every return back to the money surface.",
  "Email, billing, reports, notifications, and support should all return to the same command room where the customer can see proof, understand scope, and choose the right next depth.",
  "I came back, Cendorq remembered the thread, and the next move is clear.",
  "The dashboard stays the customer conversion command room.",
  "Conversion command room",
  "Proof, scope, and next paid depth",
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
  "Category-defining authority and psychology",
  "That standard is higher than premium styling. It is category-defining authority backed by evidence discipline.",
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
  "data-cendorq-dashboard=\"category-defining-command-center-v2\"",
  "Private readiness command center",
  "Know the next move before the market does.",
  "protected command surface",
  "Next best command",
  "Open the first signal.",
  "Compare command path",
  "Category-defining authority",
]);

expect(runtimePath, [
  "projectPlanRouting",
  "warningEmailAllowed",
  "inboxConfirmationAllowed",
  "safeCustomerLanguage",
]);

expect(ownerMaximumProtectionPath, [
  "# Owner Maximum Protection Posture",
  "The public surface teaches the category without exposing private mechanics.",
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
  "validate-dashboard-action-inbox.mjs",
  "validate-owner-maximum-protection-posture.mjs",
]);

expect(routesChainPath, ["src/scripts/validate-dashboard-action-inbox.mjs"]);

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

forbidden(componentPath, staleDashboardPhrases());
forbidden(commandCenterPath, staleDashboardPhrases());
forbidden(reentryPath, staleDashboardPhrases());
forbidden(dashboardPath, staleDashboardPhrases());

if (failures.length) {
  console.error("Dashboard action inbox validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Dashboard action inbox validation passed with conversion command center, proof-first paid-depth path, money-surface reentry, owner posture, category-defining authority, verify-to-view, and safe language coverage.");

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

function staleDashboardPhrases() {
  return [
    "premium control room",
    "Optimization scope",
    "Monthly command",
    "monthly control",
    "Ongoing control",
    "Deep Review",
    "Build Fix",
    "Diagnose",
    "full standalone diagnosis",
    "notification center",
    "Customer command room",
    "Control the next move. Cendorq guides the smartest path.",
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
