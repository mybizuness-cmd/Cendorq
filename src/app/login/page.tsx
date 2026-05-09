import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import {
  CUSTOMER_AUTH_METHODS,
  CUSTOMER_EMAIL_DELIVERABILITY_STANDARD,
  CUSTOMER_EMAIL_ORCHESTRATION_STEPS,
  CUSTOMER_EMAIL_REVENUE_SEQUENCE,
} from "@/lib/customer-auth-orchestration";

export const metadata = buildMetadata({
  title: "Sign in | Cendorq",
  description: "Return to your Cendorq workspace, Free Scan result, reports, billing, notifications, and support.",
  path: "/login",
  noIndex: true,
});

const REENTRY_PATHS = [
  { label: "Still scanning", value: "Continue Free Scan", href: "/free-check", cta: "Continue scan", detail: "Use this when the first signal still needs business context." },
  { label: "Result ready", value: "Open Free Scan result", href: "/dashboard/reports/free-scan", cta: "Open result", detail: "Use this after verification when the protected first result is ready." },
  { label: "Workspace", value: "Open dashboard", href: "/dashboard", cta: "Open dashboard", detail: "Use this for reports, billing, notifications, support, and plan decisions." },
] as const;

const LOGIN_RULES = [
  "Sign in returns the customer to the workspace instead of restarting the journey.",
  "Copy must not reveal whether another customer account exists.",
  "Protected results stay under dashboard routes after verified access.",
  "Returning customers should see evidence before paid-plan pressure.",
] as const;

export default function LoginPage() {
  return (
    <main className="overflow-hidden bg-white text-slate-950">
      <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:py-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-slate-400">Customer re-entry</p>
          <h1 className="mt-6 max-w-5xl text-[clamp(3rem,7vw,6.7rem)] font-semibold leading-[0.88] tracking-[-0.075em] text-slate-950">
            Return to the workspace without starting over.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9">
            Use the same customer path to continue a Free Scan, open a protected result, review billing, check notifications, or contact support. Access control stays behind the dashboard.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard" className="inline-flex min-h-14 items-center justify-center rounded-full border border-slate-950 bg-slate-950 px-9 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
              Open dashboard
            </Link>
            <Link href="/free-check" className="inline-flex min-h-14 items-center justify-center rounded-full border border-slate-200 bg-white px-9 py-4 text-base font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
              Continue Free Scan
            </Link>
          </div>
        </div>

        <div className="rounded-[2.4rem] border border-slate-200 bg-white p-6 shadow-[0_30px_120px_rgba(15,23,42,0.1)] sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Access standard</p>
          <h2 className="mt-4 text-5xl font-semibold tracking-[-0.07em] text-slate-950 sm:text-6xl">One workspace. Clear next step.</h2>
          <p className="mt-5 text-base leading-8 text-slate-600">
            Cendorq should restore context calmly. If verification or session handling is required, the protected dashboard route should handle it without exposing account state.
          </p>
          <div className="mt-7 grid gap-3">
            {LOGIN_RULES.map((rule) => (
              <div key={rule} className="rounded-[1.35rem] border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-semibold leading-6 text-slate-700">
                {rule}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8" aria-label="Customer re-entry paths">
        <div className="grid gap-4 md:grid-cols-3">
          {REENTRY_PATHS.map((path, index) => (
            <Link key={path.label} href={path.href} className={index === 2 ? "rounded-[2rem] border border-slate-300 bg-slate-50 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)] md:-mt-5 md:mb-5" : "rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_14px_48px_rgba(15,23,42,0.055)] transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"}>
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">{path.label}</div>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.055em] text-slate-950">{path.value}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{path.detail}</p>
              <span className="mt-5 inline-flex text-sm font-semibold text-slate-500">{path.cta} →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="sr-only" aria-label="Customer re-entry guardrails">
        Customer re-entry. Sign in. Return to the workspace without starting over. Magic-link-first return path when backend supports it. Passkey-ready access is future only unless backend support is enabled. Protected results stay under dashboard routes. No account-existence leakage. No paid-plan pressure before evidence. {REENTRY_PATHS.map((item) => `${item.label} ${item.value} ${item.href} ${item.detail}`).join(" ")} {LOGIN_RULES.join(" ")} {CUSTOMER_AUTH_METHODS.map((item) => `${item.label} ${item.priority} ${item.customerPromise} ${item.revenueRole}`).join(" ")} {CUSTOMER_EMAIL_ORCHESTRATION_STEPS.map((item) => `${item.label} ${item.customerPromise} ${item.revenueRole}`).join(" ")} {CUSTOMER_EMAIL_DELIVERABILITY_STANDARD.join(" ")} {CUSTOMER_EMAIL_REVENUE_SEQUENCE.map((item) => `${item.label} ${item.trigger} ${item.targetPath} ${item.purpose}`).join(" ")}
      </section>
    </main>
  );
}
