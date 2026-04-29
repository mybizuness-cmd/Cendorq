export const ACCESS_GOVERNANCE_CONTRACT = {
  id: "access-governance-v1",
  name: "Access governance standard",
  purpose:
    "Keep Cendorq operator, admin, support, billing, report, security, deployment, and recovery access least-privilege, reviewable, revocable, auditable, and separated from customer-facing projections.",
  operatingStandard:
    "Access must be granted intentionally, used narrowly, reviewed periodically, and removed promptly. Sensitive actions need stronger checks, safe projections, audit proof, and clear read/write separation.",
  governedAccessClasses: [
    "customer-support-read",
    "customer-support-mutation",
    "billing-read",
    "billing-mutation",
    "report-review",
    "report-release-approval",
    "security-review",
    "operator-command-center-read",
    "operator-command-center-mutation",
    "deployment-and-release",
    "backup-and-restore",
    "incident-response",
    "system-configuration",
  ],
  leastPrivilegeRules: [
    "grant only the minimum role needed for the active workflow",
    "separate read-only review from guarded mutation",
    "avoid broad admin access when scoped support, billing, report, or security roles are enough",
    "do not allow customer-facing projections to inherit operator privileges",
    "operator views must show active section, role, gate, and projection posture where relevant",
  ],
  sensitiveActionRules: [
    "billing changes require explicit billing authority and audit record",
    "report release or correction approval requires review authority and safe claim posture",
    "support status mutation requires support authority, customer ownership projection, and safe communication posture",
    "backup restore requires recovery authority, incident context, ownership-boundary validation, and post-restore validation",
    "security-sensitive actions require stronger checks and may require fresh reauthentication",
  ],
  reviewAndRevocationRules: [
    "access reviews must be scheduled before scale and repeated periodically",
    "stale access must be removed promptly",
    "temporary or emergency access must expire or be explicitly renewed",
    "role changes must preserve audit proof",
    "access review should verify least privilege, stale accounts, emergency grants, and separation of duties",
  ],
  emergencyAccessRules: [
    "emergency access must be time-bounded, audited, and reviewed after use",
    "emergency access cannot bypass customer data minimization, safe projection, or audit preservation",
    "emergency access cannot be used to weaken validation or hide failures",
    "post-emergency review must record why it was needed and what was changed",
  ],
  auditRules: [
    "sensitive access decisions must leave audit proof",
    "audit proof must not expose raw customer secrets, private evidence, payment data, internal risk details, or unnecessary operator private data",
    "access denial and failed reauthorization events should be safe telemetry signals",
    "audit records must not be deleted to clean up mistakes or hide incident response activity",
  ],
  releaseRules: [
    "new admin, operator, support, billing, report, recovery, or security surfaces require access-governance validation",
    "new mutation paths must define required role, gate, audit record, safe projection, and failure behavior",
    "new read paths must define projection boundaries and customer-data minimization",
    "access governance changes must not weaken information protection, backup recovery, observability, or adversarial validation",
  ],
} as const;

export const ACCESS_GOVERNANCE_HARD_LOCKS = [
  "no broad admin access when scoped access is sufficient",
  "no mutation path without role, gate, audit, safe projection, and failure posture",
  "no read path that exposes raw sensitive customer or internal data",
  "no stale access left unreviewed before scale",
  "no emergency access without time bound, audit, and review",
  "no backup restore without recovery authority and ownership validation",
  "no customer-facing projection inheriting operator privileges",
] as const;

export const ACCESS_GOVERNANCE_BLOCKED_PATTERNS = [
  "allowBroadAdminByDefault",
  "mutationWithoutAudit",
  "mutationWithoutRoleGate",
  "readRawCustomerSecrets",
  "staleAccessAllowed",
  "emergencyAccessWithoutExpiry",
  "bypassReauthForSensitiveAction",
  "customerProjectionUsesOperatorPrivileges",
  "deleteAccessAuditRecords",
  "disableAccessValidation",
] as const;
