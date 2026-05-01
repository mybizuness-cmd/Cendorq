import { NextRequest } from "next/server";

import { projectAdminCommandCenterAccess } from "@/lib/admin-command-center-access-runtime";
import { projectAdminCommandCenterAgentFinding } from "@/lib/admin-command-center-agent-findings-runtime";
import { projectAdminCommandCenterAuditEvent } from "@/lib/admin-command-center-audit-runtime";
import { projectAdminCommandCenterForecastEscalation } from "@/lib/admin-command-center-forecast-escalation-runtime";
import { projectAdminCommandCenterMissionBrief } from "@/lib/admin-command-center-mission-brief-runtime";
import { adminCommandCenterAccessDeniedPayload, resolveAdminCommandCenterSafeAccess } from "@/lib/admin-command-center-safe-access";
import { adminCommandCenterJsonNoStore, adminCommandCenterOptions } from "@/lib/admin-command-center-safe-response";

// Access gate is centralized in resolveAdminCommandCenterSafeAccess.
// Validation anchors: commandCenterPreviewHeaderName, resolveCommandCenterAccessState, Command center access is closed.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const forecastRiskChecks = [
  "drift-risk",
  "stale-assumption-risk",
  "duplicate-scope-risk",
  "overclaim-risk",
  "under-validation-risk",
  "customer-journey-confusion-risk",
  "private-material-exposure-risk",
  "production-readiness-blocker-risk",
  "handoff-misunderstanding-risk",
] as const;

export async function OPTIONS() {
  return adminCommandCenterOptions("admin-command-center-forecast-escalation");
}

export async function GET(request: NextRequest) {
  const accessState = resolveAdminCommandCenterSafeAccess(request);
  if (!accessState.allowed) {
    return adminCommandCenterJsonNoStore(adminCommandCenterAccessDeniedPayload("admin-command-center-forecast-escalation"), 403);
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
    missionId: "admin-command-center-forecast-escalation-api",
    area: "agent-orchestration",
    chiefAgentRole: "chief-agent-controller",
    missionScope: "Review forecast and escalation posture before expansion.",
    sourceBoundaries: ["forecast escalation runtime", "agent findings runtime", "mission brief runtime"],
    evidenceStandard: ["verified facts", "source references", "assumptions", "gaps", "risks", "recommendations"],
    outputBoundary: "read-only forecast escalation projection",
    escalationRules: ["owner review before expansion", "release-captain review before report or plan impact"],
    forecastRisks: ["drift", "stale assumptions", "duplicate scope", "under-validation", "handoff confusion"],
    antiDriftChecks: ["preview gate", "no-store response", "validator coverage", "route-chain coverage"],
  });

  const finding = projectAdminCommandCenterAgentFinding({
    findingId: "admin-command-center-forecast-escalation-api-finding",
    mission,
    area: "agent-orchestration",
    agentRole: "validator",
    verifiedFacts: ["forecast escalation API is read-only and preview-gated"],
    sourceRefs: ["src/app/api/admin/command-center/forecast-escalation/route.ts"],
    assumptions: ["operator review remains private command-center only"],
    gaps: ["live escalation persistence remains future work"],
    risks: ["future expansion could bypass review"],
    recommendations: ["keep expansion decisions visible and reviewed before implementation"],
    forecastedFailureModes: ["future route allows expansion without full review"],
    escalationNeeds: ["owner or release-captain review before impact"],
  });

  const forecast = projectAdminCommandCenterForecastEscalation({
    reviewId: "admin-command-center-forecast-escalation-api-review",
    finding,
    risksReviewed: forecastRiskChecks,
    mitigations: ["read-only projection", "owner review", "release-captain review", "route-chain validation"],
    escalationOwner: "owner",
    expansionRequested: true,
  });

  const audit = projectAdminCommandCenterAuditEvent({
    eventId: "admin-command-center-forecast-escalation-api-audit",
    eventType: "agent-output-reviewed",
    occurredAt: "request-time-projection",
    actorRole: "release-captain",
    area: "agent-orchestration",
    action: "review-agent-output",
    access,
    summary: "Forecast escalation API returned read-only expansion posture.",
    evidenceRefs: ["forecast escalation runtime", "agent findings runtime", "access runtime"],
    approvalRefs: ["command center preview gate", "owner review gate", "release-captain review gate"],
  });

  return adminCommandCenterJsonNoStore(
    {
      ok: true,
      projection: "admin-command-center-forecast-escalation",
      accessMode: accessState.mode,
      access: {
        decision: access.decision,
        reasonCodes: access.reasonCodes,
        safeProjectionOnly: access.safeProjectionOnly,
        noStoreRequired: access.noStoreRequired,
      },
      forecast: {
        ok: forecast.ok,
        reviewId: forecast.reviewId,
        findingId: forecast.findingId,
        escalationOwner: forecast.escalationOwner,
        decision: forecast.decision,
        reasonCodes: forecast.reasonCodes,
        riskCount: forecast.risksReviewed.length,
        mitigationCount: forecast.mitigationCount,
        expansionRequested: forecast.expansionRequested,
        captainReviewRequired: forecast.captainReviewRequired,
        highRiskEscalationRequired: forecast.highRiskEscalationRequired,
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
