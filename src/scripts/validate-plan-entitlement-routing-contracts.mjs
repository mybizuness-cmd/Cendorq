import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const contractPath = "src/lib/plan-entitlement-routing-contracts.ts";
const planValidatorPath = "src/scripts/validate-plan-delivery-orchestration-contracts.mjs";
const failures = [];

expect(contractPath, [
  "PLAN_ENTITLEMENT_ROUTING_CONTRACT",
  "Cendorq Plan Entitlement and Purchase Routing Contract",
  "getPlanEntitlementRoutingContract",
  "Customers may purchase any public plan directly",
  "linear purchases",
  "stopped journeys",
  "must not deliver unpaid reports",
  "unpaid implementation packages",
  "unsafe PDFs",
  "unpaid recurring control",
  "Every important entitlement, report, billing, support, or lifecycle email must mirror into the dashboard",
  "Report PDFs, billing PDFs, and downloadable documents must remain vault-first",
]);

expect(contractPath, [
  "publicPlanMicroDisclosures",
  "linearPurchaseSequences",
  "directPurchaseWarningEmails",
  "dashboardReminderRules",
  "reportLimitationRules",
  "entitlementBoundaries",
  "nonlinearPurchaseScenarios",
  "limitationLanguageRules",
  "loopholeProtections",
  "releaseRules",
]);

expect(contractPath, [
  "Free Scan is a first-read report. AI Readiness Review, Signal Repair, and Readiness Control are separate plans if you want deeper help.",
  "AI Readiness Review explains what is likely weakening the business and why. Signal Repair and Readiness Control are separate scopes.",
  "Signal Repair can proceed directly. For the clearest customer-facing review behind the work, add AI Readiness Review; otherwise Cendorq uses available evidence and internal orientation within the purchased repair scope.",
  "Readiness Control can start directly. If implementation gaps are found, Signal Repair is the proper plan for done-for-you improvement; AI Readiness Review is the proper plan for a standalone evidence-backed report.",
  "small, calm, factual, non-pressure",
  "small, clear, scope-protective, non-blocking",
]);

expect(contractPath, [
  "free-scan-stops",
  "deep-review-stops",
  "build-fix-stops",
  "ongoing-control-active",
  "Customer receives Free Scan and stops there.",
  "Customer receives AI Readiness Review and stops there.",
  "Customer receives Signal Repair and stops there.",
  "Customer is active on Readiness Control.",
  "one report-ready email mirrored into the dashboard",
  "report-ready email mirrored into dashboard",
  "delivery-ready email mirrored into dashboard",
  "monthly command summary mirrored into dashboard",
]);

expect(contractPath, [
  "signal-repair-direct-scope-confirmation",
  "readiness-control-direct-scope-confirmation",
  "Signal Repair purchased directly without AI Readiness Review entitlement.",
  "Readiness Control purchased directly without Signal Repair or AI Readiness Review entitlement.",
  "send after purchase, mirror into dashboard",
  "send after subscription start, mirror into dashboard",
  "Your Signal Repair scope is moving forward",
  "Your Readiness Control scope is active",
  "Direct-purchase warning emails for Signal Repair and Readiness Control must be periodic, suppressible, evidence-backed, mirrored into the dashboard, and non-essential; they must not block fulfillment or create pressure.",
]);

expect(contractPath, [
  "Dashboard reminders should be calm, small, contextual, and mirrored with related email state where applicable; they should not block payment or create fake urgency.",
  "If a customer buys Signal Repair without AI Readiness Review",
  "If a customer buys Readiness Control without Signal Repair",
  "If a customer buys Readiness Control without AI Readiness Review",
  "If a customer stops at Free Scan, AI Readiness Review, or Signal Repair",
  "Dashboard reminders must distinguish included deliverables from recommended add-ons",
]);

expect(contractPath, [
  "Every report must match the purchased plan and explain only the deliverables included in that plan.",
  "Reports may include small limitation notes explaining that recommendations are based on available evidence",
  "Signal Repair delivery records may explain what was repaired and why, but must not attach or recreate the full AI Readiness Review report unless AI Readiness Review is purchased.",
  "Readiness Control monthly reports may summarize monitored signals, recommendations, approved changes, and value proof",
  "Report vault display, downloadable PDFs, PDF attachments, and dashboard messages must match the entitlement state and must not create separate truth sources.",
]);

expect(contractPath, [
  "signal-repair-without-ai-readiness-review",
  "readiness-control-without-signal-repair",
  "readiness-control-without-ai-readiness-review",
  "ai-readiness-review-without-signal-repair",
  "free-scan-only",
  "Signal Repair artifacts only; internal review orientation remains internal.",
  "Monthly outputs only; Signal Repair package requires Signal Repair purchase.",
  "Monthly command summaries only; AI Readiness Review report requires AI Readiness Review purchase.",
  "Review artifacts only; done-for-you implementation requires Signal Repair purchase.",
  "Free report only.",
]);

expect(contractPath, [
  "No AI Readiness Review report from Signal Repair unless AI Readiness Review entitlement exists.",
  "No Signal Repair implementation package from Readiness Control unless Signal Repair entitlement exists.",
  "No recurring monitoring from AI Readiness Review or Signal Repair unless Readiness Control entitlement exists.",
  "No full competitor teardown, complete funnel strategy, or implementation plan from Free Scan.",
  "No unpaid internal analysis becomes downloadable, emailed, report-vault-visible, dashboard-message-visible, PDF-attached, or customer-facing as a standalone artifact.",
  "No customer-facing output may imply a skipped plan was fully performed when only scoped internal orientation was used.",
  "No plan may use skipped-plan internal orientation to satisfy paid deliverables that belong to another plan.",
  "No warning email may imply a missing prerequisite is required for the purchased plan to begin if payment has already been accepted.",
]);

expect(contractPath, [
  "Every direct-purchase path must show purchased entitlement, skipped recommended plan, customer-facing limitation, internal-only orientation allowance, conversion-back path, dashboard-message mirror state, and safe-document delivery state.",
  "Every linear stop point must show completed entitlement, not-included scope, next best plan, follow-up cadence, and suppression rules.",
  "Report vault, dashboard, email, mirrored dashboard messages, downloadable PDFs, and notification surfaces must only expose artifacts included in the purchased plan entitlement.",
]);

expect(planValidatorPath, [
  "src/lib/plan-entitlement-routing-contracts.ts",
  "src/lib/plan-post-delivery-reconciliation-contracts.ts",
  "PLAN_ENTITLEMENT_ROUTING_CONTRACT",
  "PLAN_POST_DELIVERY_RECONCILIATION_CONTRACT",
  "publicPlanMicroDisclosures",
  "linearPurchaseSequences",
  "directPurchaseWarningEmails",
  "loopholeProtections",
  "material-rework-change-order",
]);

forbidden(contractPath, [
  "force linear path",
  "full diagnostic report is included in build fix",
  "build fix is included in monthly",
  "monthly monitoring is included in deep review",
  "Deep Review explains",
  "Build Fix can proceed",
  "Ongoing Control can start",
  "Customer receives Deep Review",
  "Customer receives Build Fix",
  "Customer is active on Ongoing Control",
  "Build Fix purchased directly",
  "Ongoing Control purchased directly",
  "optimization scope is moving forward",
  "monthly control scope is active",
  "No full diagnostic report from Build Fix",
  "No Build Fix implementation package",
  "guaranteed ROI",
  "guaranteed revenue",
  "guaranteed accuracy",
  "100% accurate",
  "100 percent accurate",
  "impossible to hack",
  "never liable",
  "liability-free",
  "fake urgency is allowed",
  "urgent upgrade required",
  "customer claims are verified facts",
  "uncontrolled production mutation",
  "localStorage.setItem",
  "sessionStorage.setItem",
]);

if (failures.length) {
  console.error("Plan entitlement routing contracts validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Plan entitlement routing contracts validation passed with current plan names, nonlinear direct purchase paths, mirrored dashboard messages, vault-first safe document delivery, entitlement boundaries, and loophole protection.");

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
