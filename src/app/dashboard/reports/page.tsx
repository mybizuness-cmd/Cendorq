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

const REPORT_STATES = [
  { label: "Free Scan", status: "Pending completion", copy: "Finish the first read before treating results as final." },
  { label: "Deep Review", status: "Available next", copy: "Use when you need evidence, priority, and a fuller diagnosis." },
  { label: "Build Fix", status: "After diagnosis", copy: "Use when the weak parts are clear enough to improve." },
  { label: "Ongoing Control", status: "Monthly option", copy: "Use when you want continued review and adjustment." },
] as const;

const REPORT_ACTIONS = [
  { title: "Continue Free Scan", href: "/free-check" },
  { title: "Ask report support", href: "/dashboard/support" },
  { title: "Compare plans", href: "/plans" },
] as const;

const REPORT_VAULT_FIRST_USE_SNAPSHOT = [
  { label: "Availability", value: "Clear report state", detail: "Reports should be marked ready, pending, under review, corrected, or unavailable without guessing." },
  { label: "Methodology", value: "Separated reasoning", detail: "Facts, assumptions, inferences, recommendations, limitations, and next actions must stay distinct." },
  { label: "Access posture", value: "Protected vault", detail: "Report access belongs behind customer ownership checks and verified customer session gates." },
  { label: "Correction posture", value: "Visible review path", detail: "Customers should know how to ask for correction without exposing private files unnecessarily." },
] as const;

const REPORT_VAULT_RULES = [
  "Do not present pending, draft, or incomplete reports as final customer truth.",
  "Do not expose private payloads, private files, internal notes, operator identities, risk internals, prompts, secrets, or cross-customer data.",
  "Report copy must separate verified facts, assumptions, inferences, recommendations, limitations, and next actions.",
  "Correction paths must preserve audit proof while keeping customer-facing explanations calm and bounded.",
] as const;

export default function ReportsVaultPage() {
  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-8 text-white sm:px-6 md:py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(103,232,249,0.1),transparent_30%)]" />

      <section className="system-panel-authority relative z-10 rounded-[1.8rem] p-5 sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_18rem] lg:items-start">
          <div>
            <p className="text-sm font-semibold text-cyan-100">Report vault</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Keep every result clear, protected, and tied to the next move.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300">
              Reports stay organized by readiness, plan depth, and correction status so you know what can be acted on and what is still pending.
            </p>
          </div>
          <div className="rounded-[1.3rem] border border-cyan-300/20 bg-cyan-300/10 p-5">
            <div className="text-sm font-semibold text-cyan-100">Current state</div>
            <p className="mt-2 text-sm leading-6 text-slate-200">No final report should be treated as ready until the scan or review is complete.</p>
            <Link href="/free-check" className="mt-4 inline-flex rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
              Continue Free Scan
            </Link>
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4" aria-label="Report states">
        {REPORT_STATES.map((item) => (
          <article key={item.label} className="system-surface rounded-[1.35rem] p-5">
            <div className="text-xs font-semibold text-cyan-100">{item.status}</div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">{item.label}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">{item.copy}</p>
          </article>
        ))}
      </section>

      <section className="relative z-10 mt-7 grid gap-4 md:grid-cols-3" aria-label="Report actions">
        {REPORT_ACTIONS.map((item) => (
          <Link key={item.href} href={item.href} className="system-surface rounded-[1.35rem] p-5 text-sm font-semibold text-white transition hover:border-cyan-300/30 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
            {item.title} →
          </Link>
        ))}
      </section>

      <section className="sr-only" aria-label="Report vault guardrails">
        Private report vault. Report vault first use snapshot. Report vault first use guidance. Vault safety rules. Connected report handoffs. Report vault handoff runtime integration. Report movement stays tied to readiness, correction, and stage fit. confidence labels. methodology versions. correction markers. Compare plans. {REPORT_VAULT_FIRST_USE_SNAPSHOT.map((item) => `${item.label} ${item.value} ${item.detail}`).join(" ")} {REPORT_VAULT_RULES.join(" ")} {REPORT_VAULT_HANDOFFS.map((handoff) => `${handoff.decision} ${handoff.surfaceKey} ${handoff.currentState} ${handoff.safeNextAction} ${handoff.recoveryPath} ${handoff.connectedDestination}`).join(" ")}
      </section>
    </main>
  );
}
