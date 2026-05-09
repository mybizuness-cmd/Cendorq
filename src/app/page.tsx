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
    promise: "Find the first visible break in clarity, trust, discovery, or action.",
    href: "/free-check",
    cta: "Start Free Scan",
  },
  {
    step: "02",
    verb: "Diagnose",
    plan: "Deep Review",
    promise: "Prove what is actually weakening the customer path before buying the fix.",
    href: "/plans/deep-review",
    cta: "See Deep Review",
  },
  {
    step: "03",
    verb: "Fix",
    plan: "Build Fix",
    promise: "Turn the strongest diagnosis into a scoped improvement customers can feel.",
    href: "/plans/build-fix",
    cta: "See Build Fix",
  },
  {
    step: "04",
    verb: "Control",
    plan: "Ongoing Control",
    promise: "Keep search, reviews, AI answers, proof, and customer friction under watch.",
    href: "/plans/ongoing-control",
    cta: "See Ongoing Control",
  },
] as const;

const SIGNALS = [
  "Findability",
  "Clarity",
  "Trust",
  "Choice",
  "Action",
] as const;

const TRUST_POINTS = [
  "Start with evidence before paid depth.",
  "Move deeper only when the signal is strong.",
  "See the path before committing to the fix.",
  "No fake guarantees, no vague audit theater, no clutter.",
] as const;

export default function HomePage() {
  return (
    <main data-cendorq-homepage="market-command-home-v1" className="relative isolate min-h-screen overflow-hidden bg-[#020713] text-white">
      <HomeBackground />

      <section className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-[86rem] flex-col px-5 py-10 sm:px-8 lg:justify-center lg:py-14">
        <div className="grid gap-8 xl:grid-cols-[1.04fr_0.96fr] xl:items-center">
          <div className="relative z-10">
            <div className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-black uppercase tracking-[0.24em] text-cyan-100 shadow-[0_1px_0_rgba(255,255,255,0.08)_inset]">
              Cendorq Market Command Intelligence
            </div>

            <h1 className="mt-7 max-w-5xl text-[clamp(3.1rem,7.4vw,7.2rem)] font-semibold leading-[0.86] tracking-[-0.085em] text-white">
              Become easier to find, trust, and choose.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl sm:leading-9">
              Cendorq reads the public market path around your business before customers decide. Start with a Free Scan, then move deeper only when the next command is justified.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/free-check" className="inline-flex min-h-14 items-center justify-center rounded-full bg-white px-9 py-4 text-base font-black text-slate-950 shadow-[0_24px_90px_rgba(255,255,255,0.18)] transition hover:bg-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
                Start Free Scan
              </Link>
              <Link href="/plans" className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/12 bg-white/[0.045] px-9 py-4 text-base font-bold text-white transition hover:border-cyan-200/45 hover:bg-cyan-200/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
                Review Plans
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
              {SIGNALS.map((signal) => (
                <span key={signal} className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-2">
                  {signal}
                </span>
              ))}
            </div>
          </div>

          <MarketCard />
        </div>
      </section>

      <section className="relative mx-auto max-w-[86rem] px-5 pb-14 sm:px-8" aria-label="Cendorq command path">
        <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
          {COMMAND_PATH.map((stage) => (
            <Link key={stage.verb} href={stage.href} className="group rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-[0_24px_100px_rgba(0,0,0,0.25)] transition hover:-translate-y-1 hover:border-cyan-200/35 hover:bg-cyan-200/[0.055] focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-black uppercase tracking-[0.22em] text-cyan-100/70">{stage.step}</span>
                <span className="rounded-full border border-cyan-200/18 bg-cyan-200/[0.07] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-cyan-100">
                  {stage.plan}
                </span>
              </div>
              <h2 className="mt-6 text-4xl font-semibold tracking-[-0.06em] text-white">{stage.verb}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">{stage.promise}</p>
              <span className="mt-5 inline-flex text-sm font-bold text-cyan-100 transition group-hover:text-white">{stage.cta} -&gt;</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-[86rem] px-5 pb-16 sm:px-8" aria-label="Cendorq trust boundaries">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {TRUST_POINTS.map((point) => (
            <p key={point} className="rounded-[1.35rem] border border-white/10 bg-white/[0.035] px-5 py-4 text-sm font-bold leading-6 text-slate-200">
              {point}
            </p>
          ))}
        </div>
      </section>

      <section className="sr-only" aria-label="Cendorq homepage replacement verification">
        Cendorq Market Command Intelligence homepage replacement. Free Scan. Deep Review. Build Fix. Ongoing Control. Scan. Diagnose. Fix. Control. Start Free Scan. Review Plans. Start with evidence before paid depth. Move deeper only when the signal is strong.
      </section>
    </main>
  );
}

function MarketCard() {
  return (
    <aside className="relative z-10 overflow-hidden rounded-[2.5rem] border border-white/12 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.025)_44%,rgba(34,211,238,0.1))] p-5 shadow-[0_45px_180px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-6" aria-label="Market command preview">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/80 to-transparent" />
      <div className="absolute -right-28 -top-28 h-72 w-72 rounded-full bg-cyan-300/12 blur-3xl" />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-100">First read</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.06em] text-white sm:text-5xl">
              The market either understands you or it moves on.
            </h2>
          </div>
          <span className="hidden rounded-full border border-emerald-200/20 bg-emerald-200/10 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-emerald-100 sm:inline-flex">
            Live path
          </span>
        </div>

        <div className="mt-7 grid gap-3">
          {SIGNALS.map((signal, index) => (
            <div key={signal} className="rounded-[1.35rem] border border-white/10 bg-slate-950/48 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-100/75">{signal}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{signalCopy(signal)}</p>
                </div>
                <div className="h-2 w-20 overflow-hidden rounded-full bg-white/10">
                  <span className="block h-full rounded-full bg-cyan-100" style={{ width: `${56 + index * 8}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-[1.35rem] border border-cyan-200/18 bg-cyan-200/[0.07] p-4 text-sm font-bold leading-7 text-cyan-50">
          The Free Scan starts the system. The protected dashboard carries the result.
        </div>
      </div>
    </aside>
  );
}

function signalCopy(signal: (typeof SIGNALS)[number]) {
  if (signal === "Findability") return "Can customers, search, maps, and AI answers surface the business?";
  if (signal === "Clarity") return "Can a buyer understand the offer fast enough to keep moving?";
  if (signal === "Trust") return "Is proof close enough to the decision?";
  if (signal === "Choice") return "Is the reason to choose you sharper than the alternative?";
  return "Is the next step obvious when the buyer is ready?";
}

function HomeBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(103,232,249,0.16),transparent_30%),radial-gradient(circle_at_84%_4%,rgba(56,189,248,0.1),transparent_26%),linear-gradient(180deg,#020713_0%,#030917_46%,#020617_100%)]" />
      <div className="absolute left-1/2 top-[-16rem] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-cyan-300/[0.05] blur-3xl" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.018]" />
    </div>
  );
}
