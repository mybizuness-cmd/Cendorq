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
  const emailCopy = email ? `${email.subject}. ${email.customerGoal}` : "You receive a plan-specific confirmation and next-step email.";

  return (
    <main className="relative isolate overflow-hidden text-white">
      <CheckoutSuccessAtmosphere />

      <section className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-[92rem] gap-8 px-4 pb-12 pt-6 sm:px-6 md:pb-18 md:pt-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
        <div className="relative z-10">
          <div className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-100 shadow-[0_0_60px_rgba(34,211,238,0.12)]">
            Payment complete · {activation.activationLabel}
          </div>
          <h1 className="mt-6 max-w-5xl text-[clamp(3.2rem,7.3vw,7.5rem)] font-semibold leading-[0.84] tracking-[-0.08em] text-white">
            {activation.command} is unlocked. Activate the command path.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl sm:leading-9">
            {activation.customerMoment} Cendorq now has to route the command into the dashboard, preserve the boundary, and collect the context needed for delivery.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={activation.dashboardPath} className="inline-flex min-h-14 items-center justify-center rounded-full bg-cyan-200 px-9 py-4 text-base font-black text-slate-950 shadow-[0_22px_80px_rgba(103,232,249,0.24)] transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
              {activation.dashboardCta}
            </Link>
            <Link href="/dashboard/billing" className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-9 py-4 text-base font-bold text-white shadow-[0_18px_70px_rgba(2,8,23,0.32)] transition hover:border-cyan-200/40 hover:bg-cyan-200/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
              Open billing
            </Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.7rem] border border-cyan-200/22 bg-[radial-gradient(circle_at_50%_0%,rgba(103,232,249,0.2),transparent_36%),linear-gradient(145deg,rgba(8,47,73,0.9),rgba(2,8,23,0.98)_52%,rgba(14,116,144,0.32))] p-5 shadow-[0_55px_200px_rgba(2,8,23,0.72)] sm:p-7">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/90 to-transparent" />
          <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-100">Unlocked</p>
          <h2 className="mt-4 text-5xl font-semibold tracking-[-0.07em] text-white sm:text-6xl">{plan.price}</h2>
          <p className="mt-5 text-base leading-8 text-slate-300">{planValue.primaryValue}</p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {ACTIVATION_STEPS.slice(0, 2).map((item) => (
              <article key={item.label} className="rounded-[1.6rem] border border-white/10 bg-black/24 p-5">
                <div className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-100">{item.label}</div>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">{item.value}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-10 sm:px-6" aria-label="Checkout activation state">
        <div className="grid gap-4 md:grid-cols-3">
          {ACTIVATION_STEPS.map((item, index) => (
            <article key={item.label} className={index === 0 ? "rounded-[2rem] border border-cyan-200/22 bg-cyan-200/[0.09] p-6 shadow-[0_28px_100px_rgba(2,8,23,0.42)] md:-mt-6 md:mb-6" : "rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-[0_24px_90px_rgba(2,8,23,0.34)]"}>
              <div className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-100">{item.label}</div>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.055em] text-white">{item.value}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-10 sm:px-6" aria-label="Command activation after payment">
        <div className="overflow-hidden rounded-[2.5rem] border border-cyan-300/15 bg-[linear-gradient(135deg,rgba(8,47,73,0.72),rgba(2,8,23,0.94)_46%,rgba(14,116,144,0.22))] shadow-[0_45px_180px_rgba(2,8,23,0.55)]">
          <div className="grid gap-0 lg:grid-cols-[0.78fr_1.22fr]">
            <div className="border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-100">Activation path</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-white sm:text-6xl">Payment is complete. The command path starts now.</h2>
              <p className="mt-5 text-base leading-8 text-slate-300">The customer needs clarity on dashboard state, workflow, email, and the next required context.</p>
              <Link href="/dashboard/billing" className="mt-7 inline-flex text-sm font-bold text-cyan-100 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">Open billing →</Link>
            </div>
            <div className="grid gap-0 md:grid-cols-3 lg:grid-cols-1">
              <SuccessCard title="Dashboard state" copy={revenueStage.dashboardState} />
              <SuccessCard title="Workflow started" copy={revenueStage.backendWorkflow} />
              <SuccessCard title="Confirmation email" copy={emailCopy} />
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto grid max-w-[92rem] gap-4 px-4 pb-10 sm:px-6 lg:grid-cols-2" aria-label="Command value boundaries after payment">
        <BoundaryCard title="What this unlocks" items={planValue.includes.slice(0, 4)} tone="include" />
        <BoundaryCard title="What this does not unlock" items={planValue.doesNotInclude.slice(0, 4)} tone="exclude" />
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-16 sm:px-6" aria-label="Customer context needed after payment">
        <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.025)_38%,rgba(103,232,249,0.08))] p-6 shadow-[0_45px_180px_rgba(2,8,23,0.55)] backdrop-blur-2xl sm:p-8 lg:p-10">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-100">What Cendorq needs next</p>
          <h2 className="mt-3 max-w-5xl text-4xl font-semibold tracking-[-0.055em] text-white sm:text-6xl">{activation.unlockedState}</h2>
          <p className="mt-5 max-w-4xl text-sm leading-7 text-slate-300">{activation.boundaryReminder}</p>
          <p className="mt-4 rounded-[1.35rem] border border-cyan-300/15 bg-cyan-300/[0.07] p-4 text-sm font-semibold leading-7 text-cyan-50">{PAID_REPORT_DELIVERY_CONFIRMATION}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {revenueStage.requiredCustomerContext.map((item) => (
              <div key={item} className="rounded-[1.35rem] border border-cyan-300/15 bg-cyan-300/[0.07] p-4 text-sm font-semibold leading-7 text-cyan-50">{item}</div>
            ))}
          </div>
          <p className="mt-6 text-sm leading-7 text-slate-300">{revenueStage.nextBestAction}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href={activation.dashboardPath} className="min-h-12 rounded-full bg-cyan-300 px-6 py-3 text-center text-sm font-black text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">{activation.dashboardCta}</Link>
            <Link href="/dashboard/billing" className="min-h-12 rounded-full border border-white/10 px-6 py-3 text-center text-sm font-bold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">Open billing</Link>
            <Link href="/dashboard/support" className="min-h-12 rounded-full border border-white/10 px-6 py-3 text-center text-sm font-bold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">Need help?</Link>
          </div>
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
    <article className="border-b border-white/10 p-5 md:border-r lg:border-r-0 lg:p-6">
      <h2 className="text-2xl font-semibold tracking-[-0.04em] text-white">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-slate-300">{copy}</p>
    </article>
  );
}

function BoundaryCard({ title, items, tone }: { title: string; items: readonly string[]; tone: "include" | "exclude" }) {
  return (
    <article className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-[0_24px_90px_rgba(2,8,23,0.34)] sm:p-7">
      <h2 className="text-3xl font-semibold tracking-[-0.055em] text-white">{title}</h2>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <p key={item} className={tone === "include" ? "rounded-[1.2rem] border border-cyan-300/15 bg-cyan-300/10 p-4 text-sm leading-7 text-slate-200" : "rounded-[1.2rem] border border-white/10 bg-black/20 p-4 text-sm leading-7 text-slate-400"}>{item}</p>
        ))}
      </div>
    </article>
  );
}

function CheckoutSuccessAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(103,232,249,0.16),transparent_30%),radial-gradient(circle_at_86%_6%,rgba(56,189,248,0.11),transparent_27%),linear-gradient(180deg,#020617_0%,#020817_42%,#030712_100%)]" />
      <div className="absolute left-1/2 top-0 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-cyan-300/[0.04] blur-3xl" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.018]" />
    </div>
  );
}

function normalizePaidPlanKey(candidate: string | string[] | undefined): CendorqPaidPlanKey {
  const value = normalizeQueryValue(candidate);
  return CENDORQ_PAID_PLAN_KEYS.find((planKey) => planKey === value) || "deep-review";
}

function normalizeQueryValue(candidate: string | string[] | undefined) {
  return Array.isArray(candidate) ? candidate[0] : candidate;
}
