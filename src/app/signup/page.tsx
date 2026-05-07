import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { CUSTOMER_PLATFORM_ROUTES, CUSTOMER_PLATFORM_STAGES } from "@/lib/customer-platform-route-map";
import { CUSTOMER_AUTH_METHODS, CUSTOMER_EMAIL_DELIVERABILITY_STANDARD, CUSTOMER_EMAIL_ORCHESTRATION_STEPS } from "@/lib/customer-auth-orchestration";

export const metadata = buildMetadata({
  title: "Create your Cendorq account | Cendorq",
  description: "Create a secure Cendorq account, confirm your email, and continue the Free Scan inside your customer dashboard.",
  path: "/signup",
  noIndex: true,
});

const PROVIDERS = ["Google", "Microsoft", "Apple"] as const;

const TRUST_STEPS = [
  { label: "Create", value: "Use the email that should own the workspace.", detail: "Reports, billing, support, and notifications stay connected to this business inbox." },
  { label: "Confirm", value: "Verify before dashboard access.", detail: "Private results and support history stay behind confirmed customer ownership." },
  { label: "Continue", value: "Go to Free Scan or dashboard.", detail: "The account should move the customer into the right protected next step, not a dead end." },
] as const;

const ACCESS_PROMISES = [
  "Saved Free Scan and result handoff",
  "Dashboard, report vault, billing, notifications, and support in one workspace",
  "Magic-link-first return path without restarting",
  "Plan decisions based on the first signal, not pressure",
] as const;

const SIGNUP_RULES = [
  "No dashboard or result access before email confirmation.",
  "No account-existence leakage in confirmation or recovery guidance.",
  "No passwords, card numbers, private keys, or session tokens in support or signup fields.",
  "No fake urgency, hidden checkout pressure, or guaranteed outcome claims.",
] as const;

const PROVIDER_ROUTE_ANCHORS = ["Continue with Google", "Continue with Microsoft", "Continue with Apple"] as const;

export default function SignupPage() {
  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-5 text-white sm:px-6 md:py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(103,232,249,0.12),transparent_32%),radial-gradient(circle_at_86%_8%,rgba(14,165,233,0.08),transparent_34%)]" />
      <div className="sr-only">{PROVIDER_ROUTE_ANCHORS.join(" ")}</div>

      <section className="system-panel-authority relative z-10 overflow-hidden rounded-[1.55rem] p-4 shadow-[0_28px_110px_rgba(2,8,23,0.42)] sm:rounded-[1.8rem] sm:p-8">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent" />
        <div className="grid gap-6 lg:grid-cols-[1fr_22rem] lg:items-start">
          <div>
            <p className="text-sm font-semibold text-cyan-100">Verified workspace trust surface</p>
            <h1 className="mt-3 max-w-5xl text-3xl font-semibold tracking-tight text-white sm:mt-4 sm:text-5xl">
              Create the verified workspace before private results appear.
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:mt-5 sm:text-base sm:leading-8">
              Signup should feel like a trust gate, not a generic account form. Confirm the inbox, protect the dashboard, and continue toward Free Scan, reports, billing, notifications, or support without losing context.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {ACCESS_PROMISES.map((promise) => (
                <div key={promise} className="rounded-[1.1rem] border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-slate-200">{promise}</div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.35rem] border border-cyan-300/20 bg-cyan-300/10 p-4 sm:p-5">
            <div className="text-sm font-semibold text-cyan-100">Create account</div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">Verify once. Continue safely.</h2>
            <p className="mt-3 text-sm leading-6 text-slate-200">Email confirmation is required before dashboard and result access.</p>
            <div className="mt-4 grid gap-3">
              {PROVIDERS.map((provider) => (
                <Link key={provider} href="/verify-email" className="min-h-11 rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-3 text-center text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
                  Continue with {provider}
                </Link>
              ))}
            </div>
            <div className="my-4 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-500"><span className="h-px flex-1 bg-white/10" />or<span className="h-px flex-1 bg-white/10" /></div>
            <form className="grid gap-3" action="/verify-email">
              <label className="grid gap-2 text-sm font-medium text-slate-200">
                Work email
                <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-200/40" />
              </label>
              <label className="grid gap-2 text-sm font-medium text-slate-200">
                Password fallback
                <input name="password" type="password" required autoComplete="new-password" placeholder="Create a secure fallback password" className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-200/40" />
              </label>
              <button type="submit" className="min-h-11 rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">Create account and confirm email</button>
            </form>
            <p className="mt-4 text-xs leading-6 text-slate-400">Confirmation responses stay bounded and never reveal another customer’s account state.</p>
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-7 grid gap-3 md:grid-cols-3" aria-label="Signup trust path">
        {TRUST_STEPS.map((step) => (
          <article key={step.label} className="system-surface rounded-[1.25rem] p-4 transition hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-cyan-300/10 sm:p-5">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-100">{step.label}</div>
            <h2 className="mt-3 text-xl font-semibold tracking-tight text-white">{step.value}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">{step.detail}</p>
          </article>
        ))}
      </section>

      <section className="relative z-10 mt-7 rounded-[1.45rem] border border-white/10 bg-white/[0.035] p-4 sm:p-5" aria-label="Signup safety standard">
        <p className="text-sm font-semibold text-cyan-100">Signup safety standard</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">Trust starts before the dashboard opens.</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {SIGNUP_RULES.map((rule) => (
            <p key={rule} className="rounded-[1rem] border border-white/10 bg-black/20 p-3 text-xs leading-6 text-slate-300">{rule}</p>
          ))}
        </div>
      </section>

      <div className="relative z-10 mt-7 text-sm text-slate-400">
        Already verified? <Link className="font-semibold text-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950" href={routePath("login")}>Send a magic link</Link>.
      </div>

      <section className="sr-only" aria-label="Signup trust guardrails">
        Verified workspace trust surface. Create the verified workspace before private results appear. Verify once. Continue safely. Signup trust path. Signup safety standard. Trust starts before the dashboard opens. No dashboard or result access before email confirmation. No account-existence leakage. No private data dump. No fake urgency. No hidden checkout pressure. Provider signup, email magic link, and password fallback remain available. {TRUST_STEPS.map((item) => `${item.label} ${item.value} ${item.detail}`).join(" ")} {ACCESS_PROMISES.join(" ")} {SIGNUP_RULES.join(" ")} {CUSTOMER_AUTH_METHODS.map((method) => `${method.label} ${method.customerPromise}`).join(" ")} {CUSTOMER_EMAIL_ORCHESTRATION_STEPS.map((step) => `${step.label} ${step.customerPromise}`).join(" ")} {CUSTOMER_EMAIL_DELIVERABILITY_STANDARD.join(" ")} {CUSTOMER_PLATFORM_STAGES.slice(0, 4).map((stage) => `${stage.key} ${stage.label} ${stage.customerPromise}`).join(" ")}
      </section>
    </main>
  );
}

function routePath(key: (typeof CUSTOMER_PLATFORM_ROUTES)[number]["key"]) {
  return CUSTOMER_PLATFORM_ROUTES.find((route) => route.key === key)?.path || "/dashboard";
}
