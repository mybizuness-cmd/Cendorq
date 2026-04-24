const processSteps = [
    {
        title: "Structured entry",
        copy:
            "The Search Presence Scan opens with a cleaner, lower-friction path so strong prospects are not lost before they begin.",
    },
    {
        title: "Signal interpretation",
        copy:
            "Inputs are prepared to support deeper normalization, scoring, and business intelligence in later platform layers.",
    },
    {
        title: "Diagnosis before optimization",
        copy:
            "The system is designed to identify what is actually wrong before more effort is spent in the wrong direction.",
    },
    {
        title: "Strategic next actions",
        copy:
            "The eventual goal is not just a score. It is a clear understanding of what to fix next and why it matters.",
    },
];

const positioningBullets = [
    "Cendorq is not built to guess loudly.",
    "It is built to detect what is suppressing confidence.",
    "That makes future optimization cleaner, smarter, and more profitable.",
];

export function ProcessSection() {
    return (
        <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
            <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-lg md:p-12">
                <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
                            How Cendorq works
                        </p>

                        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">
                            This platform is being built to think before it pushes.
                        </h2>

                        <p className="mt-6 text-base leading-8 text-slate-300 md:text-lg">
                            Generic optimization often creates more noise. Cendorq is built
                            around diagnosis, confidence, and structured next actions so the
                            system can become smarter and more valuable over time.
                        </p>

                        <div className="mt-8 space-y-3">
                            {positioningBullets.map((item) => (
                                <div
                                    key={item}
                                    className="rounded-2xl border border-slate-800 bg-slate-950 px-5 py-4 text-sm leading-7 text-slate-200"
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid gap-4">
                        {processSteps.map((step, index) => (
                            <div
                                key={step.title}
                                className="rounded-3xl border border-slate-800 bg-slate-950 p-6"
                            >
                                <p className="text-xs font-semibold uppercase tracking-widest text-cyan-300">
                                    Step {index + 1}
                                </p>
                                <h3 className="mt-3 text-xl font-semibold text-white">
                                    {step.title}
                                </h3>
                                <p className="mt-3 text-sm leading-7 text-slate-300">
                                    {step.copy}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}