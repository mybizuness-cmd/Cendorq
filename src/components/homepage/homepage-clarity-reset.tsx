import Link from "next/link";

const PRIMARY = "inline-flex min-h-12 items-center justify-center rounded-2xl border border-cyan-100/90 bg-[linear-gradient(135deg,#67e8f9_0%,#60a5fa_55%,#a78bfa_100%)] px-7 py-3 text-sm font-black text-slate-950 shadow-[0_18px_55px_rgba(14,165,233,.24),inset_0_1px_0_rgba(255,255,255,.88)] transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:min-h-14 sm:px-9 sm:text-base";
const SECONDARY = "inline-flex min-h-12 items-center justify-center rounded-2xl border border-cyan-100/90 bg-white/72 px-7 py-3 text-sm font-black text-slate-950 shadow-[0_14px_38px_rgba(15,23,42,.08),inset_0_1px_0_rgba(255,255,255,.9)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:min-h-14 sm:px-9 sm:text-base";

const COMMANDS = ["Scan", "Report", "Choice Gap", "Repair Queue", "Control"] as const;
const SIGNALS = [
  ["Search Presence", "58", "Can the business be located and considered?", "needs structure", "cyan"],
  ["Understanding", "39", "Can the offer be understood in seconds?", "weak signal", "red"],
  ["Trust", "44", "Is proof close to the decision point?", "proof buried", "red"],
  ["Choice", "31", "Is the better choice obvious under comparison?", "competitor clearer", "red"],
  ["Action", "52", "Can the next step happen without friction?", "path uneven", "violet"],
] as const;
const PROOF = ["Website", "Reviews", "Listings", "Local proof", "FAQs", "Schema", "Offers", "Competitors"] as const;

export function HomepageClarityReset() {
  return (
    <main data-cendorq-homepage="final-master-presence-command-hero" className="relative isolate min-h-screen overflow-x-hidden bg-[#eef8ff] text-slate-950">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_8%,rgba(186,230,253,.96),transparent_29%),radial-gradient(circle_at_84%_10%,rgba(219,234,254,.94),transparent_34%),radial-gradient(circle_at_70%_62%,rgba(196,181,253,.32),transparent_36%),linear-gradient(180deg,#ffffff_0%,#eff9ff_40%,#e4f7ff_76%,#f8fcff_100%)]" />
      <div className="absolute inset-0 -z-10 opacity-[.38] [background-image:radial-gradient(circle,rgba(14,165,233,.18)_0_1px,transparent_1.5px),linear-gradient(rgba(14,165,233,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,.04)_1px,transparent_1px)] [background-size:32px_32px,76px_76px,76px_76px]" />
      <div className="absolute -left-28 top-4 -z-10 h-[34rem] w-[34rem] rounded-full bg-cyan-200/50 blur-[104px]" />
      <div className="absolute -right-28 top-0 -z-10 h-[36rem] w-[36rem] rounded-full bg-sky-200/54 blur-[110px]" />

      <section className="mx-auto grid min-h-[calc(100svh-4.5rem)] w-full max-w-[112rem] items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[.86fr_1.14fr] lg:gap-12 lg:px-8 lg:py-14 xl:px-10" aria-label="Cendorq AI Search Presence Repair homepage">
        <div className="relative z-10 max-w-[49rem]">
          <p className="inline-flex rounded-full border border-cyan-100 bg-white/82 px-4 py-2 text-[11px] font-black uppercase tracking-[.24em] text-sky-700 shadow-[0_12px_34px_rgba(14,165,233,.1)] backdrop-blur-xl">AI Search Presence Repair</p>
          <h1 className="mt-6 max-w-5xl text-[clamp(3.15rem,11vw,7.45rem)] font-black leading-[.88] tracking-[-.09em] text-slate-950">Make your business easier to <span className="bg-[linear-gradient(100deg,#0284c7_0%,#2563eb_52%,#7c3aed_100%)] bg-clip-text text-transparent">understand, trust, and choose.</span></h1>
          <p className="mt-6 max-w-[43rem] text-base font-semibold leading-8 text-slate-650 sm:text-xl sm:leading-9">Cendorq scans the public signals that shape whether customers and answer engines can understand your business, trust it, compare it, and take action.</p>
          <p className="mt-4 max-w-[41rem] text-sm font-semibold leading-7 text-slate-500 sm:text-base sm:leading-8">The result is not a generic score. It is a Presence Report, a Choice Gap, and a repair path that tells you what weakens confidence and what to fix first.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4"><Link href="/free-check" className={PRIMARY}>Run Free Scan <span aria-hidden="true" className="ml-4 text-2xl leading-none">→</span></Link><Link href="/sample-report" className={SECONDARY}>See Sample Report</Link></div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <HeroProof value="5" label="choice pillars" />
            <HeroProof value="1" label="next safe move" />
            <HeroProof value="0" label="fake ranking promises" />
          </div>
        </div>

        <section className="relative overflow-hidden rounded-[2.35rem] border border-white/80 bg-white/72 p-2 shadow-[0_46px_130px_rgba(15,23,42,.22),inset_0_1px_0_rgba(255,255,255,.95)] backdrop-blur-2xl" aria-label="Cendorq Presence Report command preview">
          <div className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-[#f8fdff]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white/90 px-4 py-3">
              <div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-slate-950 text-[10px] font-black text-cyan-200">CQ</span><div><p className="text-xs font-black text-slate-950">Presence Command</p><p className="text-[10px] font-bold uppercase tracking-[.18em] text-slate-400">live scan preview</p></div></div>
              <Link href="/free-check" className="rounded-full bg-slate-950 px-4 py-2 text-xs font-black text-cyan-100 shadow-[0_12px_28px_rgba(15,23,42,.22)]">Run Free Scan</Link>
            </div>

            <div className="grid gap-4 p-4 sm:p-5 xl:grid-cols-[.92fr_1.08fr]">
              <div className="rounded-[1.65rem] border border-slate-200 bg-white p-5 shadow-[0_18px_52px_rgba(15,23,42,.08)]">
                <p className="text-[10px] font-black uppercase tracking-[.22em] text-sky-700">Presence Report</p>
                <div className="mt-4 grid gap-4 sm:grid-cols-[auto_1fr] sm:items-center xl:grid-cols-1">
                  <div className="relative grid h-40 w-40 place-items-center rounded-full border border-cyan-100 bg-[conic-gradient(from_210deg,#ef4444_0deg,#f87171_105deg,#38bdf8_106deg,#60a5fa_210deg,#e0f2fe_211deg,#e0f2fe_360deg)] p-3 shadow-[0_20px_55px_rgba(14,165,233,.15)]">
                    <div className="grid h-full w-full place-items-center rounded-full bg-white shadow-[inset_0_1px_0_rgba(255,255,255,.9)]"><div className="text-center"><p className="text-5xl font-black tracking-[-.08em] text-slate-950">42</p><p className="mt-1 text-[10px] font-black uppercase tracking-[.18em] text-red-500">high friction</p></div></div>
                  </div>
                  <div><h2 className="text-3xl font-black tracking-[-.06em] text-slate-950">Visible, but not easy to choose.</h2><p className="mt-3 text-sm font-semibold leading-6 text-slate-500">The business exists online, but the first-screen explanation, proof placement, and next action are not strong enough under comparison.</p></div>
                </div>
              </div>

              <div className="grid gap-3">
                {SIGNALS.map(([label, score, copy, state, tone]) => <SignalRow key={label} label={label} score={score} copy={copy} state={state} tone={tone} />)}
              </div>
            </div>

            <div className="grid gap-4 border-t border-slate-200 bg-white/64 p-4 sm:grid-cols-[1.05fr_.95fr] sm:p-5">
              <div className="rounded-[1.55rem] border border-slate-200 bg-white p-4 shadow-[0_14px_42px_rgba(15,23,42,.07)]">
                <p className="text-[10px] font-black uppercase tracking-[.22em] text-sky-700">Choice Gap</p>
                <h3 className="mt-2 text-2xl font-black tracking-[-.055em] text-slate-950">Competitors become easier to choose before you get the call.</h3>
                <p className="mt-3 text-sm font-semibold leading-6 text-slate-500">Cendorq shows where clarity, proof, comparison, or action breaks the path.</p>
                <div className="mt-4 flex flex-wrap gap-2">{PROOF.map((item) => <span key={item} className="rounded-full border border-cyan-100 bg-cyan-50/70 px-3 py-1.5 text-[11px] font-black text-sky-800">{item}</span>)}</div>
              </div>
              <div className="rounded-[1.55rem] border border-slate-950 bg-slate-950 p-4 text-white shadow-[0_22px_62px_rgba(15,23,42,.28)]">
                <p className="text-[10px] font-black uppercase tracking-[.22em] text-cyan-200">Repair Queue</p>
                <h3 className="mt-2 text-2xl font-black tracking-[-.055em] text-white">Fix the first decision break.</h3>
                <div className="mt-4 grid gap-2">{COMMANDS.map((item, index) => <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.055] p-3"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white/10 text-xs font-black text-cyan-100">{index + 1}</span><span className="text-sm font-black text-white">{item}</span></div>)}</div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

function HeroProof({ value, label }: { value: string; label: string }) {
  return <div className="rounded-2xl border border-white/80 bg-white/70 p-4 shadow-[0_14px_40px_rgba(15,23,42,.08)] backdrop-blur-xl"><p className="text-3xl font-black tracking-[-.06em] text-slate-950">{value}</p><p className="mt-1 text-xs font-black uppercase tracking-[.15em] text-slate-500">{label}</p></div>;
}

function SignalRow({ label, score, copy, state, tone }: { label: string; score: string; copy: string; state: string; tone: "cyan" | "red" | "violet" }) {
  const bar = tone === "red" ? "from-red-500 to-rose-300" : tone === "violet" ? "from-violet-500 to-sky-300" : "from-cyan-400 to-blue-500";
  const pill = tone === "red" ? "bg-red-50 text-red-600" : tone === "violet" ? "bg-violet-50 text-violet-600" : "bg-cyan-50 text-sky-700";
  return (
    <article className="rounded-[1.35rem] border border-slate-200 bg-white p-4 shadow-[0_14px_42px_rgba(15,23,42,.07)]">
      <div className="flex items-start justify-between gap-4"><div><h3 className="text-base font-black tracking-[-.03em] text-slate-950">{label}</h3><p className="mt-1 text-xs font-semibold leading-5 text-slate-500">{copy}</p></div><span className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[.12em] ${pill}`}>{state}</span></div>
      <div className="mt-4 flex items-center gap-3"><span className="w-10 text-2xl font-black tracking-[-.06em] text-slate-950">{score}</span><div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full bg-gradient-to-r ${bar}`} style={{ width: `${score}%` }} /></div></div>
    </article>
  );
}
