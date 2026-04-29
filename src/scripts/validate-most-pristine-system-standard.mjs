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
const accessGovernancePath = "src/lib/access-governance-contracts.ts";
const accessGovernanceValidatorPath = "src/scripts/validate-access-governance.mjs";
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

validateTextFile(interfaceExcellenceValidatorPath, ["Platform interface excellence validation passed", "validate-platform-interface-excellence.mjs", "PLATFORM_INTERFACE_EXCELLENCE_CONTRACT"]);

validateTextFile(seamlessSyncPath, [
  "SEAMLESS_RESPONSIVE_SYNC_CONTRACT",
  "seamless-responsive-sync-v1",
  "fast, coherent, synchronized, responsive, and protected",
  "Every surface must feel instant, connected, and dependable.",
  "Free Scan completion must connect to dashboard next action",
  "support request submission must connect to support status and notifications",
  "billing and plan state must connect to dashboard, report entitlements, and plan comparison",
  "protected API responses should use no-store",
  "no disconnected customer journey",
]);
validateTextFile(seamlessSyncValidatorPath, ["Seamless responsive sync validation passed", "SEAMLESS_RESPONSIVE_SYNC_CONTRACT"]);

validateTextFile(informationProtectionPath, [
  "CORE_INFORMATION_PROTECTION_CONTRACT",
  "core-information-protection-v1",
  "Cendorq must never treat customer or company information as casual data.",
  "customer-owned data must require server-side customer ownership checks",
  "no session tokens in localStorage, sessionStorage, URLs, analytics payloads, public JavaScript, HTML, emails, or customer copy",
  "No system can honestly promise impossible-to-steal or impossible-to-hack.",
]);
validateTextFile(informationProtectionValidatorPath, ["Core information protection validation passed", "CORE_INFORMATION_PROTECTION_CONTRACT"]);

validateTextFile(institutionalMaturityPath, [
  "INSTITUTIONAL_OPERATING_MATURITY_CONTRACT",
  "institutional-operating-maturity-v1",
  "adversarial-testing",
  "observability-and-alerting",
  "incident-response",
  "backup-and-disaster-recovery",
  "access-governance",
  "privacy-and-data-retention",
  "avoid overclaiming certifications, guarantees, or security absolutes before they are actually obtained",
]);
validateTextFile(institutionalMaturityValidatorPath, ["Institutional operating maturity validation passed", "INSTITUTIONAL_OPERATING_MATURITY_CONTRACT"]);

validateTextFile(adversarialSuitePath, [
  "ADVERSARIAL_VALIDATION_SUITE_CONTRACT",
  "adversarial-validation-suite-v1",
  "Adversarial checks are mandatory release evidence.",
  "prompt-injection-and-system-override-attempts",
  "validators must fail on browser storage of protected authority",
  "adversarial validation must run before merge through a locked gate",
]);
validateTextFile(adversarialSuiteValidatorPath, ["Adversarial validation suite validation passed", "ADVERSARIAL_VALIDATION_SUITE_CONTRACT"]);

validateTextFile(observabilityIncidentPath, [
  "OBSERVABILITY_INCIDENT_RESPONSE_CONTRACT",
  "observability-incident-response-v1",
  "telemetry must not include raw payloads, raw evidence, payment data, credentials, secrets, customer messages, internal notes, operator identities, session tokens, CSRF tokens, or admin keys",
  "SEV-1",
  "customer-facing incident copy must be factual, bounded, calm, and approved",
]);
validateTextFile(observabilityIncidentValidatorPath, ["Observability incident response validation passed", "OBSERVABILITY_INCIDENT_RESPONSE_CONTRACT"]);

validateTextFile(backupRecoveryPath, [
  "BACKUP_DISASTER_RECOVERY_CONTRACT",
  "backup-disaster-recovery-v1",
  "restore customer-owned views without cross-customer leakage",
  "restore must not re-trigger lifecycle emails, notifications, billing actions, or support messages without idempotency checks",
  "restore tests must use sanitized fixtures or safe references, not real raw customer secrets",
]);
validateTextFile(backupRecoveryValidatorPath, ["Backup disaster recovery validation passed", "BACKUP_DISASTER_RECOVERY_CONTRACT"]);

validateTextFile(accessGovernancePath, [
  "ACCESS_GOVERNANCE_CONTRACT",
  "access-governance-v1",
  "least-privilege, reviewable, revocable, auditable",
  "grant only the minimum role needed for the active workflow",
  "separate read-only review from guarded mutation",
  "do not allow customer-facing projections to inherit operator privileges",
  "billing changes require explicit billing authority and audit record",
  "backup restore requires recovery authority, incident context, ownership-boundary validation, and post-restore validation",
  "stale access must be removed promptly",
  "emergency access must be time-bounded, audited, and reviewed after use",
  "new mutation paths must define required role, gate, audit record, safe projection, and failure behavior",
  "ACCESS_GOVERNANCE_HARD_LOCKS",
]);
validateTextFile(accessGovernanceValidatorPath, ["Access governance validation passed", "ACCESS_GOVERNANCE_CONTRACT"]);

validateTextFile(customerDashboardPath, ["OPERATING_SNAPSHOT", "Dashboard operating snapshot", "EXPERIENCE_PILLARS", "CHANNEL_COVERAGE", "Proof before pressure", "focus:ring-2"]);
validateTextFile(dashboardExcellenceValidatorPath, ["Customer dashboard excellence validation passed"]);
validateTextFile(homePath, ["FRONT_DOOR_SNAPSHOT", "CENDORQ_SYSTEM_LAYERS", "BUSINESS_MODEL_COVERAGE", "TRUST_RULES", "FreeScanConciergeNudge", "Proof before pressure"]);
validateTextFile(freeCheckPath, ["Dedicated scan room", "DEDICATED_SCAN_ROOM_DECISION", "SCAN_ROOM_STANDARDS", "Why this is not a full popup"]);
validateTextFile(publicWebsiteExcellenceValidatorPath, ["Public website excellence validation passed"]);
validateTextFile(homepageConciergePath, ["FreeScanConciergeNudge", "STANDARD_DELAY_MS = 18_000", "RESUME_DELAY_MS = 6_000", "SCROLL_TRIGGER_RATIO = 0.45", "SameSite=Lax"]);
validateTextFile(homepageConciergeValidatorPath, ["Homepage concierge nudge validation passed"]);
validateTextFile(continuousEvolutionPath, ["CONTROLLED_CONTINUOUS_EVOLUTION_CONTRACT", "controlled-continuous-evolution-v1", "Vercel preview or deployment check passes"]);
validateTextFile(continuousEvolutionValidatorPath, ["Controlled continuous evolution validation passed"]);
validateTextFile(repoAutomationValidatorPath, ["Repo update scanning automation validation passed"]);
validateTextFile(dependabotPath, ["version: 2", "controlled-update", "next-react-platform"]);
validateTextFile(codeqlPath, ["name: CodeQL", "security-events: write", "github/codeql-action/analyze@v3"]);
validateTextFile(enterprisePath, ["Enterprise operating standard", "Liability minimization defense", "Audit defense pass"]);
validateTextFile(auditDefensePath, ["AUDIT_DEFENSE_CONTROLS", "AUDIT_DEFENSE_RELEASE_GATES", "Claim substantiation record"]);
validateTextFile(packagePath, ["validate:routes", "validate-most-pristine-system-standard.mjs"]);

validateForbidden(standardPath, ["prototype-looking allowed", "agent drift allowed", "client-side secret exposure allowed", "claiming zero liability allowed"]);
validateForbidden(interfaceExcellencePath, ["guaranteed ROI allowed", "fake urgency allowed", "dark patterns allowed", "browser secret allowed"]);
validateForbidden(seamlessSyncPath, ["disconnected customer journey allowed", "browser secrets allowed", "bypass ownership check allowed"]);
validateForbidden(informationProtectionPath, ["impossible-to-steal guarantee", "impossible-to-hack guarantee", "browser authority allowed", "raw customer payloads allowed"]);
validateForbidden(institutionalMaturityPath, ["ignore adversarial findings allowed", "telemetry raw payloads allowed", "launch without validation allowed"]);
validateForbidden(adversarialSuitePath, ["ignore prompt injection allowed", "echo raw attack allowed", "disable adversarial validation allowed"]);
validateForbidden(observabilityIncidentPath, ["raw telemetry allowed", "alert without runbook allowed", "delete audit proof allowed"]);
validateForbidden(backupRecoveryPath, ["raw backups allowed", "restore without ownership allowed", "perfect recovery guaranteed"]);
validateForbidden(accessGovernancePath, ["broad admin allowed", "mutation without audit allowed", "stale access allowed", "emergency access without expiry allowed", "customer projection can inherit operator privileges", "delete access audit records allowed"]);
validateForbidden(customerDashboardPath, publicBlockedPatterns());
validateForbidden(homePath, publicBlockedPatterns());
validateForbidden(freeCheckPath, publicBlockedPatterns());
validateForbidden(homepageConciergePath, [...publicBlockedPatterns(), "role=\"dialog\"", "STANDARD_DELAY_MS = 0"]);
validateForbidden(continuousEvolutionPath, ["autoMergeWithoutValidation allowed", "skipVercelGate allowed", "disableValidatorForUpdate allowed"]);
validateForbidden(dependabotPath, ["automerge: true", "auto-merge: true", "skip-validation"]);
validateForbidden(codeqlPath, ["continue-on-error: true", "allow-failure", "security-events: none"]);

if (failures.length) {
  console.error("Most-pristine system standard validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Most-pristine system standard validation passed. Frontend, backend, APIs, data, AI, reports, security, privacy, core information protection, institutional operating maturity, adversarial validation suite, observability incident response, backup disaster recovery, access governance, audit defense, brand, performance, operations, integrations, documentation, deployment, customer experience, platform interface excellence, seamless responsive sync, controlled continuous evolution, repo update scanning automation, customer dashboard excellence, public website excellence, dedicated Free Scan room, homepage concierge nudge, dashboard, command center, and support/operator surfaces must meet the same no-weak-link Cendorq quality bar.");

function publicBlockedPatterns() {
  return ["guaranteed ROI", "guaranteed refund", "guaranteed legal outcome", "guaranteed security outcome", "impossible to hack", "never liable", "liability-free", "rawPayload", "rawEvidence", "rawSecurityPayload", "rawBillingData", "internalNotes", "operatorIdentity", "riskScoringInternals", "attackerDetails", "sessionToken", "csrfToken", "localStorage", "sessionStorage"];
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
