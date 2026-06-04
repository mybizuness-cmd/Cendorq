import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Cendorq",
  description: "The page could not be found. Return to the Cendorq homepage, Free Scan, Plans, or Sign-in/Sign-up path.",
  robots: { index: false, follow: true },
};

const ROUTES = [
  { title: "Homepage", href: "/", copy: "Return to the main Cendorq path." },
  { title: "Start Scan", href: "/free-check", copy: "Use this when the first weak signal is still unclear." },
  { title: "Plans", href: "/plans", copy: "Choose Scan, Review, Repair, or Control when the depth fits." },
  { title: "Sign-in/Sign-up", href: "/login", copy: "Return with the same email used for a scan, plan, report, billing, or support." },
] as const;

const PRIMARY_LINK_CLASS = "inline-flex min-h-14 items-center justify-center rounded-full border border-cyan-200 bg-cyan-100 px-8 py-4 text-base font-black text-slate-950 shadow-[0_18px_48px_rgba(14,165,233,0.14)] transition hover:-translate-y-0.5 hover:bg-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2";
const SECONDARY_LINK_CLASS = "inline-flex min-h-14 items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-4 text-base font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2";

export default function NotFound() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(251,207,232,0.16),transparent_30%),radial-gradient(circle_at_88%_0%,rgba(125,211,252,0.14),transparent_34%),linear-gradient(180deg,#ffffff_0%,#f7fcff_45%,#ffffff_100%)] text-slate-950">
      <NotFoundAtmosphere />

      <section className="relative mx-auto grid min-h-[calc(100vh-4.5rem)] max-w-[92rem] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:py-14" aria-label="Page not found recovery">
        <div className="relative z-10 max-w-4xl">
          <p className="text-sm font-semibold text-cyan-700">Page not found</p>
          <h1 className="mt-4 max-w-5xl text-[clamp(3rem,7.6vw,6.8rem)] font-semibold leading-[0.86] tracking-[-0.09em] text-slate-950">
            This link is not available.
          </h1>
          <p className="mt-6 max-w-2xl text-base font-semibold leading-7 text-slate-600 sm:text-xl sm:leading-9">
            Use a known Cendorq route below instead of retrying an old, broken, or private link.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/free-check" className={PRIMARY_LINK_CLASS}>Start Scan</Link>
            <Link href="/" className={SECONDARY_LINK_CLASS}>Homepage</Link>
          </div>
        </div>

        <section className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/88 p-5 shadow-[0_26px_84px_rgba(15,23,42,0.075)] backdrop-blur-2xl sm:p-7" aria-label="Known routes">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(251,207,232,0.14),transparent_36%),radial-gradient(circle_at_100%_100%,rgba(186,230,253,0.1),transparent_40%)]" aria-hidden="true" />
          <div className="relative">
            <p className="text-sm font-semibold text-cyan-700">Safe routes</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {ROUTES.map((route) => (
                <Link key={route.href} href={route.href} className="rounded-[1.15rem] border border-slate-200 bg-white/88 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2">
                  <h2 className="text-2xl font-semibold tracking-[-0.05em] text-slate-950">{route.title}</h2>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{route.copy}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </section>

      <span className="sr-only">404. Page not found. Cendorq route recovery. Homepage. Start Scan. Plans. Sign-in/Sign-up. Scan, Review, Repair, Control. One clear page. No Customer Access label. No AI Visibility wording. No crowded route wall.</span>
    </main>
  );
}

function NotFoundAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(251,207,232,0.12),transparent_30%),radial-gradient(circle_at_86%_6%,rgba(56,189,248,0.09),transparent_27%),linear-gradient(180deg,rgba(255,255,255,0.45),rgba(248,252,255,0.68)_42%,rgba(255,255,255,0.95)_100%)]" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.014]" />
    </div>
  );
}
