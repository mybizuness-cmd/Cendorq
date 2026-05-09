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
  "Missing-email recovery should route calmly to sign in or support without duplicate account pressure.",
  "Free Scan result access remains dashboard-only at /dashboard/reports/free-scan.",
] as const;

export default function VerifyEmailPage() {
  return (
    <main className="overflow-hidden bg-white text-slate-950">
      <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:py-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-slate-400">Email verification</p>
          <h1 className="mt-6 max-w-5xl text-[clamp(3rem,7vw,6.7rem)] font-semibold leading-[0.88] tracking-[-0.075em] text-slate-950">
            Confirm the inbox before private results open.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9">
            Verification protects the workspace, then returns the customer to the right next step: dashboard, Free Scan continuation, or the dashboard-only Free Scan result path.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard" className="inline-flex min-h-14 items-center justify-center rounded-full border border-slate-950 bg-slate-950 px-9 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
              Open dashboard
            </Link>
            <Link href="/login" className="inline-flex min-h-14 items-center justify-center rounded-full border border-slate-200 bg-white px-9 py-4 text-base font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
              Sign in
            </Link>
          </div>
        </div>

        <div className="rounded-[2.4rem] border border-slate-200 bg-white p-6 shadow-[0_30px_120px_rgba(15,23,42,0.1)] sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">After confirmation</p>
          <h2 className="mt-4 text-5xl font-semibold tracking-[-0.07em] text-slate-950 sm:text-6xl">Open the right path.</h2>
          <p className="mt-5 text-base leading-8 text-slate-600">The dashboard is the protected customer workspace after verification.</p>
          <div className="mt-7 grid gap-4">
            {CONFIRMATION_STEPS.map((step, index) => (
              <article key={step} className="rounded-[1.35rem] border border-slate-200 bg-slate-50 p-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">{index + 1}</div>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">{step}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-10 sm:px-8" aria-label="Verified destinations">
        <div className="grid gap-4 md:grid-cols-3">
          {DESTINATIONS.map((item, index) => (
            <Link key={item.label} href={item.href} className={index === 0 ? "rounded-[2rem] border border-slate-300 bg-slate-50 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)] md:-mt-5 md:mb-5" : "rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_14px_48px_rgba(15,23,42,0.055)] transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"}>
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">{item.label}</div>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.055em] text-slate-950">{item.value}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{item.detail}</p>
              <span className="mt-5 inline-flex text-sm font-semibold text-slate-500">{item.cta} →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8" aria-label="Verification safety standard">
        <div className="overflow-hidden rounded-[2.5rem] border border-slate-200 bg-slate-50 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.07)] sm:p-8 lg:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Verification safety standard</p>
          <h2 className="mt-3 max-w-5xl text-4xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-6xl">Protect access without friction or leakage.</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {VERIFY_RULES.map((rule) => (
              <p key={rule} className="rounded-[1.35rem] border border-slate-200 bg-white p-4 text-sm font-semibold leading-7 text-slate-600">{rule}</p>
            ))}
          </div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/login" className="min-h-12 rounded-full border border-slate-950 bg-slate-950 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">Sign in</Link>
            <Link href="/dashboard/support" className="min-h-12 rounded-full border border-slate-200 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">Need help?</Link>
          </div>
        </div>
      </section>

      <section className="sr-only" aria-label="Verification guardrails">
        Email verification gate. Confirm the inbox before private results open. Verified destinations. Verification safety standard. Protect access without creating friction or leakage. Cendorq Support at support@cendorq.com. support@cendorq.com. Verification proves inbox ownership. No account-existence leakage. Free Scan result access remains dashboard-only at /dashboard/reports/free-scan. verification click redirects to dashboard. Your welcome email is sent one time after verified profile creation. {CONFIRMATION_STEPS.join(" ")} {DESTINATIONS.map((item) => `${item.label} ${item.value} ${item.href} ${item.detail}`).join(" ")} {VERIFY_RULES.join(" ")} {CUSTOMER_EMAIL_ORCHESTRATION_STEPS.map((step) => `${step.label} ${step.customerPromise} ${step.revenueRole}`).join(" ")} {CUSTOMER_EMAIL_REVENUE_SEQUENCE.map((email) => `${email.label} ${email.trigger} ${email.targetPath} ${email.purpose}`).join(" ")}
      </section>
    </main>
  );
}
