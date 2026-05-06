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
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-5 text-white sm:px-6 md:py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_28%_0%,rgba(103,232,249,0.12),transparent_34%),radial-gradient(circle_at_86%_10%,rgba(14,165,233,0.08),transparent_30%)]" />

      <section className="system-panel-authority relative z-10 overflow-hidden rounded-[1.55rem] p-4 shadow-[0_28px_110px_rgba(2,8,23,0.42)] sm:rounded-[1.8rem] sm:p-8">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent" />
        <div className="grid gap-6 lg:grid-cols-[1fr_22rem] lg:items-start">
          <div>
            <p className="text-sm font-semibold text-cyan-100">Premium customer re-entry</p>
            <h1 className="mt-3 max-w-5xl text-3xl font-semibold tracking-tight text-white sm:mt-4 sm:text-5xl">
              Return to the exact customer moment that needs action.
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:mt-5 sm:text-base sm:leading-8">
              Use the same email to return to your saved Free Scan, protected result path, dashboard, billing, notifications, and support history without starting over.
            </p>
          </div>

          <div className="rounded-[1.35rem] border border-cyan-300/20 bg-cyan-300/10 p-4 sm:p-5">
            <div className="text-sm font-semibold text-cyan-100">Magic link first</div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">Send my dashboard link.</h2>
            <p className="mt-3 text-sm leading-6 text-slate-200">The link confirms the session and returns you to the protected route that matches your moment.</p>
            <form className="mt-4 grid gap-3" action="/dashboard">
              <label className="grid gap-2 text-sm font-medium text-slate-200">
                Work email
                <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-200/40" />
              </label>
              <button type="submit" className="min-h-11 rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">Send magic link</button>
            </form>
            <div className="mt-4 grid gap-3">
              <Link href="/dashboard" className="min-h-11 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-center text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">Use passkey when available</Link>
              <Link href="/signup" className="min-h-11 rounded-2xl border border-white/10 px-5 py-3 text-center text-sm font-semibold text-slate-200 transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">Create account instead</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-7 grid gap-3 md:grid-cols-3" aria-label="Premium reentry paths">
        {REENTRY_PATHS.map((path) => (
          <Link key={path.label} href={path.href} className="system-surface rounded-[1.25rem] p-4 transition hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950 sm:p-5">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-100">{path.label}</div>
            <h2 className="mt-3 text-xl font-semibold tracking-tight text-white">{path.value}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">{path.detail}</p>
            <span className="mt-5 inline-flex text-sm font-semibold text-cyan-100">{path.cta} →</span>
          </Link>
        ))}
      </section>

      <section className="relative z-10 mt-7 rounded-[1.45rem] border border-white/10 bg-white/[0.035] p-4 sm:p-5" aria-label="Login safety standard">
        <p className="text-sm font-semibold text-cyan-100">Login safety standard</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">Re-entry should restore context without leaking state.</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {LOGIN_RULES.map((rule) => (
            <p key={rule} className="rounded-[1rem] border border-white/10 bg-black/20 p-3 text-xs leading-6 text-slate-300">{rule}</p>
          ))}
        </div>
      </section>

      <section className="sr-only" aria-label="Premium customer re-entry guardrails">
        Premium customer re-entry. Return to the exact customer moment that needs action. Magic link first. Premium reentry paths. Login safety standard. Re-entry should restore context without leaking state. Magic-link-first return path. Passkey-ready access. Password fallback. Protected results stay under dashboard routes. No account-existence leakage. No paid-plan pressure before evidence. {REENTRY_PATHS.map((item) => `${item.label} ${item.value} ${item.href} ${item.detail}`).join(" ")} {LOGIN_RULES.join(" ")} {CUSTOMER_AUTH_METHODS.map((item) => `${item.label} ${item.priority} ${item.customerPromise} ${item.revenueRole}`).join(" ")} {CUSTOMER_EMAIL_ORCHESTRATION_STEPS.map((item) => `${item.label} ${item.customerPromise} ${item.revenueRole}`).join(" ")} {CUSTOMER_EMAIL_DELIVERABILITY_STANDARD.join(" ")} {CUSTOMER_EMAIL_REVENUE_SEQUENCE.map((item) => `${item.label} ${item.trigger} ${item.targetPath} ${item.purpose}`).join(" ")}
      </section>
    </main>
  );
}
