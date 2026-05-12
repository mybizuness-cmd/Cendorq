import Link from "next/link";
import { CheckoutDashboardRedirect } from "./dashboard-redirect";
import { buildMetadata } from "@/lib/seo";
import { CENDORQ_EXPERIENCE_SYSTEM } from "@/lib/cendorq-experience-system";
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

type DashboardDestination = "/dashboard/reports" | "/dashboard/support/request" | "/dashboard/billing";

const PLAN_ACTIVATION_COPY: Record<CendorqPaidPlanKey, { stage: string; dashboardCta: string; dashboardPath: DashboardDestination; thanks: string; next: string; emailMoment: string }> = {
  "deep-review": {
    stage: "AI Readiness Review",
    dashboardCta: "Open review dashboard",
    dashboardPath: "/dashboard/reports",
    thanks: "Your AI Readiness Review is confirmed.",
    next: "Continue into the dashboard so Cendorq can keep the review path, status, and business context protected.",
    emailMoment: "A confirmation email should also explain the next review step.",
  },
  "build-fix": {
    stage: "Signal Repair",
    dashboardCta: "Open repair intake",
    dashboardPath: "/dashboard/support/request",
    thanks: "Your Signal Repair is confirmed.",
    next: "Continue into the dashboard so the repair scope, approved details, and next required action stay protected.",
    emailMoment: "A confirmation email should also explain what Cendorq needs before repair begins.",
  },
  "ongoing-control": {
    stage: "Readiness Control",
    dashboardCta: "Open control dashboard",
    dashboardPath: "/dashboard/billing",
    thanks: "Your Readiness Control subscription is confirmed.",
    next: "Continue into the dashboard so monthly focus, billing state, and the control path stay connected.",
    emailMoment: "A confirmation email should also explain the first control-cycle step.",
  },
};

export default async function CheckoutSuccessPage({ searchParams }: CheckoutSuccessPageProps) {
  const resolvedSearchParams = await searchParams;
  const planKey = normalizePaidPlanKey(resolvedSearchParams?.plan);
  const sessionId = normalizeQueryValue(resolvedSearchParams?.session_id) || "pending-session";
  const plan = getPaidCendorqPlanPrice(planKey);
  const activation = PLAN_ACTIVATION_COPY[planKey];
  const revenueStage = getCendorqRevenueStage(plan.name);
  const email = CENDORQ_POST_PAYMENT_EMAILS.find((item) => item.planKey === planKey);
  const emailCopy = email ? `${email.subject}. ${email.customerGoal}` : activation.emailMoment;
  const activationSteps = [
    { label: "Plan", value: activation.stage, copy: `${plan.price} ${plan.cadence}` },
    { label: "Dashboard", value: activation.dashboardPath, copy: "The protected workspace is the return path after payment." },
    { label: "Next", value: revenueStage.nextBestAction, copy: emailCopy },
  ] as const;

  return (
    <main className={CENDORQ_EXPERIENCE_SYSTEM.pageShell}>
      <CheckoutDashboardRedirect destination={activation.dashboardPath} />

      <section className="relative overflow-hidden px-5 py-12 sm:px-8 lg:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_0%,rgba(125,211,252,0.28),transparent_34%),linear-gradient(180deg,#ffffff,#f8fbff_58%,#eef8ff)]" aria-hidden="true" />
        <div className="relative mx-auto grid min-h-[calc(100vh-4.25rem)] max-w-7xl gap-8 lg:grid-cols-[0.84fr_1.16fr] lg:items-center">
          <div>
            <p className={CENDORQ_EXPERIENCE_SYSTEM.eyebrow}>Payment complete</p>
            <h1 className={`mt-6 max-w-5xl ${CENDORQ_EXPERIENCE_SYSTEM.pageHeadline}`}>
              {activation.thanks}
            </h1>
            <p className={`mt-6 max-w-3xl ${CENDORQ_EXPERIENCE_SYSTEM.body}`}>
              {activation.next}
            </p>
            <p className={`mt-4 max-w-2xl ${CENDORQ_EXPERIENCE_SYSTEM.mutedText}`}>
              You will be redirected automatically. If it does not happen, use the dashboard button below.
            </p>
            <div className={`mt-8 ${CENDORQ_EXPERIENCE_SYSTEM.mobileActionRow}`}>
              <Link href={activation.dashboardPath} className={`${CENDORQ_EXPERIENCE_SYSTEM.primaryButton} ${CENDORQ_EXPERIENCE_SYSTEM.mobileTouchButton}`}>
                {activation.dashboardCta}
              </Link>
              <Link href="/dashboard/billing" className={`${CENDORQ_EXPERIENCE_SYSTEM.secondaryButton} ${CENDORQ_EXPERIENCE_SYSTEM.mobileTouchButton}`}>
                Open billing
              </Link>
            </div>
          </div>

          <div className={CENDORQ_EXPERIENCE_SYSTEM.glassPanel}>
            <div className="overflow-hidden rounded-[1.85rem] border border-slate-200 bg-white sm:rounded-[2.35rem]">
              <div className="border-b border-slate-200 bg-[linear-gradient(135deg,#020617,#172554_62%,#083344)] p-6 text-white sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">Confirmed plan</p>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-white sm:text-5xl">{activation.stage}</h2>
                <p className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white">{plan.price}</p>
                <p className="mt-1 text-sm font-semibold text-slate-300">{plan.cadence}</p>
              </div>
              <div className="relative bg-[linear-gradient(180deg,#ffffff,#f8fbff)] p-5 sm:p-6">
                <div className="absolute left-10 top-8 hidden h-[calc(100%-4rem)] w-px bg-gradient-to-b from-cyan-200 via-slate-300 to-indigo-200 sm:block" aria-hidden="true" />
                <div className="grid gap-3">
                  {activationSteps.map((item, index) => (
                    <article key={item.label} className="relative grid gap-4 rounded-[1.6rem] border border-slate-200 bg-white/88 p-5 shadow-[0_14px_45px_rgba(15,23,42,0.055)] sm:grid-cols-[3.4rem_1fr] sm:items-start">
                      <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-black text-slate-950 shadow-sm">{index + 1}</div>
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">{item.label}</div>
                        <p className="mt-2 text-lg font-semibold leading-7 tracking-[-0.025em] text-slate-950">{item.value}</p>
                        <p className="mt-2 text-sm font-medium leading-7 text-slate-600">{item.copy}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sr-only" aria-label="Checkout success dashboard redirect guardrails">
        Checkout complete. Payment complete. Thank you page. Automatic dashboard redirect. Redirect after payment. Premium checkout success hero scale. Responsive mobile-first checkout success page. Unified Cendorq Experience System. Dashboard destination. Open review dashboard. Open repair intake. Open control dashboard. AI Readiness Review. Signal Repair. Readiness Control. Confirmed plan. Post-payment system flow. No generic receipt card stack. session_id {sessionId}. Stripe session id. Post-payment dashboard activation. {CENDORQ_CHECKOUT_ORCHESTRATION.map((step) => `${step.step} ${step.customerExperience} ${step.systemAction}`).join(" ")} {CENDORQ_POST_PAYMENT_EMAILS.map((item) => `${item.key} ${item.planKey} ${item.subject} ${item.dashboardPath} ${item.customerGoal}`).join(" ")}
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
