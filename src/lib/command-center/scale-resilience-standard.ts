export type ScaleResilienceArea =
  | "traffic"
  | "free-scan"
  | "queueing"
  | "database"
  | "cache"
  | "rate-limits"
  | "worker-capacity"
  | "report-consistency"
  | "observability"
  | "incident-response"
  | "customer-experience";

export type ScaleResilienceRule = {
  key: string;
  label: string;
  area: ScaleResilienceArea;
  requirement: string;
  requiredControls: readonly string[];
  blockedBehavior: readonly string[];
};

export type LoadReleaseGate = {
  key: string;
  label: string;
  gateRequirement: string;
  requiredEvidence: readonly string[];
};

export const SCALE_RESILIENCE_RULES = [
  {
    key: "large-customer-volume-ready",
    label: "Large customer volume ready",
    area: "traffic",
    requirement: "Cendorq must be designed to handle a very large number of customers, account records, report jobs, and operator actions without lowering report quality, security, evidence requirements, or customer experience.",
    requiredControls: ["stateless web tier", "horizontal scale path", "database index plan", "queue-backed long work", "idempotent job keys", "structured observability", "capacity review before launch"],
    blockedBehavior: ["single-process bottleneck", "manual-only fulfillment dependency", "quality downgrade under load", "unbounded synchronous report work", "silent dropped jobs"],
  },
  {
    key: "free-scan-spike-ready",
    label: "Free Scan spike ready",
    area: "free-scan",
    requirement: "Free Scan intake must tolerate traffic spikes, repeated submissions, and high public demand while preserving validation, privacy, rate-limit readiness, duplicate handling, and consistent customer messaging.",
    requiredControls: ["input validation", "deduplication key", "rate-limit plan", "queue handoff", "safe acceptance response", "abuse monitoring", "clear customer status"],
    blockedBehavior: ["open read access", "unbounded public writes", "duplicate spam jobs", "raw error exposure", "inconsistent scan promises", "dropping customer submissions"],
  },
  {
    key: "queue-first-report-work",
    label: "Queue-first report work",
    area: "queueing",
    requirement: "Long-running enrichment, scans, report generation, visual rendering, social/platform checks, and audit-package assembly must run through controlled job queues instead of blocking public request paths.",
    requiredControls: ["job status model", "idempotency key", "retry policy", "dead-letter policy", "timeout policy", "owner-visible failure state", "safe customer notification"],
    blockedBehavior: ["blocking request on long research", "infinite retry", "no dead-letter state", "duplicate paid work", "untracked background failure"],
  },
  {
    key: "consistent-output-under-load",
    label: "Consistent output under load",
    area: "report-consistency",
    requirement: "High traffic must never cause reports, scores, visuals, footers, guarantees, confidence labels, or plan recommendations to deviate from approved truth, growth, audit-defense, and most-pristine standards.",
    requiredControls: ["version-pinned methodology", "report template version", "calculation trace", "release approval", "blocked-claim scan", "snapshot inputs", "deterministic rendering where practical"],
    blockedBehavior: ["random method drift", "missing footer under load", "skipped evidence checks", "unapproved fallback report", "lower-quality high-volume mode"],
  },
  {
    key: "database-performance-boundary",
    label: "Database performance boundary",
    area: "database",
    requirement: "Database tables for customers, businesses, evidence, jobs, reports, approvals, corrections, and audit metadata must be index-ready, pagination-ready, retention-aware, and protected from full-table public scans.",
    requiredControls: ["query pagination", "index plan", "bounded filters", "retention class", "archival path", "tenant/customer boundary", "slow-query monitoring"],
    blockedBehavior: ["unbounded list endpoint", "full-table customer export", "missing pagination", "no retention strategy", "cross-customer leakage", "unindexed critical query"],
  },
  {
    key: "cache-with-truth-boundary",
    label: "Cache with truth boundary",
    area: "cache",
    requirement: "Caching may improve speed and cost, but must not serve stale, wrong, cross-customer, private, or method-incompatible report data.",
    requiredControls: ["cache key scope", "methodology version in key", "customer/business boundary", "TTL policy", "purge path", "no secret cache", "stale label when applicable"],
    blockedBehavior: ["cross-customer cache leak", "stale report as fresh", "secret caching", "methodology-mismatched cache", "unbounded cache growth"],
  },
  {
    key: "observability-and-capacity-command",
    label: "Observability and capacity command",
    area: "observability",
    requirement: "Operators must be able to see system health, queue depth, failure states, traffic spikes, Free Scan volume, report release backlog, job retries, latency, and capacity risks without exposing customer records or private evidence.",
    requiredControls: ["metadata-only dashboards", "queue-depth metrics", "latency metrics", "error budget", "job failure alerts", "capacity threshold", "incident owner"],
    blockedBehavior: ["no load visibility", "customer data in dashboards", "silent capacity exhaustion", "no alert owner", "untracked queue backlog"],
  },
  {
    key: "graceful-degradation-without-quality-loss",
    label: "Graceful degradation without quality loss",
    area: "customer-experience",
    requirement: "When load is extreme, Cendorq may slow non-critical processing, queue work, show honest status, or delay delivery, but it must not lower accuracy, skip evidence, remove safeguards, or weaken customer trust.",
    requiredControls: ["status messaging", "queue state", "delivery expectation policy", "priority rules", "no quality downgrade rule", "customer communication path"],
    blockedBehavior: ["lower-quality emergency report", "skipped validation", "false instant-complete claim", "hidden delay", "unsafe public fallback"],
  },
] as const satisfies readonly ScaleResilienceRule[];

export const LOAD_RELEASE_GATES = [
  {
    key: "public-intake-load-gate",
    label: "Public intake load gate",
    gateRequirement: "Before scaling public acquisition, Free Scan intake must prove validation, rate-limit readiness, deduplication, queue handoff, protected reads, safe errors, and customer status messaging.",
    requiredEvidence: ["Free Scan intake validator", "protected read checks", "queue handoff plan", "rate-limit plan", "abuse monitoring plan", "production smoke coverage"],
  },
  {
    key: "report-generation-load-gate",
    label: "Report generation load gate",
    gateRequirement: "Before high-volume paid reports, report generation must prove queue-backed work, calculation traces, evidence references, release approvals, visual rendering consistency, footer safeguards, and correction paths.",
    requiredEvidence: ["report record contracts", "release approval record", "calculation trace", "evidence retention", "blocked-claim scan", "correction workflow"],
  },
  {
    key: "capacity-regression-gate",
    label: "Capacity regression gate",
    gateRequirement: "Any change that touches intake, jobs, reports, database reads, customer dashboards, or API routes must avoid unbounded work and preserve observability, pagination, idempotency, and safe failure behavior.",
    requiredEvidence: ["bounded query review", "job retry policy", "idempotency key", "safe failure state", "observability impact", "rollback path"],
  },
] as const satisfies readonly LoadReleaseGate[];

export function getScaleResilienceStandard() {
  return {
    rules: SCALE_RESILIENCE_RULES,
    releaseGates: LOAD_RELEASE_GATES,
  };
}
