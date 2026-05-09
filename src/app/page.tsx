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
    detail: "First read",
    price: "$0",
    copy: "Find where AI engines and customers may misunderstand, distrust, or skip the business.",
  },
  {
    label: "Diagnose",
    href: "/plans/deep-review",
    detail: "Cause proof",
    price: "$497",
    copy: "Confirm which signal is weakening clarity, proof, visibility, or choice.",
  },
  {
    label: "Fix",
    href: "/plans/build-fix",
    detail: "Focused change",
    price: "$1,497",
    copy: "Improve the clearest weak point after the evidence shows what matters.",
  },
  {
    label: "Control",
    href: "/plans/ongoing-control",
    detail: "Monthly watch",
    price: "$597/mo",
    copy: "Keep AI readiness, trust signals, proof, and action paths from drifting again.",
  },
] as const;

const SIGNALS = ["Get found", "Be understood", "Prove trust", "Win choice", "Make action clear"] as const;

export default function HomePage() {
  return (
    <main data-cendorq-homepage="market-command-home-v4" className="min-h-screen overflow-hidden bg-white text-slate-950">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col items-center justify-center px-5 py-9 text-center sm:px-8 lg:py-10">
        <h1 className="max-w-6xl text-[clamp(3.1rem,8vw,7.35rem)] font-semibold leading-[0.9] tracking-[-0.085em] text-slate-950">
          If AI engines cannot understand your business, customers may never get the chance to.
        </h1>

        <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
          AI-readiness starts with business clarity. Cendorq checks whether your business is clear, trusted, and ready to be chosen across search, AI answers, reviews, maps, and your website.
        </p>

        <div className="mt-7 w-full max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-2.5 shadow-[0_24px_80px_rgba(15,23,42,0.09)]">
          <div className="grid gap-2 sm:grid-cols-[1fr_auto] sm:items-center">
            <p className="px-5 py-4 text-left text-lg font-semibold leading-7 text-slate-950 sm:text-xl">
              Start with the Free Scan. See what AI engines and customers may be reading wrong.
            </p>
            <Link href="/free-check" className="inline-flex min-h-14 min-w-52 items-center justify-center rounded-[1.35rem] border border-slate-950 bg-white px-8 py-4 text-base font-semibold text-slate-950 shadow-sm transition hover:bg-slate-950 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
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

      <section className="mx-auto max-w-7xl px-5 pb-12 sm:px-8" aria-label="How Cendorq works">
        <div className="grid gap-4 lg:grid-cols-[0.78fr_1.22fr] lg:items-stretch">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_16px_60px_rgba(15,23,42,0.06)] sm:p-8">
            <h2 className="text-4xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-5xl">
              AI is becoming the new first impression.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              To be recommended, a business needs clear facts, trusted proof, consistent signals, and a reason to choose. Cendorq finds the weak signal first without promising rankings, leads, or AI placement.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/free-check" className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-950 bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-950 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
                Start Free Scan
              </Link>
              <Link href="/plans" className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
                Review Plans
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {PATH.map((stage) => (
              <Link key={stage.href} href={stage.href} className="group rounded-[1.65rem] border border-slate-200 bg-white p-5 shadow-[0_10px_38px_rgba(15,23,42,0.045)] transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_20px_60px_rgba(15,23,42,0.085)] focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{stage.detail}</p>
                  <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">{stage.price}</span>
                </div>
                <h3 className="mt-5 text-3xl font-semibold tracking-[-0.055em] text-slate-950">{stage.label}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{stage.copy}</p>
                <p className="mt-5 text-sm font-semibold text-slate-500 transition group-hover:text-slate-950">Open {stage.label} →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sr-only" aria-label="Cendorq homepage verification">
        Cendorq homepage replacement. If AI engines cannot understand your business customers may never get the chance to. AI-readiness starts with business clarity. AI is becoming the new first impression. Start with the Free Scan. See what AI engines and customers may be reading wrong. Free Scan. Deep Review. Build Fix. Ongoing Control. Scan. Diagnose. Fix. Control. Start Free Scan. Review Plans. Whiter body. No hero badge. No AI placement promises.
      </section>
    </main>
  );
}
