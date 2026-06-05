import Link from "next/link";
import type { ReactNode } from "react";
import { SAMPLE_CHOICE_GAP } from "@/lib/choice-gap-contract";
import { SAMPLE_PRESENCE_REPORT } from "@/lib/presence-report-contract";

export function CendorqProductMotionCinema() {
  const report = SAMPLE_PRESENCE_REPORT;
  const choiceGap = SAMPLE_CHOICE_GAP;

  return (
    <section data-cendorq-motion-cinema="report-command-center" className="relative isolate overflow-hidden bg-[#eef8ff] px-4 py-16 text-slate-950 sm:px-6 lg:px-8 lg:py-24" aria-label="Cendorq report command center demo">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_10%,rgba(186,230,253,.95),transparent_31%),radial-gradient(circle_at_86%_18%,rgba(221,214,254,.44),transparent_36%),linear-gradient(180deg,#fbfeff_0%,#eaf8ff_54%,#f7fbff_100%)]" />
      <div className="mx-auto grid max-w-[106rem] gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
        <div className="max-w-2xl">
          <p className="inline-flex rounded-full border border-cyan-100 bg-white/82 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-sky-700 shadow-[0_12px_34px_rgba(14,165,233,.1)]">Report command center</p>
          <h2 className="mt-5 text-[clamp(2.5rem,8vw,5.4rem)] font-black leading-[.94] tracking-[-.08em] text-slate-950">Make the report feel like the product, not a preview.</h2>
          <p className="mt-5 max-w-xl text-base font-semibold leading-7 text-slate-600 sm:text-lg sm:leading-8">The demo now follows the actual Presence Report system: score, pillars, Choice Gap, customer effect, AI effect, repair direction, and next move.</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row"><Link href="/free-check" className="inline-flex min-h-[3.25rem] items-center justify-center rounded-2xl border border-cyan-100 bg-[linear-gradient(135deg,#67e8f9,#60a5fa_55%,#a78bfa)] px-7 py-3 text-sm font-black text-slate-950 shadow-[0_18px_54px_rgba(14,165,233,.22),inset_0_1px_0_rgba(255,255,255,.86)]">Run Free Scan</Link><Link href="/plans" className="inline-flex min-h-[3.25rem] items-center justify-center rounded-2xl border border-cyan-100 bg-white/74 px-7 py-3 text-sm font-black text-slate-950 shadow-[0_14px_38px_rgba(15,23,42,.08),inset_0_1px_0_rgba(255,255,255,.9)]">View Plans</Link></div>
        </div>

        <div className="relative overflow-hidden rounded-[2.2rem] border border-white/80 bg-white/76 p-2 shadow-[0_34px_100px_rgba(15,23,42,.2),inset_0_1px_0_rgba(255,255,255,.9)] backdrop-blur-xl sm:p-3">
          <div className="relative overflow-hidden rounded-[1.9rem] border border-slate-200/80 bg-[#f8fdff] shadow-[inset_0_1px_0_rgba(255,255,255,.92)]">
            <div className="flex items-center justify-between gap-3 border-b border-slate-200/80 bg-white/90 px-4 py-3"><div className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-rose-300" /><span className="h-3 w-3 rounded-full bg-amber-300" /><span className="h-3 w-3 rounded-full bg-emerald-300" /></div><div className="hidden rounded-full border border-slate-200 bg-slate-50 px-5 py-2 text-xs font-bold text-slate-500 sm:block">cendorq.com/dashboard/reports/sample</div><div className="rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[.18em] text-sky-700">report demo</div></div>
            <div className="relative min-h-[43rem] overflow-hidden bg-[radial-gradient(circle_at_78%_15%,rgba(186,230,253,.62),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eef8ff_100%)] p-4 sm:p-5 lg:min-h-[39rem]">
              <Cursor />
              <div className="grid h-full gap-4 lg:grid-cols-[12rem_1fr_18rem]">
                <aside className="rounded-[1.45rem] border border-slate-200 bg-white/92 p-4 shadow-[0_18px_52px_rgba(15,23,42,.08)]">
                  <p className="text-sm font-black text-slate-950">Cendorq</p>
                  <div className="mt-6 grid gap-2 text-xs font-black text-slate-500"><span className="rounded-xl px-3 py-2">Dashboard</span><span className="rounded-xl bg-slate-950 px-3 py-2 text-white">Reports</span><span className="rounded-xl bg-cyan-50 px-3 py-2 text-sky-700">Choice Gap</span><span className="rounded-xl px-3 py-2">Repair Queue</span><span className="rounded-xl px-3 py-2">Control</span></div>
                  <div className="mt-6 rounded-2xl bg-cyan-50 p-3"><p className="text-[10px] font-black uppercase tracking-[.16em] text-sky-700">Next move</p><p className="mt-1 text-lg font-black text-slate-950">{report.nextMove}</p></div>
                </aside>

                <main className="grid gap-4">
                  <div className="rounded-[1.45rem] border border-slate-200 bg-white/94 p-5 shadow-[0_18px_52px_rgba(15,23,42,.08)]">
                    <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-[10px] font-black uppercase tracking-[.22em] text-sky-700">Presence Report</p><h3 className="mt-2 text-4xl font-black leading-[.95] tracking-[-.06em] text-slate-950">{report.title}</h3><p className="mt-2 max-w-xl text-xs font-bold leading-5 text-slate-500">{report.summary}</p></div><div className="rounded-2xl bg-slate-950 px-5 py-4 text-center text-white"><p className="text-[10px] font-black uppercase tracking-[.18em] text-cyan-200">Score</p><p className="text-5xl font-black tracking-[-.08em]">{report.score}</p></div></div>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    {report.pillars.map((pillar) => <Pillar key={pillar.key} label={pillar.label} score={pillar.score} state={pillar.state} copy={pillar.publicMeaning} />)}
                  </div>
                </main>

                <aside className="grid gap-4">
                  <div className="rounded-[1.45rem] border border-rose-100 bg-rose-50 p-5 shadow-[0_18px_52px_rgba(251,113,133,.1)]"><p className="text-[10px] font-black uppercase tracking-[.2em] text-rose-700">Choice Gap</p><p className="mt-3 text-sm font-bold leading-6 text-slate-700">{choiceGap.summary}</p></div>
                  <div className="rounded-[1.45rem] border border-slate-200 bg-white/94 p-5 shadow-[0_18px_52px_rgba(15,23,42,.08)]"><p className="text-[10px] font-black uppercase tracking-[.2em] text-sky-700">Signal diagnosis</p><div className="mt-4 grid gap-3">{choiceGap.signals.map((signal, index) => <Signal key={signal.title} index={index + 1} title={signal.title} effect={signal.customerEffect} repair={signal.repairDirection} />)}</div></div>
                  <div className="rounded-[1.45rem] border border-slate-900 bg-slate-950 p-5 text-white shadow-[0_22px_64px_rgba(15,23,42,.25)]"><p className="text-[10px] font-black uppercase tracking-[.2em] text-cyan-200">Repair queue</p><div className="mt-4 grid gap-3">{report.repairQueue.slice(0, 3).map((item, index) => <Repair key={item.title} index={index + 1} title={item.title} reason={item.publicReason} />)}</div></div>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes cursorTour{0%,100%{left:33%;top:22%;transform:rotate(-6deg)}34%{left:69%;top:50%;transform:rotate(-3deg)}68%{left:81%;top:78%;transform:rotate(-8deg)}}@keyframes barFill{0%{transform:scaleX(.25)}45%,100%{transform:scaleX(1)}}@keyframes cardGlow{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}.report-cursor{animation:cursorTour 10s ease-in-out infinite}.report-bar{transform-origin:left;animation:barFill 4.4s ease-in-out infinite}.report-card{animation:cardGlow 5.2s ease-in-out infinite}@media (prefers-reduced-motion:reduce){.report-cursor,.report-bar,.report-card{animation:none}}`}</style>
    </section>
  );
}

function Cursor() {return <svg className="report-cursor absolute z-30 h-10 w-10 drop-shadow-[0_18px_28px_rgba(15,23,42,.28)]" viewBox="0 0 34 34" fill="none" aria-hidden="true"><path d="M5 3.8 29.2 17 18.4 19.1 14.1 29.4 5 3.8Z" fill="#020617" stroke="white" strokeWidth="2"/><path d="M17.8 19.2 23.6 29.1" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>}
function Pillar({label,score,state,copy}:{label:string;score:number;state:string;copy:string}){const weak=score<50;return <article className={`report-card rounded-2xl border p-4 shadow-[0_14px_34px_rgba(15,23,42,.06)] ${weak?'border-rose-100 bg-rose-50':'border-cyan-100 bg-cyan-50'}`}><div className="flex items-start justify-between gap-3"><div><p className={`text-[10px] font-black uppercase tracking-[.18em] ${weak?'text-rose-700':'text-sky-700'}`}>{label}</p><p className="mt-1 text-sm font-black text-slate-950">{state}</p></div><p className="text-4xl font-black tracking-[-.08em] text-slate-950">{score}</p></div><p className="mt-2 text-[11px] font-bold leading-5 text-slate-600">{copy}</p><div className="mt-3 h-2 overflow-hidden rounded-full bg-white"><span className={`report-bar block h-full rounded-full ${weak?'bg-rose-400':'bg-cyan-400'}`} style={{width:`${score}%`}} /></div></article>}
function Signal({index,title,effect,repair}:{index:number;title:string;effect:string;repair:string}){return <div className="rounded-2xl border border-rose-100 bg-white/80 p-3"><p className="text-[10px] font-black uppercase tracking-[.18em] text-rose-700">0{index} / {title}</p><p className="mt-2 text-xs font-bold leading-5 text-slate-600">{effect}</p><p className="mt-2 text-xs font-black leading-5 text-slate-950">Repair: {repair}</p></div>}
function Repair({index,title,reason}:{index:number;title:string;reason:string}){return <div className="grid grid-cols-[auto_1fr] gap-3 rounded-2xl border border-white/10 bg-white/[.055] p-3"><span className="text-sm font-black text-cyan-100">0{index}</span><div><p className="text-sm font-black leading-5 text-white">{title}</p><p className="mt-1 text-[11px] font-semibold leading-5 text-slate-300">{reason}</p></div></div>}
