import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const componentPath = "src/app/dashboard/dashboard-action-inbox.tsx";
const dashboardPath = "src/app/dashboard/page.tsx";
const commandCenterPath = "src/app/dashboard/dashboard-business-command-center.tsx";
const reentryPath = "src/app/dashboard/dashboard-control-room-reentry.tsx";
const confirmationContractPath = "src/lib/customer-email-confirmation-handoff-contracts.ts";
const billingContractPath = "src/lib/billing-checkout-contracts.ts";
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

expect(commandCenterPath, [
  "DashboardBusinessCommandCenter",
  "Conversion command center",
  "This is where Free Scan turns into the right paid depth.",
  "This next step makes sense.",
  "proof earns trust, trust opens budget, and the correct plan depth becomes the obvious move",
  "The dashboard should guide, not beg.",
  "Every lane should lead to proof, scope, or the next paid depth.",
]);

expect(reentryPath, [
  "DashboardControlRoomReentry",
  "Bring every return back to the money surface.",
  "Email, billing, reports, notifications, and support should all return to the same command room",
  "The dashboard stays the customer conversion command room.",
  "Proof, scope, and next paid depth",
]);

expect(confirmationContractPath, [
  "CUSTOMER_EMAIL_CONFIRMATION_HANDOFF_CONTRACT",
  "Cendorq Support <support@cendorq.com>",
  "Confirm email and open your results",
  "Do not show Free Scan findings before email verification and safe release state.",
  "dashboard/report vault",
  "dashboardMessageMirrorRules",
  "Every important customer email must create or update a matching dashboard message record",
  "Mirrored dashboard messages must include the email subject, safe summary, message category, sent status, related plan, related report or billing document, primary CTA, secondary safe path, and support route.",
  "When an email includes a safe PDF attachment, the mirrored dashboard message must show the same released document as a verified report-vault or billing-center document link.",
  "When an email cannot be delivered, bounces, is suppressed, or may be missed by the customer, the dashboard message remains visible after verified login and shows the safest next action.",
  "Email and dashboard message states must stay synchronized: queued, sent, delivered when known, opened when known, failed, suppressed, document ready, customer action needed, or archived.",
]);

expect(confirmationContractPath, [
  "emailDeliverabilityRules",
  "SPF, DKIM, and DMARC must be configured and monitored before live transactional sending.",
  "Verification, report, billing, and lifecycle emails should be transactional, useful, recognizable, low-link-density, mobile-readable, and connected to the dashboard or billing center.",
  "If an email is routed to spam, the customer must still be able to access the same released report, billing document, or customer message from the verified dashboard/report vault/billing center after safe login.",
  "Deliverability monitoring must watch bounces, complaints, suppressions, unsubscribes where applicable, authentication errors, and attachment-related failures before scaling volume.",
]);

expect(confirmationContractPath, [
  "pdfAttachmentRules",
  "Report PDFs and billing PDFs are allowed when they help the customer preserve the result, invoice, receipt, or payment confirmation, but they must never be the only access path.",
  "Attach report PDFs only after verified email, customer ownership, entitlement or permitted Free Scan access, release-captain approval, no-leak check, and document-safety checks pass.",
  "Attach billing PDFs only from provider-authoritative invoice, receipt, or payment confirmation records after verified customer ownership and safe billing projection checks pass.",
  "PDF attachments must be static PDF documents only; no executable content, macros, embedded scripts, hidden payloads, raw provider payloads, raw report evidence, private prompts, exact scoring weights, secrets, tokens, or cross-customer data.",
]);

expect(confirmationContractPath, [
  "dashboardMessageMirrorMissing",
  "dashboardMessageDriftFromEmail",
  "pdfAttachmentAsOnlyAccessPath",
  "pdfAttachmentWithoutVerifiedEmail",
  "pdfAttachmentWithoutNoLeakCheck",
  "promisedInboxPlacement",
  "promisedDeliverability",
]);

expect(billingContractPath, [
  "pdfDocumentDeliveryRules",
  "PDF delivery is allowed only after verified email, customer ownership, entitlement or permitted free-result access, release gate, no-leak check, and safe document generation pass.",
  "Dashboard report vault remains the canonical source; email attachments and downloadable PDFs must match the vault release state and must not create a separate truth source.",
  "PDF files must use safe filenames, Cendorq branding, document type, date, customer/business reference, and no executable content, macros, embedded scripts, hidden tracking payloads, or raw provider/customer data.",
  "pdfDeliveryWithoutVerifiedEmail",
  "pdfDeliveryWithoutReleaseGate",
  "billingPdfWithoutProviderAuthority",
  "dashboardVaultPdfDrift",
]);

expect(ownerManualPath, [
  "Verify-to-view email confirmation and report access",
  "Category-defining authority and psychology",
  "Cendorq Support <support@cendorq.com>",
  "Confirm email and open your results",
  "dashboard/report vault",
  "Email remains the delivery and return channel",
]);

expect(dashboardPath, [
  "DashboardActionInbox",
  "DashboardBusinessCommandCenter",
  "DashboardControlRoomReentry",
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

forbidden(componentPath, unsafeBusinessClaims());
forbidden(commandCenterPath, unsafeBusinessClaims());
forbidden(reentryPath, unsafeBusinessClaims());
forbidden(confirmationContractPath, unsafeBusinessClaims());
forbidden(billingContractPath, unsafeBusinessClaims());
forbidden(confirmationContractPath, [
  "show protected results before verification",
  "skip email verification for reports",
  "guaranteed deliverability",
  "guaranteed inbox placement",
  "pdf attachment as only access path allowed",
  "dashboard message mirror optional",
]);
forbidden(billingContractPath, [
  "pdf delivery without verified email allowed",
  "billing pdf without provider authority allowed",
  "dashboard vault pdf drift allowed",
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

console.log("Dashboard action inbox validation passed with conversion command center, proof-first paid-depth path, money-surface reentry, owner posture, category-defining authority, verify-to-view, deliverability posture, safe PDF attachment policy, dashboard message mirror, and safe language coverage.");

function unsafeBusinessClaims() {
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
