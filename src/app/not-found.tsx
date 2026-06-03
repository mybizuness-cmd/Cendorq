import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Cendorq",
  description: "The page could not be found. Return to the Cendorq Free Scan, Sample Report, Plans, or Customer Access path.",
  robots: { index: false, follow: true },
};

const ROUTES = [
  { title: "Start Free Scan", href: "/free-check", copy: "Use this when the first AI Visibility or readiness signal is still unclear." },
  { title: "Open Sample Report", href: "/sample-report", copy: "See how Cendorq reads score, Choice Gap, Repair Queue, and boundaries." },
  { title: "Compare Plans", href: "/plans", copy: "Choose Scan, Review, Repair, or Control only when the depth fits." },
  { title: "Customer Access", href: "/login", copy: "Return with the same email used for a scan, plan, report, billing, or support." },
] as const;

const READ_ORDER = [
  ["Recover", "Use a known public route instead of retrying a broken or old link."],
  ["Route", "Choose the path that matches the real job: first signal, sample proof, plan depth, or customer access."],
  ["Continue", "Return to the Cendorq command path without exposing private dashboard or support details."],
] as const;

const PRIMARY_LINK_CLASS = "inline-flex min-h-12 items-center justify-center rounded-full border border-cyan-200 bg-cyan-100 px-6 py-3 text-sm font-black text-slate-950 shadow-[0_16px_38px_rgba(14,165,233,0.14)] transition hover:-translate-y-0.5 hover:bg-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2";
const SECONDARY_LINK_CLASS = "inline-flex min-h-12 items-center justify-center rounded-full border border-cyan-100 bg-white px-6 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2";

export default function NotFound() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(251,207,232,0.2),transparent_30%),radial-gradient(circle_at_88%_0%,rgba(125,211,252,0.24),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_38%,#ffffff_100%)] text-slate-950">
      <NotFoundAtmosphere />

      <section className="relative mx-auto grid max-w-[92rem] gap-8 px-4 pb-10 pt-8 sm:px-6 md:pt-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-center" aria-label="Cendorq page not found recovery">
        <div className="relative z-10">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Page not found</p>
          <h1 className="mt-4 max-w-5xl text-[clamp(3rem,7vw,6.6rem)] font-semibold leading-[0.86] tracking-[-0.08em] text-slate-950">This link is not on the command path.</h1>
          <p className="mt-6 max-w-3xl text-base font-semibold leading-8 text-slate-600 sm:text-xl sm:leading-9">The route may have changed, expired, or never existed. Use one of the safe Cendorq paths below to continue without guessing.</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/free-check" className={PRIMARY_LINK_CLASS}>Start Free Scan</Link>
            <Link href="/" className={SECONDARY_LINK_CLASS}>Back to homepage</Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.35rem] border border-white/80 bg-white/78 p-5 shadow-[0_30px_100px_rgba(15,23,42,0.09)] backdrop-blur-2xl sm:p-7">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/90 to-transparent" />
          <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">Safe recovery</p>
          <h2 className="mt-3 text-[clamp(2.1rem,5vw,4.2rem)] font-semibold leading-[0.95] tracking-[-0.07em] text-slate-950">Recover without losing direction.</h2>
          <div className="mt-6 grid gap-3">
            {READ_ORDER.map(([label, copy]) => (
              <article key={label} className="rounded-[1.25rem] border border-cyan-100 bg-white/88 p-4 shadow-sm">
                <h3 className="text-xl font-semibold tracking-[-0.04em] text-slate-950">{label}</h3>
                <p className="mt-2 text-xs font-semibold leading-6 text-slate-600">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-16 sm:px-6" aria-label="Known Cendorq routes">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {ROUTES.map((route) => (
            <Link key={route.href} href={route.href} className="rounded-[1.45rem] border border-white/80 bg-white/84 p-5 shadow-[0_14px_42px_rgba(15,23,42,0.045)] backdrop-blur transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2">
              <h2 className="text-2xl font-semibold tracking-[-0.045em] text-slate-950">{route.title}</h2>
              <p className="mt-3 text-xs font-semibold leading-6 text-slate-600">{route.copy}</p>
            </Link>
          ))}
        </div>
      </section>

      <span className="sr-only">404. Page not found. Cendorq route recovery. Start Free Scan. Sample Report. Plans. Customer Access. Scan, Report, Plan. Recover. Route. Continue. No broken-link dead end. No private dashboard details exposed.</span>
    </main>
  );
}

function NotFoundAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(251,207,232,0.16),transparent_30%),radial-gradient(circle_at_86%_6%,rgba(56,189,248,0.14),transparent_27%),linear-gradient(180deg,rgba(255,255,255,0.4),rgba(239,249,255,0.74)_42%,rgba(255,255,255,0.95)_100%)]" />
      <div className="absolute left-1/2 top-0 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-cyan-200/20 blur-3xl" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.018]" />
    </div>
  );
}
