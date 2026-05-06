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
  "Chief agents may review and consolidate findings, but release-captain approval remains required before customer-facing report, fix, monitoring alert, code, copy, or validator output.",
  "A mission cannot become customer-safe output until missing required inputs, evidence conflicts, unsafe inputs, and blocked claims are resolved or explicitly limited.",
  "Agent missions must reject raw payloads, private credentials, payment data, cross-customer records, unverified customer claims as fact, fake urgency, guaranteed revenue, guaranteed ranking, guaranteed AI placement, and absolute certainty.",
  "Agent missions should increase speed and depth without creating uncontrolled production mutation or authority drift.",
] as const;

export const PLAN_TRIGGERED_AGENT_MISSION_TEMPLATES = [
  {
    missionKey: "free-scan-first-signal-mission",
    planKey: "free-scan",
    customerMoment: "A customer submitted a Free Scan and needs a useful first signal.",
    trigger: "free-scan-intake-created",
    chiefAgentKey: "chief-report-truth-agent",
    assignedAgentKeys: ["report-truth-research-scout", "customer-journey-scout", "conversion-luxury-ui-scout"],
    requiredMissionInputs: ["business name", "business URL", "primary offer", "target customer", "main goal or concern"],
    researchOrders: ["inspect visible first-screen clarity", "check customer action path", "separate observed evidence from inference", "choose one strongest first signal"],
    structuredFindingSchema: ["first signal", "visible evidence", "confidence", "limitation", "best next action", "blocked overclaim"],
    chiefAgentReviewGate: "free-scan-chief-truth-review",
    releaseCaptainReviewGate: "free-scan-safe-result-release",
    blockedShortcuts: ["do not produce full diagnosis", "do not imply implementation", "do not use unsupported ROI claim", "do not hide limitations"],
    allowedCustomerOutputAfterApproval: ["first signal summary", "confidence-labeled limitation", "dashboard-only Free Scan result"],
  },
  {
    missionKey: "deep-review-cause-diagnosis-mission",
    planKey: "deep-review",
    customerMoment: "A paid customer needs cause-level diagnosis before spending on the wrong fix.",
    trigger: "deep-review-entitlement-created",
    chiefAgentKey: "chief-report-truth-agent",
    assignedAgentKeys: ["report-truth-research-scout", "evidence-conflict-scout", "industry-context-scout", "report-design-quality-scout"],
    requiredMissionInputs: ["active Deep Review entitlement", "verified customer ownership", "business URL", "primary offer", "target customer", "main conversion action", "known concern"],
    researchOrders: ["map symptoms to probable causes", "collect external and customer-provided evidence", "find evidence conflicts", "rank findings by customer-decision impact", "mark Build Fix fit or not fit"],
    structuredFindingSchema: ["verified facts", "source references", "customer-provided context", "assumptions", "evidence gaps", "confidence", "cause hypothesis", "priority", "Build Fix fit"],
    chiefAgentReviewGate: "deep-review-chief-truth-review",
    releaseCaptainReviewGate: "deep-review-report-release",
    blockedShortcuts: ["do not implement", "do not treat customer claims as verified facts", "do not claim complete certainty", "do not send report without PDF delivery gate"],
    allowedCustomerOutputAfterApproval: ["cause-level diagnosis", "priority map", "confidence-labeled Deep Review report", "approved PDF attachment"],
  },
  {
    missionKey: "build-fix-scoped-implementation-mission",
    planKey: "build-fix",
    customerMoment: "A paid customer needs a specific weakness fixed without scope creep.",
    trigger: "build-fix-entitlement-created",
    chiefAgentKey: "chief-product-experience-agent",
    assignedAgentKeys: ["conversion-luxury-ui-scout", "customer-journey-scout", "report-design-quality-scout", "security-privacy-scout"],
    requiredMissionInputs: ["active Build Fix entitlement", "verified customer ownership", "approved fix target", "primary CTA", "approved business details", "scope confirmation"],
    researchOrders: ["confirm fix target", "preserve before-state baseline", "identify customer-facing improvement path", "check scope boundary", "prepare approval-ready delivery summary"],
    structuredFindingSchema: ["approved scope", "before state", "work recommendation", "customer-facing change", "remaining risk", "out-of-scope item", "approval need"],
    chiefAgentReviewGate: "build-fix-chief-experience-review",
    releaseCaptainReviewGate: "build-fix-customer-output-approval",
    blockedShortcuts: ["do not start production work before scope clarity", "do not request credentials in chat", "do not imply unlimited implementation", "do not make unapproved production changes"],
    allowedCustomerOutputAfterApproval: ["scoped implementation summary", "before-after summary", "remaining risk note", "approved PDF delivery summary"],
  },
  {
    missionKey: "ongoing-control-monthly-command-mission",
    planKey: "ongoing-control",
    customerMoment: "A subscribed customer needs monthly control, comparable signals, and one clear priority.",
    trigger: "ongoing-control-cycle-created",
    chiefAgentKey: "chief-growth-forecast-agent",
    assignedAgentKeys: ["business-change-forecasting-scout", "analytics-and-growth-scout", "report-truth-research-scout", "operator-command-scout"],
    requiredMissionInputs: ["active Ongoing Control subscription", "verified customer ownership", "monitoring scope", "monthly priority", "review cadence"],
    researchOrders: ["compare current evidence against prior month", "surface regressions", "label trend confidence", "select one monthly priority", "mark Build Fix escalation fit or not fit"],
    structuredFindingSchema: ["monthly change", "stable area", "regression", "confidence", "next priority", "Build Fix escalation", "blocked unsupported attribution"],
    chiefAgentReviewGate: "ongoing-control-chief-forecast-review",
    releaseCaptainReviewGate: "ongoing-control-monthly-review-gate",
    blockedShortcuts: ["do not create generic monthly noise", "do not imply unlimited Build Fix", "do not guarantee ranking", "do not guarantee AI placement"],
    allowedCustomerOutputAfterApproval: ["monthly summary", "trend confidence", "next priority", "approved PDF monthly control update"],
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
    blockedCustomerClaims: ["guaranteed revenue", "guaranteed ranking", "guaranteed AI placement", "absolute certainty", "unsupported ROI"],
  };
}

function nextMissionAction(planKey: PlanValueKey, status: AgentMissionStatus, missingMissionInputs: readonly string[]) {
  if (status === "blocked") return "Stop mission; request a safe customer summary and remove unsafe payloads before research continues.";
  if (status === "needs-context") return `Collect missing ${planKey} context before agent findings can be chief-reviewed: ${missingMissionInputs.join(", ")}.`;
  if (planKey === "build-fix") return "Queue scoped implementation research and hold production changes until chief experience review and release-captain approval.";
  if (planKey === "ongoing-control") return "Queue monthly comparison research and hold customer alerts until chief forecast review and release-captain approval.";
  return "Queue structured research findings for chief-agent review, then release-captain approval before customer-safe output.";
}
