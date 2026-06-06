import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Benchmark Command Center | Cendorq",
  description: "Protected Cendorq Benchmark Command Center for category context, public proof, competitor comparison, AI visibility pressure, score comparisons, uncertainty, and benchmark-safe visuals.",
  path: "/dashboard/benchmark-command",
  noIndex: true,
});

const BENCHMARK_AREAS = [
  ["Category context", "What customers expect in this market, service type, location, and buying path."],
  ["Public proof", "Visible reviews, profiles, service clarity, trust markers, and third-party signals."],
  ["AI visibility pressure", "Answer readiness, citation likelihood, entity clarity, proof gaps, and missing context."],
  ["Conversion friction", "Where action paths, message clarity, proof, or confidence fall behind category expectations."],
  ["Visual comparison", "Benchmark bars, matrices, scorecards, and trend views that explain a decision."],
  ["Uncertainty", "What is unknown, stale, unsupported, location-specific, or not safe to claim yet."],
] as const;

const BENCHMARK_CHECKS = [
  ["Source basis", "Every comparison must state what source type supports it."],
  ["Similarity", "Compare against relevant category patterns instead of random large-company examples."],
  ["Confidence", "Separate strong evidence from directional pressure or weak signals."],
  ["Customer value", "Show what the benchmark means for the customer's next decision."],
  ["Visual truth", "Charts must not imply exact rankings when the data only supports directional comparison."],
  ["Plan boundary", "Free Scan hints, Deep Review proves, Build Fix acts, and Control watches drift."],
] as const;

const BENCHMARK_RULES = [
  "Do not invent rankings, traffic, market share, competitor performance, or AI answer position.",
  "Do not copy another platform's dashboard; adapt useful patterns into Cendorq-specific proof and decisions.",
  "Do not compare a customer to irrelevant enterprise products when local/category context matters more.",
  "Do not publish benchmark claims unless Source Command, Evidence Catalog, Report Lineage, and Quality Gate can support them.",
] as const;

export default function BenchmarkCommandPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(125,211,252,.28),transparent_30%),radial-gradient(circle_at_86%_0%,rgba(196,181,253,.2),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_42%,#ffffff_100%)] px-4 py-14 text-slate-950 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(15,23,42,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />
      <section className="mx-auto grid max-w-[94rem] gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
        <div className="rounded-[2.25rem] border border-white/80 bg-white/84 p-6 shadow-[0_24px_80px_rgba(15,23,42,.065)] backdrop-blur sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-700">Benchmark Command Center</p>
          <h1 className="mt-4 text-[clamp(3rem,7vw,6.2rem)] font-semibold leading-[.86] tracking-[-.08em] text-slate-950">Benchmarks should create direction, not fake certainty.</h1>
          <p className="mt-6 text-base font-semibold leading-8 text-slate-600">The Benchmark Command Center governs category context, public proof, AI visibility pressure, comparison visuals, score pressure, uncertainty, and plan-aware next decisions without inventing rankings.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/source-command" className="rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white">Open Source Command</Link>
            <Link href="/dashboard/visual-registry" className="rounded-full border border-cyan-200 bg-white px-5 py-3 text-center text-sm font-bold text-cyan-700">Open Visual Registry</Link>
          </div>
        </div>
        <section className="rounded-[2.25rem] border border-slate-950 bg-slate-950 p-6 text-white shadow-[0_28px_90px_rgba(15,23,42,.25)] sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">Benchmark areas</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-.065em] text-white sm:text-5xl">Context, proof, AI pressure, friction, visuals, and uncertainty.</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{BENCHMARK_AREAS.map(([label, copy], index) => <article key={label} className="rounded-[1.35rem] border border-white/10 bg-white/[.06] p-4"><span className="grid h-8 w-8 place-items-center rounded-xl bg-cyan-300 text-xs font-black text-slate-950">{index + 1}</span><h3 className="mt-3 text-xl font-semibold tracking-[-.04em] text-white">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-300">{copy}</p></article>)}</div>
        </section>
      </section>
      <section className="mx-auto mt-6 grid max-w-[94rem] gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Benchmark checks</p><div className="mt-5 grid gap-3 md:grid-cols-2">{BENCHMARK_CHECKS.map(([label, copy]) => <article key={label} className="rounded-[1.25rem] border border-cyan-100 bg-cyan-50/45 p-4"><h3 className="text-xl font-semibold tracking-[-.04em] text-slate-950">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{copy}</p></article>)}</div></div>
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Benchmark rules</p><div className="mt-5 grid gap-3">{BENCHMARK_RULES.map((rule) => <p key={rule} className="rounded-[1.15rem] border border-cyan-100 bg-cyan-50/45 p-4 text-xs font-semibold leading-6 text-slate-700">{rule}</p>)}</div></div>
      </section>
      <section className="sr-only" aria-label="Benchmark command guardrails">Benchmark Command Center. Category context. Public proof. AI visibility pressure. Conversion friction. Visual comparison. Uncertainty. Source basis. Similarity. Confidence. Customer value. Visual truth. Plan boundary. benchmark-safe visuals.</section>
    </main>
  );
}
