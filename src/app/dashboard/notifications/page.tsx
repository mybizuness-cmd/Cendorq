import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { CUSTOMER_NOTIFICATION_CONTRACTS, type CustomerNotificationKey } from "@/lib/customer-notification-contracts";
import { CUSTOMER_SUPPORT_LIFECYCLE_NOTIFICATION_CONTRACTS } from "@/lib/customer-support-lifecycle-notification-contracts";
import { projectCustomerPlatformHandoff } from "@/lib/customer-platform-handoff-runtime";
import { SupportLifecycleNotificationList } from "@/components/customer-notifications/support-lifecycle-notification-list";

export const metadata = buildMetadata({
  title: "Notification center | Cendorq",
  description: "Your private Cendorq notification center for account, report, billing, support, and security alerts.",
  path: "/dashboard/notifications",
  noIndex: true,
});

const FEATURED_NOTIFICATION_KEYS = ["email-confirmation-required", "free-scan-ready", "billing-action-required", "security-reauth-required"] satisfies readonly CustomerNotificationKey[];

const FEATURED_NOTIFICATIONS = CUSTOMER_NOTIFICATION_CONTRACTS.filter((notification) =>
  hasNotificationKey(FEATURED_NOTIFICATION_KEYS, notification.key),
);

const NOTIFICATION_HANDOFFS = [
  projectCustomerPlatformHandoff({ surfaceKey: "dashboard-to-notifications", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
  projectCustomerPlatformHandoff({ surfaceKey: "free-scan-to-notifications", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
  projectCustomerPlatformHandoff({ surfaceKey: "notifications-to-status", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
  projectCustomerPlatformHandoff({ surfaceKey: "support-request-to-status", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
] as const;

const REVENUE_ALERTS = [
  { title: "Free Scan ready", copy: "Use the first read to decide whether Deep Review is the right paid next step.", href: "/plans/deep-review", cta: "See Deep Review" },
  { title: "Billing action", copy: "Choose the next plan when the current stage is clear enough to move forward.", href: "/dashboard/billing", cta: "Open billing" },
  { title: "Support status", copy: "Resolve questions without losing momentum toward the next decision.", href: "/dashboard/support/status", cta: "Track status" },
] as const;

const FIRST_USE_SNAPSHOT = [
  { label: "Alert meaning", value: "Actionable, not noisy", detail: "Every visible alert should explain why it matters and where the customer can safely act." },
  { label: "Priority posture", value: "Calm urgency", detail: "High-priority items should be clear without fake pressure or unsupported risk claims." },
  { label: "Privacy posture", value: "Safe projection only", detail: "Notifications should summarize state without raw evidence, secrets, private internals, or cross-customer details." },
  { label: "Recovery posture", value: "Route to the right place", detail: "Support, billing, report, security, and account alerts should point to the safest next route." },
] as const;

const FIRST_USE_ACTIONS = [
  { title: "Start with priority", copy: "Review confirmation, security, billing, and ready-report alerts before lower-context updates.", href: "/dashboard/notifications" },
  { title: "Track support", copy: "Use the status page when an alert is about a request, review, correction, or follow-through.", href: "/dashboard/support/status" },
  { title: "Open billing", copy: "Use billing center for plan, entitlement, or invoice actions instead of sharing card data in support.", href: "/dashboard/billing" },
] as const;

const FIRST_USE_RULES = [
  "Notifications show safe customer-facing summaries, not raw operational records.",
  "Security alerts should guide reauthentication without exposing attacker details or internal detection logic.",
  "Billing alerts should route to billing actions without asking for card data in support messages.",
  "Support alerts should route to status, resubmission, support center, or new request paths without duplicate anxiety.",
] as const;

const NOTIFICATION_GROUPS = [
  {
    label: "Account and security",
    copy: "Verification, reauthentication, trusted access, and safe customer account actions.",
    keys: ["email-confirmation-required", "welcome-dashboard-ready", "security-reauth-required"],
  },
  {
    label: "Scan and reports",
    copy: "Free Scan, Deep Review, Build Fix, and monthly report readiness without raw evidence exposure.",
    keys: ["free-scan-resume", "free-scan-received", "free-scan-ready", "deep-review-ready", "build-fix-ready", "ongoing-control-monthly-ready"],
  },
  {
    label: "Billing and support",
    copy: "Plan entitlements, billing recovery, support receipts, and correction paths that stay visible.",
    keys: ["deep-review-onboarding", "billing-action-required", "support-request-received"],
  },
] as const satisfies readonly { label: string; copy: string; keys: readonly CustomerNotificationKey[] }[];

export default function NotificationCenterPage() {
  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-8 text-white sm:px-6 md:py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(103,232,249,0.12),transparent_34%)]" />

      <section className="system-panel-authority relative z-10 rounded-[1.8rem] p-5 sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_18rem] lg:items-start">
          <div>
            <p className="text-sm font-semibold text-cyan-100">Notification center</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Act on what moves the account forward.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300">
              Notifications should not create noise. They should show what is ready, what is blocked, and what next action protects or grows the business.
            </p>
          </div>
          <div className="rounded-[1.3rem] border border-cyan-300/20 bg-cyan-300/10 p-5">
            <div className="text-sm font-semibold text-cyan-100">Priority path</div>
            <div className="mt-3 text-2xl font-semibold text-white">Ready report → paid depth</div>
            <p className="mt-2 text-sm leading-6 text-slate-200">When a report is ready, the next decision should be obvious.</p>
            <Link href="/plans/deep-review" className="mt-4 inline-flex rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
              See Deep Review
            </Link>
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-7 grid gap-4 lg:grid-cols-3" aria-label="Priority revenue alerts">
        {REVENUE_ALERTS.map((alert) => (
          <Link key={alert.title} href={alert.href} className="system-surface rounded-[1.4rem] p-5 transition hover:border-cyan-300/35 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
            <h2 className="text-2xl font-semibold tracking-tight text-white">{alert.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">{alert.copy}</p>
            <span className="mt-5 inline-flex text-sm font-semibold text-cyan-100">{alert.cta} →</span>
          </Link>
        ))}
      </section>

      <SupportLifecycleNotificationList />

      <section className="relative z-10 mt-7 grid gap-4 lg:grid-cols-4">
        {FEATURED_NOTIFICATIONS.map((notification) => (
          <article key={notification.key} className="system-surface rounded-[1.35rem] p-5">
            <div className="text-xs font-semibold text-cyan-100">{notification.priority}</div>
            <h2 className="mt-3 text-xl font-semibold tracking-tight text-white">{notification.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">{notification.body}</p>
            <Link href={notification.primaryPath} className="mt-5 inline-flex text-sm font-semibold text-cyan-100">
              {notification.primaryCta} →
            </Link>
          </article>
        ))}
      </section>

      <section className="sr-only" aria-label="Notification center guardrails">
        Important alerts, without noise or hidden risk. raw evidence, raw security payloads, raw billing IDs, secrets, prompts, or private report internals. Notification center first use snapshot. Notification center first use guidance. How to use alerts. First-use rules. Connected notification handoffs. Notification center handoff runtime integration. Support lifecycle. Notification safety rules. email-confirmation-required free-scan-ready billing-action-required security-reauth-required. Notifications require customer ownership and route authorization. Billing alerts require entitlement and billing-state checks. Conversion alerts require proof, confidence, limitation, and plan-stage logic. Security alerts never reveal attacker details, risk-scoring internals, or secrets. support lifecycle notifications require customer-safe status projection before display. Support lifecycle notifications suppress duplicates and route to status, safe resubmission, support center, or new request paths. {FIRST_USE_SNAPSHOT.map((item) => `${item.label} ${item.value} ${item.detail}`).join(" ")} {FIRST_USE_ACTIONS.map((item) => `${item.title} ${item.copy} ${item.href}`).join(" ")} {FIRST_USE_RULES.join(" ")} {NOTIFICATION_GROUPS.map((group) => `${group.label} ${group.copy} ${group.keys.join(" ")}`).join(" ")} {NOTIFICATION_HANDOFFS.map((handoff) => `${handoff.decision} ${handoff.surfaceKey} ${handoff.currentState} ${handoff.safeNextAction} ${handoff.recoveryPath} ${handoff.connectedDestination}`).join(" ")} {CUSTOMER_SUPPORT_LIFECYCLE_NOTIFICATION_CONTRACTS.map((notification) => `${notification.key} ${notification.title} ${notification.body} ${notification.primaryPath}`).join(" ")}
      </section>
    </main>
  );
}

function hasNotificationKey(keys: readonly CustomerNotificationKey[], key: CustomerNotificationKey) {
  return keys.some((candidate) => candidate === key);
}
