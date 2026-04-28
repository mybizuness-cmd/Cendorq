import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Billing and plans | Cendorq",
  description: "Your private Cendorq billing and plan center for entitlements, invoices, upgrades, and plan guidance.",
  path: "/dashboard/billing",
  noIndex: true,
});

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
                <Link href="/plans" className="rounded-2xl border border-cyan-300/25 px-4 py-2 text-center text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/10">
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
        <Link href="/dashboard" className="rounded-2xl border border-white/10 px-5 py-3 text-center text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10">
          Back to dashboard
        </Link>
        <Link href="/plans" className="rounded-2xl bg-cyan-300 px-5 py-3 text-center text-sm font-bold text-slate-950 transition hover:bg-cyan-200">
          Compare plan options
        </Link>
      </div>
    </main>
  );
}
