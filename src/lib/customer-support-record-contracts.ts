export type CustomerSupportRequestType =
  | "report-question"
  | "correction-request"
  | "billing-help"
  | "security-concern"
  | "plan-guidance"
  | "general-support";

export type CustomerSupportStatus = "open" | "reviewing" | "waiting-on-customer" | "resolved" | "closed" | "escalated";
export type CustomerSupportPriority = "low" | "normal" | "high" | "urgent";
export type CustomerSupportEscalationType = "report-review" | "billing-review" | "security-review" | "legal-sensitive-review" | "operator-review";

export type CustomerSupportRequestRecordContract = {
  recordType: "customer-support-request";
  supportRequestId: string;
  customerId: string;
  businessId?: string;
  requestType: CustomerSupportRequestType;
  status: CustomerSupportStatus;
  priority: CustomerSupportPriority;
  safeCustomerSummary: string;
  sourceRoute: "/dashboard/support" | "/dashboard" | "/dashboard/reports" | "/dashboard/billing" | "/dashboard/notifications";
  createdAt: string;
  updatedAt: string;
  customerOwnershipRequired: true;
  rawSecretsAccepted: false;
  rawPaymentDataAccepted: false;
  rawEvidenceStored: false;
  supportPathVisible: true;
};

export type CustomerCorrectionReviewRecordContract = {
  recordType: "customer-correction-review";
  correctionReviewId: string;
  supportRequestId: string;
  customerId: string;
  businessId: string;
  reportId?: string;
  reportVersion?: string;
  correctionArea: "business-identity" | "evidence" | "calculation" | "claim" | "visual" | "recommendation" | "other";
  safeCorrectionSummary: string;
  status: "requested" | "under-review" | "approved" | "rejected" | "customer-notified";
  reviewRequiredBeforeCustomerChange: true;
  releaseApprovalRequired: true;
  originalReportPreserved: true;
  correctionAuditRequired: true;
  createdAt: string;
  resolvedAt?: string;
};

export type CustomerBillingSupportRecordContract = {
  recordType: "customer-billing-support";
  billingSupportId: string;
  supportRequestId: string;
  customerId: string;
  entitlementId?: string;
  planKey?: "free-scan" | "deep-review" | "build-fix" | "ongoing-control";
  billingIssueType: "invoice" | "failed-payment" | "plan-status" | "upgrade" | "cancellation-support" | "refund-review" | "other";
  safeBillingSummary: string;
  entitlementCheckRequired: true;
  billingStateCheckRequired: true;
  noRawPaymentData: true;
  refundPromiseApprovalRequired: true;
  cancellationHelpVisible: true;
  status: "open" | "reviewing" | "resolved" | "escalated";
  createdAt: string;
  resolvedAt?: string;
};

export type CustomerSecurityReviewRecordContract = {
  recordType: "customer-security-review";
  securityReviewId: string;
  supportRequestId: string;
  customerId: string;
  sessionId?: string;
  deviceId?: string;
  concernType: "suspicious-login" | "new-device" | "email-access" | "billing-access" | "report-access" | "other";
  riskLevel: "low" | "medium" | "high" | "critical";
  safeSecuritySummary: string;
  reauthRequired: boolean;
  sessionRotationRequired: boolean;
  tokenRevocationRequired: boolean;
  lockoutRequired: boolean;
  noAttackerDetailsToCustomer: true;
  noRiskScoringInternalsToCustomer: true;
  operatorReviewRequired: true;
  createdAt: string;
  resolvedAt?: string;
};

export type CustomerSupportEscalationRecordContract = {
  recordType: "customer-support-escalation";
  escalationId: string;
  supportRequestId: string;
  customerId: string;
  escalationType: CustomerSupportEscalationType;
  reason: string;
  assignedQueue: "report" | "billing" | "security" | "legal-sensitive" | "operator";
  status: "queued" | "in-review" | "resolved" | "blocked";
  customerSafeStatus: string;
  internalNotesPrivate: true;
  customerNotificationAllowed: boolean;
  createdAt: string;
  resolvedAt?: string;
};

export type CustomerSupportAuditRecordContract = {
  recordType: "customer-support-audit";
  supportAuditId: string;
  supportRequestId: string;
  customerId: string;
  eventType: "created" | "updated" | "customer-notified" | "escalated" | "resolved" | "closed";
  safeMetadataOnly: true;
  rawPayloadStored: false;
  operatorIdHash?: string;
  occurredAt: string;
};

export const CUSTOMER_SUPPORT_RECORD_CONTRACTS = [
  "customer-support-request",
  "customer-correction-review",
  "customer-billing-support",
  "customer-security-review",
  "customer-support-escalation",
  "customer-support-audit",
] as const;

export const CUSTOMER_SUPPORT_RECORD_GUARDS = [
  "no support request without customer ownership",
  "no raw secrets, passwords, payment data, raw evidence, or private report internals in support records",
  "no correction change without review, release approval, original report preservation, and audit record",
  "no billing support action without entitlement and billing-state checks",
  "no refund, legal, billing, report-change, or outcome promise without approval",
  "no security response reveals attacker details, risk-scoring internals, secrets, or raw security payloads",
  "no escalation without customer-safe status and private internal notes boundary",
  "no support audit event stores raw payloads",
] as const;

export function getCustomerSupportRecordContracts() {
  return {
    contracts: CUSTOMER_SUPPORT_RECORD_CONTRACTS,
    guards: CUSTOMER_SUPPORT_RECORD_GUARDS,
  };
}
