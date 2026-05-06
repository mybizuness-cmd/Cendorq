import { projectPlanDeliveryRuntime } from "@/lib/plan-delivery-orchestration-runtime";
import { projectPlanValueFulfillment } from "@/lib/plan-value-fulfillment-boundaries";

const planDelivery = projectPlanDeliveryRuntime([
  {
    planKey: "free-scan",
    state: "approval-needed",
    completedIntake: ["guided free-check form", "business basics", "market context", "offer and buyer", "problem pressure"],
    completedEvidence: ["customer-provided context", "owned business surface review"],
    completedDeliverables: ["free scan report", "dashboard handoff", "notification handoff", "report vault handoff"],
    completedEmails: ["scan received"],
    completedFollowUps: [],
    releaseCaptainReviewed: false,
    customerOutputApproved: false,
    customerOwnershipVerified: true,
    safeSummary: "Free Scan has enough intake to prepare a first-read report, but customer-facing language still needs release-captain review and safe evidence boundaries.",
  },
  {
    planKey: "deep-review",
    state: "intake-needed",
    completedIntake: ["payment confirmation", "verified customer ownership", "free scan handoff"],
    completedEvidence: ["free scan evidence"],
    completedDeliverables: [],
    completedEmails: ["purchase received"],
    completedFollowUps: [],
    customerPaymentConfirmed: true,
    customerOwnershipVerified: true,
    releaseCaptainReviewed: false,
    customerOutputApproved: false,
    safeSummary: "Deep Review needs expanded diagnostic intake before stronger analysis, report release, or plan-fit recommendation.",
  },
  {
    planKey: "build-fix",
    state: "blocked",
    completedIntake: ["payment confirmation"],
    completedEvidence: [],
    completedDeliverables: [],
    completedEmails: ["purchase received"],
    completedFollowUps: [],
    customerPaymentConfirmed: true,
    customerOwnershipVerified: false,
    releaseCaptainReviewed: false,
    customerOutputApproved: false,
    safeSummary: "Build Fix remains blocked until ownership, scope, assets, approval contact, and evidence-backed implementation path are confirmed.",
  },
  {
    planKey: "ongoing-control",
    state: "evidence-needed",
    completedIntake: ["subscription confirmation", "monitoring scope", "business priorities", "report cadence"],
    completedEvidence: ["previous reports"],
    completedDeliverables: [],
    completedEmails: ["subscription active"],
    completedFollowUps: ["monthly check-in"],
    customerPaymentConfirmed: true,
    customerOwnershipVerified: true,
    releaseCaptainReviewed: false,
    customerOutputApproved: false,
    safeSummary: "Ongoing Control needs monitoring evidence and approval gates before recommendations or controlled updates can become customer-facing.",
  },
]);

const fulfillmentByPlan = {
  "free-scan": projectPlanValueFulfillment("free-scan"),
  "deep-review": projectPlanValueFulfillment("deep-review"),
  "build-fix": projectPlanValueFulfillment("build-fix"),
  "ongoing-control": projectPlanValueFulfillment("ongoing-control"),
} as const;

export function PlanDeliveryOrchestrationPanel() {
  return (
    <section className="mt-10 rounded-[2rem] border border-amber-300/15 bg-amber-300/[0.035] p-6 shadow-2xl shadow-amber-950/20 md:p-8" aria-label="Plan delivery orchestration panel">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-200">Plan delivery orchestration</p>
          <h2 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Private lifecycle and fulfillment-boundary posture for every plan.
          </h2>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-slate-400">
          Operator-only view of intake, evidence, deliverables, lifecycle status, allowed outputs, blocked overlaps, required delivery checks, approval gates, and escalation rules. Delivery is blocked until evidence, ownership, release-captain review, customer-output approval, and fulfillment-boundary checks clear.
        </p>
      </div>

      <div className="mt-7 grid gap-4 lg:grid-cols-4">
        <MetricCard label="Plans" value={String(planDelivery.planCount)} />
        <MetricCard label="Ready" value={String(planDelivery.readyCount)} />
        <MetricCard label="Blocked" value={String(planDelivery.blockedCount)} />
        <MetricCard label="Review required" value={String(planDelivery.reviewRequiredCount)} />
      </div>

      <article className="mt-7 rounded-3xl border border-white/10 bg-slate-950/60 p-5">
        <p className="text-sm font-semibold text-white">Plan lifecycle projections</p>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          These projections do not approve customer-facing claims, paid recommendations, report release, or production-impacting changes. They show what remains missing before each plan can safely deliver value without crossing into another plan.
        </p>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {planDelivery.projections.map((projection) => {
            const fulfillment = fulfillmentByPlan[projection.planKey];

            return (
              <div key={projection.planKey} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-100">{projection.planName}</p>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">{projection.state}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-300">{projection.safeSummary}</p>
                <p className="mt-3 rounded-2xl border border-amber-300/15 bg-amber-300/10 p-3 text-xs leading-5 text-amber-50">{fulfillment.customerFacingSummary}</p>
                <div className="mt-4 grid gap-2 text-xs leading-5 text-slate-400">
                  <p>Next action: {projection.nextAction}</p>
                  <p>Follow-up: {projection.followUpAction}</p>
                  <p>Approval gate: {projection.approvalGate}</p>
                  <p>Fulfillment gate: {fulfillment.approvalGate}</p>
                  <p>Escalation rule: {fulfillment.escalationRule}</p>
                  <p>Release-captain review: {projection.releaseCaptainReviewRequired ? "required" : "cleared"}</p>
                  <p>Customer output approved: {projection.customerOutputApproved ? "yes" : "no"}</p>
                  <p>Delivery allowed: {projection.deliveryAllowed ? "yes" : "no"}</p>
                  <p>Paid recommendation allowed: {projection.paidRecommendationAllowed ? "yes" : "no"}</p>
                </div>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <MiniList title="Allowed deliverables" items={fulfillment.allowedDeliverables} />
                  <MiniList title="Blocked overlap" items={fulfillment.blockedOverlap} />
                  <MiniList title="Required checks" items={fulfillment.requiredBeforeDelivery} />
                  <MiniList title="Missing intake" items={projection.missingIntake} />
                  <MiniList title="Missing evidence" items={projection.missingEvidence} />
                  <MiniList title="Missing deliverables" items={projection.missingDeliverables} />
                  <MiniList title="Blocked patterns" items={projection.blockedPatterns} />
                  <MiniList title="Excluded value" items={fulfillment.excludedValue} />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {projection.requiredAgents.map((agent) => (
                    <span key={agent} className="rounded-full border border-white/10 bg-slate-950/60 px-3 py-1 text-[11px] font-semibold text-slate-400">{agent}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </article>

      <p className="sr-only">
        Command center fulfillment boundaries. Allowed deliverables. Blocked overlap. Required checks. Fulfillment gate. Customer-facing summary. Escalation rule. Free Scan first visible signal only. Deep Review diagnosis only. Build Fix scoped implementation only. Ongoing Control recurring monitoring only. No cross-plan deliverable leakage.
      </p>
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
        {items.length ? items.slice(0, 4).map((item) => <p key={item}>• {item}</p>) : <p>clear</p>}
      </div>
    </div>
  );
}
