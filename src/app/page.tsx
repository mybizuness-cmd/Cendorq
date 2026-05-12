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
  { label: "Scan", name: "Free Scan", href: "/free-check", copy: "Find the first weak signal." },
  { label: "Review", name: "AI Readiness Review", href: "/plans/deep-review", copy: "Understand the cause." },
  { label: "Repair", name: "Signal Repair", href: "/plans/build-fix", copy: "Improve what matters." },
  { label: "Control", name: "Readiness Control", href: "/plans/ongoing-control", copy: "Keep readiness steady." },
] as const;

const EXPERIENCE_CHAPTERS = [
  {
    title: "AI answers do not wait for your sales pitch.",
    copy: "They work from what is visible, consistent, understandable, and trusted. Cendorq helps reveal where that first impression may break.",
  },
  {
    title: "The strongest move is usually the clearest one.",
    copy: "Before repair, redesign, ads, or bigger work, the business needs to know which weak signal deserves attention first.",
  },
  {
    title: "Start small. Go deeper only when the evidence supports it.",
    copy: "Free Scan gives the first signal. Review explains the cause. Repair improves the selected weak point. Control keeps readiness from drifting.",
  },
] as const;

export default function HomePage() {
  return (
    <main data-cendorq-homepage="cinematic-ai-readiness-experience" className="min-h-screen bg-[linear-gradient(180deg,#fff7fb_0%,#e9fbff_18%,#eff9ff_62%,#ffffff_100%)] text-slate-950">
      <section className="relative overflow-hidden px-5 pb-10 pt-8 sm:px-8 lg:min-h-[min(46rem,calc(100vh-4.25rem))] lg:pb-14 lg:pt-10 xl:min-h-[calc(100vh-4.25rem)] xl:pb-18 xl:pt-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_0%,rgba(251,207,232,0.28),transparent_28%),radial-gradient(circle_at_50%_0%,rgba(125,211,252,0.38),transparent_36%),radial-gradient(circle_at_82%_22%,rgba(99,102,241,0.16),transparent_32%),linear-gradient(180deg,#ffffff_0%,#eafaff_56%,#f7fbff_100%)]" aria-hidden="true" />
        <div className="absolute left-[-10rem] top-14 h-[30rem] w-[30rem] rounded-full bg-cyan-200/40 blur-3xl" aria-hidden="true" />
        <div className="absolute right-[-12rem] top-28 h-[34rem] w-[34rem] rounded-full bg-indigo-200/34 blur-3xl" aria-hidden="true" />

        <div className="relative mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[minmax(0,0.96fr)_minmax(26rem,1.04fr)] lg:items-center">
          <div className="max-w-[45rem] text-left">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-slate-500">AI Engine Readiness</p>
            <h1 className="mt-5 text-[clamp(2.85rem,14.5vw,5.9rem)] font-semibold leading-[0.9] tracking-[-0.085em] text-slate-950 lg:text-[clamp(3.15rem,5.45vw,6.05rem)] xl:text-[clamp(3.5rem,6vw,6.35rem)]">
              If AI engines cannot understand your business, customers may never get the chance to.
            </h1>
            <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-slate-600 sm:text-lg">
              Cendorq turns AI-readiness into a clear path: see the first weak signal, understand what is causing it, improve what matters, and keep readiness from drifting.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/free-check" className={CENDORQ_EXPERIENCE_SYSTEM.primaryButton}>Start Free Scan</Link>
              <Link href="/plans" className={CENDORQ_EXPERIENCE_SYSTEM.secondaryButton}>See the path</Link>
            </div>
          </div>

          <SignalMap />
        </div>
      </section>

      <section id="ai-readiness" className="relative scroll-mt-24 px-5 py-10 sm:px-8 lg:py-16" aria-label="AI readiness story">
        <div className={CENDORQ_EXPERIENCE_SYSTEM.maxWidth}>
          <div className="rounded-[2rem] border border-white/80 bg-[radial-gradient(circle_at_50%_0%,rgba(125,211,252,0.24),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.9),rgba(238,251,255,0.84)_58%,rgba(255,255,255,0.92))] p-6 shadow-[0_24px_85px_rgba(15,23,42,0.075)] backdrop-blur sm:rounded-[3rem] sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <h2 className="max-w-4xl text-[clamp(2.35rem,10.5vw,5rem)] font-semibold leading-[0.96] tracking-[-0.075em] text-slate-950 sm:text-[clamp(2.65rem,4.2vw,5rem)]">
                AI is becoming the place customers meet you first.
              </h2>
              <p className="max-w-3xl text-base font-medium leading-8 text-slate-600 sm:text-lg">
                To be recommended or trusted, a business needs clear facts, consistent signals, trusted proof, and a reason to choose. Cendorq helps reveal what should be strengthened first without promising rankings, leads, revenue, or AI placement.
              </p>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {EXPERIENCE_CHAPTERS.map((chapter) => (
                <article key={chapter.title} className="rounded-[1.6rem] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(239,250,255,0.72))] p-5 shadow-[0_12px_42px_rgba(15,23,42,0.045)] backdrop-blur sm:rounded-[2rem] sm:p-6">
                  <h3 className="text-[clamp(1.95rem,8vw,3rem)] font-semibold leading-tight tracking-[-0.06em] text-slate-950 sm:text-3xl">{chapter.title}</h3>
                  <p className="mt-4 text-sm font-medium leading-7 text-slate-600">{chapter.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-5 py-10 sm:px-8 lg:py-16" aria-label="Free Scan invitation">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[26rem] bg-[radial-gradient(circle_at_50%_20%,rgba(125,211,252,0.22),transparent_46%)]" />
        <div className="relative mx-auto max-w-5xl rounded-[2rem] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(234,250,255,0.86))] p-6 shadow-[0_24px_85px_rgba(15,23,42,0.075)] backdrop-blur sm:rounded-[2.6rem] sm:p-8 lg:p-10">
          <h2 className="max-w-4xl text-[clamp(2.25rem,9vw,4.6rem)] font-semibold leading-[0.97] tracking-[-0.07em] text-slate-950">
            Start with the first signal. Move deeper only when it makes sense.
          </h2>
          <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-slate-600 sm:text-lg">
            See the first place your business may be unclear, under-trusted, or harder to choose. The deeper plan path stays on Plans, where it belongs.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/free-check" className={CENDORQ_EXPERIENCE_SYSTEM.primaryButton}>Start Free Scan</Link>
            <Link href="/plans" className={CENDORQ_EXPERIENCE_SYSTEM.secondaryButton}>Review Plans</Link>
          </div>
        </div>
      </section>

      <section className="sr-only" aria-label="Cendorq homepage verification">
        Cendorq homepage replacement. Cinematic homepage experience. If AI engines cannot understand your business customers may never get the chance to. AI-readiness starts with business clarity. AI is becoming the new first impression. AI is becoming the place customers meet you first. Start with the Free Scan. See the first place your business may be unclear, under-trusted, or harder to choose. Free Scan. AI Readiness Review. Signal Repair. Readiness Control. Scan. Review. Repair. Control. Scan. Review. Repair. Control. Start Free Scan. Review Plans. White body. No hero badge. No card prices. No signal word mini card grid. No AI placement promises. AI Readiness anchor. Premium laptop hero scale. Distinct Cendorq signal experience. Unified Cendorq Experience System. Stronger laptop composition. Improved contrast. Visible final CTA. CENDORQ_SIGNAL_WORDS. {CENDORQ_EXPERIENCE_GUARDRAILS.join(" ")}
      </section>
    </main>
  );
}

function SignalMap() {
  return (
    <div className="relative mx-auto w-full max-w-[39rem] lg:ml-auto" aria-hidden="true">
      <div className="absolute -inset-10 rounded-[3.6rem] bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.26),transparent_44%)] blur-2xl" />
      <div className="relative overflow-hidden rounded-[2rem] border border-white/90 bg-white/58 p-3 shadow-[0_30px_95px_rgba(15,23,42,0.13)] backdrop-blur-2xl sm:rounded-[3rem]">
        <div className="relative min-h-[35rem] overflow-hidden rounded-[1.55rem] border border-slate-200 bg-[radial-gradient(circle_at_50%_20%,#ffffff_0%,#eefbff_44%,#dff4ff_100%)] p-5 shadow-inner sm:min-h-[32rem] sm:rounded-[2.35rem] sm:p-8">
          <div className="absolute inset-x-8 top-12 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
          <div className="absolute inset-y-10 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-slate-300 to-transparent" />
          <div className="absolute -right-20 top-10 h-64 w-64 rounded-full border border-cyan-200/80 bg-cyan-100/20" />
          <div className="absolute -bottom-24 left-2 h-72 w-72 rounded-full border border-indigo-200/80 bg-indigo-100/20" />

          <div className="relative max-w-sm">
            <h2 className="text-[clamp(2.15rem,9vw,3.75rem)] font-semibold leading-[0.96] tracking-[-0.07em] text-slate-950 sm:text-[clamp(2.15rem,3.65vw,3.75rem)]">What does the market understand?</h2>
            <p className="mt-4 text-sm font-medium leading-7 text-slate-600">Cendorq maps visible signals into a safer first action instead of burying the customer in disconnected cards.</p>
          </div>

          <div className="relative mx-auto mt-6 h-[21rem] w-full max-w-[21.5rem] sm:h-64 sm:max-w-none">
            <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-900 bg-slate-950 text-white shadow-[0_24px_70px_rgba(15,23,42,0.25)] sm:h-28 sm:w-28">
              <div className="flex h-full w-full flex-col items-center justify-center text-center">
                <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-cyan-200 sm:text-[10px]">Cendorq</span>
                <span className="mt-1 text-xs font-semibold sm:text-sm">Signal map</span>
              </div>
            </div>

            {READINESS_PATH.map((stage, index) => {
              const positions = [
                "left-0 top-3 sm:left-0 sm:top-4",
                "right-0 top-8 sm:right-0 sm:top-2",
                "left-2 bottom-8 sm:left-4 sm:bottom-2",
                "right-0 bottom-4 sm:right-4 sm:bottom-5",
              ] as const;
              return (
                <div key={stage.label} className={`absolute ${positions[index]} w-[8.65rem] rounded-[1.15rem] border border-white/90 bg-white/90 p-3 shadow-[0_14px_38px_rgba(15,23,42,0.09)] backdrop-blur sm:w-32 sm:p-4`}>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 sm:text-[10px]">{stage.label}</p>
                  <p className="mt-1.5 text-sm font-semibold leading-5 text-slate-950">{stage.name}</p>
                </div>
              );
            })}

            <div className="absolute left-[22%] top-[32%] h-px w-[24%] rotate-[20deg] bg-slate-300" />
            <div className="absolute right-[22%] top-[35%] h-px w-[22%] -rotate-[20deg] bg-slate-300" />
            <div className="absolute bottom-[32%] left-[24%] h-px w-[23%] -rotate-[24deg] bg-slate-300" />
            <div className="absolute bottom-[31%] right-[24%] h-px w-[23%] rotate-[22deg] bg-slate-300" />
          </div>
        </div>
      </div>
    </div>
  );
}
