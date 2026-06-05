import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Visual Registry | Cendorq",
  description: "Protected Cendorq Visual Registry for approved scorecards, matrices, trends, benchmarks, timelines, tables, and report-safe chart use.",
  path: "/dashboard/visual-registry",
  noIndex: true,
});

const VISUAL_MODULES = [
  ["Scorecard", "Shows current state, direction, confidence, and one next command."],
  ["Signal matrix", "Compares public signals across clarity, proof, trust, action, and source health."],
  ["Severity stack", "Separates stable, needs-structure, and priority-repair groups."],
  ["Benchmark bars", "Shows supported comparison pressure without overclaiming market position."],
  ["Trend line", "Shows drift or improvement only when periods and data meaning are clear."],
  ["Timeline", "Shows delivery, repair, release, or monthly Control sequence."],
  ["Evidence table", "Shows source context, confidence, visibility, and linked finding."],
  ["Repair queue", "Ranks what to fix first and why, tied to report evidence."],
] as const;

const VISUAL_RULES = [
  "A visual must answer a customer decision question.",
  "A chart must not imply stronger proof than the evidence supports.",
  "Dashboard, PDF, and email visuals should use the same approved report package.",
  "If a graph is too small, decorative, or unclear, replace it with a wider decision module.",
] as const;

const DEVICE_CHECKS = [
  ["Mobile", "Summary first, one score, one issue, one next command."],
  ["Tablet", "Readable cards and matrix sections without cramped charts."],
  ["Desktop", "Wider graphs, clear labels, visible numbers, and report context."],
  ["PDF", "Executive-ready sections, not raw dashboard screenshots."],
] as const;

export default function VisualRegistryPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(125,211,252,.28),transparent_30%),radial-gradient(circle_at_86%_0%,rgba(196,181,253,.2),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_42%,#ffffff_100%)] px-4 py-14 text-slate-950 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(15,23,42,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />
      <section className="mx-auto grid max-w-[94rem] gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
        <div className="rounded-[2.25rem] border border-white/80 bg-white/84 p-6 shadow-[0_24px_80px_rgba(15,23,42,.065)] backdrop-blur sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-700">Visual Registry</p>
          <h1 className="mt-4 text-[clamp(3rem,7vw,6.2rem)] font-semibold leading-[.86] tracking-[-.08em] text-slate-950">Graphs should explain decisions, not decorate reports.</h1>
          <p className="mt-6 text-base font-semibold leading-8 text-slate-600">The Visual Registry keeps Cendorq charts, scorecards, matrices, benchmarks, timelines, and tables wide enough, labeled enough, and evidence-linked enough to be useful.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/report-lineage" className="rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white">Open report lineage</Link>
            <Link href="/dashboard/reports" className="rounded-full border border-cyan-200 bg-white px-5 py-3 text-center text-sm font-bold text-cyan-700">Open report vault</Link>
          </div>
        </div>
        <section className="rounded-[2.25rem] border border-slate-950 bg-slate-950 p-6 text-white shadow-[0_28px_90px_rgba(15,23,42,.25)] sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">Approved modules</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-.065em] text-white sm:text-5xl">Scorecards, matrices, trends, benchmarks, timelines, and tables.</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{VISUAL_MODULES.map(([label, copy], index) => <article key={label} className="rounded-[1.35rem] border border-white/10 bg-white/[.06] p-4"><span className="grid h-8 w-8 place-items-center rounded-xl bg-cyan-300 text-xs font-black text-slate-950">{index + 1}</span><h3 className="mt-3 text-xl font-semibold tracking-[-.04em] text-white">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-300">{copy}</p></article>)}</div>
        </section>
      </section>
      <section className="mx-auto mt-6 grid max-w-[94rem] gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Device checks</p><div className="mt-5 grid gap-3 md:grid-cols-2">{DEVICE_CHECKS.map(([label, copy]) => <article key={label} className="rounded-[1.25rem] border border-cyan-100 bg-cyan-50/45 p-4"><h3 className="text-xl font-semibold tracking-[-.04em] text-slate-950">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{copy}</p></article>)}</div></div>
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Visual rules</p><div className="mt-5 grid gap-3">{VISUAL_RULES.map((rule) => <p key={rule} className="rounded-[1.15rem] border border-cyan-100 bg-cyan-50/45 p-4 text-xs font-semibold leading-6 text-slate-700">{rule}</p>)}</div></div>
      </section>
      <section className="sr-only" aria-label="Visual registry guardrails">Visual Registry. Scorecard. Signal matrix. Severity stack. Benchmark bars. Trend line. Timeline. Evidence table. Repair queue. Wider graphs. Visible numbers. Clear labels. Decision module. Dashboard PDF email visuals.</section>
    </main>
  );
}
