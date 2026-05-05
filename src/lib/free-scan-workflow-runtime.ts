import {
  FREE_SCAN_CONFIDENCE_MODEL,
  FREE_SCAN_EVIDENCE_RULES,
  FREE_SCAN_PRIORITY_MODEL,
  FREE_SCAN_REPORT_AXES,
  FREE_SCAN_REQUIRED_INTAKE_FIELDS,
  FREE_SCAN_RESULT_SECTIONS,
  getFreeScanFindingSummary,
} from "@/lib/free-scan-report-methodology";

export type FreeScanWorkflowInput = {
  customerId?: string;
  customerEmail?: string;
  businessId?: string;
  scanId?: string;
  businessName?: string;
  businessUrl?: string;
  targetCustomer?: string;
  primaryOffer?: string;
  marketOrLocation?: string;
  mainGoalOrConcern?: string;
  customerAction?: string;
};

export type FreeScanWorkflowProjection = {
  destination: string;
  reportStatus: "ready" | "pending-context";
  requiredFields: readonly string[];
  methodologyAxes: readonly string[];
  confidenceLevels: readonly string[];
  evidenceRules: readonly string[];
  priorityLevels: readonly string[];
  resultSections: readonly string[];
  sampleFindings: ReturnType<typeof getFreeScanFindingSummary>;
  dashboardNotification: string;
  nextBestAction: string;
  backendEvents: readonly string[];
};

export function projectFreeScanWorkflow(input: FreeScanWorkflowInput): FreeScanWorkflowProjection {
  const missingFields = FREE_SCAN_REQUIRED_INTAKE_FIELDS.filter((field) => !hasInputValue(input, field));
  const reportStatus = missingFields.length ? "pending-context" : "ready";

  return {
    destination: "/dashboard/reports/free-scan",
    reportStatus,
    requiredFields: missingFields,
    methodologyAxes: FREE_SCAN_REPORT_AXES.map((axis) => axis.customerLabel),
    confidenceLevels: FREE_SCAN_CONFIDENCE_MODEL.map((item) => item.level),
    evidenceRules: FREE_SCAN_EVIDENCE_RULES.map((item) => item.label),
    priorityLevels: FREE_SCAN_PRIORITY_MODEL.map((item) => item.level),
    resultSections: FREE_SCAN_RESULT_SECTIONS.map((item) => item.label),
    sampleFindings: getFreeScanFindingSummary(),
    dashboardNotification:
      reportStatus === "ready"
        ? "Your Free Scan result is ready. Review what may be costing customer choices first."
        : "Your Free Scan needs a little more context before the first result can be trusted.",
    nextBestAction:
      reportStatus === "ready"
        ? "Open Free Scan results, review the evidence rules, confidence posture, priority model, and decide whether Deep Review should unlock the full reason."
        : "Complete the missing intake context so the first result is more useful and safer to trust.",
    backendEvents: [
      "free_scan_intake_received",
      "email_verification_required",
      "free_scan_context_checked",
      "free_scan_evidence_boundary_applied",
      "free_scan_confidence_model_applied",
      "free_scan_priority_model_applied",
      "free_scan_result_projection_created",
      "dashboard_result_destination_created",
      "free_scan_result_notification_created",
    ],
  };
}

function hasInputValue(input: FreeScanWorkflowInput, field: (typeof FREE_SCAN_REQUIRED_INTAKE_FIELDS)[number]) {
  const valueByField = {
    business_name: input.businessName,
    business_url: input.businessUrl,
    target_customer: input.targetCustomer,
    primary_offer: input.primaryOffer,
    market_or_location: input.marketOrLocation,
    main_goal_or_concern: input.mainGoalOrConcern,
    customer_action: input.customerAction,
    email: input.customerEmail,
  } satisfies Record<(typeof FREE_SCAN_REQUIRED_INTAKE_FIELDS)[number], string | undefined>;

  return Boolean(valueByField[field]?.trim());
}

export const FREE_SCAN_WORKFLOW_RESULT_PROMISE = [
  "The customer lands on a protected dashboard result page after verification.",
  "The result explains what matters first instead of dumping a generic scorecard.",
  "The methodology shows clarity, trust, choice, action, visibility, and proof.",
  "The confidence posture separates observed evidence, inferred judgment, and deeper-review needs.",
  "The priority model separates critical, important, and watch items before recommending a paid next step.",
  "The evidence boundary protects accuracy by using visible customer-facing evidence and customer-provided context only.",
  "The next action teaches the customer while moving them toward the right paid depth.",
] as const;
