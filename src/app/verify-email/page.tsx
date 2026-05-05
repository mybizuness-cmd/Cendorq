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
  "Check the inbox for the address you used to sign up.",
  "Open the email from Cendorq Support <support@cendorq.com>.",
  "Select the confirmation link to confirm email ownership and open the customer dashboard.",
] as const;

const VERIFICATION_SAFETY_NOTES = [
  "For privacy, Cendorq keeps confirmation guidance bounded and never exposes another customer's status.",
  "Dashboard, Free Scan history, report status, billing, notifications, and support status stay gated until the email is verified.",
  "Cendorq will not ask for passwords, card numbers, private keys, or session tokens through email confirmation support.",
  "If the message is missing, use the retry path calmly rather than creating duplicate accounts or sharing private evidence.",
] as const;

const AFTER_CONFIRMATION_PATH = [
  { label: "Verified access", value: "Open dashboard", detail: "Enter the workspace that keeps scan, reports, support, billing, and plan guidance connected." },
  { label: "Next action", value: "Continue Free Scan", detail: "Finish the first read so the paid next step can be chosen with context." },
  { label: "Paid path", value: "Choose the right depth", detail: "Use the result to decide between Deep Review, Build Fix, or Ongoing Control." },
] as const;

export default function VerifyEmailPage() {
  return (
    <main className="relative mx-auto max-w-6xl overflow-hidden px-4 pb-28 pt-8 text-white sm:px-6 md:py-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(103,232,249,0.12),transparent_34%)]" />
      <section className="system-panel-authority relative z-10 overflow-hidden rounded-[1.55rem] p-4 sm:rounded-[1.8rem] sm:p-8">
        <div className="grid gap-5 lg:grid-cols-[1fr_18rem] lg:items-start">
          <div>
            <p className="text-sm font-semibold text-cyan-100">Email confirmation required</p>
            <h1 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:mt-4 sm:text-5xl">
              Confirm once. Land inside the dashboard.
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:mt-5 sm:text-base sm:leading-8">
              The confirmation link should verify the inbox and send the customer straight into the dashboard, where the next scan, report, billing, or paid-depth action is waiting.
            </p>
          </div>
          <div className="rounded-[1.2rem] border border-cyan-300/20 bg-cyan-300/10 p-4 sm:rounded-[1.3rem] sm:p-5">
            <div className="text-sm font-semibold text-cyan-100">After confirmation</div>
            <div className="mt-2 text-2xl font-semibold text-white sm:mt-3">Open dashboard</div>
            <p className="mt-2 text-sm leading-6 text-slate-200">Dashboard activation is the first real customer workspace moment.</p>
            <Link href="/dashboard" className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950 sm:w-auto">
              Open dashboard
            </Link>
          </div>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3 sm:mt-7 sm:gap-4">
          {CONFIRMATION_STEPS.map((step, index) => (
            <article key={step} className="rounded-[1.2rem] border border-white/10 bg-white/[0.04] p-4 sm:rounded-[1.3rem] sm:p-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-300 text-sm font-black text-slate-950">{index + 1}</div>
              <p className="mt-3 text-sm leading-7 text-slate-200 sm:mt-4">{step}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row">
          <Link href="/dashboard" className="min-h-11 rounded-2xl bg-cyan-300 px-5 py-3 text-center text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
            Open dashboard after confirmation
          </Link>
          <Link href="/login" className="min-h-11 rounded-2xl border border-white/10 px-5 py-3 text-center text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
            Send a magic link
          </Link>
          <Link href="/signup" className="min-h-11 rounded-2xl border border-white/10 px-5 py-3 text-center text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
            Use a different email
          </Link>
        </div>
      </section>

      <section className="relative z-10 mt-6 grid gap-3 md:grid-cols-3 sm:mt-7 sm:gap-4" aria-label="After confirmation path">
        {AFTER_CONFIRMATION_PATH.map((item) => (
          <article key={item.label} className="system-surface rounded-[1.25rem] p-4 sm:rounded-[1.35rem] sm:p-5">
            <div className="text-xs font-semibold text-cyan-100">{item.label}</div>
            <h2 className="mt-2 text-lg font-semibold tracking-tight text-white sm:mt-3 sm:text-xl">{item.value}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300 sm:mt-3">{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="sr-only" aria-label="Verification guardrails">
        Confirm your email. Cendorq Support <support@cendorq.com>. support@cendorq.com. Your welcome email is sent one time after verified profile creation. verification click redirects to dashboard. Click confirms and redirects to dashboard. Open dashboard after confirmation. Continue to Free Scan after confirmation. Verification safety notes. {VERIFICATION_SAFETY_NOTES.join(" ")} {CUSTOMER_EMAIL_ORCHESTRATION_STEPS.map((step) => `${step.label} ${step.customerPromise} ${step.revenueRole}`).join(" ")} {CUSTOMER_EMAIL_REVENUE_SEQUENCE.map((email) => `${email.label} ${email.trigger} ${email.targetPath} ${email.purpose}`).join(" ")}
      </section>
    </main>
  );
}
