import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { CUSTOMER_PLATFORM_ROUTES, CUSTOMER_PLATFORM_STAGES } from "@/lib/customer-platform-route-map";
import { CUSTOMER_AUTH_METHODS, CUSTOMER_EMAIL_DELIVERABILITY_STANDARD, CUSTOMER_EMAIL_ORCHESTRATION_STEPS } from "@/lib/customer-auth-orchestration";

export const metadata = buildMetadata({
  title: "Create account | Cendorq",
  description: "Create a Cendorq account or start with the Free Scan so the workspace is based on business context, not only personal identity.",
  path: "/signup",
  noIndex: true,
});

const TRUST_STEPS = [
  { label: "Business first", value: "Start with the Free Scan when the business has not been captured yet.", detail: "The scan collects business facts, public signals, and context that identity providers cannot supply." },
  { label: "Verify access", value: "Confirm the inbox before private results appear.", detail: "Private results, billing, support, and notifications stay behind verified customer ownership." },
  { label: "Return safely", value: "Use sign in when the workspace already exists.", detail: "Returning customers should resume the correct dashboard moment instead of restarting." },
] as const;

const ACCESS_PROMISES = [
  "Free Scan keeps business context separate from personal identity.",
  "Email verification protects reports, billing, support, and notifications.",
  "Returning customers can sign in without rerunning the business intake.",
  "Provider sign-in can be added only after the auth backend is wired.",
] as const;

const SIGNUP_RULES = [
  "No dashboard or result access before email confirmation.",
  "No account-existence leakage in confirmation or recovery guidance.",
  "No passwords, card numbers, private keys, or session tokens in support or signup fields.",
  "No fake Google, Microsoft, Apple, passkey, or provider buttons before backend support exists.",
] as const;

const BUTTON_PRIMARY = "inline-flex min-h-14 items-center justify-center rounded-full border border-slate-950 bg-white px-8 py-4 text-base font-semibold text-slate-950 shadow-[inset_0_0_0_1px_rgba(15,23,42,0.08),0_8px_24px_rgba(15,23,42,0.08)] transition hover:border-slate-700 hover:bg-slate-50 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2";
const BUTTON_SECONDARY = "inline-flex min-h-14 items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-4 text-base font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2";

export default function SignupPage() {
  return (
    <main className="overflow-hidden bg-white text-slate-950">
      <section className="mx-auto grid min-h-[calc(100vh-4.25rem)] max-w-7xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:py-16">
        <div>
          <p className="text-sm font-semibold text-slate-400">Create access</p>
          <h1 className="mt-4 max-w-5xl text-[clamp(3.1rem,7vw,6.8rem)] font-semibold leading-[0.88] tracking-[-0.08em] text-slate-950">Create access without confusing identity with business context.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9">An account can confirm who owns the workspace. The Free Scan explains the business. New customers should start with the Free Scan unless a workspace already exists.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/free-check" className={BUTTON_PRIMARY}>Start Free Scan</Link>
            <Link href={routePath("login")} className={BUTTON_SECONDARY}>Sign in</Link>
          </div>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">{ACCESS_PROMISES.map((promise) => <div key={promise} className="rounded-[1.35rem] border border-slate-200 bg-white p-4 text-sm font-semibold leading-7 text-slate-600 shadow-sm">{promise}</div>)}</div>
        </div>

        <div className="rounded-[2.4rem] border border-slate-200 bg-white p-6 shadow-[0_30px_110px_rgba(15,23,42,0.1)] sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Best first step</p>
          <h2 className="mt-4 text-5xl font-semibold tracking-[-0.07em] text-slate-950 sm:text-6xl">Start with business facts.</h2>
          <p className="mt-5 text-base leading-8 text-slate-600">Use the Free Scan to capture the business name, website, audience, offer, location, and weak signal. Account access can then protect the result and let the customer return.</p>
          <div className="mt-7 grid gap-3">
            <Link href="/free-check" className={BUTTON_PRIMARY}>Start Free Scan</Link>
            <Link href="/verify-email" className={BUTTON_SECONDARY}>Confirm account email</Link>
            <Link href={routePath("login")} className={BUTTON_SECONDARY}>Already have access? Sign in</Link>
          </div>
          <p className="mt-5 rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-600">Google, Microsoft, Apple, and passkey buttons should appear here only after a real auth provider is connected. Until then, Cendorq should not show fake provider sign-in.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-5 pb-12 sm:px-8 md:grid-cols-3" aria-label="Signup trust path">
        {TRUST_STEPS.map((step) => <article key={step.label} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm"><div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">{step.label}</div><h2 className="mt-4 text-3xl font-semibold tracking-[-0.055em] text-slate-950">{step.value}</h2><p className="mt-4 text-sm leading-7 text-slate-600">{step.detail}</p></article>)}
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8" aria-label="Signup safety standard">
        <div className="rounded-[2.25rem] border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <p className="text-sm font-semibold text-slate-400">Signup safety standard</p>
          <h2 className="mt-3 max-w-5xl text-4xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-6xl">Trust starts before the dashboard opens.</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{SIGNUP_RULES.map((rule) => <p key={rule} className="rounded-[1.35rem] border border-slate-200 bg-white p-4 text-sm font-semibold leading-7 text-slate-600">{rule}</p>)}</div>
          <div className="mt-7 text-sm text-slate-600">Already verified? <Link className="font-semibold text-slate-950 underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2" href={routePath("login")}>Sign in</Link>.</div>
        </div>
      </section>

      <section className="sr-only" aria-label="Signup trust guardrails">Create access. Business first. Start with the Free Scan when the business has not been captured yet. Create access without confusing identity with business context. Signup trust path. Signup safety standard. Trust starts before the dashboard opens. No dashboard or result access before email confirmation. No account-existence leakage. No passwords, card numbers, private keys, or session tokens. No fake Google, Microsoft, Apple, passkey, or provider buttons before backend support exists. OAuth provider buttons require a real auth backend before they are displayed. {TRUST_STEPS.map((item) => `${item.label} ${item.value} ${item.detail}`).join(" ")} {ACCESS_PROMISES.join(" ")} {SIGNUP_RULES.join(" ")} {CUSTOMER_AUTH_METHODS.map((method) => `${method.label} ${method.customerPromise}`).join(" ")} {CUSTOMER_EMAIL_ORCHESTRATION_STEPS.map((step) => `${step.label} ${step.customerPromise}`).join(" ")} {CUSTOMER_EMAIL_DELIVERABILITY_STANDARD.join(" ")} {CUSTOMER_PLATFORM_STAGES.slice(0, 4).map((stage) => `${stage.key} ${stage.label} ${stage.customerPromise}`).join(" ")}</section>
    </main>
  );
}

function routePath(key: (typeof CUSTOMER_PLATFORM_ROUTES)[number]["key"]) {
  return CUSTOMER_PLATFORM_ROUTES.find((route) => route.key === key)?.path || "/dashboard";
}
