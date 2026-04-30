import { PLATFORM_LAUNCH_READINESS_AUDIT_API_CONTRACT } from "@/lib/platform-launch-readiness-audit-api-contracts";
import { projectPlatformLaunchReadiness } from "@/lib/platform-launch-readiness-runtime";

const launchReadiness = projectPlatformLaunchReadiness({
  verifiedMain: true,
  validateRoutesWired: true,
  validateRoutesPassing: true,
  vercelGreen: true,
  productionSmokeConfigured: false,
  productionSmokePassed: false,
  ownerPaymentConfigReady: false,
  authProviderConfigured: false,
  serverOnlySecretsConfigured: false,
  rollbackPlanReady: false,
  auditPlanReady: false,
  publicEntryReady: true,
  freeScanReady: true,
  customerHandoffsReady: true,
  reportsReady: true,
  billingReady: true,
  supportAndCommandCenterReady: true,
  maintenanceReady: true,
  criticalLockActive: false,
});

const launchReadinessApiSurfaces = PLATFORM_LAUNCH_READINESS_AUDIT_API_CONTRACT.apiSurfaces;
const launchReadinessAuditEvents = PLATFORM_LAUNCH_READINESS_AUDIT_API_CONTRACT.requiredAuditEvents;

export function PlatformLaunchReadinessPanel() {
  return (
    <section className="mt-10 rounded-[2rem] border border-emerald-300/15 bg-emerald-300/[0.035] p-6 shadow-2xl shadow-emerald-950/20 md:p-8" aria-label="Platform launch readiness panel">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-200">Private launch readiness</p>
          <h2 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Operator-only release state, blockers, evidence gaps, hard launch locks, and safe API posture.
          </h2>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-slate-400">
          Private operator-only launch readiness projection. Not customer-facing. This panel uses the platform launch readiness runtime and aligns to command-center-only no-store API routes without raw payloads, raw evidence, raw billing data, secrets, prompts, internal notes, operator identities, or customer data.
        </p>
      </div>

      <div className="mt-7 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <article className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Decision</p>
          <h3 className="mt-3 text-3xl font-semibold tracking-tight text-white">{launchReadiness.decision}</h3>
          <p className="mt-4 text-sm leading-7 text-slate-300">{launchReadiness.safeSummary}</p>
        </article>
        <article className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Safe next actions</p>
          <div className="mt-4 grid gap-3">
            {launchReadiness.safeNextActions.map((action) => (
              <div key={action} className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm leading-6 text-slate-300">
                {action}
              </div>
            ))}
          </div>
        </article>
      </div>

      <div className="mt-7 grid gap-4 lg:grid-cols-3">
        <ListCard title="Ready groups" items={launchReadiness.readyGroups} tone="ready" />
        <ListCard title="Blocked groups" items={launchReadiness.blockedGroups} tone="blocked" />
        <ListCard title="Evidence gaps" items={launchReadiness.evidenceGaps} tone="gap" />
      </div>

      <article className="mt-7 rounded-3xl border border-emerald-200/10 bg-slate-950/60 p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-white">Command-center API posture</p>
            <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-400">
              These routes are operator-only, no-store, and aligned to generic denial. They must not be used by customers, public pages, emails, report vault, billing center, support pages, or crawlers.
            </p>
          </div>
          <span className="rounded-full border border-emerald-200/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-200">Closed by default</span>
        </div>
        <div className="mt-5 grid gap-3 lg:grid-cols-3">
          {launchReadinessApiSurfaces.map((surface) => (
            <div key={`${surface.method}-${surface.route}`} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{surface.method}</p>
                <span className="rounded-full border border-white/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">{surface.cache}</span>
              </div>
              <p className="mt-3 break-words text-sm font-semibold text-slate-200">{surface.route}</p>
              <p className="mt-3 text-sm leading-6 text-slate-400">{surface.purpose}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-200">{surface.authorization}</p>
            </div>
          ))}
        </div>
      </article>

      <article className="mt-7 rounded-3xl border border-white/10 bg-slate-950/60 p-5">
        <p className="text-sm font-semibold text-white">Audit event coverage</p>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-400">
          Launch readiness reviews must be append-only, role-based, and safe-projected. Audit events preserve release proof without exposing operator identity, raw evidence, provider payloads, tokens, keys, or private customer data.
        </p>
        <div className="mt-4 grid gap-2 md:grid-cols-2 lg:grid-cols-4">
          {launchReadinessAuditEvents.map((event) => (
            <div key={event} className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm leading-6 text-slate-300">
              {event}
            </div>
          ))}
        </div>
      </article>

      <article className="mt-7 rounded-3xl border border-red-200/10 bg-red-200/[0.03] p-5">
        <p className="text-sm font-semibold text-white">Hard launch locks</p>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-400">
          These locks must remain visible to operators and must not be softened into customer-facing promises.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {launchReadiness.hardLaunchLocks.map((lock) => (
            <div key={lock} className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm leading-6 text-slate-300">
              {lock}
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}

function ListCard({ title, items, tone }: { title: string; items: readonly string[]; tone: "ready" | "blocked" | "gap" }) {
  const label = tone === "ready" ? "Ready" : tone === "blocked" ? "Blocked" : "Gap";

  return (
    <article className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-white">{title}</p>
        <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">{label}</span>
      </div>
      <div className="mt-4 grid gap-2">
        {items.length ? items.map((item) => (
          <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm leading-6 text-slate-300">
            {item}
          </div>
        )) : (
          <div className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm leading-6 text-slate-400">
            No safe entries projected.
          </div>
        )}
      </div>
    </article>
  );
}
