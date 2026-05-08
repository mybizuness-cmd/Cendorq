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
    command: "Diagnose",
    next: "Unlock cause-level diagnosis and the report workflow.",
  },
  {
    plan: BUILD_FIX,
    value: getPlanValueDelivery("build-fix"),
    title: "Build Fix checkout",
    command: "Fix",
    next: "Unlock scoped implementation after the target is clear.",
  },
  {
    plan: ONGOING_CONTROL,
    value: getPlanValueDelivery("ongoing-control"),
    title: "Ongoing Control checkout",
    command: "Control",
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
    <main className="relative isolate overflow-hidden text-white">
      <CheckoutAtmosphere />

      <section className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-[92rem] gap-8 px-4 pb-12 pt-6 sm:px-6 md:pb-18 md:pt-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
        <div className="relative z-10">
          <div className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-100 shadow-[0_0_60px_rgba(34,211,238,0.12)]">
            Secure plan handoff
          </div>
          <h1 className="mt-6 max-w-5xl text-[clamp(3.2rem,7.3vw,7.5rem)] font-semibold leading-[0.84] tracking-[-0.08em] text-white">
            Choose the checkout path that matches the work.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl sm:leading-9">
            Checkout should never feel unfinished. Each paid plan keeps the account, business context, entitlement, dashboard, email, and fulfillment boundary connected after payment.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={`${DEEP_REVIEW.checkoutPath}?plan=${DEEP_REVIEW.key}`} className="inline-flex min-h-14 items-center justify-center rounded-full bg-cyan-200 px-9 py-4 text-base font-black text-slate-950 shadow-[0_22px_80px_rgba(103,232,249,0.24)] transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
              Continue {DEEP_REVIEW.price}
            </Link>
            <Link href="/plans" className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-9 py-4 text-base font-bold text-white shadow-[0_18px_70px_rgba(2,8,23,0.32)] transition hover:border-cyan-200/40 hover:bg-cyan-200/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
              Compare plans
            </Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.7rem] border border-cyan-200/22 bg-[radial-gradient(circle_at_50%_0%,rgba(103,232,249,0.2),transparent_36%),linear-gradient(145deg,rgba(8,47,73,0.9),rgba(2,8,23,0.98)_52%,rgba(14,116,144,0.32))] p-5 shadow-[0_55px_200px_rgba(2,8,23,0.72)] sm:p-7">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/90 to-transparent" />
          <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-100">Safest paid first step</p>
          <h2 className="mt-4 text-5xl font-semibold tracking-[-0.07em] text-white sm:text-6xl">Diagnose</h2>
          <p className="mt-5 text-base leading-8 text-slate-300">{getPlanValueDelivery("deep-review").primaryValue}</p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {CHECKOUT_TRUST_POINTS.slice(0, 2).map((point) => (
              <p key={point} className="rounded-[1.6rem] border border-white/10 bg-black/24 p-5 text-sm font-semibold leading-7 text-slate-300">{point}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-10 sm:px-6" aria-label="Checkout handoff paths">
        <div className="overflow-hidden rounded-[2.5rem] border border-cyan-300/15 bg-[linear-gradient(135deg,rgba(8,47,73,0.72),rgba(2,8,23,0.94)_46%,rgba(14,116,144,0.22))] shadow-[0_45px_180px_rgba(2,8,23,0.55)]">
          <div className="grid gap-0 lg:grid-cols-[0.78fr_1.22fr]">
            <div className="border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-100">Checkout handoff paths</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-white sm:text-6xl">Payment should unlock the exact command layer.</h2>
              <p className="mt-5 text-base leading-8 text-slate-300">Diagnose, Fix, and Control must not collapse into the same payment card. The handoff has to preserve the plan boundary.</p>
              <Link href="/dashboard/billing" className="mt-7 inline-flex text-sm font-bold text-cyan-100 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">Open billing →</Link>
            </div>
            <div className="divide-y divide-white/10">
              {CHECKOUT_HANDOFFS.map((item) => (
                <Link key={item.plan.key} href={`${item.plan.checkoutPath}?plan=${item.plan.key}`} className="group grid gap-4 p-5 transition hover:bg-cyan-200/[0.06] focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950 sm:grid-cols-[11rem_1fr_auto] sm:items-center sm:p-6">
                  <div>
                    <div className="text-4xl font-semibold tracking-[-0.06em] text-white">{item.command}</div>
                    <div className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-cyan-100/75">{item.title}</div>
                  </div>
                  <div className="max-w-2xl">
                    <p className="text-sm leading-6 text-slate-300">{item.next}</p>
                    <p className="mt-2 text-xs font-semibold leading-5 text-cyan-100/80">{item.value.reportBoundary}</p>
                  </div>
                  <div className="flex items-center justify-between gap-4 sm:block sm:text-right">
                    <div className="text-sm font-black text-cyan-100">{item.plan.price}</div>
                    <span className="mt-1 inline-flex text-sm font-bold text-cyan-100 transition group-hover:text-white">Start handoff →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-16 sm:px-6" aria-label="Checkout trust points">
        <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.025)_38%,rgba(103,232,249,0.08))] p-6 shadow-[0_45px_180px_rgba(2,8,23,0.55)] backdrop-blur-2xl sm:p-8 lg:p-10">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-100">What happens after payment</p>
          <h2 className="mt-3 max-w-5xl text-4xl font-semibold tracking-[-0.055em] text-white sm:text-6xl">The checkout is only credible if the command continues cleanly.</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {CHECKOUT_TRUST_POINTS.map((point) => (
              <p key={point} className="rounded-[1.35rem] border border-white/10 bg-black/25 p-4 text-sm font-semibold leading-7 text-slate-300">{point}</p>
            ))}
          </div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/plans" className="min-h-12 rounded-full border border-white/10 px-6 py-3 text-center text-sm font-bold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">Compare plans</Link>
            <Link href="/dashboard/billing" className="min-h-12 rounded-full border border-white/10 px-6 py-3 text-center text-sm font-bold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">Open billing</Link>
          </div>
        </div>
      </section>

      <section className="sr-only" aria-label="Mobile visual audit checkout start guardrails">
        Mobile visual audit checkout. Secure plan handoff. Choose the checkout path that matches the work. No unfinished Stripe placeholder. Start secure handoff. Final fixed plan prices. Deep Review $497. Build Fix $1,497. Ongoing Control $597/month. Success URL includes session_id. Checkout orchestration. Checkout metadata. {CHECKOUT_HANDOFFS.map((item) => `${item.title} ${item.plan.name} ${item.plan.price} ${item.value.reportBoundary}`).join(" ")} {CENDORQ_CHECKOUT_ORCHESTRATION.map((step) => `${step.step} ${step.customerExperience} ${step.systemAction}`).join(" ")} {CENDORQ_CHECKOUT_METADATA_KEYS.join(" ")}
      </section>
    </main>
  );
}

function CheckoutAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(103,232,249,0.16),transparent_30%),radial-gradient(circle_at_86%_6%,rgba(56,189,248,0.11),transparent_27%),linear-gradient(180deg,#020617_0%,#020817_42%,#030712_100%)]" />
      <div className="absolute left-1/2 top-0 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-cyan-300/[0.04] blur-3xl" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.018]" />
    </div>
  );
}
