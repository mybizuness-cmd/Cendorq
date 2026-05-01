import { NextRequest, NextResponse } from "next/server";

import { commandCenterPreviewHeaderName, resolveCommandCenterAccessState } from "@/lib/command-center/access";
import { projectAdminCommandCenterAccess } from "@/lib/admin-command-center-access-runtime";
import { projectAdminCommandCenterAuditEvent } from "@/lib/admin-command-center-audit-runtime";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const auditSeeds = [
  {
    eventId: "admin-audit-safe-read",
    eventType: "safe-read-reviewed" as const,
    area: "agent-orchestration",
    action: "view-safe-summary",
    summary: "Safe admin command-center summary was reviewed through a no-store projection.",
  },
  {
    eventId: "admin-audit-mission-brief",
    eventType: "mission-brief-reviewed" as const,
    area: "agent-orchestration",
    action: "approve-chief-agent-mission-brief",
    summary: "Chief-agent mission brief posture was reviewed before agent dispatch.",
  },
  {
    eventId: "admin-audit-report-release",
    eventType: "report-release-reviewed" as const,
    area: "reports",
    action: "approve-report-release",
    summary: "Report release posture requires release-captain review before customer-facing delivery.",
  },
] as const;

export async function OPTIONS() {
  return jsonNoStore({ ok: true, methods: ["GET", "OPTIONS"], projection: "admin-command-center-audit-trail" }, 200);
}

export async function GET(request: NextRequest) {
  const accessState = resolveCommandCenterAccessState(request.headers.get(commandCenterPreviewHeaderName()));
  if (!accessState.allowed) {
    return jsonNoStore({ ok: false, error: "Command center access is closed.", projection: "admin-command-center-audit-trail" }, 403);
  }

  const access = projectAdminCommandCenterAccess({
    role: "release-captain",
    area: "agent-orchestration",
    action: "review-audit-trail",
    sessionFresh: true,
    mutationRequested: false,
    auditContextPresent: true,
  });

  const events = auditSeeds.map((seed) =>
    projectAdminCommandCenterAuditEvent({
      eventId: seed.eventId,
      eventType: seed.eventType,
      occurredAt: "request-time-projection",
      actorRole: "release-captain",
      area: seed.area,
      action: seed.action,
      access,
      summary: seed.summary,
      evidenceRefs: ["admin access runtime", "admin audit runtime"],
      approvalRefs: ["command center preview gate"],
    }),
  );

  return jsonNoStore(
    {
      ok: true,
      projection: "admin-command-center-audit-trail",
      accessMode: accessState.mode,
      access: {
        decision: access.decision,
        reasonCodes: access.reasonCodes,
        safeProjectionOnly: access.safeProjectionOnly,
        noStoreRequired: access.noStoreRequired,
      },
      events: events.map((event) => ({
        eventId: event.eventId,
        eventType: event.eventType,
        occurredAt: event.occurredAt,
        actorRole: event.actorRole,
        area: event.area,
        action: event.action,
        decision: event.decision,
        reasonCodes: event.reasonCodes,
        summary: event.summary,
        evidenceRefCount: event.evidenceRefCount,
        approvalRefCount: event.approvalRefCount,
        immutable: event.immutable,
        safeProjectionOnly: event.safeProjectionOnly,
        noStoreRequired: event.noStoreRequired,
      })),
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
