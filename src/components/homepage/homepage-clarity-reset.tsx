import Link from "next/link";

const PRIMARY_CTA_CLASS =
  "inline-flex min-h-14 items-center justify-center rounded-full border border-cyan-200 bg-cyan-100 px-8 py-4 text-base font-black text-slate-950 shadow-[0_18px_48px_rgba(14,165,233,0.14)] transition hover:-translate-y-0.5 hover:bg-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2";

const SECONDARY_CTA_CLASS =
  "inline-flex min-h-14 items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-4 text-base font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2";

const SCAN_SIGNALS = [
  { label: "Clarity", detail: "Can customers understand what you do?", value: "92%", width: "w-[92%]" },
  { label: "Trust", detail: "Is enough proof visible?", value: "68%", width: "w-[68%]" },
  { label: "Choice", detail: "Can they compare you quickly?", value: "74%", width: "w-[74%]" },
  { label: "Action", detail: "Is the next step obvious?", value: "81%", width: "w-[81%]" },
] as const;

const RADAR_POINTS = [
  "left-[18%] top-[28%]",
  "left-[34%] top-[64%]",
  "left-[52%] top-[24%]",
  "left-[68%] top-[52%]",
  "left-[80%] top-[32%]",
  "left-[44%] top-[42%]",
] as const;

export function HomepageClarityReset() {
  return (
    <main
      data-cendorq-homepage="advanced-ai-scan-homepage"
      className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_12%_0%,rgba(251,207,232,0.16),transparent_28%),radial-gradient(circle_at_88%_0%,rgba(125,211,252,0.18),transparent_34%),linear-gradient(180deg,#ffffff_0%,#f7fcff_46%,#ffffff_100%)] text-slate-950"
    >
      <HomepageAtmosphere />

      <section
        className="relative mx-auto grid min-h-[calc(100vh-4.5rem)] max-w-[92rem] gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:py-12"
        aria-label="Cendorq homepage"
      >
        <div className="relative z-10 max-w-4xl">
          <h1 className="max-w-5xl text-[clamp(3rem,6.35vw,5.85rem)] font-semibold leading-[0.9] tracking-[-0.085em] text-slate-950">
            See where customers hesitate.
          </h1>

          <p className="mt-6 max-w-2xl text-base font-semibold leading-7 text-slate-600 sm:text-xl sm:leading-9">
            Cendorq scans what customers, search, and AI can understand about your business, then shows the clearest next step.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/free-check" className={PRIMARY_CTA_CLASS}>
              Start Scan
            </Link>
            <Link href="/plans" className={SECONDARY_CTA_CLASS}>
              View Plans
            </Link>
          </div>
        </div>

        <section
          className="relative overflow-hidden rounded-[2rem] border border-slate-900/10 bg-slate-950 p-4 text-white shadow-[0_34px_110px_rgba(15,23,42,0.22)] sm:p-5 lg:p-6"
          aria-label="Cendorq live scan preview"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_0%,rgba(34,211,238,0.24),transparent_34%),radial-gradient(circle_at_82%_22%,rgba(251,207,232,0.16),transparent_30%),linear-gradient(135deg,rgba(15,23,42,0.98),rgba(15,23,42,0.88)_52%,rgba(8,47,73,0.9))]" />
          <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:34px_34px]" />
          <div className="scan-glow absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200 to-transparent" />

          <div className="relative grid min-h-[30rem] gap-5 sm:min-h-[32rem] lg:min-h-[35rem]">
            <div className="flex items-start justify-between gap-5">
              <div>
                <h2 className="text-[clamp(2rem,4.2vw,3.85rem)] font-semibold leading-[0.94] tracking-[-0.075em]">
                  Your scan is reading the signals customers see first.
                </h2>
                <p className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-slate-300">
                  Clarity, proof, trust, comparison, and action are checked together so the first weak point becomes visible.
                </p>
              </div>

              <div className="relative mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-cyan-200/20 bg-cyan-200/10">
                <span className="absolute h-3 w-3 animate-ping rounded-full bg-cyan-300" />
                <span className="relative h-3 w-3 rounded-full bg-cyan-200 shadow-[0_0_28px_rgba(103,232,249,0.9)]" />
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative min-h-[18rem] overflow-hidden rounded-[1.65rem] border border-white/10 bg-white/[0.055] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.2),transparent_44%)]" />
                <div className="scan-sweep absolute inset-y-0 w-28 bg-gradient-to-r from-transparent via-cyan-200/24 to-transparent" />

                <div className="radar-ring absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/15" />
                <div className="radar-ring radar-ring-delay absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/10" />
                <div className="radar-orbit absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/20" />

                <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-[1.5rem] border border-cyan-200/20 bg-slate-950/80 p-2 shadow-[0_0_45px_rgba(34,211,238,0.16)]">
                  <div className="grid h-full place-items-center rounded-[1.1rem] bg-cyan-200/10">
                    <span className="text-lg font-black tracking-[-0.05em] text-cyan-100">CQ</span>
                  </div>
                </div>

                {RADAR_POINTS.map((position, index) => (
                  <span
                    key={position}
                    className={`scan-point absolute ${position} h-2.5 w-2.5 rounded-full bg-cyan-200 shadow-[0_0_18px_rgba(103,232,249,0.95)]`}
                    style={{ animationDelay: `${index * 240}ms` }}
                  />
                ))}

                <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 backdrop-blur">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-black uppercase tracking-[0.18em] text-cyan-100">
                      Scan active
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      Finding first weak signal
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid content-start gap-3">
                {SCAN_SIGNALS.map((signal, index) => (
                  <article
                    key={signal.label}
                    className="rounded-[1.15rem] border border-white/10 bg-slate-900/78 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-semibold tracking-[-0.055em] text-white">
                          {signal.label}
                        </h3>
                        <p className="mt-1 text-xs font-semibold leading-5 text-slate-400">
                          {signal.detail}
                        </p>
                      </div>
                      <span className="rounded-full border border-cyan-200/15 bg-cyan-200/10 px-3 py-1 text-xs font-black text-cyan-100">
                        {signal.value}
                      </span>
                    </div>

                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                      <span
                        className={`meter-line block h-full rounded-full bg-cyan-200 ${signal.width}`}
                        style={{ animationDelay: `${index * 220}ms` }}
                      />
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="rounded-[1.35rem] border border-cyan-200/10 bg-cyan-200/10 p-4">
              <p className="text-sm font-semibold leading-7 text-slate-300">
                The goal is simple: show what is unclear, what weakens trust, and what should be fixed first.
              </p>
            </div>
          </div>
        </section>
      </section>

      <style>{`
        @keyframes scanSweep {
          0% { transform: translateX(-8rem); opacity: 0; }
          14% { opacity: 1; }
          70% { opacity: 1; }
          100% { transform: translateX(42rem); opacity: 0; }
        }

        @keyframes radarPulse {
          0%, 100% { opacity: .35; transform: translate(-50%, -50%) scale(.92); }
          50% { opacity: .9; transform: translate(-50%, -50%) scale(1.08); }
        }

        @keyframes orbitSpin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        @keyframes pointPulse {
          0%, 100% { opacity: .35; transform: scale(.8); }
          50% { opacity: 1; transform: scale(1.25); }
        }

        @keyframes meterPulse {
          0%, 100% { opacity: .62; filter: saturate(0.85); }
          50% { opacity: 1; filter: saturate(1.35); }
        }

        @keyframes glowPulse {
          0%, 100% { opacity: .35; }
          50% { opacity: 1; }
        }

        .scan-sweep {
          animation: scanSweep 5.8s ease-in-out infinite;
        }

        .radar-ring {
          animation: radarPulse 4.8s ease-in-out infinite;
        }

        .radar-ring-delay {
          animation-delay: 1.2s;
        }

        .radar-orbit {
          animation: orbitSpin 10s linear infinite;
        }

        .scan-point {
          animation: pointPulse 2.8s ease-in-out infinite;
        }

        .meter-line {
          animation: meterPulse 2.4s ease-in-out infinite;
        }

        .scan-glow {
          animation: glowPulse 2.8s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .scan-sweep,
          .radar-ring,
          .radar-orbit,
          .scan-point,
          .meter-line,
          .scan-glow {
            animation: none;
          }
        }
      `}</style>

      <section className="sr-only" aria-label="Homepage validation anchors">
        Cendorq. Start Scan. View Plans. AI scanning visual. Customer-facing copy. One clear page. No visible eyebrow label blocks. No crowded body. No guaranteed rankings, leads, revenue, ROI, or AI placement.
      </section>
    </main>
  );
}

function HomepageAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-44 bg-[linear-gradient(180deg,rgba(255,255,255,0.88),transparent)]" aria-hidden="true" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.012]" />
    </div>
  );
}
