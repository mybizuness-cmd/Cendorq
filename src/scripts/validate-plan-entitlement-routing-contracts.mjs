import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const contractPath = "src/lib/plan-entitlement-routing-contracts.ts";
const planValidatorPath = "src/scripts/validate-plan-delivery-orchestration-contracts.mjs";
const failures = [];

expect(contractPath, [
  "PLAN_ENTITLEMENT_ROUTING_CONTRACT",
  "Cendorq Plan Entitlement and Nonlinear Purchase Routing Contract",
  "getPlanEntitlementRoutingContract",
  "Customers may purchase any public plan directly",
  "must not deliver unpaid reports",
  "unpaid implementation packages",
  "unpaid recurring control",
]);

expect(contractPath, [
  "publicPlanMicroDisclosures",
  "dashboardReminderRules",
  "reportLimitationRules",
  "entitlementBoundaries",
  "nonlinearPurchaseScenarios",
  "limitationLanguageRules",
  "loopholeProtections",
  "releaseRules",
]);

expect(contractPath, [
  "Free Scan is a first-read report. Full diagnosis, implementation, and recurring monitoring are separate plans if you want deeper help.",
  "Deep Review explains what is likely weakening the business and why. Done-for-you optimization and monthly control are separate scopes.",
  "Build Fix can proceed directly. For the clearest customer-facing diagnosis behind the work, add Deep Review; otherwise Cendorq uses available evidence and internal orientation within the purchased optimization scope.",
  "Ongoing Control can start directly. If implementation gaps are found, Build Fix is the proper plan for done-for-you optimization; Deep Review is the proper plan for a standalone full diagnosis.",
  "small, calm, factual, non-pressure",
  "small, clear, scope-protective, non-blocking",
]);

expect(contractPath, [
  "Dashboard reminders should be calm, small, and contextual; they should not block payment or create fake urgency.",
  "If a customer buys Build Fix without Deep Review",
  "If a customer buys Ongoing Control without Build Fix",
  "If a customer buys Ongoing Control without Deep Review",
  "Dashboard reminders must distinguish included deliverables from recommended add-ons",
]);

expect(contractPath, [
  "Every report must match the purchased plan and explain only the deliverables included in that plan.",
  "Reports may include small limitation notes explaining that recommendations are based on available evidence",
  "Build Fix delivery reports may explain what was optimized and why, but must not attach or recreate the full Deep Review report unless Deep Review is purchased.",
  "Ongoing Control monthly reports may summarize monitored signals, recommendations, approved changes, and value proof",
  "Report footers should educate customers on the next best plan without pressure, fake urgency, or unsupported outcome promises.",
]);

expect(contractPath, [
  "build-fix-without-deep-review",
  "ongoing-control-without-build-fix",
  "ongoing-control-without-deep-review",
  "deep-review-without-build-fix",
  "free-scan-only",
  "Build Fix artifacts only; internal diagnostic orientation remains internal.",
  "Monthly outputs only; Build Fix package requires Build Fix purchase.",
  "Monthly command summaries only; full diagnostic report requires Deep Review purchase.",
  "Diagnostic artifacts only; done-for-you implementation requires Build Fix purchase.",
  "Free report only.",
]);

expect(contractPath, [
  "No full diagnostic report from Build Fix unless Deep Review entitlement exists.",
  "No Build Fix implementation package from Ongoing Control unless Build Fix entitlement exists.",
  "No recurring monitoring from Deep Review or Build Fix unless Ongoing Control entitlement exists.",
  "No full competitor teardown, complete funnel strategy, or implementation plan from Free Scan.",
  "No unpaid internal analysis becomes downloadable, emailed, report-vault-visible, or customer-facing as a standalone artifact.",
  "No customer-facing output may imply a skipped plan was fully performed when only scoped internal orientation was used.",
  "No plan may use skipped-plan internal orientation to satisfy paid deliverables that belong to another plan.",
]);

expect(planValidatorPath, [
  "src/lib/plan-entitlement-routing-contracts.ts",
  "PLAN_ENTITLEMENT_ROUTING_CONTRACT",
  "publicPlanMicroDisclosures",
  "loopholeProtections",
]);

forbidden(contractPath, [
  "block purchase",
  "force linear path",
  "give away",
  "full diagnostic report is included in build fix",
  "build fix is included in monthly",
  "monthly monitoring is included in deep review",
  "guaranteed ROI",
  "guaranteed revenue",
  "guaranteed accuracy",
  "100% accurate",
  "100 percent accurate",
  "impossible to hack",
  "never liable",
  "liability-free",
  "fake urgency is allowed",
  "passwords requested",
  "tokens requested",
  "private keys requested",
  "card numbers requested",
  "bank details requested",
  "raw payloads are exposed",
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

console.log("Plan entitlement routing contracts validation passed.");

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
