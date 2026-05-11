import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { projectCustomerPlatformHandoff } from "@/lib/customer-platform-handoff-runtime";
import { getCendorqRevenueStage } from "@/lib/cendorq-revenue-operating-system";
import {
  CENDORQ_POST_PAYMENT_EMAILS,
  getPaidCendorqPlanPrice,
  type CendorqPaidPlanKey,
} from "@/lib/pricing-checkout-orchestration";
import { getPlanValueDelivery, PLAN_VALUE_SEPARATION_RULES } from "@/lib/plan-value-delivery-architecture";

export const metadata = buildMetadata({
  title: "Readiness plan depth | Cendorq",
  description: "Your private Cendorq billing control center for readiness access, invoices, plan depth, and safe recovery.",
  path: "/dashboard/billing",
  noIndex: true,
});

const BILLING_HANDOFFS = [
  projectCustomerPlatformHandoff({ surfaceKey: "dashboard-to-billing", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
  projectCustomerPlatformHandoff({ surfaceKey: "billing-to-plans", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
  projectCustomerPlatformHandoff({ surfaceKey: "billing-to-support", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
] as const;

const DEEP_REVIEW = getPaidCendorqPlanPrice("deep-review");
const BUILD_FIX = getPaidCendorqPlanPrice("build-fix");
const ONGOING_CONTROL = getPaidCendorqPlanPrice("ongoing-control");

const BILLING_STATUS = [
  { label: "Current access", value: "Free Scan + protected workspace", detail: "Paid readiness depth appears here after checkout, activation, or subscription state changes." },
  { label: "Next depth", value: "Review", detail: "Use AI Readiness Review before bigger repairs when the cause is still uncertain." },
  { label: "Safety", value: "No private payment details", detail: "Support can help without card numbers, private keys, bank details, passwords, or tokens." },
] as const;

const PAID_PLAN_COMMANDS = [
  {
    planKey: "deep-review",
    command: "Review",
    title: "AI Readiness Review",
    moment: "You need the real reason before spending more money.",
    plan: DEEP_REVIEW,
    value: getPlanValueDelivery("deep-review"),
    revenueStage: getCendorqRevenueStage(DEEP_REVIEW.name),
    activation: "Unlocks review workflow, required context, report status, and report-vault destination.",
    exclusion: "Does not unlock done-for-you implementation, unlimited revisions, monthly monitoring, ad management, or guaranteed outcomes.",
  },
  {
    planKey: "build-fix",
    command: "Repair",
    title: "Signal Repair",
    moment: "You know the weak point and need scoped improvement.",
    plan: BUILD_FIX,
    value: getPlanValueDelivery("build-fix"),
    revenueStage: getCendorqRevenueStage(BUILD_FIX.name),
    activation: "Unlocks scoped repair intake, repair-target confirmation, approved details, and delivery progress.",
    exclusion: "Does not unlock full review, unlimited site rebuild, monthly monitoring, or unapproved production changes.",
  },
  {
    planKey: "ongoing-control",
    command: "Control",
    title: "Readiness Control",
    moment: "You need recurring review and monthly decision support.",
    plan: ONGOING_CONTROL,
    value: getPlanValueDelivery("ongoing-control"),
    revenueStage: getCendorqRevenueStage(ONGOING_CONTROL.name),
    activation: "Unlocks recurring review, monthly priority selection, alerts, trend awareness, and decision support.",
    exclusion: "Does not unlock unlimited Signal Repair work, a full AI Readiness Review every month, ad management, ranking guarantees, or guaranteed AI placement.",
  },
] as const satisfies readonly {
  planKey: CendorqPaidPlanKey;
  command: string;
  title: string;
  moment: string;
  plan: ReturnType<typeof getPaidCendorqPlanPrice>;
  value: ReturnType<typeof getPlanValueDelivery>;
  revenueStage: ReturnType<typeof getCendorqRevenueStage>;
  activation: string;
  exclusion: string;
}[];

const BILLING_ACTIONS = [
  { title: "Compare readiness depth", href: "/plans", copy: "Choose Scan, Review, Repair, or Control only when the stage fits." },
  { title: "Open signal feed", href: "/dashboard/notifications", copy: "See what Cendorq needs next without searching through every page." },
  { title: "Ask access help", href: "/dashboard/support", copy: "Resolve access issues without sending private payment details." },
] as const;

const BILLING_SAFETY_RULES = [
  "Account access should show a safe customer projection, not raw provider payloads or internal IDs.",
  "Recovery should feel calm, clear, and recoverable with no fake urgency.",
  "Plan guidance must separate current access, pending actions, and future readiness depth.",
  "Activation must preserve the same includes, exclusions, workflow, and post-payment next step shown in checkout success.",
] as const;

export default function BillingPage() {
  return (
    <main className="relative isolate overflow-hidden text-white">
      <AccountAtmosphere />

      <section className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-[92rem] gap-8 px-4 pb-12 pt-6 sm:px-6 md:pb-18 md:pt-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
        <div className="relative z-10">
          <div className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-100 shadow-[0_0_60px_rgba(34,211,238,0.12)]">
            Readiness plan depth
          </div>
          <h1 className="mt-6 max-w-5xl text-[clamp(3.2rem,7.3vw,7.5rem)] font-semibold leading-[0.84] tracking-[-0.08em] text-white">
            Know what is active, what unlocked, and what depth comes next.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl sm:leading-9">
            This is the readiness-depth control point: access, boundaries, recovery, and the next business move.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={DEEP_REVIEW.checkoutPath} className="inline-flex min-h-14 items-center justify-center rounded-full bg-cyan-200 px-9 py-4 text-base font-black text-slate-950 shadow-[0_22px_80px_rgba(103,232,249,0.24)] transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
              Unlock {DEEP_REVIEW.price}
            </Link>
            <Link href="/plans" className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-9 py-4 text-base font-bold text-white shadow-[0_18px_70px_rgba(2,8,23,0.32)] transition hover:border-cyan-200/40 hover:bg-cyan-200/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
              Compare readiness path
            </Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.7rem] border border-cyan-200/22 bg-[radial-gradient(circle_at_50%_0%,rgba(103,232,249,0.2),transparent_36%),linear-gradient(145deg,rgba(8,47,73,0.9),rgba(2,8,23,0.98)_52%,rgba(14,116,144,0.32))] p-5 shadow-[0_55px_200px_rgba(2,8,23,0.72)] sm:p-7">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/90 to-transparent" />
          <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-100">Recommended next depth</p>
          <h2 className="mt-4 text-5xl font-semibold tracking-[-0.07em] text-white sm:text-6xl">Review</h2>
          <p className="mt-5 text-base leading-8 text-slate-300">Use AI Readiness Review when the first signal matters enough that guessing is too expensive.</p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {BILLING_STATUS.slice(0, 2).map((item) => (
              <article key={item.label} className="rounded-[1.6rem] border border-white/10 bg-black/24 p-5">
                <div className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-100">{item.label}</div>
                <div className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">{item.value}</div>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-10 sm:px-6" aria-label="Billing status summary">
        <div className="grid gap-4 md:grid-cols-3">
          {BILLING_STATUS.map((item, index) => (
            <article key={item.label} className={index === 1 ? "rounded-[2rem] border border-cyan-200/22 bg-cyan-200/[0.09] p-6 shadow-[0_28px_100px_rgba(2,8,23,0.42)] md:-mt-6 md:mb-6" : "rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-[0_24px_90px_rgba(2,8,23,0.34)]"}>
              <div className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-100">{item.label}</div>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.055em] text-white">{item.value}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-10 sm:px-6" aria-label="Paid readiness depth system">
        <div className="overflow-hidden rounded-[2.5rem] border border-cyan-300/15 bg-[linear-gradient(135deg,rgba(8,47,73,0.72),rgba(2,8,23,0.94)_46%,rgba(14,116,144,0.22))] shadow-[0_45px_180px_rgba(2,8,23,0.55)]">
          <div className="grid gap-0 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-100">Paid readiness depth</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-white sm:text-6xl">Payment should unlock the right readiness layer.</h2>
              <p className="mt-5 text-base leading-8 text-slate-300">Review, Repair, and Control each unlock a different operating layer. They should never collapse into the same cheap account card.</p>
              <Link href="/dashboard/support" className="mt-7 inline-flex text-sm font-bold text-cyan-100 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
                Access help →
              </Link>
            </div>
            <div className="divide-y divide-white/10">
              {PAID_PLAN_COMMANDS.map((item) => (
                <Link key={item.planKey} href={item.plan.checkoutPath} className="group grid gap-4 p-5 transition hover:bg-cyan-200/[0.06] focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950 sm:grid-cols-[11rem_1fr_auto] sm:items-center sm:p-6">
                  <div>
                    <div className="text-4xl font-semibold tracking-[-0.06em] text-white">{item.command}</div>
                    <div className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-cyan-100/75">{item.title}</div>
                  </div>
                  <p className="max-w-2xl text-sm leading-6 text-slate-300">{item.activation}</p>
                  <div className="flex items-center justify-between gap-4 sm:block sm:text-right">
                    <div className="text-sm font-black text-cyan-100">{item.plan.price}</div>
                    <span className="mt-1 inline-flex text-sm font-bold text-cyan-100 transition group-hover:text-white">Open checkout →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-10 sm:px-6" aria-label="Account access actions">
        <div className="grid gap-4 md:grid-cols-3">
          {BILLING_ACTIONS.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-[0_24px_90px_rgba(2,8,23,0.34)] transition hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
              <h3 className="text-2xl font-semibold tracking-[-0.04em] text-white">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">{item.copy}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-16 sm:px-6" aria-label="Account access safety standard">
        <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.025)_38%,rgba(103,232,249,0.08))] p-6 shadow-[0_45px_180px_rgba(2,8,23,0.55)] backdrop-blur-2xl sm:p-8 lg:p-10">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-100">Access safety standard</p>
          <h2 className="mt-3 max-w-5xl text-4xl font-semibold tracking-[-0.055em] text-white sm:text-6xl">Money moments should feel calm, exact, and recoverable.</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {BILLING_SAFETY_RULES.map((rule) => (
              <p key={rule} className="rounded-[1.35rem] border border-white/10 bg-black/25 p-4 text-sm font-semibold leading-7 text-slate-300">{rule}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="sr-only" aria-label="Account access readiness standard">
        Readiness plan depth. Account access control center. Know what is active, what unlocked, and what depth comes next. Readiness-depth control point for access, boundaries, recovery, and the next business move. Current access. Next depth. Safety. Paid readiness depth. Review. Repair. Control. Payment should unlock the right readiness layer. AI Readiness Review $497. Signal Repair $1,497. Readiness Control $597/month. Includes and not included. Checkout success parity. Activation must preserve the same includes, exclusions, workflow, and post-payment next step shown in checkout success. {PLAN_VALUE_SEPARATION_RULES.join(" ")} {PAID_PLAN_COMMANDS.map((item) => `${item.planKey} ${item.command} ${item.title} ${item.plan.price} ${item.activation} ${item.exclusion} ${item.plan.afterPaymentNextStep} ${item.revenueStage.requiredCustomerContext.join(" ")}`).join(" ")} {CENDORQ_POST_PAYMENT_EMAILS.map((email) => `${email.subject} ${email.dashboardPath} ${email.customerGoal}`).join(" ")} {BILLING_SAFETY_RULES.join(" ")} {BILLING_HANDOFFS.map((handoff) => `${handoff.decision} ${handoff.surfaceKey} ${handoff.currentState} ${handoff.safeNextAction} ${handoff.recoveryPath} ${handoff.connectedDestination}`).join(" ")}
      </section>
    </main>
  );
}

function AccountAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(103,232,249,0.16),transparent_30%),radial-gradient(circle_at_86%_6%,rgba(56,189,248,0.11),transparent_27%),linear-gradient(180deg,#020617_0%,#020817_42%,#030712_100%)]" />
      <div className="absolute left-1/2 top-0 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-cyan-300/[0.04] blur-3xl" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.018]" />
    </div>
  );
}
