import Link from "next/link";

const PRIMARY = "inline-flex min-h-12 items-center justify-center rounded-2xl border border-cyan-100 bg-[linear-gradient(135deg,#67e8f9_0%,#60a5fa_58%,#a78bfa_100%)] px-7 py-3 text-sm font-black text-slate-950 shadow-[0_18px_55px_rgba(14,165,233,.22),inset_0_1px_0_rgba(255,255,255,.88)] transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:min-h-14 sm:px-9 sm:text-base";
const SECONDARY = "inline-flex min-h-12 items-center justify-center rounded-2xl border border-cyan-100 bg-white/80 px-7 py-3 text-sm font-black text-slate-950 shadow-[0_14px_38px_rgba(15,23,42,.08),inset_0_1px_0_rgba(255,255,255,.9)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:min-h-14 sm:px-9 sm:text-base";

const SIGNALS = [
  ["Search Presence", "58", "found, but not clearly preferred"],
  ["Understanding", "39", "offer takes work to decode"],
  ["Trust", "44", "proof arrives too late"],
  ["Decision", "31", "competitor feels safer"],
  ["Action", "52", "next step is uneven"],
] as const;

const FLOW = [
  ["01", "Read the public surface", "Website, reviews, listings, proof, and FAQs are checked together."],
  ["02", "Find the confidence break", "Cendorq shows where another option starts feeling easier to trust."],
  ["03", "Repair the closest proof", "The next move fixes the weakest decision point first."],
] as const;

export function HomepageClarityReset() {
  return (
    <main data-cendorq-homepage="final-master-presence-product-film" className="relative isolate min-h-screen overflow-x-hidden bg-[#eef8ff] text-slate-950">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_14%_3%,rgba(186,230,253,.95),transparent_31%),radial-gradient(circle_at_86%_6%,rgba(219,234,254,.92),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eff9ff_44%,#e8f8ff_76%,#f8fcff_100%)]" />
      <div className="absolute inset-0 -z-10 opacity-[.15] [background-image:linear-gradient(rgba(14,165,233,.10)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,.08)_1px,transparent_1px)] [background-size:92px_92px]" />

      <section className="mx-auto flex min-h-[calc(100svh-4.5rem)] w-full max-w-[112rem] flex-col items-center px-4 py-9 sm:px-6 lg:px-8 lg:py-12 xl:px-10" aria-label="Cendorq AI Search Presence Repair homepage">
        <div className="mx-auto max-w-[70rem] text-center">
          <p className="text-[11px] font-black uppercase tracking-[.26em] text-sky-700">AI Search Presence Repair</p>
          <h1 className="mt-5 text-[clamp(2.85rem,7.2vw,6.35rem)] font-black leading-[.88] tracking-[-.09em] text-slate-950">Know why customers choose someone else.</h1>
          <p className="mx-auto mt-5 max-w-[53rem] text-base font-semibold leading-8 text-slate-600 sm:text-xl sm:leading-9">Cendorq scans what buyers and answer engines can see, shows where confidence breaks, and tells you what to repair first.</p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4"><Link href="/free-check" className={PRIMARY}>Run Free Scan <span aria-hidden="true" className="ml-4 text-xl leading-none">→</span></Link><Link href="/sample-report" className={SECONDARY}>See Sample Report</Link></div>
          <p className="mt-6 text-xs font-black uppercase tracking-[.18em] text-slate-500">Five decision signals. One next move. No fake ranking guarantees.</p>
        </div>

        <section className="mt-10 w-full overflow-hidden rounded-[2.55rem] border border-white/80 bg-white/66 p-2 shadow-[0_48px_150px_rgba(15,23,42,.17),inset_0_1px_0_rgba(255,255,255,.95)] backdrop-blur-2xl" aria-label="Cendorq cinematic scan preview">
          <div className="relative min-h-[38rem] overflow-hidden rounded-[2.15rem] border border-slate-200/90 bg-[#f8fdff]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_22%,rgba(125,211,252,.30),transparent_35%),radial-gradient(circle_at_78%_24%,rgba(167,139,250,.16),transparent_32%),linear-gradient(180deg,rgba(255,255,255,.84),rgba(239,250,255,.68))]" />
            <div className="scan-light absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-transparent via-cyan-200/38 to-transparent" />
            <div className="flow-line absolute left-[8%] right-[8%] top-1/2 hidden h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent lg:block" />

            <div className="relative grid min-h-[38rem] gap-0 lg:grid-cols-[.30fr_.47fr_.23fr]">
              <div className="p-5 sm:p-7 lg:border-r lg:border-slate-200/70">
                <div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-[linear-gradient(135deg,#0f172a,#2563eb)] text-[10px] font-black text-cyan-100">CQ</span><div><p className="text-sm font-black text-slate-950">Presence Report in motion</p><p className="text-[10px] font-bold uppercase tracking-[.16em] text-slate-400">Live scan preview</p></div></div>
                <h2 className="mt-9 text-4xl font-black leading-[.94] tracking-[-.075em] text-slate-950 sm:text-5xl">The market answers before the buyer calls.</h2>
                <p className="mt-5 text-sm font-semibold leading-7 text-slate-500 sm:text-base">Cendorq reads the public surface buyers see first and finds the first confidence break.</p>
                <div className="mt-8 space-y-5">{FLOW.map(([number, title, copy]) => <StageLine key={title} number={number} title={title} copy={copy} />)}</div>
              </div>

              <div className="relative min-h-[32rem] p-5 sm:p-8">
                <div className="absolute inset-x-8 top-12 h-px bg-gradient-to-r from-transparent via-cyan-200 to-transparent" />
                <div className="absolute inset-x-8 bottom-12 h-px bg-gradient-to-r from-transparent via-cyan-200 to-transparent" />
                <div className="relative mx-auto flex h-full max-w-[43rem] flex-col justify-center">
                  <p className="text-[10px] font-black uppercase tracking-[.2em] text-sky-700">Buyer question</p>
                  <h3 className="mt-3 text-[clamp(2.45rem,5.2vw,5.25rem)] font-black leading-[.88] tracking-[-.09em] text-slate-950">Which business feels safest to choose?</h3>
                  <p className="mt-5 max-w-[35rem] text-base font-semibold leading-8 text-slate-600">A capable business can still lose when public signals make a competitor easier to understand.</p>
                  <div className="mt-9 border-t border-slate-200 pt-7">
                    <p className="text-[10px] font-black uppercase tracking-[.2em] text-sky-700">Decision Gap</p>
                    <p className="mt-2 text-3xl font-black leading-[.95] tracking-[-.07em] text-slate-950">Competitor explains faster.</p>
                    <p className="mt-3 max-w-[36rem] text-sm font-semibold leading-7 text-slate-500">Repair Queue: move proof into the decision point before adding more traffic.</p>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-7 lg:border-l lg:border-slate-200/70">
                <p className="text-[10px] font-black uppercase tracking-[.2em] text-sky-700">Presence score</p>
                <div className="mt-3 flex items-end justify-between gap-4"><p className="text-6xl font-black tracking-[-.09em] text-slate-950">42</p><p className="pb-2 text-xs font-black uppercase tracking-[.16em] text-red-500">High friction</p></div>
                <div className="mt-8 grid gap-5">{SIGNALS.map(([label, score, copy]) => <SignalMeter key={label} label={label} score={score} copy={copy} />)}</div>
                <div className="mt-8 border-t border-slate-200 pt-5"><p className="text-xs font-black uppercase tracking-[.16em] text-slate-500">Next move</p><p className="mt-2 text-sm font-semibold leading-6 text-slate-600">Repair the public proof closest to the decision.</p></div>
              </div>
            </div>
          </div>
        </section>

        <style>{`@keyframes scanLight{0%{transform:translateX(-9rem);opacity:0}18%,70%{opacity:1}100%{transform:translateX(96rem);opacity:0}}@keyframes flowLine{0%,100%{opacity:.2;transform:scaleX(.72)}50%{opacity:1;transform:scaleX(1)}}.scan-light{animation:scanLight 6s ease-in-out infinite}.flow-line{animation:flowLine 5.8s ease-in-out infinite;transform-origin:center}@media (prefers-reduced-motion:reduce){.scan-light,.flow-line{animation:none}}`}</style>
      </section>
    </main>
  );
}

function StageLine({ number, title, copy }: { number: string; title: string; copy: string }) {
  return <div className="grid grid-cols-[2.5rem_1fr] gap-3 border-t border-slate-100 pt-4"><p className="text-xs font-black text-sky-700">{number}</p><div><p className="text-sm font-black text-slate-950">{title}</p><p className="mt-1 text-xs font-semibold leading-5 text-slate-500">{copy}</p></div></div>;
}

function SignalMeter({ label, score, copy }: { label: string; score: string; copy: string }) {
  const isStrong = Number(score) >= 50;
  return <div><div className="flex items-end justify-between gap-3"><div><p className="text-sm font-black text-slate-950">{label}</p><p className="mt-1 text-xs font-semibold leading-5 text-slate-500">{copy}</p></div><span className="text-2xl font-black tracking-[-.06em] text-slate-950">{score}</span></div><div className="mt-2 h-2 overflow-hidden bg-slate-100"><div className={`h-full bg-gradient-to-r ${isStrong ? "from-cyan-400 to-blue-500" : "from-rose-500 to-pink-300"}`} style={{ width: `${score}%` }} /></div></div>;
}
