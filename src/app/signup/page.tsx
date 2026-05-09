import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { CUSTOMER_PLATFORM_ROUTES, CUSTOMER_PLATFORM_STAGES } from "@/lib/customer-platform-route-map";
import { CUSTOMER_AUTH_METHODS, CUSTOMER_EMAIL_DELIVERABILITY_STANDARD, CUSTOMER_EMAIL_ORCHESTRATION_STEPS } from "@/lib/customer-auth-orchestration";

export const metadata = buildMetadata({
  title: "Create your Cendorq workspace | Cendorq",
  description: "Create a verified Cendorq workspace, confirm your email, and continue through the Free Scan path.",
  path: "/signup",
  noIndex: true,
});

const TRUST_STEPS = [
  { label: "Create", value: "Use the email that should own the workspace.", detail: "Reports, billing, support, and notifications stay connected to this business inbox." },
  { label: "Confirm", value: "Verify before dashboard access.", detail: "Private results and support history stay behind confirmed customer ownership." },
  { label: "Continue", value: "Move into Free Scan or dashboard.", detail: "The workspace should move the customer into the right protected next step, not a dead end." },
] as const;

const ACCESS_PROMISES = [
  "Saved Free Scan and result handoff",
  "Dashboard, report vault, billing, notifications, and support in one workspace",
  "Returning-customer path without restarting",
  "Plan decisions based on evidence, not pressure",
] as const;

const SIGNUP_RULES = [
  "No dashboard or result access before email confirmation.",
  "No account-existence leakage in confirmation or recovery guidance.",
  "No passwords, card numbers, private keys, or session tokens in support or signup fields.",
  "No fake urgency, hidden checkout pressure, or guaranteed outcome claims.",
] as const;

export default function SignupPage() {
  return (
    <main className="overflow-hidden bg-white text-slate-950">
      <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:py-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-slate-400">Verified workspace</p>
          <h1 className="mt-6 max-w-5xl text-[clamp(3rem,7vw,6.7rem)] font-semibold leading-[0.88] tracking-[-0.075em] text-slate-950">
            Create the workspace through the Free Scan path.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9">
            Signup should not feel like a generic account detour. The customer creates ownership, confirms the inbox, and continues toward the scan, protected result, billing, support, and reports.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/free-check" className="inline-flex min-h-14 items-center justify-center rounded-full border border-slate-950 bg-slate-950 px-9 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
              Start Free Scan
            </Link>
            <Link href={routePath("login")} className="inline-flex min-h-14 items-center justify-center rounded-full border border-slate-200 bg-white px-9 py-4 text-base font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
              Sign in
            </Link>
          </div>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {ACCESS_PROMISES.map((promise) => (
              <div key={promise} className="rounded-[1.35rem] border border-slate-200 bg-slate-50 p-4 text-sm font-semibold leading-7 text-slate-700">{promise}</div>
            ))}
          </div>
        </div>

        <div className="rounded-[2.4rem] border border-slate-200 bg-white p-6 shadow-[0_30px_120px_rgba(15,23,42,0.1)] sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Workspace gate</p>
          <h2 className="mt-4 text-5xl font-semibold tracking-[-0.07em] text-slate-950 sm:text-6xl">Verify once. Continue safely.</h2>
          <p className="mt-5 text-base leading-8 text-slate-600">Email confirmation is required before dashboard and result access. Free Scan remains the clean account-creation path.</p>
          <form className="mt-7 grid gap-3" action="/verify-email">
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Work email
              <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" className="rounded-[1.35rem] border border-slate-200 bg-white px-4 py-4 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-950/10" />
            </label>
            <button type="submit" className="min-h-14 rounded-full border border-slate-950 bg-slate-950 px-6 py-4 text-base font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">Continue to verification</button>
          </form>
          <p className="mt-4 text-xs leading-6 text-slate-500">Confirmation responses stay bounded and never reveal another customer’s account state.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-10 sm:px-8" aria-label="Signup trust path">
        <div className="grid gap-4 md:grid-cols-3">
          {TRUST_STEPS.map((step, index) => (
            <article key={step.label} className={index === 1 ? "rounded-[2rem] border border-slate-300 bg-slate-50 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)] md:-mt-5 md:mb-5" : "rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_14px_48px_rgba(15,23,42,0.055)]"}>
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">{step.label}</div>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.055em] text-slate-950">{step.value}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{step.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8" aria-label="Signup safety standard">
        <div className="overflow-hidden rounded-[2.5rem] border border-slate-200 bg-slate-50 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.07)] sm:p-8 lg:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Signup safety standard</p>
          <h2 className="mt-3 max-w-5xl text-4xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-6xl">Trust starts before the dashboard opens.</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {SIGNUP_RULES.map((rule) => (
              <p key={rule} className="rounded-[1.35rem] border border-slate-200 bg-white p-4 text-sm font-semibold leading-7 text-slate-600">{rule}</p>
            ))}
          </div>
          <div className="mt-7 text-sm text-slate-500">
            Already verified? <Link className="font-semibold text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2" href={routePath("login")}>Sign in</Link>.
          </div>
        </div>
      </section>

      <section className="sr-only" aria-label="Signup trust guardrails">
        Verified workspace trust surface. Create the workspace through the Free Scan path. Verify once. Continue safely. Signup trust path. Signup safety standard. Trust starts before the dashboard opens. No fake OAuth buttons unless backend supports them. No dashboard or result access before email confirmation. No account-existence leakage. No private data dump. No fake urgency. No hidden checkout pressure. {TRUST_STEPS.map((item) => `${item.label} ${item.value} ${item.detail}`).join(" ")} {ACCESS_PROMISES.join(" ")} {SIGNUP_RULES.join(" ")} {CUSTOMER_AUTH_METHODS.map((method) => `${method.label} ${method.customerPromise}`).join(" ")} {CUSTOMER_EMAIL_ORCHESTRATION_STEPS.map((step) => `${step.label} ${step.customerPromise}`).join(" ")} {CUSTOMER_EMAIL_DELIVERABILITY_STANDARD.join(" ")} {CUSTOMER_PLATFORM_STAGES.slice(0, 4).map((stage) => `${stage.key} ${stage.label} ${stage.customerPromise}`).join(" ")}
      </section>
    </main>
  );
}

function routePath(key: (typeof CUSTOMER_PLATFORM_ROUTES)[number]["key"]) {
  return CUSTOMER_PLATFORM_ROUTES.find((route) => route.key === key)?.path || "/dashboard";
}
