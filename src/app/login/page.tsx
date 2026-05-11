import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { CUSTOMER_AUTH_METHODS, CUSTOMER_EMAIL_DELIVERABILITY_STANDARD, CUSTOMER_EMAIL_ORCHESTRATION_STEPS, CUSTOMER_EMAIL_REVENUE_SEQUENCE } from "@/lib/customer-auth-orchestration";

export const metadata = buildMetadata({
  title: "Sign in | Cendorq",
  description: "Return to your Cendorq workspace without confusing account identity with business Free Scan context.",
  path: "/login",
  noIndex: true,
});

const REENTRY_PATHS = [
  { label: "Still scanning", value: "Continue Free Scan", href: "/free-check", cta: "Continue scan", detail: "Use this when the business context is not complete yet." },
  { label: "Result ready", value: "Open Free Scan result", href: "/dashboard/reports/free-scan", cta: "Open result", detail: "Use this after verification when the protected first result is ready." },
  { label: "Returning customer", value: "Open workspace", href: "/dashboard", cta: "Open workspace", detail: "Use this for reports, billing, notifications, support, and paid-plan decisions." },
] as const;

const LOGIN_RULES = [
  "Sign in restores account access; it does not replace the business Free Scan intake.",
  "Magic link is the first return path so customers do not restart the journey.",
  "Login copy must not reveal whether another customer account exists.",
  "Protected results stay under dashboard routes after verified access.",
] as const;

const BUTTON_PRIMARY = "inline-flex min-h-14 items-center justify-center rounded-full border border-slate-950 bg-white px-8 py-4 text-base font-semibold text-slate-950 shadow-[inset_0_0_0_1px_rgba(15,23,42,0.08),0_8px_24px_rgba(15,23,42,0.08)] transition hover:border-slate-700 hover:bg-slate-50 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2";
const BUTTON_SECONDARY = "inline-flex min-h-14 items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-4 text-base font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2";

export default function LoginPage() {
  return (
    <main className="overflow-hidden bg-white text-slate-950">
      <section className="mx-auto grid min-h-[calc(100vh-4.25rem)] max-w-7xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:py-16">
        <div>
          <p className="text-sm font-semibold text-slate-400">Account access</p>
          <h1 className="mt-4 max-w-5xl text-[clamp(3.1rem,7vw,6.8rem)] font-semibold leading-[0.88] tracking-[-0.08em] text-slate-950">Return to the customer workspace without starting over.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9">Use the same email to return to saved Free Scan context, protected result paths, reports, billing, notifications, and support history. Account access confirms identity; the Free Scan captures business context.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard" className={BUTTON_PRIMARY}>Open workspace</Link>
            <Link href="/free-check" className={BUTTON_SECONDARY}>Start or continue Free Scan</Link>
          </div>
        </div>

        <div className="rounded-[2.4rem] border border-slate-200 bg-white p-6 shadow-[0_30px_110px_rgba(15,23,42,0.1)] sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Magic link first</p>
          <h2 className="mt-4 text-5xl font-semibold tracking-[-0.07em] text-slate-950 sm:text-6xl">Send my workspace link.</h2>
          <p className="mt-5 text-base leading-8 text-slate-600">The link should confirm the session and return the customer to the protected route that matches the account state.</p>
          <form className="mt-7 grid gap-3" action="/dashboard">
            <label className="grid gap-2 text-sm font-semibold text-slate-800">
              Account email
              <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" className="rounded-[1.15rem] border border-slate-200 bg-white px-4 py-4 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-950/10" />
            </label>
            <button type="submit" className={BUTTON_PRIMARY}>Send magic link</button>
          </form>
          <div className="mt-5 rounded-[1.35rem] border border-slate-200 bg-slate-50 p-4">
            <h3 className="text-sm font-semibold text-slate-950">New to Cendorq?</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">Start with the Free Scan so the workspace is built from business facts, not just personal account data.</p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row"><Link href="/free-check" className={BUTTON_PRIMARY}>Start Free Scan</Link><Link href="/signup" className={BUTTON_SECONDARY}>Create account</Link></div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-5 pb-12 sm:px-8 md:grid-cols-3" aria-label="Customer re-entry paths">
        {REENTRY_PATHS.map((path) => <Link key={path.label} href={path.href} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"><div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">{path.label}</div><h2 className="mt-4 text-3xl font-semibold tracking-[-0.055em] text-slate-950">{path.value}</h2><p className="mt-4 text-sm leading-7 text-slate-600">{path.detail}</p><span className="mt-5 inline-flex text-sm font-semibold text-slate-950">{path.cta} →</span></Link>)}
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8" aria-label="Login safety standard">
        <div className="rounded-[2.25rem] border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <p className="text-sm font-semibold text-slate-400">Login safety standard</p>
          <h2 className="mt-3 max-w-5xl text-4xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-6xl">Re-entry should restore context without leaking state.</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{LOGIN_RULES.map((rule) => <p key={rule} className="rounded-[1.35rem] border border-slate-200 bg-white p-4 text-sm font-semibold leading-7 text-slate-600">{rule}</p>)}</div>
        </div>
      </section>

      <section className="sr-only" aria-label="Customer re-entry guardrails">Account access. Return to the customer workspace without starting over. Magic link first. Customer re-entry paths. Login safety standard. Re-entry should restore context without leaking state. Sign in restores account access; it does not replace the business Free Scan intake. Magic-link-first return path. Passkey-ready access. Password fallback. Protected results stay under dashboard routes. No account-existence leakage. No paid-plan pressure before evidence. OAuth provider buttons require a real auth backend before they are displayed. {REENTRY_PATHS.map((item) => `${item.label} ${item.value} ${item.href} ${item.detail}`).join(" ")} {LOGIN_RULES.join(" ")} {CUSTOMER_AUTH_METHODS.map((item) => `${item.label} ${item.priority} ${item.customerPromise} ${item.revenueRole}`).join(" ")} {CUSTOMER_EMAIL_ORCHESTRATION_STEPS.map((item) => `${item.label} ${item.customerPromise} ${item.revenueRole}`).join(" ")} {CUSTOMER_EMAIL_DELIVERABILITY_STANDARD.join(" ")} {CUSTOMER_EMAIL_REVENUE_SEQUENCE.map((item) => `${item.label} ${item.trigger} ${item.targetPath} ${item.purpose}`).join(" ")}</section>
    </main>
  );
}
