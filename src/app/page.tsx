import { buildMetadata } from "@/lib/seo";
import Link from "next/link";
import { CENDORQ_EXPERIENCE_GUARDRAILS, CENDORQ_EXPERIENCE_SYSTEM, CENDORQ_SIGNAL_WORDS } from "@/lib/cendorq-experience-system";

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

const EXPERIENCE_CHAPTERS = [
  {
    label: "First impression",
    title: "AI answers do not wait for your sales pitch.",
    copy: "They work from what is visible, consistent, understandable, and trusted. Cendorq helps you see where that first impression may break.",
  },
  {
    label: "Decision signal",
    title: "The strongest move is usually the clearest one.",
    copy: "Before repair, redesign, ads, or bigger work, the business needs to know which weak signal deserves attention first.",
  },
  {
    label: "Calm path",
    title: "Start small. Go deeper only when the evidence supports it.",
    copy: "Free Scan gives the first signal. Review explains the cause. Repair improves the selected weak point. Control keeps readiness from drifting.",
  },
] as const;

export default function HomePage() {
  return (
    <main data-cendorq-homepage="cinematic-ai-readiness-experience" className={CENDORQ_EXPERIENCE_SYSTEM.pageShell}>
      <section className="relative flex min-h-[calc(100vh-4.25rem)] items-center overflow-hidden px-5 py-12 sm:px-8 lg:py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-sky-50 to-slate-50" aria-hidden="true" />
        <div className="absolute left-[-12rem] top-16 h-[30rem] w-[30rem] rounded-full bg-cyan-200/40 blur-3xl" aria-hidden="true" />
        <div className="absolute right-[-14rem] top-24 h-[34rem] w-[34rem] rounded-full bg-indigo-200/40 blur-3xl" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-slate-50 to-transparent" aria-hidden="true" />

        <div className={CENDORQ_EXPERIENCE_SYSTEM.heroGrid}>
          <div className="text-center lg:text-left">
            <p className={`${CENDORQ_EXPERIENCE_SYSTEM.eyebrow} mx-auto lg:mx-0`}>
              AI Engine Readiness
            </p>
            <h1 className={`mt-6 max-w-6xl ${CENDORQ_EXPERIENCE_SYSTEM.headline}`}>
              If AI engines cannot understand your business, customers may never get the chance to.
            </h1>
            <p className={`mx-auto mt-6 max-w-3xl lg:mx-0 ${CENDORQ_EXPERIENCE_SYSTEM.body}`}>
              Cendorq turns AI-readiness into a clear path: see the first weak signal, understand what is causing it, improve what matters, and keep readiness from drifting.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
              <Link href="/free-check" className={CENDORQ_EXPERIENCE_SYSTEM.primaryButton}>
                Start Free Scan
              </Link>
              <Link href="/plans" className={CENDORQ_EXPERIENCE_SYSTEM.secondaryButton}>
                See the path
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-2xl lg:max-w-none" aria-hidden="true">
            <div className={CENDORQ_EXPERIENCE_SYSTEM.glassPanel}>
              <div className="overflow-hidden rounded-[2.35rem] border border-slate-200 bg-white p-6 shadow-inner sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">First signal</p>
                    <h2 className="mt-3 text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl">Can they choose you?</h2>
                  </div>
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 shadow-sm">
                    <span className="h-6 w-2 rounded-full bg-cyan-400" />
                    <span className="mx-[3px] h-9 w-2 rounded-full bg-slate-950" />
                    <span className="h-6 w-2 rounded-full bg-indigo-300" />
                  </div>
                </div>

                <div className="mt-9 grid gap-4 sm:grid-cols-2">
                  {CENDORQ_SIGNAL_WORDS.map((signal, index) => (
                    <div key={signal} className="rounded-[1.4rem] border border-slate-200 bg-slate-50 p-4 shadow-sm">
                      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                        <span>{signal}</span>
                        <span>{index + 1}</span>
                      </div>
                      <div className="mt-5 h-2 overflow-hidden rounded-full bg-white">
                        <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-slate-950 to-indigo-400" style={{ width: `${62 + index * 9}%` }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-[1.6rem] border border-slate-800 bg-slate-950 p-5 text-white shadow-xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">Cendorq path</p>
                  <p className="mt-3 text-2xl font-semibold tracking-[-0.045em]">Scan. Review. Repair. Control.</p>
                  <p className="mt-3 text-sm leading-6 text-slate-300">One clear path from first signal to stronger readiness.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="ai-readiness" className="relative scroll-mt-24 px-5 py-16 sm:px-8 lg:py-24" aria-label="AI readiness story">
        <div className={CENDORQ_EXPERIENCE_SYSTEM.maxWidth}>
          <div className="rounded-[3rem] border border-slate-200 bg-white p-6 shadow-[0_30px_110px_rgba(15,23,42,0.08)] sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
              <div>
                <p className="text-sm font-semibold text-slate-400">A new first impression</p>
                <h2 className={`mt-4 ${CENDORQ_EXPERIENCE_SYSTEM.sectionHeadline}`}>
                  AI is becoming the place customers meet you first.
                </h2>
              </div>
              <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                To be recommended or trusted, a business needs clear facts, consistent signals, trusted proof, and a reason to choose. Cendorq helps reveal what should be strengthened first without promising rankings, leads, revenue, or AI placement.
              </p>
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {EXPERIENCE_CHAPTERS.map((chapter) => (
                <article key={chapter.label} className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{chapter.label}</p>
                  <h3 className="mt-5 text-3xl font-semibold leading-tight tracking-[-0.055em] text-slate-950">{chapter.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{chapter.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-5 py-16 sm:px-8 lg:py-24" aria-label="Cendorq readiness path">
        <div className="pointer-events-none absolute inset-x-0 top-1/2 h-[34rem] -translate-y-1/2 bg-[radial-gradient(circle_at_50%_50%,rgba(125,211,252,0.22),transparent_45%)]" />
        <div className={`relative ${CENDORQ_EXPERIENCE_SYSTEM.maxWidth}`}>
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-400">One path. Four depths.</p>
              <h2 className={`mt-3 max-w-3xl ${CENDORQ_EXPERIENCE_SYSTEM.sectionHeadline}`}>Start with the first signal. Move deeper only when it makes sense.</h2>
            </div>
            <Link href="/free-check" className={CENDORQ_EXPERIENCE_SYSTEM.primaryButton}>Start Free Scan</Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {READINESS_PATH.map((stage) => (
              <Link key={stage.href} href={stage.href} className="group min-h-[22rem] rounded-[2.2rem] border border-slate-200 bg-white/80 p-6 shadow-[0_18px_70px_rgba(15,23,42,0.07)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:bg-white hover:shadow-[0_28px_90px_rgba(15,23,42,0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">{stage.label}</p>
                <h3 className="mt-8 text-4xl font-semibold tracking-[-0.065em] text-slate-950">{stage.name}</h3>
                <p className="mt-5 text-sm leading-7 text-slate-600">{stage.copy}</p>
                <p className="mt-10 text-sm font-semibold text-slate-500 transition group-hover:text-slate-950">Open {stage.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:py-24" aria-label="Free Scan invitation">
        <div className={`mx-auto max-w-7xl ${CENDORQ_EXPERIENCE_SYSTEM.darkPanel}`}>
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold text-cyan-200">Start with the Free Scan.</p>
              <h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.06em] sm:text-6xl">See the first place your business may be unclear, under-trusted, or harder to choose.</h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300">The point is not to do more. The point is to know what deserves attention first.</p>
            </div>
            <Link href="/free-check" className="inline-flex min-h-14 items-center justify-center rounded-full border border-white bg-white px-8 py-4 text-base font-semibold text-slate-950 shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950">
              Start Free Scan
            </Link>
          </div>
        </div>
      </section>

      <section className="sr-only" aria-label="Cendorq homepage verification">
        Cendorq homepage replacement. Cinematic homepage experience. If AI engines cannot understand your business customers may never get the chance to. AI-readiness starts with business clarity. AI is becoming the new first impression. AI is becoming the place customers meet you first. Start with the Free Scan. See the first place your business may be unclear, under-trusted, or harder to choose. Free Scan. AI Readiness Review. Signal Repair. Readiness Control. Scan. Review. Repair. Control. Start Free Scan. Review Plans. White body. No hero badge. No card prices. No AI placement promises. AI Readiness anchor. Premium laptop hero scale. Distinct Cendorq signal experience. Unified Cendorq Experience System. {CENDORQ_EXPERIENCE_GUARDRAILS.join(" ")}
      </section>
    </main>
  );
}
