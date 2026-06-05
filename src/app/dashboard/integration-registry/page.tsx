import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Integration Registry | Cendorq",
  description: "Protected Cendorq Integration Registry for payments, email, PDF, report vault, support, analytics, evidence capture, and workflow recovery.",
  path: "/dashboard/integration-registry",
  noIndex: true,
});

const INTEGRATION_AREAS = [
  ["Payments", "Plan checkout, payment success, entitlement activation, and billing recovery."],
  ["Email", "Report summaries, approved PDF attachments, resend state, and delivery recovery."],
  ["PDF rendering", "Approved report package to customer-safe saved artifact."],
  ["Report vault", "Dashboard access, artifact state, history, and customer-safe availability."],
  ["Support", "Report questions, delivery issues, billing blockers, and correction routing."],
  ["Analytics", "Product events, report lifecycle, delivery health, and conversion signals."],
  ["Evidence capture", "Source context, confidence, capture freshness, and linked findings."],
  ["Notifications", "Customer-safe alerts, workflow updates, support status, and monthly reminders."],
] as const;

const INTEGRATION_STATES = [
  ["Planned", "Contract exists but live external calls are not active."],
  ["Connected", "Runtime is configured and can send or receive events."],
  ["Held", "Access, approval, or data readiness is not complete."],
  ["Recovery", "Retry, support routing, or customer-safe fallback is needed."],
] as const;

const REGISTRY_RULES = [
  "Do not connect external systems before access, release, and delivery states are clear.",
  "Do not treat payment success as report approval or PDF readiness.",
  "Do not send customer artifacts from unapproved or mismatched report packages.",
  "Do not hide integration failures; show a customer-safe status and route recovery internally.",
] as const;

export default function IntegrationRegistryPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(125,211,252,.28),transparent_30%),radial-gradient(circle_at_86%_0%,rgba(196,181,253,.2),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_42%,#ffffff_100%)] px-4 py-14 text-slate-950 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(15,23,42,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />
      <section className="mx-auto grid max-w-[94rem] gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
        <div className="rounded-[2.25rem] border border-white/80 bg-white/84 p-6 shadow-[0_24px_80px_rgba(15,23,42,.065)] backdrop-blur sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-700">Integration Registry</p>
          <h1 className="mt-4 text-[clamp(3rem,7vw,6.2rem)] font-semibold leading-[.86] tracking-[-.08em] text-slate-950">Integrations should be registered before they run live workflows.</h1>
          <p className="mt-6 text-base font-semibold leading-8 text-slate-600">The Integration Registry keeps payments, email, PDF rendering, report vault, support, analytics, evidence capture, and notifications tied to plan-aware workflow state.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/command-queue" className="rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white">Open Command Queue</Link>
            <Link href="/dashboard/delivery-history" className="rounded-full border border-cyan-200 bg-white px-5 py-3 text-center text-sm font-bold text-cyan-700">Open delivery history</Link>
          </div>
        </div>
        <section className="rounded-[2.25rem] border border-slate-950 bg-slate-950 p-6 text-white shadow-[0_28px_90px_rgba(15,23,42,.25)] sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">Integration states</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-.065em] text-white sm:text-5xl">Planned, connected, held, or recovery.</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{INTEGRATION_STATES.map(([label, copy], index) => <article key={label} className="rounded-[1.35rem] border border-white/10 bg-white/[.06] p-4"><span className="grid h-8 w-8 place-items-center rounded-xl bg-cyan-300 text-xs font-black text-slate-950">{index + 1}</span><h3 className="mt-3 text-xl font-semibold tracking-[-.04em] text-white">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-300">{copy}</p></article>)}</div>
        </section>
      </section>
      <section className="mx-auto mt-6 grid max-w-[94rem] gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Integration areas</p><div className="mt-5 grid gap-3 md:grid-cols-2">{INTEGRATION_AREAS.map(([label, copy]) => <article key={label} className="rounded-[1.25rem] border border-cyan-100 bg-cyan-50/45 p-4"><h3 className="text-xl font-semibold tracking-[-.04em] text-slate-950">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{copy}</p></article>)}</div></div>
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Registry rules</p><div className="mt-5 grid gap-3">{REGISTRY_RULES.map((rule) => <p key={rule} className="rounded-[1.15rem] border border-cyan-100 bg-cyan-50/45 p-4 text-xs font-semibold leading-6 text-slate-700">{rule}</p>)}</div></div>
      </section>
      <section className="sr-only" aria-label="Integration registry guardrails">Integration Registry. Payments. Email. PDF rendering. Report vault. Support. Analytics. Evidence capture. Notifications. Planned. Connected. Held. Recovery. workflow integration registry.</section>
    </main>
  );
}
