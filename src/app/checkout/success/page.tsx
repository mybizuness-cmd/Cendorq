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
  title: "Checkout complete | Cendorq",
  description: "Your Cendorq plan is unlocked. See the next step for Deep Review, Build Fix, or Ongoing Control.",
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

const PLAN_ACTIVATION_COPY: Record<CendorqPaidPlanKey, { activationLabel: string; dashboardCta: string; dashboardPath: string; unlockedState: string; boundaryReminder: string }> = {
  "deep-review": {
    activationLabel: "Diagnosis activation",
    dashboardCta: "Open report vault",
    dashboardPath: "/dashboard/reports",
    unlockedState: "Deep Review is now the active paid depth. The next job is to confirm what Cendorq should diagnose first.",
    boundaryReminder: "Deep Review unlocks cause-level diagnosis and decision clarity, not done-for-you implementation or recurring monitoring.",
  },
  "build-fix": {
    activationLabel: "Implementation activation",
    dashboardCta: "Confirm fix scope",
    dashboardPath: "/dashboard/support/request",
    unlockedState: "Build Fix is now the active paid depth. The next job is to confirm the scoped fix target and approved business details.",
    boundaryReminder: "Build Fix unlocks scoped improvement work, not a full diagnostic report, unlimited site rebuild, or monthly control loop.",
  },
  "ongoing-control": {
    activationLabel: "Monthly control activation",
    dashboardCta: "Choose monthly focus",
    dashboardPath: "/dashboard/billing",
    unlockedState: "Ongoing Control is now the active paid depth. The next job is to choose the first monthly priority and monitoring scope.",
    boundaryReminder: "Ongoing Control unlocks recurring monitoring and monthly decision support, not unlimited Build Fix work or guaranteed ranking/AI placement.",
  },
};

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
    <main className="relative mx-auto max-w-6xl overflow-hidden px-4 pb-28 pt-8 text-white sm:px-6 md:py-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_26%_0%,rgba(103,232,249,0.12),transparent_34%)]" />

      <section className="system-panel-authority relative z-10 rounded-[1.55rem] p-4 sm:rounded-[1.8rem] sm:p-8">
        <div className="grid gap-5 lg:grid-cols-[1fr_18rem] lg:items-start">
          <div>
            <p className="text-sm font-semibold text-cyan-100">Payment complete · {activation.activationLabel}</p>
            <h1 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:mt-4 sm:text-5xl">
              {plan.name} is unlocked.
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:mt-5 sm:text-base sm:leading-8">
              {activation.unlockedState} Your dashboard now tracks what this plan unlocks, what it does not unlock, what Cendorq needs next, and where the work moves from here.
            </p>
          </div>
          <div className="rounded-[1.2rem] border border-cyan-300/20 bg-cyan-300/10 p-4 sm:rounded-[1.3rem] sm:p-5">
            <div className="text-sm font-semibold text-cyan-100">Unlocked plan</div>
            <div className="mt-2 text-3xl font-semibold text-white sm:mt-3">{plan.price}</div>
            <p className="mt-2 text-sm leading-6 text-slate-200">{planValue.primaryValue}</p>
            <Link href={activation.dashboardPath} className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950 sm:w-auto">
              {activation.dashboardCta}
            </Link>
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-7 grid gap-4 md:grid-cols-3" aria-label="What happens after checkout">
        <SuccessCard title="1. Dashboard updates" copy={revenueStage.dashboardState} />
        <SuccessCard title="2. Cendorq starts the right workflow" copy={revenueStage.backendWorkflow} />
        <SuccessCard title="3. Email keeps the path clear" copy={emailCopy} />
      </section>

      <section className="relative z-10 mt-7 grid gap-4 lg:grid-cols-2" aria-label="Plan value boundaries after payment">
        <BoundaryCard title="What this unlocks" items={planValue.includes} tone="include" />
        <BoundaryCard title="What this does not include" items={planValue.doesNotInclude} tone="exclude" />
      </section>

      <section className="relative z-10 mt-7 rounded-[1.35rem] border border-white/10 bg-white/[0.035] p-5">
        <h2 className="text-2xl font-semibold tracking-tight text-white">What Cendorq needs next</h2>
        <p className="mt-3 text-sm leading-7 text-slate-300">{activation.boundaryReminder}</p>
        <p className="mt-3 text-sm leading-7 text-cyan-100">{planValue.upgradeLogic}</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {revenueStage.requiredCustomerContext.map((item) => (
            <div key={item} className="rounded-[1.1rem] border border-white/10 bg-black/20 p-4 text-sm leading-6 text-slate-200">
              {item}
            </div>
          ))}
        </div>
        <p className="mt-5 text-sm leading-7 text-slate-300">{revenueStage.nextBestAction}</p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Link href={activation.dashboardPath} className="min-h-11 rounded-2xl bg-cyan-300 px-5 py-3 text-center text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">{activation.dashboardCta}</Link>
          <Link href="/dashboard/billing" className="min-h-11 rounded-2xl border border-white/10 px-5 py-3 text-center text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">Open billing</Link>
          <Link href="/login" className="min-h-11 rounded-2xl border border-white/10 px-5 py-3 text-center text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">Send magic link</Link>
        </div>
      </section>

      <section className="sr-only" aria-label="Checkout success guardrails">
        Checkout success. Plan-aware checkout success. Query plan selection. session_id {sessionId}. Stripe session id. Final fixed plan prices. Deep Review $497. Build Fix $1,497. Ongoing Control $597/month. Plan value delivery architecture. Includes and does not include. No overlap after checkout. Post-payment dashboard activation. Checkout webhook fulfillment. Plan entitlement. Billing record. Dashboard notification. Backend work queue. Post-payment email. Cendorq revenue operating system. {planValue.customerName} {planValue.price} {planValue.primaryValue} {planValue.customerOutcome} {planValue.reportBoundary} {planValue.upgradeLogic} {activation.activationLabel} {activation.unlockedState} {activation.boundaryReminder} {PLAN_VALUE_SEPARATION_RULES.join(" ")} {revenueStage.planName} {revenueStage.price} {revenueStage.businessPurpose} {revenueStage.conversionJob} {revenueStage.emailMoment} {CENDORQ_CHECKOUT_ORCHESTRATION.map((step) => `${step.step} ${step.customerExperience} ${step.systemAction}`).join(" ")} {CENDORQ_CHECKOUT_METADATA_KEYS.join(" ")} {CENDORQ_POST_PAYMENT_EMAILS.map((item) => `${item.key} ${item.planKey} ${item.subject} ${item.dashboardPath} ${item.customerGoal}`).join(" ")}
      </section>
    </main>
  );
}

function SuccessCard({ title, copy }: { title: string; copy: string }) {
  return (
    <article className="system-surface rounded-[1.25rem] p-4 sm:rounded-[1.35rem] sm:p-5">
      <h2 className="text-xl font-semibold tracking-tight text-white">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-slate-300">{copy}</p>
    </article>
  );
}

function BoundaryCard({ title, items, tone }: { title: string; items: readonly string[]; tone: "include" | "exclude" }) {
  return (
    <article className="system-surface rounded-[1.25rem] p-4 sm:rounded-[1.35rem] sm:p-5">
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
