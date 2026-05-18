import Link from "next/link";
import { CheckoutDashboardRedirect } from "./dashboard-redirect";
import { MailProviderLinks } from "@/components/auth/mail-provider-links";
import { CENDORQ_EXPERIENCE_SYSTEM } from "@/lib/cendorq-experience-system";
import { resolveCustomerAccountContinuation } from "@/lib/customer-account-continuation-standard";
import { resolveCendorqCustomerJourney } from "@/lib/customer-journey-orchestrator";
import { resolvePaidPlanContinuationAction } from "@/lib/paid-plan-continuation-standard";
import { CENDORQ_PAID_PLAN_KEYS, getPaidCendorqPlanPrice, type CendorqPaidPlanKey } from "@/lib/pricing-checkout-orchestration";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Payment complete | Cendorq", description: "Your Cendorq plan is confirmed. Check your email for account access.", path: "/checkout/success", noIndex: true });

type SearchParams = { plan?: string | string[]; session_id?: string | string[]; email?: string | string[] };
type PageProps = { searchParams?: Promise<SearchParams> | SearchParams };

type CheckoutSuccessTruthState = "stripe-session-present" | "session-verification-needed";

const PLAN_COPY: Record<CendorqPaidPlanKey, { stage: string; title: string }> = {
  "deep-review": { stage: "Deep Review", title: "Your Deep Review is confirmed." },
  "build-fix": { stage: "Build Fix", title: "Your Build Fix payment is confirmed." },
  "ongoing-control": { stage: "Ongoing Control", title: "Your Ongoing Control subscription is confirmed." },
};

const CHECKOUT_SUCCESS_COPY: Record<CheckoutSuccessTruthState, { badge: string; eyebrow: string; fallbackTitle: string; deliveryNote: string }> = {
  "stripe-session-present": {
    badge: "Payment confirmed",
    eyebrow: "Payment confirmed",
    fallbackTitle: "Your Cendorq plan is confirmed.",
    deliveryNote: "Delivery starts only when the required ownership, intake, evidence, review, and approval state fit the selected stage.",
  },
  "session-verification-needed": {
    badge: "Verification needed",
    eyebrow: "Payment status check",
    fallbackTitle: "Cendorq needs the checkout session to confirm this plan.",
    deliveryNote: "If payment completed, use the secure account link or billing support path so Cendorq can connect the purchase to the right verified account before work starts.",
  },
};

export default async function CheckoutSuccessPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const planKey = normalizePlan(params?.plan);
  const rawSessionId = normalizeValue(params?.session_id);
  const sessionTruthState = resolveCheckoutSuccessTruthState(rawSessionId);
  const sessionId = sessionTruthState === "stripe-session-present" ? rawSessionId! : "session-verification-needed";
  const checkoutEmail = normalizeValue(params?.email) || "";
  const plan = getPaidCendorqPlanPrice(planKey);
  const planCopy = sessionTruthState === "stripe-session-present" ? PLAN_COPY[planKey] : { stage: PLAN_COPY[planKey].stage, title: CHECKOUT_SUCCESS_COPY[sessionTruthState].fallbackTitle };
  const truthCopy = CHECKOUT_SUCCESS_COPY[sessionTruthState];
  const journey = resolveCendorqCustomerJourney({ purchasedPlan: planKey, source: "checkout-success", sessionId, completedEvidence: sessionTruthState === "stripe-session-present" ? ["customerOwnershipVerified"] : [], completedIntake: [] });
  const continuation = resolvePaidPlanContinuationAction({ planKey, fulfillmentState: journey.fulfillmentState, dashboardDestination: journey.dashboardDestination, customerNextAction: journey.customerNextAction });
  const accountContinuation = resolveCustomerAccountContinuation({ email: checkoutEmail, origin: "checkout", checkoutSessionId: sessionId, preferredDestination: continuation.href });
  const status = sessionTruthState === "stripe-session-present" ? (journey.deliveryCanStart ? "Ready for queue" : journey.backendWorkState === "do-not-start" ? "Held safely" : "Next input needed") : "Session check needed";

  return (
    <main className={CENDORQ_EXPERIENCE_SYSTEM.pageShell}>
      {sessionTruthState === "stripe-session-present" ? <CheckoutDashboardRedirect destination={continuation.href} /> : null}
      <section className="relative overflow-hidden px-5 py-12 sm:px-8 lg:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_0%,rgba(125,211,252,0.28),transparent_34%),linear-gradient(180deg,#ffffff,#f8fbff_58%,#eef8ff)]" aria-hidden="true" />
        <div className="relative mx-auto grid min-h-[calc(100vh-4.25rem)] max-w-7xl gap-8 lg:grid-cols-[0.84fr_1.16fr] lg:items-center">
          <div>
            <h1 className={`max-w-5xl ${CENDORQ_EXPERIENCE_SYSTEM.pageHeadline}`}>{planCopy.title}</h1>
            <p className={`mt-6 max-w-3xl ${CENDORQ_EXPERIENCE_SYSTEM.body}`}>{accountContinuation.customerMessage}</p>
            <div className="mt-6 max-w-3xl rounded-[1.6rem] border border-cyan-200 bg-cyan-50/70 p-5 shadow-[0_14px_45px_rgba(14,165,233,0.08)]">
              <div className="text-[11px] font-black uppercase tracking-[0.18em] text-cyan-700">One next step</div>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.045em] text-slate-950">{continuation.title}</h2>
              <p className="mt-2 text-sm font-medium leading-7 text-slate-600">{continuation.customerCopy}</p>
              <Link href={continuation.href} className={`${CENDORQ_EXPERIENCE_SYSTEM.primaryButton} mt-4 w-full justify-center sm:w-auto`}>{continuation.label}</Link>
            </div>
            <p className={`mt-4 max-w-2xl ${CENDORQ_EXPERIENCE_SYSTEM.mutedText}`}>{truthCopy.deliveryNote}</p>
          </div>

          <div className={CENDORQ_EXPERIENCE_SYSTEM.glassPanel}>
            <div className="overflow-hidden rounded-[1.85rem] border border-white/80 bg-white/84 shadow-[0_24px_80px_rgba(15,23,42,0.065)] backdrop-blur sm:rounded-[2.35rem]">
              <div className="border-b border-cyan-100 bg-[linear-gradient(180deg,#ffffff,#effcff)] p-6 sm:p-8">
                <div className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-700">{truthCopy.eyebrow}</div>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl">{planCopy.stage}</h2>
                <p className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-slate-950">{plan.price}</p>
                <p className="mt-1 text-sm font-semibold text-slate-600">{plan.cadence}</p>
                <div className="mt-5 inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-700">{sessionTruthState === "stripe-session-present" ? humanize(journey.fulfillmentState) : truthCopy.badge}</div>
              </div>
              <div className="grid gap-3 bg-[linear-gradient(180deg,#ffffff,#f8fbff)] p-5 sm:p-6">
                <Step number="1" label="Plan" value={planCopy.stage} copy={`${plan.price} ${plan.cadence}`} />
                <Step number="2" label="Account" value="Create or return access" copy={accountContinuation.operatorMessage} />
                <Step number="3" label="Next" value={status} copy={continuation.customerCopy} />
                <article className="rounded-[1.6rem] border border-cyan-200 bg-cyan-50 p-5 shadow-[0_14px_45px_rgba(14,165,233,0.08)]">
                  <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-700">Open your inbox</div>
                  <p className="mt-2 text-sm font-semibold leading-7 text-slate-700">Find the message from Cendorq Support and confirm once to open your dashboard.</p>
                  <MailProviderLinks className="mt-4" />
                  <Link href="/login?returnTo=/dashboard" className="mt-4 inline-flex text-sm font-bold text-cyan-700 transition hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2">Request a fresh access link</Link>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Step({ number, label, value, copy }: { number: string; label: string; value: string; copy: string }) {
  return <article className="relative grid gap-4 rounded-[1.6rem] border border-slate-200 bg-white/88 p-5 shadow-[0_14px_45px_rgba(15,23,42,0.055)] sm:grid-cols-[3.4rem_1fr] sm:items-start"><div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-black text-slate-950 shadow-sm">{number}</div><div><div className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">{label}</div><p className="mt-2 text-lg font-semibold leading-7 tracking-[-0.025em] text-slate-950">{value}</p><p className="mt-2 text-sm font-medium leading-7 text-slate-600">{copy}</p></div></article>;
}

function normalizePlan(candidate: string | string[] | undefined): CendorqPaidPlanKey { const value = normalizeValue(candidate); return CENDORQ_PAID_PLAN_KEYS.find((planKey) => planKey === value) || "deep-review"; }
function normalizeValue(candidate: string | string[] | undefined) { return Array.isArray(candidate) ? candidate[0] : candidate; }
function resolveCheckoutSuccessTruthState(sessionId: string | undefined): CheckoutSuccessTruthState { return isSafeCheckoutSessionId(sessionId) ? "stripe-session-present" : "session-verification-needed"; }
function isSafeCheckoutSessionId(value: string | undefined) { return typeof value === "string" && /^cs_(test|live)_[A-Za-z0-9_\-]{12,240}$/.test(value.trim()); }
function humanize(value: string) { return value.replaceAll("-", " "); }
