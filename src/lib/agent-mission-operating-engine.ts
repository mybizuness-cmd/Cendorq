import { AGENT_OPERATING_SYSTEM_CONTRACT } from "@/lib/agent-operating-system-contracts";
import type { PlanIntelligenceIntakeRecord } from "@/lib/plan-intelligence-intake-records";
import type { PlanValueKey } from "@/lib/plan-value-delivery-architecture";

export type AgentMissionStage =
  | "mission-created"
  | "research-queued"
  | "agent-findings-recorded"
  | "chief-agent-reviewed"
  | "release-captain-reviewed"
  | "customer-safe-output-ready";

export type AgentMissionStatus = "blocked" | "needs-context" | "ready" | "in-review" | "approved-for-customer-output";

export type AgentFindingRecord = {
  findingId: string;
  agentKey: string;
  requiredFields: readonly string[];
  verifiedFacts: readonly string[];
  sourceRefs: readonly string[];
  assumptions: readonly string[];
  evidenceGaps: readonly string[];
  confidence: "low" | "medium" | "high";
  risks: readonly string[];
  recommendation: string;
  blockedCustomerClaims: readonly string[];
};

export type PlanTriggeredAgentMission = {
  missionKey: string;
  planKey: PlanValueKey;
  customerMoment: string;
  trigger: string;
  chiefAgentKey: string;
  assignedAgentKeys: readonly string[];
  stage: AgentMissionStage;
  status: AgentMissionStatus;
  requiredMissionInputs: readonly string[];
  missingMissionInputs: readonly string[];
  researchOrders: readonly string[];
  structuredFindingSchema: readonly string[];
  requiredReportOutput: readonly string[];
  requiredReportVisuals: readonly string[];
  customerEducationGoal: string;
  nextPlanMotion: string;
  findingRecords: readonly AgentFindingRecord[];
  chiefAgentReviewGate: string;
  releaseCaptainReviewGate: string;
  blockedShortcuts: readonly string[];
  allowedCustomerOutputAfterApproval: readonly string[];
  nextOperatingAction: string;
};

export const AGENT_MISSION_OPERATING_ENGINE_RULES = [
  "Every plan-triggered mission must start from a plan intelligence intake record, not a vague request.",
  "Every mission must assign one chief agent and scoped sub-agents that match the plan value being delivered.",
  "Every agent finding must use structured fields: verified facts, source references, assumptions, evidence gaps, confidence, risks, recommendation, and blocked customer claims.",
  "Chief agents may review and consolidate findings, but release-captain approval remains required before customer-facing report, fix, monitoring alert, code, copy, validator output, PDF, HTML report, dashboard report card, email summary, or next-plan recommendation.",
  "A mission cannot become customer-safe output until missing required inputs, evidence conflicts, unsafe inputs, and blocked claims are resolved or explicitly limited.",
  "Agent missions must use progressive intake: start safe public research when enough information exists, but keep missing customer information visible as a dashboard blocker.",
  "Agent missions must produce educational while selling and informational while selling customer output with plain wording, helpful visuals, confidence labels, limitations, and the safest next step.",
  "Agent missions must reject raw payloads, private credentials, payment data, cross-customer records, unverified customer claims as fact, fake urgency, guaranteed revenue, guaranteed ranking, guaranteed AI placement, absolute certainty, generic AI filler, technical clutter, decorative charts, unsupported competitor claims, and unsupported forecasts.",
  "Agent missions should increase speed and depth without creating uncontrolled production mutation or authority drift.",
] as const;

export const PLAN_TRIGGERED_AGENT_MISSION_TEMPLATES = [
  {
    missionKey: "free-scan-first-signal-mission",
    planKey: "free-scan",
    customerMoment: "A customer submitted a Free Scan and needs a useful first signal that makes the need for deeper review clear.",
    trigger: "free-scan-intake-created",
    chiefAgentKey: "chief-report-truth-agent",
    assignedAgentKeys: ["report-truth-research-scout", "customer-journey-scout", "conversion-luxury-ui-scout", "report-design-quality-scout"],
    requiredMissionInputs: ["business name", "business URL", "customer email", "main location", "business type", "primary offer", "target customer", "main goal or concern"],
    researchOrders: ["inspect visible first-screen clarity", "check customer action path", "scan public trust and proof cues", "separate observed evidence from inference", "choose three to five strongest first findings", "prepare simple signal meter and issue-priority visual", "keep full competitor analysis out of Free Scan"],
    structuredFindingSchema: ["first signal", "visible evidence", "business meaning", "confidence", "limitation", "best next action", "blocked overclaim"],
    requiredReportOutput: ["Cendorq letterhead", "Free Scan Signal Report", "customer-safe business name", "short executive signal", "3 to 5 key findings", "simple visibility/readiness signal level", "plain explanation", "limitation note", "upgrade path to Deep Review"],
    requiredReportVisuals: ["simple signal meter or readiness bar", "small issue-priority visual"],
    customerEducationGoal: "Teach the customer what may be unclear without giving away the full paid diagnosis.",
    nextPlanMotion: "Deep Review when deeper cause-level diagnosis is needed.",
    chiefAgentReviewGate: "free-scan-chief-truth-review",
    releaseCaptainReviewGate: "free-scan-safe-result-release",
    blockedShortcuts: ["do not produce full diagnosis", "do not include full competitor analysis", "do not include full forecast model", "do not imply implementation", "do not use unsupported ROI claim", "do not hide limitations"],
    allowedCustomerOutputAfterApproval: ["first signal summary", "confidence-labeled limitation", "simple visual signal", "dashboard-only Free Scan result", "Deep Review recommendation when fit"],
  },
  {
    missionKey: "deep-review-cause-diagnosis-mission",
    planKey: "deep-review",
    customerMoment: "A paid customer needs cause-level diagnosis before spending on the wrong fix.",
    trigger: "deep-review-entitlement-created",
    chiefAgentKey: "chief-report-truth-agent",
    assignedAgentKeys: ["report-truth-research-scout", "evidence-conflict-scout", "industry-context-scout", "business-change-forecasting-scout", "report-design-quality-scout"],
    requiredMissionInputs: ["active Deep Review entitlement", "verified customer ownership", "business URL", "business type", "primary offer", "target customer", "main conversion action", "main location or service area", "known concern"],
    researchOrders: ["map symptoms to probable causes", "collect external and customer-provided evidence", "find evidence conflicts", "review public competitor visibility when evidence allows", "prepare forecast or risk outlook without fake precision", "rank findings by customer-decision impact", "mark Build Fix fit or not fit", "prepare priority heat map and scorecard"],
    structuredFindingSchema: ["verified facts", "source references", "customer-provided context", "assumptions", "evidence gaps", "confidence", "cause hypothesis", "priority", "competitor observation", "forecast limitation", "Build Fix fit"],
    requiredReportOutput: ["Cendorq letterhead", "Deep Review Diagnostic Report", "table of contents", "executive summary", "visibility and readiness scorecard", "website clarity review", "AI/search readability review", "trust and proof review", "competitor comparison when evidence is available", "forecast or risk outlook", "priority map", "Build Fix fit decision"],
    requiredReportVisuals: ["visibility/readiness scorecard", "priority heat map", "competitor comparison chart when evidence allows", "forecast or risk outlook visual", "opportunity map", "clear severity labels"],
    customerEducationGoal: "Teach the customer why the problem exists, what matters most, and which fix should happen first.",
    nextPlanMotion: "Build Fix when an approved weakness can be improved.",
    chiefAgentReviewGate: "deep-review-chief-truth-review",
    releaseCaptainReviewGate: "deep-review-report-release",
    blockedShortcuts: ["do not implement", "do not treat customer claims as verified facts", "do not claim complete certainty", "do not use fake precision forecast", "do not claim private competitor data", "do not send report without PDF delivery gate"],
    allowedCustomerOutputAfterApproval: ["cause-level diagnosis", "priority map", "competitor comparison with evidence limits", "forecast/risk outlook", "confidence-labeled Deep Review report", "approved PDF attachment"],
  },
  {
    missionKey: "build-fix-scoped-implementation-mission",
    planKey: "build-fix",
    customerMoment: "A paid customer needs a specific weakness fixed without scope creep and needs to understand what may take time.",
    trigger: "build-fix-entitlement-created",
    chiefAgentKey: "chief-product-experience-agent",
    assignedAgentKeys: ["conversion-luxury-ui-scout", "customer-journey-scout", "report-design-quality-scout", "security-privacy-scout", "business-change-forecasting-scout"],
    requiredMissionInputs: ["active Build Fix entitlement", "verified customer ownership", "approved fix target", "primary CTA", "approved business details", "scope confirmation", "approval contact"],
    researchOrders: ["confirm fix target", "preserve before-state baseline", "identify customer-facing improvement path", "check scope boundary", "prepare realistic timeline expectation", "prepare before/after and remaining-risk visuals", "prepare approval-ready delivery summary"],
    structuredFindingSchema: ["approved scope", "before state", "work recommendation", "customer-facing change", "expected timing range", "dependency", "remaining risk", "out-of-scope item", "approval need"],
    requiredReportOutput: ["Cendorq letterhead", "Build Fix Delivery Report", "approved scope", "before-state baseline", "what was fixed or prepared", "why it matters", "expected timeline range", "dependencies and limitations", "remaining risks", "Ongoing Control recommendation when fit"],
    requiredReportVisuals: ["before/after summary visual", "scoped work checklist", "expected timeline visual", "remaining-risk map", "next-control path visual"],
    customerEducationGoal: "Teach the customer what changed, why it matters, what may take time, and why ongoing control protects the fix.",
    nextPlanMotion: "Ongoing Control when the customer needs to keep visibility and readiness from drifting.",
    chiefAgentReviewGate: "build-fix-chief-experience-review",
    releaseCaptainReviewGate: "build-fix-customer-output-approval",
    blockedShortcuts: ["do not start production work before scope clarity", "do not request credentials in chat", "do not imply unlimited implementation", "do not make unapproved production changes", "do not promise exact result dates"],
    allowedCustomerOutputAfterApproval: ["scoped implementation summary", "before-after summary", "timeline expectation", "remaining risk note", "approved PDF delivery summary", "Ongoing Control recommendation when fit"],
  },
  {
    missionKey: "ongoing-control-monthly-command-mission",
    planKey: "ongoing-control",
    customerMoment: "A subscribed customer needs monthly control, comparable signals, and one clear priority as AI/search/platform conditions change.",
    trigger: "ongoing-control-cycle-created",
    chiefAgentKey: "chief-growth-forecast-agent",
    assignedAgentKeys: ["business-change-forecasting-scout", "analytics-and-growth-scout", "report-truth-research-scout", "operator-command-scout", "report-design-quality-scout"],
    requiredMissionInputs: ["active Ongoing Control subscription", "verified customer ownership", "monitoring scope", "monthly priority", "review cadence"],
    researchOrders: ["compare current evidence against prior month", "surface regressions", "monitor competitor movement when evidence allows", "label trend confidence", "select one monthly priority", "prepare trend and risk-watch visuals", "mark Build Fix escalation fit or not fit"],
    structuredFindingSchema: ["monthly change", "stable area", "regression", "competitor movement", "platform change", "confidence", "next priority", "Build Fix escalation", "blocked unsupported attribution"],
    requiredReportOutput: ["Cendorq letterhead", "Ongoing Control Report", "executive summary", "what improved", "what weakened", "what stayed stable", "AI/search/platform change notes", "competitor movement notes when evidence allows", "trend confidence labels", "one main priority", "Build Fix escalation decision"],
    requiredReportVisuals: ["trend line or month-over-month signal visual", "change summary cards", "risk watchlist", "priority meter", "next-action path visual"],
    customerEducationGoal: "Teach the customer what changed, why it matters, and what one action keeps them from going stale.",
    nextPlanMotion: "Another Build Fix when a new scoped weakness appears.",
    chiefAgentReviewGate: "ongoing-control-chief-forecast-review",
    releaseCaptainReviewGate: "ongoing-control-monthly-review-gate",
    blockedShortcuts: ["do not create generic monthly noise", "do not imply unlimited Build Fix", "do not guarantee ranking", "do not guarantee AI placement", "do not claim unsupported attribution"],
    allowedCustomerOutputAfterApproval: ["monthly summary", "trend confidence", "risk watchlist", "next priority", "approved PDF monthly control update", "Build Fix escalation when fit"],
  },
] as const;

export function projectPlanTriggeredAgentMission(planKey: PlanValueKey, intake?: PlanIntelligenceIntakeRecord): PlanTriggeredAgentMission {
  const template = PLAN_TRIGGERED_AGENT_MISSION_TEMPLATES.find((mission) => mission.planKey === planKey) || PLAN_TRIGGERED_AGENT_MISSION_TEMPLATES[0];
  const captured = new Set(intake?.capturedMinimumInputs || []);
  const missingMissionInputs = template.requiredMissionInputs.filter((field) => !captured.has(field));
  const unsafeBlocked = intake?.completionState === "blocked-by-safety";
  const status: AgentMissionStatus = unsafeBlocked ? "blocked" : missingMissionInputs.length ? "needs-context" : "ready";

  return {
    ...template,
    stage: status === "ready" ? "research-queued" : "mission-created",
    status,
    missingMissionInputs,
    findingRecords: template.assignedAgentKeys.map((agentKey, index) => projectInitialFindingRecord(template.missionKey, agentKey, template.structuredFindingSchema, status, index)),
    nextOperatingAction: nextMissionAction(template.planKey, status, missingMissionInputs),
  };
}

export function projectAllPlanTriggeredAgentMissions() {
  return PLAN_TRIGGERED_AGENT_MISSION_TEMPLATES.map((mission) => projectPlanTriggeredAgentMission(mission.planKey));
}

export function getAgentMissionOperatingEngine() {
  return {
    hierarchy: AGENT_OPERATING_SYSTEM_CONTRACT.commandHierarchy,
    chiefAgentLanes: AGENT_OPERATING_SYSTEM_CONTRACT.chiefAgentLanes,
    agentLanes: AGENT_OPERATING_SYSTEM_CONTRACT.agentLanes,
    missionRules: AGENT_MISSION_OPERATING_ENGINE_RULES,
    planMissions: projectAllPlanTriggeredAgentMissions(),
    autonomyRules: AGENT_OPERATING_SYSTEM_CONTRACT.autonomyRules,
  };
}

function projectInitialFindingRecord(missionKey: string, agentKey: string, requiredFields: readonly string[], status: AgentMissionStatus, index: number): AgentFindingRecord {
  return {
    findingId: `${missionKey}-${agentKey}-${index + 1}`,
    agentKey,
    requiredFields,
    verifiedFacts: status === "ready" ? ["mission has minimum required plan inputs"] : [],
    sourceRefs: [],
    assumptions: status === "needs-context" ? ["mission needs more customer context before high-confidence analysis"] : [],
    evidenceGaps: status === "ready" ? [] : ["missing required plan input"],
    confidence: status === "ready" ? "medium" : "low",
    risks: status === "blocked" ? ["unsafe intake must be replaced with a safe summary before analysis"] : [],
    recommendation: status === "ready" ? "Begin scoped agent research and record structured findings for chief-agent review." : "Request missing or safe context before agent work becomes customer-facing.",
    blockedCustomerClaims: ["guaranteed revenue", "guaranteed ranking", "guaranteed AI placement", "absolute certainty", "unsupported ROI", "unsupported competitor claim", "fake precision forecast"],
  };
}

function nextMissionAction(planKey: PlanValueKey, status: AgentMissionStatus, missingMissionInputs: readonly string[]) {
  if (status === "blocked") return "Stop mission; request a safe customer summary and remove unsafe payloads before research continues.";
  if (status === "needs-context") return `Collect missing ${planKey} context or show it as a dashboard blocker before agent findings can be chief-reviewed: ${missingMissionInputs.join(", ")}.`;
  if (planKey === "build-fix") return "Queue scoped implementation research and hold production changes until chief experience review and release-captain approval.";
  if (planKey === "ongoing-control") return "Queue monthly comparison research and hold customer alerts until chief forecast review and release-captain approval.";
  return "Queue structured research findings for chief-agent review, then release-captain approval before customer-safe output.";
}
