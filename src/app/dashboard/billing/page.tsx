import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { projectCustomerPlatformHandoff } from "@/lib/customer-platform-handoff-runtime";
import { CENDORQ_POST_PAYMENT_EMAILS, getPaidCendorqPlanPrice } from "@/lib/pricing-checkout-orchestration";
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

const REVENUE_ACTIONS = [
  { title: "Unlock Deep Review", plan: DEEP_REVIEW, value: getPlanValueDelivery("deep-review") },
  { title: "Fix what is costing choices", plan: BUILD_FIX, value: getPlanValueDelivery("build-fix") },
  { title: "Keep monthly control", plan: ONGOING_CONTROL, value: getPlanValueDelivery("ongoing-control") },
] as const;

const BILLING_RECOVERY_ACTIONS = [
  { title: "Compare plans", href: "/plans" },
  { title: "Open notifications", href: "/dashboard/notifications" },
  { title: "Request support", href: "/dashboard/support" },
] as const;

const BILLING_FIRST_USE_SNAPSHOT = [
  { label: "Plan state", value: "Entitlement clarity", detail: "Customers should know what is active, what is pending, and what unlocks only after checkout." },
  { label: "Invoice posture", value: "Recoverable records", detail: "Invoice access and payment history should be explained without exposing raw billing IDs or card data." },
  { label: "Action posture", value: "Safe billing path", detail: "Billing actions should route through approved checkout or billing center paths, not support-message card collection." },
  { label: "Upgrade posture", value: "Proof-led next step", detail: "Plan recommendations should stay tied to stage, evidence, and fit instead of pressure." },
] as const;

const BILLING_SAFETY_RULES = [
  "Never ask customers to submit card numbers, bank details, passwords, private keys, or session tokens through support copy.",
  "Show billing and entitlement state as a safe projection, not raw provider payloads or internal IDs.",
  "Explain failed-payment or invoice actions with a calm recovery path and no fake urgency.",
  "Plan upgrade guidance must separate current access, pending actions, and future entitlements.",
] as const;

export default function BillingPage() {
  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 pb-28 pt-8 text-white sm:px-6 md:py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_0%,rgba(103,232,249,0.12),transparent_34%),radial-gradient(circle_at_84%_12%,rgba(14,165,233,0.08),transparent_30%)]" />

      <section className="system-panel-authority relative z-10 rounded-[1.55rem] p-4 sm:rounded-[1.8rem] sm:p-8">
        <div className="grid gap-5 lg:grid-cols-[1fr_19rem] lg:items-start">
          <div>
            <p className="text-sm font-semibold text-cyan-100">Billing and plans</p>
            <h1 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:mt-4 sm:text-5xl">
              Choose the next paid step without paying twice for the same thing.
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:mt-5 sm:text-base sm:leading-8">
              Billing should make the difference clear: Deep Review diagnoses the reason, Build Fix implements a scoped improvement, and Ongoing Control keeps monthly watch. Each plan unlocks different work.
            </p>
          </div>
          <div className="rounded-[1.2rem] border border-cyan-300/20 bg-cyan-300/10 p-4 sm:rounded-[1.3rem] sm:p-5">
            <div className="text-sm font-semibold text-cyan-100">Best first paid depth</div>
            <div className="mt-2 text-3xl font-semibold text-white sm:mt-3">{DEEP_REVIEW.name}</div>
            <p className="mt-2 text-sm leading-6 text-slate-200">{getPlanValueDelivery("deep-review").primaryValue}</p>
            <Link href={DEEP_REVIEW.checkoutPath} className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950 sm:w-auto">
              Unlock {DEEP_REVIEW.name} {DEEP_REVIEW.price}
            </Link>
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-7 grid gap-4 lg:grid-cols-3" aria-label="Paid next steps">
        {REVENUE_ACTIONS.map((item) => (
          <Link key={item.plan.key} href={item.plan.checkoutPath} className="system-surface rounded-[1.35rem] p-5 transition hover:border-cyan-300/35 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950 sm:rounded-[1.45rem]">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-2xl font-semibold tracking-tight text-white">{item.title}</h2>
              <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-sm font-semibold text-cyan-100">{item.plan.price}</span>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-300">{item.value.primaryValue}</p>
            <p className="mt-3 text-sm leading-7 text-slate-200">{item.value.customerOutcome}</p>
            <div className="mt-4 grid gap-3">
              <div className="rounded-[1.05rem] border border-white/10 bg-white/[0.035] p-3">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-100">Includes</div>
                <p className="mt-2 text-xs leading-5 text-slate-300">{item.value.includes.slice(0, 3).join(" · ")}</p>
              </div>
              <div className="rounded-[1.05rem] border border-white/10 bg-black/20 p-3">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Not included</div>
                <p className="mt-2 text-xs leading-5 text-slate-400">{item.value.doesNotInclude.slice(0, 2).join(" · ")}</p>
              </div>
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-200">After payment: {item.plan.afterPaymentNextStep}</p>
          </Link>
        ))}
      </section>

      <section className="relative z-10 mt-7 grid gap-4 md:grid-cols-3" aria-label="Billing support actions">
        {BILLING_RECOVERY_ACTIONS.map((item) => (
          <Link key={item.href} href={item.href} className="min-h-11 rounded-[1.2rem] border border-white/10 bg-white/[0.035] p-4 text-sm font-semibold text-slate-200 transition hover:border-cyan-300/30 hover:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
            {item.title} →
          </Link>
        ))}
      </section>

      <section className="sr-only" aria-label="Billing guardrails">
        Billing and plan center. Final fixed plan prices. Deep Review $497. Build Fix $1,497. Ongoing Control $597/month. Plan value delivery architecture. No overlap billing guidance. Includes and not included. Deep Review diagnoses the full reason. Build Fix implements a scoped improvement. Ongoing Control monitors and guides monthly decisions. {PLAN_VALUE_SEPARATION_RULES.join(" ")} Stripe checkout start. Checkout success. Post-payment emails. {CENDORQ_POST_PAYMENT_EMAILS.map((email) => `${email.subject} ${email.dashboardPath} ${email.customerGoal}`).join(" ")} Billing center first use snapshot. Billing center first use guidance. Billing safety rules. Billing handoff runtime integration. Connected billing handoffs. Entitlement status: Free Scan. Invoice access: Available after checkout. Billing support: support@cendorq.com. Compare plan options. {BILLING_FIRST_USE_SNAPSHOT.map((item) => `${item.label} ${item.value} ${item.detail}`).join(" ")} {BILLING_SAFETY_RULES.join(" ")} {BILLING_HANDOFFS.map((handoff) => `${handoff.decision} ${handoff.surfaceKey} ${handoff.currentState} ${handoff.safeNextAction} ${handoff.recoveryPath} ${handoff.connectedDestination}`).join(" ")}
      </section>
    </main>
  );
}
