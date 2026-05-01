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

export function CompletePlanFulfillmentPanel() {
  return (
    <section className="mt-10 rounded-[2rem] border border-violet-300/15 bg-violet-300/[0.035] p-6 shadow-2xl shadow-violet-950/20 md:p-8" aria-label="Complete plan fulfillment panel">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-200">Complete plan fulfillment</p>
          <h2 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
            A-to-Z plan delivery posture: value, education, boundaries, conversion, stages, artifacts, and approval.
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

      <article className="mt-7 rounded-3xl border border-white/10 bg-slate-950/60 p-5">
        <p className="text-sm font-semibold text-white">Fulfillment projections</p>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          These projections are not customer-facing approvals. They show which education, value, boundary, conversion, stage, artifact, and release-captain gates still block plan delivery.
        </p>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {fulfillment.projections.map((projection) => (
            <div key={projection.planKey} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-semibold text-slate-100">{projection.planName}</p>
                <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">{projection.stageState}</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">{projection.educationalCustomerExplanation}</p>
              <p className="mt-3 text-sm leading-6 text-slate-400">{projection.valueBoundaryExplanation}</p>

              <div className="mt-4 grid gap-2 text-xs leading-5 text-slate-400">
                <p>Stage progress: {projection.completedStageCount}/{projection.totalStageCount}</p>
                <p>Next action: {projection.nextAction}</p>
                <p>Customer education reviewed: {projection.customerEducationReviewed ? "yes" : "no"}</p>
                <p>Value above price reviewed: {projection.valueExceedsPriceReviewed ? "yes" : "no"}</p>
                <p>Plan boundary protected: {projection.planBoundaryProtected ? "yes" : "no"}</p>
                <p>Conversion method approved: {projection.conversionMethodApproved ? "yes" : "no"}</p>
                <p>Release-captain approved: {projection.releaseCaptainApproved ? "yes" : "no"}</p>
                <p>Customer-facing delivery allowed: {projection.customerFacingDeliveryAllowed ? "yes" : "no"}</p>
                <p>Upgrade / retention allowed: {projection.upgradeOrRetentionAllowed ? "yes" : "no"}</p>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <MiniList title="Missing stages" items={projection.missingStages} />
                <MiniList title="Missing artifacts" items={projection.missingArtifacts} />
                <MiniList title="Owners" items={projection.requiredOwners} />
                <MiniList title="Blocked patterns" items={projection.blockedPatterns} />
              </div>
            </div>
          ))}
        </div>
      </article>
    </section>
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
