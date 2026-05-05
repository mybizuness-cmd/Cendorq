import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import {
  CENDORQ_CHECKOUT_METADATA_KEYS,
  CENDORQ_CHECKOUT_ORCHESTRATION,
  CENDORQ_PAID_PLAN_KEYS,
  getPaidCendorqPlanPrice,
  type CendorqPaidPlanKey,
} from "@/lib/pricing-checkout-orchestration";

export const metadata = buildMetadata({
  title: "Start checkout | Cendorq",
  description: "Start a Cendorq checkout for Deep Review, Build Fix, or Ongoing Control.",
  path: "/checkout/start",
  noIndex: true,
});

type CheckoutStartPageProps = {
  searchParams?: Promise<{ plan?: string }>;
};

export default async function CheckoutStartPage({ searchParams }: CheckoutStartPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const planKey = normalizePaidPlanKey(resolvedSearchParams.plan);
  const plan = getPaidCendorqPlanPrice(planKey);

  return (
    <main className="relative mx-auto max-w-6xl overflow-hidden px-4 pb-28 pt-8 text-white sm:px-6 md:py-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_0%,rgba(103,232,249,0.12),transparent_34%)]" />

      <section className="system-panel-authority relative z-10 rounded-[1.55rem] p-4 sm:rounded-[1.8rem] sm:p-8">
        <div className="grid gap-5 lg:grid-cols-[1fr_18rem] lg:items-start">
          <div>
            <p className="text-sm font-semibold text-cyan-100">Secure checkout</p>
            <h1 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:mt-4 sm:text-5xl">
              Unlock {plan.name} for {plan.price}.
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:mt-5 sm:text-base sm:leading-8">
              {plan.primaryCustomerPromise} Checkout should keep your account, business context, report history, and next step connected so work can start immediately after payment.
            </p>
          </div>
          <div className="rounded-[1.2rem] border border-cyan-300/20 bg-cyan-300/10 p-4 sm:rounded-[1.3rem] sm:p-5">
            <div className="text-sm font-semibold text-cyan-100">What happens next</div>
            <p className="mt-2 text-sm leading-6 text-slate-200">{plan.afterPaymentNextStep}</p>
            <button type="button" disabled className="mt-4 inline-flex min-h-11 w-full cursor-not-allowed items-center justify-center rounded-2xl bg-cyan-300/70 px-5 py-3 text-sm font-bold text-slate-950 sm:w-auto">
              Stripe link coming next
            </button>
          </div>
        </div>
      </section>

      <section id="stripe-link-needed" className="relative z-10 mt-7 grid gap-4 md:grid-cols-3" aria-label="Checkout preparation">
        <CheckoutPrepCard title="1. Correct plan" copy={`${plan.publicName} is fixed at ${plan.price}. No starting price, no vague plus pricing.`} />
        <CheckoutPrepCard title="2. Connected payment" copy="The final Stripe link will carry the plan context into Cendorq dashboard and fulfillment path." />
        <CheckoutPrepCard title="3. Work starts after payment" copy={plan.afterPaymentNextStep} />
      </section>

      <section className="relative z-10 mt-7 rounded-[1.35rem] border border-white/10 bg-white/[0.035] p-5">
        <h2 className="text-2xl font-semibold tracking-tight text-white">While the Stripe link is being added</h2>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          This page is ready for the Stripe checkout link or price ID. Once the link is added, this action will send the customer to checkout and return them to the plan-specific success page.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Link href="/plans" className="min-h-11 rounded-2xl border border-white/10 px-5 py-3 text-center text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10">Compare plans</Link>
          <Link href="/dashboard/billing" className="min-h-11 rounded-2xl border border-white/10 px-5 py-3 text-center text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10">Back to billing</Link>
        </div>
      </section>

      <section className="sr-only" aria-label="Checkout start guardrails">
        Checkout start. Stripe checkout link placeholder. Final fixed plan prices. Deep Review $497. Build Fix $1,497. Ongoing Control $597/month. Success URL includes session_id. Checkout orchestration. Checkout metadata. {CENDORQ_CHECKOUT_ORCHESTRATION.map((step) => `${step.step} ${step.customerExperience} ${step.systemAction}`).join(" ")} {CENDORQ_CHECKOUT_METADATA_KEYS.join(" ")}
      </section>
    </main>
  );
}

function CheckoutPrepCard({ title, copy }: { title: string; copy: string }) {
  return (
    <article className="system-surface rounded-[1.25rem] p-4 sm:rounded-[1.35rem] sm:p-5">
      <h2 className="text-xl font-semibold tracking-tight text-white">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-slate-300">{copy}</p>
    </article>
  );
}

function normalizePaidPlanKey(value: string | undefined): CendorqPaidPlanKey {
  return CENDORQ_PAID_PLAN_KEYS.find((key) => key === value) || "deep-review";
}
