import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const manualPath = "docs/owner-operating-manual.md";
const bestOfBestDocPath = "docs/best-of-best-operating-standard.md";
const bestOfBestStandardPath = "src/lib/best-of-best-operating-standard.ts";
const bestOfBestValidatorPath = "src/scripts/validate-best-of-best-operating-standard.mjs";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const captainAuditDocPath = "docs/captain-audit-hardening-control-plane.md";
const docsIndexPath = "docs/command-center-docs-index.md";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const continuousEvolutionContractPath = "src/lib/controlled-continuous-evolution-contracts.ts";
const controlledMaintenanceContractPath = "src/lib/controlled-maintenance-contracts.ts";
const unifiedAlignmentPath = "src/lib/unified-experience-alignment.ts";
const memoryLockPath = "docs/operating-memory-lock.md";
const failures = [];

expect(manualPath, [
  "# Cendorq Owner Operating Manual",
  "category-defining authority for business AI readiness",
  "more accurate, more useful, more trusted, more tailored, more current, more psychologically clear, more operationally disciplined, and more strategically complete",
  "The standard is not to promise impossible certainty.",
  "proof before output",
  "evidence before recommendation",
  "confidence before certainty",
  "contradictions surfaced instead of hidden",
  "customer context separated from verified facts",
  "forecast direction separated from fact",
  "plan advice tied to actual stage, blockers, evidence, movement risk, and readiness",
]);

expect(manualPath, [
  "## Best-of-best operating doctrine",
  "Apple-level clarity",
  "Stripe-level billing trust",
  "Shopify-level owner empowerment",
  "Salesforce-level system consistency",
  "Microsoft-level calm interaction",
  "Atlassian-level documented foundations",
  "Nielsen Norman usability discipline",
  "Intercom-level human support",
  "the public website must create authority before checkout",
  "the dashboard must prove that authority after payment",
  "one strongest next move",
  "billing must stay provider-authoritative",
  "report and billing documents must be vault-first or provider-authoritative first",
  "notifications and emails must mirror important customer messages into the dashboard when applicable",
  "support must acknowledge the human issue",
  "plan progression must sell through evidence, stage fit, and usefulness",
  "validators and docs must protect the quality bar",
  "docs/best-of-best-operating-standard.md",
  "src/lib/best-of-best-operating-standard.ts",
  "src/scripts/validate-best-of-best-operating-standard.mjs",
  "must run before downstream customer-delivery validators",
]);

expect(manualPath, [
  "## Unified surface lock",
  "public pages, plan pages, checkout, dashboard, report vault, billing, notifications, support, lifecycle, and owner operations aligned as one operating system",
  "homepage creates category clarity and the strongest start path without becoming a pricing table",
  "plan and plan-detail pages carry pricing, comparison, scope, fit, and what-happens-next clarity",
  "dashboard surfaces act as the customer command room",
  "backend triggers support the same journey the frontend communicates",
  "mobile is the main entrance and desktop is the command room",
  "blocks feel rich through hierarchy, spacing, proof, rhythm, and restraint rather than noise",
  "src/lib/unified-experience-alignment.ts",
  "src/scripts/validate-unified-experience-alignment.mjs",
  "src/scripts/validate-surface-level-alignment.mjs",
]);

expect(manualPath, [
  "## Operating memory lock",
  "A standard is locked only when it has:",
  "a doctrine or source file",
  "a validator",
  "route-chain execution",
  "route-chain integrity coverage",
  "docs or owner visibility",
  "docs/operating-memory-lock.md",
  "src/scripts/validate-operating-memory-lock.mjs",
]);

expect(unifiedAlignmentPath, [
  "UNIFIED_EXPERIENCE_ALIGNMENT",
  "Homepage creates category clarity",
  "Plans and plan-detail pages carry pricing",
  "Dashboard surfaces act as the customer command room",
  "Mobile is the main entrance; desktop is the command room",
]);

expect(memoryLockPath, [
  "Operating Memory Lock",
  "doctrine file, a validator, route-chain execution, route-chain integrity coverage, and docs visibility",
]);

expect(bestOfBestDocPath, [
  "# Best-of-Best Operating Standard",
  "Research-inspired operating principles",
  "Unified surface alignment doctrine",
  "Non-negotiable Cendorq quality bar",
  "Money-making discipline",
  "Blocked patterns",
  "Operating review checklist",
]);

expect(bestOfBestStandardPath, [
  "BEST_OF_BEST_OPERATING_STANDARD",
  "Cendorq Best-of-Best Operating Standard",
  "Apple-level clarity and visual hierarchy",
  "Stripe-level billing trust and self-serve recovery",
  "Shopify-level merchant empowerment without overwhelm",
]);

expect(bestOfBestValidatorPath, [
  "docs/best-of-best-operating-standard.md",
  "src/lib/best-of-best-operating-standard.ts",
  "docs/command-center-docs-index.md",
]);

expect(manualPath, [
  "## Highest practical accuracy model",
  "maximum practical accuracy every time",
  "use the strongest available research path for the plan stage",
  "resolve business identity before making material claims",
  "triangulate sources when practical",
  "check evidence age and freshness",
  "separate verified facts from assumptions, inferences, forecasts, and unknowns",
  "What is known.",
  "What was checked.",
  "What could not be verified yet.",
  "What confidence level applies.",
  "What the safest next action is.",
]);

expect(manualPath, [
  "## Agent-to-captain verification model",
  "Cendorq should not depend on one agent's raw competence.",
  "Captain review must verify:",
  "best-of-best operating standard alignment",
  "unified surface alignment",
  "owner memory lock coverage",
  "generic SaaS dashboard copy",
  "template-like public page or report structure",
  "support blame language",
  "plan boundary blur",
  "disconnected dashboard state",
  "homepage pricing clutter",
  "cheap-looking generic blocks",
]);

expect(manualPath, [
  "## Category-defining authority and psychology",
  "should feel like the business readiness authority",
  "proof-led authority",
  "calm urgency only when timing risk exists",
  "That standard is higher than premium styling. It is category-defining authority backed by evidence discipline.",
]);

expect(manualPath, [
  "## Selective recurring readiness moat",
  "Recurring value belongs strongest in:",
  "AI Readiness Review report conclusions when movement risk is visible",
  "Signal Repair post-repair watchlists",
  "Readiness Control reports",
  "dashboard readiness history",
  "report vault baseline comparisons",
  "forecast refresh notes when evidence supports a forecast",
  "The value is not generic monthly reporting.",
]);

expect(manualPath, [
  "## Forecast operating model",
  "Forecasts may appear in reports when they are grounded in evidence and clearly labeled as directional decision aids.",
  "evidence inputs",
  "assumptions",
  "confidence level",
  "time horizon",
  "what would change the forecast",
  "what is unknown",
  "Forecasts must not claim guaranteed rankings, guaranteed placement, exact traffic, exact revenue, exact future demand, or certainty over platform behavior.",
]);

expect(manualPath, [
  "## Verify-to-view email confirmation and report access",
  "Cendorq Support <support@cendorq.com>",
  "Confirm email and open your results",
  "dashboard/report vault is the canonical protected display location for report state and released reports",
  "Email remains the delivery and return channel; dashboard inbox items supplement email orchestration and never replace lifecycle or follow-up emails to the signup address.",
]);

expect(manualPath, [
  "Deliverability and access strategy:",
  "SPF, DKIM, and DMARC before live transactional sending",
  "No customer-facing copy may promise guaranteed inbox placement, guaranteed deliverability, or provider-level control.",
  "the same safe message, document status, and next action must still be accessible after verified login in the dashboard",
  "Every important customer email should create or update a matching dashboard message record",
  "Dashboard message mirrors must never expose raw provider payloads, raw report evidence, raw billing data, private prompts, exact scoring weights, secrets, tokens, internal notes, operator identities, or cross-customer data.",
]);

expect(manualPath, [
  "Safe PDF and document delivery:",
  "Report PDFs and billing PDFs may be attached or made downloadable",
  "PDFs must never be the only access path.",
  "The dashboard report vault or billing center remains the canonical source of truth.",
  "Report PDFs require verified email, customer ownership, entitlement or permitted Free Scan access, release-captain approval, no-leak checks, and document-safety checks.",
  "Billing PDFs require provider-authoritative invoice, receipt, or payment-confirmation records, verified ownership, and safe billing projection checks.",
  "If PDF attachment safety, provider state, release state, or verification is uncertain, send the dashboard/report-vault/billing-center path first",
]);

expect(manualPath, [
  "## Report accuracy operating model",
  "Customer-provided context",
  "Safe external evidence",
  "Cendorq internal evidence",
  "Derived analysis",
  "Confidence and limits",
  "verified facts",
  "assumptions",
  "inferences",
  "conflicts or contradictions",
  "forecast direction",
  "refresh triggers",
]);

expect(manualPath, [
  "## Strongest practical report workflow",
  "Intake capture",
  "Evidence gathering",
  "Evidence conflict pass",
  "Report truth pass",
  "Plan-fit pass",
  "Conversion pass",
  "Release-captain pass",
  "No report should blur a customer claim into a verified fact.",
  "No report should blur a forecast into a guaranteed outcome.",
  "confirm best-of-best operating standard alignment",
]);

expect(manualPath, [
  "## Tailored plan operating model",
  "### Free Scan",
  "### AI Readiness Review",
  "### Signal Repair",
  "### Readiness Control",
  "Plans must not be generic packages.",
  "They must behave like stage-specific operating paths.",
]);

expect(manualPath, [
  "## Market-learning loop",
  "learning must be privacy-safe",
  "forecasts must stay directional and confidence-labeled",
  "patterns must be reviewed, versioned, and tested before changing customer-facing behavior",
]);

expect(manualPath, [
  "## Conversion moat",
  "review before selling",
  "show the real blocker",
  "show why the blocker matters",
  "show what changed or may change",
  "show which plan fits that stage",
  "show when to return only when the evidence gives a real reason",
  "Conversion copy should be direct, category-defining, psychologically clear, calm, and confident.",
]);

expect(manualPath, [
  "## Customer operations architecture update",
  "Customer journey and verification",
  "Email dispatch operations",
  "Dashboard command center and inbox",
  "Report vault and protected reports",
  "Billing documents and safe PDF delivery",
  "Plan orchestration and skipped prior-plan handling",
  "Plan delivery boundaries",
  "No-leak operating policy",
  "Agent orchestration policy",
  "Customer-facing language policy",
]);

expect(manualPath, [
  "Every important customer email must create or update a mirrored dashboard message",
  "Mirrored messages must carry the safe summary, category, sent or document state when known, related plan, related report or billing document, primary action, secondary safe path, and support route.",
  "PDF report delivery must match report-vault state.",
  "A report PDF or downloadable report should not exist as a separate source of truth.",
  "Billing documents should be delivered through verified provider state, the billing center, mirrored dashboard messages, and email when safe.",
  "Receipt, invoice, and payment-confirmation PDFs may be attached or made downloadable only when customer ownership, provider authority, safe projection, and document-safety gates pass.",
]);

expect(manualPath, [
  "Protected Free Scan results must be clearly labeled as Free Scan, not Full Scan or AI Readiness Review.",
  "AI Readiness Review is the paid evidence-backed review path and requires active entitlement, verified email, paid intake, research review, and release approval.",
  "Buying Signal Repair directly does not include a standalone AI Readiness Review report unless that entitlement exists.",
  "Buying Readiness Control directly does not include Signal Repair implementation or a standalone AI Readiness Review report unless those entitlements exist.",
  "A later purchase after prior delivery creates a new entitlement, not an automatic unlimited redo.",
]);

expect(manualPath, [
  "## Owner command and release captain model",
  "Owner command is highest authority.",
  "Release captain is execution command and final validator.",
  "Chief agents and sub-agents cannot:",
  "approve provider configuration",
  "approve payment mapping",
  "approve security readiness",
  "Every finding returns to release-captain review.",
]);

expect(manualPath, [
  "## What remains to take Cendorq higher",
  "Customer-facing report rendering and PDF parity",
  "Provider payment mapping and webhook entitlement verification",
  "Forecast module rendering and forecast refresh history",
  "Recurring readiness baseline comparison",
  "Unified surface alignment drift review across homepage, plans, pricing, dashboard, billing, report vault, support, and backend triggers",
  "Operating memory lock checks for every new standard",
  "Unified block and section audit across public and private customer surfaces",
  "Mobile-first and desktop-command-room audit after every major surface change",
  "Surface alignment scoring",
  "Memory-lock coverage scoring",
  "## Final operating principle",
  "unified surface alignment",
  "memory-locked standards",
]);

expect(manualPath, [
  "keep best-of-best standard visible in every material customer-facing decision",
  "keep unified surface alignment visible in every public, dashboard, billing, report, support, and backend-triggered customer decision",
  "keep memory locks attached to every new operating standard",
  "review best-of-best drift across public, dashboard, billing, report, notification, support, lifecycle, and plan surfaces",
  "review unified surface alignment drift across homepage, plans, pricing, dashboard, report vault, billing, support, and lifecycle",
  "review whether the whole customer path still feels seamless on mobile and desktop",
]);

expect(ownerMaximumProtectionPath, [
  "# Owner Maximum Protection Posture",
  "The public surface teaches the category without exposing private mechanics.",
  "Protected customer and report surfaces require the correct verified access path.",
  "Operator surfaces remain private, metadata-first, and review-gated.",
  "AI and automation may assist, but cannot approve launches, reports, billing behavior, provider setup, or customer-facing claims.",
]);

expect(captainAuditDocPath, [
  "# Captain Audit Hardening Control Plane",
  "prevents Cendorq captain work from turning into blind feature marching",
  "Owner command is above the captain",
  "Required takeover sequence",
  "Three independent reviews",
  "Five hardening passes",
  "Weak-area registry",
]);

expect(continuousEvolutionContractPath, [
  "CONTROLLED_CONTINUOUS_EVOLUTION_CONTRACT",
  "Automated systems may detect, propose, test, and prepare updates.",
  "automatic update systems can propose changes but cannot bypass validation",
]);

expect(controlledMaintenanceContractPath, [
  "CONTROLLED_MAINTENANCE_CONTRACT",
  "Controlled Maintenance Architecture",
  "without uncontrolled AI changes or automatic production mutation",
]);

expect(docsIndexPath, [
  "docs/owner-operating-manual.md",
  "src/scripts/validate-owner-operating-manual.mjs",
  "owner-level operating manual",
  "docs/best-of-best-operating-standard.md",
  "src/scripts/validate-best-of-best-operating-standard.mjs",
]);

expect(routesChainPath, [
  "src/scripts/validate-owner-operating-manual.mjs",
  "src/scripts/validate-owner-maximum-protection-posture.mjs",
  "src/scripts/validate-best-of-best-operating-standard.mjs",
  "src/scripts/validate-unified-experience-alignment.mjs",
  "src/scripts/validate-surface-level-alignment.mjs",
  "src/scripts/validate-operating-memory-lock.mjs",
]);

forbidden(manualPath, unsafePhrases());
forbidden(ownerMaximumProtectionPath, unsafePhrases());
forbidden(captainAuditDocPath, unsafePhrases());
forbidden(bestOfBestDocPath, unsafePhrases());

if (failures.length) {
  console.error("Owner operating manual validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Owner operating manual validation passed with best-of-best doctrine, unified surface lock, operating memory lock, category-defining authority, highest practical accuracy, agent-to-captain verification, selective recurring readiness moat, forecast governance, vault-first report access, deliverability posture, dashboard message mirror, safe PDF delivery, customer operations architecture, owner maximum-protection posture, controlled continuous evolution, controlled maintenance, captain audit hardening, plan boundary, no-leak, agent orchestration, drift review cadence, and safe language coverage.");

function unsafePhrases() {
  return [
    "promise impossible certainty",
    "customer-specific truth must be generalized as universal truth",
    "agents may approve launches",
    "agents may approve reports",
    "agents may approve customer-facing claims",
    "raw provider payloads may be exposed",
    "raw customer data may be exposed",
    "private audit payloads may be exposed",
    "automatic unlimited redo",
    "dashboard inbox replaces email",
    "Readiness Control includes Signal Repair implementation",
    "Signal Repair includes standalone AI Readiness Review report",
    "provider-level placement guarantee",
    "captain may skip audit",
    "blind feature marching is allowed",
    "owner command is below the captain",
    "merge without Vercel",
    "guaranteed ROI",
    "guaranteed revenue",
    "guaranteed deliverability",
    "guaranteed inbox placement",
    "100% accurate",
    "impossible to hack",
    "never liable",
    "liability-free",
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
    if (containsUnsafeClaim(text, phrase.toLowerCase())) failures.push(`${path} contains forbidden phrase: ${phrase}`);
  }
}

function containsUnsafeClaim(text, phrase) {
  let index = text.indexOf(phrase);
  while (index !== -1) {
    const paragraphStart = Math.max(0, text.lastIndexOf("\n\n", index));
    const nextParagraphBreak = text.indexOf("\n\n", index);
    const paragraphEnd = nextParagraphBreak === -1 ? text.length : nextParagraphBreak;
    const paragraph = text.slice(paragraphStart, paragraphEnd);
    const window = text.slice(Math.max(0, index - 240), Math.min(text.length, index + phrase.length + 240));
    const context = `${paragraph}\n${window}`;
    const safeProhibition = [
      "must never",
      "must not",
      "do not",
      "does not",
      "not to",
      "not an",
      "not a",
      "never claim",
      "never imply",
      "avoid",
      "without",
      "cannot",
      "blocked",
      "disallowed",
      "unsupported guarantee",
      "unsupported legal",
      "false",
      "allowed: false",
    ].some((marker) => context.includes(marker));

    if (!safeProhibition) return true;
    index = text.indexOf(phrase, index + phrase.length);
  }
  return false;
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
