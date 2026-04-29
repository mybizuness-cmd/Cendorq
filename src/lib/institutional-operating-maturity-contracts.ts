export const INSTITUTIONAL_OPERATING_MATURITY_CONTRACT = {
  id: "institutional-operating-maturity-v1",
  name: "Institutional operating maturity standard",
  purpose:
    "Raise Cendorq beyond premium product quality into institutional-grade operational maturity through adversarial testing, observability, incident response, disaster recovery, access governance, compliance readiness, and controlled release discipline.",
  operatingStandard:
    "Cendorq should operate like a serious business-critical platform: validated before release, observable after release, protected by least privilege, prepared for incidents, recoverable from failures, and continuously improved without uncontrolled drift.",
  maturityDomains: [
    "adversarial-testing",
    "observability-and-alerting",
    "incident-response",
    "backup-and-disaster-recovery",
    "access-governance",
    "privacy-and-data-retention",
    "compliance-and-trust-readiness",
    "release-governance",
    "customer-communication-readiness",
    "operational-runbooks",
    "mobile-and-app-store-readiness",
    "internationalization-readiness",
  ],
  adversarialTestingRules: [
    "test prompt-injection, credential submissions, unsafe raw evidence, payment-data attempts, cross-customer access attempts, and admin key exposure attempts",
    "test public forms, protected APIs, support flows, notifications, reports, billing, and operator surfaces",
    "capture adversarial tests as repeatable validation, not one-time manual checks",
    "do not weaken validation to make adversarial tests pass",
  ],
  observabilityRules: [
    "define customer-safe operational signals before production launch",
    "monitor route failures, validation failures, support spikes, billing errors, report correction requests, and unusual submission patterns",
    "separate operational telemetry from customer secrets and raw payloads",
    "alerts must route to actionable runbooks instead of vague noise",
  ],
  incidentResponseRules: [
    "define severity levels for customer-impacting, data-protection, billing, support, report, and availability incidents",
    "define containment, investigation, customer-safe communication, remediation, and follow-up steps",
    "do not delete audit records during incident response",
    "customer communication must be factual, bounded, and approved before broad release",
  ],
  recoveryRules: [
    "critical data stores need backup and restore expectations before scale",
    "high-impact releases need rollback readiness",
    "recovery tests should be scheduled and recorded",
    "restore processes must preserve ownership boundaries and audit proof",
  ],
  accessGovernanceRules: [
    "review admin/operator access periodically",
    "use least privilege for support, billing, security, report, and operator roles",
    "separate read-only access from mutation access",
    "require reauthentication or stronger checks for sensitive operator actions",
    "remove stale access promptly",
  ],
  privacyAndRetentionRules: [
    "define retention expectations for support, billing, reports, notifications, emails, logs, and audit records",
    "retain proof needed for audit defense without keeping unnecessary sensitive data",
    "customer-facing deletion or correction flows must not falsely promise deletion of required audit records",
    "international expansion must account for localization, consent, retention, and lawful processing expectations",
  ],
  releaseGovernanceRules: [
    "release in small coherent batches",
    "require green validation and deployment checks",
    "document what changed, why it changed, and what rollback path exists",
    "block releases that weaken information protection, interface excellence, sync, or truthful analysis",
  ],
  trustReadinessRules: [
    "maintain clear security, privacy, support, billing, and report-methodology explanations",
    "prepare customer-safe trust center content before broad scaling",
    "avoid overclaiming certifications, guarantees, or security absolutes before they are actually obtained",
    "make support and correction paths visible and safe",
  ],
  qualityBar:
    "The next level is not a single visual polish pass. It is a system where design, engineering, operations, security, privacy, support, legal-safe communication, recovery, and continuous improvement all reinforce each other without drift.",
} as const;

export const INSTITUTIONAL_OPERATING_MATURITY_HARD_LOCKS = [
  "no launch without validation-backed release discipline",
  "no operational telemetry that stores customer secrets or raw sensitive payloads",
  "no incident response path that deletes required audit proof",
  "no high-impact release without rollback readiness",
  "no stale admin or operator access",
  "no compliance or certification claim before it is actually achieved",
  "no international expansion without localization, retention, consent, and lawful-processing review",
  "no adversarial test result ignored without an explicit safe decision",
] as const;

export const INSTITUTIONAL_OPERATING_MATURITY_BLOCKED_PATTERNS = [
  "ignoreAdversarialFinding",
  "telemetryStoresRawPayload",
  "incidentDeleteAuditRecords",
  "releaseWithoutRollback",
  "staleAdminAccessAllowed",
  "certifiedSOC2WithoutAudit",
  "gdprCompliantWithoutReview",
  "skipIncidentRunbook",
  "disableAlertingForNoise",
  "launchWithoutValidation",
] as const;
