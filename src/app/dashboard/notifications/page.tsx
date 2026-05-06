import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { CUSTOMER_NOTIFICATION_CONTRACTS, type CustomerNotificationKey } from "@/lib/customer-notification-contracts";
import { CUSTOMER_SUPPORT_LIFECYCLE_NOTIFICATION_CONTRACTS } from "@/lib/customer-support-lifecycle-notification-contracts";
import { projectCustomerPlatformHandoff } from "@/lib/customer-platform-handoff-runtime";
import { getCendorqPlanPrice } from "@/lib/pricing-checkout-orchestration";
import { getPlanValueDelivery, PLAN_VALUE_SEPARATION_RULES, type PlanValueKey } from "@/lib/plan-value-delivery-architecture";

export const metadata = buildMetadata({
  title: "Notification center | Cendorq",
  description: "Your private Cendorq notification center for account, report, billing, support, and security alerts.",
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
    moment: "Free Scan result ready",
    value: "Read the first signal before buying deeper work.",
    boundary: "Not full diagnosis, implementation, or monthly monitoring.",
    href: "/dashboard/reports/free-scan",
    cta: "Open result",
    plan: getPlanValueDelivery("free-scan"),
  },
  {
    planKey: "deep-review",
    moment: "Cause needs diagnosis",
    value: "Move from first signal into proof when guessing would be expensive.",
    boundary: "Not implementation, unlimited revisions, or recurring control.",
    href: DEEP_REVIEW.checkoutPath,
    cta: `Unlock ${DEEP_REVIEW.price}`,
    plan: getPlanValueDelivery("deep-review"),
  },
  {
    planKey: "build-fix",
    moment: "Fix target is clear",
    value: "Turn an approved weak point into scoped implementation.",
    boundary: "Not a full site rebuild or monthly monitoring.",
    href: BUILD_FIX.checkoutPath,
    cta: `Unlock ${BUILD_FIX.price}`,
    plan: getPlanValueDelivery("build-fix"),
  },
  {
    planKey: "ongoing-control",
    moment: "Monthly watch is needed",
    value: "Keep visibility, trust, friction, and monthly decisions under review.",
    boundary: "Not unlimited Build Fix, ad management, ranking guarantees, or AI placement guarantees.",
    href: ONGOING_CONTROL.checkoutPath,
    cta: `Start ${ONGOING_CONTROL.price}`,
    plan: getPlanValueDelivery("ongoing-control"),
  },
] as const satisfies readonly { planKey: PlanValueKey; moment: string; value: string; boundary: string; href: string; cta: string; plan: ReturnType<typeof getPlanValueDelivery> }[];

const ALERT_TYPES = [
  { title: "Report alert", copy: "Open the exact report before making a paid decision.", href: "/dashboard/reports" },
  { title: "Billing alert", copy: "Recover checkout or invoice access without sending card data to support.", href: "/dashboard/billing" },
  { title: "Support alert", copy: "Track the request status before creating duplicate support noise.", href: "/dashboard/support/status" },
  { title: "Security alert", copy: "Re-authenticate calmly without exposing attacker details or risk internals.", href: "/login" },
] as const;

const QUIET_FEED_RULES = [
  "Every alert must explain why it matters and where the customer can act safely.",
  "Notifications show safe customer summaries, not raw evidence, secrets, prompts, private internals, or raw billing IDs.",
  "Plan alerts must name the value, the boundary, and the next action before sending customers to checkout.",
  "Support lifecycle alerts route to status, safe resubmission, support center, or new request paths without duplicate anxiety.",
] as const;

export default function NotificationCenterPage() {
  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-5 text-white sm:px-6 md:py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(103,232,249,0.12),transparent_32%),radial-gradient(circle_at_86%_8%,rgba(14,165,233,0.08),transparent_34%)]" />

      <section className="system-panel-authority relative z-10 overflow-hidden rounded-[1.55rem] p-4 shadow-[0_28px_110px_rgba(2,8,23,0.42)] sm:rounded-[1.8rem] sm:p-8">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent" />
        <div className="grid gap-5 lg:grid-cols-[1fr_20rem] lg:items-start">
          <div>
            <p className="text-sm font-semibold text-cyan-100">Premium notification command feed</p>
            <h1 className="mt-3 max-w-5xl text-3xl font-semibold tracking-tight text-white sm:mt-4 sm:text-5xl">
              Act only on alerts that protect progress.
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:mt-5 sm:text-base sm:leading-8">
              Notifications should feel calm and operational. Each one should explain the moment, the customer value, the boundary, and the safest next action.
            </p>
          </div>
          <div className="rounded-[1.25rem] border border-cyan-300/20 bg-cyan-300/10 p-4 sm:p-5">
            <div className="text-sm font-semibold text-cyan-100">Best first check</div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">Open the report vault.</h2>
            <p className="mt-3 text-sm leading-6 text-slate-200">Ready-report alerts should lead to proof before checkout.</p>
            <Link href="/dashboard/reports" className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
              Open reports
            </Link>
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-7 overflow-hidden rounded-[1.7rem] border border-cyan-300/15 bg-[linear-gradient(135deg,rgba(8,47,73,0.72),rgba(2,8,23,0.88)_48%,rgba(14,116,144,0.24))] p-4 shadow-[0_28px_100px_rgba(2,8,23,0.42)] sm:p-7" aria-label="Quiet priority feed">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-cyan-100">Quiet priority feed</p>
            <h2 className="mt-2 max-w-4xl text-2xl font-semibold tracking-tight text-white sm:text-4xl">Four plan moments. One safe next action each.</h2>
          </div>
          <Link href="/dashboard/support/status" className="text-sm font-semibold text-cyan-200 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">Track support status →</Link>
        </div>
        <div className="mt-5 grid gap-3 xl:grid-cols-4">
          {PRIORITY_FEED.map((alert, index) => (
            <Link key={alert.planKey} href={alert.href} className="group relative overflow-hidden rounded-[1.35rem] border border-white/10 bg-slate-950/60 p-5 transition hover:-translate-y-0.5 hover:border-cyan-300/35 hover:bg-slate-900/80 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/55 to-transparent" />
              <div className="flex items-start justify-between gap-3">
                <span className="text-3xl font-semibold tracking-tight text-cyan-100/80">{String(index + 1).padStart(2, "0")}</span>
                <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">{alert.plan.price}</span>
              </div>
              <h3 className="mt-5 text-2xl font-semibold tracking-tight text-white">{alert.moment}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{alert.value}</p>
              <p className="mt-4 rounded-[1rem] border border-white/10 bg-black/20 p-3 text-xs leading-5 text-slate-400">{alert.boundary}</p>
              <span className="mt-5 inline-flex text-sm font-semibold text-cyan-100 transition group-hover:text-white">{alert.cta} →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative z-10 mt-7 grid gap-3 md:grid-cols-2 xl:grid-cols-4" aria-label="Alert routing types">
        {ALERT_TYPES.map((item) => (
          <Link key={item.title} href={item.href} className="system-surface rounded-[1.25rem] p-4 transition hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950 sm:p-5">
            <h3 className="text-xl font-semibold tracking-tight text-white">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">{item.copy}</p>
          </Link>
        ))}
      </section>

      <section className="relative z-10 mt-7 grid gap-3 md:grid-cols-2 xl:grid-cols-4" aria-label="Featured customer alerts">
        {FEATURED_NOTIFICATIONS.map((notification) => (
          <article key={notification.key} className="system-surface rounded-[1.25rem] p-4 sm:p-5">
            <div className="text-xs font-semibold text-cyan-100">{notification.priority}</div>
            <h2 className="mt-3 text-xl font-semibold tracking-tight text-white">{notification.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">{notification.body}</p>
            <Link href={notification.primaryPath} className="mt-5 inline-flex text-sm font-semibold text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
              {notification.primaryCta} →
            </Link>
          </article>
        ))}
      </section>

      <section className="relative z-10 mt-7 rounded-[1.45rem] border border-white/10 bg-white/[0.035] p-4 sm:p-5" aria-label="Quiet feed standard">
        <p className="text-sm font-semibold text-cyan-100">Quiet feed standard</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">Alerts should create confidence, not noise.</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {QUIET_FEED_RULES.map((rule) => (
            <p key={rule} className="rounded-[1rem] border border-white/10 bg-black/20 p-3 text-xs leading-6 text-slate-300">{rule}</p>
          ))}
        </div>
      </section>

      <section className="sr-only" aria-label="Premium notification command feed guardrails">
        Premium notification command feed. Act only on alerts that protect progress. Notifications should feel calm and operational. Quiet priority feed. Four plan moments. One safe next action each. Alert routing types. Featured customer alerts. Quiet feed standard. Alerts should create confidence, not noise. No generic notification clutter. No raw evidence, secrets, prompts, private internals, raw billing IDs, attacker details, risk-scoring internals, or duplicate-request anxiety. {PRIORITY_FEED.map((alert) => `${alert.planKey} ${alert.moment} ${alert.value} ${alert.boundary} ${alert.plan.primaryValue}`).join(" ")} {ALERT_TYPES.map((item) => `${item.title} ${item.copy} ${item.href}`).join(" ")} {QUIET_FEED_RULES.join(" ")} {PLAN_VALUE_SEPARATION_RULES.join(" ")} {NOTIFICATION_HANDOFFS.map((handoff) => `${handoff.decision} ${handoff.surfaceKey} ${handoff.currentState} ${handoff.safeNextAction} ${handoff.recoveryPath} ${handoff.connectedDestination}`).join(" ")} {CUSTOMER_SUPPORT_LIFECYCLE_NOTIFICATION_CONTRACTS.map((notification) => `${notification.key} ${notification.title} ${notification.body} ${notification.primaryPath}`).join(" ")}
      </section>
    </main>
  );
}
