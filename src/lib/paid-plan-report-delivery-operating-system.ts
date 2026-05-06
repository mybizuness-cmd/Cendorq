import type { CendorqPaidPlanKey } from "@/lib/pricing-checkout-orchestration";

export type PaidPlanReportDeliveryKey =
  | "deep-review-report-delivery"
  | "build-fix-summary-delivery"
  | "ongoing-control-monthly-delivery";

export type PaidPlanReportDeliveryContract = {
  key: PaidPlanReportDeliveryKey;
  planKey: CendorqPaidPlanKey;
  customerReportName: string;
  dashboardPath: "/dashboard/reports";
  emailTemplateKey: "deep-review-delivered" | "build-fix-delivered" | "ongoing-control-monthly";
  customerEmailSubject: string;
  attachmentRequired: true;
  attachmentFileNamePattern: string;
  attachmentContentType: "application/pdf";
  dashboardCopyRequired: true;
  customerValue: string;
  releaseGate: string;
  requiredBeforeRelease: readonly string[];
  deliveryEvents: readonly string[];
  emailAttachmentRules: readonly string[];
  dashboardAccessRules: readonly string[];
  blockedDeliveryContent: readonly string[];
};

export const PAID_PLAN_REPORT_DELIVERY_OPERATING_SYSTEM = [
  {
    key: "deep-review-report-delivery",
    planKey: "deep-review",
    customerReportName: "Deep Review report",
    dashboardPath: "/dashboard/reports",
    emailTemplateKey: "deep-review-delivered",
    customerEmailSubject: "Your Cendorq Deep Review is ready",
    attachmentRequired: true,
    attachmentFileNamePattern: "cendorq-deep-review-{business}-{reportVersion}.pdf",
    attachmentContentType: "application/pdf",
    dashboardCopyRequired: true,
    customerValue: "The customer receives cause-level diagnosis in the dashboard and as an approved attached report file.",
    releaseGate: "deep-review-report-release",
    requiredBeforeRelease: [
      "active Deep Review entitlement",
      "customer ownership verified",
      "expanded intake complete or marked limited",
      "evidence conflict review complete",
      "confidence labels applied",
      "limitations visible",
      "Build Fix recommendation marked as fit or not fit",
      "release-captain approval recorded",
    ],
    deliveryEvents: [
      "paid_report_created",
      "paid_report_approved",
      "dashboard_report_copy_published",
      "customer_safe_pdf_generated",
      "report_delivery_email_queued",
      "report_delivery_email_sent_with_attachment",
      "delivery_audit_record_created",
    ],
    emailAttachmentRules: [
      "Email must attach the approved customer-safe PDF report.",
      "Email must also link to the dashboard copy at /dashboard/reports.",
      "Attachment name must identify Cendorq, plan, business slug, and report version.",
      "Email body must summarize value and limits without exposing raw evidence.",
    ],
    dashboardAccessRules: [
      "Dashboard report copy requires verified customer ownership and active or historical entitlement.",
      "Dashboard copy must show report type, version, confidence, limitations, and support/correction path.",
      "Expired payment access must preserve historical paid report visibility unless refund, dispute, fraud, or legal hold rules say otherwise.",
    ],
    blockedDeliveryContent: ["raw evidence", "private credentials", "internal notes", "cross-customer data", "guaranteed ROI", "unsupported implementation claim"],
  },
  {
    key: "build-fix-summary-delivery",
    planKey: "build-fix",
    customerReportName: "Build Fix delivery summary",
    dashboardPath: "/dashboard/reports",
    emailTemplateKey: "build-fix-delivered",
    customerEmailSubject: "Your Cendorq Build Fix summary is ready",
    attachmentRequired: true,
    attachmentFileNamePattern: "cendorq-build-fix-summary-{business}-{reportVersion}.pdf",
    attachmentContentType: "application/pdf",
    dashboardCopyRequired: true,
    customerValue: "The customer receives a scoped implementation summary in the dashboard and as an approved attached report file.",
    releaseGate: "build-fix-customer-output-approval",
    requiredBeforeRelease: [
      "active Build Fix entitlement",
      "customer ownership verified",
      "approved fix scope recorded",
      "before-change snapshot recorded",
      "customer-facing improvement summary approved",
      "remaining risks visible",
      "Ongoing Control fit marked as fit or not fit",
      "release-captain approval recorded",
    ],
    deliveryEvents: [
      "build_fix_summary_created",
      "build_fix_summary_approved",
      "dashboard_report_copy_published",
      "customer_safe_pdf_generated",
      "report_delivery_email_queued",
      "report_delivery_email_sent_with_attachment",
      "delivery_audit_record_created",
    ],
    emailAttachmentRules: [
      "Email must attach the approved customer-safe PDF delivery summary.",
      "Email must also link to the dashboard copy at /dashboard/reports.",
      "Attachment must explain completed work, remaining risks, and what stayed out of scope.",
      "Email body must not imply unlimited implementation or guaranteed performance.",
    ],
    dashboardAccessRules: [
      "Dashboard report copy requires verified customer ownership and Build Fix entitlement history.",
      "Dashboard copy must show scope, completed work, remaining risks, approval state, and support path.",
      "Dashboard copy must not make unapproved production changes look approved or complete.",
    ],
    blockedDeliveryContent: ["unlimited implementation claim", "full rebuild claim", "raw internal notes", "private credentials", "guaranteed outcome", "unsupported metric"],
  },
  {
    key: "ongoing-control-monthly-delivery",
    planKey: "ongoing-control",
    customerReportName: "Ongoing Control monthly summary",
    dashboardPath: "/dashboard/reports",
    emailTemplateKey: "ongoing-control-monthly",
    customerEmailSubject: "Your Cendorq monthly control update is ready",
    attachmentRequired: true,
    attachmentFileNamePattern: "cendorq-ongoing-control-{business}-{month}.pdf",
    attachmentContentType: "application/pdf",
    dashboardCopyRequired: true,
    customerValue: "The customer receives the monthly decision-support summary in the dashboard and as an approved attached report file.",
    releaseGate: "ongoing-control-monthly-review-gate",
    requiredBeforeRelease: [
      "active Ongoing Control subscription",
      "customer ownership verified",
      "monthly monitoring scope confirmed",
      "monthly review record complete",
      "trend changes labeled with confidence",
      "next-month priority approved",
      "Build Fix escalation marked as fit or not fit",
      "release-captain approval recorded",
    ],
    deliveryEvents: [
      "monthly_summary_created",
      "monthly_summary_approved",
      "dashboard_report_copy_published",
      "customer_safe_pdf_generated",
      "report_delivery_email_queued",
      "report_delivery_email_sent_with_attachment",
      "delivery_audit_record_created",
    ],
    emailAttachmentRules: [
      "Email must attach the approved customer-safe PDF monthly summary.",
      "Email must also link to the dashboard copy at /dashboard/reports.",
      "Attachment must show monthly priority, risks, changes, limits, and next decision support.",
      "Email body must not imply unlimited Build Fix, guaranteed ranking, or guaranteed AI placement.",
    ],
    dashboardAccessRules: [
      "Dashboard report copy requires verified customer ownership and active or historical Ongoing Control access.",
      "Dashboard copy must show month, monitoring scope, trend posture, limitations, and next priority.",
      "Dashboard copy must keep implementation escalation separate from monthly monitoring.",
    ],
    blockedDeliveryContent: ["unlimited Build Fix", "guaranteed ranking", "guaranteed AI placement", "ad management claim", "raw evidence", "hidden regression"],
  },
] as const satisfies readonly PaidPlanReportDeliveryContract[];

export const PAID_PLAN_REPORT_DELIVERY_GUARDS = [
  "Every paid plan report must have a dashboard copy at /dashboard/reports.",
  "Every paid plan report delivery email must include the approved customer-safe report PDF as an attachment.",
  "Dashboard copy and email attachment must be generated from the same approved report version.",
  "No paid report email can send before entitlement, customer ownership, report approval, attachment generation, and delivery audit gates pass.",
  "Free Scan is excluded from paid-report attachment requirements and remains a dashboard-only first signal unless a separate export is approved later.",
  "Paid report attachments must not contain raw evidence, credentials, private keys, payment data, prompts, internal notes, or cross-customer data.",
  "The email must include both the attachment and a dashboard link so customers can recover the report from the platform.",
] as const;

export function getPaidPlanReportDeliveryContract(planKey: CendorqPaidPlanKey) {
  return PAID_PLAN_REPORT_DELIVERY_OPERATING_SYSTEM.find((contract) => contract.planKey === planKey);
}

export function requirePaidPlanReportDeliveryContract(planKey: CendorqPaidPlanKey) {
  const contract = getPaidPlanReportDeliveryContract(planKey);
  if (!contract) throw new Error(`Missing paid report delivery contract for ${planKey}`);
  return contract;
}
