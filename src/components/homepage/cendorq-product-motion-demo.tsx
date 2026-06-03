"use client";

import { useEffect, useMemo, useState } from "react";

const SCENES = [
  {
    phase: "Scan",
    title: "Cendorq reads the public path.",
    copy: "Website, offer, local profile, proof, reviews, and next step are checked as one decision path.",
    pulse: "Reading public signals",
    signal: "Inputs active",
  },
  {
    phase: "AI",
    title: "It tests what AI can understand.",
    copy: "The preview separates being visible from being clear enough to be trusted and chosen.",
    pulse: "Answer snapshot sampled",
    signal: "Understanding checked",
  },
  {
    phase: "Gap",
    title: "The choice blocker comes forward.",
    copy: "Cendorq shows whether missing proof, unclear positioning, weak local trust, or a vague action is creating hesitation.",
    pulse: "Choice gap found",
    signal: "Risk prioritized",
  },
  {
    phase: "Repair",
    title: "The first fix becomes clear.",
    copy: "The report turns the signal into the safest next command instead of another dashboard to decode.",
    pulse: "Next move ready",
    signal: "Repair queue built",
  },
] as const;

const SOURCE_TILES = ["Website", "Offer", "AI answer", "Reviews", "Local", "Action"] as const;
const SCORE_ROWS = [
  ["Findability", "72"],
  ["Understanding", "64"],
  ["Trust", "69"],
  ["Choice", "51"],
  ["Action", "58"],
] as const;
const OUTPUT_LINES = ["Clarify the first-screen offer", "Move proof closer to the action", "Make the safest next step obvious"] as const;

export function CendorqProductMotionDemo() {
  const [active, setActive] = useState(0);
  const scene = SCENES[active];
  const progress = useMemo(() => ((active + 1) / SCENES.length) * 100, [active]);

  useEffect(() => {
    const timer = window.setInterval(() => setActive((value) => (value + 1) % SCENES.length), 2400);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <figure className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/88 p-2 shadow-[0_34px_110px_rgba(15,23,42,0.12)] backdrop-blur-2xl sm:rounded-[2.8rem] sm:p-3" aria-label="Animated Cendorq product preview">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(251,207,232,0.2),transparent_30%),radial-gradient(circle_at_92%_0%,rgba(125,211,252,0.16),transparent_38%),linear-gradient(135deg,rgba(255,255,255,0.86),rgba(250,253,255,0.78))]" aria-hidden="true" />

      <div className="relative overflow-hidden rounded-[1.7rem] border border-slate-200/80 bg-[linear-gradient(145deg,#ffffff,#fbfdff_54%,#fff8fc)] sm:rounded-[2.25rem]">
        <div className="absolute inset-0 opacity-75" aria-hidden="true">
          <div className="absolute left-[-20%] top-0 h-full w-[44%] bg-[linear-gradient(90deg,transparent,rgba(186,230,253,0.34),transparent)] transition-transform duration-1000" style={{ transform: `translateX(${active * 86 + 36}%)` }} />
          <div className="absolute right-8 top-8 h-28 w-28 rounded-full bg-cyan-100/30 blur-3xl" />
          <div className="absolute bottom-6 left-12 h-32 w-32 rounded-full bg-fuchsia-100/35 blur-3xl" />
        </div>

        <div className="relative p-4 sm:p-6 lg:p-7">
          <div className="flex items-start justify-between gap-3 border-b border-slate-200/80 pb-4">
            <div>
              <p className="text-sm font-semibold text-slate-500">Presence scan</p>
              <p className="mt-1 text-2xl font-semibold tracking-[-0.06em] text-slate-950">{scene.phase}</p>
            </div>
            <div className="h-12 w-12 rounded-[1rem] border border-slate-200 bg-white shadow-sm" aria-hidden="true">
              <div className="m-3 h-6 rounded-full bg-[linear-gradient(135deg,#bae6fd,#f5d0fe)]" />
            </div>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
            <section className="relative min-h-[24rem] overflow-hidden rounded-[1.45rem] border border-slate-900 bg-slate-950 p-5 text-white shadow-[0_26px_84px_rgba(15,23,42,0.18)] sm:p-6" aria-label="Scan animation stage">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(125,211,252,0.12),transparent_34%),radial-gradient(circle_at_92%_88%,rgba(251,207,232,0.12),transparent_36%)]" aria-hidden="true" />
              <div className="relative">
                <p className="text-sm font-semibold text-cyan-100/78">{scene.pulse}</p>
                <h2 className="mt-3 max-w-lg text-[clamp(2.05rem,4.7vw,3.85rem)] font-semibold leading-[0.88] tracking-[-0.08em] text-white">
                  {scene.title}
                </h2>
                <p className="mt-4 max-w-md text-sm font-semibold leading-7 text-cyan-50/74">{scene.copy}</p>
              </div>

              <div className="relative mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {SOURCE_TILES.map((tile, index) => {
                  const awake = index <= active + 2;
                  return (
                    <div key={tile} className={`rounded-[1rem] border p-3 transition duration-700 ${awake ? "border-white/20 bg-white/[0.085] text-white" : "border-white/10 bg-white/[0.035] text-cyan-50/55"}`}>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs font-black uppercase tracking-[0.14em]">{tile}</span>
                        <span className={`h-2 w-2 rounded-full ${awake ? "bg-fuchsia-200" : "bg-white/20"}`} />
                      </div>
                      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                        <div className="h-full rounded-full bg-[linear-gradient(90deg,#bae6fd,#f5d0fe)] transition-all duration-700" style={{ width: awake ? `${56 + index * 6}%` : "18%" }} />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="relative mt-5 rounded-[1.1rem] border border-white/10 bg-white/[0.055] p-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-100/70">Live read</p>
                  <p className="text-xs font-bold text-fuchsia-100">{scene.signal}</p>
                </div>
                <div className="mt-3 grid gap-2">
                  {SCORE_ROWS.slice(0, active + 2).map(([label, value]) => (
                    <div key={label} className="grid grid-cols-[7rem_1fr_auto] items-center gap-3 text-xs font-bold text-cyan-50/75">
                      <span>{label}</span>
                      <span className="h-1.5 overflow-hidden rounded-full bg-white/10"><span className="block h-full rounded-full bg-[linear-gradient(90deg,#bae6fd,#f5d0fe)]" style={{ width: `${value}%` }} /></span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute bottom-5 left-5 right-5" aria-hidden="true">
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-[linear-gradient(90deg,#bae6fd,#f5d0fe)] transition-all duration-700" style={{ width: `${progress}%` }} />
                </div>
              </div>
            </section>

            <section className="grid gap-4" aria-label="Cendorq output reveal">
              <div className="relative overflow-hidden rounded-[1.45rem] border border-slate-200/80 bg-white/92 p-5 shadow-[0_20px_70px_rgba(15,23,42,0.075)] sm:p-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(186,230,253,0.18),transparent_35%),radial-gradient(circle_at_100%_100%,rgba(251,207,232,0.14),transparent_36%)]" aria-hidden="true" />
                <div className="relative">
                  <p className="text-sm font-semibold text-slate-500">Presence report preview</p>
                  <h3 className="mt-3 text-[clamp(2.25rem,5.7vw,5.2rem)] font-semibold leading-[0.86] tracking-[-0.085em] text-slate-950">
                    Visible is not the same as chosen.
                  </h3>
                  <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">
                    The report does not bury the owner in charts. It shows the gap, the reason, and the first move.
                  </p>

                  <div className="mt-6 grid gap-2">
                    {OUTPUT_LINES.map((line, index) => (
                      <div key={line} className={`grid grid-cols-[auto_1fr] items-center gap-3 rounded-[1rem] border p-3 transition duration-500 ${active === 3 && index === 0 ? "border-slate-300 bg-slate-50 text-slate-950" : "border-slate-200 bg-white/82 text-slate-650"}`}>
                        <span className="text-xs font-black text-cyan-800">0{index + 1}</span>
                        <span className="text-sm font-bold leading-6">{line}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-4">
                {SCENES.map((item, index) => (
                  <button key={item.phase} type="button" onClick={() => setActive(index)} className={`rounded-[1rem] border p-3 text-left text-xs font-black transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${active === index ? "border-slate-300 bg-white text-slate-950 shadow-sm" : "border-slate-200 bg-white/80 text-slate-600"}`}>
                    {item.phase}
                  </button>
                ))}
              </div>

              <p className="rounded-[1rem] border border-slate-200 bg-white/84 p-4 text-xs font-semibold leading-5 text-slate-500 shadow-sm">
                Sample product motion. A real Free Scan uses the submitted business context and keeps AI visibility probabilistic, bounded, and repair-focused.
              </p>
            </section>
          </div>
        </div>
      </div>
    </figure>
  );
}
