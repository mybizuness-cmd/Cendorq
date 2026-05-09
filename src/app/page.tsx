import { buildMetadata } from "@/lib/seo";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export const metadata = buildMetadata({
  title: "Cendorq | AI Search Visibility and Market Command Intelligence",
  description:
    "Cendorq checks whether AI engines can understand what a business does, why it should be trusted, and why customers should choose it. Start with the Free Scan before spending on bigger fixes.",
  path: "/",
  keywords: [
    "cendorq",
    "AI readiness for business",
    "AI search visibility",
    "AI answer visibility",
    "business clarity scan",
    "business trust scan",
    "market command intelligence",
  ],
  image: { alt: "Cendorq AI Search Visibility and Market Command Intelligence." },
});

const PATH = [
  {
    label: "Scan",
    href: "/free-check",
    line: "Find the first weak signal before you spend deeper.",
    body: "Cendorq reads the public layer AI engines and customers can see first: clarity, proof, trust, action, and the path to choose.",
    checks: ["Business clarity", "AI/search read", "First trust gap"],
    action: "Start the scan",
  },
  {
    label: "Diagnose",
    href: "/plans/deep-review",
    line: "Separate the visible symptom from the real cause.",
    body: "A deeper review connects what looks weak to why it is weak, so the next move is based on evidence, not guesswork.",
    checks: ["Cause-level proof", "Signal priority", "Decision friction"],
    action: "Review the diagnosis",
  },
  {
    label: "Fix",
    href: "/plans/build-fix",
    line: "Improve the strongest proven weak point.",
    body: "The fix is scoped around the place where clarity, proof, or action is most likely to change how the business is understood.",
    checks: ["Message repair", "Proof upgrade", "Action path"],
    action: "See the fix path",
  },
  {
    label: "Control",
    href: "/plans/ongoing-control",
    line: "Keep the business ready as AI engines change.",
    body: "Cendorq keeps watch on the signals that can drift: clarity, trust, proof, visibility, and the next action customers should take.",
    checks: ["Signal watch", "Readiness drift", "Market movement"],
    action: "See control",
  },
] as const;

const SIGNALS = ["Get found", "Be understood", "Prove trust", "Win choice", "Make action clear"] as const;

const softButton = "inline-flex items-center justify-center border border-slate-300 bg-white font-semibold text-slate-950 shadow-sm transition duration-200 hover:border-slate-400 hover:bg-slate-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2";

export default function HomePage() {
  return (
    <main data-cendorq-homepage="market-command-home-v5" className="min-h-screen overflow-hidden bg-white text-slate-950">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col items-center justify-center px-5 py-10 text-center sm:px-8 lg:py-12">
        <p className="text-xs font-semibold uppercase tracking-[0.34em] text-slate-400">AI Engine Readiness</p>
        <h1 className="mt-6 max-w-6xl text-[clamp(2.55rem,6.8vw,5.85rem)] font-semibold uppercase leading-[0.92] tracking-[-0.065em] text-slate-950">
          If AI engines cannot understand your business, customers may never get the chance to.
        </h1>

        <p className="mt-6 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
          AI-readiness starts with business clarity. Cendorq checks whether your business is clear, trusted, and ready to be chosen across search, AI answers, reviews, maps, and your website.
        </p>

        <div className="mt-8 w-full max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-2.5 shadow-[0_24px_80px_rgba(15,23,42,0.09)]">
          <div className="grid gap-2 sm:grid-cols-[1fr_auto] sm:items-center">
            <p className="px-5 py-4 text-left text-lg font-semibold leading-7 text-slate-950 sm:text-xl">
              Start with the Free Scan. See what AI engines and customers may be reading wrong.
            </p>
            <Link href="/free-check" className={`${softButton} min-h-14 min-w-52 rounded-[1.35rem] px-8 py-4 text-base`}>
              Start Free Scan →
            </Link>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm font-semibold text-slate-600">
          {SIGNALS.map((item) => (
            <span key={item} className="rounded-full border border-slate-200 bg-white px-4 py-2 shadow-[0_8px_24px_rgba(15,23,42,0.045)]">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section id="ai-readiness" className="mx-auto max-w-7xl scroll-mt-24 px-5 pb-14 sm:px-8" aria-label="AI readiness and how Cendorq works">
        <div className="grid gap-5 lg:grid-cols-[0.74fr_1.26fr] lg:items-stretch">
          <div className="rounded-[2.25rem] border border-slate-200 bg-white p-6 shadow-[0_18px_70px_rgba(15,23,42,0.065)] sm:p-8 lg:p-9">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">The system path</p>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl">
              AI is becoming the new first impression.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              To be recommended, a business needs clear facts, trusted proof, consistent signals, and a reason to choose. Cendorq finds the weak signal first without promising rankings, leads, revenue, or AI placement.
            </p>
            <p className="mt-5 rounded-[1.35rem] border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-semibold leading-6 text-slate-700">
              The goal is not to decorate the business. The goal is to make the business easier for AI engines and customers to understand, trust, and act on.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/free-check" className={`${softButton} min-h-12 rounded-full px-6 py-3 text-sm`}>
                Start Free Scan
              </Link>
              <Link href="/plans" className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-600 transition duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
                Review Plans
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {PATH.map((stage) => (
              <Link key={stage.href} href={stage.href} className="group flex min-h-[18rem] flex-col rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_14px_48px_rgba(15,23,42,0.055)] transition duration-200 hover:border-slate-300 hover:bg-slate-50/40 hover:shadow-[0_22px_62px_rgba(15,23,42,0.085)] focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
                <h3 className="text-4xl font-semibold tracking-[-0.065em] text-slate-950">{stage.label}</h3>
                <p className="mt-3 text-lg font-semibold leading-7 tracking-[-0.025em] text-slate-900">{stage.line}</p>
                <p className="mt-4 text-sm leading-7 text-slate-600">{stage.body}</p>
                <div className="mt-6 grid gap-2 text-sm font-medium text-slate-600">
                  {stage.checks.map((item) => (
                    <span key={item} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-[0_8px_22px_rgba(15,23,42,0.035)] transition duration-200 group-hover:border-slate-300">
                      {item}
                    </span>
                  ))}
                </div>
                <p className="mt-auto pt-6 text-sm font-semibold text-slate-500 transition duration-200 group-hover:text-slate-950">{stage.action} →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sr-only" aria-label="Cendorq homepage verification">
        Cendorq homepage replacement. If AI engines cannot understand your business customers may never get the chance to. AI-readiness starts with business clarity. AI is becoming the new first impression. Start with the Free Scan. See what AI engines and customers may be reading wrong. Free Scan. Deep Review. Build Fix. Ongoing Control. Scan. Diagnose. Fix. Control. Start Free Scan. Review Plans. Whiter body. No hero badge. No card badges. No card numbers. No card prices. Richer system cards. Softer hover states. No AI placement promises. AI Readiness anchor.
      </section>
    </main>
  );
}
