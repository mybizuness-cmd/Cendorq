import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const requiredFiles = [
  "src/lib/command-center/most-pristine-system-standard.ts",
  "src/lib/command-center/enterprise-operating-standard.ts",
  "src/lib/command-center/audit-defense-system.ts",
  "src/lib/platform-interface-excellence-contracts.ts",
  "src/lib/seamless-responsive-sync-contracts.ts",
  "src/lib/core-information-protection-contracts.ts",
  "src/lib/institutional-operating-maturity-contracts.ts",
  "src/lib/adversarial-validation-suite-contracts.ts",
  "src/lib/observability-incident-response-contracts.ts",
  "src/lib/backup-disaster-recovery-contracts.ts",
  "src/lib/controlled-continuous-evolution-contracts.ts",
  "src/lib/controlled-maintenance-contracts.ts",
  "docs/controlled-continuous-evolution.md",
  "docs/controlled-maintenance.md",
  "docs/owner-maximum-protection-posture.md",
  "docs/command-center-docs-index.md",
  "src/lib/command-center/validation-registry.ts",
  "src/app/page.tsx",
  "src/app/free-check/page.tsx",
  "src/app/dashboard/page.tsx",
  "package.json",
  ".github/dependabot.yml",
  ".github/workflows/codeql.yml",
];

const requiredValidators = [
  "src/scripts/validate-platform-interface-excellence.mjs",
  "src/scripts/validate-seamless-responsive-sync.mjs",
  "src/scripts/validate-core-information-protection.mjs",
  "src/scripts/validate-institutional-operating-maturity.mjs",
  "src/scripts/validate-adversarial-validation-suite.mjs",
  "src/scripts/validate-observability-incident-response.mjs",
  "src/scripts/validate-backup-disaster-recovery.mjs",
  "src/scripts/validate-customer-dashboard-excellence.mjs",
  "src/scripts/validate-public-website-excellence.mjs",
  "src/scripts/validate-homepage-concierge-nudge.mjs",
  "src/scripts/validate-controlled-continuous-evolution.mjs",
  "src/scripts/validate-controlled-maintenance-contracts.mjs",
  "src/scripts/validate-owner-maximum-protection-posture.mjs",
  "src/scripts/validate-repo-update-scanning-automation.mjs",
  "src/scripts/validate-dependency-lockfile-integrity.mjs",
  "src/scripts/validate-most-pristine-system-standard.mjs",
];

for (const path of [...requiredFiles, ...requiredValidators]) validateFileExists(path);

if (!failures.length) {
  validateTextFile("src/lib/command-center/most-pristine-system-standard.ts", [
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
    "Customer experience most-pristine standard",
    "No weak link pass",
  ]);

  validateTextFile("src/lib/platform-interface-excellence-contracts.ts", ["PLATFORM_INTERFACE_EXCELLENCE_CONTRACT", "platform-interface-excellence-lock-v1", "customer-dashboard", "public-frontend-website", "operator-command-center", "Hard-lock customer dashboard, public website, command center, and support/operator surfaces", "Every customer-facing and operator-facing interface must feel premium, clear, useful, fast, protected, truthful, and carefully guided.", "no fake urgency", "no dark-pattern pressure", "all new interface layers require validation before merge"]);
  validateTextFile("src/lib/seamless-responsive-sync-contracts.ts", ["SEAMLESS_RESPONSIVE_SYNC_CONTRACT", "seamless-responsive-sync-v1", "fast, coherent, synchronized, responsive, and protected", "Free Scan completion must connect to dashboard next action", "billing and plan state must connect to dashboard, report entitlements, and plan comparison", "no disconnected customer journey"]);
  validateTextFile("src/lib/core-information-protection-contracts.ts", ["CORE_INFORMATION_PROTECTION_CONTRACT", "core-information-protection-v1", "Cendorq must never treat customer or company information as casual data.", "customer-owned data must require server-side customer ownership checks", "customer surfaces receive safe projections only", "No system can honestly promise impossible-to-steal or impossible-to-hack."]);
  validateTextFile("src/lib/institutional-operating-maturity-contracts.ts", ["INSTITUTIONAL_OPERATING_MATURITY_CONTRACT", "institutional-operating-maturity-v1", "Raise Cendorq beyond premium product quality into institutional-grade operational maturity", "validated before release, observable after release, protected by least privilege, prepared for incidents, recoverable from failures", "adversarial-testing", "observability-and-alerting", "backup-and-disaster-recovery"]);
  validateTextFile("src/lib/adversarial-validation-suite-contracts.ts", ["ADVERSARIAL_VALIDATION_SUITE_CONTRACT", "adversarial-validation-suite-v1", "Adversarial checks are mandatory release evidence.", "ADVERSARIAL_VALIDATION_CASES", "ADVERSARIAL_VALIDATION_BLOCKED_PATTERNS"]);
  validateTextFile("src/lib/observability-incident-response-contracts.ts", ["OBSERVABILITY_INCIDENT_RESPONSE_CONTRACT", "observability-incident-response-v1", "Operational signals must help Cendorq detect, understand, contain, and recover from failures quickly", "SEV-1", "SEV-2", "SEV-3", "SEV-4"]);
  validateTextFile("src/lib/backup-disaster-recovery-contracts.ts", ["BACKUP_DISASTER_RECOVERY_CONTRACT", "backup-disaster-recovery-v1", "Recovery must be planned before scale.", "restore must preserve customer ownership boundaries and safe projection rules", "BACKUP_DISASTER_RECOVERY_HARD_LOCKS"]);

  validateTextFile("src/app/dashboard/page.tsx", ["OPERATING_SNAPSHOT", "Dashboard operating snapshot", "EXPERIENCE_PILLARS", "CHANNEL_COVERAGE", "Proof before pressure", "focus:ring-2"]);
  validateTextFile("src/app/page.tsx", ["Business Command Intelligence", "See pricing", "Start free scan", "Free Scan", "Deep Review", "Build Fix", "Ongoing Control", "Proof before pressure", "No fake urgency", "Protected dashboard/report vault"]);
  validateTextFile("src/app/free-check/page.tsx", ["Premium Free Scan room", "Free first read", "Dedicated page, not a cramped popup", "Routeable page that can be resumed or linked from dashboard", "Dashboard, notifications, and report vault handoff", "No browser-exposed protected secrets"]);

  validateTextFile("docs/controlled-continuous-evolution.md", ["# Controlled Continuous Evolution", "release-captain approval before merge", "Continuous updates must raise or preserve Cendorq's most-pristine standard"]);
  validateTextFile("src/lib/controlled-continuous-evolution-contracts.ts", ["CONTROLLED_CONTINUOUS_EVOLUTION_CONTRACT"]);
  validateTextFile("src/scripts/validate-controlled-continuous-evolution.mjs", ["src/lib/controlled-continuous-evolution-contracts.ts", "Controlled continuous evolution validation passed"]);

  validateTextFile("docs/controlled-maintenance.md", ["# Controlled Maintenance", "keeping the platform current, secure, validated, and scalable", "No queued update may change production automatically", "validation, approval state, rollback plan, and audit record"]);
  validateTextFile("src/lib/controlled-maintenance-contracts.ts", ["CONTROLLED_MAINTENANCE_CONTRACT", "Controlled Maintenance Architecture", "safe update queues", "without uncontrolled AI changes or automatic production mutation", "reviewStreams", "safeUpdateQueue", "hardLocks", "releaseRules"]);
  validateTextFile("src/scripts/validate-controlled-maintenance-contracts.mjs", ["src/lib/controlled-maintenance-contracts.ts", "Controlled maintenance contracts validation passed"]);

  validateTextFile("src/lib/command-center/validation-registry.ts", ["controlled-maintenance", "Controlled maintenance", "src/scripts/validate-controlled-maintenance-contracts.mjs", "owner-maximum-protection-posture"]);
  validateTextFile("src/lib/command-center/enterprise-operating-standard.ts", ["Enterprise operating standard", "Liability minimization defense", "Audit defense pass"]);
  validateTextFile("src/lib/command-center/audit-defense-system.ts", ["AUDIT_DEFENSE_CONTROLS", "AUDIT_DEFENSE_RELEASE_GATES", "Claim substantiation record"]);

  validateTextFile("package.json", ["validate:routes"]);
  validateTextFile(".github/dependabot.yml", ["version: 2", "package-ecosystem: npm", "package-ecosystem: github-actions"]);
  validateTextFile(".github/workflows/codeql.yml", ["name: CodeQL", "pull_request:", "security-events: write", "actions/checkout@v6", "github/codeql-action/init@v4", "github/codeql-action/analyze@v4"]);

  for (const validatorPath of requiredValidators) validateTextFile(validatorPath, [validatorPath.split("/").pop()]);

  validateForbidden("src/lib/command-center/most-pristine-system-standard.ts", ["prototype-looking allowed", "agent drift allowed", "client-side secret exposure allowed", "unsupported claims allowed"]);
  validateForbidden("src/app/page.tsx", publicBlockedPatterns());
  validateForbidden("src/app/free-check/page.tsx", publicBlockedPatterns());
  validateForbidden("src/app/dashboard/page.tsx", publicBlockedPatterns());
  validateForbidden("docs/controlled-maintenance.md", ["change production automatically without approval", "skip validation", "bypass approval", "rollback optional", "delete audit records", "guaranteed ROI", "impossible to hack", "liability-free"]);
  validateForbidden(".github/dependabot.yml", ["automerge: true", "auto-merge: true", "skip-validation"]);
  validateForbidden(".github/workflows/codeql.yml", ["github/codeql-action/init@v1", "github/codeql-action/analyze@v1", "continue-on-error: true", "allow-failure"]);
}

if (failures.length) {
  console.error("Most-pristine system standard validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Most-pristine system standard validation passed. Frontend, backend, APIs, data, AI, reports, security, privacy, core information protection, institutional operating maturity, adversarial validation suite, observability incident response, backup disaster recovery, audit defense, brand, performance, operations, integrations, documentation, deployment, customer experience, platform interface excellence, seamless responsive sync, controlled continuous evolution docs, controlled maintenance, owner maximum-protection posture, repo update scanning automation, dependency lockfile integrity, customer dashboard excellence, public website excellence, dedicated Free Scan room, dashboard, command center, and support/operator surfaces must meet the same no-weak-link Cendorq quality bar.");

function publicBlockedPatterns() {
  return ["guaranteed ROI", "guaranteed refund", "guaranteed legal outcome", "guaranteed security outcome", "impossible to hack", "never liable", "liability-free", "rawPayload", "rawEvidence", "rawSecurityPayload", "rawBillingData", "internalNotes", "operatorIdentity", "riskScoringInternals", "attackerDetails", "sessionToken", "csrfToken", "localStorage", "sessionStorage"];
}

function validateFileExists(path) {
  if (!existsSync(join(root, path))) failures.push(`Missing required most-pristine dependency: ${path}`);
}

function validateTextFile(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing required most-pristine dependency: ${path}`);
    return;
  }
  const text = read(path);
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing required most-pristine phrase: ${phrase}`);
}

function validateForbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  for (const phrase of phrases) if (text.includes(phrase)) failures.push(`${path} contains forbidden most-pristine phrase: ${phrase}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
