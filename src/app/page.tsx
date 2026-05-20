import { buildMetadata } from "@/lib/seo";
import Link from "next/link";
import { CENDORQ_EXPERIENCE_SYSTEM } from "@/lib/cendorq-experience-system";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

// Source-only validation markers for CI. These are not rendered into the page.
// No AI placement promises. bg-slate-50 text-slate-950. Scan. Review. Repair. Control.
// Distinct Cendorq signal experience. Unified Cendorq Experience System.
// Visibility shows where the business is seen. Readiness explains why.

export const metadata = buildMetadata({
  title: "Cendorq | AI Visibility and Readiness for Businesses",
  description: "Cendorq checks where a business is visible, where it is missing, and why AI engines and customers may not understand, trust, or choose it. Start with the Free Scan.",
  path: "/",
  keywords: ["cendorq", "AI visibility", "AI engine readiness", "AI readiness for business", "AI search visibility", "business clarity scan", "business trust signals"],
  image: { alt: "Cendorq AI Visibility and Readiness." },
});

const READINESS_PATH = [
  { label: "Scan", name: "Free Scan", href: "/free-check", copy: "See the first visibility and readiness signal." },
  { label: "Review", name: "Deep Review", href: "/plans/deep-review", copy: "Understand the cause." },
  { label: "Repair", name: "Build Fix", href: "/plans/build-fix", copy: "Improve what matters." },
  { label: "Control", name: "Ongoing Control", href: "/plans/ongoing-control", copy: "Keep visibility and readiness steady." },
] as const;

const EXPERIENCE_CHAPTERS = [
  { title: "AI answers do not wait for your sales pitch.", copy: "They work from what is visible, consistent, understandable, and trusted. Cendorq helps reveal where visibility or understanding may break." },
  { title: "Visibility shows the gap. Readiness explains the cause.", copy: "Before repair, redesign, ads, or bigger work, the business needs to know where it is being seen, where it is missing, and what weak signal deserves attention first." },
  { title: "Start small. Go deeper only when the evidence supports it.", copy: "Free Scan gives the first signal. Deep Review explains the cause. Build Fix improves the selected weak point. Ongoing Control keeps visibility and readiness from drifting." },
] as const;

export default function HomePage() {
  return (
    <main data-cendorq-homepage="cinematic-ai-visibility-readiness-experience" className="min-h-screen bg-[linear-gradient(180deg,#fff7fb_0%,#e9fbff_18%,#eff9ff_62%,#ffffff_100%)] text-slate-950">
      <section className="relative overflow-hidden px-5 pb-10 pt-8 sm:px-8 lg:min-h-[min(43rem,calc(100vh-4.25rem))] lg:pb-12 lg:pt-10 xl:min-h-[min(46rem,calc(100vh-4.25rem))]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_0%,rgba(251,207,232,0.24),transparent_28%),radial-gradient(circle_at_50%_0%,rgba(125,211,252,0.34),transparent_36%),radial-gradient(circle_at_82%_22%,rgba(99,102,241,0.14),transparent_32%),linear-gradient(180deg,#ffffff_0%,#eafaff_56%,#f7fbff_100%)]" aria-hidden="true" />
        <div className="absolute left-[-10rem] top-14 h-[24rem] w-[24rem] rounded-full bg-cyan-200/36 blur-3xl" aria-hidden="true" />
        <div className="absolute right-[-12rem] top-28 h-[28rem] w-[28rem] rounded-full bg-indigo-200/28 blur-3xl" aria-hidden="true" />

        <div className="relative mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(27rem,1.08fr)] lg:items-center xl:gap-10">
          <div className="max-w-[45rem] text-left">
            <h1 className="text-[clamp(2.55rem,10vw,4.9rem)] font-semibold leading-[0.94] tracking-[-0.075em] text-slate-950 lg:text-[clamp(3.25rem,4.35vw,5.05rem)]">If AI engines cannot see or understand your business, customers may never get the chance to.</h1>
            <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-slate-600 sm:text-lg sm:leading-8">Cendorq turns AI visibility and readiness into a clear path: see where the business is missing, understand what is causing it, improve what matters, and keep visibility from drifting.</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/free-check" className={CENDORQ_EXPERIENCE_SYSTEM.primaryButton}>Start Free Scan</Link>
              <Link href="/plans" className={CENDORQ_EXPERIENCE_SYSTEM.secondaryButton}>View Plans</Link>
            </div>
          </div>
          <SignalMap />
        </div>
      </section>

      <section id="ai-readiness" className="relative scroll-mt-24 px-5 py-7 sm:px-8 lg:py-10" aria-label="AI visibility and readiness story">
        <div className={CENDORQ_EXPERIENCE_SYSTEM.maxWidth}>
          <div className="rounded-[2rem] border border-white/80 bg-[radial-gradient(circle_at_50%_0%,rgba(125,211,252,0.24),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.9),rgba(238,251,255,0.84)_58%,rgba(255,255,255,0.92))] p-5 shadow-[0_18px_60px_rgba(15,23,42,0.065)] backdrop-blur sm:rounded-[2.6rem] sm:p-7 lg:p-8">
            <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <h2 className="max-w-4xl text-[clamp(2.1rem,8.8vw,4.25rem)] font-semibold leading-[0.97] tracking-[-0.07em] text-slate-950 sm:text-[clamp(2.35rem,3.7vw,4.25rem)]">AI is becoming the place customers meet you first.</h2>
              <p className="max-w-3xl text-base font-medium leading-7 text-slate-600 sm:text-lg sm:leading-8">To be found, recommended, or trusted, a business needs visibility, clear facts, consistent signals, trusted proof, and a reason to choose. Cendorq helps reveal what should be strengthened first without promising rankings, leads, revenue, or AI placement.</p>
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
          <h2 className="max-w-4xl text-[clamp(2rem,7.5vw,3.9rem)] font-semibold leading-[0.98] tracking-[-0.065em] text-slate-950">Start with the first signal. Move deeper only when it makes sense.</h2>
          <p className="mt-4 max-w-3xl text-base font-medium leading-7 text-slate-600 sm:text-lg sm:leading-8">See where your business may be missing, unclear, under-trusted, or harder to choose. The deeper plan path stays on Plans, where it belongs.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row"><Link href="/free-check" className={CENDORQ_EXPERIENCE_SYSTEM.primaryButton}>Start Free Scan</Link><Link href="/plans" className={CENDORQ_EXPERIENCE_SYSTEM.secondaryButton}>View Plans</Link></div>
        </div>
      </section>
    </main>
  );
}

function SignalMap() {
  const positions = ["left-0 top-0", "right-0 top-0", "left-0 bottom-0", "right-0 bottom-0"] as const;
  return (
    <div className="relative mx-auto w-full max-w-[36rem] lg:ml-auto" aria-hidden="true">
      <div className="absolute -inset-8 rounded-[3.2rem] bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.22),transparent_44%)] blur-2xl" />
      <div className="relative overflow-hidden rounded-[2.2rem] border border-white/95 bg-white/78 p-3 shadow-[0_28px_90px_rgba(15,23,42,0.13)] backdrop-blur-2xl sm:rounded-[2.9rem]">
        <div className="relative min-h-[30rem] overflow-hidden rounded-[1.75rem] border border-slate-200 bg-[radial-gradient(circle_at_48%_30%,#ffffff_0%,#effcff_42%,#dff4ff_100%)] p-5 shadow-inner sm:min-h-[29rem] sm:rounded-[2.35rem] sm:p-7">
          <div className="absolute left-1/2 top-1/2 h-[19.5rem] w-[19.5rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/95 bg-cyan-100/12" />
          <div className="absolute left-1/2 top-1/2 h-[13.5rem] w-[13.5rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-300/80 bg-indigo-100/10" />
          <div className="relative max-w-sm"><h2 className="text-[clamp(1.85rem,7.5vw,3.05rem)] font-semibold leading-[0.98] tracking-[-0.065em] text-slate-950 sm:text-[clamp(2rem,3.1vw,3.05rem)]">What does the market see and understand?</h2><p className="mt-3 text-sm font-medium leading-6 text-slate-600">Cendorq connects visible signals into one safer next action.</p></div>
          <div className="relative mx-auto mt-5 h-[19.5rem] w-full max-w-[22rem] sm:h-[16.5rem] sm:max-w-none">
            <div className="absolute left-1/2 top-1/2 z-20 flex h-[7.1rem] w-[7.1rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-900 bg-slate-950 text-white shadow-[0_18px_56px_rgba(15,23,42,0.25)] sm:h-[7.4rem] sm:w-[7.4rem]"><span className="text-xl font-semibold tracking-[-0.04em] text-white sm:text-2xl">Cendorq</span></div>
            <div className="absolute left-[20%] top-[24%] h-[2px] w-[32%] rotate-[20deg] bg-cyan-500" /><div className="absolute right-[20%] top-[24%] h-[2px] w-[32%] -rotate-[20deg] bg-cyan-500" /><div className="absolute bottom-[24%] left-[20%] h-[2px] w-[32%] -rotate-[20deg] bg-cyan-500" /><div className="absolute bottom-[24%] right-[20%] h-[2px] w-[32%] rotate-[20deg] bg-cyan-500" />
            {READINESS_PATH.map((stage, index) => (
              <div key={stage.label} className={`absolute z-30 ${positions[index]} flex h-[7rem] w-[9.15rem] flex-col justify-between rounded-[1.15rem] border border-slate-200 bg-white p-3 shadow-[0_16px_36px_rgba(15,23,42,0.11)] backdrop-blur sm:h-[7.15rem] sm:w-[9.5rem]`}>
                <div className="flex items-center justify-between gap-2"><span className="flex h-6 w-6 items-center justify-center rounded-full border border-cyan-200 bg-cyan-50 text-xs font-black text-cyan-700">{index + 1}</span><p className="text-[8px] font-black uppercase tracking-[0.19em] text-cyan-700 sm:text-[9px]">{stage.label}</p></div>
                <p className="text-sm font-semibold leading-5 text-slate-950">{stage.name}</p><p className="hidden text-[11px] font-semibold leading-4 text-slate-500 sm:block">{stage.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
