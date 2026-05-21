import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const handoffPath = "docs/agent-handoff/current-handoff.md";
const masteryPath = "docs/strategy/cendorq-business-mastery.md";
const nonNegotiablesPath = "docs/ops/non-negotiables.md";
const latestGreenPath = "docs/ops/latest-green-state.md";
const accessSourcesPath = "docs/ops/customer-access-sources.md";
const accessTriagePath = "docs/ops/access-triage-checklist.md";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-cendorq-agent-handoff-docs.mjs";

expect(handoffPath, [
  "Cendorq Current Agent Handoff",
  "category-control company",
  "Free Scan creates the customer",
  "Customer Access brings the customer back",
  "Provider buttons verify identity",
  "Known customers continue to dashboard",
  "Unknown people go to Free Scan",
  "No blank accounts",
  "next-1017",
  "resolveCustomerAccessEligibility",
  "evaluateProviderCallbackCustomerAccess",
  "Do not regress",
]);

expect(masteryPath, [
  "Cendorq Business Mastery Doctrine",
  "business visibility and AI-readiness control system",
  "Cendorq does not sell a generic website audit",
  "Free Scan captures real business information",
  "Authentication proves identity. It does not prove Cendorq customer status.",
  "No blank dashboards",
  "Provider buttons should say Continue with Google, Continue with Microsoft, Continue with Apple, and Continue with Yahoo only when the runtime is genuinely ready.",
  "what is the best next business action",
]);

expect(nonNegotiablesPath, [
  "Cendorq Non-Negotiables",
  "Free Scan first for new visitors.",
  "No blank dashboard accounts.",
  "No customer-facing create-workspace language.",
  "Provider buttons stay hidden until real provider callback runtime is production-ready.",
  "Authentication is not authorization.",
  "No account-existence leakage.",
  "Use validators to lock every product rule.",
]);

expect(latestGreenPath, [
  "Latest Green State",
  "mybizuness-cmd/Cendorq",
  "next-1017",
  "Vercel success",
  "Free Scan-first access model",
  "secure email access gated by existing customer eligibility",
  "unknown email routed to Free Scan",
  "provider callback access gate defined",
  "active Free Scan eligibility source",
  "contract-ready paid plan, report vault, billing, and support eligibility source ladder",
  "Customer access source documentation is present.",
]);

expect(accessSourcesPath, [
  "Customer Access Sources",
  "Free Scan is active now.",
  "Paid plan: opens billing after confirmed plan ownership.",
  "Report vault: opens reports after released report ownership.",
  "Billing: opens billing from server-side billing history.",
  "Support: opens support from verified customer context.",
  "Do not use checkout links, browser state, or blank accounts as access sources.",
]);

expect(accessTriagePath, [
  "Customer Access Triage Checklist",
  "New visitor goes to Free Scan.",
  "Returning customer uses the same email from the scan or plan.",
  "Unknown email goes back to Free Scan, not an empty dashboard.",
  "Provider entry stays hidden until runtime can verify email and open the right customer path.",
  "Verify Vercel green before the next batch.",
]);

expect(routesChainPath, [validatorPath]);

if (failures.length) {
  console.error("Cendorq agent handoff docs validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Cendorq agent handoff docs validation passed with business doctrine, access law, non-negotiables, latest green state, customer access source docs, access triage checklist, and durable repo memory coverage.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing required handoff doc dependency: ${path}`);
    return;
  }
  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing handoff phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
