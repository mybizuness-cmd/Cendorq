"use client";

import { useEffect, useMemo, useState } from "react";

const STEPS = [
  { label: "Input", title: "Business entered", copy: "One public profile starts the read.", metric: "Ready" },
  { label: "Scan", title: "Public signals checked", copy: "Findability, clarity, proof, choice, and action are read together.", metric: "5 layers" },
  { label: "Gap", title: "Weak point found", copy: "The system shows why the business is visible but still harder to choose.", metric: "Choice gap" },
  { label: "Queue", title: "Next repair ordered", copy: "The output becomes a short repair path instead of another generic audit.", metric: "3 moves" },
] as const;

const SIGNALS = [
  ["Findability", 72],
  ["Understanding", 63],
  ["Trust proof", 48],
  ["Choice clarity", 56],
] as const;

const REPAIRS = ["Move proof closer to the CTA", "Clarify the above-fold offer", "Make the next step unmistakable"] as const;

export function CendorqProductMotionDemo() {
  const [active, setActive] = useState(0);
  const step = STEPS[active];
  const progress = useMemo(() => `${((active + 1) / STEPS.length) * 100}%`, [active]);

  useEffect(() => {
    const timer = window.setInterval(() => setActive((value) => (value + 1) % STEPS.length), 2200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <figure className="relative overflow-hidden rounded-[2.35rem] border border-white/80 bg-white/80 p-2 shadow-[0_36px_120px_rgba(14,165,233,0.14)] backdrop-blur-2xl sm:rounded-[3rem] sm:p-3" aria-label="Animated Cendorq product loop">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_0%,rgba(251,207,232,0.2),transparent_32%),radial-gradient(circle_at_100%_12%,rgba(125,211,252,0.28),transparent_36%)]" aria-hidden="true" />
      <div className="relative overflow-hidden rounded-[2rem] border border-cyan-100 bg-[linear-gradient(145deg,#ffffff,#f5fdff_52%,#fff8fb)] sm:rounded-[2.55rem]">
        <div className="flex items-center justify-between border-b border-cyan-100 bg-white/74 px-4 py-3 sm:px-5">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-fuchsia-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          </div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-700">Live product loop</p>
        </div>

        <div className="grid gap-4 p-4 sm:p-5 xl:grid-cols-[0.92fr_1.08fr]">
          <section className="rounded-[1.55rem] border border-cyan-100 bg-white p-5 shadow-sm sm:p-6" aria-label="Cendorq scan state">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-black text-cyan-700">{step.label}</p>
                <h2 className="mt-2 text-[clamp(2rem,6vw,3.65rem)] font-semibold leading-[0.9] tracking-[-0.075em] text-slate-950">{step.title}</h2>
              </div>
              <p className="rounded-full border border-cyan-100 bg-cyan-50 px-3 py-2 text-sm font-black text-slate-950">{step.metric}</p>
            </div>
            <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">{step.copy}</p>
            <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-cyan-400 transition-all duration-700" style={{ width: progress }} />
            </div>
            <div className="mt-5 grid gap-2">
              {SIGNALS.map(([label, score], index) => (
                <div key={label} className="rounded-[1rem] border border-slate-100 bg-slate-50/70 p-3">
                  <div className="flex items-center justify-between text-xs font-black text-slate-700"><span>{label}</span><span className="text-cyan-700">{active > index - 1 ? score : 18}</span></div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white">
                    <div className="h-full rounded-full bg-cyan-300 transition-all duration-700" style={{ width: active > index - 1 ? `${score}%` : "18%" }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-4" aria-label="Cendorq output">
            <div className="rounded-[1.55rem] border border-cyan-100 bg-cyan-50/44 p-5 shadow-sm sm:p-6">
              <p className="text-sm font-black text-cyan-700">Presence Report</p>
              <h3 className="mt-2 text-4xl font-semibold tracking-[-0.075em] text-slate-950 sm:text-6xl">56</h3>
              <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">Visible, but not easy enough to choose.</p>
            </div>

            <div className="rounded-[1.55rem] border border-cyan-100 bg-white p-5 shadow-sm sm:p-6">
              <h3 className="text-2xl font-semibold tracking-[-0.055em] text-slate-950">Repair queue</h3>
              <div className="mt-4 grid gap-2">
                {REPAIRS.map((repair, index) => (
                  <p key={repair} className={`rounded-[1rem] border border-cyan-100 p-3 text-sm font-semibold leading-6 transition ${active >= 3 && index === 0 ? "bg-cyan-100 text-slate-950 shadow-sm" : "bg-white text-slate-600"}`}>{repair}</p>
                ))}
              </div>
            </div>

            <div className="rounded-[1.55rem] border border-cyan-100 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold leading-5 text-slate-500">Sample data only. No ranking, lead, revenue, or AI-placement promise.</p>
            </div>
          </section>
        </div>
      </div>
    </figure>
  );
}
