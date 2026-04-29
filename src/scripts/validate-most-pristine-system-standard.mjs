import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const standardPath = "src/lib/command-center/most-pristine-system-standard.ts";
const enterprisePath = "src/lib/command-center/enterprise-operating-standard.ts";
const auditDefensePath = "src/lib/command-center/audit-defense-system.ts";
const interfaceExcellencePath = "src/lib/platform-interface-excellence-contracts.ts";
const interfaceExcellenceValidatorPath = "src/scripts/validate-platform-interface-excellence.mjs";
const continuousEvolutionPath = "src/lib/controlled-continuous-evolution-contracts.ts";
const continuousEvolutionValidatorPath = "src/scripts/validate-controlled-continuous-evolution.mjs";
const repoAutomationValidatorPath = "src/scripts/validate-repo-update-scanning-automation.mjs";
const dashboardExcellenceValidatorPath = "src/scripts/validate-customer-dashboard-excellence.mjs";
const publicWebsiteExcellenceValidatorPath = "src/scripts/validate-public-website-excellence.mjs";
const customerDashboardPath = "src/app/dashboard/page.tsx";
const homePath = "src/app/page.tsx";
const freeCheckPath = "src/app/free-check/page.tsx";
const dependabotPath = ".github/dependabot.yml";
const codeqlPath = ".github/workflows/codeql.yml";
const packagePath = "package.json";

validateTextFile(standardPath, [
  "MOST_PRISTINE_SYSTEM_REQUIREMENTS",
  "MOST_PRISTINE_RELEASE_PASSES",
  "getMostPristineSystemStandard",
  "Frontend most-pristine standard",
  "Backend most-pristine standard",
  "API most-pristine standard",
  "Data and database most-pristine standard",
  "AI most-pristine standard",
  "Report most-pristine standard",
  "Security most-pristine standard",
  "Privacy and audit-defense most-pristine standard",
  "Brand most-pristine standard",
  "Performance most-pristine standard",
  "Operations most-pristine standard",
  "Integration most-pristine standard",
  "Documentation most-pristine standard",
  "Deployment most-pristine standard",
  "Customer experience most-pristine standard",
  "Inside-outside surface pass",
  "Trust with leverage pass",
  "No weak link pass",
  "Does every visible and invisible layer meet the same most-pristine standard",
  "any layer below the Cendorq standard because it is internal, temporary, hidden, operational, or not customer-facing",
  "Every public and private interface must feel official, premium, fast, accessible, responsive, trustworthy, conversion-aware, brand-consistent",
  "Backend systems must be secure-by-default, typed, validated, observable, testable, failure-aware, auditable, least-privilege",
  "Reports must be official, branded, visually modern, evidence-backed, calculation-traceable, business-specific, category-aware, revenue-context-aware, social/platform-aware",
  "AI must be controlled, versioned, evidence-grounded, plan-scoped, review-gated for customer output",
  "Privacy and audit defense must preserve proof without exposing sensitive data",
  "Every change must pass validation, build checks, route checks, smoke checks where applicable, reviewable diffs, rollback readiness, and production safety gates",
]);

validateTextFile(interfaceExcellencePath, [
  "PLATFORM_INTERFACE_EXCELLENCE_CONTRACT",
  "platform-interface-excellence-lock-v1",
  "customer-dashboard",
  "public-frontend-website",
  "operator-command-center",
  "admin-support-console",
  "Hard-lock customer dashboard, public website, command center, and support/operator surfaces",
  "Every customer-facing and operator-facing interface must feel premium, clear, useful, fast, protected, truthful, and carefully guided.",
  "clear visual hierarchy before decoration",
  "summary-to-detail layout for complex decisions",
  "keyboard-visible focus and accessible interactive targets",
  "show business status, next best action, and proof context immediately",
  "operator/admin surfaces must separate read-only review from guarded mutation",
  "reports must separate verified facts, assumptions, inferences, and recommendations",
  "no fake urgency",
  "no dark-pattern pressure",
  "no browser-exposed secrets, protected context keys, session tokens, or admin keys",
  "customer dashboard cannot degrade into generic tiles",
  "all new interface layers require validation before merge",
]);

validateTextFile(interfaceExcellenceValidatorPath, [
  "Platform interface excellence validation passed",
  "validate-platform-interface-excellence.mjs",
  "PLATFORM_INTERFACE_EXCELLENCE_CONTRACT",
]);

validateTextFile(customerDashboardPath, [
  "OPERATING_SNAPSHOT",
  "Dashboard operating snapshot",
  "EXPERIENCE_PILLARS",
  "Dashboard excellence pillars",
  "CHANNEL_COVERAGE",
  "Revenue channel awareness",
  "Proof before pressure",
  "Social and creator channels",
  "Marketplace/platform revenue",
  "Digital product or recurring revenue",
  "focus:ring-2",
]);

validateTextFile(dashboardExcellenceValidatorPath, [
  "Customer dashboard excellence validation passed",
  "validate-customer-dashboard-excellence.mjs",
]);

validateTextFile(homePath, [
  "FRONT_DOOR_SNAPSHOT",
  "Public website operating snapshot",
  "CENDORQ_SYSTEM_LAYERS",
  "Cendorq system layers",
  "BUSINESS_MODEL_COVERAGE",
  "TRUST_RULES",
  "Proof before pressure",
  "No fake urgency",
  "No unsupported ROI claims",
  "Creator and social channels",
  "Marketplaces and platform revenue",
]);

validateTextFile(freeCheckPath, [
  "Dedicated scan room",
  "DEDICATED_SCAN_ROOM_DECISION",
  "Free Scan page decision",
  "SCAN_ROOM_STANDARDS",
  "Why this is not a full popup",
  "Visible labels and clear field purpose",
  "Step-by-step progress and recovery",
  "Routeable page that can be resumed or linked from dashboard",
]);

validateTextFile(publicWebsiteExcellenceValidatorPath, [
  "Public website excellence validation passed",
  "validate-public-website-excellence.mjs",
]);

validateTextFile(continuousEvolutionPath, [
  "CONTROLLED_CONTINUOUS_EVOLUTION_CONTRACT",
  "controlled-continuous-evolution-v1",
  "Keep Cendorq improving after launch through monitored, validated, reviewable, reversible updates without uncontrolled production mutation or quality drift.",
  "Automated systems may detect, propose, test, and prepare updates.",
  "daily dependency and vulnerability detection",
  "weekly interface quality and accessibility review",
  "monthly legal/liability language review",
  "auto-merge production-impacting code without green gates",
  "pull request with reviewable diff",
  "Vercel preview or deployment check passes",
  "rollback path identified",
  "automatic update systems can propose changes but cannot bypass validation",
  "all scheduled updates must remain coherent, bounded, and traceable",
]);

validateTextFile(continuousEvolutionValidatorPath, [
  "Controlled continuous evolution validation passed",
  "CONTROLLED_CONTINUOUS_EVOLUTION_CONTRACT",
]);

validateTextFile(repoAutomationValidatorPath, [
  "Repo update scanning automation validation passed",
  "dependabotPath",
  "codeqlPath",
]);

validateTextFile(dependabotPath, [
  "version: 2",
  "package-ecosystem: npm",
  "package-ecosystem: github-actions",
  "timezone: America/Los_Angeles",
  "controlled-update",
  "next-react-platform",
  "typescript-tooling",
  "styling-tooling",
  "lint-tooling",
]);

validateTextFile(codeqlPath, [
  "name: CodeQL",
  "pull_request:",
  "security-events: write",
  "github/codeql-action/init@v3",
  "security-extended,security-and-quality",
  "github/codeql-action/analyze@v3",
  "javascript-typescript",
]);

validateTextFile(enterprisePath, [
  "Enterprise operating standard",
  "Liability minimization defense",
  "Audit defense pass",
]);

validateTextFile(auditDefensePath, [
  "AUDIT_DEFENSE_CONTROLS",
  "AUDIT_DEFENSE_RELEASE_GATES",
  "Claim substantiation record",
]);

validateTextFile(packagePath, [
  "validate:routes",
  "validate-most-pristine-system-standard.mjs",
]);

validateForbidden(standardPath, [
  "prototype-looking allowed",
  "agent drift allowed",
  "client-side secret exposure allowed",
  "unsupported claims allowed",
  "unapproved report release allowed",
  "ignored validator failure allowed",
  "claiming zero liability allowed",
]);

validateForbidden(interfaceExcellencePath, [
  "guaranteed ROI allowed",
  "fake urgency allowed",
  "dark patterns allowed",
  "raw payload allowed",
  "browser secret allowed",
  "skip validation",
  "best effort optional",
]);

validateForbidden(customerDashboardPath, publicBlockedPatterns());
validateForbidden(homePath, publicBlockedPatterns());
validateForbidden(freeCheckPath, publicBlockedPatterns());

validateForbidden(continuousEvolutionPath, [
  "autoMergeWithoutValidation allowed",
  "skipVercelGate allowed",
  "disableValidatorForUpdate allowed",
  "unreviewedProductionMutation allowed",
  "weakenGuardrailsForConvenience allowed",
  "storeRawPayloadForDebugging allowed",
  "deleteAuditRecordsToCleanUp allowed",
]);

validateForbidden(dependabotPath, [
  "automerge: true",
  "auto-merge: true",
  "skip-validation",
]);

validateForbidden(codeqlPath, [
  "continue-on-error: true",
  "allow-failure",
  "security-events: none",
]);

if (failures.length) {
  console.error("Most-pristine system standard validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Most-pristine system standard validation passed. Frontend, backend, APIs, data, AI, reports, security, privacy, audit defense, brand, performance, operations, integrations, documentation, deployment, customer experience, platform interface excellence, controlled continuous evolution, repo update scanning automation, customer dashboard excellence, public website excellence, dedicated Free Scan room, dashboard, command center, and support/operator surfaces must meet the same no-weak-link Cendorq quality bar.");

function publicBlockedPatterns() {
  return [
    "guaranteed ROI",
    "guaranteed refund",
    "guaranteed legal outcome",
    "guaranteed security outcome",
    "impossible to hack",
    "never liable",
    "liability-free",
    "rawPayload",
    "rawEvidence",
    "rawSecurityPayload",
    "rawBillingData",
    "internalNotes",
    "operatorIdentity",
    "riskScoringInternals",
    "attackerDetails",
    "sessionToken",
    "csrfToken",
    "localStorage",
    "sessionStorage",
  ];
}

function validateTextFile(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing required most-pristine dependency: ${path}`);
    return;
  }

  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing required most-pristine phrase: ${phrase}`);
  }
}

function validateForbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  for (const phrase of phrases) {
    if (text.includes(phrase)) failures.push(`${path} contains forbidden most-pristine phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
