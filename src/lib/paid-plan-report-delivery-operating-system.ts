import { AI_VISIBILITY_MARKET_COMMAND_STANDARD } from "@/lib/ai-visibility-market-command-standard";
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
  aiVisibilityValue: string;
  reportStructure: readonly string[];
  releaseGate: string;
  requiredBeforeRelease: readonly string[];
  deliveryEvents: readonly string[];
  emailAttachmentRules: readonly string[];
  dashboardAccessRules: readonly string[];
  blockedDeliveryContent: readonly string[];
};

export const PAID_REPORT_COMMAND_STRUCTURE = ["Signal", "Proof", "Risk", "Limit", "Next command"] as const;

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
    aiVisibilityValue: "Deep Review must explain how visible evidence, customer trust, proof, business structure, and AI/search readability affect whether the market understands and chooses the business.",
    reportStructure: PAID_REPORT_COMMAND_STRUCTURE,
    releaseGate: "deep-review-report-release",
    requiredBeforeRelease: [
      "active Deep Review entitlement",
      "customer ownership verified",
      "expanded intake complete or marked limited",
      "evidence conflict review complete",
      "AI/search visibility posture labeled",
      "confidence labels applied",
      "limitations visible",
      "Build Fix recommendation marked as fit or not fit",
      "release-captain approval recorded",
    ],
    deliveryEvents: [
      "paid_report_created",
      "ai_visibility_posture_labeled",
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
      "Email body must summarize signal, proof, risk, limit, and next command without exposing raw evidence.",
      "Email body must not imply guaranteed ranking, guaranteed AI placement, guaranteed leads, or guaranteed revenue.",
    ],
    dashboardAccessRules: [
      "Dashboard report copy requires verified customer ownership and active or historical entitlement.",
      "Dashboard copy must show report type, version, confidence, limitations, AI/search visibility posture, and support/correction path.",
      "Expired payment access must preserve historical paid report visibility unless refund, dispute, fraud, or legal hold rules say otherwise.",
    ],
    blockedDeliveryContent: ["raw evidence", "private credentials", "internal notes", "cross-customer data", "guaranteed ROI", "guaranteed ranking", "guaranteed AI placement", "unsupported implementation claim"],
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
    aiVisibilityValue: "Build Fix must show how the approved improvement strengthens customer understanding, proof, trust, action, or AI/search readability without claiming guaranteed placement.",
    reportStructure: PAID_REPORT_COMMAND_STRUCTURE,
    releaseGate: "build-fix-customer-output-approval",
    requiredBeforeRelease: [
      "active Build Fix entitlement",
      "customer ownership verified",
      "approved fix scope recorded",
      "before-change snapshot recorded",
      "customer-facing improvement summary approved",
      "AI/search visibility effect marked as strengthened, unchanged, or not in scope",
      "remaining risks visible",
      "Ongoing Control fit marked as fit or not fit",
      "release-captain approval recorded",
    ],
    deliveryEvents: [
      "build_fix_summary_created",
      "ai_visibility_effect_labeled",
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
      "Attachment must explain completed work, remaining risks, AI/search visibility effect, and what stayed out of scope.",
      "Email body must not imply unlimited implementation, guaranteed performance, guaranteed ranking, or guaranteed AI placement.",
    ],
    dashboardAccessRules: [
      "Dashboard report copy requires verified customer ownership and Build Fix entitlement history.",
      "Dashboard copy must show scope, completed work, remaining risks, AI/search visibility effect, approval state, and support path.",
      "Dashboard copy must not make unapproved production changes look approved or complete.",
    ],
    blockedDeliveryContent: ["unlimited implementation claim", "full rebuild claim", "raw internal notes", "private credentials", "guaranteed outcome", "guaranteed ranking", "guaranteed AI placement", "unsupported metric"],
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
    aiVisibilityValue: "Ongoing Control must explain what changed in visibility, trust, proof, AI/search posture, competitor pressure, and next monthly priority without pretending to control algorithms.",
    reportStructure: PAID_REPORT_COMMAND_STRUCTURE,
    releaseGate: "ongoing-control-monthly-review-gate",
    requiredBeforeRelease: [
      "active Ongoing Control subscription",
      "customer ownership verified",
      "monthly monitoring scope confirmed",
      "monthly review record complete",
      "AI/search posture change labeled",
      "trend changes labeled with confidence",
      "next-month priority approved",
      "Build Fix escalation marked as fit or not fit",
      "release-captain approval recorded",
    ],
    deliveryEvents: [
      "monthly_summary_created",
      "ai_search_posture_change_labeled",
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
      "Attachment must show monthly priority, AI/search posture, risks, changes, limits, and next decision support.",
      "Email body must not imply unlimited Build Fix, guaranteed ranking, guaranteed AI placement, ad management, or algorithm control.",
    ],
    dashboardAccessRules: [
      "Dashboard report copy requires verified customer ownership and active or historical Ongoing Control access.",
      "Dashboard copy must show month, monitoring scope, AI/search posture, trend posture, limitations, and next priority.",
      "Dashboard copy must keep implementation escalation separate from monthly monitoring.",
    ],
    blockedDeliveryContent: ["unlimited Build Fix", "guaranteed ranking", "guaranteed AI placement", "algorithm control claim", "ad management claim", "raw evidence", "hidden regression"],
  },
] as const satisfies readonly PaidPlanReportDeliveryContract[];

export const PAID_PLAN_REPORT_DELIVERY_GUARDS = [
  "Every paid plan report must have a dashboard copy at /dashboard/reports.",
  "Every paid plan report delivery email must include the approved customer-safe report PDF as an attachment.",
  "Every paid report must use the customer-safe structure: Signal, Proof, Risk, Limit, Next command.",
  `Every paid report must follow the AI visibility boundary: ${AI_VISIBILITY_MARKET_COMMAND_STANDARD.customerTruth}`,
  "Dashboard copy and email attachment must be generated from the same approved report version.",
  "No paid report email can send before entitlement, customer ownership, report approval, attachment generation, and delivery audit gates pass.",
  "Free Scan is excluded from paid-report attachment requirements and remains a dashboard-only first signal unless a separate export is approved later.",
  "Paid report attachments must not contain raw evidence, credentials, private keys, payment data, prompts, internal notes, or cross-customer data.",
  "Paid reports must not claim guaranteed ranking, guaranteed AI placement, guaranteed leads, guaranteed revenue, or algorithm control.",
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
