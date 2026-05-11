import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { CENDORQ_CHECKOUT_ORCHESTRATION, getPaidCendorqPlanPrice, type CendorqPaidPlanKey } from "@/lib/pricing-checkout-orchestration";

export const metadata = buildMetadata({
  title: "Start checkout | Cendorq",
  description: "Confirm the selected Cendorq AI-readiness plan before secure Stripe payment.",
  path: "/checkout/start",
  noIndex: true,
});

const PLAN_COPY: Record<CendorqPaidPlanKey, { stage: string; title: string; description: string; bestFor: string; next: string }> = {
  "deep-review": {
    stage: "Review",
    title: "AI Readiness Review",
    description: "Evidence-backed review for businesses that need to understand what is weakening clarity, trust, proof, or choice before buying repair work.",
    bestFor: "You know something is off, but the right fix is not proven yet.",
    next: "After payment, Cendorq opens the review path and asks for the business context needed to begin.",
  },
  "build-fix": {
    stage: "Repair",
    title: "Signal Repair",
    description: "Focused repair for the page, message, proof, or action path that makes the business harder to understand, trust, or choose.",
    bestFor: "You know the weak point and are ready to improve it.",
    next: "After payment, Cendorq opens the repair path and confirms the approved business details needed to begin.",
  },
  "ongoing-control": {
    stage: "Control",
    title: "Readiness Control",
    description: "Monthly readiness control for businesses that need clarity, trusted proof, public signals, and action paths kept under review.",
    bestFor: "You have a strong enough base and need ongoing attention.",
    next: "After payment, Cendorq opens the monthly control path and confirms the priority focus for the first cycle.",
  },
};

const PAID_PLAN_KEYS: CendorqPaidPlanKey[] = ["deep-review", "build-fix", "ongoing-control"];

function selectedPlanKey(rawPlan?: string | string[]): CendorqPaidPlanKey {
  const value = Array.isArray(rawPlan) ? rawPlan[0] : rawPlan;
  return PAID_PLAN_KEYS.includes(value as CendorqPaidPlanKey) ? (value as CendorqPaidPlanKey) : "deep-review";
}

export default function CheckoutStartPage({ searchParams }: { searchParams?: { plan?: string | string[] } }) {
  const planKey = selectedPlanKey(searchParams?.plan);
  const plan = getPaidCendorqPlanPrice(planKey);
  const copy = PLAN_COPY[planKey];
  const paymentLink = plan.paymentLink || "/plans";

  return (
    <main className="overflow-hidden bg-white text-slate-950">
      <section className="mx-auto grid min-h-[calc(100vh-4.25rem)] max-w-7xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:py-16">
        <div>
          <p className="text-sm font-semibold text-slate-400">Secure payment</p>
          <h1 className="mt-4 max-w-5xl text-[clamp(3.1rem,7vw,6.8rem)] font-semibold leading-[0.88] tracking-[-0.08em] text-slate-950">
            Confirm {copy.title} before payment.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9">
            Cendorq keeps the plan choice clear before handing you to Stripe. No hidden upgrade, no fake urgency, and no promise of rankings, leads, revenue, or AI placement.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={paymentLink} className="inline-flex min-h-14 items-center justify-center rounded-full border border-slate-950 bg-white px-8 py-4 text-base font-semibold text-slate-950 shadow-[inset_0_0_0_1px_rgba(15,23,42,0.08),0_8px_24px_rgba(15,23,42,0.08)] transition duration-200 hover:border-slate-700 hover:bg-slate-50 hover:shadow-[inset_0_0_0_1px_rgba(15,23,42,0.12),0_10px_28px_rgba(15,23,42,0.1)] focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
              Continue to secure payment — {plan.price}
            </a>
            <Link href="/plans" className="inline-flex min-h-14 items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-4 text-base font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
              Review plans
            </Link>
          </div>
        </div>

        <div className="rounded-[2.4rem] border border-slate-200 bg-white p-6 shadow-[0_30px_110px_rgba(15,23,42,0.1)] sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{copy.stage}</p>
          <h2 className="mt-4 text-5xl font-semibold tracking-[-0.07em] text-slate-950 sm:text-6xl">{copy.title}</h2>
          <p className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-slate-950">{plan.price}</p>
          <p className="mt-1 text-sm font-semibold text-slate-500">{plan.cadence}</p>
          <p className="mt-6 text-base leading-8 text-slate-600">{copy.description}</p>
          <div className="mt-6 grid gap-3">
            <div className="rounded-[1.35rem] border border-slate-200 bg-slate-50 p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Best when</div>
              <p className="mt-2 text-sm font-semibold leading-7 text-slate-700">{copy.bestFor}</p>
            </div>
            <div className="rounded-[1.35rem] border border-slate-200 bg-slate-50 p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">After checkout</div>
              <p className="mt-2 text-sm font-semibold leading-7 text-slate-700">{copy.next}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8" aria-label="Checkout plan options">
        <div className="grid gap-4 md:grid-cols-3">
          {PAID_PLAN_KEYS.map((key) => {
            const item = getPaidCendorqPlanPrice(key);
            const itemCopy = PLAN_COPY[key];
            const selected = key === planKey;
            return (
              <Link key={key} href={`/checkout/start?plan=${key}`} className={selected ? "rounded-[2rem] border border-slate-950 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.1)] transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2" : "rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_14px_48px_rgba(15,23,42,0.055)] transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"}>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{itemCopy.stage}</p>
                <h3 className="mt-4 text-3xl font-semibold tracking-[-0.055em] text-slate-950">{item.name}</h3>
                <p className="mt-2 text-lg font-semibold text-slate-950">{item.price}</p>
                <p className="mt-4 text-sm leading-7 text-slate-600">{item.primaryCustomerPromise}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="sr-only" aria-label="Checkout guardrails">
        Start checkout. Secure checkout. Stripe payment links. AI Readiness Review payment link. Signal Repair payment link. Readiness Control payment link. No fake urgency. No ranking guarantee. No AI placement guarantee. No guaranteed leads or revenue. Checkout metadata. {CENDORQ_CHECKOUT_ORCHESTRATION.map((step) => `${step.step} ${step.customerExperience} ${step.systemAction}`).join(" ")}
      </section>
    </main>
  );
}
