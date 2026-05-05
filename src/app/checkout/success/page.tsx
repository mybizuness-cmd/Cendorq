import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
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

const NEXT_ACTION_BY_PLAN: Record<CendorqPaidPlanKey, { href: string; label: string; title: string }> = {
  "deep-review": { href: "/dashboard/reports", label: "Open report vault", title: "Deep Review is unlocked." },
  "build-fix": { href: "/dashboard/support/request", label: "Confirm the fix details", title: "Build Fix is unlocked." },
  "ongoing-control": { href: "/dashboard/billing", label: "Set monthly focus", title: "Ongoing Control is active." },
};

const WORKFLOW_COPY_BY_PLAN: Record<CendorqPaidPlanKey, string> = {
  "deep-review": "Deep Review moves into diagnosis and evidence review.",
  "build-fix": "Build Fix moves into implementation intake and priority setup.",
  "ongoing-control": "Ongoing Control moves into monthly focus and recurring review setup.",
};

type CheckoutSuccessSearchParams = Promise<{ plan?: string; session_id?: string }>;

export default async function CheckoutSuccessPage({ searchParams }: { searchParams?: CheckoutSuccessSearchParams }) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const planKey = normalizePaidPlanKey(resolvedSearchParams?.plan);
  const sessionId = resolvedSearchParams?.session_id || "pending-session";
  const plan = getPaidCendorqPlanPrice(planKey);
  const nextAction = NEXT_ACTION_BY_PLAN[planKey];
  const email = CENDORQ_POST_PAYMENT_EMAILS.find((item) => item.planKey === planKey);
  const workflowCopy = WORKFLOW_COPY_BY_PLAN[planKey];
  const emailCopy = email
    ? `${email.subject}. ${email.customerGoal}`
    : "You receive a plan-specific confirmation and next-step email.";

  return (
    <main className="relative mx-auto max-w-6xl overflow-hidden px-4 pb-28 pt-8 text-white sm:px-6 md:py-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_26%_0%,rgba(103,232,249,0.12),transparent_34%)]" />

      <section className="system-panel-authority relative z-10 rounded-[1.55rem] p-4 sm:rounded-[1.8rem] sm:p-8">
        <div className="grid gap-5 lg:grid-cols-[1fr_18rem] lg:items-start">
          <div>
            <p className="text-sm font-semibold text-cyan-100">Payment complete</p>
            <h1 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:mt-4 sm:text-5xl">
              {nextAction.title}
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:mt-5 sm:text-base sm:leading-8">
              {plan.afterPaymentNextStep} Your dashboard now becomes the place to track what was unlocked, what Cendorq needs next, and where the work moves from here.
            </p>
          </div>
          <div className="rounded-[1.2rem] border border-cyan-300/20 bg-cyan-300/10 p-4 sm:rounded-[1.3rem] sm:p-5">
            <div className="text-sm font-semibold text-cyan-100">Unlocked plan</div>
            <div className="mt-2 text-3xl font-semibold text-white sm:mt-3">{plan.price}</div>
            <p className="mt-2 text-sm leading-6 text-slate-200">{plan.name}</p>
            <Link href={nextAction.href} className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950 sm:w-auto">
              {nextAction.label}
            </Link>
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-7 grid gap-4 md:grid-cols-3" aria-label="What happens after checkout">
        <SuccessCard title="1. Dashboard updates" copy="Your plan state, billing record, notification, and work path should appear inside your dashboard." />
        <SuccessCard title="2. Cendorq starts the right workflow" copy={workflowCopy} />
        <SuccessCard title="3. Email keeps the path clear" copy={emailCopy} />
      </section>

      <section className="relative z-10 mt-7 rounded-[1.35rem] border border-white/10 bg-white/[0.035] p-5">
        <h2 className="text-2xl font-semibold tracking-tight text-white">Need to leave and come back?</h2>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          Use the same email with the customer re-entry page. The dashboard should keep your plan, report, billing, support, and next action connected.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Link href="/dashboard" className="min-h-11 rounded-2xl bg-cyan-300 px-5 py-3 text-center text-sm font-bold text-slate-950 transition hover:bg-cyan-200">Open dashboard</Link>
          <Link href="/login" className="min-h-11 rounded-2xl border border-white/10 px-5 py-3 text-center text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10">Send magic link</Link>
        </div>
      </section>

      <section className="sr-only" aria-label="Checkout success guardrails">
        Checkout success. Stripe session id. session_id {sessionId}. Final fixed plan prices. Deep Review $497. Build Fix $1,497. Ongoing Control $597/month. Post-payment dashboard activation. Checkout webhook fulfillment. Plan entitlement. Billing record. Dashboard notification. Backend work queue. Post-payment email. {CENDORQ_CHECKOUT_ORCHESTRATION.map((step) => `${step.step} ${step.customerExperience} ${step.systemAction}`).join(" ")} {CENDORQ_CHECKOUT_METADATA_KEYS.join(" ")} {CENDORQ_POST_PAYMENT_EMAILS.map((item) => `${item.key} ${item.subject} ${item.dashboardPath} ${item.customerGoal}`).join(" ")}
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

function normalizePaidPlanKey(value: string | undefined): CendorqPaidPlanKey {
  return CENDORQ_PAID_PLAN_KEYS.find((key) => key === value) || "deep-review";
}
