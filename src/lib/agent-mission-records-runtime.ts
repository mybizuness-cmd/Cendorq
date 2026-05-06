import {
  type AgentFindingRecord,
  type AgentMissionStage,
  type AgentMissionStatus,
  projectAllPlanTriggeredAgentMissions,
  projectPlanTriggeredAgentMission,
} from "@/lib/agent-mission-operating-engine";
import type { PlanIntelligenceIntakeRecord } from "@/lib/plan-intelligence-intake-records";
import type { PlanValueKey } from "@/lib/plan-value-delivery-architecture";

export type AgentMissionReviewState = "not-ready" | "waiting" | "reviewed" | "approved" | "rejected";

export type AgentMissionRuntimeRecord = {
  missionRecordId: string;
  missionKey: string;
  planKey: PlanValueKey;
  trigger: string;
  stage: AgentMissionStage;
  status: AgentMissionStatus;
  intakeRecordKey: string;
  customerSafeSummary: string;
  assignedChiefAgent: string;
  assignedAgentKeys: readonly string[];
  missingMissionInputs: readonly string[];
  requiredFindingFields: readonly string[];
  findingRecords: readonly AgentFindingRecord[];
  chiefAgentReview: {
    state: AgentMissionReviewState;
    gate: string;
    requiredBeforeCaptainReview: readonly string[];
  };
  releaseCaptainReview: {
    state: AgentMissionReviewState;
    gate: string;
    requiredBeforeCustomerOutput: readonly string[];
  };
  sourceRefPolicy: readonly string[];
  appendOnlyAuditEvents: readonly string[];
  blockedOutputClaims: readonly string[];
  nextOperatingAction: string;
  customerFacingOutputAllowed: false;
  productionMutationAllowed: false;
  billingActionAllowed: false;
  deliveryEmailAllowed: false;
  reportReleaseAllowed: false;
};

export const AGENT_MISSION_RECORDS_RUNTIME_RULES = [
  "Every agent mission must create a runtime record before research begins.",
  "Every runtime record must reference the plan intelligence intake record that triggered the mission.",
  "Every runtime record must show missing inputs, assigned chief agent, assigned sub-agents, structured finding records, chief-agent review state, release-captain review state, blocked claims, and append-only audit events.",
  "Runtime records are safe-summary-only and must not expose raw customer payloads, private source values, credentials, payment data, provider payloads, prompts, internal notes, or cross-customer records.",
  "Customer-facing output remains blocked until structured findings exist, source references exist, chief-agent review passes, release-captain review passes, and blocked customer claims are removed or safely limited.",
  "Production mutation, billing action, report release, delivery email, and paid recommendation remain blocked from the runtime record by default.",
] as const;

export const AGENT_MISSION_APPEND_ONLY_AUDIT_EVENTS = [
  "agent_mission_record_created",
  "plan_intelligence_intake_attached",
  "agent_research_queued",
  "agent_finding_recorded",
  "chief_agent_review_requested",
  "chief_agent_review_completed",
  "release_captain_review_requested",
  "release_captain_review_completed",
  "customer_safe_output_approved",
] as const;

export function projectAgentMissionRuntimeRecord(planKey: PlanValueKey, intake?: PlanIntelligenceIntakeRecord): AgentMissionRuntimeRecord {
  const mission = projectPlanTriggeredAgentMission(planKey, intake);
  const findingsReady = mission.findingRecords.every((finding) => finding.sourceRefs.length > 0 && finding.verifiedFacts.length > 0);
  const readyForChief = mission.status === "ready" && findingsReady;
  const chiefState: AgentMissionReviewState = readyForChief ? "waiting" : "not-ready";
  const captainState: AgentMissionReviewState = "not-ready";

  return {
    missionRecordId: `${mission.missionKey}-${intake?.recordKey || "pending-intake"}`,
    missionKey: mission.missionKey,
    planKey: mission.planKey,
    trigger: mission.trigger,
    stage: mission.stage,
    status: mission.status,
    intakeRecordKey: intake?.recordKey || "pending-plan-intelligence-intake-record",
    customerSafeSummary: mission.customerMoment,
    assignedChiefAgent: mission.chiefAgentKey,
    assignedAgentKeys: mission.assignedAgentKeys,
    missingMissionInputs: mission.missingMissionInputs,
    requiredFindingFields: mission.structuredFindingSchema,
    findingRecords: mission.findingRecords,
    chiefAgentReview: {
      state: chiefState,
      gate: mission.chiefAgentReviewGate,
      requiredBeforeCaptainReview: [
        "all assigned agent findings recorded",
        "source references present",
        "assumptions separated from verified facts",
        "evidence gaps visible",
        "blocked customer claims listed",
      ],
    },
    releaseCaptainReview: {
      state: captainState,
      gate: mission.releaseCaptainReviewGate,
      requiredBeforeCustomerOutput: [
        "chief-agent review completed",
        "evidence conflicts resolved or limited",
        "customer-safe summary approved",
        "plan boundary verified",
        "report/fix/monthly delivery gate matched",
      ],
    },
    sourceRefPolicy: [
      "source references must be safe summaries or approved URLs",
      "raw private data cannot be pasted into source refs",
      "customer-provided claims must be marked as customer-provided until verified",
      "unsupported claims must stay blocked from customer output",
    ],
    appendOnlyAuditEvents: AGENT_MISSION_APPEND_ONLY_AUDIT_EVENTS,
    blockedOutputClaims: ["guaranteed revenue", "guaranteed ranking", "guaranteed AI placement", "absolute certainty", "unsupported ROI", "unapproved implementation claim"],
    nextOperatingAction: mission.nextOperatingAction,
    customerFacingOutputAllowed: false,
    productionMutationAllowed: false,
    billingActionAllowed: false,
    deliveryEmailAllowed: false,
    reportReleaseAllowed: false,
  };
}

export function projectAgentMissionRuntimeIndex() {
  return projectAllPlanTriggeredAgentMissions().map((mission) => projectAgentMissionRuntimeRecord(mission.planKey));
}

export function getAgentMissionRecordsRuntime() {
  return {
    rules: AGENT_MISSION_RECORDS_RUNTIME_RULES,
    auditEvents: AGENT_MISSION_APPEND_ONLY_AUDIT_EVENTS,
    records: projectAgentMissionRuntimeIndex(),
  };
}
