import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { CUSTOMER_NOTIFICATION_CONTRACTS, type CustomerNotificationKey } from "@/lib/customer-notification-contracts";
import { CUSTOMER_SUPPORT_LIFECYCLE_NOTIFICATION_CONTRACTS } from "@/lib/customer-support-lifecycle-notification-contracts";
import { projectCustomerPlatformHandoff } from "@/lib/customer-platform-handoff-runtime";
import { getCendorqPlanPrice } from "@/lib/pricing-checkout-orchestration";
import { getPlanValueDelivery, PLAN_VALUE_SEPARATION_RULES, type PlanValueKey } from "@/lib/plan-value-delivery-architecture";

export const metadata = buildMetadata({
  title: "Market signal feed | Cendorq",
  description: "Your private Cendorq signal feed for market proof, billing, support, account, and security actions that protect command progress.",
  path: "/dashboard/notifications",
  noIndex: true,
});

const DEEP_REVIEW = getCendorqPlanPrice("deep-review");
const BUILD_FIX = getCendorqPlanPrice("build-fix");
const ONGOING_CONTROL = getCendorqPlanPrice("ongoing-control");

const FEATURED_NOTIFICATION_KEYS: readonly CustomerNotificationKey[] = ["email-confirmation-required", "free-scan-ready", "billing-action-required", "security-reauth-required"];
const FEATURED_NOTIFICATIONS = CUSTOMER_NOTIFICATION_CONTRACTS.filter((notification) => FEATURED_NOTIFICATION_KEYS.includes(notification.key));

const NOTIFICATION_HANDOFFS = [
  projectCustomerPlatformHandoff({ surfaceKey: "dashboard-to-notifications", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
  projectCustomerPlatformHandoff({ surfaceKey: "free-scan-to-notifications", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
  projectCustomerPlatformHandoff({ surfaceKey: "notifications-to-status", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
] as const;

const PRIORITY_FEED = [
  {
    planKey: "free-scan",
    command: "Scan",
    moment: "Market signal ready",
    value: "Read the first signal before buying deeper work.",
    boundary: "Not full diagnosis, implementation, or monthly monitoring.",
    href: "/dashboard/reports/free-scan",
    cta: "Open signal",
    plan: getPlanValueDelivery("free-scan"),
  },
  {
    planKey: "deep-review",
    command: "Diagnose",
    moment: "Cause needs proof",
    value: "Move from first signal into proof when guessing would be expensive.",
    boundary: "Not implementation, unlimited revisions, or recurring control.",
    href: DEEP_REVIEW.checkoutPath,
    cta: `Unlock ${DEEP_REVIEW.price}`,
    plan: getPlanValueDelivery("deep-review"),
  },
  {
    planKey: "build-fix",
    command: "Fix",
    moment: "Fix target is clear",
    value: "Turn an approved weak point into scoped implementation.",
    boundary: "Not a full site rebuild or monthly monitoring.",
    href: BUILD_FIX.checkoutPath,
    cta: `Unlock ${BUILD_FIX.price}`,
    plan: getPlanValueDelivery("build-fix"),
  },
  {
    planKey: "ongoing-control",
    command: "Control",
    moment: "Monthly watch is needed",
    value: "Keep visibility, trust, friction, and monthly decisions under review.",
    boundary: "Not unlimited Build Fix, ad management, ranking guarantees, or AI placement guarantees.",
    href: ONGOING_CONTROL.checkoutPath,
    cta: `Start ${ONGOING_CONTROL.price}`,
    plan: getPlanValueDelivery("ongoing-control"),
  },
] as const satisfies readonly { planKey: PlanValueKey; command: string; moment: string; value: string; boundary: string; href: string; cta: string; plan: ReturnType<typeof getPlanValueDelivery> }[];

const ALERT_TYPES = [
  { title: "Proof signal", copy: "Open the exact market record before making a paid decision.", href: "/dashboard/reports" },
  { title: "Access signal", copy: "Recover checkout or invoice access without sending card data to support.", href: "/dashboard/billing" },
  { title: "Support signal", copy: "Track status before creating duplicate support noise.", href: "/dashboard/support/status" },
  { title: "Security signal", copy: "Re-authenticate calmly without exposing attacker details or risk internals.", href: "/login" },
] as const;

const QUIET_FEED_RULES = [
  "Every alert must explain why it matters and where the customer can act safely.",
  "Notifications show safe customer summaries, not raw evidence, secrets, prompts, private internals, or raw billing IDs.",
  "Command alerts must name the value, the boundary, and the next action before sending customers to checkout.",
  "Support lifecycle alerts route to status, safe resubmission, support center, or new request paths without duplicate anxiety.",
] as const;

export default function NotificationCenterPage() {
  return (
    <main className="relative isolate overflow-hidden text-white">
      <SignalAtmosphere />

      <section className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-[92rem] gap-8 px-4 pb-12 pt-6 sm:px-6 md:pb-18 md:pt-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
        <div className="relative z-10">
          <div className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-100 shadow-[0_0_60px_rgba(34,211,238,0.12)]">
            Market signal feed
          </div>
          <h1 className="mt-6 max-w-5xl text-[clamp(3.2rem,7.3vw,7.5rem)] font-semibold leading-[0.84] tracking-[-0.08em] text-white">
            Act only on signals that protect market progress.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl sm:leading-9">
            This feed should stay quiet until something matters: proof is ready, access changes, support needs context, or a safer action is required.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/reports" className="inline-flex min-h-14 items-center justify-center rounded-full bg-cyan-200 px-9 py-4 text-base font-black text-slate-950 shadow-[0_22px_80px_rgba(103,232,249,0.24)] transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
              Open market proof
            </Link>
            <Link href="/dashboard/support/status" className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-9 py-4 text-base font-bold text-white shadow-[0_18px_70px_rgba(2,8,23,0.32)] transition hover:border-cyan-200/40 hover:bg-cyan-200/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
              Track status
            </Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.7rem] border border-cyan-200/22 bg-[radial-gradient(circle_at_50%_0%,rgba(103,232,249,0.2),transparent_36%),linear-gradient(145deg,rgba(8,47,73,0.9),rgba(2,8,23,0.98)_52%,rgba(14,116,144,0.32))] p-5 shadow-[0_55px_200px_rgba(2,8,23,0.72)] sm:p-7">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/90 to-transparent" />
          <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-100">Best first check</p>
          <h2 className="mt-4 text-5xl font-semibold tracking-[-0.07em] text-white sm:text-6xl">Open the proof record.</h2>
          <p className="mt-5 text-base leading-8 text-slate-300">Ready alerts should lead to proof before checkout.</p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {ALERT_TYPES.slice(0, 2).map((item) => (
              <Link key={item.title} href={item.href} className="rounded-[1.6rem] border border-white/10 bg-black/24 p-5 transition hover:border-cyan-200/30 hover:bg-cyan-200/[0.08]">
                <div className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-100">{item.title}</div>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.copy}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-10 sm:px-6" aria-label="Priority command feed">
        <div className="overflow-hidden rounded-[2.5rem] border border-cyan-300/15 bg-[linear-gradient(135deg,rgba(8,47,73,0.72),rgba(2,8,23,0.94)_46%,rgba(14,116,144,0.22))] shadow-[0_45px_180px_rgba(2,8,23,0.55)]">
          <div className="grid gap-0 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-100">Priority command feed</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-white sm:text-6xl">Scan. Diagnose. Fix. Control. One safe next action each.</h2>
              <p className="mt-5 text-base leading-8 text-slate-300">No generic clutter. Every signal should point to proof, access, status, or safe recovery.</p>
              <Link href="/dashboard/support/status" className="mt-7 inline-flex text-sm font-bold text-cyan-100 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">Track support status →</Link>
            </div>
            <div className="divide-y divide-white/10">
              {PRIORITY_FEED.map((alert) => (
                <Link key={alert.planKey} href={alert.href} className="group grid gap-4 p-5 transition hover:bg-cyan-200/[0.06] focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950 sm:grid-cols-[11rem_1fr_auto] sm:items-center sm:p-6">
                  <div>
                    <div className="text-4xl font-semibold tracking-[-0.06em] text-white">{alert.command}</div>
                    <div className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-cyan-100/75">{alert.moment}</div>
                  </div>
                  <p className="max-w-2xl text-sm leading-6 text-slate-300">{alert.value}</p>
                  <div className="flex items-center justify-between gap-4 sm:block sm:text-right">
                    <div className="text-sm font-black text-cyan-100">{alert.plan.price}</div>
                    <span className="mt-1 inline-flex text-sm font-bold text-cyan-100 transition group-hover:text-white">{alert.cta} →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-10 sm:px-6" aria-label="Signal routing types">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {ALERT_TYPES.map((item) => (
            <Link key={item.title} href={item.href} className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-[0_24px_90px_rgba(2,8,23,0.34)] transition hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
              <h3 className="text-2xl font-semibold tracking-[-0.04em] text-white">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">{item.copy}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-10 sm:px-6" aria-label="Featured customer signals">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {FEATURED_NOTIFICATIONS.map((notification) => (
            <article key={notification.key} className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-[0_24px_90px_rgba(2,8,23,0.34)]">
              <div className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-100">{notification.priority}</div>
              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-white">{notification.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">{notification.body}</p>
              <Link href={notification.primaryPath} className="mt-5 inline-flex text-sm font-bold text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
                {notification.primaryCta} →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-16 sm:px-6" aria-label="Quiet feed standard">
        <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.025)_38%,rgba(103,232,249,0.08))] p-6 shadow-[0_45px_180px_rgba(2,8,23,0.55)] backdrop-blur-2xl sm:p-8 lg:p-10">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-100">Quiet feed standard</p>
          <h2 className="mt-3 max-w-5xl text-4xl font-semibold tracking-[-0.055em] text-white sm:text-6xl">Signals should create confidence, not noise.</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {QUIET_FEED_RULES.map((rule) => (
              <p key={rule} className="rounded-[1.35rem] border border-white/10 bg-black/25 p-4 text-sm font-semibold leading-7 text-slate-300">{rule}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="sr-only" aria-label="Notification command feed guardrails">
        Market signal feed. Act only on signals that protect market progress. Priority command feed. Scan. Diagnose. Fix. Control. One safe next action each. Signal routing types. Featured customer signals. Quiet feed standard. Signals should create confidence, not noise. No generic notification clutter. No raw evidence, secrets, prompts, private internals, raw billing IDs, attacker details, risk-scoring internals, or duplicate-request anxiety. {PRIORITY_FEED.map((alert) => `${alert.planKey} ${alert.command} ${alert.moment} ${alert.value} ${alert.boundary} ${alert.plan.primaryValue}`).join(" ")} {ALERT_TYPES.map((item) => `${item.title} ${item.copy} ${item.href}`).join(" ")} {QUIET_FEED_RULES.join(" ")} {PLAN_VALUE_SEPARATION_RULES.join(" ")} {NOTIFICATION_HANDOFFS.map((handoff) => `${handoff.decision} ${handoff.surfaceKey} ${handoff.currentState} ${handoff.safeNextAction} ${handoff.recoveryPath} ${handoff.connectedDestination}`).join(" ")} {CUSTOMER_SUPPORT_LIFECYCLE_NOTIFICATION_CONTRACTS.map((notification) => `${notification.key} ${notification.title} ${notification.body} ${notification.primaryPath}`).join(" ")}
      </section>
    </main>
  );
}

function SignalAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(103,232,249,0.16),transparent_30%),radial-gradient(circle_at_86%_6%,rgba(56,189,248,0.11),transparent_27%),linear-gradient(180deg,#020617_0%,#020817_42%,#030712_100%)]" />
      <div className="absolute left-1/2 top-0 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-cyan-300/[0.04] blur-3xl" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.018]" />
    </div>
  );
}
