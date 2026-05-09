import Link from "next/link";

export function HeroSection() {
    return (
        <section className="mx-auto max-w-7xl px-6 pb-20 pt-16 md:pb-28 md:pt-24">
            <div className="max-w-5xl">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-400">
                    AI Engine Readiness
                </p>

                <h1 className="mt-6 text-5xl font-semibold tracking-tight text-white md:text-7xl">
                    Strong businesses get skipped online for reasons they rarely see clearly.
                </h1>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
                    Cendorq checks whether AI engines and customers can understand what the business does, why it should be trusted, and why someone should choose it.
                </p>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                    <Link
                        href="/free-check"
                        className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-8 py-4 text-base font-semibold text-slate-950 transition hover:bg-cyan-300"
                    >
                        Start the Free Scan
                    </Link>

                    <Link
                        href="/plans/deep-review"
                        className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-4 text-base font-semibold text-white transition hover:bg-white/10"
                    >
                        See how AI Readiness Review works
                    </Link>
                </div>

                <div className="mt-10 flex flex-wrap gap-3 text-sm text-slate-300">
                    <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                        Clear review before expensive repair
                    </div>
                    <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                        Built for non-technical business owners
                    </div>
                    <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                        Structured for future intelligence growth
                    </div>
                </div>
            </div>
        </section>
    );
}
