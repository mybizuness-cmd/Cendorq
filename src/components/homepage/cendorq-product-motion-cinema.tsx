import Link from "next/link";
import { SAMPLE_CHOICE_GAP } from "@/lib/choice-gap-contract";
import { SAMPLE_PRESENCE_REPORT } from "@/lib/presence-report-contract";

const NAV_ITEMS = ["Overview", "Reports", "Signals", "Choice Gap", "Repair Priorities", "Control"] as const;
const SIGNALS = [
  ["Website clarity", 64, "Needs structure", "cyan"],
  ["Review proof", 44, "Proof buried", "red"],
  ["Listings consistency", 71, "Stable", "cyan"],
  ["Answer-ready FAQs", 39, "Weak signal", "red"],
  ["Schema support", 58, "Needs structure", "violet"],
  ["Offer clarity", 31, "Competitor clearer", "red"],
] as const;
const TREND = "M8 130 C52 104 84 112 120 88 C156 64 188 78 224 58 C260 38 300 50 340 28";

export function CendorqProductMotionCinema() {
  const report = SAMPLE_PRESENCE_REPORT;
  const choiceGap = SAMPLE_CHOICE_GAP;
  const weakSignals = report.pillars.filter((pillar) => pillar.score < 60).length;

  return (
    <section data-cendorq-motion-cinema="premium-dashboard-surface" className="relative isolate overflow-hidden bg-[#eef8ff] px-4 py-16 text-slate-950 sm:px-6 lg:px-8 lg:py-24" aria-label="Cendorq premium customer dashboard preview">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_14%_10%,rgba(186,230,253,.95),transparent_30%),radial-gradient(circle_at_86%_18%,rgba(221,214,254,.46),transparent_36%),linear-gradient(180deg,#fbfeff_0%,#eaf8ff_52%,#f8fcff_100%)]" />
      <div className="mx-auto grid max-w-[108rem] gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:items-center">
        <div className="max-w-2xl">
          <p className="inline-flex rounded-full border border-cyan-100 bg-white/84 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-sky-700 shadow-[0_12px_34px_rgba(14,165,233,.1)]">Customer command center</p>
          <h2 className="mt-5 text-[clamp(2.55rem,8vw,5.55rem)] font-black leading-[.93] tracking-[-.082em] text-slate-950">A serious dashboard for the report, the gap, and the fix.</h2>
          <p className="mt-5 max-w-xl text-base font-semibold leading-7 text-slate-600 sm:text-lg sm:leading-8">No fake cursor. No card shuffle. Cendorq needs to feel like a category-grade decision system: Presence Score, signal health, Choice Gap, Repair Priorities, and the next move in one organized customer surface.</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row"><Link href="/free-check" className="inline-flex min-h-[3.25rem] items-center justify-center rounded-2xl border border-cyan-100 bg-[linear-gradient(135deg,#67e8f9,#60a5fa_55%,#a78bfa)] px-7 py-3 text-sm font-black text-slate-950 shadow-[0_18px_54px_rgba(14,165,233,.22),inset_0_1px_0_rgba(255,255,255,.86)]">Run Free Scan</Link><Link href="/plans" className="inline-flex min-h-[3.25rem] items-center justify-center rounded-2xl border border-cyan-100 bg-white/76 px-7 py-3 text-sm font-black text-slate-950 shadow-[0_14px_38px_rgba(15,23,42,.08),inset_0_1px_0_rgba(255,255,255,.9)]">View Plans</Link></div>
        </div>

        <div className="relative overflow-hidden rounded-[2.25rem] border border-white/80 bg-white/80 p-2 shadow-[0_38px_110px_rgba(15,23,42,.20),inset_0_1px_0_rgba(255,255,255,.92)] backdrop-blur-xl sm:p-3">
          <div className="overflow-hidden rounded-[1.95rem] border border-slate-200/80 bg-[#f8fdff] shadow-[inset_0_1px_0_rgba(255,255,255,.92)]">
            <TopBar />
            <div className="grid min-h-[44rem] bg-[radial-gradient(circle_at_78%_14%,rgba(186,230,253,.62),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eff8ff_100%)] lg:grid-cols-[13.5rem_1fr]">
              <aside className="border-b border-slate-200/80 bg-white/72 p-4 backdrop-blur-xl lg:border-b-0 lg:border-r">
                <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-950 text-xs font-black text-cyan-100 shadow-[0_14px_34px_rgba(15,23,42,.16)]">CQ</span><div><p className="text-sm font-black text-slate-950">Cendorq</p><p className="text-[10px] font-bold uppercase tracking-[.16em] text-slate-400">Customer access</p></div></div>
                <nav className="mt-7 grid gap-1.5 text-xs font-black text-slate-500" aria-label="Dashboard preview navigation">{NAV_ITEMS.map((item) => <span key={item} className={item === "Overview" ? "rounded-xl bg-slate-950 px-3 py-2.5 text-white shadow-[0_14px_30px_rgba(15,23,42,.14)]" : item === "Repair Priorities" ? "rounded-xl bg-cyan-50 px-3 py-2.5 text-sky-700" : "rounded-xl px-3 py-2.5"}>{item}</span>)}</nav>
                <div className="mt-7 rounded-2xl border border-cyan-100 bg-cyan-50 p-4"><p className="text-[10px] font-black uppercase tracking-[.16em] text-sky-700">Recommended next move</p><p className="mt-2 text-2xl font-black tracking-[-.05em] text-slate-950">{report.nextMove}</p></div>
              </aside>

              <main className="grid gap-4 p-4 sm:p-5">
                <div className="flex flex-wrap items-start justify-between gap-4 rounded-[1.5rem] border border-slate-200 bg-white/94 p-5 shadow-[0_18px_52px_rgba(15,23,42,.08)]">
                  <div><p className="text-[10px] font-black uppercase tracking-[.22em] text-sky-700">Presence report overview</p><h3 className="mt-2 text-4xl font-black leading-[.95] tracking-[-.065em] text-slate-950">{report.title}</h3><p className="mt-2 max-w-2xl text-sm font-bold leading-6 text-slate-500">{choiceGap.summary}</p></div>
                  <div className="grid min-w-[9rem] place-items-center rounded-[1.35rem] bg-slate-950 px-5 py-4 text-center text-white shadow-[0_22px_56px_rgba(15,23,42,.22)]"><p className="text-[10px] font-black uppercase tracking-[.18em] text-cyan-200">Presence Score</p><p className="text-6xl font-black tracking-[-.09em]">{report.score}</p><p className="text-[10px] font-bold text-slate-300">out of 100</p></div>
                </div>

                <div className="grid gap-3 md:grid-cols-4"><Kpi label="Weak signals" value={String(weakSignals)} detail="need repair" tone="red" /><Kpi label="Choice Gap" value="2" detail="decision blockers" tone="red" /><Kpi label="Signal health" value="64%" detail="current average" tone="cyan" /><Kpi label="Next move" value="1" detail="priority action" tone="violet" /></div>

                <div className="grid gap-4 xl:grid-cols-[1.25fr_.75fr]">
                  <section className="rounded-[1.5rem] border border-slate-200 bg-white/94 p-5 shadow-[0_18px_52px_rgba(15,23,42,.08)]"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-[10px] font-black uppercase tracking-[.2em] text-sky-700">Signal trend</p><h4 className="mt-1 text-2xl font-black tracking-[-.055em] text-slate-950">Readiness over recent scans</h4></div><div className="rounded-full bg-rose-50 px-3 py-1.5 text-xs font-black text-rose-700">2 priority drops</div></div><TrendChart /></section>
                  <section className="rounded-[1.5rem] border border-slate-200 bg-white/94 p-5 shadow-[0_18px_52px_rgba(15,23,42,.08)]"><p className="text-[10px] font-black uppercase tracking-[.2em] text-sky-700">Signal distribution</p><div className="mt-4 grid grid-cols-[8rem_1fr] items-center gap-4"><Donut /><div className="grid gap-2 text-xs font-black"><Legend label="Strong" value="38%" color="bg-cyan-400" /><Legend label="Needs structure" value="29%" color="bg-indigo-400" /><Legend label="Priority repair" value="33%" color="bg-rose-400" /></div></div></section>
                </div>

                <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
                  <section className="rounded-[1.5rem] border border-slate-200 bg-white/94 p-5 shadow-[0_18px_52px_rgba(15,23,42,.08)]"><p className="text-[10px] font-black uppercase tracking-[.2em] text-sky-700">Signal breakdown</p><div className="mt-4 grid gap-3">{SIGNALS.map(([label, score, state, tone]) => <SignalRow key={label} label={label} score={score} state={state} tone={tone} />)}</div></section>
                  <section className="rounded-[1.5rem] border border-slate-950 bg-slate-950 p-5 text-white shadow-[0_24px_70px_rgba(15,23,42,.26)]"><p className="text-[10px] font-black uppercase tracking-[.2em] text-cyan-200">Repair Priorities</p><div className="mt-4 grid gap-3">{report.repairQueue.slice(0, 3).map((item, index) => <Repair key={item.title} index={index + 1} title={item.title} reason={item.publicReason} />)}</div></section>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes fillBar{0%{transform:scaleX(.35)}55%,100%{transform:scaleX(1)}}.dash-fill{transform-origin:left;animation:fillBar 4.8s ease-in-out infinite}@media (prefers-reduced-motion:reduce){.dash-fill{animation:none}}`}</style>
    </section>
  );
}

function TopBar(){return <div className="flex items-center justify-between gap-3 border-b border-slate-200/80 bg-white/94 px-4 py-3"><div className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-rose-300"/><span className="h-3 w-3 rounded-full bg-amber-300"/><span className="h-3 w-3 rounded-full bg-emerald-300"/></div><div className="hidden rounded-full border border-slate-200 bg-slate-50 px-5 py-2 text-xs font-bold text-slate-500 sm:block">cendorq.com/customer/overview</div><div className="rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[.18em] text-sky-700">live report</div></div>}
function Kpi({label,value,detail,tone}:{label:string;value:string;detail:string;tone:"cyan"|"red"|"violet"}){const c=tone==="red"?"border-rose-100 bg-rose-50 text-rose-700":tone==="violet"?"border-indigo-100 bg-indigo-50 text-indigo-700":"border-cyan-100 bg-cyan-50 text-sky-700";return <article className={`rounded-2xl border p-4 shadow-[0_14px_34px_rgba(15,23,42,.06)] ${c}`}><p className="text-[10px] font-black uppercase tracking-[.18em]">{label}</p><p className="mt-1 text-4xl font-black tracking-[-.08em] text-slate-950">{value}</p><p className="text-xs font-bold text-slate-500">{detail}</p></article>}
function TrendChart(){return <svg viewBox="0 0 360 150" preserveAspectRatio="none" className="mt-5 h-44 w-full rounded-2xl border border-slate-100 bg-[linear-gradient(180deg,#f8fdff,#eef8ff)]"><g opacity=".45" stroke="#dbeafe" strokeWidth="1"><path d="M0 30H360M0 70H360M0 110H360M60 0V150M120 0V150M180 0V150M240 0V150M300 0V150"/></g><path d="M8 142 C52 120 84 124 120 100 C156 80 188 92 224 70 C260 48 300 62 340 40 L340 150 L8 150 Z" fill="#67e8f9" opacity=".20"/><path d={TREND} fill="none" stroke="#0284c7" strokeWidth="4" strokeLinecap="round"/><circle cx="340" cy="28" r="6" fill="#0284c7"/><path d="M8 120 C54 116 84 132 124 126 C174 118 216 134 264 126 C300 122 326 130 350 124" fill="none" stroke="#fb7185" strokeWidth="3" strokeLinecap="round" opacity=".8"/></svg>}
function Donut(){return <div className="relative grid h-32 w-32 place-items-center rounded-full bg-[conic-gradient(#22d3ee_0_38%,#818cf8_38%_67%,#fb7185_67%_100%)] shadow-[0_18px_45px_rgba(14,165,233,.16)]"><span className="grid h-20 w-20 place-items-center rounded-full bg-white text-center"><span><b className="block text-3xl tracking-[-.08em] text-slate-950">64</b><em className="block text-[10px] not-italic font-black uppercase tracking-[.12em] text-slate-400">health</em></span></span></div>}
function Legend({label,value,color}:{label:string;value:string;color:string}){return <div className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-2"><span className="flex items-center gap-2 text-slate-600"><span className={`h-2.5 w-2.5 rounded-full ${color}`}/>{label}</span><span className="text-slate-950">{value}</span></div>}
function SignalRow({label,score,state,tone}:{label:string;score:number;state:string;tone:string}){const red=tone==="red";const violet=tone==="violet";return <div className="grid gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3 sm:grid-cols-[1fr_auto]"><div><div className="flex items-center justify-between gap-3"><p className="text-sm font-black text-slate-950">{label}</p><p className={`text-sm font-black ${red?"text-rose-600":violet?"text-indigo-600":"text-sky-600"}`}>{score}%</p></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-white"><span className={`dash-fill block h-full rounded-full ${red?"bg-rose-400":violet?"bg-indigo-400":"bg-cyan-400"}`} style={{width:`${score}%`}} /></div></div><span className="self-center rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[.14em] text-slate-500">{state}</span></div>}
function Repair({index,title,reason}:{index:number;title:string;reason:string}){return <div className="grid grid-cols-[auto_1fr] gap-3 rounded-2xl border border-white/10 bg-white/[.055] p-3"><span className="grid h-8 w-8 place-items-center rounded-xl bg-cyan-300 text-xs font-black text-slate-950">{index}</span><div><p className="text-sm font-black leading-5 text-white">{title}</p><p className="mt-1 text-[11px] font-semibold leading-5 text-slate-300">{reason}</p></div></div>}
