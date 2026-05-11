import {
  buildBreadcrumbJsonLd,
  buildMetadata,
  buildServiceJsonLd,
  buildWebPageJsonLd,
  toJsonLd,
} from "@/lib/seo";
import Link from "next/link";
import type { ReactNode } from "react";

const BRAND_NAME = "Cendorq";
const CATEGORY_LINE = "AI Readiness";

export const metadata = buildMetadata({
  title: "Report access | Cendorq",
  description:
    "Customer-safe report access surface for Free Scan results, readiness reports, and next-step routing inside Cendorq.",
  path: "/report",
  keywords: [
    "cendorq report",
    "free scan report",
    "AI readiness report",
    "saved report",
    "customer report access",
  ],
  image: {
    alt: "Cendorq report access for Free Scan and readiness reports.",
  },
  noIndex: true,
});

const ROUTE_READOUTS = [
  { label: "Current role", value: "Report access shell" },
  { label: "Best source", value: "Customer dashboard" },
  { label: "Primary feed", value: "Free Scan" },
  { label: "Next expansion", value: "Saved report rendering" },
] as const;

const REPORT_MEANING = [
  {
    title: "Reports should open from the protected workspace.",
    copy:
      "Customer-facing report access should stay connected to verified dashboard access instead of exposing private context on a loose public route.",
  },
  {
    title: "The report layer should sit after signal, not replace it.",
    copy:
      "Free Scan creates the first readiness signal. The dashboard is where that signal can become a protected result, review path, or next-step decision.",
  },
  {
    title: "This shell protects sequence while the report layer grows.",
    copy:
      "A controlled report surface is stronger than a broken dynamic layer. The route stays alive, clear, and expandable without pretending heavier report state is ready before it is stable.",
  },
] as const;

const REPORT_LIFECYCLE = [
  {
    step: "01",
    title: "Signal is collected",
    copy:
      "Free Scan captures the business context and first readiness signal so the system has something real to interpret.",
  },
  {
    step: "02",
    title: "Access is verified",
    copy:
      "The customer workspace keeps report access tied to the right email, plan, support history, and protected result path.",
  },
  {
    step: "03",
    title: "Saved output becomes the visible layer",
    copy:
      "The report route can later render stronger saved-output experiences while dashboard access remains the safest customer home.",
  },
] as const;

const TRUST_BOUNDARIES = [
  {
    label: "Current state",
    value:
      "This route is intentionally a strong customer-safe shell, not a fake full report engine. It is stable now so the next report layer can grow on a clean base.",
  },
  {
    label: "Best entry point",
    value:
      "Free Scan remains the clearest route into future report logic because it generates the first serious signal the report layer should depend on.",
  },
  {
    label: "Best customer surface",
    value:
      "The dashboard remains the best current surface for protected results, billing, support, and next-step readiness decisions.",
  },
] as const;

export default function ReportPage() {
  const webPageJsonLd = buildWebPageJsonLd({
    title: `${BRAND_NAME} Report Access`,
    description:
      "Customer-safe report access surface for Free Scan results and next-step routing inside Cendorq.",
    path: "/report",
  });

  const serviceJsonLd = buildServiceJsonLd({
    title: `${BRAND_NAME} Report Access`,
    description:
      "A customer-safe route for Free Scan report access, dashboard routing, and future report rendering.",
    path: "/report",
    serviceType: "Free Scan report access",
  });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Report Access", path: "/report" },
  ]);

  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-12 text-white sm:px-6 md:py-16 xl:py-20">
      <ReportAtmosphere />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />

      <section className="relative z-10 border-b border-white/8 pb-10">
        <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
          <span className="system-chip rounded-full px-3 py-1.5 text-cyan-200">{BRAND_NAME}</span>
          <span className="text-white/20">/</span>
          <span className="text-white/70">{CATEGORY_LINE}</span>
          <span className="text-white/20">/</span>
          <span className="text-cyan-100">Report access</span>
        </div>
      </section>

      <section className="relative z-10 grid gap-10 pt-10 lg:grid-cols-[0.94fr_1.06fr] lg:items-start">
        <div>
          <TopChip>Report access</TopChip>

          <h1 className="system-hero-title mt-5 max-w-5xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
            Reports should stay connected
            <span className="system-gradient-text block">to the protected customer workspace.</span>
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            This route keeps report access clear while the fuller saved-output experience grows. Free Scan creates the first signal; the dashboard keeps results, billing, support, and next steps protected.
          </p>

          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            If you already have access, continue into the dashboard. If you are starting fresh, begin with the Free Scan.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <AuthorityPill>Protected workspace first</AuthorityPill>
            <AuthorityPill>Signal before report</AuthorityPill>
            <AuthorityPill>Expandable by design</AuthorityPill>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/dashboard/reports"
              className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
            >
              Open dashboard reports
            </Link>
            <Link
              href="/free-check"
              className="system-button-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
            >
              Start Free Scan
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-[2rem] bg-cyan-400/10 blur-3xl" />
          <div className="system-panel-authority relative rounded-[2rem] p-5 sm:p-6 md:p-7">
            <div className="system-grid-wide absolute inset-0 opacity-[0.08]" />
            <div className="system-scan-line pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
            <div className="relative z-10">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-2xl">
                  <div className="system-chip inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-200">
                    <span className="system-pulse-dot inline-flex h-2 w-2 rounded-full bg-cyan-300" />
                    Report route active
                  </div>
                  <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    Report access should stay trustworthy even before the full report layer is expanded.
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
                    A strong shell is the correct move while saved-output rendering is being stabilized around verified customer access and real readiness signal.
                  </p>
                </div>

                <div className="grid min-w-0 gap-3 sm:grid-cols-2 lg:w-[22rem]">
                  {ROUTE_READOUTS.map((item, index) => (
                    <ReadoutTile key={item.label} label={item.label} value={item.value} highlighted={index === 0} />
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.22em] text-slate-400">
                  <span>Route maturity</span>
                  <span>Stable shell, expandable core</span>
                </div>
                <div className="system-status-bar mt-2 h-2">
                  <span style={{ width: "72%" }} />
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {REPORT_MEANING.map((item, index) => (
                  <ReasonCard key={item.title} title={item.title} copy={item.copy} highlighted={index === 0} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-20 grid gap-6 lg:grid-cols-[1.04fr_0.96fr]">
        <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8 md:p-10">
          <TopChip>Report lifecycle</TopChip>
          <h2 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            The report route becomes strongest when it grows from real signal and verified access.
          </h2>
          <div className="mt-8 grid gap-4">
            {REPORT_LIFECYCLE.map((item, index) => (
              <LifecycleCard key={item.step} step={item.step} title={item.title} copy={item.copy} highlighted={index === 0} />
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          {TRUST_BOUNDARIES.map((item, index) => (
            <TrustTile key={item.label} label={item.label} value={item.value} highlighted={index === 0} />
          ))}
        </div>
      </section>

      <section className="relative z-10 mt-20">
        <div className="system-panel-authority rounded-[2rem] p-6 text-center sm:p-8 md:p-10">
          <TopChip>Strongest next move</TopChip>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            Open dashboard reports if you are verified, or return to Free Scan to create the first signal.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-300">
            The report layer is strongest when it stays connected to real readiness signal and verified customer access.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/dashboard/reports"
              className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
            >
              Open dashboard reports
            </Link>
            <Link
              href="/free-check"
              className="system-button-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
            >
              Start Free Scan
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function ReportAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-10 top-8 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl sm:h-96 sm:w-96" />
      <div className="absolute -right-8 top-28 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl sm:h-80 sm:w-80" />
      <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-300/8 blur-3xl sm:h-[26rem] sm:w-[26rem]" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.03]" />
      <div className="system-scan-line absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
    </div>
  );
}

function TopChip({ children }: { children: ReactNode }) {
  return <div className="system-chip inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em]">{children}</div>;
}

function AuthorityPill({ children }: { children: ReactNode }) {
  return <div className="system-tag-strong rounded-full px-4 py-2 text-sm">{children}</div>;
}

function ReadoutTile({ label, value, highlighted = false }: { label: string; value: string; highlighted?: boolean }) {
  return (
    <div className={highlighted ? "system-chip rounded-[1.3rem] p-4" : "system-surface rounded-[1.3rem] p-4"}>
      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">{label}</div>
      <div className="mt-2 text-base font-semibold leading-6 text-white">{value}</div>
    </div>
  );
}

function ReasonCard({ title, copy, highlighted = false }: { title: string; copy: string; highlighted?: boolean }) {
  return (
    <article className={highlighted ? "system-panel-authority rounded-[1.7rem] p-6" : "system-surface rounded-[1.7rem] p-6"}>
      <h3 className="text-2xl font-semibold tracking-tight text-white">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-slate-300">{copy}</p>
    </article>
  );
}

function LifecycleCard({ step, title, copy, highlighted = false }: { step: string; title: string; copy: string; highlighted?: boolean }) {
  return (
    <div className={highlighted ? "system-chip rounded-[1.45rem] p-5" : "system-surface rounded-[1.45rem] p-5"}>
      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200">Step {step}</div>
      <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-300">{copy}</p>
    </div>
  );
}

function TrustTile({ label, value, highlighted = false }: { label: string; value: string; highlighted?: boolean }) {
  return (
    <div className={highlighted ? "system-chip rounded-[1.45rem] p-5" : "system-surface rounded-[1.45rem] p-5"}>
      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">{label}</div>
      <div className="mt-3 text-base font-semibold leading-7 text-white">{value}</div>
    </div>
  );
}
