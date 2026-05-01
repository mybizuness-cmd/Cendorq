import { NextRequest, NextResponse } from "next/server";

import { commandCenterPreviewHeaderName, resolveCommandCenterAccessState } from "@/lib/command-center/access";
import { projectAdminCommandCenterAccess } from "@/lib/admin-command-center-access-runtime";
import { projectAdminCommandCenterAgentFinding } from "@/lib/admin-command-center-agent-findings-runtime";
import { projectAdminCommandCenterAuditEvent } from "@/lib/admin-command-center-audit-runtime";
import { projectAdminCommandCenterMissionBrief } from "@/lib/admin-command-center-mission-brief-runtime";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function OPTIONS() {
  return jsonNoStore({ ok: true, methods: ["GET", "OPTIONS"], projection: "admin-command-center-agent-findings" }, 200);
}

export async function GET(request: NextRequest) {
  const accessState = resolveCommandCenterAccessState(request.headers.get(commandCenterPreviewHeaderName()));
  if (!accessState.allowed) {
    return jsonNoStore({ ok: false, error: "Command center access is closed.", projection: "admin-command-center-agent-findings" }, 403);
  }

  const access = projectAdminCommandCenterAccess({
    role: "release-captain",
    area: "agent-orchestration",
    action: "review-agent-output",
    sessionFresh: true,
    mutationRequested: false,
    auditContextPresent: true,
    releaseCaptainApprovalPresent: true,
    missionBriefApproved: true,
    structuredFindingsPresent: true,
    forecastReviewPresent: true,
  });

  const mission = projectAdminCommandCenterMissionBrief({
    missionId: "admin-command-center-agent-findings-api",
    area: "agent-orchestration",
    chiefAgentRole: "chief-agent-controller",
    missionScope: "Review structured agent and scout findings before any escalation or expansion.",
    sourceBoundaries: ["mission brief runtime", "agent findings runtime", "audit trail API"],
    evidenceStandard: ["verified facts", "source references", "assumptions", "gaps", "risks", "recommendations"],
    outputBoundary: "read-only structured findings projection",
    escalationRules: ["captain review before customer-facing use", "release-captain review before report or plan delivery influence"],
    forecastRisks: ["drift", "stale assumptions", "duplicate scope", "under-validation", "handoff confusion"],
    antiDriftChecks: ["preview gate", "no-store response", "validator coverage", "route-chain coverage"],
  });

  const finding = projectAdminCommandCenterAgentFinding({
    findingId: "admin-command-center-agent-findings-api-finding",
    mission,
    area: "agent-orchestration",
    agentRole: "validator",
    verifiedFacts: ["agent findings API is read-only and preview-gated"],
    sourceRefs: ["src/app/api/admin/command-center/agent-findings/route.ts"],
    assumptions: ["operator review remains private command-center only"],
    gaps: ["persistence and live agent submission remain future work"],
    risks: ["future expansion could confuse findings with approval authority"],
    recommendations: ["keep findings structured and require review before use"],
    forecastedFailureModes: ["future route accepts unstructured findings without validation"],
    escalationNeeds: ["release-captain review before report, plan, launch, provider, billing, or production-affecting use"],
  });

  const audit = projectAdminCommandCenterAuditEvent({
    eventId: "admin-command-center-agent-findings-api-audit",
    eventType: "agent-output-reviewed",
    occurredAt: "request-time-projection",
    actorRole: "release-captain",
    area: "agent-orchestration",
    action: "review-agent-output",
    access,
    summary: "Agent findings API returned read-only structured findings posture.",
    evidenceRefs: ["agent findings runtime", "mission brief runtime", "access runtime"],
    approvalRefs: ["command center preview gate", "release-captain review gate"],
  });

  return jsonNoStore(
    {
      ok: true,
      projection: "admin-command-center-agent-findings",
      accessMode: accessState.mode,
      access: {
        decision: access.decision,
        reasonCodes: access.reasonCodes,
        safeProjectionOnly: access.safeProjectionOnly,
        noStoreRequired: access.noStoreRequired,
      },
      finding: {
        ok: finding.ok,
        findingId: finding.findingId,
        missionId: finding.missionId,
        area: finding.area,
        agentRole: finding.agentRole,
        reasonCodes: finding.reasonCodes,
        verifiedFactCount: finding.verifiedFactCount,
        sourceRefCount: finding.sourceRefCount,
        assumptionCount: finding.assumptionCount,
        gapCount: finding.gapCount,
        riskCount: finding.riskCount,
        recommendationCount: finding.recommendationCount,
        forecastedFailureModeCount: finding.forecastedFailureModeCount,
        escalationNeedCount: finding.escalationNeedCount,
        structuredFindingAccepted: finding.structuredFindingAccepted,
        requiresCaptainReview: finding.requiresCaptainReview,
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
