import Link from "next/link";
import { SAMPLE_CHOICE_GAP } from "@/lib/choice-gap-contract";
import { SAMPLE_PRESENCE_REPORT } from "@/lib/presence-report-contract";

const NAV = ["Overview", "Presence Report", "Choice Gap", "Repair Priorities", "Control"] as const;

export function Cendorq3DPresenceCommand() {
  const report = SAMPLE_PRESENCE_REPORT;
  const choiceGap = SAMPLE_CHOICE_GAP;
  const weakCount = report.pillars.filter((pillar) => pillar.score < 50).length;
  const strongest = [...report.pillars].sort((a, b) => b.score - a.score)[0];

  return (
    <section data-cendorq-3d-command="true" className="relative isolate overflow-hidden bg-[#eef8ff] px-4 py-16 text-slate-950 sm:px-6 lg:px-8 lg:py-24" aria-label="Cendorq 3D Presence Command dashboard demo">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_10%,rgba(186,230,253,.96),transparent_30%),radial-gradient(circle_at_86%_16%,rgba(221,214,254,.42),transparent_35%),linear-gradient(180deg,#fbfeff_0%,#eaf8ff_55%,#f7fbff_100%)]" />
      <div className="absolute -left-28 top-12 -z-10 h-[34rem] w-[34rem] rounded-full bg-cyan-200/44 blur-[112px]" />
      <div className="absolute -right-32 top-20 -z-10 h-[34rem] w-[34rem] rounded-full bg-blue-200/42 blur-[120px]" />

      <div className="mx-auto grid max-w-[108rem] gap-11 lg:grid-cols-[0.66fr_1.34fr] lg:items-center">
        <div className="max-w-2xl">
          <p className="inline-flex rounded-full border border-cyan-100 bg-white/84 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-sky-700 shadow-[0_12px_34px_rgba(14,165,233,.1)]">3D Presence Command Center</p>
          <h2 className="mt-5 text-[clamp(2.55rem,8vw,5.6rem)] font-black leading-[.92] tracking-[-.084em] text-slate-950">The dashboard should make the next repair obvious.</h2>
          <p className="mt-5 max-w-xl text-base font-semibold leading-7 text-slate-600 sm:text-lg sm:leading-8">Cendorq turns AI Search Presence Repair into one operating view: Presence Score, Signal Pillars, Choice Gap, Repair Priorities, and a Recommended Next Move.</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row"><Link href="/free-check" className="inline-flex min-h-[3.25rem] items-center justify-center rounded-2xl border border-cyan-100 bg-[linear-gradient(135deg,#67e8f9,#60a5fa_55%,#a78bfa)] px-7 py-3 text-sm font-black text-slate-950 shadow-[0_18px_54px_rgba(14,165,233,.22),inset_0_1px_0_rgba(255,255,255,.86)] transition hover:-translate-y-0.5">Run Free Scan</Link><Link href="/plans" className="inline-flex min-h-[3.25rem] items-center justify-center rounded-2xl border border-cyan-100 bg-white/74 px-7 py-3 text-sm font-black text-slate-950 shadow-[0_14px_38px_rgba(15,23,42,.08),inset_0_1px_0_rgba(255,255,255,.9)] transition hover:-translate-y-0.5">View Plans</Link></div>
        </div>

        <div className="relative [perspective:1800px]">
          <div className="absolute -inset-8 rounded-[3rem] bg-[radial-gradient(circle_at_50%_44%,rgba(14,165,233,.22),transparent_42%)] blur-2xl" />
          <div className="relative transform-gpu rounded-[2.45rem] border border-white/80 bg-white/72 p-2 shadow-[0_44px_124px_rgba(15,23,42,.22),inset_0_1px_0_rgba(255,255,255,.92)] backdrop-blur-xl sm:p-3 lg:[transform:rotateX(4deg)_rotateY(-6deg)]">
            <div className="relative overflow-hidden rounded-[2.08rem] border border-slate-200/80 bg-[#f8fdff] shadow-[inset_0_1px_0_rgba(255,255,255,.95)]">
              <Toolbar />
              <div className="relative min-h-[44rem] overflow-hidden bg-[radial-gradient(circle_at_76%_14%,rgba(186,230,253,.62),transparent_33%),linear-gradient(180deg,#ffffff_0%,#eef8ff_100%)] p-4 sm:p-5 lg:min-h-[40rem]">
                <Cursor />
                <div className="grid h-full gap-4 lg:grid-cols-[12.5rem_1fr_18.25rem]">
                  <aside className="rounded-[1.55rem] border border-slate-200 bg-white/92 p-4 shadow-[0_18px_52px_rgba(15,23,42,.08)]">
                    <p className="text-sm font-black text-slate-950">Cendorq</p>
                    <nav className="mt-6 grid gap-2 text-xs font-black text-slate-500" aria-label="Demo dashboard navigation">{NAV.map((item) => <span key={item} className={`rounded-xl px-3 py-2 ${item === "Presence Report" ? "bg-slate-950 text-white" : item === "Choice Gap" ? "bg-cyan-50 text-sky-700" : ""}`}>{item}</span>)}</nav>
                    <div className="mt-6 rounded-2xl bg-cyan-50 p-3"><p className="text-[10px] font-black uppercase tracking-[.16em] text-sky-700">Recommended Next Move</p><p className="mt-1 text-lg font-black text-slate-950">{report.nextMove}</p></div>
                  </aside>

                  <main className="grid gap-4">
                    <div className="grid gap-3 md:grid-cols-3"><Metric label="Presence Score" value={String(report.score)} note="Out of 100" tone="dark" /><Metric label="Weak Pillars" value={String(weakCount)} note="Need repair" tone="red" /><Metric label="Strongest Signal" value={strongest?.label || "Findability"} note="Protect this advantage" tone="cyan" /></div>
                    <div className="rounded-[1.55rem] border border-slate-200 bg-white/95 p-5 shadow-[0_18px_52px_rgba(15,23,42,.08)]"><div className="flex flex-wrap items-start justify-between gap-5"><div><p className="text-[10px] font-black uppercase tracking-[.22em] text-sky-700">Presence Report</p><h3 className="mt-2 text-4xl font-black leading-[.95] tracking-[-.06em] text-slate-950">{report.title}</h3><p className="mt-2 max-w-xl text-xs font-bold leading-5 text-slate-500">{report.summary}</p></div><ScoreDial score={report.score} /></div><div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-[10px] font-black uppercase tracking-[.18em] text-slate-500">Strategic CTA</p><p className="mt-1 text-xl font-black tracking-[-.045em] text-slate-950">Open Deep Review before buying deeper work.</p><p className="mt-1 text-xs font-bold leading-5 text-slate-600">The dashboard points the owner toward the safest next decision instead of dumping data on them.</p></div></div>
                    <div className="rounded-[1.55rem] border border-slate-200 bg-white/95 p-5 shadow-[0_18px_52px_rgba(15,23,42,.08)]"><div className="flex items-center justify-between gap-4"><div><p className="text-[10px] font-black uppercase tracking-[.22em] text-sky-700">Signal Pillars</p><p className="mt-1 text-sm font-bold text-slate-500">Findability, understanding, trust, choice, and action.</p></div><span className="rounded-full bg-slate-950 px-3 py-1.5 text-[10px] font-black uppercase tracking-[.14em] text-white">5 scored</span></div><div className="mt-4 grid gap-3 md:grid-cols-2">{report.pillars.map((pillar) => <Pillar key={pillar.key} label={pillar.label} score={pillar.score} state={pillar.state} copy={pillar.publicMeaning} />)}</div></div>
                  </main>

                  <aside className="grid gap-4">
                    <div className="rounded-[1.55rem] border border-rose-100 bg-rose-50 p-5 shadow-[0_18px_52px_rgba(251,113,133,.1)]"><p className="text-[10px] font-black uppercase tracking-[.2em] text-rose-700">Choice Gap</p><p className="mt-3 text-sm font-bold leading-6 text-slate-700">{choiceGap.summary}</p></div>
                    <div className="rounded-[1.55rem] border border-slate-200 bg-white/95 p-5 shadow-[0_18px_52px_rgba(15,23,42,.08)]"><p className="text-[10px] font-black uppercase tracking-[.2em] text-sky-700">Gap Intelligence</p><div className="mt-4 grid gap-3">{choiceGap.signals.slice(0, 2).map((signal, index) => <Signal key={signal.title} index={index + 1} title={signal.title} effect={signal.customerEffect} repair={signal.repairDirection} />)}</div></div>
                    <div className="rounded-[1.55rem] border border-slate-900 bg-slate-950 p-5 text-white shadow-[0_22px_64px_rgba(15,23,42,.25)]"><p className="text-[10px] font-black uppercase tracking-[.2em] text-cyan-200">Repair Priorities</p><div className="mt-4 grid gap-3">{report.repairQueue.slice(0, 3).map((item, index) => <Repair key={item.title} index={index + 1} title={item.title} reason={item.publicReason} />)}</div><Link href="/plans" className="mt-4 inline-flex w-full justify-center rounded-2xl bg-white px-4 py-3 text-xs font-black text-slate-950">Prioritize repairs</Link></div>
                  </aside>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes cursorTour{0%,100%{left:31%;top:20%;transform:rotate(-6deg)}34%{left:62%;top:51%;transform:rotate(-3deg)}68%{left:80%;top:78%;transform:rotate(-8deg)}}@keyframes barFill{0%{transform:scaleX(.25)}45%,100%{transform:scaleX(1)}}@keyframes cardGlow{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}.report-cursor{animation:cursorTour 10s ease-in-out infinite}.report-bar{transform-origin:left;animation:barFill 4.4s ease-in-out infinite}.report-card{animation:cardGlow 5.2s ease-in-out infinite}@media (prefers-reduced-motion:reduce){.report-cursor,.report-bar,.report-card{animation:none}}`}</style>
    </section>
  );
}

function Toolbar(){return <div className="flex items-center justify-between gap-3 border-b border-slate-200/80 bg-white/92 px-4 py-3"><div className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-rose-300"/><span className="h-3 w-3 rounded-full bg-amber-300"/><span className="h-3 w-3 rounded-full bg-emerald-300"/></div><div className="hidden rounded-full border border-slate-200 bg-slate-50 px-5 py-2 text-xs font-bold text-slate-500 md:block">cendorq.com/dashboard/reports/sample</div><div className="flex items-center gap-2"><span className="hidden rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-[.14em] text-slate-600 sm:inline-flex">Share</span><span className="rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[.18em] text-sky-700">Re-run scan</span></div></div>}
function Cursor(){return <svg className="report-cursor absolute z-30 h-10 w-10 drop-shadow-[0_18px_28px_rgba(15,23,42,.28)]" viewBox="0 0 34 34" fill="none" aria-hidden="true"><path d="M5 3.8 29.2 17 18.4 19.1 14.1 29.4 5 3.8Z" fill="#020617" stroke="white" strokeWidth="2"/><path d="M17.8 19.2 23.6 29.1" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>}
function Metric({label,value,note,tone}:{label:string;value:string;note:string;tone:string}){const cls=tone==='red'?'border-rose-100 bg-rose-50 text-rose-700':tone==='dark'?'border-slate-900 bg-slate-950 text-white':'border-cyan-100 bg-cyan-50 text-sky-700';return <div className={`rounded-2xl border p-4 shadow-[0_12px_34px_rgba(15,23,42,.06)] ${cls}`}><p className="text-[10px] font-black uppercase tracking-[.16em] opacity-80">{label}</p><p className="mt-2 text-2xl font-black tracking-[-.05em]">{value}</p><p className="mt-1 text-[11px] font-bold leading-4 opacity-75">{note}</p></div>}
function ScoreDial({score}:{score:number}){return <div className="relative grid h-28 w-28 shrink-0 place-items-center rounded-full bg-[conic-gradient(#fb7185_0_42%,#e2e8f0_42%_100%)] p-2 shadow-[0_20px_46px_rgba(15,23,42,.12)]"><div className="grid h-full w-full place-items-center rounded-full bg-slate-950 text-center text-white"><p className="text-[10px] font-black uppercase tracking-[.16em] text-cyan-200">Presence Score</p><p className="text-4xl font-black tracking-[-.08em]">{score}</p></div></div>}
function Pillar({label,score,state,copy}:{label:string;score:number;state:string;copy:string}){const weak=score<50;return <article className={`report-card rounded-2xl border p-4 shadow-[0_14px_34px_rgba(15,23,42,.06)] ${weak?'border-rose-100 bg-rose-50':'border-cyan-100 bg-cyan-50'}`}><div className="flex items-start justify-between gap-3"><div><p className={`text-[10px] font-black uppercase tracking-[.18em] ${weak?'text-rose-700':'text-sky-700'}`}>{label}</p><p className="mt-1 text-sm font-black text-slate-950">{state}</p></div><p className="text-4xl font-black tracking-[-.08em] text-slate-950">{score}</p></div><p className="mt-2 text-[11px] font-bold leading-5 text-slate-600">{copy}</p><div className="mt-3 h-2 overflow-hidden rounded-full bg-white"><span className={`report-bar block h-full rounded-full ${weak?'bg-rose-400':'bg-cyan-400'}`} style={{width:`${score}%`}}/></div></article>}
function Signal({index,title,effect,repair}:{index:number;title:string;effect:string;repair:string}){return <div className="rounded-2xl border border-rose-100 bg-white/80 p-3"><p className="text-[10px] font-black uppercase tracking-[.18em] text-rose-700">0{index} / {title}</p><p className="mt-2 text-xs font-bold leading-5 text-slate-600">{effect}</p><p className="mt-2 text-xs font-black leading-5 text-slate-950">Repair direction: {repair}</p></div>}
function Repair({index,title,reason}:{index:number;title:string;reason:string}){return <div className="grid grid-cols-[auto_1fr] gap-3 rounded-2xl border border-white/10 bg-white/[.055] p-3"><span className="text-sm font-black text-cyan-100">0{index}</span><div><p className="text-sm font-black leading-5 text-white">{title}</p><p className="mt-1 text-[11px] font-semibold leading-5 text-slate-300">{reason}</p></div></div>}
