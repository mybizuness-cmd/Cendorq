import Link from "next/link";

const SIGNALS = ["Website", "Reviews", "Listings", "FAQs", "Schema", "Offers", "Competitors"] as const;
const DASHBOARD_ITEMS = [
  ["Choice gap", "2 blockers", "Trust and action path need repair", "red"],
  ["Best signal", "Understand", "Services and location are readable", "cyan"],
  ["Next move", "Repair CTA", "Simplify request path first", "violet"],
] as const;

export function CendorqProductMotionCinema() {
  return (
    <section data-cendorq-motion-cinema="dashboard-walkthrough" className="relative isolate overflow-hidden bg-[#eef8ff] px-4 py-14 text-slate-950 sm:px-6 lg:px-8 lg:py-20" aria-label="Cendorq native dashboard walkthrough">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_14%_12%,rgba(186,230,253,.92),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(219,234,254,.9),transparent_34%),linear-gradient(180deg,#fbfeff_0%,#eaf8ff_54%,#f7fbff_100%)]" />
      <div className="demo-orb absolute -left-28 top-14 -z-10 h-[30rem] w-[30rem] rounded-full bg-cyan-200/46 blur-[100px]" />
      <div className="demo-orb demo-orb-delay absolute -right-32 top-28 -z-10 h-[30rem] w-[30rem] rounded-full bg-blue-200/48 blur-[116px]" />

      <div className="mx-auto grid max-w-[104rem] gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
        <div className="max-w-2xl">
          <p className="inline-flex rounded-full border border-cyan-100 bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-sky-700 shadow-[0_12px_34px_rgba(14,165,233,.1)]">Guided product demo</p>
          <h2 className="mt-5 text-[clamp(2.45rem,8vw,5.25rem)] font-black leading-[.94] tracking-[-.078em] text-slate-950">From free scan to customer dashboard in one clear path.</h2>
          <p className="mt-5 max-w-xl text-base font-semibold leading-7 text-slate-600 sm:text-lg sm:leading-8">The motion should feel like a real Cendorq walkthrough: scan the business, process public signals, enter the dashboard, and reveal the repair queue that tells the owner what to fix first.</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/free-check" className="inline-flex min-h-13 items-center justify-center rounded-2xl border border-cyan-100 bg-[linear-gradient(135deg,#67e8f9,#60a5fa_55%,#a78bfa)] px-7 py-3 text-sm font-black text-slate-950 shadow-[0_18px_54px_rgba(14,165,233,.22),inset_0_1px_0_rgba(255,255,255,.86)] transition hover:-translate-y-0.5">Run Free Scan</Link>
            <Link href="/plans" className="inline-flex min-h-13 items-center justify-center rounded-2xl border border-cyan-100 bg-white/74 px-7 py-3 text-sm font-black text-slate-950 shadow-[0_14px_38px_rgba(15,23,42,.08),inset_0_1px_0_rgba(255,255,255,.9)] transition hover:-translate-y-0.5">View Plans</Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.1rem] border border-white/80 bg-white/72 p-2 shadow-[0_30px_90px_rgba(15,23,42,.18),inset_0_1px_0_rgba(255,255,255,.9)] backdrop-blur-xl sm:p-3">
          <div className="relative overflow-hidden rounded-[1.8rem] border border-slate-200/80 bg-[#f8fdff] shadow-[inset_0_1px_0_rgba(255,255,255,.92)]">
            <div className="flex items-center justify-between border-b border-slate-200/80 bg-white/86 px-4 py-3">
              <div className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-rose-300" /><span className="h-3 w-3 rounded-full bg-amber-300" /><span className="h-3 w-3 rounded-full bg-emerald-300" /></div>
              <div className="hidden rounded-full border border-slate-200 bg-slate-50 px-5 py-2 text-xs font-bold text-slate-500 sm:block">cendorq.com/dashboard/demo</div>
              <div className="rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[.18em] text-sky-700">live preview</div>
            </div>

            <div className="relative min-h-[38rem] overflow-hidden bg-[radial-gradient(circle_at_78%_18%,rgba(186,230,253,.54),transparent_32%),linear-gradient(180deg,#ffffff_0%,#eef8ff_100%)] p-4 sm:p-5 lg:min-h-[36rem]">
              <div className="demo-cursor absolute z-30 grid h-9 w-9 place-items-center rounded-full border border-white bg-slate-950 text-[10px] font-black text-white shadow-[0_18px_42px_rgba(15,23,42,.28)]">AI</div>
              <SceneScan />
              <SceneAnalysis />
              <SceneDashboard />
            </div>
          </div>
        </div>
      </div>

      <style>{`@keyframes demoOrb{0%,100%{transform:translate3d(0,0,0) scale(1);opacity:.66}50%{transform:translate3d(20px,18px,0) scale(1.06);opacity:1}}@keyframes sceneOne{0%,27%{opacity:1;transform:translateY(0) scale(1)}33%,100%{opacity:0;transform:translateY(-20px) scale(.985)}}@keyframes sceneTwo{0%,29%{opacity:0;transform:translateY(22px) scale(.985)}35%,61%{opacity:1;transform:translateY(0) scale(1)}67%,100%{opacity:0;transform:translateY(-18px) scale(.985)}}@keyframes sceneThree{0%,63%{opacity:0;transform:translateY(24px) scale(.985)}70%,100%{opacity:1;transform:translateY(0) scale(1)}}@keyframes cursorTour{0%,18%{left:18%;top:72%}36%,52%{left:72%;top:36%}70%,100%{left:64%;top:22%}}@keyframes pulseCard{0%,100%{transform:translateY(0);box-shadow:inset 0 1px 0 rgba(255,255,255,.9),0 12px 34px rgba(15,23,42,.08)}50%{transform:translateY(-4px);box-shadow:inset 0 1px 0 rgba(255,255,255,.95),0 18px 44px rgba(14,165,233,.14)}}@keyframes fillBar{0%{transform:scaleX(.18)}45%,100%{transform:scaleX(1)}}@keyframes radarSpin{to{transform:rotate(360deg)}}.demo-orb{animation:demoOrb 10s ease-in-out infinite}.demo-orb-delay{animation-delay:-4s}.scene-scan{animation:sceneOne 13.5s ease-in-out infinite}.scene-analysis{animation:sceneTwo 13.5s ease-in-out infinite}.scene-dashboard{animation:sceneThree 13.5s ease-in-out infinite}.demo-cursor{animation:cursorTour 13.5s ease-in-out infinite}.demo-card{animation:pulseCard 4.8s ease-in-out infinite}.demo-bar-fill{transform-origin:left;animation:fillBar 4s ease-in-out infinite}.demo-radar-beam{animation:radarSpin 4.5s linear infinite}@media (prefers-reduced-motion:reduce){.demo-orb,.scene-scan,.scene-analysis,.scene-dashboard,.demo-cursor,.demo-card,.demo-bar-fill,.demo-radar-beam{animation:none}.scene-analysis,.scene-dashboard{opacity:1;position:relative!important;transform:none!important}.scene-scan{position:relative!important}}`}</style>
    </section>
  );
}

function SceneScan() {
  return (
    <div className="scene-scan absolute inset-4 sm:inset-5">
      <div className="grid h-full gap-4 lg:grid-cols-[.9fr_1.1fr]">
        <div className="rounded-[1.5rem] border border-slate-200 bg-white/88 p-5 shadow-[0_18px_54px_rgba(15,23,42,.1)]">
          <p className="text-[10px] font-black uppercase tracking-[.22em] text-sky-700">Free scan intake</p>
          <h3 className="mt-3 text-4xl font-black leading-[.95] tracking-[-.06em] text-slate-950">Start with what customers see.</h3>
          <div className="mt-6 grid gap-3">
            {['Business name', 'Website', 'Service area', 'Main service'].map((item) => <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-500">{item}</div>)}
          </div>
          <div className="mt-5 rounded-2xl bg-slate-950 px-5 py-4 text-center text-sm font-black text-white shadow-[0_18px_42px_rgba(15,23,42,.18)]">Run Free Scan</div>
        </div>
        <div className="rounded-[1.5rem] border border-cyan-100 bg-cyan-50/70 p-5 shadow-[0_18px_54px_rgba(14,165,233,.12)]">
          <p className="text-[10px] font-black uppercase tracking-[.22em] text-sky-700">Sources collected</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {SIGNALS.map((signal) => <div key={signal} className="demo-card rounded-2xl border border-white/80 bg-white/86 p-4 text-sm font-black text-slate-800">{signal}<div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100"><span className="demo-bar-fill block h-full rounded-full bg-cyan-400" /></div></div>)}
          </div>
        </div>
      </div>
    </div>
  );
}

function SceneAnalysis() {
  return (
    <div className="scene-analysis absolute inset-4 sm:inset-5">
      <div className="grid h-full gap-4 lg:grid-cols-[1fr_.9fr]">
        <div className="rounded-[1.5rem] border border-slate-800 bg-[#061122] p-5 text-white shadow-[0_24px_70px_rgba(15,23,42,.22)]">
          <div className="flex items-center justify-between gap-4"><div><p className="text-[10px] font-black uppercase tracking-[.24em] text-cyan-200">Analysis engine</p><h3 className="mt-2 text-4xl font-black leading-[.95] tracking-[-.06em]">Cendorq maps the choice gap.</h3></div><div className="relative h-32 w-32 shrink-0 rounded-full border border-cyan-300/28"><span className="absolute inset-5 rounded-full border border-cyan-300/20" /><span className="demo-radar-beam absolute left-1/2 top-1/2 h-1 w-20 origin-left bg-cyan-100 shadow-[0_0_28px_rgba(103,232,249,.95)]" /></div></div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {['Understand services', 'Verify trust', 'Compare nearby options', 'Find action friction'].map((item, index) => <div key={item} className="rounded-2xl border border-white/10 bg-white/[.055] p-4"><span className="text-[10px] font-black text-cyan-200">0{index + 1}</span><p className="mt-2 text-sm font-black">{item}</p><div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10"><span className={index % 2 ? 'demo-bar-fill block h-full rounded-full bg-rose-300' : 'demo-bar-fill block h-full rounded-full bg-cyan-300'} /></div></div>)}
          </div>
        </div>
        <div className="rounded-[1.5rem] border border-slate-200 bg-white/90 p-5 shadow-[0_18px_54px_rgba(15,23,42,.1)]">
          <p className="text-[10px] font-black uppercase tracking-[.22em] text-sky-700">Live findings</p>
          <div className="mt-5 space-y-3">
            {DASHBOARD_ITEMS.map(([label, value, copy, tone]) => <Finding key={label} label={label} value={value} copy={copy} tone={tone} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

function SceneDashboard() {
  return (
    <div className="scene-dashboard absolute inset-4 sm:inset-5">
      <div className="grid h-full gap-4 lg:grid-cols-[13rem_1fr]">
        <aside className="rounded-[1.5rem] border border-slate-200 bg-white/92 p-4 shadow-[0_18px_54px_rgba(15,23,42,.09)]">
          <p className="text-sm font-black text-slate-950">Cendorq</p>
          <div className="mt-6 grid gap-2 text-xs font-black text-slate-500"><span className="rounded-xl bg-slate-950 px-3 py-2 text-white">Dashboard</span><span className="rounded-xl px-3 py-2">Reports</span><span className="rounded-xl px-3 py-2">Repair Queue</span><span className="rounded-xl px-3 py-2">Billing</span></div>
        </aside>
        <main className="rounded-[1.5rem] border border-slate-200 bg-white/92 p-5 shadow-[0_18px_54px_rgba(15,23,42,.09)]">
          <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-[10px] font-black uppercase tracking-[.22em] text-sky-700">Customer dashboard</p><h3 className="mt-2 text-4xl font-black leading-[.95] tracking-[-.06em] text-slate-950">Repair queue is ready.</h3></div><div className="rounded-2xl bg-cyan-50 px-5 py-4 text-center"><p className="text-[10px] font-black uppercase tracking-[.18em] text-sky-700">Readiness</p><p className="text-4xl font-black text-slate-950">68</p></div></div>
          <div className="mt-6 grid gap-3 md:grid-cols-3">{DASHBOARD_ITEMS.map(([label, value, copy, tone]) => <Finding key={label} label={label} value={value} copy={copy} tone={tone} />)}</div>
          <div className="mt-5 rounded-2xl border border-rose-100 bg-rose-50 p-4"><p className="text-xs font-black uppercase tracking-[.18em] text-rose-700">Recommended next repair</p><p className="mt-2 text-xl font-black tracking-[-.04em] text-slate-950">Fix the request path so buyers know exactly how to call, book, or ask for help.</p></div>
        </main>
      </div>
    </div>
  );
}

function Finding({ label, value, copy, tone }: { label: string; value: string; copy: string; tone: string }) {
  const toneClass = tone === 'red' ? 'bg-rose-50 text-rose-700 border-rose-100' : tone === 'violet' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' : 'bg-cyan-50 text-sky-700 border-cyan-100';
  return <div className={`rounded-2xl border p-4 ${toneClass}`}><p className="text-[10px] font-black uppercase tracking-[.18em]">{label}</p><p className="mt-2 text-2xl font-black tracking-[-.04em] text-slate-950">{value}</p><p className="mt-1 text-xs font-bold leading-5 text-slate-600">{copy}</p></div>;
}
