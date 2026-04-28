export type MostPristineSystemArea =
  | "frontend"
  | "backend"
  | "api"
  | "database"
  | "ai"
  | "reports"
  | "security"
  | "privacy"
  | "audit-defense"
  | "brand"
  | "performance"
  | "accessibility"
  | "integrations"
  | "operations"
  | "documentation"
  | "deployment"
  | "customer-experience";

export type MostPristineSystemRequirement = {
  key: string;
  label: string;
  area: MostPristineSystemArea;
  requirement: string;
  requiredControls: readonly string[];
  blockedBehavior: readonly string[];
};

export type MostPristineReleasePass = {
  key: string;
  label: string;
  releaseQuestion: string;
  evidenceRequired: readonly string[];
};

export const MOST_PRISTINE_SYSTEM_REQUIREMENTS = [
  {
    key: "frontend-most-pristine-standard",
    label: "Frontend most-pristine standard",
    area: "frontend",
    requirement: "Every public and private interface must feel official, premium, fast, accessible, responsive, trustworthy, conversion-aware, brand-consistent, and clear about what action the user should take next. Customer-facing UI must look like a serious enterprise company, not a prototype.",
    requiredControls: ["approved brand system", "responsive layout", "accessibility checks", "clear conversion path", "customer-safe copy", "performance budget", "no secret exposure"],
    blockedBehavior: ["draft-looking UI", "inconsistent branding", "confusing navigation", "decorative data visuals", "unreadable text", "client-side secret exposure", "unsupported claims"],
  },
  {
    key: "backend-most-pristine-standard",
    label: "Backend most-pristine standard",
    area: "backend",
    requirement: "Backend systems must be secure-by-default, typed, validated, observable, testable, failure-aware, auditable, least-privilege, and designed so every customer-facing output can be traced to evidence, calculations, versions, and approvals.",
    requiredControls: ["server-side validation", "typed contracts", "least privilege", "structured logs", "error handling", "audit trail", "rollback path", "validation scripts"],
    blockedBehavior: ["silent failure", "unvalidated input", "untyped contract drift", "direct public data exposure", "missing owner", "missing audit trail", "no rollback"],
  },
  {
    key: "api-most-pristine-standard",
    label: "API most-pristine standard",
    area: "api",
    requirement: "APIs must have explicit authorization, method restrictions, validation, safe error shapes, rate-limit readiness, idempotency where needed, observability, and no accidental data leakage.",
    requiredControls: ["authz check", "method allowlist", "input schema", "safe error contract", "rate-limit plan", "no raw secret output", "audit event"],
    blockedBehavior: ["open protected endpoint", "unsafe error detail", "missing OPTIONS handling where needed", "raw object dumping", "unauthorized read", "untracked mutation"],
  },
  {
    key: "data-most-pristine-standard",
    label: "Data and database most-pristine standard",
    area: "database",
    requirement: "Data models must separate customer records, raw evidence, report outputs, audit records, market-learning aggregates, secrets, billing metadata, and test records with clear retention, access, deletion, and recovery boundaries.",
    requiredControls: ["data classification", "retention class", "row-level access plan", "migration validation", "test/live separation", "backup and recovery plan", "deletion policy"],
    blockedBehavior: ["mixed test and live records", "unknown retention", "raw evidence in public output", "private revenue leak", "unversioned migration", "missing recovery plan"],
  },
  {
    key: "ai-most-pristine-standard",
    label: "AI most-pristine standard",
    area: "ai",
    requirement: "AI must be controlled, versioned, evidence-grounded, plan-scoped, review-gated for customer output, prompt-auditable, and unable to drift outside approved business logic, legal limits, or customer-safe wording.",
    requiredControls: ["prompt version", "method version", "evidence references", "blocked-action policy", "customer-output approval", "AI command history", "review-gated self-evolution"],
    blockedBehavior: ["agent drift", "unreviewed prompt change", "unsupported recommendation", "autonomous customer send", "invented proof", "hidden confidence"],
  },
  {
    key: "report-most-pristine-standard",
    label: "Report most-pristine standard",
    area: "reports",
    requirement: "Reports must be official, branded, visually modern, evidence-backed, calculation-traceable, business-specific, category-aware, revenue-context-aware, social/platform-aware, confidence-labeled, globally adaptable, and legally careful.",
    requiredControls: ["report truth engine", "report growth system", "business logo policy", "visual standards", "calculation trace", "confidence labels", "footer safeguards", "release approval"],
    blockedBehavior: ["generic report", "unsupported score", "decorative chart", "missing business tie-back", "outcome guarantee", "missing footer", "unapproved report release"],
  },
  {
    key: "security-most-pristine-standard",
    label: "Security most-pristine standard",
    area: "security",
    requirement: "Security must follow defense-in-depth across identity, access, inputs, outputs, secrets, dependencies, deployment, monitoring, incident response, and recovery without ever claiming impossible perfect security.",
    requiredControls: ["authentication", "authorization", "secret isolation", "dependency review", "input validation", "output safety", "monitoring", "incident response", "production smoke"],
    blockedBehavior: ["unhackable claims", "client-side secrets", "missing authz", "unsafe dependency drift", "unmonitored production", "no incident path"],
  },
  {
    key: "privacy-audit-most-pristine-standard",
    label: "Privacy and audit-defense most-pristine standard",
    area: "audit-defense",
    requirement: "Privacy and audit defense must preserve proof without exposing sensitive data: consent, scope, terms versions, evidence references, approvals, correction history, and dispute-readiness records must be retained under safe boundaries.",
    requiredControls: ["audit defense system", "consent record", "terms/privacy alignment", "claim substantiation", "evidence retention", "correction path", "dispute package metadata"],
    blockedBehavior: ["missing consent", "claiming zero liability", "promising legal immunity", "destroying audit evidence", "raw secret disclosure", "unclear terms"],
  },
  {
    key: "brand-most-pristine-standard",
    label: "Brand most-pristine standard",
    area: "brand",
    requirement: "Brand presentation must make Cendorq feel like a serious, premium, trustworthy, practical, verifiable business operating system across every surface, report, email, dashboard, and customer touchpoint.",
    requiredControls: ["approved logo", "consistent typography", "color system", "official report templates", "customer-safe tone", "trust language", "visual hierarchy"],
    blockedBehavior: ["generic branding", "logo misuse", "inconsistent tone", "low-trust visuals", "hype over proof", "unreadable legal text"],
  },
  {
    key: "performance-most-pristine-standard",
    label: "Performance most-pristine standard",
    area: "performance",
    requirement: "Every customer-facing and operator-facing path must be designed for speed, stability, graceful degradation, fast feedback, and clear progress states without compromising validation, security, or evidence quality.",
    requiredControls: ["performance budget", "loading states", "error states", "graceful degradation", "safe caching plan", "observability", "no blocking secrets in client"],
    blockedBehavior: ["slow critical path without reason", "blank failure", "unbounded request", "client-heavy private data", "unsafe cache", "no user feedback"],
  },
  {
    key: "operations-most-pristine-standard",
    label: "Operations most-pristine standard",
    area: "operations",
    requirement: "Operations must be reliable, observable, documented, repeatable, owner-assigned, incident-ready, correction-ready, and built for controlled scaling across plans, categories, countries, and languages.",
    requiredControls: ["owner metadata", "operator runbook", "status checks", "incident workflow", "correction workflow", "localization readiness", "scaling checklist"],
    blockedBehavior: ["unclear owner", "manual-only tribal knowledge", "no incident procedure", "no correction workflow", "unsupported country rollout"],
  },
  {
    key: "integration-most-pristine-standard",
    label: "Integration most-pristine standard",
    area: "integrations",
    requirement: "Third-party services, data sources, platform checks, social platforms, payment systems, email systems, storage, and automation must be permission-aware, scoped, logged, resilient, replaceable, and reviewed for vendor risk.",
    requiredControls: ["provider scope", "credential isolation", "fallback behavior", "rate-limit handling", "audit logging", "vendor risk review", "graceful degradation"],
    blockedBehavior: ["overbroad provider access", "hard dependency without fallback", "unlogged external action", "credential leakage", "vendor lock-in without exit path"],
  },
  {
    key: "documentation-most-pristine-standard",
    label: "Documentation most-pristine standard",
    area: "documentation",
    requirement: "Documentation must be discoverable, current, concise, operator-useful, validation-backed, source-of-truth-linked, and free of secrets, raw evidence, private reports, prompts, scoring internals, or customer data.",
    requiredControls: ["docs index", "operator runbook", "source-of-truth anchors", "validator coverage", "maintenance rule", "no private data"],
    blockedBehavior: ["stale docs", "undocumented validator", "secret in docs", "raw evidence in docs", "missing source anchor", "manual process without runbook"],
  },
  {
    key: "deployment-most-pristine-standard",
    label: "Deployment most-pristine standard",
    area: "deployment",
    requirement: "Every change must pass validation, build checks, route checks, smoke checks where applicable, reviewable diffs, rollback readiness, and production safety gates before merge or release.",
    requiredControls: ["validate:routes", "typecheck", "lint", "build", "Vercel status", "smoke coverage", "rollback plan", "branch PR review"],
    blockedBehavior: ["direct unsafe main changes", "failing checks", "no rollback", "unreviewed production release", "missing smoke coverage", "ignored validator failure"],
  },
  {
    key: "customer-experience-most-pristine-standard",
    label: "Customer experience most-pristine standard",
    area: "customer-experience",
    requirement: "Customer experience must be clear, honest, fast, helpful, trust-building, conversion-aware, globally adaptable, and never confusing about what Cendorq found, what it means, what is uncertain, what happens next, or what is guaranteed.",
    requiredControls: ["clear next step", "uncertainty labels", "guarantee limits", "localized language", "support path", "material error correction path", "transparent plan value"],
    blockedBehavior: ["confusing offer", "hidden limitation", "fear-only selling", "unsupported urgency", "missing support path", "unclear guarantee"],
  },
] as const satisfies readonly MostPristineSystemRequirement[];

export const MOST_PRISTINE_RELEASE_PASSES = [
  {
    key: "inside-outside-surface-pass",
    label: "Inside-outside surface pass",
    releaseQuestion: "Does every visible and invisible layer meet the same most-pristine standard: frontend, backend, APIs, data, AI, reports, operations, integrations, docs, deployment, legal/audit, and customer experience?",
    evidenceRequired: ["validation registry", "docs index", "source-of-truth files", "release validators", "smoke coverage", "approval records"],
  },
  {
    key: "trust-with-leverage-pass",
    label: "Trust with leverage pass",
    releaseQuestion: "Does the change increase customer value, conversion clarity, enterprise trust, evidence quality, or Cendorq leverage without weakening privacy, security, audit defense, or truthfulness?",
    evidenceRequired: ["report truth policy", "enterprise operating standard", "audit defense system", "controlled market learning policy", "customer-output approval"],
  },
  {
    key: "no-weak-link-pass",
    label: "No weak link pass",
    releaseQuestion: "Is any layer below the Cendorq standard because it is internal, temporary, hidden, operational, or not customer-facing? If yes, the change is not most-pristine enough.",
    evidenceRequired: ["owner", "validation result", "risk note", "rollback path", "follow-up block or remediation"],
  },
] as const satisfies readonly MostPristineReleasePass[];

export function getMostPristineSystemStandard() {
  return {
    requirements: MOST_PRISTINE_SYSTEM_REQUIREMENTS,
    releasePasses: MOST_PRISTINE_RELEASE_PASSES,
  };
}
