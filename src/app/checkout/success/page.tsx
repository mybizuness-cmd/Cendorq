import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { getCendorqRevenueStage } from "@/lib/cendorq-revenue-operating-system";
import { getPlanValueDelivery, PLAN_VALUE_SEPARATION_RULES } from "@/lib/plan-value-delivery-architecture";
import {
  CENDORQ_CHECKOUT_METADATA_KEYS,
  CENDORQ_CHECKOUT_ORCHESTRATION,
  CENDORQ_PAID_PLAN_KEYS,
  CENDORQ_POST_PAYMENT_EMAILS,
  getPaidCendorqPlanPrice,
  type CendorqPaidPlanKey,
} from "@/lib/pricing-checkout-orchestration";

export const metadata = buildMetadata({
  title: "Command activated | Cendorq",
  description: "Your Cendorq command depth is unlocked. Activate Diagnose, Fix, or Control from the protected dashboard.",
  path: "/checkout/success",
  noIndex: true,
});

type CheckoutSuccessSearchParams = {
  plan?: string | string[];
  session_id?: string | string[];
};

type CheckoutSuccessPageProps = {
  searchParams?: Promise<CheckoutSuccessSearchParams> | CheckoutSuccessSearchParams;
};

const PLAN_ACTIVATION_COPY: Record<CendorqPaidPlanKey, { command: string; activationLabel: string; dashboardCta: string; dashboardPath: string; unlockedState: string; boundaryReminder: string; customerMoment: string }> = {
  "deep-review": {
    command: "Diagnose",
    activationLabel: "Diagnosis activation",
    dashboardCta: "Open report vault",
    dashboardPath: "/dashboard/reports",
    unlockedState: "Diagnose is now active. The next job is to confirm what Cendorq should prove first.",
    boundaryReminder: "Deep Review unlocks cause-level diagnosis and decision clarity, not done-for-you implementation or recurring monitoring.",
    customerMoment: "You paid to understand the real reason before spending more money.",
  },
  "build-fix": {
    command: "Fix",
    activationLabel: "Fix activation",
    dashboardCta: "Confirm fix scope",
    dashboardPath: "/dashboard/support/request",
    unlockedState: "Fix is now active. The next job is to confirm the scoped target and approved business details.",
    boundaryReminder: "Build Fix unlocks scoped improvement work, not a full diagnostic report, unlimited site rebuild, or monthly control loop.",
    customerMoment: "You paid to improve a known weak point with bounded implementation work.",
  },
  "ongoing-control": {
    command: "Control",
    activationLabel: "Control activation",
    dashboardCta: "Choose monthly focus",
    dashboardPath: "/dashboard/billing",
    unlockedState: "Control is now active. The next job is to choose the first monthly priority and monitoring scope.",
    boundaryReminder: "Ongoing Control unlocks recurring monitoring and monthly decision support, not unlimited Build Fix work or guaranteed ranking/AI placement.",
    customerMoment: "You paid to keep the business watched, reviewed, and guided every month.",
  },
};

const PAID_REPORT_DELIVERY_CONFIRMATION =
  "Paid report delivery confirmation: every paid report must appear in the dashboard report vault and be delivered by email with the approved PDF attachment.";

const ACTIVATION_STEPS = [
  { label: "Payment", value: "Complete", detail: "The command depth can now attach to the protected workspace." },
  { label: "Workspace", value: "Updated", detail: "Dashboard, billing, notifications, and support should point to the same boundary." },
  { label: "Next action", value: "Required", detail: "Cendorq still needs the right customer context before delivery can begin." },
] as const;

export default async function CheckoutSuccessPage({ searchParams }: CheckoutSuccessPageProps) {
  const resolvedSearchParams = await searchParams;
  const planKey = normalizePaidPlanKey(resolvedSearchParams?.plan);
  const sessionId = normalizeQueryValue(resolvedSearchParams?.session_id) || "pending-session";
  const plan = getPaidCendorqPlanPrice(planKey);
  const revenueStage = getCendorqRevenueStage(plan.name);
  const planValue = getPlanValueDelivery(planKey);
  const email = CENDORQ_POST_PAYMENT_EMAILS.find((item) => item.planKey === planKey);
  const activation = PLAN_ACTIVATION_COPY[planKey];
  const emailCopy = email
    ? `${email.subject}. ${email.customerGoal}`
    : "You receive a plan-specific confirmation and next-step email.";

  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 pb-24 pt-5 text-white sm:px-6 md:py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_26%_0%,rgba(103,232,249,0.12),transparent_34%),radial-gradient(circle_at_88%_12%,rgba(14,165,233,0.08),transparent_30%)]" />

      <section className="system-panel-authority relative z-10 overflow-hidden rounded-[1.65rem] p-4 shadow-[0_30px_120px_rgba(2,8,23,0.48)] sm:rounded-[1.85rem] sm:p-8">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent" />
        <div className="grid gap-5 lg:grid-cols-[1fr_20rem] lg:items-start">
          <div>
            <p className="text-sm font-semibold text-cyan-100">Payment complete · {activation.activationLabel}</p>
            <h1 className="mt-3 max-w-5xl text-3xl font-semibold tracking-tight text-white sm:mt-4 sm:text-5xl">
              {activation.command} is unlocked. Activate the command path.
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:mt-5 sm:text-base sm:leading-8">
              {activation.customerMoment} Cendorq now has to route the command into the dashboard, preserve the boundary, and collect the context needed for delivery.
            </p>
          </div>
          <div className="rounded-[1.25rem] border border-cyan-300/20 bg-cyan-300/10 p-4 sm:p-5">
            <div className="text-sm font-semibold text-cyan-100">Unlocked</div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">{plan.price}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-200">{planValue.primaryValue}</p>
            <Link href={activation.dashboardPath} className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
              {activation.dashboardCta}
            </Link>
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-5 grid gap-3 md:grid-cols-3" aria-label="Checkout activation state">
        {ACTIVATION_STEPS.map((item) => (
          <article key={item.label} className="system-surface rounded-[1.2rem] p-4 sm:rounded-[1.35rem] sm:p-5">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">{item.label}</div>
            <h2 className="mt-3 text-xl font-semibold tracking-tight text-white">{item.value}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="relative z-10 mt-7 overflow-hidden rounded-[1.7rem] border border-cyan-300/15 bg-[linear-gradient(135deg,rgba(8,47,73,0.72),rgba(2,8,23,0.88)_48%,rgba(14,116,144,0.24))] p-4 shadow-[0_28px_100px_rgba(2,8,23,0.42)] sm:p-7" aria-label="Command activation after payment">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-cyan-100">Activation path</p>
            <h2 className="mt-2 max-w-4xl text-2xl font-semibold tracking-tight text-white sm:text-4xl">
              Payment is complete. The command path starts now.
            </h2>
          </div>
          <Link href="/dashboard/billing" className="text-sm font-semibold text-cyan-200 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
            Open billing →
          </Link>
        </div>
        <div className="mt-5 grid gap-3 lg:grid-cols-3">
          <SuccessCard title="Dashboard state" copy={revenueStage.dashboardState} />
          <SuccessCard title="Workflow started" copy={revenueStage.backendWorkflow} />
          <SuccessCard title="Confirmation email" copy={emailCopy} />
        </div>
      </section>

      <section className="relative z-10 mt-7 grid gap-3 lg:grid-cols-2" aria-label="Command value boundaries after payment">
        <BoundaryCard title="What this unlocks" items={planValue.includes.slice(0, 4)} tone="include" />
        <BoundaryCard title="What this does not unlock" items={planValue.doesNotInclude.slice(0, 4)} tone="exclude" />
      </section>

      <section className="relative z-10 mt-7 rounded-[1.45rem] border border-white/10 bg-white/[0.035] p-4 sm:p-5" aria-label="Customer context needed after payment">
        <p className="text-sm font-semibold text-cyan-100">What Cendorq needs next</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">{activation.unlockedState}</h2>
        <p className="mt-3 text-sm leading-7 text-slate-300">{activation.boundaryReminder}</p>
        <p className="mt-3 rounded-[1rem] border border-cyan-300/15 bg-cyan-300/[0.07] p-3 text-sm leading-7 text-cyan-50">{PAID_REPORT_DELIVERY_CONFIRMATION}</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {revenueStage.requiredCustomerContext.map((item) => (
            <div key={item} className="rounded-[1.1rem] border border-cyan-300/15 bg-cyan-300/[0.07] p-4 text-sm leading-6 text-cyan-50">
              {item}
            </div>
          ))}
        </div>
        <p className="mt-5 text-sm leading-7 text-slate-300">{revenueStage.nextBestAction}</p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Link href={activation.dashboardPath} className="min-h-11 rounded-2xl bg-cyan-300 px-5 py-3 text-center text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">{activation.dashboardCta}</Link>
          <Link href="/dashboard/billing" className="min-h-11 rounded-2xl border border-white/10 px-5 py-3 text-center text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">Open billing</Link>
          <Link href="/dashboard/support" className="min-h-11 rounded-2xl border border-white/10 px-5 py-3 text-center text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">Need help?</Link>
        </div>
      </section>

      <section className="sr-only" aria-label="Checkout success guardrails">
        Command activation. Payment complete. Plan unlocked. Activate the command path. Payment should unlock a workflow, not just confirmation. Activation path. Payment is complete. The command path starts now. Dashboard state. Workflow started. Confirmation email. What this unlocks. What this does not unlock. What Cendorq needs next. Paid report delivery confirmation. Every paid report must appear in the dashboard report vault and be delivered by email with the approved PDF attachment. session_id {sessionId}. Stripe session id. Final fixed plan prices. Deep Review $497. Build Fix $1,497. Ongoing Control $597/month. Checkout success parity with billing. Billing activation must preserve the same includes, exclusions, workflow, and post-payment next step shown in checkout success. {planValue.customerName} {planValue.price} {planValue.primaryValue} {planValue.customerOutcome} {planValue.reportBoundary} {planValue.upgradeLogic} {activation.command} {activation.activationLabel} {activation.unlockedState} {activation.boundaryReminder} {PAID_REPORT_DELIVERY_CONFIRMATION} {PLAN_VALUE_SEPARATION_RULES.join(" ")} {revenueStage.planName} {revenueStage.price} {revenueStage.businessPurpose} {revenueStage.conversionJob} {revenueStage.emailMoment} {CENDORQ_CHECKOUT_ORCHESTRATION.map((step) => `${step.step} ${step.customerExperience} ${step.systemAction}`).join(" ")} {CENDORQ_CHECKOUT_METADATA_KEYS.join(" ")} {CENDORQ_POST_PAYMENT_EMAILS.map((item) => `${item.key} ${item.planKey} ${item.subject} ${item.dashboardPath} ${item.customerGoal}`).join(" ")}
      </section>
    </main>
  );
}

function SuccessCard({ title, copy }: { title: string; copy: string }) {
  return (
    <article className="rounded-[1.25rem] border border-white/10 bg-slate-950/60 p-5">
      <h2 className="text-xl font-semibold tracking-tight text-white">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-slate-300">{copy}</p>
    </article>
  );
}

function BoundaryCard({ title, items, tone }: { title: string; items: readonly string[]; tone: "include" | "exclude" }) {
  return (
    <article className="system-surface rounded-[1.35rem] p-4 sm:p-5">
      <h2 className="text-xl font-semibold tracking-tight text-white">{title}</h2>
      <div className="mt-4 grid gap-3">
        {items.map((item) => (
          <p key={item} className={tone === "include" ? "rounded-[1rem] border border-cyan-300/15 bg-cyan-300/10 p-3 text-sm leading-6 text-slate-200" : "rounded-[1rem] border border-white/10 bg-black/20 p-3 text-sm leading-6 text-slate-400"}>
            {item}
          </p>
        ))}
      </div>
    </article>
  );
}

function normalizePaidPlanKey(candidate: string | string[] | undefined): CendorqPaidPlanKey {
  const value = normalizeQueryValue(candidate);
  return CENDORQ_PAID_PLAN_KEYS.find((planKey) => planKey === value) || "deep-review";
}

function normalizeQueryValue(candidate: string | string[] | undefined) {
  return Array.isArray(candidate) ? candidate[0] : candidate;
}
