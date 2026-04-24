const trustPoints = [
  "Built for real businesses, not vanity metrics or vague audit theater",
  "Strong enough to support deeper strategy, implementation, and recurring command later",
  "Written so serious non-technical owners can still understand what is happening",
  "Designed to improve signal quality, confidence, and next-step judgment before escalation",
] as const;

export function FreeCheckTrustStrip() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-10">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {trustPoints.map((point, index) => (
          <div
            key={point}
            className={
              index === 0
                ? "system-chip rounded-[1.2rem] px-5 py-4 text-sm leading-7 text-slate-100"
                : "system-surface rounded-[1.2rem] px-5 py-4 text-sm leading-7 text-slate-200"
            }
          >
            {point}
          </div>
        ))}
      </div>
    </section>
  );
}
