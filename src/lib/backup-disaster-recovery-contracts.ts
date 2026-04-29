export const BACKUP_DISASTER_RECOVERY_CONTRACT = {
  id: "backup-disaster-recovery-v1",
  name: "Backup and disaster recovery standard",
  purpose:
    "Make Cendorq recoverable from platform, deployment, storage, data, queue, report, billing, support, and operator-surface failures while preserving ownership boundaries, audit proof, and customer trust.",
  operatingStandard:
    "Recovery must be planned before scale. Critical records need backup expectations, restore paths, rollback posture, and validation evidence without copying raw sensitive customer content into unsafe locations.",
  protectedRecordClasses: [
    "customer-session-and-auth-reference-records",
    "free-scan-submission-summaries",
    "support-request-safe-records",
    "support-status-projection-records",
    "notification-records",
    "email-queue-records",
    "billing-and-plan-reference-records",
    "report-vault-and-report-output-records",
    "operator-action-audit-records",
    "release-and-validation-history",
    "incident-and-containment-records",
  ],
  recoveryObjectives: [
    "restore customer-owned views without cross-customer leakage",
    "restore audit proof without exposing unnecessary sensitive raw content",
    "restore support and notification continuity without resending suppressed or duplicate communications",
    "restore billing and entitlement references without guessing customer state on the client",
    "restore report vault continuity with safe projections and customer ownership checks",
    "restore operator history as bounded projection-only records",
  ],
  backupRules: [
    "backup scope must be explicit for each protected record class",
    "backups must not become a second raw-data store for sensitive submissions",
    "backup metadata should avoid raw payloads, credentials, payment data, customer secrets, internal notes, operator private details, and risk internals",
    "backup access must follow least privilege and be separated from normal operator browsing",
    "backup retention must align with privacy, audit-defense, billing, report, and legal-safe retention rules",
  ],
  restoreRules: [
    "restore requires an identified incident, approved recovery path, and validation after restore",
    "restore must preserve customer ownership boundaries and safe projection rules",
    "restore must not overwrite newer safe records without an explicit conflict decision",
    "restore must not re-trigger lifecycle emails, notifications, billing actions, or support messages without idempotency checks",
    "restore must record what was restored, what was skipped, what remains uncertain, and which validations passed",
  ],
  rollbackRules: [
    "high-impact releases require a rollback path before promotion",
    "rollback should prefer exact failing-layer reversal over broad data mutation",
    "rollback must not delete required audit records",
    "rollback communications must be factual, bounded, and customer-safe when customer impact exists",
  ],
  restoreTestRules: [
    "restore tests should be scheduled before broad scaling",
    "restore tests must use sanitized fixtures or safe references, not real raw customer secrets",
    "restore tests must verify ownership boundaries, safe projection, idempotency, audit preservation, and communication suppression",
    "failed restore tests must create follow-up validation or implementation work",
  ],
  continuityRules: [
    "dashboard, support status, notifications, billing, reports, and operator views need clear recovery states",
    "partial recovery states must be visible to operators and safe for customers",
    "customer-facing copy must not claim data is permanently safe or impossible to lose",
    "recovery posture must integrate with observability, incident response, information protection, and release governance",
  ],
} as const;

export const BACKUP_DISASTER_RECOVERY_HARD_LOCKS = [
  "no backup path that stores unnecessary raw sensitive content",
  "no restore without ownership-boundary validation",
  "no restore that re-sends suppressed lifecycle communication without idempotency checks",
  "no rollback that deletes required audit proof",
  "no high-impact release without rollback readiness",
  "no recovery test using real raw customer secrets",
  "no customer-facing claim of impossible data loss or perfect recovery",
] as const;

export const BACKUP_DISASTER_RECOVERY_BLOCKED_PATTERNS = [
  "backupRawCustomerSecrets",
  "restoreWithoutOwnershipCheck",
  "resendAllNotificationsAfterRestore",
  "deleteAuditRecordsDuringRollback",
  "releaseWithoutRollbackPlan",
  "restoreTestUsesRealSecrets",
  "impossibleDataLoss",
  "perfectRecoveryGuarantee",
  "overwriteNewerSafeRecordsWithoutDecision",
] as const;
