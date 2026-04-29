import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { CUSTOMER_NOTIFICATION_CONTRACTS, type CustomerNotificationKey } from "@/lib/customer-notification-contracts";
import { CUSTOMER_SUPPORT_LIFECYCLE_NOTIFICATION_CONTRACTS } from "@/lib/customer-support-lifecycle-notification-contracts";

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
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-8 text-white sm:px-6 md:py-12 xl:py-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(103,232,249,0.12),transparent_34%),radial-gradient(circle_at_84%_12%,rgba(14,165,233,0.1),transparent_30%)]" />

      <section className="system-panel-authority relative z-10 rounded-[2.5rem] p-6 sm:p-10">
        <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">Notification center</div>
        <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Important alerts, without noise or hidden risk.
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
          Cendorq notifications are designed to keep account, report, billing, support, and security actions clear while never exposing raw evidence, raw security payloads, raw billing IDs, secrets, prompts, or private report internals.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/dashboard" className="rounded-2xl bg-cyan-300 px-5 py-3 text-center text-sm font-bold text-slate-950 transition hover:bg-cyan-200">
            Back to dashboard
          </Link>
          <Link href="/dashboard/support/status" className="rounded-2xl border border-cyan-300/25 px-5 py-3 text-center text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/10">
            Track support status
          </Link>
          <Link href="/dashboard/billing" className="rounded-2xl border border-white/10 px-5 py-3 text-center text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10">
            Open billing center
          </Link>
        </div>
      </section>

      <section className="relative z-10 mt-8 grid gap-4 lg:grid-cols-4">
        {FEATURED_NOTIFICATIONS.map((notification) => (
          <article key={notification.key} className="system-surface rounded-[1.5rem] p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">{notification.priority}</div>
              <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-semibold text-slate-300">{notification.category}</span>
            </div>
            <h2 className="mt-4 text-xl font-semibold tracking-tight text-white">{notification.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">{notification.body}</p>
            <Link href={notification.primaryPath} className="mt-5 inline-flex rounded-2xl border border-cyan-300/25 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/10">
              {notification.primaryCta}
            </Link>
          </article>
        ))}
      </section>

      <section className="relative z-10 mt-8 grid gap-5 lg:grid-cols-3">
        {NOTIFICATION_GROUPS.map((group) => {
          const notifications = CUSTOMER_NOTIFICATION_CONTRACTS.filter((notification) => hasNotificationKey(group.keys, notification.key));
          return (
            <article key={group.label} className="system-surface rounded-[2rem] p-6">
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">{group.label}</div>
              <p className="mt-3 text-sm leading-7 text-slate-300">{group.copy}</p>
              <div className="mt-5 grid gap-3">
                {notifications.map((notification) => (
                  <div key={notification.key} className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-4">
                    <div className="text-sm font-semibold text-white">{notification.title}</div>
                    <p className="mt-2 text-xs leading-6 text-slate-400">{notification.conversionRole}</p>
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </section>

      <section className="relative z-10 mt-8 system-panel-authority rounded-[2rem] p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">Support lifecycle</div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">Status changes should notify without exposing internals.</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
              Support lifecycle notifications point customers to status tracking, safe resubmission, support center, or new request paths while suppressing duplicate anxiety and blocking raw evidence, internal notes, operator identity, risk scoring, attacker details, and unapproved promises.
            </p>
          </div>
          <Link href="/dashboard/support/status" className="rounded-2xl border border-cyan-300/25 px-5 py-3 text-center text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/10">
            View support status
          </Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {CUSTOMER_SUPPORT_LIFECYCLE_NOTIFICATION_CONTRACTS.map((notification) => (
            <article key={notification.key} className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
              <div className="flex items-center justify-between gap-3">
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">{notification.priority}</div>
                <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-semibold text-slate-300">support</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight text-white">{notification.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{notification.body}</p>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <Link href={notification.primaryPath} className="inline-flex rounded-2xl border border-cyan-300/25 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/10">
                  {notification.primaryCta}
                </Link>
                {notification.secondaryCta && notification.secondaryPath ? (
                  <Link href={notification.secondaryPath} className="inline-flex rounded-2xl border border-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10">
                    {notification.secondaryCta}
                  </Link>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="relative z-10 mt-8 rounded-[2rem] border border-cyan-300/15 bg-cyan-300/10 p-6">
        <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-100">Notification safety rules</div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {[
            "Notifications require customer ownership and route authorization.",
            "Billing alerts require entitlement and billing-state checks.",
            "Conversion alerts require proof, confidence, limitation, and plan-stage logic.",
            "Security alerts never reveal attacker details, risk-scoring internals, or secrets.",
            "Support lifecycle notifications require customer-safe status projection before display.",
            "Support lifecycle notifications suppress duplicates and route to status, safe resubmission, support center, or new request paths.",
          ].map((rule) => (
            <div key={rule} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-cyan-50">
              {rule}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function hasNotificationKey(keys: readonly CustomerNotificationKey[], key: CustomerNotificationKey) {
  return keys.some((candidate) => candidate === key);
}
