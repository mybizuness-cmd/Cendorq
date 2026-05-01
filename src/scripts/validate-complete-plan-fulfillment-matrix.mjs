import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const matrixPath = "src/lib/complete-plan-fulfillment-matrix.ts";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const failures = [];

expect(matrixPath, [
  "COMPLETE_PLAN_FULFILLMENT_MATRIX",
  "Complete Cendorq Plan Fulfillment Matrix",
  "getCompletePlanFulfillmentMatrix",
  "complete A-to-Z fulfillment system for every Cendorq plan",
  "value above price",
  "customer education",
]);

expect(matrixPath, [
  "trigger",
  "customer confirmation",
  "safe intake",
  "evidence collection",
  "truth separation",
  "agent work assignment",
  "production work",
  "quality review",
  "release-captain approval",
  "customer delivery",
  "email notification",
  "dashboard update",
  "report vault update",
  "support path",
  "follow-up sequence",
  "upgrade or retention path",
  "audit and learning record",
]);

expect(matrixPath, [
  "valueArchitecture",
  "educationalReportStandard",
  "planBoundaryRules",
  "conversionStandards",
  "Each plan must deliver practical value that reasonably exceeds the price through clarity, evidence, prioritization, education, implementation usefulness, safer decisions, and a clear next move.",
  "Each plan must protect Cendorq revenue streams by delivering the promised scope fully without giving away higher-tier implementation, recurring control, or expanded research that belongs in another plan.",
  "Assume most customers do not know the technical or strategic meaning of what the report finds.",
  "Every report section must explain the finding in plain language, why it matters to the business, what evidence supports it, what uncertainty remains, and what the customer can do next.",
  "Reports must teach customers the difference between symptoms, root causes, assumptions, evidence, risk, opportunity, and recommended action.",
  "Free Scan may educate and point to likely next steps, but must not include the full diagnostic depth, implementation plan, or recurring control reserved for paid plans.",
  "Deep Review may provide a full evidence-backed diagnosis and priority plan, but must not include done-for-you implementation that belongs to Build Fix.",
  "Build Fix may include scoped implementation support and delivery artifacts, but must not include unlimited monitoring or recurring market adaptation that belongs to Ongoing Control.",
  "Conversion should come from customer understanding, proof, clear gaps, practical next steps, premium trust, and appropriate plan fit.",
  "Plan-fit language must make the customer feel understood, not pushed.",
]);

expect(matrixPath, [
  "free-scan",
  "deep-review",
  "build-fix",
  "ongoing-control",
  "Free Scan / Free Report",
  "Deep Review / Full Scan",
  "Build Fix / Optimization",
  "Ongoing Control / Monthly",
]);

expect(matrixPath, [
  "valuePromise",
  "educationDepth",
  "planBoundary",
  "conversionMethod",
  "Give the customer enough clarity to understand the most visible business friction",
  "Teach the customer the basic difference between visible symptoms, likely causes, missing proof, and a safe next step.",
  "Do not include full competitor teardown, complete funnel strategy, done-for-you implementation plan, or recurring monitoring.",
  "Deliver a report that gives the customer a clearer decision map than they could reasonably build alone",
  "Teach the customer what is weakening trust, conversion, positioning, offer clarity, customer choice, and next-step confidence.",
  "Do not include done-for-you page changes, implementation labor, unlimited revisions, or recurring monitoring.",
  "Convert diagnosis into concrete improvements",
  "Teach the customer what changed, why it was changed, what evidence supported it, how to use it, and what still requires monitoring.",
  "Keep the customer ahead of changes through recurring evidence review",
  "Teach the customer what changed in their market, funnel, platform, audience, or offer environment and what action is appropriate now.",
]);

expect(matrixPath, [
  "scan received confirmation",
  "free scan intake record",
  "free scan report",
  "report ready email with dashboard/report-vault path",
  "expanded diagnostic questionnaire",
  "full diagnostic report",
  "priority blocker map",
  "scope, assets, and approval checklist",
  "before-change evidence snapshot",
  "optimization plan",
  "before-after summary",
  "subscription active confirmation",
  "monthly command summary",
  "forecast and risk map",
  "retention/value summary",
]);

expect(matrixPath, [
  "customer-journey-scout",
  "report-truth-research-scout",
  "chief-report-truth-agent",
  "report-design-quality-scout",
  "evidence-conflict-scout",
  "chief-product-experience-agent",
  "conversion-luxury-ui-scout",
  "security-privacy-scout",
  "analytics-and-growth-scout",
  "business-change-forecasting-scout",
  "chief-growth-forecast-agent",
  "release-captain",
]);

expect(matrixPath, [
  "no secrets, no raw payload exposure",
  "evidence labeled by source and confidence",
  "customer claims not treated as verified facts",
  "no final-complete diagnosis claim",
  "report release approved",
  "no passwords, tokens, private keys, card numbers, or bank details",
  "no uncontrolled production mutation",
  "customer-facing delivery approved",
  "no fake urgent alert",
  "value proof without guaranteed outcome",
]);

expect(matrixPath, [
  "No plan asks for passwords, private keys, raw tokens, card numbers, bank details, or raw security payloads.",
  "No plan treats customer-provided claims as verified facts without supporting evidence.",
  "No plan uses fake urgency or pressure sequences.",
  "No plan guarantees revenue, ROI, ranking, traffic, security, or business outcome.",
  "No plan exposes raw payloads, raw evidence, provider payloads, internal notes, operator identities, secrets, or cross-customer data.",
  "No agent can approve delivery, launch, report release, customer-facing claims, provider settings, or production-impacting changes.",
  "Every production-impacting or customer-facing output routes through release-captain review and the relevant approval gate.",
]);

expect(matrixPath, [
  "Every deliverable should be useful enough that the customer understands what changed, why it matters, what is proven, what is not proven, and what to do next.",
  "Every plan should feel premium, clear, calm, and high-conviction without pretending certainty beyond the evidence.",
  "Every plan should reduce customer confusion and route the customer to the next safe destination.",
  "Every plan should create a support/correction path so customer concerns do not become duplicate submissions or dead ends.",
  "Every plan should provide more practical clarity, educational value, and decision usefulness than the customer expects from the price paid.",
  "Every plan should protect the next appropriate revenue stream by clearly explaining what is included, what is not included, and what higher-tier help would add.",
]);

expect(routesChainPath, [
  "src/scripts/validate-plan-delivery-orchestration-contracts.mjs",
]);

forbidden(matrixPath, [
  "guaranteed ROI",
  "guaranteed revenue",
  "guaranteed accuracy",
  "100% accurate",
  "100 percent accurate",
  "impossible to hack",
  "never liable",
  "liability-free",
  "fake urgency is allowed",
  "agents can approve delivery",
  "agents may approve delivery",
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
  console.error("Complete plan fulfillment matrix validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Complete plan fulfillment matrix validation passed.");

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
