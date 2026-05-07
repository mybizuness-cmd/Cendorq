import Link from "next/link";

export function FinalCTASection() {
    return (
        <section className="mx-auto max-w-7xl px-6 pb-20 pt-6 md:pb-28">
            <div className="rounded-3xl border border-cyan-400/20 bg-white/5 p-8 md:p-12">
                <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
                    Start where clarity starts
                </p>

                <h2 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight text-white md:text-5xl">
                    Start with the Free Scan before you commit to the wrong fix.
                </h2>

                <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
                    The Free Scan is designed to reveal whether your business may be
                    losing trust, clarity, or visibility before deeper work begins.
                </p>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                    <Link
                        href="/free-check"
                        className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-8 py-4 text-base font-semibold text-slate-950 transition hover:bg-cyan-300"
                    >
                        Start the Free Scan
                    </Link>

                    <Link
                        href="/pricing"
                        className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-4 text-base font-semibold text-white transition hover:bg-white/10"
                    >
                        Review plans
                    </Link>
                </div>
            </div>
        </section>
    );
}
