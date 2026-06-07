import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Subscription Command Center | Cendorq",
  description: "Protected Cendorq Subscription Command Center for renewals, cancellations, pauses, upgrades, downgrades, proration context, entitlement transitions, Control continuity, and lifecycle recovery.",
  path: "/dashboard/subscription-command",
  noIndex: true,
});

const SUBSCRIPTION_AREAS = [
  ["Renewals", "Upcoming, completed, failed, grace-period, recovered, or needs-support renewal state."],
  ["Cancellations", "Requested, scheduled, completed, reversed, or needs-review cancellation lifecycle."],
  ["Pauses", "Approved pause windows, paused access, restart timing, support context, and customer-safe wording."],
  ["Plan changes", "Upgrade, downgrade, add-on, removed feature, prorated change, and entitlement transition context."],
  ["Control continuity", "Ongoing Control snapshots, monthly drift watching, report access, and support status during lifecycle changes."],
  ["Lifecycle recovery", "Mismatched billing, plan, access, renewal, cancellation, or support states route to repair."],
] as const;

const SUBSCRIPTION_CHECKS = [
  ["Lifecycle truth", "Subscription state must match billing, entitlement, dashboard, support, and delivery records."],
  ["Timing clarity", "Customers should see renewal, cancellation, pause, downgrade, and access dates clearly."],
  ["Access transition", "Plan changes should update dashboard, reports, PDFs, email, support, and Control state safely."],
  ["No surprise loss", "Cancelled, paused, failed, or downgraded states need clear notice and recovery options."],
  ["Plan boundary", "Subscription changes should not promise work beyond the active or approved plan."],
  ["Audit trail", "Every lifecycle change should be traceable across billing, entitlement, support, and recovery."],
] as const;

const SUBSCRIPTION_RULES = [
  "Do not invent renewal dates, cancellation terms, pause permissions, proration amounts, credits, or access promises.",
  "Do not let subscription state contradict Billing Command, Pricing Command, Entitlement Center, or Support Center.",
  "Do not remove ongoing report access, Control history, or customer artifacts without a supported lifecycle state.",
  "Do not publish subscription messaging unless billing, entitlement, delivery, support, and audit recovery can support it.",
] as const;

export default function SubscriptionCommandPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(125,211,252,.28),transparent_30%),radial-gradient(circle_at_86%_0%,rgba(196,181,253,.2),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_42%,#ffffff_100%)] px-4 py-14 text-slate-950 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(15,23,42,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />
      <section className="mx-auto grid max-w-[94rem] gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
        <div className="rounded-[2.25rem] border border-white/80 bg-white/84 p-6 shadow-[0_24px_80px_rgba(15,23,42,.065)] backdrop-blur sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-700">Subscription Command Center</p>
          <h1 className="mt-4 text-[clamp(3rem,7vw,6.2rem)] font-semibold leading-[.86] tracking-[-.08em] text-slate-950">Plan lifecycle should stay clear before, during, and after every change.</h1>
          <p className="mt-6 text-base font-semibold leading-8 text-slate-600">The Subscription Command Center governs renewals, cancellations, pauses, upgrades, downgrades, proration context, entitlement transitions, Control continuity, lifecycle messaging, and recovery routing.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/billing-command" className="rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white">Open Billing Command</Link>
            <Link href="/dashboard/entitlement-center" className="rounded-full border border-cyan-200 bg-white px-5 py-3 text-center text-sm font-bold text-cyan-700">Open Entitlement Center</Link>
          </div>
        </div>
        <section className="rounded-[2.25rem] border border-slate-950 bg-slate-950 p-6 text-white shadow-[0_28px_90px_rgba(15,23,42,.25)] sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">Subscription areas</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-.065em] text-white sm:text-5xl">Renewals, cancellations, pauses, plan changes, Control continuity, and recovery.</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{SUBSCRIPTION_AREAS.map(([label, copy], index) => <article key={label} className="rounded-[1.35rem] border border-white/10 bg-white/[.06] p-4"><span className="grid h-8 w-8 place-items-center rounded-xl bg-cyan-300 text-xs font-black text-slate-950">{index + 1}</span><h3 className="mt-3 text-xl font-semibold tracking-[-.04em] text-white">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-300">{copy}</p></article>)}</div>
        </section>
      </section>
      <section className="mx-auto mt-6 grid max-w-[94rem] gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Subscription checks</p><div className="mt-5 grid gap-3 md:grid-cols-2">{SUBSCRIPTION_CHECKS.map(([label, copy]) => <article key={label} className="rounded-[1.25rem] border border-cyan-100 bg-cyan-50/45 p-4"><h3 className="text-xl font-semibold tracking-[-.04em] text-slate-950">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{copy}</p></article>)}</div></div>
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Subscription rules</p><div className="mt-5 grid gap-3">{SUBSCRIPTION_RULES.map((rule) => <p key={rule} className="rounded-[1.15rem] border border-cyan-100 bg-cyan-50/45 p-4 text-xs font-semibold leading-6 text-slate-700">{rule}</p>)}</div></div>
      </section>
      <section className="sr-only" aria-label="Subscription command guardrails">Subscription Command Center. Renewals. Cancellations. Pauses. Plan changes. Control continuity. Lifecycle recovery. Lifecycle truth. Timing clarity. Access transition. No surprise loss. Plan boundary. Audit trail. subscription lifecycle integrity.</section>
    </main>
  );
}
