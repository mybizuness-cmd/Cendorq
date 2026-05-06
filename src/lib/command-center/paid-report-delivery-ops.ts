import {
  PAID_PLAN_REPORT_DELIVERY_GUARDS,
  PAID_PLAN_REPORT_DELIVERY_OPERATING_SYSTEM,
} from "@/lib/paid-plan-report-delivery-operating-system";

export type PaidReportDeliveryOpsStage =
  | "report-production"
  | "attachment-generation"
  | "release-approval"
  | "email-delivery"
  | "resend-control"
  | "delivery-audit";

export type PaidReportDeliveryOpsControl = {
  stage: PaidReportDeliveryOpsStage;
  label: string;
  operatorQuestion: string;
  requiredVisibleState: string;
  blockedShortcut: string;
  auditEvent: string;
};

export const PAID_REPORT_DELIVERY_COMMAND_CENTER_CONTROLS = [
  {
    stage: "report-production",
    label: "Report production status",
    operatorQuestion: "Is the paid report created from the correct plan scope, evidence, and customer-safe version?",
    requiredVisibleState: "Show draft, blocked, approved, or delivered status without exposing raw evidence or customer secrets.",
    blockedShortcut: "Do not mark a report ready from draft text, internal notes, raw evidence, or unapproved AI output.",
    auditEvent: "paid_report_created",
  },
  {
    stage: "attachment-generation",
    label: "Attachment generation status",
    operatorQuestion: "Was the approved customer-safe PDF generated from the exact dashboard report version?",
    requiredVisibleState: "Show generated, failed, blocked, or pending attachment posture with filename pattern and content type only.",
    blockedShortcut: "Do not send a paid report email if PDF generation fails or the attachment version differs from dashboard copy.",
    auditEvent: "customer_safe_pdf_generated",
  },
  {
    stage: "release-approval",
    label: "Release approval gate",
    operatorQuestion: "Did the plan-specific release gate pass before dashboard copy and email delivery?",
    requiredVisibleState: "Show release gate name, gate status, approver role, and missing prerequisites as safe metadata only.",
    blockedShortcut: "Do not publish dashboard copy, send email, or expose attachments before release-captain approval.",
    auditEvent: "paid_report_approved",
  },
  {
    stage: "email-delivery",
    label: "Email delivery status",
    operatorQuestion: "Was the correct report-ready email queued and sent with the required PDF attachment?",
    requiredVisibleState: "Show queued, sent, failed, bounced, or suppressed delivery state without raw provider payloads.",
    blockedShortcut: "Do not treat a dashboard-only copy as paid report delivery if the required attachment email failed.",
    auditEvent: "report_delivery_email_sent_with_attachment",
  },
  {
    stage: "resend-control",
    label: "Resend controls",
    operatorQuestion: "Is resend safe, necessary, rate-limited, and tied to the same approved report version?",
    requiredVisibleState: "Show resend eligibility, last delivery posture, suppression reason, and rate-limit status as safe metadata.",
    blockedShortcut: "Do not resend unapproved reports, changed attachments, raw evidence, or customer-private payloads.",
    auditEvent: "report_delivery_resend_reviewed",
  },
  {
    stage: "delivery-audit",
    label: "Delivery audit visibility",
    operatorQuestion: "Can the operator prove the dashboard copy, attachment, email, and release gate all matched?",
    requiredVisibleState: "Show append-only audit event names, timestamps, version hashes, and safe delivery posture only.",
    blockedShortcut: "Do not expose raw evidence, provider payloads, email bodies with private data, secrets, or cross-customer records.",
    auditEvent: "delivery_audit_record_created",
  },
] as const satisfies readonly PaidReportDeliveryOpsControl[];

export const PAID_REPORT_DELIVERY_COMMAND_CENTER_RULES = [
  "Command center must show paid report production status, attachment generation status, release approval, email delivery status, resend eligibility, and delivery audit posture.",
  "Command center paid report ops stay metadata-only: no raw evidence, customer secrets, provider payloads, prompts, internal notes, payment data, or cross-customer records.",
  "Operators must see whether dashboard report copy and email PDF attachment came from the same approved report version.",
  "Resend controls require release gate pass, attachment version match, suppression review, and rate-limit posture before any resend.",
  "A paid report is not complete until dashboard copy is published, approved PDF is generated, report-ready email is sent with attachment, and delivery audit is recorded.",
] as const;

export function getPaidReportDeliveryCommandCenterOps() {
  return {
    controls: PAID_REPORT_DELIVERY_COMMAND_CENTER_CONTROLS,
    deliveryContracts: PAID_PLAN_REPORT_DELIVERY_OPERATING_SYSTEM,
    deliveryGuards: PAID_PLAN_REPORT_DELIVERY_GUARDS,
    rules: PAID_REPORT_DELIVERY_COMMAND_CENTER_RULES,
  };
}
