import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const standards = [
  ["docs/closed-intelligence-operating-standard.md", "Cendorq Closed Intelligence Operating Standard", ["The public surface sells the outcome.", "The private system holds the engine.", "The database must be closed by default.", "no public report index", "Every AI-agent workflow must be evidence-gated."]],
  ["docs/data-quality-governance-standard.md", "Cendorq Data Quality Governance Standard", ["Cendorq must compound from trustworthy data, not just more data.", "source-aware", "confidence-scored", "freshness-aware", "Exploration zone", "Authority zone"]],
  ["docs/learning-memory-standard.md", "Cendorq Learning Memory Standard", ["Learn broadly.", "Promote carefully.", "Compound only from trusted memory.", "Raw memory", "Authority memory", "Rejected memory"]],
  ["docs/pure-signal-authority-standard.md", "Cendorq Pure Signal Authority Standard", ["A pure signal is not a perfect signal.", "Pure signals earn authority.", "Pure signal score", "authority-grade", "Promotion from exploration to operational to authority memory should be explicit and reversible."]],
  ["docs/adaptive-signal-evolution-standard.md", "Cendorq Adaptive Signal Evolution Standard", ["The definition of a pure signal is versioned, testable, and allowed to evolve.", "Drift detection", "Controlled evolution workflow", "Promote reversibly."]],
  ["docs/resilience-continuity-standard.md", "Cendorq Resilience and Continuity Standard", ["degrade safely", "recover quickly", "Backups must protect private data", "When AI outputs conflict with evidence, evidence wins."]],
  ["docs/maximum-protection-standard.md", "Cendorq Maximum Protection Standard", ["highest-protection operating posture", "Data classification", "Default posture: deny by default.", "Exfiltration prevention", "Emergency controls"]],
  ["docs/foundation-hardening-standard.md", "Cendorq Foundation Hardening Standard", ["The foundation must be harder to break than the features built on top of it.", "Non-negotiable foundation constraints", "Validation hardening", "Harden first. Build second. Elevate always."]],
  ["docs/foundation-elevation-standard.md", "Cendorq Foundation Elevation Standard", ["The foundation should not only resist failure. It should compound quality.", "Elevation dimensions", "The foundation should get stronger every time it is touched."]],
  ["docs/system-synchronization-qa-standard.md", "Cendorq System Synchronization QA Standard", ["If one part of the system changes, every affected operating layer must be checked and synchronized.", "Required sync rule", "Clean replacement rule", "Recurring sync checks"]],
  ["docs/internal-command-center-standard.md", "Cendorq Internal Command Center Standard", ["private Cendorq control panel", "The internal panel should make Cendorq easier to operate without exposing the private engine.", "Free Scan automation", "Deep Review automation", "Ongoing Control system", "Automation command deck", "Data quality and learning board"]],
  ["docs/score-threshold-operating-standard.md", "Cendorq Score Threshold Operating Standard", ["Use score bands internally to guide action. Use plain meaning publicly to guide the customer.", "65 to 69: watch-grade", "70 to 79: operational-grade", "80 to 89: strong operational-grade", "90 to 100: authority-grade candidate", "No clutter rule"]],
];

const requiredFiles = [
  ...standards.map(([path]) => path),
  "README.md",
  "SECURITY.md",
  "docs/release-checklist.md",
  "docs/command-center-incident-playbook.md",
  "docs/command-center-release-gate.md",
  "docs/command-center-implementation-plan.md",
  "docs/command-center-database-readiness.md",
  "docs/command-center-auth-readiness.md",
  ".github/pull_request_template.md",
  "CHANGELOG.md",
  "src/app/command-center/page.tsx",
  "src/app/command-center/[...module]/page.tsx",
  "src/app/api/command-center/readiness/route.ts",
  "src/lib/command-center/access.ts",
  "src/lib/command-center/auth-readiness.ts",
  "src/lib/command-center/config-status.ts",
  "src/lib/command-center/database-readiness.ts",
  "src/lib/command-center/modules.ts",
  "src/lib/command-center/readiness.ts",
];

const repoExpectations = [
  ["README.md", ["docs/closed-intelligence-operating-standard.md", "docs/maximum-protection-standard.md", "docs/foundation-hardening-standard.md", "docs/foundation-elevation-standard.md", "docs/system-synchronization-qa-standard.md"]],
  ["SECURITY.md", ["closed intelligence", "no direct database exposure", "least-privilege", "maximum protection"]],
  ["docs/release-checklist.md", ["closed intelligence", "data quality", "learning memory", "pure signal", "resilience", "maximum protection"]],
  ["docs/command-center-incident-playbook.md", ["Command Center Incident Playbook", "closed by default", "private Command Center route", "readiness route", "migration validation", "Do not open the route just to make smoke pass.", "Do not weaken the authorization boundary.", "Do not disable the validator.", "pnpm validate:routes", "CENDORQ_BASE_URL=https://cendorq.com pnpm smoke:production"]],
  ["docs/command-center-release-gate.md", ["Command Center Release Gate", "closed-by-default", "Command Center routes stay closed by default", "readiness route stays protected", "Migration files remain sequential", "Production smoke coverage", "Do not merge if", "CENDORQ_BASE_URL=https://cendorq.com pnpm smoke:production"]],
  ["docs/command-center-implementation-plan.md", ["Command Center Implementation Plan", "Build source of truth first", "Phase 1: Production database connection", "Phase 2: Private authentication and authorization", "Phase 3: Read-only Command Home", "Phase 4: Intake Inbox", "Phase 5: Clients and Reports", "Phase 6: Projects, Tasks, and Ongoing Control", "Phase 7: File Vault", "Phase 8: Payments and Subscriptions", "Phase 9: Report delivery and integrations", "Phase 10: Intelligence and outcomes", "Phase 11: Automation", "Source of truth stays in Cendorq."]],
  ["docs/command-center-database-readiness.md", ["Command Center Database Readiness", "private source of truth", "DATABASE_URL", "Do not expose this value", "managed Postgres", "Migrations must be applied intentionally", "no public database reads exist", "No direct database exposure through client code."]],
  ["docs/command-center-auth-readiness.md", ["Command Center Auth Readiness", "Authentication verifies identity", "AUTH_PROVIDER", "AUTH_SECRET", "closed-by-default fallback", "Preview gate rule", "Clerk", "Cendorq authorization state internally", "No client-only protection for sensitive data."]],
  [".github/pull_request_template.md", ["Closed intelligence check", "Data quality and learning check", "Maximum protection check"]],
  ["CHANGELOG.md", ["Closed intelligence operating standard", "Data quality governance standard", "Learning memory standard", "Pure signal authority standard", "Adaptive signal evolution standard", "Resilience and continuity standard", "Maximum protection standard"]],
  ["src/app/command-center/page.tsx", ["Private Command Center", "Closed by default.", "robots", "index: false", "follow: false", "No customer records", "private intelligence", "access controls are configured", "COMMAND_CENTER_MODULES", "COMMAND_CENTER_READINESS_CHECKS", "resolveCommandCenterAccessState", "commandCenterPreviewHeaderName"]],
  ["src/app/command-center/[...module]/page.tsx", ["CommandCenterModulePage", "notFound", "getCommandCenterModule", "resolveCommandCenterAccessState", "commandCenterPreviewHeaderName", "index: false", "follow: false", "No customer records", "Schema anchors", "requiredPermission"]],
  ["src/app/api/command-center/readiness/route.ts", ["resolveCommandCenterAccessState", "commandCenterPreviewHeaderName", "getCommandCenterConfigStatus", "summarizeCommandCenterConfigStatus", "no-store", "not authorized", "summary", "checks"]],
  ["src/lib/command-center/access.ts", ["resolveCommandCenterAccessState", "commandCenterPreviewHeaderName", "COMMAND_CENTER_PREVIEW_KEY", "allowed: false", "mode: \"closed\"", "mode: \"preview\""]],
  ["src/lib/command-center/auth-readiness.ts", ["getCommandCenterAuthReadiness", "CommandCenterAuthReadiness", "AUTH_PROVIDER", "AUTH_SECRET", "identity verification", "server-side session validation", "role mapping", "permission enforcement", "access decision recording", "closed-by-default fallback", "hasServerConfigValue"]],
  ["src/lib/command-center/config-status.ts", ["getCommandCenterConfigStatus", "summarizeCommandCenterConfigStatus", "missingServerConfig", "configuredCount", "requiredCount", "protectedTables", "hasServerConfigValue"]],
  ["src/lib/command-center/database-readiness.ts", ["getCommandCenterDatabaseReadiness", "CommandCenterDatabaseReadiness", "DATABASE_URL", "missingServerConfig", "migrationCount: 5", "protectedSchemaAreas", "hasServerConfigValue"]],
  ["src/lib/command-center/modules.ts", ["COMMAND_CENTER_MODULES", "Command Home", "Intake Inbox", "Clients", "Reports", "Projects", "Tasks", "File Vault", "Ongoing Control", "Payments", "Analytics", "Delivery", "Automation", "Intelligence", "Governance", "Access Control", "Audit Log", "Settings", "requiredPermission", "schemaAnchors"]],
  ["src/lib/command-center/readiness.ts", ["COMMAND_CENTER_READINESS_CHECKS", "durable-postgres", "private-auth-provider", "file-object-storage", "stripe-billing", "report-delivery-provider", "automation-event-security", "governance-controls", "production-smoke-readiness", "migration-operations", "requiredServerConfig", "protectedTables"]],
];

for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) failures.push(`Missing required operating file: ${file}`);
}

for (const [path, title, phrases] of standards) expect(path, [title, ...phrases], `${path} is missing required standard detail`);
for (const [path, phrases] of repoExpectations) expect(path, phrases, `${path} is missing synchronized operating detail`);

for (const routePath of ["src/app/command-center/page.tsx", "src/app/command-center/[...module]/page.tsx"]) {
  const route = existsSync(join(root, routePath)) ? read(routePath) : "";
  for (const forbidden of ["export const revalidate = 60", "\n    index: true", "\n    follow: true", "\n      index: true", "\n      follow: true", "fetch(\"/api/free-check\"", "localStorage", "sessionStorage", "process.env.COMMAND_CENTER_PREVIEW_KEY"]) {
    if (route.includes(forbidden)) failures.push(`${routePath} contains forbidden public/client data behavior: ${forbidden.trim()}`);
  }
}

const readinessApi = existsSync(join(root, "src/app/api/command-center/readiness/route.ts")) ? read("src/app/api/command-center/readiness/route.ts") : "";
for (const forbidden of ["value:", "secret:", "DATABASE_URL:", "STRIPE_SECRET_KEY:", "AUTH_SECRET:", "process.env.DATABASE_URL", "process.env.STRIPE_SECRET_KEY", "process.env.AUTH_SECRET"]) {
  if (readinessApi.includes(forbidden)) failures.push(`Command Center readiness API contains forbidden secret-value behavior: ${forbidden}`);
}

const accessGate = existsSync(join(root, "src/lib/command-center/access.ts")) ? read("src/lib/command-center/access.ts") : "";
for (const forbidden of ["NEXT_PUBLIC", "localStorage", "sessionStorage", "document.cookie", "allowed: true, mode: \"closed\""]) {
  if (accessGate.includes(forbidden)) failures.push(`Command Center access gate contains forbidden behavior: ${forbidden}`);
}

const authReadiness = existsSync(join(root, "src/lib/command-center/auth-readiness.ts")) ? read("src/lib/command-center/auth-readiness.ts") : "";
for (const forbidden of ["NEXT_PUBLIC", "localStorage", "sessionStorage", "fetch(", "use client", "return env", "secretValue", "process.env.AUTH_SECRET"]) {
  if (authReadiness.includes(forbidden)) failures.push(`Command Center auth readiness contains forbidden value exposure behavior: ${forbidden}`);
}

const configStatus = existsSync(join(root, "src/lib/command-center/config-status.ts")) ? read("src/lib/command-center/config-status.ts") : "";
for (const forbidden of ["NEXT_PUBLIC", "localStorage", "sessionStorage", "fetch(", "use client", "return value", "configuredValue", "secretValue"]) {
  if (configStatus.includes(forbidden)) failures.push(`Command Center config status contains forbidden value exposure behavior: ${forbidden}`);
}

const databaseReadiness = existsSync(join(root, "src/lib/command-center/database-readiness.ts")) ? read("src/lib/command-center/database-readiness.ts") : "";
for (const forbidden of ["NEXT_PUBLIC", "localStorage", "sessionStorage", "fetch(", "use client", "return env", "connectionString", "process.env.DATABASE_URL"]) {
  if (databaseReadiness.includes(forbidden)) failures.push(`Command Center database readiness contains forbidden value exposure behavior: ${forbidden}`);
}

const moduleMap = existsSync(join(root, "src/lib/command-center/modules.ts")) ? read("src/lib/command-center/modules.ts") : "";
for (const forbidden of ["NEXT_PUBLIC", "localStorage", "sessionStorage", "fetch(", "use client"]) {
  if (moduleMap.includes(forbidden)) failures.push(`Command Center module map contains forbidden runtime/client behavior: ${forbidden}`);
}

const readinessMap = existsSync(join(root, "src/lib/command-center/readiness.ts")) ? read("src/lib/command-center/readiness.ts") : "";
for (const forbidden of ["NEXT_PUBLIC", "localStorage", "sessionStorage", "fetch(", "use client", "process.env."]) {
  if (readinessMap.includes(forbidden)) failures.push(`Command Center readiness map contains forbidden runtime/client/secret behavior: ${forbidden}`);
}

if (failures.length) {
  console.error("Operating standards validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Operating standards validation passed. Closed intelligence, data quality, learning memory, pure signals, adaptive evolution, resilience, maximum protection, foundation hardening, foundation elevation, synchronization QA, internal command center, score thresholds, private route closure, centralized access gate, protected module map, closed module routes, metadata-only readiness map, protected config status, protected readiness API, Command Center incident playbook, Command Center release gate, Command Center implementation plan, database readiness, auth readiness, and private operating intelligence are enforced.");

function expect(path, phrases, label) {
  const text = read(path);
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${label}: ${phrase}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
