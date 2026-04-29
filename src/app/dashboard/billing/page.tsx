import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Billing and plans | Cendorq",
  description: "Your private Cendorq billing and plan center for entitlements, invoices, upgrades, and plan guidance.",
  path: "/dashboard/billing",
  noIndex: true,
});

const BILLING_FIRST_USE_SNAPSHOT = [
  { label: "Plan state", value: "Entitlement clarity", detail: "Customers should know what is active, what is pending, and what unlocks only after checkout." },
  { label: "Invoice posture", value: "Recoverable records", detail: "Invoice access and payment history should be explained without exposing raw billing IDs or card data." },
  { label: "Action posture", value: "Safe billing path", detail: "Billing actions should route through approved checkout or billing center paths, not support-message card collection." },
  { label: "Upgrade posture", value: "Proof-led next step", detail: "Plan recommendations should stay tied to stage, evidence, and fit instead of pressure." },
] as const;

const BILLING_RECOVERY_ACTIONS = [
  { title: "Compare plans", copy: "Use the plan path when the next depth is unclear.", href: "/plans" },
  { title: "Open notifications", copy: "Review billing alerts and account actions in one safe place.", href: "/dashboard/notifications" },
  { title: "Request support", copy: "Ask for billing help without sending card numbers or private payment data.", href: "/dashboard/support" },
] as const;

const BILLING_SAFETY_RULES = [
  "Never ask customers to submit card numbers, bank details, passwords, private keys, or session tokens through support copy.",
  "Show billing and entitlement state as a safe projection, not raw provider payloads or internal IDs.",
  "Explain failed-payment or invoice actions with a calm recovery path and no fake urgency.",
  "Plan upgrade guidance must separate current access, pending actions, and future entitlements.",
] as const;

const PLAN_ROWS = [
  {
    plan: "Free Scan",
    state: "Current entry point",
    value: "A first read on visible business hesitation, clarity, trust, choice, and action signals.",
    next: "Upgrade to Deep Review when the scan shows limits or unanswered causes.",
  },
  {
    plan: "Deep Review",
    state: "Next diagnosis layer",
    value: "A deeper evidence-backed diagnosis with section explanations, visuals, confidence labels, and priorities.",
    next: "Move to Build Fix when the causes are clear and implementation is needed.",
  },
  {
    plan: "Build Fix",
    state: "Implementation layer",
    value: "Fix verified issues that make the business harder to understand, trust, choose, or act on.",
    next: "Move to Ongoing Control when the business needs monthly monitoring and momentum.",
  },
  {
    plan: "Ongoing Control",
    state: "Monthly control layer",
    value: "Track progress, detect regression, surface new opportunities, and keep the business improving.",
    next: "Best for retention, compounding improvement, and long-term control.",
  },
] as const;

export default function BillingPage() {
  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-8 text-white sm:px-6 md:py-12 xl:py-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_0%,rgba(103,232,249,0.12),transparent_34%),radial-gradient(circle_at_84%_12%,rgba(14,165,233,0.1),transparent_30%)]" />
      <section className="system-panel-authority relative z-10 rounded-[2.5rem] p-6 sm:p-10">
        <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">Billing and plan center</div>
        <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Plan state, entitlements, invoices, and upgrades should feel effortless.
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
          This customer center is built for transparent billing, clear plan value, safe entitlements, failed-payment recovery, and truthful next-plan guidance.
        </p>
      </section>

      <section className="relative z-10 mt-8 grid gap-4 lg:grid-cols-4" aria-label="Billing center first use snapshot">
        {BILLING_FIRST_USE_SNAPSHOT.map((item) => (
          <article key={item.label} className="system-surface rounded-[1.5rem] p-5">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">{item.label}</div>
            <h2 className="mt-3 text-xl font-semibold tracking-tight text-white">{item.value}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="relative z-10 mt-8 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]" aria-label="Billing center first use guidance">
        <article className="system-panel-authority rounded-[2rem] p-6 sm:p-8">
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">First billing visit</div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">Understand access before taking action.</h2>
          <p className="mt-4 text-base leading-8 text-slate-300">
            A first billing visit should make the customer’s current access, invoice availability, payment recovery path, and plan options clear without exposing provider internals or pushing an upgrade before the evidence is ready.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {BILLING_RECOVERY_ACTIONS.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-[1.2rem] border border-white/10 bg-white/[0.035] p-4 text-sm leading-7 text-slate-200 transition hover:border-cyan-300/30 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
                <span className="block font-semibold text-white">{item.title}</span>
                <span className="mt-2 block">{item.copy}</span>
              </Link>
            ))}
          </div>
        </article>
        <article className="system-surface rounded-[2rem] p-6 sm:p-8">
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">Billing safety rules</div>
          <div className="mt-5 grid gap-3">
            {BILLING_SAFETY_RULES.map((rule) => (
              <div key={rule} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-slate-200">
                {rule}
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="relative z-10 mt-8 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="system-surface rounded-[2rem] p-6">
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">Current state</div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">Free Scan account</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Billing unlocks after a paid plan is selected. Your dashboard will show subscription status, invoices, entitlements, and plan actions when billing is connected.
          </p>
          <div className="mt-6 grid gap-3 text-sm text-slate-300">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">Entitlement status: Free Scan</div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">Invoice access: Available after checkout</div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">Billing support: support@cendorq.com</div>
          </div>
        </aside>

        <div className="grid gap-4">
          {PLAN_ROWS.map((row) => (
            <article key={row.plan} className="system-surface rounded-[1.75rem] p-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">{row.state}</div>
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">{row.plan}</h2>
                </div>
                <Link href="/plans" className="rounded-2xl border border-cyan-300/25 px-4 py-2 text-center text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
                  View plan
                </Link>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-300">{row.value}</p>
              <p className="mt-4 rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-4 text-sm leading-7 text-slate-200">{row.next}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="relative z-10 mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/dashboard" className="rounded-2xl border border-white/10 px-5 py-3 text-center text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
          Back to dashboard
        </Link>
        <Link href="/plans" className="rounded-2xl bg-cyan-300 px-5 py-3 text-center text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
          Compare plan options
        </Link>
      </div>
    </main>
  );
}
