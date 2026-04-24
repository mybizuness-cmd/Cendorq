const signalBlocks = [
    {
        title: "Trust signals",
        copy:
            "Do you look current, credible, and safe to contact when someone is deciding whether to trust you?",
    },
    {
        title: "Clarity signals",
        copy:
            "Can people quickly understand what you do, who it is for, and why they should choose you?",
    },
    {
        title: "Structure signals",
        copy:
            "Are your site, listings, and business details organized in a way that people and platforms can interpret reliably?",
    },
    {
        title: "Visibility signals",
        copy:
            "Are you easy to surface, compare, and recommend across search, maps, directories, and AI-mediated discovery?",
    },
];

const realityChecks = [
    "Good service does not automatically create trust online.",
    "Traffic alone does not fix confusion or weak positioning.",
    "More marketing can amplify the wrong impression if the foundation is unclear.",
];

export function ProblemFrameworkSection() {
    return (
        <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
            <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
                        Why businesses get skipped
                    </p>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">
                        Most businesses do not realize they are losing trust before they are losing traffic.
                    </h2>

                    <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
                        A business can be good in the real world and still look uncertain online.
                        When signals feel incomplete, unclear, or inconsistent, people hesitate —
                        and platforms hesitate too.
                    </p>

                    <div className="mt-8 space-y-3">
                        {realityChecks.map((item) => (
                            <div
                                key={item}
                                className="rounded-2xl border border-slate-800 bg-slate-900 px-5 py-4 text-sm leading-7 text-slate-200"
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                    {signalBlocks.map((item) => (
                        <article
                            key={item.title}
                            className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
                        >
                            <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                            <p className="mt-4 text-sm leading-7 text-slate-300">{item.copy}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}