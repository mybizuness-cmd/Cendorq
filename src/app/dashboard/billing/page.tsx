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
  title: "Billing and plans | Cendorq",
  description: "Your private Cendorq billing and plan center for entitlements, invoices, upgrades, and plan guidance.",
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
  { label: "Current access", value: "Free Scan + protected workspace", detail: "Paid depth appears here after checkout, activation, or subscription state changes." },
  { label: "Next paid depth", value: "Deep Review", detail: "Use diagnosis before bigger fixes when the cause is still uncertain." },
  { label: "Billing safety", value: "No secrets in support", detail: "Never send card numbers, passwords, private keys, bank details, or tokens in messages." },
] as const;

const PAID_PLAN_COMMANDS = [
  {
    planKey: "deep-review",
    index: "01",
    title: "Deep Review",
    moment: "You need the real reason before spending more money.",
    plan: DEEP_REVIEW,
    value: getPlanValueDelivery("deep-review"),
    revenueStage: getCendorqRevenueStage(DEEP_REVIEW.name),
    activation: "Unlocks diagnosis workflow, required context, report status, and report-vault destination.",
    exclusion: "Does not unlock done-for-you implementation, unlimited revisions, monthly monitoring, ad management, or guaranteed outcomes.",
  },
  {
    planKey: "build-fix",
    index: "02",
    title: "Build Fix",
    moment: "You know the weak point and need scoped improvement.",
    plan: BUILD_FIX,
    value: getPlanValueDelivery("build-fix"),
    revenueStage: getCendorqRevenueStage(BUILD_FIX.name),
    activation: "Unlocks scoped implementation intake, fix-target confirmation, approved details, and delivery progress.",
    exclusion: "Does not unlock full diagnosis, unlimited site rebuild, monthly monitoring, or unapproved production changes.",
  },
  {
    planKey: "ongoing-control",
    index: "03",
    title: "Ongoing Control",
    moment: "You need recurring review and monthly decision support.",
    plan: ONGOING_CONTROL,
    value: getPlanValueDelivery("ongoing-control"),
    revenueStage: getCendorqRevenueStage(ONGOING_CONTROL.name),
    activation: "Unlocks recurring review, monthly priority selection, alerts, trend awareness, and decision support.",
    exclusion: "Does not unlock unlimited Build Fix work, a full Deep Review every month, ad management, ranking guarantees, or guaranteed AI placement.",
  },
] as const satisfies readonly {
  planKey: CendorqPaidPlanKey;
  index: string;
  title: string;
  moment: string;
  plan: ReturnType<typeof getPaidCendorqPlanPrice>;
  value: ReturnType<typeof getPlanValueDelivery>;
  revenueStage: ReturnType<typeof getCendorqRevenueStage>;
  activation: string;
  exclusion: string;
}[];

const BILLING_ACTIONS = [
  { title: "Compare plan depth", href: "/plans", copy: "Choose diagnosis, implementation, or monthly control only when the stage fits." },
  { title: "Open notifications", href: "/dashboard/notifications", copy: "See what Cendorq needs next without searching through every page." },
  { title: "Ask billing support", href: "/dashboard/support", copy: "Resolve billing or access issues without sending private payment details." },
] as const;

const BILLING_SAFETY_RULES = [
  "Billing should show a safe customer projection, not raw provider payloads or internal IDs.",
  "Failed-payment and invoice recovery should feel calm, clear, and recoverable with no fake urgency.",
  "Plan upgrade guidance must separate current access, pending actions, and future entitlements.",
  "Billing activation must preserve the same includes, exclusions, workflow, and post-payment next step shown in checkout success.",
] as const;

export default function BillingPage() {
  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 pb-24 pt-5 text-white sm:px-6 md:py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_0%,rgba(103,232,249,0.12),transparent_34%),radial-gradient(circle_at_84%_12%,rgba(14,165,233,0.08),transparent_30%)]" />

      <section className="system-panel-authority relative z-10 overflow-hidden rounded-[1.55rem] p-4 shadow-[0_28px_110px_rgba(2,8,23,0.42)] sm:rounded-[1.8rem] sm:p-8">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent" />
        <div className="grid gap-5 lg:grid-cols-[1fr_20rem] lg:items-start">
          <div>
            <p className="text-sm font-semibold text-cyan-100">Plan billing command center</p>
            <h1 className="mt-3 max-w-5xl text-3xl font-semibold tracking-tight text-white sm:mt-4 sm:text-5xl">
              Know what is active, what unlocked, and what Cendorq needs next.
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:mt-5 sm:text-base sm:leading-8">
              Billing should not feel like a receipt drawer. It should explain access, plan boundaries, next context, and the safest upgrade or recovery path.
            </p>
          </div>
          <div className="rounded-[1.25rem] border border-cyan-300/20 bg-cyan-300/10 p-4 sm:p-5">
            <div className="text-sm font-semibold text-cyan-100">Recommended paid first step</div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">{DEEP_REVIEW.name}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-200">{getPlanValueDelivery("deep-review").primaryValue}</p>
            <Link href={DEEP_REVIEW.checkoutPath} className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
              Unlock {DEEP_REVIEW.price}
            </Link>
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-5 grid gap-3 md:grid-cols-3" aria-label="Billing status summary">
        {BILLING_STATUS.map((item) => (
          <article key={item.label} className="system-surface rounded-[1.2rem] p-4 sm:rounded-[1.35rem] sm:p-5">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">{item.label}</div>
            <h2 className="mt-3 text-xl font-semibold tracking-tight text-white">{item.value}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="relative z-10 mt-7 overflow-hidden rounded-[1.7rem] border border-cyan-300/15 bg-[linear-gradient(135deg,rgba(8,47,73,0.72),rgba(2,8,23,0.88)_48%,rgba(14,116,144,0.24))] p-4 shadow-[0_28px_100px_rgba(2,8,23,0.42)] sm:p-7" aria-label="Paid plan command system">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-cyan-100">Paid plan command system</p>
            <h2 className="mt-2 max-w-4xl text-2xl font-semibold tracking-tight text-white sm:text-4xl">
              Payment should unlock a workflow, not just a line item.
            </h2>
          </div>
          <Link href="/dashboard/support" className="text-sm font-semibold text-cyan-200 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
            Billing support →
          </Link>
        </div>
        <div className="mt-5 grid gap-3 lg:grid-cols-3">
          {PAID_PLAN_COMMANDS.map((item) => (
            <Link key={item.planKey} href={item.plan.checkoutPath} className="group relative overflow-hidden rounded-[1.35rem] border border-white/10 bg-slate-950/60 p-5 transition hover:-translate-y-0.5 hover:border-cyan-300/35 hover:bg-slate-900/80 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/55 to-transparent" />
              <div className="flex items-start justify-between gap-3">
                <span className="text-3xl font-semibold tracking-tight text-cyan-100/80">{item.index}</span>
                <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">{item.plan.price}</span>
              </div>
              <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">{item.title}</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">{item.moment}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{item.activation}</p>
              <p className="mt-4 rounded-[1rem] border border-white/10 bg-black/20 p-3 text-xs leading-5 text-slate-400">{item.exclusion}</p>
              <div className="mt-4 grid gap-2">
                {item.revenueStage.requiredCustomerContext.slice(0, 2).map((context) => (
                  <p key={context} className="rounded-[1rem] border border-cyan-300/15 bg-cyan-300/[0.07] p-3 text-xs leading-5 text-cyan-50">Cendorq needs: {context}</p>
                ))}
              </div>
              <span className="mt-5 inline-flex text-sm font-semibold text-cyan-100 transition group-hover:text-white">Open checkout →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative z-10 mt-7 grid gap-3 md:grid-cols-3" aria-label="Billing support actions">
        {BILLING_ACTIONS.map((item) => (
          <Link key={item.href} href={item.href} className="system-surface rounded-[1.25rem] p-4 transition hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950 sm:p-5">
            <h3 className="text-xl font-semibold tracking-tight text-white">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">{item.copy}</p>
          </Link>
        ))}
      </section>

      <section className="relative z-10 mt-7 rounded-[1.45rem] border border-white/10 bg-white/[0.035] p-4 sm:p-5" aria-label="Billing safety standard">
        <p className="text-sm font-semibold text-cyan-100">Billing safety standard</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">Money moments should feel calm, exact, and recoverable.</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {BILLING_SAFETY_RULES.map((rule) => (
            <p key={rule} className="rounded-[1rem] border border-white/10 bg-black/20 p-3 text-xs leading-6 text-slate-300">{rule}</p>
          ))}
        </div>
      </section>

      <section className="sr-only" aria-label="Billing command standard">
        Plan billing command center. Know what is active, what unlocked, and what Cendorq needs next. Billing should not feel like a receipt drawer. Billing status summary. Paid plan command system. Payment should unlock a workflow, not just a line item. Money moments should feel calm, exact, and recoverable. Current access. Next paid depth. Billing safety. No secrets in support. Deep Review $497. Build Fix $1,497. Ongoing Control $597/month. Includes and not included. Checkout success parity. Billing activation must preserve the same includes, exclusions, workflow, and post-payment next step shown in checkout success. {PLAN_VALUE_SEPARATION_RULES.join(" ")} {PAID_PLAN_COMMANDS.map((item) => `${item.planKey} ${item.title} ${item.plan.price} ${item.activation} ${item.exclusion} ${item.plan.afterPaymentNextStep} ${item.revenueStage.requiredCustomerContext.join(" ")}`).join(" ")} {CENDORQ_POST_PAYMENT_EMAILS.map((email) => `${email.subject} ${email.dashboardPath} ${email.customerGoal}`).join(" ")} {BILLING_SAFETY_RULES.join(" ")} {BILLING_HANDOFFS.map((handoff) => `${handoff.decision} ${handoff.surfaceKey} ${handoff.currentState} ${handoff.safeNextAction} ${handoff.recoveryPath} ${handoff.connectedDestination}`).join(" ")}
      </section>
    </main>
  );
}
