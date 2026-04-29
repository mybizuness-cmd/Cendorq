export const OBSERVABILITY_INCIDENT_RESPONSE_CONTRACT = {
  id: "observability-incident-response-v1",
  name: "Observability and incident response standard",
  purpose:
    "Make Cendorq observable, actionable, and containment-ready without leaking customer, company, support, billing, report, operator, or platform secrets into telemetry or incident workflows.",
  operatingStandard:
    "Operational signals must help Cendorq detect, understand, contain, and recover from failures quickly while preserving customer trust, audit proof, and data minimization.",
  safeSignalCategories: [
    "route-health",
    "validation-failure",
    "deployment-check",
    "support-volume-anomaly",
    "billing-error-anomaly",
    "report-correction-anomaly",
    "notification-delivery-anomaly",
    "customer-session-auth-anomaly",
    "operator-action-anomaly",
    "adversarial-submission-anomaly",
    "performance-regression",
    "access-denial-spike",
  ],
  telemetryRules: [
    "telemetry may include route key, status class, safe error code, timestamp, environment, and bounded count",
    "telemetry must not include raw payloads, raw evidence, payment data, credentials, secrets, customer messages, internal notes, operator identities, session tokens, CSRF tokens, or admin keys",
    "customer identifiers in telemetry should be hashed, aggregated, omitted, or replaced with safe references where possible",
    "telemetry must distinguish public, customer, operator, support, billing, report, and notification surfaces without exposing private content",
    "alerts must link to runbooks or next actions rather than vague noise",
  ],
  severityLevels: [
    { level: "SEV-1", meaning: "Confirmed or likely protected-data exposure, broad outage, payment integrity issue, or cross-customer access risk", requiredResponse: "contain immediately, preserve audit proof, restrict risky paths, prepare approved customer-safe communication" },
    { level: "SEV-2", meaning: "Major customer workflow failure, dashboard/support/report/billing degradation, or repeated protected API failure", requiredResponse: "triage quickly, identify affected surfaces, patch or rollback, monitor after fix" },
    { level: "SEV-3", meaning: "Localized feature defect, degraded UX, validator drift, or isolated operational anomaly", requiredResponse: "patch in coherent batch with validation and release notes" },
    { level: "SEV-4", meaning: "Low-impact improvement, noisy signal, or maintenance issue", requiredResponse: "prioritize through continuous improvement without weakening gates" },
  ],
  containmentRules: [
    "preserve audit records and deployment history",
    "pause or hold affected communications when safe projection, ownership, or channel guards are uncertain",
    "restrict risky operator actions if access, projection, or audit posture is uncertain",
    "roll back or patch exact failing layer without weakening validation",
    "rotate or revoke affected secrets if exposure is suspected",
    "document what was affected, what was not affected, what changed, and what remains uncertain",
  ],
  customerCommunicationRules: [
    "customer-facing incident copy must be factual, bounded, calm, and approved",
    "do not speculate, exaggerate, hide known impact, or claim impossible safety",
    "do not expose attacker details, raw payloads, internal notes, operator identities, risk internals, or detection mechanics",
    "explain what customers can do next only when the action is safe and useful",
    "preserve trust by stating limitations clearly when investigation is ongoing",
  ],
  runbookRequirements: [
    "each alert category must have a responsible surface and first triage action",
    "each severity level must define containment, remediation, validation, communication, and follow-up expectations",
    "incident response must never delete required audit proof",
    "post-incident follow-up must add or improve validation for the failed class",
  ],
  releaseRules: [
    "observability and incident response changes must be validated before merge",
    "new protected workflows must define safe signals or explicitly justify why no telemetry is collected",
    "alerts and telemetry must not become a backdoor for sensitive data storage",
    "incident response wording must not claim zero risk, impossible breach, or absolute prevention",
  ],
} as const;

export const OBSERVABILITY_INCIDENT_RESPONSE_HARD_LOCKS = [
  "no raw payloads or secrets in telemetry",
  "no alert without a runbook or next action",
  "no incident response that deletes audit proof",
  "no customer communication that speculates beyond verified impact",
  "no severity system without containment and follow-up expectations",
  "no protected workflow without safe signal posture",
  "no release that weakens validation to restore service faster",
] as const;

export const OBSERVABILITY_INCIDENT_RESPONSE_BLOCKED_PATTERNS = [
  "telemetryStoresRawPayload",
  "telemetryStoresPaymentData",
  "telemetryStoresSessionToken",
  "alertWithoutRunbook",
  "incidentDeletesAuditProof",
  "customerIncidentSpeculation",
  "claimZeroRiskInIncident",
  "disableValidationToRestoreService",
  "logOperatorPrivateNotes",
  "logCustomerSecret",
] as const;
