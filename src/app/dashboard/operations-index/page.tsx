import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Operations Index | Cendorq",
  description: "Protected Cendorq Operations Index linking reports, delivery, support, business truth, evidence, lineage, visuals, command queue, entitlements, integrations, analytics, and recovery.",
  path: "/dashboard/operations-index",
  noIndex: true,
});

const OPERATING_SURFACES = [
  ["Report vault", "/dashboard/reports", "Open Scan, Review, Repair, and Control artifacts from one protected vault."],
  ["Delivery history", "/dashboard/delivery-history", "Track dashboard publish, PDF readiness, email delivery, downloads, resend, and recovery."],
  ["Release gate", "/dashboard/release-gate", "Review evidence, language, visuals, route, artifact, and delivery approval state."],
  ["Repair workroom", "/dashboard/repair-workroom", "Track Build Fix scope, before evidence, work state, QA, and completion artifact."],
  ["Control center", "/dashboard/control-center", "Watch monthly signal health, drift, protected strengths, risks, and priorities."],
  ["Support center", "/dashboard/support", "Route report, delivery, billing, correction, scope, and Control questions."],
  ["Business Truth", "/dashboard/business-truth", "Separate verified facts, customer-provided context, proof, and corrections."],
  ["Evidence catalog", "/dashboard/evidence-catalog", "Connect source context, confidence, visibility, findings, visuals, and release use."],
  ["Report lineage", "/dashboard/report-lineage", "Trace source to evidence to finding to score to visual to artifact."],
  ["Visual registry", "/dashboard/visual-registry", "Keep scorecards, matrices, trends, benchmarks, timelines, and tables decision-useful."],
  ["Command queue", "/dashboard/command-queue", "Organize scans, reviews, repairs, control, support, and recovery workflows."],
  ["Customer profile", "/dashboard/customer-command-profile", "Connect account, business, plan, reports, delivery, support, repair, and Control."],
  ["Entitlement center", "/dashboard/entitlement-center", "Protect account, business, plan, artifact, release, and support access."],
  ["Integration registry", "/dashboard/integration-registry", "Register payments, email, PDF, vault, support, analytics, evidence, and notifications."],
  ["Analytics center", "/dashboard/analytics-center", "Track lifecycle, delivery, conversion, quality, support, and workflow health."],
  ["Audit recovery", "/dashboard/audit-recovery", "Turn failed or held workflow states into safe customer-visible recovery."],
] as const;

const INDEX_RULES = [
  "Every operating surface should point back to a safe customer command or recovery path.",
  "No protected surface should imply delivery, approval, repair, or access before its state is ready.",
  "Reports, delivery, support, evidence, lineage, visuals, and analytics should stay connected rather than becoming separate silos.",
  "The customer dashboard should remain clear even as the operating system grows deeper.",
] as const;

const SYSTEM_GROUPS = [
  ["Customer value", "Reports, delivery, support, and next commands."],
  ["Truth and proof", "Business facts, evidence, lineage, visuals, and release approval."],
  ["Operations", "Command queue, entitlements, integrations, analytics, and recovery."],
  ["Plan depth", "Free Scan, Deep Review, Build Fix, and Ongoing Control stay separated."],
] as const;

export default function OperationsIndexPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(125,211,252,.28),transparent_30%),radial-gradient(circle_at_86%_0%,rgba(196,181,253,.2),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_42%,#ffffff_100%)] px-4 py-14 text-slate-950 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(15,23,42,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />
      <section className="mx-auto grid max-w-[94rem] gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
        <div className="rounded-[2.25rem] border border-white/80 bg-white/84 p-6 shadow-[0_24px_80px_rgba(15,23,42,.065)] backdrop-blur sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-700">Operations Index</p>
          <h1 className="mt-4 text-[clamp(3rem,7vw,6.2rem)] font-semibold leading-[.86] tracking-[-.08em] text-slate-950">One protected map for the entire customer operating system.</h1>
          <p className="mt-6 text-base font-semibold leading-8 text-slate-600">The Operations Index connects every protected surface added to the dashboard so reports, delivery, support, proof, workflows, analytics, and recovery remain navigable and governed.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard" className="rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white">Back to dashboard</Link>
            <Link href="/dashboard/reports" className="rounded-full border border-cyan-200 bg-white px-5 py-3 text-center text-sm font-bold text-cyan-700">Open report vault</Link>
          </div>
        </div>
        <section className="rounded-[2.25rem] border border-slate-950 bg-slate-950 p-6 text-white shadow-[0_28px_90px_rgba(15,23,42,.25)] sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">System groups</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-.065em] text-white sm:text-5xl">Value, proof, operations, and plan depth stay connected.</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{SYSTEM_GROUPS.map(([label, copy], index) => <article key={label} className="rounded-[1.35rem] border border-white/10 bg-white/[.06] p-4"><span className="grid h-8 w-8 place-items-center rounded-xl bg-cyan-300 text-xs font-black text-slate-950">{index + 1}</span><h3 className="mt-3 text-xl font-semibold tracking-[-.04em] text-white">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-300">{copy}</p></article>)}</div>
        </section>
      </section>
      <section className="mx-auto mt-6 max-w-[94rem] rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Operating surfaces</p><div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">{OPERATING_SURFACES.map(([label, href, copy]) => <Link key={href} href={href} className="rounded-[1.25rem] border border-cyan-100 bg-cyan-50/45 p-4 transition hover:-translate-y-0.5 hover:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2"><h3 className="text-xl font-semibold tracking-[-.04em] text-slate-950">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{copy}</p></Link>)}</div></section>
      <section className="mx-auto mt-6 max-w-[94rem] rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Index rules</p><div className="mt-5 grid gap-3 md:grid-cols-4">{INDEX_RULES.map((rule) => <p key={rule} className="rounded-[1.15rem] border border-cyan-100 bg-cyan-50/45 p-4 text-xs font-semibold leading-6 text-slate-700">{rule}</p>)}</div></section>
      <section className="sr-only" aria-label="Operations index guardrails">Operations Index. Report vault. Delivery history. Release gate. Repair workroom. Control center. Support center. Business Truth. Evidence catalog. Report lineage. Visual registry. Command queue. Customer Command Profile. Entitlement center. Integration registry. Analytics center. Audit recovery. Protected customer operating system.</section>
    </main>
  );
}
