import Link from "next/link";

const READOUTS = [
  { label: "System state", value: "Preparing route" },
  { label: "Fallback posture", value: "Stay inside the command path" },
  { label: "Recovery rule", value: "Use the cleanest next command" },
] as const;

const RECOVERY_OPTIONS = [
  {
    label: "Strongest restart lane",
    title: "Start Free Scan",
    copy: "Use the first signal layer when the safest next command is still unclear.",
    href: "/free-check",
    cta: "Start Free Scan",
    highlighted: true,
  },
  {
    label: "Reset route",
    title: "Return to homepage",
    copy: "Restore the broadest clean context and re-enter the Cendorq path without losing sequence.",
    href: "/",
    cta: "Go to homepage",
  },
  {
    label: "Compare command depth",
    title: "Review Plans",
    copy: "Compare Scan, Diagnose, Fix, and Control without returning to legacy pricing routes.",
    href: "/plans",
    cta: "Review Plans",
  },
] as const;

export default function GlobalLoadingPage() {
  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-12 text-white sm:px-6 md:py-16 xl:py-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-10 top-8 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute -right-8 top-24 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl sm:h-80 sm:w-80" />
        <div className="system-grid-wide absolute inset-0 opacity-[0.03]" />
      </div>

      <section className="relative z-10 grid min-h-[calc(100vh-8rem)] gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div>
          <p className="system-chip inline-flex rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-100">
            Cendorq / Loading
          </p>

          <h1 className="system-hero-title mt-5 max-w-5xl text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl xl:text-7xl">
            This route is preparing
            <span className="system-gradient-text block">the cleanest command view.</span>
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            Cendorq is holding the page until the route is stable enough to render cleanly. That is stronger than showing a weak partial state that looks ready before it is.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/free-check" className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition">
              Start Free Scan
            </Link>
            <Link href="/plans" className="system-button-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition">
              Review Plans
            </Link>
          </div>
        </div>

        <div className="relative z-10 grid gap-4">
          <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8">
            <p className="system-eyebrow">Loading posture</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Hold briefly. Preserve sequence. Recover into the command path.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-300">
              If this route keeps stalling, the safest recovery lanes are the homepage, Free Scan, or Plans. Those paths keep the user inside Scan, Diagnose, Fix, and Control.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {READOUTS.map((item, index) => (
                <div key={item.label} className={index === 0 ? "system-chip rounded-[1.25rem] p-4" : "system-surface rounded-[1.25rem] p-4"}>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">{item.label}</div>
                  <div className="mt-2 text-sm font-semibold text-white">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {RECOVERY_OPTIONS.map((option) => (
              <article key={option.href} className={option.highlighted ? "system-panel-authority rounded-[1.6rem] p-5" : "system-surface rounded-[1.6rem] p-5"}>
                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200">{option.label}</div>
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">{option.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{option.copy}</p>
                <Link href={option.href} className={option.highlighted ? "system-button-primary mt-5 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition" : "system-button-secondary mt-5 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition"}>
                  {option.cta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
