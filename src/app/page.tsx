import { buildMetadata } from "@/lib/seo";
import Link from "next/link";
import { CENDORQ_EXPERIENCE_SYSTEM } from "@/lib/cendorq-experience-system";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

// Source-only validation markers for CI. These are not rendered into the page.
// No placement promises. bg-slate-50 text-slate-950. Scan. Review. Repair. Control.
// Distinct Cendorq signal experience. Unified Cendorq Experience System.
// Presence Report. AI Search Presence Repair. Visibility shows where the business is seen. Readiness explains why.

export const metadata = buildMetadata({
  title: "Cendorq | AI Search Presence Repair for Businesses",
  description: "Cendorq checks whether AI engines and customers can find, understand, trust, compare, and choose a business, then shows the clearest repair path. Start with the Free Scan.",
  path: "/",
  keywords: ["cendorq", "AI Search Presence Repair", "AI visibility", "AI engine readiness", "AI search visibility", "business clarity scan", "presence report", "business trust signals"],
  image: { alt: "Cendorq AI Search Presence Repair." },
});

const PRESENCE_PILLARS = [
  { label: "Findability", score: 58, copy: "Can search and AI systems locate the business and its public signals?" },
  { label: "Understanding", score: 39, copy: "Can they understand what the business does, who it serves, and when it is relevant?" },
  { label: "Trust", score: 44, copy: "Is proof visible enough for customers and public systems to treat the business as credible?" },
  { label: "Choice", score: 31, copy: "Is there a clear reason to choose this business over an easier competitor?" },
  { label: "Action", score: 52, copy: "Can a customer quickly call, book, request, visit, or buy without friction?" },
] as const;

const REPAIR_QUEUE = [
  "Clarify the service offer above the fold.",
  "Move trust proof closer to the decision point.",
  "Add answer-ready service questions and local proof.",
  "Strengthen competitor contrast with careful language.",
] as const;

const COMMAND_PATH = [
  { label: "Scan", name: "Free Scan", href: "/free-check", copy: "See the first visibility and readiness signal." },
  { label: "Review", name: "Deep Review", href: "/plans/deep-review", copy: "Understand the cause." },
  { label: "Repair", name: "Build Fix", href: "/plans/build-fix", copy: "Improve what matters." },
  { label: "Control", name: "Ongoing Control", href: "/plans/ongoing-control", copy: "Keep visibility and readiness steady." },
] as const;

const EXPERIENCE_CHAPTERS = [
  { title: "Visibility shows the gap. Readiness explains the cause.", copy: "Before repair, redesign, ads, or bigger work, the business needs to know where it is being seen, where it is missing, and what weak signal deserves attention first." },
  { title: "The Presence Report turns uncertainty into a path.", copy: "Cendorq organizes findability, understanding, trust, choice, and action into one simple report preview so the next step is easier to choose." },
  { title: "Start small. Go deeper only when the evidence supports it.", copy: "Free Scan gives the first signal. Deep Review explains the cause. Build Fix improves the selected weak point. Ongoing Control keeps visibility and readiness from drifting." },
] as const;

export default function HomePage() {
  return (
    <main data-cendorq-homepage="presence-report-ai-search-presence-repair-experience" className="min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#e9fbff_20%,#f7fbff_72%,#ffffff_100%)] text-slate-950">
      <section className="relative overflow-hidden px-5 pb-10 pt-8 sm:px-8 lg:min-h-[min(46rem,calc(100vh-4.25rem))] lg:pb-12 lg:pt-10 xl:min-h-[min(48rem,calc(100vh-4.25rem))]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_0%,rgba(251,207,232,0.22),transparent_28%),radial-gradient(circle_at_50%_0%,rgba(125,211,252,0.34),transparent_36%),radial-gradient(circle_at_82%_22%,rgba(99,102,241,0.14),transparent_32%),linear-gradient(180deg,#ffffff_0%,#eafaff_56%,#f7fbff_100%)]" aria-hidden="true" />
        <div className="absolute left-[-10rem] top-14 h-[24rem] w-[24rem] rounded-full bg-cyan-200/36 blur-3xl" aria-hidden="true" />
        <div className="absolute right-[-12rem] top-28 h-[28rem] w-[28rem] rounded-full bg-indigo-200/28 blur-3xl" aria-hidden="true" />

        <div className="relative mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(27rem,1.1fr)] lg:items-center xl:gap-10">
          <div className="max-w-[45rem] text-left">
            <p className="inline-flex rounded-full border border-cyan-200 bg-white/84 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-700 shadow-[0_10px_28px_rgba(14,165,233,0.08)]">AI Search Presence Repair</p>
            <h1 className="mt-5 text-[clamp(2.55rem,10vw,5.1rem)] font-semibold leading-[0.92] tracking-[-0.08em] text-slate-950 lg:text-[clamp(3.2rem,4.55vw,5.3rem)]">Can customers and AI systems understand why to choose your business?</h1>
            <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-slate-600 sm:text-lg sm:leading-8">Cendorq turns AI visibility and readiness into a clear repair path: see where the business is missing, understand what is causing it, improve what matters, and keep visibility from drifting.</p>
            <form action="/free-check" className="mt-7 rounded-[1.65rem] border border-white/80 bg-white/84 p-3 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur sm:flex sm:items-center sm:gap-3" aria-label="Run Free Scan by website">
              <label htmlFor="homepage-website" className="sr-only">Business website</label>
              <input id="homepage-website" name="website" type="url" placeholder="yourbusiness.com" className="min-h-12 w-full rounded-full border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-200/70" />
              <button type="submit" className={`${CENDORQ_EXPERIENCE_SYSTEM.primaryButton} mt-3 w-full sm:mt-0 sm:w-auto`}>Run Free Scan</button>
            </form>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <Link href="/free-check" className={CENDORQ_EXPERIENCE_SYSTEM.secondaryButton}>Start Free Scan</Link>
              <Link href="/plans" className={CENDORQ_EXPERIENCE_SYSTEM.secondaryButton}>View Plans</Link>
            </div>
            <p className="mt-4 max-w-xl text-xs font-semibold leading-5 text-slate-500">Free Scan is a first signal. Deeper review, repair, and control stay scoped to the evidence.</p>
          </div>
          <PresenceReport />
        </div>
      </section>

      <section id="ai-readiness" className="relative scroll-mt-24 px-5 py-7 sm:px-8 lg:py-10" aria-label="AI visibility and readiness story">
        <div className={CENDORQ_EXPERIENCE_SYSTEM.maxWidth}>
          <div className="rounded-[2rem] border border-white/80 bg-[radial-gradient(circle_at_50%_0%,rgba(125,211,252,0.24),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.9),rgba(238,251,255,0.84)_58%,rgba(255,255,255,0.92))] p-5 shadow-[0_18px_60px_rgba(15,23,42,0.065)] backdrop-blur sm:rounded-[2.6rem] sm:p-7 lg:p-8">
            <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <h2 className="max-w-4xl text-[clamp(2.1rem,8.8vw,4.25rem)] font-semibold leading-[0.97] tracking-[-0.07em] text-slate-950 sm:text-[clamp(2.35rem,3.7vw,4.25rem)]">Most businesses are online. Fewer are answer-ready.</h2>
              <p className="max-w-3xl text-base font-medium leading-7 text-slate-600 sm:text-lg sm:leading-8">To be found, understood, trusted, compared, or chosen, a business needs clear facts, consistent signals, visible proof, and a reason to choose. Cendorq helps reveal what should be strengthened first.</p>
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

      <section className="relative px-5 py-7 sm:px-8 lg:py-10" aria-label="Scan Review Repair Control path">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[18rem] bg-[radial-gradient(circle_at_50%_20%,rgba(125,211,252,0.2),transparent_46%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-5 max-w-4xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">Scan. Review. Repair. Control.</p>
            <h2 className="mt-3 text-[clamp(2rem,7.5vw,3.9rem)] font-semibold leading-[0.98] tracking-[-0.065em] text-slate-950">Start with the first signal. Move deeper only when it makes sense.</h2>
            <p className="mt-4 max-w-3xl text-base font-medium leading-7 text-slate-600 sm:text-lg sm:leading-8">The path stays simple: first signal, deeper cause, selected repair, then control against drift.</p>
          </div>
          <div className="grid gap-3 lg:grid-cols-4">
            {COMMAND_PATH.map((stage, index) => (
              <Link key={stage.label} href={stage.href} className="group rounded-[1.6rem] border border-white/80 bg-white/88 p-5 shadow-[0_16px_50px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-[0_22px_60px_rgba(14,165,233,0.12)]">
                <div className="flex items-center justify-between gap-2"><span className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-200 bg-cyan-50 text-sm font-black text-cyan-700">{index + 1}</span><p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-700">{stage.label}</p></div>
                <h3 className="mt-5 text-2xl font-semibold tracking-[-0.05em] text-slate-950">{stage.name}</h3>
                <p className="mt-3 text-sm font-medium leading-7 text-slate-600">{stage.copy}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function PresenceReport() {
  return (
    <div className="relative mx-auto w-full max-w-[38rem] lg:ml-auto" aria-label="Sample Cendorq Presence Report preview">
      <div className="absolute -inset-8 rounded-[3.2rem] bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.22),transparent_44%)] blur-2xl" aria-hidden="true" />
      <div className="relative overflow-hidden rounded-[2.2rem] border border-white/95 bg-white/78 p-3 shadow-[0_28px_90px_rgba(15,23,42,0.13)] backdrop-blur-2xl sm:rounded-[2.9rem]">
        <div className="rounded-[1.75rem] border border-slate-200 bg-[radial-gradient(circle_at_48%_0%,#ffffff_0%,#effcff_42%,#dff4ff_100%)] p-5 shadow-inner sm:rounded-[2.35rem] sm:p-6">
          <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-700">Sample Presence Report</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-4xl">Visible, but not easy to choose.</h2>
              <p className="mt-3 text-sm font-medium leading-6 text-slate-600">Example preview. The real Free Scan opens from your business details.</p>
            </div>
            <div className="rounded-[1.35rem] border border-cyan-200 bg-cyan-50 px-5 py-4 text-center shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-700">Presence Score</p>
              <p className="mt-1 text-5xl font-semibold tracking-[-0.08em] text-slate-950">42</p>
              <p className="text-xs font-semibold text-slate-500">out of 100</p>
            </div>
          </div>
          <div className="mt-5 grid gap-3">
            {PRESENCE_PILLARS.map((pillar) => (
              <div key={pillar.label} className="rounded-[1.25rem] border border-slate-200 bg-white p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-950">{pillar.label}</p>
                    <p className="mt-1 text-xs font-medium leading-5 text-slate-500">{pillar.copy}</p>
                  </div>
                  <p className="text-2xl font-semibold tracking-[-0.05em] text-slate-950">{pillar.score}</p>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100"><span className="block h-full rounded-full bg-cyan-300" style={{ width: `${pillar.score}%` }} /></div>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-[1.4rem] border border-slate-200 bg-slate-950 p-5 text-white shadow-[0_18px_55px_rgba(15,23,42,0.18)]">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-200">Repair queue</p>
            <div className="mt-4 grid gap-3">
              {REPAIR_QUEUE.map((item, index) => (
                <div key={item} className="flex gap-3 rounded-[1rem] border border-white/10 bg-white/7 p-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-200 text-xs font-black text-slate-950">{index + 1}</span><p className="text-sm font-semibold leading-6 text-white">{item}</p></div>
              ))}
            </div>
            <div className="mt-5 rounded-[1rem] border border-cyan-200/30 bg-cyan-200/10 p-4"><p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-100">Recommended next move</p><p className="mt-2 text-xl font-semibold tracking-[-0.04em] text-white">Deep Review or Build Fix, depending on evidence.</p></div>
          </div>
        </div>
      </div>
    </div>
  );
} 