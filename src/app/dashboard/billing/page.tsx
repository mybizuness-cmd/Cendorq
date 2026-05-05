import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { projectCustomerPlatformHandoff } from "@/lib/customer-platform-handoff-runtime";

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

const REVENUE_ACTIONS = [
  { title: "Unlock Deep Review", href: "/plans/deep-review", copy: "Get the real reason customers hesitate before you spend on fixes.", price: "$300" },
  { title: "Fix what is costing choices", href: "/plans/build-fix", copy: "Turn known weak spots into stronger pages, proof, and action paths.", price: "$750+" },
  { title: "Keep monthly control", href: "/plans/ongoing-control", copy: "Stay ahead of search, AI, reviews, and customer friction as things change.", price: "$300/mo" },
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
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-8 text-white sm:px-6 md:py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_0%,rgba(103,232,249,0.12),transparent_34%),radial-gradient(circle_at_84%_12%,rgba(14,165,233,0.08),transparent_30%)]" />

      <section className="system-panel-authority relative z-10 rounded-[1.8rem] p-5 sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_19rem] lg:items-start">
          <div>
            <p className="text-sm font-semibold text-cyan-100">Billing and plans</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Turn the first read into the right paid next step.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300">
              Your current access is Free Scan. The paid path exists to remove guessing: diagnose the cause, fix the weak parts, or keep the business under monthly control.
            </p>
          </div>
          <div className="rounded-[1.3rem] border border-cyan-300/20 bg-cyan-300/10 p-5">
            <div className="text-sm font-semibold text-cyan-100">Best revenue move</div>
            <div className="mt-3 text-3xl font-semibold text-white">Deep Review</div>
            <p className="mt-2 text-sm leading-6 text-slate-200">Use this when the customer hesitation problem needs proof before a fix.</p>
            <Link href="/plans/deep-review" className="mt-4 inline-flex rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
              See Deep Review
            </Link>
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-7 grid gap-4 lg:grid-cols-3" aria-label="Paid next steps">
        {REVENUE_ACTIONS.map((item) => (
          <Link key={item.href} href={item.href} className="system-surface rounded-[1.45rem] p-5 transition hover:border-cyan-300/35 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-2xl font-semibold tracking-tight text-white">{item.title}</h2>
              <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-sm font-semibold text-cyan-100">{item.price}</span>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-300">{item.copy}</p>
          </Link>
        ))}
      </section>

      <section className="relative z-10 mt-7 grid gap-4 md:grid-cols-3" aria-label="Billing support actions">
        {BILLING_RECOVERY_ACTIONS.map((item) => (
          <Link key={item.href} href={item.href} className="rounded-[1.2rem] border border-white/10 bg-white/[0.035] p-4 text-sm font-semibold text-slate-200 transition hover:border-cyan-300/30 hover:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
            {item.title} →
          </Link>
        ))}
      </section>

      <section className="sr-only" aria-label="Billing guardrails">
        Billing and plan center. Billing center first use snapshot. Billing center first use guidance. Billing safety rules. Billing handoff runtime integration. Connected billing handoffs. Entitlement status: Free Scan. Invoice access: Available after checkout. Billing support: support@cendorq.com. Compare plan options. {BILLING_FIRST_USE_SNAPSHOT.map((item) => `${item.label} ${item.value} ${item.detail}`).join(" ")} {BILLING_SAFETY_RULES.join(" ")} {BILLING_HANDOFFS.map((handoff) => `${handoff.decision} ${handoff.surfaceKey} ${handoff.currentState} ${handoff.safeNextAction} ${handoff.recoveryPath} ${handoff.connectedDestination}`).join(" ")}
      </section>
    </main>
  );
}
