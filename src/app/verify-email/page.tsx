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
    <main className="relative isolate overflow-hidden text-white">
      <VerifyAtmosphere />

      <section className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-[92rem] gap-8 px-4 pb-12 pt-6 sm:px-6 md:pb-18 md:pt-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
        <div className="relative z-10">
          <div className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-100 shadow-[0_0_60px_rgba(34,211,238,0.12)]">
            Email verification gate
          </div>
          <h1 className="mt-6 max-w-5xl text-[clamp(3.2rem,7.3vw,7.5rem)] font-semibold leading-[0.84] tracking-[-0.08em] text-white">
            Confirm the inbox before private work opens.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl sm:leading-9">
            Verification protects the workspace, then sends the customer to the right next step: dashboard, Free Scan continuation, or the dashboard-only Free Scan result path.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard" className="inline-flex min-h-14 items-center justify-center rounded-full bg-cyan-200 px-9 py-4 text-base font-black text-slate-950 shadow-[0_22px_80px_rgba(103,232,249,0.24)] transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
              Open dashboard
            </Link>
            <Link href="/login" className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-9 py-4 text-base font-bold text-white shadow-[0_18px_70px_rgba(2,8,23,0.32)] transition hover:border-cyan-200/40 hover:bg-cyan-200/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
              Send magic link
            </Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.7rem] border border-cyan-200/22 bg-[radial-gradient(circle_at_50%_0%,rgba(103,232,249,0.2),transparent_36%),linear-gradient(145deg,rgba(8,47,73,0.9),rgba(2,8,23,0.98)_52%,rgba(14,116,144,0.32))] p-5 shadow-[0_55px_200px_rgba(2,8,23,0.72)] sm:p-7">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/90 to-transparent" />
          <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-100">After confirmation</p>
          <h2 className="mt-4 text-5xl font-semibold tracking-[-0.07em] text-white sm:text-6xl">Open the right path.</h2>
          <p className="mt-5 text-base leading-8 text-slate-300">The dashboard is the protected customer workspace after verification.</p>
          <div className="mt-7 grid gap-4">
            {CONFIRMATION_STEPS.map((step, index) => (
              <article key={step} className="rounded-[1.35rem] border border-white/10 bg-black/24 p-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-300 text-sm font-black text-slate-950">{index + 1}</div>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-200">{step}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-10 sm:px-6" aria-label="Verified destinations">
        <div className="grid gap-4 md:grid-cols-3">
          {DESTINATIONS.map((item, index) => (
            <Link key={item.label} href={item.href} className={index === 0 ? "rounded-[2rem] border border-cyan-200/22 bg-cyan-200/[0.09] p-6 shadow-[0_28px_100px_rgba(2,8,23,0.42)] md:-mt-6 md:mb-6" : "rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-[0_24px_90px_rgba(2,8,23,0.34)] transition hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950"}>
              <div className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-100">{item.label}</div>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.055em] text-white">{item.value}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">{item.detail}</p>
              <span className="mt-5 inline-flex text-sm font-bold text-cyan-100">{item.cta} →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-16 sm:px-6" aria-label="Verification safety standard">
        <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.025)_38%,rgba(103,232,249,0.08))] p-6 shadow-[0_45px_180px_rgba(2,8,23,0.55)] backdrop-blur-2xl sm:p-8 lg:p-10">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-100">Verification safety standard</p>
          <h2 className="mt-3 max-w-5xl text-4xl font-semibold tracking-[-0.055em] text-white sm:text-6xl">Protect access without creating friction or leakage.</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {VERIFY_RULES.map((rule) => (
              <p key={rule} className="rounded-[1.35rem] border border-white/10 bg-black/25 p-4 text-sm font-semibold leading-7 text-slate-300">{rule}</p>
            ))}
          </div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/login" className="min-h-12 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-6 py-3 text-center text-sm font-bold text-cyan-50 transition hover:bg-cyan-300/20 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">Send a magic link</Link>
            <Link href="/dashboard/support" className="min-h-12 rounded-full border border-white/10 px-6 py-3 text-center text-sm font-bold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">Need help?</Link>
          </div>
        </div>
      </section>

      <section className="sr-only" aria-label="Verification guardrails">
        Email verification gate. Confirm the inbox before private work opens. Verified destinations. Verification safety standard. Protect access without creating friction or leakage. Cendorq Support at support@cendorq.com. support@cendorq.com. Verification proves inbox ownership. No account-existence leakage. Free Scan result access remains dashboard-only at /dashboard/reports/free-scan. verification click redirects to dashboard. Your welcome email is sent one time after verified profile creation. {CONFIRMATION_STEPS.join(" ")} {DESTINATIONS.map((item) => `${item.label} ${item.value} ${item.href} ${item.detail}`).join(" ")} {VERIFY_RULES.join(" ")} {CUSTOMER_EMAIL_ORCHESTRATION_STEPS.map((step) => `${step.label} ${step.customerPromise} ${step.revenueRole}`).join(" ")} {CUSTOMER_EMAIL_REVENUE_SEQUENCE.map((email) => `${email.label} ${email.trigger} ${email.targetPath} ${email.purpose}`).join(" ")}
      </section>
    </main>
  );
}

function VerifyAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(103,232,249,0.16),transparent_30%),radial-gradient(circle_at_86%_6%,rgba(56,189,248,0.11),transparent_27%),linear-gradient(180deg,#020617_0%,#020817_42%,#030712_100%)]" />
      <div className="absolute left-1/2 top-0 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-cyan-300/[0.04] blur-3xl" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.018]" />
    </div>
  );
}
