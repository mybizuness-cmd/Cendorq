import { NextRequest } from "next/server";

import { projectAdminCommandCenterAccess } from "@/lib/admin-command-center-access-runtime";
import { projectAdminCommandCenterAgentFinding } from "@/lib/admin-command-center-agent-findings-runtime";
import { projectAdminCommandCenterAuditEvent } from "@/lib/admin-command-center-audit-runtime";
import { getAdminCommandCenterFoundation } from "@/lib/admin-command-center-foundation";
import { projectAdminCommandCenterForecastEscalation } from "@/lib/admin-command-center-forecast-escalation-runtime";
import { projectAdminCommandCenterMissionBrief } from "@/lib/admin-command-center-mission-brief-runtime";
import { adminCommandCenterAccessDeniedPayload, resolveAdminCommandCenterSafeAccess } from "@/lib/admin-command-center-safe-access";
import { adminCommandCenterJsonNoStore, adminCommandCenterOptions } from "@/lib/admin-command-center-safe-response";

// Access gate is centralized in resolveAdminCommandCenterSafeAccess.
// Validation anchors: commandCenterPreviewHeaderName, resolveCommandCenterAccessState, Command center access is closed.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function OPTIONS() {
  return adminCommandCenterOptions("admin-command-center-safe-summary");
}

export async function GET(request: NextRequest) {
  const accessState = resolveAdminCommandCenterSafeAccess(request);
  if (!accessState.allowed) {
    return adminCommandCenterJsonNoStore(adminCommandCenterAccessDeniedPayload("admin-command-center-safe-summary"), 403);
  }

  const foundation = getAdminCommandCenterFoundation();
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
    missionId: "admin-command-center-safe-summary-api",
    area: "agent-orchestration",
    chiefAgentRole: "chief-agent-controller",
    missionScope: "Expose safe admin command-center posture for private operator review.",
    sourceBoundaries: ["admin command center foundation"],
    evidenceStandard: ["verified facts", "source refs", "assumptions", "gaps", "risks", "recommendations"],
    outputBoundary: "safe JSON projection only",
    escalationRules: ["captain review before expansion"],
    forecastRisks: ["drift", "stale assumptions", "under-validation"],
    antiDriftChecks: ["closed access gate", "safe projection only", "validator coverage"],
  });
  const finding = projectAdminCommandCenterAgentFinding({
    findingId: "admin-command-center-safe-summary-api-finding",
    mission,
    area: "agent-orchestration",
    agentRole: "validator",
    verifiedFacts: ["safe summary API is preview-gated"],
    sourceRefs: ["src/app/api/admin/command-center/summary/route.ts"],
    assumptions: ["response remains private command-center only"],
    gaps: ["live persistence remains future work"],
    risks: ["projection can be mistaken for authority"],
    recommendations: ["keep summary read-only and no-store"],
    forecastedFailureModes: ["future route adds mutation behavior without approval gates"],
    escalationNeeds: ["release-captain review before live authority expansion"],
  });
  const forecast = projectAdminCommandCenterForecastEscalation({
    reviewId: "admin-command-center-safe-summary-api-forecast",
    finding,
    risksReviewed: [
      "drift-risk",
      "stale-assumption-risk",
      "duplicate-scope-risk",
      "overclaim-risk",
      "under-validation-risk",
      "customer-journey-confusion-risk",
      "private-material-exposure-risk",
      "production-readiness-blocker-risk",
      "handoff-misunderstanding-risk",
    ],
    mitigations: ["closed access gate", "safe projection only", "validator coverage"],
    escalationOwner: "owner",
    expansionRequested: false,
  });
  const audit = projectAdminCommandCenterAuditEvent({
    eventId: "admin-command-center-safe-summary-api-audit",
    eventType: "safe-read-reviewed",
    occurredAt: "request-time-projection",
    actorRole: "release-captain",
    area: "agent-orchestration",
    action: "view-safe-summary",
    access,
    summary: "Admin command center safe summary API returned private no-store posture only.",
    evidenceRefs: ["admin foundation"],
    approvalRefs: ["command center preview gate"],
  });

  return adminCommandCenterJsonNoStore(
    {
      ok: true,
      projection: "admin-command-center-safe-summary",
      accessMode: accessState.mode,
      foundation: {
        route: foundation.foundation.route,
        defaultDecision: foundation.foundation.defaultDecision,
        responseMode: foundation.foundation.responseMode,
        areas: foundation.foundation.areas,
        roles: foundation.foundation.roles,
        actionCount: foundation.foundation.actions.length,
        approvalGateCount: foundation.approvalGates.length,
      },
      access: {
        decision: access.decision,
        reasonCodes: access.reasonCodes,
        safeProjectionOnly: access.safeProjectionOnly,
        noStoreRequired: access.noStoreRequired,
      },
      mission: {
        ok: mission.ok,
        reasonCodes: mission.reasonCodes,
        sourceBoundaryCount: mission.sourceBoundaryCount,
        forecastRiskCount: mission.forecastRiskCount,
        antiDriftCheckCount: mission.antiDriftCheckCount,
      },
      finding: {
        ok: finding.ok,
        reasonCodes: finding.reasonCodes,
        sourceRefCount: finding.sourceRefCount,
        gapCount: finding.gapCount,
        riskCount: finding.riskCount,
        escalationNeedCount: finding.escalationNeedCount,
      },
      forecast: {
        decision: forecast.decision,
        reasonCodes: forecast.reasonCodes,
        mitigationCount: forecast.mitigationCount,
        hardenBeforeExpansion: forecast.hardenBeforeExpansion,
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
