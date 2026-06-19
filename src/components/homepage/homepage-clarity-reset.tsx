import Link from "next/link";

const PRIMARY = "inline-flex min-h-12 items-center justify-center rounded-2xl border border-cyan-100 bg-[linear-gradient(135deg,#67e8f9_0%,#60a5fa_58%,#a78bfa_100%)] px-7 py-3 text-sm font-black text-slate-950 shadow-[0_18px_55px_rgba(14,165,233,.22),inset_0_1px_0_rgba(255,255,255,.88)] transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:min-h-14 sm:px-9 sm:text-base";
const SECONDARY = "inline-flex min-h-12 items-center justify-center rounded-2xl border border-cyan-100 bg-white/80 px-7 py-3 text-sm font-black text-slate-950 shadow-[0_14px_38px_rgba(15,23,42,.08),inset_0_1px_0_rgba(255,255,255,.9)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:min-h-14 sm:px-9 sm:text-base";

const SIGNALS = [
  ["Found", "58"],
  ["Clear", "39"],
  ["Trusted", "44"],
  ["Chosen", "31"],
] as const;

export function HomepageClarityReset() {
  return (
    <main data-cendorq-homepage="final-master-presence-product-film" className="relative isolate min-h-screen overflow-x-hidden bg-[#eef8ff] text-slate-950">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_4%,rgba(186,230,253,.95),transparent_30%),radial-gradient(circle_at_88%_8%,rgba(219,234,254,.9),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eef9ff_46%,#f8fcff_100%)]" />
      <div className="absolute inset-0 -z-10 opacity-[.12] [background-image:linear-gradient(rgba(14,165,233,.10)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,.08)_1px,transparent_1px)] [background-size:96px_96px]" />

      <section className="mx-auto flex min-h-[calc(100svh-4.35rem)] w-full max-w-[112rem] flex-col items-center px-4 py-10 sm:px-6 lg:px-8 lg:py-14 xl:px-10" aria-label="Cendorq AI Search Presence Repair homepage">
        <div className="mx-auto max-w-[72rem] text-center">
          <p className="mx-auto inline-flex rounded-2xl border border-cyan-100 bg-white/72 px-4 py-2 text-[11px] font-black uppercase tracking-[.22em] text-sky-700 shadow-[0_12px_34px_rgba(14,165,233,.12)] backdrop-blur-xl">AI Search Presence Repair</p>
          <h1 className="mt-6 text-[clamp(3.05rem,7.4vw,6.75rem)] font-black leading-[.86] tracking-[-.095em] text-slate-950">Know why customers choose someone else.</h1>
          <p className="mx-auto mt-6 max-w-[52rem] text-base font-semibold leading-8 text-slate-600 sm:text-xl sm:leading-9">Cendorq scans what buyers and answer engines can see, finds the Decision Gap, and gives the next repair to make the business easier to trust and choose.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
            <Link href="/free-check" className={PRIMARY}>Run Free Scan <span aria-hidden="true" className="ml-4 text-xl leading-none">→</span></Link>
            <Link href="#product" className={SECONDARY}>See How It Works</Link>
          </div>
        </div>

        <section id="product" className="mt-12 scroll-mt-28 w-full overflow-hidden rounded-[2.75rem] border border-white/80 bg-white/68 p-2 shadow-[0_56px_170px_rgba(15,23,42,.18),inset_0_1px_0_rgba(255,255,255,.95)] backdrop-blur-2xl" aria-label="How Cendorq works">
          <div className="relative min-h-[39rem] overflow-hidden rounded-[2.3rem] border border-slate-200/90 bg-[#f9fdff]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(125,211,252,.34),transparent_34%),radial-gradient(circle_at_72%_18%,rgba(167,139,250,.18),transparent_30%),linear-gradient(180deg,rgba(255,255,255,.92),rgba(239,250,255,.76))]" />
            <div className="scan-light absolute inset-y-0 left-0 w-36 bg-gradient-to-r from-transparent via-cyan-200/42 to-transparent" />

            <div className="relative grid min-h-[39rem] gap-0 lg:grid-cols-[.36fr_.64fr]">
              <div className="flex flex-col justify-between gap-8 p-6 sm:p-8 lg:border-r lg:border-slate-200/70">
                <div>
                  <h2 className="text-[clamp(2.25rem,4.8vw,5rem)] font-black leading-[.88] tracking-[-.09em] text-slate-950">One clear path from scan to repair.</h2>
                  <p className="mt-5 max-w-xl text-sm font-semibold leading-7 text-slate-600 sm:text-base sm:leading-8">No generic marketing checklist. No fake ranking promise. Just the visible signals that make a buyer hesitate, and the next move that repairs confidence.</p>
                </div>

                <div className="grid gap-3">
                  <Step number="01" title="Scan" copy="Read the public surface buyers already see." />
                  <Step number="02" title="Find" copy="Identify the Decision Gap blocking trust." />
                  <Step number="03" title="Repair" copy="Prioritize the closest proof in the Repair Queue." />
                </div>
              </div>

              <div className="relative min-h-[34rem] p-6 sm:p-8 lg:p-10">
                <div className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-[4rem] bg-cyan-200/20 blur-3xl" />
                <div className="relative mx-auto flex min-h-[32rem] max-w-[52rem] items-center justify-center [perspective:1400px]">
                  <div className="presence-orbit absolute h-[25rem] w-[25rem] rounded-[4rem] border border-cyan-200/70 bg-white/20 shadow-[0_34px_110px_rgba(14,165,233,.14)]" />
                  <div className="presence-card relative w-full max-w-[39rem] rounded-[2.25rem] border border-white/90 bg-white/84 p-5 shadow-[0_42px_120px_rgba(15,23,42,.22),inset_0_1px_0_rgba(255,255,255,.95)] backdrop-blur-xl sm:p-6">
                    <div className="grid gap-3 sm:grid-cols-4">
                      {SIGNALS.map(([label, score]) => <Signal key={label} label={label} score={score} />)}
                    </div>
                    <div className="mt-6 rounded-[1.7rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_24px_70px_rgba(15,23,42,.24)]">
                      <p className="text-xs font-black uppercase tracking-[.18em] text-cyan-200">Decision Gap</p>
                      <h3 className="mt-3 text-[clamp(2rem,4vw,4rem)] font-black leading-[.9] tracking-[-.08em]">Competitor explains faster.</h3>
                      <p className="mt-4 max-w-xl text-sm font-semibold leading-7 text-slate-300">Repair Queue: move proof into the decision point before adding more traffic.</p>
                    </div>
                    <div className="mt-5 grid gap-3 sm:grid-cols-3">
                      <MiniCard title="Presence Report" copy="What customers and answer engines can understand now." />
                      <MiniCard title="Repair Queue" copy="What to fix first so the business feels safer to choose." />
                      <MiniCard title="Control" copy="What to watch so the surface does not drift again." />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <style>{`@keyframes scanLight{0%{transform:translateX(-9rem);opacity:0}18%,70%{opacity:1}100%{transform:translateX(96rem);opacity:0}}@keyframes cardFloat{0%,100%{transform:rotateX(8deg) rotateY(-10deg) translateY(0)}50%{transform:rotateX(5deg) rotateY(8deg) translateY(-12px)}}@keyframes orbitFloat{0%,100%{transform:rotateX(64deg) rotateZ(0deg) scale(.94)}50%{transform:rotateX(64deg) rotateZ(12deg) scale(1.02)}}.scan-light{animation:scanLight 6s ease-in-out infinite}.presence-card{animation:cardFloat 7s ease-in-out infinite;transform-style:preserve-3d}.presence-orbit{animation:orbitFloat 9s ease-in-out infinite;transform-style:preserve-3d}@media (prefers-reduced-motion:reduce){.scan-light,.presence-card,.presence-orbit{animation:none}}`}</style>
      </section>
    </main>
  );
}

function Step({ number, title, copy }: { number: string; title: string; copy: string }) {
  return <div className="grid grid-cols-[2.75rem_1fr] gap-3 rounded-2xl border border-white/80 bg-white/58 p-4 shadow-[0_14px_42px_rgba(15,23,42,.06)]"><p className="text-xs font-black text-sky-700">{number}</p><div><p className="text-sm font-black text-slate-950">{title}</p><p className="mt-1 text-xs font-semibold leading-5 text-slate-500">{copy}</p></div></div>;
}

function Signal({ label, score }: { label: string; score: string }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-3"><p className="text-[10px] font-black uppercase tracking-[.15em] text-slate-400">{label}</p><p className="mt-2 text-3xl font-black tracking-[-.08em] text-slate-950">{score}</p></div>;
}

function MiniCard({ title, copy }: { title: string; copy: string }) {
  return <div className="rounded-2xl border border-slate-200 bg-white/74 p-4"><p className="text-sm font-black text-slate-950">{title}</p><p className="mt-2 text-xs font-semibold leading-5 text-slate-500">{copy}</p></div>;
}
