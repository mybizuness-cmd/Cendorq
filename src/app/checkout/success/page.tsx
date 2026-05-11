import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { getCendorqRevenueStage } from "@/lib/cendorq-revenue-operating-system";
import {
  CENDORQ_CHECKOUT_ORCHESTRATION,
  CENDORQ_PAID_PLAN_KEYS,
  CENDORQ_POST_PAYMENT_EMAILS,
  getPaidCendorqPlanPrice,
  type CendorqPaidPlanKey,
} from "@/lib/pricing-checkout-orchestration";

export const metadata = buildMetadata({
  title: "Payment complete | Cendorq",
  description: "Your Cendorq plan is confirmed. Continue into the protected dashboard for the next step.",
  path: "/checkout/success",
  noIndex: true,
});

type CheckoutSuccessSearchParams = {
  plan?: string | string[];
  session_id?: string | string[];
};

type CheckoutSuccessPageProps = {
  searchParams?: Promise<CheckoutSuccessSearchParams> | CheckoutSuccessSearchParams;
};

const PLAN_ACTIVATION_COPY: Record<CendorqPaidPlanKey, { stage: string; dashboardCta: string; dashboardPath: string; thanks: string; next: string; emailMoment: string }> = {
  "deep-review": {
    stage: "AI Readiness Review",
    dashboardCta: "Open review dashboard",
    dashboardPath: "/dashboard/reports",
    thanks: "Thank you. Your AI Readiness Review is confirmed.",
    next: "Cendorq will route you into the dashboard so the review path can collect the right business context and show status clearly.",
    emailMoment: "A confirmation email should also explain the next review step.",
  },
  "build-fix": {
    stage: "Signal Repair",
    dashboardCta: "Open repair intake",
    dashboardPath: "/dashboard/support/request",
    thanks: "Thank you. Your Signal Repair is confirmed.",
    next: "Cendorq will route you into the dashboard so the repair scope, approved business details, and next required action stay protected.",
    emailMoment: "A confirmation email should also explain what Cendorq needs before repair begins.",
  },
  "ongoing-control": {
    stage: "Readiness Control",
    dashboardCta: "Open control dashboard",
    dashboardPath: "/dashboard/billing",
    thanks: "Thank you. Your Readiness Control subscription is confirmed.",
    next: "Cendorq will route you into the dashboard so the monthly focus, billing state, and control path stay connected.",
    emailMoment: "A confirmation email should also explain the first control-cycle step.",
  },
};

const REDIRECT_DELAY_MS = 4200;

export default async function CheckoutSuccessPage({ searchParams }: CheckoutSuccessPageProps) {
  const resolvedSearchParams = await searchParams;
  const planKey = normalizePaidPlanKey(resolvedSearchParams?.plan);
  const sessionId = normalizeQueryValue(resolvedSearchParams?.session_id) || "pending-session";
  const plan = getPaidCendorqPlanPrice(planKey);
  const activation = PLAN_ACTIVATION_COPY[planKey];
  const revenueStage = getCendorqRevenueStage(plan.name);
  const email = CENDORQ_POST_PAYMENT_EMAILS.find((item) => item.planKey === planKey);
  const emailCopy = email ? `${email.subject}. ${email.customerGoal}` : activation.emailMoment;

  return (
    <main className="overflow-hidden bg-white text-slate-950">
      <script
        dangerouslySetInnerHTML={{
          __html: `window.setTimeout(function(){ window.location.href = ${JSON.stringify(activation.dashboardPath)}; }, ${REDIRECT_DELAY_MS});`,
        }}
      />

      <section className="mx-auto grid min-h-[calc(100vh-4.25rem)] max-w-7xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:py-16">
        <div>
          <p className="text-sm font-semibold text-slate-400">Payment complete</p>
          <h1 className="mt-4 max-w-5xl text-[clamp(3.1rem,7vw,6.8rem)] font-semibold leading-[0.88] tracking-[-0.08em] text-slate-950">
            {activation.thanks}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9">
            {activation.next}
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500">
            You will be redirected automatically. If it does not happen, use the dashboard button below.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={activation.dashboardPath} className="inline-flex min-h-14 items-center justify-center rounded-full border border-slate-950 bg-white px-8 py-4 text-base font-semibold text-slate-950 shadow-[inset_0_0_0_1px_rgba(15,23,42,0.08),0_8px_24px_rgba(15,23,42,0.08)] transition duration-200 hover:border-slate-700 hover:bg-slate-50 hover:shadow-[inset_0_0_0_1px_rgba(15,23,42,0.12),0_10px_28px_rgba(15,23,42,0.1)] focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
              {activation.dashboardCta}
            </Link>
            <Link href="/dashboard/billing" className="inline-flex min-h-14 items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-4 text-base font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
              Open billing
            </Link>
          </div>
        </div>

        <div className="rounded-[2.4rem] border border-slate-200 bg-white p-6 shadow-[0_30px_110px_rgba(15,23,42,0.1)] sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Confirmed plan</p>
          <h2 className="mt-4 text-5xl font-semibold tracking-[-0.07em] text-slate-950 sm:text-6xl">{activation.stage}</h2>
          <p className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-slate-950">{plan.price}</p>
          <p className="mt-1 text-sm font-semibold text-slate-500">{plan.cadence}</p>
          <div className="mt-6 grid gap-3">
            <div className="rounded-[1.35rem] border border-slate-200 bg-slate-50 p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Dashboard destination</div>
              <p className="mt-2 text-sm font-semibold leading-7 text-slate-700">{activation.dashboardPath}</p>
            </div>
            <div className="rounded-[1.35rem] border border-slate-200 bg-slate-50 p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Next step</div>
              <p className="mt-2 text-sm font-semibold leading-7 text-slate-700">{revenueStage.nextBestAction}</p>
            </div>
            <div className="rounded-[1.35rem] border border-slate-200 bg-slate-50 p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Confirmation</div>
              <p className="mt-2 text-sm font-semibold leading-7 text-slate-700">{emailCopy}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sr-only" aria-label="Checkout success dashboard redirect guardrails">
        Checkout complete. Payment complete. Thank you page. Automatic dashboard redirect. Redirect after payment. Dashboard destination. Open review dashboard. Open repair intake. Open control dashboard. AI Readiness Review. Signal Repair. Readiness Control. session_id {sessionId}. Stripe session id. Post-payment dashboard activation. {CENDORQ_CHECKOUT_ORCHESTRATION.map((step) => `${step.step} ${step.customerExperience} ${step.systemAction}`).join(" ")} {CENDORQ_POST_PAYMENT_EMAILS.map((item) => `${item.key} ${item.planKey} ${item.subject} ${item.dashboardPath} ${item.customerGoal}`).join(" ")}
      </section>
    </main>
  );
}

function normalizePaidPlanKey(candidate: string | string[] | undefined): CendorqPaidPlanKey {
  const value = normalizeQueryValue(candidate);
  return CENDORQ_PAID_PLAN_KEYS.find((planKey) => planKey === value) || "deep-review";
}

function normalizeQueryValue(candidate: string | string[] | undefined) {
  return Array.isArray(candidate) ? candidate[0] : candidate;
}
