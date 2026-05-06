import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import {
  CENDORQ_CHECKOUT_METADATA_KEYS,
  CENDORQ_CHECKOUT_ORCHESTRATION,
  getPaidCendorqPlanPrice,
} from "@/lib/pricing-checkout-orchestration";
import { getPlanValueDelivery } from "@/lib/plan-value-delivery-architecture";

export const metadata = buildMetadata({
  title: "Start checkout | Cendorq",
  description: "Start a Cendorq checkout for Deep Review, Build Fix, or Ongoing Control.",
  path: "/checkout/start",
  noIndex: true,
});

const DEEP_REVIEW = getPaidCendorqPlanPrice("deep-review");
const BUILD_FIX = getPaidCendorqPlanPrice("build-fix");
const ONGOING_CONTROL = getPaidCendorqPlanPrice("ongoing-control");

const CHECKOUT_HANDOFFS = [
  {
    plan: DEEP_REVIEW,
    value: getPlanValueDelivery("deep-review"),
    title: "Deep Review checkout",
    next: "Unlock cause-level diagnosis and the report workflow.",
  },
  {
    plan: BUILD_FIX,
    value: getPlanValueDelivery("build-fix"),
    title: "Build Fix checkout",
    next: "Unlock scoped implementation after the target is clear.",
  },
  {
    plan: ONGOING_CONTROL,
    value: getPlanValueDelivery("ongoing-control"),
    title: "Ongoing Control checkout",
    next: "Unlock monthly monitoring and decision support.",
  },
] as const;

const CHECKOUT_TRUST_POINTS = [
  "Plan context stays attached to the customer workspace.",
  "Success page explains what unlocks and what does not.",
  "Billing, dashboard, notifications, support, and fulfillment use the same plan boundary.",
] as const;

export default function CheckoutStartPage() {
  return (
    <main className="relative mx-auto max-w-6xl overflow-hidden px-4 pb-28 pt-6 text-white sm:px-6 md:py-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_0%,rgba(103,232,249,0.12),transparent_34%)]" />

      <section className="system-panel-authority relative z-10 rounded-[1.55rem] p-4 sm:rounded-[1.8rem] sm:p-8">
        <div className="grid gap-5 lg:grid-cols-[1fr_18rem] lg:items-start">
          <div>
            <p className="text-sm font-semibold text-cyan-100">Secure plan handoff</p>
            <h1 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:mt-4 sm:text-5xl">
              Choose the checkout path that matches the work.
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:mt-5 sm:text-base sm:leading-8">
              Checkout should never feel unfinished. Each paid plan keeps the account, business context, entitlement, dashboard, email, and fulfillment boundary connected after payment.
            </p>
          </div>
          <div className="rounded-[1.2rem] border border-cyan-300/20 bg-cyan-300/10 p-4 sm:rounded-[1.3rem] sm:p-5">
            <div className="text-sm font-semibold text-cyan-100">Safest paid first step</div>
            <div className="mt-2 text-2xl font-semibold text-white">{DEEP_REVIEW.name}</div>
            <p className="mt-2 text-sm leading-6 text-slate-200">{getPlanValueDelivery("deep-review").primaryValue}</p>
            <Link href={`${DEEP_REVIEW.checkoutPath}?plan=${DEEP_REVIEW.key}`} className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950 sm:w-auto">
              Continue {DEEP_REVIEW.price}
            </Link>
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-7 grid gap-3 md:grid-cols-3" aria-label="Checkout handoff paths">
        {CHECKOUT_HANDOFFS.map((item) => (
          <Link key={item.plan.key} href={`${item.plan.checkoutPath}?plan=${item.plan.key}`} className="system-surface rounded-[1.25rem] p-4 transition hover:border-cyan-300/30 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950 sm:rounded-[1.35rem] sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-100">{item.title}</div>
                <h2 className="mt-2 text-xl font-semibold tracking-tight text-white">{item.plan.name}</h2>
              </div>
              <span className="text-lg font-semibold text-cyan-100">{item.plan.price}</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">{item.next}</p>
            <p className="mt-3 rounded-[1rem] border border-white/10 bg-black/20 p-3 text-xs leading-5 text-slate-400">{item.value.reportBoundary}</p>
            <span className="mt-4 inline-flex text-sm font-semibold text-cyan-100">Start secure handoff →</span>
          </Link>
        ))}
      </section>

      <section className="relative z-10 mt-7 rounded-[1.35rem] border border-white/10 bg-white/[0.035] p-5" aria-label="Checkout trust points">
        <h2 className="text-2xl font-semibold tracking-tight text-white">What happens after payment</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {CHECKOUT_TRUST_POINTS.map((point) => (
            <p key={point} className="rounded-[1rem] border border-white/10 bg-black/20 p-3 text-sm leading-6 text-slate-300">{point}</p>
          ))}
        </div>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Link href="/plans" className="min-h-11 rounded-2xl border border-white/10 px-5 py-3 text-center text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">Compare plans</Link>
          <Link href="/dashboard/billing" className="min-h-11 rounded-2xl border border-white/10 px-5 py-3 text-center text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">Open billing</Link>
        </div>
      </section>

      <section className="sr-only" aria-label="Mobile visual audit checkout start guardrails">
        Mobile visual audit checkout. Secure plan handoff. Choose the checkout path that matches the work. No unfinished Stripe placeholder. Start secure handoff. Final fixed plan prices. Deep Review $497. Build Fix $1,497. Ongoing Control $597/month. Success URL includes session_id. Checkout orchestration. Checkout metadata. {CHECKOUT_HANDOFFS.map((item) => `${item.title} ${item.plan.name} ${item.plan.price} ${item.value.reportBoundary}`).join(" ")} {CENDORQ_CHECKOUT_ORCHESTRATION.map((step) => `${step.step} ${step.customerExperience} ${step.systemAction}`).join(" ")} {CENDORQ_CHECKOUT_METADATA_KEYS.join(" ")}
      </section>
    </main>
  );
}
