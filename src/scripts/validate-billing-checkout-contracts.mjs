import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const contractPath = "src/lib/billing-checkout-contracts.ts";
const checkoutOrchestrationPath = "src/lib/pricing-checkout-orchestration.ts";
const deliveryContractPath = "src/lib/plan-delivery-orchestration-contracts.ts";
const emailContractPath = "src/lib/customer-email-confirmation-handoff-contracts.ts";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const packagePath = "package.json";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-billing-checkout-contracts.mjs";
const failures = [];

expect(contractPath, [
  "BILLING_CHECKOUT_CONTRACT",
  "BILLING_CHECKOUT_BLOCKED_PATTERNS",
  "Billing Checkout and Payment Link Contract",
  "checkout-success-to-dashboard-activation",
  "entitlement-to-report-trigger",
  "report-release-to-follow-up-retention",
  "billing-document-to-verified-email",
  "report/workflow trigger",
  "reportTriggerFields",
  "postPaymentRules",
  "pdfDocumentDeliveryRules",
  "fulfillment must be idempotent",
  "verified webhook fulfillment or server-confirmed provider state remains the source of truth",
  "After successful fulfillment, Cendorq must create the entitlement, dashboard notification, billing projection, report or work queue, plan-specific intake state, kickoff email, document delivery state, and support path.",
  "Each plan must map to a report/result trigger: Free Scan result, AI Readiness Review report, Signal Repair delivery record, or Readiness Control monthly report and watchlist.",
  "Post-delivery follow-up must include result explanation, next action, support or correction path, satisfaction check, and evidence-backed retention or next-depth recommendation when justified.",
]);

expect(contractPath, [
  "AI Readiness Review payment link id or URL provided by owner",
  "Signal Repair payment link id or URL provided by owner",
  "Readiness Control payment link id or URL provided by owner",
  "billing portal link id or URL provided by owner",
  "Checkout must be created server-side or via owner-provided payment link mapping",
  "browser must not create authoritative billing state",
  "checkoutSessionIdHash",
  "backendStartSignal",
  "reportTrigger",
  "auditId",
]);

expect(contractPath, [
  "Billing webhooks must be verified with provider signature before any entitlement change.",
  "Webhook event ids must be idempotent and stored as hashes or safe references.",
  "Fulfillment must be idempotent by checkout session or subscription event and must not create duplicate entitlement, report, work queue, email, notification, or PDF delivery records.",
  "Entitlement updates require provider event type, customer ownership mapping, plan mapping, report/workflow trigger, and audit event.",
  "Raw provider payloads, raw billing data, payment method details, card numbers, bank details, and provider internals must not be projected to customer surfaces.",
]);

expect(contractPath, [
  "PDF delivery is allowed only after verified email, customer ownership, entitlement or permitted free-result access, release gate, no-leak check, and safe document generation pass.",
  "Report PDFs should be attached or made downloadable when the report/result is released, customer-safe, and matched to the correct verified customer identity.",
  "Billing PDFs such as receipts, invoices, and payment confirmations may be delivered only from verified billing events or provider-authoritative invoice/receipt records.",
  "Dashboard report vault remains the canonical source; email attachments and downloadable PDFs must match the vault release state and must not create a separate truth source.",
  "PDF files must use safe filenames, Cendorq branding, document type, date, customer/business reference, and no executable content, macros, embedded scripts, hidden tracking payloads, or raw provider/customer data.",
  "PDF delivery email must come from the approved sender identity, explain why the document is attached, identify the plan or billing event, and route back to the dashboard or billing center for verification.",
  "If attachment safety, release state, provider state, or email verification is uncertain, send a dashboard-vault link or billing-center link instead of an attachment until the gate passes.",
]);

expect(contractPath, [
  "entitlementProjectionFields",
  "currentAccess",
  "pendingAction",
  "futureEntitlement",
  "billingPortalAvailable",
  "invoiceAvailability",
  "supportPath",
  "reportOrWorkStatus",
  "reportVaultPath",
  "nextIntakeStep",
  "followUpStatus",
  "documentDeliveryStatus",
  "blockedProjectionFields",
  "rawReportEvidence",
  "privateReportPrompt",
  "exactScoringWeights",
  "executableAttachment",
  "macroEnabledAttachment",
  "embeddedScriptAttachment",
]);

expect(contractPath, [
  "Do not enable paid checkout until payment links or provider checkout config are owner-provided and mapped to plan keys.",
  "Do not activate entitlement from client-only success redirects; verified webhook or server-confirmed provider state is required.",
  "Do not expose paid report access until entitlement, report release approval, customer ownership, and verified access pass.",
  "Do not send post-payment reports, implementation summaries, monthly control reports, satisfaction claims, retention recommendations, or PDF attachments before the correct plan trigger and release gate pass.",
  "Do not attach or expose billing PDFs unless provider event state, customer ownership, verified email, safe projection, and document safety checks pass.",
]);

expect(contractPath, [
  "clientAuthoritativeBillingState",
  "unverifiedWebhookEntitlement",
  "duplicateFulfillment",
  "successRedirectEntitlementOnly",
  "paidReportAccessBeforeReleaseGate",
  "rawProviderPayloadProjection",
  "rawBillingDataProjection",
  "cardNumberCollectionInSupport",
  "bankDetailsCollectionInSupport",
  "providerSecretExposure",
  "webhookSecretExposure",
  "rawReportEvidenceProjection",
  "privateReportPromptProjection",
  "exactScoringWeightsProjection",
  "executableAttachmentDelivery",
  "macroEnabledAttachmentDelivery",
  "embeddedScriptAttachmentDelivery",
  "pdfDeliveryWithoutVerifiedEmail",
  "pdfDeliveryWithoutReleaseGate",
  "billingPdfWithoutProviderAuthority",
  "dashboardVaultPdfDrift",
  "postPaymentWorkflowMissing",
  "satisfactionLoopMissing",
]);

expect(emailContractPath, [
  "dashboardMessageMirrorRules",
  "pdfAttachmentRules",
  "emailDeliverabilityRules",
  "Every important customer email must create or update a matching dashboard message record",
  "Report PDFs and billing PDFs are allowed when they help the customer preserve the result, invoice, receipt, or payment confirmation, but they must never be the only access path.",
]);

expect(checkoutOrchestrationPath, [
  "CENDORQ_POST_PAYMENT_SERVICE_SEQUENCE",
  "CENDORQ_REPORT_TRIGGER_MATRIX",
  "CENDORQ_CHECKOUT_METADATA_KEYS",
  "getCendorqReportTrigger",
  "idempotent-fulfillment",
  "entitlement-and-workflow-creation",
  "customer-onboarding-and-intake",
  "report-or-delivery-production",
  "branded-report-release",
  "follow-up-satisfaction-retention",
  "checkout.session.completed",
  "retrieve the session with line items",
  "report/work queue",
  "release-captain review",
]);

expect(checkoutOrchestrationPath, [
  "Free Scan result",
  "AI Readiness Review report",
  "Signal Repair delivery summary and before/after record",
  "Readiness Control monthly report and dashboard watchlist",
  "free_scan_verified_and_ready",
  "deep_review_paid_and_intake_ready",
  "signal_repair_paid_and_scope_ready",
  "readiness_control_subscription_active",
  "first-signal-readiness-result",
  "cause-level-ai-readiness-review",
  "scoped-repair-delivery-record",
  "monthly-readiness-control-report",
  "logoPresent",
  "methodologyVersion",
  "correctionPath",
]);

expect(deliveryContractPath, [
  "businessOperatingPhilosophy",
  "stageTargetingStandard",
  "continuousNurturingStandard",
  "stageTargetingMatrix",
  "Every surface must think in stage, proof, psychology, next action, and long-term value.",
  "The dashboard is the primary conversion command room after Free Scan",
  "future-feature-rollout",
  "retargetingWithoutStageReason",
  "retargetingWithoutSuppressionRules",
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
  "node ./src/scripts/validate-routes-chain.mjs",
  "validate-owner-maximum-protection-posture.mjs",
]);

expect(routesChainPath, [
  validatorPath,
]);

forbidden(contractPath, unsafeBillingPhrases());
forbidden(checkoutOrchestrationPath, unsafeBillingPhrases());
forbidden(deliveryContractPath, unsafeBillingPhrases());
forbidden(emailContractPath, unsafeBillingPhrases());

if (failures.length) {
  console.error("Billing checkout contracts validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Billing checkout contracts validation passed with owner posture, webhook/idempotent fulfillment, Stripe/link mapping, entitlement, report triggers, branded report release gates, safe PDF document delivery, dashboard-message mirror, post-payment service sequence, satisfaction follow-up, continuous nurturing, stage-targeted retargeting, and safe billing projection coverage.");

function unsafeBillingPhrases() {
  return [
    "client creates authoritative billing state",
    "unverified webhook can update entitlement",
    "collect card numbers in support",
    "collect bank details in support",
    "guaranteed ROI",
    "guaranteed revenue",
    "guaranteed refund",
    "guaranteed placement",
    "fake urgency is allowed",
    "hide support path",
    "clientAuthoritativeBillingStateAllowed",
    "successRedirectEntitlementOnlyAllowed",
    "duplicateFulfillmentAllowed",
    "paidReportAccessBeforeReleaseGateAllowed",
    "postPaymentWorkflowMissingAllowed",
    "satisfactionLoopMissingAllowed",
    "pdfDeliveryWithoutVerifiedEmailAllowed",
    "billingPdfWithoutProviderAuthorityAllowed",
    "dashboardVaultPdfDriftAllowed",
  ];
}

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
