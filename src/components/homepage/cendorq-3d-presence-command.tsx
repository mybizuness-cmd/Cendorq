import Link from "next/link";
import { SAMPLE_CHOICE_GAP } from "@/lib/choice-gap-contract";
import { SAMPLE_PRESENCE_REPORT } from "@/lib/presence-report-contract";

type Tone = "cyan" | "red" | "violet" | "slate";

const NAV_ITEMS = ["Command", "Reports", "Evidence", "Choice Gap", "Repair", "Control"] as const;
const KPI_ITEMS = [
  ["Presence Score", "42", "Visible, not easy to choose", "red"],
  ["Choice Readiness", "58%", "buyer path clarity", "violet"],
  ["Priority Repairs", "3", "impact ordered", "red"],
  ["First Lift", "+22", "first repair cycle", "cyan"],
] as const;
const SCORE_LIFT = [
  ["Current scan", 42, "Baseline public signal"],
  ["After priorities", 64, "Deep Review to Build Fix"],
  ["Control target", 82, "Monthly drift protection"],
] as const;
const SEVERITY = [
  ["Stable", 38, "cyan"],
  ["Needs structure", 29, "violet"],
  ["Priority repair", 33, "red"],
] as const;
const COMPETITORS = [
  ["Nearest competitor", 73, "explains faster", "cyan"],
  ["Your business", 42, "visible, not clear enough", "red"],
  ["Control target", 82, "Cendorq repair goal", "violet"],
] as const;
const PROMPTS = [
  ["Who should I trust?", 44, "proof too far from decision", "red"],
  ["What do they do?", 64, "service is partly clear", "cyan"],
  ["How do I act?", 38, "next step needs repair", "red"],
  ["Where do they serve?", 58, "needs cleaner source truth", "violet"],
] as const;
const SIGNALS = [
  ["Website clarity", 64, "Needs structure", "Clarify the service offer above the fold", "cyan"],
  ["Review proof", 44, "Priority repair", "Move social proof beside the decision point", "red"],
  ["Listings consistency", 71, "Stable", "Protect directory consistency", "cyan"],
  ["Answer-ready FAQs", 39, "Priority repair", "Add practical buyer questions before comparison happens", "red"],
  ["Schema support", 58, "Needs structure", "Make services easier for machines to classify", "violet"],
  ["Offer clarity", 31, "Priority repair", "Name audience, promise, proof, and next step", "red"],
] as const;
const ARTIFACTS = [
  ["Free Scan Signal", "Ready", "first public signal"],
  ["Deep Review Report", "Recommended", "evidence-backed proof"],
  ["Build Fix Plan", "Locked", "opens after approval"],
  ["Monthly Control", "Next", "drift protection"],
] as const;
const DELIVERY_STEPS = ["Package approved", "Dashboard published", "PDF ready", "Email sent", "Next command open"] as const;

export function Cendorq3DPresenceCommand() {
  const report = SAMPLE_PRESENCE_REPORT;
  const choiceGap = SAMPLE_CHOICE_GAP;

  return (
    <section data-cendorq-homepage-dashboard-demo="presence-intelligence-command-center" className="relative isolate overflow-hidden bg-[#eef8ff] px-4 py-16 text-slate-950 sm:px-6 lg:px-8 lg:py-24" aria-label="Cendorq homepage Presence Intelligence Command Center preview">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_8%,rgba(125,211,252,.95),transparent_30%),radial-gradient(circle_at_85%_16%,rgba(196,181,253,.58),transparent_34%),radial-gradient(circle_at_52%_100%,rgba(240,249,255,.98),transparent_38%),linear-gradient(180deg,#ffffff_0%,#ecf9ff_48%,#f8fcff_100%)]" />
      <div className="mx-auto max-w-[116rem]">
        <div className="mx-auto max-w-5xl text-center">
          <p className="inline-flex rounded-full border border-cyan-100 bg-white/86 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-sky-700 shadow-[0_12px_34px_rgba(14,165,233,.1)]">Presence Intelligence Command Center</p>
          <h2 className="mt-5 text-[clamp(2.7rem,7vw,5.75rem)] font-black leading-[.91] tracking-[-.086em] text-slate-950">See the report, the proof, and the repair path in one command surface.</h2>
          <p className="mx-auto mt-5 max-w-3xl text-base font-semibold leading-7 text-slate-600 sm:text-lg sm:leading-8">Cendorq turns public signal chaos into a plan-aware operating view: what blocks choice, what evidence supports it, what artifact was delivered, and which command moves next.</p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/free-check" className="inline-flex min-h-[3.25rem] items-center justify-center rounded-2xl border border-cyan-100 bg-[linear-gradient(135deg,#67e8f9,#60a5fa_55%,#a78bfa)] px-7 py-3 text-sm font-black text-slate-950 shadow-[0_18px_54px_rgba(14,165,233,.22),inset_0_1px_0_rgba(255,255,255,.86)]">Run Free Scan</Link>
            <Link href="/sample-report" className="inline-flex min-h-[3.25rem] items-center justify-center rounded-2xl border border-cyan-100 bg-white/78 px-7 py-3 text-sm font-black text-slate-950 shadow-[0_14px_38px_rgba(15,23,42,.08),inset_0_1px_0_rgba(255,255,255,.9)]">View Sample Report</Link>
          </div>
        </div>

        <div className="mt-12 overflow-hidden rounded-[2.7rem] border border-white/80 bg-white/82 p-2 shadow-[0_48px_140px_rgba(15,23,42,.23),inset_0_1px_0_rgba(255,255,255,.94)] backdrop-blur-xl sm:p-3">
          <div className="overflow-hidden rounded-[2.28rem] border border-slate-200/80 bg-[#f8fdff] shadow-[inset_0_1px_0_rgba(255,255,255,.94)]">
            <TopBar />
            <div className="grid bg-[radial-gradient(circle_at_80%_8%,rgba(186,230,253,.72),transparent_30%),linear-gradient(180deg,#ffffff_0%,#eff8ff_100%)] lg:grid-cols-[15.5rem_1fr]">
              <LeftRail />
              <main className="min-w-0 p-4 sm:p-5 lg:p-6">
                <div className="grid gap-4 xl:grid-cols-[1.08fr_.92fr]">
                  <section className="rounded-[1.8rem] border border-slate-200 bg-white/96 p-5 shadow-[0_18px_58px_rgba(15,23,42,.09)]">
                    <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-start">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[.22em] text-sky-700">Deep Review preview</p>
                        <h3 className="mt-2 max-w-3xl text-4xl font-black leading-[.95] tracking-[-.065em] text-slate-950">{report.title}</h3>
                        <p className="mt-3 max-w-3xl text-sm font-bold leading-6 text-slate-500">{choiceGap.summary}</p>
                      </div>
                      <PresenceGauge score={report.score} />
                    </div>
                    <div className="mt-5 grid gap-3 md:grid-cols-4">
                      {KPI_ITEMS.map(([label, value, detail, tone]) => <Kpi key={label} label={label} value={value} detail={detail} tone={tone as Tone} />)}
                    </div>
                  </section>

                  <section className="rounded-[1.8rem] border border-slate-950 bg-slate-950 p-5 text-white shadow-[0_26px_78px_rgba(15,23,42,.30)]">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div><p className="text-[10px] font-black uppercase tracking-[.2em] text-cyan-200">Executive readout</p><h4 className="mt-1 text-3xl font-black tracking-[-.06em] text-white">Fix choice friction first.</h4></div>
                      <span className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[.14em] text-cyan-100">evidence-led</span>
                    </div>
                    <div className="mt-5 grid gap-3 sm:grid-cols-3">
                      <DarkStat label="Risk" value="High" copy="Buyers can compare before they understand." />
                      <DarkStat label="Pressure" value="73" copy="Nearest competitor explains faster." />
                      <DarkStat label="Artifact" value="PDF" copy="Dashboard and email use one package." />
                    </div>
                    <div className="mt-5 rounded-2xl border border-white/10 bg-white/[.055] p-4">
                      <p className="text-sm font-semibold leading-6 text-slate-300">Every finding should route to a real artifact: Free Scan signal, Deep Review report, Build Fix work plan, completion report, or Monthly Control snapshot.</p>
                    </div>
                  </section>
                </div>

                <div className="mt-4 grid gap-4 xl:grid-cols-[.88fr_1.12fr]">
                  <Panel eyebrow="Signal severity" title="Quality split" badge="33% priority repair"><SeverityStack /></Panel>
                  <Panel eyebrow="Score lift plan" title="Current to controlled readiness" badge="42 to 82 target"><ScorePath /></Panel>
                </div>

                <div className="mt-4 grid gap-4 xl:grid-cols-[1.05fr_.95fr]">
                  <Panel eyebrow="Competitor pressure" title="Are alternatives easier to choose?" badge="competitor ahead"><BenchmarkBars /></Panel>
                  <Panel eyebrow="Buyer prompt readiness" title="Can search and customers understand the business?" badge="answer-ready view"><PromptReadiness /></Panel>
                </div>

                <div className="mt-4 grid gap-4 xl:grid-cols-[.92fr_1.08fr]">
                  <Panel eyebrow="Report vault" title="Plan artifacts" badge="dashboard + PDF"><ArtifactVault /></Panel>
                  <section className="rounded-[1.8rem] border border-slate-950 bg-slate-950 p-5 text-white shadow-[0_26px_78px_rgba(15,23,42,.28)]">
                    <div className="flex items-start justify-between gap-4"><div><p className="text-[10px] font-black uppercase tracking-[.2em] text-cyan-200">Repair Priorities</p><h4 className="mt-1 text-2xl font-black tracking-[-.055em] text-white">Impact-ordered fixes</h4></div><span className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[.14em] text-cyan-100">do first</span></div>
                    <div className="mt-4 grid gap-3">{report.repairQueue.slice(0, 3).map((item, index) => <Repair key={item.title} index={index + 1} title={item.title} reason={item.publicReason} />)}</div>
                  </section>
                </div>

                <section className="mt-4 rounded-[1.8rem] border border-slate-200 bg-white/96 p-5 shadow-[0_18px_58px_rgba(15,23,42,.09)]">
                  <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-[10px] font-black uppercase tracking-[.2em] text-sky-700">Signal intelligence matrix</p><h4 className="mt-1 text-2xl font-black tracking-[-.055em] text-slate-950">Where buyers lose confidence</h4></div><span className="rounded-full bg-slate-50 px-3 py-1.5 text-xs font-black text-slate-500">evidence first, action second</span></div>
                  <div className="mt-4 overflow-hidden rounded-2xl border border-slate-100">
                    <div className="hidden grid-cols-[1.05fr_.42fr_.62fr_1.3fr] bg-slate-50 px-4 py-3 text-[10px] font-black uppercase tracking-[.18em] text-slate-400 md:grid"><span>Signal</span><span>Score</span><span>Status</span><span>Recommended repair</span></div>
                    <div>{SIGNALS.map(([label, score, state, repair, tone]) => <SignalRow key={label} label={label} score={score} state={state} repair={repair} tone={tone as Tone} />)}</div>
                  </div>
                </section>

                <section className="mt-4 rounded-[1.8rem] border border-slate-200 bg-white/96 p-5 shadow-[0_18px_58px_rgba(15,23,42,.09)]">
                  <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-[10px] font-black uppercase tracking-[.2em] text-sky-700">Delivery lifecycle</p><h4 className="mt-1 text-2xl font-black tracking-[-.055em] text-slate-950">One approved package, multiple customer artifacts</h4></div><span className="rounded-full bg-cyan-50 px-3 py-1.5 text-xs font-black text-sky-700">vault ready</span></div>
                  <div className="mt-4 grid gap-3 md:grid-cols-5">{DELIVERY_STEPS.map((step, index) => <div key={step} className="rounded-2xl border border-slate-100 bg-slate-50 p-4"><span className="grid h-8 w-8 place-items-center rounded-xl bg-white text-xs font-black text-sky-700 shadow-sm">{index + 1}</span><p className="mt-3 text-sm font-black leading-5 text-slate-950">{step}</p></div>)}</div>
                </section>
              </main>
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes fillBar{0%{transform:scaleX(.35)}55%,100%{transform:scaleX(1)}}.dash-fill{transform-origin:left;animation:fillBar 5.2s ease-in-out infinite}@media (prefers-reduced-motion:reduce){.dash-fill{animation:none}}`}</style>
    </section>
  );
}

function TopBar(){return <div className="flex items-center justify-between gap-3 border-b border-slate-200/80 bg-white/94 px-4 py-3"><div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-slate-950 text-[10px] font-black text-cyan-100">CQ</span><div className="hidden sm:block"><p className="text-xs font-black text-slate-950">Cendorq Intelligence</p><p className="text-[10px] font-bold uppercase tracking-[.16em] text-slate-400">customer command preview</p></div></div><div className="hidden rounded-full border border-slate-200 bg-slate-50 px-5 py-2 text-xs font-bold text-slate-500 md:block">cendorq.com/customer/command-center</div><div className="flex items-center gap-2"><span className="hidden rounded-full bg-slate-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[.14em] text-slate-500 sm:inline-flex">PDF</span><span className="rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[.18em] text-sky-700">Run scan</span></div></div>}
function LeftRail(){return <aside className="border-b border-slate-200/80 bg-white/72 p-4 backdrop-blur-xl lg:border-b-0 lg:border-r"><nav className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:gap-2" aria-label="Command preview navigation">{NAV_ITEMS.map((item) => <span key={item} className={item === "Command" ? "shrink-0 rounded-2xl bg-slate-950 px-4 py-3 text-xs font-black text-white shadow-[0_14px_30px_rgba(15,23,42,.14)]" : item === "Repair" ? "shrink-0 rounded-2xl bg-cyan-50 px-4 py-3 text-xs font-black text-sky-700" : "shrink-0 rounded-2xl px-4 py-3 text-xs font-black text-slate-500"}>{item}</span>)}</nav><div className="mt-5 hidden rounded-[1.35rem] border border-cyan-100 bg-cyan-50 p-4 lg:block"><p className="text-[10px] font-black uppercase tracking-[.18em] text-sky-700">Plan route</p><p className="mt-2 text-2xl font-black tracking-[-.06em] text-slate-950">Deep Review</p><p className="mt-2 text-xs font-bold leading-5 text-slate-500">Evidence-backed report before paid repair work.</p></div><div className="mt-3 hidden rounded-[1.35rem] border border-slate-200 bg-white p-4 lg:block"><p className="text-[10px] font-black uppercase tracking-[.18em] text-slate-400">Delivery</p><div className="mt-3 grid gap-2 text-xs font-black text-slate-600"><span>Dashboard ready</span><span>PDF prepared</span><span>Email queued</span></div></div></aside>}
function Panel({eyebrow,title,badge,children}:{eyebrow:string;title:string;badge:string;children:React.ReactNode}){return <section className="rounded-[1.8rem] border border-slate-200 bg-white/96 p-5 shadow-[0_18px_58px_rgba(15,23,42,.09)]"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-[10px] font-black uppercase tracking-[.2em] text-sky-700">{eyebrow}</p><h4 className="mt-1 text-2xl font-black tracking-[-.055em] text-slate-950">{title}</h4></div><span className="rounded-full bg-slate-50 px-3 py-1.5 text-xs font-black text-slate-500">{badge}</span></div>{children}</section>}
function PresenceGauge({score}:{score:number}){return <div className="grid min-w-[11.5rem] place-items-center rounded-[1.55rem] bg-slate-950 px-6 py-5 text-center text-white shadow-[0_22px_56px_rgba(15,23,42,.22)]"><div className="grid h-28 w-28 place-items-center rounded-full bg-[conic-gradient(#fb7185_0_42%,rgba(255,255,255,.14)_42%_100%)]"><span className="grid h-20 w-20 place-items-center rounded-full bg-slate-950"><span><b className="block text-5xl tracking-[-.1em]">{score}</b><em className="block text-[10px] not-italic font-black uppercase tracking-[.12em] text-cyan-200">score</em></span></span></div><p className="mt-3 text-[10px] font-bold text-slate-300">visible, not easy to choose</p></div>}
function Kpi({label,value,detail,tone}:{label:string;value:string;detail:string;tone:Tone}){const c=tone==="red"?"border-rose-100 bg-rose-50 text-rose-700":tone==="violet"?"border-indigo-100 bg-indigo-50 text-indigo-700":tone==="cyan"?"border-cyan-100 bg-cyan-50 text-sky-700":"border-slate-100 bg-slate-50 text-slate-600";return <article className={`rounded-2xl border p-4 shadow-[0_14px_34px_rgba(15,23,42,.06)] ${c}`}><p className="text-[10px] font-black uppercase tracking-[.18em]">{label}</p><p className="mt-1 text-4xl font-black tracking-[-.08em] text-slate-950">{value}</p><p className="text-xs font-bold text-slate-500">{detail}</p></article>}
function DarkStat({label,value,copy}:{label:string;value:string;copy:string}){return <div className="rounded-2xl border border-white/10 bg-white/[.055] p-4"><p className="text-[10px] font-black uppercase tracking-[.18em] text-cyan-200">{label}</p><p className="mt-1 text-3xl font-black tracking-[-.07em] text-white">{value}</p><p className="mt-1 text-[11px] font-semibold leading-5 text-slate-300">{copy}</p></div>}
function SeverityStack(){return <div className="mt-5 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 p-3"><div className="flex h-16 overflow-hidden rounded-xl bg-white shadow-inner">{SEVERITY.map(([label,value,tone]) => <span key={label} className={`dash-fill h-full ${tone === "red" ? "bg-rose-400" : tone === "violet" ? "bg-indigo-400" : "bg-cyan-400"}`} style={{width:`${value}%`}} />)}</div><div className="mt-3 grid gap-2 text-xs font-black">{SEVERITY.map(([label,value,tone]) => <Legend key={label} label={label} value={`${value}%`} tone={tone as Tone} />)}</div></div>}
function ScorePath(){return <div className="mt-5 grid gap-4">{SCORE_LIFT.map(([label,score,note]) => <BarRow key={label} label={label} score={score} note={note} tone={score < 50 ? "red" : score < 75 ? "cyan" : "violet"} />)}</div>}
function BenchmarkBars(){return <div className="mt-5 grid gap-4">{COMPETITORS.map(([label,score,note,tone]) => <BarRow key={label} label={label} score={score} note={note} tone={tone as Tone} />)}</div>}
function PromptReadiness(){return <div className="mt-5 grid gap-3 sm:grid-cols-2">{PROMPTS.map(([label,score,note,tone]) => <div key={label} className="rounded-2xl border border-slate-100 bg-slate-50 p-4"><div className="flex items-start justify-between gap-3"><div><p className="text-sm font-black text-slate-950">{label}</p><p className="mt-1 text-xs font-bold leading-5 text-slate-500">{note}</p></div><p className={`text-2xl font-black tracking-[-.06em] ${tone === "red" ? "text-rose-600" : tone === "violet" ? "text-indigo-600" : "text-sky-600"}`}>{score}%</p></div><Meter score={score} tone={tone as Tone} /></div>)}</div>}
function ArtifactVault(){return <div className="mt-5 grid gap-3 sm:grid-cols-2">{ARTIFACTS.map(([title,status,detail]) => <div key={title} className="rounded-2xl border border-slate-100 bg-slate-50 p-4"><div className="flex items-start justify-between gap-3"><p className="text-sm font-black text-slate-950">{title}</p><span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-black uppercase tracking-[.12em] text-sky-700">{status}</span></div><p className="mt-2 text-xs font-bold leading-5 text-slate-500">{detail}</p></div>)}</div>}
function BarRow({label,score,note,tone}:{label:string;score:number;note:string;tone:Tone}){return <div className="grid gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 sm:grid-cols-[10rem_1fr_4rem] sm:items-center"><div><p className="text-sm font-black text-slate-950">{label}</p><p className="text-xs font-bold text-slate-500">{note}</p></div><Meter score={score} tone={tone} /><p className="text-right text-3xl font-black tracking-[-.08em] text-slate-950">{score}</p></div>}
function Meter({score,tone}:{score:number;tone:Tone}){return <div className="h-4 overflow-hidden rounded-full bg-white shadow-inner"><span className={`dash-fill block h-full rounded-full ${tone === "red" ? "bg-rose-400" : tone === "violet" ? "bg-indigo-400" : tone === "cyan" ? "bg-cyan-400" : "bg-slate-400"}`} style={{width:`${score}%`}} /></div>}
function Legend({label,value,tone}:{label:string;value:string;tone:Tone}){return <div className="flex items-center justify-between gap-3 rounded-xl bg-white px-3 py-2"><span className="flex items-center gap-2 text-slate-600"><span className={`h-2.5 w-2.5 rounded-full ${tone === "red" ? "bg-rose-400" : tone === "violet" ? "bg-indigo-400" : tone === "cyan" ? "bg-cyan-400" : "bg-slate-400"}`}/>{label}</span><span className="text-slate-950">{value}</span></div>}
function SignalRow({label,score,state,repair,tone}:{label:string;score:number;state:string;repair:string;tone:Tone}){const red=tone==="red";const violet=tone==="violet";return <div className="grid gap-3 border-t border-slate-100 bg-white px-4 py-4 md:grid-cols-[1.05fr_.42fr_.62fr_1.3fr] md:items-center"><div><p className="text-sm font-black text-slate-950">{label}</p><div className="mt-2 md:hidden"><Meter score={score} tone={tone} /></div></div><div><p className={`text-2xl font-black tracking-[-.06em] ${red?"text-rose-600":violet?"text-indigo-600":"text-sky-600"}`}>{score}%</p><div className="mt-1 hidden md:block"><Meter score={score} tone={tone} /></div></div><p className={`w-fit rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[.14em] ${red?"bg-rose-50 text-rose-700":violet?"bg-indigo-50 text-indigo-700":"bg-cyan-50 text-sky-700"}`}>{state}</p><p className="text-sm font-bold leading-5 text-slate-600">{repair}</p></div>}
function Repair({index,title,reason}:{index:number;title:string;reason:string}){return <div className="grid grid-cols-[auto_1fr] gap-3 rounded-2xl border border-white/10 bg-white/[.055] p-3"><span className="grid h-8 w-8 place-items-center rounded-xl bg-cyan-300 text-xs font-black text-slate-950">{index}</span><div><p className="text-sm font-black leading-5 text-white">{title}</p><p className="mt-1 text-[11px] font-semibold leading-5 text-slate-300">{reason}</p></div></div>}
