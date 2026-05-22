export type PresenceReportEvidenceKind = "submitted-business-context" | "visible-public-signal" | "comparison-signal" | "customer-proof-signal" | "operator-note";

export type PresenceReportEvidenceReviewState = "captured" | "normalized" | "review-required" | "approved-for-customer-report" | "blocked-from-customer-report";

export type PresenceReportEvidenceSensitivity = "customer-safe" | "restricted" | "internal-only";

export type PresenceReportEvidenceRecordContract = {
  readonly kind: PresenceReportEvidenceKind;
  readonly label: string;
  readonly reviewState: PresenceReportEvidenceReviewState;
  readonly sensitivity: PresenceReportEvidenceSensitivity;
  readonly customerSafeUse: string;
  readonly requiredBeforeCustomerUse: readonly string[];
  readonly mayFeed: readonly string[];
  readonly mustNotExpose: readonly string[];
};

export const PRESENCE_REPORT_EVIDENCE_RECORD_CONTRACTS: readonly PresenceReportEvidenceRecordContract[] = [
  {
    kind: "submitted-business-context",
    label: "Submitted business context",
    reviewState: "captured",
    sensitivity: "restricted",
    customerSafeUse: "Use submitted business details to build first-signal Free Scan context after ownership and access checks pass.",
    requiredBeforeCustomerUse: ["verified customer email", "same-account access gate", "server-side scan ownership"],
    mayFeed: ["Free Scan snapshot", "Presence Report package", "Business Truth Profile draft"],
    mustNotExpose: ["raw intake payload", "account existence internals", "private notes"],
  },
  {
    kind: "visible-public-signal",
    label: "Visible public signal",
    reviewState: "normalized",
    sensitivity: "customer-safe",
    customerSafeUse: "Use normalized public-facing observations to support report findings, confidence labels, and limitations.",
    requiredBeforeCustomerUse: ["source label", "observation summary", "confidence label", "evidence boundary"],
    mayFeed: ["Findability", "Understanding", "Trust", "Action", "Repair Queue"],
    mustNotExpose: ["crawler internals", "raw scrape body", "private scoring internals"],
  },
  {
    kind: "comparison-signal",
    label: "Comparison signal",
    reviewState: "review-required",
    sensitivity: "restricted",
    customerSafeUse: "Use reviewed comparison signals to explain Choice Gap without making unsupported competitor claims.",
    requiredBeforeCustomerUse: ["competitor label", "comparison basis", "operator review", "customer-safe phrasing"],
    mayFeed: ["Choice Gap", "Competitive Exposure", "Repair Queue"],
    mustNotExpose: ["unsupported competitor accusation", "raw competitive scrape", "private scoring internals"],
  },
  {
    kind: "customer-proof-signal",
    label: "Customer proof signal",
    reviewState: "review-required",
    sensitivity: "restricted",
    customerSafeUse: "Use approved proof signals to support trust, authority, and choice findings after claims are checked.",
    requiredBeforeCustomerUse: ["proof type", "claim boundary", "operator approval", "evidence boundary"],
    mayFeed: ["Trust", "Choice", "Business Truth Profile", "Repair Queue"],
    mustNotExpose: ["unverified claim", "private customer document", "unsupported guarantee"],
  },
  {
    kind: "operator-note",
    label: "Operator note",
    reviewState: "blocked-from-customer-report",
    sensitivity: "internal-only",
    customerSafeUse: "Use internal notes only to guide operator workflow; never render them directly in customer-facing reports.",
    requiredBeforeCustomerUse: ["converted to approved finding", "release gate", "customer-safe rewrite"],
    mayFeed: ["Finding Builder", "Repair Composer", "Approval Gate"],
    mustNotExpose: ["operator notes", "internal triage", "private scoring internals"],
  },
] as const;

export function getPresenceReportEvidenceRecordContracts() {
  return PRESENCE_REPORT_EVIDENCE_RECORD_CONTRACTS;
}

export function getPresenceReportEvidenceRecordContract(kind: PresenceReportEvidenceKind) {
  return PRESENCE_REPORT_EVIDENCE_RECORD_CONTRACTS.find((contract) => contract.kind === kind) ?? PRESENCE_REPORT_EVIDENCE_RECORD_CONTRACTS[0];
}
