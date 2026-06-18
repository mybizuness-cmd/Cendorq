import Link from "next/link";

const PRIMARY = "inline-flex min-h-12 items-center justify-center rounded-2xl border border-cyan-100 bg-[linear-gradient(135deg,#67e8f9_0%,#60a5fa_58%,#a78bfa_100%)] px-7 py-3 text-sm font-black text-slate-950 shadow-[0_18px_55px_rgba(14,165,233,.22),inset_0_1px_0_rgba(255,255,255,.88)] transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:min-h-14 sm:px-9 sm:text-base";
const SECONDARY = "inline-flex min-h-12 items-center justify-center rounded-2xl border border-cyan-100 bg-white/78 px-7 py-3 text-sm font-black text-slate-950 shadow-[0_14px_38px_rgba(15,23,42,.08),inset_0_1px_0_rgba(255,255,255,.9)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:min-h-14 sm:px-9 sm:text-base";

const SIGNALS = [
  ["Search Presence", "58", "Public facts can be located, but the signal is not strong enough."],
  ["Understanding", "39", "A first-time buyer needs too long to understand the offer."],
  ["Trust", "44", "Proof is present, but it appears after hesitation starts."],
  ["Choice", "31", "A nearby competitor becomes easier to choose."],
] as const;

const FILM_STEPS = [
  ["01", "Question", "Who should I trust near me?"],
  ["02", "Signal", "What does the public web make obvious?"],
  ["03", "Gap", "Where does the buyer lose confidence?"],
  ["04", "Repair", "What should change first?"],
] as const;

export function HomepageClarityReset() {
  return (
    <main data-cendorq-homepage="final-master-presence-product-film" className="relative isolate min-h-screen overflow-x-hidden bg-[#eef8ff] text-slate-950">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_6%,rgba(186,230,253,.95),transparent_30%),radial-gradient(circle_at_86%_8%,rgba(219,234,254,.92),transparent_34%),radial-gradient(circle_at_50%_90%,rgba(196,181,253,.26),transparent_38%),linear-gradient(180deg,#ffffff_0%,#eff9ff_42%,#e8f8ff_75%,#f8fcff_100%)]" />
      <div className="absolute inset-0 -z-10 opacity-[.20] [background-image:linear-gradient(rgba(14,165,233,.09)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,.07)_1px,transparent_1px)] [background-size:72px_72px]" />

      <section className="mx-auto flex min-h-[calc(100svh-4.5rem)] w-full max-w-[110rem] flex-col items-center px-4 py-9 sm:px-6 lg:px-8 lg:py-12 xl:px-10" aria-label="Cendorq AI Search Presence Repair homepage">
        <div className="mx-auto max-w-[68rem] text-center">
          <p className="text-[11px] font-black uppercase tracking-[.26em] text-sky-700">AI Search Presence Repair</p>
          <h1 className="mt-5 text-[clamp(2.85rem,7.2vw,6.3rem)] font-black leading-[.88] tracking-[-.09em] text-slate-950">Know why customers choose someone else.</h1>
          <p className="mx-auto mt-5 max-w-[52rem] text-base font-semibold leading-8 text-slate-600 sm:text-xl sm:leading-9">Cendorq turns public signals into a clear explanation of where customers and answer engines lose confidence, what it costs you, and what to repair first.</p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4"><Link href="/free-check" className={PRIMARY}>Run Free Scan <span aria-hidden="true" className="ml-4 text-xl leading-none">→</span></Link><Link href="/sample-report" className={SECONDARY}>See Sample Report</Link></div>
          <p className="mt-6 text-xs font-black uppercase tracking-[.18em] text-slate-500">Five choice signals. One next move. No fake ranking guarantees.</p>
        </div>

        <section className="mt-10 w-full overflow-hidden rounded-[2.35rem] border border-white/80 bg-white/78 p-2 shadow-[0_46px_140px_rgba(15,23,42,.20),inset_0_1px_0_rgba(255,255,255,.95)] backdrop-blur-2xl" aria-label="Cendorq cinematic scan preview">
          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[#f8fdff]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(125,211,252,.28),transparent_32%),radial-gradient(circle_at_82%_18%,rgba(167,139,250,.20),transparent_30%)]" />
            <div className="scan-light absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-transparent via-cyan-200/34 to-transparent" />
            <div className="relative grid gap-0 lg:grid-cols-[.34fr_.66fr]">
              <div className="border-b border-slate-200 bg-white/84 p-5 sm:p-6 lg:border-b-0 lg:border-r">
                <div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-[linear-gradient(135deg,#0f172a,#2563eb)] text-[10px] font-black text-cyan-100">CQ</span><div><p className="text-sm font-black text-slate-950">Presence Report in motion</p><p className="text-[10px] font-bold uppercase tracking-[.16em] text-slate-400">Live scan preview</p></div></div>
                <h2 className="mt-8 text-4xl font-black leading-[.95] tracking-[-.075em] text-slate-950 sm:text-5xl">The market is already answering before the buyer calls.</h2>
                <p className="mt-4 text-sm font-semibold leading-7 text-slate-500 sm:text-base">Cendorq reads the surface buyers see first, compares it to the decision they are trying to make, and shows the weak point in plain language.</p>
                <div className="mt-7 grid gap-4">{FILM_STEPS.map(([number, title, copy]) => <FilmStep key={title} number={number} title={title} copy={copy} />)}</div>
              </div>

              <div className="relative min-h-[34rem] p-5 sm:p-6">
                <div className="absolute inset-6 rounded-[1.8rem] border border-cyan-100/70 bg-white/58 shadow-[inset_0_1px_0_rgba(255,255,255,.95)]" />
                <div className="relative grid gap-4 xl:grid-cols-[.9fr_1.1fr]">
                  <div className="rounded-[1.55rem] border border-slate-200 bg-white/94 p-5 shadow-[0_18px_52px_rgba(15,23,42,.08)]">
                    <p className="text-[10px] font-black uppercase tracking-[.2em] text-sky-700">Buyer question</p>
                    <h3 className="mt-3 text-4xl font-black leading-[.95] tracking-[-.07em] text-slate-950">Who should I trust near me?</h3>
                    <p className="mt-4 text-sm font-semibold leading-6 text-slate-500">The business may be capable, but public signals make a competitor easier to understand and choose.</p>
                    <div className="mt-6 rounded-[1.35rem] border border-cyan-100 bg-cyan-50/56 p-4"><p className="text-[10px] font-black uppercase tracking-[.18em] text-sky-700">Choice Gap</p><p className="mt-2 text-xl font-black leading-6 tracking-[-.045em] text-slate-950">Competitor explains faster and proves sooner.</p></div>
                  </div>

                  <div className="rounded-[1.55rem] border border-slate-200 bg-white/94 p-5 shadow-[0_18px_52px_rgba(15,23,42,.08)]">
                    <div className="flex items-end justify-between gap-4"><div><p className="text-[10px] font-black uppercase tracking-[.2em] text-sky-700">Presence Score</p><h3 className="mt-1 text-5xl font-black tracking-[-.08em] text-slate-950">42</h3></div><p className="pb-2 text-xs font-black uppercase tracking-[.14em] text-red-500">High friction</p></div>
                    <div className="mt-5 grid gap-4">{SIGNALS.map(([label, score, copy]) => <SignalMeter key={label} label={label} score={score} copy={copy} />)}</div>
                  </div>
                </div>

                <div className="relative mt-4 rounded-[1.55rem] border border-slate-200 bg-white/94 p-5 shadow-[0_18px_52px_rgba(15,23,42,.08)]">
                  <p className="text-[10px] font-black uppercase tracking-[.2em] text-sky-700">Next repair</p>
                  <div className="mt-3 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end"><h3 className="text-3xl font-black leading-[.98] tracking-[-.065em] text-slate-950">Move proof into the decision point before adding more traffic.</h3><Link href="/free-check" className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-cyan-100 bg-slate-950 px-5 py-2 text-sm font-black text-cyan-100 shadow-[0_16px_42px_rgba(15,23,42,.2)]">Start scan</Link></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <style>{`@keyframes scanLight{0%{transform:translateX(-8rem);opacity:0}18%,70%{opacity:1}100%{transform:translateX(92rem);opacity:0}}.scan-light{animation:scanLight 6s ease-in-out infinite}@media (prefers-reduced-motion:reduce){.scan-light{animation:none;opacity:0}}`}</style>
      </section>
    </main>
  );
}

function FilmStep({ number, title, copy }: { number: string; title: string; copy: string }) {
  return <div className="grid grid-cols-[2.35rem_1fr] gap-3 border-t border-slate-100 pt-4"><p className="text-xs font-black text-sky-700">{number}</p><div><p className="text-sm font-black text-slate-950">{title}</p><p className="mt-1 text-xs font-semibold leading-5 text-slate-500">{copy}</p></div></div>;
}

function SignalMeter({ label, score, copy }: { label: string; score: string; copy: string }) {
  const isStrong = Number(score) >= 50;
  return <div><div className="flex items-end justify-between gap-3"><div><p className="text-sm font-black text-slate-950">{label}</p><p className="mt-1 text-xs font-semibold leading-5 text-slate-500">{copy}</p></div><span className="text-2xl font-black tracking-[-.06em] text-slate-950">{score}</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full bg-gradient-to-r ${isStrong ? "from-cyan-400 to-blue-500" : "from-rose-500 to-pink-300"}`} style={{ width: `${score}%` }} /></div></div>;
}
