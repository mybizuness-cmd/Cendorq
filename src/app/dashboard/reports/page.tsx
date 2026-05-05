import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { projectCustomerPlatformHandoff } from "@/lib/customer-platform-handoff-runtime";

export const metadata = buildMetadata({
  title: "Report vault | Cendorq",
  description: "Your private Cendorq report vault for scan results, confidence labels, versions, and next-plan guidance.",
  path: "/dashboard/reports",
  noIndex: true,
});

const REPORT_VAULT_HANDOFFS = [
  projectCustomerPlatformHandoff({ surfaceKey: "free-scan-to-report-vault", customerOwned: true, verifiedAccess: true, safeProjectionReady: true, pendingAsFinalRisk: true }),
  projectCustomerPlatformHandoff({ surfaceKey: "dashboard-to-report-vault", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
  projectCustomerPlatformHandoff({ surfaceKey: "report-vault-to-support", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
  projectCustomerPlatformHandoff({ surfaceKey: "report-vault-to-plans", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
] as const;

const REPORT_VAULT_FIRST_USE_SNAPSHOT = [
  { label: "Availability", value: "Clear report state", detail: "Reports should be marked ready, pending, under review, corrected, or unavailable without guessing." },
  { label: "Methodology", value: "Separated reasoning", detail: "Facts, assumptions, inferences, recommendations, limitations, and next actions must stay distinct." },
  { label: "Access posture", value: "Protected vault", detail: "Report access belongs behind customer ownership checks and verified customer session gates." },
  { label: "Correction posture", value: "Visible review path", detail: "Customers should know how to ask for correction without exposing private files unnecessarily." },
] as const;

const REPORT_VAULT_ACTIONS = [
  { title: "Continue Free Scan", copy: "Finish the first read if the vault is not ready yet.", href: "/free-check" },
  { title: "Ask report support", copy: "Request help, correction review, or explanation safely.", href: "/dashboard/support" },
  { title: "Compare report depth", copy: "See when Deep Review, Build Fix, or Ongoing Control makes sense.", href: "/plans" },
] as const;

const REPORT_VAULT_RULES = [
  "Do not present pending, draft, or incomplete reports as final customer truth.",
  "Do not expose private payloads, private files, internal notes, operator identities, risk internals, prompts, secrets, or cross-customer data.",
  "Report copy must separate verified facts, assumptions, inferences, recommendations, limitations, and next actions.",
  "Correction paths must preserve audit proof while keeping customer-facing explanations calm and bounded.",
] as const;

const REPORT_STAGES = [
  {
    label: "Free Scan",
    status: "Ready after scan completion",
    copy: "A concise first read on visible hesitation, trust, clarity, choice, and action signals.",
    next: "When limits appear, Deep Review explains causes in more depth.",
  },
  {
    label: "Deep Review",
    status: "Available as next plan",
    copy: "A deeper diagnosis with stronger evidence, root causes, visual explanations, and prioritized findings.",
    next: "When causes are clear, Build Fix turns diagnosis into implementation.",
  },
  {
    label: "Build Fix",
    status: "Available after diagnosis",
    copy: "Implementation-focused work that addresses the verified issues instead of guessing at fixes.",
    next: "When improvements are live, Ongoing Control protects progress and finds new opportunities.",
  },
  {
    label: "Ongoing Control",
    status: "Available for monthly control",
    copy: "Monthly monitoring, regression detection, progress history, and next-priority guidance.",
    next: "Best for businesses that want continued visibility, control, and compounding improvement.",
  },
] as const;

export default function ReportsVaultPage() {
  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-8 text-white sm:px-6 md:py-12 xl:py-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(103,232,249,0.12),transparent_32%)]" />
      <section className="system-panel-authority relative z-10 rounded-[2.5rem] p-6 sm:p-10">
        <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">Private report vault</div>
        <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Every report stays organized, versioned, and tied to what happens next.
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
          Your report vault is designed to hold Free Scan, Deep Review, Build Fix, and Ongoing Control outputs with confidence labels, methodology versions, correction markers, and next-plan guidance.
        </p>
      </section>

      <section className="relative z-10 mt-8 grid gap-4 lg:grid-cols-4" aria-label="Report vault first use snapshot">
        {REPORT_VAULT_FIRST_USE_SNAPSHOT.map((item) => (
          <article key={item.label} className="system-surface rounded-[1.5rem] p-5">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">{item.label}</div>
            <h2 className="mt-3 text-xl font-semibold tracking-tight text-white">{item.value}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="relative z-10 mt-8 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]" aria-label="Report vault first use guidance">
        <article className="system-panel-authority rounded-[2rem] p-6 sm:p-8">
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">First vault visit</div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">Know what is ready before acting on it.</h2>
          <p className="mt-4 text-base leading-8 text-slate-300">
            The report vault should make report availability, methodology, limits, correction options, and next-plan context clear before a customer acts on recommendations or upgrades.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {REPORT_VAULT_ACTIONS.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-[1.2rem] border border-white/10 bg-white/[0.035] p-4 text-sm leading-7 text-slate-200 transition hover:border-cyan-300/30 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
                <span className="block font-semibold text-white">{item.title}</span>
                <span className="mt-2 block">{item.copy}</span>
              </Link>
            ))}
          </div>
        </article>
        <article className="system-surface rounded-[2rem] p-6 sm:p-8">
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">Vault safety rules</div>
          <div className="mt-5 grid gap-3">
            {REPORT_VAULT_RULES.map((rule) => (
              <div key={rule} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-slate-200">
                {rule}
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="relative z-10 mt-8" aria-label="Report vault handoff runtime integration">
        <div className="system-surface rounded-[2rem] p-6 sm:p-8">
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">Connected report handoffs</div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">Report movement stays tied to readiness, correction, and stage fit.</h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-slate-300">
            Report vault handoff runtime keeps Free Scan results, dashboard report entry, support correction, and plan comparison connected to customer-owned safe projection. Pending reports stay pending, correction routes stay bounded, and plan movement waits for readiness instead of fake urgency or unsupported outcome promises.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {REPORT_VAULT_HANDOFFS.map((handoff) => (
              <Link key={handoff.surfaceKey} href={handoff.connectedDestination} className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-slate-200 transition hover:border-cyan-300/30 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-100">{handoff.decision} · {handoff.surfaceKey}</span>
                <span className="mt-3 block font-semibold text-white">{handoff.currentState}</span>
                <span className="mt-2 block">{handoff.safeNextAction}</span>
                <span className="mt-3 block text-xs leading-5 text-slate-400">Recovery: {handoff.recoveryPath}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-8 grid gap-4 md:grid-cols-2">
        {REPORT_STAGES.map((report) => (
          <article key={report.label} className="system-surface rounded-[1.75rem] p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">{report.status}</div>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">{report.label}</h2>
              </div>
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-slate-300">Vault</span>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-300">{report.copy}</p>
            <p className="mt-4 rounded-[1.25rem] border border-cyan-300/15 bg-cyan-300/10 p-4 text-sm leading-7 text-cyan-50">{report.next}</p>
          </article>
        ))}
      </section>

      <div className="relative z-10 mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/dashboard" className="rounded-2xl border border-white/10 px-5 py-3 text-center text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
          Back to dashboard
        </Link>
        <Link href="/plans" className="rounded-2xl bg-cyan-300 px-5 py-3 text-center text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
          Compare plans
        </Link>
      </div>
    </main>
  );
}
