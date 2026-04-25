import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Page Not Found | Cendorq",
  description:
    "The page could not be found. Return to the Cendorq free scan, compare plans, or choose the right next move.",
  robots: {
    index: false,
    follow: true,
  },
};

const RECOVERY_ROUTES = [
  {
    label: "Best first move",
    title: "Start Free Scan",
    copy: "Use this when you are not sure what is making people hesitate, leave, compare away, or fail to act.",
    href: "/free-check",
    cta: "Start free scan",
    highlighted: true,
  },
  {
    label: "Need the full path",
    title: "Compare Plans",
    copy: "See the Cendorq path from first read to deeper review, build work, and ongoing control.",
    href: "/plans",
    cta: "View plans",
  },
  {
    label: "Need direction",
    title: "Connect",
    copy: "Choose the right lane when the question is clear enough to discuss fit, scope, or timing.",
    href: "/connect",
    cta: "Choose lane",
  },
] as const;

export default function NotFound() {
  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-10 text-white sm:px-6 md:py-14 xl:py-16">
      <NotFoundAtmosphere />

      <section className="relative z-10 grid gap-8 lg:min-h-[calc(100vh-12rem)] lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div>
          <TopChip>Route not found</TopChip>
          <h1 className="system-hero-title mt-5 max-w-5xl text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl xl:text-[4.7rem]">
            This page is not the path. The next move is still clear.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            The link may be old, moved, or mistyped. Do not restart the search from scratch. Use the strongest Cendorq route below and keep moving toward the right next step.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link href="/free-check" className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition">
              Start free scan
            </Link>
            <Link href="/" className="system-button-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition">
              Return home
            </Link>
          </div>
        </div>

        <div className="grid gap-4">
          {RECOVERY_ROUTES.map((item) => (
            <RecoveryCard key={item.href} {...item} />
          ))}
        </div>
      </section>
    </main>
  );
}

function RecoveryCard({
  label,
  title,
  copy,
  href,
  cta,
  highlighted = false,
}: {
  label: string;
  title: string;
  copy: string;
  href: string;
  cta: string;
  highlighted?: boolean;
}) {
  return (
    <article className={highlighted ? "system-panel-authority rounded-[1.8rem] p-5 sm:p-6" : "system-surface rounded-[1.8rem] p-5 sm:p-6"}>
      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200">{label}</div>
      <div className="mt-3 text-2xl font-semibold tracking-tight text-white">{title}</div>
      <p className="mt-3 text-sm leading-7 text-slate-300">{copy}</p>
      <Link href={href} className={highlighted ? "system-button-primary mt-5 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition" : "system-button-secondary mt-5 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition"}>
        {cta}
      </Link>
    </article>
  );
}

function TopChip({ children }: { children: ReactNode }) {
  return (
    <div className="system-chip inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">
      <span className="system-pulse-dot inline-flex h-2 w-2 rounded-full bg-cyan-300" />
      {children}
    </div>
  );
}

function NotFoundAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-10 top-8 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl sm:h-96 sm:w-96" />
      <div className="absolute -right-8 top-24 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl sm:h-80 sm:w-80" />
      <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-300/8 blur-3xl sm:h-[24rem] sm:w-[24rem]" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.025]" />
    </div>
  );
}
