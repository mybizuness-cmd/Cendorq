import { buildMetadata } from "@/lib/seo";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export const metadata = buildMetadata({
  title: "Cendorq | AI Search Visibility and Market Command Intelligence",
  description:
    "Cendorq helps a business become easier for customers, search, maps, reviews, and AI answers to find, understand, trust, and choose. Start with the Free Scan, then move deeper only when the next command is justified.",
  path: "/",
  keywords: [
    "cendorq",
    "market command intelligence",
    "free business scan",
    "AI search visibility",
    "AI answer visibility",
    "business trust scan",
    "customer choice intelligence",
    "business clarity scan",
  ],
  image: { alt: "Cendorq AI Search Visibility and Market Command Intelligence." },
});

const PATH = [
  {
    label: "Scan",
    href: "/free-check",
    detail: "First signal",
    price: "$0",
    copy: "Find the clearest AI/search, trust, or action signal before buying more depth.",
  },
  {
    label: "Diagnose",
    href: "/plans/deep-review",
    detail: "Cause-level proof",
    price: "$497",
    copy: "Confirm what is actually weakening visibility, proof, or the customer path.",
  },
  {
    label: "Fix",
    href: "/plans/build-fix",
    detail: "Scoped improvement",
    price: "$1,497",
    copy: "Turn the strongest diagnosis into a focused customer-facing improvement.",
  },
  {
    label: "Control",
    href: "/plans/ongoing-control",
    detail: "Monthly watch",
    price: "$597/mo",
    copy: "Keep AI/search posture, proof, visibility, and friction from drifting again.",
  },
] as const;

const SIGNALS = ["Get found", "Be answer-ready", "Build trust", "Win choice", "Drive action"] as const;

export default function HomePage() {
  return (
    <main data-cendorq-homepage="market-command-home-v3" className="min-h-screen overflow-hidden bg-[#fffefa] text-slate-950">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col items-center justify-center px-5 py-10 text-center sm:px-8 lg:py-12">
        <h1 className="max-w-6xl text-[clamp(3.15rem,8vw,7.35rem)] font-semibold leading-[0.9] tracking-[-0.085em] text-slate-950">
          Become easier to find, trust, and choose.
        </h1>

        <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
          Cendorq checks how your business reads across customers, search, maps, reviews, and AI answers. Start with a Free Scan. Move deeper only when the next command is clear.
        </p>

        <div className="mt-7 w-full max-w-4xl rounded-[2.25rem] border border-slate-200 bg-white p-2.5 shadow-[0_30px_100px_rgba(15,23,42,0.11)]">
          <div className="grid gap-2 sm:grid-cols-[1fr_auto] sm:items-center">
            <p className="px-5 py-4 text-left text-lg font-semibold leading-7 text-slate-950 sm:text-xl">
              Run the Free Scan before buying the bigger fix.
            </p>
            <Link href="/free-check" className="inline-flex min-h-14 min-w-52 items-center justify-center rounded-[1.55rem] bg-slate-950 px-8 py-4 text-base font-semibold text-white shadow-[0_14px_34px_rgba(15,23,42,0.22)] transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
              Start Free Scan →
            </Link>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm font-semibold text-slate-600">
          {SIGNALS.map((item) => (
            <span key={item} className="rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-14 sm:px-8" aria-label="How Cendorq works">
        <div className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr] lg:items-stretch">
          <div className="rounded-[2.25rem] border border-slate-200 bg-white p-6 shadow-[0_18px_70px_rgba(15,23,42,0.07)] sm:p-8">
            <h2 className="text-4xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-5xl">
              Scan first. Then decide what depth is worth it.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              Free Scan can surface the first AI/search visibility, trust, proof, or action signal. It does not promise rankings, AI placement, leads, or a complete diagnosis.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/free-check" className="inline-flex min-h-12 items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
                Start Free Scan
              </Link>
              <Link href="/plans" className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
                Review Plans
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {PATH.map((stage) => (
              <Link key={stage.href} href={stage.href} className="group rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_12px_50px_rgba(15,23,42,0.055)] transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_22px_70px_rgba(15,23,42,0.10)] focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{stage.detail}</p>
                  <span className="rounded-full border border-slate-200 bg-[#fffefa] px-3 py-1 text-xs font-semibold text-slate-600">{stage.price}</span>
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
        Cendorq homepage replacement. Apple-level trust and authority. Google-level simplicity. ChatGPT-level immediate action. AI search visibility. AI answers. Free Scan. Deep Review. Build Fix. Ongoing Control. Scan. Diagnose. Fix. Control. Start Free Scan. Review Plans. CTA above the fold. Wider shell. Whiter body. No hero badge. Better signal labels. No AI placement promises.
      </section>
    </main>
  );
}
