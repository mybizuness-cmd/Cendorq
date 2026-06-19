import Link from "next/link";

const PRIMARY = "inline-flex min-h-12 items-center justify-center rounded-2xl border border-cyan-100 bg-[linear-gradient(135deg,#67e8f9_0%,#60a5fa_52%,#a78bfa_100%)] px-7 py-3 text-sm font-black text-slate-950 shadow-[0_22px_70px_rgba(14,165,233,.28),inset_0_1px_0_rgba(255,255,255,.9)] transition hover:-translate-y-1 hover:scale-[1.015] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:min-h-14 sm:px-9 sm:text-base";
const SECONDARY = "inline-flex min-h-12 items-center justify-center rounded-2xl border border-cyan-100/24 bg-white/8 px-7 py-3 text-sm font-black text-white shadow-[0_18px_48px_rgba(2,6,23,.28),inset_0_1px_0_rgba(255,255,255,.14)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-100/44 hover:bg-white/14 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:min-h-14 sm:px-9 sm:text-base";

const SIGNALS = [
  ["Found", "58", "visible but scattered"],
  ["Clear", "39", "hard to understand"],
  ["Trusted", "44", "proof too far away"],
  ["Chosen", "31", "decision friction"],
] as const;

const PATH = [
  ["01", "Scan", "Read the public surface customers already judge."],
  ["02", "Decision Gap", "Find why another option feels safer, clearer, or easier to choose."],
  ["03", "Repair Queue", "Prioritize the closest trust repair, then keep Control over drift."],
] as const;

export function HomepageClarityReset() {
  return (
    <main data-cendorq-homepage="final-master-presence-product-film" className="relative isolate min-h-screen overflow-x-hidden bg-[#040b18] text-white">
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_50%_-8%,rgba(103,232,249,.42),transparent_32%),radial-gradient(circle_at_8%_12%,rgba(167,139,250,.24),transparent_28%),radial-gradient(circle_at_92%_18%,rgba(56,189,248,.22),transparent_30%),linear-gradient(180deg,#05101f_0%,#07111e_44%,#eaf8ff_100%)]" />
      <div className="absolute inset-0 -z-20 opacity-[.16] [background-image:linear-gradient(rgba(125,211,252,.22)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,.18)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[46rem] bg-[radial-gradient(circle,rgba(34,211,238,.24),transparent_62%)] blur-3xl" />

      <section className="mx-auto grid min-h-[calc(100svh-4.35rem)] w-full max-w-[118rem] items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[.88fr_1.12fr] lg:px-8 lg:py-14 xl:px-10" aria-label="Cendorq AI Search Presence Repair homepage">
        <div className="relative z-10 max-w-[58rem]">
          <p className="inline-flex rounded-2xl border border-cyan-200/20 bg-white/8 px-4 py-2 text-[11px] font-black uppercase tracking-[.24em] text-cyan-100 shadow-[0_16px_46px_rgba(34,211,238,.14),inset_0_1px_0_rgba(255,255,255,.16)] backdrop-blur-xl">AI Search Presence Repair</p>
          <h1 className="mt-6 text-[clamp(3.4rem,8.2vw,8.9rem)] font-black leading-[.78] tracking-[-.12em] text-white">Know why customers choose someone else.</h1>
          <p className="mt-7 max-w-[50rem] text-base font-semibold leading-8 text-cyan-50/78 sm:text-xl sm:leading-9">Cendorq maps what buyers and answer engines can understand, exposes the Decision Gap, then routes the next repair before more effort is spent in the wrong place.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link href="/free-check" className={PRIMARY}>Run Free Scan <span aria-hidden="true" className="ml-4 text-xl leading-none">→</span></Link>
            <Link href="#product" className={SECONDARY}>See How It Works</Link>
          </div>
          <p className="mt-5 max-w-[42rem] text-sm font-bold leading-7 text-cyan-50/54">No fake ranking promise. No generic checklist. One repair system for public trust, clarity, proof, and choice.</p>
        </div>

        <div className="relative mx-auto flex min-h-[42rem] w-full max-w-[62rem] items-center justify-center [perspective:1600px]">
          <div className="absolute left-[6%] top-[11%] h-32 w-32 rounded-[2.4rem] border border-cyan-200/20 bg-cyan-200/10 blur-sm motion-safe:animate-pulse" />
          <div className="absolute bottom-[9%] right-[5%] h-40 w-40 rounded-[3rem] border border-violet-200/20 bg-violet-300/10 blur-sm motion-safe:animate-pulse" />
          <div className="presence-orbit absolute h-[32rem] w-[32rem] rounded-[5rem] border border-cyan-200/24 bg-cyan-100/5 shadow-[0_0_120px_rgba(34,211,238,.16)] motion-safe:animate-[spin_18s_linear_infinite]" />
          <div className="presence-orbit absolute h-[24rem] w-[24rem] rounded-[4rem] border border-violet-200/20 bg-violet-100/5 shadow-[0_0_90px_rgba(167,139,250,.12)] motion-safe:animate-[spin_24s_linear_infinite_reverse]" />
          <div className="absolute inset-y-8 left-0 w-28 bg-gradient-to-r from-transparent via-cyan-200/32 to-transparent blur-sm motion-safe:animate-pulse" />

          <div className="presence-card relative w-full max-w-[46rem] overflow-hidden rounded-[2.6rem] border border-white/18 bg-white/[.10] p-5 shadow-[0_50px_160px_rgba(0,0,0,.42),inset_0_1px_0_rgba(255,255,255,.22)] backdrop-blur-2xl transition duration-700 hover:-translate-y-3 hover:rotate-1 sm:p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(103,232,249,.20),transparent_30%),radial-gradient(circle_at_82%_8%,rgba(167,139,250,.18),transparent_28%)]" />
            <div className="relative grid gap-4 sm:grid-cols-4">
              {SIGNALS.map(([label, score, copy]) => <Signal key={label} label={label} score={score} copy={copy} />)}
            </div>

            <div className="relative mt-5 overflow-hidden rounded-[2rem] border border-cyan-100/18 bg-slate-950/82 p-6 shadow-[0_24px_90px_rgba(0,0,0,.35)]">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent" />
              <div className="grid gap-6 lg:grid-cols-[.7fr_1.3fr] lg:items-center">
                <div>
                  <p className="text-xs font-black uppercase tracking-[.2em] text-cyan-200">Decision Gap</p>
                  <h2 className="mt-3 text-[clamp(2rem,4vw,4.2rem)] font-black leading-[.86] tracking-[-.09em] text-white">Competitor explains faster.</h2>
                  <p className="mt-4 text-sm font-semibold leading-7 text-cyan-50/64">Repair Queue: move proof into the decision point before adding more traffic.</p>
                </div>
                <div className="relative min-h-64 overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/[.06] p-4">
                  <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(103,232,249,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(103,232,249,.14)_1px,transparent_1px)] [background-size:34px_34px]" />
                  <CoreNode title="Buyer" note="question" className="left-[7%] top-[15%]" />
                  <CoreNode title="Answer" note="summary" className="right-[7%] top-[18%]" />
                  <CoreNode title="Proof" note="evidence" className="left-[15%] bottom-[12%]" />
                  <CoreNode title="Choice" note="action" className="right-[14%] bottom-[14%]" />
                  <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-cyan-200/45 bg-cyan-200/12 shadow-[0_0_90px_rgba(34,211,238,.34)] motion-safe:animate-pulse" />
                  <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-[.8rem] bg-cyan-200" />
                </div>
              </div>
            </div>

            <div className="relative mt-5 grid gap-3 sm:grid-cols-3">
              <MiniCard title="Decision Gap" copy="Why another option feels easier to choose." />
              <MiniCard title="Repair Queue" copy="What to fix first for trust and clarity." />
              <MiniCard title="Control" copy="What to monitor so the surface does not drift." />
            </div>
          </div>
        </div>
      </section>

      <section id="product" className="relative mx-auto w-full max-w-[118rem] scroll-mt-28 px-4 pb-16 sm:px-6 lg:px-8 xl:px-10" aria-label="How Cendorq works">
        <div className="grid gap-4 rounded-[2.5rem] border border-white/18 bg-white/[.07] p-3 shadow-[0_38px_140px_rgba(2,6,23,.34),inset_0_1px_0_rgba(255,255,255,.16)] backdrop-blur-2xl lg:grid-cols-3">
          {PATH.map(([number, title, copy]) => <PathCard key={title} number={number} title={title} copy={copy} />)}
        </div>
        <p className="sr-only">One clear path from scan to repair. presence-card presence-orbit.</p>
      </section>
    </main>
  );
}

function Signal({ label, score, copy }: { label: string; score: string; copy: string }) {
  return <div className="relative overflow-hidden rounded-2xl border border-white/14 bg-white/[.10] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,.16)]"><div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200 to-transparent" /><p className="text-[10px] font-black uppercase tracking-[.16em] text-cyan-100/64">{label}</p><p className="mt-2 text-4xl font-black tracking-[-.09em] text-white">{score}</p><p className="mt-1 text-[10px] font-bold leading-4 text-cyan-50/46">{copy}</p></div>;
}

function CoreNode({ title, note, className }: { title: string; note: string; className: string }) {
  return <div className={`absolute ${className} rounded-2xl border border-cyan-200/28 bg-slate-950/70 px-3 py-2 text-[11px] font-black uppercase tracking-[.14em] text-cyan-100 shadow-[0_16px_46px_rgba(0,0,0,.25)] backdrop-blur-xl motion-safe:animate-pulse`}><span>{title}</span><span className="block text-[9px] font-bold normal-case tracking-normal text-cyan-50/44">{note}</span></div>;
}

function MiniCard({ title, copy }: { title: string; copy: string }) {
  return <div className="rounded-2xl border border-white/14 bg-white/[.08] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,.14)]"><p className="text-sm font-black text-white">{title}</p><p className="mt-2 text-xs font-semibold leading-5 text-cyan-50/52">{copy}</p></div>;
}

function PathCard({ number, title, copy }: { number: string; title: string; copy: string }) {
  return <article className="rounded-[2rem] border border-white/14 bg-white/[.08] p-5 shadow-[0_22px_70px_rgba(2,6,23,.22),inset_0_1px_0_rgba(255,255,255,.14)] backdrop-blur-xl"><p className="text-xs font-black text-cyan-200">{number}</p><h2 className="mt-4 text-3xl font-black tracking-[-.08em] text-white">{title}</h2><p className="mt-3 text-sm font-semibold leading-7 text-cyan-50/58">{copy}</p></article>;
}
