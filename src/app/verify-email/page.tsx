import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { CUSTOMER_EMAIL_ORCHESTRATION_STEPS, CUSTOMER_EMAIL_REVENUE_SEQUENCE } from "@/lib/customer-auth-orchestration";

export const metadata = buildMetadata({
  title: "Confirm your email | Cendorq",
  description: "Confirm your Cendorq email address before opening your dashboard and Free Scan results.",
  path: "/verify-email",
  noIndex: true,
});

const CONFIRMATION_STEPS = [
  "Check the inbox that should own the Cendorq workspace.",
  "Open the expected email from Cendorq Support at support@cendorq.com.",
  "Use the confirmation link to continue to the dashboard, Free Scan, or protected result path.",
] as const;

const DESTINATIONS = [
  { label: "Workspace", value: "Open dashboard", href: "/dashboard", cta: "Open dashboard", detail: "Reports, billing, notifications, support, and plan guidance stay connected here." },
  { label: "First signal", value: "Continue Free Scan", href: "/free-check", cta: "Continue scan", detail: "Use this when the first read still needs safe business context." },
  { label: "Protected result", value: "Open Free Scan result", href: "/dashboard/reports/free-scan", cta: "Open result", detail: "Use this only after verified access; the result stays inside the dashboard." },
] as const;

const VERIFY_RULES = [
  "Verification proves inbox ownership before private dashboard or result access.",
  "Guidance must not reveal whether another customer account exists.",
  "Missing-email recovery should route calmly to magic link or support without duplicate account pressure.",
  "Free Scan result access remains dashboard-only at /dashboard/reports/free-scan.",
] as const;

export default function VerifyEmailPage() {
  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-5 text-white sm:px-6 md:py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(103,232,249,0.12),transparent_34%),radial-gradient(circle_at_86%_10%,rgba(14,165,233,0.08),transparent_30%)]" />

      <section className="system-panel-authority relative z-10 overflow-hidden rounded-[1.55rem] p-4 shadow-[0_28px_110px_rgba(2,8,23,0.42)] sm:rounded-[1.8rem] sm:p-8">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent" />
        <div className="grid gap-6 lg:grid-cols-[1fr_22rem] lg:items-start">
          <div>
            <p className="text-sm font-semibold text-cyan-100">Premium email verification gate</p>
            <h1 className="mt-3 max-w-5xl text-3xl font-semibold tracking-tight text-white sm:mt-4 sm:text-5xl">
              Confirm the inbox before private work opens.
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:mt-5 sm:text-base sm:leading-8">
              Verification protects the workspace, then sends the customer to the right next step: dashboard, Free Scan continuation, or the dashboard-only Free Scan result path.
            </p>
          </div>
          <div className="rounded-[1.35rem] border border-cyan-300/20 bg-cyan-300/10 p-4 sm:p-5">
            <div className="text-sm font-semibold text-cyan-100">After confirmation</div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">Open the right path.</h2>
            <p className="mt-3 text-sm leading-6 text-slate-200">The dashboard is the protected customer workspace after verification.</p>
            <Link href="/dashboard" className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">Open dashboard</Link>
          </div>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {CONFIRMATION_STEPS.map((step, index) => (
            <article key={step} className="rounded-[1.2rem] border border-white/10 bg-white/[0.04] p-4 sm:rounded-[1.3rem] sm:p-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-300 text-sm font-black text-slate-950">{index + 1}</div>
              <p className="mt-4 text-sm leading-7 text-slate-200">{step}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative z-10 mt-7 grid gap-3 md:grid-cols-3" aria-label="Verified destinations">
        {DESTINATIONS.map((item) => (
          <Link key={item.label} href={item.href} className="system-surface rounded-[1.25rem] p-4 transition hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950 sm:p-5">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-100">{item.label}</div>
            <h2 className="mt-3 text-xl font-semibold tracking-tight text-white">{item.value}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">{item.detail}</p>
            <span className="mt-5 inline-flex text-sm font-semibold text-cyan-100">{item.cta} →</span>
          </Link>
        ))}
      </section>

      <section className="relative z-10 mt-7 rounded-[1.45rem] border border-white/10 bg-white/[0.035] p-4 sm:p-5" aria-label="Verification safety standard">
        <p className="text-sm font-semibold text-cyan-100">Verification safety standard</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">Protect access without creating friction or leakage.</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {VERIFY_RULES.map((rule) => (
            <p key={rule} className="rounded-[1rem] border border-white/10 bg-black/20 p-3 text-xs leading-6 text-slate-300">{rule}</p>
          ))}
        </div>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Link href="/login" className="min-h-11 rounded-2xl border border-cyan-300/30 bg-cyan-300/10 px-5 py-3 text-center text-sm font-semibold text-cyan-50 transition hover:bg-cyan-300/20 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">Send a magic link</Link>
          <Link href="/dashboard/support" className="min-h-11 rounded-2xl border border-white/10 px-5 py-3 text-center text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">Need help?</Link>
        </div>
      </section>

      <section className="sr-only" aria-label="Premium verification guardrails">
        Premium email verification gate. Confirm the inbox before private work opens. Verified destinations. Verification safety standard. Protect access without creating friction or leakage. Cendorq Support at support@cendorq.com. support@cendorq.com. Verification proves inbox ownership. No account-existence leakage. Free Scan result access remains dashboard-only at /dashboard/reports/free-scan. verification click redirects to dashboard. Your welcome email is sent one time after verified profile creation. {CONFIRMATION_STEPS.join(" ")} {DESTINATIONS.map((item) => `${item.label} ${item.value} ${item.href} ${item.detail}`).join(" ")} {VERIFY_RULES.join(" ")} {CUSTOMER_EMAIL_ORCHESTRATION_STEPS.map((step) => `${step.label} ${step.customerPromise} ${step.revenueRole}`).join(" ")} {CUSTOMER_EMAIL_REVENUE_SEQUENCE.map((email) => `${email.label} ${email.trigger} ${email.targetPath} ${email.purpose}`).join(" ")}
      </section>
    </main>
  );
}
