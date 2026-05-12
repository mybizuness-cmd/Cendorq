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
    <main className="overflow-hidden bg-[linear-gradient(180deg,#ffffff,#f7fbff_58%,#eef8ff)] text-slate-950">
      <section className="relative px-5 py-10 sm:px-8 lg:py-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_0%,rgba(125,211,252,0.28),transparent_34%)]" aria-hidden="true" />
        <div className="relative mx-auto grid min-h-[calc(100vh-4.25rem)] max-w-7xl gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-slate-500">Secure payment</p>
            <h1 className="mt-5 max-w-5xl text-[clamp(2.85rem,10vw,6rem)] font-semibold leading-[0.9] tracking-[-0.08em] text-slate-950 sm:text-[clamp(3.1rem,7vw,6.4rem)]">
              Confirm {copy.title} before Stripe.
            </h1>
            <p className="mt-6 max-w-3xl text-base font-medium leading-8 text-slate-600 sm:text-xl sm:leading-9">
              One last confirmation before secure payment. No hidden upgrade, no fake urgency, and no promise of rankings, leads, revenue, or AI placement.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={paymentLink} className="inline-flex min-h-14 items-center justify-center rounded-full border border-slate-950 bg-slate-950 px-8 py-4 text-base font-bold text-white shadow-[0_18px_45px_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
                Continue to secure payment — {plan.price}
              </a>
              <Link href="/plans" className="inline-flex min-h-14 items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-4 text-base font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
                Change plan
              </Link>
            </div>
          </div>

          <div className="rounded-[2.3rem] border border-white/80 bg-white/75 p-3 shadow-[0_30px_110px_rgba(15,23,42,0.1)] backdrop-blur-2xl sm:rounded-[2.7rem]">
            <div className="rounded-[1.85rem] border border-slate-200 bg-white p-6 sm:rounded-[2.2rem] sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{copy.stage}</p>
                  <h2 className="mt-4 text-[clamp(2.55rem,10vw,4.6rem)] font-semibold leading-[0.92] tracking-[-0.07em] text-slate-950 sm:text-6xl">{copy.title}</h2>
                </div>
                <div className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-bold text-slate-950 shadow-sm">{plan.price}</div>
              </div>
              <p className="mt-6 text-base font-medium leading-8 text-slate-600">{copy.description}</p>
              <div className="mt-6 grid gap-3">
                <div className="rounded-[1.35rem] border border-slate-200 bg-slate-50 p-4">
                  <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Best when</div>
                  <p className="mt-2 text-sm font-semibold leading-7 text-slate-700">{copy.bestFor}</p>
                </div>
                <div className="rounded-[1.35rem] border border-slate-200 bg-slate-50 p-4">
                  <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">After payment</div>
                  <p className="mt-2 text-sm font-semibold leading-7 text-slate-700">{copy.next}</p>
                </div>
                <div className="rounded-[1.35rem] border border-cyan-200 bg-cyan-50 p-4">
                  <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-700">Selected plan</div>
                  <p className="mt-2 text-sm font-semibold leading-7 text-slate-700">{plan.name} · {plan.price} · {plan.cadence}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sr-only" aria-label="Checkout guardrails">
        Start checkout. Secure checkout. Focused checkout confirmation. Selected plan only. No lower plan-switching grid. Stripe payment links. AI Readiness Review payment link. Signal Repair payment link. Readiness Control payment link. No fake urgency. No ranking guarantee. No AI placement guarantee. No guaranteed leads or revenue. Checkout metadata. {CENDORQ_CHECKOUT_ORCHESTRATION.map((step) => `${step.step} ${step.customerExperience} ${step.systemAction}`).join(" ")}
      </section>
    </main>
  );
}
