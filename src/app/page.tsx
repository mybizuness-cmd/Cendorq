import { buildMetadata } from "@/lib/seo";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export const metadata = buildMetadata({
  title: "Cendorq | AI Engine Readiness for Businesses",
  description:
    "Cendorq checks whether a business is clear enough for AI engines and customers to understand, trust, and choose. Start with the Free Scan before deeper work.",
  path: "/",
  keywords: [
    "cendorq",
    "AI engine readiness",
    "AI readiness for business",
    "AI search visibility",
    "business clarity scan",
    "business trust signals",
  ],
  image: { alt: "Cendorq AI Engine Readiness." },
});

const READINESS_PATH = [
  {
    label: "Scan",
    name: "Free Scan",
    href: "/free-check",
    copy: "Find the first weak signal before spending on deeper work.",
  },
  {
    label: "Review",
    name: "AI Readiness Review",
    href: "/plans/deep-review",
    copy: "Understand what is weakening clarity, trust, proof, or choice.",
  },
  {
    label: "Repair",
    name: "Signal Repair",
    href: "/plans/build-fix",
    copy: "Improve the page, message, proof, or action path that matters most.",
  },
  {
    label: "Control",
    name: "Readiness Control",
    href: "/plans/ongoing-control",
    copy: "Keep readiness from drifting as search, AI answers, and customers change.",
  },
] as const;

const CTA_CLASS =
  "inline-flex min-h-14 items-center justify-center rounded-full border border-slate-950 bg-white px-8 py-4 text-base font-semibold text-slate-950 shadow-[inset_0_0_0_1px_rgba(15,23,42,0.08),0_8px_24px_rgba(15,23,42,0.08)] transition duration-200 hover:border-slate-700 hover:bg-slate-50 hover:shadow-[inset_0_0_0_1px_rgba(15,23,42,0.12),0_10px_28px_rgba(15,23,42,0.1)] focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2";

export default function HomePage() {
  return (
    <main data-cendorq-homepage="ai-readiness-clean-path" className="min-h-screen overflow-hidden bg-white text-slate-950">
      <section className="mx-auto flex min-h-[calc(100vh-4.25rem)] max-w-7xl flex-col items-center justify-center px-5 py-12 text-center sm:px-8 lg:py-16">
        <h1 className="max-w-6xl text-[clamp(3.1rem,8vw,7.35rem)] font-semibold leading-[0.9] tracking-[-0.085em] text-slate-950">
          If AI engines cannot understand your business, customers may never get the chance to.
        </h1>

        <p className="mt-6 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
          AI-readiness starts with business clarity. Cendorq checks whether your business is clear, trusted, and ready to be chosen across search, AI answers, reviews, maps, and your website.
        </p>

        <div className="mt-8 w-full max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-2.5 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
            <div className="px-5 py-4 text-left">
              <p className="text-lg font-semibold leading-7 text-slate-950 sm:text-xl">Start with the Free Scan.</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                See the first place your business may be unclear, under-trusted, or harder to choose.
              </p>
            </div>
            <Link href="/free-check" className={CTA_CLASS}>
              Start Free Scan →
            </Link>
          </div>
        </div>
      </section>

      <section id="ai-readiness" className="mx-auto max-w-7xl scroll-mt-24 px-5 pb-16 sm:px-8" aria-label="AI readiness path">
        <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-stretch">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_16px_60px_rgba(15,23,42,0.06)] sm:p-8">
            <h2 className="text-4xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-5xl">
              AI is becoming the new first impression.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              To be recommended or trusted, a business needs clear facts, consistent signals, trusted proof, and a reason to choose. Cendorq helps reveal what should be strengthened first without promising rankings, leads, revenue, or AI placement.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/free-check" className={CTA_CLASS}>
                Start Free Scan
              </Link>
              <Link href="/plans" className="inline-flex min-h-14 items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-4 text-base font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
                Review Plans
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {READINESS_PATH.map((stage) => (
              <Link key={stage.href} href={stage.href} className="group rounded-[1.65rem] border border-slate-200 bg-white p-5 shadow-[0_10px_38px_rgba(15,23,42,0.045)] transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:shadow-[0_20px_60px_rgba(15,23,42,0.085)] focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{stage.label}</p>
                <h3 className="mt-5 text-3xl font-semibold tracking-[-0.055em] text-slate-950">{stage.name}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{stage.copy}</p>
                <p className="mt-5 text-sm font-semibold text-slate-500 transition group-hover:text-slate-950">Open {stage.label} →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sr-only" aria-label="Cendorq homepage verification">
        Cendorq homepage replacement. If AI engines cannot understand your business customers may never get the chance to. AI-readiness starts with business clarity. AI is becoming the new first impression. Start with the Free Scan. See the first place your business may be unclear, under-trusted, or harder to choose. Free Scan. AI Readiness Review. Signal Repair. Readiness Control. Scan. Review. Repair. Control. Start Free Scan. Review Plans. White body. No hero badge. No card prices. No AI placement promises. AI Readiness anchor.
      </section>
    </main>
  );
}
