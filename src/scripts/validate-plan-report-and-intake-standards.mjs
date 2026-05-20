import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

expect("docs/plan-report-agent-delivery-standard.md", [
  "# Cendorq Plan Report and Agent Delivery Standard",
  "Reports must be educational while selling and informational while selling.",
  "Free Scan",
  "Deep Review",
  "Build Fix",
  "Ongoing Control",
  "Maximum customer-facing length: two pages.",
  "Cendorq letterhead",
  "simple signal meter or readiness bar",
  "competitor comparison",
  "forecast or risk outlook",
  "Dashboard report records",
  "Agent chain of command",
  "Release Captain owns final validation",
  "Chief Report Truth Agent owns evidence",
  "Chief Customer Experience Agent owns plain-language clarity",
  "Chief Security and Privacy Agent owns private data",
  "Chief Market Forecast Agent owns competitor movement",
  "No sub-agent or chief agent can release a customer report without release captain approval.",
  "Do not push a plan that does not fit the evidence.",
]);

expect("docs/customer-intake-payment-standard.md", [
  "# Cendorq Customer Intake and Payment Timing Standard",
  "Use progressive intake.",
  "Ask only what is needed to start.",
  "Payment should happen before the heavy paid plan questionnaire.",
  "The Free Scan form should feel like one clean action or two light steps",
  "Success page confirms purchase and asks the next most important question.",
  "Dashboard shows a simple remaining-information checklist.",
  "Agents start safe public research with what is available.",
  "Every paid plan should create a dashboard work record immediately after payment.",
  "Received",
  "Waiting on your details",
  "Research started",
  "Ready in dashboard",
]);

expect("src/components/free-check/guided-free-check-form-v3.tsx", [
  "type StepNumber = 0 | 1;",
  "Start the Free Scan.",
  "Make the first signal useful.",
  "without making the Free Scan feel like work",
  "Main location",
  "splitLocation(values.location)",
  "country: locationParts.country",
  "stateRegion: locationParts.stateRegion",
  "city: locationParts.city",
  "combined-location parsing",
  "Use business context only. Do not enter private credentials.",
  "See Deep Review",
  "See Build Fix",
  "See Ongoing Control",
]);

expect("docs/command-center-docs-index.md", [
  "docs/plan-report-agent-delivery-standard.md",
  "docs/customer-intake-payment-standard.md",
  "plan report standard",
  "customer intake and payment timing",
]);

expect("docs/release-checklist.md", [
  "docs/plan-report-agent-delivery-standard.md",
  "docs/customer-intake-payment-standard.md",
  "report design quality",
  "plan report delivery",
  "progressive customer intake",
  "payment timing",
  "plan-report impact",
  "customer-intake impact",
]);

expect("src/scripts/validate-command-center-docs-index.mjs", [
  "docs/plan-report-agent-delivery-standard.md",
  "docs/customer-intake-payment-standard.md",
  "plan-specific report",
  "progressive intake",
]);

reject("docs/plan-report-agent-delivery-standard.md", [
  "guaranteed ranking",
  "guaranteed AI placement",
  "guaranteed leads",
  "guaranteed revenue",
  "full competitor analysis inside Free Scan",
]);

reject("docs/customer-intake-payment-standard.md", [
  "long Free Scan questionnaires",
  "heavy paid plan questionnaires before checkout",
  "hidden post-payment blockers",
  "fake progress",
]);

reject("src/components/free-check/guided-free-check-form-v3.tsx", [
  "type StepNumber = 0 | 1 | 2 | 3;",
  "COUNTRIES",
  "US_STATES",
  "Who do customers compare you with?",
  "Anything else we should know?",
  "See AI Readiness Review",
  "See Signal Repair",
  "See Readiness Control",
]);

if (failures.length) {
  console.error("Plan report and intake standards validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Plan report and intake standards validation passed with premium report rules, progressive intake, paid-plan payment timing, simplified Free Scan intake, dashboard blockers, and agent work-start guidance.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing required dependency: ${path}`);
    return;
  }
  const text = read(path);
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing required phrase: ${phrase}`);
}

function reject(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  for (const phrase of phrases) if (text.includes(phrase)) failures.push(`${path} contains forbidden phrase: ${phrase}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
