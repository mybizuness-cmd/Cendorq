import {
  CENDORQ_PLAN_PERSONALIZATION_FIELDS,
  getCendorqRevenueStage,
} from "@/lib/cendorq-revenue-operating-system";
import { projectPlanIntelligenceIntakeRecord, type PlanIntelligenceIntakeRecord } from "@/lib/plan-intelligence-intake-records";
import {
  CENDORQ_POST_PAYMENT_EMAILS,
  getPaidCendorqPlanPrice,
  type CendorqPaidPlanKey,
} from "@/lib/pricing-checkout-orchestration";
import { requirePaidPlanReportDeliveryContract } from "@/lib/paid-plan-report-delivery-operating-system";

export type CustomerRevenueActivationInput = {
  planKey: CendorqPaidPlanKey;
  checkoutSessionId?: string;
  stripeCustomerId?: string;
  stripePriceId?: string;
  stripePaymentStatus?: "paid" | "open" | "unpaid" | "unknown";
  customerId?: string;
  customerEmail?: string;
  businessId?: string;
  scanId?: string;
  reportId?: string;
  sourcePage?: string;
  recommendedFrom?: string;
  marketingConsent?: "accepted" | "declined" | "unknown";
  capturedIntakeFields?: readonly string[];
  blockedIntakeFields?: readonly string[];
};

export type CustomerRevenueActivationProjection = {
  plan: {
    key: CendorqPaidPlanKey;
    name: string;
    price: string;
    amountCents: number;
    billingMode: "payment" | "subscription";
  };
  customerExperience: {
    headline: string;
    feeling: string;
    nextBestAction: string;
    requiredContext: readonly string[];
    dashboardDestination: string;
  };
  backendHandoff: {
    entitlementKey: string;
    workflowKey: string;
    queueName: string;
    dashboardNotification: string;
    billingRecord: string;
    supportRecoveryPath: string;
    auditEvents: readonly string[];
  };
  planIntelligenceIntake: PlanIntelligenceIntakeRecord;
  paidReportDelivery: {
    dashboardPath: "/dashboard/reports";
    customerReportName: string;
    emailTemplateKey: string;
    attachmentRequired: true;
    attachmentFileNamePattern: string;
    attachmentContentType: "application/pdf";
    releaseGate: string;
    requiredBeforeRelease: readonly string[];
    deliveryEvents: readonly string[];
  };
  emailHandoff: {
    subject: string;
    dashboardPath: string;
    customerGoal: string;
    transactional: true;
    marketingConsentRequired: false;
    reportAttachmentRequired: true;
    reportAttachmentFileNamePattern: string;
    reportAttachmentContentType: "application/pdf";
  };
  metadata: Record<string, string>;
};

const DASHBOARD_DESTINATION_BY_PLAN: Record<CendorqPaidPlanKey, string> = {
  "deep-review": "/dashboard/reports",
  "build-fix": "/dashboard/support/request",
  "ongoing-control": "/dashboard/billing",
};

const QUEUE_BY_PLAN: Record<CendorqPaidPlanKey, string> = {
  "deep-review": "deep-review-diagnosis-queue",
  "build-fix": "build-fix-implementation-queue",
  "ongoing-control": "ongoing-control-monthly-cycle-queue",
};

const WORKFLOW_BY_PLAN: Record<CendorqPaidPlanKey, string> = {
  "deep-review": "paid-diagnosis-workflow",
  "build-fix": "paid-implementation-workflow",
  "ongoing-control": "recurring-control-workflow",
};

const BASE_CAPTURED_FIELDS_BY_PLAN: Record<CendorqPaidPlanKey, readonly string[]> = {
  "deep-review": ["active Deep Review entitlement", "verified customer ownership", "Free Scan result when available"],
  "build-fix": ["active Build Fix entitlement", "verified customer ownership"],
  "ongoing-control": ["active Ongoing Control subscription", "verified customer ownership"],
};

export function projectCustomerRevenueActivation(input: CustomerRevenueActivationInput): CustomerRevenueActivationProjection {
  const plan = getPaidCendorqPlanPrice(input.planKey);
  const revenueStage = getCendorqRevenueStage(plan.name);
  const email = CENDORQ_POST_PAYMENT_EMAILS.find((item) => item.planKey === input.planKey);
  const dashboardDestination = DASHBOARD_DESTINATION_BY_PLAN[input.planKey];
  const workflowKey = WORKFLOW_BY_PLAN[input.planKey];
  const queueName = QUEUE_BY_PLAN[input.planKey];
  const requiredContext = CENDORQ_PLAN_PERSONALIZATION_FIELDS[input.planKey];
  const paidReportDelivery = requirePaidPlanReportDeliveryContract(input.planKey);
  const planIntelligenceIntake = projectPlanIntelligenceIntakeRecord({
    planKey: input.planKey,
    capturedFields: [...BASE_CAPTURED_FIELDS_BY_PLAN[input.planKey], ...(input.capturedIntakeFields || [])],
    blockedFields: input.blockedIntakeFields || [],
    recordKey: `${input.checkoutSessionId || input.planKey}-plan-intelligence-intake`,
  });

  return {
    plan: {
      key: input.planKey,
      name: plan.name,
      price: plan.price,
      amountCents: plan.amountCents,
      billingMode: plan.stripeMode === "subscription" ? "subscription" : "payment",
    },
    customerExperience: {
      headline: `${plan.name} is unlocked.`,
      feeling: revenueStage.customerFeeling,
      nextBestAction: revenueStage.nextBestAction,
      requiredContext,
      dashboardDestination,
    },
    backendHandoff: {
      entitlementKey: `${input.planKey}-entitlement`,
      workflowKey,
      queueName,
      dashboardNotification: `${plan.name} unlocked. ${planIntelligenceIntake.nextWorkflowAction}`,
      billingRecord: `${plan.publicName} ${plan.price}`,
      supportRecoveryPath: "/dashboard/support",
      auditEvents: [
        "checkout_session_received",
        "payment_status_verified",
        "entitlement_created",
        "plan_intelligence_intake_record_created",
        "dashboard_notification_created",
        "workflow_queue_item_created",
        "post_payment_email_queued",
        "paid_report_delivery_contract_attached",
      ],
    },
    planIntelligenceIntake,
    paidReportDelivery: {
      dashboardPath: paidReportDelivery.dashboardPath,
      customerReportName: paidReportDelivery.customerReportName,
      emailTemplateKey: paidReportDelivery.emailTemplateKey,
      attachmentRequired: paidReportDelivery.attachmentRequired,
      attachmentFileNamePattern: paidReportDelivery.attachmentFileNamePattern,
      attachmentContentType: paidReportDelivery.attachmentContentType,
      releaseGate: paidReportDelivery.releaseGate,
      requiredBeforeRelease: paidReportDelivery.requiredBeforeRelease,
      deliveryEvents: paidReportDelivery.deliveryEvents,
    },
    emailHandoff: {
      subject: email?.subject || `${plan.name} is unlocked`,
      dashboardPath: email?.dashboardPath || dashboardDestination,
      customerGoal: email?.customerGoal || revenueStage.nextBestAction,
      transactional: true,
      marketingConsentRequired: false,
      reportAttachmentRequired: true,
      reportAttachmentFileNamePattern: paidReportDelivery.attachmentFileNamePattern,
      reportAttachmentContentType: paidReportDelivery.attachmentContentType,
    },
    metadata: buildCheckoutMetadata(input, plan, workflowKey, paidReportDelivery.releaseGate, planIntelligenceIntake),
  };
}

function buildCheckoutMetadata(input: CustomerRevenueActivationInput, plan: ReturnType<typeof getPaidCendorqPlanPrice>, workflowKey: string, reportReleaseGate: string, planIntelligenceIntake: PlanIntelligenceIntakeRecord) {
  return {
    plan_key: input.planKey,
    plan_name: plan.name,
    price_amount: String(plan.amountCents),
    billing_mode: plan.stripeMode === "subscription" ? "subscription" : "one_time",
    backend_start_signal: plan.backendStartSignal,
    workflow_key: workflowKey,
    plan_intelligence_intake_record_key: planIntelligenceIntake.recordKey,
    plan_intelligence_completion_state: planIntelligenceIntake.completionState,
    plan_intelligence_missing_minimum_inputs: planIntelligenceIntake.missingMinimumInputs.join("|"),
    plan_intelligence_next_workflow_action: planIntelligenceIntake.nextWorkflowAction,
    paid_report_dashboard_path: "/dashboard/reports",
    paid_report_release_gate: reportReleaseGate,
    paid_report_attachment_required: "true",
    paid_report_attachment_content_type: "application/pdf",
    customer_id: input.customerId || "pending-customer",
    customer_email: input.customerEmail || "pending-email",
    business_id: input.businessId || "pending-business",
    scan_id: input.scanId || "pending-scan",
    report_id: input.reportId || "pending-report",
    source_page: input.sourcePage || "unknown-source",
    recommended_from: input.recommendedFrom || "unknown-recommendation-source",
    checkout_session_id: input.checkoutSessionId || "pending-session",
    stripe_customer_id: input.stripeCustomerId || "pending-stripe-customer",
    stripe_price_id: input.stripePriceId || "pending-stripe-price",
    stripe_payment_status: input.stripePaymentStatus || "unknown",
    marketing_consent: input.marketingConsent || "unknown",
  };
}
