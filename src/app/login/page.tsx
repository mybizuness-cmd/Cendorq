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

const REENTRY_REASONS = [
  "Continue the Free Scan without restarting",
  "Open the Free Scan result path or report vault",
  "Resolve billing, notification, or support blockers",
  "Choose the right paid next step from saved context",
] as const;

const REENTRY_DECISION_PATHS = [
  { label: "Free Scan pending", value: "Continue the first read", href: "/free-check", cta: "Continue Free Scan", detail: "Use this when the scan is unfinished or the first signal is not ready yet." },
  { label: "Result ready", value: "Open the report path", href: "/dashboard/reports/free-scan", cta: "Open Free Scan result", detail: "Use this when verification is complete and the first result is ready to review." },
  { label: "Paid plan active", value: "Return to the dashboard", href: "/dashboard", cta: "Open dashboard", detail: "Use this when billing, reports, support, or notifications need a protected customer workspace." },
] as const;

const REENTRY_SAFETY_STANDARDS = [
  { label: "Access posture", value: "Magic-link-first", detail: "Returning customers should get back without resetting the scan or exposing account state." },
  { label: "Destination posture", value: "Return to context", detail: "Re-entry should point to the scan, result, dashboard, billing, or support route that matches the moment." },
  { label: "Privacy posture", value: "No leakage", detail: "Login copy should not reveal whether another customer account exists or expose protected state." },
  { label: "Plan posture", value: "Evidence before spend", detail: "Returning customers should see the first signal before being pushed to paid depth." },
] as const;

export default function LoginPage() {
  return (
    <main className="relative mx-auto max-w-6xl overflow-hidden px-4 py-8 text-white sm:px-6 md:py-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_28%_0%,rgba(103,232,249,0.12),transparent_34%),radial-gradient(circle_at_86%_10%,rgba(14,165,233,0.08),transparent_30%)]" />

      <section className="relative z-10 grid gap-7 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold text-cyan-100">Customer re-entry</p>
          <h1 className="system-hero-title mt-4 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Return to the exact customer moment that needs action.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            Use the same email to return to your saved Free Scan, result path, dashboard, billing, support, and plan decision without starting over.
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {REENTRY_REASONS.map((reason) => (
              <div key={reason} className="system-surface rounded-[1.2rem] p-4 text-sm leading-6 text-slate-200">
                {reason}
              </div>
            ))}
          </div>
        </div>

        <div className="system-panel-authority relative overflow-hidden rounded-[1.8rem] p-5 sm:p-7">
          <div className="text-sm font-semibold text-cyan-100">Magic link first</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
            Send my dashboard link.
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Use the email tied to your Cendorq workspace. The link should confirm the session and return you to the protected route that matches your current moment.
          </p>
          <form className="mt-5 grid gap-4" action="/dashboard">
            <label className="grid gap-2 text-sm font-medium text-slate-200">
              Work email
              <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-200/40" />
            </label>
            <button type="submit" className="rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
              Send magic link
            </button>
          </form>
          <div className="mt-5 grid gap-3">
            <Link href="/dashboard" className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-center text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
              Use passkey when available
            </Link>
            <Link href="/signup" className="rounded-2xl border border-white/10 px-5 py-3 text-center text-sm font-semibold text-slate-200 transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
              Create account instead
            </Link>
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-8 rounded-[1.55rem] border border-white/10 bg-white/[0.035] p-4 sm:rounded-[1.7rem] sm:p-6" aria-label="Reentry decision paths">
        <div>
          <p className="text-sm font-semibold text-cyan-100">Re-entry decision paths</p>
          <h2 className="mt-2 max-w-4xl text-2xl font-semibold tracking-tight text-white sm:text-4xl">
            Pick up where the customer journey actually is.
          </h2>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {REENTRY_DECISION_PATHS.map((path) => (
            <article key={path.label} className="rounded-[1.25rem] border border-white/10 bg-black/20 p-4 sm:p-5">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-100">{path.label}</div>
              <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">{path.value}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{path.detail}</p>
              <Link href={path.href} className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-300/10 px-4 py-3 text-sm font-semibold text-cyan-50 transition hover:bg-cyan-300/20 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
                {path.cta}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="relative z-10 mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4" aria-label="Reentry safety standards">
        {REENTRY_SAFETY_STANDARDS.map((item) => (
          <article key={item.label} className="system-surface rounded-[1.35rem] p-5">
            <div className="text-sm font-semibold text-cyan-100">{item.label}</div>
            <div className="mt-3 text-xl font-semibold tracking-tight text-white">{item.value}</div>
            <p className="mt-3 text-sm leading-6 text-slate-300">{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="sr-only" aria-label="Customer re-entry guardrails">
        Email magic link. Re-entry decision paths. Pick up where the customer journey actually is. Reentry safety standards. Passkey-ready access. Email and password fallback. magic-link-first returning customer access. verification click redirects to dashboard. Returning customers use magic link first. Transactional emails and marketing follow-up remain separated. SPF DKIM DMARC suppression handling one-click unsubscribe lifecycle emails dashboard opened magic link sent magic link clicked report-ready email opened paid-plan click events. {REENTRY_DECISION_PATHS.map((item) => `${item.label} ${item.value} ${item.href} ${item.detail}`).join(" ")} {REENTRY_SAFETY_STANDARDS.map((item) => `${item.label} ${item.value} ${item.detail}`).join(" ")} {CUSTOMER_AUTH_METHODS.map((item) => `${item.label} ${item.priority} ${item.customerPromise} ${item.revenueRole}`).join(" ")} {CUSTOMER_EMAIL_ORCHESTRATION_STEPS.map((item) => `${item.label} ${item.customerPromise} ${item.revenueRole}`).join(" ")} {CUSTOMER_EMAIL_DELIVERABILITY_STANDARD.join(" ")} {CUSTOMER_EMAIL_REVENUE_SEQUENCE.map((item) => `${item.label} ${item.trigger} ${item.targetPath} ${item.purpose}`).join(" ")}
      </section>
    </main>
  );
}
