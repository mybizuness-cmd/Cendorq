import { projectAdminCommandCenterAccess } from "@/lib/admin-command-center-access-runtime";
import { projectAdminCommandCenterAgentFinding } from "@/lib/admin-command-center-agent-findings-runtime";
import { projectAdminCommandCenterAuditEvent } from "@/lib/admin-command-center-audit-runtime";
import { getAdminCommandCenterFoundation } from "@/lib/admin-command-center-foundation";
import { projectAdminCommandCenterForecastEscalation } from "@/lib/admin-command-center-forecast-escalation-runtime";
import { projectAdminCommandCenterMissionBrief } from "@/lib/admin-command-center-mission-brief-runtime";
import {
  getAdminCommandCenterExpectedSafeProjectionLinkCount,
  getAdminCommandCenterSafeProjectionLinkCount,
  getAdminCommandCenterSafeProjectionLinks,
  getAdminCommandCenterSafeProjectionLinksComplete,
  getAdminCommandCenterSafeProjectionRouteContract,
  getAdminCommandCenterSafeProjectionRouteContractSummary,
} from "@/lib/admin-command-center-safe-projection-registry";

export function AdminCommandCenterControlPanel() {
  const foundation = getAdminCommandCenterFoundation();
  const projectionLinks = getAdminCommandCenterSafeProjectionLinks();
  const routeContract = getAdminCommandCenterSafeProjectionRouteContract();
  const routeContractSummary = getAdminCommandCenterSafeProjectionRouteContractSummary();
  const projectionLinkCount = getAdminCommandCenterSafeProjectionLinkCount();
  const expectedProjectionLinkCount = getAdminCommandCenterExpectedSafeProjectionLinkCount();
  const projectionLinksComplete = getAdminCommandCenterSafeProjectionLinksComplete();
  const access = projectAdminCommandCenterAccess({
    role: "release-captain",
    area: "agent-orchestration",
    action: "approve-chief-agent-mission-brief",
    sessionFresh: true,
    mutationRequested: true,
    auditContextPresent: true,
    releaseCaptainApprovalPresent: true,
    missionBriefApproved: true,
    structuredFindingsPresent: true,
    forecastReviewPresent: true,
  });
  const mission = projectAdminCommandCenterMissionBrief({
    missionId: "admin-control-panel-chief-agent-brief",
    area: "agent-orchestration",
    chiefAgentRole: "chief-agent-controller",
    missionScope: "Review command-center control chain before expansion.",
    sourceBoundaries: ["admin command center runtime", "captain operating core", "customer support operator access"],
    evidenceStandard: ["verified facts", "source refs", "assumptions", "gaps", "risks", "recommendations"],
    outputBoundary: "private admin command-center projection only",
    escalationRules: ["captain review before customer-facing output", "owner review for provider or launch readiness changes"],
    forecastRisks: ["drift", "stale assumptions", "under-validation", "handoff confusion"],
    antiDriftChecks: ["validator coverage", "Vercel green before merge", "fresh-main branch loop"],
  });
  const finding = projectAdminCommandCenterAgentFinding({
    findingId: "admin-control-panel-structured-finding",
    mission,
    area: "agent-orchestration",
    agentRole: "validator",
    verifiedFacts: ["admin access runtime is deny-by-default"],
    sourceRefs: ["src/lib/admin-command-center-access-runtime.ts"],
    assumptions: ["operator UI remains private command-center only"],
    gaps: ["live persistence remains future work"],
    risks: ["operator confusion if control gates are not visible"],
    recommendations: ["show gates, denials, audit posture, and escalation status together"],
    forecastedFailureModes: ["future admin UI bypasses mission brief or finding review"],
    escalationNeeds: ["release-captain review before production-affecting expansion"],
  });
  const forecast = projectAdminCommandCenterForecastEscalation({
    reviewId: "admin-control-panel-forecast",
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
    mitigations: ["display controls before expansion", "keep reviewed mutations gated", "preserve no-store posture"],
    escalationOwner: "owner",
    expansionRequested: true,
  });
  const audit = projectAdminCommandCenterAuditEvent({
    eventId: "admin-control-panel-audit-projection",
    eventType: "mission-brief-reviewed",
    occurredAt: "build-time-projection",
    actorRole: "release-captain",
    area: "agent-orchestration",
    action: "approve-chief-agent-mission-brief",
    access,
    summary: "Admin control panel renders safe command chain posture without granting direct authority.",
    evidenceRefs: ["admin access runtime", "mission brief runtime", "agent findings runtime", "forecast escalation runtime"],
    approvalRefs: ["release-captain review gate", "owner escalation gate"],
  });

  return (
    <section className="mt-10 rounded-[2rem] border border-cyan-300/15 bg-cyan-300/[0.035] p-6 shadow-2xl shadow-cyan-950/20 md:p-8" aria-label="Admin command center control panel">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">Admin command center</p>
          <h2 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Deny-by-default cockpit for access, audit, mission briefs, structured findings, and forecast escalation.
          </h2>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-slate-400">
          Private operator visibility only. The panel shows the hardened control chain and safe projections; it does not grant live provider, billing, report-release, launch, or production authority by itself.
        </p>
      </div>

      <div className="mt-7 grid gap-4 lg:grid-cols-4">
        <MetricCard label="Admin areas" value={String(foundation.foundation.areas.length)} />
        <MetricCard label="Approval gates" value={String(foundation.approvalGates.length)} />
        <MetricCard label="Access decision" value={access.decision} />
        <MetricCard label="Forecast decision" value={forecast.decision} />
      </div>

      <div className="mt-7 grid gap-4 lg:grid-cols-3">
        <ControlCard title="Access posture" items={[`Default: ${foundation.foundation.defaultDecision}`, `Response: ${foundation.foundation.responseMode}`, `Audit required: ${String(access.auditRequired)}`, `Safe projection only: ${String(access.safeProjectionOnly)}`]} />
        <ControlCard title="Chief-agent brief" items={[`Mission ok: ${String(mission.ok)}`, `Source boundaries: ${mission.sourceBoundaryCount}`, `Forecast risks: ${mission.forecastRiskCount}`, `Anti-drift checks: ${mission.antiDriftCheckCount}`]} />
        <ControlCard title="Structured findings" items={[`Accepted: ${String(finding.structuredFindingAccepted)}`, `Source refs: ${finding.sourceRefCount}`, `Gaps: ${finding.gapCount}`, `Escalations: ${finding.escalationNeedCount}`]} />
      </div>

      <article className="mt-7 rounded-3xl border border-white/10 bg-slate-950/60 p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-white">Safe projection links</p>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
              These endpoints are preview-gated, no-store, read-only review surfaces. They expose posture, methods, helper requirements, and references, not live action authority.
            </p>
          </div>
          <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100">read-only</span>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-4 xl:grid-cols-8">
          <MetricCard label="Projection links" value={String(projectionLinkCount)} />
          <MetricCard label="Expected links" value={String(expectedProjectionLinkCount)} />
          <MetricCard label="Links complete" value={String(projectionLinksComplete)} />
          <MetricCard label="Contract methods" value={routeContract.methods.join(" / ")} />
          <MetricCard label="Method count" value={String(routeContractSummary.methodCount)} />
          <MetricCard label="Safe access helper" value={String(routeContractSummary.requiresSafeAccessHelper)} />
          <MetricCard label="Safe response helper" value={String(routeContractSummary.requiresSafeResponseHelper)} />
          <MetricCard label="All helpers required" value={String(routeContractSummary.allHelpersRequired)} />
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {projectionLinks.map((link) => (
            <a key={link.href} href={link.href} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-sm text-slate-300 transition hover:border-cyan-300/30 hover:bg-cyan-300/[0.06]">
              <span className="font-semibold text-white">{link.label}</span>
              <span className="mt-2 block break-all text-xs text-cyan-200">{link.href}</span>
              <span className="mt-3 block text-xs leading-5 text-slate-400">{link.purpose}</span>
              <span className="mt-3 block rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-slate-300">
                Methods: {link.methods.join(" / ")}
              </span>
              <span className="mt-2 block text-[0.68rem] leading-5 text-slate-500">
                Helpers: access {String(link.requiresSafeAccessHelper)} · response {String(link.requiresSafeResponseHelper)} · options {String(link.requiresSafeOptionsHelper)}
              </span>
            </a>
          ))}
        </div>
      </article>

      <article className="mt-7 rounded-3xl border border-white/10 bg-slate-950/60 p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-white">Forecast and escalation</p>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
              Expansion is allowed only after risk coverage, mitigation, and escalation ownership are visible. High-risk cases escalate to owner or release-captain review before expansion.
            </p>
          </div>
          <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100">{forecast.decision}</span>
        </div>
        <div className="mt-5 grid gap-3 lg:grid-cols-3">
          <MetricCard label="Risks reviewed" value={String(forecast.risksReviewed.length)} />
          <MetricCard label="Mitigations" value={String(forecast.mitigationCount)} />
          <MetricCard label="Harden before expansion" value={String(forecast.hardenBeforeExpansion)} />
        </div>
      </article>

      <article className="mt-7 rounded-3xl border border-white/10 bg-slate-950/60 p-5">
        <p className="text-sm font-semibold text-white">Safe audit projection</p>
        <div className="mt-5 grid gap-3 lg:grid-cols-4">
          <MetricCard label="Event" value={audit.eventType} />
          <MetricCard label="Decision" value={audit.decision} />
          <MetricCard label="Evidence refs" value={String(audit.evidenceRefCount)} />
          <MetricCard label="Immutable" value={String(audit.immutable)} />
        </div>
      </article>
    </section>
  );
}

function ControlCard({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
      <p className="text-sm font-semibold text-white">{title}</p>
      <div className="mt-4 grid gap-2">
        {items.map((item) => (
          <p key={item} className="rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2 text-xs leading-5 text-slate-400">{item}</p>
        ))}
      </div>
    </article>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-3 break-words text-2xl font-semibold tracking-tight text-white">{value}</p>
    </article>
  );
}
