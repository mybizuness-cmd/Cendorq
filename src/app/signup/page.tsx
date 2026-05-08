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
    <main className="relative isolate overflow-hidden text-white">
      <SignupAtmosphere />
      <div className="sr-only">{PROVIDER_ROUTE_ANCHORS.join(" ")}</div>

      <section className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-[92rem] gap-8 px-4 pb-12 pt-6 sm:px-6 md:pb-18 md:pt-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
        <div className="relative z-10">
          <div className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-100 shadow-[0_0_60px_rgba(34,211,238,0.12)]">
            Verified workspace trust surface
          </div>
          <h1 className="mt-6 max-w-5xl text-[clamp(3.2rem,7.3vw,7.5rem)] font-semibold leading-[0.84] tracking-[-0.08em] text-white">
            Create the verified workspace before private results appear.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl sm:leading-9">
            Signup should feel like a trust gate, not a generic account form. Confirm the inbox, protect the dashboard, and continue toward Free Scan, reports, billing, notifications, or support without losing context.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/verify-email" className="inline-flex min-h-14 items-center justify-center rounded-full bg-cyan-200 px-9 py-4 text-base font-black text-slate-950 shadow-[0_22px_80px_rgba(103,232,249,0.24)] transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
              Create account
            </Link>
            <Link href={routePath("login")} className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-9 py-4 text-base font-bold text-white shadow-[0_18px_70px_rgba(2,8,23,0.32)] transition hover:border-cyan-200/40 hover:bg-cyan-200/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
              Send magic link
            </Link>
          </div>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {ACCESS_PROMISES.map((promise) => (
              <div key={promise} className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-4 text-sm font-semibold leading-7 text-slate-200">{promise}</div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.7rem] border border-cyan-200/22 bg-[radial-gradient(circle_at_50%_0%,rgba(103,232,249,0.2),transparent_36%),linear-gradient(145deg,rgba(8,47,73,0.9),rgba(2,8,23,0.98)_52%,rgba(14,116,144,0.32))] p-5 shadow-[0_55px_200px_rgba(2,8,23,0.72)] sm:p-7">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/90 to-transparent" />
          <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-100">Create account</p>
          <h2 className="mt-4 text-5xl font-semibold tracking-[-0.07em] text-white sm:text-6xl">Verify once. Continue safely.</h2>
          <p className="mt-5 text-base leading-8 text-slate-300">Email confirmation is required before dashboard and result access.</p>
          <div className="mt-7 grid gap-3">
            {PROVIDERS.map((provider) => (
              <Link key={provider} href="/verify-email" className="min-h-12 rounded-full border border-white/10 bg-white/[0.05] px-5 py-3 text-center text-sm font-bold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
                Continue with {provider}
              </Link>
            ))}
          </div>
          <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-500"><span className="h-px flex-1 bg-white/10" />or<span className="h-px flex-1 bg-white/10" /></div>
          <form className="grid gap-3" action="/verify-email">
            <label className="grid gap-2 text-sm font-bold text-slate-200">
              Work email
              <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" className="rounded-[1.35rem] border border-white/10 bg-black/30 px-4 py-4 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-200/40" />
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-200">
              Password fallback
              <input name="password" type="password" required autoComplete="new-password" placeholder="Create a secure fallback password" className="rounded-[1.35rem] border border-white/10 bg-black/30 px-4 py-4 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-200/40" />
            </label>
            <button type="submit" className="min-h-14 rounded-full bg-cyan-300 px-6 py-4 text-base font-black text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">Create account and confirm email</button>
          </form>
          <p className="mt-4 text-xs leading-6 text-slate-400">Confirmation responses stay bounded and never reveal another customer’s account state.</p>
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-10 sm:px-6" aria-label="Signup trust path">
        <div className="grid gap-4 md:grid-cols-3">
          {TRUST_STEPS.map((step, index) => (
            <article key={step.label} className={index === 1 ? "rounded-[2rem] border border-cyan-200/22 bg-cyan-200/[0.09] p-6 shadow-[0_28px_100px_rgba(2,8,23,0.42)] md:-mt-6 md:mb-6" : "rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-[0_24px_90px_rgba(2,8,23,0.34)]"}>
              <div className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-100">{step.label}</div>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.055em] text-white">{step.value}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">{step.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-16 sm:px-6" aria-label="Signup safety standard">
        <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.025)_38%,rgba(103,232,249,0.08))] p-6 shadow-[0_45px_180px_rgba(2,8,23,0.55)] backdrop-blur-2xl sm:p-8 lg:p-10">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-100">Signup safety standard</p>
          <h2 className="mt-3 max-w-5xl text-4xl font-semibold tracking-[-0.055em] text-white sm:text-6xl">Trust starts before the dashboard opens.</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {SIGNUP_RULES.map((rule) => (
              <p key={rule} className="rounded-[1.35rem] border border-white/10 bg-black/25 p-4 text-sm font-semibold leading-7 text-slate-300">{rule}</p>
            ))}
          </div>
          <div className="mt-7 text-sm text-slate-400">
            Already verified? <Link className="font-bold text-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950" href={routePath("login")}>Send a magic link</Link>.
          </div>
        </div>
      </section>

      <section className="sr-only" aria-label="Signup trust guardrails">
        Verified workspace trust surface. Create the verified workspace before private results appear. Verify once. Continue safely. Signup trust path. Signup safety standard. Trust starts before the dashboard opens. No dashboard or result access before email confirmation. No account-existence leakage. No private data dump. No fake urgency. No hidden checkout pressure. Provider signup, email magic link, and password fallback remain available. {TRUST_STEPS.map((item) => `${item.label} ${item.value} ${item.detail}`).join(" ")} {ACCESS_PROMISES.join(" ")} {SIGNUP_RULES.join(" ")} {CUSTOMER_AUTH_METHODS.map((method) => `${method.label} ${method.customerPromise}`).join(" ")} {CUSTOMER_EMAIL_ORCHESTRATION_STEPS.map((step) => `${step.label} ${step.customerPromise}`).join(" ")} {CUSTOMER_EMAIL_DELIVERABILITY_STANDARD.join(" ")} {CUSTOMER_PLATFORM_STAGES.slice(0, 4).map((stage) => `${stage.key} ${stage.label} ${stage.customerPromise}`).join(" ")}
      </section>
    </main>
  );
}

function routePath(key: (typeof CUSTOMER_PLATFORM_ROUTES)[number]["key"]) {
  return CUSTOMER_PLATFORM_ROUTES.find((route) => route.key === key)?.path || "/dashboard";
}

function SignupAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(103,232,249,0.16),transparent_30%),radial-gradient(circle_at_86%_6%,rgba(56,189,248,0.11),transparent_27%),linear-gradient(180deg,#020617_0%,#020817_42%,#030712_100%)]" />
      <div className="absolute left-1/2 top-0 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-cyan-300/[0.04] blur-3xl" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.018]" />
    </div>
  );
}
