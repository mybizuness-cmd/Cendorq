import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const manualPath = "docs/owner-operating-manual.md";
const handoffPath = "docs/agent-handoff/current-handoff.md";
const visualRegisterPath = "docs/visual-command-surface-review-register.md";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const captainAuditDocPath = "docs/captain-audit-hardening-control-plane.md";
const captainAuditRuntimePath = "src/lib/captain-audit-hardening-control-plane.ts";
const captainAuditValidatorPath = "src/scripts/validate-captain-audit-hardening-control-plane.mjs";
const docsIndexPath = "docs/command-center-docs-index.md";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const continuousEvolutionContractPath = "src/lib/controlled-continuous-evolution-contracts.ts";
const continuousEvolutionValidatorPath = "src/scripts/validate-controlled-continuous-evolution.mjs";
const controlledMaintenanceDocsPath = "docs/controlled-maintenance.md";
const controlledMaintenanceContractPath = "src/lib/controlled-maintenance-contracts.ts";
const controlledMaintenanceValidatorPath = "src/scripts/validate-controlled-maintenance-contracts.mjs";
const agentPlaybooksPath = "src/lib/cendorq-agent-intelligence-playbooks.ts";
const failures = [];

expect(manualPath, [
  "# Cendorq Owner Operating Manual",
  "Cendorq should win by being more accurate, more useful, more trusted, more tailored, and more operationally disciplined than generic competitors from the first interaction.",
  "The customer-facing path is:",
  "**Scan** — find the strongest first signal.",
  "**Review** — prove the cause before a bigger move.",
  "**Repair** — execute a scoped improvement after the weak point is clear.",
  "**Control** — keep the business from drifting as AI, search, buyers, competitors, and platforms change.",
  "The standard is not to promise impossible certainty.",
  "proof before output",
  "evidence before recommendation",
  "confidence before certainty",
  "contradictions surfaced instead of hidden",
  "customer context separated from verified facts",
  "assumptions separated from inferences",
  "Choice Gap separated from generic criticism",
  "Repair Queue separated from unlimited implementation",
]);

expect(manualPath, [
  "## Core product language",
  "**AI Search Presence Repair**: the customer-facing category for Cendorq.",
  "**Presence Report**: the report object that makes the signal understandable.",
  "**Choice Gap**: the point where a buyer, search engine, AI answer system, or comparison moment may fail to understand, trust, compare, choose, or act.",
  "**Repair Queue**: the ordered list of scoped improvements that should happen after enough evidence supports the priority.",
  "**Scan / Review / Repair / Control**: the operating path.",
  "Avoid drifting back to loose phrases like generic audit, market command, diagnose-and-fix, full scan, or a vague report-plan path when the customer-facing system should be Scan, Review, Repair, and Control.",
]);

expect(manualPath, [
  "## Verify-to-view email confirmation and report access",
  "Cendorq Support <support@cendorq.com>",
  "Confirm email and open your results",
  "The confirmation click should do several jobs at once:",
  "The dashboard is the control room and summary surface.",
  "Full reports should have dedicated report-vault views for readability, evidence separation, visual sections, downloadable assets when allowed, and next-step conversion guidance.",
  "Do not claim guaranteed inbox placement, guaranteed deliverability, or provider-level control.",
  "Do not show protected report findings before verification and safe release state.",
]);

expect(manualPath, [
  "## Report accuracy operating model",
  "Customer-provided context",
  "Safe external evidence",
  "Cendorq internal evidence",
  "Derived analysis",
  "Confidence and limits",
  "verified facts",
  "customer-provided context",
  "external evidence",
  "assumptions",
  "inferences",
  "conflicts or contradictions",
  "limitations",
  "confidence",
  "Presence Score or equivalent scoring posture when available",
  "Choice Gap",
  "Repair Queue",
  "next command",
  "No report should blur a customer claim into a verified fact.",
]);

expect(manualPath, [
  "## Strongest practical report workflow",
  "Intake capture",
  "Evidence gathering",
  "Evidence conflict pass",
  "Report truth pass",
  "Choice Gap pass",
  "Plan-fit pass",
  "Conversion pass",
  "Release-captain pass",
]);

expect(manualPath, [
  "## Tailored plan operating model",
  "### Free Scan",
  "### Deep Review",
  "### Build Fix",
  "### Ongoing Control",
  "Plans must not be generic packages.",
  "They must behave like stage-specific operating paths.",
  "Deep Review should prove the cause and prioritize",
  "Build Fix should repair defined blockers",
  "Ongoing Control should monitor, improve, and adapt over time",
]);

expect(manualPath, [
  "## Market-learning loop",
  "what friction patterns are recurring",
  "what proof signals are becoming more important",
  "which report modules create the most useful customer action",
  "Choice Gap and Repair Queue language improves decision clarity",
  "learning must be privacy-safe",
  "patterns must be reviewed, versioned, and tested before changing customer-facing behavior",
]);

expect(manualPath, [
  "## Controlled continuous evolution",
  "Cendorq should keep improving after launch through monitored, validated, reviewable, reversible updates without uncontrolled production mutation or quality drift.",
  "Controlled continuous evolution means automated systems may detect, propose, test, and prepare updates, but they do not approve production-impacting changes.",
  "Every material update still needs a reviewable branch, validation gates, Vercel or preview success where applicable, mergeability confirmation, rollback awareness, and release-captain approval before merge.",
  "Prefer small coherent batches over large mixed changes.",
  "Treat Vercel, `validate:routes`, route-chain integrity, validation registry, docs index, operator runbook, and most-pristine coverage as the minimum operating rails.",
  "Do not skip gates to move faster.",
  "Do not disable validators to make an update pass.",
  "Do not hide failures or silently weaken safeguards.",
  "Continuous evolution should raise or preserve trust, clarity, protection, accessibility, performance, truthful analysis, customer control, and operator safety.",
]);

expect(manualPath, [
  "## Controlled maintenance",
  "Controlled maintenance is the operating discipline that keeps Cendorq current without letting update work become uncontrolled production mutation.",
  "No queued update may mutate production automatically.",
  "Every material maintenance release still requires validation, approval state, rollback planning, and an audit reason.",
  "Maintenance output must never expose raw payloads, raw evidence, raw security payloads, raw billing data, internal notes, operator identities, risk internals, attacker details, prompts, secrets, passwords, API keys, private keys, session tokens, CSRF tokens, admin keys, or support context keys.",
  "Maintenance copy must never claim Cendorq is impossible to hack, guaranteed safe, never liable, liability-free, or guaranteed to produce ROI or business outcomes.",
  "Controlled maintenance must stay aligned with `docs/controlled-maintenance.md`, `src/lib/controlled-maintenance-contracts.ts`, validation registry coverage, docs-index coverage, and `validate:routes`.",
]);

expect(manualPath, [
  "## Conversion moat",
  "scan before selling",
  "show the real blocker",
  "show why the blocker matters",
  "show the Choice Gap",
  "show what can be done next",
  "show which command fits that stage",
  "Conversion copy should be direct, premium, calm, and confident.",
]);

expect(manualPath, [
  "## Customer operations architecture",
  "Customer journey and verification",
  "Email dispatch operations",
  "Dashboard command center and inbox",
  "Report vault and protected reports",
  "Plan orchestration and skipped prior-plan handling",
  "Plan delivery boundaries",
  "Support, billing, and report boundaries",
  "No-leak operating policy",
  "Agent orchestration policy",
  "Customer-facing language policy",
]);

expect(manualPath, [
  "The customer journey is: Free Scan or plan entry, check-your-inbox gate, email confirmation, protected dashboard, report vault, inbox messages, support, billing, and plan-specific delivery.",
  "Free Scan and Deep Review report access should route to `/dashboard/reports` after safe verification and release state.",
  "Customer confirmation email dispatch now uses a controlled chain: queue record, provider preparation, audit transition, state mutation, admin preview, admin dry-run, provider configuration contract, provider send interface, and customer-safe delivery status projection.",
  "The dashboard inbox is for customer-owned command-center messages, plan nudges, report readiness, support status, billing reminders, security steps, and recovery paths.",
  "It supplements external email orchestration and must not replace transactional confirmation or lifecycle email.",
]);

expect(manualPath, [
  "Protected Free Scan results must be clearly labeled as Free Scan, not Full Scan or Deep Review.",
  "Deep Review is the paid Review path and requires active entitlement, verified email, paid intake, research review, and release approval.",
  "Free Scan is a protected first-read Presence Report.",
  "Deep Review is the paid cause-proof report.",
  "Build Fix is scoped Repair with approval checkpoints, before/after evidence, progress summaries, rollback posture, and remaining-risk explanation.",
  "Ongoing Control is recurring monthly status, approved periodic reporting, controlled monitoring, dashboard inbox, email follow-up, and plan-fit guidance.",
]);

expect(manualPath, [
  "Buying Build Fix directly does not include a standalone Deep Review report unless that entitlement exists.",
  "Buying Ongoing Control directly does not include Build Fix implementation or a standalone Deep Review report unless those entitlements exist.",
  "A later purchase after prior delivery creates a new entitlement, not an automatic unlimited redo.",
  "Ongoing Control may recommend Build Fix when implementation gaps are found, but must not make uncontrolled changes or imply guaranteed growth.",
]);

expect(manualPath, [
  "Customer-facing surfaces must not expose private payloads, private evidence, sensitive security material, private billing material, internal notes, operator identities, risk internals, threat details, prompt or system material, secrets, tokens, or cross-customer information.",
  "Agents do not approve merges, launches, reports, provider configuration, billing changes, security readiness, or customer-facing claims.",
  "Customer-facing language should be truthful, evidence-led, premium, calm, and specific.",
  "It must avoid fake urgency, dark patterns, impossible certainty, guaranteed business outcomes, guaranteed deliverability, guaranteed security outcomes, and unsupported legal or billing promises.",
]);

expect(manualPath, [
  "## What remains to take Cendorq higher",
  "Durable owner evidence persistence",
  "External evidence fetch pipeline with safe source tracking",
  "Evidence conflict engine",
  "Report confidence scoring runtime",
  "Choice Gap scoring runtime",
  "Repair Queue versioning and release history",
  "Market/category pattern registry",
  "Customer-facing report rendering and PDF parity",
  "Production auth integration",
  "Provider payment mapping and webhook entitlement verification",
]);

expect(manualPath, [
  "## Highest-level operating cadence",
  "Daily during build",
  "Weekly after launch",
  "Monthly after launch",
  "## Final operating principle",
  "Cendorq should not win by promising the impossible.",
  "It should win by being more disciplined, more evidence-backed, more tailored, more useful, more honest, and more operationally complete than competitors.",
  "It is running a controlled AI Search Presence Repair system with proof, judgment, safe execution, and one clean next command.",
]);

expect(handoffPath, [
  "# Cendorq Current Agent Handoff",
  "AI Search Presence Repair",
  "Presence Report",
  "Choice Gap",
  "Repair Queue",
  "Scan / Review / Repair / Control",
  "Current command-path upgrade pass",
  "live rendered screenshot approval is still required",
]);

expect(visualRegisterPath, [
  "# Visual Command Surface Review Register",
  "clear Scan, Review, Repair, and Control separation",
  "Homepage `/`",
  "Dashboard `/dashboard`",
  "Billing `/dashboard/billing`",
  "Notifications `/dashboard/notifications`",
  "Support routing `/dashboard/support`",
  "Legal trust surfaces `/privacy`, `/terms`, `/disclaimer`",
  "Header, footer, metadata, and share surfaces",
  "live rendered screenshots are still required",
]);

expect(agentPlaybooksPath, [
  "CENDORQ_AGENT_INTELLIGENCE_SYSTEM_RULES",
  "AI/search presence",
  "Choice Gap",
  "Repair Queue",
  "Scan, Review, Repair, or Control",
  "guaranteed ranking",
  "guaranteed AI placement",
  "guaranteed revenue",
  "algorithm control",
]);

expect(ownerMaximumProtectionPath, [
  "# Owner Maximum Protection Posture",
  "daily operating decisions",
  "open only where public conversion requires it",
  "Required owner decisions",
  "Hard owner locks",
  "Operating rule",
  "growth asset",
]);

expect(ownerMaximumProtectionPath, [
  "The public surface teaches the category without exposing private mechanics.",
  "Protected customer and report surfaces require the correct verified access path.",
  "Operator surfaces remain private, metadata-first, and review-gated.",
  "AI and automation may assist, but cannot approve launches, reports, billing behavior, provider setup, or customer-facing claims.",
  "Validation, Vercel, route-chain integrity, docs-index coverage, registry coverage, and rollback posture remain green before merge.",
]);

expect(ownerMaximumProtectionValidatorPath, [
  "Owner maximum protection posture validation passed",
  "docs/owner-maximum-protection-posture.md",
  "docs/maximum-protection-standard.md",
  "docs/command-center-docs-index.md",
  "src/lib/command-center/validation-registry.ts",
  "validate:routes",
]);

expect(continuousEvolutionContractPath, [
  "CONTROLLED_CONTINUOUS_EVOLUTION_CONTRACT",
  "controlled-continuous-evolution-v1",
  "Automated systems may detect, propose, test, and prepare updates.",
  "small coherent batches",
  "rollback-ready before promotion",
  "automatic update systems can propose changes but cannot bypass validation",
]);

expect(continuousEvolutionValidatorPath, [
  "Controlled continuous evolution validation passed",
  "CONTROLLED_CONTINUOUS_EVOLUTION_CONTRACT",
  "route-chain, registry, docs-index, operator-runbook, and most-pristine coverage",
]);

expect(controlledMaintenanceDocsPath, [
  "# Controlled Maintenance",
  "No queued update may mutate production automatically",
  "validation, approval state, rollback plan, and audit record",
]);

expect(controlledMaintenanceContractPath, [
  "CONTROLLED_MAINTENANCE_CONTRACT",
  "Controlled Maintenance Architecture",
  "without uncontrolled AI changes or automatic production mutation",
]);

expect(controlledMaintenanceValidatorPath, [
  "Controlled maintenance contracts validation passed",
  "docs/controlled-maintenance.md",
  "validation registry",
]);

expect(captainAuditDocPath, [
  "# Captain Audit Hardening Control Plane",
  "prevents Cendorq captain work from turning into blind feature marching",
  "Owner command is above the captain",
  "Required takeover sequence",
  "Three independent reviews",
  "Five hardening passes",
  "Weak-area registry",
  "The correct continuation point after the already-merged customer operations layers is admin command center foundation",
]);

expect(captainAuditRuntimePath, [
  "projectCaptainAuditHardeningControlPlane",
  "getCaptainAuditControlRules",
  "ownerCommandAboveCaptain: true",
  "captainMustAuditBeforeExpansion: true",
  "stalePrBlindMergeAllowed: false",
  "uncontrolledAgentApprovalAllowed: false",
  "unsupportedGuaranteeAllowed: false",
  "admin-command-center-foundation",
]);

expect(captainAuditValidatorPath, [
  "Captain audit hardening control plane validation passed",
  "docs/captain-audit-hardening-control-plane.md",
  "src/lib/captain-audit-hardening-control-plane.ts",
  "projectCaptainAuditHardeningControlPlane",
]);

expect(docsIndexPath, [
  "docs/owner-operating-manual.md",
  "src/scripts/validate-owner-operating-manual.mjs",
  "docs/owner-maximum-protection-posture.md",
  "validate-owner-maximum-protection-posture.mjs",
  "owner-level operating manual",
]);

expect(routesChainPath, [
  "src/scripts/validate-owner-operating-manual.mjs",
  "src/scripts/validate-owner-maximum-protection-posture.mjs",
]);

forbidden(manualPath, unsafePhrases());
forbidden(ownerMaximumProtectionPath, unsafePhrases());
forbidden(captainAuditDocPath, unsafePhrases());
forbidden(captainAuditRuntimePath, unsafePhrases());
forbidden(handoffPath, unsafePhrases());
forbidden(visualRegisterPath, unsafePhrases());

if (failures.length) {
  console.error("Owner operating manual validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Owner operating manual validation passed with AI Search Presence Repair, Presence Report, Choice Gap, Repair Queue, Scan/Review/Repair/Control, owner maximum-protection posture, controlled continuous evolution, controlled maintenance, captain audit hardening, email dispatch, dashboard inbox, report vault, plan boundary, no-leak, agent orchestration, visual register, handoff, and safe language coverage.");

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
    "Ongoing Control includes Build Fix implementation",
    "Build Fix includes standalone Deep Review report",
    "provider-level placement guarantee",
    "captain may skip audit",
    "blind feature marching is allowed",
    "owner command is below the captain",
    "merge without Vercel",
    "guaranteed ROI",
    "guaranteed revenue",
    "guaranteed deliverability",
    "guaranteed inbox placement",
    "guaranteed ranking",
    "guaranteed AI placement",
    "algorithm control",
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
      "prevent",
      "prevents",
      "no ",
      "outcomes stayed honest",
    ].some((marker) => context.includes(marker));

    if (!safeProhibition) return true;
    index = text.indexOf(phrase, index + phrase.length);
  }
  return false;
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
