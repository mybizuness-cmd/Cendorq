export const PRIVACY_DATA_RETENTION_CONTRACT = {
  id: "privacy-data-retention-v1",
  name: "Privacy and data retention standard",
  purpose:
    "Keep Cendorq privacy posture truthful, minimized, retention-aware, correction-ready, audit-preserving, and prepared for international expansion without making false deletion, compliance, or security claims.",
  operatingStandard:
    "Customer and company data must have a clear purpose, a bounded retention posture, a safe projection path, and truthful customer-facing language. Retention must preserve required audit proof without keeping unnecessary sensitive raw content.",
  governedRecordClasses: [
    "public-contact-and-free-scan-intake",
    "customer-auth-and-session-references",
    "customer-dashboard-state",
    "support-request-safe-records",
    "support-status-projections",
    "notification-and-email-queue-records",
    "billing-and-plan-reference-records",
    "report-vault-and-output-records",
    "operator-action-audit-records",
    "incident-and-recovery-records",
    "telemetry-and-validation-records",
  ],
  dataPurposeRules: [
    "each governed record class needs a stated product, support, billing, report, security, audit, or operational purpose",
    "do not collect data simply because it might be useful someday",
    "social, creator, marketplace, and platform-channel data must be tied to business analysis purpose before collection",
    "analytics and telemetry must be aggregated, hashed, omitted, or safely referenced where possible",
  ],
  retentionRules: [
    "retention expectations must distinguish active customer records, support history, billing references, reports, notifications, telemetry, and audit records",
    "retain audit proof needed for safety, billing, support, dispute, release, and incident defense without retaining unnecessary raw sensitive content",
    "expired or unnecessary sensitive content should be minimized, summarized, redacted, or removed according to the relevant record posture",
    "backups and restores must respect retention posture and must not become hidden long-term raw-data stores",
  ],
  deletionAndCorrectionRules: [
    "customer-facing deletion and correction copy must be truthful and bounded",
    "do not promise deletion of required audit, billing, security, legal, or incident records when those records must be preserved",
    "correction workflows must distinguish customer-visible corrections from retained audit proof",
    "deletion or correction requests must never expose cross-customer data or internal operator notes",
    "customer copy should explain when a record is minimized, corrected, suppressed, retained for audit, or not customer-visible",
  ],
  internationalReadinessRules: [
    "international expansion requires localization, consent, retention, lawful processing, support language, billing language, and customer rights review",
    "do not claim GDPR, CCPA, SOC 2, ISO, HIPAA, or other compliance/certification status before it is actually achieved or reviewed",
    "country-specific copy must be localized for meaning, not just translated",
    "cross-border processing, data residency, vendor posture, and customer rights handling must be reviewed before scaling internationally",
  ],
  customerTrustRules: [
    "privacy explanations must be plain-language, calm, accurate, and not overbroad",
    "trust-center copy must separate current controls from future or planned certifications",
    "support and report flows must not ask customers to submit passwords, card data, private keys, or unnecessary raw evidence",
    "privacy copy must not weaken conversion through fear, but must not hide meaningful limitations",
  ],
  releaseRules: [
    "new record classes require a purpose, retention, projection, deletion/correction, and audit posture",
    "new public, customer, operator, billing, report, support, or telemetry flows require privacy/data-retention validation",
    "privacy-related copy must not make absolute deletion, security, or compliance claims",
    "retention changes must preserve required audit proof and customer-safe transparency",
  ],
} as const;

export const PRIVACY_DATA_RETENTION_HARD_LOCKS = [
  "no record class without purpose and retention posture",
  "no false deletion promise for required audit, billing, security, legal, or incident records",
  "no hidden raw-data retention through backups, logs, telemetry, or queues",
  "no compliance or certification claim before it is actually achieved or reviewed",
  "no international expansion without localization, consent, retention, lawful-processing, and customer-rights review",
  "no support or report flow that asks for passwords, card data, private keys, or unnecessary raw evidence",
  "no deletion or correction workflow that exposes cross-customer data or operator internals",
] as const;

export const PRIVACY_DATA_RETENTION_BLOCKED_PATTERNS = [
  "deleteEverythingForever",
  "permanentDeletionGuaranteed",
  "gdprCompliantWithoutReview",
  "ccpaCompliantWithoutReview",
  "soc2CertifiedWithoutAudit",
  "hipaaCompliantWithoutReview",
  "retainRawPayloadIndefinitely",
  "backupStoresRawSecretsForever",
  "askForPasswordInSupport",
  "askForCardDataInSupport",
  "exposeDeletionAuditInternals",
  "crossCustomerCorrectionLeak",
] as const;
