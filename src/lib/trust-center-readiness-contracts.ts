export const TRUST_CENTER_READINESS_CONTRACT = {
  id: "trust-center-readiness-v1",
  name: "Trust center readiness standard",
  purpose:
    "Prepare Cendorq for customer-safe trust-center communication that explains current controls, privacy posture, report methodology, support protections, billing clarity, incident readiness, and future compliance work without overclaiming.",
  operatingStandard:
    "Trust content must increase confidence through clarity and evidence, not exaggerated promises. It must separate what Cendorq currently does, what is planned, what is under review, and what is not yet certified or guaranteed.",
  trustSections: [
    "security-and-access-controls",
    "privacy-and-data-retention",
    "report-methodology-and-truthfulness",
    "support-and-correction-process",
    "billing-and-plan-clarity",
    "incident-response-and-communications",
    "backup-and-recovery-readiness",
    "continuous-improvement-and-release-governance",
    "compliance-and-certification-status",
    "international-readiness",
  ],
  currentControlRules: [
    "describe implemented controls in plain language",
    "tie controls to customer benefit without claiming absolute prevention",
    "separate validation-backed standards from live provider certifications",
    "explain that protected records use safe projections, ownership checks, and data minimization where applicable",
    "explain support, notification, report, and billing protections without exposing internal detection mechanics",
  ],
  methodologyRules: [
    "explain report outputs as facts, assumptions, inferences, recommendations, limitations, and next actions",
    "avoid unsupported ROI, legal, security-outcome, refund, report-change, or business-result promises",
    "explain correction and review paths clearly",
    "make report methodology understandable to non-technical business owners",
  ],
  complianceRules: [
    "do not claim SOC 2, ISO, HIPAA, GDPR, CCPA, PCI, or other formal compliance/certification status unless actually achieved, reviewed, or applicable",
    "planned compliance work must be labeled as planned, under review, or future readiness",
    "country-specific rights and retention copy must be reviewed before international scaling",
    "trust center copy must not imply legal advice",
  ],
  incidentAndSupportRules: [
    "incident readiness copy must be factual, bounded, and non-alarmist",
    "support correction paths must be visible and safe",
    "do not expose attacker details, raw payloads, internal notes, operator identities, or risk internals",
    "customers should know where to ask for support, correction review, billing help, and security concerns",
  ],
  releaseRules: [
    "new trust-center copy requires validation before merge",
    "trust copy must stay aligned with privacy, information protection, access governance, observability, recovery, and report methodology standards",
    "trust copy must not weaken conversion by creating fear, but must not hide material limitations",
    "changes to claims, certifications, privacy language, security language, billing language, or support promises require extra review posture",
  ],
} as const;

export const TRUST_CENTER_READINESS_HARD_LOCKS = [
  "no security absolute or impossible prevention claim",
  "no compliance or certification claim before it is achieved or reviewed",
  "no trust copy that hides material limitations",
  "no trust copy that exposes internal detection mechanics or private support data",
  "no report-methodology copy that mixes facts, assumptions, inferences, and recommendations without separation",
  "no support or billing promise beyond approved process",
  "no international rights or retention claim without review posture",
] as const;

export const TRUST_CENTER_READINESS_BLOCKED_PATTERNS = [
  "impossibleToHack",
  "zeroRiskSecurity",
  "soc2CertifiedWithoutAudit",
  "isoCertifiedWithoutAudit",
  "hipaaCompliantWithoutReview",
  "gdprCompliantWithoutReview",
  "pciCompliantWithoutReview",
  "guaranteedROI",
  "guaranteedRefund",
  "guaranteedLegalOutcome",
  "guaranteedSecurityOutcome",
  "internalDetectionDetailsCustomerVisible",
  "attackerDetailsCustomerVisible",
] as const;
