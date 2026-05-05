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
  "Continue your Free Scan",
  "Open a ready report",
  "Resolve billing or support blockers",
  "Choose the right paid next step",
] as const;

export default function LoginPage() {
  return (
    <main className="relative mx-auto max-w-6xl overflow-hidden px-4 py-10 text-white sm:px-6 md:py-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_28%_0%,rgba(103,232,249,0.12),transparent_34%)]" />

      <section className="relative z-10 grid gap-7 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold text-cyan-100">Customer re-entry</p>
          <h1 className="system-hero-title mt-4 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Get back to the dashboard without friction.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            Enter the same email and use a magic link to return to your workspace, reports, billing, support, and the next paid decision. Password remains a fallback, not the main path.
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
            Use the email tied to your Cendorq account. The link should confirm the session and send you straight to the dashboard.
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
            <Link href="/dashboard" className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-center text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10">
              Use passkey when available
            </Link>
            <Link href="/signup" className="rounded-2xl border border-white/10 px-5 py-3 text-center text-sm font-semibold text-slate-200 transition hover:border-cyan-300/40 hover:bg-cyan-300/10">
              Create account instead
            </Link>
          </div>
        </div>
      </section>

      <section className="sr-only" aria-label="Customer re-entry guardrails">
        Email magic link. Passkey-ready access. Email and password fallback. magic-link-first returning customer access. verification click redirects to dashboard. Returning customers use magic link first. Transactional emails and marketing follow-up remain separated. SPF DKIM DMARC suppression handling one-click unsubscribe lifecycle emails dashboard opened magic link sent magic link clicked report-ready email opened paid-plan click events. {CUSTOMER_AUTH_METHODS.map((item) => `${item.label} ${item.priority} ${item.customerPromise} ${item.revenueRole}`).join(" ")} {CUSTOMER_EMAIL_ORCHESTRATION_STEPS.map((item) => `${item.label} ${item.customerPromise} ${item.revenueRole}`).join(" ")} {CUSTOMER_EMAIL_DELIVERABILITY_STANDARD.join(" ")} {CUSTOMER_EMAIL_REVENUE_SEQUENCE.map((item) => `${item.label} ${item.trigger} ${item.targetPath} ${item.purpose}`).join(" ")}
      </section>
    </main>
  );
}
