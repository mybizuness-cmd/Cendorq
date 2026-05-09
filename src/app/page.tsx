import { buildMetadata } from "@/lib/seo";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export const metadata = buildMetadata({
  title: "Cendorq | Market Command Intelligence",
  description:
    "Cendorq helps a business become easier to find, understand, trust, and choose. Start with the Free Scan, then move through Deep Review, Build Fix, and Ongoing Control only when the next command is justified.",
  path: "/",
  keywords: [
    "cendorq",
    "market command intelligence",
    "free business scan",
    "AI search visibility",
    "business trust scan",
    "customer choice intelligence",
    "business clarity scan",
  ],
  image: { alt: "Cendorq Market Command Intelligence." },
});

const COMMAND_PATH = [
  {
    step: "01",
    verb: "Scan",
    plan: "Free Scan",
    copy: "Use the existing Free Scan form to capture the first real business signal without touching the dashboard or backend flow.",
    href: "/free-check",
    cta: "Start Free Scan",
  },
  {
    step: "02",
    verb: "Diagnose",
    plan: "Deep Review",
    copy: "Prove what is weakening findability, clarity, trust, choice, or action before money goes into the wrong fix.",
    href: "/plans/deep-review",
    cta: "See Deep Review",
  },
  {
    step: "03",
    verb: "Fix",
    plan: "Build Fix",
    copy: "Turn the strongest diagnosed issue into a scoped improvement that can actually change the customer path.",
    href: "/plans/build-fix",
    cta: "See Build Fix",
  },
  {
    step: "04",
    verb: "Control",
    plan: "Ongoing Control",
    copy: "Keep visibility, proof, trust, search, reviews, AI answers, and customer friction under watch over time.",
    href: "/plans/ongoing-control",
    cta: "See Ongoing Control",
  },
] as const;

const TRUST_POINTS = [
  "The Free Scan form stays intact.",
  "Dashboard and report paths stay intact.",
  "No old Pricing or Diagnosis routes on the homepage.",
  "No fake guarantees, no vague audit theater, no clutter.",
] as const;

export default function HomePage() {
  return (
    <main data-cendorq-homepage="market-command-home-v1" className="relative isolate min-h-screen overflow-hidden bg-slate-950 text-white">
      <HomeBackground />

      <section className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-[94rem] gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:py-16">
        <div className="relative z-10">
          <div className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-100 shadow-[0_0_60px_rgba(34,211,238,0.12)]">
            Cendorq Market Command Intelligence
          </div>

          <h1 className="mt-6 max-w-6xl text-[clamp(3.4rem,8vw,8.2rem)] font-semibold leading-[0.84] tracking-[-0.08em] text-white">
            Become easier to find, trust, and choose.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl sm:leading-9">
            Cendorq checks the market path around your business: how customers, search, reviews, maps, and AI answers understand you before they decide. Start with the Free Scan, then move deeper only when the next command is clear.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/free-check" className="inline-flex min-h-14 items-center justify-center rounded-full bg-cyan-200 px-9 py-4 text-base font-black text-slate-950 shadow-[0_22px_80px_rgba(103,232,249,0.24)] transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
              Start Free Scan
            </Link>
            <Link href="/plans" className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-9 py-4 text-base font-bold text-white shadow-[0_18px_70px_rgba(2,8,23,0.32)] transition hover:border-cyan-200/40 hover:bg-cyan-200/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
              Review Plans
            </Link>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {TRUST_POINTS.map((point) => (
              <div key={point} className="rounded-[1.35rem] border border-white/10 bg-white/[0.045] px-5 py-4 text-sm font-bold leading-6 text-slate-200 shadow-[0_18px_70px_rgba(2,8,23,0.22)]">
                {point}
              </div>
            ))}
          </div>
        </div>

        <aside className="relative z-10 overflow-hidden rounded-[2.7rem] border border-cyan-200/22 bg-[radial-gradient(circle_at_50%_0%,rgba(103,232,249,0.2),transparent_36%),linear-gradient(145deg,rgba(8,47,73,0.9),rgba(2,8,23,0.98)_52%,rgba(14,116,144,0.32))] p-4 shadow-[0_55px_200px_rgba(2,8,23,0.72)] sm:p-6" aria-label="Cendorq command path preview">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/90 to-transparent" />
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-300/12 blur-3xl" />

          <div className="relative z-10">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-100">Clean command path</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.06em] text-white sm:text-5xl">
              Scan. Diagnose. Fix. Control.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-300">
              This homepage is intentionally simple. The real engine starts at the Free Scan form and continues through the protected dashboard.
            </p>

            <div className="mt-6 divide-y divide-white/10 rounded-[2rem] border border-white/10 bg-slate-950/58">
              {COMMAND_PATH.map((stage) => (
                <Link key={stage.verb} href={stage.href} className="group grid gap-4 p-5 transition hover:bg-cyan-200/[0.06] focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950 sm:grid-cols-[6rem_1fr]">
                  <div>
                    <div className="text-xs font-black uppercase tracking-[0.2em] text-cyan-100/70">{stage.step}</div>
                    <div className="mt-2 text-3xl font-semibold tracking-[-0.06em] text-white">{stage.verb}</div>
                  </div>
                  <div>
                    <div className="text-sm font-black uppercase tracking-[0.18em] text-cyan-100">{stage.plan}</div>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{stage.copy}</p>
                    <span className="mt-3 inline-flex text-sm font-bold text-cyan-100 transition group-hover:text-white">{stage.cta} →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="sr-only" aria-label="Cendorq homepage replacement verification">
        Cendorq Market Command Intelligence homepage replacement. Free Scan. Deep Review. Build Fix. Ongoing Control. Scan. Diagnose. Fix. Control. Start Free Scan. Review Plans. Dashboard and report paths stay intact.
      </section>
    </main>
  );
}

function HomeBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(103,232,249,0.16),transparent_30%),radial-gradient(circle_at_84%_4%,rgba(56,189,248,0.11),transparent_26%),linear-gradient(180deg,#020617_0%,#020817_42%,#030712_100%)]" />
      <div className="absolute left-1/2 top-0 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-cyan-300/[0.04] blur-3xl" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.018]" />
    </div>
  );
}
