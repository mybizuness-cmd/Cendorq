import Link from "next/link";
import { SAMPLE_CHOICE_GAP } from "@/lib/choice-gap-contract";
import { SAMPLE_PRESENCE_REPORT } from "@/lib/presence-report-contract";

type Tone = "cyan" | "red" | "violet" | "slate";

const NAV_ITEMS = ["Overview", "Presence", "Choice Gap", "Repair", "Evidence", "Control"] as const;
const KPI_ITEMS = [
  ["Presence Score", "42", "high choice friction", "red"],
  ["Search Readiness", "58%", "eligible, not strong", "cyan"],
  ["Repair Priority", "3", "fix before polish", "red"],
  ["First Lift", "+22", "after priority work", "violet"],
] as const;
const BENCHMARKS = [
  ["Nearest competitor", 73, "explains faster", "cyan"],
  ["Your business", 42, "visible, unclear", "red"],
  ["Control target", 82, "monthly protection", "violet"],
] as const;
const EVIDENCE = [
  ["Offer clarity", "Weak", "first screen does not settle the choice", "red"],
  ["Proof placement", "Weak", "reviews appear too late", "red"],
  ["Service facts", "Partial", "needs cleaner source truth", "violet"],
  ["Action path", "Partial", "CTA path needs focus", "violet"],
  ["Listings", "Stable", "keep consistency protected", "cyan"],
  ["Local proof", "Stable", "usable but not foregrounded", "cyan"],
] as const;
const CONTROL = ["Scan received", "Report generated", "Choice Gap mapped", "Repair Queue approved", "Control snapshot next"] as const;

export function Cendorq3DPresenceCommand() {
  const report = SAMPLE_PRESENCE_REPORT;
  const choiceGap = SAMPLE_CHOICE_GAP;

  return (
    <section data-cendorq-homepage-dashboard-demo="final-master-presence-command-center" className="relative isolate overflow-hidden bg-[#eef8ff] px-4 py-16 text-slate-950 sm:px-6 lg:px-8 lg:py-24" aria-label="Cendorq Presence Command Center preview">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_8%,rgba(125,211,252,.92),transparent_30%),radial-gradient(circle_at_88%_10%,rgba(196,181,253,.52),transparent_34%),radial-gradient(circle_at_50%_100%,rgba(255,255,255,.98),transparent_40%),linear-gradient(180deg,#ffffff_0%,#ecf9ff_48%,#f8fcff_100%)]" />
      <div className="mx-auto max-w-[118rem]">
        <div className="mx-auto max-w-5xl text-center">
          <p className="inline-flex rounded-full border border-cyan-100 bg-white/86 px-4 py-2 text-xs font-black uppercase tracking-[.22em] text-sky-700 shadow-[0_12px_34px_rgba(14,165,233,.1)]">Presence Command Center</p>
          <h2 className="mt-5 text-[clamp(2.85rem,7vw,6.1rem)] font-black leading-[.9] tracking-[-.09em] text-slate-950">One command surface for the score, the gap, and the next repair.</h2>
          <p className="mx-auto mt-5 max-w-3xl text-base font-semibold leading-7 text-slate-600 sm:text-lg sm:leading-8">Cendorq should feel like an operating system for business presence: calm enough to trust, sharp enough to act, and clear enough to convert.</p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row"><Link href="/free-check" className="inline-flex min-h-[3.25rem] items-center justify-center rounded-2xl border border-cyan-100 bg-[linear-gradient(135deg,#67e8f9,#60a5fa_55%,#a78bfa)] px-7 py-3 text-sm font-black text-slate-950 shadow-[0_18px_54px_rgba(14,165,233,.22),inset_0_1px_0_rgba(255,255,255,.86)]">Run Free Scan</Link><Link href="/sample-report" className="inline-flex min-h-[3.25rem] items-center justify-center rounded-2xl border border-cyan-100 bg-white/78 px-7 py-3 text-sm font-black text-slate-950 shadow-[0_14px_38px_rgba(15,23,42,.08),inset_0_1px_0_rgba(255,255,255,.9)]">View Sample Report</Link></div>
        </div>

        <div className="mt-12 overflow-hidden rounded-[2.8rem] border border-white/80 bg-white/82 p-2 shadow-[0_54px_150px_rgba(15,23,42,.24),inset_0_1px_0_rgba(255,255,255,.94)] backdrop-blur-xl sm:p-3">
          <div className="overflow-hidden rounded-[2.35rem] border border-slate-200/80 bg-[#f8fdff] shadow-[inset_0_1px_0_rgba(255,255,255,.94)]">
            <TopBar />
            <div className="grid min-h-[48rem] bg-[radial-gradient(circle_at_80%_8%,rgba(186,230,253,.72),transparent_30%),linear-gradient(180deg,#ffffff_0%,#eff8ff_100%)] lg:grid-cols-[16.5rem_1fr]">
              <aside className="hidden border-r border-slate-200/80 bg-white/72 p-4 lg:block"><div className="rounded-[1.35rem] border border-slate-200 bg-slate-950 p-4 text-white shadow-[0_22px_60px_rgba(15,23,42,.25)]"><p className="text-[10px] font-black uppercase tracking-[.2em] text-cyan-200">Current command</p><p className="mt-2 text-2xl font-black tracking-[-.055em]">Deep Review</p><p className="mt-2 text-xs font-semibold leading-5 text-slate-300">Report confirms where choice breaks and what gets fixed first.</p></div><nav className="mt-4 grid gap-2">{NAV_ITEMS.map((item, index) => <span key={item} className={`rounded-2xl px-4 py-3 text-sm font-black ${index === 0 ? "bg-cyan-50 text-sky-800 shadow-sm" : "text-slate-500"}`}>{item}</span>)}</nav></aside>
              <main className="min-w-0 p-4 sm:p-5 lg:p-6">
                <div className="grid gap-4 xl:grid-cols-[1.05fr_.95fr]">
                  <section className="rounded-[1.9rem] border border-slate-200 bg-white/96 p-5 shadow-[0_18px_58px_rgba(15,23,42,.09)]">
                    <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-start"><div><p className="text-[10px] font-black uppercase tracking-[.22em] text-sky-700">Executive readout</p><h3 className="mt-2 max-w-3xl text-4xl font-black leading-[.95] tracking-[-.065em] text-slate-950">{report.title}</h3><p className="mt-3 max-w-3xl text-sm font-bold leading-6 text-slate-500">{choiceGap.summary}</p></div><PresenceScore score={report.score} /></div>
                    <div className="mt-5 grid gap-3 md:grid-cols-4">{KPI_ITEMS.map(([label, value, detail, tone]) => <Kpi key={label} label={label} value={value} detail={detail} tone={tone as Tone} />)}</div>
                  </section>

                  <section className="rounded-[1.9rem] border border-slate-950 bg-slate-950 p-5 text-white shadow-[0_28px_82px_rgba(15,23,42,.32)]">
                    <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-[10px] font-black uppercase tracking-[.2em] text-cyan-200">Next safe move</p><h4 className="mt-1 text-3xl font-black tracking-[-.06em] text-white">Fix choice friction before adding more traffic.</h4></div><span className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[.14em] text-cyan-100">evidence-led</span></div>
                    <div className="mt-5 grid gap-3 sm:grid-cols-3"><DarkStat label="Risk" value="High" copy="A buyer can compare before understanding." /><DarkStat label="Pressure" value="73" copy="Nearest competitor explains faster." /><DarkStat label="Output" value="PDF + Dashboard" copy="One approved report package." /></div>
                    <div className="mt-5 rounded-2xl border border-white/10 bg-white/[.055] p-4"><p className="text-sm font-semibold leading-6 text-slate-300">The dashboard is not decoration. Every surface should route to a report artifact, a repair decision, or a control snapshot.</p></div>
                  </section>
                </div>

                <div className="mt-4 grid gap-4 xl:grid-cols-[.9fr_1.1fr]">
                  <Panel eyebrow="Presence pillars" title="Where the choice breaks" badge="five-signal view"><PillarBoard /></Panel>
                  <Panel eyebrow="Competitor pressure" title="Are alternatives easier to choose?" badge="live benchmark"><BenchmarkBars /></Panel>
                </div>

                <div className="mt-4 grid gap-4 xl:grid-cols-[1.08fr_.92fr]">
                  <Panel eyebrow="Choice Gap" title="What creates hesitation" badge="reason mapped"><ChoiceGap signals={choiceGap.signals} /></Panel>
                  <section className="rounded-[1.9rem] border border-slate-950 bg-slate-950 p-5 text-white shadow-[0_28px_82px_rgba(15,23,42,.30)]"><div className="flex items-start justify-between gap-4"><div><p className="text-[10px] font-black uppercase tracking-[.2em] text-cyan-200">Repair Queue</p><h4 className="mt-1 text-2xl font-black tracking-[-.055em] text-white">Impact ordered</h4></div><span className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[.14em] text-cyan-100">do first</span></div><div className="mt-4 grid gap-3">{report.repairQueue.slice(0, 4).map((item, index) => <Repair key={item.title} index={index + 1} title={item.title} reason={item.publicReason} />)}</div></section>
                </div>

                <div className="mt-4 grid gap-4 xl:grid-cols-[1fr_1fr]">
                  <Panel eyebrow="Evidence coverage" title="Proof and source clarity" badge="public signal"><EvidenceGrid /></Panel>
                  <Panel eyebrow="Control snapshot" title="What happens after repair" badge="monthly drift view"><ControlFlow /></Panel>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TopBar() { return <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 bg-white/94 px-4 py-3"><div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-slate-950 text-[10px] font-black text-cyan-200">CQ</span><div><p className="text-xs font-black text-slate-950">Cendorq</p><p className="text-[10px] font-bold uppercase tracking-[.18em] text-slate-400">Presence Command Center</p></div></div><div className="flex flex-wrap items-center gap-2"><span className="rounded-full bg-cyan-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[.14em] text-sky-700">Report ready</span><span className="rounded-full bg-slate-950 px-3 py-1.5 text-[10px] font-black uppercase tracking-[.14em] text-cyan-100">Run control</span></div></div>; }
function PresenceScore({ score }: { score: number }) { return <div className="grid h-36 w-36 place-items-center rounded-full border border-cyan-100 bg-[conic-gradient(from_210deg,#ef4444_0deg,#f87171_120deg,#38bdf8_121deg,#60a5fa_218deg,#e0f2fe_219deg,#e0f2fe_360deg)] p-3 shadow-[0_20px_55px_rgba(14,165,233,.15)]"><div className="grid h-full w-full place-items-center rounded-full bg-white"><div className="text-center"><p className="text-5xl font-black tracking-[-.08em] text-slate-950">{score}</p><p className="mt-1 text-[10px] font-black uppercase tracking-[.18em] text-red-500">presence score</p></div></div></div>; }
function Kpi({ label, value, detail, tone }: { label: string; value: string; detail: string; tone: Tone }) { const c = toneClasses(tone); return <div className={`rounded-2xl border p-4 ${c.card}`}><p className="text-[10px] font-black uppercase tracking-[.16em] text-slate-400">{label}</p><p className="mt-2 text-3xl font-black tracking-[-.06em] text-slate-950">{value}</p><p className="mt-1 text-xs font-bold text-slate-500">{detail}</p></div>; }
function DarkStat({ label, value, copy }: { label: string; value: string; copy: string }) { return <div className="rounded-2xl border border-white/10 bg-white/[.06] p-4"><p className="text-[10px] font-black uppercase tracking-[.16em] text-cyan-200">{label}</p><p className="mt-2 text-2xl font-black tracking-[-.05em] text-white">{value}</p><p className="mt-1 text-xs font-semibold leading-5 text-slate-300">{copy}</p></div>; }
function Panel({ eyebrow, title, badge, children }: { eyebrow: string; title: string; badge: string; children: React.ReactNode }) { return <section className="rounded-[1.9rem] border border-slate-200 bg-white/96 p-5 shadow-[0_18px_58px_rgba(15,23,42,.09)]"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-[10px] font-black uppercase tracking-[.2em] text-sky-700">{eyebrow}</p><h4 className="mt-1 text-2xl font-black tracking-[-.055em] text-slate-950">{title}</h4></div><span className="rounded-full bg-slate-50 px-3 py-1.5 text-xs font-black text-slate-500">{badge}</span></div><div className="mt-4">{children}</div></section>; }
function PillarBoard() { const tones: Tone[] = ["cyan", "red", "red", "red", "violet"]; return <div className="grid gap-3">{SAMPLE_PRESENCE_REPORT.pillars.map((pillar, index) => <MetricRow key={pillar.label} label={pillar.label} score={pillar.score} state={pillar.state} tone={tones[index] ?? "slate"} />)}</div>; }
function MetricRow({ label, score, state, tone }: { label: string; score: number; state: string; tone: Tone }) { const c = toneClasses(tone); return <div className="grid gap-3 rounded-2xl border border-slate-100 bg-slate-50/72 p-3 sm:grid-cols-[.8fr_auto_1fr] sm:items-center"><div><p className="text-sm font-black text-slate-950">{label}</p><p className="text-xs font-semibold text-slate-500">{state}</p></div><span className="text-2xl font-black tracking-[-.06em] text-slate-950">{score}</span><div className="h-2.5 overflow-hidden rounded-full bg-white"><div className={`h-full rounded-full bg-gradient-to-r ${c.bar}`} style={{ width: `${score}%` }} /></div></div>; }
function BenchmarkBars() { return <div className="grid gap-3">{BENCHMARKS.map(([label, score, detail, tone]) => <MetricRow key={label} label={label} score={score as number} state={detail as string} tone={tone as Tone} />)}</div>; }
function ChoiceGap({ signals }: { signals: readonly { title: string; severity: string; customerEffect: string; aiEffect: string; repairDirection: string }[] }) { return <div className="grid gap-3">{signals.map((signal) => <div key={signal.title} className="rounded-2xl border border-slate-100 bg-slate-50/72 p-4"><div className="flex flex-wrap items-start justify-between gap-3"><p className="text-sm font-black text-slate-950">{signal.title}</p><span className="rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-[.12em] text-red-600">{signal.severity}</span></div><p className="mt-2 text-xs font-semibold leading-5 text-slate-500">{signal.customerEffect}</p><p className="mt-2 text-xs font-black text-sky-700">{signal.repairDirection}</p></div>)}</div>; }
function Repair({ index, title, reason }: { index: number; title: string; reason: string }) { return <div className="rounded-2xl border border-white/10 bg-white/[.06] p-4"><div className="flex gap-3"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white/10 text-xs font-black text-cyan-100">{index}</span><div><p className="text-sm font-black leading-5 text-white">{title}</p><p className="mt-1 text-xs font-semibold leading-5 text-slate-300">{reason}</p></div></div></div>; }
function EvidenceGrid() { return <div className="grid gap-3 md:grid-cols-2">{EVIDENCE.map(([label, state, detail, tone]) => { const c = toneClasses(tone as Tone); return <div key={label} className={`rounded-2xl border p-4 ${c.card}`}><p className="text-sm font-black text-slate-950">{label}</p><p className="mt-1 text-xs font-black uppercase tracking-[.12em] text-slate-400">{state}</p><p className="mt-2 text-xs font-semibold leading-5 text-slate-500">{detail}</p></div>; })}</div>; }
function ControlFlow() { return <div className="grid gap-3">{CONTROL.map((step, index) => <div key={step} className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/72 p-3"><span className="grid h-8 w-8 place-items-center rounded-xl bg-white text-xs font-black text-sky-700 shadow-sm">{index + 1}</span><p className="text-sm font-black text-slate-950">{step}</p></div>)}</div>; }
function toneClasses(tone: Tone) { if (tone === "red") return { card: "border-red-100 bg-red-50/45", bar: "from-red-500 to-rose-300" }; if (tone === "violet") return { card: "border-violet-100 bg-violet-50/45", bar: "from-violet-500 to-sky-300" }; if (tone === "cyan") return { card: "border-cyan-100 bg-cyan-50/45", bar: "from-cyan-400 to-blue-500" }; return { card: "border-slate-100 bg-slate-50/70", bar: "from-slate-400 to-slate-300" }; }
