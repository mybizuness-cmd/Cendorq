export const PRODUCTION_LAUNCH_FINAL_BLOCKER_CONTRACT = {
  id: "production-launch-final-blocker-contract",
  name: "Production Launch Final Blocker Contract",
  purpose:
    "Define final release blockers that must remain unresolved until owner configuration, production smoke, rollback evidence, audit evidence, and hard-lock clearance are complete.",
  blockerGroups: [
    {
      key: "owner-configuration",
      label: "Owner configuration",
      blocks: "public and paid launch",
      requiredEvidence: [
        "auth provider configuration approved by owner",
        "payment mapping approved by owner before paid checkout launch",
        "server-side protected configuration confirmed",
        "launch contact and support identity confirmed",
      ],
    },
    {
      key: "production-smoke-target",
      label: "Production smoke target",
      blocks: "public launch",
      requiredEvidence: [
        "production smoke target configured",
        "public conversion routes checked",
        "protected denial posture checked",
        "command center closed posture checked",
        "no production mutation required by default smoke",
      ],
    },
    {
      key: "rollback-evidence",
      label: "Rollback evidence",
      blocks: "public launch",
      requiredEvidence: [
        "auth rollback plan recorded",
        "billing rollback plan recorded",
        "report release rollback plan recorded",
        "support workflow rollback plan recorded",
        "public conversion rollback plan recorded",
      ],
    },
    {
      key: "audit-evidence",
      label: "Audit evidence",
      blocks: "public launch",
      requiredEvidence: [
        "auth audit path recorded",
        "billing audit path recorded",
        "report release audit path recorded",
        "support and operator audit path recorded",
        "maintenance audit path recorded",
      ],
    },
    {
      key: "hard-lock-clearance",
      label: "Hard-lock clearance",
      blocks: "any launch claim",
      requiredEvidence: [
        "no customer route leaks protected internals",
        "no pending report is final",
        "no paid access without entitlement and ownership",
        "no client-only billing authority",
        "no unsafe support collection request",
        "no fake urgency or guaranteed outcome claim",
        "no uncontrolled production mutation",
      ],
    },
  ],
  publicClaimRules: [
    "Do not state public launch readiness until every blocker group has complete evidence.",
    "Do not state paid launch readiness until owner payment configuration and entitlement verification are complete.",
    "Do not state report launch readiness until approved report release, ownership, and access checks are complete.",
    "Do not state security readiness as absolute safety; use defense-in-depth, risk reduction, auditability, and controlled access language.",
    "Do not state operations readiness unless command center, support, audit, rollback, and maintenance checks are complete.",
  ],
  operatorReleaseStates: [
    "blocked-by-owner-configuration",
    "blocked-by-production-smoke",
    "blocked-by-rollback-evidence",
    "blocked-by-audit-evidence",
    "blocked-by-hard-lock",
    "ready-for-owner-review",
    "ready-for-limited-launch-review",
    "ready-for-public-launch-review",
  ],
  requiredSafeProjectionFields: [
    "blockerKey",
    "label",
    "blocks",
    "requiredEvidence",
    "evidenceStatus",
    "safeNextAction",
    "publicClaimAllowed",
  ],
  blockedProjectionFields: [
    "rawSourceEvidence",
    "protectedProviderDetail",
    "operatorPrivateIdentity",
    "privateCustomerData",
    "internalRiskModel",
    "privilegedConfigValue",
    "privateCredentialMaterial",
    "privateAuditPayload",
  ],
  releaseRules: [
    "Final blocker checks are operator-only and never customer-facing.",
    "Final blocker checks may guide launch review but must not mutate production state.",
    "Final blocker checks must preserve audit proof and must not claim audit records are deleted when preservation is required.",
    "Final blocker checks must use no public launch claim until all blocker groups clear.",
  ],
} as const;

export const PRODUCTION_LAUNCH_FINAL_BLOCKER_BLOCKED_PATTERNS = [
  "publicLaunchClaimBeforeBlockersClear",
  "paidLaunchClaimBeforeOwnerPaymentConfig",
  "reportLaunchClaimBeforeReleaseApproval",
  "absoluteSecurityClaim",
  "auditDeletionClaim",
  "customerFacingFinalBlockerProjection",
  "productionMutationFromBlockerCheck",
  "rawSourceEvidenceProjection",
  "protectedProviderDetailProjection",
  "operatorPrivateIdentityProjection",
  "privateCustomerDataProjection",
  "internalRiskModelProjection",
  "privilegedConfigValueProjection",
  "privateCredentialMaterialProjection",
  "privateAuditPayloadProjection",
] as const;

export function getProductionLaunchFinalBlockerContract() {
  return PRODUCTION_LAUNCH_FINAL_BLOCKER_CONTRACT;
}
