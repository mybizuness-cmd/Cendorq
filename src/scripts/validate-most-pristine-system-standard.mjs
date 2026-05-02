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
const dependencyLockfileValidatorPath = "src/scripts/validate-dependency-lockfile-integrity.mjs";
const dashboardExcellenceValidatorPath = "src/scripts/validate-customer-dashboard-excellence.mjs";
const publicWebsiteExcellenceValidatorPath = "src/scripts/validate-public-website-excellence.mjs";
const homepageConciergeValidatorPath = "src/scripts/validate-homepage-concierge-nudge.mjs";
const seamlessSyncPath = "src/lib/seamless-responsive-sync-contracts.ts";
const seamlessSyncValidatorPath = "src/scripts/validate-seamless-responsive-sync.mjs";
const informationProtectionPath = "src/lib/core-information-protection-contracts.ts";
const informationProtectionValidatorPath = "src/scripts/validate-core-information-protection.mjs";
const institutionalMaturityPath = "src/lib/institutional-operating-maturity-contracts.ts";
const institutionalMaturityValidatorPath = "src/scripts/validate-institutional-operating-maturity.mjs";
const adversarialSuitePath = "src/lib/adversarial-validation-suite-contracts.ts";
const adversarialSuiteValidatorPath = "src/scripts/validate-adversarial-validation-suite.mjs";
const observabilityIncidentPath = "src/lib/observability-incident-response-contracts.ts";
const observabilityIncidentValidatorPath = "src/scripts/validate-observability-incident-response.mjs";
const backupRecoveryPath = "src/lib/backup-disaster-recovery-contracts.ts";
const backupRecoveryValidatorPath = "src/scripts/validate-backup-disaster-recovery.mjs";
const customerDashboardPath = "src/app/dashboard/page.tsx";
const homePath = "src/app/page.tsx";
const freeCheckPath = "src/app/free-check/page.tsx";
const homepageConciergePath = "src/components/public/free-scan-concierge-nudge.tsx";
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

validateTextFile(seamlessSyncPath, [
  "SEAMLESS_RESPONSIVE_SYNC_CONTRACT",
  "seamless-responsive-sync-v1",
  "fast, coherent, synchronized, responsive, and protected",
  "Every surface must feel instant, connected, and dependable.",
  "every route needs a clear next step and safe fallback",
  "Free Scan completion must connect to dashboard next action",
  "support request submission must connect to support status and notifications",
  "billing and plan state must connect to dashboard, report entitlements, and plan comparison",
  "critical public and dashboard pages must avoid unnecessary client-only rendering",
  "protected API responses should use no-store",
  "no disconnected customer journey",
  "no stale protected customer state presented as live truth",
  "no unbounded customer or operator lists",
]);

validateTextFile(seamlessSyncValidatorPath, [
  "Seamless responsive sync validation passed",
  "validate-seamless-responsive-sync.mjs",
  "SEAMLESS_RESPONSIVE_SYNC_CONTRACT",
]);

validateTextFile(informationProtectionPath, [
  "CORE_INFORMATION_PROTECTION_CONTRACT",
  "core-information-protection-v1",
  "Reduce the risk of customer, company, support, billing, report, operator, and platform information exposure",
  "Cendorq must never treat customer or company information as casual data.",
  "customer-owned data must require server-side customer ownership checks",
  "verified-email checks are required for protected customer support and dashboard APIs",
  "customer surfaces receive safe projections only",
  "no session tokens in localStorage, sessionStorage, URLs, analytics payloads, public JavaScript, HTML, emails, or customer copy",
  "audit records must preserve proof without exposing customer secrets or unnecessary sensitive data",
  "validate every new information flow before merge",
  "near-zero routine maintenance must be achieved through validated automation, not blind auto-change",
  "No system can honestly promise impossible-to-steal or impossible-to-hack.",
  "no browser authority for protected customer, support, billing, report, operator, or admin data",
  "no cross-customer data path without server-side ownership checks",
]);

validateTextFile(informationProtectionValidatorPath, [
  "Core information protection validation passed",
  "validate-core-information-protection.mjs",
  "CORE_INFORMATION_PROTECTION_CONTRACT",
]);

validateTextFile(institutionalMaturityPath, [
  "INSTITUTIONAL_OPERATING_MATURITY_CONTRACT",
  "institutional-operating-maturity-v1",
  "Raise Cendorq beyond premium product quality into institutional-grade operational maturity",
  "validated before release, observable after release, protected by least privilege, prepared for incidents, recoverable from failures",
  "adversarial-testing",
  "observability-and-alerting",
  "incident-response",
  "backup-and-disaster-recovery",
  "access-governance",
  "privacy-and-data-retention",
  "compliance-and-trust-readiness",
  "release-governance",
  "operational-runbooks",
  "capture adversarial tests as repeatable validation, not one-time manual checks",
  "separate operational telemetry from customer secrets and raw payloads",
  "do not delete audit records during incident response",
  "block releases that weaken information protection, interface excellence, sync, or truthful analysis",
  "avoid overclaiming certifications, guarantees, or security absolutes before they are actually obtained",
]);

validateTextFile(institutionalMaturityValidatorPath, [
  "Institutional operating maturity validation passed",
  "validate-institutional-operating-maturity.mjs",
  "INSTITUTIONAL_OPERATING_MATURITY_CONTRACT",
]);

validateTextFile(adversarialSuitePath, [
  "ADVERSARIAL_VALIDATION_SUITE_CONTRACT",
  "adversarial-validation-suite-v1",
  "Turn hostile-input and leakage expectations into repeatable release validation",
  "Adversarial checks are mandatory release evidence.",
  "prompt-injection-and-system-override-attempts",
  "credential-token-and-secret-submission",
  "payment-card-and-billing-data-submission",
  "cross-customer-identifier-and-ownership-confusion",
  "admin-key-support-key-and-protected-header-exposure",
  "browser-storage-and-public-javascript-secret-exposure",
  "notification-email-and-report-raw-content-leakage",
  "sanitize or reject hostile prompt-injection content without echoing the raw attack",
  "block cross-customer access through server-side ownership checks",
  "validators must fail on browser storage of protected authority",
  "adversarial validation must run before merge through a locked gate",
  "ADVERSARIAL_VALIDATION_CASES",
  "ADVERSARIAL_VALIDATION_BLOCKED_PATTERNS",
]);

validateTextFile(adversarialSuiteValidatorPath, [
  "Adversarial validation suite validation passed",
  "validate-adversarial-validation-suite.mjs",
  "ADVERSARIAL_VALIDATION_SUITE_CONTRACT",
]);

validateTextFile(observabilityIncidentPath, [
  "OBSERVABILITY_INCIDENT_RESPONSE_CONTRACT",
  "observability-incident-response-v1",
  "Make Cendorq observable, actionable, and containment-ready without leaking customer, company, support, billing, report, operator, or platform secrets",
  "Operational signals must help Cendorq detect, understand, contain, and recover from failures quickly",
  "route-health",
  "validation-failure",
  "support-volume-anomaly",
  "billing-error-anomaly",
  "adversarial-submission-anomaly",
  "telemetry may include route key, status class, safe error code, timestamp, environment, and bounded count",
  "telemetry must not include raw payloads, raw evidence, payment data, credentials, secrets, customer messages, internal notes, operator identities, session tokens, CSRF tokens, or admin keys",
  "SEV-1",
  "SEV-2",
  "SEV-3",
  "SEV-4",
  "customer-facing incident copy must be factual, bounded, calm, and approved",
  "post-incident follow-up must add or improve validation for the failed class",
  "OBSERVABILITY_INCIDENT_RESPONSE_HARD_LOCKS",
]);

validateTextFile(observabilityIncidentValidatorPath, [
  "Observability incident response validation passed",
  "validate-observability-incident-response.mjs",
  "OBSERVABILITY_INCIDENT_RESPONSE_CONTRACT",
]);

validateTextFile(backupRecoveryPath, [
  "BACKUP_DISASTER_RECOVERY_CONTRACT",
  "backup-disaster-recovery-v1",
  "Make Cendorq recoverable from platform, deployment, storage, data, queue, report, billing, support, and operator-surface failures",
  "Recovery must be planned before scale.",
  "restore customer-owned views without cross-customer leakage",
  "restore audit proof without exposing unnecessary sensitive raw content",
  "backups must not become a second raw-data store for sensitive submissions",
  "restore must preserve customer ownership boundaries and safe projection rules",
  "restore must not re-trigger lifecycle emails, notifications, billing actions, or support messages without idempotency checks",
  "rollback must not delete required audit records",
  "restore tests must use sanitized fixtures or safe references, not real raw customer secrets",
  "BACKUP_DISASTER_RECOVERY_HARD_LOCKS",
]);

validateTextFile(backupRecoveryValidatorPath, [
  "Backup disaster recovery validation passed",
  "validate-backup-disaster-recovery.mjs",
  "BACKUP_DISASTER_RECOVERY_CONTRACT",
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
  "FreeScanConciergeNudge",
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

validateTextFile(homepageConciergePath, [
  "FreeScanConciergeNudge",
  "STANDARD_DELAY_MS = 18_000",
  "RESUME_DELAY_MS = 6_000",
  "SCROLL_TRIGGER_RATIO = 0.45",
  "DISMISS_SECONDS = 60 * 60 * 24 * 14",
  "Free Scan concierge prompt",
  "aria-live=\"polite\"",
  "No full-form popup, no fake urgency, just a focused scan room.",
  "href=\"/free-check\"",
  "SameSite=Lax",
]);

validateTextFile(homepageConciergeValidatorPath, [
  "Homepage concierge nudge validation passed",
  "validate-homepage-concierge-nudge.mjs",
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
  "github/codeql-action/init@v4",
  "github/codeql-action/analyze@v4",
]);

validateTextFile(dependencyLockfileValidatorPath, [
  "Dependency lockfile integrity validation passed",
  "package.json",
  "pnpm-lock.yaml",
  "docs/dependency-lockfile-integrity.md",
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
  "actions/checkout@v6",
  "github/codeql-action/init@v4",
  "security-extended,security-and-quality",
  "github/codeql-action/analyze@v4",
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

validateForbidden(seamlessSyncPath, [
  "disconnected customer journey allowed",
  "stale state allowed",
  "unbounded lists allowed",
  "skip loading states allowed",
  "skip error states allowed",
  "browser secrets allowed",
  "bypass ownership check allowed",
  "disable validation for speed",
]);

validateForbidden(informationProtectionPath, [
  "impossible-to-steal guarantee",
  "impossible-to-hack guarantee",
  "browser authority allowed",
  "raw customer payloads allowed",
  "cross-customer access allowed",
  "delete audit records allowed",
  "skip ownership checks allowed",
  "blind auto-change allowed",
]);

validateForbidden(institutionalMaturityPath, [
  "ignore adversarial findings allowed",
  "telemetry raw payloads allowed",
  "delete audit proof allowed",
  "release rollback optional",
  "stale admin access allowed",
  "certification claim without audit allowed",
  "launch without validation allowed",
]);

validateForbidden(adversarialSuitePath, [
  "ignore prompt injection allowed",
  "echo raw attack allowed",
  "store raw credential allowed",
  "payment card allowed in support",
  "cross customer bypass allowed",
  "browser admin key allowed",
  "disable adversarial validation allowed",
  "impossible-to-hack guarantee",
]);

validateForbidden(observabilityIncidentPath, [
  "raw telemetry allowed",
  "alert without runbook allowed",
  "delete audit proof allowed",
  "incident speculation allowed",
  "zero risk incident claim allowed",
  "disable validation to restore service allowed",
]);

validateForbidden(backupRecoveryPath, [
  "raw backups allowed",
  "restore without ownership allowed",
  "audit deletion rollback allowed",
  "perfect recovery guaranteed",
  "impossible data loss guarantee",
  "restore test with real secrets allowed",
]);

validateForbidden(customerDashboardPath, publicBlockedPatterns());
validateForbidden(homePath, publicBlockedPatterns());
validateForbidden(freeCheckPath, publicBlockedPatterns());
validateForbidden(homepageConciergePath, [...publicBlockedPatterns(), "role=\"dialog\"", "STANDARD_DELAY_MS = 0"]);

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
  "github/codeql-action/init@v1",
  "github/codeql-action/init@v2",
  "github/codeql-action/init@v3",
  "github/codeql-action/analyze@v1",
  "github/codeql-action/analyze@v2",
  "github/codeql-action/analyze@v3",
  "continue-on-error: true",
  "allow-failure",
  "security-events: none",
]);

if (failures.length) {
  console.error("Most-pristine system standard validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Most-pristine system standard validation passed. Frontend, backend, APIs, data, AI, reports, security, privacy, core information protection, institutional operating maturity, adversarial validation suite, observability incident response, backup disaster recovery, audit defense, brand, performance, operations, integrations, documentation, deployment, customer experience, platform interface excellence, seamless responsive sync, controlled continuous evolution, repo update scanning automation, dependency lockfile integrity, customer dashboard excellence, public website excellence, dedicated Free Scan room, homepage concierge nudge, dashboard, command center, and support/operator surfaces must meet the same no-weak-link Cendorq quality bar.");

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
