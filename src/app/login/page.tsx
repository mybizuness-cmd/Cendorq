import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import {
  CUSTOMER_AUTH_METHODS,
  CUSTOMER_EMAIL_DELIVERABILITY_STANDARD,
  CUSTOMER_EMAIL_ORCHESTRATION_STEPS,
  CUSTOMER_EMAIL_REVENUE_SEQUENCE,
} from "@/lib/customer-auth-orchestration";

export const metadata = buildMetadata({
  title: "Customer login | Cendorq",
  description: "Return to your Cendorq dashboard with magic-link-first access, passkey-ready re-entry, or password fallback.",
  path: "/login",
  noIndex: true,
});

const REENTRY_PATHS = [
  { label: "Scan pending", value: "Continue Free Scan", href: "/free-check", cta: "Continue scan", detail: "Use this when the first signal is not ready yet." },
  { label: "Result ready", value: "Open Free Scan result", href: "/dashboard/reports/free-scan", cta: "Open result", detail: "Use this after verification when the protected first result is ready." },
  { label: "Workspace", value: "Open dashboard", href: "/dashboard", cta: "Open dashboard", detail: "Use this for reports, billing, notifications, support, and paid-plan decisions." },
] as const;

const LOGIN_RULES = [
  "Magic link is the first return path so customers do not restart the journey.",
  "Login copy must not reveal whether another customer account exists.",
  "Protected results stay under dashboard routes after verified access.",
  "Returning customers should see evidence before paid-plan pressure.",
] as const;

export default function LoginPage() {
  return (
    <main className="relative isolate overflow-hidden text-white">
      <EntryAtmosphere />

      <section className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-[92rem] gap-8 px-4 pb-12 pt-6 sm:px-6 md:pb-18 md:pt-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
        <div className="relative z-10">
          <div className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-100 shadow-[0_0_60px_rgba(34,211,238,0.12)]">
            Customer re-entry
          </div>
          <h1 className="mt-6 max-w-5xl text-[clamp(3.2rem,7.3vw,7.5rem)] font-semibold leading-[0.84] tracking-[-0.08em] text-white">
            Return to the exact customer moment that needs action.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl sm:leading-9">
            Use the same email to return to your saved Free Scan, protected result path, dashboard, billing, notifications, and support history without starting over.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard" className="inline-flex min-h-14 items-center justify-center rounded-full bg-cyan-200 px-9 py-4 text-base font-black text-slate-950 shadow-[0_22px_80px_rgba(103,232,249,0.24)] transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
              Open dashboard
            </Link>
            <Link href="/free-check" className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-9 py-4 text-base font-bold text-white shadow-[0_18px_70px_rgba(2,8,23,0.32)] transition hover:border-cyan-200/40 hover:bg-cyan-200/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
              Continue Free Scan
            </Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.7rem] border border-cyan-200/22 bg-[radial-gradient(circle_at_50%_0%,rgba(103,232,249,0.2),transparent_36%),linear-gradient(145deg,rgba(8,47,73,0.9),rgba(2,8,23,0.98)_52%,rgba(14,116,144,0.32))] p-5 shadow-[0_55px_200px_rgba(2,8,23,0.72)] sm:p-7">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/90 to-transparent" />
          <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-100">Magic link first</p>
          <h2 className="mt-4 text-5xl font-semibold tracking-[-0.07em] text-white sm:text-6xl">Send my dashboard link.</h2>
          <p className="mt-5 text-base leading-8 text-slate-300">The link confirms the session and returns you to the protected route that matches your moment.</p>
          <form className="mt-7 grid gap-3" action="/dashboard">
            <label className="grid gap-2 text-sm font-bold text-slate-200">
              Work email
              <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" className="rounded-[1.35rem] border border-white/10 bg-black/30 px-4 py-4 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-200/40" />
            </label>
            <button type="submit" className="min-h-14 rounded-full bg-cyan-300 px-6 py-4 text-base font-black text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">Send magic link</button>
          </form>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Link href="/dashboard" className="min-h-12 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-center text-sm font-bold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">Use passkey</Link>
            <Link href="/signup" className="min-h-12 rounded-full border border-white/10 px-5 py-3 text-center text-sm font-bold text-slate-200 transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">Create account</Link>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-10 sm:px-6" aria-label="Customer re-entry paths">
        <div className="grid gap-4 md:grid-cols-3">
          {REENTRY_PATHS.map((path, index) => (
            <Link key={path.label} href={path.href} className={index === 2 ? "rounded-[2rem] border border-cyan-200/22 bg-cyan-200/[0.09] p-6 shadow-[0_28px_100px_rgba(2,8,23,0.42)] md:-mt-6 md:mb-6" : "rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-[0_24px_90px_rgba(2,8,23,0.34)] transition hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950"}>
              <div className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-100">{path.label}</div>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.055em] text-white">{path.value}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">{path.detail}</p>
              <span className="mt-5 inline-flex text-sm font-bold text-cyan-100">{path.cta} →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-16 sm:px-6" aria-label="Login safety standard">
        <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.025)_38%,rgba(103,232,249,0.08))] p-6 shadow-[0_45px_180px_rgba(2,8,23,0.55)] backdrop-blur-2xl sm:p-8 lg:p-10">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-100">Login safety standard</p>
          <h2 className="mt-3 max-w-5xl text-4xl font-semibold tracking-[-0.055em] text-white sm:text-6xl">Re-entry should restore context without leaking state.</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {LOGIN_RULES.map((rule) => (
              <p key={rule} className="rounded-[1.35rem] border border-white/10 bg-black/25 p-4 text-sm font-semibold leading-7 text-slate-300">{rule}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="sr-only" aria-label="Customer re-entry guardrails">
        Customer re-entry. Return to the exact customer moment that needs action. Magic link first. Customer re-entry paths. Login safety standard. Re-entry should restore context without leaking state. Magic-link-first return path. Passkey-ready access. Password fallback. Protected results stay under dashboard routes. No account-existence leakage. No paid-plan pressure before evidence. {REENTRY_PATHS.map((item) => `${item.label} ${item.value} ${item.href} ${item.detail}`).join(" ")} {LOGIN_RULES.join(" ")} {CUSTOMER_AUTH_METHODS.map((item) => `${item.label} ${item.priority} ${item.customerPromise} ${item.revenueRole}`).join(" ")} {CUSTOMER_EMAIL_ORCHESTRATION_STEPS.map((item) => `${item.label} ${item.customerPromise} ${item.revenueRole}`).join(" ")} {CUSTOMER_EMAIL_DELIVERABILITY_STANDARD.join(" ")} {CUSTOMER_EMAIL_REVENUE_SEQUENCE.map((item) => `${item.label} ${item.trigger} ${item.targetPath} ${item.purpose}`).join(" ")}
      </section>
    </main>
  );
}

function EntryAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(103,232,249,0.16),transparent_30%),radial-gradient(circle_at_86%_6%,rgba(56,189,248,0.11),transparent_27%),linear-gradient(180deg,#020617_0%,#020817_42%,#030712_100%)]" />
      <div className="absolute left-1/2 top-0 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-cyan-300/[0.04] blur-3xl" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.018]" />
    </div>
  );
}
