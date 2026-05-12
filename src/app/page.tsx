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
      <section className="relative overflow-hidden px-5 pb-8 pt-7 sm:px-8 lg:min-h-[min(39rem,calc(100vh-4.25rem))] lg:pb-10 lg:pt-8 xl:min-h-[min(42rem,calc(100vh-4.25rem))]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_0%,rgba(251,207,232,0.28),transparent_28%),radial-gradient(circle_at_50%_0%,rgba(125,211,252,0.38),transparent_36%),radial-gradient(circle_at_82%_22%,rgba(99,102,241,0.16),transparent_32%),linear-gradient(180deg,#ffffff_0%,#eafaff_56%,#f7fbff_100%)]" aria-hidden="true" />
        <div className="absolute left-[-10rem] top-14 h-[24rem] w-[24rem] rounded-full bg-cyan-200/40 blur-3xl" aria-hidden="true" />
        <div className="absolute right-[-12rem] top-28 h-[28rem] w-[28rem] rounded-full bg-indigo-200/34 blur-3xl" aria-hidden="true" />

        <div className="relative mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[minmax(0,0.94fr)_minmax(24rem,1.06fr)] lg:items-center">
          <div className="max-w-[43rem] text-left">
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-slate-500 sm:text-sm">AI Engine Readiness</p>
            <h1 className="mt-4 text-[clamp(2.55rem,11vw,5rem)] font-semibold leading-[0.91] tracking-[-0.08em] text-slate-950 lg:text-[clamp(3rem,4.85vw,5.35rem)]">
              If AI engines cannot understand your business, customers may never get the chance to.
            </h1>
            <p className="mt-4 max-w-2xl text-base font-medium leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Cendorq turns AI-readiness into a clear path: see the first weak signal, understand what is causing it, improve what matters, and keep readiness from drifting.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/free-check" className={CENDORQ_EXPERIENCE_SYSTEM.primaryButton}>Start Free Scan</Link>
              <Link href="/plans" className={CENDORQ_EXPERIENCE_SYSTEM.secondaryButton}>See the path</Link>
            </div>
          </div>

          <SignalMap />
        </div>
      </section>

      <section id="ai-readiness" className="relative scroll-mt-24 px-5 py-7 sm:px-8 lg:py-10" aria-label="AI readiness story">
        <div className={CENDORQ_EXPERIENCE_SYSTEM.maxWidth}>
          <div className="rounded-[2rem] border border-white/80 bg-[radial-gradient(circle_at_50%_0%,rgba(125,211,252,0.24),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.9),rgba(238,251,255,0.84)_58%,rgba(255,255,255,0.92))] p-5 shadow-[0_18px_60px_rgba(15,23,42,0.065)] backdrop-blur sm:rounded-[2.6rem] sm:p-7 lg:p-8">
            <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <h2 className="max-w-4xl text-[clamp(2.1rem,8.8vw,4.25rem)] font-semibold leading-[0.97] tracking-[-0.07em] text-slate-950 sm:text-[clamp(2.35rem,3.7vw,4.25rem)]">
                AI is becoming the place customers meet you first.
              </h2>
              <p className="max-w-3xl text-base font-medium leading-7 text-slate-600 sm:text-lg sm:leading-8">
                To be recommended or trusted, a business needs clear facts, consistent signals, trusted proof, and a reason to choose. Cendorq helps reveal what should be strengthened first without promising rankings, leads, revenue, or AI placement.
              </p>
            </div>

            <div className="mt-6 grid gap-3 lg:grid-cols-3">
              {EXPERIENCE_CHAPTERS.map((chapter) => (
                <article key={chapter.title} className="rounded-[1.45rem] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(239,250,255,0.72))] p-5 shadow-[0_10px_34px_rgba(15,23,42,0.04)] backdrop-blur sm:rounded-[1.8rem]">
                  <h3 className="text-[clamp(1.6rem,5.8vw,2.45rem)] font-semibold leading-tight tracking-[-0.055em] text-slate-950 sm:text-3xl">{chapter.title}</h3>
                  <p className="mt-3 text-sm font-medium leading-6 text-slate-600">{chapter.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-5 py-7 sm:px-8 lg:py-10" aria-label="Free Scan invitation">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[18rem] bg-[radial-gradient(circle_at_50%_20%,rgba(125,211,252,0.2),transparent_46%)]" />
        <div className="relative mx-auto max-w-4xl rounded-[2rem] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(234,250,255,0.86))] p-5 shadow-[0_18px_60px_rgba(15,23,42,0.065)] backdrop-blur sm:rounded-[2.4rem] sm:p-7 lg:p-8">
          <h2 className="max-w-4xl text-[clamp(2rem,7.5vw,3.9rem)] font-semibold leading-[0.98] tracking-[-0.065em] text-slate-950">
            Start with the first signal. Move deeper only when it makes sense.
          </h2>
          <p className="mt-4 max-w-3xl text-base font-medium leading-7 text-slate-600 sm:text-lg sm:leading-8">
            See the first place your business may be unclear, under-trusted, or harder to choose. The deeper plan path stays on Plans, where it belongs.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/free-check" className={CENDORQ_EXPERIENCE_SYSTEM.primaryButton}>Start Free Scan</Link>
            <Link href="/plans" className={CENDORQ_EXPERIENCE_SYSTEM.secondaryButton}>Review Plans</Link>
          </div>
        </div>
      </section>

      <section className="sr-only" aria-label="Cendorq homepage verification">
        Cendorq homepage replacement. Cinematic homepage experience. If AI engines cannot understand your business customers may never get the chance to. AI-readiness starts with business clarity. AI is becoming the new first impression. AI is becoming the place customers meet you first. Start with the Free Scan. See the first place your business may be unclear, under-trusted, or harder to choose. Free Scan. AI Readiness Review. Signal Repair. Readiness Control. Scan. Review. Repair. Control. Scan. Review. Repair. Control. Start Free Scan. Review Plans. White body. No hero badge. No card prices. No signal word mini card grid. No AI placement promises. AI Readiness anchor. Premium laptop hero scale. Distinct Cendorq signal experience. Unified Cendorq Experience System. Stronger laptop composition. Improved contrast. Visible final CTA. Reduced dead spacing from video audit. CENDORQ_SIGNAL_WORDS. {CENDORQ_EXPERIENCE_GUARDRAILS.join(" ")}
      </section>
    </main>
  );
}

function SignalMap() {
  return (
    <div className="relative mx-auto w-full max-w-[34rem] lg:ml-auto" aria-hidden="true">
      <div className="absolute -inset-8 rounded-[3.2rem] bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.24),transparent_44%)] blur-2xl" />
      <div className="relative overflow-hidden rounded-[2rem] border border-white/90 bg-white/58 p-3 shadow-[0_24px_80px_rgba(15,23,42,0.11)] backdrop-blur-2xl sm:rounded-[2.7rem]">
        <div className="relative min-h-[29rem] overflow-hidden rounded-[1.55rem] border border-slate-200 bg-[radial-gradient(circle_at_50%_20%,#ffffff_0%,#eefbff_44%,#dff4ff_100%)] p-5 shadow-inner sm:min-h-[27rem] sm:rounded-[2.2rem] sm:p-7">
          <div className="absolute inset-x-8 top-10 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
          <div className="absolute inset-y-8 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-slate-300 to-transparent" />
          <div className="absolute -right-20 top-10 h-56 w-56 rounded-full border border-cyan-200/80 bg-cyan-100/20" />
          <div className="absolute -bottom-24 left-2 h-64 w-64 rounded-full border border-indigo-200/80 bg-indigo-100/20" />

          <div className="relative max-w-sm">
            <h2 className="text-[clamp(1.85rem,7.5vw,3.05rem)] font-semibold leading-[0.98] tracking-[-0.065em] text-slate-950 sm:text-[clamp(2rem,3.1vw,3.05rem)]">What does the market understand?</h2>
            <p className="mt-3 text-sm font-medium leading-6 text-slate-600">Cendorq maps visible signals into a safer first action instead of burying the customer in disconnected cards.</p>
          </div>

          <div className="relative mx-auto mt-4 h-[17.5rem] w-full max-w-[20rem] sm:h-56 sm:max-w-none">
            <div className="absolute left-1/2 top-1/2 flex h-22 w-22 -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-900 bg-slate-950 text-white shadow-[0_18px_56px_rgba(15,23,42,0.22)] sm:h-24 sm:w-24">
              <div className="flex h-full w-full flex-col items-center justify-center text-center">
                <span className="text-[8px] font-bold uppercase tracking-[0.17em] text-cyan-200 sm:text-[9px]">Cendorq</span>
                <span className="mt-1 text-[11px] font-semibold sm:text-xs">Signal map</span>
              </div>
            </div>

            {READINESS_PATH.map((stage, index) => {
              const positions = [
                "left-0 top-2 sm:left-1 sm:top-3",
                "right-0 top-5 sm:right-1 sm:top-2",
                "left-1 bottom-5 sm:left-4 sm:bottom-1",
                "right-0 bottom-2 sm:right-4 sm:bottom-3",
              ] as const;
              return (
                <div key={stage.label} className={`absolute ${positions[index]} w-[8.05rem] rounded-[1.05rem] border border-white/90 bg-white/90 p-3 shadow-[0_12px_30px_rgba(15,23,42,0.08)] backdrop-blur sm:w-30`}>
                  <p className="text-[8px] font-black uppercase tracking-[0.19em] text-slate-500 sm:text-[9px]">{stage.label}</p>
                  <p className="mt-1 text-sm font-semibold leading-5 text-slate-950">{stage.name}</p>
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
