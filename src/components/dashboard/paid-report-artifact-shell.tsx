import Link from "next/link";

type ArtifactItem = {
  label: string;
  value: string;
  detail: string;
};

type PaidReportArtifactShellProps = {
  eyebrow: string;
  title: string;
  summary: string;
  status: string;
  route: string;
  releaseGate: string;
  attachmentName: string;
  attachmentType: string;
  requirements: readonly string[];
  modules: readonly ArtifactItem[];
  lifecycle: readonly ArtifactItem[];
};

export function PaidReportArtifactShell({
  eyebrow,
  title,
  summary,
  status,
  route,
  releaseGate,
  attachmentName,
  attachmentType,
  requirements,
  modules,
  lifecycle,
}: PaidReportArtifactShellProps) {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_12%_0%,rgba(125,211,252,.32),transparent_30%),radial-gradient(circle_at_86%_0%,rgba(196,181,253,.22),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_38%,#ffffff_100%)] px-4 py-14 text-slate-950 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(15,23,42,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.035)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />
      <section className="mx-auto grid max-w-[94rem] gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-stretch">
        <div className="rounded-[2.25rem] border border-white/80 bg-white/84 p-6 shadow-[0_24px_80px_rgba(15,23,42,.065)] backdrop-blur sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-700">{eyebrow}</p>
          <h1 className="mt-4 text-[clamp(3rem,7vw,6.4rem)] font-semibold leading-[.86] tracking-[-.08em] text-slate-950">{title}</h1>
          <p className="mt-6 text-base font-semibold leading-8 text-slate-600">{summary}</p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <Pill label="Route" value={route} />
            <Pill label="State" value={status} />
            <Pill label="Release" value={releaseGate} />
            <Pill label="PDF" value={`${attachmentType} · ${attachmentName}`} />
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/reports" className="rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white">Back to report vault</Link>
            <Link href="/dashboard/support" className="rounded-full border border-cyan-200 bg-white px-5 py-3 text-center text-sm font-bold text-cyan-700">Ask report support</Link>
          </div>
        </div>

        <div className="grid gap-4">
          <section className="rounded-[2.25rem] border border-white/80 bg-slate-950 p-6 text-white shadow-[0_28px_90px_rgba(15,23,42,.28)] sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">Artifact structure</p>
                <h2 className="mt-2 text-4xl font-semibold tracking-[-.065em] text-white sm:text-5xl">Dashboard copy, approved PDF, email delivery, same source.</h2>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[.16em] text-cyan-100">held until approved</span>
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {modules.map((item) => <DarkCard key={item.label} item={item} />)}
            </div>
          </section>

          <section className="grid gap-4 xl:grid-cols-[.95fr_1.05fr]">
            <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Release requirements</p>
              <div className="mt-4 grid gap-3">{requirements.map((item) => <p key={item} className="rounded-[1.15rem] border border-cyan-100 bg-cyan-50/45 p-3 text-sm font-semibold leading-6 text-slate-700">{item}</p>)}</div>
            </div>
            <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Lifecycle</p>
              <div className="mt-4 grid gap-3">{lifecycle.map((item) => <LightCard key={item.label} item={item} />)}</div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

function Pill({ label, value }: { label: string; value: string }) {
  return <div className="rounded-[1.2rem] border border-cyan-100 bg-cyan-50/45 p-3"><p className="text-[10px] font-black uppercase tracking-[.18em] text-cyan-700">{label}</p><p className="mt-1 text-xs font-bold leading-5 text-slate-700">{value}</p></div>;
}

function DarkCard({ item }: { item: ArtifactItem }) {
  return <article className="rounded-[1.4rem] border border-white/10 bg-white/[.06] p-4"><p className="text-[10px] font-black uppercase tracking-[.18em] text-cyan-200">{item.label}</p><h3 className="mt-2 text-2xl font-semibold tracking-[-.05em] text-white">{item.value}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-300">{item.detail}</p></article>;
}

function LightCard({ item }: { item: ArtifactItem }) {
  return <article className="rounded-[1.25rem] border border-slate-100 bg-slate-50 p-3"><p className="text-[10px] font-black uppercase tracking-[.16em] text-slate-400">{item.label}</p><h3 className="mt-1 text-lg font-semibold tracking-[-.035em] text-slate-950">{item.value}</h3><p className="mt-1 text-xs font-semibold leading-5 text-slate-600">{item.detail}</p></article>;
}
