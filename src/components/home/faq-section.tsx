const faqs = [
    {
        question: "Is this for businesses that are already successful offline?",
        answer:
            "Yes. One of the main problems Cendorq is built to detect is when a strong real-world business looks weaker online than it actually is.",
    },
    {
        question: "Is the Search Presence Scan the same thing as a Visibility Blueprint?",
        answer:
            "No. The Search Presence Scan is the lower-friction entry point. It is designed to reveal whether deeper diagnosis is warranted.",
    },
    {
        question: "Do I need to be technical to understand the output?",
        answer:
            "No. The system is being built to explain trust, clarity, structure, and visibility issues in language business owners can understand.",
    },
    {
        question: "Why not just do more marketing first?",
        answer:
            "Because more traffic or more spend can amplify confusion if the underlying business signals are weak or inconsistent.",
    },
];

export function FaqSection() {
    return (
        <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
            <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
                    Common questions
                </p>

                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">
                    The right fix starts with the right understanding.
                </h2>

                <p className="mt-6 text-base leading-8 text-slate-300 md:text-lg">
                    These are the questions serious business owners usually ask before they commit.
                </p>
            </div>

            <div className="mt-12 grid gap-4">
                {faqs.map((faq) => (
                    <article
                        key={faq.question}
                        className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
                    >
                        <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                        <p className="mt-3 text-sm leading-7 text-slate-300">{faq.answer}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}