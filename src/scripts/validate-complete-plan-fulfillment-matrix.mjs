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
]);

expect(routesChainPath, [
  "src/scripts/validate-complete-plan-fulfillment-matrix.mjs",
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
