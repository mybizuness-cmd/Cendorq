import Link from "next/link";
import { SAMPLE_CHOICE_GAP } from "@/lib/choice-gap-contract";
import { SAMPLE_PRESENCE_REPORT } from "@/lib/presence-report-contract";

const NAV_ITEMS = ["Overview", "Reports", "Signals", "Choice Gap", "Repair Priorities", "Control"] as const;
const SIGNALS = [
  ["Website clarity", 64, "Needs structure", "Clarify service offer above the fold", "cyan"],
  ["Review proof", 44, "Priority repair", "Move proof next to the decision point", "red"],
  ["Listings consistency", 71, "Stable", "Protect directory consistency", "cyan"],
  ["Answer-ready FAQs", 39, "Priority repair", "Add practical buyer questions", "red"],
  ["Schema support", 58, "Needs structure", "Make services machine-readable", "violet"],
  ["Offer clarity", 31, "Priority repair", "Name audience, promise, and next step", "red"],
] as const;
const SCORE_PATH = [
  ["Current", 42, "Today"],
  ["After priorities", 64, "First repair cycle"],
  ["Control target", 82, "Ongoing control"],
] as const;
const SEVERITY = [
  ["Strong", 38, "cyan"],
  ["Needs structure", 29, "violet"],
  ["Priority repair", 33, "red"],
] as const;

export function Cendorq3DPresenceCommand() {
  const report = SAMPLE_PRESENCE_REPORT;
  const choiceGap = SAMPLE_CHOICE_GAP;
  const weakSignals = SIGNALS.filter(([, score]) => Number(score) < 60).length;

  return (
    <section data-cendorq-homepage-dashboard-demo="category-command-center" className="relative isolate overflow-hidden bg-[#eef8ff] px-4 py-16 text-slate-950 sm:px-6 lg:px-8 lg:py-24" aria-label="Cendorq homepage customer dashboard demo">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_14%_10%,rgba(186,230,253,.95),transparent_30%),radial-gradient(circle_at_86%_18%,rgba(221,214,254,.48),transparent_36%),linear-gradient(180deg,#fbfeff_0%,#eaf8ff_52%,#f8fcff_100%)]" />
      <div className="mx-auto max-w-[110rem]">
        <div className="mx-auto max-w-4xl text-center">
          <p className="inline-flex rounded-full border border-cyan-100 bg-white/84 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-sky-700 shadow-[0_12px_34px_rgba(14,165,233,.1)]">Homepage dashboard preview</p>
          <h2 className="mt-5 text-[clamp(2.55rem,7vw,5.4rem)] font-black leading-[.93] tracking-[-.082em] text-slate-950">A command center for what blocks choice.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base font-semibold leading-7 text-slate-600 sm:text-lg sm:leading-8">The customer view should be precise: what is strong, what is weak, why buyers hesitate, and which repair creates the safest next move.</p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/free-check" className="inline-flex min-h-[3.25rem] items-center justify-center rounded-2xl border border-cyan-100 bg-[linear-gradient(135deg,#67e8f9,#60a5fa_55%,#a78bfa)] px-7 py-3 text-sm font-black text-slate-950 shadow-[0_18px_54px_rgba(14,165,233,.22),inset_0_1px_0_rgba(255,255,255,.86)]">Run Free Scan</Link>
            <Link href="/plans" className="inline-flex min-h-[3.25rem] items-center justify-center rounded-2xl border border-cyan-100 bg-white/76 px-7 py-3 text-sm font-black text-slate-950 shadow-[0_14px_38px_rgba(15,23,42,.08),inset_0_1px_0_rgba(255,255,255,.9)]">View Plans</Link>
          </div>
        </div>

        <div className="mt-12 overflow-hidden rounded-[2.35rem] border border-white/80 bg-white/82 p-2 shadow-[0_42px_120px_rgba(15,23,42,.20),inset_0_1px_0_rgba(255,255,255,.92)] backdrop-blur-xl sm:p-3">
          <div className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-[#f8fdff] shadow-[inset_0_1px_0_rgba(255,255,255,.92)]">
            <TopBar />
            <div className="border-b border-slate-200/80 bg-white/90 px-4 py-3 sm:px-5">
              <div className="flex items-center justify-between gap-4">
                <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Dashboard demo navigation">
                  {NAV_ITEMS.map((item) => <span key={item} className={item === "Overview" ? "shrink-0 rounded-full bg-slate-950 px-4 py-2 text-xs font-black text-white shadow-[0_14px_30px_rgba(15,23,42,.14)]" : item === "Repair Priorities" ? "shrink-0 rounded-full bg-cyan-50 px-4 py-2 text-xs font-black text-sky-700" : "shrink-0 rounded-full px-4 py-2 text-xs font-black text-slate-500"}>{item}</span>)}
                </div>
                <div className="hidden items-center gap-2 lg:flex"><span className="rounded-full bg-slate-50 px-3 py-1.5 text-xs font-black text-slate-500">Last scan: today</span><span className="rounded-full bg-cyan-50 px-3 py-1.5 text-xs font-black text-sky-700">AI-ready view</span></div>
              </div>
            </div>

            <main className="bg-[radial-gradient(circle_at_82%_12%,rgba(186,230,253,.62),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eff8ff_100%)] p-4 sm:p-5 lg:p-6">
              <div className="grid gap-4 xl:grid-cols-[1fr_.92fr]">
                <section className="rounded-[1.6rem] border border-slate-200 bg-white/95 p-5 shadow-[0_18px_52px_rgba(15,23,42,.08)]">
                  <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-start">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[.22em] text-sky-700">Presence Report</p>
                      <h3 className="mt-2 max-w-2xl text-4xl font-black leading-[.95] tracking-[-.065em] text-slate-950">{report.title}</h3>
                      <p className="mt-3 max-w-3xl text-sm font-bold leading-6 text-slate-500">{choiceGap.summary}</p>
                    </div>
                    <ScoreBlock score={report.score} />
                  </div>
                  <div className="mt-5 grid gap-3 md:grid-cols-4">
                    <Kpi label="Weak signals" value={String(weakSignals)} detail="need repair" tone="red" />
                    <Kpi label="Choice blockers" value="2" detail="trust + action" tone="red" />
                    <Kpi label="Signal health" value="64%" detail="current average" tone="cyan" />
                    <Kpi label="Next move" value="1" detail="priority action" tone="violet" />
                  </div>
                </section>

                <section className="rounded-[1.6rem] border border-slate-200 bg-white/95 p-5 shadow-[0_18px_52px_rgba(15,23,42,.08)]">
                  <div className="flex items-start justify-between gap-4"><div><p className="text-[10px] font-black uppercase tracking-[.2em] text-sky-700">Signal severity</p><h4 className="mt-1 text-2xl font-black tracking-[-.055em] text-slate-950">Quality split</h4></div><span className="rounded-full bg-rose-50 px-3 py-1.5 text-xs font-black text-rose-700">33% priority repair</span></div>
                  <SeverityStack />
                  <div className="mt-4 grid gap-2 text-xs font-black">{SEVERITY.map(([label, value, tone]) => <Legend key={label} label={label} value={`${value}%`} color={tone === "red" ? "bg-rose-400" : tone === "violet" ? "bg-indigo-400" : "bg-cyan-400"} />)}</div>
                </section>
              </div>

              <div className="mt-4 grid gap-4 xl:grid-cols-[1.12fr_.88fr]">
                <section className="rounded-[1.6rem] border border-slate-200 bg-white/95 p-5 shadow-[0_18px_52px_rgba(15,23,42,.08)]">
                  <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-[10px] font-black uppercase tracking-[.2em] text-sky-700">Score path</p><h4 className="mt-1 text-2xl font-black tracking-[-.055em] text-slate-950">What the first repair cycle changes</h4></div><div className="rounded-full bg-cyan-50 px-3 py-1.5 text-xs font-black text-sky-700">+22 point first-cycle opportunity</div></div>
                  <ScorePath />
                </section>

                <section className="rounded-[1.6rem] border border-slate-950 bg-slate-950 p-5 text-white shadow-[0_24px_70px_rgba(15,23,42,.26)]">
                  <div className="flex items-start justify-between gap-4"><div><p className="text-[10px] font-black uppercase tracking-[.2em] text-cyan-200">Repair Priorities</p><h4 className="mt-1 text-2xl font-black tracking-[-.055em] text-white">Do these first</h4></div><span className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[.14em] text-cyan-100">impact ordered</span></div>
                  <div className="mt-4 grid gap-3">{report.repairQueue.slice(0, 3).map((item, index) => <Repair key={item.title} index={index + 1} title={item.title} reason={item.publicReason} />)}</div>
                </section>
              </div>

              <section className="mt-4 rounded-[1.6rem] border border-slate-200 bg-white/95 p-5 shadow-[0_18px_52px_rgba(15,23,42,.08)]">
                <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-[10px] font-black uppercase tracking-[.2em] text-sky-700">Signal matrix</p><h4 className="mt-1 text-2xl font-black tracking-[-.055em] text-slate-950">Where the buyer loses confidence</h4></div><span className="rounded-full bg-slate-50 px-3 py-1.5 text-xs font-black text-slate-500">sorted by repair need</span></div>
                <div className="mt-4 overflow-hidden rounded-2xl border border-slate-100">
                  <div className="hidden grid-cols-[1.05fr_.42fr_.62fr_1.3fr] bg-slate-50 px-4 py-3 text-[10px] font-black uppercase tracking-[.18em] text-slate-400 md:grid"><span>Signal</span><span>Score</span><span>Status</span><span>Recommended repair</span></div>
                  <div>{SIGNALS.map(([label, score, state, repair, tone]) => <SignalRow key={label} label={label} score={score} state={state} repair={repair} tone={tone} />)}</div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
      <style>{`@keyframes fillBar{0%{transform:scaleX(.35)}55%,100%{transform:scaleX(1)}}.dash-fill{transform-origin:left;animation:fillBar 4.8s ease-in-out infinite}@media (prefers-reduced-motion:reduce){.dash-fill{animation:none}}`}</style>
    </section>
  );
}

function TopBar(){return <div className="flex items-center justify-between gap-3 border-b border-slate-200/80 bg-white/94 px-4 py-3"><div className="flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-xl bg-slate-950 text-[10px] font-black text-cyan-100">CQ</span><div className="hidden sm:block"><p className="text-xs font-black text-slate-950">Cendorq Command Center</p><p className="text-[10px] font-bold uppercase tracking-[.16em] text-slate-400">Customer preview</p></div></div><div className="hidden rounded-full border border-slate-200 bg-slate-50 px-5 py-2 text-xs font-bold text-slate-500 md:block">cendorq.com/customer/overview</div><div className="flex items-center gap-2"><span className="hidden rounded-full bg-slate-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[.14em] text-slate-500 sm:inline-flex">Export</span><span className="rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[.18em] text-sky-700">Run scan</span></div></div>}
function ScoreBlock({score}:{score:number}){return <div className="grid min-w-[11rem] place-items-center rounded-[1.45rem] bg-slate-950 px-6 py-5 text-center text-white shadow-[0_22px_56px_rgba(15,23,42,.22)]"><p className="text-[10px] font-black uppercase tracking-[.18em] text-cyan-200">Presence Score</p><p className="text-6xl font-black tracking-[-.09em]">{score}</p><p className="text-[10px] font-bold text-slate-300">visible, not easy to choose</p></div>}
function Kpi({label,value,detail,tone}:{label:string;value:string;detail:string;tone:"cyan"|"red"|"violet"}){const c=tone==="red"?"border-rose-100 bg-rose-50 text-rose-700":tone==="violet"?"border-indigo-100 bg-indigo-50 text-indigo-700":"border-cyan-100 bg-cyan-50 text-sky-700";return <article className={`rounded-2xl border p-4 shadow-[0_14px_34px_rgba(15,23,42,.06)] ${c}`}><p className="text-[10px] font-black uppercase tracking-[.18em]">{label}</p><p className="mt-1 text-4xl font-black tracking-[-.08em] text-slate-950">{value}</p><p className="text-xs font-bold text-slate-500">{detail}</p></article>}
function SeverityStack(){return <div className="mt-5 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 p-3"><div className="flex h-14 overflow-hidden rounded-xl bg-white shadow-inner"><span className="dash-fill h-full bg-cyan-400" style={{width:"38%"}}/><span className="dash-fill h-full bg-indigo-400" style={{width:"29%"}}/><span className="dash-fill h-full bg-rose-400" style={{width:"33%"}}/></div><div className="mt-3 flex justify-between text-[10px] font-black uppercase tracking-[.14em] text-slate-400"><span>stable</span><span>needs structure</span><span>urgent</span></div></div>}
function ScorePath(){return <div className="mt-5 grid gap-4">{SCORE_PATH.map(([label, score, note]) => <div key={label} className="grid gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 sm:grid-cols-[9rem_1fr_4rem] sm:items-center"><div><p className="text-sm font-black text-slate-950">{label}</p><p className="text-xs font-bold text-slate-500">{note}</p></div><div className="h-4 overflow-hidden rounded-full bg-white shadow-inner"><span className={`dash-fill block h-full rounded-full ${Number(score)<50?"bg-rose-400":Number(score)<75?"bg-cyan-400":"bg-indigo-400"}`} style={{width:`${score}%`}} /></div><p className="text-right text-3xl font-black tracking-[-.08em] text-slate-950">{score}</p></div>)}</div>}
function Legend({label,value,color}:{label:string;value:string;color:string}){return <div className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-2"><span className="flex items-center gap-2 text-slate-600"><span className={`h-2.5 w-2.5 rounded-full ${color}`}/>{label}</span><span className="text-slate-950">{value}</span></div>}
function SignalRow({label,score,state,repair,tone}:{label:string;score:number;state:string;repair:string;tone:string}){const red=tone==="red";const violet=tone==="violet";return <div className="grid gap-3 border-t border-slate-100 bg-white px-4 py-4 md:grid-cols-[1.05fr_.42fr_.62fr_1.3fr] md:items-center"><div><p className="text-sm font-black text-slate-950">{label}</p><div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100 md:hidden"><span className={`dash-fill block h-full rounded-full ${red?"bg-rose-400":violet?"bg-indigo-400":"bg-cyan-400"}`} style={{width:`${score}%`}} /></div></div><div><p className={`text-2xl font-black tracking-[-.06em] ${red?"text-rose-600":violet?"text-indigo-600":"text-sky-600"}`}>{score}%</p><div className="mt-1 hidden h-2 overflow-hidden rounded-full bg-slate-100 md:block"><span className={`dash-fill block h-full rounded-full ${red?"bg-rose-400":violet?"bg-indigo-400":"bg-cyan-400"}`} style={{width:`${score}%`}} /></div></div><p className={`w-fit rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[.14em] ${red?"bg-rose-50 text-rose-700":violet?"bg-indigo-50 text-indigo-700":"bg-cyan-50 text-sky-700"}`}>{state}</p><p className="text-sm font-bold leading-5 text-slate-600">{repair}</p></div>}
function Repair({index,title,reason}:{index:number;title:string;reason:string}){return <div className="grid grid-cols-[auto_1fr] gap-3 rounded-2xl border border-white/10 bg-white/[.055] p-3"><span className="grid h-8 w-8 place-items-center rounded-xl bg-cyan-300 text-xs font-black text-slate-950">{index}</span><div><p className="text-sm font-black leading-5 text-white">{title}</p><p className="mt-1 text-[11px] font-semibold leading-5 text-slate-300">{reason}</p></div></div>}
