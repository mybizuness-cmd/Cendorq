import { NextRequest, NextResponse } from "next/server";

import { commandCenterPreviewHeaderName, resolveCommandCenterAccessState } from "@/lib/command-center/access";
import { projectAdminCommandCenterAccess } from "@/lib/admin-command-center-access-runtime";
import { projectAdminCommandCenterAuditEvent } from "@/lib/admin-command-center-audit-runtime";
import { projectAdminCommandCenterMissionBrief } from "@/lib/admin-command-center-mission-brief-runtime";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function OPTIONS() {
  return jsonNoStore({ ok: true, methods: ["GET", "OPTIONS"], projection: "admin-command-center-mission-brief" }, 200);
}

export async function GET(request: NextRequest) {
  const accessState = resolveCommandCenterAccessState(request.headers.get(commandCenterPreviewHeaderName()));
  if (!accessState.allowed) {
    return jsonNoStore({ ok: false, error: "Command center access is closed.", projection: "admin-command-center-mission-brief" }, 403);
  }

  const access = projectAdminCommandCenterAccess({
    role: "release-captain",
    area: "agent-orchestration",
    action: "approve-chief-agent-mission-brief",
    sessionFresh: true,
    mutationRequested: false,
    auditContextPresent: true,
    releaseCaptainApprovalPresent: true,
    missionBriefApproved: true,
    structuredFindingsPresent: true,
    forecastReviewPresent: true,
  });

  const mission = projectAdminCommandCenterMissionBrief({
    missionId: "admin-command-center-mission-brief-api",
    area: "agent-orchestration",
    chiefAgentRole: "chief-agent-controller",
    missionScope: "Review a chief-agent mission brief before dispatching agents or scouts.",
    sourceBoundaries: ["admin command center runtime", "captain operating core", "audit trail API"],
    evidenceStandard: ["verified facts", "source references", "assumptions", "gaps", "risks", "recommendations"],
    outputBoundary: "read-only mission brief projection",
    escalationRules: ["captain review before expansion", "owner review for provider, launch, billing, or production-affecting changes"],
    forecastRisks: ["drift", "stale assumptions", "duplicate scope", "under-validation", "handoff confusion"],
    antiDriftChecks: ["preview gate", "no-store response", "validator coverage", "route-chain coverage"],
  });

  const audit = projectAdminCommandCenterAuditEvent({
    eventId: "admin-command-center-mission-brief-api-audit",
    eventType: "mission-brief-reviewed",
    occurredAt: "request-time-projection",
    actorRole: "release-captain",
    area: "agent-orchestration",
    action: "approve-chief-agent-mission-brief",
    access,
    summary: "Mission brief API returned read-only chief-agent dispatch posture.",
    evidenceRefs: ["mission brief runtime", "access runtime", "audit runtime"],
    approvalRefs: ["command center preview gate", "release-captain review gate"],
  });

  return jsonNoStore(
    {
      ok: true,
      projection: "admin-command-center-mission-brief",
      accessMode: accessState.mode,
      access: {
        decision: access.decision,
        reasonCodes: access.reasonCodes,
        safeProjectionOnly: access.safeProjectionOnly,
        noStoreRequired: access.noStoreRequired,
      },
      mission: {
        ok: mission.ok,
        missionId: mission.missionId,
        area: mission.area,
        chiefAgentRole: mission.chiefAgentRole,
        missionScope: mission.missionScope,
        reasonCodes: mission.reasonCodes,
        sourceBoundaryCount: mission.sourceBoundaryCount,
        evidenceStandardCount: mission.evidenceStandardCount,
        escalationRuleCount: mission.escalationRuleCount,
        forecastRiskCount: mission.forecastRiskCount,
        antiDriftCheckCount: mission.antiDriftCheckCount,
        chiefAgentMayDispatch: mission.chiefAgentMayDispatch,
        agentMayResearch: mission.agentMayResearch,
        scoutMayCompare: mission.scoutMayCompare,
        outputRequiresCaptainReview: mission.outputRequiresCaptainReview,
      },
      audit: {
        eventType: audit.eventType,
        decision: audit.decision,
        evidenceRefCount: audit.evidenceRefCount,
        approvalRefCount: audit.approvalRefCount,
        immutable: audit.immutable,
      },
    },
    200,
  );
}

function jsonNoStore(payload: unknown, status: number) {
  return NextResponse.json(payload, {
    status,
    headers: {
      "Cache-Control": "no-store, max-age=0",
      Pragma: "no-cache",
      Expires: "0",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
    },
  });
}
