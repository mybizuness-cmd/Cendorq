import { projectPlanRouting, type PlanRoutingInput } from "@/lib/plan-routing-runtime";

const routingCases: readonly (PlanRoutingInput & { label: string; intent: string })[] = [
  {
    label: "Free Scan stop",
    intent: "Linear customer stops after Free Scan and needs helpful, non-pressure follow-up.",
    customerIdHashPresent: true,
    verifiedEmail: true,
    welcomeSent: true,
    inboxConfirmationSent: true,
    inboxConfirmationCompleted: true,
    selectedPlan: "free-scan",
    activeEntitlements: ["free-scan"],
    routingMode: "linear-stop",
    evidenceBackedRecommendation: true,
  },
  {
    label: "Direct Build Fix",
    intent: "Customer starts with Optimization, so Cendorq keeps payment flowing while protecting Deep Review entitlement.",
    customerIdHashPresent: true,
    verifiedEmail: true,
    welcomeSent: true,
    inboxConfirmationSent: true,
    inboxConfirmationCompleted: true,
    selectedPlan: "build-fix",
    activeEntitlements: ["build-fix"],
    routingMode: "direct-purchase",
    evidenceBackedRecommendation: true,
    intakeOrApprovalIncomplete: true,
  },
  {
    label: "Direct Monthly",
    intent: "Customer starts with Monthly, so Cendorq runs approved scope and recommends Build Fix only when evidence supports it.",
    customerIdHashPresent: true,
    verifiedEmail: true,
    welcomeSent: true,
    inboxConfirmationSent: true,
    inboxConfirmationCompleted: true,
    selectedPlan: "ongoing-control",
    activeEntitlements: ["ongoing-control"],
    routingMode: "direct-purchase",
    evidenceBackedRecommendation: true,
  },
  {
    label: "Late Deep Review after Build Fix",
    intent: "Customer buys the skipped Full Scan after Optimization delivery and asks for alignment.",
    customerIdHashPresent: true,
    verifiedEmail: true,
    welcomeSent: true,
    inboxConfirmationSent: true,
    inboxConfirmationCompleted: true,
    selectedPlan: "deep-review",
    activeEntitlements: ["build-fix", "deep-review"],
    routingMode: "late-add-on",
    evidenceBackedRecommendation: true,
    deliveryApproved: true,
    priorDeliveredPlan: "build-fix",
    latePurchasedPlan: "deep-review",
    materialDirectionChanged: true,
  },
  {
    label: "First signup inbox confirmation",
    intent: "New customer receives one-time inbox handshake before future report, billing, and support email cadence.",
    customerIdHashPresent: true,
    verifiedEmail: true,
    welcomeSent: false,
    inboxConfirmationSent: false,
    inboxConfirmationCompleted: false,
    selectedPlan: "deep-review",
    activeEntitlements: ["deep-review"],
    routingMode: "linear-stop",
    evidenceBackedRecommendation: false,
  },
];

const projections = routingCases.map((item) => ({ ...item, projection: projectPlanRouting(item) }));

export function PlanRoutingRuntimePanel() {
  return (
    <section className="relative mt-10 overflow-hidden rounded-[2.25rem] border border-cyan-300/15 bg-cyan-300/[0.035] p-6 shadow-2xl shadow-cyan-950/20 md:p-8" aria-label="Plan routing runtime panel">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(103,232,249,0.13),transparent_34%),radial-gradient(circle_at_85%_8%,rgba(167,139,250,0.12),transparent_32%)]" />
      <div className="relative z-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100">Plan routing runtime</p>
            <h2 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Operator visibility for plan stops, direct purchases, late add-ons, warning emails, and one-time inbox confirmation.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-slate-400">
            This private panel projects what the runtime would allow, suppress, or reconcile before any customer-facing email, dashboard reminder, report-vault change, or scope promise is released.
          </p>
        </div>

        <div className="mt-7 grid gap-4 lg:grid-cols-4">
          <Metric label="Cases" value={String(projections.length)} />
          <Metric label="Warning emails allowed" value={String(projections.filter((item) => item.projection.warningEmailAllowed).length)} />
          <Metric label="Inbox confirmations allowed" value={String(projections.filter((item) => item.projection.inboxConfirmationAllowed).length)} />
          <Metric label="Reconciliations" value={String(projections.filter((item) => item.projection.reconciliationOutcome).length)} />
        </div>

        <article className="mt-7 rounded-3xl border border-white/10 bg-slate-950/60 p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-white">Decision matrix</p>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
                Runtime projections expose the customer-owned state, included and excluded scope, allowed reminder posture, reconciliation outcome, and inbox confirmation gate without showing raw provider payloads or internal notes.
              </p>
            </div>
            <span className="rounded-full border border-cyan-200/20 bg-cyan-200/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-100">safe projection</span>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {projections.map(({ label, intent, projection }) => (
              <div key={label} className="rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-100">{label}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">{intent}</p>
                  </div>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">{projection.routingMode}</span>
                </div>

                <div className="mt-4 grid gap-2 sm:grid-cols-3">
                  <StatusTile label="owned" ok={projection.customerOwnedProjectionReady} />
                  <StatusTile label="warning email" ok={projection.warningEmailAllowed} />
                  <StatusTile label="inbox confirm" ok={projection.inboxConfirmationAllowed} />
                </div>

                <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Safe customer language</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{projection.safeCustomerLanguage}</p>
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <MiniList title="Included" items={projection.includedScope} />
                  <MiniList title="Not included" items={projection.notIncludedScope} />
                  <MiniList title="Warning suppressions" items={projection.warningEmailSuppressionReasons} />
                  <MiniList title="Inbox suppressions" items={projection.inboxConfirmationSuppressionReasons} />
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <InfoCard title="Next best plan" value={projection.nextBestPlan} />
                  <InfoCard title="Reconciliation" value={projection.reconciliationCustomerMessage ?? projection.reconciliationOutcome ?? "none"} />
                </div>

                {projection.blockedPatterns.length ? <MiniList title="Blocked patterns" items={projection.blockedPatterns} /> : null}
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-3 text-2xl font-semibold tracking-tight text-white">{value}</p>
    </article>
  );
}

function StatusTile({ label, ok }: { label: string; ok: boolean }) {
  return (
    <div className={`rounded-2xl border px-3 py-2 ${ok ? "border-emerald-200/20 bg-emerald-200/10" : "border-amber-200/20 bg-amber-200/10"}`}>
      <p className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${ok ? "text-emerald-100" : "text-amber-100"}`}>{label}</p>
      <p className="mt-1 text-xs text-slate-400">{ok ? "allowed" : "held"}</p>
    </div>
  );
}

function MiniList({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div className="mt-3 rounded-2xl border border-white/10 bg-slate-950/60 p-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{title}</p>
      <div className="mt-2 grid gap-1 text-xs leading-5 text-slate-400">
        {items.length ? items.slice(0, 5).map((item) => <p key={item}>• {item}</p>) : <p>clear</p>}
      </div>
    </div>
  );
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{title}</p>
      <p className="mt-2 text-xs leading-5 text-slate-300">{value}</p>
    </div>
  );
}
