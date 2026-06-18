import Link from "next/link";

const STEPS = [
  ["01", "Scan", "Read the public signals that shape whether customers and answer engines can understand the business."],
  ["02", "Choice Gap", "Show why a competitor may feel clearer, safer, or easier to act on before the buyer calls."],
  ["03", "Repair Queue", "Turn the gap into the next safest fix instead of a crowded task list."],
  ["04", "Control", "Track whether the repaired signals stay clear as the market changes."],
] as const;

const READOUT = [
  ["Presence Score", "42", "High choice friction"],
  ["Search Readiness", "58", "Eligible, not strong"],
  ["First Repair Lift", "+22", "After priority work"],
] as const;

export function Cendorq3DPresenceCommand() {
  return (
    <section data-cendorq-homepage-dashboard-demo="final-master-presence-command-center" className="relative isolate overflow-hidden bg-[#eef8ff] px-4 py-14 text-slate-950 sm:px-6 lg:px-8 lg:py-20" aria-label="Cendorq Presence Command Center explainer">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_0%,rgba(125,211,252,.56),transparent_28%),radial-gradient(circle_at_84%_18%,rgba(196,181,253,.34),transparent_32%),linear-gradient(180deg,#f8fcff_0%,#ecf9ff_54%,#ffffff_100%)]" />
      <div className="mx-auto max-w-[108rem]">
        <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-center">
          <div className="max-w-[38rem]">
            <p className="text-[11px] font-black uppercase tracking-[.24em] text-sky-700">Presence Command Center</p>
            <h2 className="mt-4 text-[clamp(2.45rem,5.4vw,5rem)] font-black leading-[.92] tracking-[-.085em] text-slate-950">One command surface for the score, the gap, and the next repair.</h2>
            <p className="mt-5 text-base font-semibold leading-8 text-slate-600 sm:text-lg sm:leading-8">The homepage should explain the product like a fast film: what Cendorq scans, what it finds, what it means, and what the business should do next.</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row"><Link href="/free-check" className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-cyan-100 bg-[linear-gradient(135deg,#67e8f9,#60a5fa_56%,#a78bfa)] px-7 py-3 text-sm font-black text-slate-950 shadow-[0_18px_54px_rgba(14,165,233,.22),inset_0_1px_0_rgba(255,255,255,.86)]">Run Free Scan</Link><Link href="/sample-report" className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-cyan-100 bg-white/78 px-7 py-3 text-sm font-black text-slate-950 shadow-[0_14px_38px_rgba(15,23,42,.08),inset_0_1px_0_rgba(255,255,255,.9)]">View Sample Report</Link></div>
          </div>

          <div className="relative overflow-hidden rounded-[2.35rem] border border-white/80 bg-white/82 p-2 shadow-[0_46px_130px_rgba(15,23,42,.22),inset_0_1px_0_rgba(255,255,255,.96)] backdrop-blur-2xl">
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[#f8fdff]">
              <div className="scan-line absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-transparent via-cyan-200/34 to-transparent" />
              <div className="relative grid gap-4 p-4 sm:p-5 xl:grid-cols-[1.05fr_.95fr]">
                <div className="rounded-[1.55rem] border border-slate-200 bg-white/94 p-5 shadow-[0_18px_52px_rgba(15,23,42,.08)]">
                  <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4"><div><p className="text-[10px] font-black uppercase tracking-[.2em] text-sky-700">Live scan preview</p><h3 className="mt-1 text-3xl font-black tracking-[-.065em] text-slate-950">Visible, but not easy to choose.</h3></div><p className="text-right text-4xl font-black tracking-[-.08em] text-slate-950">42</p></div>
                  <div className="mt-5 grid gap-3">{READOUT.map(([label, value, detail]) => <Readout key={label} label={label} value={value} detail={detail} />)}</div>
                </div>

                <div className="grid gap-3">{STEPS.map(([number, title, copy]) => <Step key={title} number={number} title={title} copy={copy} />)}</div>
              </div>
              <div className="relative border-t border-slate-200 bg-white/70 p-5"><p className="max-w-4xl text-sm font-semibold leading-7 text-slate-600">Choice Gap, Repair Queue, and Control snapshot stay connected so the owner sees why the score matters, what to fix first, and how the system keeps the work from drifting.</p></div>
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes scanLine{0%{transform:translateX(-8rem);opacity:0}20%,72%{opacity:1}100%{transform:translateX(70rem);opacity:0}}.scan-line{animation:scanLine 6.4s ease-in-out infinite}@media (prefers-reduced-motion:reduce){.scan-line{animation:none;opacity:0}}`}</style>
    </section>
  );
}

function Readout({ label, value, detail }: { label: string; value: string; detail: string }) {
  return <div className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/76 p-4"><div><p className="text-sm font-black text-slate-950">{label}</p><p className="mt-1 text-xs font-semibold text-slate-500">{detail}</p></div><p className="text-2xl font-black tracking-[-.06em] text-slate-950">{value}</p></div>;
}

function Step({ number, title, copy }: { number: string; title: string; copy: string }) {
  return <article className="grid grid-cols-[2.2rem_1fr] gap-3 rounded-[1.35rem] border border-slate-200 bg-white/94 p-4 shadow-[0_14px_42px_rgba(15,23,42,.07)]"><p className="text-sm font-black text-sky-700">{number}</p><div><h4 className="text-xl font-black tracking-[-.05em] text-slate-950">{title}</h4><p className="mt-2 text-xs font-semibold leading-5 text-slate-500">{copy}</p></div></article>;
}
