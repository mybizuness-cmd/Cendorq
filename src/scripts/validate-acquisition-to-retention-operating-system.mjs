import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const standardPath = "docs/acquisition-to-retention-operating-system.md";
const bestStandardPath = "docs/best-of-best-operating-standard.md";
const maximumProtectionPath = "docs/maximum-protection-standard.md";
const deliveryContractPath = "src/lib/plan-delivery-orchestration-contracts.ts";
const emailContractPath = "src/lib/customer-email-confirmation-handoff-contracts.ts";
const docsIndexPath = "docs/command-center-docs-index.md";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-acquisition-to-retention-operating-system.mjs";
const failures = [];

expect(standardPath, [
  "# Acquisition-to-Retention Operating System",
  "Cendorq must operate from before the visit through long-term retention as one connected system.",
  "easier to discover, easier to trust, easier to choose, easier to recover, and harder to replace",
  "## Core rule",
  "What brought the customer here?",
  "What do they need to understand immediately?",
  "What proof or boundary makes the next step feel safe?",
  "What is the one strongest action?",
  "What is the recovery path",
  "What data stays public and what stays protected?",
  "What changes over time that gives the customer a true reason to come back?",
]);

expect(standardPath, [
  "## Discovery before the visit",
  "useful public content",
  "clean technical SEO",
  "structured data",
  "accessibility",
  "speed",
  "crawlable public routes",
  "trustworthy page titles",
  "descriptive metadata",
  "category-defining authority",
  "Cendorq must not promise guaranteed traffic, guaranteed ranking, guaranteed indexing, guaranteed AI answer placement, guaranteed number-one search results, guaranteed leads, or guaranteed revenue.",
  "private dashboards, reports, billing, support, admin, command-center, customer documents, and customer-specific files must not be public discovery surfaces",
]);

expect(standardPath, [
  "## Landing experience",
  "name the real business problem",
  "explain why it matters now",
  "give one strongest next action",
  "give one secondary safe path when needed",
  "avoid generic agency language, generic AI-tool language, and noisy CTA walls",
]);

expect(standardPath, [
  "## Public page roles",
  "Homepage: category authority and first decision path.",
  "Free Scan: first signal and protected intake.",
  "Plans: decision-depth comparison.",
  "Plan detail pages: one plan, one buyer objection, one checkout path, one fallback to comparison.",
  "Terms, privacy, disclaimer: trust boundaries that protect without weakening desire.",
]);

expect(standardPath, [
  "## Conversion path",
  "Cendorq should convert by reducing uncertainty, not by adding pressure.",
  "Free Scan should create a useful first signal, not pretend to be a full audit",
  "AI Readiness Review should sell deeper proof when cause and priority matter",
  "Signal Repair should sell scoped execution only when the weak signal is clear enough",
  "Readiness Control should sell ongoing value when change, movement risk, baseline tracking, or forecast refresh gives a true reason to return",
  "every stronger recommendation should be tied to evidence",
  "every checkout path should preserve provider-authoritative billing trust",
]);

expect(standardPath, [
  "## After checkout",
  "confirm the selected plan",
  "show what unlocked",
  "show what happens next",
  "route to dashboard, billing, messages, report vault, support, or intake as appropriate",
  "mirror important emails into dashboard messages where applicable",
  "never make email or PDF the only access path for important customer state",
]);

expect(standardPath, [
  "## Email and lifecycle nurturing",
  "Emails should be useful, recognizable, low-noise, mobile-readable, and connected to dashboard recovery.",
  "verification email opens the protected customer path",
  "report-ready email returns the customer to the report vault",
  "billing email returns the customer to billing center or provider-authoritative state",
  "support email returns the customer to support status or support center",
  "plan-fit email should educate before selling",
  "retention email should only appear when there is a real reason",
  "every important email should have a mirrored dashboard message when applicable",
]);

expect(standardPath, [
  "## Dashboard conversion and retention",
  "The dashboard is the private money surface.",
  "proof first",
  "next best action second",
  "source-of-truth recovery always available",
  "conversion should be stage-targeted and evidence-backed",
  "monthly or recurring value should be shown only where it is true",
]);

expect(standardPath, [
  "## Report value and forecast usefulness",
  "forecasts are directional decision aids, not guarantees",
  "report vault remains the canonical protected view",
  "PDFs must mirror released report-vault state and pass document-safety gates",
  "update/refresh recommendations should be tied to change, proof freshness, competitor movement, platform behavior, or customer-stage risk",
]);

expect(standardPath, [
  "## Support and recovery",
  "Support protects revenue when it resolves anxiety.",
  "acknowledge the human issue",
  "choose source of truth first",
  "avoid duplicate request loops",
  "collect safe summaries only",
]);

expect(standardPath, [
  "## Retention and reactivation",
  "Retention must be earned by true ongoing usefulness.",
  "search/AI behavior changed",
  "customer expectations changed",
  "competitor posture changed",
  "proof or reviews became stale",
  "a baseline moved",
  "a forecast needs refresh",
  "Reactivation should be calm and specific",
]);

expect(standardPath, [
  "## Security and privacy across the journey",
  "Growth must not expose private data.",
  "public discovery is for public education and public buyer paths only",
  "protected customer surfaces require verified access and authorization",
  "robots.txt is not a privacy control",
  "customer data should not appear in public metadata, public pages, public sitemaps, client bundles, analytics payloads, or logs",
]);

expect(standardPath, [
  "## Continuous improvement loop",
  "Research market, customer, platform, security, SEO, AI/search, and competitor changes.",
  "Identify which pages, messages, reports, or plan-fit logic are affected.",
  "Validate claims, security, privacy, accessibility, SEO, support, billing, report, and dashboard effects.",
  "Feed safe lessons into doctrine, validators, lifecycle, and report logic.",
]);

expect(standardPath, [
  "## Blocked patterns",
  "guaranteed ranking or traffic promises",
  "guaranteed indexing or AI answer placement promises",
  "cluttered page systems",
  "generic SEO blog spam",
  "private content used for public discovery",
  "lifecycle emails with no real reason",
  "dashboard upsells without evidence",
  "reports that blur facts and forecasts",
  "retention pressure without movement risk",
  "public transparency that exposes private mechanics",
]);

expect(bestStandardPath, [
  "## Page and subpage operating system",
  "## No-clutter design doctrine",
  "## Future-proofing doctrine",
  "Every page and subpage must have a clear job",
]);

expect(maximumProtectionPath, [
  "## Safe indexing and public discovery boundary",
  "public pages may be indexable for discovery",
  "private routes require authentication and authorization; robots.txt is never a privacy control",
]);

expect(deliveryContractPath, [
  "stageTargetingMatrix",
  "continuousNurturingStandard",
  "futureFeatureRelevance",
]);

expect(emailContractPath, [
  "dashboardMessageMirrorRules",
  "emailDeliverabilityRules",
  "pdfAttachmentRules",
]);

expect(docsIndexPath, [
  "docs/acquisition-to-retention-operating-system.md",
  validatorPath,
]);

expect(routesChainPath, [validatorPath]);

forbidden(standardPath, [
  "guaranteed traffic is allowed",
  "guaranteed ranking is allowed",
  "guaranteed indexing is allowed",
  "guaranteed AI answer placement is allowed",
  "private content may be public discovery",
  "robots.txt is a privacy control",
  "email-only access path is allowed",
  "PDF-only access path is allowed",
  "dashboard upsells without evidence are allowed",
]);

if (failures.length) {
  console.error("Acquisition-to-retention operating system validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Acquisition-to-retention operating system validation passed with discovery, landing, public page roles, conversion, checkout, lifecycle email, dashboard retention, report value, support recovery, security/privacy, continuous improvement, and blocked-pattern coverage.");

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
