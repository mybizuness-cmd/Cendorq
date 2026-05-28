"use client";

import { useEffect, useState } from "react";

const STEPS = [
  { title: "We read what customers see", copy: "Your site, offer, proof, location, and next step are checked together.", metric: "Read" },
  { title: "We find where choice breaks", copy: "Cendorq shows where someone could hesitate, misunderstand, or choose another business.", metric: "Gap" },
  { title: "You see the first fix", copy: "The result becomes a short path: what to clarify, move, prove, or repair first.", metric: "Fix" },
] as const;

const SIGNALS = [
  ["Find", "Can people and answer engines locate you?", 72],
  ["Understand", "Is your offer clear fast enough?", 63],
  ["Trust", "Is proof visible before the decision?", 48],
  ["Choose", "Is your business easy to pick?", 56],
] as const;

const FIXES = ["Move proof closer to the first action", "Make the offer clear in one screen", "Show the safest next step"] as const;

export function CendorqProductMotionDemo() {
  const [active, setActive] = useState(0);
  const step = STEPS[active];

  useEffect(() => {
    const timer = window.setInterval(() => setActive((value) => (value + 1) % STEPS.length), 2400);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <figure className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/82 p-2 shadow-[0_34px_110px_rgba(14,165,233,0.14)] backdrop-blur-2xl sm:rounded-[2.7rem] sm:p-3" aria-label="Animated Cendorq scan preview">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(251,207,232,0.22),transparent_30%),radial-gradient(circle_at_92%_0%,rgba(125,211,252,0.32),transparent_38%)]" aria-hidden="true" />
      <div className="relative overflow-hidden rounded-[1.7rem] border border-cyan-100 bg-[linear-gradient(135deg,#ffffff,#f3fdff_52%,#fff8fb)] sm:rounded-[2.2rem]">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-[linear-gradient(90deg,transparent,rgba(34,211,238,0.28),transparent)] transition duration-1000" style={{ transform: `translateX(${active * 110 - 70}%)` }} aria-hidden="true" />

        <div className="relative grid gap-4 p-4 sm:p-5 lg:grid-cols-[0.92fr_1.08fr] lg:p-6">
          <section className="min-h-[24rem] rounded-[1.35rem] border border-cyan-100 bg-white/88 p-5 shadow-sm sm:p-6" aria-label="Cendorq scan state">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-[clamp(2rem,5vw,3.7rem)] font-semibold leading-[0.9] tracking-[-0.08em] text-slate-950">{step.title}</h2>
                <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">{step.copy}</p>
              </div>
              <p className="shrink-0 rounded-full border border-cyan-100 bg-cyan-50 px-3 py-2 text-xs font-black text-cyan-800">{step.metric}</p>
            </div>

            <div className="mt-6 grid gap-2">
              {SIGNALS.map(([label, copy, score], index) => {
                const awake = active >= index % STEPS.length;
                return (
                  <article key={label} className={`rounded-[1rem] border p-3 transition duration-500 ${awake ? "border-cyan-100 bg-cyan-50/42 shadow-sm" : "border-slate-100 bg-white"}`}>
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-black tracking-[-0.02em] text-slate-950">{label}</h3>
                        <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">{copy}</p>
                      </div>
                      <p className="text-2xl font-semibold tracking-[-0.06em] text-slate-950">{awake ? score : 21}</p>
                    </div>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white">
                      <div className="h-full rounded-full bg-cyan-300 transition-all duration-700" style={{ width: awake ? `${score}%` : "21%" }} />
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="grid gap-4" aria-label="Cendorq output preview">
            <div className="relative overflow-hidden rounded-[1.35rem] border border-cyan-100 bg-white p-5 shadow-[0_20px_70px_rgba(14,165,233,0.08)] sm:p-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(34,211,238,0.18),transparent_35%),radial-gradient(circle_at_100%_100%,rgba(217,70,239,0.1),transparent_35%)]" aria-hidden="true" />
              <div className="relative">
                <h3 className="text-4xl font-semibold tracking-[-0.08em] text-slate-950 sm:text-6xl">56</h3>
                <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">Visible, but not easy enough to choose.</p>
                <div className="mt-5 grid gap-2">
                  {FIXES.map((fix, index) => (
                    <p key={fix} className={`rounded-[1rem] border p-3 text-sm font-semibold leading-6 transition ${active === 2 && index === 0 ? "border-cyan-200 bg-cyan-100 text-slate-950" : "border-cyan-100 bg-white text-slate-600"}`}>{fix}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {STEPS.map((item, index) => (
                <button key={item.metric} type="button" onClick={() => setActive(index)} className={`rounded-[1rem] border p-3 text-left text-xs font-black transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${active === index ? "border-cyan-200 bg-cyan-100 text-slate-950" : "border-cyan-100 bg-white text-slate-600"}`}>
                  {item.metric}
                </button>
              ))}
            </div>

            <p className="rounded-[1rem] border border-cyan-100 bg-white p-4 text-xs font-semibold leading-5 text-slate-500 shadow-sm">Sample preview. Your scan uses your business details.</p>
          </section>
        </div>
      </div>
    </figure>
  );
}
