"use client";

import { useEffect, useMemo, useState } from "react";

const SCENES = [
  {
    phase: "Scan",
    title: "Cendorq reads the public path.",
    copy: "Site, offer, proof, location, reviews, and next step are checked as one decision path.",
    pulse: "Reading public signals",
  },
  {
    phase: "Gap",
    title: "The weak point comes forward.",
    copy: "The preview highlights where a customer may hesitate before choosing the business.",
    pulse: "Choice gap found",
  },
  {
    phase: "Repair",
    title: "The first fix becomes clear.",
    copy: "Cendorq turns the scan into the next practical move instead of another dashboard to decode.",
    pulse: "Next move ready",
  },
] as const;

const SOURCE_TILES = ["Website", "Offer", "Proof", "Reviews", "Local", "Action"] as const;
const OUTPUT_LINES = ["Clarify the first-screen offer", "Move proof closer to the action", "Make the safest next step obvious"] as const;

export function CendorqProductMotionDemo() {
  const [active, setActive] = useState(0);
  const scene = SCENES[active];
  const progress = useMemo(() => ((active + 1) / SCENES.length) * 100, [active]);

  useEffect(() => {
    const timer = window.setInterval(() => setActive((value) => (value + 1) % SCENES.length), 2600);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <figure className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/80 p-2 shadow-[0_34px_120px_rgba(14,165,233,0.16)] backdrop-blur-2xl sm:rounded-[2.8rem] sm:p-3" aria-label="Animated Cendorq product preview">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(251,207,232,0.24),transparent_30%),radial-gradient(circle_at_92%_0%,rgba(125,211,252,0.34),transparent_38%),linear-gradient(135deg,rgba(255,255,255,0.8),rgba(236,253,255,0.72))]" aria-hidden="true" />

      <div className="relative overflow-hidden rounded-[1.7rem] border border-cyan-100 bg-[linear-gradient(145deg,#ffffff,#f2fdff_52%,#fff7fb)] sm:rounded-[2.25rem]">
        <div className="absolute inset-0 opacity-80" aria-hidden="true">
          <div className="absolute left-[-20%] top-0 h-full w-[44%] bg-[linear-gradient(90deg,transparent,rgba(34,211,238,0.28),transparent)] transition-transform duration-1000" style={{ transform: `translateX(${active * 118 + 40}%)` }} />
          <div className="absolute right-8 top-8 h-28 w-28 rounded-full bg-cyan-200/25 blur-3xl" />
          <div className="absolute bottom-6 left-12 h-32 w-32 rounded-full bg-fuchsia-200/25 blur-3xl" />
        </div>

        <div className="relative p-4 sm:p-6 lg:p-7">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_28px_rgba(34,211,238,0.7)]" />
              <span className="text-xs font-black uppercase tracking-[0.18em] text-cyan-800">Presence scan</span>
            </div>
            <span className="rounded-full border border-cyan-100 bg-white/80 px-3 py-1.5 text-xs font-black text-slate-700">{scene.phase}</span>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
            <section className="relative min-h-[25rem] overflow-hidden rounded-[1.45rem] border border-cyan-100 bg-slate-950 p-5 text-white shadow-[0_26px_90px_rgba(15,23,42,0.18)] sm:p-6" aria-label="Scan animation stage">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.28),transparent_32%),radial-gradient(circle_at_92%_88%,rgba(251,207,232,0.2),transparent_34%)]" aria-hidden="true" />
              <div className="relative">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-200">{scene.pulse}</p>
                <h2 className="mt-4 max-w-lg text-[clamp(2.15rem,5.2vw,4.35rem)] font-semibold leading-[0.86] tracking-[-0.085em] text-white">
                  {scene.title}
                </h2>
                <p className="mt-4 max-w-md text-sm font-semibold leading-7 text-cyan-50/78">{scene.copy}</p>
              </div>

              <div className="relative mt-7 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {SOURCE_TILES.map((tile, index) => {
                  const awake = index <= active + 2;
                  return (
                    <div key={tile} className={`rounded-[1rem] border p-3 transition duration-700 ${awake ? "border-cyan-300/45 bg-cyan-300/12 text-white" : "border-white/10 bg-white/5 text-cyan-50/55"}`}>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs font-black uppercase tracking-[0.14em]">{tile}</span>
                        <span className={`h-2 w-2 rounded-full ${awake ? "bg-cyan-300" : "bg-white/20"}`} />
                      </div>
                      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                        <div className="h-full rounded-full bg-cyan-300 transition-all duration-700" style={{ width: awake ? `${58 + index * 6}%` : "18%" }} />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="absolute bottom-5 left-5 right-5" aria-hidden="true">
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-[linear-gradient(90deg,#67e8f9,#f0abfc)] transition-all duration-700" style={{ width: `${progress}%` }} />
                </div>
              </div>
            </section>

            <section className="grid gap-4" aria-label="Cendorq output reveal">
              <div className="relative overflow-hidden rounded-[1.45rem] border border-cyan-100 bg-white p-5 shadow-[0_22px_80px_rgba(14,165,233,0.1)] sm:p-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(34,211,238,0.18),transparent_35%),radial-gradient(circle_at_100%_100%,rgba(217,70,239,0.12),transparent_36%)]" aria-hidden="true" />
                <div className="relative">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">Presence report preview</p>
                  <h3 className="mt-3 text-[clamp(2.4rem,6vw,5.6rem)] font-semibold leading-[0.84] tracking-[-0.09em] text-slate-950">
                    Visible is not the same as chosen.
                  </h3>
                  <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">
                    The report does not bury the owner in charts. It shows the gap, the reason, and the first move.
                  </p>

                  <div className="mt-6 grid gap-2">
                    {OUTPUT_LINES.map((line, index) => (
                      <div key={line} className={`flex items-center gap-3 rounded-[1rem] border p-3 transition duration-500 ${active === 2 && index === 0 ? "border-cyan-200 bg-cyan-100 text-slate-950" : "border-cyan-100 bg-white/82 text-slate-650"}`}>
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-50 text-xs font-black text-cyan-800">{index + 1}</span>
                        <span className="text-sm font-bold leading-6">{line}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {SCENES.map((item, index) => (
                  <button key={item.phase} type="button" onClick={() => setActive(index)} className={`rounded-[1rem] border p-3 text-left text-xs font-black transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${active === index ? "border-cyan-200 bg-cyan-100 text-slate-950" : "border-cyan-100 bg-white text-slate-600"}`}>
                    {item.phase}
                  </button>
                ))}
              </div>

              <p className="rounded-[1rem] border border-cyan-100 bg-white/82 p-4 text-xs font-semibold leading-5 text-slate-500 shadow-sm">
                Sample product motion. A real Free Scan uses the submitted business context.
              </p>
            </section>
          </div>
        </div>
      </div>
    </figure>
  );
}
