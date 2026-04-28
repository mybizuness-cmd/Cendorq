export type AuditDefenseControlArea =
  | "claim-substantiation"
  | "customer-consent"
  | "terms-alignment"
  | "report-release"
  | "evidence-retention"
  | "legal-review"
  | "correction-management"
  | "dispute-readiness";

export type AuditDefenseControl = {
  key: string;
  label: string;
  area: AuditDefenseControlArea;
  requirement: string;
  requiredRecord: readonly string[];
  blockedBehavior: readonly string[];
};

export type AuditDefenseReleaseGate = {
  key: string;
  label: string;
  appliesTo: "marketing" | "free-scan" | "paid-report" | "optimization" | "monthly-control" | "pricing" | "guarantee";
  releaseRequirement: string;
  blockedIfMissing: readonly string[];
};

export const AUDIT_DEFENSE_CONTROLS = [
  {
    key: "claim-substantiation-record",
    label: "Claim substantiation record",
    area: "claim-substantiation",
    requirement: "Every objective customer-facing claim, score, diagnosis, comparison, guarantee statement, plan recommendation, and marketing claim must be tied to evidence, calculation trace, methodology version, confidence label, or approved legal/brand language before release.",
    requiredRecord: ["claim text", "claim type", "source evidence IDs", "calculation or methodology version", "confidence label", "approver", "release timestamp"],
    blockedBehavior: ["unsupported marketing claim", "unsupported diagnosis", "untraceable score", "unapproved guarantee language", "claim without owner"],
  },
  {
    key: "customer-consent-and-scope-record",
    label: "Customer consent and scope record",
    area: "customer-consent",
    requirement: "For each customer report or optimization engagement, Cendorq must retain the accepted terms version, consent scope, submitted business information, authorized contact, plan purchased, report stage, and permitted data use boundaries.",
    requiredRecord: ["terms version", "privacy version", "accepted timestamp", "authorized contact", "plan scope", "data use scope", "customer-provided information snapshot"],
    blockedBehavior: ["missing consent record", "scope creep", "using customer data outside approved scope", "unclear authorized contact", "terms mismatch"],
  },
  {
    key: "terms-privacy-guarantee-alignment",
    label: "Terms, privacy, and guarantee alignment",
    area: "terms-alignment",
    requirement: "Report footer language, pricing pages, guarantee claims, refund terms, privacy policy, and customer terms must not contradict each other. Material changes require review before launch.",
    requiredRecord: ["terms version", "privacy version", "guarantee wording version", "pricing version", "legal review status", "change owner"],
    blockedBehavior: ["contradictory terms", "hidden guarantee limits", "unreviewed refund wording", "privacy promise mismatch", "outdated footer language"],
  },
  {
    key: "report-release-approval-record",
    label: "Report release approval record",
    area: "report-release",
    requirement: "Paid reports, optimization recommendations, monthly-control summaries, and sensitive free-scan outputs must pass customer-output approval before delivery, including evidence sufficiency, calculation trace, confidence labels, plan fit, brand footer, and blocked-claim checks.",
    requiredRecord: ["report ID", "plan stage", "evidence sufficiency status", "calculation trace status", "approval status", "blocked-claim scan", "approver", "delivered timestamp"],
    blockedBehavior: ["unapproved customer delivery", "missing blocked-claim scan", "missing confidence labels", "missing footer", "unsupported plan recommendation"],
  },
  {
    key: "audit-ready-evidence-retention",
    label: "Audit-ready evidence retention",
    area: "evidence-retention",
    requirement: "Cendorq must retain enough non-public audit metadata to defend what was reviewed, what was known, what method was used, what was delivered, what changed later, and what was corrected, while protecting secrets and customer privacy.",
    requiredRecord: ["evidence reference IDs", "capture timestamp", "source class", "methodology version", "report version", "delivery version", "retention class", "deletion policy"],
    blockedBehavior: ["destroying audit evidence prematurely", "retaining raw secrets unnecessarily", "no retention class", "no source timestamp", "untracked report changes"],
  },
  {
    key: "legal-review-trigger-record",
    label: "Legal review trigger record",
    area: "legal-review",
    requirement: "Legal review must be required before public launch or material changes to guarantee wording, refund terms, limitation language, pricing promises, regulated-category claims, jurisdiction-specific claims, or liability-related footer wording.",
    requiredRecord: ["trigger type", "affected copy or policy", "legal review status", "review owner", "approval date", "blocked launch flag"],
    blockedBehavior: ["claiming attorney approval before review", "launching legal-sensitive wording without review", "untracked legal edits", "jurisdiction claims without review"],
  },
  {
    key: "material-error-correction-record",
    label: "Material error correction record",
    area: "correction-management",
    requirement: "If a material report error is identified within the active review window, Cendorq must record the issue, investigate evidence, correct the report when appropriate, communicate the correction, and preserve the correction history.",
    requiredRecord: ["reported issue", "review window status", "evidence review result", "correction decision", "customer communication", "corrected version", "owner"],
    blockedBehavior: ["no correction path", "silent correction", "erasing prior version", "ignoring material error reports", "unclear owner"],
  },
  {
    key: "dispute-readiness-package",
    label: "Dispute readiness package",
    area: "dispute-readiness",
    requirement: "For disputed reports, charges, guarantees, or customer claims, Cendorq should be able to assemble a privacy-safe package showing consent, scope, evidence, calculations, approvals, delivery records, correction history, and applicable terms versions.",
    requiredRecord: ["customer scope", "terms/privacy versions", "report versions", "evidence references", "approval records", "delivery records", "correction records", "payment or plan records metadata"],
    blockedBehavior: ["no dispute evidence", "raw secret disclosure", "unapproved legal assertions", "missing delivery proof", "missing terms version"],
  },
] as const satisfies readonly AuditDefenseControl[];

export const AUDIT_DEFENSE_RELEASE_GATES = [
  {
    key: "marketing-claim-gate",
    label: "Marketing claim gate",
    appliesTo: "marketing",
    releaseRequirement: "Marketing pages and ads must prove objective claims before publishing and must not imply guaranteed business outcomes.",
    blockedIfMissing: ["claim substantiation record", "approved guarantee wording", "terms alignment", "legal review flag when required"],
  },
  {
    key: "free-scan-gate",
    label: "Free Scan gate",
    appliesTo: "free-scan",
    releaseRequirement: "Free Scan output must label uncertainty, avoid complete-diagnosis claims, and promote Full Diagnosis only from visible evidence and clear limitations.",
    blockedIfMissing: ["business identity confidence", "visible evidence references", "uncertainty label", "footer safeguards"],
  },
  {
    key: "paid-report-gate",
    label: "Paid report gate",
    appliesTo: "paid-report",
    releaseRequirement: "Paid reports must include evidence sufficiency, calculation traceability, plan fit logic, branding, visuals tied to evidence, footer safeguards, and approval record before delivery.",
    blockedIfMissing: ["calculation trace", "confidence labels", "report approval", "claim substantiation", "footer safeguards"],
  },
  {
    key: "guarantee-wording-gate",
    label: "Guarantee wording gate",
    appliesTo: "guarantee",
    releaseRequirement: "Guarantee wording may promise process quality, transparency, documented findings, and correction of material report errors within the review window, but must not promise rankings, traffic, leads, conversions, revenue, platform outcomes, perfect accuracy, or immunity from liability.",
    blockedIfMissing: ["approved wording version", "terms alignment", "legal review status", "blocked-outcome-guarantee scan"],
  },
] as const satisfies readonly AuditDefenseReleaseGate[];

export function getAuditDefenseSystem() {
  return {
    controls: AUDIT_DEFENSE_CONTROLS,
    releaseGates: AUDIT_DEFENSE_RELEASE_GATES,
  };
}
