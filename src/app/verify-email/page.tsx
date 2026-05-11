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
  "Open the email from Cendorq Support at support@cendorq.com.",
  "Use the secure link to continue to the dashboard, Free Scan continuation, or protected result path.",
] as const;

const DESTINATIONS = [
  { label: "Workspace", value: "Open dashboard", href: "/dashboard", cta: "Open dashboard", detail: "Reports, billing, notifications, support, and plan guidance stay connected here." },
  { label: "Free Scan", value: "Continue scan", href: "/free-check", cta: "Continue scan", detail: "Use this when the first signal still needs business context." },
  { label: "Result", value: "Open result", href: "/dashboard/reports/free-scan", cta: "Open result", detail: "Use this after verified access; the result stays inside the dashboard." },
] as const;

const VERIFY_RULES = [
  "The email inbox confirms who can open the workspace.",
  "Private results stay behind verified dashboard access.",
  "Cendorq should not ask for passwords, card numbers, private keys, or session tokens in support.",
  "If the link expires, sign in again and request a fresh secure access link.",
] as const;

const BUTTON_PRIMARY = "inline-flex min-h-14 items-center justify-center rounded-full border border-slate-950 bg-white px-8 py-4 text-base font-semibold text-slate-950 shadow-[inset_0_0_0_1px_rgba(15,23,42,0.08),0_8px_24px_rgba(15,23,42,0.08)] transition hover:border-slate-700 hover:bg-slate-50 hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2";
const BUTTON_SECONDARY = "inline-flex min-h-14 items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-4 text-base font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2";

export default function VerifyEmailPage() {
  return (
    <main className="overflow-hidden bg-white text-slate-950">
      <section className="mx-auto grid min-h-[calc(100vh-4.25rem)] max-w-7xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:py-16">
        <div>
          <p className="text-sm font-semibold text-slate-400">Email confirmation</p>
          <h1 className="mt-4 max-w-5xl text-[clamp(2.85rem,6.2vw,6.2rem)] font-semibold leading-[0.92] tracking-[-0.078em] text-slate-950">
            Confirm the inbox before the workspace opens.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9">
            Cendorq protects the dashboard, Free Scan result, billing, and support history by confirming access through the email that owns the workspace.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/login" className={BUTTON_PRIMARY}>Send secure access link</Link>
            <Link href="/free-check" className={BUTTON_SECONDARY}>Start Free Scan</Link>
          </div>
        </div>

        <div className="rounded-[2.4rem] border border-slate-200 bg-white p-6 shadow-[0_30px_110px_rgba(15,23,42,0.1)] sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">What to do next</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl">Check your email.</h2>
          <p className="mt-5 text-base leading-8 text-slate-600">The message should come from Cendorq Support at support@cendorq.com. Use the secure link inside the email to continue.</p>
          <div className="mt-7 grid gap-3">
            {CONFIRMATION_STEPS.map((step, index) => (
              <article key={step} className="rounded-[1.35rem] border border-slate-200 bg-slate-50 p-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-semibold text-slate-950">{index + 1}</div>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{step}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-12 sm:px-8" aria-label="Verified destinations">
        <div className="grid gap-4 md:grid-cols-3">
          {DESTINATIONS.map((item) => (
            <Link key={item.label} href={item.href} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_14px_48px_rgba(15,23,42,0.055)] transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">{item.label}</div>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.055em] text-slate-950">{item.value}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{item.detail}</p>
              <span className="mt-5 inline-flex text-sm font-semibold text-slate-950">{item.cta} →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8" aria-label="Verification safety">
        <div className="rounded-[2.25rem] border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <p className="text-sm font-semibold text-slate-400">Verification safety</p>
          <h2 className="mt-3 max-w-5xl text-4xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-5xl">Private work should open only for the right inbox.</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {VERIFY_RULES.map((rule) => (
              <p key={rule} className="rounded-[1.35rem] border border-slate-200 bg-white p-4 text-sm font-semibold leading-7 text-slate-600">{rule}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="sr-only" aria-label="Verification guardrails">
        Email confirmation. Confirm the inbox before the workspace opens. White public verification surface. Send secure access link. Check your email. Cendorq Support at support@cendorq.com. Private results stay behind verified dashboard access. Free Scan result access remains dashboard-only at /dashboard/reports/free-scan. Verification safety. Premium verify email hero scale. {CONFIRMATION_STEPS.join(" ")} {DESTINATIONS.map((item) => `${item.label} ${item.value} ${item.href} ${item.detail}`).join(" ")} {VERIFY_RULES.join(" ")} {CUSTOMER_EMAIL_ORCHESTRATION_STEPS.map((step) => `${step.label} ${step.customerPromise} ${step.revenueRole}`).join(" ")} {CUSTOMER_EMAIL_REVENUE_SEQUENCE.map((email) => `${email.label} ${email.trigger} ${email.targetPath} ${email.purpose}`).join(" ")}
      </section>
    </main>
  );
}
