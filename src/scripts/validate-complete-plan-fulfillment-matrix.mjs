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
  "category-defining experience",
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
  "dashboard message mirror",
  "dashboard update",
  "report vault update",
  "safe PDF or billing document delivery when gates pass",
  "support path",
  "follow-up sequence",
  "stage-targeted nurture path",
  "upgrade or retention path",
  "audit and learning record",
]);

expect(matrixPath, [
  "valueArchitecture",
  "educationalReportStandard",
  "planBoundaryRules",
  "conversionStandards",
  "Each plan must deliver practical value that reasonably exceeds the price through clarity, evidence, prioritization, education, implementation usefulness, safer decisions, and a clear next move.",
  "Each plan must protect Cendorq revenue streams by delivering the promised scope fully without giving away higher-tier implementation, recurring control, expanded research, or standalone reports that belong in another plan.",
  "Assume most customers do not know the technical or strategic meaning of what the report finds.",
  "Reports, downloadable PDFs, email summaries, dashboard messages, and report-vault views must preserve the same truth structure without becoming separate sources of truth.",
  "Free Scan may educate and point to likely next steps, but must not include the full AI Readiness Review depth, implementation plan, or recurring control reserved for paid plans.",
  "AI Readiness Review may provide a full evidence-backed review and priority plan, but must not include done-for-you implementation that belongs to Signal Repair.",
  "Signal Repair may include scoped implementation support and delivery artifacts, but must not include unlimited monitoring or recurring market adaptation that belongs to Readiness Control.",
  "Readiness Control may include recurring review, forecasting, watchlists, and approval-gated recommendations",
  "Conversion should come from customer understanding, proof, clear gaps, practical next steps, category-defining trust, and appropriate plan fit.",
  "Stage-targeted nurture must move Free Scan toward AI Readiness Review, AI Readiness Review toward Signal Repair, Signal Repair toward Readiness Control",
]);

expect(matrixPath, [
  "free-scan",
  "deep-review",
  "build-fix",
  "ongoing-control",
  "AI Readiness Review",
  "Signal Repair",
  "Readiness Control",
]);

expect(matrixPath, [
  "valuePromise",
  "educationDepth",
  "planBoundary",
  "conversionMethod",
  "A fast first read that helps the customer understand likely friction before paying for deeper work.",
  "Plain-language first-read education with limits, uncertainty, and next safe action visible.",
  "Does not include AI Readiness Review depth, implementation plan, or recurring monitoring.",
  "Recommend AI Readiness Review only when evidence or uncertainty justifies deeper review.",
  "A fuller AI Readiness Review that turns evidence into priority, confidence, and next action clarity.",
  "Recommend Signal Repair or Readiness Control only when the evidence supports implementation or recurring monitoring.",
  "Signal Repair support that turns a proven blocker into scoped customer-approved work.",
  "Readiness Control with recurring command, monitoring, review, and safe next actions as the market changes.",
]);

expect(matrixPath, [
  "No plan asks for passwords, private keys, raw tokens, card numbers, bank details, or raw security payloads.",
  "No plan treats customer-provided claims as verified facts without supporting evidence.",
  "No plan uses fake urgency or pressure sequences.",
  "No plan promises certain revenue, ROI, ranking, traffic, security, deliverability, inbox placement, or business outcome.",
  "No plan exposes raw payloads, raw evidence, provider payloads, internal notes, operator identities, secrets, or cross-customer data.",
  "No agent can approve delivery, launch, report release, customer-facing claims, provider settings, or production-impacting changes.",
  "Every production-impacting or customer-facing output routes through release-captain review and the relevant approval gate.",
  "Every important email must mirror into the dashboard, and every PDF must stay gated by verification, entitlement or provider authority, release state, no-leak checks, and document safety.",
]);

expect(matrixPath, [
  "Every deliverable should be useful enough that the customer understands what changed, why it matters, what is proven, what is not proven, and what to do next.",
  "Every plan should feel category-defining, clear, calm, and high-conviction without pretending certainty beyond the evidence.",
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
  "Deep Review / Full Scan",
  "Build Fix / Optimization",
  "Ongoing Control / Monthly",
  "premium trust",
  "premium presentation",
  "Every plan should feel premium",
  "localStorage.setItem",
  "sessionStorage.setItem",
]);

if (failures.length) {
  console.error("Complete plan fulfillment matrix validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Complete plan fulfillment matrix validation passed with current plan names, category-defining quality, dashboard message mirror, safe PDF/document delivery, stage-targeted nurture, plan boundaries, and release-captain safety coverage.");

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
