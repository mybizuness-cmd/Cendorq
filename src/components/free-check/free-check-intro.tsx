const introReadouts = [
  {
    label: "Primary role",
    value: "First serious signal",
  },
  {
    label: "Best fit",
    value: "Businesses that need a cleaner first read",
  },
  {
    label: "Likely next layer",
    value: "Visibility Blueprint",
  },
] as const;

export function FreeCheckIntro() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-4 pt-12 sm:px-6 md:pt-16 xl:pt-20">
      <div className="max-w-5xl">
        <div className="system-chip inline-flex items-center rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">
          Search Presence Scan
        </div>

        <h1 className="system-hero-title mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl xl:text-7xl">
          Start with the strongest first signal
          <span className="system-gradient-text block">
            before the business pays for the wrong next move.
          </span>
        </h1>

        <p className="mt-6 max-w-4xl text-base leading-8 text-slate-300 sm:text-lg">
          Search Presence Scan is the controlled entry layer inside Cendorq. It is built to help real business owners understand whether trust, clarity, positioning, action friction, discoverability, or recommendation visibility weakness may be suppressing results before stronger pressure gets applied.
        </p>

        <p className="mt-5 max-w-4xl text-base leading-8 text-slate-300 sm:text-lg">
          In plain English: this helps the business get a cleaner first read, a cleaner next-step decision, and a lower chance of wasting money on the wrong fix just because the wrong layer looked louder.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {introReadouts.map((item, index) => (
          <div
            key={item.label}
            className={
              index === 0
                ? "system-chip rounded-[1.25rem] px-5 py-4"
                : "system-surface rounded-[1.25rem] px-5 py-4"
            }
          >
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
              {item.label}
            </div>
            <div className="mt-2 text-sm font-semibold leading-7 text-white">{item.value}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
