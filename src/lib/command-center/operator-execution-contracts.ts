export type OperatorExecutionCommandKey =
  | "assign-agent-mission"
  | "submit-agent-finding"
  | "request-release-review"
  | "approve-customer-safe-report"
  | "publish-dashboard-projection"
  | "queue-customer-notification"
  | "hold-billing-or-entitlement"
  | "escalate-support-review";

export type OperatorExecutionRiskLevel = "low" | "medium" | "high" | "release-critical";

export type OperatorExecutionContract = {
  key: OperatorExecutionCommandKey;
  label: string;
  riskLevel: OperatorExecutionRiskLevel;
  requiredBeforeExecution: readonly string[];
  allowedStateTransitions: readonly string[];
  blockedInputs: readonly string[];
  auditEvents: readonly string[];
  customerProjectionRule: string;
};

export const OPERATOR_EXECUTION_CONTRACTS = [
  {
    key: "assign-agent-mission",
    label: "Assign agent mission",
    riskLevel: "medium",
    requiredBeforeExecution: ["operator access verified", "mission scope exists", "plan entitlement or internal approval exists", "raw customer secrets absent"],
    allowedStateTransitions: ["draft -> queued", "queued -> assigned", "assigned -> in-review"],
    blockedInputs: ["password", "private key", "session token", "raw provider payload", "cross-customer data"],
    auditEvents: ["operator_mission_assignment_requested", "operator_mission_assignment_recorded", "agent_queue_state_changed"],
    customerProjectionRule: "Customers may see safe mission status only after the status is customer-owned and projection-approved.",
  },
  {
    key: "submit-agent-finding",
    label: "Submit agent finding",
    riskLevel: "high",
    requiredBeforeExecution: ["agent mission assigned", "finding summary is safe", "evidence class labeled", "confidence labeled", "limitations visible"],
    allowedStateTransitions: ["in-review -> finding-submitted", "finding-submitted -> chief-review-required"],
    blockedInputs: ["raw evidence dump", "private credential", "unsupported guarantee", "unlabeled inference", "operator private note"],
    auditEvents: ["agent_finding_submitted", "finding_evidence_class_labeled", "finding_review_required"],
    customerProjectionRule: "Findings must remain internal until release-captain or chief review produces a customer-safe projection.",
  },
  {
    key: "request-release-review",
    label: "Request release review",
    riskLevel: "release-critical",
    requiredBeforeExecution: ["customer-safe summary exists", "blocked claim scan passed", "limitations visible", "support path visible", "raw payload absent"],
    allowedStateTransitions: ["chief-review-required -> release-review-requested", "finding-submitted -> release-review-requested"],
    blockedInputs: ["guaranteed ranking", "guaranteed revenue", "raw report internals", "raw billing provider payload", "security absolute claim"],
    auditEvents: ["release_review_requested", "release_gate_inputs_checked", "release_captain_review_pending"],
    customerProjectionRule: "No customer-facing report, notification, or dashboard update may be published from a release request alone.",
  },
  {
    key: "approve-customer-safe-report",
    label: "Approve customer-safe report",
    riskLevel: "release-critical",
    requiredBeforeExecution: ["release captain approved", "report version locked", "customer ownership verified", "email verified", "plan entitlement verified", "PDF/dashboard parity verified"],
    allowedStateTransitions: ["release-review-requested -> report-approved", "report-approved -> report-published"],
    blockedInputs: ["raw evidence", "internal notes", "cross-customer data", "unsupported guarantee", "unapproved plan scope"],
    auditEvents: ["customer_safe_report_approved", "report_version_locked", "dashboard_pdf_parity_checked", "report_release_audit_recorded"],
    customerProjectionRule: "Only approved customer-safe report versions may appear in the report vault or customer email attachment flow.",
  },
  {
    key: "publish-dashboard-projection",
    label: "Publish dashboard projection",
    riskLevel: "high",
    requiredBeforeExecution: ["customer ownership verified", "projection safe fields only", "source record exists", "support correction path visible"],
    allowedStateTransitions: ["projection-draft -> projection-approved", "projection-approved -> customer-visible"],
    blockedInputs: ["raw email", "raw session", "raw evidence", "raw billing payload", "operator identity", "risk scoring internals"],
    auditEvents: ["dashboard_projection_requested", "dashboard_projection_safety_checked", "dashboard_projection_published"],
    customerProjectionRule: "Dashboard projections must show status, next action, confidence, and support path without raw private data.",
  },
  {
    key: "queue-customer-notification",
    label: "Queue customer notification",
    riskLevel: "medium",
    requiredBeforeExecution: ["notification reason exists", "customer-owned destination exists", "safe summary exists", "preference rules respected where needed"],
    allowedStateTransitions: ["notification-draft -> queued", "queued -> sent", "sent -> read"],
    blockedInputs: ["raw token", "raw email body with secret", "unsupported urgency", "guaranteed outcome", "private report internals"],
    auditEvents: ["customer_notification_queued", "notification_projection_checked", "notification_delivery_state_changed"],
    customerProjectionRule: "Notifications may disclose only the customer-safe reason, destination, and next action.",
  },
  {
    key: "hold-billing-or-entitlement",
    label: "Hold billing or entitlement",
    riskLevel: "release-critical",
    requiredBeforeExecution: ["billing reason labeled", "customer-safe billing message prepared", "support path visible", "provider payload not exposed"],
    allowedStateTransitions: ["active -> hold", "pending -> hold", "hold -> support-review"],
    blockedInputs: ["raw card data", "raw provider payload", "bank data", "secret key", "refund promise without approval"],
    auditEvents: ["billing_entitlement_hold_requested", "billing_safe_message_prepared", "billing_support_review_required"],
    customerProjectionRule: "Customers may see safe billing status and support path, not raw provider data or internal fraud/risk notes.",
  },
  {
    key: "escalate-support-review",
    label: "Escalate support review",
    riskLevel: "high",
    requiredBeforeExecution: ["support request exists", "customer ownership verified", "safe summary exists", "blocked content removed"],
    allowedStateTransitions: ["support-open -> support-review", "support-review -> operator-action-required", "operator-action-required -> customer-update-ready"],
    blockedInputs: ["password", "card number", "private key", "raw vulnerability details", "operator private identity"],
    auditEvents: ["support_review_escalated", "support_safe_summary_checked", "support_customer_update_prepared"],
    customerProjectionRule: "Support status must show customer-safe status and next step, not operator notes or internal triage details.",
  },
] as const satisfies readonly OperatorExecutionContract[];

export const OPERATOR_EXECUTION_SAFETY_STANDARD = [
  "Every operator command must have a named command key, risk level, required preconditions, allowed state transitions, blocked inputs, audit events, and customer projection rule.",
  "Release-critical commands require release-captain approval before customer-facing publication.",
  "Operator execution cannot publish raw evidence, private credentials, raw sessions, raw billing payloads, internal notes, or cross-customer data.",
  "Operator execution cannot claim guaranteed ranking, guaranteed revenue, guaranteed AI placement, guaranteed security, or liability-free outcomes.",
  "Every customer-visible change must be traceable to an audit event and a customer-safe projection rule.",
] as const;

export function getOperatorExecutionContract(key: OperatorExecutionCommandKey) {
  return OPERATOR_EXECUTION_CONTRACTS.find((contract) => contract.key === key);
}
