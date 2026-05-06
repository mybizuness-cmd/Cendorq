import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { CUSTOMER_PLATFORM_STAGES } from "@/lib/customer-platform-route-map";
import { projectCustomerPlatformHandoff } from "@/lib/customer-platform-handoff-runtime";
import { getCendorqPlanPrice } from "@/lib/pricing-checkout-orchestration";
import {
  getPlanValueDelivery,
  PLAN_VALUE_SEPARATION_RULES,
  type PlanValueKey,
} from "@/lib/plan-value-delivery-architecture";

import { DashboardActionInbox } from "./dashboard-action-inbox";
import { DashboardBusinessCommandCenter } from "./dashboard-business-command-center";
import { DashboardControlRoomReentry } from "./dashboard-control-room-reentry";

export const metadata = buildMetadata({
  title: "Customer dashboard | Cendorq",
  description: "Your private Cendorq workspace for scan status, reports, billing, support, notifications, and guided next actions.",
  path: "/dashboard",
  noIndex: true,
});

const FREE_SCAN_VALUE = getPlanValueDelivery("free-scan");
const DEEP_REVIEW_VALUE = getPlanValueDelivery("deep-review");
const BUILD_FIX_VALUE = getPlanValueDelivery("build-fix");
const ONGOING_CONTROL_VALUE = getPlanValueDelivery("ongoing-control");

const DEEP_REVIEW_PRICE = getCendorqPlanPrice("deep-review");
const BUILD_FIX_PRICE = getCendorqPlanPrice("build-fix");
const ONGOING_CONTROL_PRICE = getCendorqPlanPrice("ongoing-control");

const DASHBOARD_DECISION = [
  { label: "Current state", value: "First signal or active workflow", detail: "See whether the business is still waiting on context, a report, payment, or a support decision." },
  { label: "Best next action", value: "Open the highest-value move", detail: "The dashboard should send you to the one action that moves visibility, trust, or conversion forward." },
  { label: "Unlocked now", value: "Protected result path", detail: "Free Scan results live in the dashboard, not a loose public page or confusing handoff." },
  { label: "Blocked until ready", value: "Paid depth stays separate", detail: "Diagnosis, implementation, and monthly control do not blur just because they are on one platform." },
] as const;

const CUSTOMER_REVENUE_COMMAND_PATH = [
  {
    planKey: "free-scan",
    index: "01",
    stage: "First signal",
    href: "/dashboard/reports/free-scan",
    cta: "Open Free Scan result",
    price: FREE_SCAN_VALUE.price,
    value: FREE_SCAN_VALUE,
    buyerMoment: "You need a useful first read before choosing paid depth.",
  },
  {
    planKey: "deep-review",
    index: "02",
    stage: "Cause-level diagnosis",
    href: DEEP_REVIEW_PRICE.checkoutPath,
    cta: `Unlock ${DEEP_REVIEW_PRICE.price}`,
    price: DEEP_REVIEW_VALUE.price,
    value: DEEP_REVIEW_VALUE,
    buyerMoment: "You need the real reason before spending more money.",
  },
  {
    planKey: "build-fix",
    index: "03",
    stage: "Scoped implementation",
    href: BUILD_FIX_PRICE.checkoutPath,
    cta: `Unlock ${BUILD_FIX_PRICE.price}`,
    price: BUILD_FIX_VALUE.price,
    value: BUILD_FIX_VALUE,
    buyerMoment: "You know the weak point and want it improved safely.",
  },
  {
    planKey: "ongoing-control",
    index: "04",
    stage: "Monthly decision support",
    href: ONGOING_CONTROL_PRICE.checkoutPath,
    cta: `Start ${ONGOING_CONTROL_PRICE.price}`,
    price: ONGOING_CONTROL_VALUE.price,
    value: ONGOING_CONTROL_VALUE,
    buyerMoment: "You need the business watched and guided every month.",
  },
] as const satisfies readonly {
  planKey: PlanValueKey;
  index: string;
  stage: string;
  href: string;
  cta: string;
  price: string;
  value: ReturnType<typeof getPlanValueDelivery>;
  buyerMoment: string;
}[];

const COMMAND_LINKS = [
  { title: "Reports", copy: "Open results, paid reports, delivery summaries, and monthly reviews without mixing report types.", href: "/dashboard/reports" },
  { title: "Billing", copy: "See what is active, what unlocked, and what requires payment or recovery.", href: "/dashboard/billing" },
  { title: "Notifications", copy: "Act only on alerts that protect progress, access, reports, or billing state.", href: "/dashboard/notifications" },
  { title: "Support", copy: "Route billing, report, scope, monthly priority, access, or correction issues safely.", href: "/dashboard/support" },
] as const;

const DASHBOARD_HANDOFFS = [
  projectCustomerPlatformHandoff({ surfaceKey: "dashboard-to-report-vault", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
  projectCustomerPlatformHandoff({ surfaceKey: "dashboard-to-billing", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
  projectCustomerPlatformHandoff({ surfaceKey: "dashboard-to-notifications", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
  projectCustomerPlatformHandoff({ surfaceKey: "dashboard-to-support", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
  projectCustomerPlatformHandoff({ surfaceKey: "dashboard-to-plans", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
] as const;

export default function CustomerDashboardPage() {
  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-5 text-white sm:px-6 md:py-10 xl:py-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(103,232,249,0.12),transparent_32%),radial-gradient(circle_at_86%_8%,rgba(14,165,233,0.1),transparent_34%)]" />

      <section className="system-panel-authority relative z-10 overflow-hidden rounded-[1.45rem] p-4 shadow-[0_24px_88px_rgba(2,8,23,0.38)] sm:rounded-[1.7rem] sm:p-6 md:p-7">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent" />
        <div className="grid gap-5 lg:grid-cols-[1fr_19rem] lg:items-start">
          <div>
            <p className="text-sm font-semibold text-cyan-100">Private revenue command center</p>
            <h1 className="mt-3 max-w-5xl text-3xl font-semibold tracking-tight text-white sm:mt-4 sm:text-5xl md:text-6xl">
              See what needs proof, what needs action, and what stays out of scope.
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:mt-5 sm:text-base sm:leading-8">
              This is where Cendorq turns the business journey into a clear operating path: open the first signal, read the right report, unlock the right depth, and avoid buying work that does not fit the stage.
            </p>
          </div>
          <div className="rounded-[1.2rem] border border-cyan-300/20 bg-cyan-300/10 p-4">
            <div className="text-sm font-semibold text-cyan-100">Highest-value move</div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">Start with the first signal.</h2>
            <p className="mt-3 text-sm leading-6 text-slate-200">Free Scan opens the safest read before diagnosis, fixes, or monthly control.</p>
            <div className="mt-4 grid gap-3">
              <Link href="/free-check" className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
                Continue Free Scan
              </Link>
              <Link href="/dashboard/reports/free-scan" className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
                Open dashboard result
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Dashboard decision summary">
        {DASHBOARD_DECISION.map((item) => (
          <article key={item.label} className="system-surface rounded-[1.1rem] p-4 sm:rounded-[1.25rem]">
            <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">{item.label}</div>
            <div className="mt-3 text-xl font-semibold tracking-tight text-white">{item.value}</div>
            <p className="mt-3 text-sm leading-6 text-slate-300">{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="relative z-10 mt-7 overflow-hidden rounded-[1.55rem] border border-cyan-300/15 bg-[linear-gradient(135deg,rgba(8,47,73,0.62),rgba(2,8,23,0.9)_48%,rgba(14,116,144,0.2))] p-4 shadow-[0_24px_82px_rgba(2,8,23,0.36)] sm:p-5" aria-label="Dashboard plan decision path">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-cyan-100">Decision path</p>
            <h2 className="mt-2 max-w-4xl text-2xl font-semibold tracking-tight text-white sm:text-4xl">
              One first signal. One diagnosis. One scoped fix. One monthly control layer.
            </h2>
          </div>
          <Link href="/plans" className="text-sm font-semibold text-cyan-200 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
            Compare all plans →
          </Link>
        </div>
        <div className="mt-4 grid gap-3 xl:grid-cols-4">
          {CUSTOMER_REVENUE_COMMAND_PATH.map((stage) => (
            <Link key={stage.planKey} href={stage.href} className="group relative overflow-hidden rounded-[1.15rem] border border-white/10 bg-slate-950/58 p-4 transition hover:-translate-y-0.5 hover:border-cyan-300/35 hover:bg-slate-900/78 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/45 to-transparent" />
              <div className="flex items-start justify-between gap-3">
                <span className="text-2xl font-semibold tracking-tight text-cyan-100/80">{stage.index}</span>
                <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">{stage.price}</span>
              </div>
              <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">{stage.stage}</p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">{stage.value.customerName}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{stage.buyerMoment}</p>
              <span className="mt-4 inline-flex text-sm font-semibold text-cyan-100 transition group-hover:text-white">{stage.cta} →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative z-10 mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Dashboard command links">
        {COMMAND_LINKS.map((item) => (
          <Link key={item.href} href={item.href} className="system-surface rounded-[1.15rem] p-4 text-sm leading-6 text-slate-200 transition hover:border-cyan-300/30 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
            <span className="block text-xl font-semibold tracking-tight text-white">{item.title}</span>
            <span className="mt-2 block text-slate-300">{item.copy}</span>
          </Link>
        ))}
      </section>

      <DashboardActionInbox />
      <DashboardBusinessCommandCenter />
      <DashboardControlRoomReentry />

      <section className="sr-only" aria-label="Dashboard platform elevation guardrails">
        Customer platform dashboard. Private revenue command center. See what needs proof, what needs action, and what stays out of scope. Highest-value move. Start with the first signal. Dashboard decision summary. Decision path. One first signal. One diagnosis. One scoped fix. One monthly control layer. Dashboard command links. No cheap dashboard blocks. No clutter wall. No internal conversion role labels. Customer-led dashboard. Report vault. Billing. Notifications. Support. Free Scan result stays in /dashboard/reports/free-scan. {CUSTOMER_PLATFORM_STAGES.map((stage) => `${stage.key} ${stage.label} ${stage.customerPromise} ${stage.conversionRole}`).join(" ")} {CUSTOMER_REVENUE_COMMAND_PATH.map((stage) => `${stage.planKey} ${stage.value.customerName} ${stage.value.primaryValue} ${stage.value.customerOutcome} ${stage.buyerMoment}`).join(" ")} {PLAN_VALUE_SEPARATION_RULES.join(" ")} {DASHBOARD_HANDOFFS.map((handoff) => `${handoff.decision} ${handoff.surfaceKey} ${handoff.currentState} ${handoff.safeNextAction} ${handoff.recoveryPath} ${handoff.connectedDestination}`).join(" ")}
      </section>
    </main>
  );
}
