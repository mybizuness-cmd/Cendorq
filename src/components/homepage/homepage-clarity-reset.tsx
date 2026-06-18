import Link from "next/link";

const PRIMARY = "inline-flex min-h-12 items-center justify-center rounded-2xl border border-cyan-100 bg-[linear-gradient(135deg,#67e8f9_0%,#60a5fa_58%,#a78bfa_100%)] px-7 py-3 text-sm font-black text-slate-950 shadow-[0_18px_55px_rgba(14,165,233,.22),inset_0_1px_0_rgba(255,255,255,.88)] transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:min-h-14 sm:px-9 sm:text-base";
const SECONDARY = "inline-flex min-h-12 items-center justify-center rounded-2xl border border-cyan-100 bg-white/78 px-7 py-3 text-sm font-black text-slate-950 shadow-[0_14px_38px_rgba(15,23,42,.08),inset_0_1px_0_rgba(255,255,255,.9)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:min-h-14 sm:px-9 sm:text-base";

const SIGNALS = [
  ["Search Presence", "58", "Can they find and place you?", "from-cyan-400 to-blue-500"],
  ["Understanding", "39", "Can they understand you fast?", "from-rose-500 to-pink-300"],
  ["Trust", "44", "Is proof close enough?", "from-rose-500 to-pink-300"],
  ["Choice", "31", "Are you easier to choose?", "from-rose-500 to-pink-300"],
  ["Action", "52", "Can they take the next step?", "from-cyan-400 to-blue-500"],
] as const;

const STORY = [
  ["Scan", "Cendorq reads the public signals customers and answer engines use before a call happens."],
  ["Explain", "The report shows the exact point where clarity, trust, comparison, or action breaks."],
  ["Repair", "The queue turns the gap into the next safest move instead of a pile of generic tasks."],
] as const;

export function HomepageClarityReset() {
  return (
    <main data-cendorq-homepage="final-master-presence-product-film" className="relative isolate min-h-screen overflow-x-hidden bg-[#eef8ff] text-slate-950">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_8%,rgba(186,230,253,.92),transparent_30%),radial-gradient(circle_at_82%_8%,rgba(219,234,254,.9),transparent_34%),radial-gradient(circle_at_54%_82%,rgba(196,181,253,.25),transparent_38%),linear-gradient(180deg,#ffffff_0%,#eff9ff_42%,#e8f8ff_75%,#f8fcff_100%)]" />
      <div className="absolute inset-0 -z-10 opacity-[.25] [background-image:radial-gradient(circle,rgba(14,165,233,.16)_0_1px,transparent_1.5px)] [background-size:32px_32px]" />

      <section className="mx-auto grid min-h-[calc(100svh-4.5rem)] w-full max-w-[104rem] items-center gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[.86fr_1.14fr] lg:px-8 lg:py-12 xl:px-10" aria-label="Cendorq AI Search Presence Repair homepage">
        <div className="relative z-10 max-w-[44rem]">
          <p className="text-[11px] font-black uppercase tracking-[.24em] text-sky-700">AI Search Presence Repair</p>
          <h1 className="mt-5 max-w-4xl text-[clamp(2.75rem,7vw,5.8rem)] font-black leading-[.9] tracking-[-.085em] text-slate-950">Know why customers choose someone else.</h1>
          <p className="mt-5 max-w-[40rem] text-base font-semibold leading-8 text-slate-600 sm:text-lg sm:leading-8">Cendorq scans the public signals that shape whether customers and answer engines can understand, trust, compare, and choose your business.</p>
          <p className="mt-3 max-w-[38rem] text-sm font-semibold leading-7 text-slate-500 sm:text-base sm:leading-7">Then it turns the first weak signal into a Presence Report, a Choice Gap, and a repair queue you can act on.</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:gap-4"><Link href="/free-check" className={PRIMARY}>Run Free Scan <span aria-hidden="true" className="ml-4 text-xl leading-none">→</span></Link><Link href="/sample-report" className={SECONDARY}>See Sample Report</Link></div>
          <p className="mt-6 max-w-[36rem] text-xs font-black uppercase tracking-[.18em] text-slate-500">Five choice signals. One next move. No fake ranking guarantees.</p>
        </div>

        <section className="relative overflow-hidden rounded-[2.15rem] border border-white/80 bg-white/78 p-2 shadow-[0_42px_120px_rgba(15,23,42,.20),inset_0_1px_0_rgba(255,255,255,.95)] backdrop-blur-2xl" aria-label="Cendorq live scan preview">
          <div className="relative overflow-hidden rounded-[1.85rem] border border-slate-200 bg-[#f8fdff]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_12%,rgba(125,211,252,.34),transparent_30%)]" />
            <div className="scan-light absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-transparent via-cyan-200/34 to-transparent" />
            <div className="relative border-b border-slate-200 bg-white/88 px-5 py-4"><div className="flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-xl bg-[linear-gradient(135deg,#0f172a,#2563eb)] text-[10px] font-black text-cyan-100">CQ</span><div><p className="text-sm font-black text-slate-950">Live scan preview</p><p className="text-[10px] font-bold uppercase tracking-[.16em] text-slate-400">Presence Report in motion</p></div></div></div>

            <div className="relative grid gap-4 p-4 sm:p-5 lg:grid-cols-[.9fr_1.1fr]">
              <div className="rounded-[1.45rem] border border-slate-200 bg-white/92 p-5 shadow-[0_16px_44px_rgba(15,23,42,.08)]">
                <p className="text-[10px] font-black uppercase tracking-[.2em] text-sky-700">Question in the market</p>
                <h2 className="mt-2 text-3xl font-black leading-[.98] tracking-[-.06em] text-slate-950">Who should I trust near me?</h2>
                <p className="mt-3 text-sm font-semibold leading-6 text-slate-500">Before a buyer calls, the public web is already answering. Cendorq checks whether your business gives that answer enough clarity and proof.</p>
                <div className="mt-5 grid gap-3">{STORY.map(([title, copy], index) => <div key={title} className="grid grid-cols-[2.1rem_1fr] gap-3 rounded-2xl border border-slate-100 bg-slate-50/78 p-3"><span className="grid h-8 w-8 place-items-center rounded-xl bg-white text-xs font-black text-sky-700 shadow-sm">{index + 1}</span><div><p className="text-sm font-black text-slate-950">{title}</p><p className="mt-1 text-xs font-semibold leading-5 text-slate-500">{copy}</p></div></div>)}</div>
              </div>

              <div className="rounded-[1.45rem] border border-slate-200 bg-white/94 p-5 shadow-[0_16px_44px_rgba(15,23,42,.08)]">
                <div className="flex items-start justify-between gap-4"><div><p className="text-[10px] font-black uppercase tracking-[.2em] text-sky-700">Presence Score</p><h3 className="mt-1 text-4xl font-black tracking-[-.065em] text-slate-950">42 / 100</h3></div><p className="text-right text-xs font-black uppercase tracking-[.14em] text-red-500">High friction</p></div>
                <div className="mt-5 grid gap-3">{SIGNALS.map(([label, score, copy, tone]) => <SignalMeter key={label} label={label} score={score} copy={copy} tone={tone} />)}</div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2"><InsightCard label="Choice Gap" value="Competitor explains faster" /><InsightCard label="Repair Queue" value="Move proof into the decision" /></div>
              </div>
            </div>
          </div>
        </section>
      </section>

      <style>{`@keyframes scanLight{0%{transform:translateX(-7rem);opacity:0}20%,72%{opacity:1}100%{transform:translateX(54rem);opacity:0}}.scan-light{animation:scanLight 5.6s ease-in-out infinite}@media (prefers-reduced-motion:reduce){.scan-light{animation:none;opacity:0}}`}</style>
    </main>
  );
}

function SignalMeter({ label, score, copy, tone }: { label: string; score: string; copy: string; tone: string }) {
  return <div><div className="flex items-end justify-between gap-3"><div><p className="text-sm font-black text-slate-950">{label}</p><p className="text-xs font-semibold text-slate-500">{copy}</p></div><span className="text-xl font-black tracking-[-.05em] text-slate-950">{score}</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full bg-gradient-to-r ${tone}`} style={{ width: `${score}%` }} /></div></div>;
}

function InsightCard({ label, value }: { label: string; value: string }) {
  return <div className="rounded-[1.35rem] border border-cyan-100 bg-cyan-50/54 p-4"><p className="text-[10px] font-black uppercase tracking-[.18em] text-sky-700">{label}</p><p className="mt-2 text-base font-black leading-5 tracking-[-.03em] text-slate-950">{value}</p></div>;
}
