"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const STEPS = [
  { label: "Start", title: "Enter the business.", copy: "One clean input starts the scan. The page shows the product working instead of explaining too much.", metric: "1 input" },
  { label: "Scan", title: "Read public signals.", copy: "Cendorq checks whether the business can be found, understood, trusted, compared, and chosen.", metric: "5 checks" },
  { label: "Score", title: "Show the Presence Score.", copy: "A first signal appears with a clear boundary: useful direction, not a guaranteed outcome.", metric: "72 / 100" },
  { label: "Gap", title: "Find the Choice Gap.", copy: "The demo turns visibility into a decision gap: clarity, proof, trust, comparison, or action friction.", metric: "Trust proof" },
  { label: "Queue", title: "Rank the Repair Queue.", copy: "Weak signals become a short priority order instead of a wall of audit noise.", metric: "3 fixes" },
  { label: "Control", title: "Create the Control Snapshot.", copy: "After review or repair, the system keeps the next safe command visible as signals drift.", metric: "Watch state" },
] as const;

const SIGNALS = [
  ["Findability", 72],
  ["Understanding", 68],
  ["Trust", 54],
  ["Choice", 61],
  ["Action", 76],
] as const;

const QUEUE = [
  ["01", "Lift proof higher"],
  ["02", "Clarify the offer"],
  ["03", "Tighten the next step"],
] as const;

export function CendorqProductMotionDemo() {
  const [active, setActive] = useState(0);
  const step = STEPS[active];
  const progress = useMemo(() => `${((active + 1) / STEPS.length) * 100}%`, [active]);

  useEffect(() => {
    const timer = window.setInterval(() => setActive((value) => (value + 1) % STEPS.length), 2800);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden px-5 py-10 sm:px-8 lg:py-16" aria-label="Cendorq product motion demo">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(251,207,232,0.38),transparent_30%),radial-gradient(circle_at_100%_12%,rgba(125,211,252,0.42),transparent_34%)]" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl gap-7 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div>
          <p className="inline-flex rounded-full border border-cyan-100 bg-white/82 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-cyan-700 shadow-sm backdrop-blur">Product motion demo</p>
          <h2 className="mt-5 max-w-4xl text-[clamp(2.85rem,12vw,5.9rem)] font-semibold leading-[0.9] tracking-[-0.082em] text-slate-950">
            Watch one weak signal become <span className="block text-cyan-600">a repair path.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base font-semibold leading-8 text-slate-600 sm:text-lg">
            Cendorq should feel like a tool working in front of the customer: scan, score, gap, queue, and control.
          </p>
          <div className="mt-7 grid gap-3 sm:flex">
            <Link href="/free-check" className="inline-flex min-h-14 items-center justify-center rounded-full border border-cyan-200 bg-white px-8 py-4 text-base font-black text-slate-950 shadow-[0_18px_48px_rgba(14,165,233,0.14)] transition hover:-translate-y-0.5 hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2">Start Free Scan</Link>
            <Link href="/sample-report" className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/90 bg-white/72 px-8 py-4 text-base font-bold text-slate-800 shadow-[0_12px_36px_rgba(15,23,42,0.06)] backdrop-blur transition hover:-translate-y-0.5 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2">See Sample Report</Link>
          </div>
        </div>

        <div className="overflow-hidden rounded-[2.4rem] border border-white/80 bg-white/76 p-3 shadow-[0_32px_110px_rgba(15,23,42,0.12)] backdrop-blur-2xl">
          <div className="rounded-[2rem] border border-cyan-100 bg-[linear-gradient(145deg,#ffffff,#f6fcff_55%,#fff7fb)] p-4 sm:p-5">
            <div className="flex items-start justify-between gap-4 border-b border-cyan-100 pb-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-700">Presence scan</p>
                <h3 className="mt-1 text-2xl font-semibold tracking-[-0.06em] text-slate-950">Sample business</h3>
              </div>
              <div className="rounded-2xl border border-cyan-100 bg-cyan-50 px-4 py-3 text-right">
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-cyan-700">{step.label}</p>
                <p className="text-lg font-black text-slate-950">{step.metric}</p>
              </div>
            </div>

            <div className="mt-5 grid gap-4 xl:grid-cols-[0.78fr_1.22fr]">
              <article className="rounded-[1.5rem] border border-cyan-100 bg-white p-4 shadow-sm">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-700">Step {active + 1} of {STEPS.length}</p>
                <h4 className="mt-3 text-4xl font-semibold leading-[0.9] tracking-[-0.07em] text-slate-950">{step.title}</h4>
                <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">{step.copy}</p>
                <div className="mt-5 h-2 overflow-hidden rounded-full bg-cyan-50">
                  <div className="h-full rounded-full bg-cyan-400 transition-all duration-500" style={{ width: progress }} />
                </div>
              </article>

              <article className="rounded-[1.5rem] border border-cyan-100 bg-white p-4 shadow-sm">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-cyan-700">Presence Score</p>
                    <p className="mt-1 text-5xl font-black tracking-[-0.08em] text-slate-950">72</p>
                  </div>
                  <p className="rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1 text-xs font-black text-cyan-800">First signal</p>
                </div>
                <div className="mt-4 grid gap-2">
                  {SIGNALS.map(([label, score]) => (
                    <div key={label} className="grid gap-1 rounded-[0.9rem] border border-slate-100 bg-slate-50/70 p-3">
                      <div className="flex items-center justify-between text-xs font-black"><span>{label}</span><span className="text-cyan-700">{score}</span></div>
                      <div className="h-2 overflow-hidden rounded-full bg-white">
                        <div className="h-full rounded-full bg-cyan-400 transition-all duration-700" style={{ width: active === 0 ? "18%" : `${score}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </div>

            <div className="mt-4 grid gap-3 lg:grid-cols-3">
              {QUEUE.map(([number, title], index) => (
                <article key={title} className={`rounded-[1.2rem] border border-cyan-100 bg-white/84 p-4 shadow-sm transition ${active >= 4 && index === 0 ? "-translate-y-1 ring-2 ring-cyan-200" : ""}`}>
                  <p className="text-xs font-black text-cyan-700">{number}</p>
                  <h5 className="mt-2 text-lg font-semibold tracking-[-0.045em] text-slate-950">{title}</h5>
                  <p className="mt-2 text-xs font-semibold leading-5 text-slate-600">Sample priority shown for demo only.</p>
                </article>
              ))}
            </div>

            <p className="mt-4 rounded-[1rem] border border-cyan-100 bg-cyan-50/60 p-3 text-xs font-semibold leading-5 text-slate-600">
              Sample data only. Cendorq gives direction for the next repair decision without promising placement or outcomes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
