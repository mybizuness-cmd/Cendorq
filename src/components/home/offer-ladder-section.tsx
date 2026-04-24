import { plans } from "../../lib/plans";

const ladderNotes = [
    "Lower friction at entry.",
    "Higher specificity as intent increases.",
    "Deeper service only after clearer evidence.",
];

export function OfferLadderSection() {
    return (
        <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
            <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr]">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
                        Offer structure
                    </p>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">
                        The path is designed to move from clarity to commitment.
                    </h2>

                    <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
                        Cendorq should not force every visitor into the same level of friction.
                        The public experience starts with a lower-friction entry, then deepens as
                        intent, evidence, and commitment increase.
                    </p>

                    <div className="mt-8 space-y-3">
                        {ladderNotes.map((item) => (
                            <div
                                key={item}
                                className="rounded-2xl border border-slate-800 bg-slate-900 px-5 py-4 text-sm leading-7 text-slate-200"
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                    {plans.map((plan) => (
                        <article
                            key={plan.name}
                            className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
                        >
                            <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
                            <p className="mt-4 text-sm leading-7 text-slate-300">
                                {plan.summary}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}