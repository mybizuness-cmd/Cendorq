import { projectCompletePlanFulfillment } from "@/lib/complete-plan-fulfillment-runtime";

const fulfillment = projectCompletePlanFulfillment([
  {
    planKey: "free-scan",
    completedStages: [
      "customer confirmation",
      "safe intake",
      "evidence collection",
      "truth separation",
      "agent work assignment",
      "production work",
      "quality review",
    ],
    completedArtifacts: [
      "scan received confirmation",
      "free scan intake record",
      "initial owned-surface and safe public signal notes",
      "first-read facts, assumptions, limitations, and next actions",
      "free scan report draft",
      "safe free-report review",
    ],
    customerEducationReviewed: true,
    valueExceedsPriceReviewed: true,
    planBoundaryProtected: true,
    conversionMethodApproved: false,
    releaseCaptainApproved: false,
    safeSummary: "Free Scan is nearly delivery-ready but still requires release-captain approval and conversion-method review before customer-facing follow-up.",
  },
  {
    planKey: "deep-review",
    completedStages: ["customer confirmation", "safe intake", "evidence collection", "truth separation"],
    completedArtifacts: ["purchase received confirmation", "expanded diagnostic questionnaire", "expanded evidence packet", "fact, claim, inference, limitation, and conflict map"],
    customerEducationReviewed: false,
    valueExceedsPriceReviewed: false,
    planBoundaryProtected: true,
    conversionMethodApproved: false,
    releaseCaptainApproved: false,
    safeSummary: "Deep Review needs report production, education review, value review, and release approval before stronger diagnosis delivery.",
  },
  {
    planKey: "build-fix",
    completedStages: ["customer confirmation", "safe intake"],
    completedArtifacts: ["optimization purchase confirmation", "scope, assets, and approval checklist"],
    customerEducationReviewed: false,
    valueExceedsPriceReviewed: false,
    planBoundaryProtected: false,
    conversionMethodApproved: false,
    releaseCaptainApproved: false,
    safeSummary: "Build Fix needs scope evidence, implementation rationale, work queue, quality review, and boundary protection before delivery.",
  },
  {
    planKey: "ongoing-control",
    completedStages: ["customer confirmation", "safe intake", "evidence collection"],
    completedArtifacts: ["subscription active confirmation", "monitoring scope and cadence", "monthly evidence and change signal packet"],
    customerEducationReviewed: false,
    valueExceedsPriceReviewed: false,
    planBoundaryProtected: true,
    conversionMethodApproved: false,
    releaseCaptainApproved: false,
    safeSummary: "Ongoing Control needs forecast explanation, recurring value review, conversion method approval, and release-captain approval before customer-facing monthly delivery.",
  },
]);

const visualStages = ["intake", "evidence", "education", "value", "boundary", "conversion", "approval", "delivery"] as const;

export function CompletePlanFulfillmentPanel() {
  return (
    <section className="relative mt-10 overflow-hidden rounded-[2.25rem] border border-violet-300/15 bg-violet-300/[0.035] p-6 shadow-2xl shadow-violet-950/20 md:p-8" aria-label="Complete plan fulfillment panel">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(167,139,250,0.16),transparent_35%),radial-gradient(circle_at_88%_10%,rgba(56,189,248,0.10),transparent_34%)]" />
      <div className="relative z-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-200">Complete plan fulfillment</p>
            <h2 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
              A-to-Z plan delivery cockpit: value, education, boundaries, conversion, stages, artifacts, and approval.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-slate-400">
            Private operator view for ensuring each plan delivers more value than its price, teaches the customer clearly, protects higher-tier revenue streams, and only converts through evidence-led plan fit.
          </p>
        </div>

        <div className="mt-7 grid gap-4 lg:grid-cols-4">
          <MetricCard label="Plans" value={String(fulfillment.planCount)} />
          <MetricCard label="Delivery allowed" value={String(fulfillment.deliveryAllowedCount)} />
          <MetricCard label="Blocked" value={String(fulfillment.blockedCount)} />
          <MetricCard label="Review required" value={String(fulfillment.reviewRequiredCount)} />
        </div>

        <VisualMatrixOverview />

        <article className="mt-7 rounded-3xl border border-white/10 bg-slate-950/60 p-5">
          <p className="text-sm font-semibold text-white">Fulfillment projections</p>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            These projections are not customer-facing approvals. They show which education, value, boundary, conversion, stage, artifact, and release-captain gates still block plan delivery.
          </p>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {fulfillment.projections.map((projection) => {
              const stagePercent = Math.round((projection.completedStageCount / projection.totalStageCount) * 100);
              const reviewGates = [
                { label: "Education", done: projection.customerEducationReviewed },
                { label: "Value", done: projection.valueExceedsPriceReviewed },
                { label: "Boundary", done: projection.planBoundaryProtected },
                { label: "Conversion", done: projection.conversionMethodApproved },
                { label: "Captain", done: projection.releaseCaptainApproved },
                { label: "Delivery", done: projection.customerFacingDeliveryAllowed },
              ];

              return (
                <div key={projection.planKey} className="rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-100">{projection.planName}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-500">{projection.planKey}</p>
                    </div>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">{projection.stageState}</span>
                  </div>

                  <ProgressRail label="Stage completion" percent={stagePercent} detail={`${projection.completedStageCount}/${projection.totalStageCount} stages`} />
                  <GateGrid gates={reviewGates} />

                  <div className="mt-5 grid gap-3 md:grid-cols-2">
                    <VisualPostureCard title="Customer education" value={projection.customerEducationReviewed ? "reviewed" : "needs review"} copy={projection.educationalCustomerExplanation} />
                    <VisualPostureCard title="Value and boundary" value={projection.valueExceedsPriceReviewed && projection.planBoundaryProtected ? "protected" : "not cleared"} copy={projection.valueBoundaryExplanation} />
                  </div>

                  <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Next move</p>
                        <p className="mt-2 text-sm leading-6 text-slate-300">{projection.nextAction}</p>
                      </div>
                      <div className="grid min-w-[9rem] gap-2 text-xs font-semibold uppercase tracking-[0.12em]">
                        <StatusPill label="delivery" ok={projection.customerFacingDeliveryAllowed} />
                        <StatusPill label="upgrade" ok={projection.upgradeOrRetentionAllowed} />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <MiniList title="Missing stages" items={projection.missingStages} />
                    <MiniList title="Missing artifacts" items={projection.missingArtifacts} />
                    <MiniList title="Owners" items={projection.requiredOwners} />
                    <MiniList title="Blocked patterns" items={projection.blockedPatterns} />
                  </div>
                </div>
              );
            })}
          </div>
        </article>
      </div>
    </section>
  );
}

function VisualMatrixOverview() {
  return (
    <article className="mt-7 rounded-3xl border border-white/10 bg-slate-950/50 p-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-white">A-to-Z visual fulfillment map</p>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
            The matrix makes the hidden delivery system visible: every plan must move from safe intake to evidence, education, value proof, plan-boundary protection, conversion review, release-captain approval, and delivery.
          </p>
        </div>
        <span className="rounded-full border border-violet-200/20 bg-violet-200/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-violet-100">operator visual</span>
      </div>
      <div className="mt-5 grid gap-3 lg:grid-cols-8">
        {visualStages.map((stage, index) => (
          <div key={stage} className="rounded-2xl border border-white/10 bg-white/[0.035] p-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">0{index + 1}</p>
            <p className="mt-2 text-sm font-semibold capitalize text-slate-100">{stage}</p>
          </div>
        ))}
      </div>
    </article>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-3 text-2xl font-semibold tracking-tight text-white">{value}</p>
    </article>
  );
}

function ProgressRail({ label, percent, detail }: { label: string; percent: number; detail: string }) {
  return (
    <div className="mt-5">
      <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
        <span>{label}</span>
        <span>{detail}</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full border border-white/10 bg-slate-950/80">
        <div className="h-full rounded-full bg-gradient-to-r from-violet-300 via-sky-300 to-emerald-300" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

function GateGrid({ gates }: { gates: readonly { label: string; done: boolean }[] }) {
  return (
    <div className="mt-4 grid gap-2 sm:grid-cols-3">
      {gates.map((gate) => (
        <div key={gate.label} className={`rounded-2xl border px-3 py-2 ${gate.done ? "border-emerald-200/20 bg-emerald-200/10" : "border-amber-200/20 bg-amber-200/10"}`}>
          <p className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${gate.done ? "text-emerald-100" : "text-amber-100"}`}>{gate.label}</p>
          <p className="mt-1 text-xs text-slate-400">{gate.done ? "cleared" : "waiting"}</p>
        </div>
      ))}
    </div>
  );
}

function VisualPostureCard({ title, value, copy }: { title: string; value: string; copy: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{title}</p>
        <span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">{value}</span>
      </div>
      <p className="mt-3 line-clamp-4 text-sm leading-6 text-slate-300">{copy}</p>
    </div>
  );
}

function StatusPill({ label, ok }: { label: string; ok: boolean }) {
  return <span className={`rounded-full border px-3 py-1 text-center ${ok ? "border-emerald-200/20 bg-emerald-200/10 text-emerald-100" : "border-rose-200/20 bg-rose-200/10 text-rose-100"}`}>{label}: {ok ? "yes" : "no"}</span>;
}

function MiniList({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{title}</p>
      <div className="mt-2 grid gap-1 text-xs leading-5 text-slate-400">
        {items.length ? items.slice(0, 5).map((item) => <p key={item}>• {item}</p>) : <p>clear</p>}
      </div>
    </div>
  );
}
