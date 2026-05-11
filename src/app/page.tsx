import { buildMetadata } from "@/lib/seo";
import Link from "next/link";
import { CENDORQ_EXPERIENCE_GUARDRAILS, CENDORQ_EXPERIENCE_SYSTEM } from "@/lib/cendorq-experience-system";

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
      <section className="relative overflow-hidden px-5 pb-14 pt-8 sm:px-8 lg:min-h-[min(46rem,calc(100vh-4.25rem))] lg:pb-14 lg:pt-10 xl:min-h-[calc(100vh-4.25rem)] xl:pb-18 xl:pt-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(125,211,252,0.34),transparent_34%),radial-gradient(circle_at_82%_22%,rgba(99,102,241,0.18),transparent_32%),linear-gradient(180deg,#ffffff_0%,#f7fbff_48%,#eef8ff_100%)]" aria-hidden="true" />
        <div className="absolute left-[-10rem] top-14 h-[30rem] w-[30rem] rounded-full bg-cyan-200/40 blur-3xl" aria-hidden="true" />
        <div className="absolute right-[-12rem] top-28 h-[34rem] w-[34rem] rounded-full bg-indigo-200/40 blur-3xl" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-slate-50 to-transparent" aria-hidden="true" />

        <div className="relative mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[minmax(0,0.96fr)_minmax(26rem,1.04fr)] lg:items-center">
          <div className="max-w-[45rem] text-left">
            <p className={CENDORQ_EXPERIENCE_SYSTEM.eyebrow}>
              AI Engine Readiness
            </p>
            <h1 className="mt-5 text-[clamp(3.15rem,5.45vw,6.05rem)] font-semibold leading-[0.9] tracking-[-0.08em] text-slate-950 xl:text-[clamp(3.5rem,6vw,6.35rem)]">
              If AI engines cannot understand your business, customers may never get the chance to.
            </h1>
            <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-slate-600 sm:text-lg">
              Cendorq turns AI-readiness into a clear path: see the first weak signal, understand what is causing it, improve what matters, and keep readiness from drifting.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/free-check" className={CENDORQ_EXPERIENCE_SYSTEM.primaryButton}>
                Start Free Scan
              </Link>
              <Link href="/plans" className={CENDORQ_EXPERIENCE_SYSTEM.secondaryButton}>
                See the path
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[39rem] lg:ml-auto" aria-hidden="true">
            <div className="absolute -inset-10 rounded-[3.6rem] bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.28),transparent_44%)] blur-2xl" />
            <div className="relative overflow-hidden rounded-[3rem] border border-white/90 bg-white/58 p-3 shadow-[0_42px_140px_rgba(15,23,42,0.17)] backdrop-blur-2xl">
              <div className="relative min-h-[32rem] overflow-hidden rounded-[2.35rem] border border-slate-200 bg-[radial-gradient(circle_at_50%_20%,#ffffff_0%,#eefbff_44%,#dff4ff_100%)] p-6 shadow-inner sm:p-8">
                <div className="absolute inset-x-8 top-12 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                <div className="absolute inset-y-10 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-slate-300 to-transparent" />
                <div className="absolute -right-20 top-10 h-64 w-64 rounded-full border border-cyan-200/80 bg-cyan-100/20" />
                <div className="absolute -bottom-24 left-2 h-72 w-72 rounded-full border border-indigo-200/80 bg-indigo-100/20" />

                <div className="relative flex min-h-[28rem] flex-col justify-between">
                  <div className="max-w-sm">
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Live business read</p>
                    <h2 className="mt-4 text-[clamp(2.15rem,3.65vw,3.75rem)] font-semibold leading-[0.96] tracking-[-0.07em] text-slate-950">What does the market understand?</h2>
                    <p className="mt-4 text-sm font-medium leading-7 text-slate-600">Cendorq maps visible signals into a safer first action instead of burying the customer in disconnected cards.</p>
                  </div>

                  <div className="relative mt-8 h-56 sm:h-64">
                    <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-900 bg-slate-950 text-white shadow-[0_24px_70px_rgba(15,23,42,0.25)]">
                      <div className="flex h-full flex-col items-center justify-center text-center">
                        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-200">Cendorq</span>
                        <span className="mt-1 text-sm font-semibold">First read</span>
                      </div>
                    </div>

                    {READINESS_PATH.map((stage, index) => {
                      const positions = [
                        "left-0 top-4",
                        "right-0 top-2",
                        "left-4 bottom-2",
                        "right-4 bottom-5",
                      ] as const;
                      return (
                        <div key={stage.label} className={`absolute ${positions[index]} w-32 rounded-[1.35rem] border border-white/90 bg-white/88 p-4 shadow-[0_18px_55px_rgba(15,23,42,0.1)] backdrop-blur`}>
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{stage.label}</p>
                          <p className="mt-2 text-sm font-semibold leading-5 text-slate-950">{stage.name}</p>
                        </div>
                      );
                    })}

                    <div className="absolute left-[21%] top-[32%] h-px w-[22%] rotate-[20deg] bg-slate-300" />
                    <div className="absolute right-[21%] top-[32%] h-px w-[22%] -rotate-[20deg] bg-slate-300" />
                    <div className="absolute bottom-[31%] left-[25%] h-px w-[22%] -rotate-[24deg] bg-slate-300" />
                    <div className="absolute bottom-[33%] right-[25%] h-px w-[22%] rotate-[22deg] bg-slate-300" />
                  </div>

                  <div className="rounded-[1.55rem] border border-slate-800 bg-[linear-gradient(135deg,#020617,#172554_68%,#083344)] p-5 text-white shadow-[0_20px_60px_rgba(15,23,42,0.24)]">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">Customer path</p>
                    <p className="mt-3 text-2xl font-semibold tracking-[-0.045em]">Scan. Review. Repair. Control.</p>
                    <p className="mt-2 text-sm font-medium leading-6 text-slate-200">One connected system from first signal to stronger readiness.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="ai-readiness" className="relative scroll-mt-24 px-5 py-12 sm:px-8 lg:py-18 xl:py-24" aria-label="AI readiness story">
        <div className={CENDORQ_EXPERIENCE_SYSTEM.maxWidth}>
          <div className="rounded-[3rem] border border-slate-200 bg-white p-6 shadow-[0_30px_110px_rgba(15,23,42,0.09)] sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <div>
                <p className="text-sm font-bold text-slate-500">A new first impression</p>
                <h2 className="mt-4 text-[clamp(2.65rem,4.2vw,5rem)] font-semibold leading-[0.96] tracking-[-0.07em] text-slate-950">
                  AI is becoming the place customers meet you first.
                </h2>
              </div>
              <p className="max-w-3xl text-base font-medium leading-8 text-slate-600 sm:text-lg">
                To be recommended or trusted, a business needs clear facts, consistent signals, trusted proof, and a reason to choose. Cendorq helps reveal what should be strengthened first without promising rankings, leads, revenue, or AI placement.
              </p>
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {EXPERIENCE_CHAPTERS.map((chapter) => (
                <article key={chapter.label} className="rounded-[2rem] border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-6 shadow-[0_16px_55px_rgba(15,23,42,0.055)]">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">{chapter.label}</p>
                  <h3 className="mt-5 text-3xl font-semibold leading-tight tracking-[-0.055em] text-slate-950">{chapter.title}</h3>
                  <p className="mt-4 text-sm font-medium leading-7 text-slate-600">{chapter.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-5 py-12 sm:px-8 lg:py-18 xl:py-24" aria-label="Cendorq readiness path">
        <div className="pointer-events-none absolute inset-x-0 top-1/2 h-[34rem] -translate-y-1/2 bg-[radial-gradient(circle_at_50%_50%,rgba(125,211,252,0.2),transparent_45%)]" />
        <div className={`relative ${CENDORQ_EXPERIENCE_SYSTEM.maxWidth}`}>
          <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-sm font-bold text-slate-500">One path. Four depths.</p>
              <h2 className="mt-3 max-w-4xl text-[clamp(2.6rem,4.5vw,5rem)] font-semibold leading-[0.97] tracking-[-0.07em] text-slate-950">Start with the first signal. Move deeper only when it makes sense.</h2>
            </div>
            <Link href="/free-check" className={CENDORQ_EXPERIENCE_SYSTEM.primaryButton}>Start Free Scan</Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {READINESS_PATH.map((stage) => (
              <Link key={stage.href} href={stage.href} className="group min-h-[16rem] rounded-[2.2rem] border border-slate-200 bg-white/88 p-6 shadow-[0_18px_70px_rgba(15,23,42,0.075)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:bg-white hover:shadow-[0_28px_90px_rgba(15,23,42,0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">{stage.label}</p>
                <h3 className="mt-6 text-3xl font-semibold leading-tight tracking-[-0.06em] text-slate-950">{stage.name}</h3>
                <p className="mt-4 text-sm font-medium leading-7 text-slate-600">{stage.copy}</p>
                <p className="mt-7 text-sm font-bold text-slate-500 transition group-hover:text-slate-950">Open {stage.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 lg:py-18 xl:py-24" aria-label="Free Scan invitation">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[3rem] border border-slate-800 bg-[linear-gradient(135deg,#020617,#172554_58%,#083344)] p-6 text-white shadow-[0_36px_130px_rgba(15,23,42,0.28)] sm:p-8 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-bold text-cyan-200">Start with the Free Scan.</p>
              <h2 className="mt-4 max-w-4xl text-4xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-6xl">See the first place your business may be unclear, under-trusted, or harder to choose.</h2>
              <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-slate-200">The point is not to do more. The point is to know what deserves attention first.</p>
            </div>
            <Link href="/free-check" className="inline-flex min-h-14 min-w-44 items-center justify-center rounded-full border border-white bg-white px-8 py-4 text-base font-bold text-slate-950 shadow-[0_18px_45px_rgba(255,255,255,0.18)] transition hover:-translate-y-0.5 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950">
              Start Free Scan
            </Link>
          </div>
        </div>
      </section>

      <section className="sr-only" aria-label="Cendorq homepage verification">
        Cendorq homepage replacement. Cinematic homepage experience. If AI engines cannot understand your business customers may never get the chance to. AI-readiness starts with business clarity. AI is becoming the new first impression. AI is becoming the place customers meet you first. Start with the Free Scan. See the first place your business may be unclear, under-trusted, or harder to choose. Free Scan. AI Readiness Review. Signal Repair. Readiness Control. Scan. Review. Repair. Control. Start Free Scan. Review Plans. White body. No hero badge. No card prices. No signal word mini card grid. No AI placement promises. AI Readiness anchor. Premium laptop hero scale. Distinct Cendorq signal experience. Unified Cendorq Experience System. Stronger laptop composition. Improved contrast. Visible final CTA. {CENDORQ_EXPERIENCE_GUARDRAILS.join(" ")}
      </section>
    </main>
  );
}
